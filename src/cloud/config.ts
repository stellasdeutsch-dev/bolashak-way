/**
 * Constants the cloud build differs by. Everything here is deliberately distinct from the
 * classic build: both are served from the same origin (github.io), and localStorage is
 * per origin, so identical keys would make the two apps overwrite each other's state.
 */

/** Where the cloud build is published; also the PKCE redirect target. */
export const CLOUD_URL = 'https://stellasdeutsch-dev.github.io/bolashak-way/cloud/'

export const STORE_KEY = 'bolashak-way-cloud'
export const AUTH_STORAGE_KEY = 'bolashak-way-cloud-auth'
export const SYNC_STORE_KEY = 'bolashak-way-cloud-sync'

/** The classic build's storage key, read once to offer a one-time import. */
export const LEGACY_STORE_KEY = 'bolashak-way'

/** Redirect target for magic links and confirmation mails. Dev stays on localhost. */
export function authRedirectTarget(): string {
  if (import.meta.env.DEV && typeof location !== 'undefined') return `${location.origin}/`
  return CLOUD_URL
}
