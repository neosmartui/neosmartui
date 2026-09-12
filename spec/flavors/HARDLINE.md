# Hardline Flavor Contract

Hardline is the flagship/default NeoSmartUI flavor. It owns visual and tactile expression, not component behavior or business semantics.

## Stable identity

- Flavor ID: `flavor.hardline`
- Flavor schema: `neosmartui/flavor@1`
- Implemented light Theme: `packages/themes/hardline-light/theme.json`
- Contract-only dark Theme: `packages/themes/hardline-dark/theme.json`
- Resolved Light bundle: `packages/themes/hardline-light/tokens.json`
- Light Theme resolution: `packages/themes/hardline-light/resolution.json`
- Interaction model: `pressure-not-levitation`
- Maturity: `public-proof`
- Hardline Light maturity: `public-proof`
- Hardline Dark contract maturity: `contract-only`

## Expression contract

Hardline defaults toward square or zero-radius geometry, hard boundaries, strong structural depth, high color reaction, sharp typography, seated persistent selection, and restrained decorative movement. Hover begins compression toward the resting plane; direct press completes compression. Hardline MUST NOT introduce hover lift.

Flavor-owned expression may configure palette defaults, typography, geometry, border weight, shadow direction/strength, density, spacing personality, motion intensity/release, icon treatment, surface treatment, and patterns.

Hardline MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any other Core/Vertical semantic behavior. Renderer overrides are exceptional and are not part of the Hardline Light implementation or Hardline Dark contract.

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

## Hardline Dark contract

Dark mode follows as its own concrete Theme instance rather than hidden conditional values inside the light Theme. `Hardline Dark` is that second concrete Theme instance of `flavor.hardline`. It exists as its own `neosmartui/theme@1` descriptor and must not be implemented as CSS inversion, filter-based dark mode, or hidden conditional values inside Hardline Light.

Dark changes the semantic color resolution while preserving Hardline ownership and physics. Its implementation phase must resolve the same exact shipping 18-Core / 55-token semantic dependency boundary through the same shared Core adapters.

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

Dark color resolution must remain semantic and authored, not mechanically inverted. It must provide dark/near-black structural surfaces, readable light content, visible hard boundaries and focus, a high-reaction flagship action treatment, and distinct info/success/warning/error meaning without relying on color alone. Exact color values are deliberately deferred to the implementation phase, where they must be ratified as a complete 55-token bundle and validated for contrast/state behavior.

The existing `/flavors/hardline/` proof surface remains the canonical Flavor route. Hardline Dark implementation must extend that surface to demonstrate Light and Dark together rather than creating a competing `flavor.hardline-dark` identity or route-owned semantics.

No Hardline Dark token bundle, generated CSS, browser test, route fork, or proof claim exists in this contract phase. Contract promotion gets no Pages deployment.

## Provenance

Hardline is a new NeoSmartUI flagship personality, not a copied legacy implementation. Its family-law evidence is pinned through the migration ledger to `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626`:

- `FLAVORS.md` supplies the Flavor/Core ownership boundary and cross-flavor semantic invariants.
- `TOKENS.md` supplies the semantic pressure, motion, focus, and token-separation reference model.
- `INTERACTION.md` supplies compress-never-float, coherent shadow/travel, reduced-motion, keyboard/touch, and static-surface laws.

The canonical NeoSmartUI PRD supplies the Hardline-specific flagship choices: zero-radius/square geometry, hard boundaries, strong structural depth, high reaction, seated selection, restrained decorative movement, and the v0.3 light/dark requirement. No legacy source code is copied.

## Public-proof evidence

Hardline Light is `public-proof` only for the exact merged-main source and singleton Pages cohort recorded in `evidence/public/flavor.hardline.json`. The proof binds the concrete Light Theme, resolution, resolved-token bundle, and shipping Foundry Flavor page to exact merged-main browser evidence and the native GitHub Pages deployment.

The current live gate verifies the dedicated `/flavors/hardline/` route, the scoped `.ns-theme-hardline-light` surface, and the deployed `hardline-theme.css` pressure/geometry markers. Proof promotion refreshes the existing Core records onto the same singleton cohort without rebuilding or redeploying the already verified runtime artifact.

Hardline Dark is not public proof at contract stage. Its eventual implementation must first merge green, pass merged-main Quality, deploy the exact merged-main artifact bytes without rebuilding, pass native Pages verification, and only then refresh `flavor.hardline` and the singleton proof cohort to bind both concrete Hardline Themes.
