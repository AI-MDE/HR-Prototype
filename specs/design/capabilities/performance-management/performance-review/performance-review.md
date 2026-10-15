---
type: entity-design
title: PerformanceReview design
---

# PerformanceReview design

Realizes [PerformanceReview](../../../../requirements/capabilities/performance-management/performance-review/performance-review.md).

## Operations

- **Create** — Take the review attributes plus assessedEmployeeId and reviewerId selected from Employee records; validate both references and persist both role-specific links. Return the recorded review.
- **Read** — Return the review, resolved employee labels and reviewer label. The reviewer is the recorded business participant, distinct from the demo-session role.
