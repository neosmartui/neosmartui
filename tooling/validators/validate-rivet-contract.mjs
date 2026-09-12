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
const valuesMap = (bundle) => new Map(bundle.values.map((entry) => [entry.id, entry.value]));

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
if (theme.schema !== 'neosmartui/theme@1' || theme.name !== 'Rivet Light' || theme.family !== 'neosmartui' || theme.category !== 'rivet') fail('preexisting Rivet Light Theme identity is invalid');
if (theme.color?.mode !== 'light' || theme.geometry?.profile !== 'mechanical' || theme.border?.profile !== 'strong' || theme.shadow?.model !== 'coherent-depth') fail('preexisting Rivet Light expression descriptor drifted');
if (theme.motion?.model !== 'pressure-not-levitation' || theme.interaction?.model !== 'pressure-not-levitation' || theme.icons?.strategy !== 'adapter-owned') fail('preexisting Rivet Light interaction/adapter ownership drifted');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== 'flavor.rivet' || resolution.theme !== 'Rivet Light' || resolution.bundle !== 'tokens.json') fail('preexisting Rivet Light resolution identity is invalid');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== 'flavor.rivet' || bundle.theme !== 'Rivet Light') fail('preexisting Rivet Light bundle identity is invalid');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('preexisting Rivet Light baseline must preserve the exact 18-component scope');
if (bundle.values.length !== 55) fail(`preexisting Rivet Light baseline must preserve the exact 55-token dependency union; got ${bundle.values.length}`);
const values = valuesMap(bundle);
if (values.size !== 55) fail('preexisting Rivet Light token IDs must remain unique');
if (values.get('border.control.width') !== '3px' || values.get('border.surface.width') !== '3px') fail('contract slice must not silently mutate Rivet baseline structural borders');
if (values.get('radius.control') !== '6px' || values.get('radius.surface') !== '6px') fail('contract slice must not silently mutate Rivet baseline geometry');
for (const axis of ['x', 'y']) {
  if (values.get(`depth.rest.${axis}`) !== '5px' || values.get(`depth.hover.${axis}`) !== '3px' || values.get(`depth.active.${axis}`) !== '0px') fail(`contract slice must preserve Rivet baseline ${axis}-axis 5→3→0 depth`);
  if (values.get(`press.hover.${axis}`) !== '2px' || values.get(`press.active.${axis}`) !== '5px') fail(`contract slice must preserve Rivet baseline ${axis}-axis 0→2→5 travel`);
}
if (values.get('motion.press.duration') !== '80ms' || values.get('motion.release.duration') !== '140ms' || values.get('motion.standard.duration') !== '160ms') fail('contract slice must preserve Rivet baseline motion timing');
if (values.get('size.control.minimum') !== '44px' || values.get('focus.ring.width') !== '3px' || values.get('focus.ring.offset') !== '3px') fail('contract slice must preserve target/focus accessibility baseline');

for (const extension of ['css', 'mjs', 'js', 'tsx', 'jsx']) await expectAbsent(`packages/flavors/rivet/index.${extension}`, `contract-only Rivet migration must not add renderer override index.${extension}`);
await expectAbsent('packages/themes/rivet-dark', 'contract-only Rivet migration must not prematurely implement Rivet Dark');
await expectAbsent('apps/foundry/src/flavors/rivet/index.html', 'contract-only Rivet migration must not claim a dedicated Foundry route');
await expectAbsent('evidence/public/flavor.rivet.json', 'contract-only Rivet migration must not claim public proof');

const docs = await readFile(resolve(root, 'spec/flavors/RIVET.md'), 'utf8');
for (const marker of [
  'industrial/mechanical NeoSmartUI flavor',
  '`flavor.rivet`',
  'Official migration maturity: `contract-only`',
  '**preexisting foundation baseline**',
  '18 shipping Core components',
  'exact 55-token dependency union',
  'NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d',
  '`legacy.rivet.flavor-system`',
  '`knowledge-only-until-reviewed`',
  'MUST NOT introduce generic hover lift',
  'Rivet Dark follows as its own concrete Theme instance',
  'no Pages deployment'
]) if (!docs.includes(marker)) fail(`Rivet contract docs missing marker: ${marker}`);

console.log('[rivet-contract] validated official Rivet migration contract, pinned provenance, and unchanged preexisting 18/55 foundation baseline');
