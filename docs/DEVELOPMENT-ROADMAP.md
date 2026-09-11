# NeoSmartUI Development Roadmap

This is an operational summary derived from [`CANONICAL-PRD.md`](CANONICAL-PRD.md). If this file and the Canonical PRD ever disagree, the Canonical PRD wins.

## Product sequence

1. **v0.1 Foundation** — monorepo, GitHub permanent-home contract, Foundry deployment baseline, Spec v1, schemas, stable namespaces, migration ledger, registry architecture, CI baseline, package boundaries.
2. **v0.2 Core** — Core foundations, generic component migration, contracts, state matrices, accessibility, responsive system, Component Lab.
3. **v0.3 Flavor Engine** — `neosmartui/theme@1`, Hardline, Soft, Rivet, Mono, light/dark, typography, icons, geometry, shadow, motion, Pressure System.
4. **v0.4 NeoSmartUI Studio** — visual theme editing, Pressure System controls, state/responsive previews, import/export, validation.
5. **v0.5 Core Blocks** — marketing, application, and content Blocks; Block Lab; machine-readable composition.
6. **v0.6 Commerce Vertical** — Commerce models, domain components, Blocks, Pages, real application journey, all official flavors, complete state model.
7. **v0.7 Smart Agent Platform** — NeoSmart Resolver, registry API, CLI, MCP, recipes, anti-patterns, explainable selection, Agent Lab.
8. **v0.8 Distribution** — source-copy registry, package strategy, shadcn-compatible workflow where useful, docs, versioning, migration tooling, examples.
9. **v0.9 Hardening** — Chromium/Firefox/WebKit, visual regression, forced colors, RTL, localization, performance, theme/vertical/agent conformance, migration completeness.
10. **v1.0 Stable** — stable contracts for Core, Theme, Flavors, Registry, Resolver, agent behavior, Commerce, CLI, and Studio.
11. **v1.1 SaaS Discovery** — requirements → capability inventory → Core gap analysis → Core expansion → SaaS domain → SaaS Blocks → SaaS Pages.

## Opening PR sequence

- **PR 01:** canonical monorepo scaffold
- **PR 02:** Spec architecture + corrected taxonomy
- **PR 03:** schemas + stable IDs
- **PR 04:** legacy snapshot + migration inventory tooling
- **PR 05:** token architecture
- **PR 06:** Pressure System contract
- **PR 07:** typography + icon registries
- **PR 08:** first Core foundation batch
- **PR 09:** Component Lab
- **PR 10:** Hardline
- **PR 11:** Soft migration
- **PR 12:** Rivet migration
- **PR 13:** Mono
- **PR 14+:** remaining Core capability migration

The exact split may change only when verified dependency/repository reality makes a better split obvious. Architectural intent does not change.

## Current v0.1 execution order

1. Protect canonical-source authority and preserve the Canonical PRD.
2. Establish the monorepo directory/workspace skeleton without bulk component migration.
3. Record source/deployment separation for the Foundry and provide a reproducible local/CI Foundry build.
4. Pin exact legacy source SHAs before inventory work.
5. Establish baseline validation and PR CI.
6. Write Spec v1 taxonomy and architecture.
7. Define schemas and stable namespaces.
8. Expand the migration inventory from source snapshots into artifact-level decisions.
9. Establish registry architecture and package-boundary enforcement.

## Development gate

```text
inspect → branch → implement → validate → PR → verify exact head SHA + CI → merge → select earliest unfinished dependency
```

Never weaken QA to make CI green. Never treat generated public output as source authority. Never bulk-copy legacy components before destination contracts exist.
