import type { ReactNode } from 'react'
import { useParams } from 'react-router'
import { PLATFORM_HOMES, getPlatform } from '@/content/platforms'
import { CONTENT_META } from '@/content/meta'
import type { PlatformSlug, Track } from '@/content/types'
import { PLATFORM_VIDEO_IDS, VIDEOS } from '@/content/videos'
import { evaluate } from '@/domain/applicability'
import { platformPaths } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { ButtonLink, Card, Pill } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import { VideoList } from '@/components/Videos'
import { Reveal } from '@/components/Reveal'
import { AwardTimeline, ContestFlow, DepartureChain, PathLanes, WorkbackTable } from '@/components/Explain'
import { InternshipSpecialtySearch, ScienceSearch, SpecialtySearch, UniversitySearch, type SpecialtyLevel } from '@/components/ListSearch'
import { Coverage, Facts, Fit, Journey, Requirements } from '@/components/platform/PlatformBlocks'
import { IconArrowRight as ArrowRight } from '@/components/icons'
import s from './PlatformHome.module.css'

const LEVEL: Partial<Record<Track, SpecialtyLevel>> = {
  bachelor: 'Бакалавриат',
  master: 'Магистратура',
  phd_residency: 'Докторантура',
}

/** A numbered section, so the page reads as one walk from "is this mine" to "what I owe". */
function Section({ n, title, text, children }: { n: number; title: string; text?: string; children: ReactNode }) {
  return (
    <Card className={s.section}>
      <div className={s.sectionHead}>
        <span className={s.num}>{String(n).padStart(2, '0')}</span>
        <div>
          <h2 className={s.sectionTitle}>{title}</h2>
          {text && <p className={s.sectionText}>{text}</p>}
        </div>
      </div>
      {children}
    </Card>
  )
}

/** The front page of one programme — its own words, its own colour, nothing of the others. */
export function PlatformHome() {
  const { t, c } = useI18n()
  const { platform: slug } = useParams() as { platform: PlatformSlug }
  const platform = getPlatform(slug)
  const home = PLATFORM_HOMES[slug]
  const track = platform.track
  const profile = useAppStore((st) => st.profile)
  const mine = profile?.track === track
  const paths = platformPaths(slug)
  usePageChrome(c(platform.name))

  const videos = VIDEOS.filter((v) => PLATFORM_VIDEO_IDS.includes(v.id) && evaluate(v.appliesTo, { track } as never))
  let n = 0
  const next = () => ++n

  return (
    <div className={s.page}>
      <Card dark className={s.hero}>
        <div className={s.heroTop}>
          <span className={s.heroIcon}>
            <StageIcon name={platform.icon} size={26} />
          </span>
          <Pill tone="dark">{t(platform.programme === 'science' ? 'platform.scienceProgramme' : 'platform.bolashak')}</Pill>
        </div>
        <h1 className={`display ${s.heroTitle}`}>
          <b>{c(platform.name)}</b>
        </h1>
        <p className={s.heroText}>{c(home.intro)}</p>
        <div className={s.heroActions}>
          <ButtonLink to={mine ? paths.roadmap : paths.start} size="lg">
            {t(mine ? 'platform.continue' : 'platform.start')}
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/" variant="ghost" size="lg">
            {t('platform.allProgrammes')}
          </ButtonLink>
        </div>
      </Card>

      <Facts home={home} />

      <Section n={next()} title={t('platform.fitTitle')}>
        <Fit home={home} />
      </Section>

      <Section n={next()} title={t('platform.requirementsTitle')} text={t(`platform.requirementsText_${slug}`)}>
        <Requirements track={track} />
      </Section>

      <Section n={next()} title={t('platform.journeyTitle')} text={t('platform.journeyText')}>
        <Journey platform={platform} />
        {track === 'master' && (
          <>
            <span className={s.sub}>{t('platform.lanesTitle')}</span>
            <Reveal>
              <PathLanes />
            </Reveal>
          </>
        )}
      </Section>

      <Section n={next()} title={t('platform.listsTitle')} text={t(`platform.listsText_${slug}`)}>
        <div className={s.lists}>
          {LEVEL[track] && (
            <div>
              <span className={s.sub}>{t('lists.specialtyTitle')}</span>
              <SpecialtySearch level={LEVEL[track]} />
            </div>
          )}
          {LEVEL[track] && (
            <div>
              <span className={s.sub}>{t('lists.universityTitle')}</span>
              <UniversitySearch />
            </div>
          )}
          {track === 'internship' && (
            <div>
              <span className={s.sub}>{t('lists.internshipTitle')}</span>
              <InternshipSpecialtySearch />
            </div>
          )}
          {track === 'science_internship' && (
            <div>
              <span className={s.sub}>{t('lists.scienceTitle')}</span>
              <ScienceSearch />
            </div>
          )}
        </div>
      </Section>

      <Section n={next()} title={t('platform.contestTitle')} text={t('platform.contestText')}>
        <Reveal>
          <ContestFlow track={track} />
        </Reveal>
      </Section>

      <Section n={next()} title={t('platform.moneyTitle')} text={t('platform.moneyText')}>
        <span className={s.sub}>{t('platform.clockTitle')}</span>
        <Reveal>
          <AwardTimeline track={track} />
        </Reveal>
        <span className={s.sub}>{t('platform.coverageTitle')}</span>
        <Coverage home={home} />
      </Section>

      <Section n={next()} title={t('platform.departureTitle')}>
        <Reveal>
          <DepartureChain track={track} />
        </Reveal>
      </Section>

      <Section n={next()} title={t('platform.workbackTitle')} text={t('platform.workbackText')}>
        <Reveal>
          <WorkbackTable track={track} />
        </Reveal>
      </Section>

      {videos.length > 0 && (
        <Section n={next()} title={t('video.aboutTitle')} text={t('video.aboutBody')}>
          <VideoList items={videos} />
        </Section>
      )}

      <Card dark className={s.cta}>
        <div>
          <h2 className={s.ctaTitle}>{t(mine ? 'platform.ctaBackTitle' : 'platform.ctaTitle', { name: c(platform.name) })}</h2>
          <p className={s.ctaText}>{t(mine ? 'platform.ctaBackText' : 'platform.ctaText')}</p>
        </div>
        <ButtonLink to={mine ? paths.roadmap : paths.start}>
          {t(mine ? 'platform.continue' : 'platform.start')}
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </Card>

      <p className={s.footnote}>
        {t('common.verifiedOn')}: {CONTENT_META.lastVerified}. {c(CONTENT_META.disclaimer)}
      </p>
    </div>
  )
}
