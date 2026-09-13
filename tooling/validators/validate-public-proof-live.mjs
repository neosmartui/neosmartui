import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const registry = JSON.parse(await readFile(resolve(root, 'packages/core/component-registry.json'), 'utf8'));
const componentClaims = registry.components
  .filter((entry) => entry.maturity === 'public-proof')
  .map((entry) => ({ id: entry.id, proofPath: entry.evidence.publicProof }));
const flavorClaims = [];
for (const name of (await readdir(resolve(root, 'evidence/public'))).filter((name) => /^flavor\.[a-z][a-z0-9-]*\.json$/.test(name)).sort()) {
  const proofPath = `evidence/public/${name}`;
  const proof = JSON.parse(await readFile(resolve(root, proofPath), 'utf8'));
  flavorClaims.push({ id: proof.flavor, proofPath });
}
const claims = [...componentClaims, ...flavorClaims];

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
  ['core.segmented-control', ['NeoSmartUI Foundry', 'core.segmented-control', 'View mode', 'Overview', 'Activity', 'History', 'normal Tab, Space, and Enter button behavior']],
  ['core.tooltip', ['NeoSmartUI Foundry', 'core.tooltip', 'Tooltip keeps supplemental descriptions non-interactive', 'aria-describedby="tooltip-demo"', 'role="tooltip"', 'Read the permanent interaction rules', 'Continue without entering the tooltip']],
  ['core.combobox', ['NeoSmartUI Foundry', 'core.combobox', 'Editable single-selection Combobox', 'role="combobox"', 'aria-autocomplete="list"', 'aria-controls="combobox-listbox"', 'role="listbox"', 'Choose one framework', 'Show suggestions', 'Svelte · unavailable', 'No matching suggestions']],
  ['core.accordion', ['NeoSmartUI Foundry', 'core.accordion', 'Accordion discloses related content with real buttons', 'data-expansion="single"', 'data-expansion="multiple"', 'aria-controls="accordion-single-panel-a"']],
  ['flavor.hardline', [
    'Hardline Light',
    'ns-theme-hardline-light',
    'Pressure, not levitation',
    'Shared <code>core.button</code>',
    'Shared <code>core.input</code>',
    'hardline-dark-theme.css',
    'ns-theme-hardline-dark',
    'Hardline Dark',
    'Concrete Dark Theme',
    'Shared <code>core.button</code> · Dark',
    'Shared <code>core.input</code> · Dark'
  ]],
  ['flavor.mono', ['Mono Light', 'ns-theme-mono-light', 'Editorial pressure, shared semantics', 'Shared <code>core.button</code>', 'Shared <code>core.input</code>']],
  ['flavor.rivet', [
    'Rivet Light',
    'ns-theme-rivet-light',
    'Mechanical pressure, shared semantics',
    'Shared <code>core.button</code>',
    'Shared <code>core.input</code>',
    'rivet-dark-theme.css',
    'ns-theme-rivet-dark',
    'Rivet Dark',
    'Concrete Dark Theme',
    'Shared <code>core.button</code> · Dark',
    'Shared <code>core.input</code> · Dark',
    'Shared <code>core.card</code> · Dark',
    'Shared <code>core.badge</code> · Dark',
    'Written status labels remain authoritative'
  ]],
  ['flavor.soft', [
    'Soft Light',
    'ns-theme-soft-light',
    'Compress, never float',
    'Shared <code>core.button</code>',
    'Shared <code>core.input</code>',
    'soft-dark-theme.css',
    'ns-theme-soft-dark',
    'Soft Dark',
    'Concrete Dark Theme',
    'Shared <code>core.button</code> · Dark',
    'Shared <code>core.input</code> · Dark'
  ]]
]);

const assetMarkers = new Map([
  ['flavor.hardline', ['.ns-theme-hardline-light {', '--ns-radius-control: 0px;', '--ns-depth-rest-x: 4px;', '--ns-depth-hover-x: 2px;', '--ns-depth-active-x: 0px;', '--ns-press-active-x: 4px;', '--ns-motion-press-duration: 70ms;', '--ns-size-control-minimum: 44px;', '--ns-focus-ring-width: 3px;']],
  ['flavor.mono', ['.ns-theme-mono-light {', '--ns-border-control-width: 2px;', '--ns-radius-control: 0px;', '--ns-radius-annotation: 0px;', '--ns-depth-rest-x: 3px;', '--ns-depth-hover-x: 1px;', '--ns-depth-active-x: 0px;', '--ns-press-active-x: 3px;', '--ns-motion-press-duration: 65ms;', '--ns-size-control-minimum: 44px;', '--ns-focus-ring-width: 3px;', '--ns-color-action-primary-surface: #111111;', '--ns-font-family-body: ui-serif, Georgia, serif;']],
  ['flavor.rivet', ['.ns-theme-rivet-light {', '--ns-border-control-width: 3px;', '--ns-radius-control: 6px;', '--ns-depth-rest-x: 5px;', '--ns-depth-hover-x: 3px;', '--ns-depth-active-x: 0px;', '--ns-press-active-x: 5px;', '--ns-motion-press-duration: 80ms;', '--ns-size-control-minimum: 44px;', '--ns-focus-ring-width: 3px;', '--ns-color-action-primary-surface: #b9a1ed;']],
  ['flavor.soft', ['.ns-theme-soft-light {', '--ns-border-control-width: 2px;', '--ns-radius-control: 8px;', '--ns-radius-surface: 12px;', '--ns-depth-rest-x: 3px;', '--ns-depth-hover-x: 1.5px;', '--ns-depth-active-x: 0px;', '--ns-press-active-x: 3px;', '--ns-motion-press-duration: 70ms;', '--ns-size-control-minimum: 44px;', '--ns-focus-ring-width: 3px;']]
]);

const hardlineDarkAssetMarkers = [
  '.ns-theme-hardline-dark {',
  '--ns-color-surface-interactive: #141414;',
  '--ns-color-surface-panel: #1d1d1d;',
  '--ns-color-content-primary: #f5f5f5;',
  '--ns-color-action-primary-surface: #ffd84d;',
  '--ns-color-action-primary-content: #111111;',
  '--ns-radius-control: 0px;',
  '--ns-depth-rest-x: 4px;',
  '--ns-depth-hover-x: 2px;',
  '--ns-depth-active-x: 0px;',
  '--ns-press-active-x: 4px;',
  '--ns-motion-press-duration: 70ms;',
  '--ns-motion-release-duration: 110ms;',
  '--ns-motion-standard-duration: 170ms;',
  '--ns-size-control-minimum: 44px;',
  '--ns-color-focus-ring: #8fb3ff;',
  '--ns-focus-ring-width: 3px;',
  '--ns-focus-ring-offset: 3px;'
];

const rivetDarkAssetMarkers = [
  '.ns-theme-rivet-dark {',
  '--ns-color-surface-interactive: #18171c;',
  '--ns-color-surface-panel: #232129;',
  '--ns-color-content-primary: #f6f3fa;',
  '--ns-color-content-secondary: #c9c3d1;',
  '--ns-color-content-inverse: #211c2b;',
  '--ns-color-border-default: #aaa4b2;',
  '--ns-color-border-strong: #f5f1fa;',
  '--ns-color-action-primary-surface: #c7b5f2;',
  '--ns-color-action-primary-content: #211c2b;',
  '--ns-color-state-success: #9ed9b0;',
  '--ns-color-state-warning: #dff57a;',
  '--ns-color-state-error: #ef8a84;',
  '--ns-color-state-info: #bca8eb;',
  '--ns-border-control-width: 3px;',
  '--ns-border-surface-width: 3px;',
  '--ns-border-annotation-width: 2px;',
  '--ns-radius-control: 6px;',
  '--ns-radius-surface: 6px;',
  '--ns-radius-annotation: 999px;',
  '--ns-size-control-minimum: 44px;',
  '--ns-depth-rest-x: 5px;',
  '--ns-depth-rest-y: 5px;',
  '--ns-depth-hover-x: 3px;',
  '--ns-depth-hover-y: 3px;',
  '--ns-depth-active-x: 0px;',
  '--ns-depth-active-y: 0px;',
  '--ns-press-hover-x: 2px;',
  '--ns-press-hover-y: 2px;',
  '--ns-press-active-x: 5px;',
  '--ns-press-active-y: 5px;',
  '--ns-motion-press-duration: 80ms;',
  '--ns-motion-release-duration: 140ms;',
  '--ns-motion-standard-duration: 160ms;',
  '--ns-color-focus-ring: #cdbdf7;',
  '--ns-focus-ring-width: 3px;',
  '--ns-focus-ring-offset: 3px;'
];

const softDarkAssetMarkers = [
  '.ns-theme-soft-dark {',
  '--ns-color-surface-interactive: #1e1b19;',
  '--ns-color-surface-panel: #292522;',
  '--ns-color-content-primary: #f7f1e8;',
  '--ns-color-action-primary-surface: #8fb8f4;',
  '--ns-color-action-primary-content: #171513;',
  '--ns-border-control-width: 2px;',
  '--ns-radius-control: 8px;',
  '--ns-radius-surface: 12px;',
  '--ns-depth-rest-x: 3px;',
  '--ns-depth-hover-x: 1.5px;',
  '--ns-depth-active-x: 0px;',
  '--ns-press-active-x: 3px;',
  '--ns-motion-press-duration: 70ms;',
  '--ns-motion-release-duration: 105ms;',
  '--ns-motion-standard-duration: 165ms;',
  '--ns-size-control-minimum: 44px;',
  '--ns-color-focus-ring: #9ec4ff;',
  '--ns-focus-ring-width: 3px;',
  '--ns-focus-ring-offset: 3px;'
];

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

for (const claim of claims) {
  const proof = JSON.parse(await readFile(resolve(root, claim.proofPath), 'utf8'));
  const recordResponse = await fetchWithRetry(proof.live.deploymentRecordUrl);
  const record = await recordResponse.json();
  if (record.schema !== 'neosmartui/deployment-record@1') throw new Error(`[public-proof-live] ${claim.id} live deployment schema mismatch`);
  if (record.sourceRepository !== proof.deployedSource.repository || record.sourceSha !== proof.deployedSource.sha || record.artifact !== 'foundry') throw new Error(`[public-proof-live] ${claim.id} live deployment record does not match proven source`);

  const markers = liveMarkers.get(claim.id);
  if (!markers) throw new Error(`[public-proof-live] ${claim.id} has no explicit live marker contract`);
  const pageResponse = await fetchWithRetry(proof.live.pageUrl);
  const html = await pageResponse.text();
  for (const marker of markers) if (!html.includes(marker)) throw new Error(`[public-proof-live] ${claim.id} live page missing ${marker}`);

  for (const assetUrl of proof.live.assetUrls ?? []) {
    const assetResponse = await fetchWithRetry(assetUrl);
    const asset = await assetResponse.text();
    const markersForAsset =
      claim.id === 'flavor.hardline' && assetUrl === 'https://neosmartui.github.io/hardline-dark-theme.css'
        ? hardlineDarkAssetMarkers
        : claim.id === 'flavor.rivet' && assetUrl === 'https://neosmartui.github.io/rivet-dark-theme.css'
          ? rivetDarkAssetMarkers
          : claim.id === 'flavor.soft' && assetUrl === 'https://neosmartui.github.io/soft-dark-theme.css'
            ? softDarkAssetMarkers
            : assetMarkers.get(claim.id) ?? [];
    for (const marker of markersForAsset) if (!asset.includes(marker)) throw new Error(`[public-proof-live] ${claim.id} live asset ${assetUrl} missing ${marker}`);
  }
  console.log(`[public-proof-live] ${claim.id} verified at ${pageResponse.url}; deployment record ${recordResponse.url} = ${record.sourceSha}`);
}
