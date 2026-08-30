/**
 * Re-verifies every file listed in src/content/forms.ts against the server that hosts it.
 * These are other people's URLs: they get moved, renamed and replaced between competition
 * years, so this reports gone links and drift in size or publication date rather than
 * letting the app quietly offer a dead download.
 *
 *   node scripts/check-forms.mjs
 */
import { readFileSync } from 'node:fs'

const src = readFileSync(new URL('../src/content/forms.ts', import.meta.url), 'utf8')

const entries = [...src.matchAll(/id: '([^']+)',[\s\S]*?url: `([^`]+)`,\s*\n\s*bytes: (\d+),\s*\n\s*published: '([^']+)'/g)].map(
  ([, id, url, bytes, published]) => ({ id, url: url.replace('${B}', 'https://bolashak.gov.kz/storage/app/media'), bytes: Number(bytes), published }),
)

const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }

let bad = 0
console.log(`Checking ${entries.length} official files…\n`)

for (const e of entries) {
  try {
    const res = await fetch(e.url, { method: 'HEAD', redirect: 'follow' })
    const len = Number(res.headers.get('content-length') ?? 0)
    const lm = res.headers.get('last-modified') ?? ''
    const m = lm.match(/(\d{2}) (\w{3}) (\d{4})/)
    const date = m ? `${m[3]}-${MONTHS[m[2]]}-${m[1]}` : '?'
    const problems = []
    if (!res.ok) problems.push(`HTTP ${res.status}`)
    if (res.ok && len && len !== e.bytes) problems.push(`size ${e.bytes} → ${len}`)
    if (res.ok && date !== '?' && date !== e.published) problems.push(`published ${e.published} → ${date}`)
    if (problems.length) {
      bad++
      console.log(`✗ ${e.id}: ${problems.join(', ')}`)
    } else {
      console.log(`✓ ${e.id}`)
    }
  } catch (err) {
    bad++
    console.log(`✗ ${e.id}: ${err.message}`)
  }
}

console.log(`\n${entries.length - bad} ok, ${bad} need attention.`)
process.exit(bad ? 1 : 0)
