---
type: feature
kind: optional
id: foreign-key-indexes
name: Foreign-key Indexes
description: "Every link between records can be followed quickly: each foreign key has an index."
scope: [application]
appliedIn: [design]
aliases: [index.foreignKeys]
---

# Foreign-key Indexes

Every link between records can be followed quickly: each foreign key has an index.

## Meaning

Every foreign-key column has an index; a composite index with that column first counts.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:foreign-key-indexes/<promise>`.

- `indexed` Every foreign-key column has an index in the migrated database.
