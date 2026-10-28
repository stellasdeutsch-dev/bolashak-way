import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { PLATFORMS, getPlatform, platformForTrack } from '@/content/platforms'
import { COMPARE, FINDER, type FinderOption } from '@/content/platforms/compare'
import { CONTENT_META } from '@/content/meta'
import type { PlatformSlug } from '@/content/types'
import { platformPaths } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Button, ButtonLink, Card, Pill, SourceLink } from '@/components/ui'
import { Glossary } from '@/components/Glossary'
import { StageIcon } from '@/components/StageIcon'
import { useInView } from '@/components/Reveal'
import { IconArrowRight as ArrowRight, IconSparkles as Sparkles, IconReset as Reset, IconExternal as ExternalLink } from '@/components/icons'
import s from './Landing.module.css'

/**
 * The way in: five programmes, each its own platform. Nothing here describes how to apply
 * — that lives on each platform, in that programme's words. This page only helps you find
 * yours, and puts the five side by side for the one moment you need to compare them.
 */
export function Landing() {
  const { t, c } = useI18n()
  const profile = useAppStore((st) => st.profile)
  const mine = profile ? platformForTrack(profile.track) : null
  usePageChrome(t('landing.title'))

  return (
    <div className={s.page}>
      <Card dark className={s.hero}>
        <Pill tone="dark">
          <Sparkles size={13} aria-hidden="true" />
          {t('landing.kicker', { year: CONTENT_META.competitionYear })}
        </Pill>
        <h1 className={`display ${s.heroTitle}`}>
          {t('landing.heroLead')}
          <b>{t('landing.heroTitle')}</b>
        </h1>
        <p className={s.heroText}>{t('landing.heroText')}</p>
        {!mine && (
          <div className={s.heroActions}>
            <Button size="lg" onClick={() => scrollToId('finder')}>
              {t('landing.ctaFind')}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="ghost" onClick={() => scrollToId('choose')}>
              {t('landing.ctaAll')}
            </Button>
          </div>
        )}
        {mine && (
          <div className={s.continue} data-p={mine.slug}>
            <span className={s.continueIcon}>
              <StageIcon name={mine.icon} size={18} />
            </span>
            <span className={s.continueText}>
              <span>{t('landing.continueLead')}</span>
              <b>{c(mine.name)}</b>
            </span>
            <ButtonLink to={platformPaths(mine.slug).roadmap} size="sm">
              {t('landing.continue')}
              <ArrowRight size={15} aria-hidden="true" />
            </ButtonLink>
          </div>
        )}
      </Card>

      <WhatIs />
      <Finder />
      <PlatformCards />

      <Card className={s.glossary}>
        <h2 className={s.sectionTitle}>{t('landing.glossaryTitle')}</h2>
        <p className={s.sectionText}>{t('landing.glossaryText')}</p>
        <Glossary />
      </Card>

      <CompareTable />

      <footer className={s.footnote}>
        <p>{t('landing.unofficial')}</p>
        <p>
          {t('common.verifiedOn')}: {CONTENT_META.lastVerified}. {c(CONTENT_META.disclaimer)}
        </p>
        <p className={s.footLinks}>
          <a href="https://bolashak.gov.kz/ru" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={13} aria-hidden="true" /> {t('landing.official')}
          </a>
          <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={13} aria-hidden="true" /> {t('landing.report')}
          </a>
        </p>
      </footer>
    </div>
  )
}

export const REPORT_URL = 'https://github.com/stellasdeutsch-dev/bolashak-way/issues/new'

const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  const focusable = el.querySelector<HTMLElement>('h2')
  if (focusable) {
    focusable.setAttribute('tabindex', '-1')
    focusable.focus({ preventScroll: true })
  }
}

/* ── what this is, for someone who has only heard the name ── */

function WhatIs() {
  const { t } = useI18n()
  const steps = ['landing.whatStep1', 'landing.whatStep2', 'landing.whatStep3']
  return (
    <Card className={s.what}>
      <h2 className={s.sectionTitle}>{t('landing.whatTitle')}</h2>
      <ol className={s.whatSteps}>
        {steps.map((key, i) => (
          <li key={key} className={s.whatStep}>
            <span className={s.whatNum} aria-hidden="true">{i + 1}</span>
            <span>{t(key)}</span>
          </li>
        ))}
      </ol>
      <p className={s.sectionText}>{t('landing.whatWho')}</p>
      <div className={s.whatSources}>
        <SourceLink id="pp573" label={t('landing.srcBolashak')} />
        <SourceLink id="ns_rules422" label={t('landing.srcScience')} />
      </div>
    </Card>
  )
}

/* ── five doors ── */

// Plain answers a newcomer can compare — how long abroad, what is owed back — taken from
// the same sourced rows as the comparison table, not the specialist facts of each platform.
const CARD_ROWS = COMPARE.filter((r) => r.id === 'length' || r.id === 'workback')

function PlatformCards() {
  const { t, c } = useI18n()
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <section aria-labelledby="choose">
      <h2 id="choose" className={s.sectionTitle}>
        {t('landing.chooseTitle')}
      </h2>
      <div className={s.cards} ref={ref}>
        {PLATFORMS.map((p, i) => {
          return (
            <Link
              key={p.slug}
              to={platformPaths(p.slug).home}
              className={[s.card, seen ? s.cardOn : ''].join(' ')}
              data-p={p.slug}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className={s.cardTop}>
                <span className={s.cardIcon}>
                  <StageIcon name={p.icon} size={22} />
                </span>
                {p.programme === 'science' && <span className={s.cardBadge}>{t('landing.separateProgramme')}</span>}
              </span>
              <span className={s.cardName}>{c(p.name)}</span>
              <span className={s.cardTagline}>{c(p.tagline)}</span>
              <span className={s.cardRows}>
                {CARD_ROWS.map((row) => (
                  <span key={row.id} className={s.cardRow}>
                    <span>{c(row.label)}</span>
                    <b>{c(row.cells[p.slug])}</b>
                  </span>
                ))}
              </span>
              <span className={s.cardGo}>
                {t('landing.open')}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

/* ── two questions that point at a platform ── */

function Finder() {
  const { t, c } = useI18n()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [ref, seen] = useInView<HTMLDivElement>()

  // Walk the questions along the answers given so far.
  const { path, current, result } = useMemo(() => {
    const path: { qid: string; option: FinderOption }[] = []
    let qid: string | undefined = FINDER[0].id
    let result: PlatformSlug | undefined
    while (qid) {
      const q = FINDER.find((x) => x.id === qid)!
      const picked = q.options.find((o) => o.id === answers[q.id])
      if (!picked) break
      path.push({ qid: q.id, option: picked })
      result = picked.result
      qid = picked.next
    }
    const current = result ? null : FINDER.find((x) => x.id === (path[path.length - 1]?.option.next ?? FINDER[0].id)) ?? null
    return { path, current, result }
  }, [answers])

  const choose = (qid: string, oid: string) => {
    // Answering an earlier question again drops everything after it.
    const idx = FINDER.findIndex((q) => q.id === qid)
    const kept = Object.fromEntries(Object.entries(answers).filter(([k]) => FINDER.findIndex((q) => q.id === k) < idx))
    setAnswers({ ...kept, [qid]: oid })
  }

  const branch = path[0]?.option.id as 'degree' | 'placement' | undefined
  const picked = result ? getPlatform(result) : null

  return (
    <Card className={s.finder} id="finder">
      <div className={s.finderHead}>
        <h2 className={s.sectionTitle} id="finder-title">{t('landing.finderTitle')}</h2>
        <p className={s.sectionText}>{t('landing.finderText')}</p>
      </div>

      <div className={s.finderBody}>
        <div className={s.finderAsk}>
          {path.map(({ qid, option }) => (
            <button key={qid} className={s.finderDone} onClick={() => choose(qid, '')}>
              <span>{c(FINDER.find((q) => q.id === qid)!.q)}</span>
              <b>{c(option.label)}</b>
            </button>
          ))}
          {current && (
            <div className={s.finderQ} key={current.id}>
              <span className={s.finderQText}>{c(current.q)}</span>
              <div className={s.finderOptions}>
                {current.options.map((o) => (
                  <button key={o.id} className={s.finderOption} onClick={() => choose(current.id, o.id)}>
                    <b>{c(o.label)}</b>
                    {o.hint && <span>{c(o.hint)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {picked && (
            <div className={s.finderResult} data-p={picked.slug}>
              <span className={s.finderResultIcon}>
                <StageIcon name={picked.icon} size={24} />
              </span>
              <div className={s.finderResultBody}>
                <span>{t('landing.finderYours')}</span>
                <b>{c(picked.name)}</b>
                <span className={s.finderResultTag}>{c(picked.tagline)}</span>
              </div>
              <div className={s.finderResultActions}>
                <ButtonLink to={platformPaths(picked.slug).home}>
                  {t('landing.finderGo')}
                  <ArrowRight size={15} aria-hidden="true" />
                </ButtonLink>
                <button className={s.finderReset} onClick={() => setAnswers({})}>
                  <Reset size={14} aria-hidden="true" />
                  {t('landing.finderAgain')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* The whole tree at once, with the reader's branch lit — so the answer is seen
            as one of five, not as a verdict out of nowhere. */}
        <div className={[s.tree, seen ? s.treeOn : ''].join(' ')} ref={ref} aria-hidden="true">
          <span className={s.treeRoot}>{t('landing.treeRoot')}</span>
          <div className={s.treeBranches}>
            {(['degree', 'placement'] as const).map((b) => {
              const q = FINDER.find((x) => x.id === (b === 'degree' ? 'level' : 'who'))!
              const label = FINDER[0].options.find((o) => o.id === b)!.label
              const lit = branch === b
              const dim = branch !== undefined && !lit
              return (
                <div key={b} className={[s.treeBranch, lit ? s.treeLit : '', dim ? s.treeDim : ''].join(' ')}>
                  <span className={s.treeNode}>{c(label).split(' — ')[0]}</span>
                  <div className={s.treeLeaves}>
                    {q.options.map((o) => {
                      const leaf = getPlatform(o.result!)
                      const on = result === leaf.slug
                      return (
                        <span key={o.id} className={[s.treeLeaf, on ? s.treeLeafOn : '', result && !on ? s.treeDim : ''].join(' ')} data-p={leaf.slug}>
                          <StageIcon name={leaf.icon} size={14} />
                          {c(leaf.name)}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}

/* ── all five, row by row ── */

function CompareTable() {
  const { t, c } = useI18n()
  const sources = [...new Set(COMPARE.flatMap((r) => r.sources))]
  // On a phone five columns are a wall; two chosen side by side are a comparison.
  const [pair, setPair] = useState<PlatformSlug[]>(['master', 'internship'])
  const toggle = (slug: PlatformSlug) =>
    setPair((cur) => (cur.includes(slug) ? (cur.length > 1 ? cur.filter((x) => x !== slug) : cur) : [cur[cur.length - 1], slug].filter(Boolean) as PlatformSlug[]))
  const picked = PLATFORMS.filter((p) => pair.includes(p.slug))

  return (
    <Card className={s.compare} id="compare">
      <h2 className={s.sectionTitle}>{t('landing.compareTitle')}</h2>
      <p className={s.sectionText}>{t('landing.compareText')}</p>

      <div className={s.pairPick} role="group" aria-label={t('landing.pairPick')}>
        <span className={s.pairHint}>{t('landing.pairPick')}</span>
        <div className={s.pairChips}>
          {PLATFORMS.map((p) => (
            <button key={p.slug} data-p={p.slug} className={[s.pairChip, pair.includes(p.slug) ? s.pairChipOn : ''].join(' ')} aria-pressed={pair.includes(p.slug)} onClick={() => toggle(p.slug)}>
              <StageIcon name={p.icon} size={13} />
              {c(p.name)}
            </button>
          ))}
        </div>
      </div>
      <table className={[s.compareTable, s.pairTable].join(' ')}>
        <thead>
          <tr>
            <th className={s.compareCorner} />
            {picked.map((p) => (
              <th key={p.slug} data-p={p.slug} className={s.compareHead}>
                <Link to={platformPaths(p.slug).home}>{c(p.name)}</Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((row) => (
            <tr key={row.id}>
              <th scope="row" className={s.compareLabel}>
                {c(row.label)}
              </th>
              {picked.map((p) => (
                <td key={p.slug}>{c(row.cells[p.slug])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={s.compareScroll} tabIndex={0} role="region" aria-label={t('landing.compareTitle')}>
        <table className={[s.compareTable, s.fullTable].join(' ')}>
          <thead>
            <tr>
              <th className={s.compareCorner} />
              {PLATFORMS.map((p) => (
                <th key={p.slug} data-p={p.slug} className={s.compareHead}>
                  <Link to={platformPaths(p.slug).home}>
                    <span className={s.compareDot}>
                      <StageIcon name={p.icon} size={13} />
                    </span>
                    {c(p.name)}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.id}>
                <th scope="row" className={s.compareLabel}>
                  {c(row.label)}
                </th>
                {PLATFORMS.map((p) => (
                  <td key={p.slug} data-p={p.slug}>
                    {c(row.cells[p.slug])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.sources}>
        {sources.map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
    </Card>
  )
}
