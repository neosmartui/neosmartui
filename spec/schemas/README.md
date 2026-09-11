# NeoSmartUI Schemas v1

These schemas define stable identity and minimum machine-readable contracts. They intentionally do not define concrete token values, component implementations, registry counts, or vertical business models.

## Schema identifiers

```text
neosmartui/component@1
neosmartui/block@1
neosmartui/page@1
neosmartui/theme@1
neosmartui/flavor@1
neosmartui/vertical@1
neosmartui/token-contracts@1
```

## Stable semantic IDs

IDs are lowercase ASCII and use kebab-case names.

```text
Component: <domain>.<name>
           core.button
           commerce.product-price
           saas.plan-usage

Block:     <domain>.block.<name>
           core.block.hero
           commerce.block.product-grid

Page:      <domain>.page.<name>
           commerce.page.checkout

Flavor:    flavor.<name>
           flavor.hardline

Vertical:  vertical.<name>
           vertical.commerce

Token:     <semantic-path>
           color.surface.canvas
           depth.hover.y
           motion.press.duration
```

`domain` is `core` or a Vertical domain prefix such as `commerce` or `saas`. Future Vertical prefixes remain extensible; schemas MUST NOT hardcode a closed list of business domains.

The ecosystem/schema name carries `neosmartui`; everyday semantic IDs stay short. Do not introduce verbose IDs such as `neosmartui.core.component.button`.

## Identity rules

- IDs MUST be stable once published.
- Rename/migration requires explicit provenance and replacement mapping.
- Component IDs MUST NOT contain `.block.` or `.page.`.
- Block IDs MUST contain `.block.` exactly once.
- Page IDs MUST contain `.page.` exactly once.
- Flavor IDs MUST use `flavor.`.
- Vertical manifest IDs MUST use `vertical.` while Vertical-owned capability IDs use the domain prefix directly.
- Core token paths MUST remain business-domain-neutral and value-free at the contract layer.
- Missing capability is `REGISTRY GAP`, never an invented ID.
