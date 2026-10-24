import type { SolutionData } from '../../model'
import { FullTorsion1Animation } from './animation'

export default {
  id: 'ex-design-full-torsion',
  title: 'Pełne zadanie: wał pełny i drążony — przykład 1',
  duration: 7,
  given: ['T=1200 N·m', 'L=1200 mm', 'tau_{dop}=45 MPa', 'varphi_{dop}=1,5°', 'G=80 GPa', 'k=d/D=0,6'],
  result:
    'Wał pełny o d=55 mm spełnia oba warunki, a rura D=56 mm, d=34 mm jest o około 35 procent lżejsza przy nieco większym naprężeniu 40,3 MPa i kącie 1,24°.',
  figure: {
    kind: 'section',
    width: 56,
    height: 56,
    parts: [
      {
        x: 0,
        y: 0,
        width: 56,
        height: 56,
        label: 'rura ∅56',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 28,
        cy: 28,
        r: 17,
        label: '∅34',
      },
    ],
    centroid: {
      x: 28,
      y: 28,
    },
    values: [
      {
        label: 'T',
        value: '1200 N·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1200 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '45 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'φ_dop',
        value: '1,5°',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'k = d/D',
        value: '0,6',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd wału pełnego',
        value: '55 mm',
        focus: 'design',
      },
      {
        label: 'W_o wału pełnego',
        value: '32 668 mm³',
        focus: 'design',
      },
      {
        label: 'τ wału pełnego',
        value: '36,7 MPa',
        focus: 'stress',
        reveal: 6,
      },
      {
        label: 'φ wału pełnego',
        value: '1,15°',
        focus: 'design',
      },
      {
        label: 'D rury',
        value: '56 mm',
        focus: 'design',
      },
      {
        label: 'd rury',
        value: '34 mm',
        focus: 'design',
        reveal: 10,
      },
      {
        label: 'J_o rury',
        value: '834 300 mm⁴',
        focus: 'design',
        reveal: 10,
      },
      {
        label: 'W_o rury',
        value: '29 797 mm³',
        focus: 'design',
        reveal: 10,
      },
      {
        label: 'τ rury',
        value: '40,3 MPa',
        focus: 'stress',
        reveal: 10,
      },
      {
        label: 'φ rury',
        value: '1,24°',
        focus: 'design',
        reveal: 10,
      },
      {
        label: 'A wału pełnego',
        value: '2 376 mm²',
        focus: 'design',
      },
      {
        label: 'A rury',
        value: '1 555 mm²',
        focus: 'design',
      },
      {
        label: 'oszczędność',
        value: '35 %',
        focus: 'design',
        reveal: 11,
      },
    ],
    note: 'Rura ∅56/∅34 jest o około 35% lżejsza od wału pełnego ∅55 przy zbliżonych warunkach pracy.',
    shape: 'circle',
  },
  animation: FullTorsion1Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wał stalowy przenosi moment T = 1200 N·m na długości L = 1200 mm. Przyjmujemy τ_dop = 45 MPa, φ_dop = 1,5°, G = 80 GPa. Dla rury stosunek średnic wynosi α = d/D = 0,6.',
      caption: 'Znamy obciążenie, długość i materiał — średnica wału jest niewiadomą.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'T=1200\\ \\text{N}\\cdot\\text{m}=1\\,200\\,000\\ \\text{N}\\cdot\\text{mm},\\qquad L=1200\\ \\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration: 'Dla wału pełnego W_o,min = T/τ_dop = 1 200 000/45 = 26 667 mm³. Stąd d ≥ ∛(16T/(πτ_dop)) ≈ 51,4 mm.',
      caption: 'Z warunku naprężenia wał pełny wymaga d ≥ 51,4 mm.',
      visual: 'section',
      focus: {
        metric: 'strength',
      },
      formula:
        'W_{o,\\min}=T/\\tau_{\\mathrm{dop}}=1\\,200\\,000/45=26\\,667\\ \\text{mm}^3\\quad\\Rightarrow\\quad d\\ge51{,}4\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Kąt dopuszczalny φ_dop = 1,5·π/180 ≈ 0,02618 rad. Z warunku φ = TL/(GJ_o) ≤ φ_dop otrzymujemy J_o,min = TL/(Gφ_dop) ≈ 687 500 mm⁴, czyli d ≥ 51,5 mm.',
      caption: 'Sztywność daje praktycznie tę samą średnicę — trzeba sprawdzić oba warunki.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula:
        'J_{o,\\min}=\\frac{TL}{G\\varphi_{\\mathrm{dop}}}\\approx687\\,500\\ \\text{mm}^4\\quad\\Rightarrow\\quad d\\ge51{,}5\\ \\text{mm}',
    },
    {
      title: 'Wał pełny — wybór i kontrola',
      narration:
        'Przyjmujemy d = 55 mm. Wtedy W_o ≈ 32 668 mm³ i τ_max ≈ 36,7 MPa, a J_o ≈ 898 360 mm⁴ i φ ≈ 1,15° ≤ 1,5°. Oba warunki są spełnione.',
      caption: 'Średnica 55 mm spełnia wytrzymałość i sztywność; decyduje nieco większe wymaganie sztywności.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        '\\tau_{\\max}=\\frac{1\\,200\\,000}{32\\,668}\\approx36{,}7\\ \\text{MPa},\\qquad\\varphi\\approx1{,}15^\\circ\\le1{,}5^\\circ',
    },
    {
      title: 'Rura α = 0,6',
      narration:
        'Dla rury 1 − α⁴ = 0,8704. Z wytrzymałości D ≥ ∛(16T/[πτ_dop(1 − α⁴)]) ≈ 53,8 mm, a ze sztywności D ≥ 53,3 mm. Przyjmujemy D = 56 mm i d = 34 mm.',
      caption: 'Rura wymaga większej średnicy zewnętrznej, ale ma znacznie mniejsze pole przekroju.',
      visual: 'section',
      focus: {
        metric: 'hollow',
      },
      formula: 'D\\ge\\sqrt[3]{16T/[\\pi\\tau_{\\mathrm{dop}}(1-\\alpha^4)]}\\approx53{,}8\\ \\text{mm}',
    },
    {
      title: 'Porównanie pełny / drążony',
      narration:
        'Rura ∅56/∅34 ma τ_max ≈ 40,3 MPa i φ ≈ 1,24°, więc oba warunki są spełnione. Jej pole wynosi 1555 mm² wobec 2376 mm² wału pełnego — oszczędność około 35 procent.',
      caption: 'Przy podobnych naprężeniach i kącie rura jest o około 35% lżejsza, ale ma większą średnicę zewnętrzną.',
      visual: 'section',
      focus: {
        metric: 'compare',
      },
      formula:
        'A_{\\text{pełny}}=\\frac{\\pi\\cdot55^2}{4}\\approx2376\\ \\text{mm}^2,\\qquad A_{\\text{rura}}=\\frac{\\pi(56^2-34^2)}{4}\\approx1555\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
