import { useMemo, useState } from 'react'
import { Button, Card, ConfirmDialog, Pill } from '@/components/ui'
import { useI18n } from '@/i18n'
import { getSupabase } from '@/cloud/supabase'
import { useAuthStore } from '@/cloud/useAuth'
import { fetchAllUsers, setRole } from '@/cloud/queries'
import type { AdminUserRow } from '@/cloud/types'
import { useAdminData } from './useAdminData'
import { fmtDate } from './labels'
import s from './admin.module.css'

export function AdminRoles() {
  const { t, locale } = useI18n()
  const me = useAuthStore((a) => a.user?.id ?? '')
  const refreshRole = useAuthStore((a) => a.refreshRole)
  const { data, error, refresh } = useAdminData(fetchAllUsers)
  const [query, setQuery] = useState('')
  const [pending, setPending] = useState<{ user: AdminUserRow; role: 'user' | 'admin' } | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const admins = useMemo(() => (data ?? []).filter((u) => u.role === 'admin'), [data])
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || !data) return []
    return data.filter((u) => u.role !== 'admin' && u.email.toLowerCase().includes(q)).slice(0, 20)
  }, [data, query])

  const apply = async () => {
    if (!pending) return
    const client = getSupabase()
    if (!client) return
    setActionError(null)
    try {
      await setRole(client, pending.user.id, pending.role)
      await refresh()
      if (pending.user.id === me) await refreshRole()
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setActionError(msg.includes('last admin') ? t('admin.lastAdmin') : msg)
    } finally {
      setPending(null)
    }
  }

  if (error) return <p className={s.error}>{t('admin.loadError')}: {error}</p>

  return (
    <>
      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('admin.currentAdmins')}</span>
          {actionError && <p className={s.error}>{actionError}</p>}
          {!data ? (
            <p className={s.empty}>{t('admin.loading')}</p>
          ) : (
            <div className={s.stageList}>
              {admins.map((u) => (
                <div key={u.id} className={s.stageRow}>
                  <b>
                    {u.email} {u.id === me && <span className={s.muted}>· {t('admin.you')}</span>}
                  </b>
                  <span className={s.muted}>{fmtDate(u.created_at, locale)}</span>
                  <Button size="sm" variant="quiet" disabled={admins.length <= 1} onClick={() => setPending({ user: u, role: 'user' })}>
                    {t('admin.demote')}
                  </Button>
                </div>
              ))}
              {admins.length <= 1 && <p className={s.meta}>{t('admin.lastAdmin')}</p>}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <div className={s.section}>
          <span className={s.sectionTitle}>{t('admin.findUser')}</span>
          <div className={s.toolbar}>
            <input type="search" placeholder={t('admin.search')} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={t('admin.search')} />
          </div>
          {query && matches.length === 0 && <p className={s.empty}>{t('admin.empty')}</p>}
          <div className={s.stageList}>
            {matches.map((u) => (
              <div key={u.id} className={s.stageRow}>
                <b>{u.email}</b>
                <Pill>{t('account.roleUser')}</Pill>
                <Button size="sm" variant="secondary" onClick={() => setPending({ user: u, role: 'admin' })}>
                  {t('admin.promote')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={pending !== null}
        title={t(pending?.role === 'admin' ? 'admin.promote' : 'admin.demote')}
        text={t(pending?.role === 'admin' ? 'admin.promoteText' : 'admin.demoteText', { email: pending?.user.email ?? '' })}
        confirmLabel={t(pending?.role === 'admin' ? 'admin.promote' : 'admin.demote')}
        onCancel={() => setPending(null)}
        onConfirm={() => void apply()}
      />
    </>
  )
}
