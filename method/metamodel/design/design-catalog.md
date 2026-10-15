---
type: concept-type
title: Design Catalog
description: The application's Feature catalog: the optional Features it uses, the realization chosen for each and the component that implements it, its own Features, and the defaults.
icon: 📖
---

# Design Catalog

The Design Catalog records what this application uses and how: the [optional Features](../feature.md) it applies, each with the realization it chose and the one component that implements it, and the defaults that hold unless a design says otherwise. It does not redefine a Feature's meaning: the Method's [optional Feature catalog](../../optional-features/index.md) holds that, once. Every other design artifact applies Features by id and never restates them. Its rules and checks are in the [application-design](../../targets/design/application-design.md) Target: design is stated only in Features and the design vocabulary, absences are not written, and facts stay at their source.

The AI writes the catalog as it designs the application. It starts it with the first design work, adds a Feature the first time a design applies it, and reuses it from then on.

## Location

One file, `specs/design/catalog.json`.

## Structure

```json
{
  "type": "design-catalog",
  "features": {
    "optimistic-concurrency": {
      "realization": "version-column",
      "adds": ["version"]
    },
    "soft-delete": { "realization": "deactivated-at-column", "adds": ["deactivated_at"] },
    "standard-errors": { "realization": "an error mapper at the API boundary" },
    "dispatch-window": {
      "appliesTo": "operation",
      "description": "A request is dispatched only within the customer's service window.",
      "means": "The operation compares the scheduled time with the customer's window and refuses outside it.",
      "realization": "A check in the transaction.",
      "promises": { "outside-refused": "Dispatching outside the window is refused." }
    }
  },
  "defaults": { "application": ["standard-errors"], "entity": ["soft-delete"] }
}
```

- **features**, by Feature id:
  - A **Method Feature** (an id of the optional catalog) takes its meaning, scope and promises from the Method. The catalog adds only this application's **realization** (one of the Feature's, or its own), **adds** (the storage columns it adds to an entity's table), and any **parameters** chosen.
  - An **application Feature** (an id the Method does not have) is defined here in full: **appliesTo** (`application`, `entity`, `attribute`, `relation`, or `operation`), **description** (what it gives, in plain words), **means** (the precise contract), **realization**, **options**, and **promises** (id → text). Add one only when no Method Feature fits.
- **defaults**: the Features that hold unless a design says otherwise, for the application and every entity. There is no operation default: what every operation does the same way (one transaction, inputs checked against the model, the standard errors) is the architecture's, stated once, not a Feature applied to each operation. A default is recorded under `features` like any other, with its realization, and never repeated in a design.
- **Design only.** The catalog says what the application chose, never where it is built: no file, component, or path. Where a Feature is implemented is the code's; that it is implemented once is the Reuse row's and the Audit's; that it holds, its promises proven.
- **Verification** is by scenario: every promise of every Feature the application applies is proven, on each object that applies it, by a passing scenario tagged `@feature:<id>/<promise>` with the operation it performs ([Feature](../feature.md#promises-and-checks)). A structural Feature (`storage-naming`, `foreign-key-indexes`) is proven against the real, migrated test database.

### The design vocabulary

A capability design also uses words that are not Features ([design-vocabulary.json](design-vocabulary.json)), defined once by the Method:

- **The verbs of an operation**: `sets`, `records`, `delegates`, `locks`, `decision`, `default`, `internal`.
- **Model properties of an entity**: `unique`, `index`, `check`, `label`.

They have no realizations to choose between and nothing to prove beyond the operation and the schema, so they are neither Features nor catalog entries.

### The retired form

The older catalog form is retired: `terms` (dotted ids such as `concurrency.version`) where this one has `features`, and `adopts` naming an Aspect. `mde verify` reports a catalog or design that still uses it, and any former name, and scenarios tagged `@term:<id>` prove nothing. `mde migrate-features` converts them: the former names to Feature ids, `terms` to `features`, the tags to `@feature:<id>` (each then needs its promise named).

## Relationships

- [Capability Designs](capability-design.md) apply its Features and the design vocabulary.
- Its storage Features (`storage-naming`, a Feature's `adds`) give each entity's storage: the [Data Model](data-model.md).
- `mde verify` checks that every applied Feature is known, valid where it is applied, and its promises proven on each object that applies it (Features row); that it is implemented once, the Reuse row.
- It draws on the Method's [optional Feature catalog](../../optional-features/index.md).
