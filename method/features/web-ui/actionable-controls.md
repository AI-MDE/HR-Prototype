---
type: feature
kind: build
id: actionable-controls
title: Actionable controls
origin: mde
impacts:
  - web-ui
default: n/a
---

# Actionable controls

## Purpose

Every visible control does something — a button wired to nothing is a defect. Filters,
dialogs, tabs, toasts, validation, and approve/reject flows actually respond.

Every modifying control also acts on the exact object or object set declared by its owning Page
Spec panel. A control never substitutes an implicit first/default collection record.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- Every visible control does something: actionable, disabled with an explanation, or replaced by a clear placeholder message. Filters and search visibly update the data; tabs, dialogs, confirmations, toasts, and inline validation respond; rule-bearing UI shows its warnings and errors.

## Audit

- Is every visible control wired: actionable, disabled with an explanation, or a clear placeholder?

You did not build this UI. Do not trust that a control *exists* — judge whether it
*acts*. Drive the real running app in a browser and, for each mutating control (Save,
Create, Submit, approve, a status/lifecycle change):

- **Click it, then read the result back after a reload / fresh fetch.** Did the change
  actually persist, or did it vanish on reload? A change that survives only in React
  state is a fake — the classic "Save profile / change status / propose assignment
  updates local state, never calls the API" (observed: `EmployeeDirectory.tsx` save,
  `PerformanceWorkspace.tsx` acknowledge, `ProjectStaffing.tsx` propose).
- **Corroborate against the server's own log for the run** — a mutating click must
  leave a matching request/write in the app log. A control that changes the screen with
  no corresponding server activity did not operate; it repainted.
- **A control that always affects the same record** regardless of what you selected
  (e.g. "propose" always targets the same person) is mis-wired — try it against
  different rows and see whether it follows your selection.

Report each control as **operating** (change persisted across reload + a matching entry
in the server log), **placeholder** (screen changed but nothing persisted / no server
activity), or **mis-wired** (ignores your selection). "The button is there and the screen
changed" is not a pass.
