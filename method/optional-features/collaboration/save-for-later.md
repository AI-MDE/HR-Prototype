---
type: feature
kind: optional
id: save-for-later
name: Save for Later
description: "People can stop part-way and come back to finish, without losing what they entered."
scope: [entity, use-case]
appliedIn: [requirements]
aliases: [saveForLater]
---

# Save for Later

People can stop part-way and come back to finish, without losing what they entered.

## Meaning

An unfinished record or use case is kept as the user's draft, invisible to others and outside the business rules until it is completed.

## Promises

Each is proven, on every object that applies this Feature, by a passing scenario tagged `@feature:save-for-later/<promise>`.

- `draft-kept` A saved draft is kept and resumed with what was entered.
- `draft-private` Others do not see a user's draft.
- `rules-on-completion` Business rules apply when the draft is completed, not before.
