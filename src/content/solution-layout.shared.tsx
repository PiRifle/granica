import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import 'katex/dist/katex.min.css'
import '../styles/global.css'
import { SolutionPlayer } from '../components/SolutionPlayer'
import { scanSolutionLayout, type SolutionLayoutIssue } from '../components/solution-player/solutionLayoutScanner'
import type { CourseSolution } from '../types'

let actQueue: Promise<void> = Promise.resolve()

async function exclusiveAct(callback: () => void | Promise<void>) {
  const run = actQueue.then(async () => {
    await act(async () => {
      await callback()
    })
  })
  actQueue = run.catch(() => {})
  await run
}

async function renderScene(
  container: HTMLElement,
  root: ReturnType<typeof createRoot>,
  solution: CourseSolution,
  scene: number,
  overlap = false,
) {
  await exclusiveAct(async () => {
    root.render(
      <div style={{ width: '1200px' }}>
        <SolutionPlayer solution={solution} instant sceneRequest={{ index: scene - 1, token: scene }} />
      </div>,
    )
  })
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const ready =
      container.querySelector('[data-solution-visual] svg') &&
      container.querySelector('[data-solution-copy]') &&
      container.querySelector('[data-solution-problem]')?.textContent?.trim()
    if (ready) {
      await document.fonts.ready
      await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
      if (overlap) {
        await new Promise((resolve) => setTimeout(resolve, 80))
        await exclusiveAct(() => {})
      } else {
        await exclusiveAct(async () => {
          await new Promise((resolve) => setTimeout(resolve, 50))
        })
      }
      return
    }
    if (overlap) {
      await new Promise((resolve) => setTimeout(resolve, 20))
      await exclusiveAct(() => {})
    } else {
      await exclusiveAct(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20))
      })
    }
  }
  throw new Error(`${solution.id} / scena ${scene}: treść nie została załadowana`)
}

function messages(issues: SolutionLayoutIssue[]) {
  return issues.map((issue) => `${issue.kind}: ${issue.message}`)
}

export function defineSolutionLayoutTests(solutions: CourseSolution[]) {
  describe('layout każdej sceny w Chromium', () => {
    beforeAll(async () => {
      Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true })
      await Promise.all(solutions.map((solution) => solution.loadBody()))
      for (const solution of solutions) {
        const container = document.createElement('div')
        document.body.append(container)
        const root = createRoot(container)
        await renderScene(container, root, solution, 1)
        await exclusiveAct(() => root.unmount())
        container.remove()
      }
    }, 120_000)

    for (const solution of solutions) {
      for (let scene = 1; scene <= solution.scenes.length; scene += 1) {
        it.concurrent(
          `${solution.id} / scena ${scene} / lewy SVG + prawy overflow`,
          async () => {
            const container = document.createElement('div')
            document.body.append(container)
            const root = createRoot(container)

            try {
              await renderScene(container, root, solution, scene, true)
              const player = container.querySelector('[aria-label^="Animowane rozwiązanie"]')
              expect(
                player?.querySelector('[data-solution-visual] svg'),
                `${solution.id} / scena ${scene}: brak lewego SVG`,
              ).not.toBeNull()
              expect(
                player?.querySelector('[data-solution-copy]'),
                `${solution.id} / scena ${scene}: brak prawego panelu`,
              ).not.toBeNull()
              if (player?.querySelector('[data-three-scene]')) {
                expect(
                  player.querySelector('canvas[data-three-canvas]'),
                  `${solution.id} / scena ${scene}: brak canvasu Three.js`,
                ).not.toBeNull()
              }

              const issues = scanSolutionLayout(container)
              const left = issues.filter((issue) => issue.kind !== 'panel / overflow')
              const right = issues.filter((issue) => issue.kind === 'panel / overflow')
              expect(messages(left), `${solution.id} / scena ${scene}: kolizje lewego SVG`).toEqual([])
              expect(messages(right), `${solution.id} / scena ${scene}: overflow prawego panelu`).toEqual([])
            } finally {
              await exclusiveAct(() => root.unmount())
              container.remove()
            }
          },
          30_000,
        )
      }
    }
  })
}
