# Public Proof Gate

`public-proof` is an evidence state, not a marketing label.

A component may advance from `implemented` to `public-proof` only when all of the following are true for the same canonical source lineage:

1. **Implementation evidence** — the registry points to committed adapter/runtime implementation.
2. **Exact-SHA browser evidence** — Chromium QA passes against a Foundry build checked out from the PR head SHA (or the merged `main` SHA on push). The run must exercise the actual rendered component rather than only inspect source text.
3. **Deployment provenance** — the generated Foundry includes `deployment.json` with `neosmartui/deployment-record@1` and the exact canonical source SHA.
4. **Live evidence** — the public deployment URL serves that deployment record and the component proof surface successfully.
5. **No maturity leap** — a CI artifact by itself is not public proof. A deployed page without exact-SHA provenance is not public proof.

## Browser evidence for `core.button`

The first browser gate verifies:

- native button semantics;
- minimum 44px target height;
- rest → hover → active movement of 0px → 2px → 5px into the surface;
- a changing structural shadow during compression;
- visible keyboard focus;
- reduced-motion behavior without loss of state feedback;
- forced-colors visibility/focusability;
- no console/page errors during initial render.

Successful runs upload screenshots, the JSON Playwright report, and the exact built `dist/foundry` artifact. Failure artifacts are retained under the same workflow run.

Until the live deployment check is complete, `core.button` MUST remain `implemented` with `publicProof: null`.
