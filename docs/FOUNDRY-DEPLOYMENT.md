# NeoSmartUI Foundry — Source and Deployment Contract

This document is derived from the Canonical PRD. The Canonical PRD remains authoritative.

## Active v0.1 topology — GitHub first

```text
neosmartui/neosmartui
        ↓
build + test + validate
        ↓
GitHub Actions
        ↓
neosmartui/neosmartui.github.io
        ↓
https://neosmartui.github.io/
```

`neosmartui/neosmartui` owns source, contracts, tests, tooling, and history. `neosmartui/neosmartui.github.io` owns generated deploy output only. GitHub Pages is the authoritative public host during v0.1.

**Custom domain is deferred.** `neosmartui.com` may be attached later, but DNS, Cloudflare, registrar settings, certificates, or vanity-domain availability MUST NOT block the GitHub-first development roadmap or a public-proof claim that is already verifiable on the GitHub Pages host.

## Foundry baseline

The Foundry root is both a product landing page and a live system index. During v0.1 it deliberately exposes only architecture that actually exists. Flavor, vertical, Studio, and Lab routes must not be hand-built lookalikes before their shipping implementations exist.

Source lives under `apps/foundry/`. `npm run build:foundry` writes deterministic static output to `dist/foundry/`. Every generated artifact includes `deployment.json`, which records the canonical `neosmartui/neosmartui` source SHA.

The v0.1 build MUST NOT emit a `CNAME`. The deployment repository therefore uses its native GitHub Pages hostname until a later explicit custom-domain milestone.

## Safe CI / deployment strategy

1. Pull-request CI validates repository authority, builds the Foundry from the explicit PR head SHA, and runs real Chromium browser QA.
2. No PR or branch build pushes to the deployment repository.
3. After merge to `main`, the same Quality workflow builds and browser-tests the exact merged SHA.
4. The generated `dist/foundry/` tree from a green merged SHA is the only valid publish input.
5. The deployment repository must remain generated output only; do not hand-maintain a divergent implementation there.
6. A live proof claim requires the public GitHub Pages endpoint's `deployment.json` to match the canonical merged source SHA.
7. Failed deployment must not rewrite canonical source history.
8. A future custom-domain migration must preserve the same source-SHA proof contract and must not weaken GitHub Pages verification.

## Deployment automation and bootstrap

The preferred permanent path is a dedicated cross-repository GitHub Actions deployment using a narrowly scoped credential or GitHub App installation that can write only `neosmartui/neosmartui.github.io`.

Until that credential is configured, an authorized maintainer or connected GitHub integration MAY bootstrap-publish the exact already-green `dist/foundry/` text artifact to the deployment repository. The bootstrap path MUST preserve `deployment.json`, MUST NOT edit generated files independently, and MUST be followed by a live URL/source-SHA verification before any registry entry is promoted to `public-proof`.

Custom-domain configuration is intentionally out of scope for v0.1. When it is scheduled later, it should be handled as an infrastructure milestone rather than being coupled to Core component maturity.
