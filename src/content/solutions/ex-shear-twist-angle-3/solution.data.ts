import type { SolutionData } from '../../model'
import { ShearTwistAngle3Animation } from './animation'

export default {
  id: 'ex-shear-twist-angle-3',
  title: 'Kąt skręcenia i sztywność wału — przykład 3',
  duration: 7,
  animation: ShearTwistAngle3Animation,
  given: ['T = 800 N·m', 'L = 1,5 m', 'G = 80 GPa', 'φ_dop = 1,5°'],
  result:
    'Wariant odwrotny pokazuje, że warunek sztywności można przekształcić w wymaganie na średnicę. W praktyce oblicza się średnicę z obu warunków, wytrzymałości i sztywności, a następnie przyjmuje większą wartość. W tej lekcji sprawdzamy tylko kąt; pełną procedurę doboru rozwinie kolejna lekcja.',
  figure: {
    kind: 'section',
    width: 50,
    height: 50,
    parts: [
      {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        label: 'wał ∅50',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 25,
      y: 25,
    },
    values: [
      {
        label: 'T',
        value: '800 N·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1500 mm',
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
        label: 'φ_dop',
        value: '1,5°',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'J_o,min',
        value: '572 941 mm⁴',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'd_min',
        value: '49,15 mm',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'd',
        value: '50 mm',
        focus: 'design',
      },
      {
        label: 'J_o',
        value: '613 592 mm⁴',
        focus: 'design',
      },
      {
        label: 'φ',
        value: '1,40°',
        focus: 'design',
        reveal: 3,
      },
      {
        label: 'τ',
        value: '32,6 MPa',
        focus: 'stress',
        reveal: 3,
      },
    ],
    note: 'Warunek sztywności wymaga średnicy 49,15 mm; przyjęto 50 mm.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Dobierzmy średnicę wału pełnego, jeśli moment wynosi T = 800 N·m, długość L = 1,5 m, moduł G = 80 GPa, a dopuszczalny kąt skręcenia φ_dop = 1,5°. Średnica nie jest jeszcze znana.',
      caption: 'Model: wał utwierdzony w A, swobodny w B; szukamy średnicy, przy której kąt nie przekroczy limitu.',
      visual: 'beam',
      focus: { metric: 'P' },
      formula: 'T = 800\\ \\text{N}\\cdot\\text{m},\\quad L = 1{,}5\\ \\text{m},\\quad G = 80\\ \\text{GPa}',
    },
    {
      title: 'Kąt dopuszczalny w radianach',
      narration:
        'Najpierw przeliczamy kąt na radiany: φ_dop = 1,5 · π/180 = 0,02618 rad. Ta wartość wyznacza granicę na wykresie kąta i na przekroju końca B.',
      caption: 'Pomarańczowa linia to dopuszczalny obrót końca B; do niego będziemy porównywać wynik.',
      visual: 'beam',
      focus: { metric: 'φ_dop' },
      formula: '\\varphi_{dop} = 1{,}5 \\cdot \\pi/180 = 0{,}02618\\ \\text{rad}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Z warunku φ = TL/(GJ_o) ≤ φ_dop otrzymujemy J_o ≥ TL/(G φ_dop). Podstawiamy T = 800 000 N·mm i L = 1500 mm: J_o ≥ 800 000 · 1500/(80 000 · 0,02618) = 572 941 mm^4.',
      caption: 'Wymagana sztywność skrętna wyznacza minimalny biegunowy moment bezwładności.',
      visual: 'beam',
      focus: { metric: 'Jo' },
      formula:
        '\\varphi = TL/(GJ_o) \\le \\varphi_{dop}\\quad J_o \\ge \\frac{800\\,000 \\cdot 1500}{80\\,000 \\cdot 0{,}02618} = 572\\,941\\ \\text{mm}^4',
    },
    {
      title: 'Dobór średnicy',
      narration:
        'Dla wału pełnego J_o = π d^4/32, więc d ≥ (32J_o/π)^(1/4) = (5 836 100)^(1/4) = 49,15 mm. Najbliższa większa średnica handlowa to 50 mm.',
      caption: 'Przekrój rośnie do 50 mm, czyli powyżej wymaganego minimum 49,15 mm.',
      visual: 'beam',
      focus: { metric: 'd' },
      formula: 'J_o = \\pi d^4/32\\quad d \\ge \\sqrt[4]{32J_o/\\pi} = 49{,}15\\ \\text{mm}\\quad d = 50\\ \\text{mm}',
    },
    {
      title: 'Kontrola kąta i naprężenia',
      narration:
        'Sprawdzamy: J_o = π · 50^4/32 = 613 592 mm^4, więc φ = 800 000 · 1500/(80 000 · 613 592) = 0,02445 rad = 1,40°. To mniej niż 1,50°, więc warunek jest spełniony. Naprężenie wynosi 800 000/24 544 = 32,6 MPa.',
      caption: 'Rzeczywisty kąt 1,40° mieści się pod linią dopuszczalną 1,50°.',
      visual: 'beam',
      focus: { metric: 'φ' },
      formula:
        '\\varphi = \\frac{800\\,000 \\cdot 1500}{80\\,000 \\cdot 613\\,592} = 0{,}02445\\ \\text{rad} = 1{,}40^\\circ \\le 1{,}50^\\circ\\quad \\tau = \\frac{800\\,000}{24\\,544} = 32{,}6\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
