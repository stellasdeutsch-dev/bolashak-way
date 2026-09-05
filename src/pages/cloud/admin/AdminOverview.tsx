import { Button, Card } from '@/components/ui'
import { CHAPTERS, STAGES } from '@/content/stages'
import { useI18n } from '@/i18n'
import { fetchStats } from '@/cloud/queries'
import { useAdminData } from './useAdminData'
import { BarList, Buckets, Funnel, Sparkline, StatTile } from './charts'
import { categoryLabel, chapterLabel, chapterOf, fmtDate, stageLabel } from './labels'
import s from './admin.module.css'

export function AdminOverview() {
  const { t, locale } = useI18n()
  const { data, error, loading, refresh } = useAdminData(fetchStats)

  if (error) return <p className={s.error}>{t('admin.loadError')}: {error}</p>
  if (!data) return <p className={s.empty}>{t('admin.loading')}</p>

  const funnel = CHAPTERS.map((ch) => {
    const value = Object.entries(data.by_current_stage)
      .filter(([stage]) => chapterOf(stage) === ch.id)
      .reduce((n, [, v]) => n + v, 0)
    return { label: chapterLabel(ch.id, locale), value, total: STAGES.filter((st) => st.chapter === ch.id).length }
  })
  const completed = data.by_current_stage['__complete'] ?? 0
  const trackItems = Object.entries(data.by_track).map(([k, v]) => ({ label: t(`category.track_${k}`), value: v }))
  const categoryItems = Object.entries(data.by_category).map(([k, v]) => ({ label: categoryLabel(k, locale), value: v }))
  const stageItems = Object.entries(data.by_current_stage)
    .filter(([k]) => k !== '__complete')
    .map(([k, v]) => ({ label: stageLabel(k, locale, t('admin.completed')), value: v }))

  return (
    <>
      <Card>
        <div className={s.section}>
          <div className={s.row}>
            <span className={s.meta}>
              {t('admin.generatedAt')} {fmtDate(data.generated_at, locale, true)}
            </span>
            <Button size="sm" variant="quiet" onClick={() => void refresh()} disabled={loading}>
              {t('admin.refresh')}
            </Button>
          </div>
          <div className={s.tiles}>
            <StatTile value={data.users_total} label={t('admin.usersTotal')} />
            <StatTile value={data.onboarded} label={t('admin.onboarded')} />
            <StatTile value={data.active_7d} label={t('admin.active7')} />
            <StatTile value={data.active_30d} label={t('admin.active30')} />
            <StatTile value={completed} label={t('admin.completed')} />
            <StatTile value={data.admins} label={t('admin.admins')} />
          </div>
        </div>
      </Card>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('admin.funnel')}</span>
          <Funnel rows={funnel} empty={t('admin.noData')} />
        </div>
      </Card>

      <div className={s.grid2}>
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('admin.byTrack')}</span>
            <BarList items={trackItems} empty={t('admin.noData')} />
          </div>
        </Card>
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('admin.byCategory')}</span>
            <BarList items={categoryItems} empty={t('admin.noData')} />
          </div>
        </Card>
      </div>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('admin.byStage')}</span>
          <BarList items={stageItems} empty={t('admin.noData')} />
        </div>
      </Card>

      <div className={s.grid2}>
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('admin.signups')}</span>
            <Sparkline points={data.signups_by_week.map((p) => ({ x: p.week, y: p.n }))} empty={t('admin.noData')} labelOf={(x) => fmtDate(x, locale)} />
          </div>
        </Card>
        <Card>
          <div className={s.section}>
            <span className={s.sectionTitle}>{t('admin.activity')}</span>
            <Sparkline points={data.active_by_day.map((p) => ({ x: p.day, y: p.n }))} empty={t('admin.noData')} labelOf={(x) => fmtDate(x, locale)} />
          </div>
        </Card>
      </div>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('admin.buckets')}</span>
          <Buckets buckets={data.ratio_buckets} empty={t('admin.noData')} />
        </div>
      </Card>
    </>
  )
}
