/** RFC 4180 cell: quote when the value carries a delimiter, a quote or a line break. */
function cell(v: unknown): string {
  const s = v == null ? '' : String(v)
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** CSV with a BOM so Excel opens Cyrillic correctly, and CRLF line ends. */
export function toCsv(head: string[], rows: unknown[][]): string {
  const lines = [head.map(cell).join(','), ...rows.map((r) => r.map(cell).join(','))]
  return '﻿' + lines.join('\r\n') + '\r\n'
}

export function downloadText(text: string, filename: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
