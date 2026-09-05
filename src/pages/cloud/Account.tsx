import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Button, Card, ConfirmDialog, Pill } from '@/components/ui'
import { IconDownload as Download } from '@/components/icons'
import { buildSnapshot, downloadSnapshot } from '@/domain/exportImport'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { cloudEnabled } from '@/cloud/supabase'
import { useAuthStore } from '@/cloud/useAuth'
import { useSyncStore } from '@/cloud/syncStore'
import { SyncBadge } from '@/cloud/SyncBadge'
import { IconLogOut, IconShield } from '@/cloud/icons'
import s from '@/cloud/cloud.module.css'

const ERROR_KEYS: Record<string, string> = {
  invalid_credentials: 'account.errInvalidCredentials',
  email_not_confirmed: 'account.errNotConfirmed',
  over_email_send_rate_limit: 'account.errRate',
  over_request_rate_limit: 'account.errRate',
  weak_password: 'account.errWeak',
  user_already_exists: 'account.errExists',
  email_exists: 'account.errExists',
  network: 'account.errNetwork',
  last_admin: 'account.errLastAdmin',
}

export function Account() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const auth = useAuthStore((a) => a)
  const syncStatus = useSyncStore((st) => st.status)
  const app = useAppStore()
  usePageChrome(t('account.title'))

  const [tab, setTab] = useState<'in' | 'up'>('in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState<'clear' | 'delete' | null>(null)

  const errorText = auth.lastError ? t(ERROR_KEYS[auth.lastError] ?? 'account.errUnknown') : null
  const next = params.get('next')

  if (!cloudEnabled) {
    return (
      <div className={s.page}>
        <Card className={s.hero}>
          <h1 className={`display ${s.heroTitle}`}>{t('account.title')}</h1>
          <p className={s.lead}>{t('account.notConfigured')}</p>
        </Card>
      </div>
    )
  }

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true)
    setNotice(null)
    try {
      await fn()
    } finally {
      setBusy(false)
    }
  }

  const onSignIn = (e: FormEvent) => {
    e.preventDefault()
    void run(async () => {
      if (await auth.signIn(email, password)) navigate(next ?? '/', { replace: true })
    })
  }
  const onSignUp = (e: FormEvent) => {
    e.preventDefault()
    if (!consent) return
    void run(async () => {
      const r = await auth.signUp(email, password)
      if (r === 'confirm') setNotice(t('account.confirmSent', { email }))
      else if (r === 'signed-in') navigate(next ?? '/', { replace: true })
    })
  }
  const onMagic = () => {
    if (!email) return
    void run(async () => {
      if (await auth.signInWithMagicLink(email)) setNotice(t('account.magicLinkSent', { email }))
    })
  }

  if (auth.status === 'signed-in' && auth.user) {
    const user = auth.user
    return (
      <div className={s.page}>
        <Card className={s.hero}>
          <span className={s.meta}>{t('account.signedInAs')}</span>
          <h1 className={`display ${s.heroTitle}`}>{user.email}</h1>
          <div className={s.who} style={{ marginTop: 12 }}>
            <Pill tone={auth.role === 'admin' ? 'accent' : 'default'}>{t(auth.role === 'admin' ? 'account.roleAdmin' : 'account.roleUser')}</Pill>
            <SyncBadge withLabel />
          </div>
        </Card>

        {auth.role === 'admin' && (
          <Card dark className={s.adminCard}>
            <div>
              <b>{t('account.adminTitle')}</b>
              <span>{t('account.adminText')}</span>
            </div>
            <Link to="/admin">
              <Button>
                <IconShield size={16} />
                {t('account.openAdmin')}
              </Button>
            </Link>
          </Card>
        )}

        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('account.changePassword')}</span>
            <form
              className={s.form}
              onSubmit={(e) => {
                e.preventDefault()
                void run(async () => {
                  if (await auth.changePassword(newPassword)) {
                    setNewPassword('')
                    setNotice(t('account.passwordChanged'))
                  }
                })
              }}
            >
              <label className={s.field}>
                {t('account.newPassword')}
                <input type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <span className={s.fieldHint}>{t('account.passwordHint')}</span>
              </label>
              {notice && <p className={s.ok}>{notice}</p>}
              {errorText && <p className={s.error}>{errorText}</p>}
              <div className={s.actions}>
                <Button type="submit" variant="secondary" disabled={busy || newPassword.length < 8}>
                  {t('account.changePassword')}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('account.signOut')}</span>
            <p className={s.hint}>{t('account.signOutKeeps')}</p>
            <div className={s.actions}>
              <Button
                variant="ghost"
                onClick={() =>
                  downloadSnapshot(
                    buildSnapshot(
                      { profile: app.profile, onboardedAt: app.onboardedAt, checked: app.checked, stagesDone: app.stagesDone, documentsDone: app.documentsDone, notes: app.notes, dates: app.dates },
                      new Date().toISOString(),
                    ),
                  )
                }
              >
                <Download size={16} aria-hidden="true" />
                {t('account.download')}
              </Button>
              <Button variant="secondary" disabled={busy} onClick={() => void run(() => auth.signOut())}>
                <IconLogOut size={16} />
                {t('account.signOut')}
              </Button>
              <Button variant="quiet" disabled={busy} onClick={() => setConfirm('clear')}>
                {t('account.signOutClear')}
              </Button>
            </div>
            <div className={s.actions}>
              <Button variant="danger" size="sm" disabled={busy || syncStatus === 'saving'} onClick={() => setConfirm('delete')}>
                {t('account.deleteAccount')}
              </Button>
            </div>
          </div>
        </Card>

        <ConfirmDialog
          open={confirm === 'clear'}
          title={t('account.signOutClear')}
          text={t('account.signOutClearText')}
          confirmLabel={t('account.signOutClear')}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            setConfirm(null)
            void run(async () => {
              await auth.signOut()
              app.reset()
              navigate('/onboarding', { replace: true })
            })
          }}
        />
        <ConfirmDialog
          open={confirm === 'delete'}
          title={t('account.deleteAccount')}
          text={t('account.deleteAccountText')}
          confirmLabel={t('account.deleteAccount')}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            setConfirm(null)
            void run(async () => {
              if (await auth.deleteAccount()) navigate('/', { replace: true })
            })
          }}
        />
      </div>
    )
  }

  return (
    <div className={s.page}>
      <Card className={s.hero}>
        <h1 className={`display ${s.heroTitle}`}>{t('account.title')}</h1>
        <p className={s.lead}>{t('account.why')}</p>
      </Card>

      <Card>
        <div className={s.tabs} role="tablist">
          <button role="tab" aria-selected={tab === 'in'} className={[s.tab, tab === 'in' ? s.tabActive : ''].join(' ')} onClick={() => { setTab('in'); auth.clearError(); setNotice(null) }}>
            {t('account.signIn')}
          </button>
          <button role="tab" aria-selected={tab === 'up'} className={[s.tab, tab === 'up' ? s.tabActive : ''].join(' ')} onClick={() => { setTab('up'); auth.clearError(); setNotice(null) }}>
            {t('account.signUp')}
          </button>
        </div>

        <form className={s.form} onSubmit={tab === 'in' ? onSignIn : onSignUp}>
          <label className={s.field}>
            {t('account.email')}
            <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={s.field}>
            {t('account.password')}
            <input
              type="password"
              autoComplete={tab === 'in' ? 'current-password' : 'new-password'}
              required={tab === 'up'}
              minLength={tab === 'up' ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {tab === 'up' && <span className={s.fieldHint}>{t('account.passwordHint')}</span>}
          </label>
          {tab === 'up' && (
            <>
              <label className={s.consent}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>{t('account.consent')}</span>
              </label>
              <p className={s.privacy}>{t('account.privacy')}</p>
            </>
          )}
          {notice && <p className={s.ok}>{notice}</p>}
          {errorText && <p className={s.error}>{errorText}</p>}
          <div className={s.actions}>
            <Button type="submit" disabled={busy || (tab === 'up' && !consent)}>
              {t(tab === 'in' ? 'account.signIn' : 'account.signUp')}
            </Button>
            {tab === 'in' && (
              <button type="button" className={s.linkBtn} disabled={busy || !email} onClick={onMagic}>
                {t('account.magicLink')}
              </button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
