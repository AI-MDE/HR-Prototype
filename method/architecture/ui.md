---
type: architecture
---

# UI Architecture

## Live application behavior

Production UI should operate against real application behavior and data rather than static mock datasets except in explicit prototypes or tests.

## Actions map to application operations

Actionable controls should invoke explicit application operations. Do not bury durable business rules only inside event handlers or page-local state.

## UI states

Pages and controls should account for meaningful states such as loading, empty, ready, validation failure, business rejection, authorization denial, concurrency conflict, and unexpected failure where applicable.

## Navigation

Navigation should be stable and intentional and should respect the application's deployment context.

## Reference display

Human-facing UI should normally display meaningful labels for referenced business objects rather than opaque storage identifiers.

## Governed values

Enumerations, allowed choices, statuses, and other governed values should come from authoritative business/application knowledge or interfaces, not be inconsistently duplicated across pages.

## Design consistency

Use a coherent design system or shared styling conventions. Reusable behavior and presentation should be implemented consistently across the application rather than forked per feature.

## Stable selectors

Where automated UI testing requires selectors, provide stable semantic selectors that do not depend on fragile styling or DOM position.

## UI implementation

Framework, rendering model, build tooling, source layout, and hosting model are project stack/configuration choices, not architecture requirements.

## UI conventions: the pages are generated, not designed

Pages are not specified one by one. They are generated from the requirements by conventions, and the generated pages are the design: they are reviewed running (the Workbench's annotations on the live application), not as documents describing them. The requirements already say what a page needs: the entities and their operations, the use cases and their actors, the roles and their success factors, and the authorization derived from the use cases.

The conventions, unless the application's architecture says otherwise:

- **Each ABE** has a list of its Primary Entity and a detail page for one record. The detail page shows the record, its lifecycle actions, and its ABE's other entities as panels of it; a related entity of another ABE is a reference that opens that entity's own page.
- **Each use case** is a flow its actors start from their landing page: a guided wizard when it has steps (choose, enter, review, act, outcome), otherwise the operation's action on the record's page.
- **Each role** has a landing page: its dashboard when the role has critical success factors (one panel per factor, its measure against its target, leading to the records behind it and the action), and the launcher of its use cases.
- **Actions** appear only where the role may run them (the authorization) and the record's state allows them (the lifecycle).
- **Routes** follow the entities: `/<entities>` and `/<entities>/:id`; a use case's flow is `/<use-case>`.

The application's architecture states its own conventions only where they differ from these, once, for every page. A choice for a single page that the conventions do not make is noted on that page's line in the page set (`specs/design/page-set.md`), with its reason.

**Feedback lands where it lasts.** A correction from reviewing a running page goes to the place that makes it survive the next generation: to the requirements when it is about meaning or who does what; to the conventions when it holds for every page; and when it holds for one page only, to that page's code, which from then on is maintained, not regenerated, with a test that keeps it. There is no page specification to keep in step, and no catalog of pages: what pages exist is what the application routes, which `mde verify` reports.

## The page vocabulary

The language the conventions and the UI rules (the [ui-design](../targets/design/ui-design.md) and [web UI](../targets/app/web-ui.md) Targets) are written in.

### Page patterns

Proven page shapes; a generated page takes the one its use case calls for:

1. **Search–Filter–List** — discover or narrow a collection, then open a result.
2. **Profile** — one routable business object: an identity and status header, Detail panels, dependent or related panels, and panel-owned actions. Profile is a page, never a panel.
3. **Parent–Children** — one parent context with dependent child collections and child-scoped add and edit.
4. **Compare–Match** — sources for human comparison, or system-evaluated match results.
5. **Summary–Drilldown** — summaries or measures that lead to the supporting collection and detail.
6. **Custom** — a page no preferred pattern fits.

Patterns may compose; for example staffing uses Search–Filter–List with Compare–Match.

### Composition

A page that coordinates several views is composed from business concepts, not controls or widgets:

```text
Page
  -> Canvas
      -> Panel
```

- **Page** — the identifiable, routable unit; composed of one or more canvases.
- **Canvas** — a composition surface that coordinates one or more panels.
- **Panel** — the smallest business UI unit, with one source, one purpose, and a set of services.

A page spec using composition declares its route and context, its canvases and their types, the panels in each canvas with source, type, purpose, placement, and services, the relationships and subpanels, and each panel action.

#### Canvas types

`Standard` / `MultiPanel` (ordinary page or workspace), `Dashboard` (KPI, status, summary, and alert panels), `Calendar` (objects by date), `Timeline` (objects on a time axis), `Kanban` (objects by workflow state), `Map` (location surface), `Diagram` (ERD, BPMN, architecture, flowchart), `Workflow` (process stage navigation or progress), `Custom` (explicitly described).

#### Panel

Each panel records:

- **Panel Type**: `Search`, `Filter`, `List`, `Grid`, `Tree`, `Detail`, `Form`, `Editor`, `Summary`, `Info`, `Chart`, `Comparison`, `MatchResult`, or `StateTransition`. `Tree` is a panel type, not a canvas.
- **Source**: `Entity`, `View`, or `Relationship`.
- **Purpose**: `Maintenance` (the canonical place its source is maintained) or `Reference` (context, with a way to open the source's own Maintenance page).
- **Placement**: layout guidance such as `Primary`, `Side`, `Bottom`, or `Inline`.
- **Services**: what the user can do in the panel (below).
- **Actions**: its terminal or committing operations (below).

#### Panel actions

Each modifying action belongs to one panel and declares:

- **Label** — the visible action name;
- **Operation** — the entity or use-case operation it performs;
- **Target** — normally derived from the owning panel and its relationships;
- **Terminal For** — the panel context it completes or abandons, when applicable;
- **Result** — the business result or state change;
- **Navigation** — the destination after success, when applicable.

#### List behaviors

A List panel is one of two kinds:

| List panel | read | edit | delete | add |
|---|---|---|---|---|
| **List** (navigating) | yes | select, then open the record's Maintenance page | select, then delete | open an add surface |
| **List with in-place edit** | yes | select, then edit in the row | select, then delete | add in the row |

#### Panel services

- `Edit` — create or modify the panel's source where allowed, including a lifecycle state change, committed by Save.
- `Operate` — expose use-case operations (Promote Employee, Transfer, Send Reminder), listed by name.
- `Open` — open the source's own Maintenance page.
- `Inspect` — show technical, audit, or system details on request.
- `Order` — user-defined ordering.
- `Transfer` — move, copy, or link items between panels.
- `Select`, `Filter` — choose or narrow, for Reference panels.

#### Panel relationships

Why panels appear together and how they coordinate:

- `Dependent` / `Child` — target records belong to the source object.
- `Selected` / `Detail` — target shows the record selected in the source.
- `Reference` — target supplies related context it neither owns nor maintains.
- `Compare` — sources are presented for human comparison.
- `Match` — the system evaluates compatibility and shows score, gaps, conflicts, or eligibility.
- `Aggregate` / `Summary` — target summarizes the source collection.
- `Compose` / `Result` — several sources contribute to a working or result object.
- `Control` / `Filter` — source criteria control the target collection.

#### Subpanels

A subpanel is owned by a parent panel or panel action and inherits its context; it does not establish a page context of its own.

- `Info` — read-only metadata: identity, provenance, ownership, version, timestamps, lifecycle state, and audit or history navigation.
- `StateTransition` — previews a governed lifecycle change (current state, new state, impact, applicable rules); it changes nothing until its owning action commits.
