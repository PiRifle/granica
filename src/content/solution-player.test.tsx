import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SolutionPlayer } from '../components/SolutionPlayer'
import { lessons, workedSolutions } from './course'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const linkedSolutions = workedSolutions.filter((solution) =>
  lessons.some((lesson) => lesson.solutionId === solution.id),
)

beforeAll(() => {
  Object.defineProperty(globalThis, 'ResizeObserver', { value: ResizeObserverMock, configurable: true })
})

const mounted: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = []

afterAll(() => {
  for (const { root, container } of mounted) {
    act(() => root.unmount())
    container.remove()
  }
})

describe('SolutionPlayer', () => {
  for (const solution of linkedSolutions) {
    it(`renderuje rozwiązanie ${solution.id}`, async () => {
      const container = document.createElement('div')
      document.body.append(container)
      const root = createRoot(container)
      mounted.push({ root, container })

      await act(async () => {
        root.render(<SolutionPlayer solution={solution} />)
      })
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 250))
      })

      expect(container.innerHTML.length).toBeGreaterThan(500)
      expect(container.querySelector('[aria-label^="Animowane rozwiązanie"]')).not.toBeNull()
      expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
    }, 30_000)
  }
})
