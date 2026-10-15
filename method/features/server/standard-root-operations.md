---
type: feature
kind: build
id: standard-root-operations
title: Discoverable application operations
origin: mde
impacts:
  - run-app
default: n/a
---

# Discoverable application operations

## Purpose

Let users and automation invoke relevant build, execution and verification functions through a documented operations map.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on run-app

- Map every applicable operation (install, start, stop, build, test, health, and where relevant migrate, seed, schema inspection) to its exact command in the technology Specs, reachable from the project entry point. Commands report failure truthfully. Destructive resets are distinct from ordinary startup and scoped safely.

## Audit

- Is every applicable operation mapped to its command, reporting failure truthfully, with destructive resets kept apart?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Resolve commands and their effects in the application’s Technology/operational design. Avoid prescribing Node script names for other stacks; integration-required names are recorded only when that integration is selected.
