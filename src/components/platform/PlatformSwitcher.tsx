import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { PLATFORMS } from '@/content/platforms'
import { platformPaths } from '@/domain/paths'
import { useI18n } from '@/i18n'
import { useAppStore } from '@/store/useAppStore'
import { StageIcon } from '@/components/StageIcon'
import { IconChevronDown as ChevronDown, IconCheck as Check, IconCompass as Compass } from '@/components/icons'
import { useActivePlatform } from './usePlatform'
import s from './Platform.module.css'

/**
 * Which programme you are in, and the way to the other four. Each entry carries its
 * own colour so the five read as five places, not five tabs of one page.
 */
export function PlatformSwitcher() {
  const { t, c } = useI18n()
  const active = useActivePlatform()
  const myTrack = useAppStore((st) => st.profile?.track)
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={s.switcher} ref={box}>
      <button
        className={[s.switcherBtn, active ? s.switcherBtnActive : ''].join(' ')}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={active ? undefined : t('platform.choose')}
      >
        {active ? (
          <>
            <span className={s.switcherIcon} data-p={active.slug}>
              <StageIcon name={active.icon} size={14} />
            </span>
            <span className={s.switcherName}>{c(active.name)}</span>
          </>
        ) : (
          <>
            <Compass size={16} aria-hidden="true" />
            <span className={[s.switcherName, s.hideNarrow].join(' ')}>{t('platform.choose')}</span>
          </>
        )}
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className={s.switcherMenu} role="menu">
          <span className={s.switcherGroup}>{t('platform.bolashak')}</span>
          {PLATFORMS.map((p, i) => (
            <div key={p.slug}>
              {i === 4 && <span className={s.switcherGroup}>{t('platform.scienceProgramme')}</span>}
              <Link role="menuitem" to={platformPaths(p.slug).home} className={s.switcherItem} data-p={p.slug} onClick={() => setOpen(false)}>
                <span className={s.switcherIcon} data-p={p.slug}>
                  <StageIcon name={p.icon} size={15} />
                </span>
                <span className={s.switcherItemText}>
                  <b>{c(p.name)}</b>
                  {myTrack === p.track && <span className={s.switcherMine}>{t('platform.mine')}</span>}
                </span>
                {active?.slug === p.slug && <Check size={16} aria-hidden="true" />}
              </Link>
            </div>
          ))}
          <Link role="menuitem" to="/" className={s.switcherAll} onClick={() => setOpen(false)}>
            {t('platform.allProgrammes')}
          </Link>
        </div>
      )}
    </div>
  )
}
