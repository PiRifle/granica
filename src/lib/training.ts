import {
  compositeCentroidY,
  safetyFactor,
} from './advanced'
import {
  bendingStressMPa,
  constrainedThermalStressMPa,
  elongationMM,
  rectangleInertiaMM4,
  stressMPa,
  torsionShearMPa,
} from './engineering'

export type TaskTopic =
  | 'stress'
  | 'elongation'
  | 'thermal'
  | 'torsion'
  | 'bendingStress'
  | 'safetyFactor'
  | 'reaction'
  | 'centroid'
  | 'steiner'

export interface NumericTask {
  id: string
  topic: TaskTopic
  label: string
  prompt: string
  unit: string
  answer: number
  tolerance: number
  formula: string
  hint: string
  solution: string
}

export const taskTopics: Array<{ id: TaskTopic; label: string; description: string }> = [
  { id: 'stress', label: 'Naprężenie normalne', description: 'σ = N/A z kontrolą kN, mm i MPa' },
  { id: 'elongation', label: 'Wydłużenie pręta', description: 'ΔL = NL/(EA), stal i aluminium' },
  { id: 'thermal', label: 'Naprężenie termiczne', description: 'pręt zablokowany, σ = −EαΔT' },
  { id: 'torsion', label: 'Skręcanie wału', description: 'τmax = 16T/(πd³)' },
  { id: 'bendingStress', label: 'Naprężenie zginające', description: 'σ = M/W' },
  { id: 'safetyFactor', label: 'Współczynnik bezpieczeństwa', description: 'n = Re/σ' },
  { id: 'reaction', label: 'Reakcje belki', description: 'belka swobodnie podparta, siła poza środkiem' },
  { id: 'centroid', label: 'Środek ciężkości', description: 'dwa prostokąty o różnych wysokościach' },
  { id: 'steiner', label: 'Twierdzenie Steinera', description: 'I = bh³/12 + Ad²' },
]

export type RandomSource = () => number

export function seededRandom(seed: number): RandomSource {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

function pick(rand: RandomSource, min: number, max: number, step: number): number {
  const steps = Math.round((max - min) / step)
  return min + Math.round(rand() * steps) * step
}

function choose<T>(rand: RandomSource, values: readonly T[]): T {
  return values[Math.floor(rand() * values.length)] ?? values[0]
}

function task(
  id: string,
  topic: TaskTopic,
  label: string,
  prompt: string,
  unit: string,
  answer: number,
  formula: string,
  hint: string,
  solution: string,
): NumericTask {
  return {
    id,
    topic,
    label,
    prompt,
    unit,
    answer,
    tolerance: Math.max(0.05, Math.abs(answer) * 0.01),
    formula,
    hint,
    solution,
  }
}

export function createTask(topic: TaskTopic, rand: RandomSource = Math.random, id = String(rand())): NumericTask {
  switch (topic) {
    case 'stress': {
      const forceKN = pick(rand, 5, 60, 1)
      const areaMM2 = pick(rand, 100, 1200, 25)
      const answer = stressMPa(forceKN, areaMM2)
      return task(
        id, topic, 'Naprężenie normalne',
        `Pręt o polu przekroju ${areaMM2} mm² przenosi siłę osiową ${forceKN} kN. Oblicz naprężenie normalne.`,
        'MPa', answer, '\\sigma=\\frac{N}{A}',
        'Zamień kN na N: 1 kN = 1000 N. Dziel przez pole w mm², a wynik będzie w MPa.',
        `σ = ${forceKN * 1000} N / ${areaMM2} mm² = ${answer.toFixed(2)} MPa`,
      )
    }
    case 'elongation': {
      const forceKN = pick(rand, 5, 40, 1)
      const lengthMM = pick(rand, 1000, 5000, 250)
      const areaMM2 = pick(rand, 200, 1200, 25)
      const youngGPa = choose(rand, [70, 200])
      const answer = elongationMM(forceKN, lengthMM, areaMM2, youngGPa)
      return task(
        id, topic, 'Wydłużenie pręta',
        `Pręt o długości ${lengthMM} mm i polu ${areaMM2} mm² jest rozciągany siłą ${forceKN} kN. Moduł Younga wynosi ${youngGPa} GPa. Oblicz wydłużenie.`,
        'mm', answer, '\\Delta L=\\frac{NL}{EA}',
        'Najpierw σ = N/A, potem ε = σ/E, a na końcu ΔL = ε·L. Utrzymaj E w MPa (GPa × 1000).',
        `ΔL = (${forceKN * 1000}·${lengthMM}) / (${youngGPa * 1000}·${areaMM2}) = ${answer.toFixed(3)} mm`,
      )
    }
    case 'thermal': {
      const deltaT = pick(rand, 20, 100, 5)
      const alpha = choose(rand, [12e-6, 17e-6, 23e-6])
      const youngGPa = choose(rand, [70, 200])
      const answer = Math.abs(constrainedThermalStressMPa(alpha, deltaT, youngGPa))
      return task(
        id, topic, 'Naprężenie termiczne',
        `Pręt o α = ${(alpha * 1e6).toFixed(0)}·10⁻⁶ 1/K i E = ${youngGPa} GPa jest utwierdzony z obu stron. Oblicz wartość bezwzględną naprężenia po ogrzaniu o ${deltaT} K.`,
        'MPa', answer, '\\sigma_T=-E\\alpha\\Delta T',
        'Pręt nie może się wydłużyć, więc naprężenie jest ściskające. Licz wartość bezwzględną E·α·ΔT.',
        `|σ| = ${youngGPa * 1000}·${alpha}·${deltaT} = ${answer.toFixed(2)} MPa (ściskanie)`,
      )
    }
    case 'torsion': {
      const torqueNM = pick(rand, 100, 2000, 50)
      const diameterMM = pick(rand, 20, 100, 2)
      const answer = torsionShearMPa(torqueNM, diameterMM)
      return task(
        id, topic, 'Skręcanie wału',
        `Pełny wał o średnicy ${diameterMM} mm przenosi moment skręcający ${torqueNM} N·m. Oblicz maksymalne naprężenie styczne.`,
        'MPa', answer, '\\tau_{max}=\\frac{16T}{\\pi d^3}',
        'Zamień moment na N·mm: 1 N·m = 1000 N·mm. Średnica jest w trzeciej potędze.',
        `τmax = 16·${torqueNM * 1000} / (π·${diameterMM}³) = ${answer.toFixed(2)} MPa`,
      )
    }
    case 'bendingStress': {
      const momentKNM = pick(rand, 5, 60, 1)
      const modulusCM3 = pick(rand, 50, 600, 10)
      const answer = bendingStressMPa(momentKNM, modulusCM3 * 1000)
      return task(
        id, topic, 'Naprężenie zginające',
        `Przekrój o wskaźniku wytrzymałości W = ${modulusCM3} cm³ jest zginany momentem M = ${momentKNM} kN·m. Oblicz maksymalne naprężenie normalne.`,
        'MPa', answer, '\\sigma_{max}=\\frac{M}{W}',
        'Zamień M na N·mm i W na mm³. 1 kN·m = 10⁶ N·mm, 1 cm³ = 10³ mm³.',
        `σmax = ${momentKNM * 1e6} / ${modulusCM3 * 1000} = ${answer.toFixed(2)} MPa`,
      )
    }
    case 'safetyFactor': {
      const limitMPa = pick(rand, 150, 500, 10)
      const actualMPa = pick(rand, 40, 200, 5)
      const answer = safetyFactor(limitMPa, actualMPa)
      return task(
        id, topic, 'Współczynnik bezpieczeństwa',
        `Materiał ma granicę wytrzymałości ${limitMPa} MPa, a w elemencie panuje naprężenie ${actualMPa} MPa. Oblicz współczynnik bezpieczeństwa n.`,
        '—', answer, 'n=\\frac{R_e}{\\sigma}',
        'Współczynnik bezpieczeństwa to stosunek nośności do rzeczywistego wytężenia.',
        `n = ${limitMPa} / ${actualMPa} = ${answer.toFixed(2)}`,
      )
    }
    case 'reaction': {
      const forceKN = pick(rand, 4, 40, 1)
      const lengthM = pick(rand, 2, 8, 0.5)
      const positionM = pick(rand, 0.5, lengthM - 0.5, 0.5)
      const answer = forceKN * (lengthM - positionM) / lengthM
      return task(
        id, topic, 'Reakcje belki',
        `Belka swobodnie podparta ma rozpiętość ${lengthM} m. Siła ${forceKN} kN działa w odległości ${positionM} m od lewej podpory. Oblicz reakcję lewej podpory.`,
        'kN', answer, 'R_A=\\frac{P(L-a)}{L}',
        'Weź moment względem prawej podpory: R_A·L = P·(L − a).',
        `R_A = ${forceKN}·(${lengthM} − ${positionM}) / ${lengthM} = ${answer.toFixed(2)} kN`,
      )
    }
    case 'centroid': {
      const b1 = pick(rand, 40, 200, 10)
      const h1 = pick(rand, 20, 120, 10)
      const y1 = h1 / 2
      const b2 = pick(rand, 20, 120, 10)
      const h2 = pick(rand, 20, 160, 10)
      const y2 = h1 + h2 / 2
      const answer = compositeCentroidY([
        { areaMM2: b1 * h1, yMM: y1 },
        { areaMM2: b2 * h2, yMM: y2 },
      ])
      return task(
        id, topic, 'Środek ciężkości',
        `Przekrój składa się z prostokąta ${b1}×${h1} mm (dolny, y = ${y1} mm) oraz prostokąta ${b2}×${h2} mm ustawionego na nim (y = ${y2} mm). Oblicz współrzędną y środka ciężkości.`,
        'mm', answer, 'y_c=\\frac{\\sum A_i y_i}{\\sum A_i}',
        'Policz pola obu prostokątów, a potem średnią ważoną ich położeń.',
        `y_c = (${b1 * h1}·${y1} + ${b2 * h2}·${y2}) / (${b1 * h1} + ${b2 * h2}) = ${answer.toFixed(2)} mm`,
      )
    }
    case 'steiner': {
      const widthMM = pick(rand, 40, 200, 10)
      const heightMM = pick(rand, 40, 200, 10)
      const distanceMM = pick(rand, 20, 300, 10)
      const answer = (rectangleInertiaMM4(widthMM, heightMM) + widthMM * heightMM * distanceMM ** 2) / 1e4
      return task(
        id, topic, 'Twierdzenie Steinera',
        `Prostokąt ${widthMM}×${heightMM} mm ma środek ciężkości odległy o ${distanceMM} mm od osi odniesienia. Oblicz moment bezwładności względem tej osi w cm⁴.`,
        'cm⁴', answer, 'I=I_0+Ad^2',
        'I₀ = bh³/12. Dodaj pole A = b·h pomnożone przez kwadrat odległości d². Na końcu zamień mm⁴ na cm⁴ (÷10⁴).',
        `I₀ = ${widthMM}·${heightMM}³/12 = ${rectangleInertiaMM4(widthMM, heightMM).toFixed(0)} mm⁴; I = I₀ + ${widthMM * heightMM}·${distanceMM}² = ${(answer * 1e4).toFixed(0)} mm⁴ = ${answer.toFixed(2)} cm⁴`,
      )
    }
  }
}

export function generateTasks(count: number, rand: RandomSource = Math.random): NumericTask[] {
  const shuffled = [...taskTopics].sort(() => rand() - 0.5)
  return Array.from({ length: count }, (_, index) => {
    const topic = shuffled[index % shuffled.length]
    return createTask(topic.id, rand, `task-${index}-${Math.floor(rand() * 1e9)}`)
  })
}

export function isAnswerClose(task: NumericTask, value: number): boolean {
  if (!Number.isFinite(value)) return false
  return Math.abs(value - task.answer) <= task.tolerance
}
