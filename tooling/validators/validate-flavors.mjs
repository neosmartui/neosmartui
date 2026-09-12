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
const toMap = (values) => new Map(values.map((entry) => [entry.id, entry]));

const flavorSchema = await readJson('spec/schemas/flavor.schema.json');
const themeSchema = await readJson('spec/schemas/theme.schema.json');
if (flavorSchema.properties?.schema?.const !== 'neosmartui/flavor@1') fail('Flavor schema identity drifted');
if (themeSchema.properties?.schema?.const !== 'neosmartui/theme@1') fail('Theme schema identity drifted');

const flavorDirs = (await readdir(resolve(root, 'packages/flavors'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (flavorDirs.join(',') !== 'hardline,rivet') fail(`Hardline implementation slice expects exactly hardline,rivet Flavor manifests; got ${flavorDirs.join(',')}`);

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

const resolution = await readJson('packages/themes/hardline-light/resolution.json');
const bundle = await readJson('packages/themes/hardline-light/tokens.json');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== 'flavor.hardline' || resolution.theme !== 'Hardline Light' || resolution.bundle !== 'tokens.json') fail('Hardline Light resolution identity is invalid');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== 'flavor.hardline' || bundle.theme !== 'Hardline Light') fail('Hardline Light resolved bundle identity is invalid');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('Hardline Light resolution and bundle must share the exact 18-component Core scope');
if (bundle.values.length !== 55) fail(`Hardline Light must resolve the exact shipping dependency union of 55 tokens; got ${bundle.values.length}`);
const values = toMap(bundle.values);
if (values.size !== 55) fail('Hardline Light resolved token IDs must be unique');
for (const id of ['radius.control', 'radius.surface', 'radius.annotation']) if (values.get(id)?.value !== '0px') fail(`${id} must implement Hardline zero-radius geometry`);
for (const axis of ['x', 'y']) {
  if (values.get(`depth.rest.${axis}`)?.value !== '4px' || values.get(`depth.hover.${axis}`)?.value !== '2px' || values.get(`depth.active.${axis}`)?.value !== '0px') fail(`Hardline ${axis}-axis depth must implement pinned 4→2→0 pressure physics`);
  if (values.get(`press.hover.${axis}`)?.value !== '2px' || values.get(`press.active.${axis}`)?.value !== '4px') fail(`Hardline ${axis}-axis travel must implement pinned 0→2→4 pressure physics`);
}
if (values.get('motion.press.duration')?.value !== '70ms' || values.get('motion.release.duration')?.value !== '110ms' || values.get('motion.standard.duration')?.value !== '170ms') fail('Hardline timings must preserve the pinned family 70/110/170ms semantic reference');
if (values.get('focus.ring.width')?.value !== '3px' || values.get('focus.ring.offset')?.value !== '3px') fail('Hardline focus keyline must remain independently visible');
if (values.get('size.control.minimum')?.value !== '44px') fail('Hardline must preserve the 44px minimum target');
if (values.get('color.action.primary.surface')?.value !== '#ffd84d' || values.get('color.action.primary.content')?.value !== '#111111') fail('Hardline primary action must preserve the canonical yellow/ink flagship pairing');

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) {
  await expectAbsent(`packages/flavors/hardline/index.${extension}`, `Hardline implementation must not introduce renderer override index.${extension}`);
}

const docs = await readFile(resolve(root, 'spec/flavors/HARDLINE.md'), 'utf8');
for (const marker of ['flagship/default NeoSmartUI flavor', '`flavor.hardline`', 'square or zero-radius geometry', 'MUST NOT introduce hover lift', 'MUST NOT own Button/Dialog/Product/Checkout/Billing behavior', 'Maturity: `implemented`', '`packages/themes/hardline-light/tokens.json`', '`packages/themes/hardline-light/resolution.json`', 'Dark mode follows as its own concrete Theme instance']) {
  if (!docs.includes(marker)) fail(`Hardline implementation docs missing marker: ${marker}`);
}

console.log('[flavors] validated implemented Hardline Light resolution, pinned pressure physics, zero-radius geometry, and existing Rivet Flavor identity');
