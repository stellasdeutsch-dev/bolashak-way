import { Link } from 'react-router'
import { CONTENT_META } from '@/content/meta'
import { formatDate, useI18n } from '@/i18n'
import { IconArrowLeft as ArrowLeft, IconExternal as ExternalLink } from '@/components/icons'
import { siteHome } from '@/domain/site'
import s from './PageFootnote.module.css'

export const REPORT_URL = 'https://github.com/stellasdeutsch-dev/bolashak-way/issues/new'

/** The small print under the programme chooser and every programme's overview. */
export function PageFootnote() {
  const { t, c, locale } = useI18n()
  return (
    <footer className={s.footnote}>
      <p>{t('landing.sourcesNote')}</p>
      <p>
        {t('common.verifiedOn')}: {formatDate(CONTENT_META.lastVerified, locale)}. {c(CONTENT_META.disclaimer)}
      </p>
      <p className={s.footLinks}>
        <a href={siteHome(locale)} hrefLang={locale}>
          <ArrowLeft size={13} aria-hidden="true" /> {t('site.toHome')}
        </a>
        <a href="https://bolashak.gov.kz/ru" target="_blank" rel="noopener noreferrer">
          <ExternalLink size={13} aria-hidden="true" /> {t('landing.official')}
        </a>
        <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={13} aria-hidden="true" /> {t('landing.report')}
        </a>
        <Link to="/settings" state={{ scrollTo: 'privacy' }}>
          {t('settings.privacy')}
        </Link>
      </p>
      <p>{t('landing.reportPublic')}</p>
    </footer>
  )
}
