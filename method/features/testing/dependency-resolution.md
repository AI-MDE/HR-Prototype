---
type: feature
kind: build
id: dependency-resolution
title: Dependency resolution (static)
origin: mde
impacts:

default: n/a
---

# Dependency resolution (static)

## Purpose

Every `import`/`require` in generated source resolves to a **declared** dependency — using a
package not in the scoped output/evidence inventory is a failure, even if the file `--check`s clean.

## Applicability

Applies to required verification for the scope. Strategy sets rigor and gate policy; Design resolves the test realization and tooling.

## Verify

- `imports-resolve` Does every import/require in generated source resolve to a declared manifest dependency?
  · evidence: dependency-resolution check output
  · when: static

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on testing

A static check: every `import`/`require` resolves to a dependency declared in the project
manifest (`package.json`, `pyproject.toml`, `*.csproj`, …). Any undeclared package is a
failure, not a deferral. This runs in every environment and is never deferred.

### Impact on server

Generated source must only use declared dependencies.
