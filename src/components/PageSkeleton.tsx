import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n'
import s from './PageSkeleton.module.css'

/**
 * What the reader sees while a page's code is still on its way: three grey cards in the
 * page's own layout. It waits 300 ms first, so on a fast connection nothing flashes.
 */
export function PageSkeleton() {
  const { t } = useI18n()
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 300)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <div className={s.wrap} aria-busy="true" role="status" aria-label={t('common.loading')}>
      {shown && (
        <>
          <div className={[s.block, s.hero].join(' ')} />
          <div className={s.block} />
          <div className={s.block} />
        </>
      )}
    </div>
  )
}
