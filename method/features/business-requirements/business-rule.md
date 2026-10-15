---
type: feature
kind: build
id: business-requirements-business-rule
title: Business Rule
origin: mde
impacts:
  - business-requirements
---

# Business Rule

## Purpose

The "Business Rule" rules of the business-requirements Target that no other Feature supplies.

## Impact on business-requirements

- Define business meaning precisely enough to implement and test, without prescribing an algorithm; enforcement mechanisms belong in Design.
- Identify rules governing operations, events, lifecycle transitions, relationships, and derived values. A rule is valid even without a user-facing use case.
- Associate each rule with its owning concepts and the contexts where it is enforced. Use cases invoke governed operations; they do not repeat rule logic.
- For quantified policies, state amounts, periods, aggregation, thresholds, cardinality, and remaining or fulfilled quantities precisely. Examples clarify a policy but do not settle an open business decision.
- Provide satisfying, violating, and boundary scenarios where applicable, including who may grant an exception.

## Verify

- `rule-ids` Is every rule of its own file linked from an entity it governs, and every rule id used once (`mde verify`, Business rules row)?

## Audit

- **Business Rule:** Is the policy specific and non-circular, with a real business basis? Are inputs, conditions, results, violations, and exceptions explicit? Is each rule connected to its owning concepts and enforcement context? Do success, failure, and boundary scenarios demonstrate its meaning? Are unresolved policy and unsupported realization visible?
