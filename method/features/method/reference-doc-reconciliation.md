---
type: feature
kind: build
id: reference-doc-reconciliation
title: Method and documentation consistency
origin: mde
impacts:
  - method-change
default: n/a
---

# Method and documentation consistency

## Purpose

Keep Method definitions and explanatory documentation consistent without introducing a second behavioral authority.

## Applicability

Applies to maintenance of the Method itself. This is engineering guidance, not an application behavior requirement or an independently imposed gate.

## Impact on method-change

- Documentation explaining a changed definition is updated in the same change. It never adds a control the Strategy does not have, or describes a capability as implemented when it is not.

## Audit

- Was the documentation explaining each changed definition updated with it?
