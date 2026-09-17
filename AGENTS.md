# NeoSmartUI Agent Contract

## Authority order

1. `docs/CANONICAL-PRD.md` — permanent product, architecture, migration, competitive-strategy, quality, and roadmap authority.
2. `spec/schemas/*` — schema authority once introduced.
3. Registry files — identity/capability authority once introduced.
4. Package implementations — runtime authority for their owned capability.
5. Derived docs — explanatory only; they must not override the Canonical PRD or machine-readable authorities.

When authorities disagree, stop and classify the drift. Do not silently choose the convenient version.

## Architecture laws

Preserve:

```text
SPEC → CORE → COMPONENTS → BLOCKS → PAGES → APPLICATIONS
```

Keep these independent:

- **Flavor**: visual/physical expression.
- **Vertical**: domain/business knowledge.
- **Theme**: configured instance of a flavor.

Commerce and SaaS are verticals. Hardline, Soft, Rivet, and Mono are flavors. Never model Commerce as a flavor.

A capability belongs in Core when it can be accurately described without naming a business domain. Prefer vertical correctness first; promote to Core only when genuinely generic or obviously generic before implementation.

## Agent laws

- DISCOVER before inventing.
- COMPOSE before duplicating.
- CORE before vertical duplication.
- VERTICAL before application duplication.
- TOKENS before hardcoded styling.
- CONTRACTS before assumptions.
- STATE AUTHORITY before demo copy.
- ACCESSIBILITY before visual polish.
- VALIDATE before completion.
- EXPLAIN architectural selections made by automation.

If no valid capability exists, report `REGISTRY GAP` and classify it as Core, Vertical, or application-specific. Do not hallucinate IDs, domain states, provider fields, theme tokens, dependencies, or architecture.

## Interaction identity

Preserve the NeoSmartUI laws:

- Sharp before soft.
- Compress, never float.
- Pressure, not levitation.
- Color is part of interaction.
- Motion communicates physics.
- Static things remain stable.
- Accessibility is structural.

Ordinary controls must not generically move upward on hover. Pressure and exact physical values belong in Flavor/Theme tokens rather than being independently hardcoded in components.

## Migration discipline

Permanent rule: **RESTART THE ARCHITECTURE, NOT THE KNOWLEDGE.**

Before relying on a legacy source, verify its branch and exact SHA. Every migrated artifact must receive exactly one decision: `ADOPT`, `ADAPT`, `PROMOTE`, `REWRITE`, `RETIRE`, or `REFERENCE`.

Preserve provenance: source repository, path, SHA, license/attribution, old ID, new ID, decision, rationale, status, and valuable test/failure history.

Do not bulk-copy legacy components before destination contracts are defined.

## Repository discipline

`neosmartui/neosmartui` is canonical source. `neosmartui/neosmartui.github.io` is generated deployment output only.

Use branch → implementation → tests → PR → exact-SHA verification → merge. Do not do casual feature work directly on `main`.

Do not weaken or delete tests to make CI pass. Investigate the defect. Preserve exact failure details.

A GitHub Actions scheduler/control-plane incident MUST NOT be worked around by creating a no-op source commit, rewriting history, or moving `main` solely to obtain another run. When a mandatory merged-main Quality run is demonstrably orphaned before jobs execute, use `docs/CI-INCIDENT-RECOVERY.md`: existing commits only, exact canonical source SHA, byte-identical Quality workflow, unchanged mandatory gates, independently verified artifact provenance, and a temporary recovery PR that is closed unmerged. Recovery evidence substitutes for the missing scheduler execution; it does not make the orphaned run successful.

## Public proof

Permanent rule: **SOURCE ONCE. DEMONSTRATE EVERYWHERE.**

Foundry, flavor pages, vertical pages, labs, Studio, registry, and agent surfaces should render shipping contracts/implementations wherever practical. Do not create preview-only lookalikes when the real system can be rendered.

## Work sequencing

Follow `docs/DEVELOPMENT-ROADMAP.md`, but defer to the Canonical PRD if they diverge. When a slice completes, immediately choose the earliest unfinished dependency. Do not jump ahead because later work is more exciting.
