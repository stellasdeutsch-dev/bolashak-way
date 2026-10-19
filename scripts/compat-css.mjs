/**
 * One-off pass that adds what older Safari, Firefox and Edge need next to the modern
 * declarations the stylesheets use: -webkit-backdrop-filter (Safari < 18), a vh line in
 * front of every dvh one (iOS < 15.4), and a plain fallback in front of color-mix()
 * (Safari < 16.2, Firefox < 113). Idempotent: lines already paired are left alone.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const files = execSync("find src -name '*.css'", { encoding: 'utf8' }).trim().split('\n')
let changed = 0
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n')
  const out = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const prev = out[out.length - 1] ?? ''
    const indent = line.match(/^\s*/)[0]
    let m
    if ((m = line.match(/^\s*backdrop-filter:\s*(.+);\s*$/)) && !/-webkit-backdrop-filter/.test(prev)) {
      out.push(`${indent}-webkit-backdrop-filter: ${m[1]};`)
    }
    if (/\ddvh\b/.test(line) && (m = line.match(/^\s*([\w-]+):\s*(.+);\s*$/)) && !prev.includes(`${m[1]}:`)) {
      out.push(`${indent}${m[1]}: ${m[2].replace(/dvh/g, 'vh')};`)
    }
    if ((m = line.match(/^\s*([\w-]+):\s*color-mix\(in srgb,\s*([^\s,]+(?:\([^)]*\))?)/)) && !prev.trim().startsWith(`${m[1]}:`)) {
      out.push(`${indent}${m[1]}: ${m[2]};`)
    }
    out.push(line)
  }
  const next = out.join('\n')
  if (next !== lines.join('\n')) {
    writeFileSync(f, next)
    changed++
  }
}
console.log(`compat pass: ${changed} files updated`)
