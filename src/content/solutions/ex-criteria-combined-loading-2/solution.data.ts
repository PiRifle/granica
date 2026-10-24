import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-combined-loading-2',
  title: 'Zginanie, skręcanie i siła osiowa razem — przykład 2',
  duration: 7,
  given: ['N = -20 kN', 'M = 1,2 kN·m', 'T = 500 N·m'],
  result:
    'W zadaniach z mimośrodowym rozciąganiem lub ściskaniem warto więc narysować rozkład σ_x wzdłuż wysokości przekroju. Siła osiowa przesuwa cały wykres równolegle, a zginanie go obraca. Punkt decydujący to miejsce, w którym wypadkowa wartość jest najbardziej oddalona od zera. Dopiero po tym rysunku sensowne jest liczenie σ_red.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CombinedLoadingExample2Animation }))),
  figure: {
    kind: 'cube',
    stresses: {
      x: -63.66,
      y: 0,
      z: 0,
    },
    strains: {
      x: -0.0003183,
      y: 0.00009549,
      z: 0.00009549,
    },
    volumeChange: '−0,01273%',
    values: [
      {
        label: 'N',
        value: '−20 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'M',
        value: '1,2 kN·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'T',
        value: '500 N·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ_N',
        value: '−7,07 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_M',
        value: '±56,59 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_x (rozc.)',
        value: '49,52 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_x (ścisk.)',
        value: '−63,66 MPa',
        focus: 'stress',
      },
      {
        label: 'τ',
        value: '11,79 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_HMH (rozc.)',
        value: '53,6 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_HMH (ścisk.)',
        value: '66,9 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_T (ścisk.)',
        value: '67,9 MPa',
        focus: 'stress',
      },
      {
        label: 'n_HMH',
        value: '3,51',
        focus: 'stress',
      },
      {
        label: 'n_T',
        value: '3,46',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '−318,3 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '95,49 με',
        focus: 'strain',
      },
      {
        label: 'γ_xy',
        value: '153,3 μrad',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '−127,3 με',
        focus: 'volume',
      },
    ],
    note: 'Decyduje włókno ściskane, bo siła osiowa i zginanie działają w nim zgodnie.',
  },
  scenes: [
    {
      title: 'Zapisz obciążenia i badane włókna',
      narration:
        'Ten sam pręt o średnicy 60 mm jest teraz ściskany siłą N = −20 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 500 N·m. Sprawdzimy dwa przeciwległe włókna A i B, aby przekonać się, które decyduje.',
      caption: 'N = −20 kN, M = 1,2 kN·m, T = 500 N·m; badane włókna A i B.',
      visual: 'beam',
      focus: {
        metric: 'loads',
      },
      formula: 'N=-20\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=500\\,\\text{N·m}',
    },
    {
      title: 'Przesunięty rozkład naprężeń normalnych',
      narration:
        'Pole i wskaźniki są takie same jak poprzednio. Naprężenie od siły osiowej wynosi σ_N = −20 000/2 827 = −7,07 MPa i równomiernie przesuwa cały rozkład. Zginanie daje +56,59 MPa w włóknie A i −56,59 MPa w przeciwległym B. Po zsumowaniu A ma 49,52 MPa, a B −63,66 MPa, więc większy moduł występuje w włóknie ściskanym.',
      caption: 'σ_N = −7,07 MPa, σ_M = ±56,59 MPa; A: 49,52 MPa, B: −63,66 MPa.',
      visual: 'section',
      focus: {
        metric: 'normal',
      },
      formula: '\\sigma_x=49{,}52\\,\\text{MPa}\\quad\\text{lub}\\quad \\sigma_x=-63{,}66\\,\\text{MPa}',
    },
    {
      title: 'Dwa stany naprężenia: A i B',
      narration:
        'Ścinanie od skręcania wynosi τ = 500 000/42 412 = 11,79 MPa i ma ten sam moduł w obu włóknach, choć przeciwne zwroty. W każdym włóknie mamy więc parę σ_x i τ: (+49,52; 11,79) w A oraz (−63,66; 11,79) w B.',
      caption: 'A: σ_x = 49,52 MPa, τ = 11,79 MPa; B: σ_x = −63,66 MPa, τ = 11,79 MPa.',
      visual: 'section',
      focus: {
        metric: 'fibers',
      },
      formula:
        '\\sigma_x(A)=49{,}52\\,\\text{MPa},\\qquad \\sigma_x(B)=-63{,}66\\,\\text{MPa},\\qquad \\tau=11{,}79\\,\\text{MPa}',
    },
    {
      title: 'Wytężenie obu włókien',
      narration:
        'Dla włókna rozciąganego HMH daje √(49,52² + 3·11,79²) = 53,6 MPa, a dla ściskanego √(63,66² + 3·11,79²) = 66,9 MPa. Tresca w włóknie ściskanym daje √(63,66² + 4·11,79²) = 67,9 MPa. Decyduje więc włókno ściskane B.',
      caption: 'σ_HMH = 53,6 MPa (A) lub 66,9 MPa (B); σ_T = 67,9 MPa (B).',
      visual: 'diagram',
      focus: {
        metric: 'reduce',
      },
      formula:
        '\\sigma_{HMH}=\\sqrt{49{,}52^2+3\\cdot11{,}79^2}=53{,}6\\,\\text{MPa},\\qquad \\sigma_{HMH}=\\sqrt{63{,}66^2+3\\cdot11{,}79^2}=66{,}9\\,\\text{MPa},\\qquad \\sigma_T=\\sqrt{63{,}66^2+4\\cdot11{,}79^2}=67{,}9\\,\\text{MPa}',
    },
    {
      title: 'Kontrola zapasu i wniosek',
      narration:
        'Przy R_e = 235 MPa zapasy wynoszą n_HMH = 235/66,9 = 3,51 oraz n_T = 235/67,9 = 3,46. Oba przekraczają jedność. Ślad tensora w włóknie B jest ujemny, więc objętość nieznacznie maleje, ale o wyniku decyduje wytężenie.',
      caption: 'n_HMH = 3,51, n_T = 3,46; decyduje włókno ściskane B.',
      visual: 'diagram',
      focus: {
        metric: 'check',
      },
      formula: 'n_{HMH}=\\frac{235}{66{,}9}=3{,}51,\\qquad n_T=\\frac{235}{67{,}9}=3{,}46',
    },
  ],
} satisfies SolutionData
