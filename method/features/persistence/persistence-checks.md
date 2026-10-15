---
type: feature
kind: build
id: persistence-checks
title: Persistence checks across Features
origin: mde
impacts:
  - persistence
---

# Persistence checks across Features

## Purpose

Checks of the Persistence Target that span several of its Features, so they belong to none of them alone.

## Verify

- `db-report-present` Is `db-report.json` present, healthy, and listing every table the migrations declare?
