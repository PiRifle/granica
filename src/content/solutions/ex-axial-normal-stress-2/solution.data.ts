import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-normal-stress-2',
  title: 'Naprężenie normalne: siła na przekroju — przykład 2',
  duration: 7,
  given: ['N=30 kN', 'A_1=300 mm²', 'A_2=150 mm²'],
  result:
    'Przy σdop = 160 MPa pierwszy pręt spełnia warunek, a drugi nie. Aby go spełnić, drugi pręt musiałby mieć pole co najmniej A_2,min=30 000/160=187,5 mm². Dobór przekroju wymaga sprawdzenia każdego elementu osobno.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.NormalStressExample2Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Dwa niezależne pręty przenoszą tę samą siłę rozciągającą N = 30 kN. Pierwszy ma pole A₁ = 300 mm², drugi A₂ = 150 mm². Są to osobne elementy, więc każdy analizujemy z osobna.',
      caption: 'Dwa niezależne pręty o tej samej sile N i różnych polach.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'N=30\\ \\text{kN},\\qquad A_1=300\\ \\text{mm}^2,\\qquad A_2=150\\ \\text{mm}^2',
    },
    {
      title: 'Ta sama siła w obu prętach',
      narration:
        'Na oba pręty działa ta sama siła osiowa N = 30 kN. Przekrój każdego pręta przenosi więc identyczną wypadkową sił wewnętrznych. Różnica pojawi się dopiero po podzieleniu przez pole.',
      caption: 'N₁ = N₂ = +30 kN; siła jest jednakowa, ale pola są różne.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N_1=N_2=30\\ \\text{kN}',
    },
    {
      title: 'Pręt 1: σ₁ = 100 MPa',
      narration:
        'Dla pierwszego pręta σ₁ = 30 000/300 = 100 MPa. Naprężenie jest rozciągające, a strzałki na przekroju mają jednakową długość, bo rozkład jest równomierny.',
      caption: 'σ₁ = 100 MPa — połowa naprężenia drugiego pręta.',
      visual: 'axial',
      focus: { metric: 'sigma1' },
      formula: '\\sigma_1=\\frac{30\\,000}{300}=100\\ \\text{MPa}',
    },
    {
      title: 'Pręt 2: σ₂ = 200 MPa',
      narration:
        'Dla drugiego pręta σ₂ = 30 000/150 = 200 MPa. Przy tej samej sile mniejsze pole daje dwa razy większe naprężenie. To nie siła, lecz iloraz N/A decyduje o wytężeniu.',
      caption: 'σ₂ = 200 MPa — dwa razy większe naprężenie przy tej samej sile.',
      visual: 'axial',
      focus: { metric: 'sigma2' },
      formula: '\\sigma_2=\\frac{30\\,000}{150}=200\\ \\text{MPa}',
    },
    {
      title: 'Porównanie i warunek',
      narration:
        'Przy σdop = 160 MPa pierwszy pręt spełnia warunek, a drugi nie. Aby go spełnić, drugi pręt musiałby mieć pole co najmniej A₂,min = 30 000/160 = 187,5 mm². Każdy element sprawdzamy osobno — równoległe ustawienie nie oznacza równego podziału naprężeń.',
      caption: '100 MPa ≤ 160 MPa < 200 MPa; potrzeba A₂,min = 187,5 mm².',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: 'A_{2,\\min}=\\frac{30\\,000}{160}=187{,}5\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
