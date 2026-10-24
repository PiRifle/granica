import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-stress-neutral-axis-2',
  title: 'Rozkład σ i oś obojętna — przykład 2',
  duration: 7,
  given: [],
  result:
    'Górna półka jest ściskana, a dolna krawędź środnika rozciągana. Mimo że górna półka jest szersza, to dolne włókno jest dalej od osi obojętnej, więc to ono decyduje o największym naprężeniu. Wniosek jest ogólny: w przekroju niesymetrycznym zawsze sprawdzaj oba skrajne włókna, bo „większy przekrój” nie oznacza automatycznie mniejszego naprężenia.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.BendingStressNeutralAxis2Animation })),
  ),
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 5, label: 'M = 5 kN·m' },
      { at: 4, value: 5, label: 'M = 5 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 5],
        [4, 5],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 5, text: 'M = 5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'A_1', value: '2000 mm²', focus: 'design' },
      { label: 'A_2', value: '1600 mm²', focus: 'design' },
      { label: 'ȳ', value: '32,22 mm', focus: 'design' },
      { label: 'c_g', value: '32,22 mm', focus: 'design' },
      { label: 'c_d', value: '67,78 mm', focus: 'design' },
      { label: 'I_z', value: '3,142·10⁶ mm⁴', focus: 'design' },
      { label: 'M', value: '5,0 kN·m', focus: 'M' },
      { label: 'σ_g', value: '-51,3 MPa', focus: 'design' },
      { label: 'σ_d', value: '107,9 MPa', focus: 'design' },
    ],
    note: 'Przekrój teowy jest niesymetryczny: decyduje dolne włókno, mimo że górna półka jest szersza.',
  },
  scenes: [
    {
      title: 'Przekrój i dane',
      narration:
        'Rozważmy przekrój teowy złożony z półki 100 × 20 mm i środnika 20 × 80 mm. Całkowita wysokość wynosi 100 mm, a moment zginający M = 5 kN·m. Taki przekrój nie jest symetryczny względem osi poziomej, więc oś obojętna nie leży w połowie wysokości.',
      caption: 'Przekrój teowy: półka 100 × 20 mm i środnik 20 × 80 mm, M = 5 kN·m.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_1=100\\cdot20=2000\\ \\text{mm}^2,\\qquad A_2=20\\cdot80=1600\\ \\text{mm}^2,\\qquad M=5\\ \\text{kN·m}',
    },
    {
      title: 'Środek ciężkości',
      narration:
        'Pole półki to 2000 mm², a jej środek ciężkości leży 10 mm od góry. Pole środnika to 1600 mm², a jego środek leży 60 mm od góry. Wspólny środek ciężkości wyznaczamy jako średnią ważoną pól.',
      caption: 'Wspólny środek ciężkości leży 32,22 mm od góry przekroju.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=\\frac{2000\\cdot10+1600\\cdot60}{3600}=32{,}22\\ \\text{mm}',
    },
    {
      title: 'Oś obojętna i ramiona',
      narration:
        'Oś obojętna przechodzi przez wspólny środek ciężkości. Do górnej krawędzi zostaje c_g = 32,22 mm, a do dolnej c_d = 100 − 32,22 = 67,78 mm. Oś jest więc znacznie bliżej szerszej półki.',
      caption: 'Oś obojętna jest bliżej górnej półki; dolne włókno leży dalej od osi.',
      visual: 'section',
      focus: { metric: 'distances' },
      formula: 'c_g=32{,}22\\ \\text{mm},\\qquad c_d=100-32{,}22=67{,}78\\ \\text{mm}',
    },
    {
      title: 'Liniowy rozkład naprężeń',
      narration:
        'Moment bezwładności liczymy twierdzeniem Steinera, sumując momenty części względem wspólnej osi obojętnej. Naprężenie rośnie liniowo od zera na osi: w półce jest ściskanie, a w dolnej części środnika rozciąganie.',
      caption: 'Naprężenie zmienia znak na osi obojętnej i rośnie liniowo w obie strony.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula:
        'I_z=66{,}667+2000\\cdot22{,}22^2+853{,}333+1600\\cdot27{,}78^2=3{,}142\\cdot10^6\\ \\text{mm}^4,\\qquad \\sigma(y)=\\frac{M y}{I_z}',
    },
    {
      title: 'Sprawdzenie obu skrajnych włókien',
      narration:
        'Górna półka jest ściskana, a dolna krawędź środnika rozciągana. Dolne włókno jest dalej od osi obojętnej, więc ma większe naprężenie bezwzględne. W przekroju niesymetrycznym trzeba sprawdzić oba skrajne włókna, bo większe pole półki nie gwarantuje mniejszego naprężenia.',
      caption: 'Decyduje dolne włókno: |σ_d| = 107,9 MPa > |σ_g| = 51,3 MPa.',
      visual: 'section',
      focus: { metric: 'extremes' },
      formula:
        '\\sigma_g=-\\frac{5\\cdot10^6\\cdot32{,}22}{3{,}142\\cdot10^6}=-51{,}3\\ \\text{MPa},\\qquad \\sigma_d=\\frac{5\\cdot10^6\\cdot67{,}78}{3{,}142\\cdot10^6}=107{,}9\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
