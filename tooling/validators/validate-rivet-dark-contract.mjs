import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[rivet-dark-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const gitBlobSha = (buffer) => createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[rivet-dark-contract]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const canonical = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
if (!canonical.includes('Hardline\n\nSoft\n\nRivet\n\nMono\n\nlight/dark')) fail('Canonical v0.3 Flavor Engine no longer requires the official Flavor set followed by light/dark completion');

const inventory = await json('migration/inventory.json');
const source = inventory.sources.find((entry) => entry.repository === 'NeoBrutalRivet/NeoBrutal-Rivet');
if (!source) fail('pinned Rivet migration source is missing');
if (source.sha !== 'bb4b641d35bc77c958b7345a3b7c0a134c7d802d' || source.status !== 'snapshot-pinned') fail('Rivet source pin drifted');
if (source.copyPolicy !== 'knowledge-only-until-reviewed' || source.licenseEvidence?.status !== 'not-declared-in-repository-metadata') fail('Rivet source licensing/copy policy drifted');
const artifact = inventory.artifacts.find((entry) => entry.id === 'legacy.rivet.flavor-system');
if (!artifact || artifact.sourceRepository !== source.repository || artifact.decision !== 'ADAPT' || artifact.targetLayer !== 'flavor') fail('legacy.rivet.flavor-system must remain ADAPT → flavor knowledge evidence');

const flavor = await json('packages/flavors/rivet/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.rivet' || flavor.name !== 'Rivet') fail('Rivet Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Rivet Dark must preserve pressure-not-levitation');

const light = await json('packages/themes/rivet-light/theme.json');
const dark = await json('packages/themes/rivet-dark/theme.json');
if (light.schema !== 'neosmartui/theme@1' || light.name !== 'Rivet Light' || light.category !== 'rivet' || light.color?.mode !== 'light') fail('Rivet Light baseline identity drifted');
if (dark.schema !== 'neosmartui/theme@1' || dark.name !== 'Rivet Dark' || dark.family !== 'neosmartui' || dark.category !== 'rivet') fail('Rivet Dark Theme identity is invalid');
if (dark.color?.mode !== 'dark' || dark.color?.strategy !== 'industrial-lavender-lime-dark') fail('Rivet Dark must declare authored industrial dark color intent');
if (dark.typography?.strategy !== 'sturdy-system-first') fail('Rivet Dark must preserve sturdy system-first typography');
if (dark.geometry?.profile !== 'mechanical' || dark.border?.profile !== 'strong' || dark.shadow?.model !== 'coherent-depth') fail('Rivet Dark structural expression must preserve the mechanical Rivet profile');
if (dark.spacing?.density !== 'comfortable' || dark.density?.control !== 'comfortable') fail('Rivet Dark must preserve comfortable density');
if (dark.motion?.model !== 'pressure-not-levitation' || dark.interaction?.model !== 'pressure-not-levitation') fail('Rivet Dark must preserve pressure-not-levitation');
if (dark.icons?.strategy !== 'adapter-owned') fail('Rivet Dark must preserve adapter-owned icon ownership');

const resolution = await json('packages/themes/rivet-light/resolution.json');
const bundle = await json('packages/themes/rivet-light/tokens.json');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('Rivet Light baseline must retain the exact 18-component Core scope');
if (bundle.values.length !== 55 || new Set(bundle.values.map((entry) => entry.id)).size !== 55) fail('Rivet Light baseline must retain exactly 55 unique semantic dependencies');
const values = new Map(bundle.values.map((entry) => [entry.id, entry.value]));
if (values.get('border.control.width') !== '3px' || values.get('border.surface.width') !== '3px' || values.get('border.annotation.width') !== '2px') fail('Rivet Dark future implementation must preserve 3/3/2px structural boundaries');
if (values.get('radius.control') !== '6px' || values.get('radius.surface') !== '6px' || values.get('radius.annotation') !== '999px') fail('Rivet Dark future implementation must preserve 6/6/pill geometry');
for (const axis of ['x', 'y']) {
  if (values.get(`depth.rest.${axis}`) !== '5px' || values.get(`depth.hover.${axis}`) !== '3px' || values.get(`depth.active.${axis}`) !== '0px') fail(`Rivet ${axis}-axis structural depth must remain 5→3→0`);
  if (values.get(`press.hover.${axis}`) !== '2px' || values.get(`press.active.${axis}`) !== '5px') fail(`Rivet ${axis}-axis inward travel must remain 0→2→5`);
}
if (values.get('motion.press.duration') !== '80ms' || values.get('motion.release.duration') !== '140ms' || values.get('motion.standard.duration') !== '160ms') fail('Rivet Dark future implementation must preserve 80/140/160ms timings');
if (values.get('size.control.minimum') !== '44px') fail('Rivet Dark future implementation must preserve the 44px minimum target');
if (values.get('focus.ring.width') !== '3px' || values.get('focus.ring.offset') !== '3px') fail('Rivet Dark future implementation must preserve the 3px focus keyline width/offset');

for (const path of [
  'packages/themes/rivet-dark/resolution.json',
  'packages/themes/rivet-dark/tokens.json',
  'apps/foundry/fragments/rivet-dark.html',
  'tests/browser/foundry-rivet-dark.spec.mjs',
  'tooling/validators/validate-rivet-dark-theme.mjs',
  'tooling/foundry/assemble-rivet-dark.mjs'
]) await expectAbsent(path, `Rivet Dark contract-only stage must not include ${path}`);
await expectAbsent('packages/flavors/rivet-dark', 'Rivet Dark is a Theme of flavor.rivet, not a new Flavor identity');
await expectAbsent('apps/foundry/src/flavors/rivet-dark', 'Rivet Dark must extend the canonical Rivet Flavor route rather than create a route fork');

const proof = await json('evidence/public/flavor.rivet.json');
if (proof.flavor !== 'flavor.rivet') fail('existing Rivet public-proof subject drifted');
if (proof.implementationFiles.some((entry) => entry.path.includes('rivet-dark'))) fail('contract-only Rivet Dark must not claim public proof');
const provenRoute = proof.implementationFiles.find((entry) => entry.path === 'apps/foundry/src/flavors/rivet/index.html');
if (!provenRoute) fail('existing Rivet public proof must retain the canonical Light route source binding during Dark contract work');
const routeBytes = await readFile(resolve(root, provenRoute.path));
if (gitBlobSha(routeBytes) !== provenRoute.blobSha) fail('Rivet Dark contract work must not mutate the already-proven Rivet Light source route');

const buildScript = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8')).scripts['build:foundry'];
if (buildScript.includes('rivet-dark') || buildScript.includes('assemble-rivet-dark')) fail('Rivet Dark contract-only stage must not add runtime build assembly');
const builder = await readFile(resolve(root, 'tooling/foundry/build.mjs'), 'utf8');
if (builder.includes('rivet-dark')) fail('Rivet Dark contract-only stage must not add shared builder output');

const docs = await readFile(resolve(root, 'spec/flavors/RIVET.md'), 'utf8');
for (const marker of [
  'Rivet Dark contract maturity: `contract-only`',
  'second concrete Theme instance of `flavor.rivet`',
  'not CSS inversion, filter-based dark mode, or hidden conditional values inside Rivet Light',
  'exact shipping 18-Core / 55-token semantic dependency boundary',
  '`5px → 3px → 0px` structural depth',
  '`0px → 2px → 5px` inward travel',
  '`80ms / 140ms / 160ms` pressure timings',
  'existing `/flavors/rivet/` proof surface',
  'Concrete Dark palette values are intentionally deferred',
  'NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d',
  '`knowledge-only-until-reviewed`',
  'No Pages deployment occurs from the contract branch'
]) if (!docs.includes(marker)) fail(`Rivet Dark contract docs missing marker: ${marker}`);

console.log('[rivet-dark-contract] validated contract-only Rivet Dark ownership, pinned provenance, frozen Rivet physics, proof continuity, and implementation/runtime absences');
