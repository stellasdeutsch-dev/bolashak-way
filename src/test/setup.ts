import '@testing-library/jest-dom/vitest'

// jsdom ships no ResizeObserver; the roadmap track only needs it to read a width.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver
