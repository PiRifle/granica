import { polygonCentroid, type CentroidPart, type Vec2 } from '../../../lib/statics'
import { makeBatchTask, type BatchStep } from '../core/batch-task'
import { pl, tex, type SourceTaskDefinition } from '../core/source-task'

export interface CircularSegment {
  area: number
  centroid: Vec2
  radius: number
  center: number
}

export function circularSegment(halfChord: number, sagitta: number): CircularSegment {
  const radius = (halfChord * halfChord + sagitta * sagitta) / (2 * sagitta)
  const center = sagitta - radius
  const area = (radius * radius * Math.PI) / 2 + center * halfChord + radius * radius * Math.asin(center / radius)
  const moment = (2 / 3) * halfChord ** 3 + center * area
  return { area, centroid: { x: 0, y: moment / area }, radius, center }
}

export interface CentroidConfig {
  id: string
  figure: number
  variant: number
  a: number
  d?: number
  b?: number
  interpretation: string
  given: string[]
  parts: CentroidPart[]
  area: number
  centroid: Vec2
  moments: { qy: number; qx: number }
  bounds: { xmin: number; xmax: number; ymin: number; ymax: number }
  insideMaterial: boolean
  justification: string
  removedCentroid?: Vec2
  pappus?: { area: number; distance: number; radius: number }
  title: string
  result: string
  visuals: string[][]
  steps: {
    model: BatchStep
    loads: BatchStep
    equations: BatchStep
    solution: BatchStep
    interpretation: BatchStep
    check: BatchStep
  }
}

const configs: CentroidConfig[] = []

function momentsOf(parts: CentroidPart[]) {
  let area = 0
  let qy = 0
  let qx = 0
  for (const part of parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    area += signed
    qy += signed * part.x
    qx += signed * part.y
  }
  return { area, qy, qx }
}

function finish(config: Omit<CentroidConfig, 'area' | 'centroid' | 'moments'>): CentroidConfig {
  const { area, qy, qx } = momentsOf(config.parts)
  const centroid = polygonCentroid(config.parts)
  return {
    ...config,
    area,
    centroid,
    moments: { qy: area * centroid.x, qx: area * centroid.y },
  }
}

function residuals(config: CentroidConfig) {
  let x = 0
  let y = 0
  for (const part of config.parts) {
    const signed = part.negative ? -Math.abs(part.area) : part.area
    x += signed * (part.x - config.centroid.x)
    y += signed * (part.y - config.centroid.y)
  }
  return { x, y }
}

function resultLine(config: CentroidConfig) {
  const { area, moments, centroid } = config
  return `A = ${pl(area)} mm²; Q_y = ${pl(moments.qy)} mm³; Q_x = ${pl(moments.qx)} mm³; x_C = ${pl(centroid.x)} mm; y_C = ${pl(centroid.y)} mm`
}

function balanceVisuals(config: CentroidConfig) {
  const residual = residuals(config)
  return [
    `ΣA_i(x_i − x_C) = ${pl(residual.x)} mm³`,
    `ΣA_i(y_i − y_C) = ${pl(residual.y)} mm³`,
    `A·x_C = ${pl(config.moments.qy)} mm³ = Q_y`,
    `A·y_C = ${pl(config.moments.qx)} mm³ = Q_x`,
  ]
}

function interpretationVisuals(config: CentroidConfig) {
  const { centroid } = config
  const side = [
    centroid.x > 0
      ? 'x_C > 0 — przesunięcie w prawo'
      : centroid.x < 0
        ? 'x_C < 0 — przesunięcie w lewo'
        : 'x_C = 0 — symetria względem osi y',
    centroid.y > 0
      ? 'y_C > 0 — przesunięcie w górę'
      : centroid.y < 0
        ? 'y_C < 0 — przesunięcie w dół'
        : 'y_C = 0 — symetria względem osi x',
  ]
  return [...side, config.justification]
}

/* ------------------------------------------------------------------ */
/* Figura 1 — czasza kołowa nad lewą podstawą i prawą listwą           */
/* ------------------------------------------------------------------ */

const FIG1_ALT =
  'Figura złożona z części koła o strzałce 15 mm, lewej podstawy 2a × a i prawej pionowej listwy 2 × 2a, z prostokątnym wycięciem u dołu'

function buildFigure1(a: number, d: number, variant: number, id: string) {
  const sagitta = 15
  const segment = circularSegment(d / 2, sagitta)
  const leftArea = 2 * a * a
  const stripArea = 4 * a
  const notch = d - 2 * a - 2
  const parts: CentroidPart[] = [
    { area: segment.area, x: d / 2, y: a + segment.centroid.y },
    { area: leftArea, x: a, y: a / 2 },
    { area: stripArea, x: d - 1, y: 0 },
  ]
  const config = finish({
    id,
    figure: 1,
    variant,
    a,
    d,
    interpretation: `Cięciwa czaszy ma długość d = ${d} mm, a strzałka 15 mm. Lewa podstawa ma 2a × a = ${2 * a} × ${a} mm, prawa listwa 2 × 2a = 2 × ${2 * a} mm, a wycięcie (d − 2a − 2) × a = ${notch} × ${a} mm.`,
    given: [
      `a = ${a} mm, d = ${d} mm`,
      `Czasza: cięciwa d = ${d} mm, strzałka 15 mm (część koła)`,
      `Lewa podstawa: 2a × a = ${2 * a} × ${a} mm`,
      `Prawa listwa: 2 × 2a = 2 × ${2 * a} mm`,
      `Wycięcie: (d − 2a − 2) × a = ${notch} × ${a} mm`,
      'Początek układu O w lewym dolnym narożu podstawy; oś x wzdłuż jej dolnej krawędzi',
    ],
    parts,
    bounds: { xmin: 0, xmax: d, ymin: -a, ymax: a + sagitta },
    insideMaterial: true,
    justification: `Centroid leży w czaszy nad wycięciem: usunięcie materiału przy dnie podnosi wynik, a szersza lewa podstawa przesuwa go w lewo od osi symetrii czaszy.`,
    title: `Zestaw E, figura 1, wariant ${variant} — czasza kołowa z wycięciem`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      `a = ${a} mm, d = ${d} mm`,
      `strzałka czaszy: 15 mm`,
      `lewa podstawa: ${2 * a} × ${a} mm`,
      `prawa listwa: 2 × ${2 * a} mm`,
      `wycięcie: ${notch} × ${a} mm`,
      'O w lewym dolnym narożu',
    ],
    [
      `A_czaszy = ${pl(segment.area)} mm²`,
      `A_lewej = ${pl(leftArea)} mm²`,
      `A_listwy = ${pl(stripArea)} mm²`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `Q_y = A_c·${pl(d / 2)} + A_L·${pl(a)} + A_P·${pl(d - 1)}`,
      `Q_y = ${pl(config.moments.qy)} mm³`,
      `Q_x = A_c·${pl(a + segment.centroid.y)} + A_L·${pl(a / 2)}`,
      `Q_x = ${pl(config.moments.qx)} mm³`,
    ],
    [`x_C = Q_y / A = ${pl(config.centroid.x)} mm`, `y_C = Q_x / A = ${pl(config.centroid.y)} mm`],
    interpretationVisuals(config),
    balanceVisuals(config),
  ]
  config.steps = {
    model: {
      narration: `Górna część to odcinek koła o cięciwie d = ${d} mm i strzałce 15 mm. Dolna część to lewa podstawa 2a × a oraz prawa listwa 2 × 2a; między nimi jest prostokątne wycięcie ${notch} × ${a} mm. Oś x przechodzi przez dolną krawędź lewej podstawy, a oś y przez jej lewą krawędź.`,
      formula: `d=${tex(d)}\\ \\mathrm{mm},\\quad a=${tex(a)}\\ \\mathrm{mm},\\quad h_s=15\\ \\mathrm{mm},\\quad h_w=${tex(notch)}\\ \\mathrm{mm}`,
      caption:
        'Czasza ma cięciwę d, a nie średnicę 2d. Dla d < 30 mm odcinek jest większy od półkola, a dla d > 30 mm mniejszy; wzór na odcinek obejmuje oba przypadki.',
      emphasis: 'Czasza: cięciwa d, strzałka 15',
    },
    loads: {
      narration:
        'Dzielimy figurę na trzy części o dodatnich polach: odcinek kołowy, lewą podstawę i prawą listwę. Wycięcie nie jest osobnym polem ujemnym, bo lista części obejmuje tylko materiał; jego brak wynika z geometrii podstawy i listwy.',
      formula: `A_c=${tex(segment.area)},\\quad A_L=${tex(leftArea)},\\quad A_P=${tex(stripArea)}\\quad[\\mathrm{mm^2}]`,
      caption: `Promień okręgu czaszy wynosi R = ${pl(segment.radius)} mm.`,
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    equations: {
      narration:
        'Moment statyczny względem osi y to suma x_i·A_i, a względem osi x — suma y_i·A_i. Dla czaszy współrzędna x to d/2 z symetrii, a współrzędna y to a + y_odcinka.',
      formula: `Q_y=${tex(config.moments.qy)},\\qquad Q_x=${tex(config.moments.qx)}\\quad[\\mathrm{mm^3}]`,
      caption: 'Moment czaszy liczony jest od jej cięciwy, dlatego do y dodajemy a.',
      emphasis: `Q_y = ${pl(config.moments.qy)} mm³`,
    },
    solution: {
      narration: `Po zsumowaniu pól i momentów otrzymujemy A = ${pl(config.area)} mm², x_C = ${pl(config.centroid.x)} mm i y_C = ${pl(config.centroid.y)} mm.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      caption: 'Wynik jest w milimetrach; pola w mm², momenty w mm³.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm, y_C = ${pl(config.centroid.y)} mm`,
    },
    interpretation: {
      narration: `Centroid leży w czaszy, powyżej wycięcia. Wycięcie usuwa materiał przy dnie, więc figura jest „cięższa” u góry; x_C wypada nieco na lewo od osi symetrii czaszy, bo lewa podstawa jest szersza od prawej listwy.`,
      formula: `x_C=${tex(config.centroid.x)}>0,\\qquad y_C=${tex(config.centroid.y)}>0`,
      caption: 'Znaki wynikają z położenia materiału względem osi układu.',
      emphasis: 'Centroid w czaszy, nad wycięciem',
    },
    check: {
      narration:
        'Niezależny bilans momentów względem wyznaczonego centroidu powinien się zerować. Sprawdzamy też tożsamości A·x_C = Q_y oraz A·y_C = Q_x.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residuals(config).x)},\\qquad \\sum A_i(y_i-y_C)=${tex(residuals(config).y)}`,
      caption: 'Reszty są zerowe z dokładnością numeryczną.',
      emphasis: 'Bilans momentów względem centroidu',
    },
  }
  configs.push(config)
}

for (const [a, d, variant, id] of [
  [4, 20, 1, 'centroid-arc-cap-notch-a4-d20'],
  [8, 40, 2, 'centroid-arc-cap-notch-a8-d40'],
  [5, 35, 3, 'centroid-arc-cap-notch-a5-d35'],
] as const) {
  buildFigure1(a, d, variant, id)
}

/* ------------------------------------------------------------------ */
/* Figura 2 — koło R25 z wycięciem 2a × a i ścięciem 45°               */
/* ------------------------------------------------------------------ */

const FIG2_ALT =
  'Koło o promieniu 25 mm z prostokątnym wycięciem 2a × a przy osi x i 45-stopniowym ścięciem lewego naroża'

function buildFigure2(a: number, variant: number, id: string) {
  const circleArea = Math.PI * 25 * 25
  const rectArea = 2 * a * a
  const triangleArea = (a * a) / 2
  const parts: CentroidPart[] = [
    { area: circleArea, x: 0, y: 0 },
    { area: rectArea, x: a, y: a / 2, negative: true },
    { area: triangleArea, x: -a / 3, y: a / 3, negative: true },
  ]
  const removedCentroid = {
    x: (rectArea * a + triangleArea * (-a / 3)) / (rectArea + triangleArea),
    y: (rectArea * (a / 2) + triangleArea * (a / 3)) / (rectArea + triangleArea),
  }
  const config = finish({
    id,
    figure: 2,
    variant,
    a,
    interpretation: `Wycięcie ma szerokość 2a = ${2 * a} mm i wysokość a = ${a} mm. Lewe naroże jest ścięte pod 45°, więc wycięcie sięga o a w lewo od osi y. Pas materiału nad wycięciem ma grubość 5 mm i nie zmienia położenia centroidu.`,
    given: [
      `R = 25 mm, a = ${a} mm`,
      `Wycięcie: 2a × a = ${2 * a} × ${a} mm`,
      'Ścięcie lewego naroża pod 45° (rzut poziomy a)',
      'Pas materiału nad wycięciem: 5 mm',
      'Środek koła O w początku układu; oś x poziomo, oś y pionowo',
    ],
    parts,
    bounds: { xmin: -25, xmax: 25, ymin: -25, ymax: 25 },
    insideMaterial: true,
    justification:
      'Wycięcie leży w I i II ćwiartce, więc centroid przesuwa się do III ćwiartki — tam materiał jest nieprzerwany.',
    removedCentroid,
    title: `Zestaw E, figura 2, wariant ${variant} — koło R25 z wycięciem 2a × a`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      'R = 25 mm (koło)',
      `a = ${a} mm`,
      `wycięcie: ${2 * a} × ${a} mm`,
      'ścięcie 45°, rzut a',
      'pas nad wycięciem: 5 mm',
      'O = (0; 0)',
    ],
    [
      `A_koła = ${pl(circleArea)} mm²`,
      `A_prost. = ${pl(rectArea)} mm² (ujemne)`,
      `A_trójkąta = ${pl(triangleArea)} mm² (ujemne)`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `A_w = ${pl(rectArea + triangleArea)} mm²`,
      `x_w = ${pl(removedCentroid.x)} mm`,
      `y_w = ${pl(removedCentroid.y)} mm`,
      `Q_y = −A_w·x_w = ${pl(config.moments.qy)} mm³`,
      `Q_x = −A_w·y_w = ${pl(config.moments.qx)} mm³`,
    ],
    [`x_C = Q_y / A = ${pl(config.centroid.x)} mm`, `y_C = Q_x / A = ${pl(config.centroid.y)} mm`],
    interpretationVisuals(config),
    balanceVisuals(config),
  ]
  config.steps = {
    model: {
      narration: `Koło ma promień 25 mm i środek w O. Wycięcie zaczyna się na osi x, ma szerokość 2a = ${2 * a} mm i wysokość a = ${a} mm, a jego lewe naroże jest ścięte pod 45°, co wydłuża dno o a w lewo. Pas materiału nad wycięciem ma 5 mm.`,
      formula: `R=25\\ \\mathrm{mm},\\quad a=${tex(a)}\\ \\mathrm{mm},\\quad b_w=${tex(2 * a)}\\ \\mathrm{mm},\\quad h_w=${tex(a)}\\ \\mathrm{mm}`,
      caption: 'Wymiar 5 dotyczy materiału nad wycięciem, nie wysokości wycięcia.',
      emphasis: 'Wycięcie: 2a × a, ścięcie 45°',
    },
    loads: {
      narration:
        'Koło traktujemy jako pole dodatnie, a wycięcie jako dwa pola ujemne: prostokąt 2a × a oraz trójkąt ścięcia o przyprostokątnych a i a. Suma pól ujemnych daje rzeczywiste pole wycięcia.',
      formula: `A_w=2a^2+\\frac{a^2}{2}=\\frac{5a^2}{2}=${tex(rectArea + triangleArea)}\\ \\mathrm{mm^2}`,
      caption: 'Pole netto to pole koła minus pole wycięcia.',
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    equations: {
      narration:
        'Moment wycięcia względem osi y liczymy z prostokąta i trójkąta. Prostokąt ma x = a, trójkąt x = −a/3, więc wypadkowa x_w jest dodatnia. Analogicznie y_w jest dodatnie.',
      formula: `x_w=${tex(removedCentroid.x)}\\ \\mathrm{mm},\\qquad y_w=${tex(removedCentroid.y)}\\ \\mathrm{mm}`,
      caption: 'Znak minus we wzorze na centroid figury bierze się z ujemnego pola wycięcia.',
      emphasis: `x_w = ${pl(removedCentroid.x)} mm`,
    },
    solution: {
      narration: `Otrzymujemy x_C = ${pl(config.centroid.x)} mm i y_C = ${pl(config.centroid.y)} mm. Oba wyniki są ujemne, bo wycięcie jest w ćwiartkach dodatnich.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      caption: 'Centroid przesunął się przeciwnie do wycięcia.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm`,
    },
    interpretation: {
      narration:
        'Usunięcie materiału w I i II ćwiartce przesuwa centroid do III ćwiartki. Wartości są małe, bo wycięcie jest blisko środka i ma małą powierzchnię w porównaniu z kołem.',
      formula: `x_C<0,\\qquad y_C<0`,
      caption: 'Centroid leży w materiale w III ćwiartce, blisko początku układu.',
      emphasis: 'Przesunięcie do III ćwiartki',
    },
    check: {
      narration:
        'Bilans momentów względem centroidu zamyka się. Sprawdzamy też, że suma pól ujemnych odtwarza moment wycięcia użyty w rachunku.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residuals(config).x)},\\qquad \\sum A_i(y_i-y_C)=${tex(residuals(config).y)}`,
      caption: 'Niezależna kontrola znaków i wartości momentów.',
      emphasis: 'Bilans momentów',
    },
  }
  configs.push(config)
}

for (const [a, variant, id] of [
  [5, 1, 'centroid-circle-chamfer-notch-a5'],
  [4, 2, 'centroid-circle-chamfer-notch-a4'],
  [6, 3, 'centroid-circle-chamfer-notch-a6'],
] as const) {
  buildFigure2(a, variant, id)
}

/* ------------------------------------------------------------------ */
/* Figura 3 — koło o średnicy d z wycięciem 2b × (a+2) i ścięciem      */
/* ------------------------------------------------------------------ */

const FIG3_ALT =
  'Koło o średnicy d z wycięciem szerokości 2b i wysokości a+2, którego dolny lewy narożnik jest ścięty pod 45 stopni'

function buildFigure3(a: number, d: number, b: number, variant: number, id: string) {
  const radius = d / 2
  const circleArea = Math.PI * radius * radius
  const cutRectArea = 2 * b * (a + 2)
  const chamferArea = (a * a) / 2
  const parts: CentroidPart[] = [
    { area: circleArea, x: 0, y: 0 },
    { area: cutRectArea, x: 0, y: (a - 2) / 2, negative: true },
    { area: chamferArea, x: -b + a / 3, y: (a - 6) / 3 },
  ]
  const cutArea = cutRectArea - chamferArea
  const removedCentroid = {
    x: (-cutRectArea * 0 + chamferArea * (-b + a / 3)) / -cutArea,
    y: (-cutRectArea * ((a - 2) / 2) + chamferArea * ((a - 6) / 3)) / -cutArea,
  }
  const config = finish({
    id,
    figure: 3,
    variant,
    a,
    d,
    b,
    interpretation: `Koło ma średnicę d = ${d} mm. Wycięcie ma szerokość 2b = ${2 * b} mm, sięga od y = −2 mm do y = a = ${a} mm, a jego lewy dolny narożnik jest ścięty pod 45° (rzut poziomy a).`,
    given: [
      `d = ${d} mm (średnica koła), a = ${a} mm, b = ${b} mm`,
      `Wycięcie: 2b × (a + 2) = ${2 * b} × ${a + 2} mm`,
      'Dolny lewy narożnik ścięty pod 45°, rzut poziomy a',
      'Wycięcie sięga 2 mm poniżej osi x i a mm powyżej osi x',
      'O w środku koła; osie x i y przez O',
    ],
    parts,
    bounds: { xmin: -radius, xmax: radius, ymin: -radius, ymax: radius },
    insideMaterial: false,
    justification:
      'Centroid wypada w obszarze wycięcia, bo ubytek jest duży i niesymetryczny; znaki x_C < 0 i y_C < 0 są przeciwne do znaków środka wycięcia (x_w > 0, y_w > 0).',
    removedCentroid,
    title: `Zestaw E, figura 3, wariant ${variant} — koło d z wycięciem 2b × (a+2)`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      `d = ${d} mm (średnica)`,
      `a = ${a} mm, b = ${b} mm`,
      `wycięcie: ${2 * b} × ${a + 2} mm`,
      'ścięcie 45°, rzut a',
      'dół wycięcia: y = −2 mm',
      'O = (0; 0)',
    ],
    [
      `A_koła = ${pl(circleArea)} mm²`,
      `A_prost. = ${pl(cutRectArea)} mm² (ujemne)`,
      `A_ścięcia = ${pl(chamferArea)} mm² (dodane)`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `A_w = ${pl(cutArea)} mm²`,
      `x_w = ${pl(removedCentroid.x)} mm`,
      `y_w = ${pl(removedCentroid.y)} mm`,
      `Q_y = ${pl(config.moments.qy)} mm³`,
      `Q_x = ${pl(config.moments.qx)} mm³`,
    ],
    [`x_C = Q_y / A = ${pl(config.centroid.x)} mm`, `y_C = Q_x / A = ${pl(config.centroid.y)} mm`],
    interpretationVisuals(config),
    balanceVisuals(config),
  ]
  config.steps = {
    model: {
      narration: `Koło ma średnicę d = ${d} mm, więc promień ${radius} mm. Wycięcie jest prostokątem 2b × (a+2), z którego dolny lewy narożnik ścięto pod 45°. Górna krawędź wycięcia leży na y = a, dolna na y = −2.`,
      formula: `R=${tex(radius)}\\ \\mathrm{mm},\\quad a=${tex(a)}\\ \\mathrm{mm},\\quad b=${tex(b)}\\ \\mathrm{mm}`,
      caption: 'Średnica koła jest oznaczona przez d, a nie promień.',
      emphasis: `R = ${radius} mm`,
    },
    loads: {
      narration:
        'Pole wycięcia liczymy jako prostokąt 2b × (a+2) minus trójkąt ścięcia o przyprostokątnych a i a. W tabeli momentów prostokąt jest polem ujemnym, a trójkąt dodatnim — odejmujemy prostokąt, ale dodajemy z powrotem ścięty róg.',
      formula: `A_w=2b(a+2)-\\frac{a^2}{2}=${tex(cutArea)}\\ \\mathrm{mm^2}`,
      caption: 'Pole netto figury to pole koła minus pole wycięcia.',
      emphasis: `A_w = ${pl(cutArea)} mm²`,
    },
    equations: {
      narration:
        'Moment wycięcia względem osi y jest dodatni, bo prostokąt leży symetrycznie, a ścięcie zabiera materiał po lewej. Moment względem osi x jest dodatni, bo wycięcie leży głównie nad osią x.',
      formula: `x_w=${tex(removedCentroid.x)}\\ \\mathrm{mm},\\qquad y_w=${tex(removedCentroid.y)}\\ \\mathrm{mm}`,
      caption: 'Znaki momentów wycięcia decydują o kierunku przesunięcia centroidu figury.',
      emphasis: `y_w = ${pl(removedCentroid.y)} mm`,
    },
    solution: {
      narration: `Po odjęciu wycięcia od koła otrzymujemy x_C = ${pl(config.centroid.x)} mm i y_C = ${pl(config.centroid.y)} mm.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      caption: 'Wynik jest przesunięty w dół i w lewo względem O.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm`,
    },
    interpretation: {
      narration:
        'Wycięcie usuwa dużo materiału nad osią x i po prawej stronie osi y. Dlatego centroid figury przesuwa się w dół i w lewo. Leży w obszarze wycięcia, co jest dopuszczalne: figura nie musi być wypukła ani jednospójna w sensie środka ciężkości.',
      formula: `x_C<0,\\qquad y_C<0`,
      caption: 'Położenie centroidu w wycięciu jest uzasadnione znakami momentów.',
      emphasis: 'Przesunięcie w dół i w lewo',
    },
    check: {
      narration:
        'Niezależny bilans momentów względem centroidu potwierdza wynik. Sprawdzamy także, że pole wycięcia i jego momenty mają przeciwne znaki do przesunięcia centroidu.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residuals(config).x)},\\qquad \\sum A_i(y_i-y_C)=${tex(residuals(config).y)}`,
      caption: 'Reszty są zerowe; kontrola obejmuje wszystkie trzy części tabeli.',
      emphasis: 'Bilans momentów',
    },
  }
  configs.push(config)
}

for (const [a, d, b, variant, id] of [
  [7, 40, 10, 1, 'centroid-circle-deep-notch-a7-d40'],
  [9, 50, 12, 2, 'centroid-circle-deep-notch-a9-d50'],
  [8, 50, 10, 3, 'centroid-circle-deep-notch-a8-d50'],
] as const) {
  buildFigure3(a, d, b, variant, id)
}

/* ------------------------------------------------------------------ */
/* Figura 4 — koło R25 z wycięciem: półkole R10 + prostokąt a × 20     */
/* ------------------------------------------------------------------ */

const FIG4_ALT =
  'Koło o promieniu 25 mm z wycięciem złożonym z półkola o promieniu 10 mm po lewej stronie i prostokąta długości a po prawej'

function buildFigure4(a: number, variant: number, id: string) {
  const circleArea = Math.PI * 25 * 25
  const socketRadius = 10
  const semicircleArea = (Math.PI * socketRadius * socketRadius) / 2
  const semicircleX = (-4 * socketRadius) / (3 * Math.PI)
  const rectangleArea = 2 * socketRadius * a
  const rectangleX = a / 2
  const parts: CentroidPart[] = [
    { area: circleArea, x: 0, y: 0 },
    { area: semicircleArea, x: semicircleX, y: 0, negative: true },
    { area: rectangleArea, x: rectangleX, y: 0, negative: true },
  ]
  const cutArea = semicircleArea + rectangleArea
  const removedCentroid = {
    x: (semicircleArea * semicircleX + rectangleArea * rectangleX) / cutArea,
    y: 0,
  }
  const config = finish({
    id,
    figure: 4,
    variant,
    a,
    interpretation: `Koło ma R = 25 mm. Wycięcie jest symetryczne względem osi x: półkole R10 po lewej stronie O i prostokąt a × 20 = ${a} × 20 mm po prawej. Dlatego y_C = 0.`,
    given: [
      `R = 25 mm, a = ${a} mm`,
      'Wycięcie: półkole R10 po lewej + prostokąt a × 20 mm po prawej',
      'Wycięcie symetryczne względem osi x',
      'O w środku koła; oś x poziomo, oś y pionowo',
    ],
    parts,
    bounds: { xmin: -25, xmax: 25, ymin: -25, ymax: 25 },
    insideMaterial: false,
    justification:
      'Centroid wypada w obszarze wycięcia (x_C < 0), bo prostokąt po prawej ma większy moment niż półkole po lewej; jest to poprawne dla figury z ubytkiem.',
    removedCentroid,
    pappus: { area: semicircleArea, distance: -semicircleX, radius: socketRadius },
    title: `Zestaw E, figura 4, wariant ${variant} — koło R25 z wycięciem półkolisto-prostokątnym`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      'R = 25 mm',
      `a = ${a} mm`,
      'półkole R10 po lewej',
      `prostokąt ${a} × 20 mm`,
      'symetria względem osi x',
      'O = (0; 0)',
    ],
    [
      `A_koła = ${pl(circleArea)} mm²`,
      `A_półkola = ${pl(semicircleArea)} mm² (ujemne)`,
      `A_prost. = ${pl(rectangleArea)} mm² (ujemne)`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `x_półkola = ${pl(semicircleX)} mm`,
      `x_prost. = ${pl(rectangleX)} mm`,
      `A_w = ${pl(cutArea)} mm²`,
      `x_w = ${pl(removedCentroid.x)} mm`,
      `Q_y = ${pl(config.moments.qy)} mm³`,
    ],
    [`x_C = Q_y / A = ${pl(config.centroid.x)} mm`, `y_C = 0 mm (symetria)`],
    interpretationVisuals(config),
    [
      `V_Pappus = 2π·${pl(semicircleArea)}·${pl(-semicircleX)}`,
      `V = ${pl(2 * Math.PI * semicircleArea * -semicircleX)} mm³`,
      `V_kuli = 4π·10³/3 = ${pl((4 * Math.PI * 1000) / 3)} mm³`,
      'zgodność Pappusa i wzoru na kulę',
      ...balanceVisuals(config),
    ],
  ]
  config.steps = {
    model: {
      narration: `Koło R25 ma wycięcie symetryczne względem osi x. Po lewej jest półkole o promieniu 10 mm, a po prawej prostokąt o długości a = ${a} mm i wysokości 20 mm. Oś x jest osią symetrii wycięcia.`,
      formula: `R=25\\ \\mathrm{mm},\\quad r=10\\ \\mathrm{mm},\\quad a=${tex(a)}\\ \\mathrm{mm}`,
      caption: 'Wycięcie jest jednym otworem złożonym z dwóch części.',
      emphasis: 'Półkole R10 + prostokąt a × 20',
    },
    loads: {
      narration:
        'Półkole ma pole 50π mm² i centroid w odległości 4r/(3π) na lewo od O. Prostokąt ma pole 20a mm² i centroid w x = a/2. Oba pola są ujemne.',
      formula: `A_p=50\\pi=${tex(semicircleArea)},\\quad A_r=20a=${tex(rectangleArea)}\\quad[\\mathrm{mm^2}]`,
      caption: 'Pole netto = pole koła − pole półkola − pole prostokąta.',
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    equations: {
      narration:
        'Moment wycięcia względem osi y to suma momentów półkola i prostokąta. Moment względem osi x znika, bo oba pola są symetryczne względem tej osi.',
      formula: `Q_{y,w}=50\\pi\\left(-\\frac{40}{3\\pi}\\right)+20a\\cdot\\frac{a}{2}=${tex(cutArea * removedCentroid.x)}\\ \\mathrm{mm^3}`,
      caption: 'Stąd x_w jest dodatnie, a y_w = 0.',
      emphasis: `x_w = ${pl(removedCentroid.x)} mm`,
    },
    solution: {
      narration: `Centroid figury ma x_C = ${pl(config.centroid.x)} mm i y_C = 0 mm. Wartość bezwzględna rośnie z a, bo wydłuża się prostokątne ramię wycięcia po prawej.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=0\\ \\mathrm{mm}`,
      caption: 'Dla a = 12 mm x_C ≈ −0,494 mm, a dla a = 15 mm x_C ≈ −1,051 mm.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm`,
    },
    interpretation: {
      narration:
        'Wycięcie usuwa więcej materiału po prawej niż po lewej, więc centroid przesuwa się w lewo. Leży w obszarze wycięcia, co jest poprawne; symetria względem osi x utrzymuje y_C = 0.',
      formula: `x_C<0,\\qquad y_C=0`,
      caption: 'Znak x_C jest przeciwny do znaku momentu wycięcia.',
      emphasis: 'Przesunięcie w lewo, y_C = 0',
    },
    check: {
      narration:
        'Kontrola Pappusa: obrót półkola R10 wokół średnicy daje kulę. Objętość z twierdzenia Pappusa jest równa 4πr³/3, co potwierdza poprawność centroidu półkola. Dodatkowo bilans momentów względem centroidu znika.',
      formula: `V=2\\pi\\cdot\\frac{4r}{3\\pi}\\cdot\\frac{\\pi r^2}{2}=\\frac{4\\pi r^3}{3}=${tex((4 * Math.PI * 1000) / 3)}\\ \\mathrm{mm^3}`,
      caption: 'Niezależna kontrola Pappusa i bilansu momentów.',
      emphasis: `V = ${pl((4 * Math.PI * 1000) / 3)} mm³`,
    },
  }
  configs.push(config)
}

for (const [a, variant, id] of [
  [12, 2, 'centroid-circle-semicircle-slot-a12'],
  [15, 3, 'centroid-circle-semicircle-slot-a15'],
] as const) {
  buildFigure4(a, variant, id)
}

/* ------------------------------------------------------------------ */
/* Figura 5 — listwa 10 × 25, trójkąt i otwór d                        */
/* ------------------------------------------------------------------ */

const FIG5_ALT =
  'Figura złożona z pionowej listwy 10 × 25 mm i trójkąta prostokątnego z kołowym otworem o średnicy d, położonym w odległości a od osi y'

function buildFigure5(a: number, d: number, variant: number, id: string) {
  const stripArea = 10 * 25
  const triangleArea = ((a + 40) * (2 * a + 25)) / 2
  const holeArea = Math.PI * (d / 2) ** 2
  const parts: CentroidPart[] = [
    { area: stripArea, x: -5, y: 2 * a + 12.5 },
    { area: triangleArea, x: (a + 40) / 3, y: (2 * a + 25) / 3 },
    { area: holeArea, x: a, y: a, negative: true },
  ]
  const config = finish({
    id,
    figure: 5,
    variant,
    a,
    d,
    interpretation: `Listwa ma 10 × 25 mm i leży po lewej stronie osi y. Trójkąt ma podstawę a + 40 = ${a + 40} mm i wysokość 2a + 25 = ${2 * a + 25} mm. Otwór ma średnicę d = ${d} mm i środek w (a; a) = (${a}; ${a}) mm.`,
    given: [
      `a = ${a} mm, d = ${d} mm (średnica otworu)`,
      'Listwa: 10 × 25 mm po lewej stronie osi y',
      `Trójkąt: podstawa a + 40 = ${a + 40} mm, wysokość 2a + 25 = ${2 * a + 25} mm`,
      `Otwór: średnica d = ${d} mm, środek w (a; a) = (${a}; ${a}) mm`,
      'O w dolnym lewym narożu trójkąta; oś x wzdłuż podstawy',
    ],
    parts,
    bounds: { xmin: -10, xmax: a + 40, ymin: 0, ymax: 2 * a + 25 },
    insideMaterial: true,
    justification:
      'Centroid leży w trójkącie, powyżej i na prawo od otworu; otwór leży poniżej i na lewo od centroidu pełnej figury, więc jego usunięcie przesuwa centroid w prawo i w górę.',
    title: `Zestaw E, figura 5, wariant ${variant} — listwa, trójkąt i otwór`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      `a = ${a} mm, d = ${d} mm`,
      'listwa: 10 × 25 mm',
      `trójkąt: ${a + 40} × ${2 * a + 25} mm`,
      `otwór: R = ${pl(d / 2)} mm`,
      `środek otworu: (${a}; ${a})`,
      'O = (0; 0)',
    ],
    [
      `A_listwy = ${pl(stripArea)} mm²`,
      `A_trójkąta = ${pl(triangleArea)} mm²`,
      `A_otworu = ${pl(holeArea)} mm² (ujemne)`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `Q_y = ${pl(config.moments.qy)} mm³`,
      `Q_x = ${pl(config.moments.qx)} mm³`,
      `x_C = Q_y / A = ${pl(config.centroid.x)} mm`,
      `y_C = Q_x / A = ${pl(config.centroid.y)} mm`,
    ],
    [`x_C = ${pl(config.centroid.x)} mm`, `y_C = ${pl(config.centroid.y)} mm`, 'otwór obniża i przesuwa wynik w lewo'],
    interpretationVisuals(config),
    balanceVisuals(config),
  ]
  config.steps = {
    model: {
      narration: `Figurę tworzą: pionowa listwa 10 × 25 mm po lewej stronie osi y, trójkąt prostokątny o podstawie a + 40 i wysokości 2a + 25 oraz kołowy otwór o średnicy d, którego środek leży w (a; a).`,
      formula: `a=${tex(a)}\\ \\mathrm{mm},\\quad d=${tex(d)}\\ \\mathrm{mm},\\quad b_t=${tex(a + 40)},\\quad h_t=${tex(2 * a + 25)}`,
      caption: 'Wymiary 10, 25 i 40 są stałe; a i d pochodzą z tabeli wariantów.',
      emphasis: 'Listwa + trójkąt − otwór',
    },
    loads: {
      narration:
        'Listwa i trójkąt to pola dodatnie, a otwór to pole ujemne. Trójkąt ma centroid w jednej trzeciej podstawy i wysokości od kąta prostego, listwa w połowie szerokości i wysokości.',
      formula: `A_L=250,\\quad A_t=${tex(triangleArea)},\\quad A_o=${tex(holeArea)}\\quad[\\mathrm{mm^2}]`,
      caption: 'Pole netto to suma pól listwy i trójkąta minus pole otworu.',
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    equations: {
      narration:
        'Momenty względem osi y i x sumujemy z uwzględnieniem znaku otworu. Otwór leży w (a; a), więc odejmuje zarówno moment x, jak i y.',
      formula: `Q_y=${tex(config.moments.qy)},\\qquad Q_x=${tex(config.moments.qx)}\\quad[\\mathrm{mm^3}]`,
      caption: 'Otwór zmniejsza oba momenty, bo leży w dodatniej części układu.',
      emphasis: `Q_x = ${pl(config.moments.qx)} mm³`,
    },
    solution: {
      narration: `Centroid figury ma x_C = ${pl(config.centroid.x)} mm i y_C = ${pl(config.centroid.y)} mm. Leży w trójkącie, w prawo od listwy i powyżej otworu.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      caption: 'Wynik jest w milimetrach, momenty w mm³.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm`,
    },
    interpretation: {
      narration:
        'Dominuje duży trójkąt, więc centroid jest daleko od osi y. Otwór leży poniżej i na lewo od centroidu pełnej figury, więc jego usunięcie przesuwa wynik lekko w prawo i w górę.',
      formula: `x_C>0,\\qquad y_C>0`,
      caption: 'Centroid pozostaje w materiale, w obszarze trójkąta.',
      emphasis: 'Centroid w trójkącie',
    },
    check: {
      narration:
        'Bilans momentów względem wyznaczonego centroidu zamyka się. Dodatkowo sprawdzamy, że pole otworu wchodzi do sumy z przeciwnym znakiem.',
      formula: `\\sum A_i(x_i-x_C)=${tex(residuals(config).x)},\\qquad \\sum A_i(y_i-y_C)=${tex(residuals(config).y)}`,
      caption: 'Niezależna kontrola sum pól i momentów.',
      emphasis: 'Bilans momentów',
    },
  }
  configs.push(config)
}

for (const [a, d, variant, id] of [
  [10, 10, 1, 'centroid-strip-triangle-hole-a10-d10'],
  [20, 10, 2, 'centroid-strip-triangle-hole-a20-d10'],
  [25, 15, 3, 'centroid-strip-triangle-hole-a25-d15'],
] as const) {
  buildFigure5(a, d, variant, id)
}

/* ------------------------------------------------------------------ */
/* Figura 6 — trójkąt, prostokąt i półkole o promieniu d                */
/* ------------------------------------------------------------------ */

const FIG6_ALT =
  'Figura ograniczona osią x, ukośną krawędzią, pionową krawędzią wysokości 3a i półkolem o promieniu d na górze'

function buildFigure6(a: number, d: number, variant: number, id: string) {
  const base = 5 * a - 2 * d
  const height = 3 * a
  const triangleArea = (base * height) / 2
  const rectangleArea = 2 * d * height
  const semicircleArea = (Math.PI * d * d) / 2
  const parts: CentroidPart[] = [
    { area: triangleArea, x: base / 3, y: height / 3 },
    { area: rectangleArea, x: 5 * a - d, y: height / 2 },
    { area: semicircleArea, x: 5 * a - d, y: height + (4 * d) / (3 * Math.PI) },
  ]
  const config = finish({
    id,
    figure: 6,
    variant,
    a,
    d,
    interpretation: `Podstawa ma 5a = ${5 * a} mm, wysokość 3a = ${height} mm, a górne półkole ma promień d = ${d} mm. Środek półkola leży w (5a − d; 3a) = (${5 * a - d}; ${height}) mm.`,
    given: [
      `a = ${a} mm, d = ${d} mm (promień półkola)`,
      `Podstawa: 5a = ${5 * a} mm`,
      `Wysokość pionowej krawędzi: 3a = ${height} mm`,
      `Półkole: promień d = ${d} mm, środek w (${5 * a - d}; ${height}) mm`,
      'Trójkąt prostokątny o podstawie 5a − 2d i wysokości 3a',
    ],
    parts,
    bounds: { xmin: 0, xmax: 5 * a, ymin: 0, ymax: height + d },
    insideMaterial: true,
    justification:
      'Centroid leży w materiale (trójkąt/prostokąt), poniżej półkola; półkole przesuwa go w prawo i w górę.',
    pappus: { area: semicircleArea, distance: (4 * d) / (3 * Math.PI), radius: d },
    title: `Zestaw E, figura 6, wariant ${variant} — trójkąt, prostokąt i półkole`,
    result: '',
    visuals: [],
    steps: {} as CentroidConfig['steps'],
  })
  config.result = resultLine(config)
  config.visuals = [
    [
      `a = ${a} mm, d = ${d} mm`,
      `podstawa: 5a = ${5 * a} mm`,
      `wysokość: 3a = ${height} mm`,
      `półkole: R = ${d} mm`,
      `środek półkola: (${5 * a - d}; ${height})`,
      'O = (0; 0)',
    ],
    [
      `A_trójkąta = ${pl(triangleArea)} mm²`,
      `A_prost. = ${pl(rectangleArea)} mm²`,
      `A_półkola = ${pl(semicircleArea)} mm²`,
      `A = ${pl(config.area)} mm²`,
    ],
    [
      `Q_y = ${pl(config.moments.qy)} mm³`,
      `Q_x = ${pl(config.moments.qx)} mm³`,
      `x_C = Q_y / A = ${pl(config.centroid.x)} mm`,
      `y_C = Q_x / A = ${pl(config.centroid.y)} mm`,
    ],
    [`x_C = ${pl(config.centroid.x)} mm`, `y_C = ${pl(config.centroid.y)} mm`, 'półkole podnosi y_C'],
    interpretationVisuals(config),
    [
      `V_Pappus = 2π·${pl(semicircleArea)}·${pl((4 * d) / (3 * Math.PI))}`,
      `V = ${pl(2 * Math.PI * semicircleArea * ((4 * d) / (3 * Math.PI)))} mm³`,
      `V_kuli = 4π·${d}³/3 = ${pl((4 * Math.PI * d ** 3) / 3)} mm³`,
      'zgodność Pappusa i wzoru na kulę',
      ...balanceVisuals(config),
    ],
  ]
  config.steps = {
    model: {
      narration: `Figura ma podstawę 5a, pionową krawędź 3a i górne półkole o promieniu d. Półkole jest oparte na poziomej średnicy y = 3a, a jego środek leży w x = 5a − d.`,
      formula: `b=${tex(5 * a)},\\quad h=${tex(height)},\\quad R=${tex(d)}\\quad[\\mathrm{mm}]`,
      caption: 'Półkole jest styczne do pionowej krawędzi z prawej strony.',
      emphasis: 'Półkole R = d na wysokości 3a',
    },
    loads: {
      narration:
        'Dzielimy figurę na trójkąt prostokątny, prostokąt pod półkolem i półkole. Trójkąt ma centroid w (base/3; height/3), prostokąt w połowie szerokości i wysokości, a półkole w odległości 4R/(3π) nad średnicą.',
      formula: `A_t=${tex(triangleArea)},\\quad A_r=${tex(rectangleArea)},\\quad A_s=${tex(semicircleArea)}\\quad[\\mathrm{mm^2}]`,
      caption: 'Wszystkie części mają pola dodatnie.',
      emphasis: `A = ${pl(config.area)} mm²`,
    },
    equations: {
      narration:
        'Momenty względem osi y i x sumujemy z dodatnimi znakami. Półkole wnosi duży moment y, bo jego centroid leży wysoko nad osią x.',
      formula: `Q_y=${tex(config.moments.qy)},\\qquad Q_x=${tex(config.moments.qx)}\\quad[\\mathrm{mm^3}]`,
      caption: 'Momenty są dodatnie, bo cała figura leży w pierwszej ćwiartce.',
      emphasis: `Q_x = ${pl(config.moments.qx)} mm³`,
    },
    solution: {
      narration: `Otrzymujemy x_C = ${pl(config.centroid.x)} mm i y_C = ${pl(config.centroid.y)} mm.`,
      formula: `x_C=${tex(config.centroid.x)}\\ \\mathrm{mm},\\qquad y_C=${tex(config.centroid.y)}\\ \\mathrm{mm}`,
      caption: 'Centroid leży w trójkącie/prostokącie, poniżej półkola.',
      emphasis: `x_C = ${pl(config.centroid.x)} mm`,
    },
    interpretation: {
      narration:
        'Półkole jest lekkie w porównaniu z dużą częścią prostokątno-trójkątną, więc nie przesuwa centroidu bardzo wysoko. Mimo to y_C jest wyraźnie powyżej połowy wysokości 3a.',
      formula: `x_C>0,\\qquad y_C>0`,
      caption: 'Centroid leży w materiale, w prawej części figury.',
      emphasis: 'Centroid w prawej części figury',
    },
    check: {
      narration:
        'Kontrola Pappusa: obrót półkola wokół jego średnicy daje kulę o promieniu d. Objętość z twierdzenia Pappusa zgadza się z 4πd³/3. Dodatkowo bilans momentów względem centroidu znika.',
      formula: `V=2\\pi\\cdot\\frac{4d}{3\\pi}\\cdot\\frac{\\pi d^2}{2}=\\frac{4\\pi d^3}{3}=${tex((4 * Math.PI * d ** 3) / 3)}\\ \\mathrm{mm^3}`,
      caption: 'Niezależna kontrola Pappusa i bilansu momentów.',
      emphasis: `V = ${pl((4 * Math.PI * d ** 3) / 3)} mm³`,
    },
  }
  configs.push(config)
}

for (const [a, d, variant, id] of [
  [20, 15, 1, 'centroid-triangle-rectangle-semicircle-a20-d15'],
  [10, 12, 2, 'centroid-triangle-rectangle-semicircle-a10-d12'],
  [15, 10, 3, 'centroid-triangle-rectangle-semicircle-a15-d10'],
] as const) {
  buildFigure6(a, d, variant, id)
}

export const CENTROID_CONFIGS: CentroidConfig[] = configs

export const CENTROID_IDS = CENTROID_CONFIGS.map((config) => config.id)

export const CENTROID_TASKS: SourceTaskDefinition[] = CENTROID_CONFIGS.map((config) =>
  makeBatchTask({
    id: config.id,
    title: config.title,
    given: config.given,
    result: config.result,
    visuals: config.visuals,
    model: config.steps.model,
    loads: config.steps.loads,
    equations: config.steps.equations,
    solution: config.steps.solution,
    interpretation: config.steps.interpretation,
    check: config.steps.check,
  }),
)

export function centroidConfig(id: string): CentroidConfig {
  const config = CENTROID_CONFIGS.find((entry) => entry.id === id)
  if (!config) throw new Error(`Nieznana konfiguracja centroidu: ${id}`)
  return config
}

export function centroidTask(id: string): SourceTaskDefinition {
  const task = CENTROID_TASKS.find((entry) => entry.id === id)
  if (!task) throw new Error(`Nieznane zadanie centroidu: ${id}`)
  return task
}
