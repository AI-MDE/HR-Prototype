---
type: feature
kind: build
id: role-success-factors
title: Role success factors and dashboards
origin: mde
impacts:
  - business-requirements
  - ui-design
---

# Role success factors and dashboards

## Purpose

A role exists to achieve something. Its Critical Success Factors (CSFs) say what: the few things the role must get right for the business to succeed (a dispatcher: every urgent request assigned within the hour; a manager: no technician idle while requests wait). Stated as requirements, each with a measure the model can compute, they become the role's dashboard: the page it starts from, showing at a glance where it is succeeding and where it must act.

## Impact on business-requirements

- For each role that owns outcomes (not one that only supplies information), elicit its Critical Success Factors in the role's `## Critical Success Factors` section ([Role](../../metamodel/requirements/role.md)): few (three to five), each stated as the outcome in the business's words.
- Give each factor:
  - **Measure:** the indicator that shows it, defined from the model: what is counted, summed, averaged, or timed, over which entity, in which states, and over what period (for example the share of urgent Service Requests assigned within 60 minutes of being raised, this week). Every entity, attribute, state, and event a measure names exists in the requirements; when it needs one that does not (the time a request was assigned), add it to the model, or the factor cannot be measured.
  - **Target:** the value that means success, and the threshold at which the role is in trouble (for example 95%, at risk below 90%).
  - **Action:** what the role does when the factor is at risk, and the use case it does it with (assign the waiting requests: Schedule and Assign Service Request). A factor the role cannot act on belongs to another role.
- A factor whose target the business has not stated is an open question with the default assumed meanwhile ([Questions](../../metamodel/work/questions.md)).

## Impact on ui-design

- Each role with Critical Success Factors has a dashboard page (Canvas `Dashboard`, in the [page vocabulary](../../architecture/ui.md#canvas-types)), its starting page after sign-in unless the Design says why not.
- One panel per factor, in the role's order of importance: the measure's current value against its target, its status (on target, at risk, missed) shown by more than colour alone, and its trend over the measure's period when the business needs to see the direction.
- Each panel leads to where the role acts: the records behind the measure (the list, filtered to those that put it at risk) and the factor's action. A panel the role can only look at is a report, not a dashboard panel.
- A dashboard shows only that role's factors and the work waiting for it; it is not a catalogue of every count the data allows. Roles that share factors may share a dashboard.

## Audit

- Does each role that owns outcomes state its Critical Success Factors, each with a measure defined from the model, a target, an at-risk threshold, and an action through a use case?
- Does every entity, attribute, state, and event a measure names exist in the requirements?
- Does each role with factors have a dashboard page with one panel per factor, showing value against target and status, and leading to the records behind it and the action?
