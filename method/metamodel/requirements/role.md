---
type: concept-type
title: Role
description: A business responsibility or actor classification relevant to permissions and use cases.
icon: 👤
---

# Role

A Role is a business responsibility or actor classification relevant to permissions or use cases. Its rules and checks are in the [business-requirements](../../targets/requirements/business-requirements.md) Target.

## Location

One file per role, shared at the top level: `specs/requirements/roles/<role>.md`. The role id is the key entity operations and use cases reference.

## Structure

- Purpose
- Responsibilities
- Critical Success Factors: what the role must achieve to succeed, each with the measure that shows it, its target, and when it is in trouble ([role success factors](../../features/business-requirements/role-success-factors.md))
- Permissions / Constraints
- Related Capabilities
- Related Use Cases

What a role may do follows from the use cases it is an actor of ([Authorization](../design/authorization.md)); Permissions / Constraints explains it in words, it does not grant. A role with oversight of the whole application, which no use case describes, declares `reads: all` in its frontmatter and may read every entity.
