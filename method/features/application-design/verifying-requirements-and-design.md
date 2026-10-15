---
type: feature
kind: build
id: application-design-verifying-requirements-and-design
title: Verifying requirements and design
origin: mde
impacts:
  - application-design
---

# Verifying requirements and design

## Purpose

The "Verifying requirements and design" rules of the application-design Target that no other Feature supplies.

## Impact on application-design

Verification checks that requirements and design are complete, consistent, and executable enough to realize the business behavior. It never adds design semantics just to make generation convenient: when it finds missing information, update the requirement or design that owns it.

- **A business rule** is verified against representative data, preferably the sample data: start from business objects and a proposed change or operation, navigate declared relationships to the related records, filter, aggregate, or derive the values the rule needs, evaluate it, and return an observable business result. Never verify a rule by passing precomputed totals or hand-picked related records the model should derive. Cover normal, rejection, boundary, historical or inactive, and exception cases. If the model cannot supply what the rule needs, that is a model or design gap.
- **A use case** is complete when it can be performed end to end from the specifications: the authorized actor can start it; its business objects can be identified or selected; required attributes can be supplied or derived; relationships can be traversed; the entity operations exist; its rules can execute against the model; the state change or outcome can be represented; the designed page, action, and navigation carry it out when there is a UI; and success and expected failures are observable.
- **A gap** is diagnostic: identify the owning concept, refine its requirement or design, and verify again. Never solve a gap by duplicating semantics into another artifact.

## Audit

- Can each in-scope rule be evaluated from business objects through the model, and each in-scope use case be performed end to end from the specifications?
