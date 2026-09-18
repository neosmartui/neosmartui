import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[mono-dark-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const expectAbsent = async (path, message) => {
  try { await access(resolve(root, path)); fail(message); }
  catch (error) { if (error?.message?.startsWith('[mono-dark-contract]')) throw error; if (error?.code !== 'ENOENT') throw error; }
};

const canonical = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
if (!canonical.includes('Hardline\n\nSoft\n\nRivet\n\nMono\n\nlight/dark')) fail('Canonical v0.3 Flavor Engine no longer requires the official Flavor set followed by light/dark completion');

const inventory = await json('migration/inventory.json');
const family = inventory.sources.find((entry) => entry.repository === 'NeoBrutalism-shop/spec');
if (!family || family.sha !== 'fbf499397f4e9a52d6e25c13921fd5377799c626' || family.status !== 'snapshot-pinned') fail('pinned family-spec authority drifted');
if (family.copyPolicy !== 'knowledge-only-until-reviewed' || !family.evidencePaths?.includes('FLAVORS.md')) fail('family Flavor-law provenance boundary drifted');
if (inventory.sources.some((entry) => /mono/i.test(entry.repository) || /mono/i.test(entry.legacyRole ?? ''))) fail('Mono Dark must not invent a dedicated legacy Mono source');
if (inventory.artifacts.some((entry) => /^legacy\.mono\./.test(entry.id))) fail('Mono Dark must not invent legacy Mono artifacts');

const flavor = await json('packages/flavors/mono/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.mono' || flavor.name !== 'Mono') fail('Mono Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Mono Dark must remain pressure-not-levitation');

const light = await json('packages/themes/mono-light/theme.json');
const dark = await json('packages/themes/mono-dark/theme.json');
if (light.schema !== 'neosmartui/theme@1' || light.name !== 'Mono Light' || light.category !== 'mono' || light.color?.mode !== 'light') fail('Mono Light baseline identity drifted');
if (dark.schema !== 'neosmartui/theme@1' || dark.name !== 'Mono Dark' || dark.family !== 'neosmartui' || dark.category !== 'mono') fail('Mono Dark Theme identity is invalid');
if (dark.color?.mode !== 'dark' || dark.color?.strategy !== 'editorial-monochrome-dark') fail('Mono Dark must declare authored editorial monochrome dark intent');
for (const key of ['typography','geometry','border','shadow','spacing','density','motion','interaction','icons']) {
  if (JSON.stringify(dark[key]) !== JSON.stringify(light[key])) fail(`Mono Dark must preserve Mono Light non-color descriptor structure at ${key}`);
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
]) await expectAbsent(path, `contract-only Mono Dark must not add ${path}`);

const packageJson = await json('package.json');
const expectedBuild = 'node tooling/foundry/build.mjs && node tooling/foundry/assemble-soft-dark.mjs && node tooling/foundry/assemble-rivet-dark.mjs';
if (packageJson.scripts?.['build:foundry'] !== expectedBuild) fail('Mono Dark contract must not change the existing Foundry build chain');
if (packageJson.scripts?.['validate:mono-dark-contract'] !== 'node tooling/validators/validate-mono-dark-contract.mjs') fail('Mono Dark contract validator must be wired explicitly');

const builder = await readFile(resolve(root, 'tooling/foundry/build.mjs'), 'utf8');
if (builder.includes('mono-dark')) fail('Mono Dark contract must not mutate the shared proven builder');

const docs = await readFile(resolve(root, 'spec/flavors/MONO.md'), 'utf8');
for (const marker of [
  'Mono Dark contract maturity: `contract-only`',
  'second concrete Theme instance of the existing `flavor.mono` identity',
  'authored color strategy: `editorial-monochrome-dark`',
  'concrete resolved palette values are intentionally deferred to implementation',
  'the existing `build:foundry` chain remains unchanged during the contract stage',
  'No separate Mono Dark Flavor identity or route',
  'No Pages deployment from the contract-only slice',
  'Mono Light is complete through public proof; Mono Dark is contract-only'
]) if (!docs.includes(marker)) fail(`Mono Dark contract docs missing marker: ${marker}`);

console.log('[mono-dark-contract] validated descriptor-only Mono Dark as the second Theme of flavor.mono with unchanged build/runtime/proof boundaries');
