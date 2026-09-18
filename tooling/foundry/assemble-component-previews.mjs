import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { assembleFoundryPreviewHtml, assembleFoundryPreviewStyles, loadComponentPreviews } from './component-preview-assembly.mjs';
const root = resolve(import.meta.dirname, '../..');
const output = resolve(root, 'dist/foundry');
const previews = await loadComponentPreviews(root);
const htmlPath = resolve(output, 'index.html');
const cssPath = resolve(output, 'styles.css');
const [htmlTemplate, cssTemplate, harnessBase, harnessResponsive] = await Promise.all([
  readFile(htmlPath, 'utf8'),
  readFile(cssPath, 'utf8'),
  readFile(resolve(root, 'packages/core/previews/harness.css'), 'utf8'),
  readFile(resolve(root, 'packages/core/previews/harness-responsive.css'), 'utf8')
]);
await writeFile(htmlPath, assembleFoundryPreviewHtml(htmlTemplate, previews));
await writeFile(cssPath, assembleFoundryPreviewStyles(cssTemplate, harnessBase, harnessResponsive));
console.log(`Assembled ${previews.length} shared Core previews into Foundry without renderer forks`);
