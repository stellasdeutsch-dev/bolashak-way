import { Link } from 'react-router'
import { ABOUT_BLOCKS, ABOUT_INTRO, ABOUT_STATS } from '@/content/about'
import { CONTENT_META } from '@/content/meta'
import { CHAPTERS } from '@/content/stages'
import { OVERVIEW_VIDEOS } from '@/content/videos'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { useAppStore } from '@/store/useAppStore'
import { Button, Card, Pill, SourceLink } from '@/components/ui'
import { IconArrowRight as ArrowRight, IconSparkles as Sparkles } from '@/components/icons'
import { StageIcon } from '@/components/StageIcon'
import { VideoList } from '@/components/Videos'
import s from './About.module.css'

/** The whole programme in plain language, for someone who has never heard of it. */
export function About() {
  const { t, c } = useI18n()
  const hasProfile = useAppStore((st) => st.profile !== null)
  usePageChrome(t('nav.about'))

  return (
    <div className={s.page}>
      <Card dark className={s.hero}>
        <Pill tone="dark">
          <Sparkles size={13} />
          {t('about.kicker')}
        </Pill>
        <h1 className={`display ${s.heroTitle}`}>
          {t('about.heroLead')}
          <b>{t('about.heroTitle')}</b>
        </h1>
        <p className={s.heroText}>{c(ABOUT_INTRO)}</p>
      </Card>

      {/* The four figures that shape everything, before any paragraph asks to be read. */}
      <Card className={s.statsCard}>
        <span className={s.statsTitle}>{t('about.statsTitle')}</span>
        <div className={s.stats}>
          {ABOUT_STATS.map((st) => (
            <div key={st.value} className={s.stat}>
              <span className={s.statValue}>{st.value}</span>
              <span className={s.statCaption}>{c(st.caption)}</span>
            </div>
          ))}
        </div>
        {/* All four come from the same act, so the link belongs once under the row, not four times inside it. */}
        <div className={s.sources}>
          {[...new Set(ABOUT_STATS.map((st) => st.source))].map((src) => (
            <SourceLink key={src} id={src} />
          ))}
        </div>
      </Card>

      {ABOUT_BLOCKS.map((b) => (
        <Card key={b.num} className={s.block}>
          <div className={s.blockHead}>
            <span className={s.num}>{b.num}</span>
            <h2 className={s.blockTitle}>{c(b.title)}</h2>
          </div>
          <p className={s.body}>{c(b.body)}</p>
          {b.steps && (
            <ol className={s.steps}>
              {b.steps.map((step, i) => (
                <li key={i} className={s.step}>
                  <span className={s.stepIcon}>
                    <StageIcon name={step.icon} size={19} />
                  </span>
                  <span className={s.stepNum}>{i + 1}</span>
                  <b className={s.stepTitle}>{c(step.title)}</b>
                  <span className={s.stepText}>{c(step.text)}</span>
                </li>
              ))}
            </ol>
          )}

          {b.features && (
            <ul className={s.features}>
              {b.features.map((f, i) => (
                <li key={i} className={s.feature}>
                  <span className={s.featureIcon}>
                    <StageIcon name={f.icon} size={18} />
                  </span>
                  <span>
                    <b className={s.featureLabel}>{c(f.label)}</b>
                    <span className={s.featureText}>{c(f.text)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {b.points && (
            <ul className={s.points}>
              {b.points.map((p, i) => (
                <li key={i} className={s.point}>
                  {c(p)}
                </li>
              ))}
            </ul>
          )}
          {b.sources && (
            <div className={s.sources}>
              {b.sources.map((src) => (
                <SourceLink key={src} id={src} />
              ))}
            </div>
          )}
        </Card>
      ))}

      <Card className={s.block}>
        <div className={s.blockHead}>
          <span className={s.num}>{String(ABOUT_BLOCKS.length + 1).padStart(2, '0')}</span>
          <h2 className={s.blockTitle}>{t('about.chaptersTitle')}</h2>
        </div>
        <p className={s.body}>{t('about.chaptersBody')}</p>
        <ol className={s.chapters}>
          {CHAPTERS.map((ch, i) => (
            <li key={ch.id} className={s.chapter}>
              <span className={s.chapterNum}>{String(i + 1).padStart(2, '0')}</span>
              <span>
                <b className={s.chapterTitle}>{c(ch.title)}</b>
                <span className={s.chapterSub}>{c(ch.subtitle)}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className={s.block}>
        <div className={s.blockHead}>
          <span className={s.num}>{String(ABOUT_BLOCKS.length + 2).padStart(2, '0')}</span>
          <h2 className={s.blockTitle}>{t('video.aboutTitle')}</h2>
        </div>
        <p className={s.body}>{t('video.aboutBody')}</p>
        <VideoList items={OVERVIEW_VIDEOS} />
      </Card>

      <Card dark className={s.cta}>
        <div>
          <h2 className={s.ctaTitle}>{t(hasProfile ? 'about.ctaBackTitle' : 'about.ctaTitle')}</h2>
          <p className={s.ctaText}>{t(hasProfile ? 'about.ctaBackText' : 'about.ctaText')}</p>
        </div>
        <Link to={hasProfile ? '/' : '/onboarding'}>
          <Button size="md">
            {t(hasProfile ? 'about.ctaBack' : 'about.ctaButton')}
            <ArrowRight size={16} />
          </Button>
        </Link>
      </Card>

      <p className={s.footnote}>
        {t('common.verifiedOn')}: {CONTENT_META.lastVerified}. {c(CONTENT_META.disclaimer)}
      </p>
    </div>
  )
}
