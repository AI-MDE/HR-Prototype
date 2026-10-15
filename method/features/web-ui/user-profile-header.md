---
type: feature
kind: build
id: user-profile-header
title: User profile in header (avatar, top-right)
origin: mde
impacts:
  - web-ui
default: on
---

# User profile in header (avatar, top-right)

## Purpose

Every page shows **who is acting** — a user-profile control at the **top-right** of the header,
with an **avatar** and the user's display-label (name). It gives the app a consistent identity
affordance and a home for the sign-out / switch-user action.

This is the **presentation** of the current identity ([user-identity](../../architecture/domain-and-access.md#identity-context) is the backend principal;
[role-switcher](../prototyping/role-switcher.md) is the dev control to change who is acting). Like those, it is a **dev/review
affordance, not authentication** — it shows the current user; it does not prove identity.

## Applicability

Applies to relevant pages and UI interactions. Respect the selected UI architecture/profile; presentation guidance is advisory unless explicitly adopted as a requirement.

## Impact on web-ui

- The shell shows who is acting: a user-profile control at the top right of the header on every page (in the shell, not per page), with an avatar (image, or initials as fallback) and the user's display label, and a menu with sign out and, where the role switcher applies, switch user. It shows the current identity; it is not authentication.

## Audit

- Does the shell show the acting user top right on every page, with sign out?
