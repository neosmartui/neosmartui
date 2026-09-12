import json
from pathlib import Path

root = Path('.')
old = {
    'source': 'e492fc06fd14d22087c0b428d2788d3d9824212a',
    'run': 34681815707,
    'artifact': 10294780025,
    'commit': '3d20426f83cb2a30431c36300f4f842efdbe3de9',
    'tree': 'ce8daa808c0195dbf90a88bd7335bb9a8baec6ca',
    'pages': 34682319293,
}
new = {
    'source': '57dc766ece8eca13b8c60b6f14615692ecdb51e8',
    'run': 34699170996,
    'artifact': 10300390087,
    'commit': 'f5caac25c16aa012222edeeb3b0e85c6b1bfbd11',
    'tree': 'b0f9ec75170566945b8bf00af9a5c8b1b3136555',
    'pages': 34700103133,
}

proof_dir = root / 'evidence/public'
existing = sorted(proof_dir.glob('core.*.json'))
if len(existing) != 17:
    raise SystemExit(f'expected 17 existing proofs, found {len(existing)}')
if any(p.name == 'core.accordion.json' for p in existing):
    raise SystemExit('Accordion proof already exists unexpectedly')

for path in existing:
    proof = json.loads(path.read_text())
    actual = (
        proof['deployedSource']['sha'],
        proof['browserEvidence']['runId'],
        proof['browserEvidence']['artifactId'],
        proof['deployment']['commitSha'],
        proof['deployment']['treeSha'],
        proof['deployment']['pagesRunId'],
    )
    expected = (old['source'], old['run'], old['artifact'], old['commit'], old['tree'], old['pages'])
    if actual != expected:
        raise SystemExit(f'{path}: unexpected old cohort {actual}')
    proof['deployedSource']['sha'] = new['source']
    proof['browserEvidence'] = {'runId': new['run'], 'artifactId': new['artifact']}
    proof['deployment'] = {
        'repository': 'neosmartui/neosmartui.github.io',
        'commitSha': new['commit'],
        'treeSha': new['tree'],
        'pagesRunId': new['pages'],
    }
    path.write_text(json.dumps(proof, indent=2) + '\n')

accordion = {
    '$schema': '../../spec/schemas/public-proof.schema.json',
    'schema': 'neosmartui/public-proof@1',
    'component': 'core.accordion',
    'deployedSource': {'repository': 'neosmartui/neosmartui', 'sha': new['source']},
    'implementationFiles': [
        {'path': 'packages/adapters/web/components/accordion.mjs', 'blobSha': 'f81715844ed9c180279ad9a9257ccb9956cb7fd6'},
        {'path': 'packages/adapters/web/components/accordion.css', 'blobSha': 'e0d494ff63973bd39d6815583f643e01b394ffe1'},
    ],
    'browserEvidence': {'runId': new['run'], 'artifactId': new['artifact']},
    'deployment': {
        'repository': 'neosmartui/neosmartui.github.io',
        'commitSha': new['commit'],
        'treeSha': new['tree'],
        'pagesRunId': new['pages'],
    },
    'live': {
        'pageUrl': 'https://neosmartui.github.io/',
        'deploymentRecordUrl': 'https://neosmartui.github.io/deployment.json',
    },
}
(proof_dir / 'core.accordion.json').write_text(json.dumps(accordion, indent=2) + '\n')

registry_path = root / 'packages/core/component-registry.json'
registry = json.loads(registry_path.read_text())
entry = next(x for x in registry['components'] if x['id'] == 'core.accordion')
if entry['maturity'] != 'implemented' or entry['evidence']['publicProof'] is not None:
    raise SystemExit(f'unexpected Accordion lifecycle: {entry}')
if entry['evidence']['implementation'] != 'packages/adapters/web/components/accordion.mjs':
    raise SystemExit('Accordion implementation evidence drifted')
entry['maturity'] = 'public-proof'
entry['evidence']['publicProof'] = 'evidence/public/core.accordion.json'
registry_path.write_text(json.dumps(registry, indent=2) + '\n')
