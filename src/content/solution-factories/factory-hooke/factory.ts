import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface StrainTensorConfig {
  sigmaX: number
  sigmaY: number
  sigmaZ: number
  tauXY: number
  tauXZ: number
  tauYZ: number
  /** moduł Younga w MPa */
  eMpa: number
  /** współczynnik Poissona */
  nu: number
}

export interface StrainTensorSolution {
  g: number
  ex: number
  ey: number
  ez: number
  gxy: number
  gxz: number
  gyz: number
  tensor: number[][]
  trace: number
}

export const STRAIN_TENSOR_CONFIG: StrainTensorConfig = {
  sigmaX: 90,
  sigmaY: -45,
  sigmaZ: 33,
  tauXY: -25,
  tauXZ: 75,
  tauYZ: -36,
  eMpa: 205_000,
  nu: 0.3,
}

export function solveStrainTensor(config: StrainTensorConfig): StrainTensorSolution {
  const { sigmaX, sigmaY, sigmaZ, tauXY, tauXZ, tauYZ, eMpa, nu } = config
  const g = eMpa / (2 * (1 + nu))
  const ex = (sigmaX - nu * (sigmaY + sigmaZ)) / eMpa
  const ey = (sigmaY - nu * (sigmaZ + sigmaX)) / eMpa
  const ez = (sigmaZ - nu * (sigmaX + sigmaY)) / eMpa
  const gxy = tauXY / g
  const gxz = tauXZ / g
  const gyz = tauYZ / g
  const tensor = [
    [ex, gxy / 2, gxz / 2],
    [gxy / 2, ey, gyz / 2],
    [gxz / 2, gyz / 2, ez],
  ]
  const trace = ((1 - 2 * nu) * (sigmaX + sigmaY + sigmaZ)) / eMpa
  return { g, ex, ey, ez, gxy, gxz, gyz, tensor, trace }
}

/** zapis wykładniczy w stylu wykładu: 4,5659·10⁻⁴ (przy |m| < 1 przesuwa się do 10⁻⁵) */
export function formatStrain(value: number): string {
  const exponent = Math.abs(value * 1e4) >= 1 || value === 0 ? -4 : -5
  const mantissa = value / 10 ** exponent
  const text = mantissa
    .toLocaleString('pl-PL', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
    .replace(/-/g, '−')
  const superscripts: Record<string, string> = { '-': '⁻', '4': '⁴', '5': '⁵' }
  const suffix = String(exponent)
    .split('')
    .map((character) => superscripts[character])
    .join('')
  return `${text}·10${suffix}`
}

export interface StrainTensorTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export const STRAIN_TENSOR_TASK: StrainTensorTask = (() => {
  const config = STRAIN_TENSOR_CONFIG
  const solution = solveStrainTensor(config)
  const num = (value: number) => String(value).replace(/-/g, '−')
  const given = [
    `σ = [[${num(config.sigmaX)}, ${num(config.tauXY)}, ${num(config.tauXZ)}], [${num(config.tauXY)}, ${num(config.sigmaY)}, ${num(config.tauYZ)}], [${num(config.tauXZ)}, ${num(config.tauYZ)}, ${num(config.sigmaZ)}]] MPa`,
    'E = 205 GPa = 205 000 MPa',
    'ν = 0,30',
    'materiał izotropowy, liniowo-sprężysty',
  ]
  const result = `ε_x = ${formatStrain(solution.ex)}, ε_y = ${formatStrain(solution.ey)}, ε_z = ${formatStrain(solution.ez)} oraz γ_xy = ${formatStrain(solution.gxy)}, γ_xz = ${formatStrain(solution.gxz)}, γ_yz = ${formatStrain(solution.gyz)}; tensor jest symetryczny, a jego ślad wynosi ${formatStrain(solution.trace)}.`
  return {
    id: 'tensor-odksztalcenia-e205-nu030',
    title: 'Tensor odkształcenia z uogólnionego prawa Hooke’a',
    duration: 11,
    given,
    result,
  }
})()

export function strainTensorScenes(): SolutionScene[] {
  return [
    {
      title: '1. Tensor naprężenia i układ osi',
      narration:
        'W punkcie panuje przestrzenny stan naprężenia. Na przekątnej tensora leżą naprężenia normalne σ_x = 90 MPa, σ_y = −45 MPa i σ_z = 33 MPa, a poza przekątną — naprężenia styczne τ_xy = −25 MPa, τ_xz = 75 MPa i τ_yz = −36 MPa.',
      formula:
        '\\boldsymbol{\\sigma}=\\begin{bmatrix}90&-25&75\\\\-25&-45&-36\\\\75&-36&33\\end{bmatrix}\\ \\mathrm{MPa}',
      caption: 'Element naprężenia z osiami x, y, z oraz pełną macierzą σ_ij w MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
    },
    {
      title: '2. Dane materiałowe i zamiana jednostek',
      narration:
        'Moduł Younga podano w gigapaskalach, a naprężenia w megapaskalach. Ponieważ 1 GPa = 1000 MPa, przyjmujemy E = 205 000 MPa. Współczynnik Poissona ν = 0,30 jest bezwymiarowy, więc do wzorów wstawiamy go bez zamiany.',
      formula: 'E=205\\ \\mathrm{GPa}=205\\,000\\ \\mathrm{MPa}\\qquad \\nu=0{,}30',
      caption: 'Karta materiału: E = 205 000 MPa oraz ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'material' },
      emphasis: 'Wszystkie naprężenia i moduły muszą być w tych samych jednostkach.',
    },
    {
      title: '3. Uogólnione prawo Hooke’a',
      narration:
        'Każde odkształcenie normalne zależy od naprężenia w swojej osi oraz od dwóch pozostałych naprężeń normalnych. Człon z ν opisuje poprzeczny skurcz lub rozszerzenie wywołane efektem Poissona. Naprężenia styczne nie występują w tych trzech wzorach.',
      formula:
        '\\varepsilon_x=\\frac{\\sigma_x-\\nu(\\sigma_y+\\sigma_z)}{E}\\qquad \\varepsilon_y=\\frac{\\sigma_y-\\nu(\\sigma_z+\\sigma_x)}{E}\\qquad \\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E}',
      caption: 'Trzy równania uogólnionego prawa Hooke’a dla odkształceń normalnych.',
      visual: 'cube',
      focus: { metric: 'hooke' },
    },
    {
      title: '4. Odkształcenie ε_x',
      narration:
        'Najpierw sumujemy naprężenia w osiach y i z: −45 + 33 = −12 MPa. Po pomnożeniu przez ν otrzymujemy −3,6 MPa, więc licznik wynosi 90 + 3,6 = 93,6 MPa. Dzielenie przez 205 000 MPa daje ε_x = 4,5659·10⁻⁴.',
      formula: '\\varepsilon_x=\\frac{90-0{,}30\\,(-45+33)}{205\\,000}=\\frac{93{,}6}{205\\,000}=4{,}5659\\cdot10^{-4}',
      caption: 'Macierz naprężenia z wyróżnionym σ_x oraz kolejne kroki obliczenia ε_x.',
      visual: 'cube',
      focus: { metric: 'ex' },
    },
    {
      title: '5. Odkształcenia ε_y i ε_z',
      narration:
        'Dla osi y licznik to −45 − 0,30·(33 + 90) = −81,9 MPa, czyli ε_y = −3,9951·10⁻⁴. Dla osi z otrzymujemy 33 − 0,30·(90 − 45) = 19,5 MPa i ε_z = 9,5122·10⁻⁵. Odkształcenie w y jest ściskające, a w z — rozciągające.',
      formula:
        '\\varepsilon_y=\\frac{-45-0{,}30\\,(33+90)}{205\\,000}=-3{,}9951\\cdot10^{-4}\\\\ \\varepsilon_z=\\frac{33-0{,}30\\,(90-45)}{205\\,000}=9{,}5122\\cdot10^{-5}',
      caption: 'Obliczenia ε_y i ε_z z zaznaczonymi odpowiednimi składnikami macierzy σ.',
      visual: 'cube',
      focus: { metric: 'eyz' },
    },
    {
      title: '6. Moduł ścinania i odkształcenia postaciowe',
      narration:
        'Moduł ścinania wyznaczamy z zależności G = E/[2(1 + ν)], co daje 78 846,15 MPa. Odkształcenia postaciowe są ilorazem naprężenia stycznego i modułu G. Znak γ jest taki sam jak znak odpowiedniego τ.',
      formula:
        'G=\\frac{E}{2(1+\\nu)}=\\frac{205\\,000}{2{,}60}=78\\,846{,}15\\ \\mathrm{MPa}\\\\ \\gamma_{xy}=\\frac{-25}{G}=-3{,}1707\\cdot10^{-4}\\quad \\gamma_{xz}=9{,}5122\\cdot10^{-4}\\quad \\gamma_{yz}=-4{,}5659\\cdot10^{-4}',
      caption: 'Moduł G oraz trzy odkształcenia postaciowe obliczone z naprężeń stycznych.',
      visual: 'cube',
      focus: { metric: 'shear' },
    },
    {
      title: '7. Konwencja: γ inżynierskie i ε tensorowe',
      narration:
        'W zapisie inżynierskim podajemy składowe γ_xy, γ_xz i γ_yz, które są podwojonymi składowymi tensora. W tensorze odkształcenia na pozycjach pozaprzekątniowych wpisujemy ε_ij = γ_ij/2. Dzięki temu macierz ε_ij jest symetryczna, a suma kątowych odkształceń nie jest liczona podwójnie.',
      formula:
        '\\varepsilon_{ij}=\\tfrac{1}{2}\\gamma_{ij}\\quad (i\\neq j)\\\\ \\varepsilon_{xy}=-1{,}5854\\cdot10^{-4}\\quad \\varepsilon_{xz}=4{,}7561\\cdot10^{-4}\\quad \\varepsilon_{yz}=-2{,}2829\\cdot10^{-4}',
      caption: 'Porównanie zapisu inżynierskiego γ_ij z tensorem ε_ij = γ_ij/2.',
      visual: 'cube',
      focus: { metric: 'convention' },
      emphasis: 'Dalej konsekwentnie używamy tensora ε_ij, czyli połowy γ.',
    },
    {
      title: '8. Tensor odkształcenia',
      narration:
        'Po wpisaniu odkształceń normalnych na przekątną i połówek γ poza przekątną otrzymujemy pełny tensor. Wszystkie wartości podano w mnożniku 10⁻⁴, dlatego w macierzy zapisujemy 4,5659 zamiast 0,00045659. Macierz jest symetryczna: ε_ij = ε_ji.',
      formula:
        '\\boldsymbol{\\varepsilon}=\\begin{bmatrix}4{,}5659&-1{,}5854&4{,}7561\\\\-1{,}5854&-3{,}9951&-2{,}2829\\\\4{,}7561&-2{,}2829&0{,}9512\\end{bmatrix}\\cdot10^{-4}',
      caption: 'Końcowy tensor odkształcenia ε_ij z jednostką zapisaną jako mnożnik 10⁻⁴.',
      visual: 'cube',
      focus: { metric: 'tensor' },
    },
    {
      title: '9. Kontrola symetrii i jednostek',
      narration:
        'Sprawdzamy pary pozaprzekątniowe: ε_xy = ε_yx, ε_xz = ε_zx oraz ε_yz = ε_zy. Ślad tensora 4,5659 − 3,9951 + 0,9512 = 1,5220·10⁻⁴ zgadza się z odkształceniem objętościowym (1 − 2ν)(σ_x + σ_y + σ_z)/E. Odkształcenie jest bezwymiarowe, a zapis ·10⁻⁴ opisuje tylko mnożnik.',
      formula:
        '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=1{,}5220\\cdot10^{-4}\\\\ \\theta=\\frac{(1-2\\nu)(\\sigma_x+\\sigma_y+\\sigma_z)}{E}=1{,}5220\\cdot10^{-4}',
      caption: 'Sprawdzenie symetrii, śladu tensora oraz zgodności jednostek.',
      visual: 'cube',
      focus: { metric: 'check' },
      emphasis: 'Symetria i ślad potwierdzają poprawność tensora.',
    },
  ]
}

export function createStrainTensorSolution(task: StrainTensorTask): Omit<SolutionData, 'animation'> {
  return {
    id: task.id,
    title: task.title,
    duration: task.duration,
    given: task.given,
    result: task.result,
    scenes: strainTensorScenes(),
  }
}
