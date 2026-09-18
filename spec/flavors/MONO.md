# Mono Flavor Contract

Mono is the editorial black/white/gray NeoSmartUI flavor. It makes typography, hierarchy, keylines, grayscale contrast, and tactile structural depth carry the interface personality while preserving the same Core semantics and Pressure System laws as every official flavor.

## Stable identity

- Flavor ID: `flavor.mono`
- Flavor schema: `neosmartui/flavor@1`
- First implemented Theme: `packages/themes/mono-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `public-proof`
- Public-proof record: `evidence/public/flavor.mono.json`

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

## Mono Dark contract

Mono Dark is the second concrete Theme instance of the existing `flavor.mono` identity and remains on the canonical `/flavors/mono/` route.

- contract Theme: `packages/themes/mono-dark/theme.json`;
- Mono Dark contract maturity: `contract-only`;
- color mode: `dark`;
- authored color strategy: `editorial-monochrome-dark`;
- typography, geometry, border, shadow, spacing, density, motion, interaction, and icon ownership remain structurally identical to Mono Light;
- the stable shipping boundary remains 18 Core components and 55 resolved semantic token IDs once implementation is added;
- concrete resolved palette values are intentionally deferred to implementation;
- the existing `build:foundry` chain remains unchanged during the contract stage.

Contract-only hard absences remain:

- `packages/themes/mono-dark/resolution.json`;
- `packages/themes/mono-dark/tokens.json`;
- `apps/foundry/fragments/mono-dark.html`;
- `tests/browser/foundry-mono-dark.spec.mjs`;
- `tooling/validators/validate-mono-dark-theme.mjs`;
- `tooling/foundry/assemble-mono-dark.mjs`;
- `packages/flavors/mono-dark`;
- `apps/foundry/src/flavors/mono-dark`.

The proven Mono Light source route remains the sole source route at this stage. Mono Dark implementation must later use additive artifact assembly without mutating that proven route or the shared Foundry builder.

## Current exclusions

- No Mono renderer override.
- No Mono Dark resolution or resolved token bundle yet.
- No Mono Dark fragment, assembler, implementation validator, or browser suite yet.
- No Core adapter fork.
- No separate Mono Dark Flavor identity or route.
- No Vertical semantics inside the Flavor.
- No Pages deployment from the contract-only slice.

Mono Light is complete through public proof; Mono Dark is contract-only.
