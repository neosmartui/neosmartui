import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[component-preview-contract] ${message}`); };
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));

const schema = await json('spec/schemas/component-preview.schema.json');
if (schema.$id !== 'https://neosmartui.com/schemas/component-preview@1.json') fail('schema $id drifted');
if (schema.properties?.schema?.const !== 'neosmartui/component-preview@1') fail('schema identity drifted');
if (schema.additionalProperties !== false) fail('preview manifest must remain closed');

const required = ['schema','component','fixture','controller','fixtureComponents','defaultState','resetStrategy','stateRealization','renderers'];
if (schema.required?.join('|') !== required.join('|')) fail('required preview manifest fields/order drifted');
if (schema.properties.fixture?.const !== 'fixture.html') fail('fixture path must remain deterministic fixture.html');
if (schema.properties.resetStrategy?.const !== 'remount') fail('resetStrategy must remain remount');
if (schema.properties.controller?.anyOf?.[0]?.const !== 'controller.mjs' || schema.properties.controller?.anyOf?.[1]?.type !== 'null') fail('controller must remain controller.mjs or null');

const realization = schema.$defs?.stateRealization;
const expectedModes = ['fixture','native-pointer','native-keyboard','controller'];
if (realization?.properties?.mode?.enum?.join('|') !== expectedModes.join('|')) fail('state realization modes drifted');
if (realization?.additionalProperties !== false || realization?.required?.join('|') !== 'mode|target') fail('state realization must remain closed {mode,target}');

const selector = schema.$defs?.simpleSelector?.pattern;
if (selector !== '^(?:#[A-Za-z][A-Za-z0-9_-]*|\\.[A-Za-z][A-Za-z0-9_-]*)$') fail('v1 selector grammar must remain one simple #id or .class');

const binding = schema.$defs?.binding;
if (binding?.additionalProperties !== false || binding?.required?.join('|') !== 'module|export|selector') fail('web binding contract drifted');
if (binding?.properties?.options?.type !== 'object') fail('binding options must remain JSON-object data');
if (schema.$defs?.webRenderer?.properties?.styles?.uniqueItems !== true) fail('renderer styles must remain unique');

const componentSchema = await json('spec/schemas/component.schema.json');
if (componentSchema.properties?.schema?.const !== 'neosmartui/component@1') fail('canonical component schema identity drifted');
if (!componentSchema.required?.includes('states')) fail('canonical component contract must remain state authority');

for (const duplicateAuthority of ['states','dependencies','supports','maturity','tokens']) {
  if (Object.hasOwn(schema.properties, duplicateAuthority)) fail(`preview schema must not duplicate canonical ${duplicateAuthority} authority`);
}

const registry = await json('packages/core/component-registry.json');
if (registry.schema !== 'neosmartui/component-registry@1' || registry.domain !== 'core') fail('Core component registry authority drifted');
if (!Array.isArray(registry.components) || registry.components.length < 1) fail('Core registry must expose shipping components for preview discovery');

const docs = await readFile(resolve(root, 'spec/studio/STUDIO.md'), 'utf8');
for (const marker of [
  'neosmartui/component-preview@1',
  'resetStrategy: "remount"',
  'fixtureComponents',
  'native-pointer',
  'native-keyboard',
  'controller',
  'state-realization keys to exactly equal the selected component contract',
  'Repeated bindings are allowed.',
  'optional JSON-safe adapter binding options',
  'must not contain visual CSS'
]) if (!docs.includes(marker)) fail(`Studio docs missing preview law: ${marker}`);

console.log('[component-preview-contract] validated separate preview authority, deterministic remount, canonical-state ownership, simple selectors, composition, and shipping Web binding shape');
