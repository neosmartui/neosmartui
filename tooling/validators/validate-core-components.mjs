import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[core-components] ${message}`); };
const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const registryPath = resolve(root, 'packages/core/component-registry.json');
const registry = await readJson(registryPath);
const tokens = await readJson(resolve(root, 'spec/core/token-contracts.json'));
const tokenIds = new Set(tokens.contracts.map((entry) => entry.id));

if (registry.schema !== 'neosmartui/component-registry@1') fail('unexpected registry schema');
if (registry.domain !== 'core') fail('Core registry domain must be core');
if (!Array.isArray(registry.components) || registry.components.length !== 11) fail('eleventh Core slice must contain exactly eleven honest registry entries');

const ids = new Set();
for (const entry of registry.components) {
  if (!/^core\.[a-z][a-z0-9-]*$/.test(entry.id)) fail(`invalid Core component id ${entry.id}`);
  if (ids.has(entry.id)) fail(`duplicate component id ${entry.id}`);
  ids.add(entry.id);
  const contractPath = resolve(dirname(registryPath), entry.contract);
  await access(contractPath);
  const contract = await readJson(contractPath);
  if (contract.schema !== 'neosmartui/component@1') fail(`${entry.id} has wrong component schema`);
  if (contract.id !== entry.id || contract.domain !== 'core' || contract.layer !== 'component') fail(`${entry.id} identity mismatch`);
  if (/(commerce|saas|cart|product|checkout|plan|seat)/.test(JSON.stringify({id: contract.id, intent: contract.intent}))) fail(`${entry.id} leaked business-domain semantics into Core`);
  if (!Array.isArray(contract.dependencies)) fail(`${entry.id} dependencies must be an array`);
  for (const dependency of contract.dependencies) if (!tokenIds.has(dependency)) fail(`${entry.id} references unknown token ${dependency}`);
  for (const support of ['keyboard', 'touch', 'rtl', 'reducedMotion', 'forcedColors']) if (contract.supports[support] !== true) fail(`${entry.id} must declare ${support} support`);

  if (entry.maturity === 'contract-only') {
    if (entry.evidence.implementation !== null || entry.evidence.publicProof !== null) fail(`${entry.id} contract-only evidence must remain null`);
  } else {
    if (!entry.evidence.implementation) fail(`${entry.id} implementation claim lacks evidence`);
    await access(resolve(root, entry.evidence.implementation));
    if (entry.maturity === 'implemented' && entry.evidence.publicProof !== null) fail(`${entry.id} implemented maturity must not claim public proof`);
    if (entry.maturity === 'public-proof' && !entry.evidence.publicProof) fail(`${entry.id} public-proof claim lacks evidence`);
  }
}

const button = await readJson(resolve(root, 'packages/core/components/button.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'loading', 'disabled']) if (!button.states.includes(state)) fail(`core.button missing state ${state}`);
for (const token of ['depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'color.focus.ring']) if (!button.dependencies.includes(token)) fail(`core.button missing tactile token ${token}`);
const buttonDocs = await readFile(resolve(root, 'packages/core/components/button.md'), 'utf8');
for (const marker of ['real `<button>`', 'MUST NOT increase apparent elevation', 'Loading prevents duplicate activation', 'Reduced motion removes non-essential travel/rebound']) if (!buttonDocs.includes(marker)) fail(`button.md missing marker: ${marker}`);

const checkbox = await readJson(resolve(root, 'packages/core/components/checkbox.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'unchecked', 'checked', 'indeterminate', 'invalid', 'disabled']) if (!checkbox.states.includes(state)) fail(`core.checkbox missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.action.primary.surface', 'color.state.error', 'size.control.minimum', 'depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'color.focus.ring']) if (!checkbox.dependencies.includes(token)) fail(`core.checkbox missing semantic/tactile token ${token}`);
const checkboxEntry = registry.components.find((entry) => entry.id === 'core.checkbox');
if (!checkboxEntry || !['implemented', 'public-proof'].includes(checkboxEntry.maturity)) fail('core.checkbox must be at least implemented');
if (checkboxEntry.evidence.implementation !== 'packages/adapters/web/components/checkbox.mjs') fail('core.checkbox implementation evidence must bind the canonical Web adapter');
if (checkboxEntry.maturity === 'implemented' && checkboxEntry.evidence.publicProof !== null) fail('implemented core.checkbox must not claim public proof');
if (checkboxEntry.maturity === 'public-proof' && checkboxEntry.evidence.publicProof !== 'evidence/public/core.checkbox.json') fail('public-proof core.checkbox must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/checkbox.css'));
const checkboxDocs = await readFile(resolve(root, 'packages/core/components/checkbox.md'), 'utf8');
for (const marker of ['indeterminate', 'MUST NOT increase apparent elevation', 'effective interactive hit target MUST meet or exceed `size.control.minimum`', 'no legacy implementation code is copied']) if (!checkboxDocs.includes(marker)) fail(`checkbox.md missing marker: ${marker}`);

const input = await readJson(resolve(root, 'packages/core/components/input.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'empty', 'filled', 'invalid', 'read-only', 'disabled']) if (!input.states.includes(state)) fail(`core.input missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.content.primary', 'color.content.secondary', 'color.border.default', 'color.state.error', 'size.control.minimum', 'color.focus.ring', 'opacity.disabled', 'font.family.body', 'motion.standard.duration']) if (!input.dependencies.includes(token)) fail(`core.input missing semantic token ${token}`);
for (const forbidden of ['depth.rest.x', 'press.hover.x', 'press.active.x']) if (input.dependencies.includes(forbidden)) fail(`core.input must not depend on press-depth token ${forbidden}`);
const inputEntry = registry.components.find((entry) => entry.id === 'core.input');
if (!inputEntry || !['implemented', 'public-proof'].includes(inputEntry.maturity)) fail('core.input must be at least implemented');
if (inputEntry.evidence.implementation !== 'packages/adapters/web/components/input.mjs') fail('core.input implementation evidence must bind the canonical Web adapter');
if (inputEntry.maturity === 'implemented' && inputEntry.evidence.publicProof !== null) fail('implemented core.input must not claim public proof');
if (inputEntry.maturity === 'public-proof' && inputEntry.evidence.publicProof !== 'evidence/public/core.input.json') fail('public-proof core.input must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/input.css'));
const inputDocs = await readFile(resolve(root, 'packages/core/components/input.md'), 'utf8');
for (const marker of ['real native `<input>`', 'interactive, not pressable', 'placeholder MAY provide an example or hint, but MUST NOT substitute for an accessible name', 'Read-only and disabled are not interchangeable states', 'no legacy implementation code is copied']) if (!inputDocs.includes(marker)) fail(`input.md missing marker: ${marker}`);

const textarea = await readJson(resolve(root, 'packages/core/components/textarea.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'empty', 'filled', 'invalid', 'read-only', 'disabled']) if (!textarea.states.includes(state)) fail(`core.textarea missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.content.primary', 'color.content.secondary', 'color.border.default', 'color.state.error', 'size.control.minimum', 'color.focus.ring', 'opacity.disabled', 'font.family.body', 'motion.standard.duration']) if (!textarea.dependencies.includes(token)) fail(`core.textarea missing semantic token ${token}`);
for (const forbidden of ['depth.rest.x', 'press.hover.x', 'press.active.x']) if (textarea.dependencies.includes(forbidden)) fail(`core.textarea must not depend on press-depth token ${forbidden}`);
const textareaEntry = registry.components.find((entry) => entry.id === 'core.textarea');
if (!textareaEntry || textareaEntry.maturity !== 'public-proof') fail('core.textarea must be public-proof in this slice');
if (textareaEntry.evidence.implementation !== 'packages/adapters/web/components/textarea.mjs') fail('core.textarea implementation evidence must bind the canonical Web adapter');
if (textareaEntry.evidence.publicProof !== 'evidence/public/core.textarea.json') fail('public-proof core.textarea must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/textarea.css'));
const textareaAdapter = await readFile(resolve(root, 'packages/adapters/web/components/textarea.mjs'), 'utf8');
for (const marker of ['export function syncTextareaState', 'export function bindTextarea', "textarea.tagName !== 'TEXTAREA'", "textarea.value.length === 0 ? 'empty' : 'filled'", "textarea.addEventListener('input'", "textarea.addEventListener('change'"]) if (!textareaAdapter.includes(marker)) fail(`textarea.mjs missing implementation marker: ${marker}`);
const textareaDocs = await readFile(resolve(root, 'packages/core/components/textarea.md'), 'utf8');
for (const marker of ['real native `<textarea>`', 'interactive, not pressable', 'line breaks', 'Core MUST NOT globally disable resize', 'No textarea-specific Rivet implementation artifact is claimed', 'Maturity is `public-proof`']) if (!textareaDocs.includes(marker)) fail(`textarea.md missing marker: ${marker}`);

const select = await readJson(resolve(root, 'packages/core/components/select.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'selected', 'invalid', 'disabled']) if (!select.states.includes(state)) fail(`core.select missing state ${state}`);
for (const forbiddenState of ['open', 'read-only', 'loading']) if (select.states.includes(forbiddenState)) fail(`core.select must not invent unsupported state ${forbiddenState}`);
for (const token of ['color.surface.interactive', 'color.content.primary', 'color.content.secondary', 'color.border.default', 'color.border.strong', 'color.state.error', 'size.control.minimum', 'depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'color.focus.ring', 'opacity.disabled', 'font.family.body']) if (!select.dependencies.includes(token)) fail(`core.select missing semantic/tactile token ${token}`);
const selectEntry = registry.components.find((entry) => entry.id === 'core.select');
if (!selectEntry || selectEntry.maturity !== 'public-proof') fail('core.select must be public-proof in this slice');
if (selectEntry.evidence.implementation !== 'packages/adapters/web/components/select.mjs') fail('core.select implementation evidence must bind the canonical Web adapter');
if (selectEntry.evidence.publicProof !== 'evidence/public/core.select.json') fail('public-proof core.select must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/select.css'));
const selectAdapter = await readFile(resolve(root, 'packages/adapters/web/components/select.mjs'), 'utf8');
for (const marker of ['export function syncSelectState', 'export function bindSelect', "select.tagName !== 'SELECT'", 'select.multiple', 'select.size > 1', 'data', 'pointerdown', "select.addEventListener('change'"]) if (!selectAdapter.includes(marker)) fail(`select.mjs missing implementation marker: ${marker}`);
const selectDocs = await readFile(resolve(root, 'packages/core/components/select.md'), 'utf8');
for (const marker of ['real native single-select `<select>`', '`multiple` absent/false', 'contract intentionally does not invent a portable `open` state', 'collapsed single-select is a choice trigger', 'HTML has no native select `placeholder` attribute', 'No select-specific Rivet implementation artifact is claimed', 'Maturity is `public-proof`']) if (!selectDocs.includes(marker)) fail(`select.md missing marker: ${marker}`);

const card = await readJson(resolve(root, 'packages/core/components/card.json'));
if (card.states.length !== 1 || card.states[0] !== 'rest') fail('core.card informational contract must expose only rest state');
for (const forbiddenState of ['hover', 'focus-visible', 'pressed', 'selected', 'loading', 'disabled', 'invalid']) if (card.states.includes(forbiddenState)) fail(`core.card informational contract must not expose interactive state ${forbiddenState}`);
for (const token of ['color.surface.panel', 'color.content.primary', 'color.content.secondary', 'color.border.strong', 'space.surface.inline', 'space.surface.block', 'border.surface.width', 'radius.surface', 'depth.rest.x', 'depth.rest.y', 'font.family.body', 'font.size.body', 'font.weight.regular', 'font.weight.strong']) if (!card.dependencies.includes(token)) fail(`core.card missing surface/content token ${token}`);
for (const forbiddenToken of ['space.control.inline', 'space.control.block', 'border.control.width', 'radius.control', 'depth.hover.x', 'depth.hover.y', 'depth.active.x', 'depth.active.y', 'press.hover.x', 'press.hover.y', 'press.active.x', 'press.active.y', 'motion.press.duration', 'motion.release.duration', 'color.action.primary.surface', 'color.focus.ring', 'opacity.disabled']) if (card.dependencies.includes(forbiddenToken)) fail(`core.card informational contract must not borrow control/press token ${forbiddenToken}`);
const cardEntry = registry.components.find((entry) => entry.id === 'core.card');
if (!cardEntry || cardEntry.maturity !== 'public-proof') fail('core.card must be public-proof in this slice');
if (cardEntry.evidence.implementation !== 'packages/adapters/web/components/card.css') fail('core.card implementation evidence must bind the CSS-only Web implementation');
if (cardEntry.evidence.publicProof !== 'evidence/public/core.card.json') fail('public-proof core.card must bind its canonical proof record');
const cardCss = await readFile(resolve(root, 'packages/adapters/web/components/card.css'), 'utf8');
for (const marker of ['padding-block: var(--ns-space-surface-block)', 'padding-inline: var(--ns-space-surface-inline)', 'border: var(--ns-border-surface-width)', 'border-radius: var(--ns-radius-surface)', 'box-shadow: var(--ns-depth-rest-x) var(--ns-depth-rest-y)', 'transform: none', 'transition: none', '@media (forced-colors: active)']) if (!cardCss.includes(marker)) fail(`card.css missing static-surface marker: ${marker}`);
for (const forbiddenSelector of [':hover', ':active', ':focus', ':focus-visible']) if (cardCss.includes(forbiddenSelector)) fail(`card.css must not invent interactive selector ${forbiddenSelector}`);
const cardDocs = await readFile(resolve(root, 'packages/core/components/card.md'), 'utf8');
for (const marker of ['informational by default', 'MUST NOT become clickable', 'informational cards remain stable', 'intentionally CSS-only', 'MUST NOT borrow `border.control.width`, `radius.control`', 'no source code is copied', 'Maturity is `public-proof`']) if (!cardDocs.includes(marker)) fail(`card.md missing marker: ${marker}`);

const badge = await readJson(resolve(root, 'packages/core/components/badge.json'));
const badgeStates = new Set(['rest', 'neutral', 'info', 'success', 'warning', 'error']);
if (badge.states.length !== badgeStates.size || !badge.states.every((state) => badgeStates.has(state))) fail('core.badge must expose exactly rest plus neutral/info/success/warning/error tone states');
for (const token of ['color.surface.panel', 'color.content.primary', 'color.content.inverse', 'color.border.strong', 'color.state.info', 'color.state.success', 'color.state.warning', 'color.state.error', 'space.annotation.inline', 'space.annotation.block', 'border.annotation.width', 'radius.annotation', 'font.family.body', 'font.size.label', 'font.weight.emphasis']) if (!badge.dependencies.includes(token)) fail(`core.badge missing semantic annotation token ${token}`);
for (const forbiddenToken of ['space.control.inline', 'space.control.block', 'border.control.width', 'radius.control', 'size.control.minimum', 'space.surface.inline', 'space.surface.block', 'border.surface.width', 'radius.surface', 'depth.rest.x', 'depth.rest.y', 'depth.hover.x', 'depth.hover.y', 'depth.active.x', 'depth.active.y', 'press.hover.x', 'press.hover.y', 'press.active.x', 'press.active.y', 'motion.press.duration', 'motion.release.duration', 'motion.standard.duration', 'color.action.primary.surface', 'color.focus.ring', 'focus.ring.width', 'focus.ring.offset', 'opacity.disabled']) if (badge.dependencies.includes(forbiddenToken)) fail(`core.badge informational contract must not borrow control/surface/interaction token ${forbiddenToken}`);
const badgeEntry = registry.components.find((entry) => entry.id === 'core.badge');
if (!badgeEntry || badgeEntry.maturity !== 'public-proof') fail('core.badge must be public-proof in this slice');
if (badgeEntry.evidence.implementation !== 'packages/adapters/web/components/badge.css') fail('core.badge implementation evidence must bind the CSS-only Web implementation');
if (badgeEntry.evidence.publicProof !== 'evidence/public/core.badge.json') fail('public-proof core.badge must bind its canonical proof record');
const badgeCss = await readFile(resolve(root, 'packages/adapters/web/components/badge.css'), 'utf8');
for (const marker of ['padding-block: var(--ns-space-annotation-block)', 'padding-inline: var(--ns-space-annotation-inline)', 'border: var(--ns-border-annotation-width)', 'border-radius: var(--ns-radius-annotation)', 'background: var(--ns-color-state-info)', 'background: var(--ns-color-state-success)', 'background: var(--ns-color-state-warning)', 'background: var(--ns-color-state-error)', 'color: var(--ns-color-content-inverse)', 'box-shadow: none', 'transform: none', 'transition: none', 'white-space: normal', '@media (forced-colors: active)']) if (!badgeCss.includes(marker)) fail(`badge.css missing static-annotation marker: ${marker}`);
for (const forbiddenSelector of [':hover', ':active', ':focus', ':focus-visible']) if (badgeCss.includes(forbiddenSelector)) fail(`badge.css must not invent interactive selector ${forbiddenSelector}`);
const badgeDocs = await readFile(resolve(root, 'packages/core/components/badge.md'), 'utf8');
for (const marker of ['default Badge is non-interactive', '`role="status"` is also NOT the Badge default', 'Tone MUST NOT be the sole carrier of meaning', 'MUST NOT borrow `space.control.*`', 'default `span` host', 'intentionally CSS-only', 'no legacy implementation code is copied', 'Maturity is `public-proof`']) if (!badgeDocs.includes(marker)) fail(`badge.md missing marker: ${marker}`);

const alert = await readJson(resolve(root, 'packages/core/components/alert.json'));
const alertStates = new Set(['rest', 'neutral', 'info', 'success', 'warning', 'error']);
if (alert.states.length !== alertStates.size || !alert.states.every((state) => alertStates.has(state))) fail('core.alert must expose exactly rest plus neutral/info/success/warning/error message states');
for (const token of ['color.surface.panel', 'color.content.primary', 'color.content.secondary', 'color.border.strong', 'color.state.info', 'color.state.success', 'color.state.warning', 'color.state.error', 'space.surface.inline', 'space.surface.block', 'border.surface.width', 'radius.surface', 'depth.rest.x', 'depth.rest.y', 'font.family.body', 'font.size.body', 'font.weight.regular', 'font.weight.strong']) if (!alert.dependencies.includes(token)) fail(`core.alert missing semantic message/surface token ${token}`);
for (const forbiddenToken of ['space.control.inline', 'space.control.block', 'border.control.width', 'radius.control', 'size.control.minimum', 'space.annotation.inline', 'space.annotation.block', 'border.annotation.width', 'radius.annotation', 'depth.hover.x', 'depth.hover.y', 'depth.active.x', 'depth.active.y', 'press.hover.x', 'press.hover.y', 'press.active.x', 'press.active.y', 'motion.press.duration', 'motion.release.duration', 'motion.standard.duration', 'color.action.primary.surface', 'color.focus.ring', 'focus.ring.width', 'focus.ring.offset', 'opacity.disabled']) if (alert.dependencies.includes(forbiddenToken)) fail(`core.alert static message contract must not borrow control/annotation/interaction token ${forbiddenToken}`);
const alertEntry = registry.components.find((entry) => entry.id === 'core.alert');
if (!alertEntry || alertEntry.maturity !== 'public-proof') fail('core.alert must be public-proof in this slice');
if (alertEntry.evidence.implementation !== 'packages/adapters/web/components/alert.css') fail('core.alert implementation evidence must bind the CSS-only Web implementation');
if (alertEntry.evidence.publicProof !== 'evidence/public/core.alert.json') fail('public-proof core.alert must bind its canonical proof record');
const alertCss = await readFile(resolve(root, 'packages/adapters/web/components/alert.css'), 'utf8');
for (const marker of ['padding-block: var(--ns-space-surface-block)', 'padding-inline: var(--ns-space-surface-inline)', 'border: var(--ns-border-surface-width)', 'border-radius: var(--ns-radius-surface)', 'background: var(--ns-color-surface-panel)', 'box-shadow: var(--ns-depth-rest-x) var(--ns-depth-rest-y)', 'background: var(--ns-color-surface-panel)', '--ns-alert-tone: var(--ns-color-state-info)', '--ns-alert-tone: var(--ns-color-state-success)', '--ns-alert-tone: var(--ns-color-state-warning)', '--ns-alert-tone: var(--ns-color-state-error)', 'font-weight: var(--ns-font-weight-strong)', 'overflow-wrap: anywhere', 'transform: none', 'transition: none', '@media (forced-colors: active)']) if (!alertCss.includes(marker)) fail(`alert.css missing static-message marker: ${marker}`);
for (const forbiddenSelector of [':hover', ':active', ':focus', ':focus-visible']) if (alertCss.includes(forbiddenSelector)) fail(`alert.css must not invent interactive selector ${forbiddenSelector}`);
await access(resolve(root, 'packages/adapters/web/components/alert.css'));
try {
  await access(resolve(root, 'packages/adapters/web/components/alert.mjs'));
  fail('core.alert must remain CSS-only; alert.mjs must not exist');
} catch (error) {
  if (error?.message?.startsWith('[core-components]')) throw error;
  if (error?.code !== 'ENOENT') throw error;
}
const alertDocs = await readFile(resolve(root, 'packages/core/components/alert.md'), 'utf8');
for (const marker of ['default Alert is not a live region', '`role="alert"` is not a visual variant', 'MUST NOT make the whole surface clickable', 'A dismiss action is a separate button', 'Tone MUST NOT be the sole carrier of meaning', 'message surfaces remain stable', 'intentionally CSS-only', 'introduces no new token contracts and no new Rivet Light values', 'no legacy implementation code is copied', 'Maturity is `public-proof`']) if (!alertDocs.includes(marker)) fail(`alert.md missing marker: ${marker}`);

const radio = await readJson(resolve(root, 'packages/core/components/radio.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'unchecked', 'checked', 'invalid', 'disabled']) if (!radio.states.includes(state)) fail(`core.radio missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.action.primary.surface', 'color.state.error', 'size.control.minimum', 'depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'color.focus.ring']) if (!radio.dependencies.includes(token)) fail(`core.radio missing semantic/tactile token ${token}`);
const radioEntry = registry.components.find((entry) => entry.id === 'core.radio');
if (!radioEntry || radioEntry.maturity !== 'public-proof') fail('core.radio must be public-proof in this slice');
if (radioEntry.evidence.implementation !== 'packages/adapters/web/components/radio.mjs') fail('core.radio implementation evidence must bind the canonical Web adapter');
if (radioEntry.evidence.publicProof !== 'evidence/public/core.radio.json') fail('public-proof core.radio must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/radio.css'));
const radioDocs = await readFile(resolve(root, 'packages/core/components/radio.md'), 'utf8');
for (const marker of ['real native `<input type="radio">`', 'mutually-exclusive', 'MUST NOT emulate independent checkbox behavior', 'effective interactive hit target MUST meet or exceed `size.control.minimum`', 'no legacy implementation code is copied', 'No radio-specific Rivet implementation artifact is claimed']) if (!radioDocs.includes(marker)) fail(`radio.md missing marker: ${marker}`);

const switchContract = await readJson(resolve(root, 'packages/core/components/switch.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'off', 'on', 'invalid', 'disabled']) if (!switchContract.states.includes(state)) fail(`core.switch missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.action.primary.surface', 'color.action.primary.content', 'color.state.error', 'size.control.minimum', 'depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'motion.standard.duration', 'color.focus.ring']) if (!switchContract.dependencies.includes(token)) fail(`core.switch missing semantic/tactile token ${token}`);
const switchEntry = registry.components.find((entry) => entry.id === 'core.switch');
if (!switchEntry || switchEntry.maturity !== 'public-proof') fail('core.switch must be public-proof in this slice');
if (switchEntry.evidence.implementation !== 'packages/adapters/web/components/switch.mjs') fail('core.switch implementation evidence must bind the canonical Web adapter');
if (switchEntry.evidence.publicProof !== 'evidence/public/core.switch.json') fail('public-proof core.switch must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/switch.css'));
const switchDocs = await readFile(resolve(root, 'packages/core/components/switch.md'), 'utf8');
for (const marker of ['role="switch"', 'binary setting', 'MUST NOT expose an indeterminate state', 'thumb position and state color MUST resolve together', 'effective interactive hit target MUST meet or exceed `size.control.minimum`', 'real `<input type="checkbox">`', 'no legacy implementation code is copied', 'No switch-specific Rivet implementation artifact is claimed']) if (!switchDocs.includes(marker)) fail(`switch.md missing marker: ${marker}`);

const tabs = await readJson(resolve(root, 'packages/core/components/tabs.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'unselected', 'selected', 'disabled']) if (!tabs.states.includes(state)) fail(`core.tabs missing state ${state}`);
for (const token of ['color.surface.interactive', 'color.surface.panel', 'color.content.primary', 'color.border.strong', 'color.action.primary.surface', 'size.control.minimum', 'depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'motion.standard.duration', 'color.focus.ring', 'font.size.label', 'opacity.disabled']) if (!tabs.dependencies.includes(token)) fail(`core.tabs missing semantic/tactile token ${token}`);
const tabsEntry = registry.components.find((entry) => entry.id === 'core.tabs');
if (!tabsEntry || tabsEntry.maturity !== 'public-proof') fail('core.tabs must be public-proof in this slice');
if (tabsEntry.evidence.implementation !== 'packages/adapters/web/components/tabs.mjs') fail('core.tabs implementation evidence must bind the canonical Web adapter');
if (tabsEntry.evidence.publicProof !== 'evidence/public/core.tabs.json') fail('public-proof core.tabs must bind its canonical proof record');
await access(resolve(root, 'packages/adapters/web/components/tabs.css'));
const tabsAdapter = await readFile(resolve(root, 'packages/adapters/web/components/tabs.mjs'), 'utf8');
for (const marker of ['export function selectTab', 'export function bindTabs', "['automatic', 'manual']", 'aria-orientation', 'ArrowLeft', 'ArrowRight', "event.key === 'Home'", "event.key === 'End'", "event.key === ' ' || event.key === 'Enter'", 'aria-selected']) if (!tabsAdapter.includes(marker)) fail(`tabs.mjs missing implementation marker: ${marker}`);
const tabsDocs = await readFile(resolve(root, 'packages/core/components/tabs.md'), 'utf8');
for (const marker of ['role="tablist"', 'roving focus', 'Automatic activation', 'Manual activation', 'logical inline-end', 'MUST NOT increase apparent elevation', 'selected tab SHOULD feel seated/locked into its rail', 'no legacy implementation code is copied', 'No tabs-specific Rivet implementation artifact is claimed', 'Maturity is `public-proof`']) if (!tabsDocs.includes(marker)) fail(`tabs.md missing marker: ${marker}`);

console.log(`[core-components] validated ${registry.components.length} Core components with token/accessibility/evidence invariants`);
