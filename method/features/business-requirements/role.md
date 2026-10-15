---
type: feature
kind: build
id: business-requirements-role
title: Role
origin: mde
impacts:
  - business-requirements
---

# Role

## Purpose

The "Role" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

Each role states its business responsibility, the goals and outcomes it owns, the capabilities and use cases it uses, the decisions, approvals, confirmations, or information it supplies, and its business-level permissions, constraints, and scope. Roles are shared at the top level, never duplicated inside a capability; the role id is the key entity operations and use cases reference.

## Verify

- `roles` Are roles kept only at the top level (`specs/requirements/roles/`), each the actor of some use case (`mde verify`, Roles row)?

## Audit

- **Role:** Does each define responsibility, goals, capabilities used, business-level permissions and constraints, and material approvals or decisions? Are roles shared at the top level and not duplicated inside capabilities?
