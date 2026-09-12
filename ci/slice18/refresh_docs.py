from pathlib import Path

root = Path('.')
docs_path = root / 'packages/core/components/accordion.md'
docs = docs_path.read_text()
old_lifecycle = """## Lifecycle

Maturity is `implemented`.

Implementation evidence is `packages/adapters/web/components/accordion.mjs`. Public-proof evidence remains `null`. Deployment, native Pages verification, and singleton public-proof cohort refresh are later lifecycle stages and MUST NOT be claimed until an exact merged-main 95/95 artifact is deployed and independently verified.
"""
new_lifecycle = """## Lifecycle

Maturity is `public-proof`.

Implementation evidence is `packages/adapters/web/components/accordion.mjs`, paired CSS is `packages/adapters/web/components/accordion.css`, and canonical proof is `evidence/public/core.accordion.json`.

The singleton proof cohort binds deployed source `57dc766ece8eca13b8c60b6f14615692ecdb51e8`, merged-main Quality run `34699170996`, browser artifact `10300390087`, Pages commit `f5caac25c16aa012222edeeb3b0e85c6b1bfbd11`, Pages tree `b0f9ec75170566945b8bf00af9a5c8b1b3136555`, and native Pages run `34700103133`. Structural proof validation recomputes both Accordion implementation blobs, while live proof validation requires the deployed Accordion disclosure markers. All eighteen public-proof Core components share this singleton deployment/browser cohort while retaining their own implementation blob bindings.
"""
if docs.count(old_lifecycle) != 1:
    raise SystemExit('Accordion lifecycle paragraph did not match once')
docs_path.write_text(docs.replace(old_lifecycle, new_lifecycle))

spec_path = root / 'spec/core/COMPONENTS.md'
spec = spec_path.read_text()
for before, after in {
    'e492fc06fd14d22087c0b428d2788d3d9824212a': '57dc766ece8eca13b8c60b6f14615692ecdb51e8',
    '34681815707': '34699170996',
    '10294780025': '10300390087',
    '3d20426f83cb2a30431c36300f4f842efdbe3de9': 'f5caac25c16aa012222edeeb3b0e85c6b1bfbd11',
    'ce8daa808c0195dbf90a88bd7335bb9a8baec6ca': 'b0f9ec75170566945b8bf00af9a5c8b1b3136555',
    '34682319293': '34700103133',
    'All seventeen public-proof Core components share this singleton cohort': 'All eighteen public-proof Core components share this singleton cohort',
}.items():
    spec = spec.replace(before, after)

old_final = """Registry maturity is `implemented`, with canonical implementation evidence `packages/adapters/web/components/accordion.mjs` and public-proof evidence still `null`. The existing 17 public proofs remain bound to the deployed `57dc766ece8eca13b8c60b6f14615692ecdb51e8` singleton cohort. This implementation phase does not deploy or alter proof records; public-proof promotion must wait for an exact merged-main 95/95 browser artifact, deployment of that exact merged-main artifact, native Pages verification, and a singleton cohort refresh from 17 to 18."""
new_final = """Registry maturity is `public-proof`, with canonical implementation evidence `packages/adapters/web/components/accordion.mjs`, paired CSS at `packages/adapters/web/components/accordion.css`, and canonical proof `evidence/public/core.accordion.json`. Its singleton cohort binds merged source `57dc766ece8eca13b8c60b6f14615692ecdb51e8`, merged-main Quality run `34699170996`, browser artifact `10300390087`, deployment commit `f5caac25c16aa012222edeeb3b0e85c6b1bfbd11`, deployment tree `b0f9ec75170566945b8bf00af9a5c8b1b3136555`, and native Pages run `34700103133`; structural proof validation recomputes both Accordion implementation blobs and live verification requires the deployed Accordion disclosure marker contract. All eighteen public-proof Core components share this singleton cohort while retaining their own implementation blob bindings."""
if spec.count(old_final) != 1:
    raise SystemExit(f'Accordion aggregate lifecycle paragraph matched {spec.count(old_final)} times')
spec_path.write_text(spec.replace(old_final, new_final))
