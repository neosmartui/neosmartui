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

`core.checkbox` adds persistent checked/unchecked selection, indeterminate presentation, invalid state, and contact compression without introducing a business domain. Its native Web implementation and public proof exercise a 44px effective target plus pressure-not-levitation state feedback.

## Slice 3: `core.input`

`core.input` adds generic single-line text-like data entry with a canonical native Web implementation and live public proof. It exercises a different interaction class: the control is interactive but not pressable.

The implementation preserves native editing and selection while synchronizing only agent-readable empty/filled state. Hover, focus, and pointer contact never borrow press/depth tokens or translate the field. Its live proof verifies the same exact-SHA Foundry deployment cohort as the other public Core primitives.

The contract continues to require explicit focus/empty/filled/invalid/read-only/disabled states, a 44px minimum effective control height, RTL/IME resilience, reduced-motion and forced-colors support, and a strict prohibition on borrowing button pressure-depth tokens merely because the field can receive pointer or keyboard interaction.

Field labels, help/error copy, prefixes/suffixes, password reveal actions, and form layout remain composition outside this primitive.

## Slice 4: `core.radio`

`core.radio` provides mutually-exclusive native choice semantics with a canonical NeoSmartUI Web adapter and live public proof. Unlike checkbox, one checked radio affects its peers in the same selection set; the adapter mirrors state across the native group instead of reimplementing exclusivity.

The implementation preserves native same-name/form grouping and arrow-key movement while exposing agent-readable checked/unchecked state. Contact follows the family pressure law: hover and press compress toward the surface, never upward, and checked state remains unambiguous after release. The visible glyph is smaller than the token-backed 44px effective target.

Its current public proof is bound to the same exact-SHA GitHub Pages deployment cohort as the other public Core primitives. Legends, option-label content, shared help/error copy, choice-card presentation, and field layout remain composition outside this primitive.

## Slice 5: `core.switch`

`core.switch` is a binary-setting semantic class at `implemented` maturity. It remains intentionally distinct from checkbox and radio: one control owns one immediate off/on setting, has no indeterminate state, and does not participate in a mutually-exclusive group.

The canonical Web adapter uses a native checkbox base with `role="switch"`, preserves browser form participation and Space-key activation, prevents indeterminate presentation, and mirrors only the authoritative checked state to agent-readable `off`/`on` metadata.

The family interaction law combines ordinary contact compression with persistent toggle travel. Thumb position and state color resolve together; off maps to logical inline-start and on to logical inline-end, allowing RTL mirroring without reversing semantic meaning. The effective target remains at least 44px even when the visible track is smaller.

Setting labels, descriptions, async-save status, confirmation copy, and business consequences remain higher-level composition. Public proof is not claimed until the exact green implementation artifact is deployed and live-verified.
