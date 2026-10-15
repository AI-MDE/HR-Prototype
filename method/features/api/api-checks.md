---
type: feature
kind: build
id: api-checks
title: API checks across Features
origin: mde
impacts:
  - api
---

# API checks across Features

## Purpose

Checks of the API Target that span several of its Features, so they belong to none of them alone.

## Verify

- `endpoints-live` Is every endpoint live (persists, with a data-store path in the log) and every business rule enforced (violation rejected and not persisted)?
