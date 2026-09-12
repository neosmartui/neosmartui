from pathlib import Path

root = Path('.')
core_path = root / 'tooling/validators/validate-core-components.mjs'
core = core_path.read_text()
repls = {
    "if (!accordionEntry || accordionEntry.maturity !== 'implemented') fail('core.accordion must be implemented in Slice 18 implementation phase');": "if (!accordionEntry || accordionEntry.maturity !== 'public-proof') fail('core.accordion must be public-proof after verified Slice 18 deployment');",
    "if (accordionEntry.evidence.publicProof !== null) fail('implemented core.accordion must not claim public proof before deployment verification');": "if (accordionEntry.evidence.publicProof !== 'evidence/public/core.accordion.json') fail('public-proof core.accordion must bind its canonical proof record');",
    "'Maturity is `implemented`'": "'Maturity is `public-proof`'",
}
for before, after in repls.items():
    if core.count(before) != 1:
        raise SystemExit(f'Core validator replacement count for {before!r}: {core.count(before)}')
    core = core.replace(before, after)
core_path.write_text(core)

theme_path = root / 'tooling/validators/validate-theme-resolution.mjs'
theme = theme_path.read_text()
old = "if (!accordionEntry || accordionEntry.maturity !== 'implemented' || accordionEntry.evidence.publicProof !== null) fail('core.accordion must remain implemented without public proof in this phase');"
new = "if (!accordionEntry || accordionEntry.maturity !== 'public-proof' || accordionEntry.evidence.publicProof !== 'evidence/public/core.accordion.json') fail('core.accordion must bind current public-proof evidence');"
if theme.count(old) != 1:
    raise SystemExit(f'Theme lifecycle replacement count: {theme.count(old)}')
theme = theme.replace(old, new)
phrase = 'Slice 18 Accordion implementation must preserve the exact implemented/public-proof dependency union at 55'
if theme.count(phrase) != 1:
    raise SystemExit(f'Theme dependency phrase count: {theme.count(phrase)}')
theme = theme.replace(phrase, 'Slice 18 Accordion public-proof promotion must preserve the exact implemented/public-proof dependency union at 55')
theme_path.write_text(theme)

live_path = root / 'tooling/validators/validate-public-proof-live.mjs'
live = live_path.read_text()
if "['core.accordion'" in live:
    raise SystemExit('Accordion live marker contract already exists')
anchor = '\n]);\n\nconst fetchWithRetry'
if live.count(anchor) != 1:
    raise SystemExit(f'live marker closing anchor count: {live.count(anchor)}')
markers = """  ['core.accordion', ['NeoSmartUI Foundry', 'core.accordion', 'Accordion discloses related content with real buttons', 'data-expansion=\"single\"', 'data-expansion=\"multiple\"', 'aria-controls=\"accordion-single-panel-a\"']]"""
live_path.write_text(live.replace(anchor, ',\n' + markers + anchor, 1))
