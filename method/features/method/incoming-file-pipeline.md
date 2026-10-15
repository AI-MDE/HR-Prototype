---
type: feature
kind: build
id: incoming-file-pipeline
title: Incoming file handling
origin: mde
impacts:
  - method-change
default: n/a
---

# Incoming file handling

## Purpose

Handle imported files, existing modifications, and session edits through one identify, analyze, and disposition process.

## Applicability

Applies to maintenance of the Method itself. This is engineering guidance, not an application behavior requirement or an independently imposed gate.

## Impact on method-change

An imported file or an existing modification is identified (its source and affected scope recorded in Work), analyzed against the existing Specs and Method, and given a disposition: accepted, rejected, or partly used, with its resulting changes traced. Unrelated existing modifications are never claimed as newly produced work.

## Audit

- Does each incoming file have a recorded source, assessment, disposition, and trace to its results?
