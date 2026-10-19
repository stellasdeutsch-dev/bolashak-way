/**
 * The two lists that belong to one platform each, turned into data the app can search:
 *
 *   - the priority specialties for Bolashak internships (a list of its own, not the
 *     academic one) → src/content/lists.internship.generated.ts
 *   - the organisations recommended for scientific internships, each with the research
 *     directions it takes, plus the directions themselves → src/content/lists.science.generated.ts
 *
 * Like import-lists.mjs this is a dated snapshot of official PDFs. Re-run with
 *
 *   npm run import:lists
 *
 * Pass a local .txt (pdftotext -layout output) as INTERNSHIP_TXT / SCIENCE_TXT to parse
 * without downloading. Needs `pdftotext` (poppler) otherwise.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const INTERNSHIP_PDF =
  'https://bolashak.gov.kz/storage/app/media/pretendentu--specialnosti-dlya-stazhirovok/2026/spisok_stazhirovka_2026_rus.pdf'
export const SCIENCE_PDF =
  'https://bolashak.gov.kz/storage/app/media/pretendentu-po-ns--vuzy-nauchnye-centry-organizaciya/2026/28-09/2.%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%80%D1%83%D1%81.pdf'

const work = mkdtempSync(join(tmpdir(), 'bolashak-platform-lists-'))
const collapse = (s) => s.replace(/\s+/g, ' ').trim()

async function text(url, name, local) {
  if (local) return readFileSync(local, 'utf8')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  const pdf = join(work, `${name}.pdf`)
  const txt = join(work, `${name}.txt`)
  writeFileSync(pdf, Buffer.from(await res.arrayBuffer()))
  execFileSync('pdftotext', ['-layout', pdf, txt])
  return readFileSync(txt, 'utf8')
}

/* ─────────────────────── internship specialties ─────────────────────── */

/**
 * Rows read "1    1    3d анимация. …    Стажировка    1Т": a running number, the number
 * inside the group, the name, the programme and a code. A long name wraps onto lines that
 * hold only more of the name.
 */
function parseInternship(txt) {
  const ROW = /^\s*(\d+)\s+(\d+)\s{2,}(\S.*?)\s+Стажировка\s+(\d+)\s*Т\s*$/
  const ROW_NO_CODE = /^\s*(\d+)\s+(\d+)\s{2,}(\S.*?)\s+Стажировка\s*$/
  const DIRECTION = /^\s*[IVXІ]+\.\s+(.*направлени\S*)\s*$/
  const GROUP = /^\s{10,}\d+\.\s+([А-ЯЁ].{2,60}?)\s*$/
  const rows = []
  let direction = ''
  let group = ''
  let open = null
  for (const raw of txt.replace(/\f/g, '\n').split('\n')) {
    if (/^\s*\*/.test(raw)) break // the footnote closes the table
    const line = raw.replace(/\s+$/, '')
    if (!line.trim()) continue
    let m
    if ((m = line.match(DIRECTION))) {
      direction = collapse(m[1])
      open = null
      continue
    }
    if ((m = line.match(GROUP)) && !/Стажировка/.test(line)) {
      group = collapse(m[1])
      open = null
      continue
    }
    if ((m = line.match(ROW)) || (m = line.match(ROW_NO_CODE))) {
      open = { n: Number(m[1]), name: collapse(m[3]), direction, group, code: m[4] ? `${m[4]}Т` : `${m[1]}Т` }
      rows.push(open)
      continue
    }
    // A wrapped name: text under the name column and nothing else on the line.
    if (open && /^\s{6,}\S/.test(line) && !/Стажировка/.test(line) && !/^\s*\d+\s*$/.test(line)) {
      open.name = collapse(`${open.name} ${line}`)
    }
  }
  return rows
}

/* ─────────────────── scientific-internship organisations ─────────────────── */

/** Every country the document uses, longest first so "… Штаты Америки" wins over "… Штаты". */
const COUNTRIES = [
  'Соединенное Королевство Великобритании и Северной Ирландии', 'Специальный административный район Гонконг',
  'Мексиканские Соединенные Штаты', 'Объединенные Арабские Эмираты', 'Федеративная Республика Германия',
  'Федеративная Республика Бразилия', 'Китайская Народная Республика', 'Австралийский Союз (Австралия)',
  'Южно-Африканская Республика', 'Соединенные Штаты Америки', 'Финляндская Республика', 'Швейцарская Конфедерация',
  'Французская Республика', 'Итальянская Республика', 'Австрийская Республика', 'Королевство Нидерланды',
  'Республика Сингапур', 'Российская Федерация', 'Королевство Испания', 'Королевство Швеция', 'Королевство Норвегия',
  'Королевство Бельгия', 'Королевство Дания', 'Турецкая Республика', 'Республика Ирландия', 'Государство Израиль',
  'Государство Япония', 'Республика Польша', 'Чешская Республика', 'Республика Корея', 'Республика Индия',
  'Федерация Малайзия', 'Республика Чили', 'Новая Зеландия', 'Республика Казахстан', 'Венгрия', 'Нидерланды',
  'Австрия', 'Япония', 'Канада', 'Португальская Республика', 'Греческая Республика', 'Эстонская Республика',
  'Литовская Республика', 'Латвийская Республика', 'Республика Словения', 'Словацкая Республика', 'Королевство Таиланд',
  'Республика Индонезия', 'Республика Узбекистан', 'Кыргызская Республика', 'Азербайджанская Республика',
  'Королевство Саудовская Аравия', 'Государство Катар', 'Исламская Республика Пакистан', 'Арабская Республика Египет',
  'Республика Беларусь', 'Грузия', 'Монголия', 'Республика Армения', 'Республика Кипр', 'Республика Мальта',
  'Великое Герцогство Люксембург', 'Исландия', 'Румыния', 'Республика Болгария', 'Республика Хорватия',
  'Республика Сербия', 'Социалистическая Республика Вьетнам', 'Республика Филиппины', 'Аргентинская Республика',
  'Республика Колумбия', 'Республика Перу', 'Ирландская Республика', 'Украина',
].sort((a, b) => b.length - a.length)
/**
 * A few rows of the 2026 list give the country in Kazakh or with a lowercase word. Shown
 * under the Russian name the rest of the document uses, so filtering by country works.
 */
const ALIASES = {
  'Швейцария Конфедерациясы': 'Швейцарская Конфедерация',
  'Швеция Корольдігі': 'Королевство Швеция',
  'Китайская народная Республика': 'Китайская Народная Республика',
}
const COUNTRY_FIRST = new Set([...COUNTRIES, ...Object.keys(ALIASES)].map((c) => c.split(' ')[0]))

const CODES = /((?:\d+(?:\.\d+)+\.?\s*,?\s*)+)$/
const PAGE = /^\s*\d{1,3}\s*$/

function splitBlocks(lines) {
  const blocks = []
  let cur = null
  for (const line of lines) {
    if (!line.trim() || PAGE.test(line)) continue
    const m = line.match(/^\s{0,3}(\d+)\.\s+(\S.*)$/)
    if (m) {
      cur = { n: Number(m[1]), lines: [line] }
      blocks.push(cur)
    } else if (cur) cur.lines.push(line)
  }
  return blocks
}

/**
 * The country column starts wherever the first country word sits on the block's first
 * line; every later line of the block is cut at the same place. Codes are peeled off the
 * end of each line first, since they never contain letters.
 */
function parseOrgBlock(block, withCodes) {
  const codes = []
  const parts = block.lines.map((line, i) => {
    let body = i === 0 ? line.replace(/^\s{0,3}\d+\.\s+/, (m) => ' '.repeat(m.length)) : line
    if (withCodes) {
      const m = body.match(CODES)
      if (m) {
        codes.push(...m[1].split(/[,\s]+/).map((c) => c.replace(/\.$/, '')).filter((c) => /^\d+(\.\d+)+$/.test(c)))
        body = body.slice(0, m.index)
      }
    }
    return body.replace(/\s+$/, '')
  })
  let col = -1
  for (const p of parts) {
    const re = /(?:^|\s)(\S+)/g
    let m
    while ((m = re.exec(p))) {
      const at = m.index + m[0].indexOf(m[1])
      if (at >= 18 && COUNTRY_FIRST.has(m[1])) {
        col = at
        break
      }
    }
    if (col >= 0) break
  }
  const name = []
  const where = []
  for (const p of parts) {
    if (col < 0) {
      name.push(p)
      continue
    }
    name.push(p.slice(0, col))
    where.push(p.slice(col))
  }
  let loc = collapse(where.join(' '))
  for (const [alias, canon] of Object.entries(ALIASES)) if (loc.includes(alias)) loc = loc.replace(alias, canon)
  const country = COUNTRIES.find((c) => loc.includes(c)) ?? COUNTRIES.find((c) => c.split(' ').every((w) => loc.includes(w)))
  return { n: block.n, name: collapse(name.join(' ')), country: country ?? loc, codes: [...new Set(codes)] }
}

function parseScience(txt) {
  const lines = txt.replace(/\f/g, '\n').split('\n')
  const start1 = lines.findIndex((l) => /^1\.\s+Ведущие зарубежные высшие учебные заведения/.test(l))
  const start2 = lines.findIndex((l) => /^2\.\s+Список научных центров/.test(l))
  const startDirs = lines.findIndex((l) => /^\s*\*\s*1\.\s+\S/.test(l))
  if (start1 < 0 || start2 < 0 || startDirs < 0) throw new Error('science: section headers not found')

  const universities = splitBlocks(lines.slice(start1 + 2, start2)).map((b) => ({ ...parseOrgBlock(b, true), kind: 'university' }))
  const centres = splitBlocks(lines.slice(start2 + 2, startDirs)).map((b) => ({ ...parseOrgBlock(b, false), kind: 'centre' }))

  // Directions: "1.1. Name;" with wrapped continuations; areas are "2. Name" lines.
  const directions = []
  const areas = []
  let open = null
  for (const raw of lines.slice(startDirs)) {
    const line = raw.replace(/^\s*\*\s*/, '').trim()
    if (!line || PAGE.test(raw)) continue
    let m
    if ((m = line.match(/^(\d)\.\s+(\S.*)$/))) {
      areas.push({ code: m[1], name: collapse(m[2]).replace(/[;.]$/, '') })
      open = null
    } else if ((m = line.match(/^(\d+(?:\.\d+)+)\.?\s+(\S.*)$/))) {
      open = { code: m[1], name: collapse(m[2]) }
      directions.push(open)
    } else if (open) open.name = collapse(`${open.name} ${line}`)
  }
  for (const d of directions) d.name = d.name.replace(/[;.:]$/, '')
  return { orgs: [...universities, ...centres], directions, areas }
}

/* ───────────────────────────── output ───────────────────────────── */

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const today = new Date().toISOString().slice(0, 10)

const [internTxt, scienceTxt] = await Promise.all([
  text(INTERNSHIP_PDF, 'internship', process.env.INTERNSHIP_TXT),
  text(SCIENCE_PDF, 'science', process.env.SCIENCE_TXT),
])
rmSync(work, { recursive: true, force: true })

const internship = parseInternship(internTxt)
if (internship.length < 100) throw new Error(`internship: parsed only ${internship.length}`)
const gaps = internship.filter((r, i) => i > 0 && r.n !== internship[i - 1].n + 1)
if (gaps.length) throw new Error(`internship: numbering breaks at ${gaps.map((r) => r.n).join(', ')}`)

const science = parseScience(scienceTxt)
const known = new Set(science.directions.map((d) => d.code))
const unis = science.orgs.filter((o) => o.kind === 'university')
if (unis.length < 150) throw new Error(`science: parsed only ${unis.length} universities`)
if (science.orgs.filter((o) => o.kind === 'centre').length < 50) throw new Error('science: too few centres')
const noCountry = science.orgs.filter((o) => !COUNTRIES.includes(o.country))
if (noCountry.length) throw new Error(`science: no country for ${noCountry.map((o) => `${o.kind} ${o.n} "${o.country}"`).join('; ')}`)
const noCodes = unis.filter((o) => o.codes.length === 0)
if (noCodes.length) throw new Error(`science: universities without directions: ${noCodes.map((o) => o.n).join(', ')}`)
const unknown = [...new Set(unis.flatMap((o) => o.codes).filter((c) => !known.has(c)))]

writeFileSync(
  'src/content/lists.internship.generated.ts',
  `// Generated by scripts/import-platform-lists.mjs — do not edit by hand.
// A verbatim snapshot of the official internship specialty list, taken on ${today}.
import type { InternshipSpecialty } from './lists'

export const INTERNSHIP_TAKEN_ON = '${today}'

export const INTERNSHIP_SPECIALTIES: InternshipSpecialty[] = [
${internship.map((r) => `  { n: ${r.n}, direction: ${q(r.direction)}, group: ${q(r.group)}, name: ${q(r.name)}, code: ${q(r.code)} },`).join('\n')}
]
`,
)

writeFileSync(
  'src/content/lists.science.generated.ts',
  `// Generated by scripts/import-platform-lists.mjs — do not edit by hand.
// A verbatim snapshot of the official list of organisations for scientific internships,
// with the research directions each takes, taken on ${today}.
import type { ScienceArea, ScienceDirection, ScienceOrg } from './lists'

export const SCIENCE_TAKEN_ON = '${today}'

export const SCIENCE_AREAS: ScienceArea[] = [
${science.areas.map((a) => `  { code: ${q(a.code)}, name: ${q(a.name)} },`).join('\n')}
]

export const SCIENCE_DIRECTIONS: ScienceDirection[] = [
${science.directions.map((d) => `  { code: ${q(d.code)}, name: ${q(d.name)} },`).join('\n')}
]

/** Universities list the directions they take; centres take every direction (codes empty). */
export const SCIENCE_ORGS: ScienceOrg[] = [
${science.orgs.map((o) => `  { kind: '${o.kind}', n: ${o.n}, name: ${q(o.name)}, country: ${q(o.country)}, codes: [${o.codes.map(q).join(', ')}] },`).join('\n')}
]
`,
)

console.log(
  `internship specialties: ${internship.length}; science: ${unis.length} universities, ${science.orgs.length - unis.length} centres, ${science.directions.length} directions in ${science.areas.length} areas` +
    (unknown.length ? ` (codes not in the directions list: ${unknown.join(', ')})` : ''),
)
