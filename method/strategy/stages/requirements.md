# Requirements

What the application means, needs, allows, constrains, and expects, captured in Specs as the [Requirements](../../metamodel/requirements/README.md) concepts define. A stage of the [Guided](../guided.md) and [Controlled](../controlled.md) Strategies.

**Targets:** [business requirements](../../targets/requirements/business-requirements.md).

## Progressive elaboration

Requirements work starts at the highest useful abstraction level and moves downward as the Goal needs more precision:

```text
Conceptual → Structural → Behavioral → Detailed → Implementation
```

Establish the overall business/application shape before pursuing lower-level detail. Early work should focus on major concepts, relationships, actors, goals, and use cases. Do not interrupt conceptualization with detailed business rules, exceptions, validations, permissions, field-level choices, or implementation questions merely because those details will eventually be needed.

Ask a lower-level question when its answer is necessary to advance the current work or when material business policy cannot safely be inferred. Otherwise, state a reasonable provisional assumption or defer the detail until the work reaches that level.

This principle applies to every Strategy (the [Prototyping Strategy](../prototype.md#working-light) states it for its own work). The Strategy controls how far the Requirements must be elaborated, not whether the work begins conceptually.

## Control

Requirements are ready for dependent design or building when the relevant ones are in Specs, the material open questions are in `work/current/questions.md`, and the user has accepted them for the intended scope by moving on. They may keep evolving afterwards.

Requirements may live in conversation at first and evolve informally. Capture them in Specs once they settle, or before code relies on them, whichever comes first. Do not hold up exploratory work to write Specs.

**Controlled:** design and building for a scope wait until its requirements are captured and the user has accepted them. Controlled may require deeper elaboration, but it still proceeds from conceptual understanding toward detail rather than beginning with low-level interrogation.

When Requirements are sufficiently defined for the current Goal, the user may choose to visualize them (their entities, sample data, and use cases, as the [Prototype](../prototype.md) Strategy shows them) before proceeding. Visualization is a capability, not a universal gate.

**Say only what exists.** At the end of this stage, point the user to what they can review now: the Specs, their diagrams, the workflows. Entities have no live data until sample data is written (the Prototype's data step, or the application's seed); never offer live data that does not exist. If the user wants to see the entities with data, offer to write the sample data first.

## Verify in the loop

As each Target of this stage is produced or changed, verify it yourself in the loop: `mde verify --current`, fix what it reports, and verify again until it passes ([How a stage runs](../guided.md#how-a-stage-runs)). Run it yourself, as part of the stage; never ask the user to. Report the stage only when its Targets pass, or with the Finding a repeated failure left.
