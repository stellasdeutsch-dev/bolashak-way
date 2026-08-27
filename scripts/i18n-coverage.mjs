// Reports which localised strings still fall back to Russian.
// Usage: npm run i18n:coverage
import { STAGES } from '../src/content/stages/index.ts'
import { CATEGORIES } from '../src/content/categories.ts'
import { DOCUMENTS } from '../src/content/documents.ts'
import { FAQ } from '../src/content/faq.ts'

const missing = { kk: [], en: [] }
let total = 0

function check(label, l) {
  if (!l || typeof l.ru !== 'string') return
  total += 1
  for (const loc of ['kk', 'en']) if (!l[loc]) missing[loc].push(label)
}

for (const s of STAGES) {
  check(`${s.id}.kicker`, s.kicker)
  check(`${s.id}.title`, s.title)
  check(`${s.id}.summary`, s.summary)
  check(`${s.id}.why`, s.why)
  s.checklist.forEach((i) => check(`${s.id}.check.${i.id}`, i.text))
  s.mistakes.forEach((m, i) => check(`${s.id}.mistake.${i}`, m))
  ;(s.deadlines ?? []).forEach((d, i) => check(`${s.id}.deadline.${i}`, d.text))
  ;(s.notes ?? []).forEach((n, i) => check(`${s.id}.note.${i}`, n.text))
}
for (const c of Object.values(CATEGORIES)) {
  check(`cat.${c.id}.title`, c.title)
  check(`cat.${c.id}.short`, c.short)
  check(`cat.${c.id}.desc`, c.desc)
  check(`cat.${c.id}.workBack`, c.workBack)
  c.requirements.forEach((r, i) => check(`cat.${c.id}.req.${i}`, r.text))
}
for (const d of DOCUMENTS) {
  check(`doc.${d.id}.title`, d.title)
  if (d.note) check(`doc.${d.id}.note`, d.note)
}
for (const f of FAQ) {
  check(`faq.${f.id}.q`, f.q)
  check(`faq.${f.id}.a`, f.a)
}

const pct = (n) => `${(((total - n) / total) * 100).toFixed(1)}%`
console.log(`total localisable strings: ${total}`)
for (const loc of ['kk', 'en']) {
  console.log(`\n${loc}: ${total - missing[loc].length}/${total} translated (${pct(missing[loc].length)}), missing ${missing[loc].length}`)
  const byStage = {}
  for (const m of missing[loc]) {
    const key = m.split('.').slice(0, 2).join('.')
    byStage[key] = (byStage[key] ?? 0) + 1
  }
  const top = Object.entries(byStage).sort((a, b) => b[1] - a[1])
  console.log('  ' + top.map(([k, v]) => `${k}:${v}`).join(' '))
}
if (process.argv.includes('--list')) {
  console.log('\nmissing kk:\n' + missing.kk.join('\n'))
}
