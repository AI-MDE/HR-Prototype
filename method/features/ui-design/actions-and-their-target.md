---
type: feature
kind: build
id: ui-design-actions-and-their-target
title: Actions and their target
origin: mde
impacts:
  - ui-design
---

# Actions and their target

## Purpose

The "Actions and their target" rules of the ui-design Target that no other Feature supplies.

## Impact on ui-design

- Every modifying action belongs to one panel, resolves to a declared operation, and has exactly one target, derived from its panel context:

  | Panel context | Action target |
  |---|---|
  | In-place list edit | the row being edited |
  | Detail reached by `Selected` | the record selected in the source panel |
  | Routable profile or detail | the record identified by the route |
  | Add form or editor | the new draft owned by that panel |
  | Modal form or editor | the draft or record the modal was opened for |
  | Bulk list action | the checked record set |

- Where a selection is required, no selection means the dependent panel is empty or disabled and its modifying actions are disabled. It **must never** fall back to the first or a default record.
- Bulk actions state their partial-failure behavior.
- An action is terminal only for its declared panel context, never automatically for the page: `Cancel` may end `Add` or `Edit`, `Approve` or `Reject` may end a review; search, filter, select, open, and navigation continue or change context.
- An editing List panel declares one of the two List behaviors (navigate to edit, or edit in the row). One that offers `Edit` but declares neither is **incomplete**: resolve it before building.
- A lifecycle state change is part of `Edit`, committed by Save; `Operate` is for use-case actions only.

## Audit

- Does every modifying action belong to a panel, resolve to a declared operation, and have one unambiguous target? Is it disabled when its required selection is missing, with no fallback to a first or default record, and is bulk partial-failure behavior declared?
- Is every terminal action scoped to the panel context it completes? Is `Profile` used only as a page pattern and `Tree` only as a panel type? Does every editing List declare its behavior?
- Are the required UI operations derived from the Specs, bound to the correct operations, roles, and record context, with non-UI exclusions marked?
