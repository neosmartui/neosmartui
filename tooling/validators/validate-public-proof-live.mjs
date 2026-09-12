import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const registry = JSON.parse(await readFile(resolve(root, 'packages/core/component-registry.json'), 'utf8'));
const proven = registry.components.filter((entry) => entry.maturity === 'public-proof');

const liveMarkers = new Map([
  ['core.button', ['NeoSmartUI Foundry', 'core.button', 'Pressure, not levitation']],
  ['core.checkbox', ['NeoSmartUI Foundry', 'core.checkbox', 'Toggle tactile selection', 'Indeterminate presentation']],
  ['core.input', ['NeoSmartUI Foundry', 'core.input', 'Single-line native input', 'interactive, not pressable']],
  ['core.radio', ['NeoSmartUI Foundry', 'core.radio', 'Choose one native radio option', 'Alpha choice', 'Beta choice']],
  ['core.switch', ['NeoSmartUI Foundry', 'core.switch', 'Toggle immediate binary setting']],
  ['core.tabs', ['NeoSmartUI Foundry', 'core.tabs', 'Automatic horizontal activation', 'Manual vertical activation', 'Selected tabs stay seated in their rail']],
  ['core.textarea', ['NeoSmartUI Foundry', 'core.textarea', 'Multiline native textarea', 'interactive, not pressable', 'resize behavior']],
  ['core.select', ['NeoSmartUI Foundry', 'core.select', 'Native single-select choice', 'browser/OS option popup']],
  ['core.card', ['NeoSmartUI Foundry', 'core.card', 'Stable informational surface', 'Grouped content, not a disguised button.', 'Resting depth is structure, not hover affordance.']],
  ['core.badge', ['NeoSmartUI Foundry', 'core.badge', 'Badge tone examples', 'Neutral metadata', 'Info · Reference', 'Success · Ready', 'Warning · Needs attention', 'Error · Failed']],
  ['core.alert', ['NeoSmartUI Foundry', 'core.alert', 'Alert tone examples', 'Neutral · Note', 'Static message surface; no implicit live region.', 'Info · Update', 'Success · Complete', 'Warning · Check this', 'Error · Needs correction']],
  ['core.field', ['NeoSmartUI Foundry', 'core.field', 'Email address', 'This invite code has expired. Request a new code.', 'The disabled state belongs to the real control, not the Field container.']],
  ['core.breadcrumb', ['NeoSmartUI Foundry', 'core.breadcrumb', 'Ancestor locations stay native links', 'aria-current="page"']],
  ['core.pagination', ['NeoSmartUI Foundry', 'core.pagination', 'Pagination keeps page destinations as native links with 44px tactile targets.', 'aria-current="page"', 'aria-label="Next page"']],
  ['core.segmented-control', ['NeoSmartUI Foundry', 'core.segmented-control', 'View mode', 'Overview', 'Activity', 'History', 'normal Tab, Space, and Enter button behavior']]
]);

const fetchWithRetry = async (url, attempts = 6) => {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'cache-control': 'no-cache', 'user-agent': 'NeoSmartUI-Public-Proof/1' },
        signal: AbortSignal.timeout(10_000)
      });
      if (response.ok) return response;
      lastError = new Error(`${url} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) await new Promise((resolveDelay) => setTimeout(resolveDelay, 5_000));
  }
  throw new Error(`${url} live verification failed after ${attempts} attempts: ${lastError?.message || 'unknown error'}`);
};

for (const entry of proven) {
  const proof = JSON.parse(await readFile(resolve(root, entry.evidence.publicProof), 'utf8'));
  const recordResponse = await fetchWithRetry(proof.live.deploymentRecordUrl);
  const record = await recordResponse.json();
  if (record.schema !== 'neosmartui/deployment-record@1') throw new Error(`[public-proof-live] ${entry.id} live deployment schema mismatch`);
  if (record.sourceRepository !== proof.deployedSource.repository || record.sourceSha !== proof.deployedSource.sha || record.artifact !== 'foundry') throw new Error(`[public-proof-live] ${entry.id} live deployment record does not match proven source`);

  const markers = liveMarkers.get(entry.id);
  if (!markers) throw new Error(`[public-proof-live] ${entry.id} has no explicit live marker contract`);
  const pageResponse = await fetchWithRetry(proof.live.pageUrl);
  const html = await pageResponse.text();
  for (const marker of markers) if (!html.includes(marker)) throw new Error(`[public-proof-live] ${entry.id} live page missing ${marker}`);
  console.log(`[public-proof-live] ${entry.id} verified at ${pageResponse.url}; deployment record ${recordResponse.url} = ${record.sourceSha}`);
}
