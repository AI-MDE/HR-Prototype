---
type: feature
kind: build
id: role-switcher
title: Role / user switcher
origin: mde
impacts:
  - web-ui
default: on
---

# Role / user switcher

## Purpose

A header control to act **as a role**, and for person-scoped roles (those that view their
own/their team's data) **as a specific seeded person**. The nav is filtered by role — a
**soft view filter, not access control** (all routes stay reachable; no guards). Identity is
client state; it is a **dev/review affordance, not** authentication.

## Applicability

Applies to a preview or prototype requested for the scope. Use connected sample data from the selected source: the MDE runtime by default for a prototype (the [Prototyping Strategy](../../strategy/prototype.md)), the application's own backend otherwise; any other substitute requires an explicit project decision.

## Impact on web-ui

- **Role and user switcher**: a header control (inside the user-profile menu) to act as a role and, for roles scoped to their own or their team's data, as a specific seeded person; generated from the roles in the requirements and a role-to-navigation map. Navigation filtering by role is a soft view filter: every route stays reachable. Omitted when the project has no roles.

## Audit

- Is the role switcher present when the project has roles, only behind the development flag, with every route still reachable?
