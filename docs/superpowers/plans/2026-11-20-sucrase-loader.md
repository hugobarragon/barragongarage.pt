# Sucrase Loader Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `@babel/standalone` (642 KB gzipped) with Sucrase (~56 KB gzipped) for in-browser JSX compilation, with no build pipeline.

**Architecture:** A new deferred module script `src/loader.js` imports `transform` from esm.sh's Sucrase bundle (direct `/es2022/sucrase.bundle.mjs` URL), fetches all `script[type="text/jsx"][src]` in parallel, compiles each with Sucrase, and executes them in document order by injecting classic script elements. It also imports Preact compat and exposes `window.React` / `window.ReactDOM` before any JSX script runs. `index.html` swaps the Babel tag for the loader and re-types the eight JSX tags.

**Tech Stack:** Preact 10.29.8 + preact/compat (esm.sh bundles), Sucrase 3.35.1 (esm.sh bundle), plain module JS.

**Spec:** `docs/superpowers/specs/2026-11-20-sucrase-loader-design.md`

## Global Constraints

- No build pipeline; `.jsx` files keep their pragma comments and no import/export. Window-global assignments are only reconsidered in Task 6, with owner approval.
- `index.html` keeps no inline JS — the loader lives in `src/loader.js`.
- Sucrase options pinned: `{ transforms: ['jsx'], disableESTransforms: true, production: true, filePath: url }` (`production` stops Sucrase emitting `_jsxFileName`/`__self`/`__source`, whose top-level `const` collided across injected scripts).
- CDN pinned: direct esm.sh bundle `https://esm.sh/sucrase@3.35.1/es2022/sucrase.bundle.mjs` (jsDelivr `+esm` fails to link: `sourcemap-codec` exports no named `encode`). Preact pinned to `10.29.8` (11.x drops `createRoot` from compat).
- One file per commit; short conventional-commit subjects; confirm with owner before the first push.
- AGENTS.md process: verify in the preview (snapshot + console); after this change the console must be clean (the Babel in-browser warning disappears with Babel).

## Review Focus

- **Execution order:** `Social.jsx` must run before `Header`/`Footer` render — pinned by sequential injection in document order (Task 3 preview: no `SocialIcons` ReferenceError).
- **Fetch/compile failure path:** any `.jsx` 404 or syntax error must log `[loader]` with the file path — pinned in Task 1 code, exercised in Task 3 happy-path only (error path is code-reviewed, not simulated, to keep the preview clean).
- **Deferred-module timing:** loader runs after the classic data scripts (`contact.js`, `images.js`, `content.js`) — pinned by module scripts being deferred; Task 3 preview proves `window.CONTENT` was set before render (nav/hero copy visible).
- **Babel leftovers:** `grep -ri babel` outside `docs/` must return nothing — pinned in Task 9.
- **Preact swap:** JSX keeps compiling to `React.createElement`; `window.React`/`window.ReactDOM` are set by `src/loader.js` before any JSX script executes — preview must render identically with no React package loaded.
- **Window assignments:** Task 6 records whether `window.X = X` in the component files is redundant (top-level `function` declarations in classic scripts already create globals) — removal only with owner approval.
- **Owner-reported Google Fonts latency** — measured and reported in Task 8.

---

### Task 1: Create `src/loader.js`

**Files:**
- Create: `src/loader.js`

**Interfaces:**
- Consumes: `script[type="text/jsx"][src]` tags (Task 2), Sucrase `transform(code, options)` from jsDelivr.
- Produces: executes compiled scripts in document order; component files keep their own `window.X = X` assignments.

- [ ] **Step 1: Write `src/loader.js`**

```js
import { transform } from "https://cdn.jsdelivr.net/npm/sucrase@3.35.1/+esm";

const scripts = Array.from(document.querySelectorAll('script[type="text/jsx"][src]'));

try {
  const sources = await Promise.all(
    scripts.map(async (script) => {
      const url = script.getAttribute("src");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
      }
      return { url, code: await response.text() };
    })
  );

  for (const { url, code } of sources) {
    const { code: compiled } = transform(code, {
      transforms: ["jsx"],
      disableESTransforms: true,
      filePath: url,
    });
    const element = document.createElement("script");
    element.textContent = `${compiled}\n//# sourceURL=${url}`;
    document.body.appendChild(element);
  }
} catch (error) {
  console.error("[loader]", error);
}
```

Top-level `await` is valid in module scripts. Appending a classic script element executes it synchronously, so document order is preserved across the loop. `filePath` makes Sucrase prefix compile errors with the path; the fetch error carries its own path.

- [ ] **Step 2:** File created; verification deferred to Task 3 (no test infra in this repo — preview is the test).

### Task 2: Rewire `index.html`

**Files:**
- Modify: `index.html:72` (Babel tag), `index.html:76-83` (eight JSX tags)

**Interfaces:**
- Produces: the `type="text/jsx"` tags Task 1's selector consumes.

- [ ] **Step 1: Replace the Babel script tag**

Old: `<script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"></script>`
New: `<script type="module" src="src/loader.js"></script>` (same position, line 72).

- [ ] **Step 2: Re-type the eight JSX tags** (single replaceAll)

Old: `<script type="text/babel" data-presets="react" src=`
New: `<script type="text/jsx" src=`

### Task 3: Preview verification

**Files:** none (verification only)

- [ ] **Step 1: Serve the site** — `python3 -m http.server 8080` in background from repo root.
- [ ] **Step 2: Load the `browser` skill**, open `http://localhost:8080`, take a snapshot.
- [ ] **Step 3: Check snapshot** — header, hero, services, gallery, about, social, footer all render; Portuguese copy present (proves `window.CONTENT` loaded before the loader ran).
- [ ] **Step 4: Check console** — must be clean: no errors, no Babel warning, no `SocialIcons`/`App` ReferenceError.
- [ ] **Step 5: Check network** — no `babel.min.js` request; `+esm` chunks present and small; note Google Fonts timings for Task 6.
- [ ] **Step 6: Stop the server.**

### Task 4: Commit the code changes (one file per commit)

- [ ] **Step 1:** `git add src/loader.js && git commit -m "feat: add Sucrase loader replacing Babel standalone"`
- [ ] **Step 2:** `git add index.html && git commit -m "refactor: load JSX via Sucrase loader instead of Babel"`
- [ ] Push deferred to Task 9 (confirm with owner first).

### Task 5: Replace the React runtime with Preact compat

**Files:**
- Modify: `src/loader.js` (import Preact, expose globals), `index.html` (drop the two React UMD tags)

**Interfaces:**
- Consumes: bare `React` / `ReactDOM` references in the unchanged `.jsx` files.
- Produces: `window.React` / `window.ReactDOM` set before the compiled scripts run.

- [ ] **Step 1: CDN surface (verified during planning)** — `preact@10.29.8/compat` exports 46 React-compatible names (`createElement`, `Fragment`, hooks); `preact/compat/client` exports `createRoot`/`hydrateRoot`. 11.x drops `createRoot`, so pin 10.29.8.
- [ ] **Step 2: `src/loader.js`** — add above the script scan:
```js
import * as React from "https://esm.sh/preact@10.29.8/es2022/compat.bundle.mjs";
import { createRoot, hydrateRoot } from "https://esm.sh/preact@10.29.8/es2022/compat/client.bundle.mjs";

window.React = React;
window.ReactDOM = { createRoot, hydrateRoot };
```
- [ ] **Step 3: `index.html`** — delete the two `unpkg.com/react…` / `react-dom…` script tags.
- [ ] **Step 4: Preview verify** — all sections render, console clean, network shows the two esm.sh Preact bundles and no unpkg React; record sizes.
- [ ] **Step 5: Commit (one file per commit)**
  - `git add src/loader.js && git commit -m "feat: run JSX on Preact compat instead of React"`
  - `git add index.html && git commit -m "refactor: drop React UMD scripts in favour of Preact"`

### Task 6: Check whether the `window.X = X` assignments are still needed

**Files:** read-only investigation; any removal needs owner approval

- [ ] **Step 1: Evidence** — compiled scripts are injected as classic scripts, so a top-level `function X()` already creates a global property; grep confirms nothing reads `window.App` / `window.Header` / … (only `window.CONTENT`, `window.CONTACT`, `window.IMAGES`, and DOM APIs are read).
- [ ] **Step 2: Empirical check** — in the preview, inject a classic script declaring `function ProbeGlobal(){}` and read `window.ProbeGlobal`; then temporarily strip the ten `window.X = X;` lines across the component files and reload — all sections must still render with a clean console.
- [ ] **Step 3: Report** — findings and recommendation to the owner; remove anything only with approval (one file per commit), and adjust the `AGENTS.MD` window-globals wording accordingly.

### Task 7: Update `AGENTS.MD`

**Files:**
- Modify: `AGENTS.MD` (stack section ×2 lines, repo layout line, process line)

- [ ] **Step 1:** Stack line → `- React-style JSX with NO build pipeline: Preact 10 + compat and Sucrase 3.35.1 load from CDN (esm.sh); src/loader.js compiles and runs JSX in-browser.`
- [ ] **Step 2:** Script rule → `- JSX scripts use \`type="text/jsx"\` with window globals, compiled and run in order by src/loader.js (a module). No import/export in component scripts.` (adjust the window-globals wording to whatever Task 6 concludes)
- [ ] **Step 3:** Repo layout → add `src/loader.js` to the `src/main.jsx, src/App.jsx` line.
- [ ] **Step 4:** Process line → `- Verify in the preview (snapshot + console); the console must be clean.`
- [ ] **Step 5:** `git add AGENTS.MD && git commit -m "docs(AGENTS): switch stack docs to Sucrase loader"`

### Task 8: Check Google Fonts download time (owner-requested)

**Files:** none (measurement + report; any fix needs owner approval)

- [ ] **Step 1:** `curl` the exact stylesheet URL with a Chrome UA; record `time_total`, `size_download`, and TTF-vs-WOFF2 negotiation.
- [ ] **Step 2:** Extract the WOFF2 URLs from the CSS and time each (`time_total`, `size_download`).
- [ ] **Step 3:** Compare against Task 3 Step 5 network timings from the preview.
- [ ] **Step 4:** Report: where the time goes (DNS/connect vs transfer), whether `preconnect` (already present) and `display=swap` (already present) are doing their job, and the options if it is slow (keep as-is, or self-host the two font files in `img/`+`styles/` to drop two third-party connections). Owner picks; no change without approval.

### Task 9: Leftover grep, docs commits, push confirmation

- [ ] **Step 1:** `grep -rni babel --include='*.{html,js,jsx,css,MD}' .` excluding `docs/` — expect zero hits.
- [ ] **Step 2:** `git add docs/superpowers/specs/2026-11-20-sucrase-loader-design.md && git commit -m "docs: add Sucrase replacement design doc"`
- [ ] **Step 3:** `git add docs/superpowers/plans/2026-11-20-sucrase-loader.md && git commit -m "docs: add Sucrase replacement implementation plan"`
- [ ] **Step 4:** Ask owner to confirm the first push, then `git push` (all commits in one chain per repo rules).
