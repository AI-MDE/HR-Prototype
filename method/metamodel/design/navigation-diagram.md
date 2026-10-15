---
type: concept-type
title: Navigation Diagram
description: How a person moves through the application: each role's entry page, the pages, and the links and actions between them.
icon: 🗺️
extends: diagram
---

# Navigation Diagram

Shows the application's pages as a person moves through them: where each role starts, which pages lead to which, and the use cases that cross pages (a wizard's steps, a list to a record to its related records). Pages are not designed one by one; they follow the [UI conventions](../../architecture/ui.md#ui-conventions-the-pages-are-generated-not-designed), and this diagram is the agreed page set drawn as a map. One diagram for the application; a large one may add one per capability, linked from it.

## Owner and location

Design owns it: how a person moves through the pages is part of the interaction design, realized within the UI conventions the Architecture sets, and drawn from the page set Design records (`specs/design/page-set.md`). Place it in `specs/design/diagrams/navigation.md`. Every application with a user interface has one.

## Content

- Each role, and the page it enters on.
- Each page of the agreed page set, named as in the page set (and as the application's page inventory reports it once built), with its main entity or use case.
- The links between pages: navigation (menu, list to record, record to related record) and the actions that move to another page (a use case's next step, its outcome), each labeled.
- Nothing the page set doesn't have, and nothing it has left out.

## Representation

A Mermaid `flowchart` in a Markdown fence: roles as start nodes, pages as nodes, links as labeled edges. Each page node links to its page's entry in `specs/design/page-set.md`.

When to create and update it, and its checks, are in the [UI design](../../targets/design/ui-design.md) and [architecture](../../targets/design/architecture.md) Targets.
