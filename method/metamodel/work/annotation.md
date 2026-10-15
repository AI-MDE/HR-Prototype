---
type: concept-type
title: Annotation
description: A note the user attaches to a document or a page element in the Workbench, for the agent to act on.
icon: 📌
---

# Annotation

A note the user attaches in the Workbench: to a document, a section of it, or an element of the running application's page. Annotations are how the user asks for a change in context. How the agent responds to one is in the [Guided Strategy](../../strategy/guided.md#review).

## Location

`work/notes/annotations.jsonl` (notes on documents) and `work/notes/page-annotations.jsonl` (notes on page elements), one JSON object per line, written by the Workbench.

## Structure

Each entry:

- **id** — a stable id.
- **pagePath** — the document or page it is attached to.
- **target** — what it points at: a selector and the text or element it matched.
- **note** — the user's request or remark.
- **screenshot** — an optional image of the target.
- **done** and **destination** — whether it was handled, and where the change went.
- **createdAt** — when it was made.
