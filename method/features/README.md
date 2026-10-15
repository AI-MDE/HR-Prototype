# Method Features

A Feature brings together the required result, reusable design guidance, implementation obligations and acceptance checks for an engineering concern. This folder holds the **build Features** (`kind: build`): the rules every build follows wherever their Targets apply, and the source the [Targets](../targets/README.md) are compiled from. The **optional Features**, which apply only where a Spec chooses them, have their own catalog, [optional-features/](../optional-features/index.md), and are never compiled into Targets ([Feature](../metamodel/feature.md)).

## Compiled into Targets

A Feature's `impacts` lists the Targets it contributes to, by Target id (`api`, `web-ui`, `testing`, …), and it has one `## Impact on <target>` section for each. [`scripts/compile-targets.mjs`](../scripts/compile-targets.mjs) copies each *Impact on* section into its Target, the *Verify* Checks into each impacted Target's verification view (a ```` ```check target=<id> ```` block only into that Target's), and the *Audit* into the audit view of the first Target the Feature impacts (see [Targets](../targets/README.md#where-a-target-comes-from)). *Rationale* and *Detail* compile nowhere: they hold the reasoning and fuller guidance, with examples, behind what compiles. A Feature with no `impacts` compiles nowhere. Change a Feature, then recompile; the Method contract test fails while a Target is out of date.

When one Target's id begins another's (`api`, `api-design`), put a Feature's *Impact on api* section before its *Impact on api-design*: the compiler takes the first section whose heading begins with the id.

## Ownership and authority

The current Meta-model defines concept meaning and structure. Application Specs record selected requirements and realization decisions. Architecture and Technology constrain techniques. Strategy controls activities, gates, rigor and explicit waivers. Work holds unresolved questions, execution findings and evidence.

A Feature may recommend implementation techniques without declaring them selected or already supported. Catalog membership and static markers do not prove implementation. Guidance must not invent business policy or silently replace resolved project choices.

## Definition format

- Frontmatter: `type: feature`, `kind: build`, semantic name (`id`), title, origin, relevant output concerns in `impacts`, and existing default metadata.
- Purpose: the required result and why it matters.
- Applicability: when the concern is relevant and the decisions it depends on.
- Impact sections: requirements and guidance for each relevant concern; `impacts` must match these sections.
- Verify: the Checks `mde verify` proves by script or test run (a tool's row, a test suite, a log, a report the run produces), each a promise with an id its author writes first (``- `page-operations-tested` Is every page operation…``), stable when the list is edited. Its full id is `<feature>/<promise>`; a scenario that proves it is tagged `@feature:<feature>/<promise>`. Put a Check here only when a script or a test settles it without judgment.
- Audit: what a second agent, a fresh session that did not build the work, judges by reading the Specs and driving the running application: the questions no script settles, and, where useful, how to judge them and what witness to look for.
- Optional detail: rationale, examples, alternatives and review guidance where useful.

Examples of source paths, tools and report locations must be resolved through the initiative manifest, current Meta-model and selected Design. `default: n/a` is retained historical metadata, not an instruction to activate every Feature.

## Catalog boundaries

Folders support browsing and do not select execution scope. Product behavior, structural choices and engineering practices have different applicability. A Feature selected for a concern does not make every application entity or every layer applicable.

Object-attached concerns are optional Features, in [their own catalog](../optional-features/index.md): they do not belong to a Target, and a capability an application applies by choice (bookmarks, annotations) is never written here. A build Feature that turns out to apply only by choice moves there. The former Aspect catalog is retired; the Aspects' names are aliases only for `mde migrate-features`.

## Verify, audit, and review

Three words, three actors. **Verify** is what MDE does by script: `mde verify` runs the *Verify* Checks. **Audit** is what MDE asks a second agent to judge: the *Audit* concerns. **Review** is the user's: their decisions on the work. A *Verify* Check requires actual artifacts or execution; an *Audit* concern requires a verdict with a witness. Missing, stale or unsupported evidence cannot count as passed. Strategy determines gate decisions and waivers. An independent trigger and guarded acceptance/release action still require executable implementation.

The obsolete collector predicates have been removed from Feature definitions. Their source remains recoverable in Git and the migration source map. Future verifier implementation must be based on current concepts and explicit checks, not assumed from renamed fields.

See [index](index.md) for all definitions.
