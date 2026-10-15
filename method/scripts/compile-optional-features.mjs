#!/usr/bin/env node
// Compile the optional Feature catalog (metamodel/feature.md).
//
// Input:  method/optional-features/<area>/<id>.md   one optional Feature each: front matter (id, name,
//         description, scope, appliedIn, aliases) and its sections (Meaning, Parameters,
//         Realizations, Constraints, Promises, Guidance, Audit).
// Output: method/optional-features/catalog.json    the index an agent reads to choose: each Feature's
//         id, name, description, scope, appliedIn, aliases, meaning, parameters, realizations, promises (id, text)
//         and its file; plus `aliases` (old Aspect and Design Term names -> canonical id).
//         method/optional-features/index.md         the same, as a page.
//
// Optional Features are NOT compiled into Targets: they apply only where a Spec applies them, and
// an agent reads a Feature's file only then. This script also checks that nothing leaks: no build
// Feature (method/features/) declares `kind: optional`, and no compiled Target names an optional
// Feature's block.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const methodDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.join(methodDir, 'optional-features');
const SCOPES = new Set(['application', 'entity', 'attribute', 'relation', 'operation', 'use-case', 'page']);
const APPLIED_IN = new Set(['requirements', 'design']);

const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.md') && !/^(README|index)\.md$/.test(e.name) ? [p] : [];
  });
}
/** The front matter's simple shapes: scalars, JSON strings, and [a, b] lists. */
function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  for (const line of m ? m[1].split('\n') : []) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const v = kv[2].trim();
    out[kv[1]] = /^\[.*\]$/.test(v) ? v.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean) : /^".*"$/.test(v) ? JSON.parse(v) : v;
  }
  return out;
}
const section = (text, name) => text.match(new RegExp(`^## ${name}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm'))?.[1] || '';
/** "- `id` text" bullets: a promise (or a build Feature's Check) with its authored id. */
export function idBullets(text) {
  return [...text.matchAll(/^- `([a-z0-9][a-z0-9-]*)` (.+)$/gm)].map((m) => ({ id: m[1], text: m[2].trim() }));
}

const problems = [];
const features = [];
for (const file of walk(root).sort()) {
  const rel = path.relative(methodDir, file).split(path.sep).join('/');
  const text = read(file);
  const fm = frontMatter(text);
  const where = (p) => problems.push(`${rel}: ${p}`);
  if (fm.type !== 'feature') where('`type` must be `feature`');
  if (fm.kind !== 'optional') where('`kind` must be `optional` in the optional catalog');
  if (!fm.id || fm.id !== path.basename(file, '.md')) where('`id` must be the file name');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.id || '')) where('`id` must be lowercase, hyphen-separated');
  if (!fm.name) where('no `name`');
  if (!fm.description) where('no `description`');
  for (const s of fm.scope || []) if (!SCOPES.has(s)) where(`scope \`${s}\` is not one of ${[...SCOPES].join(', ')}`);
  if (!(fm.scope || []).length) where('no `scope`');
  const appliedIn = fm.appliedIn || ['requirements', 'design'];
  for (const a of appliedIn) if (!APPLIED_IN.has(a)) where(`appliedIn \`${a}\` is not requirements or design`);
  const promises = idBullets(section(text, 'Promises'));
  if (!promises.length) where('no promise (`- \\`<id>\\` <text>` under ## Promises)');
  const dup = promises.map((p) => p.id).filter((id, i, a) => a.indexOf(id) !== i);
  if (dup.length) where(`promise ids repeat: ${dup.join(', ')}`);
  // Each parameter: | `name` | type (or "enum (a, b)") | `default` or — | meaning |
  const parameters = section(text, 'Parameters').split('\n').filter((l) => /^\| `/.test(l)).map((l) => {
    const [name, type, def, description] = l.replace(/^\||\|\s*$/g, '').split('|').map((c) => c.trim());
    const enumOf = type.match(/^enum\s*\(([^)]*)\)/);
    const p = { name: name.replace(/`/g, ''), type: enumOf ? 'enum' : type, description };
    if (enumOf) p.values = enumOf[1].split(',').map((v) => v.trim()).filter(Boolean);
    if (def && def !== '—') { const v = def.replace(/`/g, ''); p.default = p.type === 'boolean' ? v === 'true' : p.type === 'number' ? Number(v) : v; }
    if (!['boolean', 'enum', 'string', 'number'].includes(p.type)) where(`parameter \`${p.name}\` has type \`${type}\`; it must be boolean, number, string, or enum (a, b)`);
    return p;
  });
  const realizations = [...section(text, 'Realizations').matchAll(/^- \*\*([^*]+)\*\*/gm)].map((m) => m[1]);
  features.push({
    id: fm.id, name: fm.name, description: fm.description, scope: fm.scope || [], appliedIn, aliases: fm.aliases || [],
    meaning: section(text, 'Meaning').trim().replace(/\s+/g, ' '), parameters, realizations, promises, area: path.basename(path.dirname(file)), path: path.relative(root, file).split(path.sep).join('/'),
  });
}

// Ids and aliases: one namespace, no collisions.
const aliases = {};
const ids = new Set();
for (const f of features) { if (ids.has(f.id)) problems.push(`duplicate id \`${f.id}\``); ids.add(f.id); }
for (const f of features) for (const a of f.aliases) {
  if (ids.has(a) && a !== f.id) problems.push(`alias \`${a}\` of \`${f.id}\` is another Feature's id`);
  if (aliases[a] && aliases[a] !== f.id) problems.push(`alias \`${a}\` names both \`${aliases[a]}\` and \`${f.id}\``);
  if (a !== f.id) aliases[a] = f.id;
}

// Nothing leaks into the build: no build Feature is optional, no Target carries an optional Feature.
const buildDir = path.join(methodDir, 'features');
for (const file of walk(buildDir)) if (/^kind:\s*optional\s*$/m.test(read(file))) problems.push(`${path.relative(methodDir, file)}: a build Feature cannot be \`kind: optional\`; move it to optional-features/`);
for (const file of walk(path.join(methodDir, 'targets'))) {
  const t = read(file);
  for (const f of features) if (t.includes(`[feature: ${f.id}]`)) problems.push(`${path.relative(methodDir, file)}: carries the optional Feature \`${f.id}\`; optional Features are not compiled into Targets`);
}

if (problems.length) {
  console.error(`optional Feature catalog: ${problems.length} problem(s)\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  process.exitCode = 1;
}
const catalog = { type: 'optional-feature-catalog', description: 'The optional Features an application may apply to its objects (metamodel/feature.md). Generated by scripts/compile-optional-features.mjs; edit the Feature files.', features, aliases };
fs.writeFileSync(path.join(root, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
const byArea = new Map();
for (const f of features) byArea.set(f.area, [...(byArea.get(f.area) || []), f]);
const index = ['# Optional Features', '', '<!-- Generated by scripts/compile-optional-features.mjs. -->', '',
  'The Features an application may apply to its objects, by choice: in the requirements as a business need, or in the design as a technical choice ([Feature](../metamodel/feature.md)). None applies because it is listed here.', '',
  ...[...byArea].flatMap(([area, list]) => [`## ${area[0].toUpperCase()}${area.slice(1)}`, '', '| Feature | Applies to | Applied in | Promises |', '|---|---|---|---|',
    ...list.map((f) => `| [${f.name}](${f.path}) \`${f.id}\` | ${f.scope.join(', ')} | ${f.appliedIn.join(', ')} | ${f.promises.length} |`), '']),
  '## Former names', '', 'The retired Aspect and Design Term names, which tools no longer read; `mde migrate-features` converts an application that still uses them:', '', '| Former name | Feature |', '|---|---|',
  ...Object.entries(aliases).sort(([a], [b]) => a.localeCompare(b)).map(([a, id]) => `| \`${a}\` | \`${id}\` |`), ''];
fs.writeFileSync(path.join(root, 'index.md'), index.join('\n'));
console.log(`-> ${path.join(root, 'catalog.json')} (${features.length} optional Features, ${Object.keys(aliases).length} aliases)`);
