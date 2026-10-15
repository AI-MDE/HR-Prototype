---
type: feature
kind: build
id: readable-test-data
title: Readable test data
origin: mde
impacts:
  - testing
default: n/a
---

# Readable test data

## Purpose

Tests are the part users and developers read, so they are data in business language: Gherkin scenarios with tables, written in common phrases, each implemented once for every entity, never step code repeated per entity. A test is the agent's claim that the behavior it names works: it counts as Evidence, and the Audit judges how honest it is.

## Applicability

Applies to the application's behavioral tests and test data, alongside [Gherkin traceability](gherkin-traceability.md).

## Impact on testing

- Write scenarios and their data as Gherkin with tables. Records are created and checked through tables (`Given these Customers exist:`, a column per attribute), and named by their display labels ("Apex Cranes", "LT-1001"), never by ids; a reference to another record is its label.
- Write steps in common phrases: a few plain, generic patterns used the same way across the application (records created from a table, an operation performed as a role, the outcome or the refusal checked), each implemented once and driven by the entity model, so one implementation serves every entity. There is no list of allowed phrases to follow or check; never a synonym for a phrase already in use, and never a step definition for one entity or one page.
- Share data instead of copying it: records several features need are a shared background, not a table repeated in each file.
- Tag each scenario with what it proves: the use case (`@log-service-request`), each entity operation it performs (`@service-request.submit`), with `@refusal` when it proves that operation refused, for a business rule, its id (`@rule:team-membership`), each Feature promise it proves, with the operation it proves it on (`@feature:optimistic-concurrency/stale-rejected`), and each build Feature Check it proves that no `mde verify` row measures, by the id `targets/verification/<target>.md` shows (`@feature:end-to-end-tests/use-cases-walked`). The retired tags (`@term:<id>`, `@check:<feature>.<n>`) prove nothing; `mde migrate-features` converts an application that still uses it. A scenario that reads what was stored back from the database is also tagged `@storage`; an end-to-end scenario is tagged `@e2e` and names each page it uses (`@page:<page>`). Coverage and `mde verify` read only the tags, never the wording of the steps.
- Prove each business rule both ways: a scenario where it holds, and one where it is broken and refused, the refusal naming the rule's id (`error.rule`); with its boundaries where it has them.
- **Check every write in the database itself.** When the application has a database, every entity's create, update, and delete is followed, in a passing scenario, by a check of what was stored, read from the database (a scenario tagged `@storage`, with the entity's operation tags), not only from the API's answer. An entity whose writes no scenario reads back from the database is not proven stored; `mde verify` fails the Storage tested row when none is, and keeps it partial until every entity is. (The Schema row is the Specs against the database, and says nothing about tests.)

## Verify

- `rules-proven` Does every business rule have scenarios tagged `@rule:<id>`, where it holds and where it is refused, and every use case and entity operation a scenario (`mde verify`, Tests row)?
- `terms-verified` Does every promise of every Feature the application applies have a passing scenario tagged `@feature:<id>/<promise>` on each object that applies it (`mde verify`, Features row)?
- `storage-checked` With a database: is every entity's storage checked against the migrated database by a passing scenario (`mde verify`, Storage tested row: every entity, not some)?

## Audit

- Are records named by display label, never by id, and is shared data a shared background rather than copied tables?
- Tests are claims; are they honest? Does each scenario do what its name and tags say: perform the tagged operation through the real API or browser, against the real database, as the tagged role?
- Do its assertions check the outcome it claims (the stored value, the refusal and its code, the screen after a reload), not a condition that is always true, a mocked answer, or only that a control is present?
- Does a `@storage` scenario read the migrated database itself, and a `@refusal` scenario assert the refusal and that nothing was stored?
- Are there no hollow steps: an empty or skipped step definition, a caught and ignored error, a step that passes whatever happens?
