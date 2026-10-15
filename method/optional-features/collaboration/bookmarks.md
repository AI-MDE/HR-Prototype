---
type: feature
kind: optional
id: bookmarks
name: Bookmarks
description: "People keep their own list of records to come back to."
scope: [entity]
appliedIn: [requirements]
aliases: [bookmark]
---

# Bookmarks

People keep their own list of records to come back to.

## Meaning

A user marks a record of a bookmarkable entity and reaches it again from anywhere; the list is the user's own; a record the user can no longer see shows as unavailable.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:bookmarks/<promise>`.

- `own-list` A user sees only their own bookmarks, by the record's label.
- `toggle` A bookmark is added and removed from the record's page.
- `unavailable` A bookmarked record the user can no longer see is shown as unavailable, without its label.

## Guidance

Let a user mark the records they come back to, and reach them again from anywhere in the application. Like [annotations](annotations.md), it is the same in every application, so it is delivered as a package with a front and a back half joined by the interface below; where MDE provides the package for the stack, install and mount it, otherwise implement the interface.

### For web-ui

- **On the record.** The page of a record of a bookmarkable entity has a ☆ / ★ toggle by its title: ☆ adds it to the user's bookmarks, ★ removes it. Its state is the user's own.
- **My bookmarks.** The shell has a **Bookmarks** entry listing the user's bookmarks, newest first, each by its record's display label and entity, leading to the record's page. It can be filtered by entity.
- **A record that is gone or out of reach** stays in the list, marked as no longer available, until the user removes it; it is never silently dropped, and its label is not revealed to a user who can no longer see it.

### For api

Mounted on the application's own API at `/api/bookmarks`, as the current user; bookmarks are always the current user's own:

| Request | Does |
|---|---|
| `GET /api/bookmarks` | the user's bookmarks, newest first: `[{ entity, recordId, label, available, createdAt }]` |
| `GET /api/bookmarks?entity=<Entity>&id=<id>` | whether this record is bookmarked |
| `PUT /api/bookmarks/<Entity>/<id>` | bookmark it (repeating it changes nothing) |
| `DELETE /api/bookmarks/<Entity>/<id>` | remove it |

A `PUT` for an entity that does not apply the `bookmarks` Feature, or a record the user cannot view, is refused (`400`, `403`).

**The ports the application supplies:** `currentUser(request)` → `{ id, name }`; `canView(user, entity, recordId)` by its own authorization; `label(entity, recordId)` → the record's display label (or nothing when it no longer exists); and `store`, a table in its database (the package provides its migration).

**The mount:** `mountBookmarks({ apiBase })` gives the shell its Bookmarks entry; `bookmarkToggle({ entity, recordId })` renders the toggle on a record's page.

### For persistence

- One table (or collection) of `{ user, entity, recordId, createdAt }`, unique per user and record, created by a migration ([versioned migrations](../../features/persistence/versioned-migrations.md)). Deleting a record leaves its bookmarks, which then show as no longer available.

## Audit

- Does every bookmarkable entity's record page have the toggle, and does the Bookmarks list show the user's own bookmarks by label, leading to each record?
- Is a record the user can no longer see shown as unavailable, without revealing its label, and is the API refused for an entity that does not apply the `bookmarks` Feature?
- Are bookmarks stored per user in the application's database through a migration?
