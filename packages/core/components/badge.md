# `core.badge`

`core.badge` is NeoSmartUI's compact informational metadata/status primitive. It can label a category, state, count, or concise condition without importing business meaning and without becoming an action merely because it looks prominent.

## Semantic boundary

The default Badge is non-interactive. The default `span` host is appropriate when the Badge is only visible metadata. Core MUST NOT add `tabindex`, `role="button"`, click handlers, keyboard activation, or link semantics to a Badge just to make a pill-shaped element feel interactive.

If the compact label truly navigates or performs an action, composition must use a real link/button semantic or a separately contracted interactive capability. Styling an `<a>` or `<button>` to resemble a Badge does not change the fact that the link/button component owns activation, focus, disabled behavior, and pressure physics.

`role="status"` is also NOT the Badge default. ARIA `status` creates a live region intended for meaningful dynamic updates; static text such as `Active`, `Beta`, or `3 items` must not be announced as a live region merely because it is visually a status badge. Composition may opt into appropriate live-region semantics when an actual asynchronous status change needs announcement.

## State and tone model

The initial contract exposes:

- `rest` — the Badge itself has no interaction state.
- `neutral` — ordinary metadata/category treatment.
- `info` — informational status tone.
- `success` — positive/completed status tone.
- `warning` — caution/attention status tone.
- `error` — failure/error status tone.

The tone states are semantic presentation classifications, not hover/press states. They are mutually exclusive for one Badge instance unless a higher-level composition explicitly defines another model.

Tone MUST NOT be the sole carrier of meaning. Text, accessible naming, or another non-color cue must make the status understandable when color perception or custom colors are unavailable.

## Interaction law: informational means motionless

The Badge itself is not pressable. It MUST NOT translate, compress, lift, deepen its shadow, show a pointer cursor, or manufacture focus-visible treatment on hover/contact. Reduced motion therefore has no Badge-specific travel to suppress.

Pinned Rivet implementation knowledge reinforces this semantic split: the ordinary Badge host is a `span`, while hover rules in that legacy artifact are explicitly conditional on an anchor host. NeoSmartUI preserves the lesson, not the source code: interaction belongs to the actual semantic host, not to the visual Badge shape.

## Content and icon rules

Badge content should remain compact, but compact does not mean cryptic. Short localized text, numbers, and optional icons are allowed. A decorative icon that merely repeats adjacent text should be hidden from assistive technology; an icon carrying unique meaning requires an accessible text equivalent.

Counts must preserve their actual semantic meaning. Composition may abbreviate visually only when the accessible name/value still communicates the intended quantity. Core does not own notification counting, unread logic, or business-state calculation.

## Keyboard and touch

A non-interactive Badge does not enter the tab order and has no keyboard activation model. Touch contact on the Badge alone performs no action and receives no fake pressed response.

When a Badge is composed inside or alongside a real interactive control, that control owns target size, focus indication, activation, and tactile feedback. The Badge must not create a second nested interaction target accidentally.

## RTL, localization, and long content

Layout must use logical inline/block geometry. Direction is inherited from content/composition. Badge text and optional leading/trailing content must remain understandable under RTL and mixed-direction text.

The implementation must not silently truncate essential status text. Long localized labels may wrap or be constrained by higher-level composition, but Core must avoid fixed physical-width assumptions that make translated status meaning inaccessible.

## Forced colors and contrast

Forced-colors/high-contrast rendering must keep text readable and preserve a perceivable Badge boundary when the Theme's background/tone colors are overridden. Semantic status meaning cannot disappear when custom color is unavailable.

Status foreground/background pairings must meet the system's contrast requirements. `color.content.inverse` may be used when a resolved status surface requires inverse text; Theme resolution remains responsible for the concrete pairing.

## Token boundary

A Badge is neither an ordinary pressable control nor a grouped Card surface. It MUST NOT borrow `space.control.*`, `border.control.width`, `radius.control`, `space.surface.*`, `border.surface.width`, or `radius.surface` merely because those values are already resolved.

Slice 10 introduces value-free compact annotation roles instead:

- `space.annotation.inline`
- `space.annotation.block`
- `border.annotation.width`
- `radius.annotation`

Concrete values remain Flavor/Theme-owned and are intentionally absent while Badge maturity is contract-only. Status tones use the existing semantic `color.state.info`, `color.state.success`, `color.state.warning`, and `color.state.error` contracts rather than component-specific color names.

## Migration knowledge provenance

This contract is a clean NeoSmartUI definition informed by pinned legacy evidence; no legacy implementation code is copied.

- Family conformance: `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626` — shared laws prohibit generic hover lift, require semantic-token/state documentation, and explicitly require static surfaces not to mimic interactive motion. Badge applies those family laws as a non-interactive primitive.
- Soft capability evidence: `NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a` — `COMPONENTS.md` explicitly lists `Badge/status` among reusable Core primitives and requires RTL/high-contrast/state resilience.
- Rivet implementation knowledge: `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d` — `components/ui/badge.tsx` uses a neutral `span` host by default and scopes hover styling to anchor-host usage. Repository metadata declares no license, so this is reference-only knowledge and no source code is copied.

## Maturity

Maturity is `contract-only`. No canonical NeoSmartUI implementation or public-proof claim exists in this slice.
