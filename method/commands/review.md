# Review

`mde review [scope]` (said to the agent)

Acts on the user's review: the feedback and corrections the user left in the Workbench, as [Reviews](../metamodel/work/review.md) (pages marked as needing change or clarification, with a note) and [Annotations](../metamodel/work/annotation.md) (requests attached to a document or a page element).

1. Read the open Reviews and Annotations in scope (`work/reviews/`, `work/notes/`).
2. Make the requested changes in the Specs or the App; answer a request for clarification in the Spec or in `work/current/questions.md`.
3. Record what could not be resolved as a [Finding](../metamodel/work/finding.md), and mark each annotation done with where the change went.

The agent never writes a Review or an Annotation: they are the user's. A formal review the work waits for happens only when the user sets one; see [Review](../strategy/guided.md#review) in the Guided Strategy.
