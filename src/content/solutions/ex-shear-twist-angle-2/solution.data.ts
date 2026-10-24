import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-twist-angle-2',
  title: 'Kąt skręcenia i sztywność wału — przykład 2',
  duration: 7,
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
      title: 'Krok 1',
      narration:
        'Rozważmy wał napędowy przenoszący moc P = 30 kW przy prędkości obrotowej n = 1470 obr/min. Średnica wału wynosi d = 35 mm, długość L = 1 m, a moduł ścinania G = 80 GPa.',
      caption:
        'Rozważmy wał napędowy przenoszący moc P = 30 kW przy prędkości obrotowej n = 1470 obr/min. Średnica wału wynosi d = 35 mm,…',
      visual: 'section',
      focus: {
        metric: 'load',
      },
      formula: 'P = 30\\ \\text{kW}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2π n/60 = 2π · 1470/60 = 153,94 rad/s. Moment wynosi T = P/ω = 30 000/153,94 = 194,9 N·m, czyli 194 900 N·mm.',
      caption:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2π n/60 = 2π · 1470/60 = 153,94 rad/s. Moment wynosi T = P/ω = 30…',
      visual: 'section',
      focus: {
        metric: 'load',
      },
      formula: '\\omega = 2\\pi n/60 = 2\\pi \\cdot 1470/60 = 153{,}94\\ \\text{rad/s}',
    },
    {
      title: 'Krok 3',
      narration:
        'Biegunowy moment bezwładności to J_o = π · 35^4/32 = 147 324 mm^4. Kąt skręcenia wynosi φ = 194 900 · 1000/(80 000 · 147 324) = 0,01654 rad, czyli około 0,947°. Maksymalne naprężenie to τ_max = 194 900/8418 = 23,1 MPa.',
      caption:
        'Biegunowy moment bezwładności to J_o = π · 35^4/32 = 147 324 mm^4. Kąt skręcenia wynosi φ = 194 900 · 1000/(80 000 · 147 324) =…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o = \\pi \\cdot 35^4/32 = 147\\,324\\ \\text{mm}^4',
    },
    {
      title: 'Krok 4',
      narration:
        'Naprężenie jest niewielkie, ale kąt bliski jednemu stopniowi na metr może już być zauważalny w precyzyjnym napędzie. Gdyby średnicę zwiększyć do 40 mm, J_o wzrosłoby do 251 327 mm^4, a kąt spadłby do około 0,555°. Naprężenie spadłoby do około 15,5 MPa.',
      caption:
        'Naprężenie jest niewielkie, ale kąt bliski jednemu stopniowi na metr może już być zauważalny w precyzyjnym napędzie. Gdyby…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '40\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration:
        'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy moment, a więc większe naprężenie i większy kąt. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych przenoszących tę samą moc.',
      caption:
        'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
    },
    {
      title: 'Krok 6',
      narration:
        'W obliczeniach napędu trzeba też pamiętać o sprawności przekładni i o tym, że moment na wale nie jest stały w czasie rozruchu. Chwilowy moment rozruchowy może być kilkakrotnie większy od znamionowego, co zwiększa zarówno naprężenie, jak i kąt. Model statyczny opisuje pracę ustaloną, a nie udar ani gwałtowne przyspieszanie.',
      caption:
        'W obliczeniach napędu trzeba też pamiętać o sprawności przekładni i o tym, że moment na wale nie jest stały w czasie rozruchu.…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
    },
  ],
} satisfies SolutionData
