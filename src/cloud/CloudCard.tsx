import { Link } from 'react-router'
import { Button, Callout, Card } from '@/components/ui'
import { IconDownload as Download } from '@/components/icons'
import { downloadSnapshot } from '@/domain/exportImport'
import { useI18n } from '@/i18n'
import { cloudEnabled } from './supabase'
import { useAuthStore } from './useAuth'
import { useSyncStore } from './syncStore'
import { resolveChoice, restoreBackup, syncNow } from './sync'
import { SyncBadge } from './SyncBadge'
import { ChoiceDialog } from './ChoiceDialog'
import s from './cloud.module.css'
import settings from '@/pages/Settings.module.css'

function fmt(iso: string | null, locale: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleString(locale === 'en' ? 'en-GB' : locale === 'kk' ? 'kk-KZ' : 'ru-RU', { dateStyle: 'medium', timeStyle: 'short' })
}

/** The cloud section of Settings: status, sync now, the merge question and the backup slot. */
export function CloudCard() {
  const { t, locale } = useI18n()
  const status = useAuthStore((a) => a.status)
  const email = useAuthStore((a) => a.user?.email ?? '')
  const sync = useSyncStore()
  if (!cloudEnabled) return null

  return (
    <Card>
      <div className={settings.section}>
        <span className={settings.sectionTitle}>{t('sync.title')}</span>
        {status !== 'signed-in' ? (
          <>
            <p className={settings.hint}>{t('sync.cardAnon')}</p>
            <div className={settings.row}>
              <Link to="/account">
                <Button variant="secondary">{t('account.signIn')}</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={s.who}>
              <span className={s.whoEmail}>{email}</span>
              <SyncBadge withLabel />
            </div>
            {sync.lastSavedAt && (
              <span className={s.meta}>
                {t('sync.lastSaved')}: {fmt(sync.lastSavedAt, locale)}
              </span>
            )}
            {sync.status === 'outdated' && <Callout tone="warn">{t('sync.outdated')}</Callout>}
            {sync.status === 'error' && sync.lastError && <p className={s.error}>{sync.lastError}</p>}
            <div className={settings.row}>
              <Button variant="ghost" onClick={() => void syncNow()} disabled={sync.status === 'saving' || sync.status === 'outdated'}>
                {t('sync.now')}
              </Button>
              {sync.pendingChoice && (
                <>
                  <Button variant="secondary" onClick={() => void resolveChoice('cloud')}>
                    {t('sync.chooseCloud')}
                  </Button>
                  <Button variant="secondary" onClick={() => void resolveChoice('device')}>
                    {t('sync.chooseDevice')}
                  </Button>
                </>
              )}
            </div>
            <p className={settings.hint}>{t('sync.resetNote')}</p>
          </>
        )}

        {sync.backup && (
          <Callout tone="info">
            <strong>{t('sync.backupTitle')}</strong>
            <br />
            {t('sync.backupText', { date: fmt(sync.backupAt, locale) })}
            <div className={settings.row} style={{ marginTop: 10 }}>
              <Button size="sm" variant="secondary" onClick={() => restoreBackup()}>
                {t('sync.restoreBackup')}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => sync.backup && downloadSnapshot(sync.backup)}>
                <Download size={15} aria-hidden="true" />
                {t('account.download')}
              </Button>
            </div>
          </Callout>
        )}
      </div>

      <ChoiceDialog
        open={Boolean(sync.pendingChoice) && status === 'signed-in'}
        title={t('sync.chooseTitle')}
        text={t('sync.chooseText')}
        primary={t('sync.chooseCloud')}
        secondary={t('sync.chooseDevice')}
        onPrimary={() => void resolveChoice('cloud')}
        onSecondary={() => void resolveChoice('device')}
        onDismiss={() => {}}
      />
    </Card>
  )
}
