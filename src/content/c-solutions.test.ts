import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { solveHamulec } from './solution-factories/factory-statyka-hamulec/factory'
import { config as configC01, task as taskC01 } from './solutions/hamulec-dzwignia-styczna/task'
import { config as configC02, task as taskC02 } from './solutions/hamulec-krazek-ruchomy-pret/task'
import { config as configC03, task as taskC03 } from './solutions/hamulec-dzwignia-ukosna/task'
import { config as configC04, task as taskC04 } from './solutions/hamulec-dzwignia-pozioma/task'
import { config as configC05, task as taskC05 } from './solutions/hamulec-dzwignia-p-30/task'
import { config as configC06, task as taskC06 } from './solutions/hamulec-rownia-pret/task'
import { config as configC07, task as taskC07 } from './solutions/hamulec-lina-45-p-prostopadla/task'
import { config as configC08, task as taskC08 } from './solutions/hamulec-lina-45-pret/task'
import { config as configC09, task as taskC09 } from './solutions/hamulec-pret-poziomy/task'
import { config as configC10, task as taskC10 } from './solutions/hamulec-lina-pozioma/task'

const cIds = [
  'hamulec-dzwignia-styczna',
  'hamulec-krazek-ruchomy-pret',
  'hamulec-dzwignia-ukosna',
  'hamulec-dzwignia-pozioma',
  'hamulec-dzwignia-p-30',
  'hamulec-rownia-pret',
  'hamulec-lina-45-p-prostopadla',
  'hamulec-lina-45-pret',
  'hamulec-pret-poziomy',
  'hamulec-lina-pozioma',
]

const cConfigs = [
  configC01,
  configC02,
  configC03,
  configC04,
  configC05,
  configC06,
  configC07,
  configC08,
  configC09,
  configC10,
]
const cTasks = [taskC01, taskC02, taskC03, taskC04, taskC05, taskC06, taskC07, taskC08, taskC09, taskC10]
const cSolutions = cConfigs.map((config) => solveHamulec(config))

describe('zestaw C — hamulce tarczowe, bębny i siła P', () => {
  it('zawiera dziesięć pełnych playerów C o opisowych identyfikatorach', () => {
    expect(cTasks).toHaveLength(10)
    expect(cTasks.map((task) => task.id)).toEqual(cIds)
    for (const [index, task] of cTasks.entries()) {
      expect(task.id, task.id).toMatch(/^hamulec-/)
      expect(task.scenes.length, task.id).toBeGreaterThanOrEqual(6)
      expect(task.visuals, task.id).toHaveLength(task.scenes.length)
      expect(
        task.visuals.every((visual) => visual.length > 0),
        task.id,
      ).toBe(true)
      expect(task.result, task.id).toContain('kN')
      expect(task.result, task.id).toContain('P =')
      expect(task.result, task.id).toContain('O =')
      expect(task.result, task.id).toContain('A =')
    }
  })

  it('każdy wariant ma zerowe reszty równowagi bębna i dźwigni/pręta', () => {
    expect(cConfigs).toHaveLength(10)
    for (const [index, config] of cConfigs.entries()) {
      const solution = cSolutions[index]
      const id = cIds[index]
      expect(Number.isFinite(solution.P), id).toBe(true)
      expect(Number.isFinite(solution.O.x), id).toBe(true)
      expect(Number.isFinite(solution.O.y), id).toBe(true)
      expect(Number.isFinite(solution.A.x), id).toBe(true)
      expect(Number.isFinite(solution.A.y), id).toBe(true)
      expect(solution.drum.force.x, id).toBeCloseTo(0, 9)
      expect(solution.drum.force.y, id).toBeCloseTo(0, 9)
      expect(solution.drum.momentO, id).toBeCloseTo(0, 9)
      expect(solution.drum.momentC, id).toBeCloseTo(0, 9)
      expect(solution.body.force.x, id).toBeCloseTo(0, 9)
      expect(solution.body.force.y, id).toBeCloseTo(0, 9)
      expect(solution.body.momentA, id).toBeCloseTo(0, 9)
      expect(solution.body.momentOther, id).toBeCloseTo(0, 9)
    }
  })

  it('spełnia warunek tarcia i sens fizyczny wyników', () => {
    for (const [index, solution] of cSolutions.entries()) {
      const id = cIds[index]
      expect(solution.N, id).toBeGreaterThan(0)
      expect(solution.T, id).toBeGreaterThan(0)
      expect(solution.T, id).toBeCloseTo(solution.config.mu * solution.N, 9)
      expect(solution.T, id).toBeLessThanOrEqual(solution.frictionLimit + 1e-9)
      expect(solution.P, id).toBeGreaterThan(0)
      expect(solution.pPositive, id).toBe(true)
      expect(solution.frictionAngle, id).toBeCloseTo((Math.atan(solution.config.mu) * 180) / Math.PI, 9)
    }
  })

  it('siła P jest zgodna z wynikiem prezentowanym w playerze', () => {
    const expected = [
      39.2598183049, 2.4444444444, 65.3333333333, 24.9, 37.6888888889, 12.8571428571, 24.7619047618, 25.7142857143,
      44.4444444444, 53.5829805299,
    ]
    cSolutions.forEach((solution, index) => {
      expect(solution.P, cIds[index]).toBeCloseTo(expected[index], 6)
      expect(cTasks[index].result, cIds[index]).toContain('P =')
      expect(cTasks[index].result, cIds[index]).toContain(' kN')
    })
  })

  it('reakcje O, A oraz B (dla prętów) są jawnie raportowane', () => {
    cSolutions.forEach((solution, index) => {
      const result = cTasks[index].result
      expect(result, cIds[index]).toContain(`O = (${plLocal(solution.O.x)}; ${plLocal(solution.O.y)}) kN`)
      expect(result, cIds[index]).toContain(`A = (${plLocal(solution.A.x)}; ${plLocal(solution.A.y)}) kN`)
      if (solution.config.family === 'rod') {
        expect(solution.B, cIds[index]).toBeDefined()
        expect(result, cIds[index]).toContain(`B = (${plLocal(solution.B!.x)}; ${plLocal(solution.B!.y)}) kN`)
      }
    })
  })

  it('model geometryczny odpowiada wariantom z tabeli', () => {
    const expected = [
      { G: 1, Q: 10, a: 0.2, b: 0.1, e: 0.04, mu: 0.1, k: 2 },
      { G: 1.1, Q: null, a: 0.1, b: 0.15, e: 0, mu: 0.15, k: 1.5 },
      { G: 1.3, Q: 14, a: 0.45, b: 0.4, e: 0.05, mu: 0.2, k: 2 },
      { G: 1.8, Q: 15, a: 0.1, b: 0.4, e: 0.06, mu: 0.25, k: 2 },
      { G: 1.5, Q: 16, a: 0.2, b: 0.3, e: 0.04, mu: 0.3, k: 1.2 },
      { G: 1.6, Q: 18, a: 0.15, b: 0.1, e: 0, mu: 0.35, k: 2 },
      { G: 2, Q: 20, a: 0.2, b: 0.5, e: 0.05, mu: 0.4, k: 1.5 },
      { G: 2.2, Q: 18, a: 0.2, b: 0.1, e: 0, mu: 0.35, k: 2 },
      { G: 2.1, Q: 20, a: 0.1, b: 0.2, e: 0, mu: 0.3, k: 1.5 },
      { G: 1.8, Q: 22, a: 0.3, b: 0.3, e: 0.04, mu: 0.25, k: 1.2 },
    ]
    expected.forEach((row, index) => {
      const config = cConfigs[index]
      expect(config.G).toBe(row.G)
      expect(config.Q).toBe(row.Q)
      expect(config.a).toBe(row.a)
      expect(config.b).toBe(row.b)
      expect(config.e).toBe(row.e)
      expect(config.mu).toBe(row.mu)
      expect(config.outerK).toBe(row.k)
    })
  })
})

describe('podpięcie playerów C do lekcji', () => {
  const lessonsRoot = path.join(process.cwd(), 'src/content/lessons')
  const bodies = fs
    .readdirSync(lessonsRoot, { recursive: true, withFileTypes: false })
    .map(String)
    .filter((file) => file.endsWith('content.mdx'))
    .map((file) => fs.readFileSync(path.join(lessonsRoot, file), 'utf8'))
    .join('\n')

  it.each(cIds)('%s jest użyty w treści lekcji', (id) => {
    expect(bodies).toContain(`<AnimatedSolution id="${id}" />`)
  })

  it('każdy katalog wariantu hamulca zawiera cztery pliki rozwiązania', () => {
    for (const id of cIds) {
      const directory = path.join(process.cwd(), 'src/content/solutions', id)
      expect(fs.existsSync(path.join(directory, 'task.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'solution.data.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'animation.tsx')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'content.mdx')), id).toBe(true)
    }
  })
})

function plLocal(value: number) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -3 ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
    useGrouping: false,
  })
}
