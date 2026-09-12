const cssName = (id) => `--ns-${id.replaceAll('.', '-')}`;

export function serializeTokenValue(type, value) {
  if (type === 'cubicBezier') {
    if (!Array.isArray(value) || value.length !== 4 || value.some((part) => typeof part !== 'number')) throw new Error(`Invalid cubicBezier value: ${JSON.stringify(value)}`);
    return `cubic-bezier(${value.join(', ')})`;
  }
  if (typeof value === 'number' || typeof value === 'string') return String(value);
  throw new Error(`Unsupported ${type} token value: ${JSON.stringify(value)}`);
}

export function renderResolvedTokenCss(registry, bundle, { selector = ':root' } = {}) {
  if (typeof selector !== 'string' || !selector.trim()) throw new Error('Resolved token CSS selector must be a non-empty string');
  const contracts = new Map(registry.contracts.map((entry) => [entry.id, entry]));
  const seen = new Set();
  const lines = [`${selector.trim()} {`];
  for (const entry of bundle.values) {
    if (seen.has(entry.id)) throw new Error(`Duplicate resolved token: ${entry.id}`);
    seen.add(entry.id);
    const contract = contracts.get(entry.id);
    if (!contract) throw new Error(`Resolved bundle references unknown token: ${entry.id}`);
    if (contract.type !== entry.type) throw new Error(`Type mismatch for ${entry.id}: expected ${contract.type}, got ${entry.type}`);
    lines.push(`  ${cssName(entry.id)}: ${serializeTokenValue(entry.type, entry.value)};`);
  }
  lines.push('}', '');
  return lines.join('\n');
}
