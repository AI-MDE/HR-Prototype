---
type: feature
kind: build
id: shared-access-enforcer
title: Consistent access enforcement
origin: mde
impacts:

default: n/a
---

# Consistent access enforcement

## Purpose

Enforce declared permissions consistently across application entry points.

## Applicability

Applies where this structural or cross-cutting concern is relevant. An architectural technique is adopted explicitly in Specs; it does not override an existing Architecture or stack decision.

## Audit

- Are permitted and forbidden operations verified for relevant roles and contexts?
- Do direct API/internal requests receive the required enforcement?
- Do UI access states agree with trusted decisions without being their sole implementation?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on architecture

Design one consistent authorization policy and reusable enforcement boundary appropriate to the selected runtime. Requirements own who may perform which operation; Architecture and Design choose realization.

### Impact on api

Every exposed operation enforces applicable permissions at a trusted boundary. UI filtering alone is insufficient. Internal calls must preserve actor context and cannot silently bypass policy.

### Impact on web-ui

Reflect permitted actions and contextual restrictions in the UI; hiding controls does not replace trusted enforcement. Real prototypes exercise the same applicable authorization behavior.
