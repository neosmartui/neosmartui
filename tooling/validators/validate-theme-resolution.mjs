import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderResolvedTokenCss } from '../../packages/adapters/css/resolve-theme.mjs';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[theme-resolution] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const px = (value) => {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value);
  if (!match) fail(`expected px dimension, got ${value}`);
  return Number(match[1]);
};

const contracts = await json('spec/core/token-contracts.json');
const button = await json('packages/core/components/button.json');
const registry = await json('packages/core/component-registry.json');
const flavor = await json('packages/flavors/rivet/flavor.json');
const theme = await json('packages/themes/rivet-light/theme.json');
const resolution = await json('packages/themes/rivet-light/resolution.json');
const bundle = await json('packages/themes/rivet-light/tokens.json');

if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.rivet' || flavor.interactionModel !== 'pressure-not-levitation') fail('Rivet Flavor identity/interaction contract is invalid');
if (theme.schema !== 'neosmartui/theme@1' || theme.family !== 'neosmartui' || theme.name !== 'Rivet Light') fail('Rivet Light Theme identity is invalid');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== flavor.id || resolution.theme !== theme.name || resolution.bundle !== 'tokens.json') fail('Theme resolution does not bind the expected Flavor/Theme/bundle');
if (!resolution.scope.includes('core.button') || !bundle.scope.includes('core.button')) fail('first resolution slice must explicitly scope core.button');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== flavor.id || bundle.theme !== theme.name) fail('resolved token bundle identity mismatch');

const contractById = new Map(contracts.contracts.map((entry) => [entry.id, entry]));
const values = new Map();
for (const entry of bundle.values) {
  if (values.has(entry.id)) fail(`duplicate resolved token ${entry.id}`);
  const contract = contractById.get(entry.id);
  if (!contract) fail(`unknown resolved token ${entry.id}`);
  if (contract.type !== entry.type) fail(`type mismatch for ${entry.id}`);
  values.set(entry.id, entry.value);
}
for (const dependency of button.dependencies) if (!values.has(dependency)) fail(`core.button unresolved token dependency ${dependency}`);
if (values.size !== button.dependencies.length) fail('first resolved bundle must be the exact core.button dependency slice; add broader theme coverage in a later registry-backed slice');

for (const axis of ['x', 'y']) {
  const rest = px(values.get(`depth.rest.${axis}`));
  const hover = px(values.get(`depth.hover.${axis}`));
  const active = px(values.get(`depth.active.${axis}`));
  const hoverPress = px(values.get(`press.hover.${axis}`));
  const activePress = px(values.get(`press.active.${axis}`));
  if (!(rest > hover && hover >= active && active >= 0)) fail(`depth.${axis} must compress monotonically toward the surface`);
  if (rest !== hover + hoverPress || rest !== active + activePress) fail(`depth/press ${axis} values must describe one coherent physical model`);
}
if (px(values.get('size.control.minimum')) < 44) fail('size.control.minimum must preserve the 44px minimum target in this first Theme');

const componentEntry = registry.components.find((entry) => entry.id === 'core.button');
if (!componentEntry || !['implemented', 'public-proof'].includes(componentEntry.maturity)) fail('resolved core.button must be at least implemented');
if (!componentEntry.evidence.implementation) fail('resolved core.button must retain implementation evidence');
if (componentEntry.maturity === 'implemented' && componentEntry.evidence.publicProof !== null) fail('implemented core.button must not claim public proof');
if (componentEntry.maturity === 'public-proof' && !componentEntry.evidence.publicProof) fail('public-proof core.button must point to proof evidence');
await access(resolve(root, componentEntry.evidence.implementation));
await access(resolve(root, 'packages/adapters/web/components/button.css'));

const css = renderResolvedTokenCss(contracts, bundle);
for (const dependency of button.dependencies) if (!css.includes(`--ns-${dependency.replaceAll('.', '-')}:`)) fail(`CSS adapter omitted ${dependency}`);
if (!css.includes('--ns-depth-hover-y: 3px;') || !css.includes('--ns-press-active-y: 5px;')) fail('generated CSS does not preserve expected pressure model');

console.log(`[theme-resolution] validated ${flavor.id} + ${theme.name} for ${button.id}; component maturity=${componentEntry.maturity}`);
