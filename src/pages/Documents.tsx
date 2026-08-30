import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { IconCheck as Check, IconDownload as Download, IconFileSignature as FileSignature, IconFileStack as FileStack } from '@/components/icons'
import { getStage } from '@/content/stages'
import { getSource } from '@/content/sources'
import { documentsFor, isDocAuto } from '@/domain/documents'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Card, Pill, ProgressRing } from '@/components/ui'
import { AllForms } from '@/components/Forms'
import s from './Documents.module.css'

export function Documents() {
  const { t, c } = useI18n()
  const navigate = useNavigate()
  const profile = useAppStore((st) => st.profile)
  const documentsDone = useAppStore((st) => st.documentsDone)
  const toggleDocument = useAppStore((st) => st.toggleDocument)
  const [onlyRemaining, setOnlyRemaining] = useState(false)
  usePageChrome(t('nav.documents'))

  useEffect(() => {
    if (!profile) navigate('/onboarding', { replace: true })
  }, [profile, navigate])

  const groups = useMemo(() => (profile ? documentsFor(profile) : []), [profile])
  if (!profile) return null

  const isDone = (id: string, auto: boolean) => auto || documentsDone.includes(id)
  const all = groups.flatMap((g) => g.items)
  const doneCount = all.filter((d) => isDone(d.id, isDocAuto(d, profile))).length
  const visible = groups
    .map((g) => ({ ...g, items: onlyRemaining ? g.items.filter((d) => !isDone(d.id, isDocAuto(d, profile))) : g.items }))
    .filter((g) => g.items.length > 0)

  return (
    <div className={s.page}>
      <Card className={s.head}>
        <div className={s.headText}>
          <Pill tone="accent">
            <FileStack size={13} aria-hidden="true" />
            {t('documents.kicker')}
          </Pill>
          <h1 className={`display ${s.title}`}>
            {doneCount} / {all.length} {t('documents.collected')}
            <b>{t('documents.title')}</b>
          </h1>
        </div>
        <ProgressRing value={all.length ? doneCount / all.length : 0} size={82} stroke={8} />
      </Card>

      <div className={s.filters}>
        <button className={[s.filter, !onlyRemaining ? s.filterActive : ''].join(' ')} onClick={() => setOnlyRemaining(false)} aria-pressed={!onlyRemaining}>
          {t('common.all')} · {all.length}
        </button>
        <button className={[s.filter, onlyRemaining ? s.filterActive : ''].join(' ')} onClick={() => setOnlyRemaining(true)} aria-pressed={onlyRemaining}>
          {t('documents.remaining')} · {all.length - doneCount}
        </button>
      </div>

      {visible.length === 0 && (
        <Card>
          <p className={s.empty}>{t('documents.empty')}</p>
        </Card>
      )}

      {visible.map((group, idx) => {
        const stage = getStage(group.stage)
        const groupDone = group.items.filter((d) => isDone(d.id, isDocAuto(d, profile))).length
        return (
          <Card key={group.stage}>
            <div className={s.group}>
              <div className={s.groupHead}>
                <span className={s.groupNum}>{String(idx + 1).padStart(2, '0')}</span>
                <h2 className={s.groupTitle}>{stage ? c(stage.title) : group.stage}</h2>
                <span className={s.groupSpacer} />
                <span className={[s.groupCount, groupDone === group.items.length ? s.groupCountDone : ''].join(' ')}>
                  {t('roadmap.chapterProgress', { done: groupDone, total: group.items.length })}
                </span>
              </div>
              {group.items.map((d) => {
                const auto = isDocAuto(d, profile)
                const done = isDone(d.id, auto)
                return (
                  <button
                    key={d.id}
                    className={[s.row, done ? s.rowDone : ''].join(' ')}
                    onClick={() => !auto && toggleDocument(d.id)}
                    aria-pressed={done}
                    disabled={auto}
                  >
                    <span className={[s.box, done ? s.boxDone : ''].join(' ')}>
                      <Check size={15} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <span className={s.docTitle}>{c(d.title)}</span>
                      {d.note && <span className={s.docNote}>{c(d.note)}</span>}
                      {auto && <span className={s.docNote}>{t('roadmap.autoDone')}</span>}
                      <span className={s.docLinks}>
                        {d.form && (
                          <a
                            href={getSource(d.form).url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                          >
                            <Download size={12} aria-hidden="true" />
                            {t('documents.form')}
                          </a>
                        )}
                        {d.source && (
                          <a href={getSource(d.source).url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            {getSource(d.source).org}
                          </a>
                        )}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>
        )
      })}

      {/* Every official blank on this profile's path, so nobody has to hunt them stage by stage. */}
      <Card>
        <div className={s.formsHead}>
          <FileSignature size={19} aria-hidden="true" />
          <h2 className={s.formsTitle}>{t('forms.allTitle')}</h2>
        </div>
        <AllForms />
      </Card>
    </div>
  )
}
