---
type: feature
kind: build
id: ui-patterns
title: UI page patterns (bounded-first composition)
origin: mde
impacts:
  - ui-design
default: on
---

# UI page patterns (bounded-first composition)

## Purpose

Give the AI a small, preferred pattern sandbox before it invents a custom page. Patterns are
semantic page compositions, not substitutes for business analysis. The use case supplies purpose,
subject, context, business objects, rules, and outcome; the pattern supplies a proven page shape.

This feature is the semantic catalog behind project visual references in `specs/design/`.
Images such as `search-results`, `detail-page`, `split-master-detail`, `form-page`,
`approval-queue`, `status-stepper`, and `stat-cards` are examples beneath these semantics, not
independent sources of business behavior.

## Applicability

Applies to applicable Page and interaction Design. The current Page meta-model remains authoritative; optional composition techniques extend its Design rather than replace its schema.

The preferred page patterns themselves (their names and what each composes) are defined in the [page vocabulary](../../architecture/ui.md#page-patterns) of the UI architecture.

## External Standards

External standards are background references, not a declaration of compliance.

- **ISO/IEC 25010** — https://www.iso.org/obp/ui/en/
  - QUAL-04 (Interaction capability/usability)

## External standards boundary

MDE owns page purpose, pattern choice, canvas intent, panel sources, selection ownership, panel
relationships, panel actions, terminal scope, rules, and business effects. The selected UI profile
owns standard component behavior, layout mechanics, responsive rules, accessibility, states,
action hierarchy, and tokens.

Default references for the web profile:

- IBM Carbon patterns: https://carbondesignsystem.com/patterns/overview/
- IBM Carbon components: https://carbondesignsystem.com/components/overview/components/
- IBM Carbon themes: https://carbondesignsystem.com/elements/themes/overview/
- Material canonical layouts: https://m3.material.io/foundations/adaptive-design/canonical-layouts

## Impact on ui-design

Patterns are proven page shapes, not a substitute for business analysis: the use case supplies the purpose, subject, context, business objects, rules, and outcome; the pattern supplies the shape.

- Know the purpose, subject, primary transaction, entry context, and success outcome, from the use case, before choosing a pattern.
- Choose one preferred pattern as the foundation; compose no more than two unless the use case requires more.
- Adapt panels and placement without breaking the pattern's meaning.
- Use `Custom` only when no preferred pattern can satisfy the task, and note the unmet need and the reason on the page's line in the page set.
- A visual reference (a screenshot, an image in `specs/design/`) never overrides the page's business bindings or relationships.

MDE decides page purpose, pattern, canvas intent, panel sources, selection, relationships, actions, terminal scope, rules, and business effects. The selected UI profile (from the stack) decides standard component behavior, layout mechanics, responsive rules, accessibility, states, action hierarchy, and visual tokens.

## Audit

- Does every page select one preferred pattern (no more than two composed unless the use case requires more), or document why `Custom` is needed?

## Detail

The fuller guidance behind what the Targets compile from this Feature, with examples. It compiles into no Target.

### Impact on ui-design

Patterns are proven page shapes, not a substitute for business analysis: the use case supplies the purpose, subject, context, business objects, rules, and outcome; the pattern supplies the shape.

- Know the purpose, subject, primary transaction, entry context, and success outcome, from the use case, before choosing a pattern.
- Choose one preferred pattern as the foundation; compose no more than two unless the use case requires more.
- Adapt panels and placement without breaking the pattern's meaning.
- Use `Custom` only when no preferred pattern can satisfy the task, and note the unmet need and the reason on the page's line in the page set.
- A visual reference (a screenshot, an image in `specs/design/`) never overrides the page's business bindings or relationships.

Every Page Spec declares:

- `pagePattern.primary` and optional `pagePattern.composed`;
- any matching project visual references;
- the canvas, panels, semantic relationships, and panel-owned actions that realize the pattern;
- a reason when `pagePattern.primary: Custom` is used.

The Page Spec is authoritative. Pattern names are concise design decisions; composition and
interaction sections make those decisions concrete.

### Impact on web-ui

Generated pages realize the declared page pattern using the selected UI profile and technology
adapter. The implementation must preserve declared panel sources, selection, relationships,
action target, terminal scope, business results, and responsive priority. It must not imitate a visual
reference while dropping its business bindings.
