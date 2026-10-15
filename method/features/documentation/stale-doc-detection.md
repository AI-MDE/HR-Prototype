---
type: feature
kind: build
id: stale-doc-detection
title: Stale-doc detection
origin: mde
impacts:
  - documentation
default: n/a
---

# Stale-doc detection

## Purpose

Stale screenshots/docs are **flagged**, not silently kept — outdated documentation is surfaced
rather than left to mislead.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Impact on documentation

- Guides describe the application as built, matching its actual pages, commands, and configuration, not the intended design. Every value and command in the operations guide comes from the application's real configuration and start scripts, never invented.
- Update the documentation in the same step as the change it describes, and only what the change affects: the user guide sections of the use cases it changed (and their screenshots), the operations guide when configuration or deployment changed, and the API documentation when a contract changed.
- A guide or screenshot that no longer matches is a [Finding](../../metamodel/work/finding.md), never left as if current.

## Audit

- Did each change update the documentation it affected, and does each guide match the application as built?
