import type { SolutionData } from '../../model'
import { ShaftDesignHollowAnimation } from './animation'

export default {
  id: 'ex-shear-shaft-design-2',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 2',
  duration: 7,
  given: ['k = d/D = 0,8', 'T = 2,2 kN·m', 'L = 1800 mm', 'G = 80 GPa', 'tau_{dop} = 45 MPa', 'varphi_{dop} = 1,2°'],
  result:
    'Pole rury to π(80^2-64^2)/4 = 1810 mm^2, a pole wału pełnego o średnicy 75 mm to 4418 mm^2. Rura zużywa więc około 59% mniej materiału, ale ma większą średnicę zewnętrzną i cieńszą ściankę. W ciasnej obudowie lub przy dużym momencie skręcającym z udarami trzeba dodatkowo sprawdzić stateczność i naprężenia lokalne.',
  animation: ShaftDesignHollowAnimation,
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
      title: 'Model i dane',
      narration:
        'Rozważamy wał rurowy o stosunku średnic k = d/D = 0,8. Przenosi ten sam moment T = 2,2 kN·m przy L = 1,8 m. Parametry materiałowe i dopuszczalne pozostają bez zmian: G = 80 GPa, τ_dop = 45 MPa, φ_dop = 1,2°.',
      caption: 'Model: rura o nieznanej średnicy zewnętrznej D i średnicy wewnętrznej d = 0,8D.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'k=d/D=0{,}8,\\quad d=0{,}8D,\\quad T=2\\,200\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Dla k = 0,8 mamy 1 − k⁴ = 1 − 0,4096 = 0,5904. Warunek wytrzymałości daje D ≥ ∛(16 · 2 200 000/(π · 45 · 0,5904)) = ∛(421 700) = 75,0 mm.',
      caption:
        'Pusta część przekroju nie przenosi naprężeń, więc ta sama nośność wymaga większej średnicy zewnętrznej niż w wale pełnym.',
      visual: 'section',
      focus: {
        metric: 'strength',
      },
      formula:
        'D \\ge \\sqrt[3]{\\frac{16 \\cdot 2\\,200\\,000}{\\pi \\cdot 45 \\cdot (1-0{,}8^4)}} = \\sqrt[3]{421\\,700} = 75{,}0\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Warunek sztywności daje D ≥ ∜(32 · 2 200 000 · 1800/(π · 80 000 · 0,020944 · 0,5904)) = ∜(40 773 000) = 79,9 mm. To więcej niż 75,0 mm, więc decyduje sztywność.',
      caption:
        'Sztywność wymaga D = 79,9 mm. Rura musi mieć większą średnicę zewnętrzną niż wynikałoby to z samej wytrzymałości.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula:
        'D \\ge \\sqrt[4]{\\frac{32 \\cdot 2\\,200\\,000 \\cdot 1800}{\\pi \\cdot 80\\,000 \\cdot 0{,}020944 \\cdot (1-0{,}8^4)}} = \\sqrt[4]{40\\,773\\,000} = 79{,}9\\ \\text{mm}',
    },
    {
      title: 'Wybór i sprawdzenie',
      narration:
        'Przyjmujemy D = 80 mm i d = 0,8 · 80 = 64 mm, czyli ściankę 8 mm. Wtedy J_o = π · (80⁴ − 64⁴)/32 = 2 374 140 mm⁴, φ = 1,195° < 1,2°, a τ_max = 37,1 MPa < 45 MPa.',
      caption:
        'D = 80 mm spełnia oba warunki. Kąt jest jednak bardzo blisko granicy, dlatego zapas sztywności jest mały.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        'D=80\\ \\text{mm},\\quad d=64\\ \\text{mm},\\quad \\varphi=1{,}195^\\circ<1{,}2^\\circ,\\quad \\tau_{max}=37{,}1\\ \\text{MPa}<45\\ \\text{MPa}',
    },
    {
      title: 'Materiał i gabaryt',
      narration:
        'Pole rury to π(80² − 64²)/4 = 1810 mm², a pole wału pełnego o średnicy 75 mm to 4418 mm². Rura zużywa więc około 59% mniej materiału, ale ma większą średnicę zewnętrzną i cieńszą ściankę.',
      caption:
        'Mniej materiału nie znaczy mniejszy gabaryt. Trzeba jeszcze sprawdzić stateczność cienkiej ścianki i naprężenia lokalne.',
      visual: 'section',
      focus: {
        metric: 'material',
      },
      formula:
        'A_r=\\frac{\\pi(80^2-64^2)}{4}=1810\\ \\text{mm}^2,\\qquad A_s=\\frac{\\pi \\cdot 75^2}{4}=4418\\ \\text{mm}^2,\\qquad \\frac{A_r}{A_s}\\approx0{,}41',
    },
  ],
} satisfies SolutionData
