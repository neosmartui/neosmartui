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
if (!textareaEntry || textareaEntry.maturity !== 'public-proof' || textareaEntry.evidence.publicProof !== 'evidence/public/core.textarea.json') fail('core.textarea must bind current public-proof evidence');
if (textareaEntry.evidence.implementation !== 'packages/adapters/web/components/textarea.mjs') fail('core.textarea must retain the canonical Web adapter');
const selectEntry = registry.components.find((entry) => entry.id === 'core.select');
if (!selectEntry || selectEntry.maturity !== 'public-proof' || selectEntry.evidence.publicProof !== 'evidence/public/core.select.json') fail('core.select must bind current public-proof evidence');
if (selectEntry.evidence.implementation !== 'packages/adapters/web/components/select.mjs') fail('core.select must retain the canonical Web adapter');
const cardEntry = registry.components.find((entry) => entry.id === 'core.card');
if (!cardEntry || cardEntry.maturity !== 'public-proof' || cardEntry.evidence.publicProof !== 'evidence/public/core.card.json') fail('core.card must bind current public-proof evidence');
if (cardEntry.evidence.implementation !== 'packages/adapters/web/components/card.css') fail('core.card must bind its CSS-only implementation evidence');
const badgeEntry = registry.components.find((entry) => entry.id === 'core.badge');
if (!badgeEntry || badgeEntry.maturity !== 'implemented' || badgeEntry.evidence.publicProof !== null) fail('core.badge must be implemented without a public-proof claim in this slice');
if (badgeEntry.evidence.implementation !== 'packages/adapters/web/components/badge.css') fail('core.badge must bind its CSS-only implementation evidence');

if (values.get('space.surface.inline') !== '1rem' || values.get('space.surface.block') !== '1rem') fail('Rivet Light Card surface padding must resolve to the deliberate 1rem surface rhythm');
if (values.get('border.surface.width') !== '3px') fail('Rivet Light Card surface border must resolve to 3px');
if (values.get('radius.surface') !== '6px') fail('Rivet Light Card surface radius must resolve to 6px');
if (values.get('font.weight.strong') !== 800) fail('Rivet Light strong text weight must resolve to 800');
if (values.get('space.annotation.inline') !== '0.55rem' || values.get('space.annotation.block') !== '0.15rem') fail('Rivet Light Badge annotation padding must resolve to the pinned compact rhythm');
if (values.get('border.annotation.width') !== '2px') fail('Rivet Light Badge annotation border must resolve to 2px');
if (values.get('radius.annotation') !== '999px') fail('Rivet Light Badge annotation radius must resolve to a pill');
if (values.get('color.state.info') !== '#c9b7ff' || values.get('color.state.success') !== '#9be3bd' || values.get('color.state.warning') !== '#f4dc78') fail('Rivet Light Badge status palette must preserve pinned Soft evidence');
if (values.get('color.state.error') !== '#c1121f') fail('Badge implementation must not mutate the established NeoSmartUI error role');
if (values.get('color.content.inverse') !== '#ffffff') fail('Rivet Light inverse content must resolve to white for the dark error Badge surface');

const css = renderResolvedTokenCss(contracts, bundle);
for (const dependency of requiredDependencies) if (!css.includes(`--ns-${dependency.replaceAll('.', '-')}:`)) fail(`CSS adapter omitted ${dependency}`);
if (!css.includes('--ns-depth-hover-y: 3px;') || !css.includes('--ns-press-active-y: 5px;')) fail('generated CSS does not preserve expected pressure model');
if (!css.includes('--ns-motion-standard-duration: 160ms;') || !css.includes('--ns-font-size-body: 1rem;')) fail('generated CSS does not include the Rivet Light input/state typography roles');
if (!css.includes('--ns-color-surface-panel: #ffffff;')) fail('generated CSS does not include the evidence-backed Rivet Light panel surface role');
if (!css.includes('--ns-font-size-label: 1rem;')) fail('generated CSS does not include the evidence-backed Rivet Light label size role');
if (!css.includes('--ns-font-weight-emphasis: 750;')) fail('generated CSS does not include the evidence-backed Rivet Light emphasis weight role');
if (!css.includes('--ns-space-surface-inline: 1rem;') || !css.includes('--ns-space-surface-block: 1rem;')) fail('generated CSS does not include Card surface spacing roles');
if (!css.includes('--ns-border-surface-width: 3px;') || !css.includes('--ns-radius-surface: 6px;')) fail('generated CSS does not include Card surface geometry roles');
if (!css.includes('--ns-font-weight-strong: 800;')) fail('generated CSS does not include the Card strong typography role');
if (!css.includes('--ns-space-annotation-inline: 0.55rem;') || !css.includes('--ns-space-annotation-block: 0.15rem;')) fail('generated CSS does not include Badge annotation spacing roles');
if (!css.includes('--ns-border-annotation-width: 2px;') || !css.includes('--ns-radius-annotation: 999px;')) fail('generated CSS does not include Badge annotation geometry roles');
if (!css.includes('--ns-color-state-info: #c9b7ff;') || !css.includes('--ns-color-state-success: #9be3bd;') || !css.includes('--ns-color-state-warning: #f4dc78;')) fail('generated CSS does not include Badge status tone roles');
if (!css.includes('--ns-color-content-inverse: #ffffff;')) fail('generated CSS does not include Badge inverse foreground role');

console.log(`[theme-resolution] validated ${flavor.id} + ${theme.name} for ${[...expectedScope].join(', ')}; exact dependency union=${requiredDependencies.size}`);
