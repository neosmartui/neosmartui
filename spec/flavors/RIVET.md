# Rivet Flavor Contract

Rivet is the industrial/mechanical NeoSmartUI flavor. It turns pressure, hard boundaries, crisp offset depth, and machine-readable structure into a durable product-independent expression while keeping Core behavior shared.

## Stable identity

- Flavor ID: `flavor.rivet`
- Flavor schema: `neosmartui/flavor@1`
- Light Theme: `packages/themes/rivet-light/theme.json`
- Dark Theme contract: `packages/themes/rivet-dark/theme.json`
- Interaction model: `pressure-not-levitation`
- Official migration maturity: `public-proof`
- Public-proof record: `evidence/public/flavor.rivet.json`
- Rivet Dark contract maturity: `contract-only`

## Expression contract

Rivet owns industrial/mechanical expression: semantic palette defaults, sturdy typography, mechanical geometry, visible structural borders, crisp hard-shadow depth, fluid sizing, purposeful pressure motion, comfortable density, icon treatment, and surface treatment. Raised controls compress toward their shadow on contact and seat into the surface on direct press. Persistent selection remains seated rather than floating.

Rivet MUST NOT introduce generic hover lift. Informational surfaces remain stable unless they carry real action or navigation semantics. Editing surfaces stay editable rather than pretending to be pressable objects. Reduced-motion behavior must preserve state clarity while removing non-essential travel.

Rivet MUST NOT own Button/Dialog/Product/Checkout/Billing behavior or any Vertical semantics. Those remain Core/Vertical responsibilities. Flavor-specific renderer forks are exceptional and are not part of Rivet Light.

## Rivet Light reconciliation

NeoSmartUI already had a Rivet Light 18-component / exact 55-token foundation baseline before the official Flavor migration lifecycle began. The implementation phase reconciled that baseline against the pinned Rivet knowledge source instead of discarding it or silently inheriting it.

The mechanical model is deliberately **ratified** under NeoSmartUI authority: `3px` structural control/surface borders, `6px` control/surface radii, coherent `5px → 3px → 0` structural depth with `0 → 2px → 5px` inward travel, `80ms / 140ms / 160ms` press/release/standard timing, a `44px` minimum target, and an independent `3px` focus keyline. These values produce the sturdy mechanical pressure model intended by Rivet while preserving shared Core semantics.

The identity palette is deliberately **adapted** from pinned Rivet design knowledge rather than retaining the generic bootstrap palette. Rivet Light resolves paper surfaces (`#fffefb` interactive and `#f8f6f1` panel), strong ink (`#222126` primary content and `#25232b` strong border), lavender primary action (`#b9a1ed` with `#211c2b` content), and a deep lavender focus ring (`#7550ac`). Success, warning, error, and information colors are remapped into the Rivet family while keeping written state meaning authoritative.

The Theme resolves exactly the 18 shipping Core components and the exact resolved semantic dependency union: 55 token IDs. It uses the same adapter-owned component CSS as Hardline and Soft; no Core renderer fork is introduced.

The Foundry exposes a dedicated `/flavors/rivet/` route and generated `rivet-theme.css` scope so Rivet can be exercised independently from the root Core Foundry while remaining byte-consistent with the same resolved bundle.

## Rivet Dark contract

Rivet Dark is the second concrete Theme instance of `flavor.rivet`. Its descriptor declares an authored industrial dark semantic strategy while keeping Rivet ownership, mechanical structure, sturdy typography, comfortable density, adapter-owned icons, and pressure-not-levitation interaction intact. It is not CSS inversion, filter-based dark mode, or hidden conditional values inside Rivet Light.

The contract freezes Rivet Dark to the exact shipping 18-Core / 55-token semantic dependency boundary already proven by Rivet Light. Implementation must preserve the ratified mechanical laws across color modes: `3px` control/surface and `2px` annotation boundaries, `6px` control/surface and pill annotation geometry, `5px → 3px → 0px` structural depth, `0px → 2px → 5px` inward travel, `80ms / 140ms / 160ms` pressure timings, a `44px` minimum target, and an independently visible `3px` focus width/offset.

Concrete Dark palette values are intentionally deferred to the implementation lifecycle. They must be authored as accessible semantic dark values under NeoSmartUI authority; the pinned legacy source is design knowledge, not a license to copy implementation bytes. Written state labels and non-color meaning remain authoritative.

The existing `/flavors/rivet/` proof surface remains the canonical Flavor route. Contract work MUST NOT mutate that proven source route, add Dark runtime CSS, add a Dark Foundry fragment, add Dark browser tests, alter the existing public-proof bindings, fork Core adapters, or create a competing `flavor.rivet-dark` identity.

No Pages deployment occurs from the contract branch. After this contract merges green and mandatory merged-main Quality passes, Rivet Dark implementation follows as a separate slice.

## Public-proof cohort

Rivet Light reached `public-proof` only after its implementation was merged, the exact merged-main artifact was independently verified, and those exact bytes were deployed to GitHub Pages without rebuilding.

- deployed source: `neosmartui/neosmartui@5ba46a5962db8241a247574ab920f47cd843925b`
- merged-main Quality run: `34709638377`
- merged-main browser artifact: `10302489738`
- Chromium: `111/111`
- Pages commit: `db3b2013439c3365c900d68899cd750318e3b724`
- Pages tree: `45d8a3a721df9dbba2794c7562e7b5c51578c0a8`
- native Pages run: `34709962865`
- live route: `https://neosmartui.github.io/flavors/rivet/`
- live Theme asset: `https://neosmartui.github.io/rivet-theme.css`
- canonical deployment record: `https://neosmartui.github.io/deployment.json`

The generated Pages run metadata retained the preceding Pages SHA in its `head_sha` / `build_revision` label. That stale label is not used as proof of deployed bytes. The native build job checked out `main` and recorded `git log -1` as `db3b2013439c3365c900d68899cd750318e3b724`; its Pages artifact contains all 39 deployable Foundry files byte-identical to merged-main artifact `10302489738`, plus only Jekyll's generated `assets/css/style.css`. The public-proof live validator independently verifies the served deployment record, Rivet route, and Theme markers before this promotion can merge.

For historical clarity, the implementation phase previously used an `implemented` maturity marker and said public proof was not yet claimed. Those phase statements are superseded by the evidence-bound public-proof state above.

## Migration provenance

The primary legacy knowledge source is pinned as `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d`. The migration inventory classifies `legacy.rivet.flavor-system` as `ADAPT` into the Flavor layer.

Pinned knowledge establishes useful Rivet principles: semantic tokens rather than component-local color values, fluid `clamp()` sizing, crisp hard-shadow elevation, physical hover/press movement, explicit motion tokens, reduced-motion support, light/dark semantic mappings, machine-readable component discovery, and a recognizable industrial/mechanical NeoBrutal personality. Its lavender/lime/peach/blue and ink/paper relationships are treated as design knowledge inputs; NeoSmartUI owns the final semantic mapping above.

Repository metadata for the pinned source does not declare a project license. The migration policy remains `knowledge-only-until-reviewed`: NeoSmartUI extracts architecture and design knowledge, but copied no legacy implementation CSS/TypeScript/React bytes.

## Verification boundary

Rivet public proof remains evidence-bound rather than declarative. Structural validation checks the singleton deployment cohort and current implementation blob SHAs. Live validation checks the canonical deployment record, dedicated Rivet page markers, and exact `rivet-theme.css` markers over HTTPS. Browser coverage verifies the 18/55 resolution, palette, pressure physics, shared-adapter identity, static-surface stability, reduced motion, forced colors, focus, and narrow/RTL containment.

Public-proof promotion does not redeploy Pages.

Rivet Dark follows as its own concrete Theme instance. The legacy source demonstrates dark-mode intent, but NeoSmartUI MUST NOT implement dark mode as a hidden conditional mutation or inversion filter.

## Current exclusions

- No Rivet renderer override.
- Rivet Dark is descriptor-only: no Dark `resolution.json`, `tokens.json`, runtime CSS, fragment, browser implementation tests, or public-proof binding yet.
- No Core adapter fork.
- No Vertical semantics inside the Flavor.
- No deployment during public-proof promotion.

## Next lifecycle stage

Rivet Light is complete through public proof. Rivet Dark is contract-only; its implementation begins only after this contract merges green and mandatory merged-main Quality verifies the exact merge.
