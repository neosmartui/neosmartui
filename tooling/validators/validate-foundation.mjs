import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const required = [
  'docs/CANONICAL-PRD.md',
  'docs/DEVELOPMENT-ROADMAP.md',
  'docs/FOUNDRY-DEPLOYMENT.md',
  'AGENTS.md',
  'LLMS.md',
  'README.md',
  'migration/inventory.json',
  'migration/inventory.schema.json',
  'apps/foundry/src/index.html',
  'apps/foundry/public/CNAME'
];
for (const file of required) await access(resolve(root, file));

const prd = await readFile(resolve(root, 'docs/CANONICAL-PRD.md'), 'utf8');
const requiredPrdMarkers = [
  '# NeoSmartUI',
  '## Canonical PRD, Architecture, Migration, Competitive Strategy & Execution Plan',
  '**Document version:** 0.3',
  '# 1. Executive decision',
  '# 40. Canonical monorepo',
  '# 69. Development roadmap',
  '# 99.1 Permanent GitHub and deployment rule',
  '# 101. Product promise',
  'Restart the architecture, not the knowledge.',
  'Source once. Demonstrate everywhere.'
];
for (const marker of requiredPrdMarkers) if (!prd.includes(marker)) throw new Error(`Canonical PRD is incomplete: missing marker ${marker}`);
if (prd.length < 50_000) throw new Error(`Canonical PRD appears truncated: ${prd.length} characters`);

const inventory = JSON.parse(await readFile(resolve(root, 'migration/inventory.json'), 'utf8'));
const expectedSources = new Map([
  ['NeoBrutalism-shop/spec', 'fbf499397f4e9a52d6e25c13921fd5377799c626'],
  ['NeoBrutalism-shop/NeoBrutal-Soft', 'dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a'],
  ['NeoBrutalism-shop/NeoBrutal-Commerce', '24563484a9993c6c994f24114dc7956d3b93f694'],
  ['NeoBrutalRivet/NeoBrutal-Rivet', 'bb4b641d35bc77c958b7345a3b7c0a134c7d802d']
]);
if (!Array.isArray(inventory.sources) || inventory.sources.length !== expectedSources.size) throw new Error('Migration inventory must pin exactly the four initial legacy sources in this foundation slice.');
for (const source of inventory.sources) {
  if (source.branch !== 'main' || source.sha !== expectedSources.get(source.repository)) throw new Error(`Unexpected legacy source pin: ${source.repository}@${source.sha}`);
}
if (!Array.isArray(inventory.artifacts) || inventory.artifacts.length !== 0) throw new Error('PR 01 must not pre-classify legacy artifacts before inventory tooling and destination contracts are established.');

const cname = (await readFile(resolve(root, 'apps/foundry/public/CNAME'), 'utf8')).trim();
if (cname !== 'neosmartui.com') throw new Error(`Unexpected Foundry CNAME: ${cname}`);

console.log('Foundation validation passed. Canonical PRD authority, legacy source pins, and Foundry baseline are present.');
