import { useEffect, useRef, useState } from 'react'
import { FORMS, formsForStage, type OfficialForm } from '@/content/forms'
import type { StageId } from '@/content/types'
import { evaluate } from '@/domain/applicability'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { Button, SourceLink } from '@/components/ui'
import {
  IconClose as Close, IconDownload as Download, IconExternal as ExternalLink,
  IconFileStack as FileStack, IconFileSignature as FileSignature,
} from '@/components/icons'
import s from './Forms.module.css'

function sizeLabel(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

/**
 * PDFs render inside the app: bolashak.gov.kz sends no X-Frame-Options or frame-ancestors,
 * so the file can sit in an iframe. Word blanks cannot be shown by any browser, so those
 * only ever offer a download.
 */
function PdfViewer({ form, onClose }: { form: OfficialForm; onClose: () => void }) {
  const { t, c } = useI18n()
  const box = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement
    box.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      restoreTo.current?.focus?.()
    }
  }, [onClose])

  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={c(form.title)} onClick={onClose}>
      <div className={s.viewer} ref={box} onClick={(e) => e.stopPropagation()}>
        <div className={s.viewerBar}>
          <span className={s.viewerTitle}>{c(form.title)}</span>
          <a className={s.viewerLink} href={form.url} target="_blank" rel="noreferrer noopener">
            {t('forms.openTab')}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <button className={s.viewerClose} onClick={onClose} aria-label={t('common.close')}>
            <Close size={18} />
          </button>
        </div>
        <iframe className={s.frame} src={form.url} title={c(form.title)} />
        {/* A browser without a built-in PDF plugin shows nothing in the frame, so keep a way out. */}
        <p className={s.viewerHint}>{t('forms.viewerHint')}</p>
      </div>
    </div>
  )
}

function FormCard({ form, onView }: { form: OfficialForm; onView: (f: OfficialForm) => void }) {
  const { t, c } = useI18n()
  const Icon = form.kind === 'form' ? FileSignature : FileStack
  return (
    <li className={s.card}>
      <span className={[s.icon, form.kind === 'form' ? s.iconForm : s.iconSample].join(' ')}>
        <Icon size={19} />
      </span>
      <div className={s.body}>
        <span className={s.title}>{c(form.title)}</span>
        {form.note && <p className={s.note}>{c(form.note)}</p>}
        <div className={s.meta}>
          <span className={s.tag}>{t(form.kind === 'form' ? 'forms.kindForm' : 'forms.kindSample')}</span>
          <span className={s.dot} aria-hidden="true" />
          <span>
            {form.fileType.toUpperCase()} · {sizeLabel(form.bytes)}
          </span>
          <span className={s.dot} aria-hidden="true" />
          <span>{t('forms.published', { date: form.published })}</span>
        </div>
        <div className={s.actions}>
          {form.fileType === 'pdf' ? (
            <>
              <Button size="sm" variant="secondary" onClick={() => onView(form)}>
                {t('forms.view')}
              </Button>
              <a className={s.link} href={form.url} target="_blank" rel="noreferrer noopener">
                <Download size={14} aria-hidden="true" />
                {t('forms.download')}
              </a>
            </>
          ) : (
            <a className={s.primaryLink} href={form.url} target="_blank" rel="noreferrer noopener">
              <Download size={15} aria-hidden="true" />
              {t('forms.downloadWord')}
            </a>
          )}
        </div>
      </div>
    </li>
  )
}

function FormsBlock({ items }: { items: OfficialForm[] }) {
  const { t } = useI18n()
  const [open, setOpen] = useState<OfficialForm | null>(null)
  if (items.length === 0) return null
  return (
    <div className={s.wrap}>
      <p className={s.hint}>{t('forms.hint')}</p>
      <ul className={s.list}>
        {items.map((f) => (
          <FormCard key={f.id} form={f} onView={setOpen} />
        ))}
      </ul>
      <div className={s.sources}>
        {[...new Set(items.map((f) => f.source))].map((src) => (
          <SourceLink key={src} id={src} />
        ))}
      </div>
      {open && <PdfViewer form={open} onClose={() => setOpen(null)} />}
    </div>
  )
}

/** Forms attached to one stage, filtered to the reader's own track. */
export function StageForms({ stage }: { stage: StageId }) {
  const profile = useAppStore((st) => st.profile)!
  return <FormsBlock items={formsForStage(stage).filter((f) => evaluate(f.appliesTo, profile))} />
}

/** Every applicable form in one place, for the documents screen. */
export function AllForms() {
  const profile = useAppStore((st) => st.profile)!
  return <FormsBlock items={FORMS.filter((f) => evaluate(f.appliesTo, profile))} />
}
