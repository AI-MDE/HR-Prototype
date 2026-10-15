---
type: logical-data-model-diagram
title: PerformanceReview logical data model
---

# PerformanceReview logical data model

```mermaid
erDiagram
  PerformanceReview {
    uuid id PK
    date periodStart
    date periodEnd
    date reviewDate
    text summary
    text strengths
    text developmentActions
  }
  PerformanceReview }o..|| Employee : "assesses"
  PerformanceReview }o..|| Employee : "reviewed by"
```

## Reading

PerformanceReview is primary. Each review assesses exactly one Employee and is reviewed by exactly one Employee: two distinct roles pointing to the external Employee aggregate. An employee can appear on many reviews in either role.
