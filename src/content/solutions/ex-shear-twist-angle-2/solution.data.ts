import type { SolutionData } from '../../model'
import { ShearTwistAngle2Animation } from './animation'

export default {
  id: 'ex-shear-twist-angle-2',
  title: 'Kąt skręcenia i sztywność wału — przykład 2',
  duration: 7,
  animation: ShearTwistAngle2Animation,
  given: ['P = 30 kW', 'n = 1470 obr/min', 'd = 35 mm', 'L = 1 m', 'G = 80 GPa'],
  result:
    'W obliczeniach napędu trzeba też pamiętać o sprawności przekładni i o tym, że moment na wale nie jest stały w czasie rozruchu. Chwilowy moment rozruchowy może być kilkakrotnie większy od znamionowego, co zwiększa zarówno naprężenie, jak i kąt. Model statyczny opisuje pracę ustaloną, a nie udar ani gwałtowne przyspieszanie.',
  figure: {
    kind: 'section',
    width: 35,
    height: 35,
    parts: [
      {
        x: 0,
        y: 0,
        width: 35,
        height: 35,
        label: 'wał ∅35',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 17.5,
      y: 17.5,
    },
    values: [
      {
        label: 'P',
        value: '30 kW',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'n',
        value: '1470 obr/min',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'd',
        value: '35 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1000 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'G',
        value: '80 GPa',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'ω',
        value: '153,94 rad/s',
        focus: 'load',
      },
      {
        label: 'T',
        value: '194,9 N·m',
        focus: 'load',
        reveal: 1,
      },
      {
        label: 'J_o',
        value: '147 324 mm⁴',
        focus: 'design',
      },
      {
        label: 'φ',
        value: '0,947°',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'τ_max',
        value: '23,1 MPa',
        focus: 'stress',
        reveal: 2,
      },
      {
        label: 'J_o (d = 40)',
        value: '251 327 mm⁴',
        focus: 'design',
        reveal: 3,
      },
      {
        label: 'φ (d = 40)',
        value: '0,555°',
        focus: 'design',
        reveal: 3,
      },
      {
        label: 'τ (d = 40)',
        value: '15,5 MPa',
        focus: 'stress',
        reveal: 3,
      },
    ],
    note: 'Zwiększenie średnicy z 35 do 40 mm wyraźnie zmniejsza kąt skręcenia i naprężenie.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wał napędowy przenosi moc P = 30 kW przy prędkości obrotowej n = 1470 obr/min. Średnica wynosi d = 35 mm, długość L = 1 m, a moduł ścinania G = 80 GPa.',
      caption: 'Model: wał napędowy obraca się i przenosi moment od napędu do odbiornika.',
      visual: 'beam',
      focus: { metric: 'P' },
      formula: 'P = 30\\ \\text{kW},\\quad n = 1470\\ \\text{obr/min},\\quad d = 35\\ \\text{mm}',
    },
    {
      title: 'Moment z mocy',
      narration:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2π n/60 = 2π · 1470/60 = 153,94 rad/s. Moment wynosi T = P/ω = 30 000/153,94 = 194,9 N·m, czyli 194 900 N·mm.',
      caption: 'Przy stałej mocy mniejsza prędkość obrotowa oznacza większy moment.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula:
        '\\omega = 2\\pi n/60 = 2\\pi \\cdot 1470/60 = 153{,}94\\ \\text{rad/s}\\quad T = P/\\omega = 30\\,000/153{,}94 = 194{,}9\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Sztywność i kąt skręcenia',
      narration:
        'Biegunowy moment bezwładności to J_o = π · 35^4/32 = 147 324 mm^4. Kąt skręcenia wynosi φ = 194 900 · 1000/(80 000 · 147 324) = 0,01654 rad, czyli około 0,947°. Maksymalne naprężenie to τ_max = 194 900/8418 = 23,1 MPa.',
      caption: 'Wał skręca się o 0,947° na długości 1 m; to już zauważalne w precyzyjnym napędzie.',
      visual: 'beam',
      focus: { metric: 'φ' },
      formula:
        'J_o = \\pi \\cdot 35^4/32 = 147\\,324\\ \\text{mm}^4\\quad \\varphi = 194\\,900 \\cdot 1000/(80\\,000 \\cdot 147\\,324) = 0{,}01654\\ \\text{rad} = 0{,}947^\\circ',
    },
    {
      title: 'Wariant średnicy',
      narration:
        'Gdyby średnicę zwiększyć do 40 mm, J_o wzrosłoby do 251 327 mm^4, a kąt spadłby do około 0,555°. Naprężenie spadłoby do około 15,5 MPa.',
      caption: 'Zwiększenie średnicy z 35 do 40 mm wyraźnie zmniejsza kąt skręcenia.',
      visual: 'beam',
      focus: { metric: 'd' },
      formula:
        'd = 40\\ \\text{mm}\\quad J_o = \\pi \\cdot 40^4/32 = 251\\,327\\ \\text{mm}^4\\quad \\varphi = 194\\,900 \\cdot 1000/(80\\,000 \\cdot 251\\,327) = 0{,}555^\\circ',
    },
    {
      title: 'Naprężenie i wniosek',
      narration:
        'Naprężenie jest niewielkie, ale kąt bliski jednemu stopniowi na metr bywa już problemem. Przy tej samej mocy mniejsza prędkość oznacza większy moment, a więc większe naprężenie i większy kąt. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych.',
      caption: 'Kąt i naprężenie sprawdzamy niezależnie; model statyczny nie opisuje udaru ani rozruchu.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\tau_{max} = \\frac{194\\,900 \\cdot 17{,}5}{147\\,324} = 23{,}1\\ \\text{MPa}\\quad \\tau_{max,d=40} = \\frac{194\\,900 \\cdot 20}{251\\,327} = 15{,}5\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
