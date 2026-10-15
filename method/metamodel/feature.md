---
type: concept-type
title: Feature
description: A reusable unit of engineering knowledge, of one of two kinds. A build Feature always applies, through the Targets. An optional Feature applies where a Spec chooses it, as a business need or a technical choice.
icon: 🧩
---

# Feature

A Feature is a reusable, identifiable unit of engineering knowledge that guides, constrains, or contributes to the design, implementation, and verification of an application. One concept covers what were three: the Method's Features, the Aspects, and an application's Design Terms. What differed between them is now a property of the Feature: its **kind**, its **scope**, and, for an optional Feature, **where it is applied**.

## The two kinds

| Kind | Applies | Lives in | Compiled into Targets | Example |
|---|---|---|---|---|
| **build** | Always, wherever the Targets it impacts apply, at the rigor the Strategy sets | `method/features/<area>/<id>.md` | Yes: its *Impact on* sections, its *Verify* Checks, its *Audit* | `end-to-end-tests`, `env-contract` |
| **optional** | Only on the objects a Spec applies it to | `method/optional-features/<area>/<id>.md`, indexed in [`catalog.json`](../optional-features/catalog.json) | Never | `optimistic-concurrency`, `bookmarks`, `soft-delete` |

An optional Feature is never active because it is in the catalog. An agent reads the catalog's index to choose, and reads a Feature's file only once a Spec applies it.

## Need or choice: where it is applied

Whether an optional Feature is a business need or a technical choice is a property of its **application**, not of the Feature:

- **Applied in the requirements** (an entity's, use case's, operation's, relation's or the Domain's `## Features` section): a business need, which the design must realize.
- **Applied in the design** (a capability design's `features`, or the design catalog's `defaults`): a technical choice the design made.

Optimistic concurrency is one Feature either way. A Feature's `appliedIn` limits where it may be applied: `bookmarks` is `[requirements]` (a business capability a design does not add on its own); `storage-naming` is `[design]`.

## Location

- Build Features: `method/features/<area>/<id>.md`, compiled into `method/targets/` by `scripts/compile-targets.mjs` ([Method Features](../features/README.md)).
- Optional Features: `method/optional-features/<area>/<id>.md`; `scripts/compile-optional-features.mjs` writes the index ([catalog.json](../optional-features/catalog.json), [index](../optional-features/index.md)) and checks that none leaks into a Target.
- An application's choices: the requirement objects' `## Features` sections, the capability designs' `features`, and its catalog (`specs/design/catalog.json`: the realization chosen and the component that implements each; [Design Catalog](design/design-catalog.md)).

## Structure

Front matter:

```yaml
type: feature
kind: optional                         # build | optional
id: optimistic-concurrency             # flat, lowercase, hyphenated; the file name
name: Optimistic Concurrency
description: "Two people editing the same record cannot silently overwrite each other."
scope: [entity]                        # application, entity, attribute, relation, operation, use-case, page (optional); the Target's outputs (build)
appliedIn: [requirements, design]      # optional Features only; default both
aliases: [versioning, concurrency.version]   # former Aspect and Design Term names
```

A build Feature keeps its `impacts`, `title` and `origin`, and its sections (Purpose, Applicability, *Impact on <target>*, *Verify*, *Audit*).

An optional Feature's sections:

- **Meaning**: what the behavior means, in technology-neutral terms.
- **Parameters**: its options, each with a type, a default, and a meaning.
- **Realizations**: known ways to achieve it. The application records the one it chose.
- **Constraints**: how it must interact with an operation and with other Features: *Before*, *After*, *Atomic*, *After commit*. These are conditions, not an execution order.
- **Promises**: what verification proves (below).
- **Guidance**, and **Audit** where useful: how to build it (for each concern it touches), and what a second agent judges.

## Promises and Checks

A promise is one verifiable obligation, with a stable id its author writes before its text:

```markdown
- `stale-rejected` A write with a stale version is refused with a conflict, and nothing of it is stored.
```

A build Feature's *Verify* Checks are its promises, written the same way. Their full id is `<feature>/<promise>` (`end-to-end-tests/page-operations-tested`), shown in `targets/verification/<target>.md` and listed in `targets/catalogue.json`. A test that proves one is tagged with it:

```gherkin
@feature:optimistic-concurrency/stale-rejected @service-request.update
Scenario: A stale write is refused
```

**Proof is per application.** The scenario's operation tag names the object the promise is proven on. The Evidence reports each application separately, for example "optimistic-concurrency on ServiceRequest: 3 of 3 promises proven; on WorkOrder: 1 of 3". A promise proven on one entity proves nothing for another.

A build Feature's Check that `mde verify` measures with one of its rows ("(`mde verify`, Schema row)") has that row as its witness.

## Names and aliases

Ids are flat, descriptive, lowercase and hyphenated, with no hierarchy hidden in punctuation and no technology. Former names (the Aspects' `softDelete`, the Design Terms' `delete.deactivate`) are kept as `aliases` only so that `mde migrate-features` can convert an application that still uses them. Tools do not read them: a former name, a `## Aspects` section, a catalog's `terms`, an `aspect:` storage marker, and the tags `@term:<id>` and `@check:<feature>.<n>` are retired, and `mde verify` reports each one.

## Relationships

- Targets compile the build Features; the Strategy keeps Targets and sets rigor ([Strategy](work/strategy.md)).
- Requirement objects and capability designs apply optional Features; the design realizes those the requirements apply ([Capability Design](design/capability-design.md)).
- The application's catalog records each optional Feature's realization and implementing component ([Design Catalog](design/design-catalog.md)).
- A stack's Architecture may declare an *invocation convention*, which `mde verify` then checks ([Architecture](architecture/README.md)).
- The [Evidence Package](evidence/evidence-package.md) reports every Check and promise, per application.
- Replaces the Aspect and the Design Term, both retired.
