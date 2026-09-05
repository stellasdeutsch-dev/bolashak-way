import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '@/cloud/supabase'
import type { AdminClient } from '@/cloud/queries'

/** Load-once-with-refresh helper shared by the admin screens. */
export function useAdminData<T>(load: (client: AdminClient) => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const client = getSupabase()
    if (!client) return
    setLoading(true)
    setError(null)
    try {
      setData(await load(client))
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [load])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { data, error, loading, refresh }
}
