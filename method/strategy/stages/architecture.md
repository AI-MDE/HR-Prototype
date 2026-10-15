# Architecture

The project's Goal, its application Architecture, its Technology Stack, and the Targets in scope. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [architecture](../../targets/design/architecture.md).

## Starting a project

A Goal exists before work begins (`work/goal.md`). The Strategy, the Architecture, and the Technology Stack are chosen from the Method's Strategies ([Prototype](../prototype.md), [Guided](../guided.md), [Controlled](../controlled.md)), [architecture](../../architecture/README.md), and [stacks](../../stacks/README.md), or described by the user.

## Resolve the choices into Specs

Once the Architecture and Technology Stack are chosen, resolve the preset guidance and the concrete technology choices into project Specs as described in the [architecture Target](../../features/architecture/resolve-selections-into-specs.md). A preset name alone is not a resolved specification. Use the resolved Specs during ordinary work; revisit them only for a missing decision or a requested change, and do not ask again for a choice the user already confirmed.

Record the **Targets in scope** with them in `specs/architecture/`: the kinds of output this application produces (for example requirements, design, API, persistence, web UI, testing, documentation, deployment). The chosen stack lists them (`targets:` in its preset); drop what does not apply (no web UI for a service with no interface). Each stage chooses from this list ([how a stage runs](../guided.md#how-a-stage-runs)).

**Then bring the Goal in step.** The Goal was written before the architecture existed; `work/targets.json` is empty. Propose the Goal's Targets: those of the overview's `targets` that the Strategy's logic keeps, for the Goal's scope ([Strategy](../../metamodel/work/strategy.md#which-targets-how-rigorously)), and record them once the user agrees: in [`work/targets.json`](../../metamodel/work/targets.md) (each Target taken, `{ "*": {} }` until its work starts; each left out, `leftOut` on `*` with the reason) and in `work/goal.md`'s *Targets* section, in words. Do the same whenever the architecture changes later: another stack, or a Target added to or removed from the overview ([Goal](../../metamodel/work/goal.md#keeping-the-goal-in-step)).

## Control

Do not silently choose or replace a framework, language, database, UI framework, runtime, deployment platform, or other consequential technology. Building follows the resolved choices.

Architecture and stack may start unresolved, and the agent may pick a reasonable default and say so. The first time a choice becomes costly to change later (a persistence technology, a public API shape, a framework the rest depends on), make it explicit and record it in Specs before continuing. This is the one place in Guided where deciding as you go stops.

**Controlled:** before setup or building, the user explicitly selects or confirms the Goal, the Strategy, the Architecture, and the Technology Stack, and they are recorded in Specs. A proposed default is not a decision until the user confirms it.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
