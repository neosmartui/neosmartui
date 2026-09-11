import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderResolvedTokenCss } from '../../packages/adapters/css/resolve-theme.mjs';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'apps/foundry/src');
const publicDir = resolve(root, 'apps/foundry/public');
const output = resolve(root, 'dist/foundry');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await cp(publicDir, output, { recursive: true });

const contracts = JSON.parse(await readFile(resolve(root, 'spec/core/token-contracts.json'), 'utf8'));
const bundle = JSON.parse(await readFile(resolve(root, 'packages/themes/rivet-light/tokens.json'), 'utf8'));
await writeFile(resolve(output, 'theme.css'), renderResolvedTokenCss(contracts, bundle));
await cp(resolve(root, 'packages/adapters/web/components/button.css'), resolve(output, 'button.css'));

console.log(`Built NeoSmartUI Foundry → ${output}`);
