---
type: feature
kind: build
id: live-page-navigation
title: Live-page navigation
origin: mde
impacts:
  - web-ui
default: n/a
---

# Live-page navigation

## Purpose

A built page demonstrates the workflow, not a static screen — real client-routing links
between the app's pages, current page active.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Each page has real client-routing links to the primary pages (each role's landing page, and the lists of the Primary Entities the role works with), with the current page active and every target existing; a decorative menu with dead links does not count.

## Audit

- Does each page link to the primary pages with real routing, every target existing?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on ui-design

Navigation follows the UI conventions: from each role's landing page to what the role works with.
