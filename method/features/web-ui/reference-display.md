---
type: feature
kind: build
id: reference-display
title: Related-entity display (Display Label)
origin: mde
impacts:
  - web-ui
default: n/a
---

# Related-entity display (Display Label)

## Purpose

When a page shows **or captures** a **related entity** — the employee on an assignment, the
customer on an order, the reviewer on a performance review — it uses that entity's **Display
Label**, the human-readable label, not the raw technical `id` and not (by default) the Business
Key. This holds on **both** sides: **displaying** an existing reference, and **entering/choosing**
one in a create/edit form.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- A related entity is shown by its **display label** (the property with role `display-label`, possibly derived, such as first and last name), never its technical id; a unique property appears only when it is the display label or to disambiguate. A form field that sets a reference is a selection control listing the related entity by display label, labelled by the entity (`Employee`, not `Employee ID`), submitting the id behind the scenes; never a text field for a raw id.
- So the page never needs a second lookup, every API response that returns a referencing resource (list, read, create, and update) carries the display label: the repository joins the referenced table and aliases its display label, and a create or update that already fetched the related entity returns it. A `row.employeeName ?? row.employeeId` fallback in the UI is the tell.

## Rationale

**Why the label belongs in the response shape.** A UI that must make a second lookup to resolve
a foreign id into a name is drift — the display-label is a property of the response, not
something the client derives.

**What the create/update omission looks like in practice.** When a create/update response
returns the bare row, the caller falls back to the raw id until the next refetch — the
`row.employeeName ?? row.employeeId` pattern in the UI is the tell.

## Audit

- Do categorical values come from the requirements, are references shown and chosen by display label (with API responses carrying it, through a repository join), and are business dates human-formatted by one helper?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on api

**The API response carries the display-label, not just the foreign id.** If the UI must render
a related entity's name (impact on web-ui, above), the API response for that resource must
already include it. This holds for **every** endpoint that returns the referencing resource,
not only `list`/`read`: a `create`/`update` response is a defect if it omits the display-label
of an entity it just validated and referenced.

### Impact on server

**The repository SQL-joins the referenced table to produce the display-label column, rather
than the service/route papering over a missing one.** A repository method that selects a row
with a foreign key (`employee_id`, `project_id`, `manager_id`, …) joins the referenced table
(`LEFT JOIN employees e ON e.id = x.employee_id`) and aliases its display-label column into the
result (`e.full_name AS employee_name`) — the same query shape for `list`, `read`, `create`, and
`update`. A `create`/`update` that already fetched the related entity for validation (to confirm
it exists / is active) has the display-label in hand and must include it in the returned shape,
not `RETURNING *` the bare row and leave the name null.
