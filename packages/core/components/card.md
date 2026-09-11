# `core.card`

`core.card` is NeoSmartUI's generic informational grouping surface. It gives related content one stable visual container without importing business meaning, navigation, activation, selection, form behavior, or application-specific layout.

## Semantic boundary

The primitive is informational by default. It has no inherent HTML landmark, heading level, button role, link role, selection role, or keyboard behavior. Consumers choose an appropriate semantic host such as `div`, `section`, or `article` based on the content and document structure; Core MUST NOT manufacture semantics merely because content is visually boxed.

A generic Card MUST NOT become clickable by attaching a click handler, `tabindex`, or `role="button"` to the entire container. If a whole surface truly performs one action or navigation, that interaction needs an actual button/link semantic or a separately contracted actionable-card composition. Nested buttons and links retain their own semantics and focus order.

Header, title, description, content, action area, and footer are useful anatomy names for composition, not automatic accessibility roles. A Card title does not choose its own heading rank, and an action slot does not make the entire Card interactive.

## State model

The initial Core Card has one state: `rest`.

That narrow model is intentional. Informational cards are stable surfaces, so `hover`, `focus-visible`, `pressed`, `selected`, `loading`, and `disabled` are not Card states. Those states belong to the interactive descendants or to a future capability with explicit action/navigation semantics.

Presentation variants such as default, flat, muted, or accent may eventually change surface treatment, but they MUST NOT silently change the Card's interaction semantics.

## Interaction law: stable means stable

Pinned family conformance is explicit: only cards with an action or navigation role may react to hover/press; informational cards remain stable. Therefore `core.card` MUST NOT translate, compress, lift, deepen its shadow, or otherwise imply clickability on hover, pointer contact, keyboard focus elsewhere, or touch.

A structural resting depth is allowed because depth can describe the physical surface itself. That depth remains unchanged by proximity/contact. The permanent pressure-not-levitation law is not an excuse to add compression to something that is not pressable.

## Keyboard and touch

`core.card` itself does not enter the tab order and does not synthesize keyboard activation. Keyboard users reach interactive descendants in normal document order. Touch users receive no fake whole-card press response when the surface is informational.

If the Card contains controls, their hit targets, focus-visible treatment, activation, disabled state, and reduced-motion behavior remain owned by those controls.

## RTL and long content

Internal layout must use logical rather than physical direction assumptions. Long titles, descriptions, identifiers, localized strings, and nested content must wrap without forcing horizontal overflow or reducing the usability of contained controls.

Card anatomy order follows content meaning and reading order; visual rearrangement MUST NOT create a contradictory keyboard or assistive-technology order.

## Reduced motion and forced colors

The informational Card has no state-driven movement to suppress. Reduced-motion mode therefore preserves the same stable surface.

Forced-colors/high-contrast rendering must retain a perceivable grouping boundary where the Theme's normal surface/color distinction is unavailable. Content cannot disappear merely because custom background, border, or shadow colors are overridden by the platform.

## Token boundary

A Card is a surface, not a control. It therefore MUST NOT borrow `border.control.width`, `radius.control`, or control padding simply because those values happen to look convenient. The contract introduces value-free surface roles for padding, border width, and radius. Concrete values remain owned by Flavor/Theme resolution and are not added at contract-only maturity.

The initial structural dependencies are surface/background/content roles, surface geometry/padding roles, resting depth only, and body/emphasis typography. Hover/active depth and press-translation tokens are intentionally absent.

## Migration knowledge provenance

This contract is a clean NeoSmartUI definition informed by pinned legacy evidence; no legacy implementation code is copied.

- Family conformance: `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626` — `COMPONENTS.md` explicitly states that only cards with action/navigation semantics may react to hover/press and that informational cards remain stable.
- Soft capability evidence: `NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a` — `COMPONENTS.md` lists Card among Core primitives and documents default/flat/muted/accent/interactive presentation knowledge. NeoSmartUI keeps the generic Card informational instead of allowing a visual variant to smuggle in interaction semantics.
- Rivet implementation knowledge: `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d` — `components/ui/card.tsx` demonstrates generic Card anatomy (`card`, header, title, description, action, content, footer) as implementation knowledge only. Repository metadata declares no license, so no source code is copied.

## Maturity

Maturity is `contract-only`. No implementation or public-proof claim exists in this slice.
