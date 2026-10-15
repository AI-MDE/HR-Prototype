---
type: feature
kind: build
id: business-requirements-diagrams
title: Diagrams
origin: mde
impacts:
  - business-requirements
---

# Diagrams

## Purpose

The "Diagrams" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

Diagrams are views; they never hold meaning the concepts lack. Each diagram is its own page, typed with its kind; split one that grows unreadable into one page per capability, as its kind says. Where a kind is drawn in DOT, the DOT file is the source, rendered to SVG with `mde render-diagrams`; never edit an SVG by hand.

- **Use-case diagram:** create it with the first use case; update it whenever a use case or role is added, renamed, removed, or changes actor.
- **Use-case behavior diagram:** update it whenever the use case's steps, branches, or outcomes change.
- **Conceptual data model diagram** (`erd.md`, the ABEs by capability): create it with the first ABEs; update it whenever an ABE is added, renamed, or removed, or a relationship starts or stops crossing between two ABEs.
- **Logical data model diagram** (`erd-<abe>.md`, one per ABE): create it with the ABE; update it whenever one of its entities, attributes, or relationships changes, or the application's level of detail changes.
- **State-transition diagram:** create it when the concept defines its states; update it whenever states, transitions, or guards change.

## Audit

- **Diagrams:** Does every element in a diagram exist as a concept, and does every concept in scope appear? Does every ABE have its logical data model, and does every line between ABEs in the conceptual data model correspond to an entity relationship that crosses them? Is each diagram its own page, typed with its kind, and readable (split by capability when it is not)? Is each SVG rendered from its current DOT source (`mde render-diagrams --check`)?
