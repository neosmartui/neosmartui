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
if (flavorDirs.join(',') !== 'hardline,mono,rivet,soft') fail(`Mono contract slice expects exactly hardline,mono,rivet,soft Flavor manifests; got ${flavorDirs.join(',')}`);

const flavorKeys = ['$schema', 'schema', 'id', 'name', 'intent', 'interactionModel'];
const hardline = await readJson('packages/flavors/hardline/flavor.json');
const mono = await readJson('packages/flavors/mono/flavor.json');
const rivet = await readJson('packages/flavors/rivet/flavor.json');
const soft = await readJson('packages/flavors/soft/flavor.json');
for (const [label, flavor, expectedId, expectedName] of [
  ['Hardline', hardline, 'flavor.hardline', 'Hardline'],
  ['Mono', mono, 'flavor.mono', 'Mono'],
  ['Rivet', rivet, 'flavor.rivet', 'Rivet'],
  ['Soft', soft, 'flavor.soft', 'Soft']
]) {
  if (!sameKeys(flavor, flavorKeys)) fail(`${label} Flavor manifest must expose only the canonical Flavor fields`);
  if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== expectedId || flavor.name !== expectedName) fail(`${label} Flavor identity is invalid`);
  if (!/^flavor\.[a-z][a-z0-9-]*$/.test(flavor.id)) fail(`${label} Flavor stable ID is invalid`);
  if (!flavor.intent || typeof flavor.intent !== 'string') fail(`${label} Flavor intent is required`);
  if (flavor.interactionModel !== 'pressure-not-levitation') fail(`${label} must preserve pressure-not-levitation`);
}
if (!hardline.intent.includes('Flagship sharp neo-brutalist expression')) fail('Hardline must identify itself as the flagship sharp expression');
if (!hardline.intent.includes('square geometry') || !hardline.intent.includes('seated selection')) fail('Hardline intent must encode sharp geometry and seated selection');
if (!soft.intent.includes('Calm application-oriented neo-brutalist expression')) fail('Soft must identify itself as the calm application-oriented expression');
for (const marker of ['moderate rounding', 'shallow hard depth', 'warm neutral surfaces', 'softened blue accents', 'seated selection']) {
  if (!soft.intent.includes(marker)) fail(`Soft intent must encode ${marker}`);
}
if (!mono.intent.includes('Editorial black/white/gray neo-brutalist expression')) fail('Mono must identify itself as the editorial monochrome expression');
for (const marker of ['type-led hierarchy', 'restrained monochrome surfaces', 'crisp print-like structural depth', 'seated selection']) {
  if (!mono.intent.includes(marker)) fail(`Mono intent must encode ${marker}`);
}

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

const hardlineResolution = await readJson('packages/themes/hardline-light/resolution.json');
const hardlineBundle = await readJson('packages/themes/hardline-light/tokens.json');
if (hardlineResolution.schema !== 'neosmartui/theme-resolution@1' || hardlineResolution.flavor !== 'flavor.hardline' || hardlineResolution.theme !== 'Hardline Light' || hardlineResolution.bundle !== 'tokens.json') fail('Hardline Light resolution identity is invalid');
if (hardlineBundle.schema !== 'neosmartui/resolved-token-bundle@1' || hardlineBundle.flavor !== 'flavor.hardline' || hardlineBundle.theme !== 'Hardline Light') fail('Hardline Light resolved bundle identity is invalid');
if (hardlineResolution.scope.length !== 18 || hardlineBundle.scope.length !== 18 || [...hardlineResolution.scope].sort().join('|') !== [...hardlineBundle.scope].sort().join('|')) fail('Hardline Light resolution and bundle must share the exact 18-component Core scope');
if (hardlineBundle.values.length !== 55) fail(`Hardline Light must resolve the exact shipping dependency union of 55 tokens; got ${hardlineBundle.values.length}`);
const hardlineValues = toMap(hardlineBundle.values);
if (hardlineValues.size !== 55) fail('Hardline Light resolved token IDs must be unique');
for (const id of ['radius.control', 'radius.surface', 'radius.annotation']) if (hardlineValues.get(id)?.value !== '0px') fail(`${id} must implement Hardline zero-radius geometry`);
for (const axis of ['x', 'y']) {
  if (hardlineValues.get(`depth.rest.${axis}`)?.value !== '4px' || hardlineValues.get(`depth.hover.${axis}`)?.value !== '2px' || hardlineValues.get(`depth.active.${axis}`)?.value !== '0px') fail(`Hardline ${axis}-axis depth must implement pinned 4→2→0 pressure physics`);
  if (hardlineValues.get(`press.hover.${axis}`)?.value !== '2px' || hardlineValues.get(`press.active.${axis}`)?.value !== '4px') fail(`Hardline ${axis}-axis travel must implement pinned 0→2→4 pressure physics`);
}
if (hardlineValues.get('motion.press.duration')?.value !== '70ms' || hardlineValues.get('motion.release.duration')?.value !== '110ms' || hardlineValues.get('motion.standard.duration')?.value !== '170ms') fail('Hardline timings must preserve the pinned family 70/110/170ms semantic reference');
if (hardlineValues.get('focus.ring.width')?.value !== '3px' || hardlineValues.get('focus.ring.offset')?.value !== '3px') fail('Hardline focus keyline must remain independently visible');
if (hardlineValues.get('size.control.minimum')?.value !== '44px') fail('Hardline must preserve the 44px minimum target');
if (hardlineValues.get('color.action.primary.surface')?.value !== '#ffd84d' || hardlineValues.get('color.action.primary.content')?.value !== '#111111') fail('Hardline primary action must preserve the canonical yellow/ink flagship pairing');

const softLight = await readJson('packages/themes/soft-light/theme.json');
if (!sameKeys(softLight, themeKeys)) fail('Soft Light must expose exactly the canonical neosmartui/theme@1 fields');
if (softLight.schema !== 'neosmartui/theme@1' || softLight.name !== 'Soft Light' || softLight.family !== 'neosmartui' || softLight.category !== 'soft') fail('Soft Light Theme identity is invalid');
if (softLight.color?.mode !== 'light' || softLight.color?.strategy !== 'warm-neutral-softened-blue') fail('Soft Light must declare light warm-neutral/softened-blue color intent');
if (softLight.typography?.strategy !== 'readable-system-first') fail('Soft Light must prioritize long-session readable system typography');
if (softLight.geometry?.profile !== 'moderate-rounded') fail('Soft Light must declare moderate rounding rather than Hardline geometry');
if (softLight.border?.profile !== 'visible-moderate') fail('Soft Light must retain visible moderate structural boundaries');
if (softLight.shadow?.model !== 'shallow-hard-depth') fail('Soft Light must declare shallow hard structural depth');
if (softLight.spacing?.density !== 'comfortable' || softLight.density?.control !== 'comfortable') fail('Soft Light must declare comfortable application density');
if (softLight.motion?.model !== 'pressure-not-levitation' || softLight.motion?.intensity !== 'restrained') fail('Soft Light motion must preserve pressure with restrained movement');
if (softLight.interaction?.model !== 'pressure-not-levitation' || softLight.interaction?.selection !== 'seated') fail('Soft Light interaction must preserve pressure and seated selection');
if (softLight.icons?.strategy !== 'adapter-owned') fail('Soft Theme must not take renderer ownership of icons');

const softResolution = await readJson('packages/themes/soft-light/resolution.json');
const softBundle = await readJson('packages/themes/soft-light/tokens.json');
if (softResolution.schema !== 'neosmartui/theme-resolution@1' || softResolution.flavor !== 'flavor.soft' || softResolution.theme !== 'Soft Light' || softResolution.bundle !== 'tokens.json') fail('Soft Light resolution identity is invalid');
if (softBundle.schema !== 'neosmartui/resolved-token-bundle@1' || softBundle.flavor !== 'flavor.soft' || softBundle.theme !== 'Soft Light') fail('Soft Light resolved bundle identity is invalid');
if (softResolution.scope.length !== 18 || softBundle.scope.length !== 18 || [...softResolution.scope].sort().join('|') !== [...softBundle.scope].sort().join('|')) fail('Soft Light resolution and bundle must share the exact 18-component Core scope');
if (softBundle.values.length !== 55) fail(`Soft Light must resolve the exact shipping dependency union of 55 tokens; got ${softBundle.values.length}`);
const softValues = toMap(softBundle.values);
if (softValues.size !== 55) fail('Soft Light resolved token IDs must be unique');
if (softValues.get('border.control.width')?.value !== '2px' || softValues.get('border.surface.width')?.value !== '2px' || softValues.get('border.annotation.width')?.value !== '2px') fail('Soft Light must implement visible 2px boundaries');
if (softValues.get('radius.control')?.value !== '8px' || softValues.get('radius.surface')?.value !== '12px' || softValues.get('radius.annotation')?.value !== '999px') fail('Soft Light must implement moderate 8/12/pill geometry');
for (const axis of ['x', 'y']) {
  if (softValues.get(`depth.rest.${axis}`)?.value !== '3px' || softValues.get(`depth.hover.${axis}`)?.value !== '1.5px' || softValues.get(`depth.active.${axis}`)?.value !== '0px') fail(`Soft ${axis}-axis depth must implement pinned 3→1.5→0 pressure physics`);
  if (softValues.get(`press.hover.${axis}`)?.value !== '1.5px' || softValues.get(`press.active.${axis}`)?.value !== '3px') fail(`Soft ${axis}-axis travel must implement pinned 0→1.5→3 pressure physics`);
}
if (softValues.get('motion.press.duration')?.value !== '70ms' || softValues.get('motion.release.duration')?.value !== '105ms' || softValues.get('motion.standard.duration')?.value !== '165ms') fail('Soft Light timings must preserve restrained 70/105/165ms semantic timing');
if (softValues.get('focus.ring.width')?.value !== '3px' || softValues.get('focus.ring.offset')?.value !== '3px') fail('Soft Light focus keyline must remain independently visible');
if (softValues.get('size.control.minimum')?.value !== '44px') fail('Soft Light must preserve the 44px minimum target');
if (softValues.get('color.surface.interactive')?.value !== '#fffaf2' || softValues.get('color.surface.panel')?.value !== '#f7f1e7') fail('Soft Light must preserve warm neutral surfaces');
if (softValues.get('color.action.primary.surface')?.value !== '#8bb8f8' || softValues.get('color.action.primary.content')?.value !== '#171717') fail('Soft Light primary action must preserve softened-blue/ink pairing');

const monoLight = await readJson('packages/themes/mono-light/theme.json');
if (!sameKeys(monoLight, themeKeys)) fail('Mono Light must expose exactly the canonical neosmartui/theme@1 fields');
if (monoLight.schema !== 'neosmartui/theme@1' || monoLight.name !== 'Mono Light' || monoLight.family !== 'neosmartui' || monoLight.category !== 'mono') fail('Mono Light Theme identity is invalid');
if (monoLight.color?.mode !== 'light' || monoLight.color?.strategy !== 'editorial-monochrome') fail('Mono Light must declare editorial monochrome light intent');
if (monoLight.typography?.strategy !== 'editorial-type-led') fail('Mono Light must declare type-led editorial typography');
if (monoLight.geometry?.profile !== 'editorial-structured') fail('Mono Light must declare structured editorial geometry');
if (monoLight.border?.profile !== 'print-keyline' || monoLight.shadow?.model !== 'crisp-monochrome-depth') fail('Mono Light must declare print-like keylines and crisp monochrome depth');
if (monoLight.motion?.model !== 'pressure-not-levitation' || monoLight.motion?.intensity !== 'restrained') fail('Mono Light motion must preserve pressure with restrained movement');
if (monoLight.interaction?.model !== 'pressure-not-levitation' || monoLight.interaction?.selection !== 'seated') fail('Mono Light interaction must preserve pressure and seated selection');
if (monoLight.icons?.strategy !== 'adapter-owned') fail('Mono Theme must not take renderer ownership of icons');

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) {
  await expectAbsent(`packages/flavors/hardline/index.${extension}`, `Hardline implementation must not introduce renderer override index.${extension}`);
  await expectAbsent(`packages/flavors/soft/index.${extension}`, `Soft implementation must not introduce renderer override index.${extension}`);
  await expectAbsent(`packages/flavors/mono/index.${extension}`, `Mono contract must not introduce renderer override index.${extension}`);
}
await expectAbsent('packages/themes/soft-dark', 'Soft Light implementation must not prematurely implement Soft Dark');
await expectAbsent('packages/themes/mono-light/tokens.json', 'Mono contract must not prematurely resolve token values');
await expectAbsent('packages/themes/mono-light/resolution.json', 'Mono contract must not prematurely create a Theme resolution');
await expectAbsent('packages/themes/mono-dark', 'Mono contract must not prematurely implement Mono Dark');

const hardlineDocs = await readFile(resolve(root, 'spec/flavors/HARDLINE.md'), 'utf8');
for (const marker of ['flagship/default NeoSmartUI flavor', '`flavor.hardline`', 'square or zero-radius geometry', 'MUST NOT introduce hover lift', 'MUST NOT own Button/Dialog/Product/Checkout/Billing behavior', 'Maturity: `public-proof`', '`packages/themes/hardline-light/tokens.json`', '`packages/themes/hardline-light/resolution.json`', 'Dark mode follows as its own concrete Theme instance']) {
  if (!hardlineDocs.includes(marker)) fail(`Hardline implementation docs missing marker: ${marker}`);
}
const softDocs = await readFile(resolve(root, 'spec/flavors/SOFT.md'), 'utf8');
for (const marker of ['calm application-oriented NeoSmartUI flavor', '`flavor.soft`', 'Maturity: `implemented`', 'moderate rounding', 'MUST NOT introduce generic hover lift', 'SaaS remains a Vertical', '`packages/themes/soft-light/tokens.json`', '`packages/themes/soft-light/resolution.json`', 'exact resolved semantic dependency union: 55 token IDs', '`3px → 1.5px → 0`', 'not public-proof yet', 'NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a', '`knowledge-only-until-reviewed`', 'Soft Dark follows as its own concrete Theme instance']) {
  if (!softDocs.includes(marker)) fail(`Soft implementation docs missing marker: ${marker}`);
}
const monoDocs = await readFile(resolve(root, 'spec/flavors/MONO.md'), 'utf8');
for (const marker of ['editorial black/white/gray NeoSmartUI flavor', '`flavor.mono`', 'Official migration maturity: `contract-only`', 'no dedicated legacy Mono repository or Mono implementation artifact', 'MUST NOT introduce generic hover lift', '`packages/themes/mono-light/theme.json`', 'Mono Dark follows as its own concrete Theme instance']) {
  if (!monoDocs.includes(marker)) fail(`Mono contract docs missing marker: ${marker}`);
}

console.log('[flavors] validated public-proof Hardline Light, implemented Soft Light resolution boundary, existing Rivet Flavor identity, and contract-only Mono Light descriptor');
