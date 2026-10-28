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
import { AwardTimeline, ContestFlow, DepartureChain, PathLanes, WorkbackTable } from '@/components/Explain'
import { InternshipSpecialtySearch, ScienceSearch, SpecialtySearch, UniversitySearch, type SpecialtyLevel } from '@/components/ListSearch'
import { Deal, Facts, Fit, More, PathOverview, Requirements } from '@/components/platform/PlatformBlocks'
import { IconArrowRight as ArrowRight, IconExternal as ExternalLink } from '@/components/icons'
import { Glossary } from '@/components/Glossary'
import { REPORT_URL } from './Landing'
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

      {/* The short version: three questions a newcomer actually has. */}
      <Section n={1} title={t('platform.fitTitle')}>
        <Fit home={home} />
      </Section>

      <Section n={2} title={t('platform.pathTitle')} text={t('platform.pathText')}>
        <PathOverview platform={platform} />
      </Section>

      <Section n={3} title={t('platform.dealTitle')}>
        <Deal home={home} track={track} />
      </Section>

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

      {/* Everything else, folded: there when wanted, not in the way of a first read. */}
      <section className={s.details} aria-labelledby="details">
        <h2 id="details" className={s.detailsTitle}>
          {t('platform.detailsTitle')}
        </h2>
        <p className={s.detailsText}>{t('platform.detailsText')}</p>
        <div className={s.detailsList}>
          <More title={t('platform.requirementsTitle')} hint={t(`platform.requirementsText_${slug}`)}>
            <Requirements track={track} />
          </More>
          {track === 'master' && (
            <More title={t('platform.lanesTitle')} hint={t('platform.lanesHint')}>
              <PathLanes />
            </More>
          )}
          <More title={t('platform.listsTitle')} hint={t(`platform.listsText_${slug}`)}>
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
              {track === 'internship' && <InternshipSpecialtySearch />}
              {track === 'science_internship' && <ScienceSearch />}
            </div>
          </More>
          <More title={t('platform.contestTitle')} hint={t('platform.contestText')}>
            <ContestFlow track={track} />
          </More>
          <More title={t('platform.clockTitle')} hint={t('platform.clockHint')}>
            <AwardTimeline track={track} />
          </More>
          <More title={t('platform.departureTitle')} hint={t('platform.departureHint')}>
            <DepartureChain track={track} />
          </More>
          <More title={t('platform.workbackTitle')} hint={t('platform.workbackText')}>
            <WorkbackTable track={track} />
          </More>
          <More title={t('landing.glossaryTitle')} hint={t('landing.glossaryText')}>
            <Glossary />
          </More>
          {videos.length > 0 && (
            <More title={t('video.aboutTitle')} hint={t('video.aboutBody')}>
              <VideoList items={videos} />
            </More>
          )}
        </div>
      </section>

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
