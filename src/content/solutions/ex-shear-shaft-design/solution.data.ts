import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-shaft-design',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 1',
  duration: 7,
  given: ['T = 2,2 kN·m', 'L = 1800 mm', 'G = 80 GPa', 'tau_{dop} = 45 MPa', 'varphi_{dop} = 1,2°'],
  result:
    'Przyjęto d = 75 mm. Oba warunki są spełnione: τ_max ≈ 26,6 MPa jest znacznie poniżej 45 MPa, a kąt 0,913° jest mniejszy od 1,2°. O doborze zadecydowała sztywność, nie wytrzymałość.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShaftDesignAnimation }))),
  figure: {
    kind: 'section',
    width: 75,
    height: 75,
    parts: [
      {
        x: 0,
        y: 0,
        width: 75,
        height: 75,
        label: 'wał ∅75',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 37.5,
      y: 37.5,
    },
    values: [
      {
        label: 'T',
        value: '2,2 kN·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1800 mm',
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
        value: '1,2°',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd z wytrzymałości',
        value: '62,91 mm',
        focus: 'design',
      },
      {
        label: 'd ze sztywności',
        value: '70,05 mm',
        focus: 'design',
      },
      {
        label: 'd przyjęte',
        value: '75 mm',
        focus: 'design',
      },
      {
        label: 'W_o',
        value: '82 808 mm³',
        focus: 'design',
      },
      {
        label: 'τ_max',
        value: '26,6 MPa',
        focus: 'stress',
        reveal: 4,
      },
      {
        label: 'J_o',
        value: '3 106 336 mm⁴',
        focus: 'design',
      },
      {
        label: 'φ',
        value: '0,913°',
        focus: 'design',
      },
    ],
    note: 'O doborze średnicy zadecydował warunek sztywności: 70,05 mm > 62,91 mm.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wał pełny przenosi moment T = 2,2 kN·m. Długość wynosi 1800 mm, moduł ścinania 80 GPa, naprężenie dopuszczalne 45 MPa, a kąt dopuszczalny 1,2°. Średnica nie jest jeszcze znana.',
      caption: 'Model: wał pełny o nieznanej średnicy. Moment zamieniamy na 2 200 000 N·mm, a kąt na 0,020944 rad.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'T=2\\,200\\,000\\ \\text{N}\\cdot\\text{mm},\\quad L=1800\\ \\text{mm},\\quad \\varphi_{dop}=1{,}2^\\circ=0{,}020944\\ \\text{rad}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Warunek wytrzymałości daje d ≥ ∛(16 · 2 200 000/(π · 45)) = ∛(248 989) = 62,91 mm. Przy tej średnicy naprężenie osiąga dokładnie 45 MPa.',
      caption:
        'Warunek wytrzymałości wyznacza średnicę 62,91 mm. To jeszcze nie koniec, bo wał może skręcać się zbyt mocno.',
      visual: 'section',
      focus: {
        metric: 'strength',
      },
      formula:
        'd \\ge \\sqrt[3]{\\frac{16 \\cdot 2\\,200\\,000}{\\pi \\cdot 45}} = \\sqrt[3]{248\\,989} = 62{,}91\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Warunek sztywności daje d ≥ ∜(32 · 2 200 000 · 1800/(π · 80 000 · 0,020944)) = ∜(24 080 000) = 70,05 mm. To więcej niż 62,91 mm.',
      caption:
        'Sztywność wymaga 70,05 mm. Przy średnicy 62,91 mm kąt byłby większy od dopuszczalnego, więc decyduje ten warunek.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula:
        'd \\ge \\sqrt[4]{\\frac{32 \\cdot 2\\,200\\,000 \\cdot 1800}{\\pi \\cdot 80\\,000 \\cdot 0{,}020944}} = \\sqrt[4]{24\\,080\\,000} = 70{,}05\\ \\text{mm}',
    },
    {
      title: 'Wybór średnicy',
      narration:
        'Wymagana średnica to maksimum z obu warunków: max(62,91; 70,05) = 70,05 mm. Przyjmujemy najbliższy większy wymiar handlowy 75 mm.',
      caption: 'Nie uśredniamy wyników. Wybieramy większą wartość 70,05 mm i zaokrąglamy w górę do 75 mm.',
      visual: 'section',
      focus: {
        metric: 'governing',
      },
      formula: 'd_{req}=\\max(62{,}91;\\ 70{,}05)=70{,}05\\ \\text{mm}\\quad\\Rightarrow\\quad d=75\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie',
      narration:
        'Sprawdzamy przyjęty wymiar. W_o = π · 75³/16 = 82 808 mm³, więc τ_max = 26,6 MPa < 45 MPa. J_o = π · 75⁴/32 = 3 106 336 mm⁴, więc φ = 0,01594 rad = 0,913° < 1,2°.',
      caption: 'Oba warunki są spełnione. Sztywność decyduje, ale przy 75 mm kąt spada poniżej granicy.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        '\\tau_{max}=\\frac{2\\,200\\,000}{82\\,808}=26{,}6\\ \\text{MPa}<45\\ \\text{MPa},\\qquad \\varphi=0{,}01594\\ \\text{rad}=0{,}913^\\circ<1{,}2^\\circ',
    },
  ],
} satisfies SolutionData
