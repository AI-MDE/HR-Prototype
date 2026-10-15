---
type: feature
kind: optional
id: comments
name: Comments
description: "People discuss a record in comments kept with it."
scope: [entity]
appliedIn: [requirements]
aliases: [comment]
---

# Comments

People discuss a record in comments kept with it.

## Meaning

A comment has an author, a time and text, belongs to one record, and is shown with it to those who may see the record.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:comments/<promise>`.

- `kept-with-record` A comment is shown with its record, with its author and time.
- `visible-with-record` Only those who may see the record see its comments.
