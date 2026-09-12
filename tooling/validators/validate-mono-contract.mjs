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
if (inventory.sources.some((entry) => /mono/i.test(entry.repository) || /mono/i.test(entry.legacyRole ?? ''))) fail('Mono contract must not invent a dedicated legacy Mono source');
if (inventory.artifacts.some((entry) => /^legacy\.mono\./.test(entry.id))) fail('Mono contract must not invent legacy Mono artifacts');

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
if (flavorDirs.join(',') !== 'hardline,mono,rivet,soft') fail(`Mono contract expects exactly four official Flavor manifests; got ${flavorDirs.join(',')}`);

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) await expectAbsent(`packages/flavors/mono/index.${extension}`, `contract-only Mono must not add renderer override index.${extension}`);
await expectAbsent('packages/themes/mono-light/tokens.json', 'contract-only Mono must not resolve token values');
await expectAbsent('packages/themes/mono-light/resolution.json', 'contract-only Mono must not create a Theme resolution');
await expectAbsent('packages/themes/mono-dark', 'contract-only Mono must not prematurely implement Mono Dark');
await expectAbsent('apps/foundry/src/flavors/mono/index.html', 'contract-only Mono must not claim a dedicated Foundry route');
await expectAbsent('evidence/public/flavor.mono.json', 'contract-only Mono must not claim public proof');

const docs = await readFile(resolve(root, 'spec/flavors/MONO.md'), 'utf8');
for (const marker of [
  'editorial black/white/gray NeoSmartUI flavor',
  '`flavor.mono`',
  'Official migration maturity: `contract-only`',
  'no dedicated legacy Mono repository or Mono implementation artifact',
  'does not claim legacy Mono token values',
  'does not',
  'Raw',
  'MUST NOT introduce generic hover lift',
  '44px',
  '`mono-theme.css`',
  '`/flavors/mono/`',
  'Mono Dark follows as its own concrete Theme instance',
  'no Pages deployment'
]) if (!docs.includes(marker)) fail(`Mono contract docs missing marker: ${marker}`);

console.log('[mono-contract] validated canonical Mono ownership, editorial monochrome contract, family-law provenance, and implementation/proof absences');
