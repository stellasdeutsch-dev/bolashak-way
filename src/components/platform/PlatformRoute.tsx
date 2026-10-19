import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router'
import { getPlatform, isPlatformSlug, platformForTrack } from '@/content/platforms'
import { platformPaths } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { ButtonLink, Card, Pill } from '@/components/ui'
import { StageIcon } from '@/components/StageIcon'
import { NotFound } from '@/pages/NotFound'
import s from './Platform.module.css'

/**
 * Validates the platform in the address. With `gate`, the page is personal (roadmap,
 * stage, documents, calendar): it needs a profile, and that profile has to belong to
 * this platform — one roadmap, one programme.
 */
export function PlatformRoute({ gate = false, children }: { gate?: boolean; children: ReactNode }) {
  const { platform } = useParams()
  const profile = useAppStore((st) => st.profile)
  if (!isPlatformSlug(platform)) return <NotFound />
  if (!gate) return <>{children}</>
  if (!profile) return <Navigate to={platformPaths(platform).start} replace />
  if (profile.track !== getPlatform(platform).track) return <PlatformMismatch slug={platform} />
  return <>{children}</>
}

function PlatformMismatch({ slug }: { slug: Parameters<typeof getPlatform>[0] }) {
  const { t, c } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const mine = platformForTrack(profile.track)
  const target = getPlatform(slug)
  return (
    <Card className={s.mismatch}>
      <Pill tone="warn">{t('platform.mismatchKicker')}</Pill>
      <h1 className={s.mismatchTitle}>{t('platform.mismatchTitle', { name: c(mine.name) })}</h1>
      <p className={s.mismatchText}>{t('platform.mismatchText', { other: c(target.name) })}</p>
      <div className={s.mismatchActions}>
        <ButtonLink to={platformPaths(mine.slug).roadmap}>
          <StageIcon name={mine.icon} size={17} />
          {t('platform.toMine', { name: c(mine.name) })}
        </ButtonLink>
        <ButtonLink to={platformPaths(slug).home} variant="ghost">
          {t('platform.lookAround', { name: c(target.name) })}
        </ButtonLink>
        <ButtonLink to={platformPaths(slug).start} variant="quiet">
          {t('platform.switchTo', { name: c(target.name) })}
        </ButtonLink>
      </div>
    </Card>
  )
}
