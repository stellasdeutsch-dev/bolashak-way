import { describe, expect, it } from 'vitest'
import { CLOUD_UI } from '@/cloud/strings'
import { UI } from '@/i18n/ui'

describe('cloud strings', () => {
  it('carries all three languages on every leaf', () => {
    const walk = (node: unknown, path: string) => {
      if (!node || typeof node !== 'object') return
      const o = node as Record<string, unknown>
      if (typeof o.ru === 'string') {
        expect(typeof o.kk, `${path} has no Kazakh`).toBe('string')
        expect(typeof o.en, `${path} has no English`).toBe('string')
        expect((o.kk as string).length, `${path}.kk is empty`).toBeGreaterThan(0)
        expect((o.en as string).length, `${path}.en is empty`).toBeGreaterThan(0)
        return
      }
      for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`)
    }
    walk(CLOUD_UI, 'CLOUD_UI')
  })

  it('is reachable through the main UI tree', () => {
    expect((UI as Record<string, unknown>).account).toBe(CLOUD_UI.account)
    expect((UI as Record<string, unknown>).admin).toBe(CLOUD_UI.admin)
  })
})
