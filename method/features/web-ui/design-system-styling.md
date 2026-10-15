---
type: feature
kind: build
id: design-system-styling
title: Design-system styling
origin: mde
impacts:
  - web-ui
default: n/a
---

# Design-system styling

## Purpose

Pages compose the project's shared design-system tokens/components rather than re-declaring
shell/button/badge/table styling inline — so pages are visually consistent by construction.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Pages compose the design system's shared components and tokens (`specs/design/ui-design-system.md`) rather than re-declaring styling inline. The UI profile comes from the selected stack (for example [Carbon](../../stacks/carbon-ui.md)); project visual references in `specs/design/` specialize it without replacing it or the page spec.

## Audit

- Is styling composed from the design system and the stack's UI profile rather than re-declared inline?
