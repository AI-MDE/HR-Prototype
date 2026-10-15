---
type: concept-type
title: Diagram
description: A version-controlled visual view of knowledge whose semantics remain owned by the concepts it depicts.
icon: 📐
---

# Diagram

A Diagram is a view of modeled knowledge, not an independent owner of policy.

Requirements diagrams may include Use-Case diagrams, the Conceptual Data Model and each ABE's Logical Data Model, and business state-transition diagrams. Architecture and Design own their corresponding technical views.

Diagrams must remain consistent with the concepts they depict.

## Kinds

Each kind of diagram has its own definition, which says what it shows, who owns it, where it lives, and how to keep it current:

- [Architecture Diagram](architecture/architecture-diagram.md)
- [Use-Case Diagram](requirements/use-case-diagram.md)
- [Conceptual Data Model Diagram](requirements/conceptual-data-model-diagram.md)
- [Logical Data Model Diagram](requirements/logical-data-model-diagram.md)
- [Physical Data Model Diagram](design/physical-data-model-diagram.md)
- [Interaction Diagram](architecture/interaction-diagram.md)
- [State-Transition Diagram](requirements/state-transition-diagram.md)
- [Use-Case Behavior Diagram](requirements/use-case-behavior-diagram.md)

A diagram lives with the section whose knowledge it shows, in that section's `diagrams/` folder, so it is read and reviewed with the Specs it depicts: `specs/requirements/diagrams/` (use cases and their behavior, the conceptual data model and each ABE's logical data model, the significant business lifecycles), `specs/architecture/diagrams/` (the architecture, and the interaction between its layers), `specs/design/diagrams/` (the physical data model, and every other state diagram). A diagram is a view: the concepts it depicts stay the source of meaning, and a disagreement is resolved in them. Each diagram is a page of its own, typed with its kind (`type: logical-data-model-diagram`): one diagram per page, never a page collecting several, so each is found, read, reviewed, and linked on its own. A diagram too large to read is split into several pages of the same kind, as its kind says (one per capability). Each kind uses a text-based, version-controllable representation: a Mermaid fence in its Markdown page, or Graphviz DOT source rendered to SVG with `mde render-diagrams` where the kind says so (use-case behavior). Rendered SVGs are never edited by hand.
