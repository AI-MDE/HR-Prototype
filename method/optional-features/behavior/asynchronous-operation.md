---
type: feature
kind: optional
id: asynchronous-operation
name: Asynchronous Operation
description: "A long operation is accepted at once and finishes in the background, and people can see how it went."
scope: [operation, use-case]
appliedIn: [requirements, design]
aliases: [async]
---

# Asynchronous Operation

A long operation is accepted at once and finishes in the background, and people can see how it went.

## Meaning

The request is accepted with a tracking id; the work runs after; its status (pending, done, failed) and result can be read.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:asynchronous-operation/<promise>`.

- `accepted-with-id` The operation is accepted at once with a tracking id.
- `status-readable` Its status and result can be read until it completes.
- `failure-reported` A failure is reported, never lost.
