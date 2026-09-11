# `core.breadcrumb`

`core.breadcrumb` is NeoSmartUI's generic hierarchical navigation trail. It communicates where the current page sits inside a broader information hierarchy and gives users real navigation links back to ancestor locations without importing router, application-shell, commerce, SaaS, or product-specific meaning.

## Semantic boundary

Breadcrumb is a navigation semantic, not a visual row of buttons. On the Web the trail SHOULD use a navigation landmark with an accessible label such as `Breadcrumb`, containing an ordered list that represents the hierarchy from broader ancestor to current location.

Ancestor crumbs that navigate MUST be real links with real destinations. Core MUST NOT replace anchors with click handlers, buttons, `role="link"` spans, or router-only pseudo-links merely to obtain styling control. Native link semantics, open-in-new-context behavior, browser history, copy-link behavior, and assistive-technology navigation remain intact.

The current page is not a disabled link. It SHOULD be ordinary non-interactive text marked with `aria-current="page"` on the current item/text as appropriate. Core MUST NOT manufacture `role="link" aria-disabled="true"` for the current page simply because a legacy implementation did so; there is no navigation destination to disable.

The Breadcrumb container itself is not focusable or actionable. It does not own routing, prefetching, page loading, history mutation, authorization, truncation policy, or application-shell placement.

## Ordered hierarchy and anatomy

The canonical anatomy is:

- navigation landmark with an accessible label;
- ordered list representing hierarchy;
- list item per location;
- real link for navigable ancestors;
- one non-interactive current-page item with `aria-current="page"`;
- presentation-only separators between items;
- optional presentation-only ellipsis when composition intentionally collapses intermediate visual detail.

An ordered list is preferred because breadcrumb position conveys hierarchy. Visual separators such as `/`, `›`, or chevrons MUST NOT be exposed as meaningful list content to assistive technology. CSS-generated separators or elements with presentation/hidden semantics are valid approaches when the accessible hierarchy remains clean.

An ellipsis is not automatically a menu trigger. A passive ellipsis only communicates omitted visual detail and MUST be hidden from the accessibility tree if it conveys no unique semantic content. If an ellipsis opens hidden ancestors, that trigger/menu interaction is a separate contracted capability and cannot be smuggled into `core.breadcrumb`.

## State model

The initial contract exposes only:

- `rest` — the navigation trail and ancestor links are available normally.
- `current` — exactly one location identifies the current page through `aria-current="page"` and is not navigable back to itself by default.

`hover`, `focus-visible`, `pressed`, and `visited` are native states of the real ancestor links, not independent state of the Breadcrumb container. `disabled`, `loading`, `selected`, `expanded`, and `open` are not Breadcrumb states in this primitive.

## Interaction law: links are not button surfaces

Breadcrumb ancestor links are interactive navigation text, but they are not tactile button surfaces. Core MUST NOT add structural depth, box-shadow compression, control padding, active translation, or hover lift to inline breadcrumb links merely because they can be clicked.

Hover MAY strengthen foreground color and/or text decoration. Keyboard focus MUST remain explicit and distinct from hover. Native activation occurs through the anchor semantics; Space MUST NOT be remapped to click an ordinary link, while Enter retains platform navigation behavior.

Family pressure laws still apply wherever an actual separate pressable control is composed into the trail, such as a future overflow-menu button. That control owns its own tactile feedback; the Breadcrumb does not make every crumb physically depress like a button.

## Keyboard and touch

The Breadcrumb container and current-page text do not enter the tab order. Keyboard focus reaches only genuine ancestor links and any separately contracted interactive descendants in document order.

Core MUST NOT implement arrow-key roving focus for an ordinary breadcrumb. Users navigate links with the platform's normal Tab/Shift+Tab behavior. Enter follows the focused link. Browser link context-menu and modifier-key behavior remain native.

Touch users receive normal anchor activation without depending on hover. Breadcrumb layout must leave links comfortably distinguishable and operable, while this contract does not falsely claim the 44px button target token for inline text links where document-flow link semantics differ from standalone controls.

## Current page and duplicate navigation

Exactly one crumb SHOULD represent the current location. That item SHOULD use `aria-current="page"` and SHOULD NOT link to the same current URL by default, because a self-link adds redundant navigation without adding hierarchy.

The visible current-page text must remain readable without color alone. Stronger foreground and/or emphasis weight may support the distinction, but `aria-current` is the machine-readable authority.

If composition intentionally includes a link to the current resource for a special workflow, that is outside this default primitive and must not remove the current-location semantic.

## RTL, localization, and long paths

Breadcrumb layout uses logical inline geometry and MUST support RTL without reversing the semantic hierarchy in the DOM. Reading/navigation order remains the logical ancestor-to-current sequence appropriate to the document; visual separator glyphs may mirror when needed without changing item order semantics.

Long translated labels, identifiers, nested hierarchy names, and mixed-direction content must wrap without forcing horizontal page overflow. The primitive MUST NOT truncate essential current-location text by default. Composition may collapse intermediate visual crumbs only when the accessible hierarchy and recovery path remain understandable.

## Reduced motion and forced colors

Breadcrumb owns no structural motion. Reduced-motion mode therefore requires no special travel suppression; ancestor link state changes should remain non-spatial or near-instant.

Forced-colors/high-contrast mode must preserve visible link affordance, explicit keyboard focus, readable current-page text, and hierarchy separators where visually useful. Current-page meaning cannot depend on custom color because `aria-current` and text remain authoritative.

## Token boundary

Breadcrumb introduces two value-free navigation roles:

- `space.navigation.gap` — logical spacing between neighboring navigation items/separators;
- `font.size.navigation` — compact readable typography for navigation metadata/trails.

These roles are deliberately not `space.control.*`, Field spacing, Card surface spacing, or Badge annotation spacing. Breadcrumb has no control surface to pad and no grouped surface to frame.

The remaining dependencies are existing readable foreground, focus-ring, body-font, regular-weight, and emphasis-weight roles. Breadcrumb intentionally does not depend on control borders/radii, minimum control size, structural depth, press translation, or press/release motion tokens.

Contract-only maturity adds no concrete Rivet Light values for the two new roles. Implementation may later resolve them from pinned source evidence only after the contract is green; existing Theme values MUST NOT be changed merely to fit Breadcrumb.

## Migration knowledge provenance

This contract is a clean NeoSmartUI definition informed by pinned legacy evidence; no legacy implementation code is copied.

- Family conformance: `NeoBrutalism-shop/spec@fbf499397f4e9a52d6e25c13921fd5377799c626` — shared keyboard, touch, focus, reduced-motion, fluid-token, and no-generic-hover-lift laws apply. Breadcrumb narrows those laws by treating ancestor crumbs as native text links rather than ordinary pressable button surfaces.
- Soft capability evidence: `NeoBrutalism-shop/NeoBrutal-Soft@dfed77bd159ac5c38081f7a4ca5c2229b61ffb8a` — `COMPONENTS.md` explicitly lists breadcrumb under reusable Navigation + discovery capability.
- Soft implementation knowledge: the same pinned repository's `components.html` uses a simple hierarchy of ancestor anchors plus one `aria-current="page"` list item, while `src/components/navigation.css` provides wrapped list anatomy, muted ancestor/current hierarchy, separators, and a dedicated `.45rem` breadcrumb gap. These remain reference-only knowledge.
- Rivet implementation knowledge: `NeoBrutalRivet/NeoBrutal-Rivet@bb4b641d35bc77c958b7345a3b7c0a134c7d802d` — `components/ui/breadcrumb.tsx` provides navigation/ordered-list/item/link/current/separator/ellipsis anatomy. NeoSmartUI intentionally does not adopt its current-page `role="link" aria-disabled="true"` pattern because current location is not a disabled navigation target. Repository metadata declares no license, so this remains reference-only knowledge.

## Maturity

Maturity is `contract-only`. No Web implementation, concrete `space.navigation.gap` or `font.size.navigation` Theme values, Foundry example, browser test, or public-proof claim exists in this slice.
