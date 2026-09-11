# NeoSmartUI Foundry — Source and Deployment Contract

This document is derived from the Canonical PRD. The Canonical PRD remains authoritative.

## Permanent topology

```text
neosmartui/neosmartui
        ↓
build + test + validate
        ↓
GitHub Actions
        ↓
neosmartui/neosmartui.github.io
        ↓
neosmartui.com
```

`neosmartui/neosmartui` owns source, contracts, tests, tooling, and history. `neosmartui/neosmartui.github.io` owns generated deploy output only.

## Foundry baseline

The Foundry root is both a product landing page and a live system index. During v0.1 it deliberately exposes only architecture that actually exists. Flavor, vertical, Studio, and Lab routes must not be hand-built lookalikes before their shipping implementations exist.

Source lives under `apps/foundry/`. `npm run build:foundry` writes deterministic static output to `dist/foundry/`.

The build emits `CNAME` with `neosmartui.com`; the generated deployment repository should receive that file together with the rest of the build output.

## Safe CI / deployment strategy

1. Pull-request CI validates repository authority and builds the Foundry.
2. No PR or branch build pushes to the deployment repository.
3. After merge to protected `main`, a dedicated deployment workflow may build from that exact source SHA and push the generated `dist/foundry/` tree to `neosmartui/neosmartui.github.io`.
4. Cross-repository deployment requires a narrowly scoped credential or GitHub App installation that can write only the deployment repository.
5. A deployment record should retain the canonical source SHA so any public build can be traced back to source.
6. Failed deployment must not rewrite canonical source history.

## Current external setup still required

The connected GitHub integration can read branch protection but does not expose a write operation for branch-protection/ruleset configuration or GitHub Pages custom-domain configuration. Those controls must be enabled in GitHub settings before they can be truthfully reported as enforced.

Cross-repository Actions deployment also needs a repository secret or GitHub App credential with write access to `neosmartui/neosmartui.github.io`. Until that credential exists, CI may build and validate the deployable artifact but must not pretend the automated cross-repository publish path is active.
