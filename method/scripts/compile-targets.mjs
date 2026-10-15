#!/usr/bin/env node
// MDE — compile targets from features.
//
// Targets are NOT fully generated: each has an authored SKELETON (identity:
// id, title, applies_when, Purpose) carried over from the current authored
// target (one-time bootstrap), and a COMPOSED body — the contributing
// features' `Impact on <target>` and `Verify`, copied in with a
// [feature: <id>] ref so every section traces back to its source.
//
//   skeleton (authored)  +  feature sections (composed, with refs)  =  target
//
// Input : .mde/method/features/**/*.md   (impacts: + Impact on <t> + Verify + Audit)
//         .mde/method/targets/<t>.md          (skeleton source: id/title/applies_when/Purpose)
// Output: .mde/method/targets/<t>.md  (skeleton from targets.old/)
//
// Run:  node .mde/method/scripts/compile-targets.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const methodDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const capsDir = path.join(methodDir, 'features');
// Skeletons (id / title / applies_when / Purpose) are read from the authored
// originals in targets.old/ if present, else from the current targets/ (which
// already carry their skeleton). Compiled output is written to targets/.
const skeletonDir = fs.existsSync(path.join(methodDir, 'targets.old'))
  ? path.join(methodDir, 'targets.old')
  : path.join(methodDir, 'targets');
const outDir = path.join(methodDir, 'targets');

// Targets are DISCOVERED from the skeleton files, not hardcoded — drop a new
// authored skeleton in the skeleton dir (optionally inside a phase folder like
// requirements/ design/ app/) and it compiles automatically. A target is any
// <name>.md that isn't a non-target doc (README/catalog/index). The name is the
// basename; its relative subfolder is preserved so the compiled file is written
// back to the SAME location (flat or foldered).
const NON_TARGET = new Set(['README', 'catalog', 'index']);
// Compiled phase-view subdirs (targets/audit/*, and any future targets/<phase>/*) are
// OUTPUTS of this compile, not target skeletons — skip them, or an audit view named
// audit/api.md would shadow the real app/api.md in TARGET_REL (last-wins) and the target
// would compile from an empty skeleton.
const PHASE_VIEW = new Set(['audit', 'verification', 'generation', 'testing-view']);
function walkDirs(dir, base = dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (PHASE_VIEW.has(e.name)) continue; out.push(...walkDirs(p, base)); }
    else if (e.name.endsWith('.md') && !NON_TARGET.has(path.basename(e.name, '.md'))) {
      out.push({ name: path.basename(e.name, '.md'), rel: path.relative(base, p) });
    }
  }
  return out;
}
// Map target name -> its path relative to the targets dir (e.g. "web-ui" ->
// "app/web-ui.md"). Names are unique across folders.
const TARGET_REL = new Map(walkDirs(skeletonDir).map((t) => [t.name, t.rel]));
const TARGETS = [...TARGET_REL.keys()].sort();

// ---- helpers ---------------------------------------------------------------

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md') && e.name !== 'README.md' && e.name !== 'index.md') out.push(p);
  }
  return out;
}

// Parse a feature/target frontmatter block.
//
// Deliberately DEPENDENCY-FREE. This script runs inside every generated app, where neither
// js-yaml nor the meta-model's node_modules exist — importing a YAML library would break the
// compiler everywhere it actually runs. So the parser stays hand-rolled, but it must not
// silently MIS-parse: a reader that half-understands its input is worse than one that refuses
// it, because the damage is invisible. Two 0.9.12 defects were exactly that shape (a CRLF guard
// that returned {} so every field read as absent; a meta-model schema requiring a field the
// parser could never see).
//
// It therefore handles the flat shapes the method uses today — `key: value` and `- item` lists —
// and REPORTS anything it does not understand instead of dropping it. Nested structures (the
// `contributes:` → `<target>:` → `requires-outputs:` shape proposed in mde.specs/design/
// features.md) are not supported: they are detected and raised, not quietly flattened.
function parseFrontmatter(text, file) {
  // Normalize CRLF → LF so feature files authored on Windows parse correctly.
  // A CRLF file would otherwise fail this LF-only regex, yield empty frontmatter
  // (no impacts), and make the compiler emit empty targets — destroying profiles.
  text = text.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, body: text, warnings: [] };
  const fm = {};
  const warnings = [];
  let key = null;
  let keyIndent = 0;
  for (const raw of m[1].split('\n')) {
    if (!raw.trim() || /^\s*#/.test(raw)) continue;               // blank / comment
    const indent = raw.length - raw.trimStart().length;
    const kv = raw.match(/^(\s*)([A-Za-z_][\w-]*):\s*(.*)$/);
    if (kv) {
      const [, pad, k, v] = kv;
      if (pad.length > keyIndent && key !== null) {
        // An indented `key:` under another key is a NESTED MAP. The flat model cannot
        // represent it; flattening would silently attach it to the wrong owner.
        warnings.push(`nested key '${k}' under '${key}' — this parser is flat-only, value ignored`);
        continue;
      }
      key = k; keyIndent = pad.length;
      fm[k] = v.trim() ? v.trim() : [];
      continue;
    }
    const item = raw.match(/^\s*-\s*(.*)$/);
    if (item) {
      if (!key) { warnings.push(`list item '${item[1].trim()}' before any key`); continue; }
      if (!Array.isArray(fm[key])) {
        // `key: value` followed by `- item` — the scalar would be silently discarded.
        warnings.push(`key '${key}' has both a scalar value and list items — list ignored`);
        continue;
      }
      fm[key].push(item[1].trim());
      continue;
    }
    warnings.push(`unparseable line: ${raw.trim().slice(0, 60)}`);
  }
  if (warnings.length && file) {
    for (const w of warnings) console.warn(`  ! ${path.relative(methodDir, file).replace(/\\/g, '/')}: ${w}`);
  }
  return { fm, body: text.slice(m[0].length), warnings };
}

// Filter a `## Verify` section for one target. A ```check``` block may carry a
// `target=<id>` attribute in its header, meaning "compose me ONLY into that target's
// profile" — so a source-level check on a feature that also impacts a design target
// does not leak into the design target (and fire on a design-only plan). A block with
// NO `target=` goes to every target the feature impacts (backward-compatible). Prose
// between blocks is kept as-is; only mismatched fenced check blocks are dropped.
function checksForTarget(checksText, target) {
  if (!checksText || !/```check/.test(checksText)) return checksText;
  return checksText.replace(/```check([^\n]*)\n[\s\S]*?\n```/g, (block, header) => {
    const t = (header.match(/\btarget\s*=\s*([\w-]+)/) || [])[1];
    if (!t || t === target) return block;   // untagged → all targets; tagged → only its target
    return '';                               // tagged for a DIFFERENT target → drop here
  }).replace(/\n{3,}/g, '\n\n').trim();
}

// Return the text of a `## <heading>` section (until the next `## ` or EOF).
function section(body, headingRe) {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i]) && headingRe.test(lines[i])) { start = i; break; }
  }
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^## /.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start + 1, end).join('\n').trim();
}

// Feature text is copied into files in other folders (the Target, its verification and audit
// views); re-base its relative links so they still resolve from there.
function rebase(text, fromFile, toFile) {
  return text.replace(/\]\(([^)\s]+)\)/g, (m, link) => {
    if (/^(https?:|mailto:|#)/.test(link)) return m;
    const [t, anchor] = link.split('#');
    const rel = path.relative(path.dirname(toFile), path.resolve(path.dirname(fromFile), t)).split(path.sep).join('/');
    return `](${rel}${anchor ? `#${anchor}` : ''})`;
  });
}

// ---- read features ---------------------------------------------------------

const caps = [];
for (const file of walk(capsDir)) {
  const text = fs.readFileSync(file, 'utf8');
  const { fm, body } = parseFrontmatter(text, file);
  // Only build Features compile into Targets (metamodel/feature.md). An optional Feature belongs in
  // optional-features/, which compile-optional-features.mjs indexes and checks for leaks.
  if (fm.kind === 'optional') { console.warn(`! ${path.relative(methodDir, file)} is kind: optional; not compiled (move it to optional-features/)`); continue; }
  caps.push({
    id: fm.id || path.basename(file, '.md'),
    title: fm.title || fm.id,
    impacts: Array.isArray(fm.impacts) ? fm.impacts : [],
    body,
    file,
  });
}

// ---- stranded-rule warning -------------------------------------------------
// The compiler copies `## Impact on <target>`, `## Verify` and `## Audit`. Anything ABOVE the first such
// heading — a Purpose that quietly carries a decision rule — reaches no target and therefore no
// agent. That is invisible: the rule is in the feature, readable by a human, unreachable by the
// phase that must apply it.
//
// This shipped for real. authentication.md's mechanism procedure ("a silent axis means `none`";
// "when auth is in scope but mechanism is omitted, use local-db") lived in ## Purpose, compiled
// nowhere, and a backend generation stopped to ask the user which auth provider to use — a
// choice the method had already made, twice.
//
// Heuristic, so it warns rather than fails: prose legitimately summarises a rule in Purpose, and
// only a reader can tell a summary from the sole statement of it. A warning that fires on a
// summary costs one glance; a rule that reaches nobody costs a wrong build.
const NORMATIVE = /(\bis the default\b|\bdefault is\b|\bmust not\b|\bmust be\b|\bdo not generate\b|\bnever generate\b|\bis omitted\b|\bopt-in\b|\bfails? closed\b)/i;
const stranded = [];
for (const c of caps) {
  const firstCompiled = c.body.search(/^## (Impact on |Verify\r?$|Audit\r?$|Template impact)/m);
  if (firstCompiled < 0) continue;
  const preamble = c.body.slice(0, firstCompiled);
  const lines = preamble.split('\n')
    .filter((l) => NORMATIVE.test(l) && !l.trim().startsWith('#') && l.trim().length > 40);
  if (lines.length) stranded.push({ id: c.id, n: lines.length, sample: lines[0].trim().slice(0, 74) });
}
if (stranded.length) {
  console.warn(`\n  ! ${stranded.length} feature(s) carry normative text ABOVE their first compiled section —`);
  console.warn('    it reaches no target and no agent. Move the rule into ## Impact on <target>,');
  console.warn('    or leave it if the impact section already states it (this is a heuristic):');
  for (const s of stranded.sort((a, b) => b.n - a.n)) {
    console.warn(`      ${String(s.n).padStart(2)}  ${s.id.padEnd(34)} ${s.sample}`);
  }
  console.warn('');
}

// ---- read target skeletons (from current authored targets) -----------------

function skeleton(target) {
  const rel = TARGET_REL.get(target) || `${target}.md`;
  const file = path.join(skeletonDir, rel);
  if (!fs.existsSync(file)) return { id: `TARGET-${target.toUpperCase()}`, title: target, appliesWhen: [], purpose: '' };
  const text = fs.readFileSync(file, 'utf8');
  const { fm, body } = parseFrontmatter(text, file);
  return {
    id: fm.id || `TARGET-${target.toUpperCase()}`,
    title: fm.title || target,
    appliesWhen: Array.isArray(fm.applies_when) ? fm.applies_when : [],
    // requires: dependency edges — the targets this one drags in (verification #1).
    requires: Array.isArray(fm.requires) ? fm.requires : [],
    // inputs: preconditions — what must exist before this target can be worked on
    // (goal-runner walk-back). Each entry is a string; a `kind:` prefix
    // (`tech-stack` / `derived: …` / `user: …`) is a text convention, not parsed here.
    inputs: Array.isArray(fm.inputs) ? fm.inputs : [],
    // stage and needs: when the Target is due (the Strategy stage it belongs to) and the conditions
    // of the application it needs (ui, database, backend, integration, deployment), read by tools
    // where applies_when is read by agents (metamodel/work/strategy.md).
    stage: typeof fm.stage === 'string' ? fm.stage : null,
    needs: Array.isArray(fm.needs) ? fm.needs : [],
    purpose: section(body, /Purpose/i) || '',
    // Outputs: the AUTHORITATIVE list of artifacts this target mandates (a table).
    // Authored on the target, carried through compile (like Purpose). The verifier
    // reads this to check the plan's manifest produced each mandated output.
    outputs: section(body, /Outputs/i) || '',
    // Baseline: what this target always requires where it applies, authored on the target (the
    // testing baseline lives here, not in a Strategy: metamodel/work/strategy.md).
    baseline: section(body, /^## Baseline$/) || '',
    // Evidence: the rows of the Evidence Package this Target owns (id, title, what it proves, the
    // condition it needs), authored on the target; tools take a row's title and meaning from here.
    evidence: section(body, /^## Evidence$/) || '',
  };
}

// The Checks of one feature's `## Verify` for one target, as claims the Evidence reports one by
// one: id `<feature>.<n>` (1-based, in order), the text, the conditions of the application it
// needs (a leading "With a database:" / "With a user interface:" / "With a backend:" / "With
// integrations:"), and the `mde verify` rows it names ("(`mde verify`, Schema row …)"), which
// measure it. A fenced ```check``` block is one claim.
const CHECK_NEEDS = [[/^with a database\b/i, 'database'], [/^with a (user interface|ui)\b/i, 'ui'], [/^with a backend\b/i, 'backend'], [/^with integrations?\b/i, 'integration'], [/^with a deployment\b/i, 'deployment']];
function parseChecks(verifyText, feature) {
  if (!verifyText) return [];
  const claims = [];
  let cur = null, fence = false;
  for (const line of verifyText.replace(/\r\n/g, '\n').split('\n')) {
    if (/^```/.test(line)) {
      if (!fence && /^```check/.test(line)) { cur = { text: '' }; claims.push(cur); }
      fence = !fence;
      continue;
    }
    if (fence) { if (cur && !cur.text && line.trim()) cur.text = line.trim(); continue; }
    if (/^- /.test(line)) { cur = { text: line.slice(2).trim(), bullet: true }; claims.push(cur); continue; }
    if (cur && /^\s+\S/.test(line)) cur.text += ` ${line.trim()}`;
    else if (!line.trim()) cur = null;
  }
  return claims.map((c, i) => {
    // An authored id ("- `stale-rejected` Is …") makes the Check `<feature>/<promise>`; without one it
    // falls back to its position. The position stays as an alias, for `@check:<feature>.<n>` tags.
    const authored = c.text.match(/^`([a-z0-9][a-z0-9-]*)`\s+/);
    const text = c.text.replace(/^`[a-z0-9][a-z0-9-]*`\s+/, '').replace(/\s+/g, ' ').trim();
    const needs = CHECK_NEEDS.filter(([re]) => re.test(text)).map(([, n]) => n);
    const measures = [...text.matchAll(/`mde verify`,\s*([A-Z][A-Za-z ]*?)(?=\s+row\b|:|\)|,)/g)].map((m) => m[1].trim());
    const positional = `${feature}.${i + 1}`;
    return { id: authored ? `${feature}/${authored[1]}` : positional, alias: authored ? positional : null, feature, text, needs, measures, bullet: Boolean(c.bullet) };
  });
}

// Parse a target's `## Evidence` table (Row | Title | Proves | Needs) into { id, title, proves, needs },
// by header name. Needs is a condition of the application (database, ui…), or per-suite /
// per-target for a row repeated for each suite or audited Target; "—" for none.
function parseEvidence(md) {
  if (!md) return [];
  const rows = [];
  let cols = null;
  for (const line of md.replace(/\r\n/g, '\n').split('\n')) {
    const s = line.trim();
    if (!s.startsWith('|')) continue;
    const cells = s.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
    if (!cols) { cols = cells.map((c) => c.toLowerCase()); continue; }
    if (/^-+$/.test(cells[0])) continue;
    const at = (name) => { const i = cols.indexOf(name); return i === -1 ? '' : (cells[i] || ''); };
    const id = at('row');
    if (!id) continue;
    const needs = at('needs');
    rows.push({ id, title: at('title'), proves: at('proves'), needs: !needs || needs === '—' || needs === '-' ? null : needs });
  }
  return rows;
}

// Parse a target's `## Outputs` markdown table (columns: output | path | perEach | when)
// into structured rows for the catalogue — so catalogue.json is the single source for
// "which target mandates which output type", not just an unparsed prose blob. Skips the
// header + separator rows; tolerant of extra whitespace and a leading/trailing pipe.
// Read the table BY HEADER NAME, not by column position. Positional destructuring
// (`[output, p, perEach, when]`) silently mis-reads the moment a column is inserted — adding
// `resolves` as column 2 would have made every path read as a role name, with no error
// anywhere. Column order is an authoring convenience; the header is the contract.
function parseOutputs(outputsMd) {
  if (!outputsMd) return [];
  const rows = [];
  let cols = null;
  for (const line of outputsMd.replace(/\r\n/g, '\n').split('\n')) {
    const s = line.trim();
    if (!s.startsWith('|')) continue;
    const cells = s.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    if (cells.length < 2) continue;
    if (!cols) {                                    // first row of the table is its header
      if (/^output$/i.test(cells[0])) { cols = cells.map((c) => c.toLowerCase()); continue; }
      cols = ['output', 'path', 'pereach', 'when'];  // header-less legacy table
    }
    if (/^-+$/.test(cells[0])) continue;             // separator
    const at = (name) => { const i = cols.indexOf(name); return i === -1 ? '' : (cells[i] || ''); };
    const output = at('output');
    if (!output || /^output$/i.test(output)) continue;
    const perEach = at('pereach');
    rows.push({
      output,
      // `resolves` — the abstract output role this concrete artifact satisfies. Additive and
      // advisory today (see mde.specs/design/features.md): it makes the feature→output join
      // visible and reviewable before anything enforces it.
      resolves: at('resolves').replace(/^_\(|\)_$/g, '') || null,
      path: at('path'),
      perEach: perEach === '—' || perEach === '-' ? null : perEach,
      when: at('when') || 'always',
    });
  }
  return rows;
}

// ---- compile each target ---------------------------------------------------

fs.mkdirSync(outDir, { recursive: true });
const summary = [];
// The target catalogue — every target's real id + its requires: edges, written once
// here (the single place targets are discovered/compiled) so the verifier never
// re-discovers targets by walking targets/**/*.md itself; it reads this JSON.
const catalogue = [];

for (const target of TARGETS) {
  const sk = skeleton(target);
  const contributors = caps
    .filter((c) => c.impacts.includes(target))
    .sort((a, b) => a.id.localeCompare(b.id));

  const impactRe = new RegExp(`Impact on ${target}\\b`, 'i');
  const behaviorBlocks = [];
  const checkBlocks = [];
  const claims = [];

  // A feature's `## Rationale` is EXPLANATORY REFERENCE: why the method requires the rule, what
  // goes wrong without it, what a bad case looks like. It compiles NOWHERE — not to the app
  // view, not to verification, not to a view of its own. Its consumers (a method designer, a
  // reviewer, a repair agent resolving an ambiguous check) are already working in a feature when
  // they need it, and the compiled views tag every block with `[feature: <id>]`, so the feature
  // file is both the home and the address. Aggregating it per target would rebuild the very
  // problem the phase partition exists to solve: a file nobody wants whole.
  const outFileFor = path.join(outDir, TARGET_REL.get(target) || `${target}.md`);
  const verificationFileFor = path.join(outDir, 'verification', `${target}.md`);
  for (const c of contributors) {
    const impact = section(c.body, impactRe) && rebase(section(c.body, impactRe), c.file, outFileFor);
    if (impact) behaviorBlocks.push(`### ${c.title}  \`[feature: ${c.id}]\`\n\n${impact}`);
    const verify = checksForTarget(section(c.body, /^## Verify$/), target);
    const checks = verify && rebase(verify, c.file, verificationFileFor);
    if (checks) {
      const parsed = parseChecks(checks, c.id);
      claims.push(...parsed);
      // Each Check carries its id, for the Evidence to report it and a scenario to prove it (@check:<id>).
      const bullets = parsed.filter((p) => p.bullet);
      let n = 0, inFence = false;
      const tagged = checks.split('\n').map((l) => {
        if (/^```/.test(l)) inFence = !inFence;
        return !inFence && /^- /.test(l) && bullets[n] ? `- \`${bullets[n++].id}\` ${l.slice(2).replace(/^`[a-z0-9][a-z0-9-]*`\s+/, '')}` : l;
      }).join('\n');
      checkBlocks.push(`### ${c.title}  \`[feature: ${c.id}]\`\n\n${tagged}`);
    }
  }

  const fmList = (arr) => arr.map((x) => `  - ${x}`).join('\n');
  const out = `---
type: target
${sk.id ? `id: ${sk.id}\n` : ''}title: ${sk.title}
applies_when:
${fmList(sk.appliesWhen)}${sk.requires && sk.requires.length ? `\nrequires:\n${fmList(sk.requires)}` : ''}${sk.inputs && sk.inputs.length ? `\ninputs:\n${fmList(sk.inputs)}` : ''}${sk.stage ? `\nstage: ${sk.stage}` : ''}${sk.needs && sk.needs.length ? `\nneeds:\n${fmList(sk.needs)}` : ''}
---

# ${sk.title}

<!-- COMPILED by compile-targets.mjs from features. Skeleton (Purpose +
     applies_when) is authored; the sections below are composed from the
     contributing features, each tagged [feature: <id>]. Do not hand-edit
     the composed sections — edit the feature and recompile. -->

## Purpose

${sk.purpose || '_(authored skeleton purpose — fill in)_'}
${sk.outputs ? `\n## Outputs\n\n${sk.outputs}\n` : ''}${sk.evidence ? `\n## Evidence\n\n${sk.evidence}\n` : ''}${sk.baseline ? `\n## Baseline\n\n${sk.baseline}\n` : ''}
## Composed behavior

${behaviorBlocks.join('\n\n') || '_(no feature impacts this target)_'}

## Verify and Audit

${checkBlocks.length ? `The Checks \`mde verify\` proves for this target compile to \`targets/verification/${target}.md\`` : 'No Feature gives this target a Check `mde verify` proves'}; what a second agent judges compiles to \`targets/audit/\`, under each Feature's first Target.
`;

  // ── PHASE PARTITION ───────────────────────────────────────────────────────
  // A compiled target has three parts serving three phases:
  //   Outputs           (~3k tokens across app targets)  — manifest planning; also in catalogue.json
  //   Composed behavior (~35k)                           — generation only
  //   Validation checks (~58k)                           — verification only
  //   (audit blocks compile separately, below, to targets/audit/<target>.md)
  //
  // These are PARTITIONED, not duplicated: each block is written to exactly one file. An earlier
  // version wrote verification/<t>.md as an ADDITIONAL copy while leaving the checks in the app
  // view too, which made app/api.md 40,652 bytes and verification/api.md 29,712 — 1.7x the
  // content across two files. A generation phase loading the app view still paid for every check
  // it would never act on, so the narrow view bought nothing on the path that needed it most.
  //
  // The invariant that keeps this honest: behavior bytes + check bytes should equal what the
  // single file used to hold, not exceed it. The app view keeps a pointer (above) so a reader
  // who lands there knows where the checks went — a pointer is ~90 bytes, a copy is ~29,000.
  if (checkBlocks.length) {
    const vDir = path.join(outDir, 'verification');
    fs.mkdirSync(vDir, { recursive: true });
    fs.writeFileSync(path.join(vDir, `${target}.md`), `---
type: verification-view
title: Verification — ${target}
---

# Verification — ${target} — COMPILED from features' \`## Verify\`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Verify and
     recompile. These are the Checks \`mde verify\` proves by script or test run; what needs
     judgment is in targets/audit/. This is the VERIFICATION PART of the ${target} target: these check blocks live
     HERE and nowhere else. targets/${TARGET_REL.get(target) || `${target}.md`} holds the
     generation behavior; targets/audit/${target}.md holds the audit concerns. -->

${checkBlocks.join('\n\n')}
`);
  }


  const outRel = TARGET_REL.get(target) || `${target}.md`;
  const outFile = path.join(outDir, outRel);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, out);
  summary.push(`  ${target.padEnd(22)} ${contributors.length} features`);
  catalogue.push({
    id: sk.id.replace(/^TARGET-/i, '').toLowerCase(),
    // appliesWhen: the ONLY thing needed to decide whether a target is relevant. Matching it
    // by opening each target file costs ~92k tokens for the six an app plan considers, because
    // a compiled target carries every contributing feature's full prose — testing.md alone is
    // 110KB. The condition itself is ~200 bytes of frontmatter. Publishing it here lets
    // `start` (and anything else doing relevance analysis) match against a 16KB catalogue
    // instead of 366KB of target bodies it does not need until it actually builds.
    appliesWhen: sk.appliesWhen || [],
    title: sk.title,
    requires: sk.requires || [],
    stage: sk.stage || null,
    needs: sk.needs || [],
    inputs: sk.inputs || [],
    // outputs: the artifact types this target mandates (parsed from its ## Outputs
    // table) — so the catalogue answers "which target produces which output type"
    // without re-parsing every target file.
    outputs: parseOutputs(sk.outputs),
    // evidence: the Evidence Package's rows this target owns (parsed from its ## Evidence table):
    // { id, title, proves, needs }. `mde verify` and the Workbench take each row's words from here.
    evidence: parseEvidence(sk.evidence),
    // checks: the target's Verify Checks as claims (id, feature, text, needs, measures), each
    // reported on its own in the Evidence Package (metamodel/evidence/evidence-package.md).
    checks: claims.map(({ bullet, ...c }) => c),
    path: outRel.replace(/\\/g, '/'),
  });
}

const catalogueFile = path.join(outDir, 'catalogue.json');
fs.writeFileSync(catalogueFile, JSON.stringify(catalogue.sort((a, b) => a.id.localeCompare(b.id)), null, 2) + '\n');

// ---- audit views (per target, phase-isolated) ------------------------------
// §4.2/4.3: each phase compiles into its OWN view so a phase-session receives only its
// instructions (the generator never sees ## Verification; the auditor never sees
// ## Generation). Audit compiles to targets/audit/<target>.md — filed BY TARGET, but
// the audit SESSION reads them all as one flat, app-wide reference: it runs with no
// plan / no targets / no manifest, judging the finished RUNNING app against a witness
// the author does not control (the app's own log). So each `## Audit` must be
// reference-free — what to observe in the running app, never a plan/target artifact.
const auditDir = path.join(outDir, 'audit');
// A feature's `## Audit` files under ONE target — its PRIMARY (first real target in
// `impacts:`), not every impacted target. Fanning it out duplicated a server-endpoint
// audit into api + architecture + server, mislabeling e.g. architecture.md as "really the
// server". One audit block, one home = the feature's first impacted target.
const isRealTarget = new Set(TARGETS);
const primaryTargetOf = (c) => (c.impacts || []).find((t) => isRealTarget.has(t));
let auditTargets = 0;
for (const target of TARGETS) {
  const blocks = caps
    .filter((c) => primaryTargetOf(c) === target)
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((c) => ({ id: c.id, title: c.title, audit: section(c.body, /^## Audit$/) && rebase(section(c.body, /^## Audit$/), c.file, path.join(auditDir, `${target}.md`)) }))
    .filter((c) => c.audit)
    .map((c) => `### ${c.title}  \`[feature: ${c.id}]\`\n\n${c.audit}`);
  if (!blocks.length) continue;
  fs.mkdirSync(auditDir, { recursive: true });
  const view = `---
type: audit-view
title: Audit — ${target}
---

# Audit — ${target} — COMPILED from features' \`## Audit\`

<!-- COMPILED by compile-targets.mjs. Do not hand-edit — edit each feature's ## Audit
     section and recompile. Each ## Audit speaks in GENERAL terms (what quality looks like
     for this concern). SCOPE is applied by the CALLER at run time, not authored here: an
     audit run for a plan adds "perform these checks for this plan's scope only"; an
     app-wide run adds none. The auditor is a FRESH session — it did not build this. -->

You did not build this. Do not trust that an artifact or control *exists* — judge whether
it *behaves*, by driving the real running app (or reading the specs, for BA/design targets)
and corroborating against a witness the author does not control (the app's own request/write
log, a read-back after a mutation, the spec's own content).

## How to report — every finding must be actionable

Do not write a vague narrative. For **each concern** you audit, produce one row:

| field | what it must contain |
|---|---|
| **concern** | the specific artifact/control/operation judged (name it: \`client.create\`, "Employee Directory save button", "review-period-constraint") — never "the API" or "the UI" in general |
| **verdict** | **genuine** · **fake** · **not-exercised** (you could not drive it — say why). For a Spec: genuine when it meets the concern, fake when it only appears to |
| **witness** | the concrete evidence you observed: a server-log line, a read-back result after a mutation, the missing route/operation, the placeholder text quoted. A verdict with no witness is not a finding |
| **severity** | **high** (core substance is fake — a mutating action that never persists, a rule not enforced) · **medium** · **low** |
| **fix** | the concrete next action to make it genuine (name the file + what to change) — so the finding is directly actionable in a repair plan |

End with a **summary**: counts (**N genuine · M fake · K not-exercised**), and the **fakes ranked
most-severe first** with their fix. A \`fake\` on an in-scope artifact is a real defect — state it
plainly; do not soften it to "could be improved". "It exists / it responded 200 / the section is
filled" is never a genuine verdict on its own.

${blocks.join('\n\n')}
`;
  fs.writeFileSync(path.join(auditDir, `${target}.md`), view);
  auditTargets++;
}
if (auditTargets) summary.push(`  ${'audit/*'.padEnd(22)} ${auditTargets} target view(s)`);

// Optional Features are not compiled here: compile-optional-features.mjs indexes them (below).

console.log('compiled targets/ from features:');
console.log(summary.join('\n'));
console.log(`\n-> ${outDir}`);
console.log(`-> ${catalogueFile} (${catalogue.length} targets)`);

// The optional Feature catalog: indexed, never compiled into Targets, and checked for leaks.
if (fs.existsSync(path.join(methodDir, 'optional-features'))) await import('./compile-optional-features.mjs');

// The Features report in MDE's own docs (docs/features-report.md), generated from the Features.
await import('./features-report.mjs');
