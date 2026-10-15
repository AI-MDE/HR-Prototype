---
type: feature
kind: build
id: boundary-validation
title: Boundary validation
origin: mde
impacts:
  - server
default: n/a
---

# Boundary validation

## Purpose

Validation happens where inputs cross into the system — API/UI boundaries and important
business-rule boundaries — not scattered or skipped.

## Applicability

Applies to relevant application implementation and runtime contracts. Follow the selected stack and Architecture; examples do not mandate a framework, folder layout or unsupported tool.

## Impact on server

Validation happens where inputs cross into the system, at the API and UI boundaries and at important business-rule boundaries: explicit, consistent, deterministic, and testable, never scattered or skipped.

## Audit

- Is validation explicit and deterministic at the API, UI, and business-rule boundaries?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

API endpoints validate request contracts deterministically; validation failures are testable
and return useful responses.
