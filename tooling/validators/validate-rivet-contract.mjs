import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[rivet-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));

const inventory = await json('migration/inventory.json');
const source = inventory.sources.find((entry) => entry.repository === 'NeoBrutalRivet/NeoBrutal-Rivet');
if (!source) fail('pinned Rivet migration source is missing');
if (source.sha !== 'bb4b641d35bc77c958b7345a3b7c0a134c7d802d' || source.status !== 'snapshot-pinned') fail('Rivet source pin drifted');
if (source.copyPolicy !== 'knowledge-only-until-reviewed' || source.licenseEvidence?.status !== 'not-declared-in-repository-metadata') fail('Rivet source licensing/copy policy drifted');
const artifact = inventory.artifacts.find((entry) => entry.id === 'legacy.rivet.flavor-system');
if (!artifact || artifact.sourceRepository !== source.repository || artifact.decision !== 'ADAPT' || artifact.targetLayer !== 'flavor') fail('legacy.rivet.flavor-system migration decision is invalid');

const flavor = await json('packages/flavors/rivet/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.rivet' || flavor.name !== 'Rivet' || flavor.interactionModel !== 'pressure-not-levitation') fail('Rivet Flavor identity is invalid');
for (const marker of ['Industrial/mechanical', 'crisp structural depth', 'restrained rebound', 'seated selection']) if (!flavor.intent.includes(marker)) fail(`Rivet intent missing ${marker}`);

const lightTheme = await json('packages/themes/rivet-light/theme.json');
const lightResolution = await json('packages/themes/rivet-light/resolution.json');
const lightBundle = await json('packages/themes/rivet-light/tokens.json');
if (lightTheme.schema !== 'neosmartui/theme@1' || lightTheme.name !== 'Rivet Light' || lightTheme.category !== 'rivet') fail('Rivet Light Theme identity is invalid');
if (lightResolution.scope.length !== 18 || lightBundle.scope.length !== 18 || lightBundle.values.length !== 55 || new Set(lightBundle.values.map((entry) => entry.id)).size !== 55) fail('public-proof Rivet Light must preserve exact 18/55 resolution');

const darkTheme = await json('packages/themes/rivet-dark/theme.json');
const darkResolution = await json('packages/themes/rivet-dark/resolution.json');
const darkBundle = await json('packages/themes/rivet-dark/tokens.json');
if (darkTheme.schema !== 'neosmartui/theme@1' || darkTheme.name !== 'Rivet Dark' || darkTheme.family !== 'neosmartui' || darkTheme.category !== 'rivet') fail('Rivet Dark Theme identity is invalid');
if (darkTheme.color?.mode !== 'dark' || darkTheme.color?.strategy !== 'industrial-lavender-lime-dark') fail('Rivet Dark color intent drifted');
if (darkTheme.typography?.strategy !== 'sturdy-system-first' || darkTheme.geometry?.profile !== 'mechanical' || darkTheme.border?.profile !== 'strong' || darkTheme.shadow?.model !== 'coherent-depth') fail('Rivet Dark structural expression drifted');
if (darkTheme.motion?.model !== 'pressure-not-levitation' || darkTheme.interaction?.model !== 'pressure-not-levitation' || darkTheme.icons?.strategy !== 'adapter-owned') fail('Rivet Dark interaction/adapter ownership drifted');
if (darkResolution.schema !== 'neosmartui/theme-resolution@1' || darkResolution.flavor !== 'flavor.rivet' || darkResolution.theme !== 'Rivet Dark') fail('Rivet Dark resolution identity is invalid');
if (darkBundle.schema !== 'neosmartui/resolved-token-bundle@1' || darkBundle.flavor !== 'flavor.rivet' || darkBundle.theme !== 'Rivet Dark') fail('Rivet Dark bundle identity is invalid');
if (darkResolution.scope.length !== 18 || darkBundle.scope.length !== 18 || darkBundle.values.length !== 55 || new Set(darkBundle.values.map((entry) => entry.id)).size !== 55) fail('implemented Rivet Dark must preserve exact 18/55 resolution');

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) {
  try { await access(resolve(root, `packages/flavors/rivet/index.${extension}`)); fail(`Rivet must not introduce renderer override index.${extension}`); }
  catch (error) { if (error?.message?.startsWith('[rivet-contract]')) throw error; if (error?.code !== 'ENOENT') throw error; }
}
for (const path of ['apps/foundry/fragments/rivet-dark.html','tests/browser/foundry-rivet-dark.spec.mjs','tooling/validators/validate-rivet-dark-theme.mjs','tooling/foundry/assemble-rivet-dark.mjs']) await access(resolve(root, path));

const proof = await json('evidence/public/flavor.rivet.json');
if (proof.implementationFiles.some((entry) => entry.path.includes('rivet-dark') || entry.path === 'tooling/foundry/assemble-rivet-dark.mjs')) fail('implemented Rivet Dark must not mutate public proof before deployment/native verification');

const docs = await readFile(resolve(root, 'spec/flavors/RIVET.md'), 'utf8');
for (const marker of [
  'industrial/mechanical NeoSmartUI flavor', '`flavor.rivet`', 'Official migration maturity: `public-proof`',
  'Public-proof record: `evidence/public/flavor.rivet.json`', '18 shipping Core components',
  'exact resolved semantic dependency union: 55 token IDs', 'deliberately **ratified**', 'deliberately **adapted**',
  '`/flavors/rivet/`', '`rivet-theme.css`', 'NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d',
  '`legacy.rivet.flavor-system`', '`knowledge-only-until-reviewed`', 'MUST NOT introduce generic hover lift',
  'Rivet Dark follows as its own concrete Theme instance', 'Rivet Dark contract maturity: `contract-only`',
  'Rivet Dark implementation maturity: `implemented`', 'Rivet Dark public proof is not claimed yet',
  'Public-proof promotion does not redeploy Pages', 'Rivet Light is complete through public proof'
]) if (!docs.includes(marker)) fail(`Rivet public-proof/Dark-implementation docs missing marker: ${marker}`);

console.log('[rivet-contract] validated public-proof Rivet Light provenance/18-55 boundary plus implemented, not-yet-proven Rivet Dark');
