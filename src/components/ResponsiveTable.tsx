import type { ReactNode } from 'react'
import s from './ResponsiveTable.module.css'

export interface ResponsiveRow {
  key: string
  cells: ReactNode[]
  className?: string
}

/**
 * A table on a wide screen, a stack of cards on a phone – the way the requirements matrix
 * does it. Nothing scrolls sideways: each row becomes a card titled by its first cell, with
 * every other cell under its column heading.
 */
export function ResponsiveTable({
  label,
  head,
  rows,
  wrapClassName,
  tableClassName,
  thClassName,
  tdClassName,
}: {
  label: string
  head: ReactNode[]
  rows: ResponsiveRow[]
  wrapClassName: string
  tableClassName: string
  thClassName?: (column: number) => string
  tdClassName?: (column: number) => string
}) {
  return (
    <>
      <div className={[wrapClassName, s.wide].join(' ')} tabIndex={0} role="region" aria-label={label}>
        <table className={tableClassName}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={i} className={thClassName?.(i) ?? ''}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className={row.className ?? ''}>
                {row.cells.map((cell, i) => (
                  <td key={i} className={tdClassName?.(i) ?? ''}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={s.cards} aria-label={label}>
        {rows.map((row) => (
          <li key={row.key} className={[s.card, row.className ?? ''].join(' ')}>
            <span className={s.cardTitle}>{row.cells[0]}</span>
            <dl className={s.cardRows}>
              {head.slice(1).map((h, i) => (
                <div key={i} className={s.cardRow}>
                  <dt>{h}</dt>
                  <dd className={tdClassName?.(i + 1) ?? ''}>{row.cells[i + 1]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
