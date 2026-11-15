import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { solveKratownica } from './solution-factories/factory-statyka-kratownica/factory'
import { config as configD01, task as taskD01 } from './solutions/kratownica-pas-opadajacy-sciana/task'
import { config as configD02, task as taskD02 } from './solutions/kratownica-3-przesla-pasy-rownolegle/task'
import { config as configD03, task as taskD03 } from './solutions/kratownica-symetryczna-dolny-wezel/task'
import { config as configD04, task as taskD04 } from './solutions/kratownica-4-panele-wspornik/task'
import { config as configD05, task as taskD05 } from './solutions/kratownica-slup-wysiegnik/task'
import { config as configD06, task as taskD06 } from './solutions/kratownica-dwa-pasy-podpora-b/task'
import { config as configD07, task as taskD07 } from './solutions/kratownica-warren-zawieszona/task'
import { config as configD08, task as taskD08 } from './solutions/kratownica-gorny-trojkat-podpora-b/task'
import { config as configD09, task as taskD09 } from './solutions/kratownica-4-panele-prostokatna/task'
import { config as configD10, task as taskD10 } from './solutions/kratownica-2-kondygnacje-wysiegnik/task'

const dIds = [
  'kratownica-pas-opadajacy-sciana',
  'kratownica-3-przesla-pasy-rownolegle',
  'kratownica-symetryczna-dolny-wezel',
  'kratownica-4-panele-wspornik',
  'kratownica-slup-wysiegnik',
  'kratownica-dwa-pasy-podpora-b',
  'kratownica-warren-zawieszona',
  'kratownica-gorny-trojkat-podpora-b',
  'kratownica-4-panele-prostokatna',
  'kratownica-2-kondygnacje-wysiegnik',
]

const dConfigs = [
  configD01,
  configD02,
  configD03,
  configD04,
  configD05,
  configD06,
  configD07,
  configD08,
  configD09,
  configD10,
]
const dTasks = [taskD01, taskD02, taskD03, taskD04, taskD05, taskD06, taskD07, taskD08, taskD09, taskD10]
const dSolutions = dConfigs.map((config) => solveKratownica(config))

describe('zestaw D — kratownice metodą węzłów', () => {
  it('zawiera dziesięć pełnych playerów D o opisowych identyfikatorach', () => {
    expect(dTasks).toHaveLength(10)
    expect(dTasks.map((task) => task.id)).toEqual(dIds)
    for (const [index, task] of dTasks.entries()) {
      expect(task.id, task.id).toMatch(/^kratownica-/)
      expect(task.scenes.length, task.id).toBeGreaterThanOrEqual(6)
      expect(task.visuals, task.id).toHaveLength(task.scenes.length)
      expect(
        task.visuals.every((visual) => visual.length > 0),
        task.id,
      ).toBe(true)
      expect(task.result, task.id).toContain('kN')
      expect(task.result, task.id).toContain('Reakcje:')
      expect(task.result, task.id).toContain('siły w prętach:')
    }
  })

  it('każdy wariant ma kwadratowy układ i reszty równowagi w każdym węźle ≤ 1e-9', () => {
    expect(dConfigs).toHaveLength(10)
    expect(dSolutions).toHaveLength(10)
    for (const [index, config] of dConfigs.entries()) {
      const solution = dSolutions[index]
      expect(solution.forces, config.title).toHaveLength(config.members.length)
      expect(solution.reactions.length, config.title).toBe(
        config.supports.reduce((sum, support) => sum + support.directions.length, 0),
      )
      expect(solution.forces.every(Number.isFinite), config.title).toBe(true)
      expect(solution.reactions.every(Number.isFinite), config.title).toBe(true)
      expect(solution.residuals, config.title).toHaveLength(config.nodes.length)
      for (const residual of solution.residuals) {
        expect(Math.abs(residual.fx), `${config.title} / ${residual.node} / Fx`).toBeLessThanOrEqual(1e-9)
        expect(Math.abs(residual.fy), `${config.title} / ${residual.node} / Fy`).toBeLessThanOrEqual(1e-9)
      }
      expect(solution.maxResidual, dIds[index]).toBeLessThanOrEqual(1e-9)
      expect(solution.global.fx, dIds[index]).toBeCloseTo(0, 9)
      expect(solution.global.fy, dIds[index]).toBeCloseTo(0, 9)
      expect(solution.global.moment, dIds[index]).toBeCloseTo(0, 9)
    }
  })

  it('globalny bilans reakcji zamyka się dla każdego wariantu', () => {
    for (const [index, config] of dConfigs.entries()) {
      const solution = dSolutions[index]
      const reactionForce = { x: 0, y: 0 }
      let reactionIndex = 0
      for (const support of config.supports) {
        for (const direction of support.directions) {
          reactionForce.x += direction.dir.x * solution.reactions[reactionIndex]
          reactionForce.y += direction.dir.y * solution.reactions[reactionIndex]
          reactionIndex += 1
        }
      }
      const loadForce = config.loads.reduce((sum, load) => ({ x: sum.x + load.fx, y: sum.y + load.fy }), { x: 0, y: 0 })
      expect(reactionForce.x + loadForce.x, `${dIds[index]} / ΣFx`).toBeCloseTo(0, 9)
      expect(reactionForce.y + loadForce.y, `${dIds[index]} / ΣFy`).toBeCloseTo(0, 9)
    }
  })

  it('znaki sił odpowiadają rozciąganiu, ściskaniu i prętom zerowym', () => {
    for (const [index, solution] of dSolutions.entries()) {
      for (const [memberIndex, force] of solution.forces.entries()) {
        const label = memberIndex + 1
        if (Math.abs(force) <= 1e-9) {
          expect(dTasks[index].result, dIds[index]).toContain(`N${label} = 0,000 kN`)
        } else {
          expect(dTasks[index].result, dIds[index]).toContain(
            `N${label} = ${force.toLocaleString('pl-PL', {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
              useGrouping: false,
            })} kN`,
          )
        }
      }
    }
  })

  it('rozpoznaje charakterystyczne pręty zerowe z topologii', () => {
    const zero = (taskIndex: number) =>
      dSolutions[taskIndex].forces
        .map((force, index) => ({ force, label: index + 1 }))
        .filter((entry) => Math.abs(entry.force) <= 1e-9)
        .map((entry) => entry.label)
    expect(zero(0)).toEqual([])
    expect(zero(1)).toEqual([5, 9, 10, 12])
    expect(zero(4)).toEqual([3, 11])
    expect(zero(5)).toEqual([1])
    expect(zero(7)).toEqual([3])
    expect(zero(8)).toEqual([1, 2, 16])
  })

  it('każdy katalog wariantu kratownicy zawiera cztery pliki rozwiązania', () => {
    for (const id of dIds) {
      const directory = path.join(process.cwd(), 'src/content/solutions', id)
      expect(fs.existsSync(path.join(directory, 'task.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'solution.data.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'animation.tsx')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'content.mdx')), id).toBe(true)
    }
  })
})

describe('podpięcie playerów D do lekcji', () => {
  const lessonsRoot = path.join(process.cwd(), 'src/content/lessons')
  const bodies = fs
    .readdirSync(lessonsRoot, { recursive: true, withFileTypes: false })
    .map(String)
    .filter((file) => file.endsWith('content.mdx'))
    .map((file) => fs.readFileSync(path.join(lessonsRoot, file), 'utf8'))
    .join('\n')

  it.each(dIds)('%s jest użyty w treści lekcji', (id) => {
    expect(bodies).toContain(`<AnimatedSolution id="${id}" />`)
  })

  it('wszystkie kratownice są podpięte w lekcji metody węzłów', () => {
    const lesson = fs.readFileSync(
      path.join(lessonsRoot, 'statyka-kratownice/statyka-metoda-wezlow/content.mdx'),
      'utf8',
    )
    for (const id of dIds) {
      expect(lesson).toContain(`<AnimatedSolution id="${id}" />`)
    }
  })
})
