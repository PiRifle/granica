import { describe, expect, it } from 'vitest'
import {
  lessonIds,
  lessons,
  modules,
  syllabus,
  totalDuration,
  workedSolutions,
} from './course'
import { contentInventory } from './registry'
import { labRegistry } from '../components/LabRegistry'

describe('integralność kursu', () => {
  it('ma dokładnie 10 modułów i 70 lekcji', () => {
    expect(modules).toHaveLength(10)
    expect(lessons).toHaveLength(70)
  })

  it('ma unikalne identyfikatory modułów i lekcji', () => {
    expect(new Set(modules.map((module) => module.id)).size).toBe(modules.length)
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
  })

  it('numeruje moduły od 1 do 10 bez luk', () => {
    expect(modules.map((module) => module.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('ma po 7 lekcji w module, 60 minut i 3 pytania w każdej lekcji', () => {
    for (const module of modules) {
      expect(module.lessons, module.id).toHaveLength(7)
      expect(module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), module.id).toBe(60)
      for (const lesson of module.lessons) {
        expect(lesson.questions, lesson.id).toHaveLength(3)
        expect(lesson.workedExample, lesson.id).toBeDefined()
        expect(lesson.outcomes.length, lesson.id).toBeGreaterThan(0)
      }
    }
    expect(totalDuration).toBe(600)
  })

  it('przypisuje każdą lekcję do właściwego modułu i istniejącego laboratorium', () => {
    for (const module of modules) {
      for (const lesson of module.lessons) {
        expect(lesson.moduleId, lesson.id).toBe(module.id)
        expect(labRegistry[lesson.lab], `${lesson.id}: ${lesson.lab}`).toBeDefined()
      }
    }
  })

  it('ma poprawne odpowiedzi, wyjaśnienia i efekty we wszystkich 210 pytaniach', () => {
    const outcomes = new Set(['W1', 'W2', 'W3', 'U1', 'U2', 'U3'])
    const questions = lessons.flatMap((lesson) => lesson.questions.map((question) => ({ lesson, question })))
    expect(questions).toHaveLength(210)
    for (const { lesson, question } of questions) {
      expect(question.answers.length, lesson.id).toBeGreaterThanOrEqual(3)
      expect(question.correct, lesson.id).toBeGreaterThanOrEqual(0)
      expect(question.correct, lesson.id).toBeLessThan(question.answers.length)
      expect(question.explanation.trim().length, lesson.id).toBeGreaterThan(10)
      expect(question.hint.trim().length, lesson.id).toBeGreaterThan(5)
      expect(outcomes.has(question.outcome ?? ''), `${lesson.id}: ${question.question}`).toBe(true)
    }
  })

  it('podpina wszystkie 12 istniejących rozwiązań do lekcji', () => {
    const solutionIds = new Set(workedSolutions.map((solution) => solution.id))
    expect(workedSolutions).toHaveLength(12)
    expect(solutionIds.size).toBe(workedSolutions.length)
    const linkedIds = lessons.flatMap((lesson) => [lesson.solutionId, ...(lesson.solutionIds ?? [])])
      .filter((id): id is string => Boolean(id))
    expect(new Set(linkedIds)).toEqual(solutionIds)
    for (const id of linkedIds) {
      expect(solutionIds.has(id), id).toBe(true)
    }
    for (const solution of workedSolutions) {
      expect(solution.scenes.length, solution.id).toBeGreaterThanOrEqual(7)
    }
  })

  it('mapa sylabusa pokrywa wszystkie moduły', () => {
    expect(syllabus).toHaveLength(modules.length)
    for (const item of syllabus) {
      expect(modules.some((module) => module.id === item.moduleId), item.moduleId).toBe(true)
    }
  })

  it('ma dokładnie jeden plik MDX na każdą lekcję i rozwiązanie', () => {
    const pair = (path: string) => path.replace(/[^/]+$/, 'content.mdx')
    expect(contentInventory.lessonData.map(pair).sort()).toEqual(contentInventory.lessonBodies)
    expect(contentInventory.solutionData.map(pair).sort()).toEqual(contentInventory.solutionBodies)
    expect(contentInventory.moduleData.map((path) => path.replace(/[^/]+$/, 'overview.mdx')).sort()).toEqual(contentInventory.moduleOverviews)
  })

  it('kompiluje treść MDX każdej lekcji i rozwiązania', async () => {
    for (const lesson of lessons) {
      const body = await lesson.loadBody()
      expect(typeof body.default, lesson.id).toBe('function')
    }
    for (const solution of workedSolutions) {
      const body = await solution.loadBody()
      expect(typeof body.default, solution.id).toBe('function')
    }
  }, 30_000)
})
