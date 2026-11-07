import { create } from 'zustand'

/**
 * A new version of the app is waiting in the service worker. The page never reloads by
 * itself – the reader might be in the middle of a long stage – it offers the update and
 * applies it on the reader's click.
 */
export const useUpdate = create<{ apply: (() => void) | null }>(() => ({ apply: null }))
