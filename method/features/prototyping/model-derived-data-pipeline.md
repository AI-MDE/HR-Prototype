---
type: feature
kind: build
id: model-derived-data-pipeline
title: Model-aligned sample data
origin: mde
impacts:

default: n/a
---

# Model-aligned sample data

## Purpose

Provide connected fictional records that explain the model and support usable previews and tests.

## Applicability

Applies to a preview or prototype requested for the scope. Use the selected real components and connected sample data; any substitute requires an explicit project decision.

## Audit

- Do samples use valid relationships and governed values?
- Are normal and boundary examples connected and viewable?
- Does loading/reset preserve unrelated operational data?
- Do sample records evolve with the model, without introducing business policy?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on application-design

Produce sample records during Design, following the current Design meta-model. Governed values, relations and constraints come from Specs. Meaningful names and fictional values may be authored or generated; a database is not a prerequisite.

### Impact on web-ui

Load the same coherent sample dataset through the selected real data source. Keep loading/reset repeatable and isolated from operational data; keep rejection inputs separate from valid demo records.
