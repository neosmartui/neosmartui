# Public Proof Gate

`public-proof` is an evidence state, not a marketing label.

A component may advance from `implemented` to `public-proof` only when all of the following are true for the same canonical source lineage:

1. **Implementation evidence** — the registry points to committed adapter/runtime implementation.
2. **Exact-SHA browser evidence** — Chromium QA passes against a Foundry build checked out from the PR head SHA (or the merged `main` SHA on push). The run must exercise the actual rendered component rather than only inspect source text.
3. **Deployment provenance** — the generated Foundry includes `deployment.json` with `neosmartui/deployment-record@1` and the exact canonical source SHA.
4. **Live evidence** — the native GitHub Pages deployment serves that deployment record and the component proof surface successfully.
5. **No maturity leap** — a CI artifact by itself is not public proof. A deployed page without exact-SHA provenance is not public proof.

## Singleton-host deployment cohort

During development the proof host is `https://neosmartui.github.io/`. Because this is one mutable deployment endpoint, every `public-proof` record validated against the current live host MUST bind the source SHA currently served by `deployment.json`.

When a newer green Foundry deployment replaces an older one, unchanged public-proof components are refreshed into the newer deployment cohort using the newer exact-SHA browser artifact and Pages provenance. Their implementation-file blob bindings remain unchanged unless the implementation itself changed. This prevents a historical proof record from being misrepresented as the lineage of the current live host.

## Browser evidence

The browser gate exercises the real rendered Core primitives and currently verifies:

- native control semantics;
- minimum 44px effective targets where required;
- pressure-not-levitation rest → hover → active behavior for pressable controls;
- zero spatial translation for `core.input`, which is interactive but not pressable;
- explicit keyboard focus;
- persistent checked/unchecked/indeterminate checkbox state;
- input empty/filled state synchronization without replacing native editing;
- invalid, read-only, and disabled states against resolved Theme tokens;
- bidi direction resilience for text input;
- reduced-motion behavior without loss of state feedback;
- forced-colors visibility/focusability;
- no console/page errors during initial render.

Successful runs upload screenshots, the JSON Playwright report, and the exact built `dist/foundry` artifact. Failure artifacts are retained under the same workflow run.

A component reaches `public-proof` only after its structural record, implementation blob bindings, exact-SHA browser evidence, Pages provenance, and live marker contract all pass together.
