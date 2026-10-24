import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import katex from 'katex'
import { lessonIds, lessons, modules, syllabus, totalDuration, workedSolutions } from './course'
import { examBank } from './exam/exam-bank'
import { literature, openSources } from './literature'
import { labRegistry } from '../components/LabRegistry'
import { labMeta } from '../labs/labMeta'
import { splitFormula, tokenizeFormula } from '../lib/mathAnimation'

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

  it('ma po 7 lekcji w module i wyliczony czas z treści', () => {
    for (const module of modules) {
      expect(module.lessons, module.id).toHaveLength(7)
      for (const lesson of module.lessons) {
        expect(lesson.outcomes.length, lesson.id).toBeGreaterThan(0)
        expect(lesson.title.trim().length, lesson.id).toBeGreaterThan(0)
        expect(lesson.words, lesson.id).toBeGreaterThan(0)
        expect(lesson.inlineMath, lesson.id).toBeGreaterThanOrEqual(0)
        expect(lesson.displayMath, lesson.id).toBeGreaterThanOrEqual(0)
        expect(lesson.experiments, lesson.id).toBeGreaterThanOrEqual(1)
        expect(lesson.experimentMinutes, lesson.id).toBeGreaterThan(0)
        expect(lesson.readingMinutes, lesson.id).toBeGreaterThan(0)
        expect(lesson.totalMinutes, lesson.id).toBeGreaterThan(0)
        expect(lesson.totalMinutes, lesson.id).toBeGreaterThanOrEqual(lesson.readingMinutes)
      }
    }
    expect(totalDuration).toBeGreaterThan(600)
  })

  it('nie definiuje długości ręcznie we frontmatterze', () => {
    for (const lesson of lessons) {
      const file = path.resolve(process.cwd(), 'src/content/lessons', lesson.moduleId, lesson.id, 'content.mdx')
      const frontmatter = fs.readFileSync(file, 'utf8').split('---')[1] ?? ''
      expect(frontmatter, lesson.id).not.toMatch(/^duration:/m)
    }
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
      expect(body.includes('<WorkedExample>') || body.includes('<AnimatedSolution'), file).toBe(true)
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

  it('kompiluje wprowadzenia wszystkich modułów', async () => {
    for (const module of modules) {
      expect(module.loadOverview, module.id).toBeDefined()
      const body = await module.loadOverview?.()
      expect(typeof body?.default, module.id).toBe('function')
    }
  }, 30_000)

  it('ma kompletną bibliotekę źródeł', () => {
    expect(literature).toHaveLength(8)
    expect(openSources.length).toBeGreaterThanOrEqual(4)
    for (const entry of literature) {
      expect(entry.authors.trim().length, entry.id).toBeGreaterThan(3)
      expect(entry.title.trim().length, entry.id).toBeGreaterThan(3)
      expect(entry.focus.trim().length, entry.id).toBeGreaterThan(20)
      expect(entry.howToUse.trim().length, entry.id).toBeGreaterThan(20)
      expect(entry.modules.length, entry.id).toBeGreaterThan(0)
      for (const moduleId of entry.modules) {
        expect(
          modules.some((module) => module.id === moduleId),
          `${entry.id}: ${moduleId}`,
        ).toBe(true)
      }
    }
    for (const source of openSources) {
      expect(source.url.startsWith('https://'), source.id).toBe(true)
      expect(source.covers.trim().length, source.id).toBeGreaterThan(20)
    }
  })

  it('ma metadane wszystkich laboratoriów', () => {
    expect(Object.keys(labMeta).sort()).toEqual(Object.keys(labRegistry).sort())
    for (const [id, meta] of Object.entries(labMeta)) {
      expect(meta.title.trim().length, id).toBeGreaterThan(3)
      expect(meta.topic.trim().length, id).toBeGreaterThan(2)
      expect(meta.minutes, id).toBeGreaterThan(0)
    }
  })

  it('ma poprawny bank egzaminacyjny', () => {
    expect(examBank).toHaveLength(210)
    for (const question of examBank) {
      expect(question.answers.length, question.question).toBeGreaterThanOrEqual(3)
      expect(question.correct, question.question).toBeGreaterThanOrEqual(0)
      expect(question.correct, question.question).toBeLessThan(question.answers.length)
      expect(question.explanation.trim().length, question.question).toBeGreaterThan(10)
      expect(question.hint.trim().length, question.question).toBeGreaterThan(5)
      expect(
        modules.some((module) => module.id === question.moduleId),
        question.moduleId,
      ).toBe(true)
    }
  })

  it('podpina istniejące rozwiązania i sceny', () => {
    const solutionIds = new Set(workedSolutions.map((solution) => solution.id))
    expect(workedSolutions.length).toBeGreaterThanOrEqual(15)
    expect(solutionIds.size).toBe(workedSolutions.length)
    const linked = lessons.filter((lesson) => lesson.solutionId)
    expect(linked.length).toBeGreaterThanOrEqual(5)
    for (const lesson of linked) {
      expect(solutionIds.has(lesson.solutionId as string), lesson.id).toBe(true)
      const solution = workedSolutions.find((item) => item.id === lesson.solutionId)
      expect(solution?.scenes.length, lesson.solutionId).toBeGreaterThanOrEqual(7)
    }
  })

  it('ma poprawną matematykę w animowanych krokach', () => {
    for (const solution of workedSolutions) {
      for (const scene of solution.scenes) {
        if (!scene.formula) continue
        const steps = splitFormula(scene.formula)
        expect(steps.length, `${solution.id}: ${scene.title}`).toBeGreaterThan(0)
        for (const step of steps) {
          expect(
            () => katex.renderToString(step, { throwOnError: true, displayMode: true }),
            `${solution.id}: ${scene.title}`,
          ).not.toThrow()
          for (const token of tokenizeFormula(step)) {
            expect(
              () => katex.renderToString(`\\displaystyle ${token.math}`, { throwOnError: true }),
              `${solution.id}: ${scene.title} :: ${token.math}`,
            ).not.toThrow()
          }
        }
      }
    }
  })

  it('ma figurę i sensowne dane dla każdego rozwiązania', () => {
    for (const solution of workedSolutions) {
      if (!solution.figure) continue
      if (solution.figure.kind === 'axial') {
        expect(solution.figure.segments.length, solution.id).toBeGreaterThan(1)
        expect(
          solution.figure.segments.every((segment) => segment.length > 0),
          solution.id,
        ).toBe(true)
      }
      if (solution.figure.kind === 'beam') {
        expect(solution.figure.supports.length, solution.id).toBeGreaterThan(0)
        expect(solution.figure.length, solution.id).toBeGreaterThan(0)
      }
      if (solution.figure.kind === 'section') {
        expect(solution.figure.parts.length, solution.id).toBeGreaterThan(0)
        expect(solution.figure.values?.length, solution.id).toBeGreaterThan(0)
      }
      if (solution.figure.kind === 'rosette') {
        expect(solution.figure.gauges.length, solution.id).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('mapa sylabusa pokrywa wszystkie moduły', () => {
    expect(syllabus).toHaveLength(modules.length)
    for (const item of syllabus) {
      expect(
        modules.some((module) => module.id === item.moduleId),
        item.moduleId,
      ).toBe(true)
    }
  })
})
