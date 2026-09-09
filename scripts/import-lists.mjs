/**
 * Turns the two official PDFs into src/content/lists.generated.ts, so the app can search
 * the priority specialties and the recommended universities without sending anyone to a
 * 600 KB download.
 *
 * The generated file is a snapshot: it carries the source URL and the day it was taken,
 * and both lists are re-approved every competition year. Re-run after updating the URLs
 * in src/content/sources.ts:
 *
 *   npm run import:lists
 *
 * Needs `pdftotext` (poppler): brew install poppler
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const SPECIALTIES_PDF =
  'https://bolashak.gov.kz/storage/app/media/pretendentu--specialnosti/2026/20-08/1.1.%20%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%9F%D0%9F%D0%A1%20%D1%80%D1%83%D1%81.pdf'
const UNIVERSITIES_PDF = 'https://bolashak.gov.kz/storage/app/media/pretendentu--vuzy/vuzy_bolashak_2026_rus.pdf'

const work = mkdtempSync(join(tmpdir(), 'bolashak-lists-'))
const collapse = (s) => s.replace(/\s+/g, ' ').trim()

/**
 * A few rows in the PDF give a bare host ("www.manchester.ac.uk"). Left as-is it would be
 * read as a relative path and the link would point back into the app.
 */
function withScheme(url) {
  if (!url) return url
  // A column bleed can glue a stray letter onto the front; where a scheme is present it marks
  // where the address really starts.
  const fromScheme = url.match(/https?:\/\/.*$/i)
  if (fromScheme) return fromScheme[0]
  return `https://${url.replace(/^[^\p{L}\p{N}]+/u, '')}`
}

async function pdfText(url, name) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  const pdf = join(work, `${name}.pdf`)
  const txt = join(work, `${name}.txt`)
  writeFileSync(pdf, Buffer.from(await res.arrayBuffer()))
  execFileSync('pdftotext', ['-layout', pdf, txt])
  return readFileSync(txt, 'utf8')
}

/* ─────────────────────────── specialties ─────────────────────────── */

const LEVEL = /\s+(Бакалавриат|Магистратура|Докторантура)\s+([\d.]+\s*[БМД])\s*$/
const DIRECTION = /^\s*[IVXІ]+\.\s+(.*направлени\S*)\s*$/
const GROUP = /^\s{6,}\d+\.\s+([А-ЯЁ][^;]{3,60})\s*$/
const HEAD = /^\s*(\d+)\s+(\d+)\s{2,}(\S.*)$/
const FOOTNOTE = /\*Специальности,\s*вошедшие[\s\S]*$/

/**
 * The Russian name is the left column and the English equivalents the right one. Their
 * x-positions drift from line to line inside one entry, so the split follows the change
 * of alphabet instead; an opening bracket belongs to the Latin phrase it introduces.
 */
function splitByAlphabet(text) {
  const m = /[A-Za-z]/.exec(text)
  if (!m) return [text, '']
  let cut = m.index
  while (cut > 0 && ' («"\''.includes(text[cut - 1])) cut -= 1
  return [text.slice(0, cut), text.slice(cut)]
}

function parseSpecialties(text) {
  const out = []
  let cur = null
  let direction = ''
  let group = ''
  for (const raw of text.split('\n')) {
    if (!raw.trim()) continue
    let line = raw
    const levels = []
    for (;;) {
      const m = LEVEL.exec(line)
      if (!m) break
      levels.unshift({ level: m[1], code: m[2].replace(/\s+/g, '') })
      line = line.slice(0, m.index)
    }
    const d = DIRECTION.exec(line)
    if (d) {
      direction = d[1].trim()
      continue
    }
    const g = GROUP.exec(line)
    if (g) {
      group = g[1].trim()
      continue
    }
    if (/^\s*\d+\s*$/.test(line)) {
      if (cur) cur.levels.push(...levels)
      continue
    }
    const h = HEAD.exec(line)
    if (h && Number(h[1]) < 400) {
      if (cur) out.push(cur)
      const [ru, en] = splitByAlphabet(h[3])
      cur = { n: Number(h[1]), direction, group, ru: [ru], en: [en], levels }
    } else if (cur) {
      const [ru, en] = splitByAlphabet(line)
      cur.ru.push(ru)
      cur.en.push(en)
      cur.levels.push(...levels)
    }
  }
  if (cur) out.push(cur)
  return out.map((r) => {
    const seen = new Set()
    return {
      n: r.n,
      direction: r.direction,
      group: r.group,
      ru: collapse(r.ru.join(' ').replace(FOOTNOTE, '')).replace(/^\d{1,3}\s+/, ''),
      en: collapse(r.en.join(' ')).replace(/;$/, '').trim(),
      levels: r.levels.filter((l) => !seen.has(l.code) && seen.add(l.code)),
    }
  })
}

/* ────────────────────────── universities ────────────────────────── */

function cells(line) {
  const out = []
  const re = /\S(?:.*?\S)?(?=\s{2,}|$)/g
  let m
  while ((m = re.exec(line))) {
    const text = m[0].trim()
    if (text) out.push([m.index, text])
    if (re.lastIndex === m.index) re.lastIndex += 1
  }
  return out
}

function parseUniversities(text) {
  const blocks = []
  let cur = null
  for (const raw of text.split('\n')) {
    const cs = cells(raw)
    if (!cs.length) continue
    const head = /^(\d+)\.\s*(.*)$/.exec(cs[0][1])
    if (head && (cs.length >= 2 || head[2])) {
      if (cur) blocks.push(cur)
      const tail = head[2]
      const first = tail ? [[cs[0][0] + cs[0][1].length - tail.length, tail]] : []
      cur = { n: Number(head[1]), lines: [[...first, ...cs.slice(1)]] }
    } else if (cur) {
      cur.lines.push(cs)
    }
  }
  if (cur) blocks.push(cur)

  const rows = []
  let origins = null
  for (const b of blocks) {
    // The table's column widths change from row to row, so each entry takes its own
    // positions from its first three-cell line; an entry whose URL only starts further
    // down inherits the previous entry's.
    const own = b.lines.find((l) => l.length >= 3)
    if (own) origins = own.slice(0, 3).map((c) => c[0])
    if (!origins) continue
    const rec = { n: b.n, name: [], country: [], url: [] }
    for (const line of b.lines) {
      for (const [s, txt] of line) {
        let i = 0
        for (let j = 1; j < 3; j += 1) if (Math.abs(origins[j] - s) < Math.abs(origins[i] - s)) i = j
        rec[['name', 'country', 'url'][i]].push(txt)
      }
    }
    rows.push({
      n: rec.n,
      name: collapse(rec.name.join(' ')),
      country: collapse(rec.country.join(' ')),
      url: withScheme(rec.url.join('').replace(/\s/g, '')),
    })
  }
  return repairUniversities(rows.filter((r) => r.country || r.url))
}

/** Words of the country column that never form part of a university's own name. */
const COUNTRY_WORDS = ['Королевство', 'Соединенное', 'Соединенные', 'Федеративная', 'Конфедерация', 'Великобритании', 'Ирландии', 'Штаты', 'Америки']

function repairUniversities(rows) {
  const counts = new Map()
  for (const r of rows) if (r.country) counts.set(r.country, (counts.get(r.country) ?? 0) + 1)
  // The country names the document uses; rarer values are fragments of these, left
  // behind when a wrapped line got split between the name and the country column.
  const canon = [...counts.entries()].filter(([, n]) => n >= 3).map(([c]) => c).sort((a, b) => b.length - a.length)

  const byWord = new Map()
  for (const r of rows) for (const w of r.country.split(' ')) {
    if (!byWord.has(w)) byWord.set(w, new Set())
    byWord.get(w).add(r.country)
  }

  for (const r of rows) {
    for (const c of canon) {
      if (r.name.includes(c)) {
        r.name = collapse(r.name.replace(c, ' '))
        r.country = c
        break
      }
    }
    if (!canon.includes(r.country)) {
      const have = new Set(r.country.split(' ').filter(Boolean))
      const parent = canon.find((c) => have.size && [...have].every((w) => c.split(' ').includes(w)))
      if (parent) {
        for (const w of parent.split(' ')) {
          const re = new RegExp(`(?<!\\S)${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\S)`)
          if (!have.has(w) && re.test(r.name)) {
            r.name = r.name.replace(re, '')
            have.add(w)
          }
        }
        if (parent.split(' ').every((w) => have.has(w))) r.country = parent
      }
    }
    const words = r.name.split(' ')
    const strays = words.filter((w) => COUNTRY_WORDS.includes(w))
    if (strays.length) {
      r.name = collapse(words.filter((w) => !COUNTRY_WORDS.includes(w)).join(' '))
      if (r.country.split(' ').filter(Boolean).length < 2) {
        const sets = strays.map((w) => byWord.get(w) ?? new Set())
        const shared = [...(sets[0] ?? [])].filter((c) => sets.every((s) => s.has(c)) && c.split(' ').length >= 2)
        if (shared.length) r.country = shared.sort((a, b) => b.length - a.length)[0]
      }
    }
    r.name = collapse(r.name)
  }
  return rows
}

/* ───────────────────────────── output ───────────────────────────── */

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`

const [specText, uniText] = await Promise.all([pdfText(SPECIALTIES_PDF, 'specialties'), pdfText(UNIVERSITIES_PDF, 'universities')])
const specialties = parseSpecialties(specText)
const universities = parseUniversities(uniText)
rmSync(work, { recursive: true, force: true })

if (specialties.length < 50) throw new Error(`specialties: parsed only ${specialties.length}`)
if (universities.length < 300) throw new Error(`universities: parsed only ${universities.length}`)
const noLevels = specialties.filter((s) => s.levels.length === 0)
if (noLevels.length) throw new Error(`specialties without levels: ${noLevels.map((s) => s.n).join(', ')}`)
const noUrl = universities.filter((u) => !u.url)
if (noUrl.length) throw new Error(`universities without a URL: ${noUrl.map((u) => u.n).join(', ')}`)

const today = new Date().toISOString().slice(0, 10)
const body = `// Generated by scripts/import-lists.mjs — do not edit by hand.
// A verbatim snapshot of the two official PDFs, taken on ${today}. Both lists are
// re-approved every competition year: re-run the script and check the URLs in it.
import type { PrioritySpecialty, RecommendedUniversity } from './lists'

export const LISTS_TAKEN_ON = '${today}'

export const SPECIALTIES: PrioritySpecialty[] = [
${specialties
  .map(
    (s) =>
      `  { n: ${s.n}, direction: ${q(s.direction)}, group: ${q(s.group)}, ru: ${q(s.ru)}, levels: [${s.levels
        .map((l) => `{ level: ${q(l.level)}, code: ${q(l.code)} }`)
        .join(', ')}], en: ${q(s.en)} },`,
  )
  .join('\n')}
]

export const UNIVERSITIES: RecommendedUniversity[] = [
${universities.map((u) => `  { n: ${u.n}, name: ${q(u.name)}, country: ${q(u.country)}, url: ${q(u.url)} },`).join('\n')}
]
`
writeFileSync('src/content/lists.generated.ts', body)
console.log(`specialties: ${specialties.length}, universities: ${universities.length} → src/content/lists.generated.ts (${Math.round(body.length / 1024)} KB)`)
