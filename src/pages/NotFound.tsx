import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { pathsForTrack } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { ButtonLink, Card } from '@/components/ui'

export function NotFound() {
  const { t } = useI18n()
  const profile = useAppStore((st) => st.profile)
  usePageChrome(t('common.notFound'))
  return (
    <Card>
      <h1 className="display" style={{ fontSize: 30, marginTop: 12 }}>
        Bolashak Way
        <b>{t('common.notFound')}</b>
      </h1>
      <p style={{ marginTop: 12, color: 'var(--text-2)' }}>{t('common.notFoundText')}</p>
      <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {profile && <ButtonLink to={pathsForTrack(profile.track).roadmap}>{t('common.myRoadmap')}</ButtonLink>}
        <ButtonLink to="/" variant={profile ? 'ghost' : 'primary'}>
          {t('platform.allProgrammes')}
        </ButtonLink>
      </div>
    </Card>
  )
}
