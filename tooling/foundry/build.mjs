import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderResolvedTokenCss } from '../../packages/adapters/css/resolve-theme.mjs';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'apps/foundry/src');
const publicDir = resolve(root, 'apps/foundry/public');
const output = resolve(root, 'dist/foundry');
const sourceSha = process.env.NEOSMARTUI_SOURCE_SHA || process.env.GITHUB_SHA || 'local-unpinned';

if (sourceSha !== 'local-unpinned' && !/^[0-9a-f]{40}$/.test(sourceSha)) throw new Error(`Invalid source SHA: ${sourceSha}`);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
try {
  await access(publicDir);
  await cp(publicDir, output, { recursive: true });
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const contracts = JSON.parse(await readFile(resolve(root, 'spec/core/token-contracts.json'), 'utf8'));
const rivetBundle = JSON.parse(await readFile(resolve(root, 'packages/themes/rivet-light/tokens.json'), 'utf8'));
const hardlineBundle = JSON.parse(await readFile(resolve(root, 'packages/themes/hardline-light/tokens.json'), 'utf8'));
await writeFile(resolve(output, 'theme.css'), renderResolvedTokenCss(contracts, rivetBundle));
await writeFile(resolve(output, 'hardline-theme.css'), renderResolvedTokenCss(contracts, hardlineBundle, { selector: '.ns-theme-hardline-light' }));
for (const file of ['button.css', 'checkbox.css', 'checkbox.mjs', 'input.css', 'input.mjs', 'radio.css', 'radio.mjs', 'switch.css', 'switch.mjs', 'tabs.css', 'tabs.mjs', 'textarea.css', 'textarea.mjs', 'select.css', 'select.mjs', 'card.css', 'badge.css', 'alert.css', 'field.css', 'breadcrumb.css', 'pagination.css', 'segmented-control.css', 'segmented-control.mjs', 'tooltip.css', 'tooltip.mjs', 'combobox.css', 'combobox.mjs', 'accordion.css', 'accordion.mjs']) {
  await cp(resolve(root, 'packages/adapters/web/components', file), resolve(output, file));
}
await writeFile(resolve(output, 'deployment.json'), `${JSON.stringify({
  schema: 'neosmartui/deployment-record@1',
  sourceRepository: 'neosmartui/neosmartui',
  sourceSha,
  artifact: 'foundry'
}, null, 2)}\n`);

console.log(`Built NeoSmartUI Foundry → ${output} (${sourceSha})`);
