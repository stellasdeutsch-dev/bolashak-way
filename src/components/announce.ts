import { create } from 'zustand'

/**
 * One polite live region for the whole app (rendered in the Layout). A tick changes a
 * counter somewhere on the page; screen readers only hear it when it is said here.
 */
export const useAnnouncer = create<{ message: string; seq: number }>(() => ({ message: '', seq: 0 }))

export function announce(message: string) {
  // The same sentence twice in a row is not re-read unless the text changes, so alternate
  // an invisible trailing space.
  useAnnouncer.setState((st) => ({ message: st.seq % 2 ? message : `${message} `, seq: st.seq + 1 }))
}
