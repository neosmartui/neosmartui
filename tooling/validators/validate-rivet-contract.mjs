import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[rivet-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[rivet-contract]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const inventory = await json('migration/inventory.json');
const source = inventory.sources.find((entry) => entry.repository === 'NeoBrutalRivet/NeoBrutal-Rivet');
if (!source) fail('pinned Rivet migration source is missing');
if (source.sha !== 'bb4b641d35bc77c958b7345a3b7c0a134c7d802d' || source.status !== 'snapshot-pinned') fail('Rivet source pin drifted');
if (source.copyPolicy !== 'knowledge-only-until-reviewed' || source.licenseEvidence?.status !== 'not-declared-in-repository-metadata') fail('Rivet source licensing/copy policy drifted');
const artifact = inventory.artifacts.find((entry) => entry.id === 'legacy.rivet.flavor-system');
if (!artifact || artifact.sourceRepository !== source.repository || artifact.decision !== 'ADAPT' || artifact.targetLayer !== 'flavor') fail('legacy.rivet.flavor-system migration decision is invalid');

const flavor = await json('packages/flavors/rivet/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.rivet' || flavor.name !== 'Rivet') fail('Rivet Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Rivet must preserve pressure-not-levitation');
for (const marker of ['Industrial/mechanical', 'crisp structural depth', 'restrained rebound', 'seated selection']) {
  if (!flavor.intent.includes(marker)) fail(`Rivet intent missing ${marker}`);
}

const theme = await json('packages/themes/rivet-light/theme.json');
const resolution = await json('packages/themes/rivet-light/resolution.json');
const bundle = await json('packages/themes/rivet-light/tokens.json');
if (theme.schema !== 'neosmartui/theme@1' || theme.name !== 'Rivet Light' || theme.family !== 'neosmartui' || theme.category !== 'rivet') fail('Rivet Light Theme identity is invalid');
if (theme.color?.mode !== 'light' || theme.color?.strategy !== 'industrial-lavender-lime') fail('Rivet Light must declare its implemented industrial lavender/lime palette strategy');
if (theme.typography?.strategy !== 'sturdy-system-first' || theme.geometry?.profile !== 'mechanical' || theme.border?.profile !== 'strong' || theme.shadow?.model !== 'coherent-depth') fail('Rivet Light expression descriptor drifted');
if (theme.motion?.model !== 'pressure-not-levitation' || theme.interaction?.model !== 'pressure-not-levitation' || theme.icons?.strategy !== 'adapter-owned') fail('Rivet Light interaction/adapter ownership drifted');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== 'flavor.rivet' || resolution.theme !== 'Rivet Light' || resolution.bundle !== 'tokens.json') fail('Rivet Light resolution identity is invalid');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== 'flavor.rivet' || bundle.theme !== 'Rivet Light') fail('Rivet Light bundle identity is invalid');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('public-proof Rivet Light must preserve the exact 18-component scope');
if (bundle.values.length !== 55 || new Set(bundle.values.map((entry) => entry.id)).size !== 55) fail('public-proof Rivet Light must preserve the exact 55-token dependency union');

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) await expectAbsent(`packages/flavors/rivet/index.${extension}`, `Rivet public proof must not introduce renderer override index.${extension}`);
await expectAbsent('packages/themes/rivet-dark', 'Rivet Light public proof must not prematurely implement Rivet Dark');
await access(resolve(root, 'apps/foundry/src/flavors/rivet/index.html'));
await access(resolve(root, 'evidence/public/flavor.rivet.json'));

const docs = await readFile(resolve(root, 'spec/flavors/RIVET.md'), 'utf8');
for (const marker of [
  'industrial/mechanical NeoSmartUI flavor',
  '`flavor.rivet`',
  'Official migration maturity: `public-proof`',
  'Public-proof record: `evidence/public/flavor.rivet.json`',
  '18 shipping Core components',
  'exact resolved semantic dependency union: 55 token IDs',
  'deliberately **ratified**',
  'deliberately **adapted**',
  '`/flavors/rivet/`',
  '`rivet-theme.css`',
  'NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d',
  '`legacy.rivet.flavor-system`',
  '`knowledge-only-until-reviewed`',
  'MUST NOT introduce generic hover lift',
  'Rivet Dark follows as its own concrete Theme instance',
  'Public-proof promotion does not redeploy Pages',
  'Rivet Light is complete through public proof'
]) if (!docs.includes(marker)) fail(`Rivet public-proof docs missing marker: ${marker}`);

console.log('[rivet-contract] validated public-proof Rivet Light ownership, pinned provenance, 18/55 boundary, and no dark/renderer fork');
