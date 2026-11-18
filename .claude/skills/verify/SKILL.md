---
name: verify
description: Build, run and check the Bolashak Way app (Vite + React, the repo root – not site/) end to end before every commit - types, tests, build, translation coverage, then a real browser at 390 px and 1280 px. Use after any change to src/, scripts/ or the build config, and before saying a change is done.
---

# Verify Bolashak Way

The app is the repo root. `site/` is a separate project with its own checks – do not run or touch it from here.

## 1. Cheap checks (about a minute, all must pass)

```bash
npx tsc -b            # types; a misspelt source id or text key fails here
npx vitest run        # unit + render tests, run in TZ=Asia/Almaty (vite.config.ts)
npm run build         # the production bundle, CSP and service worker
npm run i18n:coverage # exits 1 if any kk/en string is missing (CI runs it too)
```

What they cover that is easy to break: `platforms.test.ts` (no programme shows another's words or sources; every source id exists), `platformHome.test.tsx` (each front page renders in ru/kk/en with every block open), `dataloss.test.tsx` (backup file, two tabs, damaged save, .ics UID, typed dates), `a11y.test.tsx`, `model.test.ts` (id lists vs data), `terms.test.ts` (rule figures vs the prose in three languages).

A test that fails only sometimes is not retried or slowed down until green: find the cause, or delete it and say why in the commit.

## 2. In a real browser (a few minutes)

Start the dev server in the background and stop it at the end:

```bash
npx vite --port 5199 --strictPort    # run in the background
```

Drive it with Playwright from node, always with audio muted and with a Russian locale (the app picks the language from the browser):

```js
import { chromium } from '<a local playwright>/index.mjs'   // e.g. figma-site/tools/node_modules/playwright (gitignored)
const browser = await chromium.launch({ args: ['--mute-audio'] })   // --mute-audio is mandatory
const ctx = await browser.newContext({ locale: 'ru-RU', serviceWorkers: 'block', acceptDownloads: true })
```

Keep the scripts outside the repo (the session scratchpad). Two traps seen in practice:
- A route change keeps the previous screen while the next page's code loads (React transition): wait for the new page's own element (`main [id^="node-"]` for the roadmap, a new `<main>` element for other pages), not just `networkidle`.
- Focus a date input with `locator.focus()` and type the digits (`03102026`); a click lands on a random segment.

Check, as a reader would:

| What | How | Expected |
|---|---|---|
| Programmes keep their progress | build a master's plan, tick a step, switch to the internship, tick, Settings → export, reset, import, open the master's again | the master's tick is back; the file has `archive.master` |
| Two tabs | two pages in one context, tick in one, act in the other, reload both | both ticks are stored |
| Typed dates | on a stage's date field and in the calendar day card, type a full date | stored as yyyy-mm-dd of that date (never year 0002), focus stays in the field |
| .ics | export, change the commission date, export again | same `UID:contract@bolashak-way`, new DTSTART |
| Search dialog | open (lupe or `/`), type, press Tab/Shift+Tab many times | focus never leaves the dialog |
| Hidden progress bar | scroll the roadmap down at 390×844 | the bar has `inert`; its links take no focus |
| No sideways scroll | 390×844: landing, `/#/master` with every folded block opened, stages foreign/workback/category/specialty of a rural master, `/#/master/calendar`, science foreign | no element past the viewport, no inner horizontal scroller |

Also look at 834 and 1440 px after layout changes; the landing comparison table switches to the five-column view at 1060 px and must not scroll sideways on either side of that. The header shows the full nav from 1280 px (below it, the tab bar): with a plan open, scan every width from 360 to 1440 in ru, kk and en – `scrollWidth` must equal `clientWidth` (it overflowed at 1080–1230 px before).

## 3. Refactors: same output before and after

For a change that must not change what the reader sees, render the text of every platform home (every folded block opened) and every stage for several plans (bachelor, master self and rural, doctorate, internship with the `ai_user` group, science) in ru, kk and en, before and after, and compare `main`'s textContent, link targets and aria-labels. They must be identical, except where a fix meant to change them – then say which and why.

## 4. Before reporting

Delete any test data left in localStorage, stop the dev server, and in the report give the commands run with their results, the browser checks with their outcome, and what was not checked.
