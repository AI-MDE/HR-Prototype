---
type: feature
kind: build
id: web-ui-checks
title: Web UI checks across Features
origin: mde
impacts:
  - web-ui
---

# Web UI checks across Features

## Purpose

Checks of the Web UI Target that span several of its Features, so they belong to none of them alone.

## Audit

- Are empty, loading, error, success, and access-denied states represented, styling composed from the design system and the stack's UI profile, and important elements given stable selectors?
- Does each page link to the primary pages with real routing, does any rendered workflow match its stages, and does the shell show the acting user top right with sign out?
- Are the role switcher and guided workflows present when they apply and only behind the development flag? Do guided workflows follow the workflow's stages and route into the live pages?
