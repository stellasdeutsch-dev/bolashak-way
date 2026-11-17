import { useEffect, useState } from 'react'
import { localIso } from '@/domain/dates'

/**
 * The reader's calendar date, kept current: a tab left open overnight moves to the new
 * day at midnight, and on coming back to the tab, so "N days left" never shows yesterday's
 * count.
 */
export function useToday(): string {
  const [today, setToday] = useState(() => localIso(new Date()))
  useEffect(() => {
    const check = () => setToday(localIso(new Date()))
    const now = new Date()
    const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime()
    const timer = window.setTimeout(check, msToMidnight + 1000)
    document.addEventListener('visibilitychange', check)
    window.addEventListener('focus', check)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('focus', check)
    }
  }, [today])
  return today
}
