const controllers = new WeakMap();

const fail = (message) => { throw new Error(`[core.tooltip] ${message}`); };

function describedTooltip(target, explicitTooltip) {
  if (!target || target.nodeType !== 1) fail('target must be an Element');
  if (explicitTooltip) return explicitTooltip;
  const ids = (target.getAttribute('aria-describedby') || '').trim().split(/\s+/).filter(Boolean);
  for (const id of ids) {
    const candidate = target.ownerDocument.getElementById(id);
    if (candidate?.getAttribute('role') === 'tooltip') return candidate;
  }
  fail('target must reference a role="tooltip" surface through aria-describedby');
}

function validateTooltip(target, tooltip) {
  if (!tooltip || tooltip.nodeType !== 1) fail('tooltip must be an Element');
  if (tooltip.getAttribute('role') !== 'tooltip') fail('tooltip surface must expose role="tooltip"');
  if (!tooltip.id) fail('tooltip surface must have an id');
  const describedBy = new Set((target.getAttribute('aria-describedby') || '').trim().split(/\s+/).filter(Boolean));
  if (!describedBy.has(tooltip.id)) fail('target aria-describedby must include the tooltip id');
  if (tooltip.tabIndex >= 0) fail('tooltip surface must not enter the tab order');
  if (tooltip.matches('button, a[href], input, select, textarea, [contenteditable="true"]') || tooltip.querySelector('button, a[href], input, select, textarea, [contenteditable="true"], [tabindex]:not([tabindex="-1"])')) {
    fail('tooltip content must remain non-interactive');
  }
}

export function syncTooltipState(target, state = 'closed', explicitTooltip) {
  const tooltip = describedTooltip(target, explicitTooltip);
  validateTooltip(target, tooltip);
  if (!['closed', 'open', 'dismissed'].includes(state)) fail(`unsupported state ${state}`);
  tooltip.dataset.state = state;
  target.dataset.tooltipState = state;
  return { target, tooltip, state };
}

export function bindTooltip(target, options = {}) {
  if (controllers.has(target)) return controllers.get(target);
  const tooltip = describedTooltip(target, options.tooltip);
  validateTooltip(target, tooltip);

  let targetHovered = false;
  let tooltipHovered = false;
  let targetFocused = target.ownerDocument.activeElement === target;
  let dismissed = false;
  let closeTimer = null;

  const clearCloseTimer = () => {
    if (closeTimer !== null) {
      target.ownerDocument.defaultView.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const setState = (state) => syncTooltipState(target, state, tooltip);
  const sessionActive = () => targetHovered || tooltipHovered || targetFocused;

  const reconcile = () => {
    clearCloseTimer();
    if (dismissed) {
      if (sessionActive()) setState('dismissed');
      else {
        dismissed = false;
        setState('closed');
      }
      return;
    }
    setState(sessionActive() ? 'open' : 'closed');
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer = target.ownerDocument.defaultView.setTimeout(reconcile, 80);
  };

  const onTargetPointerEnter = () => {
    targetHovered = true;
    clearCloseTimer();
    reconcile();
  };
  const onTargetPointerLeave = () => {
    targetHovered = false;
    scheduleClose();
  };
  const onTooltipPointerEnter = () => {
    tooltipHovered = true;
    clearCloseTimer();
    reconcile();
  };
  const onTooltipPointerLeave = () => {
    tooltipHovered = false;
    scheduleClose();
  };
  const onTargetFocus = () => {
    targetFocused = true;
    clearCloseTimer();
    reconcile();
  };
  const onTargetBlur = () => {
    targetFocused = false;
    scheduleClose();
  };
  const onDocumentKeyDown = (event) => {
    if (event.key !== 'Escape' || tooltip.dataset.state !== 'open') return;
    dismissed = true;
    clearCloseTimer();
    setState('dismissed');
  };

  target.addEventListener('pointerenter', onTargetPointerEnter);
  target.addEventListener('pointerleave', onTargetPointerLeave);
  target.addEventListener('focus', onTargetFocus);
  target.addEventListener('blur', onTargetBlur);
  tooltip.addEventListener('pointerenter', onTooltipPointerEnter);
  tooltip.addEventListener('pointerleave', onTooltipPointerLeave);
  target.ownerDocument.addEventListener('keydown', onDocumentKeyDown);
  setState(targetFocused ? 'open' : 'closed');

  const controller = {
    target,
    tooltip,
    dismiss() {
      if (!sessionActive()) return setState('closed');
      dismissed = true;
      clearCloseTimer();
      return setState('dismissed');
    },
    sync: reconcile,
    destroy() {
      clearCloseTimer();
      target.removeEventListener('pointerenter', onTargetPointerEnter);
      target.removeEventListener('pointerleave', onTargetPointerLeave);
      target.removeEventListener('focus', onTargetFocus);
      target.removeEventListener('blur', onTargetBlur);
      tooltip.removeEventListener('pointerenter', onTooltipPointerEnter);
      tooltip.removeEventListener('pointerleave', onTooltipPointerLeave);
      target.ownerDocument.removeEventListener('keydown', onDocumentKeyDown);
      controllers.delete(target);
      dismissed = false;
      setState('closed');
    }
  };

  controllers.set(target, controller);
  return controller;
}
