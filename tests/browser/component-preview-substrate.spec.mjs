import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const json = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const moduleUrl = (source) => `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;

const registry = await json('packages/core/component-registry.json');
const runtimeUrl = moduleUrl(await readFile(resolve(root, 'packages/core/previews/runtime.mjs'), 'utf8'));
const previews = new Map();

for (const entry of registry.components) {
  const slug = entry.id.split('.')[1];
  const base = resolve(root, 'packages/core/previews', slug);
  const manifest = JSON.parse(await readFile(resolve(base, 'preview.json'), 'utf8'));
  const fixture = await readFile(resolve(base, 'fixture.html'), 'utf8');
  const controllerUrl = manifest.controller
    ? moduleUrl(await readFile(resolve(base, manifest.controller), 'utf8'))
    : null;
  const moduleUrls = {};
  for (const binding of manifest.renderers.web.bindings) {
    if (moduleUrls[binding.module]) continue;
    moduleUrls[binding.module] = moduleUrl(await readFile(resolve(root, binding.module), 'utf8'));
  }
  previews.set(entry.id, { manifest, fixture, controllerUrl, moduleUrls });
}

async function destroyMounted(page) {
  await page.evaluate(() => {
    try { window.__nsPreview?.mounted?.destroy?.(); } catch {}
    delete window.__nsPreview;
  }).catch(() => {});
}

async function mountState(page, preview) {
  await destroyMounted(page);
  await page.setContent(`<!doctype html><html><body><main id="preview-root">${preview.fixture}</main></body></html>`);
  await page.evaluate(async ({ manifest, runtimeUrl, moduleUrls, controllerUrl }) => {
    const runtime = await import(runtimeUrl);
    const root = document.querySelector('#preview-root');
    const mounted = await runtime.mountPreviewBindings({
      root,
      manifest,
      moduleResolver: (path) => {
        const url = moduleUrls[path];
        if (!url) throw new Error(`No preview module URL for ${path}`);
        return import(url);
      }
    });
    window.__nsPreview = { root, manifest, runtime, mounted, controllerUrl };
  }, {
    manifest: preview.manifest,
    runtimeUrl,
    moduleUrls: preview.moduleUrls,
    controllerUrl: preview.controllerUrl
  });
}

async function realizeNativeKeyboard(page, selector) {
  const locator = page.locator(selector);
  let focused = false;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    await page.keyboard.press('Tab');
    focused = await locator.evaluate((element) => document.activeElement === element);
    if (focused) break;
  }
  expect(focused, `keyboard focus did not reach ${selector}`).toBe(true);
  expect(await locator.evaluate((element) => element.matches(':focus-visible'))).toBe(true);
}

async function realizeNativePointer(page, selector, state) {
  const locator = page.locator(selector);
  await locator.hover();
  if (state === 'hover') {
    expect(await locator.evaluate((element) => element.matches(':hover'))).toBe(true);
    return;
  }
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  expect(await locator.evaluate((element) => element.matches(':active'))).toBe(true);
  await page.mouse.up();
}

async function realizeController(page, state) {
  await page.evaluate(async (state) => {
    const preview = window.__nsPreview;
    if (!preview?.controllerUrl) throw new Error(`Controller URL missing for ${preview?.manifest?.component ?? 'unknown'}`);
    const controller = await import(preview.controllerUrl);
    preview.runtime.applyPreviewController({
      root: preview.root,
      manifest: preview.manifest,
      state,
      controller,
      helpers: preview.mounted.helpers
    });
  }, state);
}

async function assertControllerPostcondition(page, component, state, target) {
  const passed = await page.evaluate(({ component, state, target }) => {
    const element = document.querySelector(target);
    const byId = (id) => document.getElementById(id);
    if (!element) return false;

    if (component === 'core.button') {
      if (state === 'loading') return element.dataset.loading === 'true' && element.getAttribute('aria-busy') === 'true' && element.getAttribute('aria-disabled') === 'true';
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.checkbox') {
      if (state === 'checked') return element.checked === true && element.dataset.state === 'checked';
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.input') {
      if (state === 'filled') return element.value.length > 0 && element.dataset.state === 'filled';
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'read-only') return element.readOnly === true;
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.radio') {
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.switch') {
      if (state === 'on') return element.checked === true && element.dataset.state === 'on';
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.textarea') {
      if (state === 'filled') return element.value.length > 0 && element.dataset.state === 'filled';
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'read-only') return element.readOnly === true;
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.select') {
      if (state === 'invalid') return element.getAttribute('aria-invalid') === 'true';
      if (state === 'disabled') return element.disabled === true;
    }
    if (component === 'core.tooltip') {
      if (state === 'open' || state === 'dismissed') return element.dataset.state === state;
    }
    if (component === 'core.combobox') {
      const root = byId('combobox-demo');
      const input = byId('combobox-input');
      if (state === 'open') return root.dataset.state === 'open' && input.getAttribute('aria-expanded') === 'true';
      if (state === 'query-filled') return root.dataset.queryState === 'query-filled' && input.value === 'Re';
      if (state === 'highlighted') return input.getAttribute('aria-activedescendant') === 'combobox-option-react' && byId('combobox-option-react').dataset.active === 'true';
      if (state === 'selected') return byId('combobox-option-react').getAttribute('aria-selected') === 'true' && root.dataset.selectionState === 'selected' && input.value === 'React';
      if (state === 'invalid') return input.getAttribute('aria-invalid') === 'true';
      if (state === 'disabled') return input.disabled === true && byId('combobox-trigger').disabled === true;
    }
    if (component === 'core.accordion' && state === 'open') {
      return element.getAttribute('aria-expanded') === 'true' && byId('accordion-single-panel-b').hidden === false;
    }
    return false;
  }, { component, state, target });
  expect(passed, `${component} controller postcondition failed for ${state}`).toBe(true);
}

async function assertFixturePostcondition(page, component, state, target) {
  const passed = await page.evaluate(({ component, state, target }) => {
    const element = document.querySelector(target);
    if (!element) return false;
    if (component === 'core.checkbox' && state === 'indeterminate') return element.indeterminate === true && element.dataset.state === 'indeterminate';
    if (component === 'core.checkbox' && state === 'unchecked') return element.checked === false && element.dataset.state === 'unchecked';
    if (component === 'core.input' && state === 'empty') return element.value === '' && element.dataset.state === 'empty';
    if (component === 'core.radio' && state === 'checked') return element.checked === true && element.dataset.state === 'checked';
    if (component === 'core.radio' && state === 'unchecked') return element.checked === false && element.dataset.state === 'unchecked';
    if (component === 'core.switch' && state === 'off') return element.checked === false && element.dataset.state === 'off';
    if (component === 'core.tabs' && state === 'selected') return element.getAttribute('aria-selected') === 'true';
    if (component === 'core.tabs' && state === 'unselected') return element.getAttribute('aria-selected') === 'false';
    if (component === 'core.tabs' && state === 'disabled') return element.disabled === true;
    if (component === 'core.textarea' && state === 'empty') return element.value === '' && element.dataset.state === 'empty';
    if (component === 'core.select' && state === 'selected') return element.dataset.state === 'selected';
    if (component === 'core.tooltip' && state === 'closed') return element.dataset.state === 'closed';
    if (component === 'core.combobox' && state === 'closed') return element.dataset.state === 'closed';
    if (component === 'core.combobox' && state === 'query-empty') return document.getElementById('combobox-demo').dataset.queryState === 'query-empty';
    if (component === 'core.accordion' && state === 'closed') return element.getAttribute('aria-expanded') === 'false';
    if (state === 'disabled' && 'disabled' in element) return element.disabled === true;
    if (state === 'current') return element.hasAttribute('aria-current');
    return true;
  }, { component, state, target });
  expect(passed, `${component} fixture postcondition failed for ${state}`).toBe(true);
}

for (const entry of registry.components) {
  test(`${entry.id} shared preview realizes every canonical state`, async ({ page }) => {
    const preview = previews.get(entry.id);
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    expect(Object.keys(preview.manifest.stateRealization)).toEqual((await json(`packages/core/${entry.contract}`)).states);

    for (const [state, realization] of Object.entries(preview.manifest.stateRealization)) {
      await mountState(page, preview);
      const target = page.locator(realization.target);
      await expect(target).toHaveCount(1);

      if (realization.mode === 'native-keyboard') {
        await realizeNativeKeyboard(page, realization.target);
      } else if (realization.mode === 'native-pointer') {
        await realizeNativePointer(page, realization.target, state);
      } else if (realization.mode === 'controller') {
        await realizeController(page, state);
        await assertControllerPostcondition(page, entry.id, state, realization.target);
      } else {
        await assertFixturePostcondition(page, entry.id, state, realization.target);
      }
    }

    await destroyMounted(page);
    expect(pageErrors).toEqual([]);
  });
}
