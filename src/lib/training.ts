import { compositeCentroidY, safetyFactor } from './advanced'
import {
  beltTensionEuler,
  inclineFrictionState,
  momentOfForceAboutPoint,
  polygonCentroid,
  pappusVolume,
  simplySupportedPointLoad,
  trussApexForces,
  vector3FromAngles,
  magnitude3,
} from './statics'
import {
  bendingStressMPa,
  constrainedThermalStressMPa,
  elongationMM,
  rectangleInertiaMM4,
  stressMPa,
  torsionShearMPa,
} from './engineering'

export type CourseId = 'wytrzymalosc' | 'statyka'

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
  | 'staticsResultant'
  | 'staticsMoment'
  | 'staticsConcurrent'
  | 'staticsReaction'
  | 'staticsParallel'
  | 'staticsSpatial'
  | 'staticsTruss'
  | 'staticsFriction'
  | 'staticsBelt'
  | 'staticsInternal'
  | 'staticsCentroid'
  | 'staticsPappus'

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

export interface TaskTopicInfo {
  id: TaskTopic
  label: string
  description: string
  course: CourseId
}

export const taskTopics: TaskTopicInfo[] = [
  { id: 'stress', label: 'Naprężenie normalne', description: 'σ = N/A z kontrolą kN, mm i MPa', course: 'wytrzymalosc' },
  { id: 'elongation', label: 'Wydłużenie pręta', description: 'ΔL = NL/(EA), stal i aluminium', course: 'wytrzymalosc' },
  { id: 'thermal', label: 'Naprężenie termiczne', description: 'pręt zablokowany, σ = −EαΔT', course: 'wytrzymalosc' },
  { id: 'torsion', label: 'Skręcanie wału', description: 'τmax = 16T/(πd³)', course: 'wytrzymalosc' },
  { id: 'bendingStress', label: 'Naprężenie zginające', description: 'σ = M/W', course: 'wytrzymalosc' },
  { id: 'safetyFactor', label: 'Współczynnik bezpieczeństwa', description: 'n = Re/σ', course: 'wytrzymalosc' },
  { id: 'reaction', label: 'Reakcje belki', description: 'belka swobodnie podparta, siła poza środkiem', course: 'wytrzymalosc' },
  { id: 'centroid', label: 'Środek ciężkości', description: 'dwa prostokąty o różnych wysokościach', course: 'wytrzymalosc' },
  { id: 'steiner', label: 'Twierdzenie Steinera', description: 'I = bh³/12 + Ad²', course: 'wytrzymalosc' },
  { id: 'staticsResultant', label: 'Wypadkowa sił', description: 'składanie prostopadłych sił, kierunek i moduł', course: 'statyka' },
  { id: 'staticsMoment', label: 'Moment siły', description: 'M = F·d·sin α względem punktu', course: 'statyka' },
  { id: 'staticsConcurrent', label: 'Równowaga zbieżna', description: 'siła równoważąca wypadkową', course: 'statyka' },
  { id: 'staticsReaction', label: 'Reakcje belki', description: 'belka swobodnie podparta, siła poza środkiem', course: 'statyka' },
  { id: 'staticsParallel', label: 'Siły równoległe', description: 'wypadkowa i reakcje w belce', course: 'statyka' },
  { id: 'staticsSpatial', label: 'Siła w przestrzeni', description: 'składowe z kątów azymutu i elewacji', course: 'statyka' },
  { id: 'staticsTruss', label: 'Kratownica', description: 'siła w pasie skośnym trójkątnej kratownicy', course: 'statyka' },
  { id: 'staticsFriction', label: 'Tarcie statyczne', description: 'T_max = μN na równi pochyłej', course: 'statyka' },
  { id: 'staticsBelt', label: 'Tarcie cięgna', description: 'wzór Eulera T₂ = T₁·e^(μθ)', course: 'statyka' },
  { id: 'staticsInternal', label: 'Siły wewnętrzne', description: 'moment zginający w przekroju belki', course: 'statyka' },
  { id: 'staticsCentroid', label: 'Środek ciężkości', description: 'prostokąt z polem ujemnym', course: 'statyka' },
  { id: 'staticsPappus', label: 'Pappus–Guldin', description: 'objętość bryły obrotowej', course: 'statyka' },
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
        id,
        topic,
        'Naprężenie normalne',
        `Pręt o polu przekroju ${areaMM2} mm² przenosi siłę osiową ${forceKN} kN. Oblicz naprężenie normalne.`,
        'MPa',
        answer,
        '\\sigma=\\frac{N}{A}',
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
        id,
        topic,
        'Wydłużenie pręta',
        `Pręt o długości ${lengthMM} mm i polu ${areaMM2} mm² jest rozciągany siłą ${forceKN} kN. Moduł Younga wynosi ${youngGPa} GPa. Oblicz wydłużenie.`,
        'mm',
        answer,
        '\\Delta L=\\frac{NL}{EA}',
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
        id,
        topic,
        'Naprężenie termiczne',
        `Pręt o α = ${(alpha * 1e6).toFixed(0)}·10⁻⁶ 1/K i E = ${youngGPa} GPa jest utwierdzony z obu stron. Oblicz wartość bezwzględną naprężenia po ogrzaniu o ${deltaT} K.`,
        'MPa',
        answer,
        '\\sigma_T=-E\\alpha\\Delta T',
        'Pręt nie może się wydłużyć, więc naprężenie jest ściskające. Licz wartość bezwzględną E·α·ΔT.',
        `|σ| = ${youngGPa * 1000}·${alpha}·${deltaT} = ${answer.toFixed(2)} MPa (ściskanie)`,
      )
    }
    case 'torsion': {
      const torqueNM = pick(rand, 100, 2000, 50)
      const diameterMM = pick(rand, 20, 100, 2)
      const answer = torsionShearMPa(torqueNM, diameterMM)
      return task(
        id,
        topic,
        'Skręcanie wału',
        `Pełny wał o średnicy ${diameterMM} mm przenosi moment skręcający ${torqueNM} N·m. Oblicz maksymalne naprężenie styczne.`,
        'MPa',
        answer,
        '\\tau_{max}=\\frac{16T}{\\pi d^3}',
        'Zamień moment na N·mm: 1 N·m = 1000 N·mm. Średnica jest w trzeciej potędze.',
        `τmax = 16·${torqueNM * 1000} / (π·${diameterMM}³) = ${answer.toFixed(2)} MPa`,
      )
    }
    case 'bendingStress': {
      const momentKNM = pick(rand, 5, 60, 1)
      const modulusCM3 = pick(rand, 50, 600, 10)
      const answer = bendingStressMPa(momentKNM, modulusCM3 * 1000)
      return task(
        id,
        topic,
        'Naprężenie zginające',
        `Przekrój o wskaźniku wytrzymałości W = ${modulusCM3} cm³ jest zginany momentem M = ${momentKNM} kN·m. Oblicz maksymalne naprężenie normalne.`,
        'MPa',
        answer,
        '\\sigma_{max}=\\frac{M}{W}',
        'Zamień M na N·mm i W na mm³. 1 kN·m = 10⁶ N·mm, 1 cm³ = 10³ mm³.',
        `σmax = ${momentKNM * 1e6} / ${modulusCM3 * 1000} = ${answer.toFixed(2)} MPa`,
      )
    }
    case 'safetyFactor': {
      const limitMPa = pick(rand, 150, 500, 10)
      const actualMPa = pick(rand, 40, 200, 5)
      const answer = safetyFactor(limitMPa, actualMPa)
      return task(
        id,
        topic,
        'Współczynnik bezpieczeństwa',
        `Materiał ma granicę wytrzymałości ${limitMPa} MPa, a w elemencie panuje naprężenie ${actualMPa} MPa. Oblicz współczynnik bezpieczeństwa n.`,
        '—',
        answer,
        'n=\\frac{R_e}{\\sigma}',
        'Współczynnik bezpieczeństwa to stosunek nośności do rzeczywistego wytężenia.',
        `n = ${limitMPa} / ${actualMPa} = ${answer.toFixed(2)}`,
      )
    }
    case 'reaction': {
      const forceKN = pick(rand, 4, 40, 1)
      const lengthM = pick(rand, 2, 8, 0.5)
      const positionM = pick(rand, 0.5, lengthM - 0.5, 0.5)
      const answer = (forceKN * (lengthM - positionM)) / lengthM
      return task(
        id,
        topic,
        'Reakcje belki',
        `Belka swobodnie podparta ma rozpiętość ${lengthM} m. Siła ${forceKN} kN działa w odległości ${positionM} m od lewej podpory. Oblicz reakcję lewej podpory.`,
        'kN',
        answer,
        'R_A=\\frac{P(L-a)}{L}',
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
        id,
        topic,
        'Środek ciężkości',
        `Przekrój składa się z prostokąta ${b1}×${h1} mm (dolny, y = ${y1} mm) oraz prostokąta ${b2}×${h2} mm ustawionego na nim (y = ${y2} mm). Oblicz współrzędną y środka ciężkości.`,
        'mm',
        answer,
        'y_c=\\frac{\\sum A_i y_i}{\\sum A_i}',
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
        id,
        topic,
        'Twierdzenie Steinera',
        `Prostokąt ${widthMM}×${heightMM} mm ma środek ciężkości odległy o ${distanceMM} mm od osi odniesienia. Oblicz moment bezwładności względem tej osi w cm⁴.`,
        'cm⁴',
        answer,
        'I=I_0+Ad^2',
        'I₀ = bh³/12. Dodaj pole A = b·h pomnożone przez kwadrat odległości d². Na końcu zamień mm⁴ na cm⁴ (÷10⁴).',
        `I₀ = ${widthMM}·${heightMM}³/12 = ${rectangleInertiaMM4(widthMM, heightMM).toFixed(0)} mm⁴; I = I₀ + ${widthMM * heightMM}·${distanceMM}² = ${(answer * 1e4).toFixed(0)} mm⁴ = ${answer.toFixed(2)} cm⁴`,
      )
    }
    case 'staticsResultant': {
      const fx = pick(rand, 3, 12, 1)
      const fy = pick(rand, 4, 16, 1)
      const answer = Math.hypot(fx, fy)
      return task(
        id,
        topic,
        'Wypadkowa sił prostopadłych',
        `Dwie prostopadłe siły mają składowe ${fx} kN (pozioma) i ${fy} kN (pionowa). Oblicz moduł wypadkowej.`,
        'kN',
        answer,
        'R=\\sqrt{F_x^2+F_y^2}',
        'Składowe są prostopadłe, więc wypadkowa jest przekątną prostokąta. Użyj twierdzenia Pitagorasa.',
        `R = √(${fx}² + ${fy}²) = ${answer.toFixed(2)} kN`,
      )
    }
    case 'staticsMoment': {
      const forceKN = pick(rand, 2, 20, 1)
      const distanceM = pick(rand, 1, 5, 0.5)
      const angleDeg = pick(rand, 20, 160, 10)
      const answer = momentOfForceAboutPoint(forceKN, distanceM, angleDeg) / 1000
      return task(
        id,
        topic,
        'Moment siły względem punktu',
        `Siła ${forceKN} kN działa w odległości ${distanceM} m od punktu O, a kąt między ramieniem i siłą wynosi ${angleDeg}°. Oblicz moment względem O.`,
        'kN·m',
        answer,
        'M=F\\,d\\,\\sin\\alpha',
        'Moment to siła razy ramię prostopadłe. Ramię prostopadłe wynosi d·sin α.',
        `M = ${forceKN}·${distanceM}·sin ${angleDeg}° = ${answer.toFixed(2)} kN·m`,
      )
    }
    case 'staticsConcurrent': {
      const f1 = pick(rand, 4, 20, 1)
      const f2 = pick(rand, 4, 20, 1)
      const answer = Math.hypot(f1, f2)
      return task(
        id,
        topic,
        'Siła równoważąca',
        `Na punkt działają dwie prostopadłe siły ${f1} kN i ${f2} kN. Oblicz moduł siły równoważącej ten układ.`,
        'kN',
        answer,
        'R=\\sqrt{F_1^2+F_2^2}',
        'Siła równoważąca ma moduł wypadkowej i przeciwny zwrot. Moduł liczysz jak przekątną prostokąta.',
        `R = √(${f1}² + ${f2}²) = ${answer.toFixed(2)} kN`,
      )
    }
    case 'staticsReaction': {
      const forceKN = pick(rand, 4, 40, 1)
      const lengthM = pick(rand, 2, 8, 0.5)
      const positionM = pick(rand, 0.5, lengthM - 0.5, 0.5)
      const answer = simplySupportedPointLoad(forceKN, lengthM, positionM).ra
      return task(
        id,
        topic,
        'Reakcja lewej podpory',
        `Belka swobodnie podparta ma rozpiętość ${lengthM} m. Siła ${forceKN} kN działa ${positionM} m od lewej podpory. Oblicz reakcję lewej podpory.`,
        'kN',
        answer,
        'R_A=\\frac{P(L-a)}{L}',
        'Weź moment względem prawej podpory. Reakcja lewej podpory jest większa, gdy siła stoi blisko prawej podpory.',
        `R_A = ${forceKN}·(${lengthM} − ${positionM}) / ${lengthM} = ${answer.toFixed(2)} kN`,
      )
    }
    case 'staticsParallel': {
      const f1 = pick(rand, 4, 20, 1)
      const f2 = pick(rand, 4, 20, 1)
      const x1 = pick(rand, 0, 2, 0.5)
      const x2 = pick(rand, 3, 6, 0.5)
      const resultant = f1 + f2
      const answer = (f1 * x1 + f2 * x2) / resultant
      return task(
        id,
        topic,
        'Wypadkowa sił równoległych',
        `Dwie siły równoległe o zgodnych zwrotach: ${f1} kN w punkcie x = ${x1} m oraz ${f2} kN w punkcie x = ${x2} m. Oblicz położenie ich wypadkowej.`,
        'm',
        answer,
        'x_R=\\frac{F_1x_1+F_2x_2}{F_1+F_2}',
        'Wypadkowa ma moduł sumy sił, a jej położenie to średnia ważona położeń — wagami są wartości sił.',
        `x_R = (${f1}·${x1} + ${f2}·${x2}) / (${f1} + ${f2}) = ${answer.toFixed(2)} m`,
      )
    }
    case 'staticsSpatial': {
      const forceKN = pick(rand, 5, 30, 1)
      const elevationDeg = pick(rand, 10, 70, 5)
      const answer = vector3FromAngles(forceKN, 0, elevationDeg).z
      return task(
        id,
        topic,
        'Składowa pionowa siły w przestrzeni',
        `Siła ${forceKN} kN działa pod kątem elewacji ${elevationDeg}° do poziomu. Oblicz jej składową pionową Fz.`,
        'kN',
        answer,
        'F_z=F\\,\\sin\\beta',
        'Elewacja to kąt między wektorem a płaszczyzną poziomą. Składowa pionowa to moduł razy sinus elewacji.',
        `Fz = ${forceKN}·sin ${elevationDeg}° = ${answer.toFixed(2)} kN`,
      )
    }
    case 'staticsTruss': {
      const loadKN = pick(rand, 4, 30, 1)
      const spanM = pick(rand, 2, 8, 0.5)
      const heightM = pick(rand, 1, 5, 0.5)
      const answer = Math.abs(trussApexForces(loadKN, spanM, heightM).diagonal)
      return task(
        id,
        topic,
        'Siła w pasie kratownicy',
        `Trójkątna kratownica ma rozpiętość ${spanM} m i wysokość ${heightM} m. W wierzchołku działa pionowa siła ${loadKN} kN. Oblicz wartość siły w jednym pasie skośnym.`,
        'kN',
        answer,
        'N=\\frac{P}{2\\sin\\alpha}',
        'Reakcje wynoszą P/2. W wierzchołku pionowe składowe obu pasów równoważą obciążenie, więc 2N·sin α = P.',
        `N = ${loadKN} / (2·sin α) = ${answer.toFixed(2)} kN`,
      )
    }
    case 'staticsFriction': {
      const weightN = pick(rand, 100, 600, 10)
      const angleDeg = pick(rand, 10, 50, 5)
      const coefficient = pick(rand, 0.1, 0.7, 0.05)
      const answer = inclineFrictionState(weightN, angleDeg, coefficient).frictionMax
      return task(
        id,
        topic,
        'Maksymalne tarcie statyczne',
        `Ciężar ${weightN} N leży na równi o kącie ${angleDeg}°, a współczynnik tarcia wynosi μ = ${coefficient}. Oblicz maksymalną siłę tarcia statycznego.`,
        'N',
        answer,
        'T_{max}=\\mu N=\\mu G\\cos\\alpha',
        'Najpierw policz nacisk N = G·cos α, dopiero potem pomnóż przez μ. Nie używaj G zamiast N.',
        `N = ${weightN}·cos ${angleDeg}° = ${(weightN * Math.cos((angleDeg * Math.PI) / 180)).toFixed(1)} N; T_max = ${coefficient}·N = ${answer.toFixed(1)} N`,
      )
    }
    case 'staticsBelt': {
      const tightN = pick(rand, 100, 800, 10)
      const coefficient = pick(rand, 0.1, 0.6, 0.05)
      const wrapDeg = pick(rand, 90, 360, 15)
      const answer = beltTensionEuler(tightN, coefficient, (wrapDeg * Math.PI) / 180)
      return task(
        id,
        topic,
        'Tarcie cięgna o bęben',
        `Cięgno jest napinane siłą T₁ = ${tightN} N, opasuje bęben kątem ${wrapDeg}°, a μ = ${coefficient}. Oblicz siłę w gałęzi luźnej T₂.`,
        'N',
        answer,
        'T_2=T_1e^{\\mu\\theta}',
        'Kąt opasania zamień na radiany: θ = α·π/180. Potem użyj wykładniczego wzoru Eulera.',
        `θ = ${(((wrapDeg * Math.PI) / 180)).toFixed(3)} rad; T₂ = ${tightN}·e^(${coefficient}·θ) = ${answer.toFixed(1)} N`,
      )
    }
    case 'staticsInternal': {
      const forceKN = pick(rand, 4, 30, 1)
      const lengthM = pick(rand, 3, 9, 0.5)
      const positionM = pick(rand, 1, lengthM - 1, 0.5)
      const sectionM = pick(rand, 0.2, positionM - 0.2, 0.2)
      const reactions = simplySupportedPointLoad(forceKN, lengthM, positionM)
      const answer = reactions.ra * sectionM
      return task(
        id,
        topic,
        'Moment zginający w przekroju',
        `Belka o rozpiętości ${lengthM} m jest obciążona siłą ${forceKN} kN w odległości ${positionM} m od lewej podpory. Oblicz moment zginający w przekroju x = ${sectionM} m (przed siłą).`,
        'kN·m',
        answer,
        'M(x)=R_A\\,x',
        'Przed siłą na lewo od przekroju działa tylko reakcja RA. Moment to RA·x; nie odejmuj jeszcze siły P.',
        `RA = ${reactions.ra.toFixed(2)} kN; M = ${reactions.ra.toFixed(2)}·${sectionM} = ${answer.toFixed(2)} kN·m`,
      )
    }
    case 'staticsCentroid': {
      const widthMM = pick(rand, 80, 240, 10)
      const heightMM = pick(rand, 60, 180, 10)
      const radiusMM = pick(rand, 10, Math.min(40, heightMM / 3), 5)
      const centroid = polygonCentroid([
        { area: widthMM * heightMM, x: widthMM / 2, y: heightMM / 2 },
        { area: Math.PI * radiusMM ** 2, x: widthMM / 2, y: heightMM / 2, negative: true },
      ])
      const answer = centroid.y
      return task(
        id,
        topic,
        'Środek ciężkości z otworem',
        `Prostokąt ${widthMM}×${heightMM} mm ma współśrodkowy otwór kołowy o promieniu ${radiusMM} mm. Oblicz współrzędną y środka ciężkości.`,
        'mm',
        answer,
        'y_C=\\frac{\\sum A_iy_i}{\\sum A_i}',
        'Otwór ma pole ujemne, ale leży w tym samym środku co prostokąt. Zastanów się, czy wynik musi się zmienić.',
        `Oba środki leżą na y = ${heightMM / 2} mm, więc y_C = ${answer.toFixed(2)} mm.`,
      )
    }
    case 'staticsPappus': {
      const majorMM = pick(rand, 30, 90, 5)
      const minorMM = pick(rand, 8, 25, 1)
      const answer = pappusVolume(Math.PI * minorMM ** 2, majorMM)
      return task(
        id,
        topic,
        'Objętość bryły obrotowej',
        `Krążek o promieniu ${minorMM} mm wiruje wokół osi odległej o ${majorMM} mm od jego środka. Oblicz objętość powstałej bryły.`,
        'mm³',
        answer,
        'V=2\\pi R\\,A',
        'Pole krążka A = πr². Droga środka ciężkości to obwód 2πR. Objętość to iloczyn tych dwóch wartości.',
        `A = π·${minorMM}² = ${(Math.PI * minorMM ** 2).toFixed(0)} mm²; V = 2π·${majorMM}·A = ${answer.toFixed(0)} mm³`,
      )
    }
  }
}

export function generateTasks(count: number, rand: RandomSource = Math.random, course: CourseId = 'wytrzymalosc'): NumericTask[] {
  const topics = taskTopics.filter((topic) => topic.course === course)
  const shuffled = [...topics].sort(() => rand() - 0.5)
  return Array.from({ length: count }, (_, index) => {
    const topic = shuffled[index % shuffled.length]
    return createTask(topic.id, rand, `task-${index}-${Math.floor(rand() * 1e9)}`)
  })
}

export function isAnswerClose(task: NumericTask, value: number): boolean {
  if (!Number.isFinite(value)) return false
  return Math.abs(value - task.answer) <= task.tolerance
}
