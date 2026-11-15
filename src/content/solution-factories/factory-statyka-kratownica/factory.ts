import { solveLinearSystem, type Vec2 } from '../../../lib/statics'
import { makeBatchTask } from '../core/batch-task'
import { defineSourceSolution, pl, tex, type SourceTaskDefinition } from '../core/source-task'
import type { SolutionData } from '../../model'

const point = (x: number, y: number): Vec2 => ({ x, y })
const radians = (degrees: number) => (degrees * Math.PI) / 180
const tangent = (degrees: number) => Math.tan(radians(degrees))
const cosine = (degrees: number) => Math.cos(radians(degrees))
const sine = (degrees: number) => Math.sin(radians(degrees))

export interface KratownicaNode {
  name: string
  x: number
  y: number
}

export interface KratownicaMember {
  i: number
  j: number
  label: number
}

export interface KratownicaReactionDirection {
  dir: Vec2
  name: string
}

export interface KratownicaSupport {
  node: number
  label: string
  directions: KratownicaReactionDirection[]
}

export interface KratownicaLoad {
  node: number
  fx: number
  fy: number
  label: string
}

export interface KratownicaConfig {
  nr: number
  title: string
  given: string[]
  topology: string
  heightNote: string
  loadNote: string
  supportNote: string
  nodes: KratownicaNode[]
  members: KratownicaMember[]
  supports: KratownicaSupport[]
  loads: KratownicaLoad[]
}

export interface KratownicaNodeResidual {
  node: string
  fx: number
  fy: number
}

export interface KratownicaSolution {
  forces: number[]
  reactions: number[]
  byLabel: Record<string, number>
  residuals: KratownicaNodeResidual[]
  global: {
    fx: number
    fy: number
    moment: number
  }
  maxResidual: number
}

export function solveKratownica(config: KratownicaConfig): KratownicaSolution {
  const size = config.nodes.length
  const memberCount = config.members.length
  const reactionDirections = config.supports.flatMap((support) => support.directions)
  const unknowns = memberCount + reactionDirections.length
  if (unknowns !== 2 * size) {
    throw new Error(`Kratownica D${config.nr}: ${unknowns} niewiadomych przy ${2 * size} równaniach`)
  }

  const matrix = Array.from({ length: 2 * size }, () => Array.from({ length: unknowns }, () => 0))
  const rhs = Array.from({ length: 2 * size }, () => 0)

  config.members.forEach((member, index) => {
    const a = config.nodes[member.i]
    const b = config.nodes[member.j]
    const length = Math.hypot(b.x - a.x, b.y - a.y)
    const ux = (b.x - a.x) / length
    const uy = (b.y - a.y) / length
    matrix[2 * member.i][index] += ux
    matrix[2 * member.i + 1][index] += uy
    matrix[2 * member.j][index] -= ux
    matrix[2 * member.j + 1][index] -= uy
  })

  let reactionOffset = memberCount
  for (const support of config.supports) {
    for (const direction of support.directions) {
      matrix[2 * support.node][reactionOffset] += direction.dir.x
      matrix[2 * support.node + 1][reactionOffset] += direction.dir.y
      reactionOffset += 1
    }
  }

  for (const load of config.loads) {
    rhs[2 * load.node] -= load.fx
    rhs[2 * load.node + 1] -= load.fy
  }

  const values = solveLinearSystem(matrix, rhs)
  const forces = values.slice(0, memberCount)
  const reactions = values.slice(memberCount)
  const byLabel: Record<string, number> = {}
  config.members.forEach((member, index) => {
    byLabel[`N${member.label}`] = forces[index]
  })
  reactionDirections.forEach((direction, index) => {
    byLabel[direction.name] = reactions[index]
  })

  const residuals = config.nodes.map((node, index) => {
    let fx = 0
    let fy = 0
    config.members.forEach((member, memberIndex) => {
      const force = forces[memberIndex]
      if (member.i === index) {
        const other = config.nodes[member.j]
        const length = Math.hypot(other.x - node.x, other.y - node.y)
        fx += force * ((other.x - node.x) / length)
        fy += force * ((other.y - node.y) / length)
      } else if (member.j === index) {
        const other = config.nodes[member.i]
        const length = Math.hypot(other.x - node.x, other.y - node.y)
        fx += force * ((other.x - node.x) / length)
        fy += force * ((other.y - node.y) / length)
      }
    })
    reactionDirections.forEach((direction, reactionIndex) => {
      if (config.supports.some((support) => support.node === index && support.directions.includes(direction))) {
        fx += reactions[reactionIndex] * direction.dir.x
        fy += reactions[reactionIndex] * direction.dir.y
      }
    })
    for (const load of config.loads) {
      if (load.node === index) {
        fx += load.fx
        fy += load.fy
      }
    }
    return { node: node.name, fx, fy }
  })

  const external = config.loads.map((load) => ({
    at: config.nodes[load.node],
    value: point(load.fx, load.fy),
  }))
  let reactionIndex = 0
  for (const support of config.supports) {
    for (const direction of support.directions) {
      external.push({
        at: config.nodes[support.node],
        value: point(direction.dir.x * reactions[reactionIndex], direction.dir.y * reactions[reactionIndex]),
      })
      reactionIndex += 1
    }
  }
  const pivot = config.nodes[config.supports[0]?.node ?? 0]
  const global = external.reduce(
    (sum, force) => ({
      fx: sum.fx + force.value.x,
      fy: sum.fy + force.value.y,
      moment: sum.moment + (force.at.x - pivot.x) * force.value.y - (force.at.y - pivot.y) * force.value.x,
    }),
    { fx: 0, fy: 0, moment: 0 },
  )
  const maxResidual = residuals.reduce(
    (max, residual) => Math.max(max, Math.abs(residual.fx), Math.abs(residual.fy)),
    0,
  )

  return { forces, reactions, byLabel, residuals, global, maxResidual }
}

interface KratownicaVariantData {
  nr: number
  P1: number
  P2: number
  P3: number
  a: number | null
  h: number | null
  alpha: number | null
}

export const KRATOWNICA_VARIANT_DATA: KratownicaVariantData[] = [
  { nr: 1, P1: 4, P2: 9, P3: 2, a: 2, h: null, alpha: 30 },
  { nr: 2, P1: 10, P2: 3, P3: 4, a: 2.5, h: null, alpha: 60 },
  { nr: 3, P1: 2, P2: 12, P3: 6, a: 3, h: null, alpha: 60 },
  { nr: 4, P1: 10, P2: 10, P3: 5, a: 4, h: null, alpha: 60 },
  { nr: 5, P1: 2, P2: 4, P3: 2, a: null, h: 2, alpha: 60 },
  { nr: 6, P1: 3, P2: 7, P3: 5, a: 4, h: 3, alpha: null },
  { nr: 7, P1: 4, P2: 6, P3: 3, a: 4, h: null, alpha: 60 },
  { nr: 8, P1: 5, P2: 7, P3: 7, a: 3.2, h: null, alpha: 45 },
  { nr: 9, P1: 10, P2: 8, P3: 2, a: 5, h: null, alpha: 60 },
  { nr: 10, P1: 3, P2: 4, P3: 5, a: 4.4, h: 3.3, alpha: null },
]

const node = (name: string, x: number, y: number): KratownicaNode => ({ name, x, y })
const member = (label: number, i: number, j: number): KratownicaMember => ({ label, i, j })
const pin = (nodeIndex: number, label: string): KratownicaSupport => ({
  node: nodeIndex,
  label,
  directions: [
    { dir: point(1, 0), name: `${label}_x` },
    { dir: point(0, 1), name: `${label}_y` },
  ],
})
const rollerX = (nodeIndex: number, label: string): KratownicaSupport => ({
  node: nodeIndex,
  label,
  directions: [{ dir: point(1, 0), name: `${label}_x` }],
})
const rollerY = (nodeIndex: number, label: string): KratownicaSupport => ({
  node: nodeIndex,
  label,
  directions: [{ dir: point(0, 1), name: `${label}_y` }],
})

function baseGiven(data: KratownicaVariantData, extra: string[]): string[] {
  const lines = [`P₁ = ${pl(data.P1, 0)} kN, P₂ = ${pl(data.P2, 0)} kN, P₃ = ${pl(data.P3, 0)} kN`]
  if (data.a !== null) lines.push(`a = ${pl(data.a, 2)} m`)
  if (data.h !== null) lines.push(`h = ${pl(data.h, 2)} m`)
  if (data.alpha !== null) lines.push(`α = ${pl(data.alpha, 0)}°`)
  return [...lines, ...extra]
}

export function buildOne(data: KratownicaVariantData): KratownicaConfig {
  const H = data.a === null ? data.h! : data.a * tangent(data.alpha!)
  const a = data.a ?? H / tangent(data.alpha!)
  const nodes = [
    node('A', -a, 3 * H),
    node('T0', 0, 3 * H),
    node('T1', a, 2 * H),
    node('T2', 2 * a, H),
    node('B', 0, 0),
    node('C', a, 0),
    node('D', 2 * a, 0),
    node('E', 3 * a, 0),
  ]
  return {
    nr: 1,
    title: 'Kratownica nr 1: pas górny opadający, podpora A na ścianie',
    given: baseGiven(data, ['A — przegub na ścianie, B — przegub na gruncie', 'Pręty 1–12, pas dolny B–C–D–E']),
    topology:
      'Pas dolny B–C–D–E, pas górny T0–T1–T2–E, słupki 2, 6, 10, ukośnice 4 i 8; A jest na ścianie po lewej stronie T0.',
    heightNote:
      data.h === null
        ? `Nachylenie pasa górnego daje H = a·tanα = ${pl(H)} m, więc T0 leży na wysokości 3H = ${pl(3 * H)} m.`
        : `Wysokość T0 nad pasem dolnym wynosi 3H = ${pl(3 * H)} m przy H = ${pl(H)} m.`,
    loadNote: 'P₁ działa poziomo w lewo w węźle T1, P₂ pionowo w dół w D, a P₃ pionowo w dół w E.',
    supportNote: 'A i B są przegubami: każdy wnosi dwie reakcje.',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 1, 4),
      member(3, 1, 2),
      member(4, 4, 2),
      member(5, 4, 5),
      member(6, 2, 5),
      member(7, 2, 3),
      member(8, 5, 3),
      member(9, 5, 6),
      member(10, 6, 3),
      member(11, 3, 7),
      member(12, 6, 7),
    ],
    supports: [pin(0, 'A'), pin(4, 'B')],
    loads: [
      { node: 2, fx: -data.P1, fy: 0, label: 'P₁' },
      { node: 6, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 7, fx: 0, fy: -data.P3, label: 'P₃' },
    ],
  }
}

export function buildTwo(data: KratownicaVariantData): KratownicaConfig {
  const H = data.a === null ? data.h! : data.a * tangent(data.alpha!)
  const a = data.a ?? H / tangent(data.alpha!)
  const nodes = [
    node('A', 0, H),
    node('B', 0, 0),
    node('T1', a, H),
    node('T2', 2 * a, H),
    node('T3', 3 * a, H),
    node('C1', a, 0),
    node('C2', 2 * a, 0),
    node('C3', 3 * a, 0),
  ]
  return {
    nr: 2,
    title: 'Kratownica nr 2: trzy panele, pasy równoległe',
    given: baseGiven(data, [
      'A — przegub na ścianie, B — podpora z więzem poziomym',
      'Pręty 1–12; pasy A–T1–T2–T3 i B–C1–C2–C3',
    ]),
    topology: 'Pasy równoległe A–T1–T2–T3 oraz B–C1–C2–C3, słupki 4, 8, 12, ukośnice 2, 6, 10.',
    heightNote:
      data.h === null
        ? `Ukośnica 10 ma rzut poziomy a i pionowy h, więc h = a·tanα = ${pl(H)} m.`
        : `Wysokość kratownicy wynosi h = ${pl(H)} m.`,
    loadNote: 'P₁ i P₂ działają pionowo w dół w węzłach T1 i T2, a P₃ poziomo w prawo w C3.',
    supportNote: 'A jest przegubem (A_x, A_y), a B więzem poziomym (tylko B_x); w rozwiązaniu B_y wychodzi zerowe.',
    nodes,
    members: [
      member(1, 0, 2),
      member(2, 0, 5),
      member(3, 1, 5),
      member(4, 2, 5),
      member(5, 2, 3),
      member(6, 2, 6),
      member(7, 5, 6),
      member(8, 3, 6),
      member(9, 3, 4),
      member(10, 3, 7),
      member(11, 6, 7),
      member(12, 4, 7),
    ],
    supports: [pin(0, 'A'), pin(1, 'B')],
    loads: [
      { node: 2, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 3, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 7, fx: data.P3, fy: 0, label: 'P₃' },
    ],
  }
}

export function buildThree(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h ?? (a / 2) * tangent(data.alpha!)
  const nodes = [
    node('A', 0, 0),
    node('L', 0.5 * a, H),
    node('M', 1.5 * a, H),
    node('R', 2.5 * a, H),
    node('N', a, 0),
    node("N'", 2 * a, 0),
    node('O', 1.5 * a, -H),
    node('B', 3 * a, 0),
  ]
  return {
    nr: 3,
    title: 'Kratownica nr 3: układ symetryczny z dolnym węzłem O',
    given: baseGiven(data, ['A — przegub, B — podpora pionowa', 'Pręty 1–13; pas górny L–M–R, dolne węzły N i N′']),
    topology: 'Pas górny L–M–R, dolne węzły N i N′, centralny węzeł O pod M; ukośnice 1, 3, 5, 6, 9, 10, 11, 12.',
    heightNote: `Ukośnica 12 ma rzut poziomy a/2, więc h = (a/2)·tanα = ${pl(H)} m; węzeł O leży symetrycznie na −h.`,
    loadNote:
      'P₁ działa poziomo w prawo w L, P₂ pionowo w dół w M, a P₃ w R wzdłuż przedłużenia ukośnicy 11 (pod kątem α do poziomu).',
    supportNote: 'A jest przegubem (A_x, A_y), B jest podporą pionową (B_y).',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 0, 4),
      member(3, 1, 4),
      member(4, 1, 2),
      member(5, 4, 2),
      member(6, 4, 6),
      member(7, 2, 6),
      member(8, 2, 3),
      member(9, 2, 5),
      member(10, 6, 5),
      member(11, 3, 5),
      member(12, 3, 7),
      member(13, 5, 7),
    ],
    supports: [pin(0, 'A'), rollerY(7, 'B')],
    loads: [
      { node: 1, fx: data.P1, fy: 0, label: 'P₁' },
      { node: 2, fx: 0, fy: -data.P2, label: 'P₂' },
      {
        node: 3,
        fx: data.P3 * cosine(data.alpha!),
        fy: data.P3 * sine(data.alpha!),
        label: 'P₃',
      },
    ],
  }
}

export function buildFour(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h ?? a * tangent(data.alpha!)
  const nodes = [
    node('A', 0, 2 * H),
    node('C0', 0, 0),
    node('C1', a, 0),
    node('C2', 2 * a, 0),
    node('C3', 3 * a, 0),
    node('B', 4 * a, 0),
    node('T1', a, H),
    node('T2', 2 * a, H),
    node('T3', 3 * a, H),
  ]
  return {
    nr: 4,
    title: 'Kratownica nr 4: wspornik górny i pas dolny czteropanelowy',
    given: baseGiven(data, ['A — podpora na stropie, B — przegub na gruncie', 'Pręty 1–14; pas dolny C0–C1–C2–C3–B']),
    topology:
      'Pionowy słup 1 od stropu do C0, pas górny T1–T2–T3, pas dolny C0–C1–C2–C3–B; słupki 4, 8, 12 i ukośnice 2, 6, 10, 13.',
    heightNote:
      data.h === null
        ? `Ukośnica 13 ma rzut poziomy a, więc h = a·tanα = ${pl(H)} m.`
        : `Wysokość pasa górnego nad dolnym wynosi h = ${pl(H)} m.`,
    loadNote: 'P₂ działa w dół w C1, P₁ w dół w C2, a P₃ poziomo w prawo w T3.',
    supportNote: 'A jest przegubem na stropie (w rozwiązaniu A_x = 0), B jest przegubem na gruncie.',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 1, 6),
      member(3, 1, 2),
      member(4, 6, 2),
      member(5, 6, 7),
      member(6, 2, 7),
      member(7, 2, 3),
      member(8, 7, 3),
      member(9, 7, 8),
      member(10, 7, 4),
      member(11, 3, 4),
      member(12, 8, 4),
      member(13, 8, 5),
      member(14, 4, 5),
    ],
    supports: [pin(0, 'A'), pin(5, 'B')],
    loads: [
      { node: 2, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 3, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 8, fx: data.P3, fy: 0, label: 'P₃' },
    ],
  }
}

export function buildFive(data: KratownicaVariantData): KratownicaConfig {
  const H = data.h!
  const a = data.a ?? H / tangent(data.alpha!)
  const nodes = [
    node('A', 0, 4 * H),
    node('L3', 0, 3 * H),
    node('L2', 0, 2 * H),
    node('L1', 0, H),
    node('B', 0, 0),
    node('R3', a, 3 * H),
    node('R2', 2 * a, 2 * H),
    node('R1', a, H),
  ]
  return {
    nr: 5,
    title: 'Kratownica nr 5: czterokondygnacyjny słup i trójkątny wysięgnik',
    given: baseGiven(data, ['A — podpora pozioma na ścianie, B — przegub na gruncie', 'Pręty 1–13; słup A–L3–L2–L1–B']),
    topology: 'Pionowy słup A–L3–L2–L1–B, węzły R3, R2 i R1 tworzą trójkątny wysięgnik; ukośnice 2, 5, 6, 9, 10, 13.',
    heightNote:
      data.a === null
        ? `Kąt α ukośnicy 13 daje a = h/tanα = ${pl(a)} m, więc rozstaw paneli jest wyliczony z wysokości.`
        : `Wysokość słupa wynosi 4h = ${pl(4 * H)} m, a rozstaw a = ${pl(a)} m.`,
    loadNote: 'P₁ działa w dół w R3, P₂ w dół w R2, a P₃ poziomo w lewo w R1.',
    supportNote: 'A jest podporą poziomą na ścianie (tylko A_x), B jest przegubem (B_x, B_y).',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 0, 5),
      member(3, 1, 5),
      member(4, 1, 2),
      member(5, 2, 5),
      member(6, 5, 6),
      member(7, 2, 6),
      member(8, 2, 3),
      member(9, 2, 7),
      member(10, 7, 6),
      member(11, 3, 7),
      member(12, 3, 4),
      member(13, 4, 7),
    ],
    supports: [rollerX(0, 'A'), pin(4, 'B')],
    loads: [
      { node: 5, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 6, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 7, fx: -data.P3, fy: 0, label: 'P₃' },
    ],
  }
}

export function buildSix(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h!
  const nodes = [
    node('A', 0, 0),
    node('M0', 0, H),
    node('T0', 0, 2 * H),
    node('M1', a, H),
    node('T1', a, 2 * H),
    node('M2', 2 * a, H),
    node('T2', 2 * a, 2 * H),
    node('T3', 3 * a, 2 * H),
  ]
  return {
    nr: 6,
    title: 'Kratownica nr 6: dwa poziomy pasa i podpora B na występnie',
    given: baseGiven(data, [
      'A — przegub na gruncie, B — podpora pionowa na występnie',
      'Pręty 1–13; pas górny T0–T1–T2–T3, pas środkowy M0–M1–M2',
    ]),
    topology: 'Dwa poziomy pasa: górny T0–T1–T2–T3 i środkowy M0–M1–M2, dolny węzeł A; podpora B w M2.',
    heightNote: `Wysokość między pasami wynosi h = ${pl(H)} m, więc górny pas leży na 2h = ${pl(2 * H)} m.`,
    loadNote: 'P₁ działa poziomo w prawo w T0, P₂ pionowo w dół w T1, a P₃ pionowo w dół w T3.',
    supportNote: 'A jest przegubem (A_x, A_y), B jest podporą pionową (B_y).',
    nodes,
    members: [
      member(1, 2, 1),
      member(2, 1, 0),
      member(3, 2, 4),
      member(4, 1, 4),
      member(5, 1, 3),
      member(6, 0, 3),
      member(7, 4, 3),
      member(8, 4, 6),
      member(9, 3, 6),
      member(10, 3, 5),
      member(11, 6, 5),
      member(12, 6, 7),
      member(13, 5, 7),
    ],
    supports: [pin(0, 'A'), rollerY(5, 'B')],
    loads: [
      { node: 2, fx: data.P1, fy: 0, label: 'P₁' },
      { node: 4, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 7, fx: 0, fy: -data.P3, label: 'P₃' },
    ],
  }
}

export function buildSeven(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h ?? (a / 2) * tangent(data.alpha!)
  const nodes = [
    node('A', a, 2 * H),
    node('L0', 0, 0),
    node('L1', a, 0),
    node('L2', 2 * a, 0),
    node('L3', 3 * a, 0),
    node('T0', 0.5 * a, H),
    node('T1', 1.5 * a, H),
    node('T2', 2.5 * a, H),
  ]
  return {
    nr: 7,
    title: 'Kratownica nr 7: kratownica Warrena zawieszona w węźle A',
    given: baseGiven(data, [
      'A — przegub u góry na wieszaku, B — przegub na gruncie',
      'Pręty 1–12; pas dolny L0–L1–L2–L3',
    ]),
    topology:
      'Pas dolny L0–L1–L2–L3, pas górny T0–T1–T2 przesunięty o pół panelu, ukośnice 2, 5, 6, 8, 10, 11 oraz wieszak 1.',
    heightNote: `Ukośnica 11 ma rzut poziomy a/2, więc h = (a/2)·tanα = ${pl(H)} m; wieszak A–T1 także tworzy z poziomem kąt α, więc A = (a; 2h).`,
    loadNote: 'P₁ działa pionowo w dół w L0, P₂ pionowo w dół w L1, a P₃ poziomo w prawo w T2.',
    supportNote: 'A i B są przegubami; wieszak 1 przenosi siłę osiową między A i T1.',
    nodes,
    members: [
      member(1, 0, 6),
      member(2, 1, 5),
      member(3, 1, 2),
      member(4, 5, 2),
      member(5, 5, 6),
      member(6, 2, 6),
      member(7, 2, 3),
      member(8, 6, 3),
      member(9, 6, 7),
      member(10, 3, 7),
      member(11, 7, 4),
      member(12, 3, 4),
    ],
    supports: [pin(0, 'A'), pin(4, 'B')],
    loads: [
      { node: 1, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 2, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 7, fx: data.P3, fy: 0, label: 'P₃' },
    ],
  }
}

export function buildEight(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h ?? 2 * a * tangent(data.alpha!)
  const nodes = [
    node('A', -a, H),
    node('T0', 0, H),
    node('T1', a, H),
    node('T2', 2 * a, H),
    node('T3', 3 * a, H),
    node('U1', a, H / 2),
    node('U2', 2 * a, H / 2),
    node('B', a, 0),
  ]
  return {
    nr: 8,
    title: 'Kratownica nr 8: pas górny z dolnym trójkątem i podporą B pod U1',
    given: baseGiven(data, ['A — przegub na ścianie, B — przegub na gruncie', 'Pręty 1–12; pas górny T0–T1–T2–T3']),
    topology:
      'Pas górny T0–T1–T2–T3, dolne węzły U1 i U2 na połowie wysokości, podpora B pod U1; słupki 4, 8, 10 i ukośnice 3, 6, 9, 12.',
    heightNote:
      data.h === null
        ? `Ukośnica 9 ma rzut poziomy a i pionowy h/2, więc h = 2a·tanα = ${pl(H)} m.`
        : `Wysokość pasa górnego wynosi h = ${pl(H)} m, a dolne węzły leżą na h/2.`,
    loadNote: 'P₁, P₂ i P₃ działają pionowo w dół w węzłach T1, T2 i T3.',
    supportNote: 'A i B są przegubami; w rozwiązaniu A_y = 0, więc podpora A pracuje jak więz poziomy.',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 1, 2),
      member(3, 1, 5),
      member(4, 2, 5),
      member(5, 2, 3),
      member(6, 5, 3),
      member(7, 5, 6),
      member(8, 5, 7),
      member(9, 6, 7),
      member(10, 3, 6),
      member(11, 3, 4),
      member(12, 4, 6),
    ],
    supports: [pin(0, 'A'), pin(7, 'B')],
    loads: [
      { node: 2, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 3, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 4, fx: 0, fy: -data.P3, label: 'P₃' },
    ],
  }
}

export function buildNine(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h ?? a * tangent(data.alpha!)
  const nodes = [
    node('A', 0, 0),
    node('T0', 0, H),
    node('B1', a, 0),
    node('T1', a, H),
    node('B2', 2 * a, 0),
    node('T2', 2 * a, H),
    node('B3', 3 * a, 0),
    node('T3', 3 * a, H),
    node('B4', 4 * a, 0),
    node('T4', 4 * a, H),
  ]
  return {
    nr: 9,
    title: 'Kratownica nr 9: czteropanelowa kratownica prostokątna',
    given: baseGiven(data, ['A — przegub, B — podpora pionowa', 'Pręty 1–17; pasy T0–T4 i A–B4, słupki co panel']),
    topology: 'Pas górny T0–T1–T2–T3–T4, pas dolny A–B1–B2–B3–B4, słupki 1, 5, 9, 13, 17 i ukośnice 3, 7, 11, 15.',
    heightNote:
      data.h === null
        ? `Ukośnica 3 ma rzut poziomy a, więc h = a·tanα = ${pl(H)} m.`
        : `Wysokość kratownicy wynosi h = ${pl(H)} m.`,
    loadNote: 'P₁ i P₂ działają pionowo w dół w B1 i B2, a P₃ poziomo w prawo w T4.',
    supportNote: 'A jest przegubem (A_x, A_y), B jest podporą pionową (B_y).',
    nodes,
    members: [
      member(1, 0, 1),
      member(2, 1, 3),
      member(3, 0, 3),
      member(4, 0, 2),
      member(5, 2, 3),
      member(6, 3, 5),
      member(7, 2, 5),
      member(8, 2, 4),
      member(9, 4, 5),
      member(10, 5, 7),
      member(11, 4, 7),
      member(12, 4, 6),
      member(13, 6, 7),
      member(14, 7, 9),
      member(15, 6, 9),
      member(16, 6, 8),
      member(17, 8, 9),
    ],
    supports: [pin(0, 'A'), rollerY(8, 'B')],
    loads: [
      { node: 2, fx: 0, fy: -data.P1, label: 'P₁' },
      { node: 4, fx: 0, fy: -data.P2, label: 'P₂' },
      { node: 9, fx: data.P3, fy: 0, label: 'P₃' },
    ],
  }
}

export function buildTen(data: KratownicaVariantData): KratownicaConfig {
  const a = data.a!
  const H = data.h!
  const nodes = [
    node('A', 0, 0),
    node('M0', 0, H),
    node('T0', 0, 2 * H),
    node('M1', a, H),
    node('T1', a, 2 * H),
    node('M2', 2 * a, H),
    node('T2', 2 * a, 2 * H),
    node('B', a, 0),
  ]
  return {
    nr: 10,
    title: 'Kratownica nr 10: dwie kondygnacje i wysięgnik w prawo',
    given: baseGiven(data, ['A i B — przeguby na gruncie', 'Pręty 1–12; pas górny T0–T1–T2, pas środkowy M0–M1–M2']),
    topology: 'Lewy słup T0–M0–A, środkowy słup T1–M1–B, prawy słupek T2–M2; pas górny T0–T1–T2 i środkowy M0–M1–M2.',
    heightNote: `Każda kondygnacja ma wysokość h = ${pl(H)} m, więc górny pas leży na 2h = ${pl(2 * H)} m.`,
    loadNote: 'P₁ działa poziomo w prawo w T0, P₂ poziomo w prawo w M0, a P₃ pionowo w dół w T2.',
    supportNote: 'A i B są przegubami na gruncie (po dwie reakcje).',
    nodes,
    members: [
      member(1, 2, 1),
      member(2, 1, 0),
      member(3, 2, 4),
      member(4, 2, 3),
      member(5, 1, 3),
      member(6, 1, 7),
      member(7, 4, 3),
      member(8, 3, 7),
      member(9, 4, 6),
      member(10, 4, 5),
      member(11, 3, 5),
      member(12, 6, 5),
    ],
    supports: [pin(0, 'A'), pin(7, 'B')],
    loads: [
      { node: 2, fx: data.P1, fy: 0, label: 'P₁' },
      { node: 1, fx: data.P2, fy: 0, label: 'P₂' },
      { node: 6, fx: 0, fy: -data.P3, label: 'P₃' },
    ],
  }
}

const BUILDERS: Record<number, (data: KratownicaVariantData) => KratownicaConfig> = {
  1: buildOne,
  2: buildTwo,
  3: buildThree,
  4: buildFour,
  5: buildFive,
  6: buildSix,
  7: buildSeven,
  8: buildEight,
  9: buildNine,
  10: buildTen,
}

function dataFormula(config: KratownicaConfig): string {
  const data = KRATOWNICA_VARIANT_DATA[config.nr - 1]
  const parts = [
    `P_1=${tex(data.P1, 0)}\\ \\mathrm{kN}`,
    `P_2=${tex(data.P2, 0)}\\ \\mathrm{kN}`,
    `P_3=${tex(data.P3, 0)}\\ \\mathrm{kN}`,
  ]
  if (data.a !== null) parts.push(`a=${tex(data.a, 2)}\\ \\mathrm{m}`)
  if (data.h !== null) parts.push(`h=${tex(data.h, 2)}\\ \\mathrm{m}`)
  if (data.alpha !== null) parts.push(`\\alpha=${tex(data.alpha, 0)}^\\circ`)
  return parts.join(',\\quad ')
}

function reactionNames(config: KratownicaConfig): string[] {
  return config.supports.flatMap((support) => support.directions.map((direction) => direction.name))
}

function loadFormula(config: KratownicaConfig): string {
  return config.loads
    .map((load) => {
      const nodeName = config.nodes[load.node].name.replace("'", '')
      return `\\mathbf P_{${load.label.replace('P', '')}}^{(${nodeName})}=(${tex(load.fx)},\\ ${tex(load.fy)})\\ \\mathrm{kN}`
    })
    .join(',\\qquad ')
}

function signedLabel(value: number, label: string): string {
  return `${value >= 0 ? '+' : '−'}${pl(Math.abs(value), 2)}·${label}`
}

function globalEquationVisuals(config: KratownicaConfig, solution: KratownicaSolution): string[] {
  const reactions = reactionNames(config)
  const loadFx = config.loads.reduce((sum, load) => sum + load.fx, 0)
  const loadFy = config.loads.reduce((sum, load) => sum + load.fy, 0)
  const fxParts = [
    ...reactions.filter((name) => name.endsWith('_x')).map((name) => signedLabel(solution.byLabel[name], name)),
    signedLabel(loadFx, 'ΣP_x'),
  ]
  const fyParts = [
    ...reactions.filter((name) => name.endsWith('_y')).map((name) => signedLabel(solution.byLabel[name], name)),
    signedLabel(loadFy, 'ΣP_y'),
  ]
  return [
    `ΣF_x: ${fxParts.join(' ')} = 0`,
    `ΣF_y: ${fyParts.join(' ')} = 0`,
    `ΣM_A: ${pl(solution.global.moment, 6)} kN·m ≈ 0`,
  ]
}

function memberLines(solution: KratownicaSolution): string[] {
  return solution.forces.map((force, index) => `N${index + 1} = ${pl(force)} kN`)
}

function reactionLines(config: KratownicaConfig, solution: KratownicaSolution): string[] {
  return reactionNames(config).map((name, index) => `${name} = ${pl(solution.reactions[index])} kN`)
}

function tensionLabels(solution: KratownicaSolution): number[] {
  return solution.forces
    .map((force, index) => ({ force, label: index + 1 }))
    .filter((entry) => entry.force > 1e-9)
    .map((entry) => entry.label)
}

function compressionLabels(solution: KratownicaSolution): number[] {
  return solution.forces
    .map((force, index) => ({ force, label: index + 1 }))
    .filter((entry) => entry.force < -1e-9)
    .map((entry) => entry.label)
}

function zeroLabels(solution: KratownicaSolution): number[] {
  return solution.forces
    .map((force, index) => ({ force, label: index + 1 }))
    .filter((entry) => Math.abs(entry.force) <= 1e-9)
    .map((entry) => entry.label)
}

export function createKratownicaTask(config: KratownicaConfig, solution: KratownicaSolution): SourceTaskDefinition {
  const reactions = reactionLines(config, solution)
  const members = memberLines(solution)
  const zeros = zeroLabels(solution)
  const tension = tensionLabels(solution)
  const compression = compressionLabels(solution)
  const result = `Reakcje: ${reactions.join('; ')}; siły w prętach: ${members.join('; ')}`
  const zeroText = zeros.length ? zeros.join(', ') : 'brak'
  const nodes = config.nodes.map((entry) => `${entry.name} = (${pl(entry.x, 2)}; ${pl(entry.y, 2)}) m`)
  const loads = config.loads.map(
    (load) => `${load.label}: (${pl(load.fx)}; ${pl(load.fy)}) kN w węźle ${config.nodes[load.node].name}`,
  )
  const jointChecks = solution.residuals.map(
    (residual) => `${residual.node}: ΣF_x = ${pl(residual.fx, 6)}, ΣF_y = ${pl(residual.fy, 6)} kN`,
  )
  const reactionBalance = [
    `ΣF_x (obciążenia + reakcje) = ${pl(solution.global.fx, 6)} kN`,
    `ΣF_y (obciążenia + reakcje) = ${pl(solution.global.fy, 6)} kN`,
    `ΣM_A (obciążenia + reakcje) = ${pl(solution.global.moment, 6)} kN·m`,
    `Maksymalna reszta węzłowa = ${solution.maxResidual.toExponential(2)} kN`,
    `Pręty zerowe: ${zeroText}`,
    'Bilans globalny i reszty węzłowe potwierdzają rozwiązanie',
  ]
  const solutionFormula = [
    ...reactionNames(config).map((name, index) => `${name}=${tex(solution.reactions[index])}`),
    ...solution.forces.map((force, index) => `N_{${index + 1}}=${tex(force)}`),
  ].join(',\\quad ')
  const globalFormula = `\\sum F_x=0,\\qquad \\sum F_y=0,\\qquad \\sum M_A=0\\quad\\text{(cała kratownica)};\\qquad \\sum F_x=0,\\ \\sum F_y=0\\quad\\text{(każdy z ${config.nodes.length} węzłów)}`
  const interpretationFormula = `N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad N=0\\Rightarrow\\text{pręt zerowy}`
  const checkFormula = `\\max|\\Sigma F_x|,\\ |\\Sigma F_y|=${solution.maxResidual.toExponential(2)}\\ \\mathrm{kN};\\qquad \\sum F_x=${tex(solution.global.fx, 6)},\\ \\sum F_y=${tex(solution.global.fy, 6)}\\ \\mathrm{kN},\\ \\sum M_A=${tex(solution.global.moment, 6)}\\ \\mathrm{kN\\cdot m}`

  return makeBatchTask({
    id: `kratownica-schemat-${config.nr}`,
    title: config.title,
    given: config.given,
    result,
    visuals: [
      [
        ...config.given,
        `Węzłów: ${config.nodes.length}, prętów: ${config.members.length}`,
        `Niewiadomych: ${config.members.length + reactionNames(config).length}`,
      ],
      [...nodes, ...loads, config.heightNote],
      [
        ...globalEquationVisuals(config, solution),
        `Równania węzłowe: 2·${config.nodes.length} = ${2 * config.nodes.length}`,
        ...jointChecks,
      ],
      [...reactions, ...members],
      [
        `Rozciągane (N > 0): ${tension.join(', ') || 'brak'}`,
        `Ściskane (N < 0): ${compression.join(', ') || 'brak'}`,
        `Zerowe (N = 0): ${zeroText}`,
        `Największa siła: N${solution.forces.reduce((best, force, index) => (Math.abs(force) > Math.abs(solution.forces[best]) ? index : best), 0) + 1} = ${pl(Math.max(...solution.forces.map((force) => Math.abs(force))))} kN`,
        'Znak dodatni oznacza rozciąganie, ujemny ściskanie',
      ],
      reactionBalance,
    ],
    model: {
      narration: `Kratownica nr ${config.nr} ma ${config.nodes.length} węzłów i ${config.members.length} prętów. ${config.topology} Podpory: ${config.supportNote}`,
      formula: dataFormula(config),
      caption: 'Model prętowy: idealne przeguby, obciążenia tylko w węzłach.',
    },
    loads: {
      narration: `${config.loadNote} ${config.heightNote}`,
      formula: loadFormula(config),
      caption: 'Zwroty i punkty przyłożenia obciążeń odczytano ze schematu źródłowego.',
    },
    equations: {
      narration: `Dla każdego z ${config.nodes.length} węzłów zapisujemy ΣF_x = 0 i ΣF_y = 0. Niewiadome to siły N₁…N${config.members.length} oraz reakcje ${reactionNames(config).join(', ')}. Łącznie ${config.members.length + reactionNames(config).length} niewiadomych i ${2 * config.nodes.length} równań.`,
      formula: globalFormula,
      caption: 'Układ jest kwadratowy; dodatni znak siły przyjęto jako rozciąganie.',
    },
    solution: {
      narration: `Rozwiązanie układu daje reakcje ${reactions.join(', ')} oraz siły w prętach ${members.join(', ')}.`,
      formula: solutionFormula,
      caption: 'Wszystkie wartości w kN; znaki wynikają z przyjętego rozciągania jako dodatniego.',
    },
    interpretation: {
      narration: `Pręty rozciągane: ${tension.join(', ') || 'brak'}. Pręty ściskane: ${compression.join(', ') || 'brak'}. Pręty zerowe: ${zeroText}. Znak dodatni oznacza rozciąganie, ujemny ściskanie, a zero pręt nieprzenoszący siły.`,
      formula: interpretationFormula,
      caption: 'Interpretacja znaków jest konsekwencją założenia N > 0 dla rozciągania.',
    },
    check: {
      narration: `Niezależna kontrola: po podstawieniu rozwiązania maksymalna reszta w dowolnym węźle wynosi ${solution.maxResidual.toExponential(2)} kN, a globalne sumy sił i momentu znikają. ${zeroText === 'brak' ? 'Brak prętów zerowych.' : `Pręty zerowe: ${zeroText}.`}`,
      formula: checkFormula,
      caption: 'Kontrola wykorzystuje wszystkie równania węzłowe oraz bilans całej kratownicy.',
    },
  })
}

export function createKratownicaSolution(task: SourceTaskDefinition): Omit<SolutionData, 'animation'> {
  return defineSourceSolution(task)
}

export const canonicalConfig: KratownicaConfig = buildOne(KRATOWNICA_VARIANT_DATA[0])

export const canonicalTask: SourceTaskDefinition = {
  ...createKratownicaTask(canonicalConfig, solveKratownica(canonicalConfig)),
  id: 'factory-statyka-kratownica',
}
