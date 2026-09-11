import { createHash } from 'node:crypto';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[public-proof] ${message}`); };
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const gitBlobSha = (buffer) => createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');

const registry = await readJson(resolve(root, 'packages/core/component-registry.json'));
const proven = registry.components.filter((entry) => entry.maturity === 'public-proof');
if (proven.length === 0) {
  console.log('[public-proof] no public-proof claims to validate');
  process.exit(0);
}

for (const entry of proven) {
  if (!entry.evidence.publicProof) fail(`${entry.id} is public-proof without an evidence record`);
  const proofPath = resolve(root, entry.evidence.publicProof);
  await access(proofPath);
  const proof = await readJson(proofPath);
  if (proof.schema !== 'neosmartui/public-proof@1') fail(`${entry.id} has unexpected proof schema`);
  if (proof.component !== entry.id) fail(`${entry.id} proof component mismatch`);
  if (proof.deployedSource.repository !== 'neosmartui/neosmartui' || !/^[0-9a-f]{40}$/.test(proof.deployedSource.sha)) fail(`${entry.id} has invalid deployed source`);
  if (proof.deployment.repository !== 'neosmartui/neosmartui.github.io') fail(`${entry.id} proof points to an unexpected deployment repository`);
  for (const field of ['commitSha', 'treeSha']) if (!/^[0-9a-f]{40}$/.test(proof.deployment[field])) fail(`${entry.id} has invalid deployment ${field}`);
  for (const field of ['runId', 'artifactId']) if (!Number.isInteger(proof.browserEvidence[field]) || proof.browserEvidence[field] < 1) fail(`${entry.id} has invalid browser evidence ${field}`);
  if (!Number.isInteger(proof.deployment.pagesRunId) || proof.deployment.pagesRunId < 1) fail(`${entry.id} has invalid Pages run id`);
  if (proof.live.pageUrl !== 'https://neosmartui.github.io/' || proof.live.deploymentRecordUrl !== 'https://neosmartui.github.io/deployment.json') fail(`${entry.id} must use the GitHub Pages HTTPS proof endpoints during development`);

  for (const file of proof.implementationFiles) {
    const path = resolve(root, file.path);
    const bytes = await readFile(path);
    const actual = gitBlobSha(bytes);
    if (actual !== file.blobSha) fail(`${entry.id} proof is stale for ${file.path}: expected ${file.blobSha}, got ${actual}`);
  }
}

console.log(`[public-proof] validated ${proven.length} structural proof record with implementation blob binding`);
