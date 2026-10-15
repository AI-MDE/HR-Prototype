---
type: feature
kind: build
id: engineering-for-reuse
title: Engineering for reuse
origin: mde
impacts:
  - server
  - persistence
  - application-design
default: n/a
---

# Engineering for reuse

## Purpose

The application's code grows with what is specific to the business, not with the number of entities. The model is declared once, every Feature is implemented once, and a generic path serves every entity, so there is little per-entity code to write, review, or support. The AI writes the code; this discipline is what keeps it small.

## Applicability

Applies to the application's server and persistence code, whatever the stack.

## Impact on server

- Declare each entity's model once: its attributes and types, relationships, states and transitions, and storage names, derived from its spec and its capability design. Validation, DTOs, query column lists, and API types use it; never restate an entity's fields elsewhere.
- Serve the common path generically, once: listing with paging and scope, reading, creating, patching, deleting, transitions, error mapping, and authorization, driven by the model and the Features the design applies. Per-entity code is only a business rule, a decision, or a justified override through a clean per-operation hook.
- Build on mature libraries for routing, injection, SQL, and validation; write only the thin layer that maps the application's model and Features onto them.
- Never copy a working pattern into another file: extract it, or use the Feature that names it.
- Implement each [Feature](../../metamodel/feature.md) the application applies once, in one shared component that every object applying it calls. Look for the one that already exists before writing any mechanism; a second implementation of a Feature is a defect. Where it lives is the code's, never written into the Specs.

## Impact on persistence

- Storage names come from the model (the catalog's naming convention and the design's overrides); no repository restates a table or column name the model already gives.

## Impact on application-design

- An application Feature (one the Method does not have) is described for people: its `description` says, in plain words, what it gives, so a designer or reviewer understands a design without reading code. A Method Feature's description is the Method's.
- Prove each applied Feature's promises on each object that applies it: a scenario tagged `@feature:<id>/<promise>`, with the operation it performs, exercises what the promise says, through the API or, for a structural Feature, against the migrated test database, and passes. A Feature with a promise unproven on an object that applies it is not done there, whatever the code says.

## Verify

- `features-implemented-once` Is every Feature the application applies implemented once, with no second implementation (`mde verify`, Reuse row), and is every promise proven by a passing scenario tagged `@feature:<id>/<promise>` on each object that applies it (`mde verify`, Features row)?
- `model-declared-once` Is each entity's model declared once, and is duplicated code below the threshold the Reuse row reports?
