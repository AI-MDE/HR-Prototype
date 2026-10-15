---
type: feature
kind: build
id: application-design-policy-stays-in-requirements
title: Policy stays in Requirements
origin: mde
impacts:
  - application-design
---

# Policy stays in Requirements

## Purpose

The "Policy stays in Requirements" rules of the application-design Target that no other Feature supplies.

## Impact on application-design

Business policy is requirements: the allocation limit and the meaning of overlapping dates are requirements; the calculation algorithm, the atomic validate-and-write mechanism, and how a conflict is presented are design. A missing permission, deletion policy, or business exception is a requirements gap, never a technical choice for design to invent. Selected realizations go in Specs; alternatives still under consideration, open questions, evidence status, and decision history go in Work, linked to the Specs, and concepts never refer back to that tracking.
