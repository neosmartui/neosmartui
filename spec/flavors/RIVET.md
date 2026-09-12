# Rivet Flavor Contract

Rivet is the industrial/mechanical NeoSmartUI flavor. It turns pressure, hard boundaries, crisp offset depth, and machine-readable structure into a durable product-independent expression while keeping Core behavior shared.

## Stable identity

- Flavor ID: `flavor.rivet`
- Flavor schema: `neosmartui/flavor@1`
- Light Theme: `packages/themes/rivet-light/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `implemented`
- Public-proof status: **not yet claimed**

## Expression contract

Rivet owns industrial/mechanical expression: semantic palette defaults, sturdy typography, mechanical geometry, visible structural borders, crisp hard-shadow depth, fluid sizing, purposeful pressure motion, comfortable density, icon treatment, and surface treatment. Raised controls compress toward their shadow on contact and seat into the surface on direct press. Persistent selection remains seated rather than floating.

Rivet MUST NOT introduce generic hover lift. Informational surfaces remain stable unless they carry real action or navigation semantics. Editing surfaces stay editable rather than pretending to be pressable objects. Reduced-motion behavior must preserve state clarity while removing non-essential travel.

Rivet MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any Vertical semantics. Those remain Core/Vertical responsibilities. Flavor-specific renderer forks are exceptional and are not part of the implemented Rivet Light slice.

## Implemented Rivet Light reconciliation

NeoSmartUI already had a Rivet Light 18-component / exact 55-token foundation baseline before the official Flavor migration lifecycle began. The implementation phase reconciles that baseline against the pinned Rivet knowledge source instead of discarding it or silently inheriting it.

The mechanical model is deliberately **ratified** under NeoSmartUI authority: `3px` structural control/surface borders, `6px` control/surface radii, coherent `5px → 3px → 0` structural depth with `0 → 2px → 5px` inward travel, `80ms / 140ms / 160ms` press/release/standard timing, a `44px` minimum target, and an independent `3px` focus keyline. These values produce the sturdy mechanical pressure model intended by Rivet while preserving shared Core semantics.

The identity palette is deliberately **adapted** from pinned Rivet design knowledge rather than retaining the generic bootstrap palette. Rivet Light now resolves paper surfaces (`#fffefb` interactive and `#f8f6f1` panel), strong ink (`#222126` primary content and `#25232b` strong border), lavender primary action (`#b9a1ed` with `#211c2b` content), and a deep lavender focus ring (`#7550ac`). Success, warning, error, and information colors are also remapped into the Rivet family while keeping written state meaning authoritative.

The Theme continues to resolve exactly the 18 shipping Core components and the exact resolved semantic dependency union: 55 token IDs. It uses the same adapter-owned component CSS as Hardline and Soft; no Core renderer fork is introduced.

The Foundry now exposes a dedicated `/flavors/rivet/` route and generated `rivet-theme.css` scope so Rivet can be exercised independently from the root Core Foundry while remaining byte-consistent with the same resolved bundle.

## Migration provenance

The primary legacy knowledge source is pinned as `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d`. The migration inventory classifies `legacy.rivet.flavor-system` as `ADAPT` into the Flavor layer.

Pinned knowledge establishes useful Rivet principles: semantic tokens rather than component-local color values, fluid `clamp()` sizing, crisp hard-shadow elevation, physical hover/press movement, explicit motion tokens, reduced-motion support, light/dark semantic mappings, machine-readable component discovery, and a recognizable industrial/mechanical NeoBrutal personality. Its lavender/lime/peach/blue and ink/paper relationships are treated as design knowledge inputs; NeoSmartUI owns the final semantic mapping above.

Repository metadata for the pinned source does not declare a project license. The migration policy therefore remains `knowledge-only-until-reviewed`: NeoSmartUI extracts architecture and design knowledge, but this implementation copies no legacy implementation CSS/TypeScript/React bytes.

## Verification boundary

Rivet Light implementation is not public proof by declaration. Dedicated validation and browser coverage must verify the exact 18/55 resolution, palette, pressure physics, shared-adapter identity, static-surface stability, reduced motion, forced colors, focus, and narrow/RTL containment. After implementation merges green, only the exact merged-main CI artifact may be deployed to GitHub Pages; public-proof promotion follows only after native Pages and live HTTPS verification.

Rivet Dark follows as its own concrete Theme instance. The legacy source demonstrates dark-mode intent, but NeoSmartUI MUST NOT implement dark mode as a hidden conditional mutation or inversion filter.

## Current exclusions

This implementation adds no Rivet renderer override, no Rivet Dark Theme, no `flavor.rivet` public-proof record, and no direct Pages deployment from a PR or local rebuild.
