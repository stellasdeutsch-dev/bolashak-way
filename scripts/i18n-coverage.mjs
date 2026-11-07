// Reports which localised strings still fall back to Russian.
// Usage: npm run i18n:coverage [-- --list]
//
// Walks every export of every module under src/content (platform texts, glossary,
// explainers, forms, sources, deadlines…) and the UI strings in src/i18n/ui.ts. Any object
// with a Russian `ru` string counts as one localisable string and needs `kk` and `en`.
// Left out: verbatim quotes of the acts (excerpts.ts) – they are Russian on purpose – and
// the generated official lists, which are snapshots of Russian PDFs.
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const SKIP = [/excerpts\.ts$/, /\.generated\.ts$/, /\.test\.ts$/]

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? files(p) : /\.ts$/.test(p) && !SKIP.some((re) => re.test(p)) ? [p] : []
  })
}

const missing = { kk: [], en: [] }
let total = 0
const seen = new WeakSet()

function walk(value, label) {
  if (!value || typeof value !== 'object' || seen.has(value)) return
  seen.add(value)
  if (typeof value.ru === 'string') {
    total += 1
    for (const loc of ['kk', 'en']) if (!value[loc]) missing[loc].push(label)
    return
  }
  for (const [k, v] of Object.entries(value)) walk(v, `${label}.${k}`)
}

const modules = [...files(join(root, 'src/content')), join(root, 'src/i18n/ui.ts')]
for (const file of modules) {
  const mod = await import(pathToFileURL(file).href)
  const name = relative(join(root, 'src'), file).replace(/\.ts$/, '')
  for (const [exp, value] of Object.entries(mod)) walk(value, `${name}:${exp}`)
}

const pct = (n) => `${(((total - n) / total) * 100).toFixed(1)}%`
console.log(`modules: ${modules.length}, localisable strings: ${total}`)
for (const loc of ['kk', 'en']) {
  console.log(`\n${loc}: ${total - missing[loc].length}/${total} translated (${pct(missing[loc].length)}), missing ${missing[loc].length}`)
  const byModule = {}
  for (const m of missing[loc]) {
    const key = m.split('.')[0]
    byModule[key] = (byModule[key] ?? 0) + 1
  }
  const top = Object.entries(byModule).sort((a, b) => b[1] - a[1])
  if (top.length) console.log('  ' + top.map(([k, v]) => `${k}:${v}`).join(' '))
}
if (process.argv.includes('--list')) {
  for (const loc of ['kk', 'en']) console.log(`\nmissing ${loc}:\n` + missing[loc].join('\n'))
}
