---
type: feature
kind: build
id: ui-design-navigation-diagram
title: Navigation diagram
origin: mde
impacts:
  - ui-design
---

# Navigation diagram

## Purpose

How a person moves through the application, drawn with the page set, at Design: the ui-design Target's own diagram, judged with it.

## Impact on ui-design

- **The navigation diagram is required, in every Strategy, once the application has a user interface:** the [navigation diagram](../../metamodel/design/navigation-diagram.md) (`specs/design/diagrams/navigation.md`), drawn from the agreed page set (`specs/design/page-set.md`). Whether the pages built follow it is the web UI's ([architecture conformance](../web-ui/architecture-conformance.md)).

## Verify

- `navigation-drawn` With a user interface, is the navigation diagram delivered, in `specs/design/diagrams/` (`mde verify`, Navigation diagram row)?

## Audit

- Does the navigation diagram show every page of the agreed page set, each role's entry, and the links between them, and nothing else?
