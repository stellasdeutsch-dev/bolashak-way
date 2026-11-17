import { beforeEach, describe, expect, it } from 'vitest'
import { act, fireEvent, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { PlatformHome } from '@/pages/PlatformHome'
import { PLATFORMS } from '@/content/platforms'
import { useAppStore } from '@/store/useAppStore'

/**
 * Each programme's front page, in every language, with every folded block opened. A
 * source id or a text key the page cannot resolve throws while rendering – this is where
 * it shows, not on the live site.
 */
describe('platform front pages', () => {
  beforeEach(() => {
    localStorage.clear()
    useAppStore.getState().reset()
  })

  for (const platform of PLATFORMS) {
    for (const locale of ['ru', 'kk', 'en'] as const) {
      it(`${platform.slug} renders in ${locale} with every block open`, async () => {
        useAppStore.setState({ locale })
        const view = render(
          <MemoryRouter initialEntries={[`/${platform.slug}`]}>
            <Routes>
              <Route path="/:platform" element={<PlatformHome />} />
            </Routes>
          </MemoryRouter>,
        )
        expect(view.container.querySelector('h1')?.textContent).toBe(platform.name[locale])
        // Open every folded block, including the ones that only appear once another opens.
        for (let i = 0; i < 30; i++) {
          const closed = view.container.querySelector<HTMLButtonElement>('button[aria-expanded="false"]')
          if (!closed) break
          await act(async () => {
            fireEvent.click(closed)
          })
        }
        expect(view.container.querySelector('button[aria-expanded="false"]')).toBeNull()
        view.unmount()
      })
    }
  }
})
