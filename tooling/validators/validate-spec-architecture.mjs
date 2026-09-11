import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const files = [
  'spec/architecture/FOUNDATIONS.md',
  'spec/architecture/TAXONOMY.md',
  'spec/architecture/DEPENDENCIES.md',
  'spec/architecture/PUBLIC-PROOF.md'
];
for (const file of files) await access(resolve(root, file));

const taxonomy = await readFile(resolve(root, 'spec/architecture/TAXONOMY.md'), 'utf8');
for (const marker of [
  'Commerce is a Vertical, not a Flavor.',
  'SaaS is a Vertical, not a Flavor.',
  'Hardline, Soft, Rivet, and Mono',
  '`REGISTRY GAP`'
]) if (!taxonomy.includes(marker)) throw new Error(`Taxonomy missing: ${marker}`);

const foundations = await readFile(resolve(root, 'spec/architecture/FOUNDATIONS.md'), 'utf8');
for (const marker of ['SPEC', 'CORE', 'COMPONENTS', 'BLOCKS', 'PAGES', 'APPLICATIONS', 'Core + Vertical + Flavor + Theme + Framework Adapter = Application UI']) {
  if (!foundations.includes(marker)) throw new Error(`Foundation architecture missing: ${marker}`);
}

const deps = await readFile(resolve(root, 'spec/architecture/DEPENDENCIES.md'), 'utf8');
if (!deps.includes('Core MUST NOT import a Vertical.')) throw new Error('Core/Vertical dependency boundary missing.');

const proof = await readFile(resolve(root, 'spec/architecture/PUBLIC-PROOF.md'), 'utf8');
if (!proof.includes('SOURCE ONCE. DEMONSTRATE EVERYWHERE.')) throw new Error('Public proof law missing.');

console.log('Spec architecture validation passed. Taxonomy, dependency direction, and public-proof laws are explicit.');
