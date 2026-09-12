# `core.accordion`

`core.accordion` is a generic disclosure composite for showing and hiding related content sections. It is not Tabs, navigation, a menu, or a business-domain workflow.

## Semantic boundary

An Accordion is composed from repeated items. Each item has a heading, a real button trigger, and one controlled content panel.

The trigger MUST remain a real `<button>` with ordinary button keyboard and focus behavior. It MUST expose `aria-expanded="true|false"` and MUST reference its panel through `aria-controls`. The controlled panel MUST have a stable ID and MUST be programmatically associated back to its trigger, for example with `aria-labelledby`.

The root does not receive a synthetic widget role merely because multiple disclosure items are grouped together. A panel MAY use `role="region"` when the surrounding information architecture benefits from a landmark, but Core MUST NOT make every Accordion panel a region by default when that would create landmark noise.

Accordion may support single-expansion or multiple-expansion composition. That policy changes how peer items coordinate; it does not change the trigger/panel semantics of an individual item.

## State authority

The contract exposes exactly:

- `rest`
- `hover`
- `focus-visible`
- `pressed`
- `closed`
- `open`
- `disabled`

`open` and `closed` describe disclosure state. They are not selection, navigation-current, or tab-selection states.

A disabled item keeps an explicitly disabled trigger and cannot be toggled. Disabled presentation MUST NOT be the only thing preventing activation.

## Keyboard and focus

Tab and Shift+Tab retain ordinary document focus traversal. Accordion triggers stay in normal Tab order rather than using a roving-tabindex model.

Space and Enter toggle the focused trigger through native button activation. Core Accordion MUST NOT require ArrowUp, ArrowDown, Home, or End remapping for conformance, and the canonical implementation MUST NOT hijack those keys merely to imitate Tabs.

Opening a panel MUST NOT move focus into the panel automatically. Closing a panel MUST NOT move focus away from its trigger unless a higher-level composition has an independently documented focus-management reason.

Focusable descendants of a closed panel MUST NOT remain operable or reachable as though the panel were visible.

## Pressure and motion

The trigger is a real pressable control and follows the NeoSmartUI pressure law:

- rest keeps structural depth;
- hover/proximity compresses toward the resting surface;
- direct press reaches full or near-full compression;
- release restores depth in a short controlled motion;
- hover MUST NOT increase apparent elevation.

Disclosure state persists after the transient press ends. An open trigger MUST remain visually distinguishable, but Core does not require it to stay fully pressed or masquerade as a selected Tab.

The revealed panel may animate to communicate hierarchy, but the reveal MUST NOT make the trigger appear to float upward. Motion MUST use semantic motion roles and MUST avoid broad `transition: all` behavior.

With reduced motion enabled, disclosure becomes near-instant or uses only subtle non-spatial feedback while preserving the same open/closed semantics.

A disclosure indicator may rotate or otherwise reflect expanded state. Decorative indicators MUST NOT become a separate focus target or duplicate the trigger's accessible name.

## Touch, RTL, localization, and forced colors

The trigger's effective target MUST meet or exceed `size.control.minimum`. Touch activation receives immediate contact feedback and MUST NOT depend on hover.

Layout uses logical inline/block geometry so RTL does not reverse disclosure meaning. Trigger text and panel content MUST wrap under long localization rather than forcing page-level horizontal overflow. Any indicator belongs at logical inline-end unless the theme deliberately specifies another logical placement.

Forced-colors rendering MUST preserve visible trigger boundaries, focus, disabled meaning, and open/closed relationships without depending only on custom color.

## Token contract

Accordion uses existing Core roles only. Trigger geometry and pressure use control, target-size, depth, press, focus, disabled-opacity, and press/release motion roles. Panel content uses existing panel/surface spacing, border, radius, body typography, and standard disclosure motion roles.

The contract introduces no Accordion-specific token and does not justify a new Theme value by itself.

Accordion MUST NOT borrow annotation or navigation typography/spacing roles merely because an indicator or heading is present.

## Migration provenance

The pinned family `COMPONENTS.md` provides the shared interactive laws used here: explicit state modeling, pressure-not-levitation, keyboard focus, touch acknowledgement, reduced-motion behavior, semantic tokens, and agent-readable metadata. That family snapshot does not contain a separate Accordion-specific interaction law, so NeoSmartUI does not claim one.

The pinned Soft snapshot does not list or implement Accordion as a reusable capability. No Soft Accordion provenance is claimed.

Pinned Rivet contains `components/ui/accordion.tsx`, which provides reference-only anatomy for root, item, heading/trigger, content, open/closed state, disabled handling, focus treatment, and a disclosure indicator. Rivet repository metadata declares no license, so NeoSmartUI copies no source implementation.

## Lifecycle

Maturity is `contract-only`.

Implementation evidence is `null` and public-proof evidence is `null`. A canonical Web implementation, browser QA, exact merged-main artifact, exact deployment, native Pages verification, and singleton cohort refresh are later lifecycle stages and MUST NOT be claimed by this contract PR.
