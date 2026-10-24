import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-twist-angle-3',
  title: 'Kąt skręcenia i sztywność wału — przykład 3',
  duration: 7,
  given: ['T = 800 N·m', 'L = 1,5 m', 'G = 80 GPa', 'varphi_{dop} = 1,5°'],
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
      title: 'Krok 1',
      narration:
        'Dobierzmy średnicę wału pełnego, jeśli moment wynosi T = 800 N·m, długość L = 1,5 m, moduł G = 80 GPa, a dopuszczalny kąt skręcenia φ_dop = 1,5°. Najpierw przeliczamy kąt na radiany: φ_dop = 1,5 · π/180 = 0,02618 rad.',
      caption:
        'Dobierzmy średnicę wału pełnego, jeśli moment wynosi T = 800 N·m, długość L = 1,5 m, moduł G = 80 GPa, a dopuszczalny kąt…',
      visual: 'section',
      focus: {
        metric: 'load',
      },
      formula: 'T = 800\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Z warunku φ = TL/(GJ_o) ≤ φ_dop otrzymujemy J_o ≥ TL/(Gφ_dop). Podstawiamy T = 800 000 N·mm i L = 1500 mm: J_o ≥ 800 000 · 1500/(80 000 · 0,02618) = 572 941 mm^4.',
      caption:
        'Z warunku φ = TL/(GJ_o) ≤ φ_dop otrzymujemy J_o ≥ TL/(Gφ_dop). Podstawiamy T = 800 000 N·mm i L = 1500 mm: J_o ≥ 800 000 ·…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '\\varphi = TL/(GJ_o) \\le \\varphi_{dop}',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla wału pełnego J_o = π d^4/32, więc d ≥ √(32J_o/π) = √(5 836 100) = 49,15 mm. Najbliższa większa średnica handlowa to 50 mm.',
      caption:
        'Dla wału pełnego J_o = π d^4/32, więc d ≥ √(32J_o/π) = √(5 836 100) = 49,15 mm. Najbliższa większa średnica handlowa to 50 mm.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o = \\pi d^4/32',
    },
    {
      title: 'Krok 4',
      narration:
        'Sprawdzamy: J_o = π · 50^4/32 = 613 592 mm^4, więc φ = 800 000 · 1500/(80 000 · 613 592) = 0,02445 rad = 1,40°. Warunek jest spełniony. Naprężenie wynosi 800 000/24 544 = 32,6 MPa i również pozostaje w zakresie sprężystym.',
      caption:
        'Sprawdzamy: J_o = π · 50^4/32 = 613 592 mm^4, więc φ = 800 000 · 1500/(80 000 · 613 592) = 0,02445 rad = 1,40°. Warunek jest…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o = \\pi \\cdot 50^4/32 = 613\\,592\\ \\text{mm}^4',
    },
    {
      title: 'Krok 5',
      narration:
        'Wariant odwrotny pokazuje, że warunek sztywności można przekształcić w wymaganie na średnicę. W praktyce oblicza się średnicę z obu warunków, wytrzymałości i sztywności, a następnie przyjmuje większą wartość. W tej lekcji sprawdzamy tylko kąt; pełną procedurę doboru rozwinie kolejna lekcja.',
      caption:
        'Wariant odwrotny pokazuje, że warunek sztywności można przekształcić w wymaganie na średnicę. W praktyce oblicza się średnicę z…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
    },
  ],
} satisfies SolutionData
