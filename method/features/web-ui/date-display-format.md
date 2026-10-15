---
type: feature
kind: build
id: date-display-format
title: Human date display (business dates, no raw ISO)
origin: mde
impacts:
  - web-ui
default: n/a
---

# Human date display (business dates, no raw ISO)

## Purpose

When a page shows a **business date** — a calendar day the user cares about, such as a hire date,
due date, start/end date, or review date — it presents it in a **human-readable** form, e.g.
`Jan 15, 2025` (or the app's chosen locale/format), never the raw storage value like
`2025-01-15T05:00:00.000Z` or `2025-01-15`.

**Scope: business dates, not timestamps.** System timestamps — `createdAt`, `updatedAt`,
audit/log times — are metadata, not business dates. This feature does **not** require formatting
them into a pretty date: they are often not shown at all, or shown as full date-time / relative
time when they are. The rule targets the *business-meaningful calendar dates* a user reads as
dates.

This is the temporal analogue of [reference-display](reference-display.md): just as a related entity is shown by its
human display-label rather than its raw `id`, a business date is shown human-formatted rather than
as its raw stored value.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Business dates (hire, due, start, end, review, effective) are shown human-readable (for example `Jan 15, 2025`), formatted by one shared helper, never as raw ISO; storage and transport stay ISO. System timestamps (`createdAt`, `updatedAt`, audit times) are not business dates and may be shown as date-time or relative time.

## Audit

- Are business dates human-formatted by one shared helper, with storage and transport in ISO?
