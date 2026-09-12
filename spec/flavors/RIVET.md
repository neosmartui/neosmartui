# Rivet Flavor Contract

Rivet is the industrial/mechanical NeoSmartUI flavor. It turns pressure, hard boundaries, crisp offset depth, and machine-readable structure into a durable product-independent expression while keeping Core behavior shared.

## Stable identity

- Flavor ID: `flavor.rivet`
- Flavor schema: `neosmartui/flavor@1`
- Existing light Theme baseline: `packages/themes/rivet-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `contract-only`
- Public-proof status: **not yet claimed**

## Expression contract

Rivet owns industrial/mechanical expression: semantic palette defaults, sturdy typography, mechanical geometry, visible structural borders, crisp hard-shadow depth, fluid sizing, purposeful pressure motion, comfortable density, icon treatment, and surface treatment. Raised controls compress toward their shadow on contact and seat into the surface on direct press. Persistent selection remains seated rather than floating.

Rivet MUST NOT introduce generic hover lift. Informational surfaces remain stable unless they carry real action or navigation semantics. Editing surfaces stay editable rather than pretending to be pressable objects. Reduced-motion behavior must preserve state clarity while removing non-essential travel.

Rivet MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any Vertical semantics. Those remain Core/Vertical responsibilities. Flavor-specific renderer forks are exceptional and are not part of this contract.

## Preexisting foundation baseline

NeoSmartUI already has `packages/themes/rivet-light/theme.json`, `tokens.json`, and `resolution.json`. That baseline was created earlier to establish the token engine and to power the root Core Foundry while Core components were being migrated. It currently resolves the same 18 shipping Core components and exact 55-token dependency union used by the public Foundry.

Those existing bytes are a **preexisting foundation baseline**, not evidence that the official Rivet migration lifecycle is complete. This contract slice deliberately does not rewrite them, add a Rivet-specific Foundry route, create `flavor.rivet` public proof, or claim that the current token choices are final. The implementation phase must explicitly reconcile and either ratify or adapt the baseline against the pinned Rivet knowledge source, then add dedicated Rivet browser evidence before any deployment or proof claim.

The contract slice freezes the current baseline so contract work cannot silently mutate runtime expression. Current baseline checkpoints include `3px` structural borders, `6px` control/surface radii, coherent `5px → 3px → 0` structural depth with `0 → 2px → 5px` inward travel, `80ms / 140ms / 160ms` press/release/standard timing, a `44px` minimum target, and an independent `3px` focus keyline. These are baseline checkpoints, not immutable final Rivet design laws.

## Migration provenance

The primary legacy knowledge source is pinned as `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d`. The migration inventory classifies `legacy.rivet.flavor-system` as `ADAPT` into the Flavor layer.

Pinned knowledge establishes useful Rivet principles: semantic tokens rather than component-local color values, fluid `clamp()` sizing, crisp hard-shadow elevation, physical hover/press movement, explicit motion tokens, reduced-motion support, light/dark semantic mappings, machine-readable component discovery, and a recognizable industrial/mechanical NeoBrutal personality. Its reference palette includes lavender, lime, peach, blue, and strong ink/paper relationships; those are implementation inputs rather than resolved NeoSmartUI color claims in this contract slice.

Repository metadata for the pinned source does not declare a project license. The migration policy is therefore `knowledge-only-until-reviewed`: NeoSmartUI may extract architecture and design knowledge, but this contract copies no legacy implementation CSS/TypeScript/React bytes.

## Theme lifecycle

Rivet Light must complete its dedicated implementation lifecycle first. The next implementation slice will:

1. compare the preexisting NeoSmartUI Rivet Light baseline with the pinned Rivet knowledge;
2. deliberately ratify or adapt semantic token values under NeoSmartUI authority;
3. preserve the exact shipping Core dependency union and shared adapters;
4. add a scoped Rivet Foundry route and dedicated browser checks for pressure physics, static/recessed stability, focus, forced colors, reduced motion, RTL/responsive containment where applicable, and shared-adapter identity;
5. merge green, verify merged-main, and deploy only the exact merged-main CI artifact before public-proof promotion.

Rivet Dark follows as its own concrete Theme instance. The legacy source demonstrates dark-mode intent, but NeoSmartUI MUST NOT implement dark mode as a hidden conditional mutation or inversion filter.

## Contract exclusions

This slice adds no Rivet renderer override, no new resolved Theme bundle, no Rivet Dark Theme, no dedicated `/flavors/rivet/` Foundry route, no public-proof record, and no Pages deployment.
