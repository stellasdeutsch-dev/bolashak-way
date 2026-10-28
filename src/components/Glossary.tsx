import { GLOSSARY } from '@/content/glossary'
import { useI18n } from '@/i18n'
import { SourceLink } from './ui'
import s from './Glossary.module.css'

/** The handful of words every page assumes you know, each opened in place. */
export function Glossary() {
  const { c } = useI18n()
  return (
    <div className={s.list}>
      {GLOSSARY.map((g) => (
        <details key={g.id} className={s.item}>
          <summary className={s.term}>{c(g.term)}</summary>
          <div className={s.body}>
            <p>{c(g.text)}</p>
            <SourceLink id={g.source} />
          </div>
        </details>
      ))}
    </div>
  )
}
