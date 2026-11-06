import { useNavigate } from 'react-router'
import { useI18n } from '@/i18n'
import { Button, Card } from '@/components/ui'

export function NotFound() {
  const { t } = useI18n()
  const navigate = useNavigate()
  return (
    <Card>
      <h1 className="display" style={{ fontSize: 30, marginTop: 12 }}>
        Bolashak Way
        <b>{t('common.notFound')}</b>
      </h1>
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => navigate('/')}>{t('platform.allProgrammes')}</Button>
      </div>
    </Card>
  )
}
