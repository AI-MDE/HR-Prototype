---
type: feature
kind: build
id: prototype
title: Prototype in four visuals
origin: mde
impacts:
  - prototype
---

# Prototype in four visuals

## Purpose

Let the user see, and correct, the application before any of it is built: its use cases and data model, its data, its navigation, and finally its pages, all on the MDE runtime against JSON data, with no backend code and no SQL.

## Applicability

Applies when the current Goal is a prototype under the Prototyping Strategy, on the MDE runtime (the default). When the user chooses to build the prototype on a full stack instead, it is the application itself (see the Prototyping Strategy). Steps 1 to 3 do not depend on the stack; only step 4, the pages, is written in the chosen stack's frontend technology and UI profile.

## Impact on prototype

The prototype is built in four steps, in this order. Each step is shown to the user, who corrects it or says go; a correction goes into the Specs, and the step is shown again. A later step does not start while an earlier one is still being corrected.

**The prototype is usable after step 2.** The runtime runs the entity specs as written, so once the sample data exists the user tries the application live in the Workbench, with no code: each entity's list, a record's profile and its related records, create and edit forms, state changes (Deactivate, Approve), and use cases run step by step. The Workbench serves the same as an API. Step 3 agrees the page set; step 4, generated pages, is optional.

1. **Use cases and the data model.** From the conceptual requirements, render the [use-case diagram](../../metamodel/requirements/use-case-diagram.md) (`specs/requirements/diagrams/use-cases.md`), the [conceptual data model diagram](../../metamodel/requirements/conceptual-data-model-diagram.md) (`specs/requirements/diagrams/erd.md`: the [ABEs](../../metamodel/requirements/abe.md) by capability and how they relate), and each ABE's [logical data model diagram](../../metamodel/requirements/logical-data-model-diagram.md) (`specs/requirements/diagrams/erd-<abe>.md`: its entities with their attributes), each a page of its own in the form its concept gives (Mermaid), at the Simple level of detail. The question for the user: are these the right actors, goals, things, and relationships?
2. **The data, with navigation.** The primary entities are the ABEs' Primary Entities: the ones the business is about, where a user starts. For each, give a data profile: what identifies a record to people (its display label), its main attributes, its states, and the related entities it leads to. Write sample data for them in the runtime's seed file, `app/data/seed.json`: a small, connected, fictional set with realistic labels and the states and relationships the model supports. Its form: each entity's name, as its spec titles it, with a list of records (`{ "Employee": [ { "id": "e1", "fullName": "Ada Lovelace", "status": "Active" } ], "Assignment": [ { "employee": "e1" } ] }`). Give each record that others reference an `id`, and list an entity before the entities that reference it; required attributes must be present, and state values are the states the spec names. The seed is loaded on the first run into `app/data/data.json`, the live data; delete that file to reload the seed after changing it. The runtime reads the entity specs as written (see [Entity](../../metamodel/requirements/entity.md)), so the data needs no other model. The user browses it in the Workbench's live data view: a primary entity's list, one record's profile, and from there its related records. The question: is this the right information, and does it hang together?
3. **The site navigation.** From the use cases and the primary entities, propose the page set the UI conventions give, as the [UI design](../../targets/design/ui-design.md) Target asks (one line per page: its purpose, its main entity, the roles that use it; each role's landing page its dashboard, one panel per Critical Success Factor), in the conversation, with the [navigation diagram](../../metamodel/design/navigation-diagram.md) that draws it (`specs/design/diagrams/navigation.md`): each role's entry, the pages, and the links between them. Once agreed, record it as the application's **page set**, a Design Spec of its own, `specs/design/page-set.md` (type `design`): each page's purpose, primary entity or use case, roles, and navigation links or entry points. Keep it current when the user changes the navigation, and link it from Current Work with the approval recorded there. This preserves the decision across sessions even when no frontend is generated; it does not require detailed page specifications or a UI catalog. The question: can each role get from where it starts to what it needs?
4. **The web pages (optional).** When the user wants to see the application's own look and page flow rather than the Workbench's generic views, generate the frontend directly from what the user has agreed: the requirements, the data profiles, and the page set and navigation of step 3. Beyond the compact recorded page set, no detailed page specs or UI catalog are required for a prototype; the pages are the design the user tries. Write them in the chosen stack's frontend technology and UI profile (a React app with Carbon for `nest-carbon`), where the stack's frontend lives in the App area (for example `app/frontend/`), so they can be carried into the build; with no stack chosen yet, plain static pages in `app/prototype/` with a neutral style. The pages call the MDE runtime's API, which the Workbench serves for the application (`mde workbench <app>`, by default `http://localhost:3091`), not a backend of their own:

   | Request | Does |
   |---|---|
   | `GET /model` | the entities, their attributes, relationships, and operations |
   | `GET /data/<entity>`, `GET /data/<entity>/<id>` | a list, or one record, with display labels for its related records |
   | `POST /api/<entity>`, `PATCH /api/<entity>/<id>`, `DELETE /api/<entity>/<id>` | create, update, delete |
   | `POST /api/<entity>/<operation>` | a domain operation (submit, approve, …), with the record's `id` in the body |
   | `POST /use-cases/<name>/run` | run a use case |

   Each request sends `x-role` and `x-actor` for the role the user is acting as (a simple chooser in the page header), and the runtime enforces that role's permissions as `specs/design/authorization.json` states them, derived from the use cases by `mde authorization` ([Authorization](../../metamodel/design/authorization.md)); with no file and no Authorization table, everyone may do everything. The runtime accepts calls from local development origins, so a frontend on its own development server (a Vite app on `localhost:5173`) calls it directly.

   - **One data-access module.** The pages never call the runtime themselves: every call goes through one module of the frontend (for example `src/data/`), which offers what the pages need (list, get, create, update, delete, an operation, a use case) in the application's terms, and alone knows the runtime's paths, `folder`, and role headers. `.env` says `SERVER_SOURCE=runtime` ([configuration](../server/env-contract.md)). When the application gets its own backend, this module is replaced by one calling the backend's `API_BASE`, and the pages stay as they are ([configured data sources](../prototyping/data-source-switch.md)).
   - **Where the runtime is.** The paths above are from the Workbench's root (`http://localhost:3091/data/Customer`), with no prefix of their own. The address is configuration, never hard-coded: `MDE_RUNTIME_URL` (in a Vite app, `VITE_MDE_RUNTIME_URL`), defaulting to `http://localhost:3091`.
   - **Which application.** One Workbench serves several applications, so every request names its own: `folder=<the application's folder>` in the query string, from `MDE_PROJECT` (in a Vite app, `VITE_MDE_PROJECT`). A request that names none is served for whichever application the Workbench last opened, or none. The Workbench's App view sets both when it starts the pages; for a server started any other way, the pages' build configuration defaults the application to the project folder it sits in and the address to `MDE_WORKBENCH_PORT`, so the pages always name their own application.
   - **Errors show.** A failed call is shown on the page with the runtime's message; it never renders as an empty list.
   - **Its home in the Workbench.** The App area's `package.json` (`app/package.json`) has an `mde:start` script that starts the pages' development server (for example `npm --prefix frontend run dev`) on `WEB_PORT` from the project-root `.env` (a Vite app: `envDir` set to the project root, `server.port` from `WEB_PORT`), and declares its address as `"mde": { "url": "http://localhost:${WEB_PORT}" }`; no port is written anywhere else ([configuration](../server/env-contract.md)). Like every `mde:start`, it first stops its own previous run, if one is still going, and never a process it did not start ([starting](../server/app-start-contract.md)). The Workbench's App view starts it (Start) and opens it (Launch), and sets `MDE_RUNTIME_URL` and `MDE_PROJECT` (and their `VITE_` copies) for it. Install the frontend's dependencies, so Start works the first time.

   The user tries the pages against the same JSON data as step 2. The question: is this the right interaction?

Everything behind the pages comes from the Specs and the JSON data: a correction about meaning (an attribute, a relationship, a rule, who may do what) goes into the Specs, and the runtime shows it; a correction about the pages goes into the generated frontend. Write no backend code, SQL, or migrations for a prototype. When the runtime cannot do something the pages need, say so and record it as a limitation; do not work around it with backend code.

## Verify

- `authorization-current` For role-based behavior: is `specs/design/authorization.json` current with the use cases (`mde authorization --check`)?

## Audit

- Were the use-case diagram, the conceptual data model, and each ABE's logical data model rendered from the current requirements, shown, and confirmed before data was written?
- Does each primary entity have a data profile and connected, fictional sample data in the runtime's JSON data, browsable from its list to a record and its related records?
- Does the agreed page set give each role an entry and reach what each role needs, and is it recorded in `specs/design/page-set.md` with its approval linked from Current Work, including when no frontend was generated?
- When pages were generated: was the frontend generated from the agreed page set, in the stack's frontend technology and UI profile (or plain pages when none is chosen), calling only the runtime's API from the Workbench's root, through one data-access module (no page calls the runtime itself, and `.env` says `SERVER_SOURCE=runtime`), with the role and the application (`folder`) on every request, both addresses from configuration? Does the App area's `mde:start` start it, with its address declared, so the Workbench's App view starts and opens it?
- Was each step shown to the user and confirmed before the next began, and does the prototype contain no backend code, SQL, or migrations?
