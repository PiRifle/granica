import fs from 'node:fs'
import path from 'node:path'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { LessonView } from '../components/LessonView'
import { courses, getCourseForLesson, lessons, modules } from './course'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const fixtureRoot = path.resolve(process.cwd(), '.tmp/lesson-fixtures')
const created: Array<{ id: string; moduleId: string; fixture: string }> = []
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

beforeAll(() => {
  Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true })
  Object.defineProperty(globalThis, 'ResizeObserver', { value: ResizeObserverMock, configurable: true })
  Object.defineProperty(window, 'scrollTo', { value: () => {}, configurable: true })
})

afterAll(() => {
  created.sort((a, b) => a.id.localeCompare(b.id))
  fs.mkdirSync(fixtureRoot, { recursive: true })
  fs.writeFileSync(path.join(fixtureRoot, 'index.json'), JSON.stringify(created, null, 2))
})

async function waitFor(predicate: () => boolean, timeout = 4000) {
  const started = Date.now()
  while (!predicate()) {
    if (Date.now() - started > timeout) return false
    await exclusiveAct(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50))
    })
  }
  return true
}

for (const module of modules) {
  describe(module.id, () => {
    for (const lesson of lessons.filter((entry) => entry.moduleId === module.id)) {
      it.concurrent(
        `renderuje ${lesson.id} bez wyjątku i tworzy fixture`,
        async () => {
          const course = getCourseForLesson(lesson.id) ?? courses[0]
          expect(course).toBeDefined()

          const errors: string[] = []
          const onError = (event: ErrorEvent) => errors.push(event.message)
          const onRejection = (event: PromiseRejectionEvent) => errors.push(String(event.reason))
          window.addEventListener('error', onError)
          window.addEventListener('unhandledrejection', onRejection)

          const container = document.createElement('div')
          document.body.append(container)
          const root = createRoot(container)

          try {
            await exclusiveAct(async () => {
              root.render(
                <LessonView
                  course={course}
                  lesson={lesson}
                  onHome={() => {}}
                  onLesson={() => {}}
                  onModule={() => {}}
                  onTool={() => {}}
                />,
              )
            })

            const expectsPlayer = Boolean(lesson.solutionId) || lesson.moduleId.startsWith('statyka-')
            await waitFor(() => {
              if (expectsPlayer) return Boolean(container.querySelector('[aria-label^="Animowane rozwiązanie"] svg'))
              return container.querySelectorAll('svg').length > 0
            }, 8000)

            expect(
              errors.filter((message) => !message.includes('Not implemented: window.scrollTo')),
              lesson.id,
            ).toEqual([])

            const solution = expectsPlayer ? container.querySelector('[aria-label^="Animowane rozwiązanie"]') : null
            if (expectsPlayer) {
              expect(solution, `${lesson.id}: brak SolutionPlayer`).not.toBeNull()
              expect(solution?.querySelector('svg'), `${lesson.id}: SolutionPlayer bez animacji`).not.toBeNull()
              expect(
                solution?.querySelector('[data-solution-copy]'),
                `${lesson.id}: brak prawego panelu`,
              ).not.toBeNull()
            }

            expect(container.innerHTML.length, lesson.id).toBeGreaterThan(500)

            const directory = path.join(fixtureRoot, lesson.moduleId)
            fs.mkdirSync(directory, { recursive: true })
            const fixture = path.join(directory, `${lesson.id}.html`)
            fs.writeFileSync(fixture, container.innerHTML)
            created.push({ id: lesson.id, moduleId: lesson.moduleId, fixture })
          } finally {
            window.removeEventListener('error', onError)
            window.removeEventListener('unhandledrejection', onRejection)
            await exclusiveAct(() => root.unmount())
            container.remove()
          }
        },
        120_000,
      )
    }
  })
}
