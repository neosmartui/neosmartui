import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[hardline-dark-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const expectAbsent = async (path, message) => {
  try {
    await access(resolve(root, path));
    fail(message);
  } catch (error) {
    if (error?.message?.startsWith('[hardline-dark-contract]')) throw error;
    if (error?.code !== 'ENOENT') throw error;
  }
};

const canonical = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
if (!canonical.includes('Hardline becomes the default NeoSmartUI personality.')) fail('Canonical PRD no longer identifies Hardline as the flagship/default Flavor');
if (!canonical.includes('Hardline\n\nSoft\n\nRivet\n\nMono\n\nlight/dark')) fail('Canonical v0.3 Flavor Engine no longer requires the official Flavor set followed by light/dark completion');

const flavor = await json('packages/flavors/hardline/flavor.json');
if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.hardline' || flavor.name !== 'Hardline') fail('Hardline Flavor identity is invalid');
if (flavor.interactionModel !== 'pressure-not-levitation') fail('Hardline Dark must preserve pressure-not-levitation');

const light = await json('packages/themes/hardline-light/theme.json');
const dark = await json('packages/themes/hardline-dark/theme.json');
if (light.schema !== 'neosmartui/theme@1' || light.name !== 'Hardline Light' || light.category !== 'hardline' || light.color?.mode !== 'light') fail('Hardline Light baseline identity drifted');
if (dark.schema !== 'neosmartui/theme@1' || dark.name !== 'Hardline Dark' || dark.family !== 'neosmartui' || dark.category !== 'hardline') fail('Hardline Dark Theme contract identity is invalid');
if (dark.color?.mode !== 'dark' || dark.color?.strategy !== 'high-reaction-dark') fail('Hardline Dark must declare an explicit dark high-reaction color strategy');
if (dark.typography?.strategy !== 'sharp-system-first') fail('Hardline Dark must preserve Hardline typography strategy');
if (dark.geometry?.profile !== 'square-zero-radius-default' || dark.border?.profile !== 'hard' || dark.shadow?.model !== 'strong-structural-depth') fail('Hardline Dark structural expression must preserve the flagship Hardline profile');
if (dark.spacing?.density !== 'compact' || dark.density?.control !== 'compact') fail('Hardline Dark must preserve compact Hardline density');
if (dark.motion?.model !== 'pressure-not-levitation' || dark.motion?.intensity !== 'restrained') fail('Hardline Dark must preserve restrained pressure motion');
if (dark.interaction?.model !== 'pressure-not-levitation' || dark.interaction?.selection !== 'seated') fail('Hardline Dark must preserve pressure and seated selection');
if (dark.icons?.strategy !== 'adapter-owned' || dark.icons?.treatment !== 'sharp') fail('Hardline Dark must preserve adapter-owned sharp icon treatment');

for (const path of [
  'packages/themes/hardline-dark/resolution.json',
  'packages/themes/hardline-dark/tokens.json',
  'apps/foundry/src/flavors/hardline-dark',
  'tests/browser/foundry-hardline-dark.spec.mjs'
]) await expectAbsent(path, `contract-only Hardline Dark must not implement ${path}`);

const proof = await json('evidence/public/flavor.hardline.json');
if (proof.flavor !== 'flavor.hardline') fail('existing Hardline public-proof subject drifted');
if (proof.implementationFiles.some((entry) => entry.path.includes('hardline-dark'))) fail('contract-only Hardline Dark must not alter the existing deployed Hardline proof binding');

const docs = await readFile(resolve(root, 'spec/flavors/HARDLINE.md'), 'utf8');
for (const marker of [
  'Contract-only dark Theme: `packages/themes/hardline-dark/theme.json`',
  'Hardline Dark contract maturity: `contract-only`',
  'second concrete Theme instance of `flavor.hardline`',
  'must not be implemented as CSS inversion, filter-based dark mode, or hidden conditional values inside Hardline Light',
  'same exact shipping 18-Core / 55-token semantic dependency boundary',
  '`4px → 2px → 0px` structural depth',
  '`0px → 2px → 4px` inward travel',
  '`70ms / 110ms / 170ms` pressure timings',
  'existing `/flavors/hardline/` proof surface',
  'Light and Dark together',
  'No Hardline Dark token bundle, generated CSS, browser test, route fork, or proof claim exists in this contract phase'
]) if (!docs.includes(marker)) fail(`Hardline Dark contract docs missing marker: ${marker}`);

console.log('[hardline-dark-contract] validated contract-only Hardline Dark as a separate Theme with unchanged flagship physics and no runtime/proof drift');
