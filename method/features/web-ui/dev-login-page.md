---
type: feature
kind: build
id: dev-login-page
title: Login page (login UI)
origin: mde
impacts:
  - web-ui
default: on
---

# Login page (login UI)

## Purpose

A **Login page** is the app's front door — the `/login` entry point and the route guard that
sends un-logged-in traffic there. It is the **UI** of authentication; the **mechanism and modes**
are owned by [authentication](../../architecture/domain-and-access.md#authentication). The page adapts to the mode **the server reports** — it never
decides the mode from its own build flags:

| server-reported mode | front door | what the guard checks |
|---|---|---|
| **no-auth** (`mechanism: none`) | seeded-person picker | is an acting user selected? (UX gate) |
| **bypassed** (real mechanism, dev flag on) | seeded-person picker + visible bypass indicator | server-validated session |
| **real** (real mechanism, no flag) | username + password form | server-validated session |

The first two look identical to the developer and are structurally different underneath: in
**no-auth** there is no session at all, while in **bypassed** the server issues a real session and
only credential verification is skipped ([authentication](../../architecture/domain-and-access.md#authentication)). Do not collapse them — a bypassed app
that sets browser-only identity state is a defect there, not a shortcut here.

**Turning auth on must be additive.** The picker, the seeded people, and the route guard survive the
transition; what changes is where identity comes from (a server session instead of client state) and
that a real form appears when the bypass is off.

It is the entry-point companion to [user-profile-header](user-profile-header.md) (shows the current user) and
[role-switcher](../prototyping/role-switcher.md) (changes them in-app). This feature governs the **login screen + guard**; it
does not define the verification/session mechanism — that is [authentication](../../architecture/domain-and-access.md#authentication).

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## External Standards

External standards are background references, not a declaration of compliance.

- **OWASP ASVS** — https://owasp.org/www-project-application-security-verification-standard/
  - SEC-ASVS-02 (Authentication)

## Impact on web-ui

When the application has roles or users, it has a `/login` page and one shared route guard, generated (never a shipped authentication library). Both follow the mode the server reports, never the page's own build flags:

| Server-reported mode | Front door | The guard checks |
|---|---|---|
| **no-auth** (no mechanism) | a picker of the seeded people | that an acting user is selected (a UX gate) |
| **bypassed** (real mechanism, development flag on) | the same picker, with a persistent visible bypass indicator | a server-validated session |
| **real** | a username and password form | a server-validated session |

- The picker lists the seeded people (from the roles and seed data) by display label and role. In no-auth it sets client identity state; in bypassed mode the selection is sent to the server, which issues a real session. Never collapse the two: a bypassed application setting browser-only identity is a defect.
- In real mode, a failed attempt shows the server's generic failure and sets no identity, and the picker is absent from the production bundle.
- Any route other than `/login` redirects there without an acting identity, then continues to the requested page. Once a real mechanism is on, a `401` from any call returns to `/login`, and sign out invalidates the session on the server before clearing client state.
- Turning authentication on is additive: the picker, the seeded people, and the guard survive; only where identity comes from changes.
- Tests log in through the page (or a documented shortcut establishing the same identity), using stable selectors for the chooser, the fields, and submit.

## Audit

- With roles or users: is there a `/login` page and one shared guard following the server-reported mode, with a server-validated session once a mechanism is on, a visible bypass indicator, no picker in a real production bundle, and server-side sign out?

Judge whether the selected identity is **actually propagated to the API** and **exercises
role-scoped behaviour** — not just displayed in the shell. The common gap: login stores a local
selected user used only for greeting/routing, while API calls never send that identity, so
role-scoped access is never truly tested.

Drive the running app: log in (pick a user, or enter a credential — whichever the mode presents),
then perform an action and inspect the request the app sends — does it carry the identity (session
cookie / header / token), and does the server log show the request attributed to that principal?
Then log in as a **different-role** user and confirm the app **behaves differently** where roles
matter (an action allowed for one role is blocked for another). If every role can do everything, or
the identity never leaves the browser, role scoping is not exercised.

When a **real mechanism** is on, also judge the guard's substance rather than its appearance: clear
the client state (or call the API directly with no session) and confirm protected routes and
endpoints actually refuse — a guard that only hides UI while the API answers anonymously is
**fake**. After sign-out, replay a prior authenticated request and confirm the server rejects it;
a session that still works after logout means logout is client-only.

Report identity as **propagated** (requests carry it, server attributes them, roles change
behaviour) or **cosmetic** (selected user only shown, API calls anonymous / role-agnostic). When
auth is real, report the guard as **enforced** (server refuses without a valid session) or
**decorative** (UI-only).
