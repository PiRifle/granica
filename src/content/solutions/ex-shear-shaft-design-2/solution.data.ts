import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-shaft-design-2',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 2',
  duration: 7,
  given: ['k = d/D = 0,8', 'T = 2,2 kN·m', 'L = 1800 mm', 'G = 80 GPa', 'tau_{dop} = 45 MPa', 'varphi_{dop} = 1,2°'],
  result:
    'Pole rury to π(80^2-64^2)/4 = 1810 mm^2, a pole wału pełnego o średnicy 75 mm to 4418 mm^2. Rura zużywa więc około 59% mniej materiału, ale ma większą średnicę zewnętrzną i cieńszą ściankę. W ciasnej obudowie lub przy dużym momencie skręcającym z udarami trzeba dodatkowo sprawdzić stateczność i naprężenia lokalne.',
  figure: {
    kind: 'section',
    width: 80,
    height: 80,
    parts: [
      {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        label: 'rura ∅80',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 40,
        cy: 40,
        r: 32,
        label: '∅64',
      },
    ],
    centroid: {
      x: 40,
      y: 40,
    },
    values: [
      {
        label: 'T',
        value: '2,2 kN·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'k = d/D',
        value: '0,8',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'D',
        value: '80 mm',
        focus: 'design',
      },
      {
        label: 'd',
        value: '64 mm',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 't',
        value: '8 mm',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'J_o',
        value: '2 374 140 mm⁴',
        focus: 'design',
      },
      {
        label: 'φ',
        value: '1,195°',
        focus: 'design',
      },
      {
        label: 'τ_max',
        value: '37,1 MPa',
        focus: 'stress',
        reveal: 3,
      },
      {
        label: 'A rury',
        value: '1 810 mm²',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'A wału pełnego',
        value: '4 418 mm²',
        focus: 'design',
      },
      {
        label: 'oszczędność',
        value: '59 %',
        focus: 'design',
        reveal: 4,
      },
    ],
    note: 'Rura ∅80/∅64 przy tej samej nośności zużywa znacznie mniej materiału niż wał pełny ∅75.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy teraz wał rurowy o stosunku średnic k = d/D = 0,8, przenoszący ten sam moment T = 2,2 kN·m przy L = 1,8 m. Parametry materiałowe i dopuszczalne pozostają bez zmian: G = 80 GPa, τ_dop = 45 MPa, φ_dop = 1,2°.',
      caption:
        'Rozważmy teraz wał rurowy o stosunku średnic k = d/D = 0,8, przenoszący ten sam moment T = 2,2 kN·m przy L = 1,8 m. Parametry…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'k = d/D = 0{,}8',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla k = 0,8 mamy 1-k^4 = 1-0,4096 = 0,5904. Warunek wytrzymałości daje D ≥ ∛(16 · 2 200 000/(π · 45 · 0,5904)) = ∛(421 700) = 75,0 mm. Warunek sztywności daje D ≥ √(24 080 000/0,5904) = 79,9 mm.',
      caption:
        'Dla k = 0,8 mamy 1-k^4 = 1-0,4096 = 0,5904. Warunek wytrzymałości daje D ≥ ∛(16 · 2 200 000/(π · 45 · 0,5904)) = ∛(421 700) =…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'k = 0{,}8',
    },
    {
      title: 'Krok 3',
      narration:
        'Przyjmujemy D = 80 mm i d = 0,8 · 80 = 64 mm. Grubość ścianki wynosi 8 mm. Sprawdzamy: 80^4-64^4 = 40 960 000-16 777 216 = 24 182 784, więc J_o = π · 24 182 784/32 = 2 374 140 mm^4.',
      caption:
        'Przyjmujemy D = 80 mm i d = 0,8 · 80 = 64 mm. Grubość ścianki wynosi 8 mm. Sprawdzamy: 80^4-64^4 = 40 960 000-16 777…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'D = 80\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Wtedy φ = 3 960 000 000/(80 000 · 2 374 140) = 0,02085 rad = 1,195°, czyli tuż poniżej granicy. Naprężenie wynosi τ_max = 2 200 000 · 40/2 374 140 = 37,1 MPa, poniżej 45 MPa.',
      caption:
        'Wtedy φ = 3 960 000 000/(80 000 · 2 374 140) = 0,02085 rad = 1,195°, czyli tuż poniżej granicy. Naprężenie wynosi τ_max = 2…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        '\\varphi = 3\\,960\\,000\\,000/(80\\,000 \\cdot 2\\,374\\,140) = 0{,}02085\\ \\text{rad} = 1{,}195^\\circ',
    },
    {
      title: 'Krok 5',
      narration:
        'Pole rury to π(80^2-64^2)/4 = 1810 mm^2, a pole wału pełnego o średnicy 75 mm to 4418 mm^2. Rura zużywa więc około 59% mniej materiału, ale ma większą średnicę zewnętrzną i cieńszą ściankę. W ciasnej obudowie lub przy dużym momencie skręcającym z udarami trzeba dodatkowo sprawdzić stateczność i naprężenia lokalne.',
      caption:
        'Pole rury to π(80^2-64^2)/4 = 1810 mm^2, a pole wału pełnego o średnicy 75 mm to 4418 mm^2. Rura zużywa więc około 59% mniej…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '\\pi(80^2-64^2)/4 = 1810\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
