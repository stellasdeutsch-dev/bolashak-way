import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleAlert, ExternalLink, Lock, Sparkles, TriangleAlert } from 'lucide-react'
import { CHAPTERS, getStage } from '@/content/stages'
import { DOCUMENTS } from '@/content/documents'
import { faqForStage } from '@/content/faq'
import { getSource } from '@/content/sources'
import { CONTENT_META } from '@/content/meta'
import { ENGLISH_THRESHOLDS, LANGUAGE_GROUP_BY_CATEGORY } from '@/content/language'
import type { FaqItem, StageId } from '@/content/types'
import { computeProgress } from '@/domain/progress'
import { evaluate, foreignThreshold, foreignCertMeets } from '@/domain/applicability'
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
  const { t, c } = useI18n()
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
        {c({
          ru: 'I порог — языковые курсы в Казахстане или за рубежом (кроме английского); II — языковые курсы за рубежом; III — сразу на академическое обучение или стажировку.',
          kk: 'I шек — Қазақстанда не шетелде тіл курстары (ағылшыннан басқа); II — шетелде тіл курстары; III — бірден оқуға не тағылымдамаға.',
          en: 'Level I — language courses in Kazakhstan or abroad (except English); II — language courses abroad; III — straight to study or internship.',
        })}
      </p>
      <div style={{ marginTop: 10 }}>
        <SourceLink id="prikaz318" />
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

      {stage.id === 'foreign' && <LanguageTable />}

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
