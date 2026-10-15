# Carbon UI profile

The UI profile for stacks that select IBM Carbon (`ui: carbon`, for example [nest-carbon](nest-carbon.yaml)). The [ui-design](../targets/design/ui-design.md) and [web-ui](../targets/app/web-ui.md) Targets defer to the selected profile for standard component behavior, layout mechanics, responsive rules, accessibility, states, action hierarchy, and visual tokens; MDE keeps the page's meaning (purpose, pattern, panels, actions, rules).

- Translate the page design into supported Carbon patterns without changing its business meaning; record any deliberate departure.
- Use the adopted Carbon packages, tokens, and accessible components consistently, reusing application wrappers where they help. Never introduce Carbon into an application whose stack selected another profile.
- References: [patterns](https://carbondesignsystem.com/patterns/overview/), [components](https://carbondesignsystem.com/components/overview/components/), [themes](https://carbondesignsystem.com/elements/themes/overview/). For canonical layouts, [Material canonical layouts](https://m3.material.io/foundations/adaptive-design/canonical-layouts) are a useful companion.

Checks: Carbon is selected by the stack; the UI uses supported, accessible Carbon components and patterns; departures are intentional and consistent.
