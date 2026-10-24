import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { lessonIds, lessons, modules, syllabus, totalDuration, workedSolutions } from './course'
import { examBank } from './exam/exam-bank'
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

  it('ma po 7 lekcji w module i 60 minut na moduł', () => {
    for (const module of modules) {
      expect(module.lessons, module.id).toHaveLength(7)
      expect(module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0), module.id).toBe(60)
      for (const lesson of module.lessons) {
        expect(lesson.outcomes.length, lesson.id).toBeGreaterThan(0)
        expect(lesson.title.trim().length, lesson.id).toBeGreaterThan(0)
      }
    }
    expect(totalDuration).toBe(600)
  })

  it('ma metadane bez treści merytorycznej', () => {
    for (const lesson of lessons) {
      expect('questions' in lesson, lesson.id).toBe(false)
      expect('workedExample' in lesson, lesson.id).toBe(false)
      expect('formula' in lesson, lesson.id).toBe(false)
      expect('insight' in lesson, lesson.id).toBe(false)
      expect('lab' in lesson, lesson.id).toBe(false)
    }
  })

  it('ma poprawnie skomponowany MDX dla każdej lekcji', () => {
    for (const lesson of lessons) {
      const file = path.resolve(process.cwd(), 'src/content/lessons', lesson.moduleId, lesson.id, 'content.mdx')
      expect(fs.existsSync(file), file).toBe(true)
      const body = fs.readFileSync(file, 'utf8')
      expect(body, file).toContain('<Lab id="')
      expect(body, file).toContain('<Formula>')
      expect(body, file).toContain('<WorkedExample>')
      expect(body, file).toContain('<Quiz>')
      expect(body, file).toContain('<Question')
      const labId = body.match(/<Lab id="([^"]+)"/)?.[1]
      expect(labRegistry[labId ?? ''], `${lesson.id}: ${labId}`).toBeDefined()
    }
  })

  it('kompiluje MDX każdej lekcji i rozwiązania', async () => {
    for (const lesson of lessons) {
      const body = await lesson.loadBody()
      expect(typeof body.default, lesson.id).toBe('function')
    }
    for (const solution of workedSolutions) {
      const body = await solution.loadBody()
      expect(typeof body.default, solution.id).toBe('function')
    }
  }, 30_000)

  it('ma poprawny bank egzaminacyjny', () => {
    expect(examBank).toHaveLength(210)
    for (const question of examBank) {
      expect(question.answers.length, question.question).toBeGreaterThanOrEqual(3)
      expect(question.correct, question.question).toBeGreaterThanOrEqual(0)
      expect(question.correct, question.question).toBeLessThan(question.answers.length)
      expect(question.explanation.trim().length, question.question).toBeGreaterThan(10)
      expect(question.hint.trim().length, question.question).toBeGreaterThan(5)
      expect(modules.some((module) => module.id === question.moduleId), question.moduleId).toBe(true)
    }
  })

  it('podpina istniejące rozwiązania i sceny', () => {
    const solutionIds = new Set(workedSolutions.map((solution) => solution.id))
    expect(workedSolutions).toHaveLength(12)
    expect(solutionIds.size).toBe(workedSolutions.length)
    const linked = lessons.filter((lesson) => lesson.solutionId)
    expect(linked.length).toBeGreaterThanOrEqual(5)
    for (const lesson of linked) {
      expect(solutionIds.has(lesson.solutionId as string), lesson.id).toBe(true)
      const solution = workedSolutions.find((item) => item.id === lesson.solutionId)
      expect(solution?.scenes.length, lesson.solutionId).toBeGreaterThanOrEqual(7)
    }
  })

  it('mapa sylabusa pokrywa wszystkie moduły', () => {
    expect(syllabus).toHaveLength(modules.length)
    for (const item of syllabus) {
      expect(modules.some((module) => module.id === item.moduleId), item.moduleId).toBe(true)
    }
  })
})
