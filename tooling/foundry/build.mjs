import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const source = resolve(root, 'apps/foundry/src');
const publicDir = resolve(root, 'apps/foundry/public');
const output = resolve(root, 'dist/foundry');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await cp(publicDir, output, { recursive: true });

console.log(`Built NeoSmartUI Foundry → ${output}`);
