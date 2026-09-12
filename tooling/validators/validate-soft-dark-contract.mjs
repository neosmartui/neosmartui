import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[soft-dark-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const gitBlobSha = (buffer) => createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[soft-dark-contract]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const canonical = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
if (!canonical.includes('Hardline\n\nSoft\n\nRivet\n\nMono\n\nlight/dark')) fail('Canonical v0.3 Flavor Engine no longer requires the official Flavor set followed by light/dark completion');

const migration = await json('migration/inventory.json');
const softSource = migration.sources.find((entry) => entry.repository === 'NeoBrutalism-shop/NeoBrutal-Soft');
if (!softSource) fail('pinned Soft migration source is missing');
if (softSource.sha !== 'dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a') fail('Soft migration source SHA drifted');
if (softSource.status !== 'snapshot-pinned' || softSource.copyPolicy !== 'knowledge-only-until-reviewed') fail('Soft migration source must remain snapshot-pinned and knowledge-only-until-reviewed');
if (softSource.licenseEvidence?.status !== 'not-declared-in-repository-metadata') fail('Soft migration license-evidence boundary drifted');
const designDecision = migration.artifacts.find((entry) => entry.id === 'legacy.soft.design-language');
if (!designDecision || designDecision.sourceRepository !== 'NeoBrutalism-shop/NeoBrutal-Soft' || designDecision.sourcePath !== 'DESIGN.md' || designDecision.decision !== 'ADAPT' || designDecision.targetLayer !== 'flavor') fail('legacy.soft.design-language must remain ADAPT → flavor knowledge evidence');

const flavor = await json('packages/flavors/soft/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.soft' || flavor.name !== 'Soft') fail('Soft Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Soft Dark must preserve pressure-not-levitation');

const light = await json('packages/themes/soft-light/theme.json');
const dark = await json('packages/themes/soft-dark/theme.json');
if (light.schema !== 'neosmartui/theme@1' || light.name !== 'Soft Light' || light.category !== 'soft' || light.color?.mode !== 'light') fail('Soft Light baseline identity drifted');
if (dark.schema !== 'neosmartui/theme@1' || dark.name !== 'Soft Dark' || dark.family !== 'neosmartui' || dark.category !== 'soft') fail('Soft Dark Theme identity is invalid');
if (dark.color?.mode !== 'dark' || dark.color?.strategy !== 'warm-neutral-softened-blue-dark') fail('Soft Dark must declare an authored dark warm-neutral/softened-blue color strategy');
if (dark.typography?.strategy !== 'readable-system-first') fail('Soft Dark must preserve long-session readable system typography');
if (dark.geometry?.profile !== 'moderate-rounded' || dark.border?.profile !== 'visible-moderate' || dark.shadow?.model !== 'shallow-hard-depth') fail('Soft Dark structural expression must preserve the Soft profile');
if (dark.spacing?.density !== 'comfortable' || dark.density?.control !== 'comfortable') fail('Soft Dark must preserve comfortable application density');
if (dark.motion?.model !== 'pressure-not-levitation' || dark.motion?.intensity !== 'restrained') fail('Soft Dark must preserve restrained pressure motion');
if (dark.interaction?.model !== 'pressure-not-levitation' || dark.interaction?.selection !== 'seated') fail('Soft Dark must preserve pressure and seated selection');
if (dark.icons?.strategy !== 'adapter-owned') fail('Soft Dark must preserve adapter-owned icon ownership');

const resolution = await json('packages/themes/soft-light/resolution.json');
const bundle = await json('packages/themes/soft-light/tokens.json');
if (resolution.scope.length !== 18 || bundle.scope.length !== 18 || [...resolution.scope].sort().join('|') !== [...bundle.scope].sort().join('|')) fail('Soft Light baseline must retain the exact 18-component Core scope');
if (bundle.values.length !== 55 || new Set(bundle.values.map((entry) => entry.id)).size !== 55) fail('Soft Light baseline must retain exactly 55 unique semantic dependencies');
const values = new Map(bundle.values.map((entry) => [entry.id, entry.value]));
for (const axis of ['x', 'y']) {
  if (values.get(`depth.rest.${axis}`) !== '3px' || values.get(`depth.hover.${axis}`) !== '1.5px' || values.get(`depth.active.${axis}`) !== '0px') fail(`Soft ${axis}-axis structural depth must remain 3→1.5→0`);
  if (values.get(`press.hover.${axis}`) !== '1.5px' || values.get(`press.active.${axis}`) !== '3px') fail(`Soft ${axis}-axis inward travel must remain 0→1.5→3`);
}
if (values.get('border.control.width') !== '2px' || values.get('border.surface.width') !== '2px' || values.get('border.annotation.width') !== '2px') fail('Soft Dark future implementation must preserve 2px structural boundaries');
if (values.get('radius.control') !== '8px' || values.get('radius.surface') !== '12px' || values.get('radius.annotation') !== '999px') fail('Soft Dark future implementation must preserve 8/12/pill geometry');
if (values.get('motion.press.duration') !== '70ms' || values.get('motion.release.duration') !== '105ms' || values.get('motion.standard.duration') !== '165ms') fail('Soft Dark future implementation must preserve 70/105/165ms timings');
if (values.get('size.control.minimum') !== '44px') fail('Soft Dark future implementation must preserve the 44px minimum target');
if (values.get('focus.ring.width') !== '3px' || values.get('focus.ring.offset') !== '3px') fail('Soft Dark future implementation must preserve the 3px focus keyline width/offset');

for (const path of [
  'packages/themes/soft-dark/resolution.json',
  'packages/themes/soft-dark/tokens.json',
  'apps/foundry/fragments/soft-dark.html',
  'tests/browser/foundry-soft-dark.spec.mjs',
  'tooling/validators/validate-soft-dark-theme.mjs'
]) await expectAbsent(path, `Soft Dark contract-only stage must not include ${path}`);
await expectAbsent('packages/flavors/soft-dark', 'Soft Dark is a Theme of flavor.soft, not a new Flavor identity');
await expectAbsent('apps/foundry/src/flavors/soft-dark', 'Soft Dark must extend the canonical Soft Flavor route rather than create a route fork');

const proof = await json('evidence/public/flavor.soft.json');
if (proof.flavor !== 'flavor.soft') fail('existing Soft public-proof subject drifted');
if (proof.implementationFiles.some((entry) => entry.path.includes('soft-dark'))) fail('contract-only Soft Dark must not claim public proof');
const provenRoute = proof.implementationFiles.find((entry) => entry.path === 'apps/foundry/src/flavors/soft/index.html');
if (!provenRoute) fail('existing Soft public proof must retain the canonical Light route source binding during Dark contract work');
const routeBytes = await readFile(resolve(root, provenRoute.path));
if (gitBlobSha(routeBytes) !== provenRoute.blobSha) fail('Soft Dark contract work must not mutate the already-proven Soft Light source route');
const builder = await readFile(resolve(root, 'tooling/foundry/build.mjs'), 'utf8');
if (builder.includes('soft-dark')) fail('Soft Dark contract-only stage must not add runtime builder output');

const docs = await readFile(resolve(root, 'spec/flavors/SOFT.md'), 'utf8');
for (const marker of [
  'Soft Dark contract maturity: `contract-only`',
  'second concrete Theme instance of `flavor.soft`',
  'not CSS inversion, filter-based dark mode, or hidden conditional values inside Soft Light',
  'exact shipping 18-Core / 55-token semantic dependency boundary',
  '`3px → 1.5px → 0px` structural depth',
  '`0px → 1.5px → 3px` inward travel',
  '`70ms / 105ms / 165ms` pressure timings',
  'existing `/flavors/soft/` proof surface',
  'Concrete Dark palette values are intentionally deferred',
  '`knowledge-only-until-reviewed`',
  'No Pages deployment occurs from the contract branch'
]) if (!docs.includes(marker)) fail(`Soft Dark contract docs missing marker: ${marker}`);

console.log('[soft-dark-contract] validated contract-only Soft Dark ownership, pinned provenance, frozen Soft physics, proof continuity, and implementation/runtime absences');
