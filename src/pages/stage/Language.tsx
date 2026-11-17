import { ENGLISH_THRESHOLDS, KAZAKH_REQUIREMENT, LANGUAGE_GROUP_BY_CATEGORY, LANGUAGE_NOTES, SCIENCE_LANGUAGES } from '@/content/language'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { Callout, Card, FallbackBadge, SourceLink } from '@/components/ui'
import { ResponsiveTable } from '@/components/ResponsiveTable'
import type { StageExtraProps } from './types'
import s from '../Stage.module.css'

/** The foreign-language stage: the threshold table of the reader's category and its notes. */
export function ForeignLanguage() {
  return (
    <>
      <LanguageTable />
      <LanguageNotes />
    </>
  )
}

/** The Kazakh-language stage: the minimum level, cited from the programme's own act. */
export function KazakhRequirement({ platform }: StageExtraProps) {
  const { t, c } = useI18n()
  return (
    <Callout tone="info" source={platform.kazakhSource}>
      <strong>{t('stage.kazakhTitle')}</strong>
      <br />
      {c(KAZAKH_REQUIREMENT.text)}
    </Callout>
  )
}

function LanguageTable() {
  const { t } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const group = LANGUAGE_GROUP_BY_CATEGORY[profile.category]
  if (group === 'none') return null
  const science = group === 'science'
  // For applicants admitted on their own and for doctoral/residency applicants the Rules
  // (pp573 п. 9 пп. 3, пп. 11–12) set no language condition: Order 318 is shown for reference.
  const advisory = group === 'self'
  // Only the preferential table has three levels; everywhere else one threshold decides.
  const oneLevel = group !== 'preferential'
  const rows = ENGLISH_THRESHOLDS[group]

  return (
    <Card>
      <h2 className={s.sectionTitle} style={{ marginBottom: 12 }}>
        {t('stage.thresholdTable')}
      </h2>
      {advisory && <p className={s.body} style={{ margin: '10px 0 0' }}>{t('stage.advisoryNote')}</p>}

      {/* A table where it fits, one card per exam on a phone. */}
      <ResponsiveTable
        label={t('stage.thresholdTable')}
        head={oneLevel ? [t('onboarding.exam'), t('stage.threshold')] : [t('onboarding.exam'), t('stage.level1'), t('stage.level2'), t('stage.level3')]}
        rows={rows.map((r) => ({
          key: r.exam,
          cells: oneLevel ? [r.label, r.third ?? '–'] : [r.label, r.first ?? '–', r.second ?? '–', r.third ?? '–'],
        }))}
        wrapClassName={s.tableWrap}
        tableClassName={s.table}
      />
      {!oneLevel && (
        <p className={s.body} style={{ marginTop: 12, fontSize: 13.5 }}>
          {t('stage.levelsNote')}
        </p>
      )}
      {science && <ScienceLanguages />}
      <div style={{ marginTop: 10 }}>
        <SourceLink id={science ? 'ns_rules422' : 'prikaz318'} />
      </div>
    </Card>
  )
}

/** Minimums for scientific internships by the language they run in (their own file, not Order 318). */
function ScienceLanguages() {
  const { t, c } = useI18n()
  return (
    <>
      <p className={s.body} style={{ marginTop: 16, fontSize: 13.5 }}>
        {t('stage.scienceLanguagesNote')}
      </p>
      <ResponsiveTable
        label={t('stage.internshipLanguage')}
        head={[t('stage.internshipLanguage'), t('stage.minimum')]}
        rows={SCIENCE_LANGUAGES.map((r) => ({ key: r.lang.ru, cells: [c(r.lang), r.level === '–' ? t('stage.notRequired') : r.level] }))}
        wrapClassName={s.tableWrap}
        tableClassName={s.table}
      />
    </>
  )
}

/** Special cases and non-English thresholds from приказ №318, shown under the table. */
function LanguageNotes() {
  const { t, cf } = useI18n()
  const track = useAppStore((st) => st.profile!.track)
  const notes = LANGUAGE_NOTES.filter((n) => n.tracks.includes(track))
  // Every note comes from the same order, so the link belongs to the block, not each line.
  const sources = [...new Set(notes.map((n) => n.source))]
  if (notes.length === 0) return null
  return (
    <Card>
      <div className={s.section}>
        <h2 className={s.sectionTitle}>{t('stage.languageNotes')}</h2>
        {notes.map((n, i) => {
          const text = cf(n.text)
          return (
            <p key={i} className={s.reqRow}>
              <span>
                {text.text}
                {text.fallback && <FallbackBadge />}
              </span>
              {sources.length > 1 && <SourceLink id={n.source} />}
            </p>
          )
        })}
        {sources.length === 1 && (
          <div className={s.blockSource}>
            <SourceLink id={sources[0]} />
          </div>
        )}
      </div>
    </Card>
  )
}
