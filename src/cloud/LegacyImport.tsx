import { useMemo } from 'react'
import { Button, Callout } from '@/components/ui'
import { parseSnapshot, type Snapshot } from '@/domain/exportImport'
import { useAppStore, type AppState } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { LEGACY_STORE_KEY } from './config'
import { useSyncStore } from './syncStore'
import { isEmptySnapshot, pickUserFields } from './sync'
import { CONTENT_META } from '@/content/meta'
import s from './cloud.module.css'

/** Reads the classic build's localStorage entry through the same validator as a JSON import. */
export function readLegacySnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(LEGACY_STORE_KEY)
    if (!raw) return null
    const state = (JSON.parse(raw) as { state?: Record<string, unknown> }).state
    if (!state) return null
    const candidate = { app: 'bolashak-way', schemaVersion: CONTENT_META.schemaVersion, exportedAt: '', competitionYear: CONTENT_META.competitionYear, ...state }
    const parsed = parseSnapshot(JSON.stringify(candidate))
    return parsed && !isEmptySnapshot(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Both builds share github.io's origin, so a visitor who used the classic version has a
 * roadmap sitting one storage key away. Offer it once, on an empty device only.
 */
export function LegacyImport() {
  const { t } = useI18n()
  const done = useSyncStore((st) => st.legacyDone)
  const setSync = useSyncStore((st) => st.set)
  const hasData = useAppStore((st) => !isEmptySnapshot(pickUserFields(st)))
  const legacy = useMemo(() => (done || hasData ? null : readLegacySnapshot()), [done, hasData])
  if (!legacy) return null

  return (
    <Callout tone="info">
      <strong>{t('sync.legacyTitle')}</strong>
      <br />
      {t('sync.legacyText')}
      <div className={s.actions} style={{ marginTop: 10 }}>
        <Button
          size="sm"
          onClick={() => {
            useAppStore.getState().hydrateFrom(legacy as Partial<AppState>)
            setSync({ legacyDone: true })
          }}
        >
          {t('sync.legacyImport')}
        </Button>
        <Button size="sm" variant="quiet" onClick={() => setSync({ legacyDone: true })}>
          {t('sync.legacySkip')}
        </Button>
      </div>
    </Callout>
  )
}
