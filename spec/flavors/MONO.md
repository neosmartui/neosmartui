# Mono Flavor Contract

Mono is the editorial black/white/gray NeoSmartUI flavor. It makes typography, hierarchy, keylines, grayscale contrast, and tactile structural depth carry the interface personality while preserving the same Core semantics and Pressure System laws as every official flavor.

## Stable identity

- Flavor ID: `flavor.mono`
- Flavor schema: `neosmartui/flavor@1`
- First implemented Theme: `packages/themes/mono-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `public-proof`
- Public-proof record: `evidence/public/flavor.mono.json`
- Mono Dark contract maturity: `contract-only` (superseded contract checkpoint)
- Mono Dark implementation maturity: `implemented`
- Mono Dark public proof is not claimed yet.

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

## Public-proof cohort

Mono Light reached `public-proof` only after its implementation was merged, the exact merged-main artifact was independently verified, and those exact bytes were deployed to GitHub Pages without rebuilding.

- deployed source: `neosmartui/neosmartui@75fe02594bf1395275f1b4c611bcb4b1d8b1999c`
- merged-main Quality run: `34713187736`
- merged-main browser artifact: `10304495336`
- merged-main artifact SHA-256: `b1e8213ced0a774b59347cadd27312c4f857b1de8d1ff6a1acd95023b5724e4d`
- Chromium: `118/118`
- deployable Foundry files: `41`
- Pages commit: `c493bb58fcae679c16bf374775be1523ed50a28c`
- Pages tree: `6423aef0f9b9be2088812143925b4a97c852c101`
- native Pages run: `34713466334`
- live route: `https://neosmartui.github.io/flavors/mono/`
- live Theme asset: `https://neosmartui.github.io/mono-theme.css`
- canonical deployment record: `https://neosmartui.github.io/deployment.json`

The Pages tree was constructed directly from the independently verified merged-main artifact. Its Git tree SHA exactly matches the deterministic Git tree of all 41 `dist/foundry` files, proving that the deployment used the merged-main artifact bytes without a local or PR rebuild.

For historical clarity, the implementation phase previously used an `implemented` maturity marker and said public proof was not yet claimed. Those phase statements are superseded by the evidence-bound public-proof state above.

## Browser and accessibility evidence boundary

The implementation's additive browser coverage verifies:

1. shared Core adapter identity and the scoped Mono Theme;
2. exact `3 → 1 → 0` depth and `0 → 2 → 3` pressure travel;
3. non-pressable input/card/badge stability;
4. grayscale state surfaces plus explicit written semantic labels;
5. reduced-motion state acknowledgement;
6. forced-colors focus, boundaries, and normal Tab order;
7. RTL plus long localized narrow-layout containment.

Public proof remains evidence-bound rather than declarative. Structural validation checks the singleton deployment cohort and current implementation blob SHAs. Live validation checks the canonical deployment record, dedicated Mono page markers, and exact `mono-theme.css` markers over HTTPS.

Public-proof promotion does not redeploy Pages.

## Dark Theme lifecycle

Mono Dark follows as its own concrete Theme instance. It MUST NOT be implemented as a hidden conditional mutation, CSS inversion filter, or implicit side effect of Mono Light.

## Mono Dark implementation

Mono Dark is the second concrete Theme instance of the existing `flavor.mono` identity and remains on the canonical `/flavors/mono/` route. The earlier descriptor-only contract checkpoint is preserved as lifecycle history; this implementation now realizes that contract without changing Flavor identity or the proven Mono Light source route.

- descriptor: `packages/themes/mono-dark/theme.json`;
- resolution: `packages/themes/mono-dark/resolution.json`;
- exact 55-token bundle: `packages/themes/mono-dark/tokens.json`;
- implementation maturity: `implemented`;
- color mode: `dark`;
- authored color strategy: `editorial-monochrome-dark`;
- exact Core scope: **18 components**;
- generated scoped CSS: `mono-dark-theme.css` under `.ns-theme-mono-dark`;
- canonical route remains `/flavors/mono/`;
- no `flavor.mono-dark` identity and no separate Dark route.

Every non-color token is preserved value-for-value from Mono Light: 2px print keylines, square geometry, 3px → 1px → 0px structural depth, 0px → 2px → 3px inward travel, 65ms / 100ms / 140ms timings, 44px minimum targets, 3px focus width/offset, editorial spacing, `ui-serif, Georgia, serif`, and 400 / 700 / 800 typography weights.

The authored Dark palette stays strictly grayscale: interactive/panel surfaces `#151515` / `#202020`, primary/secondary content `#f2f2f2` / `#c4c4c4`, structural borders `#9a9a9a` / `#f2f2f2`, primary action `#f2f2f2` with `#111111` content, success/warning/error/info state surfaces `#606060` / `#585858` / `#d0d0d0` / `#686868`, and independent focus `#ffffff`. Validation retains at least 4.5:1 for authored text/status pairings and at least 3:1 for focus/default-boundary non-text pairings. Written state labels remain authoritative.

Runtime assembly is additive and proof-safe. The shared proven `tooling/foundry/build.mjs`, the existing Soft Dark assembler, and the existing Rivet Dark assembler remain unchanged. `tooling/foundry/assemble-mono-dark.mjs` runs last, emits `mono-dark-theme.css`, and injects `apps/foundry/fragments/mono-dark.html` into only the generated copy of the canonical Mono route. The proven Mono Light source route remains byte-identical.

Seven additive Mono Dark browser behavior classes verify shared adapters and Theme identity, exact pressure physics, stable editing/informational surfaces, grayscale status semantics plus written labels, reduced motion, forced colors/focus/normal Tab order, and RTL/long-localized narrow containment. The shared rendered Badge contrast suite also includes Mono Dark.

Mono Dark public proof is not claimed yet. `evidence/public/flavor.mono.json` remains bound only to the currently deployed Mono Light cohort until this implementation merges green, mandatory merged-main Quality passes, that exact merged-main artifact is independently verified and deployed without rebuilding, and native Pages verification succeeds.

## Current exclusions

- No Mono renderer override.
- No Core adapter fork.
- No separate Mono Dark Flavor identity or route.
- No Vertical semantics inside the Flavor.
- No public-proof binding or live `mono-dark-theme.css` claim yet.
- No Pages deployment from the implementation branch.

Mono Light remains complete through public proof; Mono Dark is implemented but not yet public proof.
