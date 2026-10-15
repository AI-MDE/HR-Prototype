---
type: feature
kind: optional
id: annotations
name: Annotations
description: "People leave notes on the pages of the application, on a document or a page element."
scope: [application]
appliedIn: [requirements]
---

# Annotations

People leave notes on the pages of the application, on a document or a page element.

## Meaning

An annotation is attached to a page or an element of it, has an author and a state, and is the author's own unless shared.

## Parameters

| Parameter | Type | Default | Meaning |
|---|---|---|---|
| `sharing` | boolean | `true` | Users may share a note with everyone who can see its page or record; false keeps every note private to its author. |

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:annotations/<promise>`.

- `attached-to-element` An annotation stays attached to the element it was left on.
- `own-unless-shared` An annotation is visible to its author, and to others only when shared.
- `resolvable` An annotation can be marked done.

## Guidance

Let the application's own users leave notes where they work: on a part of a page (this total looks wrong, this field is unclear) or on a record (call the customer before Friday). A note stays where it was left, is shown again when the user returns, and can be shared with the others who can see that page or record, then resolved. It applies when the application applies this Feature in its Domain overview. A discussion that belongs to a record's own content is the [comments](comments.md) Feature, not this.

The behavior is the same in every application, so it is delivered as a package with a front and a back half, joined by the interface below. Where MDE provides the package for the application's stack, install and mount it; otherwise implement the same interface. Either way the application supplies the ports: who the user is, who may see what, where notes are stored.

### For web-ui

- **Annotate mode.** An **Annotate** control in the shell turns the mode on: the user clicks an element on the page, writes a note, and saves it. Off, the page behaves normally. While a record's page is open, a note can be attached to the record itself instead of an element.
- **Where notes show.** Each note on the current page is a marker on its element; a record's notes are listed on its page. A count in the shell opens the list of the notes the user can see, each leading to its page and element.
- **Finding the element again.** A note records its element by `id`, then `data-testid`, then a DOM path, and is found again in that order ([stable selectors](../../features/web-ui/stable-selectors.md)). A note whose element no longer exists is listed as **detached**, never lost or silently dropped.
- **Visibility.** A note is **private** (its author only) or **shared** (everyone who may see its page or record). Private is the default.
- **Status and ownership.** A note is **open** or **resolved**; whoever can see a shared note can resolve or reopen it. Only its author edits or deletes it.

### For api

The interface between the package's halves, mounted on the application's own API at `/api/annotations`, as the current user (the application's session):

| Request | Does |
|---|---|
| `GET /api/annotations?page=<route>` | the notes on a page the user can see |
| `GET /api/annotations?entity=<Entity>&id=<id>` | the notes on a record the user can see |
| `GET /api/annotations` | every note the user can see, newest first |
| `POST /api/annotations` | create: `{ target, text, visibility }` |
| `PATCH /api/annotations/<id>` | change `text` or `visibility` (author), or `status` (anyone who sees it) |
| `DELETE /api/annotations/<id>` | delete (author) |

A note is `{ id, target, text, visibility: "private" | "shared", status: "open" | "resolved", author: { id, name }, createdAt, updatedAt }`. Its `target` is `{ page, selector?: { id?, testid?, path? }, entity?, recordId? }`: a page and an element on it, or a record. Refusals are `403` (not allowed) and `404` (not found, or not visible to this user), with the reason in the body.

**The ports the application supplies to the back half:**

- `currentUser(request)` → `{ id, name }`, from the application's own sign-in.
- `canView(user, target)` → whether the user may see that page or record, by the application's own authorization; a shared note is visible only to users who can view its target.
- `store`: the notes' persistence, a table in the application's database (the package provides its migration) or the application's JSON store.

**The mount the front half needs:** `mountAnnotations({ apiBase, getContext })`, where `getContext()` returns the current `{ page, entity?, recordId? }`; the shell provides the Annotate control's place and the count.

### For persistence

- Notes are stored by the application, in its own database, one table (or collection) with the note's fields and its target, created by a migration like every other table ([versioned migrations](../../features/persistence/versioned-migrations.md)). They are application data, backed up and kept like it, not files of the project.

## Audit

- When the application declares `annotations`: can a user annotate an element and a record, see the notes again after reloading, share one, and resolve it; does a note whose element is gone show as detached?
- Does the API follow the interface, and does a user never receive a note on a page or record they cannot view?
- Are notes stored in the application's own database through a migration, and do the ports come from the application's own sign-in and authorization?
