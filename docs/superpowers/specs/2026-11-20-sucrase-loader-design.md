# Replace Babel standalone with Sucrase (design)

Date: 2026-11-20
Status: awaiting approval

## Intent

`@babel/standalone@7.26.4` is the heaviest asset on the page: 2.83 MB raw / **642 KB gzipped**. It is only used to compile 8 small JSX files in the browser. Sucrase does the same job at **~56 KB gzipped** (~11× smaller) and is ~20× faster at transforming. This removes ~586 KB from every visit without introducing a build pipeline (AGENTS.md forbids one).

## Goals

- Same rendered output and runtime behavior as today.
- Same development workflow: edit `.jsx`, refresh, done. No build step.
- Console free of errors (the Babel in-browser warning disappears with Babel).

## Non-goals

- No build pipeline, no precompilation (ruled out by AGENTS.md).
- No changes to component code, data files, or the `window.X` globals pattern.
- No SRI hashes: jsDelivr's `+esm` output is dynamically generated and explicitly forbids SRI.
- No change to browser support floor — today's `data-presets="react"` only compiles JSX, so modern syntax already passes through untouched; Sucrase with `disableESTransforms: true` matches that exactly.

## Constraints

- AGENTS.md: no build pipeline; JSX scripts use window globals, no import/export; pragmas stay at the top of each JSX file; index.html stays minimal (no inline JS); verify in the preview with snapshot + console.
- Sucrase ships no UMD/browser build; its raw ESM files use extensionless imports browsers can't resolve. It must be loaded through a CDN bundling endpoint.
- `Header.jsx` and `Footer.jsx` render `<SocialIcons />` from another file, so scripts must execute in document order (Social.jsx before App renders).

## Approaches considered

| # | Approach | Gzipped | Trade-offs |
|---|----------|---------|------------|
| A | **Sucrase via CDN + small custom loader** (chosen) | ~56 KB | ~25 lines of loader code we own; one CDN dependency swapped for another; needs a preview verification pass |
| B | Keep Babel | 642 KB | Zero work, but stays the heaviest asset on the page |
| C | Precompile JSX to plain JS | ~0 KB runtime | Best possible result, but introduces a build pipeline — ruled out by AGENTS.md |

Chosen: **A**, approved by the owner.

## Decided how (approach A details)

### CDN choice

jsDelivr `https://cdn.jsdelivr.net/npm/sucrase@3.35.1/+esm` over esm.sh:

- Effectively identical transfer size (55.8 KB vs 56.2 KB gzipped).
- jsDelivr is a mature multi-CDN with a long uptime record; esm.sh has a history of outages.
- Note: jsDelivr serves 5 module chunks (sucrase + 4 small deps), all cached and fetched in parallel; esm.sh serves 1 file. Not a meaningful difference.

### New file: `src/loader.js`

A single `type="module"` script (module scripts are deferred, so it runs after all classic scripts and after the HTML is parsed):

1. `import { transform } from 'https://cdn.jsdelivr.net/npm/sucrase@3.35.1/+esm'`.
2. Collect every `script[type="text/jsx"][src]` in document order.
3. `fetch` all sources in parallel (`Promise.all` preserves order; check `response.ok`).
4. For each, in document order:
   - `transform(code, { transforms: ['jsx'], disableESTransforms: true })`
   - `disableESTransforms: true` = exact parity with today's Babel config, which passes modern syntax through untouched (our source uses none of those features anyway).
   - Defaults already match the pragma comments: `React.createElement` / `React.Fragment`, classic runtime.
   - Execute by injecting a classic `<script>` element with the output plus a `//# sourceURL=<path>` comment, so devtools show the original file names.
   - Sequential injection guarantees document order, so cross-file references (`SocialIcons`) resolve correctly.
5. Any fetch/transform failure → `console.error` with the file path.

### `index.html` changes

- Replace the Babel `<script>` tag with `<script type="module" src="src/loader.js"></script>` (same position).
- The 8 JSX tags change from `type="text/babel" data-presets="react"` to `type="text/jsx"` — inert to the browser, picked up by the loader. `data-presets` goes away (it was Babel-specific).

### Files unchanged

- All `.jsx` files, including the `/** @jsx ... */` pragma comments (AGENTS.md requires them; harmless to Sucrase, which uses option defaults that agree with them).
- `src/data/*`, `src/config/*`, styles, images.

### AGENTS.md updates

- Stack section: Babel standalone → "Sucrase loaded from jsDelivr, applied by `src/loader.js`".
- Script rule: `type="text/babel"` → `type="text/jsx"`; note that component scripts stay import/export-free while `src/loader.js` is a module.
- Process section: drop the "Babel in-browser warning is acceptable" note — expected console after this change is clean.

## Verification

Per AGENTS.md: open the preview, take a snapshot, check the console. Expected: page renders identically, console clean, and the network panel shows ~56 KB of Sucrase instead of 642 KB of Babel.

## What's left

Implementation and verification after approval.
