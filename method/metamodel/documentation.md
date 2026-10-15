---
type: concept-type
title: Documentation
description: The guides that ship with the application, for its users, administrators, and operators.
icon: 📚
---

# Documentation

The guides that ship with the application. They are part of the product, so they live in the App area, in its `docs/` folder (`app/docs/` when the App area is `app/`, located through `mde.json`). They are not proof of the product; the [Evidence Package](evidence/evidence-package.md) reports whether they exist and links to them.

- `<app>/docs/user-guide.md` — how an end user operates the application, task by task, for each role.
- `<app>/docs/admin-guide.md` — how an administrator configures it and manages users, roles, and reference data.
- `<app>/docs/operations-guide.md` — how to install, configure, start, stop, back up, upgrade, and troubleshoot it.

Include a guide only when it applies: a user guide when there is a user interface, an operations guide when the application is deployed.

## User guide

The manual an end user reads to get their work done, written for a non-technical user. It is organized around the [Use Cases](requirements/use-case.md): it explains how to perform each one.

1. **Getting started** — what the application is for, who uses it (each role), how to sign in, and the main screens and navigation.
2. **One section per use case**, grouped by the role that performs it:
   - the goal, in the user's terms, and who can do it;
   - what must be true first (preconditions), in the user's terms;
   - the steps, in order, as the user does them: which screen, what to enter or choose, what to press. **A screenshot at every step** shows the screen at that point;
   - the result: what the user sees when it succeeds;
   - what can go wrong: each alternate or rejected outcome (for example a business rule refusing the action), what the user sees, and what to do about it.
3. **Reference** — terms from the [Glossary](requirements/glossary.md) the user meets on screen.

Keep it in `<app>/docs/user-guide.md`; when it grows large, one page per use case in `<app>/docs/user-guide/<use-case>.md`, linked from the guide. Screenshots live beside it in `<app>/docs/screenshots/<use-case>/`.

## Operations guide

The runbook for whoever installs, deploys, and runs the application (not develops it), when a deployment is in scope:

- prerequisites and configuration: environment variables, database connection, ports;
- install and build;
- deployment, for the selected deployment target (for example behind a reverse proxy, in a container, or in the cloud);
- starting, stopping, and checking health;
- troubleshooting common problems: a failed database connection, migrations or seed data, port conflicts, base-path or proxy issues.

## Admin guide

How an administrator configures the application and manages users, roles, and reference data, when the application has administration functions.

Its rules and checks are in the [documentation](../targets/app/documentation.md) Target.
