import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fail = (message) => { throw new Error(`[reduced-motion] ${message}`); };
const componentsDir = resolve(root, 'packages/adapters/web/components');

const mediaBlock = (css, marker) => {
  const start = css.indexOf(marker);
  if (start < 0) return null;
  const open = css.indexOf('{', start + marker.length);
  if (open < 0) return null;
  let depth = 0;
  for (let index = open; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(open + 1, index);
    }
  }
  return null;
};

const expectedCurrent = new Set([
  'accordion.css',
  'button.css',
  'checkbox.css',
  'combobox.css',
  'pagination.css',
  'radio.css',
  'segmented-control.css',
  'select.css',
  'switch.css',
  'tabs.css'
]);

const tactileFiles = [];
for (const name of (await readdir(componentsDir)).filter((entry) => entry.endsWith('.css')).sort()) {
  const css = await readFile(resolve(componentsDir, name), 'utf8');
  if (!css.includes('var(--ns-motion-press-duration)')) continue;
  tactileFiles.push(name);
  const reduced = mediaBlock(css, '@media (prefers-reduced-motion: reduce)');
  if (!reduced) fail(`${name} uses press-duration motion but has no reduced-motion override`);
  if (!reduced.includes('transition-duration: 1ms !important;')) fail(`${name} reduced-motion override must authoritatively keep tactile transition duration at 1ms`);
  if (reduced.includes('var(--ns-motion-press-duration)') || reduced.includes('var(--ns-motion-release-duration)')) fail(`${name} reduced-motion override must not restore Theme pressure timing`);
}

for (const name of expectedCurrent) if (!tactileFiles.includes(name)) fail(`expected current tactile adapter ${name} to remain covered by reduced-motion validation`);
if (tactileFiles.length < expectedCurrent.size) fail(`expected at least ${expectedCurrent.size} tactile adapters, got ${tactileFiles.length}`);

console.log(`[reduced-motion] validated authoritative <=1ms reduced-motion overrides for ${tactileFiles.length} press-duration adapters`);
