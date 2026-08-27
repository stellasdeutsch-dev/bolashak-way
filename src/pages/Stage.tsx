import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleAlert, ExternalLink, Lock, Sparkles, TriangleAlert } from 'lucide-react'
import { CHAPTERS, getStage } from '@/content/stages'
import { DOCUMENTS } from '@/content/documents'
import { faqForStage } from '@/content/faq'
import { getSource } from '@/content/sources'
import { CONTENT_META } from '@/content/meta'
import { ENGLISH_THRESHOLDS, KAZAKH_REQUIREMENT, LANGUAGE_GROUP_BY_CATEGORY, LANGUAGE_NOTES } from '@/content/language'
import { getCategory } from '@/content/categories'
import type { DateKey, FaqItem, StageId } from '@/content/types'
import { computeProgress } from '@/domain/progress'
import { computeDeadlines } from '@/domain/deadlines'
import { DEADLINE_RULES } from '@/content/deadlines'
import { evaluate, foreignThreshold, foreignCertMeets, experienceRequirement, meetsExperience } from '@/domain/applicability'
import { isDocAuto } from '@/domain/documents'
import { useAppStore } from '@/store/useAppStore'
import { useI18n, pick } from '@/i18n'
import { Button, Callout, Card, FallbackBadge, Pill, SourceLink } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import s from './Stage.module.css'

function FaqRow({ item }: { item: FaqItem }) {
  const { t, locale } = useI18n()
  const [open, setOpen] = useState(false)
  const q = pick(item.q, locale)
  const a = pick(item.a, locale)
  const statusLabel =
    item.status === 'official'
      ? t('stage.statusOfficial')
      : item.status === 'confirmed'
        ? t('stage.statusConfirmed')
        : item.status === 'partial'
          ? t('stage.statusPartial')
          : t('stage.statusUnverified')

  return (
    <div className={[s.faqItem, open ? s.faqOpen : ''].join(' ')}>
      <button className={s.faqBtn} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>
          {q.text}
          {q.fallback && <FallbackBadge />}
        </span>
        <ChevronDown size={18} className={s.faqChevron} aria-hidden="true" />
      </button>
      {open && (
        <div className={s.faqAnswer}>
          {a.text}
          <div className={s.faqTags}>
            <Pill tone={item.status === 'official' || item.status === 'confirmed' ? 'success' : 'warn'}>{statusLabel}</Pill>
            <SourceLink id={item.source} />
          </div>
        </div>
      )}
    </div>
  )
}

function LanguageTable() {
  const { t } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const group = LANGUAGE_GROUP_BY_CATEGORY[profile.category]
  if (group === 'none' || group === 'science') return null
  const rows = ENGLISH_THRESHOLDS[group]
  const th = foreignThreshold(profile)
  const meets = foreignCertMeets(profile)

  return (
    <Card>
      <div className={s.sectionTitle} style={{ marginBottom: 12 }}>
        {t('stage.thresholdTable')}
      </div>
      {profile.foreignCert && (
        <div className={s.scoreRow}>
          <Pill tone="accent">
            {t('stage.yourScore')}: {t(`exams.${profile.foreignCert.exam}`)} {profile.foreignCert.score}
          </Pill>
          {th && (
            <Pill tone={meets ? 'success' : 'warn'}>
              {meets ? t('stage.meets') : t('stage.below')}: {t('stage.threshold')} {th.need}
            </Pill>
          )}
        </div>
      )}
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>{t('onboarding.exam')}</th>
              <th>{t('stage.level1')}</th>
              <th>{t('stage.level2')}</th>
              <th>{t('stage.level3')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.exam} className={profile.foreignCert?.exam === r.exam ? s.rowActive : ''}>
                <td>{r.label}</td>
                <td>{r.first ?? '—'}</td>
                <td>{r.second ?? '—'}</td>
                <td>{r.third ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={s.body} style={{ marginTop: 12, fontSize: 13.5 }}>
        {t('stage.levelsNote')}
      </p>
      <div style={{ marginTop: 10 }}>
        <SourceLink id="prikaz318" />
      </div>
    </Card>
  )
}

/** Anchor dates the user enters, and the official terms counted from them. */
function DeadlinePanel({ stage }: { stage: StageId }) {
  const { t, c } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const dates = useAppStore((st) => st.dates)
  const setDate = useAppStore((st) => st.setDate)

  const anchors = useMemo(() => {
    const seen = new Set<DateKey>()
    for (const r of DEADLINE_RULES) {
      if (r.stage === stage && evaluate(r.appliesTo, profile)) seen.add(r.anchor)
    }
    return [...seen]
  }, [stage, profile])

  const due = useMemo(() => computeDeadlines(profile, dates, new Date()).filter((d) => d.rule.stage === stage), [profile, dates, stage])
  if (anchors.length === 0) return null

  return (
    <Card>
      <div className={s.section}>
        <span className={s.sectionTitle}>{t('deadlines.title')}</span>
        <p className={s.body} style={{ fontSize: 13.5 }}>{t('deadlines.intro')}</p>
        {anchors.map((key) => (
          <label key={key} className={s.dateField}>
            <span className={s.dateLabel}>{t(`deadlines.${key}`)}</span>
            <span className={s.dateRow}>
              <input type="date" className={s.dateInput} value={dates[key] ?? ''} onChange={(e) => setDate(key, e.target.value || null)} />
              {dates[key] && (
                <Button variant="quiet" size="sm" onClick={() => setDate(key, null)}>
                  {t('deadlines.clear')}
                </Button>
              )}
            </span>
          </label>
        ))}
        {due.map((d) => (
          <div key={d.rule.id} className={s.dueRow}>
            <span className={s.dueText}>{c(d.rule.label)}</span>
            <span className={s.dueMeta}>
              <Pill tone={d.status === 'overdue' ? 'warn' : d.status === 'soon' ? 'accent' : 'success'}>
                {t('deadlines.due')}: {d.due} ·{' '}
                {d.daysLeft < 0 ? t('deadlines.overdue', { n: Math.abs(d.daysLeft) }) : d.daysLeft === 0 ? t('deadlines.today') : t('deadlines.daysLeft', { n: d.daysLeft })}
              </Pill>
              {d.rule.recurring && <span className={s.tag}>{t('deadlines.every6')}</span>}
              <SourceLink id={d.rule.source} />
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/** Special cases and non-English thresholds from прикз №318, shown under the table. */
function LanguageNotes() {
  const { t, cf } = useI18n()
  return (
    <Card>
      <div className={s.section}>
        <span className={s.sectionTitle}>{t('stage.languageNotes')}</span>
        {LANGUAGE_NOTES.map((n, i) => {
          const text = cf(n.text)
          return (
            <p key={i} className={s.reqRow}>
              <span>
                {text.text}
                {text.fallback && <FallbackBadge />}
              </span>
              <SourceLink id={n.source} />
            </p>
          )
        })}
      </div>
    </Card>
  )
}

/** The category's own admission requirements plus a live check of the entered experience. */
function CategoryRequirements() {
  const { t, cf } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const category = getCategory(profile.category)
  const req = experienceRequirement(profile)
  const ok = meetsExperience(profile)
  const parts: string[] = []
  if (req?.years != null) parts.push(`${req.years} ${t('stage.years')}`)
  if (req?.continuousMonths != null) parts.push(`${req.continuousMonths} ${t('stage.monthsContinuous')}`)

  return (
    <Card>
      <div className={s.section}>
        <span className={s.sectionTitle}>{t('stage.categoryRequirements')}</span>
        {req && (
          <div className={s.scoreRow}>
            <Pill tone="accent">
              {t('stage.yourExperience')}:{' '}
              {profile.experience
                ? `${profile.experience.years} ${t('stage.years')} · ${profile.experience.continuousMonths} ${t('stage.monthsContinuous')}`
                : t('stage.expNone')}
            </Pill>
            <Pill tone={ok ? 'success' : 'warn'}>
              {ok ? t('stage.expMeets') : t('stage.expBelow')}: {t('stage.expRequired')} {parts.join(' · ')}
            </Pill>
          </div>
        )}
        {category.requirements.map((r, i) => {
          const text = cf(r.text)
          return (
            <p key={i} className={s.reqRow}>
              <span>
                {text.text}
                {text.fallback && <FallbackBadge />}
              </span>
              <SourceLink id={r.source} />
            </p>
          )
        })}
      </div>
    </Card>
  )
}

export function StagePage() {
  const { id } = useParams<{ id: StageId }>()
  const navigate = useNavigate()
  const { t, c, cf } = useI18n()

  const profile = useAppStore((st) => st.profile)
  const checked = useAppStore((st) => st.checked)
  const stagesDone = useAppStore((st) => st.stagesDone)
  const documentsDone = useAppStore((st) => st.documentsDone)
  const notes = useAppStore((st) => st.notes)
  const toggleCheck = useAppStore((st) => st.toggleCheck)
  const setStageDone = useAppStore((st) => st.setStageDone)
  const toggleDocument = useAppStore((st) => st.toggleDocument)
  const setNote = useAppStore((st) => st.setNote)

  useEffect(() => {
    if (!profile) navigate('/onboarding', { replace: true })
  }, [profile, navigate])
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  const progress = useMemo(() => (profile ? computeProgress({ profile, checked, stagesDone }) : null), [profile, checked, stagesDone])
  const stage = id ? getStage(id) : undefined

  if (!profile || !progress) return null
  if (!stage || !progress.byId.has(stage.id)) {
    return (
      <Card>
        <h1 className={s.heroTitle}>{t('common.notFound')}</h1>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => navigate('/')}>{t('common.toRoadmap')}</Button>
        </div>
      </Card>
    )
  }

  const sp = progress.byId.get(stage.id)!
  const chapter = CHAPTERS.find((ch) => ch.id === stage.chapter)!
  const locked = sp.status === 'locked'
  const stageDocs = DOCUMENTS.filter((d) => d.stage === stage.id && evaluate(d.appliesTo, profile))
  const faq = faqForStage(stage.id)
  const visibleNotes = (stage.notes ?? []).filter((n) => evaluate(n.appliesTo, profile))

  const order = progress.stages
  const prev = order[sp.index - 1]
  const next = order[sp.index + 1]
  const lockedChapter = locked ? CHAPTERS[CHAPTERS.findIndex((ch) => ch.id === stage.chapter) - 1] : null

  const title = cf(stage.title)
  const why = cf(stage.why)

  return (
    <div className={s.page}>
      <div className={s.top}>
        <Button variant="quiet" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft size={15} aria-hidden="true" />
          {t('common.toRoadmap')}
        </Button>
        <Pill>{c(chapter.title)}</Pill>
        <Pill tone={sp.status === 'done' ? 'success' : locked ? 'default' : 'accent'}>
          {sp.status === 'done' ? t('roadmap.doneState') : locked ? t('roadmap.locked') : t('roadmap.items', { done: sp.requiredDone, total: sp.requiredTotal })}
        </Pill>
      </div>

      <Card dark className={s.hero}>
        <span className={s.heroIcon}>
          <StageIcon name={stage.icon} size={26} />
        </span>
        <div className={s.heroBody}>
          <Pill tone="dark">{c(stage.kicker)}</Pill>
          <h1 className={`display ${s.heroTitle}`}>
            {t('roadmap.stageOf', { n: sp.index + 1, total: progress.totalStages })}
            <b>
              {title.text}
              {title.fallback && <FallbackBadge />}
            </b>
          </h1>
          <p className={s.heroSummary}>{c(stage.summary)}</p>
          <div className={s.heroMeta}>
            {stage.estimateWeeks && (
              <Pill tone="dark">
                {t('stage.estimate')}: {stage.estimateWeeks[0]}–{stage.estimateWeeks[1]} {t('stage.weeks')}
              </Pill>
            )}
            {sp.autoDone && (
              <Pill tone="dark">
                <Sparkles size={12} aria-hidden="true" />
                {t('roadmap.autoDone')}
              </Pill>
            )}
          </div>
        </div>
      </Card>

      {locked && (
        <Callout tone="warn">
          <strong>{t('stage.lockedTitle')}</strong>
          <br />
          {t('stage.lockedText')}
          {lockedChapter && <> {t('roadmap.lockedHint', { chapter: c(lockedChapter.title) })}.</>}
        </Callout>
      )}
      {sp.autoDone && !locked && (
        <Callout tone="info">
          <strong>{t('stage.autoDoneTitle')}</strong>
          <br />
          {t('stage.autoDoneText')}
        </Callout>
      )}

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('stage.why')}</span>
          <p className={s.body}>
            {why.text}
            {why.fallback && <FallbackBadge />}
          </p>
        </div>
      </Card>

      {visibleNotes.map((n, i) => (
        <Callout key={i} tone={n.tone ?? 'info'} source={n.source}>
          {c(n.text)}
        </Callout>
      ))}

      {stage.id === 'category' && <CategoryRequirements />}
      {stage.id === 'foreign' && (
        <>
          <LanguageTable />
          <LanguageNotes />
        </>
      )}
      {stage.id === 'kazakh' && (
        <Callout tone="info" source={KAZAKH_REQUIREMENT.source}>
          <strong>{t('stage.kazakhTitle')}</strong>
          <br />
          {c(KAZAKH_REQUIREMENT.text)}
        </Callout>
      )}
      {stage.id === 'workback' && (
        <Callout tone="info" source="pp573">
          <strong>{t('stage.workBackTitle')}</strong>
          <br />
          {c(getCategory(profile.category).workBack)}
        </Callout>
      )}

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('stage.checklist')}</span>
          {sp.items.map(({ item, done, auto }) => {
            const text = cf(item.text)
            return (
              <button
                key={item.id}
                className={[s.checkItem, done ? s.checkItemDone : ''].join(' ')}
                onClick={() => !auto && !locked && toggleCheck(stage.id, item.id)}
                disabled={auto || locked}
                aria-pressed={done}
              >
                <span className={[s.box, done ? (auto ? s.boxAuto : s.boxDone) : ''].join(' ')}>
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                <span>
                  <span className={s.checkText}>
                    {text.text}
                    {text.fallback && <FallbackBadge />}
                  </span>
                  <span className={s.checkMeta}>
                    {item.required === false && <span className={s.tag}>{t('common.optional')}</span>}
                    {auto && <span className={s.tag}>{t('roadmap.autoDone')}</span>}
                    {item.link && (
                      <a
                        href={getSource(item.link).url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 5 }}
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        {getSource(item.link).org}
                      </a>
                    )}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {stageDocs.length > 0 && (
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('stage.documents')}</span>
            {stageDocs.map((d) => {
              const auto = isDocAuto(d, profile)
              const done = auto || documentsDone.includes(d.id)
              return (
                <button
                  key={d.id}
                  className={[s.docRow, done ? s.docRowDone : ''].join(' ')}
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
                  </span>
                </button>
              )
            })}
            <Link to="/documents" style={{ fontSize: 14, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              {t('stage.allDocuments')}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </Card>
      )}

      <DeadlinePanel stage={stage.id} />

      {stage.deadlines && stage.deadlines.length > 0 && (
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('stage.deadlines')}</span>
            {stage.deadlines.map((d, i) => (
              <Callout key={i} tone="warn" source={d.source}>
                {c(d.text)}
              </Callout>
            ))}
          </div>
        </Card>
      )}

      {stage.mistakes.length > 0 && (
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('stage.mistakes')}</span>
            {stage.mistakes.map((m, i) => {
              const text = cf(m)
              return (
                <p key={i} className={s.mistake}>
                  <TriangleAlert size={17} className={s.mistakeIcon} aria-hidden="true" />
                  <span>
                    {text.text}
                    {text.fallback && <FallbackBadge />}
                  </span>
                </p>
              )
            })}
          </div>
        </Card>
      )}

      {faq.length > 0 && (
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('stage.faq')}</span>
            <div>
              {faq.map((f) => (
                <FaqRow key={f.id} item={f} />
              ))}
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('stage.note')}</span>
          <textarea
            className={s.note}
            value={notes[stage.id] ?? ''}
            onChange={(e) => setNote(stage.id, e.target.value)}
            placeholder={t('stage.notePlaceholder')}
            aria-label={t('stage.note')}
          />
          <span className={s.tag} style={{ alignSelf: 'flex-start' }}>
            {t('stage.noteSaved')}
          </span>
        </div>
      </Card>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('common.sources')}</span>
          <div className={s.sources}>
            {stage.sources.map((src) => (
              <SourceLink key={src} id={src} />
            ))}
          </div>
          <p className={s.body} style={{ fontSize: 13, display: 'flex', gap: 8 }}>
            <CircleAlert size={16} style={{ flex: 'none', marginTop: 2 }} aria-hidden="true" />
            <span>
              {t('common.verifiedOn')}: {CONTENT_META.lastVerified}. {c(CONTENT_META.disclaimer)}
            </span>
          </p>
        </div>
      </Card>

      <div className={s.footerNav}>
        {prev && (
          <Button variant="ghost" onClick={() => navigate(`/stage/${prev.stage.id}`)}>
            <ArrowLeft size={15} aria-hidden="true" />
            {t('stage.prevStage')}
          </Button>
        )}
        <span className={s.grow} />
        {!locked && (
          <Button variant={sp.status === 'done' ? 'ghost' : 'secondary'} onClick={() => setStageDone(stage.id, !stagesDone.includes(stage.id))} disabled={sp.autoDone}>
            {sp.status === 'done' && !stagesDone.includes(stage.id) ? (
              <>
                <Check size={15} aria-hidden="true" />
                {t('roadmap.doneState')}
              </>
            ) : stagesDone.includes(stage.id) ? (
              t('stage.unmarkDone')
            ) : (
              <>
                <Check size={15} aria-hidden="true" />
                {t('stage.markDone')}
              </>
            )}
          </Button>
        )}
        {next && (
          <Button onClick={() => navigate(`/stage/${next.stage.id}`)}>
            {t('stage.nextStage')}
            {next.status === 'locked' ? <Lock size={14} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
          </Button>
        )}
      </div>
    </div>
  )
}
