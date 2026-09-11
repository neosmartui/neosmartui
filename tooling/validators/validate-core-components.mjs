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
if (!Array.isArray(registry.components) || registry.components.length !== 5) fail('fifth Core slice must contain exactly five honest registry entries');

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
if (!switchEntry || switchEntry.maturity !== 'contract-only') fail('core.switch must remain contract-only in this slice');
if (switchEntry.evidence.implementation !== null || switchEntry.evidence.publicProof !== null) fail('core.switch contract-only evidence must remain null');

const switchDocs = await readFile(resolve(root, 'packages/core/components/switch.md'), 'utf8');
for (const marker of ['role="switch"', 'binary setting', 'MUST NOT expose an indeterminate state', 'thumb position and state color MUST resolve together', 'effective interactive hit target MUST meet or exceed `size.control.minimum`', 'no legacy implementation code is copied', 'No switch-specific Rivet implementation artifact is claimed']) if (!switchDocs.includes(marker)) fail(`switch.md missing marker: ${marker}`);

console.log(`[core-components] validated ${registry.components.length} Core components with token/accessibility/evidence invariants`);
