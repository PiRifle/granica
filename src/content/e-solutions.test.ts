import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { polygonCentroid, pappusVolume, type CentroidPart } from '../lib/statics'
import { CENTROID_CONFIGS, CENTROID_IDS, CENTROID_TASKS } from './solution-factories/centroid'
import { pl } from './solution-factories/core/source-task'

const reference: Record<string, { area: number; x: number; y: number }> = {
  'centroid-arc-cap-notch-a4-d20': { area: 320.350193, x: 9.850164, y: 9.223843 },
  'centroid-arc-cap-notch-a8-d40': { area: 601.928046, x: 18.458287, y: 11.301756 },
  'centroid-arc-cap-notch-a5-d35': { area: 467.033404, x: 16.868354, y: 9.866071 },
  'centroid-circle-chamfer-notch-a5': { area: 1900.995408, x: -0.120551, y: -0.076714 },
  'centroid-circle-chamfer-notch-a4': { area: 1923.495408, x: -0.061, y: -0.038818 },
  'centroid-circle-chamfer-notch-a6': { area: 1873.495408, x: -0.21137, y: -0.134508 },
  'centroid-circle-deep-notch-a7-d40': { area: 1101.137061, x: -0.170581, y: -0.401252 },
  'centroid-circle-deep-notch-a9-d50': { area: 1739.995408, x: -0.209483, y: -0.50776 },
  'centroid-circle-deep-notch-a8-d50': { area: 1795.495408, x: -0.130697, y: -0.322288 },
  'centroid-circle-semicircle-slot-a12': { area: 1566.415776, x: -0.493696, y: 0 },
  'centroid-circle-semicircle-slot-a15': { area: 1506.415776, x: -1.05106, y: 0 },
  'centroid-strip-triangle-hole-a10-d10': { area: 1296.460184, x: 12.892491, y: 18.677474 },
  'centroid-strip-triangle-hole-a20-d10': { area: 2121.460184, x: 17.053916, y: 25.361873 },
  'centroid-strip-triangle-hole-a25-d15': { area: 2510.785413, x: 18.776848, y: 28.733891 },
  'centroid-triangle-rectangle-semicircle-a20-d15': { area: 4253.429174, x: 54.553978, y: 28.084575 },
  'centroid-triangle-rectangle-semicircle-a10-d12': { area: 1336.194671, x: 29.438373, y: 16.942022 },
  'centroid-triangle-rectangle-semicircle-a15-d10': { area: 2294.579633, x: 39.831991, y: 20.28596 },
}

function signed(part: CentroidPart) {
  return part.negative ? -Math.abs(part.area) : part.area
}

describe('rozwiązania centroidów — 6 figur × warianty', () => {
  it('zawiera 17 pełnych playerów z poprawnymi metadanymi', () => {
    expect(CENTROID_TASKS).toHaveLength(17)
    expect(CENTROID_CONFIGS).toHaveLength(17)
    expect(CENTROID_TASKS.map((task) => task.id)).toEqual(CENTROID_IDS)
    expect(new Set(CENTROID_IDS).size).toBe(17)
    for (const task of CENTROID_TASKS) {
      expect(task.scenes.length, task.id).toBeGreaterThanOrEqual(6)
      expect(task.visuals, task.id).toHaveLength(task.scenes.length)
      expect(task.result, task.id).toContain('mm')
      expect(task.result, task.id).toContain('mm²')
      expect(task.result, task.id).toContain('x_C')
      expect(task.result, task.id).toContain('y_C')
      expect(
        task.visuals.every((visual) => visual.length > 0),
        task.id,
      ).toBe(true)
    }
  })

  it('wynik w playerze zgadza się z centroidem konfiguracji', () => {
    CENTROID_TASKS.forEach((task, index) => {
      const config = CENTROID_CONFIGS[index]
      expect(task.id, config.id).toBe(config.id)
      expect(task.result, config.id).toContain(`${pl(config.centroid.x)} mm`)
      expect(task.result, config.id).toContain(`${pl(config.centroid.y)} mm`)
      expect(task.result, config.id).toContain(`${pl(config.area)} mm²`)
    })
  })

  it('sumy pól i momentów statycznych odtwarzają x_C i y_C (reszty ≤ 1e-9)', () => {
    for (const config of CENTROID_CONFIGS) {
      let area = 0
      let qy = 0
      let qx = 0
      for (const part of config.parts) {
        const value = signed(part)
        area += value
        qy += value * part.x
        qx += value * part.y
      }
      expect(area, config.id).toBeCloseTo(config.area, 9)
      expect(qy / area, config.id).toBeCloseTo(config.centroid.x, 9)
      expect(qx / area, config.id).toBeCloseTo(config.centroid.y, 9)

      const centroid = polygonCentroid(config.parts)
      expect(centroid.x, config.id).toBeCloseTo(config.centroid.x, 9)
      expect(centroid.y, config.id).toBeCloseTo(config.centroid.y, 9)

      expect(config.area * config.centroid.x, config.id).toBeCloseTo(config.moments.qy, 9)
      expect(config.area * config.centroid.y, config.id).toBeCloseTo(config.moments.qx, 9)

      let residualX = 0
      let residualY = 0
      for (const part of config.parts) {
        const value = signed(part)
        residualX += value * (part.x - config.centroid.x)
        residualY += value * (part.y - config.centroid.y)
      }
      expect(residualX, config.id).toBeCloseTo(0, 9)
      expect(residualY, config.id).toBeCloseTo(0, 9)
    }
  })

  it('wyniki zgadzają się z niezależną tabelą referencyjną', () => {
    for (const config of CENTROID_CONFIGS) {
      const expected = reference[config.id]
      expect(expected, config.id).toBeDefined()
      expect(config.area, config.id).toBeCloseTo(expected.area, 6)
      expect(config.centroid.x, config.id).toBeCloseTo(expected.x, 6)
      expect(config.centroid.y, config.id).toBeCloseTo(expected.y, 6)
    }
  })

  it('centroid leży w obrysie albo ma uzasadniony znak', () => {
    for (const config of CENTROID_CONFIGS) {
      expect(config.centroid.x, config.id).toBeGreaterThanOrEqual(config.bounds.xmin - 1e-9)
      expect(config.centroid.x, config.id).toBeLessThanOrEqual(config.bounds.xmax + 1e-9)
      expect(config.centroid.y, config.id).toBeGreaterThanOrEqual(config.bounds.ymin - 1e-9)
      expect(config.centroid.y, config.id).toBeLessThanOrEqual(config.bounds.ymax + 1e-9)
      expect(config.insideMaterial || config.justification.length > 20, config.id).toBe(true)

      if (config.removedCentroid) {
        if (Math.abs(config.removedCentroid.x) > 1e-9) {
          expect(Math.sign(config.centroid.x), config.id).toBe(-Math.sign(config.removedCentroid.x))
        }
        if (Math.abs(config.removedCentroid.y) > 1e-9) {
          expect(Math.sign(config.centroid.y), config.id).toBe(-Math.sign(config.removedCentroid.y))
        }
      }
    }
  })

  it('kontrola Pappusa dla części półkolistych figur 4 i 6', () => {
    const pappusConfigs = CENTROID_CONFIGS.filter((config) => config.pappus)
    expect(pappusConfigs.map((config) => config.figure).sort()).toEqual([4, 4, 6, 6, 6])
    for (const config of pappusConfigs) {
      const { area, distance, radius } = config.pappus!
      const sphere = (4 * Math.PI * radius ** 3) / 3
      expect(pappusVolume(area, distance), config.id).toBeCloseTo(sphere, 9)
    }
  })

  it('każdy identyfikator jest podpięty w lekcji', () => {
    const lesson = path.join(
      process.cwd(),
      'src/content/lessons/statyka-srodki-ciezkosci/statyka-centroidy-zadania/content.mdx',
    )
    const body = fs.readFileSync(lesson, 'utf8')
    for (const id of CENTROID_IDS) {
      expect(body, id).toContain(`<AnimatedSolution id="${id}" />`)
    }
    expect(body).toContain('<AnimatedSolution id="ex-statyka-centroidy-zadania-2" />')
  })

  it('każdy katalog wariantu zawiera trzy pliki rozwiązania', () => {
    for (const id of CENTROID_IDS) {
      const directory = path.join(process.cwd(), 'src/content/solutions', id)
      expect(fs.existsSync(path.join(directory, 'solution.data.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'animation.tsx')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'content.mdx')), id).toBe(true)
    }
    expect(fs.existsSync(path.join(process.cwd(), 'src/content/solutions/zad-e-4-1'))).toBe(false)
  })

  it('nie ma zaległych katalogów zad-e-*', () => {
    const entries = fs.readdirSync(path.join(process.cwd(), 'src/content/solutions'))
    expect(entries.filter((entry) => entry.startsWith('zad-e-'))).toEqual([])
  })
})
