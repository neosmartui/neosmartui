import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[mono-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[mono-contract]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const canonical = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
if (!canonical.includes('Soft, Rivet, Mono and Hardline are:')) fail('Canonical PRD no longer identifies Mono as a Flavor');
if (!canonical.includes('## Mono\n\nEditorial black/white/gray NeoBrutal.')) fail('Canonical PRD Mono expression authority drifted');

const inventory = await json('migration/inventory.json');
const family = inventory.sources.find((entry) => entry.repository === 'NeoBrutalism-shop/spec');
if (!family || family.sha !== 'fbf499397f4e9a52d6e25c13921fd5377799c626' || family.status !== 'snapshot-pinned') fail('pinned family-spec authority drifted');
if (family.copyPolicy !== 'knowledge-only-until-reviewed' || !family.evidencePaths?.includes('FLAVORS.md')) fail('family Flavor-law provenance boundary drifted');
if (inventory.sources.some((entry) => /mono/i.test(entry.repository) || /mono/i.test(entry.legacyRole ?? ''))) fail('Mono public proof must not invent a dedicated legacy Mono source');
if (inventory.artifacts.some((entry) => /^legacy\.mono\./.test(entry.id))) fail('Mono public proof must not invent legacy Mono artifacts');

const flavor = await json('packages/flavors/mono/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.mono' || flavor.name !== 'Mono') fail('Mono Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Mono must preserve pressure-not-levitation');
for (const marker of ['Editorial black/white/gray', 'type-led hierarchy', 'restrained monochrome surfaces', 'crisp print-like structural depth', 'seated selection']) {
  if (!flavor.intent.includes(marker)) fail(`Mono intent missing ${marker}`);
}

const theme = await json('packages/themes/mono-light/theme.json');
if (theme.schema !== 'neosmartui/theme@1' || theme.name !== 'Mono Light' || theme.family !== 'neosmartui' || theme.category !== 'mono') fail('Mono Light Theme identity is invalid');
if (theme.color?.mode !== 'light' || theme.color?.strategy !== 'editorial-monochrome') fail('Mono Light must declare editorial monochrome light intent');
if (theme.typography?.strategy !== 'editorial-type-led') fail('Mono Light must declare type-led editorial hierarchy');
if (theme.geometry?.profile !== 'editorial-structured' || theme.border?.profile !== 'print-keyline' || theme.shadow?.model !== 'crisp-monochrome-depth') fail('Mono Light structural descriptor drifted');
if (theme.motion?.model !== 'pressure-not-levitation' || theme.motion?.intensity !== 'restrained') fail('Mono Light must preserve restrained pressure motion');
if (theme.interaction?.model !== 'pressure-not-levitation' || theme.interaction?.selection !== 'seated') fail('Mono Light must preserve pressure and seated selection');
if (theme.icons?.strategy !== 'adapter-owned') fail('Mono Theme must not take renderer ownership of icons');

const flavorDirs = (await readdir(resolve(root, 'packages/flavors'), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (flavorDirs.join(',') !== 'hardline,mono,rivet,soft') fail(`Mono public proof expects exactly four official Flavor manifests; got ${flavorDirs.join(',')}`);

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) await expectAbsent(`packages/flavors/mono/index.${extension}`, `Mono public proof must not add renderer override index.${extension}`);
const dark = await json('packages/themes/mono-dark/theme.json');
if (dark.schema !== 'neosmartui/theme@1' || dark.name !== 'Mono Dark' || dark.family !== 'neosmartui' || dark.category !== 'mono') fail('Mono Dark contract Theme identity is invalid');
if (dark.color?.mode !== 'dark' || dark.color?.strategy !== 'editorial-monochrome-dark') fail('Mono Dark contract must declare authored editorial monochrome dark intent');
for (const [path, expected] of [
  ['typography.strategy', 'editorial-type-led'],
  ['geometry.profile', 'editorial-structured'],
  ['border.profile', 'print-keyline'],
  ['shadow.model', 'crisp-monochrome-depth'],
  ['spacing.density', 'editorial'],
  ['density.control', 'comfortable'],
  ['motion.model', 'pressure-not-levitation'],
  ['motion.intensity', 'restrained'],
  ['interaction.model', 'pressure-not-levitation'],
  ['interaction.selection', 'seated'],
  ['icons.strategy', 'adapter-owned']
]) {
  const actual = path.split('.').reduce((value, key) => value?.[key], dark);
  if (actual !== expected) fail(`Mono Dark contract descriptor drifted at ${path}`);
}
for (const path of [
  'packages/themes/mono-dark/resolution.json',
  'packages/themes/mono-dark/tokens.json',
  'apps/foundry/fragments/mono-dark.html',
  'tests/browser/foundry-mono-dark.spec.mjs',
  'tooling/validators/validate-mono-dark-theme.mjs',
  'tooling/foundry/assemble-mono-dark.mjs',
  'packages/flavors/mono-dark',
  'apps/foundry/src/flavors/mono-dark'
]) await expectAbsent(path, `Mono Dark contract-only stage must not add runtime implementation path: ${path}`);

const resolution = await json('packages/themes/mono-light/resolution.json');
const bundle = await json('packages/themes/mono-light/tokens.json');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== 'flavor.mono' || resolution.theme !== 'Mono Light' || resolution.bundle !== 'tokens.json') fail('Mono Light resolution binding is invalid');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== 'flavor.mono' || bundle.theme !== 'Mono Light') fail('Mono Light resolved bundle identity is invalid');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('public-proof Mono Light must bind the exact 18-component Core scope');
if (bundle.values.length !== 55 || new Set(bundle.values.map((entry) => entry.id)).size !== 55) fail('public-proof Mono Light must resolve exactly 55 unique semantic dependencies');

for (const path of ['apps/foundry/src/flavors/mono/index.html', 'tests/browser/foundry-mono-light.spec.mjs', 'tooling/validators/validate-mono-theme.mjs', 'evidence/public/flavor.mono.json']) await access(resolve(root, path));

const docs = await readFile(resolve(root, 'spec/flavors/MONO.md'), 'utf8');
for (const marker of [
  'editorial black/white/gray NeoSmartUI flavor',
  '`flavor.mono`',
  'Official migration maturity: `public-proof`',
  'Public-proof record: `evidence/public/flavor.mono.json`',
  'no dedicated legacy Mono repository or Mono implementation artifact',
  'does not claim legacy Mono token values',
  'Raw',
  'MUST NOT introduce generic hover lift',
  'exact resolved semantic dependency union: **55 token IDs**',
  '`3px → 1px → 0`',
  '`0px → 2px → 3px`',
  '`mono-theme.css`',
  '`/flavors/mono/`',
  'Public proof remains evidence-bound rather than declarative',
  'Public-proof promotion does not redeploy Pages',
  'Mono Dark follows as its own concrete Theme instance',
  'Mono Dark contract maturity: `contract-only`',
  'authored color strategy: `editorial-monochrome-dark`',
  'the existing `build:foundry` chain remains unchanged during the contract stage',
  'Mono Light is complete through public proof; Mono Dark is contract-only'
]) if (!docs.includes(marker)) fail(`Mono public-proof docs missing marker: ${marker}`);

console.log('[mono-contract] validated public-proof Mono Light plus descriptor-only Mono Dark contract, canonical provenance, 18/55 boundary, and no runtime/renderer fork');
