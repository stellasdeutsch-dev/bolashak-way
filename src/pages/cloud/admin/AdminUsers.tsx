import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Button, Card, Pill } from '@/components/ui'
import { IconDownload as Download } from '@/components/icons'
import { CATEGORIES } from '@/content/categories'
import { CHAPTERS } from '@/content/stages'
import type { CategoryId, ChapterId, Track } from '@/content/types'
import { useI18n } from '@/i18n'
import { fetchAllUsers } from '@/cloud/queries'
import { toCsv, downloadText } from '@/cloud/csv'
import { useAdminData } from './useAdminData'
import { categoryLabel, chapterLabel, fmtDate, stageLabel } from './labels'
import { EMPTY_FILTERS, filterUsers, sortUsers, type SortKey, type UserFilters } from './usersTable'
import s from './admin.module.css'

const TRACKS: Track[] = ['bachelor', 'master', 'phd_residency', 'internship', 'science_internship']
const PAGE = 50

export function AdminUsers() {
  const { t, locale } = useI18n()
  const { data, error, loading, refresh } = useAdminData(fetchAllUsers)
  const [filters, setFilters] = useState<UserFilters>(EMPTY_FILTERS)
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'activity', dir: 'desc' })
  const [page, setPage] = useState(0)

  const rows = useMemo(() => (data ? sortUsers(filterUsers(data, filters), sort.key, sort.dir) : []), [data, filters, sort])
  const pages = Math.max(1, Math.ceil(rows.length / PAGE))
  const visible = rows.slice(page * PAGE, page * PAGE + PAGE)

  const set = (patch: Partial<UserFilters>) => {
    setFilters((f) => ({ ...f, ...patch }))
    setPage(0)
  }
  const toggleSort = (key: SortKey) => setSort((cur) => ({ key, dir: cur.key === key && cur.dir === 'desc' ? 'asc' : 'desc' }))
  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 'desc' ? ' ↓' : ' ↑') : '')

  const exportCsv = () => {
    const head = [t('admin.colEmail'), t('admin.colRole'), t('admin.colSignedUp'), t('admin.filterTrack'), t('admin.colCategory'), t('admin.colStage'), t('admin.colProgress'), t('admin.colActivity')]
    const body = rows.map((r) => [
      r.email,
      r.role,
      r.created_at.slice(0, 10),
      r.progress?.track ?? '',
      categoryLabel(r.progress?.category ?? null, locale),
      r.progress ? stageLabel(r.progress.current_stage, locale, t('admin.completed')) : '',
      r.progress ? Math.round(r.progress.ratio * 100) : '',
      r.progress?.updated_at?.slice(0, 10) ?? '',
    ])
    downloadText(toCsv(head, body), `bolashak-way-users-${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8')
  }

  if (error) return <p className={s.error}>{t('admin.loadError')}: {error}</p>

  return (
    <Card>
      <div className={s.section}>
        <div className={s.toolbar}>
          <input type="search" placeholder={t('admin.search')} value={filters.query} onChange={(e) => set({ query: e.target.value })} aria-label={t('admin.search')} />
          <select value={filters.track} onChange={(e) => set({ track: e.target.value, category: '' })} aria-label={t('admin.filterTrack')}>
            <option value="">{t('admin.filterTrack')}: {t('admin.any')}</option>
            {TRACKS.map((tr) => (
              <option key={tr} value={tr}>
                {t(`category.track_${tr}`)}
              </option>
            ))}
          </select>
          <select value={filters.category} onChange={(e) => set({ category: e.target.value })} aria-label={t('admin.filterCategory')}>
            <option value="">{t('admin.filterCategory')}: {t('admin.any')}</option>
            {(Object.keys(CATEGORIES) as CategoryId[])
              .filter((id) => !filters.track || CATEGORIES[id].track === filters.track)
              .map((id) => (
                <option key={id} value={id}>
                  {categoryLabel(id, locale)}
                </option>
              ))}
          </select>
          <select value={filters.chapter} onChange={(e) => set({ chapter: e.target.value as ChapterId | '' | 'none' })} aria-label={t('admin.filterChapter')}>
            <option value="">{t('admin.filterChapter')}: {t('admin.any')}</option>
            {CHAPTERS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {chapterLabel(ch.id, locale)}
              </option>
            ))}
            <option value="none">{t('admin.noProgress')}</option>
          </select>
          <select value={filters.role} onChange={(e) => set({ role: e.target.value as UserFilters['role'] })} aria-label={t('admin.filterRole')}>
            <option value="">{t('admin.filterRole')}: {t('admin.any')}</option>
            <option value="user">{t('account.roleUser')}</option>
            <option value="admin">{t('account.roleAdmin')}</option>
          </select>
          <Button size="sm" variant="ghost" onClick={exportCsv} disabled={rows.length === 0}>
            <Download size={15} aria-hidden="true" />
            {t('admin.csv')}
          </Button>
          <Button size="sm" variant="quiet" onClick={() => void refresh()} disabled={loading}>
            {t('admin.refresh')}
          </Button>
        </div>

        {!data ? (
          <p className={s.empty}>{t('admin.loading')}</p>
        ) : rows.length === 0 ? (
          <p className={s.empty}>{t('admin.empty')}</p>
        ) : (
          <>
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th onClick={() => toggleSort('email')}>{t('admin.colEmail')}{arrow('email')}</th>
                    <th onClick={() => toggleSort('category')}>{t('admin.colCategory')}{arrow('category')}</th>
                    <th>{t('admin.colStage')}</th>
                    <th onClick={() => toggleSort('ratio')}>{t('admin.colProgress')}{arrow('ratio')}</th>
                    <th onClick={() => toggleSort('activity')}>{t('admin.colActivity')}{arrow('activity')}</th>
                    <th onClick={() => toggleSort('created')}>{t('admin.colSignedUp')}{arrow('created')}</th>
                    <th>{t('admin.colRole')}</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <Link className={s.emailLink} to={`/admin/users/${r.id}`}>
                          {r.email || r.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td>{r.progress?.category ? categoryLabel(r.progress.category, locale) : <span className={s.muted}>{t('admin.noRoadmapYet')}</span>}</td>
                      <td>{r.progress?.category ? stageLabel(r.progress.current_stage, locale, t('admin.completed')) : '—'}</td>
                      <td>
                        {r.progress ? (
                          <span className={s.pct}>
                            <span className={s.pctTrack}>
                              <span className={s.pctFill} style={{ width: `${Math.round(r.progress.ratio * 100)}%` }} />
                            </span>
                            {Math.round(r.progress.ratio * 100)}%
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{fmtDate(r.progress?.updated_at, locale)}</td>
                      <td>{fmtDate(r.created_at, locale)}</td>
                      <td>{r.role === 'admin' ? <Pill tone="accent">{t('account.roleAdmin')}</Pill> : <span className={s.muted}>{t('account.roleUser')}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={s.pager}>
              <span>{t('admin.shown', { n: visible.length, total: rows.length })}</span>
              {pages > 1 && (
                <span className={s.row}>
                  <Button size="sm" variant="quiet" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                    {t('admin.prev')}
                  </Button>
                  {page + 1} / {pages}
                  <Button size="sm" variant="quiet" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>
                    {t('admin.next')}
                  </Button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
