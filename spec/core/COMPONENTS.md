# NeoSmartUI Core — Component Registry Contract v1

Core Components are generic UI capabilities that can be described accurately without naming a business domain.

The registry is an authority surface, not a marketing count. A component MUST NOT be listed as implemented or publicly proven until matching evidence exists in the same repository state.

## Admission law

A Core component MUST:

1. be business-domain-neutral;
2. have a stable `core.<name>` ID;
3. publish a machine-readable `neosmartui/component@1` contract;
4. declare all semantic-token dependencies;
5. define state semantics before visual implementation;
6. define keyboard, touch, RTL, reduced-motion, and forced-colors support expectations;
7. preserve permanent tactile laws where interactive;
8. avoid Flavor-specific values or Vertical business semantics;
9. expose honest maturity/proof status in the registry.

If a capability cannot satisfy these rules yet, it is a `REGISTRY GAP`, not permission to invent a local substitute.

## Registry maturity

The registry uses three explicit maturity states:

- `contract-only` — semantic/state/token contract exists; no implementation claim.
- `implemented` — a canonical implementation exists and is quality-validated.
- `public-proof` — the canonical implementation is represented by live/public proof derived from the same source.

Promotion between states requires evidence. Tooling MUST reject a maturity claim whose evidence is absent.

## Slice 1: `core.button`

`core.button` established the first Core path and exercises permanent press/release interaction laws. Its contract covers rest, hover, focus-visible, pressed, loading, and disabled states. Its current public proof is refreshed whenever the singleton development host advances to a newer exact-SHA Foundry deployment that still exercises the unchanged implementation.

## Slice 2: `core.checkbox`

`core.checkbox` adds a different reusable state problem without introducing a business domain: persistent checked/unchecked selection, indeterminate presentation, invalid state, and contact compression.

The contract was admitted before implementation. The canonical Web adapter is implemented through the same Rivet Light Theme-resolution path as `core.button`; public-proof maturity requires its own implementation blob binding plus the current exact-SHA browser, Pages, and live evidence cohort.

The checkbox contract keeps these boundaries explicit:

- checkbox semantics are distinct from field/label/help-text composition;
- checked, unchecked, and indeterminate state remain unambiguous after contact feedback ends;
- the visible box may be smaller than the effective target, but the usable target honors `size.control.minimum`;
- hover/contact compresses toward the surface and never creates generic lift;
- keyboard, touch, RTL, reduced motion, forced colors, invalid, and disabled states are first-class contract concerns.
