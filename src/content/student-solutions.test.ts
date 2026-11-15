import { describe, expect, it } from 'vitest'
import { solveReakcjeRama } from './solution-factories/factory-statyka-reakcje-rama/factory'
import { config as configA01 } from './solutions/rama-pion-q-pas-ukosny/task'
import { config as configA02 } from './solutions/rama-pas-4-3-sila-p2/task'
import { config as configA03 } from './solutions/rama-prostokatna-5-3/task'
import { config as configA04 } from './solutions/rama-ukosny-pas-pion-q/task'
import { config as configA05, task as taskA05 } from './solutions/wspornik-przegub-rolka-q/task'
import { config as configA06 } from './solutions/rama-podpora-pod-45/task'
import { config as configA07 } from './solutions/rama-przegub-z-podpora-d/task'
import { config as configA08 } from './solutions/rama-ukosny-pas-4-5/task'
import { config as configA09 } from './solutions/rama-wspornik-sila-45/task'
import { config as configA10 } from './solutions/rama-utwierdzona-przegub/task'
import { task as taskA01 } from './solutions/rama-pion-q-pas-ukosny/task'
import { task as taskA02 } from './solutions/rama-pas-4-3-sila-p2/task'
import { task as taskA03 } from './solutions/rama-prostokatna-5-3/task'
import { task as taskA04 } from './solutions/rama-ukosny-pas-pion-q/task'
import { task as taskA06 } from './solutions/rama-podpora-pod-45/task'
import { task as taskA07 } from './solutions/rama-przegub-z-podpora-d/task'
import { task as taskA08 } from './solutions/rama-ukosny-pas-4-5/task'
import { task as taskA09 } from './solutions/rama-wspornik-sila-45/task'
import { task as taskA10 } from './solutions/rama-utwierdzona-przegub/task'
import solutionA01 from './solutions/rama-pion-q-pas-ukosny/solution.data'
import solutionA02 from './solutions/rama-pas-4-3-sila-p2/solution.data'
import solutionA03 from './solutions/rama-prostokatna-5-3/solution.data'
import solutionA04 from './solutions/rama-ukosny-pas-pion-q/solution.data'
import solutionA05 from './solutions/wspornik-przegub-rolka-q/solution.data'
import solutionA06 from './solutions/rama-podpora-pod-45/solution.data'
import solutionA07 from './solutions/rama-przegub-z-podpora-d/solution.data'
import solutionA08 from './solutions/rama-ukosny-pas-4-5/solution.data'
import solutionA09 from './solutions/rama-wspornik-sila-45/solution.data'
import solutionA10 from './solutions/rama-utwierdzona-przegub/solution.data'

const aConfigs = [
  configA01,
  configA02,
  configA03,
  configA04,
  configA05,
  configA06,
  configA07,
  configA08,
  configA09,
  configA10,
]

const aIds = [
  'rama-pion-q-pas-ukosny',
  'rama-pas-4-3-sila-p2',
  'rama-prostokatna-5-3',
  'rama-ukosny-pas-pion-q',
  'wspornik-przegub-rolka-q',
  'rama-podpora-pod-45',
  'rama-przegub-z-podpora-d',
  'rama-ukosny-pas-4-5',
  'rama-wspornik-sila-45',
  'rama-utwierdzona-przegub',
]

const aTasks = [taskA01, taskA02, taskA03, taskA04, taskA05, taskA06, taskA07, taskA08, taskA09, taskA10]
const aSolutions = [
  solutionA01,
  solutionA02,
  solutionA03,
  solutionA04,
  solutionA05,
  solutionA06,
  solutionA07,
  solutionA08,
  solutionA09,
  solutionA10,
]

describe('studencki zestaw A — równowaga płaska', () => {
  it.each(aConfigs.map((config, index) => [index + 1, config] as const))(
    'schemat %i ma zerowe reszty sił i momentu',
    (_nr, config) => {
      const { values, residual } = solveReakcjeRama(config)
      expect(values).toHaveLength(config.unknowns.length)
      expect(values.every(Number.isFinite)).toBe(true)
      expect(residual.x).toBeCloseTo(0, 9)
      expect(residual.y).toBeCloseTo(0, 9)
      expect(residual.moment).toBeCloseTo(0, 9)
    },
  )

  it('niezależnie kontroluje równania przegubów pośrednich', () => {
    expect(solveReakcjeRama(aConfigs[4]).values[3]).toBeCloseTo((16 + 4.5 * 5) / 2, 9)
    expect(solveReakcjeRama(aConfigs[6]).values[2]).toBeCloseTo(20 / 3, 9)
    expect(solveReakcjeRama(aConfigs[9]).values[3]).toBeCloseTo(14 / Math.sqrt(2), 9)
  })

  it('schemat 2 spełnia analityczny bilans reakcji', () => {
    const [ax, ay, by] = solveReakcjeRama(aConfigs[1]).values
    expect(by).toBeCloseTo((4 * 4.8 + 1.5 * 3.6 + 7 * 2 - 1.5 * 10 + 22) / 8, 9)
    expect(ax).toBeCloseTo(10 - 3.6, 9)
    expect(ay).toBeCloseTo(4.8 + 2 - by, 9)
  })

  it('każdy wariant ma kompletny player i dokładny schemat', () => {
    expect(aTasks.map((task) => task.id)).toEqual(aIds)
    const expectedScenes = [8, 8, 8, 8, 8, 8, 8, 8, 7, 7]
    aIds.forEach((id, index) => {
      expect(aSolutions[index].id, id).toBe(id)
      expect(aSolutions[index].scenes.length, id).toBe(expectedScenes[index])
      expect(aSolutions[index].result, id).toContain('kN')
    })
  })
})
