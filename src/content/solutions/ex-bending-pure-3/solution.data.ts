import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-pure-3',
  title: 'Czyste zginanie — przykład 3',
  duration: 7,
  given: ['b = 40 mm', 'h = 80 mm', 'E = 200 GPa', 'sigma_{dop} = 160 MPa'],
  result:
    'Kontrola stanu granicznego: I = 40 · 80^3/12 = 1,707 · 10^6 mm⁴, więc κ = 6,83 · 10^6/(200,000 · 1,707 · 10^6) = 2,0 · 10^-5 1/mm. Promień krzywizny to około 50 m, a odkształcenie skrajne ε = 160/200,000 = 8 · 10^-4. Naprężenie, odkształcenie i krzywizna są spójne i mieszczą się w zakresie sprężystym stali.',
  figure: {
    kind: 'beam',
    length: 3,
    supports: [
      { at: 0, label: 'A' },
      { at: 3, label: 'B' },
    ],
    pointLoads: [
      { at: 0.683, value: 10, label: 'P = 10 kN' },
      { at: 2.317, value: 10, label: 'P = 10 kN' },
    ],
    shear: [
      [
        [0, 10],
        [0.683, 10],
      ],
      [
        [0.683, 0],
        [2.317, 0],
      ],
      [
        [2.317, -10],
        [3, -10],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.683, 6.83],
      ],
      [
        [0.683, 6.83],
        [2.317, 6.83],
      ],
      [
        [2.317, 6.83],
        [3, 0],
      ],
    ],
    markers: [
      { x: 1.5, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 1.5, y: 6.83, text: 'M = 6,83 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '10,0 kN', focus: 'load' },
      { label: 'M_max', value: '6,83 kN·m', focus: 'M' },
      { label: 'W', value: '42 667 mm³', focus: 'design' },
      { label: 'I', value: '1,707·10⁶ mm⁴', focus: 'design' },
      { label: 'σ_dop', value: '160 MPa', focus: 'design' },
      { label: 'ρ', value: '50 m', focus: 'design' },
    ],
    note: 'Czteropunktowy układ zginania: między siłami T = 0 i M = 6,83 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy dopuszczalne naprężenie i przekrój, a szukamy największego momentu, jaki można bezpiecznie przyłożyć. Prostokąt ma b = 40 mm i h = 80 mm, materiał ma E = 200 GPa, a naprężenie dopuszczalne wynosi σ_dop = 160 MPa. Wtedy',
      caption:
        'Tym razem znamy dopuszczalne naprężenie i przekrój, a szukamy największego momentu, jaki można bezpiecznie przyłożyć. Prostokąt…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'b = 40 mm',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'W = (b h^2)/(6) = (40 · 80^2)/(6) = 42,667 mm^3, M_max = σ_dop W = 160 · 42,667 = 6,83 · 10^6 N·mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'W = \\frac{b h^2}{6} = \\frac{40 \\cdot 80^2}{6} = 42{,}667\\ \\text{mm}^3, \\qquad\nM_{\\max} = \\sigma_{dop} W = 160 \\cdot 42{,}667 = 6{,}83 \\cdot 10^6\\ \\text{N·mm}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Maksymalny moment wynosi więc około 6,83 kN·m. Jeżeli chcemy zrealizować go w układzie czteropunktowym z siłą P = 10 kN, ramię musi wynosić a = M/P = 0,683 m. Przy rozpiętości L = 3 m odcinek czystego zginania ma długość L - 2a = 1,63 m, więc rozwiązanie jest geometrycznie możliwe.',
      caption:
        'Maksymalny moment wynosi więc około 6,83 kN·m. Jeżeli chcemy zrealizować go w układzie czteropunktowym z siłą P = 10 kN, ramię…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P = 10 kN',
    },
    {
      title: 'Krok 4',
      narration:
        'Kontrola stanu granicznego: I = 40 · 80^3/12 = 1,707 · 10^6 mm⁴, więc κ = 6,83 · 10^6/(200,000 · 1,707 · 10^6) = 2,0 · 10^-5 1/mm. Promień krzywizny to około 50 m, a odkształcenie skrajne ε = 160/200,000 = 8 · 10^-4. Naprężenie, odkształcenie i krzywizna są spójne i mieszczą się w zakresie sprężystym stali.',
      caption:
        'Kontrola stanu granicznego: I = 40 · 80^3/12 = 1,707 · 10^6 mm⁴, więc κ = 6,83 · 10^6/(200,000 · 1,707 · 10^6) = 2,0 · 10^-5…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\kappa = 6{,}83 \\cdot 10^{6}/(200{,}000 \\cdot 1{,}707 \\cdot 10^{6}) = 2{,}0 \\cdot 10^{-5} 1/mm',
    },
  ],
} satisfies SolutionData
