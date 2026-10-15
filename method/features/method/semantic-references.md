---
type: feature
kind: build
id: semantic-references
title: Semantic references
origin: mde
impacts:
  - method-change
default: on
---

# Semantic references

## Purpose

Connect knowledge and realization through resolvable references to actual owning concepts.

## Applicability

Applies to maintenance of the Method itself. This is engineering guidance, not an application behavior requirement or an independently imposed gate.

## Impact on method-change

- References resolve to their owning documents, using the Meta-model's names and paths, keeping relationship labels and distinct roles visible; missing or ambiguous references are reported, and referencing a concept does not imply it is implemented.

## Verify

- `references-resolve` Do all references resolve to their owning documents?
