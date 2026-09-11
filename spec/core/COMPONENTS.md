# NeoSmartUI Core — Component Registry Contract v1

Core Components are generic UI capabilities that can be described accurately without naming a business domain.

The registry is an authority surface, not a marketing count. A component MUST NOT be listed as implemented or publicly proven until matching evidence exists in the same repository state.

## Admission law

A Core component MUST:

1. be business-domain-neutral;
2. have a stable `core.<name>` ID;
3. publish a machine-readable `neosmartui/component@1` contract;
4. declare all semantic-token dependencies;
5. define state semantics before visual implementation;
6. define keyboard, touch, RTL, reduced-motion, and forced-colors support expectations;
7. preserve permanent tactile laws where interactive;
8. avoid Flavor-specific values or Vertical business semantics;
9. expose honest maturity/proof status in the registry.

If a capability cannot satisfy these rules yet, it is a `REGISTRY GAP`, not permission to invent a local substitute.

## Registry maturity

The registry uses three explicit maturity states:

- `contract-only` — semantic/state/token contract exists; no implementation claim.
- `implemented` — a canonical implementation exists and is quality-validated.
- `public-proof` — the canonical implementation is represented by live/public proof derived from the same source.

Promotion between states requires evidence. Tooling MUST reject a maturity claim whose evidence is absent.

## Slice 1: `core.button`

`core.button` established the first Core path and exercises permanent press/release interaction laws. Its contract covers rest, hover, focus-visible, pressed, loading, and disabled states. Its current public proof is refreshed whenever the singleton development host advances to a newer exact-SHA Foundry deployment that still exercises the unchanged implementation.

## Slice 2: `core.checkbox`

`core.checkbox` adds persistent checked/unchecked selection, indeterminate presentation, invalid state, and contact compression without introducing a business domain. Its native Web implementation and public proof exercise a 44px effective target plus pressure-not-levitation state feedback.

## Slice 3: `core.input`

`core.input` adds generic single-line text-like data entry with a canonical native Web implementation and live public proof. It exercises a different interaction class: the control is interactive but not pressable.

The implementation preserves native editing and selection while synchronizing only agent-readable empty/filled state. Hover, focus, and pointer contact never borrow press/depth tokens or translate the field. Its live proof verifies the same exact-SHA Foundry deployment cohort as the other public Core primitives.

The contract continues to require explicit focus/empty/filled/invalid/read-only/disabled states, a 44px minimum effective control height, RTL/IME resilience, reduced-motion and forced-colors support, and a strict prohibition on borrowing button pressure-depth tokens merely because the field can receive pointer or keyboard interaction.

Field labels, help/error copy, prefixes/suffixes, password reveal actions, and form layout remain composition outside this primitive.

## Slice 4: `core.radio`

`core.radio` provides mutually-exclusive native choice semantics with a canonical NeoSmartUI Web adapter and live public proof. Unlike checkbox, one checked radio affects its peers in the same selection set; the adapter mirrors state across the native group instead of reimplementing exclusivity.

The implementation preserves native same-name/form grouping and arrow-key movement while exposing agent-readable checked/unchecked state. Contact follows the family pressure law: hover and press compress toward the surface, never upward, and checked state remains unambiguous after release. The visible glyph is smaller than the token-backed 44px effective target.

Its current public proof is bound to the same exact-SHA GitHub Pages deployment cohort as the other public Core primitives. Legends, option-label content, shared help/error copy, choice-card presentation, and field layout remain composition outside this primitive.

## Slice 5: `core.switch`

`core.switch` is a binary-setting semantic class with a canonical NeoSmartUI Web adapter and live public proof. It remains intentionally distinct from checkbox and radio: one control owns one immediate off/on setting, has no indeterminate state, and does not participate in a mutually-exclusive group.

The canonical Web adapter uses a native checkbox base with `role="switch"`, preserves browser form participation and Space-key activation, prevents indeterminate presentation, and mirrors only the authoritative checked state to agent-readable `off`/`on` metadata.

The family interaction law combines ordinary contact compression with persistent toggle travel. Thumb position and state color resolve together; off maps to logical inline-start and on maps to logical inline-end, allowing RTL mirroring without reversing semantic meaning. The effective target remains at least 44px even when the visible track is smaller.

Its current public proof is bound to the same exact-SHA GitHub Pages deployment cohort as the other public Core primitives. Setting labels, descriptions, async-save status, confirmation copy, and business consequences remain higher-level composition.

## Slice 6: `core.tabs`

`core.tabs` is a composite peer-panel navigation primitive with a canonical NeoSmartUI Web adapter and live public proof. It owns the tablist/tab/tabpanel relationship, one-selected-panel state, roving focus model, orientation-aware keyboard navigation, activation mode, and tactile trigger behavior without importing routing or business-domain semantics.

The adapter supports both explicit activation modes. Automatic horizontal Tabs move focus and selection together, while manual vertical Tabs allow Arrow/Home/End focus movement without changing selection until Space/Enter. Disabled tabs are skipped, only one enabled tab participates in the page Tab order, and every controlled panel remains linked through `aria-controls`/`aria-labelledby`.

Horizontal navigation follows logical inline direction so next/previous reverses the physical Left/Right mapping under RTL; vertical sets use Down/Up. Home/End target the first/last enabled tab. Normal Tab leaves the composite rather than cycling through peer tabs.

The family interaction law is distinct from ordinary buttons: unselected tab triggers compress toward the surface on contact, while the persistent selected tab remains seated/locked at active depth instead of rising above peers. Selected state remains legible after press feedback ends, and focus-visible stays independently visible.

Rivet Light resolution includes `core.tabs` and adds only the three semantic roles that were previously absent from the exact dependency union: `color.surface.panel`, `font.size.label`, and `font.weight.emphasis`. Their values reuse visual decisions already present in the Foundry rather than introducing new arbitrary Theme choices.

Pinned family and Soft evidence support the semantic/keyboard contract. The pinned Soft React package remains reference-only knowledge; no source code is copied. The reviewed pinned Rivet `components/ui/` tree contains no `tabs.tsx`, so no Rivet Tabs implementation provenance is claimed.

Its current public proof is refreshed onto the same exact merged-main Chromium artifact and native GitHub Pages deployment cohort as every public Core primitive. The current singleton cohort binds source `75449935bccead3173e8b2879f4a398b6df111c0`, merged-main Quality run `34637337995`, browser artifact `10278097590`, deployment tree `7ce5638a2f1556e60a463533ef69445494b6b7cb`, and Pages run `34638732835`; live verification still requires the canonical automatic/manual Tabs markers.

## Slice 7: `core.textarea`

`core.textarea` is generic multiline text entry with a canonical NeoSmartUI Web adapter and live public proof. It owns the native textarea editing surface and its empty/filled, invalid, read-only, disabled, hover, and focus-visible states without importing field-layout, formatting, auto-save, or business-domain semantics.

Textarea remains intentionally separate from `core.input`: line breaks, multiline selection, scrolling, native resize affordances, and larger editing geometry materially change platform behavior. The adapter therefore preserves a real native `<textarea>`, leaves author-supplied native attributes authoritative, and mirrors only empty/filled state into agent-readable metadata rather than recreating editing in JavaScript.

The interaction class remains the same as input: interactive, not pressable. Hover, focus, pointer contact, selection, scrolling, and resizing never borrow press-depth tokens or translate the editing surface toward or away from the page. The canonical CSS keeps structural shadow absent, preserves focus/invalid/read-only/disabled cues, does not disable native resize, and retains reduced-motion and forced-colors resilience.

Rivet Light resolution includes `core.textarea` in scope. Because every textarea dependency was already resolved for existing Core components, the exact resolved-token dependency union and every Theme token value remain unchanged; this implementation adds zero new Theme values.

Pinned family conformance supplies generic focus/keyboard/touch/reduced-motion/fluid-sizing laws, while pinned Soft evidence explicitly lists textarea among reusable Core primitives. The reviewed pinned Rivet snapshot has no `components/ui/textarea.tsx`, so no Rivet textarea implementation provenance is claimed.

Its current public proof shares the singleton cohort at source `75449935bccead3173e8b2879f4a398b6df111c0`, merged-main Quality run `34637337995`, browser artifact `10278097590`, deployment tree `7ce5638a2f1556e60a463533ef69445494b6b7cb`, and native Pages run `34638732835`. Live verification requires the page to expose the canonical multiline textarea, non-pressable, and resize markers while structural validation preserves its own implementation blob binding.

## Slice 8: `core.select`

`core.select` is the generic native single-choice picker with a canonical NeoSmartUI Web adapter and live public proof. Its semantic boundary remains intentionally narrower than custom selection widgets: the implementation preserves a real single-select `<select>`, while multi-select/listbox, combobox/autocomplete/search, async option loading, cascading selection, labels/help/error copy, and form layout remain separate capabilities or composition.

The native selected option/value is authoritative. The adapter mirrors only `selected` state plus current value/index into agent-readable metadata, rejects `multiple` and multi-row/listbox-style selects, and leaves `<option>`, `<optgroup>`, form participation, required/disabled behavior, browser type-ahead, arrow-key navigation, and the browser/OS picker platform-owned. It does not invent a portable `open` state or a fake native placeholder semantic.

The collapsed select follows the permanent pressure-not-levitation law: rest retains structural depth, hover/contact compresses toward the surface, active/pointer contact reaches the existing active depth, and release restores depth. The platform-owned picker itself is not reimplemented as a NeoSmartUI popup merely to obtain custom motion or state hooks.

Rivet Light resolution includes `core.select` in scope. Every select dependency was already present in the exact Core dependency union, so this implementation adds zero new Theme token values; only resolution scope expands.

Foundry renders the native single-select and binds the canonical adapter. Merged-main browser proof verifies native option semantics and metadata synchronization, exact 0→2→5px pressure geometry, focus/invalid/disabled states, RTL behavior, reduced motion, forced colors, and rejection of non-single-select shapes without replacing the browser picker.

Pinned family conformance supplies the generic pressure, focus, keyboard, touch, reduced-motion, sizing, and agent-readable laws. Pinned Soft explicitly lists `select` beside input and textarea among reusable Core primitives. The reviewed pinned Rivet snapshot has no `components/ui/select.tsx`, so no Rivet Select implementation provenance is claimed.

Its public proof is bound to merged-main Quality run `34637337995`, browser artifact `10278097590`, deployment commit `f560c84073184da414d392ed8c4f97e98329b940`, deployment tree `7ce5638a2f1556e60a463533ef69445494b6b7cb`, and native Pages run `34638732835`. Live verification requires `https://neosmartui.github.io/deployment.json` to report source `75449935bccead3173e8b2879f4a398b6df111c0` and the page to expose the canonical native single-select and browser/OS picker-boundary markers. All nine public-proof components share this singleton cohort while retaining their own implementation blob bindings.

## Slice 9: `core.card`

`core.card` is a public-proof informational grouping surface with a deliberately CSS-only Web implementation. It is not a generic clickable container: the Card itself has no built-in button/link role, tab stop, selection state, activation behavior, JavaScript binder, or synthetic state synchronization, and nested controls keep their own semantics and focus order.

Pinned family conformance provides the decisive interaction rule: only cards with a real action or navigation role may react to hover/press; informational cards remain stable. NeoSmartUI therefore keeps the primitive at a single `rest` state. The canonical CSS has no hover/active/focus interaction selectors, sets `transform: none` and `transition: none`, and holds resting structural depth constant through pointer proximity and contact.

Soft explicitly lists Card among reusable Core primitives and records default/flat/muted/accent/interactive presentation knowledge. NeoSmartUI keeps visual variants separate from semantic activation so an `interactive` look cannot silently manufacture keyboard or pointer semantics.

Pinned Rivet contains `components/ui/card.tsx`, which provides useful anatomy knowledge for Card/header/title/description/action/content/footer. That repository snapshot declares no license metadata, so it remains reference-only and no source code is copied.

Card preserves a permanent token-model distinction: a grouped content surface is not a control. It uses `space.surface.inline`, `space.surface.block`, `border.surface.width`, and `radius.surface` rather than control padding/border/radius roles. Rivet Light resolves the exact implemented dependency union with 1rem logical surface padding, a 3px surface border, a 6px surface radius, and `font.weight.strong` at 800 while leaving every previously resolved token value unchanged.

Foundry renders the Card as a semantic `<article>` chosen by the demo's document meaning, not by the primitive itself. The demo contains no whole-card interactive role or tab stop. Dedicated Chromium QA verifies token-backed geometry, stable hover/contact depth, RTL and long-content wrapping, zero-motion reduced-motion behavior, and a visible forced-colors boundary without making the Card focusable.

Its public proof is bound to the same singleton cohort as the other eight public Core primitives: merged source `75449935bccead3173e8b2879f4a398b6df111c0`, Quality run `34637337995`, browser artifact `10278097590`, deployment commit `f560c84073184da414d392ed8c4f97e98329b940`, deployment tree `7ce5638a2f1556e60a463533ef69445494b6b7cb`, and Pages run `34638732835`. Structural proof validation recomputes the Card CSS blob, and live verification requires the deployed Card markers without adding any whole-card interaction semantics.

## Slice 10: `core.badge`

`core.badge` starts as a contract-only compact informational metadata/status primitive. The default semantic host is neutral content such as a `span`; the Badge itself has no link/button role, tab stop, pointer activation, keyboard activation, selection model, or disabled state.

Badge explicitly does not default to ARIA `role="status"`. That role creates a live region and is appropriate only when composition has a meaningful dynamic update to announce. Static labels such as `Active`, `Beta`, or a category/count remain ordinary text unless their surrounding workflow requires separate live-region semantics.

The tone model is `neutral`, `info`, `success`, `warning`, and `error`. Tone is semantic presentation, not interaction state, and color cannot be the only carrier of meaning. Core therefore depends on the existing state-color roles plus readable foreground roles while keeping business-status calculation outside the primitive.

Badge also creates a permanent geometry distinction: compact annotation surfaces are neither controls nor Cards. Slice 10 adds value-free `space.annotation.inline`, `space.annotation.block`, `border.annotation.width`, and `radius.annotation` roles rather than borrowing control or grouped-surface spacing/geometry. No Rivet Light values are added at contract-only maturity.

Pinned Soft explicitly lists `Badge/status` among reusable Core primitives. Pinned Rivet's `badge.tsx` uses a neutral `span` by default and limits hover behavior to anchor-host usage, reinforcing that interaction belongs to an actual semantic link rather than to the Badge shape. The Rivet snapshot has no declared license metadata, so its implementation remains reference-only knowledge and no source code is copied.

The future canonical implementation must remain motionless when informational, preserve readable non-color status meaning, avoid implicit focusability/live-region semantics, support logical RTL layout and long localization, and preserve a visible/readable boundary in forced-colors mode.
