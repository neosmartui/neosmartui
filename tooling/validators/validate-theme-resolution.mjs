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
const sameSet = (actual, expected) => actual.length === expected.size && actual.every((value) => expected.has(value));

const contracts = await json('spec/core/token-contracts.json');
const registry = await json('packages/core/component-registry.json');
const flavor = await json('packages/flavors/rivet/flavor.json');
const theme = await json('packages/themes/rivet-light/theme.json');
const resolution = await json('packages/themes/rivet-light/resolution.json');
const bundle = await json('packages/themes/rivet-light/tokens.json');

if (flavor.schema !== 'neosmartui/flavor@1' || flavor.id !== 'flavor.rivet' || flavor.interactionModel !== 'pressure-not-levitation') fail('Rivet Flavor identity/interaction contract is invalid');
if (theme.schema !== 'neosmartui/theme@1' || theme.family !== 'neosmartui' || theme.name !== 'Rivet Light') fail('Rivet Light Theme identity is invalid');
if (resolution.schema !== 'neosmartui/theme-resolution@1' || resolution.flavor !== flavor.id || resolution.theme !== theme.name || resolution.bundle !== 'tokens.json') fail('Theme resolution does not bind the expected Flavor/Theme/bundle');
if (bundle.schema !== 'neosmartui/resolved-token-bundle@1' || bundle.flavor !== flavor.id || bundle.theme !== theme.name) fail('resolved token bundle identity mismatch');

const resolvedEntries = registry.components.filter((entry) => entry.maturity !== 'contract-only');
const expectedScope = new Set(resolvedEntries.map((entry) => entry.id));
if (!sameSet(resolution.scope, expectedScope) || !sameSet(bundle.scope, expectedScope)) fail('Theme resolution scope must exactly match implemented/public-proof Core components');

const requiredDependencies = new Set();
for (const entry of resolvedEntries) {
  const contract = await json(`packages/core/${entry.contract}`);
  for (const dependency of contract.dependencies) requiredDependencies.add(dependency);
  if (!entry.evidence.implementation) fail(`${entry.id} resolved component lacks implementation evidence`);
  await access(resolve(root, entry.evidence.implementation));
  const componentName = entry.id.slice('core.'.length);
  await access(resolve(root, `packages/adapters/web/components/${componentName}.css`));
}

const contractById = new Map(contracts.contracts.map((entry) => [entry.id, entry]));
const values = new Map();
for (const entry of bundle.values) {
  if (values.has(entry.id)) fail(`duplicate resolved token ${entry.id}`);
  const contract = contractById.get(entry.id);
  if (!contract) fail(`unknown resolved token ${entry.id}`);
  if (contract.type !== entry.type) fail(`type mismatch for ${entry.id}`);
  values.set(entry.id, entry.value);
}
for (const dependency of requiredDependencies) if (!values.has(dependency)) fail(`unresolved implemented-component token dependency ${dependency}`);
if (values.size !== requiredDependencies.size) fail('resolved bundle must be the exact union of implemented/public-proof Core component dependencies');

for (const axis of ['x', 'y']) {
  const rest = px(values.get(`depth.rest.${axis}`));
  const hover = px(values.get(`depth.hover.${axis}`));
  const active = px(values.get(`depth.active.${axis}`));
  const hoverPress = px(values.get(`press.hover.${axis}`));
  const activePress = px(values.get(`press.active.${axis}`));
  if (!(rest > hover && hover >= active && active >= 0)) fail(`depth.${axis} must compress monotonically toward the surface`);
  if (rest !== hover + hoverPress || rest !== active + activePress) fail(`depth/press ${axis} values must describe one coherent physical model`);
}
if (px(values.get('size.control.minimum')) < 44) fail('size.control.minimum must preserve the 44px minimum target in this Theme');

const buttonEntry = registry.components.find((entry) => entry.id === 'core.button');
if (!buttonEntry || buttonEntry.maturity !== 'public-proof' || !buttonEntry.evidence.publicProof) fail('core.button must retain public-proof maturity and evidence');
const checkboxEntry = registry.components.find((entry) => entry.id === 'core.checkbox');
if (!checkboxEntry || checkboxEntry.maturity !== 'public-proof' || checkboxEntry.evidence.publicProof !== 'evidence/public/core.checkbox.json') fail('core.checkbox must retain public-proof maturity and evidence');
const inputEntry = registry.components.find((entry) => entry.id === 'core.input');
if (!inputEntry || inputEntry.maturity !== 'public-proof' || inputEntry.evidence.publicProof !== 'evidence/public/core.input.json') fail('core.input must retain public-proof maturity and evidence');
const radioEntry = registry.components.find((entry) => entry.id === 'core.radio');
if (!radioEntry || radioEntry.maturity !== 'public-proof' || radioEntry.evidence.publicProof !== 'evidence/public/core.radio.json') fail('core.radio must bind current public-proof evidence');
if (radioEntry.evidence.implementation !== 'packages/adapters/web/components/radio.mjs') fail('core.radio must retain the canonical Web adapter');
const switchEntry = registry.components.find((entry) => entry.id === 'core.switch');
if (!switchEntry || switchEntry.maturity !== 'public-proof' || switchEntry.evidence.publicProof !== 'evidence/public/core.switch.json') fail('core.switch must bind current public-proof evidence');
if (switchEntry.evidence.implementation !== 'packages/adapters/web/components/switch.mjs') fail('core.switch must retain the canonical Web adapter');
const tabsEntry = registry.components.find((entry) => entry.id === 'core.tabs');
if (!tabsEntry || tabsEntry.maturity !== 'public-proof' || tabsEntry.evidence.publicProof !== 'evidence/public/core.tabs.json') fail('core.tabs must bind current public-proof evidence');
if (tabsEntry.evidence.implementation !== 'packages/adapters/web/components/tabs.mjs') fail('core.tabs must retain the canonical Web adapter');
const textareaEntry = registry.components.find((entry) => entry.id === 'core.textarea');
if (!textareaEntry || textareaEntry.maturity !== 'implemented') fail('core.textarea must be implemented in this slice');
if (textareaEntry.evidence.implementation !== 'packages/adapters/web/components/textarea.mjs') fail('core.textarea must bind the canonical Web adapter');
if (textareaEntry.evidence.publicProof !== null) fail('implemented core.textarea must not claim public proof before deployment verification');

const css = renderResolvedTokenCss(contracts, bundle);
for (const dependency of requiredDependencies) if (!css.includes(`--ns-${dependency.replaceAll('.', '-')}:`)) fail(`CSS adapter omitted ${dependency}`);
if (!css.includes('--ns-depth-hover-y: 3px;') || !css.includes('--ns-press-active-y: 5px;')) fail('generated CSS does not preserve expected pressure model');
if (!css.includes('--ns-motion-standard-duration: 160ms;') || !css.includes('--ns-font-size-body: 1rem;')) fail('generated CSS does not include the Rivet Light input/state typography roles');
if (!css.includes('--ns-color-surface-panel: #ffffff;')) fail('generated CSS does not include the evidence-backed Rivet Light panel surface role');
if (!css.includes('--ns-font-size-label: 1rem;')) fail('generated CSS does not include the evidence-backed Rivet Light label size role');
if (!css.includes('--ns-font-weight-emphasis: 750;')) fail('generated CSS does not include the evidence-backed Rivet Light emphasis weight role');

console.log(`[theme-resolution] validated ${flavor.id} + ${theme.name} for ${[...expectedScope].join(', ')}; exact dependency union=${requiredDependencies.size}`);
