import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[flavors] ${message}`); };
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const sameKeys = (object, expected) => {
  const actual = Object.keys(object).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
};
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[flavors]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const flavorSchema = await readJson('spec/schemas/flavor.schema.json');
const themeSchema = await readJson('spec/schemas/theme.schema.json');
if (flavorSchema.properties?.schema?.const !== 'neosmartui/flavor@1') fail('Flavor schema identity drifted');
if (themeSchema.properties?.schema?.const !== 'neosmartui/theme@1') fail('Theme schema identity drifted');

const flavorDirs = (await readdir(resolve(root, 'packages/flavors'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (flavorDirs.join(',') !== 'hardline,rivet') fail(`v0.3 Slice 1 expects exactly hardline,rivet Flavor manifests; got ${flavorDirs.join(',')}`);

const flavorKeys = ['$schema', 'schema', 'id', 'name', 'intent', 'interactionModel'];
const hardline = await readJson('packages/flavors/hardline/flavor.json');
const rivet = await readJson('packages/flavors/rivet/flavor.json');
for (const [label, flavor, expectedId, expectedName] of [
  ['Hardline', hardline, 'flavor.hardline', 'Hardline'],
  ['Rivet', rivet, 'flavor.rivet', 'Rivet']
]) {
  if (!sameKeys(flavor, flavorKeys)) fail(`${label} Flavor manifest must expose only the canonical Flavor fields`);
  if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== expectedId || flavor.name !== expectedName) fail(`${label} Flavor identity is invalid`);
  if (!/^flavor\.[a-z][a-z0-9-]*$/.test(flavor.id)) fail(`${label} Flavor stable ID is invalid`);
  if (!flavor.intent || typeof flavor.intent !== 'string') fail(`${label} Flavor intent is required`);
  if (flavor.interactionModel !== 'pressure-not-levitation') fail(`${label} must preserve pressure-not-levitation`);
}
if (!hardline.intent.includes('Flagship sharp neo-brutalist expression')) fail('Hardline must identify itself as the flagship sharp expression');
if (!hardline.intent.includes('square geometry') || !hardline.intent.includes('seated selection')) fail('Hardline intent must encode sharp geometry and seated selection');

const themeKeys = ['$schema', 'schema', 'name', 'family', 'category', 'color', 'typography', 'geometry', 'border', 'shadow', 'spacing', 'density', 'motion', 'interaction', 'icons'];
const hardlineLight = await readJson('packages/themes/hardline-light/theme.json');
if (!sameKeys(hardlineLight, themeKeys)) fail('Hardline Light must expose exactly the canonical neosmartui/theme@1 fields');
if (hardlineLight.schema !== 'neosmartui/theme@1' || hardlineLight.name !== 'Hardline Light' || hardlineLight.family !== 'neosmartui' || hardlineLight.category !== 'hardline') fail('Hardline Light Theme identity is invalid');
if (hardlineLight.color?.mode !== 'light' || hardlineLight.color?.strategy !== 'high-reaction') fail('Hardline Light must declare light/high-reaction color intent');
if (hardlineLight.geometry?.profile !== 'square-zero-radius-default') fail('Hardline Light must make square/zero-radius its default geometry profile');
if (hardlineLight.border?.profile !== 'hard') fail('Hardline Light must declare hard boundaries');
if (hardlineLight.shadow?.model !== 'strong-structural-depth') fail('Hardline Light must declare strong structural depth');
if (hardlineLight.motion?.model !== 'pressure-not-levitation' || hardlineLight.motion?.intensity !== 'restrained') fail('Hardline Light motion must preserve pressure with restrained decoration');
if (hardlineLight.interaction?.model !== 'pressure-not-levitation' || hardlineLight.interaction?.selection !== 'seated') fail('Hardline Light interaction must preserve pressure and seated selection');
if (hardlineLight.icons?.strategy !== 'adapter-owned') fail('Hardline Theme must not take renderer ownership of icons');

await expectAbsent('packages/themes/hardline-light/tokens.json', 'contract-only Hardline Light must not claim a resolved token bundle');
await expectAbsent('packages/themes/hardline-light/resolution.json', 'contract-only Hardline Light must not claim Theme resolution');
for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) {
  await expectAbsent(`packages/flavors/hardline/index.${extension}`, `Hardline contract must not introduce renderer override index.${extension}`);
}

const docs = await readFile(resolve(root, 'spec/flavors/HARDLINE.md'), 'utf8');
for (const marker of ['flagship/default NeoSmartUI flavor', '`flavor.hardline`', 'square or zero-radius geometry', 'MUST NOT introduce hover lift', 'MUST NOT own Button/Dialog/Product/Checkout/Billing behavior', 'descriptor-only', '`packages/themes/hardline-light/tokens.json`', '`packages/themes/hardline-light/resolution.json`', 'Dark mode follows as its own concrete Theme instance']) {
  if (!docs.includes(marker)) fail(`Hardline contract docs missing marker: ${marker}`);
}

console.log('[flavors] validated Hardline contract, Hardline Light descriptor boundary, and existing Rivet Flavor identity');
