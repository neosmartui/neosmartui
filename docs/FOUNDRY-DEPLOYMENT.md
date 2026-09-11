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

Source lives under `apps/foundry/`. `npm run build:foundry` writes deterministic static output to `dist/foundry/`. Every generated artifact includes `deployment.json`, which records the canonical `neosmartui/neosmartui` source SHA.

The build emits `CNAME` with `neosmartui.com`; the generated deployment repository should receive that file together with the rest of the build output.

## Safe CI / deployment strategy

1. Pull-request CI validates repository authority, builds the Foundry from the explicit PR head SHA, and runs real Chromium browser QA.
2. No PR or branch build pushes to the deployment repository.
3. After merge to `main`, the same Quality workflow builds and browser-tests the exact merged SHA.
4. The generated `dist/foundry/` tree from a green merged SHA is the only valid publish input.
5. The deployment repository must remain generated output only; do not hand-maintain a divergent implementation there.
6. A live proof claim requires the public endpoint's `deployment.json` to match the canonical merged source SHA.
7. Failed deployment must not rewrite canonical source history.

## Deployment automation and bootstrap

The preferred permanent path is a dedicated cross-repository GitHub Actions deployment using a narrowly scoped credential or GitHub App installation that can write only `neosmartui/neosmartui.github.io`.

Until that credential is configured, an authorized maintainer or connected GitHub integration MAY bootstrap-publish the exact already-green `dist/foundry/` text artifact to the deployment repository. The bootstrap path MUST preserve `deployment.json`, MUST NOT edit generated files independently, and MUST be followed by a live URL/source-SHA verification before any registry entry is promoted to `public-proof`.

The connected GitHub integration can read branch protection but does not expose write operations for branch-protection/ruleset configuration or GitHub Pages custom-domain configuration. Those controls must be enabled in GitHub settings before they can be truthfully reported as enforced.
