---
type: feature
kind: build
id: application-design-use-case-realization
title: Use-case realization
origin: mde
impacts:
  - application-design
---

# Use-case realization

## Purpose

The "Use-case realization" rules of the application-design Target that no other Feature supplies.

## Impact on application-design

Capture how a use case is realized in its own design semantics or in the Pages, API Contracts, Data Model, and Integrations it references. Resolve operations, inputs and context, transaction and concurrency boundaries, authorization enforcement, error outcomes, interaction bindings, and asynchronous or waiting behavior where relevant.

## Audit

- Are actor context, rule enforcement, transaction boundaries, and waits resolved where relevant?
