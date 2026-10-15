---
type: concept-type
title: Questions
description: Open questions about the work, with the user's answers and the defaults assumed until they answer.
icon: ❓
---

# Questions

Questions record what is not yet known or decided and needs the user's input. They live in Work, in one file: `work/current/questions.md`. They are not Specs and are not scattered across notes or other files.

Specs record what is known. Questions record what is still open. Once a question is answered, the resulting knowledge moves to the owning Spec and the entry is marked resolved.

## Format

Group questions under topic headings. Each question has the question, an answer slot the user fills in, and the default the AI will assume if the user does not answer.

```markdown
## Leave management

**Q:** Which leave types are in scope?
**Answer:**
**Default:** Annual, sick, maternity, paternity, other.
```

- A question is **open** while its `**Answer:**` is blank.
- A question is **answered** once content follows `**Answer:**`.
- `**Default:**` states the assumption that will be used if the question stays open, so work can continue and the assumption stays visible.

How questions are asked, kept, and resolved is in the [Guided Strategy](../../strategy/guided.md#questions).
