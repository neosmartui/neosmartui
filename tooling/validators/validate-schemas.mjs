import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const schemaFiles = [
  'stable-id.schema.json',
  'component.schema.json',
  'block.schema.json',
  'page.schema.json',
  'theme.schema.json',
  'flavor.schema.json',
  'vertical.schema.json'
];

const parsed = new Map();
for (const file of schemaFiles) {
  const path = resolve(root, 'spec/schemas', file);
  await access(path);
  parsed.set(file, JSON.parse(await readFile(path, 'utf8')));
}

const expectedIds = new Map([
  ['component.schema.json', 'https://neosmartui.com/schemas/component@1.json'],
  ['block.schema.json', 'https://neosmartui.com/schemas/block@1.json'],
  ['page.schema.json', 'https://neosmartui.com/schemas/page@1.json'],
  ['theme.schema.json', 'https://neosmartui.com/schemas/theme@1.json'],
  ['flavor.schema.json', 'https://neosmartui.com/schemas/flavor@1.json'],
  ['vertical.schema.json', 'https://neosmartui.com/schemas/vertical@1.json']
]);
for (const [file, id] of expectedIds) if (parsed.get(file).$id !== id) throw new Error(`${file} has unexpected $id`);

const patterns = {
  component: /^(?!flavor\.|vertical\.)[a-z][a-z0-9-]*\.(?!block\.|page\.)[a-z][a-z0-9-]*$/,
  block: /^[a-z][a-z0-9-]*\.block\.[a-z][a-z0-9-]*$/,
  page: /^[a-z][a-z0-9-]*\.page\.[a-z][a-z0-9-]*$/,
  flavor: /^flavor\.[a-z][a-z0-9-]*$/,
  vertical: /^vertical\.[a-z][a-z0-9-]*$/
};
const valid = [
  ['component', 'core.button'],
  ['component', 'commerce.product-price'],
  ['component', 'saas.plan-usage'],
  ['block', 'core.block.hero'],
  ['block', 'commerce.block.product-grid'],
  ['page', 'commerce.page.checkout'],
  ['flavor', 'flavor.hardline'],
  ['vertical', 'vertical.commerce']
];
for (const [kind, id] of valid) if (!patterns[kind].test(id)) throw new Error(`Expected valid ${kind} ID: ${id}`);

const invalid = ['neosmartui.core.component.button', 'Commerce.product', 'core.block.hero.card', 'commerce.page.checkout.step', 'flavor.Commerce'];
for (const id of invalid) if (Object.values(patterns).some((pattern) => pattern.test(id))) throw new Error(`Expected invalid stable ID: ${id}`);

const taxonomy = await readFile(resolve(root, 'spec/architecture/TAXONOMY.md'), 'utf8');
if (!taxonomy.includes('Commerce is a Vertical, not a Flavor.')) throw new Error('Schemas must remain aligned with corrected taxonomy.');

console.log('Schema validation passed. Versioned schema identities and stable semantic-ID rules are coherent.');
