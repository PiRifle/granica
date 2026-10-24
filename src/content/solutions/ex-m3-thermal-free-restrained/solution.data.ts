import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-thermal-free-restrained',
  title: 'Temperatura: swoboda i zablokowanie — przykład 1',
  duration: 7,
  given: ['L=8 m', 'alpha=12', 'E=200 GPa', 's=2 mm', 'T=35 K', 'A=600 mm²'],
  result:
    'Szyna wydłużyłaby się swobodnie o 3,36 mm, ale luz pozwala na 2 mm. Po zamknięciu szczeliny w szynie powstaje ściskanie około 34 MPa, a podpora działa siłą około 20,4 kN.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ThermalRailAnimation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'gap',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
      αΔT: '–',
      ΔL_T: 'mm',
    },
    segments: [
      {
        id: '1',
        label: '',
        length: 8000,
        area: 600,
        n: -20.4,
        sigma: -34,
        epsilon: 0.00025,
        deltaL: 2,
        thermalStrain: 0.00042,
        freeDeltaL: 3.36,
      },
    ],
    note: 'ΔT = 35 K, luz 2 mm; swobodne wydłużenie 3,36 mm, po zamknięciu luzu σ = −34 MPa.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowa szyna ma długość L = 8 m, pole A = 600 mm², E = 200 GPa i α = 12·10⁻⁶ 1/K. Prawy koniec dzieli od podpory luz s = 2 mm. Na razie temperatura się nie zmienia.',
      caption: 'L = 8000 mm, A = 600 mm², s = 2 mm; podpora jest 2 mm od końca szyny.',
      visual: 'thermal',
      focus: {
        metric: 'model',
      },
      formula: 'L=8000\\ \\text{mm},\\qquad A=600\\ \\text{mm}^2,\\qquad s=2\\ \\text{mm}',
    },
    {
      title: 'Swobodne wydłużenie',
      narration:
        'Najpierw pytamy, jak szyna wydłużyłaby się bez ograniczeń. Przy ΔT = 35 K swobodne wydłużenie wynosi ΔL_T = αLΔT = 12·10⁻⁶·8000·35 = 3,36 mm. Naprężenie pozostaje zerowe.',
      caption: 'Gdyby podpora nie ograniczała ruchu, szyna wydłużyłaby się o 3,36 mm bez naprężenia.',
      visual: 'thermal',
      focus: {
        metric: 'ΔL_T',
      },
      formula: '\\Delta L_T=\\alpha L\\Delta T=12\\cdot10^{-6}\\cdot8000\\cdot35=3{,}36\\ \\text{mm}',
    },
    {
      title: 'Luz zostaje zamknięty',
      narration:
        'Luz 2 mm jest mniejszy od 3,36 mm, więc szyna najpierw wydłuża się swobodnie o 2 mm, aż dotknie podpory. Do tego momentu naprężenie jest jeszcze zerowe.',
      caption: 'Szczelina 2 mm zamyka się; dalsze wydłużenie jest już blokowane.',
      visual: 'thermal',
      focus: {
        metric: 'gap',
      },
      formula: '\\Delta L=s=2\\ \\text{mm},\\qquad \\sigma=0',
    },
    {
      title: 'Zablokowana reszta wydłużenia',
      narration:
        'Po zamknięciu luzu pozostaje 3,36 − 2 = 1,36 mm swobodnego wydłużenia, którego podpora nie pozwala zrealizować. Odkształcenie mechaniczne wynosi ε_m = −1,36/8000 = −0,00017.',
      caption: 'Podpora blokuje 1,36 mm; to wymusza skrócenie mechaniczne ε_m = −0,00017.',
      visual: 'thermal',
      focus: {
        metric: 'ε',
      },
      formula: '\\varepsilon_m=-\\frac{1{,}36}{8000}=-0{,}00017',
    },
    {
      title: 'Naprężenie termiczne',
      narration:
        'Z prawa Hooke’a σ = Eε_m = 200 000·(−0,00017) = −34 MPa. Minus oznacza ściskanie: podpory ściskają szynę.',
      caption: 'Naprężenie ściskające wynosi około −34 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma=E\\varepsilon_m=200\\,000\\cdot(-0{,}00017)=-34\\ \\text{MPa}',
    },
    {
      title: 'Reakcja i kontrola',
      narration:
        'Przy polu A = 600 mm² reakcja wynosi R = σA = −20 400 N ≈ −20,4 kN. Bez luzu naprężenie byłoby równe −EαΔT = −84 MPa, więc szczelina zmniejszyła je ponad dwukrotnie.',
      caption: 'Reakcja około 20,4 kN; bez luzu byłoby −84 MPa, z luzem tylko −34 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'check',
      },
      formula:
        'R=\\sigma A=-34\\cdot600=-20\\,400\\ \\text{N}\\approx-20{,}4\\ \\text{kN}\\qquad -E\\alpha\\Delta T=-84\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
