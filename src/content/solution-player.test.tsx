import { createRoot } from 'react-dom/client'
import { act, useEffect } from 'react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SolutionPlayer } from '../components/SolutionPlayer'
import { SolutionStage } from '../components/solution-player/SolutionStage'
import { splitFormulaPresentation } from '../lib/mathAnimation'
import type { CourseSolution } from '../types'
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
    it(`renderuje kompletne rozwiązanie ${solution.id}`, async () => {
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

      const player = container.querySelector('[aria-label^="Animowane rozwiązanie"]')
      expect(player, solution.id).not.toBeNull()
      const required = (selector: string) => {
        const element = player?.querySelector(selector)
        expect(element, `${solution.id}: brak ${selector}`).not.toBeNull()
        return element as Element
      }

      expect(required('[data-solution-heading]').textContent).toBe(solution.title)
      expect(required('[data-solution-problem]').textContent?.trim().length).toBeGreaterThan(20)
      expect(player?.textContent).toContain(`${solution.duration} min`)

      const given = player?.querySelectorAll('[data-solution-given-item]') ?? []
      expect(given, `${solution.id}: liczba danych`).toHaveLength(solution.given.length)
      solution.given.forEach((item, index) => expect(given[index]?.textContent).toBe(item))

      expect(required('[data-solution-visual] svg')).not.toBeNull()
      expect(required('[data-solution-copy]')).not.toBeNull()
      expect(required('[data-solution-scene-title]').textContent).toBe(solution.scenes[0].title)
      expect(required('[data-solution-narration]').textContent).toBe(solution.scenes[0].narration)
      expect(required('[data-solution-caption]').textContent).toBe(solution.scenes[0].caption)
      expect(player?.textContent).toContain(`SCENA 1 / ${solution.scenes.length}`)

      const firstFormula = solution.scenes[0].formula
      if (firstFormula) {
        const presentation = splitFormulaPresentation(firstFormula)
        if (presentation.values.length > 0) {
          expect(required('[data-math-values]').querySelectorAll('[data-math-value]')).toHaveLength(
            presentation.values.length,
          )
        }
        if (presentation.steps.length > 0) expect(required('[data-solution-derivation]')).not.toBeNull()
      }

      required('[data-solution-controls]')
      for (const label of [
        'Od początku',
        'Poprzednia scena',
        'Cofnij 5 sekund',
        'Przewiń 5 sekund',
        'Następna scena',
      ]) {
        expect(required(`[aria-label="${label}"]`)).not.toBeNull()
      }
      expect(
        Array.from(player?.querySelectorAll('button') ?? []).some((button) => button.textContent === 'Odtwarzaj'),
      ).toBe(true)
      expect(required('[aria-label="Tempo odtwarzania"]').querySelectorAll('button')).toHaveLength(3)
      expect(required('[role="slider"][aria-label="Postęp odtwarzania"]').getAttribute('aria-valuemax')).not.toBe('0')
      expect(required('[data-solution-result]').textContent).toContain(solution.result)
    }, 30_000)
  }

  it('nie montuje własnej animacji od nowa przy zmianie sceny', async () => {
    let mounts = 0
    let unmounts = 0
    function PersistentAnimation({ index }: { index: number }) {
      useEffect(() => {
        mounts += 1
        return () => {
          unmounts += 1
        }
      }, [])
      return (
        <svg data-persistent-animation>
          <text>{index}</text>
        </svg>
      )
    }
    const scenes = [0, 1].map((index) => ({
      title: `Scena ${index + 1}`,
      narration: 'Opis sceny',
      caption: 'Podpis',
      visual: 'beam' as const,
    }))
    const solution: CourseSolution = {
      id: 'persistent-animation',
      title: 'Trwała animacja',
      duration: 1,
      given: [],
      result: 'OK',
      scenes,
      animation: PersistentAnimation,
      loadBody: () => Promise.resolve({ default: () => null }),
    }
    const container = document.createElement('div')
    document.body.append(container)
    const root = createRoot(container)
    mounted.push({ root, container })
    const render = (index: number) => (
      <SolutionStage
        solution={solution}
        scene={scenes[index]}
        index={index}
        instant
        stepIndex={0}
        playing={false}
        stepProgress={1}
        sceneProgress={1}
        revealedFocus={[]}
        revealedMath=""
        heightFloor={0}
        requestHeight={() => {}}
        stageRef={{ current: null }}
        stageFloor={0}
      />
    )

    await act(async () => {
      root.render(render(0))
    })
    const firstSvg = container.querySelector('[data-persistent-animation]')
    expect(mounts).toBe(1)

    await act(async () => {
      root.render(render(1))
    })
    expect(container.querySelector('[data-persistent-animation]')).toBe(firstSvg)
    expect(container.querySelector('[data-persistent-animation]')?.textContent).toBe('1')
    expect(mounts).toBe(1)
    expect(unmounts).toBe(0)
  })
})
