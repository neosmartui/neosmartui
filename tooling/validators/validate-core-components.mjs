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
if (!Array.isArray(registry.components) || registry.components.length !== 1) fail('first Core slice must contain exactly one honest registry entry');

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
  for (const dependency of contract.dependencies) if (!tokenIds.has(dependency)) fail(`${entry.id} references unknown token ${dependency}`);
  for (const support of ['keyboard', 'touch', 'rtl', 'reducedMotion', 'forcedColors']) if (contract.supports[support] !== true) fail(`${entry.id} must declare ${support} support`);

  if (entry.maturity === 'contract-only') {
    if (entry.evidence.implementation !== null || entry.evidence.publicProof !== null) fail(`${entry.id} contract-only evidence must remain null`);
  } else {
    if (!entry.evidence.implementation) fail(`${entry.id} implementation claim lacks evidence`);
    await access(resolve(root, entry.evidence.implementation));
    if (entry.maturity === 'public-proof' && !entry.evidence.publicProof) fail(`${entry.id} public-proof claim lacks evidence`);
  }
}

const button = await readJson(resolve(root, 'packages/core/components/button.json'));
for (const state of ['rest', 'hover', 'focus-visible', 'pressed', 'loading', 'disabled']) if (!button.states.includes(state)) fail(`core.button missing state ${state}`);
for (const token of ['depth.rest.x', 'depth.hover.x', 'depth.active.x', 'press.hover.x', 'press.active.x', 'motion.press.duration', 'motion.release.duration', 'color.focus.ring']) if (!button.dependencies.includes(token)) fail(`core.button missing tactile token ${token}`);

const docs = await readFile(resolve(root, 'packages/core/components/button.md'), 'utf8');
for (const marker of ['real `<button>`', 'MUST NOT increase apparent elevation', 'Loading prevents duplicate activation', 'Reduced motion removes non-essential travel/rebound']) if (!docs.includes(marker)) fail(`button.md missing marker: ${marker}`);

console.log(`[core-components] validated ${registry.components.length} contract-only Core component with token/accessibility invariants`);
