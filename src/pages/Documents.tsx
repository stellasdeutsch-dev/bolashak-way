import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router'
import { IconCheck as Check, IconDownload as Download, IconFileSignature as FileSignature } from '@/components/icons'
import { getCategory, WORKER_GROUPS } from '@/content/categories'
import { platformForTrack } from '@/content/platforms'
import type { Profile } from '@/content/types'
import { localIso } from '@/domain/dates'
import { formatDate } from '@/i18n'
import { getStageFor } from '@/domain/resolve'
import { getSource } from '@/content/sources'
import { documentsFor, isDocAuto } from '@/domain/documents'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Card, ProgressRing } from '@/components/ui'
import { AllForms } from '@/components/Forms'
import { StepBar } from '@/components/Meter'
import { announce } from '@/components/announce'
import s from './Documents.module.css'

export function Documents() {
  const { t, c, locale } = useI18n()
  const navigate = useNavigate()
  const profile = useAppStore((st) => st.profile)
  const documentsDone = useAppStore((st) => st.documentsDone)
  const toggleDocument = useAppStore((st) => st.toggleDocument)
  const [onlyRemaining, setOnlyRemaining] = useState(false)
  const [justTicked, setJustTicked] = useState<string | null>(null)
  usePageChrome(t('nav.documents'))

  useEffect(() => {
    if (!profile) navigate('/', { replace: true })
  }, [profile, navigate])

  // The print sheet is only used when printed from the button; Ctrl+P keeps the page.
  useEffect(() => {
    const done = () => delete document.documentElement.dataset.print
    window.addEventListener('afterprint', done)
    return () => {
      window.removeEventListener('afterprint', done)
      done()
    }
  }, [])
  const savePdf = () => {
    document.documentElement.dataset.print = 'documents'
    window.print()
  }

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
        <span className={s.filtersSpacer} />
        <button type="button" className={s.pdfBtn} onClick={savePdf}>
          <Download size={15} aria-hidden="true" />
          {t('documents.savePdf')}
        </button>
      </div>

      {visible.length === 0 && (
        <Card>
          <p className={s.empty}>{t('documents.empty')}</p>
        </Card>
      )}

      {visible.map((group, idx) => {
        const stage = getStageFor(group.stage, profile.track)
        const groupDone = group.items.filter((d) => isDone(d.id, isDocAuto(d, profile))).length
        return (
          <Card key={group.stage}>
            <div className={s.group}>
              <div className={s.groupHead}>
                <span className={s.groupNum}>{String(idx + 1).padStart(2, '0')}</span>
                <h2 className={s.groupTitle}>{stage ? c(stage.title) : group.stage}</h2>
                <span className={s.groupSpacer} />
                <span className={s.groupProgress}>
                  <span className={[s.groupCount, groupDone === group.items.length ? s.groupCountDone : ''].join(' ')}>
                    {t('roadmap.chapterProgress', { done: groupDone, total: group.items.length })}
                  </span>
                  <StepBar done={groupDone} total={group.items.length} />
                </span>
              </div>
              {group.items.map((d) => {
                const auto = isDocAuto(d, profile)
                const done = isDone(d.id, auto)
                return (
                  <div key={d.id} className={[s.row, done ? s.rowDone : '', auto ? s.rowOff : ''].join(' ')}>
                    <button
                      type="button"
                      className={s.hit}
                      role="checkbox"
                      aria-checked={done}
                      aria-disabled={auto}
                      aria-label={c(d.title)}
                      onClick={() => {
                        if (auto) return
                        toggleDocument(d.id)
                        setJustTicked(done ? null : d.id)
                        announce(`${doneCount + (done ? -1 : 1)} / ${all.length} ${t('documents.collected')}`)
                      }}
                    />
                    <span className={[s.box, done ? s.boxDone : '', done && justTicked === d.id ? s.boxJust : ''].join(' ')} aria-hidden="true">
                      <Check size={15} strokeWidth={3} />
                    </span>
                    <span>
                      <span className={s.docTitle} aria-hidden="true">{c(d.title)}</span>
                      {d.note && <span className={s.docNote}>{c(d.note)}</span>}
                      {auto && <span className={s.docNote}>{t('roadmap.autoDone')}</span>}
                      <span className={s.docLinks}>
                        {d.form && (
                          <a href={getSource(d.form).url} target="_blank" rel="noopener noreferrer" className={s.above}>
                            <Download size={13} aria-hidden="true" />
                            {t('documents.form')}
                          </a>
                        )}
                        {d.source && (
                          <a href={getSource(d.source).url} target="_blank" rel="noopener noreferrer" className={s.above}>
                            {getSource(d.source).org}
                          </a>
                        )}
                      </span>
                    </span>
                  </div>
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

      {createPortal(
        <PrintSheet
          profile={profile}
          missing={all.filter((d) => !isDone(d.id, isDocAuto(d, profile))).map((d) => c(d.title))}
          have={all.filter((d) => isDone(d.id, isDocAuto(d, profile))).map((d) => c(d.title))}
          date={formatDate(localIso(new Date()), locale)}
        />,
        document.body,
      )}
    </div>
  )
}

/**
 * The paper version: programme and direction, what is still missing, then what is there,
 * the date and where the list came from. Rendered outside the app, hidden on screen, and
 * printed alone only when the reader asks for it with the button.
 */
function PrintSheet({ profile, missing, have, date }: { profile: Profile; missing: string[]; have: string[]; date: string }) {
  const { t, c } = useI18n()
  const category = getCategory(profile.category)
  const group = profile.workerGroup ? WORKER_GROUPS.find((g) => g.id === profile.workerGroup) : null
  const direction = [c(category.short ?? category.title), group ? c(group.title) : ''].filter(Boolean).join(' · ')
  const address = `${window.location.origin}${window.location.pathname}${window.location.hash}`
  const list = (title: string, items: string[], mark: string) => (
    <section className={s.sheetPart}>
      <h2 className={s.sheetPartTitle}>
        {title} · {items.length}
      </h2>
      {items.length > 0 && (
        <ol className={s.sheetList}>
          {items.map((name, i) => (
            <li key={i}>
              <span aria-hidden="true">{mark} </span>
              {name}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
  return (
    <div className={s.sheet} data-testid="documents-print">
      <h1 className={s.sheetTitle}>{t('documents.printTitle')}</h1>
      <dl className={s.sheetMeta}>
        <dt>{t('documents.printProgramme')}</dt>
        <dd>{c(platformForTrack(profile.track).name)}</dd>
        <dt>{t('documents.printDirection')}</dt>
        <dd>{direction}</dd>
        <dt>{t('documents.printDate')}</dt>
        <dd>{date}</dd>
      </dl>
      {list(t('documents.printMissing'), missing, '☐')}
      {list(t('documents.printHave'), have, '☑')}
      <p className={s.sheetFoot}>
        Bolashak Way · {t('documents.printAddress')}: {address}
      </p>
    </div>
  )
}
