---
type: feature
kind: build
id: changelog
title: Changelog
origin: mde
impacts:

default: n/a
---

# Changelog

## Purpose

Provide a human-readable account of meaningful application changes when requested by the project, so a reviewer can understand **what changed and why**, not just the end state.

## Applicability

Applies to documentation and evidence relevant to the requested scope. Durable application meaning belongs in Specs; execution findings and evidence belong in Work or configured reports.

## Audit

- Do entries agree with actual changes and commits? Do not require a separate change record for every work session.
- Can a reviewer understand what changed and why from the entries and docs?
  · evidence: changelog entries / walkthrough updates
  · when: static

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on documentation

Derive entries from actual scoped changes and Git commits. Update CHANGELOG.md where the project uses one. Current Work is context, not a mandatory unit of change. Git is authoritative for versions and releases.

Each entry gives the reasoning behind the change, not only what it did, so the change is legible to a reviewer. Update screenshots and walkthroughs when UI behavior materially changes.
