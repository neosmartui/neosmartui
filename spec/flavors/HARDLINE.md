# Hardline Flavor Contract

Hardline is the flagship/default NeoSmartUI flavor. It owns visual and tactile expression, not component behavior or business semantics.

## Stable identity

- Flavor ID: `flavor.hardline`
- Flavor schema: `neosmartui/flavor@1`
- Starting theme descriptor: `packages/themes/hardline-light/theme.json`
- Interaction model: `pressure-not-levitation`

## Expression contract

Hardline defaults toward square or zero-radius geometry, hard boundaries, strong structural depth, high color reaction, sharp typography, seated persistent selection, and restrained decorative movement. Hover begins compression toward the resting plane; direct press completes compression. Hardline MUST NOT introduce hover lift.

Flavor-owned expression may configure palette defaults, typography, geometry, border weight, shadow direction/strength, density, spacing personality, motion intensity/release, icon treatment, surface treatment, and patterns.

Hardline MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any other Core/Vertical semantic behavior. Renderer overrides are exceptional and are not part of this contract slice.

## Theme descriptor phase

`Hardline Light` is descriptor-only in this slice. It is schema-valid `neosmartui/theme@1` data and establishes light-mode intent/profile metadata. It does **not** yet claim a resolved token bundle, Theme resolution, generated CSS, Foundry route, dark mode, or public proof.

The following files MUST therefore remain absent until the implementation phase establishes and validates concrete values:

- `packages/themes/hardline-light/tokens.json`
- `packages/themes/hardline-light/resolution.json`

No Hardline component CSS/MJS fork belongs under the Flavor package. Core behavior stays in Core adapters.

## Next lifecycle stage

The implementation stage will resolve the existing Core semantic token contracts for Hardline Light, preserve the permanent pressure law, prove zero-radius/sharp geometry without changing component semantics, and add cross-flavor Foundry evidence. Dark mode follows as its own concrete Theme instance rather than hidden conditional values inside the light Theme.
