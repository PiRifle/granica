import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { meta as g01Meta } from './solutions/rama-symboliczna-uklad/task'
import { meta as g02Meta } from './solutions/wal-lozyska-sila-rownujaca/task'
import { task as f01 } from './solutions/pret-oparty-o-sciane/task'
import { task as f02 } from './solutions/tarcza-dwie-scianki/task'
import { task as f03 } from './solutions/walec-na-rowni-linka/task'
import { task as f04 } from './solutions/belka-z-sila-ukosna/task'
import { task as f06 } from './solutions/plyta-trojkatna-z-pretem/task'
import { task as f07 } from './solutions/wezel-dwa-prety/task'
import { task as f08 } from './solutions/walec-rownia-pret/task'
import solutionF01 from './solutions/pret-oparty-o-sciane/solution.data'
import solutionF02 from './solutions/tarcza-dwie-scianki/solution.data'
import solutionF03 from './solutions/walec-na-rowni-linka/solution.data'
import solutionF04 from './solutions/belka-z-sila-ukosna/solution.data'
import solutionF06 from './solutions/plyta-trojkatna-z-pretem/solution.data'
import solutionF07 from './solutions/wezel-dwa-prety/solution.data'
import solutionF08 from './solutions/walec-rownia-pret/solution.data'
const fIds = [
  'pret-oparty-o-sciane',
  'tarcza-dwie-scianki',
  'walec-na-rowni-linka',
  'belka-z-sila-ukosna',
  'plyta-trojkatna-z-pretem',
  'wezel-dwa-prety',
  'walec-rownia-pret',
]
const fTasks = [f01, f02, f03, f04, f06, f07, f08]
const fSolutions = [solutionF01, solutionF02, solutionF03, solutionF04, solutionF06, solutionF07, solutionF08]

function pl(value: number, digits = 3) {
  return value.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

describe('zestaw F — płaski zbieżny układ sił', () => {
  it('zawiera pełne playery dla zadań 1–4 i 6–8', () => {
    expect(fTasks.map((task) => task.id)).toEqual(fIds)
    for (let index = 0; index < fIds.length; index += 1) {
      expect(fSolutions[index].id, fIds[index]).toBe(fIds[index])
      expect(fSolutions[index].scenes.length, fIds[index]).toBeGreaterThanOrEqual(6)
      expect(fTasks[index].result, fIds[index]).toMatch(/kN|N/)
    }
  })

  it('zadanie 1 ma reakcje zgodne z niezależnym bilansem momentów', () => {
    const N = (600 * Math.tan(Math.PI / 6)) / 2
    const task = fTasks[0]
    expect(task.result).toContain(pl(N))
    expect(task.result).toContain(pl(600))
  })

  it('zadanie 2 rozwiązuje układ normalnych ścianek', () => {
    const alpha = (20 * Math.PI) / 180
    const beta = (70 * Math.PI) / 180
    const N1 = 900 / (Math.cos(alpha) + (Math.sin(alpha) / Math.sin(beta)) * Math.cos(beta))
    const N2 = (N1 * Math.sin(alpha)) / Math.sin(beta)
    const task = fTasks[1]
    expect(task.result).toContain(pl(N1))
    expect(task.result).toContain(pl(N2))
  })

  it('zadanie 3 ma T = G sinα i N = G cosα', () => {
    const task = fTasks[2]
    expect(task.result).toContain(pl(50))
    expect(task.result).toContain(pl(100 * Math.cos(Math.PI / 6)))
  })

  it('zadanie 4 ma symetryczny podział obciążenia pionowego', () => {
    const task = fTasks[3]
    expect(task.result).toContain(pl(-10))
    expect(task.result).toContain(pl((20 * Math.sin(Math.PI / 3)) / 2))
  })

  it('zadanie 6 ma S = 2P', () => {
    const task = fTasks[4]
    expect(task.result).toContain(pl(96))
    expect(task.result).toContain(pl(-96))
  })

  it('zadanie 7 spełnia układ rzutów w węźle', () => {
    const alpha = (75 * Math.PI) / 180
    const beta = (60 * Math.PI) / 180
    const d1 = { x: -Math.sin(alpha), y: Math.cos(alpha) }
    const d2 = { x: -Math.sin(beta), y: -Math.cos(beta) }
    const det = d1.x * d2.y - d1.y * d2.x
    const S1 = (-6 * d2.y - 12 * d2.x) / det
    const S2 = (d1.x * 12 - d1.y * -6) / det
    const sx = S1 * d1.x + S2 * d2.x + 6
    const sy = S1 * d1.y + S2 * d2.y - 12
    expect(sx).toBeCloseTo(0, 9)
    expect(sy).toBeCloseTo(0, 9)
    const task = fTasks[5]
    expect(task.result).toContain(pl(S1))
    expect(task.result).toContain(pl(S2))
  })

  it('zadanie 8 ma N i S zgodne z rozwiązaniem układu', () => {
    const task = fTasks[6]
    expect(task.result).toContain(pl(10))
    expect(task.result).toContain(pl(20 * Math.cos(Math.PI / 6)))
  })
})

describe('zestaw G — zadania 3D z wykładu', () => {
  const gMetas = [
    ['zadanie z wykładu 1 (źródło nieczytelne)', g01Meta],
    ['zadanie z wykładu 2 (wał w łożyskach)', g02Meta],
  ] as const

  it('oba zadania mają kompletne playery', () => {
    expect(gMetas.map(([, meta]) => meta.id)).toEqual(['rama-symboliczna-uklad', 'wal-lozyska-sila-rownujaca'])
    for (const [name, meta] of gMetas) {
      expect(meta.given.length, name).toBeGreaterThanOrEqual(3)
      expect(meta.result.length, name).toBeGreaterThan(10)
    }
  })

  it('zadanie 1 jawnie oznacza blokadę źródłową', () => {
    const task = g01Meta
    expect(task.result).toContain('BLOKADA')
    expect(task.given.join(' ')).toContain('BLOKADA')
  })

  it('zadanie 2 odtwarza wyniki z rozwiązania ręcznego', () => {
    const task = g02Meta
    expect(task.result).toContain(pl(10 / Math.sqrt(3)))
    expect(task.result).toContain(pl(-0.915063509461097))
    expect(task.result).toContain(pl(3.4150635094610964))
    expect(task.result).toContain(pl(3.028312163512968))
    expect(task.result).toContain(pl(10.24519052838329))
  })
})

describe('podpięcie playerów F i G do lekcji', () => {
  const lessonsRoot = path.join(process.cwd(), 'src/content/lessons')
  const bodies = fs
    .readdirSync(lessonsRoot, { recursive: true, withFileTypes: false })
    .map(String)
    .filter((file) => file.endsWith('content.mdx'))
    .map((file) => fs.readFileSync(path.join(lessonsRoot, file), 'utf8'))
    .join('\n')

  it.each(fIds)('%s jest użyty w treści lekcji', (id) => {
    expect(bodies).toContain(`<AnimatedSolution id="${id}" />`)
  })

  it.each(['rama-symboliczna-uklad', 'wal-lozyska-sila-rownujaca'])('%s jest użyty w treści lekcji', (id) => {
    expect(bodies).toContain(`<AnimatedSolution id="${id}" />`)
  })
})
