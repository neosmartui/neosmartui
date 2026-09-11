# NeoSmartUI

**NeoSmartUI — The AI-first neo-brutalist UI system.**

Built for humans. Structured for agents.

NeoSmartUI is one agent-native UI architecture with reusable Core capabilities, configurable physical/visual flavors, domain-aware verticals, versioned themes, machine-readable contracts, live public proof, and explainable AI composition.

## Authority

The permanent product, architecture, migration, competitive-strategy, quality, and roadmap authority is [`docs/CANONICAL-PRD.md`](docs/CANONICAL-PRD.md).

Derived documents may summarize the Canonical PRD, but they must not contradict or replace it.

- Operational roadmap: [`docs/DEVELOPMENT-ROADMAP.md`](docs/DEVELOPMENT-ROADMAP.md)
- Foundry source/deployment contract: [`docs/FOUNDRY-DEPLOYMENT.md`](docs/FOUNDRY-DEPLOYMENT.md)
- Coding-agent rules: [`AGENTS.md`](AGENTS.md)
- Compact LLM guide: [`LLMS.md`](LLMS.md)
- Migration ledger: [`migration/inventory.json`](migration/inventory.json)

## Architecture

```text
SPEC
  ↓
CORE
  ↓
COMPONENTS
  ↓
BLOCKS
  ↓
PAGES
  ↓
APPLICATIONS
```

Independent dimensions:

```text
FLAVOR   = how it looks and physically feels
VERTICAL = what domain/business knowledge it understands
THEME    = a configured instance of a flavor
```

Composition:

```text
Core + Vertical + Flavor + Theme + Framework Adapter = Application UI
```

Commerce and SaaS are verticals. Hardline, Soft, Rivet, and Mono are flavors.

## Permanent rules

> **RESTART THE ARCHITECTURE, NOT THE KNOWLEDGE.**

> **SOURCE ONCE. DEMONSTRATE EVERYWHERE.**

> **BUILT FOR HUMANS. STRUCTURED FOR AGENTS.**

## Repository role

This repository, `neosmartui/neosmartui`, is the canonical source of truth.

`neosmartui/neosmartui.github.io` is generated deployment output for the NeoSmartUI Foundry. It must never become a second source of truth.

Development is branch → implementation → tests → PR → exact-SHA verification → merge. Do not use `main` for casual feature development.

## Current roadmap position

v0.1 Foundation is in progress. Destination architecture, repository authority, migration provenance, baseline validation, and Foundry build/deployment boundaries come before bulk component migration.
