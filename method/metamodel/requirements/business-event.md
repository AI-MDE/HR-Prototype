---
type: concept-type
title: Business Event
description: A business-significant fact that has occurred and that the business must recognize on its own.
icon: ⚡
---

# Business Event

A Business Event is a fact that has occurred, named in the past tense, that something in the business must recognize independently of the operation that caused it. It is owned by the entity it is about, or by the capability when no entity naturally owns it. Its rules and checks, including which occurrences qualify as events, are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

```text
specs/requirements/capabilities/<capability>/<abe>/events/<event>.md
specs/requirements/capabilities/<capability>/events/<event>.md
```

## Structure

- **id** — stable, equal to the filename.
- **title** — the completed fact, in the past tense (for example, "Leave Request Approved").
- **subject** — the entity or capability it is about.
- **means** — what has become true.
- **significance** — why the business must recognize it on its own, and the consequence.
- **produced by** — the use-case outcome that produces it.
- **facts** — the information it carries.
- **consumers** — who or what reacts to it, when known.

Recording events at runtime is an architecture concern, separate from declaring them here.
