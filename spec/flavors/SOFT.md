# Soft Flavor Contract

Soft is the calm application-oriented NeoSmartUI flavor for long-session interfaces. It preserves visible structure, direct contrast, tactile depth, obvious affordance, and physical micro-interaction while reducing the visual aggression of the flagship Hardline expression.

## Stable identity

- Flavor ID: `flavor.soft`
- Flavor schema: `neosmartui/flavor@1`
- Starting Theme: `packages/themes/soft-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Maturity: `implemented`
- Public-proof status: **not yet claimed**

## Expression contract

Soft defaults toward moderate rounding, visible moderate boundaries, shallow hard structural depth, warm neutral application surfaces, softened blue primary accent intent, readable system-first typography, comfortable application density, seated persistent selection, and restrained motion. Hover begins compression toward the resting plane; direct press completes compression. Soft MUST NOT introduce generic hover lift.

Raised controls may express tactile hard-shadow depth. Recessed editing/data surfaces remain seated rather than pretending to be raised pressable controls. Informational surfaces remain stable. Motion is reserved for affordance, pressure, selection, progress, confirmation, and failure rather than decorative hover movement.

Flavor-owned expression may configure palette defaults, typography, geometry, border weight, shadow direction/strength, density, spacing personality, motion intensity/release, icon treatment, surface treatment, and patterns.

Soft MUST NOT own Button/Dialog/Product/Checkout/Billing behavior, SaaS workspace/billing semantics, or any other Core/Vertical behavior. The legacy source called itself a SaaS/application flavor, but NeoSmartUI extracts only its visual/physical personality; SaaS remains a Vertical under the Canonical PRD.

## Soft Light implementation

`Soft Light` is now a concrete schema-valid `neosmartui/theme@1` implementation. Its resolution is explicit and machine-readable:

- `packages/themes/soft-light/tokens.json`
- `packages/themes/soft-light/resolution.json`
- exact scope: the current 18 implemented/public-proof Core components
- exact resolved semantic dependency union: 55 token IDs
- generated CSS scope: `.ns-theme-soft-light`

The implementation resolves visible `2px` structural boundaries, `8px` control radius, `12px` surface radius, pill annotation geometry, a coherent `3px → 1.5px → 0` structural depth model with matching `0 → 1.5px → 3px` inward contact travel, and restrained `70ms / 105ms / 165ms` press/release/standard timing. Controls retain a `44px` minimum target and an independent `3px` focus keyline.

Soft Light uses independently resolved warm neutral surfaces and a softened-blue primary action while keeping written state meaning, semantic HTML, accessibility behavior, RTL behavior, reduced-motion behavior, forced-colors behavior, and Core interaction semantics in the shared adapters. The Foundry route `apps/foundry/src/flavors/soft/index.html` imports the same shipping Button/Input/Card/Badge adapter CSS used by other flavors; no Soft component implementation fork exists.

This implementation is **not public-proof yet**. It must complete the standard lifecycle before any proof claim: green implementation merge, merged-main verification, exact merged-main artifact deployment without rebuilding, native Pages verification, then public-proof promotion.

## Migration provenance

The primary legacy knowledge source is pinned as `NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a`, especially `DESIGN.md`. The migration ledger classifies `legacy.soft.design-language` as `ADAPT` into the Flavor layer and explicitly says to extract Soft visual personality without importing SaaS domain semantics.

The pinned source describes coated-plastic / soft-touch hardware, a visible `2px` default structural border, moderate rounding, shallow hard depth with reference rest → hover → active geometry of `3px → 1.5px → 0`, warm neutral surfaces, softened blue accents, restrained motion, and dark mode as a first-class Theme rather than an inversion filter. These are migration knowledge inputs; NeoSmartUI resolves its own semantic token values and copies no legacy implementation source.

Repository metadata for that legacy source does not declare a license. The migration policy therefore remains `knowledge-only-until-reviewed`, and no legacy CSS/JS/React implementation bytes are imported into this implementation.

## Deliberate exclusions

- No Soft Dark implementation. Soft Dark follows as its own concrete Theme instance and must be intentionally resolved and tested rather than produced by hidden conditional values or an inversion filter.
- No Core component adapter fork.
- No SaaS or other Vertical semantics inside the Flavor.
- No public-proof record in the implementation slice.
- No deployment during contract or feature-branch implementation work.

## Next lifecycle stage

After the implementation PR is independently green and merged by exact head, merged-main Quality becomes the authoritative source. Only its exact CI-produced Foundry artifact may be deployed. Native Pages must then verify the exact deployed singleton before Soft public-proof evidence is promoted.
