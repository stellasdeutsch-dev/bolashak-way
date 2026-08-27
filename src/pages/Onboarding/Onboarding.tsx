import { useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import {
  ArrowLeft, ArrowRight, GraduationCap, Landmark, Briefcase, FlaskConical, School,
  MailCheck, MailQuestion, MailX, Languages, BadgeCheck, Ban, Clock, Sparkles, Fingerprint,
} from 'lucide-react'
import { CATEGORIES, CATEGORIES_BY_TRACK, WORKER_GROUPS } from '@/content/categories'
import { CONTENT_META } from '@/content/meta'
import type { ExamId, Invitation, Track } from '@/content/types'
import { defaultCategoryFor, draftFromProfile, emptyDraft, isStepComplete, toProfile, type OnboardingDraft } from '@/domain/profile'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/i18n'
import { Button, Card, Pill } from '@/components/ui'
import s from './Onboarding.module.css'

const TRACKS: { id: Track; Icon: typeof GraduationCap }[] = [
  { id: 'bachelor', Icon: School },
  { id: 'master', Icon: GraduationCap },
  { id: 'phd_residency', Icon: Landmark },
  { id: 'internship', Icon: Briefcase },
  { id: 'science_internship', Icon: FlaskConical },
]

const INVITATIONS: { id: Invitation; Icon: typeof MailCheck; title: string; desc: string }[] = [
  { id: 'none', Icon: MailX, title: 'onboarding.inv_none', desc: 'onboarding.inv_none_d' },
  { id: 'applied', Icon: MailQuestion, title: 'onboarding.inv_applied', desc: 'onboarding.inv_applied_d' },
  { id: 'unconditional', Icon: MailCheck, title: 'onboarding.inv_yes', desc: 'onboarding.inv_yes_d' },
]

const EXAMS: ExamId[] = ['ielts', 'toefl_ibt', 'toefl_pbt', 'det', 'other']

const STEPS = 4
const LAST_STEP = STEPS - 1

function Option({
  active,
  icon,
  title,
  desc,
  onClick,
}: {
  active: boolean
  icon: ReactNode
  title: string
  desc?: string
  onClick: () => void
}) {
  return (
    <button
      className={[s.option, active ? s.optionActive : ''].join(' ')}
      onClick={onClick}
      aria-pressed={active}
      aria-label={desc ? `${title}. ${desc}` : title}
    >
      <span className={s.optionIcon}>{icon}</span>
      <span className={s.optionBody}>
        <span className={s.optionTitle}>{title}</span>
        {desc && <span className={s.optionDesc}>{desc}</span>}
      </span>
    </button>
  )
}

export function Onboarding() {
  const { t, c } = useI18n()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const editing = params.get('edit') === '1'
  const profile = useAppStore((st) => st.profile)
  const setProfile = useAppStore((st) => st.setProfile)

  const [draft, setDraft] = useState<OnboardingDraft>(() => (profile ? draftFromProfile(profile) : emptyDraft()))
  const [step, setStep] = useState(editing || profile ? 0 : -1)

  const update = (patch: Partial<OnboardingDraft>) => setDraft((d) => ({ ...d, ...patch }))

  const categoryOptions = useMemo(() => (draft.track ? CATEGORIES_BY_TRACK[draft.track] : []), [draft.track])
  const canNext = step >= 0 && isStepComplete(draft, step)

  const finish = () => {
    setProfile(toProfile(draft))
    navigate('/', { replace: true })
  }

  // Guard the bounds: a double-click must not push the wizard past the last question.
  const next = () => {
    if (step >= LAST_STEP) return finish()
    setStep((v) => Math.min(LAST_STEP, v + 1))
  }
  const back = () => {
    if (step === 0 && (editing || profile)) navigate(-1)
    else setStep((v) => Math.max(0, v - 1))
  }

  if (step === -1) {
    return (
      <div className={s.wrap}>
        <Card dark className={s.welcome}>
          <Pill tone="dark">
            <Sparkles size={13} aria-hidden="true" />
            {t('onboarding.welcomeKicker')}
          </Pill>
          <h1 className={`display ${s.welcomeTitle}`}>
            {CONTENT_META.competitionYear}
            <b>{t('onboarding.welcomeTitle')}</b>
          </h1>
          <p className={s.welcomeText}>{t('onboarding.welcomeText')}</p>
          <div className={s.welcomeStats}>
            <Pill tone="dark">
              {t('common.year')}: {CONTENT_META.competitionYear}
            </Pill>
            <Pill tone="dark">
              {t('common.verifiedOn')}: {CONTENT_META.lastVerified}
            </Pill>
          </div>
          <div>
            <Button size="lg" onClick={() => setStep(0)}>
              <Fingerprint size={17} aria-hidden="true" />
              {t('onboarding.start')}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={s.wrap}>
      <div className={s.dots} aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => i).map((i) => (
          <span key={i} className={[s.dot, i < step ? s.dotDone : '', i === step ? s.dotActive : ''].join(' ')}>
            <span className={s.dotFill} />
          </span>
        ))}
      </div>

      <div className={s.head}>
        <span className={s.step}>{t('onboarding.stepOf', { n: step + 1, total: STEPS })}</span>
        <h1 className={s.question}>
          {step === 0 && t('onboarding.q1')}
          {step === 1 && t('onboarding.q2')}
          {step === 2 && t('onboarding.q3')}
          {step === 3 && t('onboarding.q4')}
        </h1>
        <p className={s.hint}>
          {step === 0 && t('onboarding.q1hint')}
          {step === 1 && t('onboarding.q2hint')}
          {step === 2 && t('onboarding.otherExamHint')}
          {step === 3 && t('onboarding.q4hint')}
        </p>
        {editing && step === 0 && <Pill tone="warn">{t('onboarding.editNote')}</Pill>}
      </div>

      {step === 0 && (
        <div>
          <div className={`${s.options} ${s.options2}`}>
            {TRACKS.map(({ id, Icon }) => (
              <Option
                key={id}
                active={draft.track === id}
                icon={<Icon size={20} />}
                title={t(`category.track_${id}`)}
                desc={t(`category.track_${id}_d`)}
                onClick={() => update({ track: id, category: defaultCategoryFor(id), workerGroup: id === 'internship' ? draft.workerGroup : null })}
              />
            ))}
          </div>

          {draft.track && categoryOptions.length > 1 && (
            <>
              <div className={s.subhead}>{t('onboarding.q1sub')}</div>
              <div className={s.chips}>
                {categoryOptions.map((id) => (
                  <button
                    key={id}
                    className={[s.chip, draft.category === id ? s.chipActive : ''].join(' ')}
                    onClick={() => update({ category: id })}
                    aria-pressed={draft.category === id}
                    title={c(CATEGORIES[id].desc)}
                  >
                    {c(CATEGORIES[id].short)}
                  </button>
                ))}
              </div>
              {draft.category && <p className={s.hint} style={{ marginTop: 10 }}>{c(CATEGORIES[draft.category].desc)}</p>}
            </>
          )}

          {draft.track === 'internship' && (
            <>
              <div className={s.subhead}>{t('category.workerGroup')}</div>
              <div className={s.chips}>
                {WORKER_GROUPS.map((g) => (
                  <button
                    key={g.id}
                    className={[s.chip, draft.workerGroup === g.id ? s.chipActive : ''].join(' ')}
                    onClick={() => update({ workerGroup: g.id })}
                    aria-pressed={draft.workerGroup === g.id}
                  >
                    {c(g.title)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {step === 1 && (
        <div className={s.options}>
          {INVITATIONS.map(({ id, Icon, title, desc }) => (
            <Option
              key={id}
              active={draft.invitation === id}
              icon={<Icon size={20} />}
              title={t(title)}
              desc={t(desc)}
              onClick={() => update({ invitation: id })}
            />
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <div className={s.subhead}>{t('onboarding.q3foreign')}</div>
          <div className={`${s.options} ${s.options2}`}>
            <Option
              active={draft.hasForeignCert === false}
              icon={<Ban size={20} />}
              title={t('onboarding.noCert')}
              onClick={() => update({ hasForeignCert: false, score: '' })}
            />
            <Option
              active={draft.hasForeignCert === true}
              icon={<Languages size={20} />}
              title={t('onboarding.hasCert')}
              onClick={() => update({ hasForeignCert: true })}
            />
          </div>
          {draft.hasForeignCert && (
            <div className={s.field}>
              <label className={s.inputWrap}>
                <span className={s.label}>{t('onboarding.exam')}</span>
                <select className={s.select} value={draft.exam} onChange={(e) => update({ exam: e.target.value as ExamId })}>
                  {EXAMS.map((e) => (
                    <option key={e} value={e}>
                      {t(`exams.${e}`)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={s.inputWrap}>
                <span className={s.label}>{t('onboarding.score')}</span>
                <input
                  className={s.input}
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  value={draft.score}
                  onChange={(e) => update({ score: e.target.value })}
                  placeholder="6.5"
                />
              </label>
            </div>
          )}

          <div className={s.subhead}>{t('onboarding.q3kazakh')}</div>
          <div className={`${s.options} ${s.options2}`}>
            <Option
              active={draft.kazakhCert === false}
              icon={<Ban size={20} />}
              title={t('onboarding.noCert')}
              onClick={() => update({ kazakhCert: false })}
            />
            <Option
              active={draft.kazakhCert === true}
              icon={<BadgeCheck size={20} />}
              title={t('onboarding.hasCert')}
              onClick={() => update({ kazakhCert: true })}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className={`${s.options} ${s.options2}`}>
            <Option
              active={draft.hasExperience === false}
              icon={<Ban size={20} />}
              title={t('onboarding.noExp')}
              onClick={() => update({ hasExperience: false, years: '', continuousMonths: '' })}
            />
            <Option
              active={draft.hasExperience === true}
              icon={<Clock size={20} />}
              title={t('onboarding.hasExp')}
              onClick={() => update({ hasExperience: true })}
            />
          </div>
          {draft.hasExperience && (
            <div className={s.field}>
              <label className={s.inputWrap}>
                <span className={s.label}>{t('onboarding.years')}</span>
                <input
                  className={s.input}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="60"
                  value={draft.years}
                  onChange={(e) => update({ years: e.target.value })}
                  placeholder="3"
                />
              </label>
              <label className={s.inputWrap}>
                <span className={s.label}>{t('onboarding.continuous')}</span>
                <input
                  className={s.input}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="600"
                  value={draft.continuousMonths}
                  onChange={(e) => update({ continuousMonths: e.target.value })}
                  placeholder="12"
                />
              </label>
            </div>
          )}
        </div>
      )}

      <div className={s.footer}>
        {(step > 0 || editing || profile) && (
          <Button variant="quiet" onClick={back}>
            <ArrowLeft size={16} aria-hidden="true" />
            {t('common.back')}
          </Button>
        )}
        <span className={s.grow} />
        <Button size="lg" onClick={next} disabled={!canNext}>
          {step === LAST_STEP ? (editing ? t('onboarding.save') : t('onboarding.finish')) : t('common.next')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
