# Hardline Flavor Contract

Hardline is the flagship/default NeoSmartUI flavor. It owns visual and tactile expression, not component behavior or business semantics.

## Stable identity

- Flavor ID: `flavor.hardline`
- Flavor schema: `neosmartui/flavor@1`
- Implemented light Theme: `packages/themes/hardline-light/theme.json`
- Implemented dark Theme: `packages/themes/hardline-dark/theme.json`
- Resolved Light bundle: `packages/themes/hardline-light/tokens.json`
- Light Theme resolution: `packages/themes/hardline-light/resolution.json`
- Resolved Dark bundle: `packages/themes/hardline-dark/tokens.json`
- Dark Theme resolution: `packages/themes/hardline-dark/resolution.json`
- Interaction model: `pressure-not-levitation`
- Maturity: `public-proof`
- Hardline Light maturity: `public-proof`
- Hardline Dark implementation maturity: `implemented`
- Hardline Dark public-proof status: **not public-proof yet**

## Expression contract

Hardline defaults toward square or zero-radius geometry, hard boundaries, strong structural depth, high color reaction, sharp typography, seated persistent selection, and restrained decorative movement. Hover begins compression toward the resting plane; direct press completes compression. Hardline MUST NOT introduce hover lift.

Flavor-owned expression may configure palette defaults, typography, geometry, border weight, shadow direction/strength, density, spacing personality, motion intensity/release, icon treatment, surface treatment, and patterns.

Hardline MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any other Core/Vertical semantic behavior. Renderer overrides are exceptional and are not part of either concrete Hardline Theme.

## Hardline Light implementation

`Hardline Light` resolves the exact semantic dependency union consumed by the 18 shipping Core components. It does not add component-specific magic values or fork component renderers. Core adapters remain authoritative and receive Hardline expression through inherited semantic custom properties.

The pressure model follows the pinned family reference:

- rest depth: `4px × 4px`
- hover/proximity depth: `2px × 2px`
- pressed/seated depth: `0px × 0px`
- hover travel: `2px × 2px`
- pressed/seated travel: `4px × 4px`
- press/release/standard timing: `70ms / 110ms / 170ms`
- control, grouped-surface, and annotation radius: `0px`
- minimum interactive target: `44px`
- independent focus keyline: `3px` width with `3px` offset

The resolved bundle contains exactly the 55 semantic roles currently required by implemented/public-proof Core components. The full Core registry still defines 63 value-free contracts; unused contracts are not padded into this concrete bundle.

## Hardline Dark implementation

Dark mode follows as its own concrete Theme instance rather than hidden conditional values inside the light Theme. `Hardline Dark` is the second concrete Theme instance of `flavor.hardline`. It is authored as its own `neosmartui/theme@1` descriptor, resolution, and 55-token bundle and is not implemented as CSS inversion, filter-based dark mode, or hidden conditional values inside Hardline Light.

Hardline Dark resolves the same exact shipping 18-Core / 55-token semantic dependency boundary through the same shared Core adapters. It changes semantic colors while preserving the complete Hardline structural and interaction model.

The following Hardline laws are invariant across Light and Dark:

- square/zero-radius default geometry;
- hard structural boundaries and strong structural depth;
- `4px → 2px → 0px` structural depth for rest → hover → active;
- `0px → 2px → 4px` inward travel;
- `70ms / 110ms / 170ms` pressure timings;
- `44px` minimum interactive target;
- independent `3px` focus keyline with `3px` offset;
- seated persistent selection;
- reduced-motion state acknowledgement without non-essential travel;
- forced-colors, keyboard, touch, pointer, RTL, localization, and narrow-layout conformance.

### Authored dark semantic palette

The Dark Theme is deliberately resolved rather than inverted:

- interactive surface: `#141414`;
- panel surface: `#1d1d1d`;
- primary content: `#f5f5f5`;
- secondary content: `#c9c9c9`;
- default / strong boundary: `#d8d8d8` / `#ffffff`;
- flagship primary action: `#ffd84d` with `#111111` content;
- focus keyline: `#8fb3ff`;
- success / warning / error / info: `#8ee8b0` / `#ffd84d` / `#ff737d` / `#b8a1ff`.

The dedicated Theme validator requires at least `4.5:1` authored contrast for primary and secondary text, action content, and the state badge pairings used by shared Core adapters. Written labels remain authoritative for status meaning, so color is never the only state signal.

The existing `/flavors/hardline/` proof surface remains the canonical Flavor route. The implementation extends that one route to demonstrate Light and Dark together. The Light section remains `.ns-theme-hardline-light`; the Dark section is scoped by `.ns-theme-hardline-dark` and consumes the same `.ns-button`, `.ns-input`, `.ns-card`, and `.ns-badge` adapter classes. The build emits `hardline-theme.css` and `hardline-dark-theme.css` from the two independent resolved bundles.

Dedicated browser coverage verifies authored dark CSS, shared adapter identity, exact flagship pressure physics, stability of non-pressable editing/informational surfaces, explicit written state labels, reduced motion, forced colors, normal Tab order, RTL, and narrow localized containment.

Hardline Dark is implemented but is not public proof yet. No Pages deployment occurs from the implementation branch. Public proof remains gated on an exact merged-main Quality artifact, deployment of those exact bytes without rebuilding, native Pages verification, and a later proof-only cohort refresh.

## Provenance

Hardline is a new NeoSmartUI flagship personality, not a copied legacy implementation. Its family-law evidence is pinned through the migration ledger to `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626`:

- `FLAVORS.md` supplies the Flavor/Core ownership boundary and cross-flavor semantic invariants.
- `TOKENS.md` supplies the semantic pressure, motion, focus, and token-separation reference model.
- `INTERACTION.md` supplies compress-never-float, coherent shadow/travel, reduced-motion, keyboard/touch, and static-surface laws.

The canonical NeoSmartUI PRD supplies the Hardline-specific flagship choices: zero-radius/square geometry, hard boundaries, strong structural depth, high reaction, seated selection, restrained decorative movement, and the v0.3 light/dark requirement. No legacy source code is copied.

## Public-proof evidence

Hardline Light is `public-proof` only for the exact merged-main source and singleton Pages cohort recorded in `evidence/public/flavor.hardline.json`. The existing proof still binds only the concrete Light Theme, resolution, resolved-token bundle, and shipping Foundry Flavor page. This implementation deliberately does not mutate that record.

The current live gate continues to verify the deployed `/flavors/hardline/` route, scoped `.ns-theme-hardline-light` surface, and deployed `hardline-theme.css` markers from the current singleton cohort. Hardline Dark does not become public proof by being present in a feature branch or by merging.

After implementation merges green, only the exact merged-main CI artifact may be deployed to Pages without rebuilding. Native Pages must then verify the combined Light/Dark Hardline route and both scoped Theme assets. A later proof promotion must refresh the singleton 18 Core + 4 Flavor cohort and extend `flavor.hardline` implementation-file bindings to both concrete Themes. Public-proof promotion itself must not redeploy Pages.
