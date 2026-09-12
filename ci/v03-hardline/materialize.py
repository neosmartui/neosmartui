import json
from pathlib import Path

root = Path('.')

inventory_path = root / 'migration/inventory.json'
inventory = json.loads(inventory_path.read_text())
new_artifacts = [
    {
        'id': 'legacy.spec.flavor-expression-laws',
        'sourceRepository': 'NeoBrutalism-shop/spec',
        'sourcePath': 'FLAVORS.md',
        'kind': 'documentation',
        'decision': 'ADAPT',
        'targetLayer': 'flavor',
        'note': 'Adapt the pinned Flavor/Core ownership boundary, shared semantic-state invariants, and flavor-owned expression dimensions into Hardline without changing Core behavior.'
    },
    {
        'id': 'legacy.spec.theme-token-physics',
        'sourceRepository': 'NeoBrutalism-shop/spec',
        'sourcePath': 'TOKENS.md',
        'kind': 'documentation',
        'decision': 'ADAPT',
        'targetLayer': 'flavor',
        'note': 'Adapt the pinned 4→2→0 structural-depth reference, matching 0→2→4 press travel, 70/110/170ms semantic motion references, independent focus keyline, and semantic-token separation into Hardline Light.'
    },
    {
        'id': 'legacy.spec.interaction-physics',
        'sourceRepository': 'NeoBrutalism-shop/spec',
        'sourcePath': 'INTERACTION.md',
        'kind': 'documentation',
        'decision': 'ADAPT',
        'targetLayer': 'flavor',
        'note': 'Adapt compress-never-float, coherent shadow/travel, reduced-motion, keyboard/touch parity, and static-surface laws as Hardline conformance evidence.'
    }
]
existing_ids = {entry['id'] for entry in inventory['artifacts']}
for artifact in new_artifacts:
    if artifact['id'] in existing_ids:
        raise SystemExit(f"artifact already exists unexpectedly: {artifact['id']}")
    inventory['artifacts'].append(artifact)
inventory_path.write_text(json.dumps(inventory, indent=2) + '\n')

quality_path = root / '.github/workflows/quality.yml'
quality = quality_path.read_text()
if 'dist/foundry/hardline-theme.css' in quality or 'dist/foundry/flavors/hardline/index.html' in quality:
    raise SystemExit('Hardline Foundry workflow assertions already exist unexpectedly')
anchor = '          test -f dist/foundry/theme.css\n'
if quality.count(anchor) != 1:
    raise SystemExit(f'expected one theme.css file assertion anchor, got {quality.count(anchor)}')
insert = anchor + '          test -f dist/foundry/hardline-theme.css\n          test -f dist/foundry/flavors/hardline/index.html\n'
quality = quality.replace(anchor, insert, 1)
marker = '          grep -q -- "--ns-depth-hover-y: 3px;" dist/foundry/theme.css\n'
if quality.count(marker) != 1:
    raise SystemExit(f'expected one Rivet marker anchor, got {quality.count(marker)}')
hardline_checks = (
    '          grep -q -- ".ns-theme-hardline-light {" dist/foundry/hardline-theme.css\n'
    '          grep -q -- "--ns-radius-control: 0px;" dist/foundry/hardline-theme.css\n'
    '          grep -q -- "--ns-depth-rest-y: 4px;" dist/foundry/hardline-theme.css\n'
    '          grep -q -- "--ns-depth-hover-y: 2px;" dist/foundry/hardline-theme.css\n'
    '          grep -q -- "--ns-press-active-y: 4px;" dist/foundry/hardline-theme.css\n'
    '          grep -q -- "Hardline Light" dist/foundry/flavors/hardline/index.html\n'
    '          grep -q -- "ns-theme-hardline-light" dist/foundry/flavors/hardline/index.html\n'
)
quality = quality.replace(marker, hardline_checks + marker, 1)
quality_path.write_text(quality)
