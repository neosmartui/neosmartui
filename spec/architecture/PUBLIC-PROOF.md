# NeoSmartUI Spec v1 — Public Proof Contract

Permanent principle: **SOURCE ONCE. DEMONSTRATE EVERYWHERE.**

The Foundry and Labs are architecture proof surfaces, not parallel demo implementations.

## Requirements

- Public previews SHOULD render shipping contracts and implementations wherever practical.
- Fake lookalike Components, Blocks, Pages, Flavors, or Verticals MUST NOT be maintained when the real implementation can be rendered.
- Every released official Flavor MUST eventually have live foundations, Components, Blocks, Pages, light/dark, responsive, interaction-state, and real-application proof where applicable.
- Every released Vertical MUST eventually expose meaningful workflows and production states.
- Cross-flavor Vertical previews MUST reuse the same domain implementation.
- Public counts and identities MUST be generated from registries once registry authority exists.
- `neosmartui/neosmartui.github.io` is generated output only and MUST NOT become a second source of truth.

A public surface that diverges from shipping architecture is a defect, not merely stale documentation.

## CI scheduler incident recovery

A broken CI scheduler record is infrastructure drift, not permission to mutate canonical source solely to obtain another run.

When a mandatory merged-main Quality run is demonstrably orphaned before job execution, NeoSmartUI MAY accept a separate exact-SHA recovery run only under the closed incident contract in `docs/CI-INCIDENT-RECOVERY.md`. Recovery MUST preserve the same canonical source SHA, byte-identical Quality workflow, mandatory validators/tests/browser coverage, and independently verified artifact provenance. The temporary recovery PR MUST use existing commits only and MUST be closed unmerged.

Recovery evidence substitutes for the missing scheduler execution; it MUST NOT rewrite history or claim that the orphaned run itself passed.
