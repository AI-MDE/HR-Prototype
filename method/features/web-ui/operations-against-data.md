---
type: feature
kind: build
id: operations-against-data
title: Operations against data (not canned swaps)
origin: mde
impacts:
  - web-ui
default: n/a
---

# Operations against data (not canned swaps)

## Purpose

A filter/sort/page operation performs over the actual result set and re-renders — replacing
the table with a hardcoded row, or describing what *would* happen, is a fake.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- A persisting control (Save, Create, Submit, approve, a use-case operation) performs a real, data-backed operation: a concrete API method and route, the payload it sends, a route, service, and repository path behind it, and optimistic version handling where the entity is versioned. A button that only changes component state, or posts to nothing, is a placeholder even though the screen changes; only the in-progress edit before Save is local state. Before the real API exists, a prototype still goes through the data path to its substitute.
- Each modifying control acts on the object its owning panel declares (inline row, selected record, route record, draft, checked set), is disabled when its required selection is absent, never falls back to a first or default record, and ends only its declared panel context. Bulk controls surface partial successes and failures.
- Filter, sort, and paging operate on the actual result set: a matching query returns fewer but non-zero rows containing the term, a non-matching one returns zero. A canned row or a sentence describing the result is a fake.

Drive the running application in a browser, and for each mutating control click it, then read the result back after a reload, and look for the matching request in the server log. A change that vanishes on reload, or leaves no server activity, is a placeholder; a control that always affects the same record whatever is selected is mis-wired. Exercise each page's full set of operations: a page that renders its list and detail but silently omits create, edit, or a declared action is partial. Log in as users of different roles and confirm requests carry the identity, the server attributes them, and role-scoped behavior differs; with a real mechanism, confirm protected endpoints refuse without a session and a request replayed after sign-out is rejected.

## Audit

- Is every visible control wired, does every persisting control call a real route with a payload backed by the data path, and does every modifying control act on its panel's declared object, disabled without its selection, never on a default record?
- Do filter, sort, and paging operate on the real result set?
- Driven in a browser: does every mutating control persist across reload with a matching server request, does each page offer all its intended operations, and does identity reach the server and change role-scoped behavior?

Judge whether each page realises **every operation it is meant to** — not just the easy
subset. A page that renders a list and detail but silently omits create, edit, transfer,
skill-management, the assignment summary, etc. looks coherent while being half-built.

Drive the running app and exercise the page's full set of operations: type in the filter and
watch the count change; sort and confirm order changes; open create/edit and complete it;
run each declared action. For each: does it operate on the **real data** (a filter that
actually narrows, not a canned result), and is the operation **present at all**? A control or
whole operation that is simply absent — no button, no path — is an incompleteness the presence
checks miss.

Report the page as **complete** (every intended operation is present and operates on real
data) or **partial** (name the missing/decorative operations). "The main list works" is not a
pass if half the page's operations are absent.
