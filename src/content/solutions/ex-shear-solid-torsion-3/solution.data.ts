import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-solid-torsion-3',
  title: 'Skręcanie wału pełnego — przykład 3',
  duration: 7,
  given: ['T = 800 N·m', 'tau_{dop} = 40 MPa', 'G = 80 GPa', 'varphi_{dop} = 1°/m'],
  result:
    'To bardzo typowa sytuacja w projektowaniu wałów. Warunek wytrzymałości daje średnicę minimalną, ale dopiero warunek sztywności często wymusza wymiar większy. W lekcji o kącie skręcenia zobaczysz tę procedurę dokładniej, a w lekcji o doborze średnicy połączysz oba warunki w pełny algorytm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolidTorsionDesignAnimation }))),
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
        label: 'τ_dop',
        value: '40 MPa',
        focus: 'stress',
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
        value: '1°/m',
        focus: 'design',
        reveal: 0,
      },
    ],
    note: 'Dwa niezależne warunki projektowe: wytrzymałość i sztywność.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Dane do doboru średnicy',
      narration:
        'Dobieramy średnicę wału pełnego dla momentu T = 800 N·m. Dopuszczalne naprężenie wynosi τ_dop = 40 MPa, a dopuszczalny kąt skręcenia φ_dop = 1° na metr. Moduł ścinania G = 80 GPa.',
      caption: 'Dwa niezależne warunki: wytrzymałość i sztywność.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'T = 800\\ \\text{N}\\cdot\\text{m}, \\quad \\tau_{dop} = 40\\ \\text{MPa}, \\quad \\varphi_{dop} = 1^\\circ/\\text{m}',
    },
    {
      title: 'Średnica z warunku wytrzymałości',
      narration:
        'Ze wzoru τ_max = 16T/(πd³) otrzymujemy d ≥ ∛(16T/(πτ_dop)). Po podstawieniu T = 800 000 N·mm mamy d ≥ ∛(101 859) = 46,7 mm. Najbliższa większa średnica handlowa to 48 mm.',
      caption: 'Przekrój rośnie od wartości próbnej do wymaganej średnicy minimalnej i przyjętych 48 mm.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'd \\ge \\sqrt[3]{\\frac{16T}{\\pi \\tau_{dop}}} = 46{,}7\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie naprężeń dla 48 mm',
      narration:
        'Dla d = 48 mm wskaźnik wytrzymałości wynosi W_o = 21 714,4 mm³, a τ_max = 800 000/21 714,4 = 36,85 MPa. Jest to poniżej 40 MPa, więc warunek wytrzymałości jest spełniony.',
      caption: 'Rozkład naprężeń pozostaje liniowy; maksimum 36,85 MPa leży poniżej τ_dop.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau_{max} = \\frac{800\\,000}{21\\,714{,}4} = 36{,}85\\ \\text{MPa} < 40\\ \\text{MPa}',
    },
    {
      title: 'Średnica z warunku sztywności',
      narration:
        'Dla φ_dop = 0,01745 rad/m warunek φ = TL/(GJ_o) ≤ φ_dop daje d ≥ √[4](32TL/(πGφ_dop)). Dla L = 1000 mm i G = 80 000 MPa otrzymujemy d ≥ √[4](5 836 000) = 49,15 mm, czyli więcej niż 46,7 mm.',
      caption: 'O średnicy decyduje sztywność: 49,15 mm > 46,7 mm.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula: 'd \\ge \\sqrt[4]{\\frac{32 T L}{\\pi G \\varphi_{dop}}} = 49{,}15\\ \\text{mm}',
    },
    {
      title: 'Średnica przyjęta i sprawdzenie',
      narration:
        'Przyjmujemy d = 50 mm, bo to większa z dwóch średnic. Wtedy W_o = 24 543,7 mm³, więc τ_max = 32,6 MPa, a φ = 0,0163 rad/m, czyli 0,93° na metr. Oba warunki są spełnione, a o wyborze zadecydowała sztywność.',
      caption: 'Przy 50 mm naprężenie i kąt skręcenia mieszczą się w dopuszczalnych wartościach.',
      visual: 'section',
      focus: {
        metric: 'result',
      },
      formula:
        'd = 50\\ \\text{mm}: \\quad \\tau_{max} = 32{,}6\\ \\text{MPa}, \\quad \\varphi = 0{,}93^\\circ/\\text{m}',
    },
  ],
} satisfies SolutionData
