---
type: feature
kind: build
id: integration-checks
title: Integration checks across Features
origin: mde
impacts:
  - integration
---

# Integration checks across Features

## Purpose

Checks of the Integration Target that span several of its Features, so they belong to none of them alone.

## Audit

- Do external calls have explicit timeouts, with no committed secrets? Are retries safe, and versioning, compatibility, and reconciliation defined?
