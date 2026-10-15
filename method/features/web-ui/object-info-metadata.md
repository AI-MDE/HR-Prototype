---
type: feature
kind: build
id: object-info-metadata
title: Object identity and metadata presentation
origin: mde
impacts:
  - web-ui
default: on
---

# Object identity and metadata presentation

## Purpose

Expose useful identity, audit or provenance context when the user needs it.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Object metadata (identity, audit, provenance) is shown where the users' tasks need it, accurately and access-controlled; technical identifiers stay stable for navigation and tests but distinct from business labels; secrets and internal paths are never exposed.

## Audit

- Is object metadata shown where tasks need it, accurate and access-controlled, with no secrets or internal paths exposed?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on ui-design

Determine which object metadata is relevant for the Page’s users and tasks. An Info panel, detail section or contextual disclosure is a design choice, not mandatory chrome for every object. Technical identity may support testing without becoming the visible business label.
