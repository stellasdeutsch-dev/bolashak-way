import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Download, Mail, Phone, RotateCcw, Trash2, Upload, UserCog } from 'lucide-react'
import { CATEGORIES, WORKER_GROUPS } from '@/content/categories'
import { CONTENT_META } from '@/content/meta'
import { SOURCES } from '@/content/sources'
import { buildSnapshot, downloadSnapshot, parseSnapshot } from '@/domain/exportImport'
import { useAppStore, type ThemePref } from '@/store/useAppStore'
import { LOCALES, useI18n } from '@/i18n'
import { Button, Card, ConfirmDialog, Pill, SourceLink } from '@/components/ui'
import s from './Settings.module.css'

export function Settings() {
  const { t, c } = useI18n()
  const navigate = useNavigate()
  const state = useAppStore()
  const [confirmReset, setConfirmReset] = useState(false)
  const [importStatus, setImportStatus] = useState<'ok' | 'fail' | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const category = state.profile ? CATEGORIES[state.profile.category] : null
  const workerGroup = useMemo(() => WORKER_GROUPS.find((g) => g.id === state.profile?.workerGroup), [state.profile])

  const doExport = () => {
    downloadSnapshot(
      buildSnapshot(
        {
          profile: state.profile,
          onboardedAt: state.onboardedAt,
          checked: state.checked,
          stagesDone: state.stagesDone,
          documentsDone: state.documentsDone,
          notes: state.notes,
          dates: state.dates,
        },
        new Date().toISOString(),
      ),
    )
  }

  const doImport = async (file: File) => {
    const parsed = parseSnapshot(await file.text())
    if (!parsed) return setImportStatus('fail')
    state.hydrateFrom(parsed)
    setImportStatus('ok')
  }

  const themes: { id: ThemePref; label: string }[] = [
    { id: 'system', label: t('settings.themeSystem') },
    { id: 'light', label: t('settings.themeLight') },
    { id: 'dark', label: t('settings.themeDark') },
  ]

  return (
    <div className={s.page}>
      <Card>
        <h1 className={`display ${s.title}`}>
          Bolashak Way
          <b>{t('settings.title')}</b>
        </h1>
      </Card>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('settings.language')}</span>
          <div className={s.segmented}>
            {LOCALES.map((l) => (
              <button
                key={l.id}
                className={[s.segment, state.locale === l.id ? s.segmentActive : ''].join(' ')}
                onClick={() => state.setLocale(l.id)}
                aria-pressed={state.locale === l.id}
              >
                {l.native}
              </button>
            ))}
          </div>

          <span className={s.sectionTitle} style={{ marginTop: 12 }}>
            {t('settings.theme')}
          </span>
          <div className={s.segmented}>
            {themes.map((th) => (
              <button
                key={th.id}
                className={[s.segment, state.theme === th.id ? s.segmentActive : ''].join(' ')}
                onClick={() => state.setTheme(th.id)}
                aria-pressed={state.theme === th.id}
              >
                {th.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {state.profile && category && (
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('settings.profile')}</span>
            <div className={s.profileGrid}>
              <div className={s.profileRow}>
                <span className={s.profileKey}>{t('onboarding.q1')}</span>
                <span className={s.profileVal}>{c(category.title)}</span>
              </div>
              {workerGroup && (
                <div className={s.profileRow}>
                  <span className={s.profileKey}>{t('category.workerGroup')}</span>
                  <span className={s.profileVal}>{c(workerGroup.title)}</span>
                </div>
              )}
              <div className={s.profileRow}>
                <span className={s.profileKey}>{t('onboarding.q2')}</span>
                <span className={s.profileVal}>
                  {state.profile.invitation === 'unconditional'
                    ? t('onboarding.inv_yes')
                    : state.profile.invitation === 'applied'
                      ? t('onboarding.inv_applied')
                      : t('onboarding.inv_none')}
                </span>
              </div>
              <div className={s.profileRow}>
                <span className={s.profileKey}>{t('onboarding.q3foreign')}</span>
                <span className={s.profileVal}>
                  {state.profile.foreignCert ? `${t(`exams.${state.profile.foreignCert.exam}`)} · ${state.profile.foreignCert.score}` : t('onboarding.noCert')}
                </span>
              </div>
              <div className={s.profileRow}>
                <span className={s.profileKey}>{t('onboarding.q3kazakh')}</span>
                <span className={s.profileVal}>{state.profile.kazakhCert ? t('common.yes') : t('common.no')}</span>
              </div>
              <div className={s.profileRow}>
                <span className={s.profileKey}>{t('onboarding.q4')}</span>
                <span className={s.profileVal}>
                  {state.profile.experience
                    ? `${state.profile.experience.years} / ${state.profile.experience.continuousMonths} ${t('common.months')}`
                    : t('onboarding.noExp')}
                </span>
              </div>
            </div>
            <div className={s.row}>
              <Button variant="ghost" onClick={() => navigate('/onboarding?edit=1')}>
                <UserCog size={16} aria-hidden="true" />
                {t('settings.editProfile')}
              </Button>
            </div>
            <p className={s.hint}>{t('onboarding.editNote')}</p>
          </div>
        </Card>
      )}

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('settings.data')}</span>
          <div className={s.row}>
            <Button variant="ghost" onClick={doExport}>
              <Download size={16} aria-hidden="true" />
              {t('settings.export')}
            </Button>
            <Button variant="ghost" onClick={() => fileRef.current?.click()}>
              <Upload size={16} aria-hidden="true" />
              {t('settings.import')}
            </Button>
            <input
              ref={fileRef}
              className={s.fileInput}
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void doImport(f)
                e.target.value = ''
              }}
            />
            {importStatus && (
              <span className={[s.status, importStatus === 'ok' ? s.statusOk : s.statusFail].join(' ')}>
                {importStatus === 'ok' ? t('settings.importOk') : t('settings.importFail')}
              </span>
            )}
          </div>
          <p className={s.hint}>{t('settings.exportHint')}</p>
          <div className={s.row}>
            <Button variant="danger" onClick={() => setConfirmReset(true)}>
              <Trash2 size={16} aria-hidden="true" />
              {t('settings.reset')}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('settings.about')}</span>
          <div className={s.row}>
            <Pill>
              {t('common.year')}: {CONTENT_META.competitionYear}
            </Pill>
            <Pill>
              {t('common.verifiedOn')}: {CONTENT_META.lastVerified}
            </Pill>
          </div>
          <p className={s.body}>{c(CONTENT_META.disclaimer)}</p>
          <p className={s.body}>{t('settings.aboutText')}</p>

          <span className={s.sectionTitle} style={{ marginTop: 10 }}>
            {t('settings.contacts')}
          </span>
          <div className={s.row}>
            <a href={`mailto:${CONTENT_META.contacts.email}`} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 14 }}>
              <Mail size={15} aria-hidden="true" />
              {CONTENT_META.contacts.email}
            </a>
            <a href={`tel:${CONTENT_META.contacts.phone.replace(/[^+\d]/g, '')}`} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 14 }}>
              <Phone size={15} aria-hidden="true" />
              {CONTENT_META.contacts.phone}
            </a>
          </div>
          <p className={s.hint}>{c(CONTENT_META.contacts.address)}</p>

          <span className={s.sectionTitle} style={{ marginTop: 10 }}>
            {t('common.sources')}
          </span>
          <div className={s.sourceList}>
            {Object.keys(SOURCES).map((id) => (
              <SourceLink key={id} id={id} />
            ))}
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmReset}
        title={t('settings.resetTitle')}
        text={t('settings.resetText')}
        confirmLabel={t('settings.resetConfirm')}
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          state.reset()
          setConfirmReset(false)
          navigate('/onboarding', { replace: true })
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <Button variant="quiet" size="sm" onClick={() => navigate('/')}>
          <RotateCcw size={14} aria-hidden="true" />
          {t('common.toRoadmap')}
        </Button>
      </div>
    </div>
  )
}
