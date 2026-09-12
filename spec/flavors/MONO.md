# Mono Flavor Contract

Mono is the editorial black/white/gray NeoSmartUI flavor. It makes typography, hierarchy, keylines, grayscale contrast, and tactile structural depth carry the interface personality while preserving the same Core semantics and Pressure System laws as every official flavor.

## Stable identity

- Flavor ID: `flavor.mono`
- Flavor schema: `neosmartui/flavor@1`
- First implemented Theme: `packages/themes/mono-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `implemented`
- Public-proof status: **not public-proof yet**

## Canonical authority and provenance boundary

The NeoSmartUI Canonical PRD is the direct product authority for Mono. It names Mono as one of the four initial official flavors and defines it as **editorial black/white/gray NeoBrutal**.

The pinned family source `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626` supplies cross-flavor laws through `FLAVORS.md`: flavors may change palette, typography, borders, radius, depth, spacing, motion, icon treatment, surfaces, and visual density, but must preserve compress-never-float direction, coherent depth/travel, immediate acknowledgement, equivalent touch/pointer/keyboard semantics, reduced motion, semantic state meaning, accessible focus, and machine-readable intent.

There is **no dedicated legacy Mono repository or Mono implementation artifact in the current migration ledger**. That absence remains intentional evidence. Mono therefore does not claim legacy Mono token values, copy implementation code from another flavor, or silently relabel the family spec's separate `Raw` personality as Mono. The concrete Mono Light values below are authored under NeoSmartUI authority and trace directly to the ratified Mono contract.

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

## Mono Light implementation

Mono Light resolves the exact currently shipping Core surface:

- implemented/public-proof Core scope: **18 components**;
- exact resolved semantic dependency union: **55 token IDs**;
- resolved bundle: `packages/themes/mono-light/tokens.json`;
- resolution contract: `packages/themes/mono-light/resolution.json`;
- scoped generated CSS: `mono-theme.css` under `.ns-theme-mono-light`;
- Foundry route: `/flavors/mono/`.

The implementation keeps the existing Web Core adapters shared. It does not add a Mono renderer override or fork component semantics.

### Editorial geometry and pressure

- control/surface/annotation keylines: `2px`;
- control/surface/annotation radius: `0px`;
- structural depth: `3px → 1px → 0` for rest → hover → active;
- inward travel: `0px → 2px → 3px`;
- each axis remains physically coherent: rest depth equals hover depth + hover travel and active depth + active travel;
- minimum interactive target: `44px`;
- focus keyline: `3px` width with `3px` offset;
- semantic timings: `65ms` press, `100ms` release, `140ms` standard.

### Editorial monochrome palette

Mono Light deliberately keeps every resolved color role grayscale:

- interactive surface `#ffffff`;
- panel surface `#f2f2f2`;
- primary content / strong boundary `#111111`;
- secondary content `#555555`;
- primary action `#111111` with `#ffffff` content;
- focus ring `#000000`;
- semantic state surfaces remain grayscale and are paired with explicit written labels rather than color-only meaning.

### Editorial typography and rhythm

- body family: `ui-serif, Georgia, serif`;
- regular/emphasis/strong weights: `400 / 700 / 800`;
- grouped surfaces use `1.25rem` editorial breathing room;
- compact annotations remain rectangular rather than pill-shaped;
- responsive field and navigation roles continue to use semantic tokens rather than component-local values.

## Browser and accessibility evidence boundary

The implementation adds additive browser coverage for:

1. shared Core adapter identity and the scoped Mono Theme;
2. exact `3 → 1 → 0` depth and `0 → 2 → 3` pressure travel;
3. non-pressable input/card/badge stability;
4. grayscale state surfaces plus explicit written semantic labels;
5. reduced-motion state acknowledgement;
6. forced-colors focus, boundaries, and normal Tab order;
7. RTL plus long localized narrow-layout containment.

These tests are implementation evidence only. They do **not** claim public proof before merged-main deployment and native Pages verification.

## Dark Theme lifecycle

Mono Dark follows as its own concrete Theme instance. It MUST NOT be implemented as a hidden conditional mutation, CSS inversion filter, or implicit side effect of Mono Light.

## Current exclusions

This implementation adds no Mono renderer override, no Mono Dark Theme, no `flavor.mono` public-proof record, and no Pages deployment from the feature branch. Public proof can be promoted only after the exact merged-main CI artifact is deployed and verified on native GitHub Pages.
