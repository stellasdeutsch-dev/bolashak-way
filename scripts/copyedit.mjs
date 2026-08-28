// Helper for rewriting localised content strings in place.
//   node scripts/copyedit.mjs list <file>            → numbered ru/kk/en triples
//   node scripts/copyedit.mjs apply <file> <json>    → { "12": {ru, kk, en}, ... } by triple index
// Rewriting by index avoids brittle exact-string matching across three languages.
import { readFileSync, writeFileSync } from 'node:fs'

const [, , mode, file, payload] = process.argv
const src = readFileSync(file, 'utf8')

// Matches an object literal of the shape { ru: '…', kk: '…', en: '…' } in any order.
const STR = /(\b(?:ru|kk|en)): '((?:[^'\\]|\\.)*)'/g

function triples(text) {
  const all = [...text.matchAll(STR)]
  const out = []
  for (let i = 0; i < all.length; ) {
    const group = []
    const seen = new Set()
    while (i < all.length && !seen.has(all[i][1])) {
      seen.add(all[i][1])
      group.push(all[i])
      i++
      if (seen.size === 3) break
    }
    out.push(group)
  }
  return out
}

const groups = triples(src)

if (mode === 'list') {
  groups.forEach((g, n) => {
    const get = (k) => (g.find((m) => m[1] === k)?.[2] ?? '')
    if (get('ru').length < 40) return
    console.log(`### ${n}`)
    console.log(`ru: ${get('ru')}`)
    console.log(`kk: ${get('kk')}`)
    console.log(`en: ${get('en')}`)
    console.log()
  })
} else if (mode === 'apply') {
  const edits = JSON.parse(readFileSync(payload, 'utf8'))
  let out = src
  const patches = []
  for (const [idx, langs] of Object.entries(edits)) {
    const g = groups[Number(idx)]
    if (!g) throw new Error(`no triple #${idx}`)
    for (const [lang, text] of Object.entries(langs)) {
      const m = g.find((x) => x[1] === lang)
      if (!m) throw new Error(`triple #${idx} has no ${lang}`)
      patches.push({ start: m.index, end: m.index + m[0].length, text: `${lang}: '${text.replace(/'/g, "\\'")}'` })
    }
  }
  patches.sort((a, b) => b.start - a.start)
  for (const p of patches) out = out.slice(0, p.start) + p.text + out.slice(p.end)
  writeFileSync(file, out)
  console.log(`patched ${patches.length} strings in ${file}`)
} else {
  console.error('usage: copyedit.mjs list|apply <file> [edits.json]')
  process.exit(1)
}
