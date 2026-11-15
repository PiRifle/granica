import { criticalFrictionAngleDeg, frictionForce, moment2D, solveLinearSystem, type Vec2 } from '../../../lib/statics'
import { makeBatchTask } from '../core/batch-task'
import { defineSourceSolution, pl, tex, type SourceTaskDefinition } from '../core/source-task'
import type { SolutionData } from '../../model'

const origin: Vec2 = { x: 0, y: 0 }
const point = (x: number, y: number): Vec2 => ({ x, y })
const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y })
const scale = (k: number, v: Vec2): Vec2 => ({ x: k * v.x, y: k * v.y })
const cross = (a: Vec2, b: Vec2): number => a.x * b.y - a.y * b.x
const rot90 = (v: Vec2): Vec2 => ({ x: -v.y, y: v.x })

export type HamulecFamily = 'lever' | 'rod'

export interface HamulecConfig {
  nr: number
  family: HamulecFamily
  G: number
  Q: number | null
  a: number
  b: number
  e: number
  alphaDeg: number | null
  mu: number
  outerK: number
  ropeK: number
  ropeTension: number
  ropeDirection: Vec2
  ropeTangent: Vec2
  contact: Vec2
  drumWeight: number
  title: string
  modelText: string
  givenGeometry: string
  contactText: string
  ropeText: string
  reactionPoints: string
  lever?: {
    u: Vec2
    contactToA: number
    contactToB: number
    pAtB: boolean
    pDistance: number
    pDirection: Vec2
    pLabel: string
  }
  rod?: {
    u: Vec2
    guideA: number
    guideB: number
    pEnd: number
  }
}

export interface HamulecSolution {
  config: HamulecConfig
  S: number
  ropeMoment: number
  T: number
  N: number
  P: number
  O: Vec2
  A: Vec2
  B?: Vec2
  drum: {
    force: Vec2
    momentO: number
    momentC: number
  }
  body: {
    force: Vec2
    momentA: number
    momentOther: number
  }
  frictionLimit: number
  frictionAngle: number
  pPositive: boolean
}

const solvePoint = (matrix: number[][], rhs: number[]) => solveLinearSystem(matrix, rhs)

export function solveHamulec(config: HamulecConfig): HamulecSolution {
  const R = 1
  const contact = config.contact
  const radial = scale(config.outerK * R, contact)
  const ropePoint = scale(config.ropeK * R, config.ropeTangent)
  const ropeForce = scale(config.ropeTension, config.ropeDirection)
  const ropeMoment = moment2D(origin, ropeForce, ropePoint)

  const tangentCCW = rot90(contact)
  const tangentCoefficient = cross(radial, tangentCCW)
  let frictionTangent = tangentCCW
  let T = -ropeMoment / tangentCoefficient
  if (T < 0) {
    frictionTangent = scale(-1, tangentCCW)
    T = -ropeMoment / cross(radial, frictionTangent)
  }
  const frictionOnDrum = scale(T, frictionTangent)
  const N = T / config.mu
  const frictionLimit = frictionForce(N, config.mu, true)

  const weight: Vec2 = point(0, -config.drumWeight)
  const normalOnDrum = scale(-N, contact)
  const O = scale(-1, add(add(weight, ropeForce), add(normalOnDrum, frictionOnDrum)))

  let A: Vec2
  let B: Vec2 | undefined
  let P: number
  let bodyForce: Vec2
  let bodyMomentA: number
  let bodyMomentOther: number

  if (config.family === 'lever') {
    const lever = config.lever
    if (!lever) throw new Error(`Brak geometrii dźwigni dla zadania C-${config.nr}`)
    const C = radial
    const axisPoint = add(C, scale(config.e, contact))
    const pivotA = add(axisPoint, scale(-lever.contactToA, lever.u))
    const endB = add(axisPoint, scale(lever.contactToB, lever.u))
    const pPoint = lever.pAtB ? endB : add(pivotA, scale(lever.pDistance, lever.u))
    const normalOnLever = scale(N, contact)
    const frictionOnLever = scale(-1, frictionOnDrum)
    const known = add(normalOnLever, frictionOnLever)
    const pMomentArm = moment2D(pivotA, lever.pDirection, pPoint)
    const knownMoment = moment2D(pivotA, known, C)
    const values = solvePoint(
      [
        [1, 0, lever.pDirection.x],
        [0, 1, lever.pDirection.y],
        [0, 0, pMomentArm],
      ],
      [-known.x, -known.y, -knownMoment],
    )
    A = point(values[0], values[1])
    P = values[2]
    bodyForce = add(add(A, known), scale(P, lever.pDirection))
    bodyMomentA = 0
    const pForce = scale(P, lever.pDirection)
    bodyMomentOther = moment2D(C, A, pivotA) + moment2D(C, pForce, pPoint)
    B = endB
  } else {
    const rod = config.rod
    if (!rod) throw new Error(`Brak geometrii pręta dla zadania C-${config.nr}`)
    const C = radial
    const u = rod.u
    const guideAPoint = add(C, scale(rod.guideA, u))
    const guideBPoint = add(C, scale(rod.guideB, u))
    const pPoint = add(C, scale(rod.pEnd, u))
    const pDirection = scale(-1, u)
    const nDirection = frictionTangent
    const normalOnRod = scale(N, u)
    const frictionOnRod = scale(-1, frictionOnDrum)
    const known = add(normalOnRod, frictionOnRod)
    const values = solvePoint(
      [
        [nDirection.x, nDirection.x, pDirection.x],
        [nDirection.y, nDirection.y, pDirection.y],
        [0, moment2D(guideAPoint, nDirection, guideBPoint), moment2D(guideAPoint, pDirection, pPoint)],
      ],
      [-known.x, -known.y, -moment2D(guideAPoint, known, C)],
    )
    A = scale(values[0], nDirection)
    B = scale(values[1], nDirection)
    P = values[2]
    bodyForce = add(add(add(A, B), known), scale(P, pDirection))
    bodyMomentA = 0
    bodyMomentOther =
      moment2D(C, A, guideAPoint) + moment2D(C, B, guideBPoint) + moment2D(C, scale(P, pDirection), pPoint)
  }

  const drumForce = add(add(add(weight, ropeForce), add(normalOnDrum, frictionOnDrum)), O)
  const drumMomentO = ropeMoment + moment2D(origin, frictionOnDrum, radial)
  const drumMomentC =
    moment2D(radial, O, origin) + moment2D(radial, weight, origin) + moment2D(radial, ropeForce, ropePoint)

  return {
    config,
    S: config.ropeTension,
    ropeMoment,
    T,
    N,
    P,
    O,
    A,
    B,
    drum: { force: drumForce, momentO: drumMomentO, momentC: drumMomentC },
    body: { force: bodyForce, momentA: bodyMomentA, momentOther: bodyMomentOther },
    frictionLimit,
    frictionAngle: criticalFrictionAngleDeg(config.mu),
    pPositive: P > 0,
  }
}

export const lever = (
  u: Vec2,
  contactToA: number,
  contactToB: number,
  pAtB: boolean,
  pDistance: number,
  pDirection: Vec2,
  pLabel: string,
): HamulecConfig['lever'] => ({ u, contactToA, contactToB, pAtB, pDistance, pDirection, pLabel })

export const rod = (u: Vec2, guideA: number, guideB: number, pEnd: number): HamulecConfig['rod'] => ({
  u,
  guideA,
  guideB,
  pEnd,
})

export const sin = (deg: number) => Math.sin((deg * Math.PI) / 180)
export const cos = (deg: number) => Math.cos((deg * Math.PI) / 180)

const reactionText = (v: Vec2) => `(${pl(v.x)}; ${pl(v.y)}) kN`
const reactionTex = (v: Vec2) => `(${tex(v.x)};\\ ${tex(v.y)})\\ \\mathrm{kN}`

export function createHamulecTask(config: HamulecConfig): SourceTaskDefinition {
  const solution = solveHamulec(config)
  const { S, T, N, P, O, A, B } = solution
  const id = `hamulec-schemat-${config.nr}`
  const hasGuideB = config.family === 'rod' && Boolean(B)
  const reactions = hasGuideB
    ? `O = ${reactionText(O)}; A = ${reactionText(A)}; B = ${reactionText(B as Vec2)}`
    : `O = ${reactionText(O)}; A = ${reactionText(A)}`
  const result = `P = ${pl(P)} kN; ${reactions}`
  const alphaText = config.alphaDeg === null ? 'dźwignia pozioma' : `α = ${config.alphaDeg}°`
  const loadText =
    config.Q === null
      ? `G = ${pl(config.G, 1)} kN; Q nie występuje (obciążenie krążka G)`
      : `G = ${pl(config.G, 1)} kN; Q = ${pl(config.Q, 1)} kN`
  const given = [
    loadText,
    `a = ${pl(config.a)} m; b = ${pl(config.b)} m; c = e = ${pl(config.e)} m`,
    `${alphaText}; μ = ${pl(config.mu)}`,
    `Reakcje do wyznaczenia: ${config.reactionPoints}; R jest dowolną skalą (w momentach się skraca)`,
  ]
  const pText = config.lever?.pLabel ?? 'wzdłuż osi pręta'
  const frictionSign = 'przeciwnie do momentu od liny (zwrot wyznaczony z równania momentów)'
  const bodyKind = config.family === 'lever' ? 'dźwigni' : 'pręta'
  const sceneFormula = `\\sum M_O=0:\\quad M_Q=${tex(solution.ropeMoment)}\\ ${MomentSign(solution)}\\ ${tex(T)} \\cdot ${tex(config.outerK)} = 0\\ \\Rightarrow\\ T=${tex(T)}\\ \\mathrm{kN}`
  const leverFormula =
    config.family === 'lever'
      ? `\\sum M_A=0\\ \\Rightarrow\\ P=${tex(P)}\\ \\mathrm{kN};\\qquad \\sum F_x=0,\\ \\sum F_y=0\\ \\Rightarrow\\ A=${reactionTex(A)}`
      : `\\sum F_{\\parallel}=0\\ \\Rightarrow\\ P=N=${tex(P)}\\ \\mathrm{kN};\\qquad \\sum F_{\\perp}=0,\\ \\sum M_A=0\\ \\Rightarrow\\ A=${reactionTex(A)},\\ B=${reactionTex(B ?? point(0, 0))}`

  const visuals: string[][] = [
    [
      loadText,
      `a = ${pl(config.a)} m, b = ${pl(config.b)} m, c = e = ${pl(config.e)} m`,
      `${alphaText}, μ = ${pl(config.mu)}`,
      `Reakcje: ${config.reactionPoints}`,
    ],
    [
      `Kontakt: kierunek (${pl(config.contact.x)}; ${pl(config.contact.y)})`,
      `Lina: S = ${pl(S)} kN, ${config.ropeText.split('.')[0]}`,
      `Promień tarcia: ${pl(config.outerK)}R; promień liny: ${pl(config.ropeK)}R`,
      `Kąt tarcia φ = arctg μ = ${pl(solution.frictionAngle, 1)}°`,
    ],
    [
      'ΣFx = 0, ΣFy = 0, ΣMO = 0',
      'T = μN w stanie granicznym',
      config.family === 'lever' ? 'ΣMA = 0 dla dźwigni' : 'ΣF∥ = 0 i ΣF⊥ = 0 dla pręta',
      `M_Q = ${pl(solution.ropeMoment)} kN·m`,
    ],
    [
      `T = μN = ${pl(T)} kN`,
      `N = ${pl(N)} kN`,
      `P = ${pl(P)} kN`,
      `O = ${reactionText(O)}`,
      `A = ${reactionText(A)}`,
      ...(hasGuideB ? [`B = ${reactionText(B as Vec2)}`] : []),
    ],
    [
      `Kierunek tarcia: ${frictionSign}`,
      `N > 0: ${N > 0 ? 'tak' : 'nie'}`,
      `T ≤ μN: ${pl(solution.frictionLimit)} kN`,
      `P > 0: ${solution.pPositive ? 'tak' : 'nie — zwrot przeciwny do rysunku'}`,
    ],
    [
      `Reszta ΣFx = ${solution.drum.force.x.toExponential(1)} kN`,
      `Reszta ΣFy = ${solution.drum.force.y.toExponential(1)} kN`,
      `Reszta ΣMO = ${solution.drum.momentO.toExponential(1)} kN·m`,
      `Reszta ΣMC = ${solution.drum.momentC.toExponential(1)} kN·m`,
      `Reszta momentu ${bodyKind} = ${solution.body.momentOther.toExponential(1)} kN·m`,
    ],
  ]

  return makeBatchTask({
    id,
    title: config.title,
    duration: 9,
    given,
    result,
    visuals,
    model: {
      narration: `${config.modelText} Przyjmujemy x w prawo, y w górę i dodatni moment przeciwny do wskazówek zegara. R jest dowolną skalą: w równaniu momentów bębna promienie występują w stałym stosunku, więc się skracają.`,
      formula: `G=${tex(config.G, 1)}\\ \\mathrm{kN}${config.Q === null ? '' : `,\\quad Q=${tex(config.Q, 1)}\\ \\mathrm{kN}`},\\quad a=${tex(config.a)},\\ b=${tex(config.b)},\\ e=${tex(config.e)}\\ \\mathrm{m},\\quad \\mu=${tex(config.mu)}`,
      caption: config.givenGeometry,
    },
    loads: {
      narration: `${config.contactText} ${config.ropeText} Siłę P przykładamy ${pText}.`,
      formula: `\\vec r_C=${tex(config.outerK)}\\,(${tex(config.contact.x)};\\ ${tex(config.contact.y)}),\\qquad S=${tex(S)}\\ \\mathrm{kN},\\qquad \\vec r_Q=${tex(config.ropeK)}\\,(${tex(config.ropeTangent.x)};\\ ${tex(config.ropeTangent.y)})`,
      caption: `Moment liny względem O: M_Q = ${tex(solution.ropeMoment)} kN·m; dodatni jest przeciwny do wskazówek zegara.`,
    },
    equations: {
      narration: `Stan graniczny oznacza T = μN. Równanie momentów względem O wyznacza tarcie, a warunek graniczny — nacisk. ${config.family === 'lever' ? 'Dla dźwigni piszemy jeszcze ΣFx = 0, ΣFy = 0 i ΣMA = 0; reakcja A nie daje momentu względem A.' : 'Dla pręta prowadzonego w dwóch gładkich prowadnicach piszemy ΣF wzdłuż i prostopadle do pręta oraz ΣM względem prowadnicy A; reakcje prowadnic są prostopadłe do pręta.'}`,
      formula: `${sceneFormula};\\qquad T-\\mu N=0\\ \\Rightarrow\\ N=${tex(N)}\\ \\mathrm{kN}`,
      caption: `Ramię tarcia wynosi ${tex(config.outerK)}R, a ramię liny ${tex(config.ropeK)}R. ${config.family === 'lever' ? `Mimośrodowość klocka e = ${tex(config.e)} m daje dodatkowy moment tarcia na dźwigni.` : 'Pręt jest osiowy, więc P równoważy nacisk N.'}`,
    },
    solution: {
      narration: `Po wyznaczeniu T i N rozwiązujemy równowagę ${bodyKind}. ${config.family === 'lever' ? 'Równanie momentów względem A zawiera siłę P, nacisk N i tarcie T; z niego otrzymujemy P, a z rzutów sił reakcję A.' : 'Siła P jest osiowa i równoważy nacisk N. Reakcje prowadnic wynikają z momentu tarcia względem wybranej prowadnicy; otrzymujemy je z układu trzech równań.'} Reakcja O wynika z równowagi sił działających na bęben.`,
      formula: `${leverFormula}${config.family === 'lever' ? '' : `;\\qquad O=${reactionTex(O)}`}`,
      caption: result,
    },
    interpretation: {
      narration: `Tarcie na bębnie jest skierowane tak, aby przeciwdziałać momentowi od liny; na dźwignię lub pręt działa zwrot przeciwny. ${solution.pPositive ? 'Otrzymana siła P ma zwrot zgodny z rysunkiem, więc jest siłą czynną potrzebną do utrzymania równowagi granicznej.' : 'Otrzymana P ma znak ujemny, co oznacza zwrot przeciwny do strzałki na rysunku; taki wynik również jest fizycznie poprawny i został zachowany bez zmiany znaku.'} Nacisk N jest dodatni, a T osiąga dokładnie μN.`,
      formula: `T=${tex(T)}\\ \\mathrm{kN},\\quad N=${tex(N)}\\ \\mathrm{kN},\\quad T_{\\max}=\\mu N=${tex(solution.frictionLimit)}\\ \\mathrm{kN},\\qquad P=${tex(P)}\\ \\mathrm{kN}`,
      caption: `Kąt tarcia φ = arctg μ = ${pl(solution.frictionAngle, 1)}°; reakcje O = ${reactionText(O)}, A = ${reactionText(A)}${hasGuideB ? `, B = ${reactionText(B as Vec2)}` : ''}.`,
    },
    check: {
      narration: `Wyniki podstawiamy do sum sił i momentów względem punktu, którego nie użyto jako głównego bieguna: dla bębna względem punktu styku C, a dla ${bodyKind} względem punktu styku. Reszty są na poziomie błędów zmiennoprzecinkowych. Sprawdzamy też warunek graniczny T = μN i znak P.`,
      formula: `\\sum F_x=${solution.drum.force.x.toExponential(1)},\\quad \\sum F_y=${solution.drum.force.y.toExponential(1)},\\quad \\sum M_C=${solution.drum.momentC.toExponential(1)}\\ \\mathrm{kN\\cdot m},\\quad \\sum M_{\\text{ciało}}=${solution.body.momentOther.toExponential(1)}\\ \\mathrm{kN\\cdot m}`,
      caption: `N = ${pl(N)} kN > 0; T = ${pl(T)} kN ≤ μN = ${pl(solution.frictionLimit)} kN; P = ${pl(P)} kN.`,
    },
  })
}

function MomentSign(solution: HamulecSolution): string {
  return solution.ropeMoment > 0 ? '-' : '+'
}

export function createHamulecSolution(task: SourceTaskDefinition): Omit<SolutionData, 'animation'> {
  return defineSourceSolution(task)
}

export const canonicalConfig: HamulecConfig = {
  nr: 1,
  family: 'lever',
  G: 1,
  Q: 10,
  a: 0.2,
  b: 0.1,
  e: 0.04,
  alphaDeg: 30,
  mu: 0.1,
  outerK: 2,
  ropeK: 1,
  ropeTension: 10,
  ropeDirection: {
    x: 0,
    y: -1,
  },
  ropeTangent: {
    x: -1,
    y: 0,
  },
  contact: {
    x: 0.49999999999999994,
    y: -0.8660254037844387,
  },
  drumWeight: 1,
  title: 'Bęben 2R z liną Q i dźwignią styczną: siła P pionowo w B',
  modelText:
    'Bęben o promieniu zewnętrznym 2R jest osadzony na nieruchomym czopie O. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R i odchodzi stycznie po lewej stronie. Klocek hamulcowy na dźwigni AB dociska zewnętrzną powierzchnię bębna; dźwignia jest styczna do bębna, a jej koniec B obciąża pionowa siła P skierowana w górę.',
  givenGeometry:
    'O — nieruchomy czop; promień zewnętrzny 2R, wewnętrzny R; lina Q styczna do promienia R po lewej; dźwignia A–B styczna do bębna, A = podpora, odcinek A–klocek = a, klocek–B = b; mimośrodowość klocka c = e',
  contactText:
    'Punkt styku leży na zewnętrznym okręgu 2R po prawej-dolnej stronie; promień do styku tworzy z pionem kąt α. Normalna przechodzi przez O, a tarcie działa stycznie do bębna.',
  ropeText:
    'Lina Q odchodzi stycznie od wewnętrznego okręgu R po lewej stronie i działa w dół. Jej moment względem O jest przeciwny do wskazówek zegara.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: 0.8660254037844387,
      y: 0.49999999999999994,
    },
    contactToA: 0.2,
    contactToB: 0.1,
    pAtB: true,
    pDistance: 0,
    pDirection: {
      x: 0,
      y: 1,
    },
    pLabel: 'B (pionowo w górę)',
  },
}

export const canonicalTask: SourceTaskDefinition = {
  ...createHamulecTask(canonicalConfig),
  id: 'factory-statyka-hamulec',
}
