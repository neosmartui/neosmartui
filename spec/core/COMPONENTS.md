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

The family interaction law combines ordinary contact compression with persistent toggle travel. Thumb position and state color resolve together; off maps to logical inline-start and on to logical inline-end, allowing RTL mirroring without reversing semantic meaning. The effective target remains at least 44px even when the visible track is smaller.

Its current public proof is bound to the same exact-SHA GitHub Pages deployment cohort as button, checkbox, input, and radio. Setting labels, descriptions, async-save status, confirmation copy, and business consequences remain higher-level composition.

## Slice 6: `core.tabs`

`core.tabs` is a composite peer-panel navigation primitive with a canonical NeoSmartUI Web adapter and live public proof. It owns the tablist/tab/tabpanel relationship, one-selected-panel state, roving focus model, orientation-aware keyboard navigation, activation mode, and tactile trigger behavior without importing routing or business-domain semantics.

The adapter supports both explicit activation modes. Automatic horizontal Tabs move focus and selection together, while manual vertical Tabs allow Arrow/Home/End focus movement without changing selection until Space/Enter. Disabled tabs are skipped, only one enabled tab participates in the page Tab order, and every controlled panel remains linked through `aria-controls`/`aria-labelledby`.

Horizontal navigation follows logical inline direction so next/previous reverses the physical Left/Right mapping under RTL; vertical sets use Down/Up. Home/End target the first/last enabled tab. Normal Tab leaves the composite rather than cycling through peer tabs.

The family interaction law is distinct from ordinary buttons: unselected tab triggers compress toward the surface on contact, while the persistent selected tab remains seated/locked at active depth instead of rising above peers. Selected state remains legible after press feedback ends, and focus-visible stays independently visible.

Rivet Light resolution includes `core.tabs` and adds only the three semantic roles that were previously absent from the exact dependency union: `color.surface.panel`, `font.size.label`, and `font.weight.emphasis`. Their values reuse visual decisions already present in the Foundry rather than introducing new arbitrary Theme choices.

Pinned family and Soft evidence support the semantic/keyboard contract. The pinned Soft React package remains reference-only knowledge; no source code is copied. The reviewed pinned Rivet `components/ui/` tree contains no `tabs.tsx`, so no Rivet Tabs implementation provenance is claimed.

Its current public proof is refreshed onto the same exact merged-main Chromium artifact and native GitHub Pages deployment cohort as every public Core primitive. The current singleton cohort binds source `f0a19e9084c27ca5a6a904daeb92bfa7dbc0ad92`, merged-main Quality run `34633486142`, browser artifact `10277277111`, and Pages run `34633997409`; live verification still requires the canonical automatic/manual Tabs markers.

## Slice 7: `core.textarea`

`core.textarea` is generic multiline text entry with a canonical NeoSmartUI Web adapter and live public proof. It owns the native textarea editing surface and its empty/filled, invalid, read-only, disabled, hover, and focus-visible states without importing field-layout, formatting, auto-save, or business-domain semantics.

Textarea remains intentionally separate from `core.input`: line breaks, multiline selection, scrolling, native resize affordances, and larger editing geometry materially change platform behavior. The adapter therefore preserves a real native `<textarea>`, leaves author-supplied native attributes authoritative, and mirrors only empty/filled state into agent-readable metadata rather than recreating editing in JavaScript.

The interaction class remains the same as input: interactive, not pressable. Hover, focus, pointer contact, selection, scrolling, and resizing never borrow press-depth tokens or translate the editing surface toward or away from the page. The canonical CSS keeps structural shadow absent, preserves focus/invalid/read-only/disabled cues, does not disable native resize, and retains reduced-motion and forced-colors resilience.

Rivet Light resolution includes `core.textarea` in scope. Because every textarea dependency was already resolved for existing Core components, the exact resolved-token dependency union and every Theme token value remain unchanged; this implementation adds zero new Theme values.

Pinned family conformance supplies generic focus/keyboard/touch/reduced-motion/fluid-sizing laws, while pinned Soft evidence explicitly lists textarea among reusable Core primitives. The reviewed pinned Rivet snapshot has no `components/ui/textarea.tsx`, so no Rivet textarea implementation provenance is claimed.

Its current public proof shares the singleton cohort at source `f0a19e9084c27ca5a6a904daeb92bfa7dbc0ad92`, merged-main Quality run `34633486142`, browser artifact `10277277111`, deployment tree `3e4491947105a96986d072ff3fce0c2813a37f7d`, and native Pages run `34633997409`. Live verification requires the page to expose the canonical multiline textarea, non-pressable, and resize markers while structural validation preserves its own implementation blob binding.

## Slice 8: `core.select`

`core.select` is the generic native single-choice picker with a canonical NeoSmartUI Web adapter and live public proof. Its semantic boundary remains intentionally narrower than custom selection widgets: the implementation preserves a real single-select `<select>`, while multi-select/listbox, combobox/autocomplete/search, async option loading, cascading selection, labels/help/error copy, and form layout remain separate capabilities or composition.

The native selected option/value is authoritative. The adapter mirrors only `selected` state plus current value/index into agent-readable metadata, rejects `multiple` and multi-row/listbox-style selects, and leaves `<option>`, `<optgroup>`, form participation, required/disabled behavior, browser type-ahead, arrow-key navigation, and the browser/OS picker platform-owned. It does not invent a portable `open` state or a fake native placeholder semantic.

The collapsed select follows the permanent pressure-not-levitation law: rest retains structural depth, hover/contact compresses toward the surface, active/pointer contact reaches the existing active depth, and release restores depth. The platform-owned picker itself is not reimplemented as a NeoSmartUI popup merely to obtain custom motion or state hooks.

Rivet Light resolution includes `core.select` in scope. Every select dependency was already present in the exact Core dependency union, so this implementation adds zero new Theme token values; only resolution scope expands.

Foundry renders the native single-select and binds the canonical adapter. Merged-main browser proof verifies native option semantics and metadata synchronization, exact 0→2→5px pressure geometry, focus/invalid/disabled states, RTL behavior, reduced motion, forced colors, and rejection of non-single-select shapes without replacing the browser picker.

Pinned family conformance supplies the generic pressure, focus, keyboard, touch, reduced-motion, sizing, and agent-readable laws. Pinned Soft explicitly lists `select` beside input and textarea among reusable Core primitives. The reviewed pinned Rivet snapshot has no `components/ui/select.tsx`, so no Rivet Select implementation provenance is claimed.

Its public proof is bound to merged-main Quality run `34633486142`, browser artifact `10277277111`, deployment commit `92da1d45e26e278027c3967f3748571d2b0931c5`, deployment tree `3e4491947105a96986d072ff3fce0c2813a37f7d`, and native Pages run `34633997409`. Live verification requires `https://neosmartui.github.io/deployment.json` to report source `f0a19e9084c27ca5a6a904daeb92bfa7dbc0ad92` and the page to expose the canonical native single-select and browser/OS picker-boundary markers. All eight public-proof components must share this singleton cohort while retaining their own implementation blob bindings.
