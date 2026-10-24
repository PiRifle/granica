import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-shaft-design-3',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 3',
  duration: 7,
  given: ['D = 90 mm', 'd = 70 mm', 'G = 80 GPa', 'tau_{dop} = 40 MPa', 'L = 2,5 m'],
  result:
    'Wariant odwrotny pokazuje, że ten sam przekrój może mieć różne ograniczenia w zależności od długości i wymaganego kąta. Dla krótkiego wału częściej decyduje wytrzymałość, a dla długiego sztywność. Projektant powinien sprawdzić oba warunki i wiedzieć, który z nich jest aktywny.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShaftCapacityAnimation }))),
  figure: {
    kind: 'section',
    width: 90,
    height: 90,
    parts: [
      {
        x: 0,
        y: 0,
        width: 90,
        height: 90,
        label: 'rura ∅90',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 45,
        cy: 45,
        r: 35,
        label: '∅70',
      },
    ],
    centroid: {
      x: 45,
      y: 45,
    },
    values: [
      {
        label: 'D',
        value: '90 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd',
        value: '70 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'L',
        value: '2500 mm',
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
        label: 'τ_dop',
        value: '40 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'J_o',
        value: '4 084 070 mm⁴',
        focus: 'design',
      },
      {
        label: 'W_o',
        value: '90 757 mm³',
        focus: 'design',
      },
      {
        label: 'T z wytrzymałości',
        value: '3,63 kN·m',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'T ze sztywności',
        value: '2,28 kN·m',
        focus: 'design',
      },
      {
        label: 'T_max',
        value: '2,28 kN·m',
        focus: 'design',
      },
      {
        label: 'τ przy T_max',
        value: '25,1 MPa',
        focus: 'stress',
        reveal: 3,
      },
    ],
    note: 'Dla długiego wału o D = 90 mm i d = 70 mm o nośności decyduje sztywność.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Mamy istniejący wał rurowy o D = 90 mm i d = 70 mm, wykonany ze stali o G = 80 GPa. Dopuszczalne naprężenie wynosi 40 MPa, a dopuszczalny kąt to 1° na długości 2,5 m. Szukamy maksymalnego momentu, jaki można bezpiecznie przenieść.',
      caption: 'Model: przekrój i długość są znane, a moment T jest niewiadomą.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'D=90\\ \\text{mm},\\quad d=70\\ \\text{mm},\\quad L=2500\\ \\text{mm},\\quad \\varphi_{dop}=1^\\circ=0{,}017453\\ \\text{rad}',
    },
    {
      title: 'Geometria przekroju',
      narration:
        'Najpierw obliczamy geometrię: 90⁴ − 70⁴ = 41 600 000 mm⁴, więc J_o = π · 41 600 000/32 = 4 084 070 mm⁴. Wskaźnik wytrzymałości wynosi W_o = J_o/45 = 90 757 mm³.',
      caption: 'Pierścień ma ściankę 10 mm. J_o opisuje sztywność, a W_o nośność przekroju.',
      visual: 'section',
      focus: {
        metric: 'geometry',
      },
      formula:
        'J_o=\\frac{\\pi(90^4-70^4)}{32}=4\\,084\\,070\\ \\text{mm}^4,\\qquad W_o=\\frac{J_o}{45}=90\\,757\\ \\text{mm}^3',
    },
    {
      title: 'Nośność z wytrzymałości',
      narration:
        'Z warunku wytrzymałości T ≤ τ_dop · W_o = 40 · 90 757 = 3 630 280 N·mm, czyli około 3,63 kN·m. To wartość dopuszczalna tylko ze względu na naprężenie.',
      caption: 'Warunek wytrzymałości pozwala przenieść 3,63 kN·m, ale nie mówi jeszcze nic o kącie skręcenia.',
      visual: 'section',
      focus: {
        metric: 'strength',
      },
      formula:
        'T \\le \\tau_{dop}W_o = 40 \\cdot 90\\,757 = 3\\,630\\,280\\ \\text{N}\\cdot\\text{mm} = 3{,}63\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Nośność ze sztywności',
      narration:
        'Po zamianie 1° = 0,017453 rad warunek sztywności daje T ≤ G · J_o · φ_dop/L = 80 000 · 4 084 070 · 0,017453/2500 = 2 281 000 N·mm, czyli około 2,28 kN·m.',
      caption:
        'Sztywność ogranicza moment do 2,28 kN·m. To mniej niż 3,63 kN·m, więc o bezpiecznym obciążeniu decyduje kąt skręcenia.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula:
        'T \\le \\frac{GJ_o\\varphi_{dop}}{L} = \\frac{80\\,000 \\cdot 4\\,084\\,070 \\cdot 0{,}017453}{2500} = 2\\,281\\,000\\ \\text{N}\\cdot\\text{mm} = 2{,}28\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Decyzja i sprawdzenie',
      narration:
        'Bezpieczny moment to min(3,63; 2,28) = 2,28 kN·m. Przy tej wartości naprężenie wynosi 2 281 000 · 45/4 084 070 = 25,1 MPa < 40 MPa, a kąt osiąga dokładnie 1°.',
      caption:
        'Decyduje sztywność. Zapas wytrzymałości jest duży, ale kąt jest już na granicy. Gdyby limit kąta zwiększyć do 2°, aktywny stałby się warunek wytrzymałości.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        'T_{max}=\\min(3{,}63;\\ 2{,}28)=2{,}28\\ \\text{kN}\\cdot\\text{m},\\qquad \\tau=\\frac{2\\,281\\,000 \\cdot 45}{4\\,084\\,070}=25{,}1\\ \\text{MPa}<40\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
