---
type: feature
kind: build
id: meaningful-seed-data
title: Meaningful sample and seed data
origin: mde
impacts:
  - persistence
  - application-design
default: n/a
---

# Meaningful sample and seed data

## Purpose

Provide coherent fictional records that make design, prototyping and verification useful.

## Applicability

Applies to persisted concepts and selected persistence concerns in scope. Object-specific selections belong to their owning concepts; Design chooses the realization within Architecture.

## Impact on persistence

Load the [sample data](meaningful-seed-data.md) through the selected seed location and a repeatable mechanism, preserving relationships, governed values, and business constraints. Seed loading never replaces unrelated operational records.

## Impact on application-design

Sample data is a concrete design output, not a plan: a small, coherent set of fictional records that makes the application understandable and usable in a preview or prototype. It is instance data, not new entity definitions or business policy.

- Meaningful business labels and realistic values, not placeholder ids as display names.
- Valid relationships and enough connected records to demonstrate the scoped entities, related collections, and use cases.
- Representative lifecycle states and normal and boundary cases the model supports, without inventing states or permissions to fill a screen.
- Inputs for rejection and error scenarios kept apart, so the normal dataset stays consistent with the model.
- A documented way to view it and, with a prototype, to load or reset it repeatably in the development environment, without replacing unrelated records.

The sample data lives in one file, `app/data/seed.json`: an object keyed by entity name exactly as its spec titles it (`Professional`, `ClientContact`, never `professionals`), each a list of records whose fields are the entity's attribute names, references by the related record's `id`. The MDE runtime and the Workbench's live data read this file, so the data can be browsed as soon as it is written; the application's own seed loads the same records (its loader reads this file, or is derived from it). A database or UI is not a prerequisite. Never say the data can be browsed until it is in this file, in this shape. Identify fictional data as such and keep it apart from operational data. Keep the samples in step with entity, relationship, rule, and design changes, and reuse them in prototypes and verification rather than keeping divergent copies. Assumptions the examples expose stay in Work; the examples do not settle them.

## Audit

- Does seed data preserve relationships and constraints, load repeatably, and leave operational records alone?
- Does sample data exist for the scope, connected, realistic, consistent with the model, with rejection inputs kept apart, and loadable as documented?
