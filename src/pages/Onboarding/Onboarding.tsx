import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight } from '@/components/icons'
import { CATEGORIES, CATEGORIES_BY_TRACK, WORKER_GROUPS } from '@/content/categories'
import { getPlatform, platformForTrack } from '@/content/platforms'
import type { PlatformSlug, Track } from '@/content/types'
import { platformPaths } from '@/domain/paths'
import { StageIcon } from '@/components/StageIcon'
import { defaultCategoryFor, draftFromProfile, emptyDraft, isStepComplete, toProfile, type OnboardingDraft } from '@/domain/profile'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { Button, Pill } from '@/components/ui'
import s from './Onboarding.module.css'


/** The question in each platform's own terms. */
const Q1: Record<Track, string> = {
  bachelor: 'onboarding.q1single',
  master: 'onboarding.q1_master',
  phd_residency: 'onboarding.q1_doctorate',
  internship: 'onboarding.q1_internship',
  science_internship: 'onboarding.q1single',
}

/**
 * The only question left: which Bolashak direction (category, and the worker group for an internship).
 * Language, experience and invitation are not asked. A programme with a single direction has nothing
 * to choose, so its plan opens straight away.
 */
export function Onboarding() {
  const { t, c } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { platform: slug } = useParams() as { platform: PlatformSlug }
  const platform = getPlatform(slug)
  const track: Track = platform.track
  const paths = platformPaths(slug)
  usePageChrome(`${c(platform.name)} · ${t('onboarding.welcomeKicker')}`)
  const profile = useAppStore((st) => st.profile)
  const setProfile = useAppStore((st) => st.setProfile)
  const sameTrack = profile?.track === track
  const editing = params.get('edit') === '1' && sameTrack
  const replacing = profile !== null && !sameTrack

  const [draft, setDraft] = useState<OnboardingDraft>(() =>
    profile && sameTrack ? draftFromProfile(profile) : { ...emptyDraft(), track, category: defaultCategoryFor(track) },
  )
  const categoryOptions = CATEGORIES_BY_TRACK[track]
  const hasChoice = categoryOptions.length > 1 || track === 'internship'
  const questionRef = useRef<HTMLHeadingElement>(null)

  const update = (patch: Partial<OnboardingDraft>) => setDraft((d) => ({ ...d, ...patch }))
  const finish = (d: OnboardingDraft = draft) => {
    setProfile(toProfile(d))
    navigate(paths.roadmap, { replace: true })
  }

  // nothing to choose: build the plan and open it
  useEffect(() => {
    if (hasChoice) questionRef.current?.focus({ preventScroll: true })
    else if (editing) navigate(paths.roadmap, { replace: true })
    else finish({ ...emptyDraft(), track, category: categoryOptions[0] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!hasChoice) return null

  const mine = profile ? platformForTrack(profile.track) : null

  return (
    <div className={s.wrap}>
      <div className={s.head}>
        <h1 className={s.question} ref={questionRef} tabIndex={-1}>{t(Q1[track])}</h1>
        <p className={s.hint}>{t('onboarding.q1hint')}</p>
        {replacing && mine && (
          <p className={s.hint}>{t('onboarding.replaceNote', { mine: c(mine.name), name: c(platform.name) })}</p>
        )}
        {editing && <Pill tone="warn">{t('onboarding.editNote')}</Pill>}
      </div>

      <div>
        {categoryOptions.length === 1 && (
          <div className={s.single}>
            <span className={s.singleIcon}>
              <StageIcon name={platform.icon} size={20} />
            </span>
            <span>
              <b>{c(CATEGORIES[categoryOptions[0]].title)}</b>
              <span>{c(CATEGORIES[categoryOptions[0]].desc)}</span>
            </span>
          </div>
        )}
        {categoryOptions.length > 1 && (
          <>
            <div className={s.chips}>
              {categoryOptions.map((id) => (
                <button
                  key={id}
                  className={[s.chip, draft.category === id ? s.chipActive : ''].join(' ')}
                  onClick={() => update({ category: id })}
                  aria-pressed={draft.category === id}
                  title={c(CATEGORIES[id].desc)}
                >
                  {c(CATEGORIES[id].short)}
                </button>
              ))}
            </div>
            {draft.category && <p className={s.hint} style={{ marginTop: 10 }}>{c(CATEGORIES[draft.category].desc)}</p>}
          </>
        )}

        {track === 'internship' && (
          <>
            <div className={s.subhead}>{t('category.workerGroup')}</div>
            <div className={[s.chips, s.chipsList].join(' ')}>
              {WORKER_GROUPS.map((g) => (
                <button
                  key={g.id}
                  className={[s.chip, draft.workerGroup === g.id ? s.chipActive : ''].join(' ')}
                  onClick={() => update({ workerGroup: g.id })}
                  aria-pressed={draft.workerGroup === g.id}
                >
                  {c(g.title)}
                  {g.shortMonths && <span className={s.chipBadge}>{t('onboarding.shortMonths', { n: g.shortMonths })}</span>}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={s.footer}>
        <Button variant="quiet" onClick={() => navigate(editing ? paths.roadmap : paths.home)}>
          <ArrowLeft size={16} aria-hidden="true" />
          {t('common.back')}
        </Button>
        <span className={s.grow} />
        <Button size="lg" onClick={() => finish()} disabled={!isStepComplete(draft, 0)}>
          {editing ? t('onboarding.save') : t('onboarding.finish')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
