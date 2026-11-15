import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { meta as b01Meta, solution as b01 } from './solutions/wal-tarcze-lina-45/task'
import { meta as b02Meta, solution as b02 } from './solutions/plytki-prostopadle-sily/task'
import { meta as b03Meta, solution as b03 } from './solutions/rama-przestrzenna-6-pretow/task'
import { meta as b04Meta, solution as b04 } from './solutions/wal-krzywka-pas-tarcza/task'
import { meta as b05Meta, solution as b05 } from './solutions/wal-tarcze-toczne-mimosrod/task'
import { meta as b06Meta, solution as b06 } from './solutions/wal-pas-t-2t-sila-p/task'
import { meta as b07Meta, solution as b07 } from './solutions/wal-krzywka-pas-t-2t/task'
import { meta as b08Meta, solution as b08 } from './solutions/wal-pionowy-tarcza-walec/task'
import { meta as b09Meta, solution as b09 } from './solutions/wal-tarcza-rama-cd/task'
import { meta as b10Meta, solution as b10 } from './solutions/wal-tarcza-lina-pas-t-2t/task'

const bVariants = [
  ['wal-tarcze-lina-45', b01Meta, b01],
  ['plytki-prostopadle-sily', b02Meta, b02],
  ['rama-przestrzenna-6-pretow', b03Meta, b03],
  ['wal-krzywka-pas-tarcza', b04Meta, b04],
  ['wal-tarcze-toczne-mimosrod', b05Meta, b05],
  ['wal-pas-t-2t-sila-p', b06Meta, b06],
  ['wal-krzywka-pas-t-2t', b07Meta, b07],
  ['wal-pionowy-tarcza-walec', b08Meta, b08],
  ['wal-tarcza-rama-cd', b09Meta, b09],
  ['wal-tarcza-lina-pas-t-2t', b10Meta, b10],
] as const

function pl(value: number, digits = 3) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

describe('zestaw wałów przestrzennych — warianty fabryki factory-shaft-three', () => {
  it('zawiera dziesięć wariantów z kompletnymi metadanymi', () => {
    expect(bVariants).toHaveLength(10)
    for (const [id, meta] of bVariants) {
      expect(meta.id, id).toBe(id)
      expect(meta.title.length, id).toBeGreaterThan(10)
      expect(meta.given.length, id).toBeGreaterThanOrEqual(3)
      expect(meta.result, id).toContain('kN')
    }
  })

  it('każdy wariant ma sześć niewiadomych i zerowe reszty sił oraz momentów', () => {
    for (const [id, , solution] of bVariants) {
      expect(solution.values, id).toHaveLength(6)
      expect(solution.values.every(Number.isFinite), id).toBe(true)
      expect(solution.residual.x, id).toBeCloseTo(0, 9)
      expect(solution.residual.y, id).toBeCloseTo(0, 9)
      expect(solution.residual.z, id).toBeCloseTo(0, 9)
      expect(solution.momentResidual.x, id).toBeCloseTo(0, 9)
      expect(solution.momentResidual.y, id).toBeCloseTo(0, 9)
      expect(solution.momentResidual.z, id).toBeCloseTo(0, 9)
    }
  })

  it('siła równoważąca P jest dodatnia i zgodna z wynikiem prezentowanym w playerze', () => {
    const expected = [0.4714045208, 8, 8, 3, 1.845, 2, 4.5, 2.1961524227, 3.75, 0.2679491924]
    bVariants.forEach(([id, meta, solution], index) => {
      expect(solution.byLabel.P, id).toBeGreaterThan(0)
      expect(solution.byLabel.P, id).toBeCloseTo(expected[index], 6)
      expect(meta.result, id).toContain(
        `P = ${solution.byLabel.P.toLocaleString('pl-PL', {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
          useGrouping: false,
        })} kN`,
      )
    })
  })

  it('spełnia charakterystyczne warunki geometryczne wariantów', () => {
    expect(b01.byLabel.P).toBeCloseTo((0.05 * Math.cos(Math.PI / 4) * 2) / 0.15, 9)
    expect(b04.byLabel.P).toBeCloseTo(3, 9)
    expect(b06.byLabel.P).toBeCloseTo(2, 9)
    expect(b07.byLabel.P).toBeCloseTo((0.18 * 1.5) / 0.06, 9)
    expect(b09.byLabel.P).toBeCloseTo((0.3 * 5) / 0.4, 9)
    expect(b10.byLabel.P).toBeCloseTo((0.2 * 1 + 0.1 * 2 - 0.1 * 4 * Math.cos(Math.PI / 6)) / 0.2, 9)

    for (const [id, , solution] of bVariants) {
      expect(solution.byLabel['A_x'], id).toBeDefined()
      expect(solution.byLabel['B_x'], id).toBeDefined()
      expect(solution.byLabel['A_z'], id).toBeDefined()
    }
  })

  it('wyniki zgodne z wartościami zapisanymi w polu result', () => {
    for (const [id, meta, solution] of bVariants) {
      for (const [label, value] of Object.entries(solution.byLabel)) {
        if (label.startsWith('R_')) continue
        expect(meta.result, `${id} ${label}`).toContain(pl(value))
      }
    }
  })
})

describe('podpięcie wariantów wałów do lekcji', () => {
  const lessonsRoot = path.join(process.cwd(), 'src/content/lessons')
  const bodies = fs
    .readdirSync(lessonsRoot, { recursive: true, withFileTypes: false })
    .map(String)
    .filter((file) => file.endsWith('content.mdx'))
    .map((file) => fs.readFileSync(path.join(lessonsRoot, file), 'utf8'))
    .join('\n')

  it.each(bVariants.map(([id]) => id))('%s jest użyty w treści lekcji', (id) => {
    expect(bodies).toContain(`<AnimatedSolution id="${id}" />`)
  })

  it('każdy katalog wariantu zawiera cztery pliki rozwiązania', () => {
    for (const [id] of bVariants) {
      const directory = path.join(process.cwd(), 'src/content/solutions', id)
      expect(fs.existsSync(path.join(directory, 'solution.data.ts')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'animation.tsx')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'content.mdx')), id).toBe(true)
      expect(fs.existsSync(path.join(directory, 'task.ts')), id).toBe(true)
    }
  })
})
