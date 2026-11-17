import { useEffect, useState, type InputHTMLAttributes } from 'react'
import { isPlausibleDate } from '@/domain/dates'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange' | 'onBlur' | 'onKeyDown'> & {
  value: string
  /** Called with a whole date only; with '' on leaving an emptied field when `clearable`. */
  onCommit: (iso: string) => void
  clearable?: boolean
}

/**
 * A date input that saves what the reader meant, not every keystroke. The field keeps its
 * own text while a date is typed and hands over only a whole, plausible date; leaving it
 * half-typed puts the saved date back.
 */
export function DateField({ value, onCommit, clearable = false, ...rest }: Props) {
  const [draft, setDraft] = useState(value)
  useEffect(() => setDraft(value), [value])

  const settle = () => {
    if (isPlausibleDate(draft)) {
      if (draft !== value) onCommit(draft)
    } else if (draft === '' && clearable && value !== '') onCommit('')
    else setDraft(value)
  }

  return (
    <input
      {...rest}
      type="date"
      value={draft}
      onChange={(e) => {
        const next = e.target.value
        setDraft(next)
        if (isPlausibleDate(next) && next !== value) onCommit(next)
      }}
      onBlur={settle}
      onKeyDown={(e) => {
        if (e.key === 'Enter') settle()
      }}
    />
  )
}
