---
type: concept-type
title: Capability
description: A meaningful business ability or area of responsibility supported by the application.
icon: 🧩
---

# Capability

A Capability is a meaningful business ability or area of responsibility supported by the application. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

One folder per capability, `specs/requirements/capabilities/<capability>/`, holding:

```text
overview.md          the capability's own spec
use-cases/           its use cases
workflows/           its workflows
business-rules/      its rules that belong to no single ABE
events/              its business events that no entity owns
<abe>/               each ABE whose home is this capability (any other folder is an ABE)
```

## Structure

- Purpose
- Scope
- Actors / Roles
- Workflows: links to its [Workflows](workflow.md)
- Conceptual Data Model: a link to its [Conceptual Data Model Diagram](conceptual-data-model-diagram.md), the ABEs and how they relate
- ABEs: the [ABEs](abe.md) it uses, each linking its Primary Entity's spec, its own ABEs (its folders) first, then those it uses from other capabilities
- Use Cases
- Rules
- Relationships to other Capabilities

The overview is the capability's front page, and it points rather than contains: a line of purpose, then links to its workflows, its conceptual data model, its ABEs, its use cases, and its rules. Their content stays in their own files, so reading the overview costs little and the rest is read only when the work needs it.
