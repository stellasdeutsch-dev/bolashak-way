import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Button, Callout, Card, Pill, ProgressRing } from '@/components/ui'
import { StepBar } from '@/components/Meter'
import { IconDownload as Download } from '@/components/icons'
import { CHAPTERS } from '@/content/stages'
import { CONTENT_META } from '@/content/meta'
import type { DateKey } from '@/content/types'
import { computeProgress } from '@/domain/progress'
import { computeDeadlines } from '@/domain/deadlines'
import { documentsFor, isDocAuto } from '@/domain/documents'
import { downloadSnapshot } from '@/domain/exportImport'
import { useI18n } from '@/i18n'
import { fetchUser, type AdminClient } from '@/cloud/queries'
import { snapshotFromRow } from '@/cloud/sync'
import { useAdminData } from './useAdminData'
import { categoryLabel, chapterLabel, fmtDate } from './labels'
import s from './admin.module.css'

export function AdminUser() {
  const { id = '' } = useParams()
  const { t, c, locale } = useI18n()
  const load = useCallback((client: AdminClient) => fetchUser(client, id), [id])
  const { data, error } = useAdminData(load)
  const [showNotes, setShowNotes] = useState(false)

  if (error) return <p className={s.error}>{t('admin.loadError')}: {error}</p>
  if (!data) return <p className={s.empty}>{t('admin.loading')}</p>

  const { profile, row } = data
  const newer = row ? row.schema_version > CONTENT_META.schemaVersion : false
  const snapshot = row && !newer ? snapshotFromRow(row) : null
  const progress = snapshot?.profile ? computeProgress({ profile: snapshot.profile, checked: snapshot.checked, stagesDone: snapshot.stagesDone }) : null
  const deadlines = snapshot?.profile ? computeDeadlines(snapshot.profile, snapshot.dates, new Date()) : []
  const notes = snapshot ? Object.entries(snapshot.notes).filter(([, v]) => v.trim()) : []

  return (
    <>
      <Card>
        <div className={s.section}>
          <div className={s.row}>
            <Link to="/admin/users" className={s.emailLink}>
              ← {t('admin.users')}
            </Link>
            <Pill>{t('admin.readOnly')}</Pill>
          </div>
          <h2 className={s.title}>{profile.email || profile.id}</h2>
          <dl className={s.kv}>
            <dt>{t('admin.colRole')}</dt>
            <dd>{t(profile.role === 'admin' ? 'account.roleAdmin' : 'account.roleUser')}</dd>
            <dt>{t('admin.colSignedUp')}</dt>
            <dd>{fmtDate(profile.created_at, locale, true)}</dd>
            <dt>{t('admin.colActivity')}</dt>
            <dd>{fmtDate(row?.updated_at, locale, true)}</dd>
            <dt>{t('admin.colCategory')}</dt>
            <dd>{categoryLabel(row?.category ?? null, locale)}</dd>
          </dl>
          {newer && <Callout tone="warn">{t('admin.newerSchema')}</Callout>}
          {!row && <p className={s.empty}>{t('admin.noRoadmapYet')}</p>}
          {snapshot && (
            <div className={s.row}>
              <Button size="sm" variant="ghost" onClick={() => downloadSnapshot(snapshot)}>
                <Download size={15} aria-hidden="true" />
                {t('admin.downloadSnapshot')}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {progress && snapshot?.profile && (
        <>
          <Card>
            <div className={s.section}>
              <span className={s.sectionTitle}>{t('admin.stages')}</span>
              <div className={s.row}>
                <ProgressRing value={progress.ratio} size={64} stroke={7} />
                <span>
                  {t('roadmap.chapterProgress', { done: progress.doneStages, total: progress.totalStages })}
                </span>
              </div>
              {CHAPTERS.map((ch) => {
                const stages = progress.stages.filter((st) => st.stage.chapter === ch.id)
                if (stages.length === 0) return null
                const done = stages.filter((st) => st.status === 'done').length
                return (
                  <div key={ch.id} className={s.section}>
                    <div className={s.row}>
                      <b>{chapterLabel(ch.id, locale)}</b>
                      <StepBar done={done} total={stages.length} />
                    </div>
                    <div className={s.stageList}>
                      {stages.map((st) => (
                        <div key={st.stage.id}>
                          <div className={s.stageRow}>
                            <b>{c(st.stage.title)}</b>
                            <span className={st.status === 'done' ? s.stageDone : s.muted}>
                              {st.status === 'done' ? t('roadmap.doneState') : `${st.requiredDone}/${st.requiredTotal}`}
                            </span>
                          </div>
                          {st.status !== 'done' && st.items.length > 0 && (
                            <ul className={s.itemList}>
                              {st.items.map(({ item, done: d }) => (
                                <li key={item.id} className={d ? s.itemDone : ''}>
                                  {c(item.text)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <div className={s.section}>
              <span className={s.sectionTitle}>{t('admin.documents')}</span>
              {documentsFor(snapshot.profile).map((g) => (
                <ul key={g.stage} className={s.itemList} style={{ marginLeft: 0 }}>
                  {g.items.map((d) => {
                    const done = snapshot.documentsDone.includes(d.id) || isDocAuto(d, snapshot.profile!)
                    return (
                      <li key={d.id} className={done ? s.itemDone : ''}>
                        {done ? '✓ ' : '○ '}
                        {c(d.title)}
                      </li>
                    )
                  })}
                </ul>
              ))}
            </div>
          </Card>

          <Card>
            <div className={s.section}>
              <span className={s.sectionTitle}>{t('admin.dates')}</span>
              {Object.keys(snapshot.dates).length === 0 && deadlines.length === 0 ? (
                <p className={s.empty}>{t('admin.noData')}</p>
              ) : (
                <dl className={s.kv}>
                  {(Object.entries(snapshot.dates) as [DateKey, string][]).map(([k, v]) => (
                    <span key={k} style={{ display: 'contents' }}>
                      <dt>{t(`deadlines.${k}`)}</dt>
                      <dd>{fmtDate(v, locale)}</dd>
                    </span>
                  ))}
                  {deadlines.map((d) => (
                    <span key={d.rule.id + (d.occurrence ?? '')} style={{ display: 'contents' }}>
                      <dt>{c(d.rule.label)}</dt>
                      <dd>
                        {fmtDate(d.due, locale)}{' '}
                        <span className={s.muted}>({d.status === 'overdue' ? t('deadlines.overdue', { n: -d.daysLeft }) : t('deadlines.daysLeft', { n: d.daysLeft })})</span>
                      </dd>
                    </span>
                  ))}
                </dl>
              )}
            </div>
          </Card>

          <Card>
            <div className={s.section}>
              <span className={s.sectionTitle}>{t('admin.notes')}</span>
              {notes.length === 0 ? (
                <p className={s.empty}>{t('admin.noData')}</p>
              ) : (
                <>
                  <p className={s.meta}>{t('admin.notesWarning')}</p>
                  <div className={s.row}>
                    <Button size="sm" variant="secondary" onClick={() => setShowNotes((v) => !v)}>
                      {t(showNotes ? 'admin.hideNotes' : 'admin.showNotes')}
                    </Button>
                  </div>
                  {showNotes && (
                    <div className={s.notes}>
                      {notes.map(([stage, text]) => (
                        <div key={stage} className={s.note}>
                          <b>{stage}</b>
                          {text}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </>
  )
}
