import { describe, expect, it } from 'vitest'
import { createTask, generateTasks, isAnswerClose, seededRandom, taskTopics, type TaskTopic } from './training'
import { compositeCentroidY, safetyFactor } from './advanced'
import {
  bendingStressMPa,
  constrainedThermalStressMPa,
  elongationMM,
  rectangleInertiaMM4,
  stressMPa,
  torsionShearMPa,
} from './engineering'

const strengthTopics = taskTopics.filter((topic) => topic.course === 'wytrzymalosc').map((topic) => topic.id)
const staticsTopics = taskTopics.filter((topic) => topic.course === 'statyka').map((topic) => topic.id)
const topics = [...strengthTopics, ...staticsTopics]

function taskFor(topic: TaskTopic, seed: number) {
  return createTask(topic, seededRandom(seed), `test-${topic}`)
}

describe('generator treningu liczbowego', () => {
  it('obsługuje wszystkie zadeklarowane tematy', () => {
    expect(strengthTopics).toHaveLength(9)
    expect(staticsTopics).toHaveLength(12)
    for (const topic of topics) {
      const task = taskFor(topic, 42)
      expect(task.answer).toBeGreaterThan(0)
      expect(Number.isFinite(task.answer)).toBe(true)
      expect(task.prompt.length).toBeGreaterThan(20)
      expect(task.solution.length).toBeGreaterThan(10)
      expect(task.tolerance).toBeGreaterThan(0)
    }
  })

  it('rozdziela generator według kursu', () => {
    const statics = generateTasks(6, seededRandom(99), 'statyka')
    expect(statics).toHaveLength(6)
    for (const task of statics) {
      expect(taskTopics.find((topic) => topic.id === task.topic)?.course, task.topic).toBe('statyka')
    }
    const strength = generateTasks(6, seededRandom(99), 'wytrzymalosc')
    for (const task of strength) {
      expect(taskTopics.find((topic) => topic.id === task.topic)?.course, task.topic).toBe('wytrzymalosc')
    }
  })

  it('odtwarza zadania przy tym samym ziarnie', () => {
    const first = generateTasks(6, seededRandom(2024))
    const second = generateTasks(6, seededRandom(2024))
    expect(first.map((task) => task.prompt)).toEqual(second.map((task) => task.prompt))
    expect(first.map((task) => task.answer)).toEqual(second.map((task) => task.answer))
  })

  it('generuje unikalne identyfikatory w zestawie', () => {
    const tasks = generateTasks(9, seededRandom(7))
    expect(new Set(tasks.map((task) => task.id)).size).toBe(tasks.length)
  })

  it('sprawdza odpowiedź z tolerancją 1%', () => {
    const task = taskFor('stress', 11)
    expect(isAnswerClose(task, task.answer)).toBe(true)
    expect(isAnswerClose(task, task.answer * 1.009)).toBe(true)
    expect(isAnswerClose(task, task.answer * 1.02)).toBe(false)
    expect(isAnswerClose(task, Number.NaN)).toBe(false)
  })

  it('liczy naprężenie normalne zgodnie z σ = N/A', () => {
    const task = taskFor('stress', 1)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [area, force] = numbers
    expect(task.answer).toBeCloseTo(stressMPa(force, area), 6)
  })

  it('liczy wydłużenie zgodnie z ΔL = NL/(EA)', () => {
    const task = taskFor('elongation', 2)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [length, area, force, young] = numbers
    expect(task.answer).toBeCloseTo(elongationMM(force, length, area, young), 6)
  })

  it('liczy naprężenie termiczne zgodnie z |σ| = EαΔT', () => {
    const task = taskFor('thermal', 3)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [alphaMicro, , , young, deltaT] = numbers
    expect(task.answer).toBeCloseTo(Math.abs(constrainedThermalStressMPa(alphaMicro * 1e-6, deltaT, young)), 6)
  })

  it('liczy skręcanie zgodnie z τ = 16T/(πd³)', () => {
    const task = taskFor('torsion', 4)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [diameter, torque] = numbers
    expect(task.answer).toBeCloseTo(torsionShearMPa(torque, diameter), 6)
  })

  it('liczy zginanie zgodnie z σ = M/W', () => {
    const task = taskFor('bendingStress', 5)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [modulus, moment] = numbers
    expect(task.answer).toBeCloseTo(bendingStressMPa(moment, modulus * 1000), 6)
  })

  it('liczy współczynnik bezpieczeństwa', () => {
    const task = taskFor('safetyFactor', 6)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [limit, actual] = numbers
    expect(task.answer).toBeCloseTo(safetyFactor(limit, actual), 6)
  })

  it('liczy reakcję belki z równowagi momentów', () => {
    const task = taskFor('reaction', 7)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [length, force, position] = numbers
    expect(task.answer).toBeCloseTo((force * (length - position)) / length, 6)
  })

  it('liczy środek ciężkości dwóch prostokątów', () => {
    const task = taskFor('centroid', 8)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [b1, h1, y1, b2, h2, y2] = numbers
    expect(task.answer).toBeCloseTo(
      compositeCentroidY([
        { areaMM2: b1 * h1, yMM: y1 },
        { areaMM2: b2 * h2, yMM: y2 },
      ]),
      6,
    )
  })

  it('liczy moment bezwładności z twierdzenia Steinera', () => {
    const task = taskFor('steiner', 9)
    const numbers = task.prompt.match(/\d+(?:[.,]\d+)?/g)?.map((value) => Number(value.replace(',', '.'))) ?? []
    const [width, height, distance] = numbers
    expect(task.answer).toBeCloseTo((rectangleInertiaMM4(width, height) + width * height * distance ** 2) / 1e4, 6)
  })
})
