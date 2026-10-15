---
type: feature
kind: build
id: method-internal-consistency
title: Method internal consistency
origin: mde
impacts:
  - method-change
default: n/a
---

# Method internal consistency

## Purpose

Keep Method concepts, Strategies, Features, Targets, and references consistent after changes.

## Applicability

Applies to maintenance of the Method itself. This is engineering guidance, not an application behavior requirement or an independently imposed gate.

## Impact on method-change

- **Meta-model**: shape only (definition, location, structure, relationships); the contract test enforces it ([Shape, not judgment](../../metamodel/README.md#shape-not-judgment)).
- **Targets**: judgment (rules and checks) for one kind of output, technology-neutral.
- **Strategy**: when Targets apply and how strictly; it holds neither shape nor judgment of its own.
- **Architecture and stacks**: the chosen architecture's rules, and technology choices; a stack-specific rule belongs to its stack.

Never introduce a second authority for the same thing: one fact, one home.

- Indexes (the Meta-model index, the Targets index, stage tables, area READMEs) change together with the definitions they list.

Every change to the Method increments `method/VERSION.md` and adds a `method/CHANGELOG.md` entry (`YYYY-MM-DD — x.y.z — headline`, then what changed and why), so an application's `mde update-app` sees it. A change to the tools does the same in `tools/package.json` and `tools/CHANGELOG.md`.

## Verify

- `types-shape-only` Does every type definition stay shape only (the contract test passes), and does each rule live in exactly one layer?
- `version-bumped` Were the Method's version and changelog (and the tools', if changed) incremented for this change?
