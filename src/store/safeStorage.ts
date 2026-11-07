import { create } from 'zustand'
import type { StateStorage } from 'zustand/middleware'

/**
 * Whether the last write to localStorage failed. The quota is shared with every other
 * site on the same origin, so it can run out through no fault of ours – and the reader
 * must hear about it instead of losing ticks and notes on the next reload.
 */
export const useSaveStatus = create<{ failed: boolean }>(() => ({ failed: false }))

/** localStorage that never throws: a failed write is reported through useSaveStatus. */
export const safeLocalStorage = (store: () => Storage = () => localStorage): StateStorage => ({
  getItem: (name) => {
    try {
      return store().getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    try {
      store().setItem(name, value)
      if (useSaveStatus.getState().failed) useSaveStatus.setState({ failed: false })
    } catch {
      useSaveStatus.setState({ failed: true })
    }
  },
  removeItem: (name) => {
    try {
      store().removeItem(name)
    } catch {
      /* nothing to report: there was nothing to lose */
    }
  },
})
