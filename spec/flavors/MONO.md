# Mono Flavor Contract

Mono is the editorial black/white/gray NeoSmartUI flavor. It makes typography, hierarchy, keylines, grayscale contrast, and tactile structural depth carry the interface personality while preserving the same Core semantics and Pressure System laws as every official flavor.

## Stable identity

- Flavor ID: `flavor.mono`
- Flavor schema: `neosmartui/flavor@1`
- First Theme descriptor: `packages/themes/mono-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `contract-only`
- Public-proof status: **not yet claimed**

## Canonical authority and provenance boundary

The NeoSmartUI Canonical PRD is the direct product authority for Mono. It names Mono as one of the four initial official flavors and defines it as **editorial black/white/gray NeoBrutal**.

The pinned family source `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626` supplies cross-flavor laws through `FLAVORS.md`: flavors may change palette, typography, borders, radius, depth, spacing, motion, icon treatment, surfaces, and visual density, but must preserve compress-never-float direction, coherent depth/travel, immediate acknowledgement, equivalent touch/pointer/keyboard semantics, reduced motion, semantic state meaning, accessible focus, and machine-readable intent.

There is **no dedicated legacy Mono repository or Mono implementation artifact in the current migration ledger**. That absence is intentional evidence, not a gap to fill by guessing. This contract therefore does not claim legacy Mono token values, copy implementation code from another flavor, or silently relabel the family spec's separate `Raw` personality as Mono. Mono's concrete Theme values will be authored under NeoSmartUI authority during the implementation phase and must remain traceable to this contract.

## Expression contract

Mono owns an editorial monochrome expression:

- black, white, and gray are the primary palette family;
- typography and spacing create strong editorial hierarchy;
- keylines and structural boundaries stay explicit;
- hard depth remains tactile but visually disciplined;
- ordinary interactive controls compress inward rather than lift;
- persistent selection remains seated;
- informational and editing surfaces remain stable unless their real semantics are interactive;
- color MUST NOT become the only carrier of state or meaning;
- reduced motion must keep state acknowledgement while removing non-essential travel;
- forced-colors, focus-visible, RTL, localization, and narrow layouts remain first-class conformance requirements.

Mono MUST NOT introduce generic hover lift, decorative motion that implies false interactivity, or business/domain behavior. It MUST NOT own Button/Dialog/Product/Checkout/Billing semantics. Those remain Core/Vertical responsibilities.

This contract deliberately does **not** choose final grayscale values, border widths, radii, depth distances, motion durations, font families, or spacing values. Those belong to the separate implementation slice and must be resolved against the exact shipping Core dependency union rather than invented here as pseudo-proof.

## Mono Light contract boundary

`packages/themes/mono-light/theme.json` is a descriptor-only Theme instance. It records the intended categories—editorial monochrome color, type-led hierarchy, structured geometry, print-like keylines, crisp monochrome depth, restrained pressure motion, seated selection, and adapter-owned icons—without resolving any semantic token values yet.

The implementation phase must:

1. resolve exactly the shipping implemented/public-proof Core component scope;
2. resolve exactly the semantic token dependency union required by that scope;
3. define a coherent monochrome pressure model in which visible depth and inward travel remain physically consistent;
4. choose concrete grayscale values with sufficient contrast and non-color state meaning;
5. preserve a minimum 44px target and independent visible keyboard focus;
6. keep existing Core adapters shared rather than forking component behavior;
7. add scoped `mono-theme.css`, a dedicated `/flavors/mono/` Foundry route, and additive browser evidence covering shared-adapter identity, pressure physics, static/editing stability, reduced motion, forced colors, focus, RTL/localization/narrow containment, and monochrome state clarity;
8. merge green, verify merged-main, deploy only the exact merged-main CI artifact, verify native Pages, and only then promote public proof.

## Dark Theme lifecycle

Mono Dark follows as its own concrete Theme instance. It MUST NOT be implemented as a hidden conditional mutation, CSS inversion filter, or implicit side effect of Mono Light.

## Contract exclusions

This slice adds no resolved `tokens.json`, no `resolution.json`, no Mono renderer override, no Mono Dark Theme, no dedicated `/flavors/mono/` Foundry route, no browser tests that pretend implementation exists, no `flavor.mono` public-proof record, and no Pages deployment.
