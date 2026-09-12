# Soft Flavor Contract

Soft is the calm application-oriented NeoSmartUI flavor for long-session interfaces. It preserves visible structure, direct contrast, tactile depth, obvious affordance, and physical micro-interaction while reducing the visual aggression of the flagship Hardline expression.

## Stable identity

- Flavor ID: `flavor.soft`
- Flavor schema: `neosmartui/flavor@1`
- Starting Theme descriptor: `packages/themes/soft-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Maturity: `contract-only`

## Expression contract

Soft defaults toward moderate rounding, visible moderate boundaries, shallow hard structural depth, warm neutral application surfaces, softened blue primary accent intent, readable system-first typography, comfortable application density, seated persistent selection, and restrained motion. Hover begins compression toward the resting plane; direct press completes compression. Soft MUST NOT introduce generic hover lift.

Raised controls may express tactile hard-shadow depth. Recessed editing/data surfaces remain seated rather than pretending to be raised pressable controls. Informational surfaces remain stable. Motion is reserved for affordance, pressure, selection, progress, confirmation, and failure rather than decorative hover movement.

Flavor-owned expression may configure palette defaults, typography, geometry, border weight, shadow direction/strength, density, spacing personality, motion intensity/release, icon treatment, surface treatment, and patterns.

Soft MUST NOT own Button/Dialog/Product/Checkout/Billing behavior, SaaS workspace/billing semantics, or any other Core/Vertical behavior. The legacy source called itself a SaaS/application flavor, but NeoSmartUI extracts only its visual/physical personality; SaaS remains a Vertical under the Canonical PRD.

## Theme descriptor phase

`Soft Light` is descriptor-only in this slice. It is schema-valid `neosmartui/theme@1` data and establishes light-mode intent/profile metadata. It does **not** yet claim a resolved token bundle, Theme resolution, generated CSS, Foundry route, dark mode implementation, or public proof.

The following files MUST therefore remain absent until the implementation phase establishes and validates concrete semantic values:

- `packages/themes/soft-light/tokens.json`
- `packages/themes/soft-light/resolution.json`

No Soft component CSS/MJS fork belongs under the Flavor package. Core behavior stays in Core adapters.

## Migration provenance

The primary legacy knowledge source is pinned as `NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a`, especially `DESIGN.md`. The migration ledger classifies `legacy.soft.design-language` as `ADAPT` into the Flavor layer and explicitly says to extract Soft visual personality without importing SaaS domain semantics.

The pinned source describes coated-plastic / soft-touch hardware, a visible `2px` default structural border, moderate rounding, shallow hard depth with reference rest → hover → active geometry of `3px → 1.5px → 0`, warm neutral surfaces, softened blue accents, restrained motion, and dark mode as a first-class Theme rather than an inversion filter. These are implementation inputs, not resolved NeoSmartUI token claims in this contract-only slice.

Repository metadata for that legacy source does not declare a license, so this slice uses knowledge evidence only and copies no implementation source.

## Next lifecycle stage

The implementation stage will resolve the existing shipping Core semantic token dependency union for Soft Light through shared Core adapters, translate the pinned Soft reference physics into coherent semantic pressure values, prove moderate geometry and calm color reaction without changing component semantics, and add cross-flavor Foundry evidence.

Soft Dark follows as its own concrete Theme instance. It must be intentionally resolved and tested rather than produced by hidden conditional values or an inversion filter.
