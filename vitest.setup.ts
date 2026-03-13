import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

// Mock ResizeObserver for tests
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock Web Animations API for tests (jsdom lacks Element.animate)
if (!Element.prototype.animate) {
  Element.prototype.animate = function () {
    const anim = { onfinish: null as (() => void) | null, cancel() {} }
    queueMicrotask(() => anim.onfinish?.())
    return anim as unknown as Animation
  }
}

afterEach(() => {
  cleanup()
})
