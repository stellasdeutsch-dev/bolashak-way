import { useNavigate } from 'react-router'
import { Compass } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button, Card, Pill } from '@/components/ui'

export function NotFound() {
  const { t } = useI18n()
  const navigate = useNavigate()
  return (
    <Card>
      <Pill tone="accent">
        <Compass size={13} aria-hidden="true" />
        404
      </Pill>
      <h1 className="display" style={{ fontSize: 30, marginTop: 12 }}>
        Bolashak Way
        <b>{t('common.notFound')}</b>
      </h1>
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => navigate('/')}>{t('common.toRoadmap')}</Button>
      </div>
    </Card>
  )
}
