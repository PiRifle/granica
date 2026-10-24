import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-stepped-bars-3',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 3',
  duration: 7,
  given: ['N₁ = +45 kN', 'N₂ = +30 kN', 'N₃ = −20 kN', 'σdop = 150 MPa'],
  result:
    'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła 20 kN nie spowoduje wyboczenia przy założonej długości i sposobie zamocowania. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedBarsExample3Animation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 1000,
        area: 314.2,
        n: 45,
        sigma: 143.3,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 201.1,
        n: 30,
        sigma: 149.2,
      },
      {
        id: '3',
        label: '3',
        length: 1000,
        area: 153.9,
        n: -20,
        sigma: -129.9,
      },
    ],
    loads: [
      {
        node: 1,
        value: 15,
        label: '15 kN',
      },
      {
        node: 2,
        value: 50,
        label: '50 kN',
      },
      {
        node: 3,
        value: 20,
        label: '20 kN',
      },
    ],
    note: 'Długości schematyczne; przyjęto średnice 20, 16 i 14 mm.',
  },
  scenes: [
    {
      title: 'Model i siły osiowe',
      narration:
        'Pręt ma trzy odcinki o siłach N₁ = +45 kN, N₂ = +30 kN i N₃ = −20 kN. Pierwsze dwa odcinki są rozciągane, a trzeci jest ściskany. Naprężenie dopuszczalne wynosi σdop = 150 MPa, a przekroje mają być kołowe.',
      caption: 'Trzy odcinki o znanych siłach osiowych; odcinek 3 jest ściskany.',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'N_1=+45\\ \\text{kN},\\quad N_2=+30\\ \\text{kN},\\quad N_3=-20\\ \\text{kN}',
    },
    {
      title: 'Dobór pól i średnic',
      narration:
        'Minimalne pola wyznaczamy z warunku wytrzymałości: A₁ ≥ 45 000/150 = 300 mm², A₂ ≥ 30 000/150 = 200 mm² oraz A₃ ≥ 20 000/150 = 133,3 mm². Dla przekroju kołowego d = √(4A/π), więc średnice wynoszą około 19,5, 16,0 i 13,0 mm. Przyjmujemy wymiary normalizowane 20, 16 i 14 mm.',
      caption: 'Przekroje kołowe: przyjęte średnice 20, 16 i 14 mm; pola 314,2, 201,1 i 153,9 mm².',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: 'A_{i,\\min}=\\frac{|N_i|}{\\sigma_{\\mathrm{dop}}},\\qquad d_i=\\sqrt{\\frac{4A_{i,\\min}}{\\pi}}',
    },
    {
      title: 'Naprężenie w odcinku 1',
      narration:
        'Po przyjęciu średnicy 20 mm pole pierwszego odcinka wynosi około 314,2 mm². Naprężenie wynosi σ₁ = 45 000/314,2 ≈ 143,3 MPa, czyli mieści się poniżej σdop.',
      caption: 'Odcinek 1: σ₁ ≈ 143,3 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '1',
      },
      formula: '\\sigma_1=\\frac{45\\,000}{314{,}2}\\approx143{,}3\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie w odcinku 2',
      narration:
        'Dla średnicy 16 mm pole wynosi około 201,1 mm², a naprężenie σ₂ = 30 000/201,1 ≈ 149,2 MPa. To największe naprężenie w pręcie, ale nadal nie przekracza 150 MPa.',
      caption: 'Odcinek 2: σ₂ ≈ 149,2 MPa — największe naprężenie, blisko σdop.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '2',
      },
      formula: '\\sigma_2=\\frac{30\\,000}{201{,}1}\\approx149{,}2\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie w odcinku 3',
      narration:
        'Dla średnicy 14 mm pole wynosi około 153,9 mm². Siła jest ściskająca, więc σ₃ = −20 000/153,9 ≈ −129,9 MPa. Znak ujemny oznacza ściskanie, a wartość bezwzględna jest mniejsza od σdop.',
      caption: 'Odcinek 3: σ₃ ≈ −129,9 MPa — ściskanie.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '3',
      },
      formula: '\\sigma_3=\\frac{-20\\,000}{153{,}9}\\approx-129{,}9\\ \\text{MPa}',
    },
    {
      title: 'Porównanie i kontrola ściskania',
      narration:
        'Największa wartość bezwzględna wynosi 149,2 MPa i jest mniejsza od σdop = 150 MPa, więc warunek naprężenia jest spełniony we wszystkich odcinkach. Odcinek trzeci jest jednak ściskany — przy dużej długości i smukłości trzeba dodatkowo sprawdzić wyboczenie. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
      caption: 'Wszystkie naprężenia poniżej 150 MPa; odcinek 3 wymaga kontroli stateczności.',
      emphasis: 'Odcinek 3 jest ściskany — wymaga kontroli wyboczenia.',
      visual: 'axial',
      focus: {
        metric: 'σmax',
      },
      formula: '|\\sigma|_{\\max}=149{,}2\\ \\text{MPa}<\\sigma_{\\mathrm{dop}}=150\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
