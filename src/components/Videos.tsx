import { useState } from 'react'
import { IconExternal as ExternalLink, IconPlay as Play } from '@/components/icons'
import type { Locale, VideoClip, VideoItem } from '@/content/types'
import { useI18n } from '@/i18n'
import { SourceLink } from '@/components/ui'
import s from './Videos.module.css'

/** Pick the clip spoken in the reader's language; Russian is the fallback everywhere. */
function clipFor(item: VideoItem, locale: Locale): VideoClip {
  return item.clips.find((cl) => cl.lang === locale) ?? item.clips.find((cl) => cl.lang === 'ru') ?? item.clips[0]
}

function formatDuration(sec: number, t: (k: string, p?: Record<string, string | number>) => string) {
  return sec < 60 ? t('video.seconds', { n: sec }) : t('video.minutes', { n: Math.round(sec / 60) })
}

function formatDate(iso: string, locale: Locale) {
  const d = new Date(`${iso}T12:00:00Z`)
  return new Intl.DateTimeFormat(locale === 'kk' ? 'kk-KZ' : locale === 'en' ? 'en-GB' : 'ru-RU', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

function VideoRow({ item }: { item: VideoItem }) {
  const { t, locale } = useI18n()
  const [langOverride, setLangOverride] = useState<'ru' | 'kk' | null>(null)
  const [playing, setPlaying] = useState(false)

  const clip = langOverride ? (item.clips.find((cl) => cl.lang === langOverride) ?? clipFor(item, locale)) : clipFor(item, locale)
  const watchUrl = `https://www.youtube.com/watch?v=${clip.youtubeId}`

  return (
    <div className={s.item}>
      {playing ? (
        // Loaded only after a click, and from the no-cookie host, so opening a stage does
        // not hand YouTube a page view for every visitor.
        <div className={s.frame}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${clip.youtubeId}?autoplay=1&rel=0`}
            title={clip.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <button className={s.facade} onClick={() => setPlaying(true)} aria-label={`${t('video.play')}: ${clip.title}`}>
          <img
            className={s.thumb}
            src={`https://i.ytimg.com/vi/${clip.youtubeId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            width={480}
            height={360}
          />
          <span className={s.playBadge}>
            <Play size={26} />
          </span>
        </button>
      )}

      <div className={s.meta}>
        <p className={s.itemTitle} lang={clip.lang}>
          {clip.title}
        </p>
        <div className={s.metaRow}>
          <span className={s.chip}>{clip.lang === 'kk' ? t('video.inKazakh') : t('video.inRussian')}</span>
          {/* date and length stay in one span so a wrap never leaves a separator dot dangling */}
          <span>
            {formatDate(clip.published, locale)} · {formatDuration(clip.durationSec, t)}
          </span>
        </div>
        <div className={s.actions}>
          {item.clips.length > 1 && (
            <div className={s.langSwitch} role="group" aria-label={t('video.langLabel')}>
              {item.clips.map((cl) => (
                <button
                  key={cl.lang}
                  className={[s.langBtn, cl.lang === clip.lang ? s.langBtnOn : ''].join(' ')}
                  aria-pressed={cl.lang === clip.lang}
                  onClick={() => {
                    setLangOverride(cl.lang)
                    setPlaying(false)
                  }}
                >
                  {cl.lang.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <a className={s.external} href={watchUrl} target="_blank" rel="noreferrer noopener">
            {t('video.openOnYoutube')}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function VideoList({ items }: { items: VideoItem[] }) {
  const { t } = useI18n()
  if (items.length === 0) return null
  return (
    <div className={s.wrap}>
      <p className={s.hint}>{t('video.hint')}</p>
      <div className={s.list}>
        {items.map((v) => (
          <VideoRow key={v.id} item={v} />
        ))}
      </div>
      <SourceLink id="youtube" />
    </div>
  )
}
