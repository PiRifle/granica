import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stepped-bars',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 1',
  duration: 7,
  given: ['N = 60 kN', 'A₁ = 300 mm', 'A₂ = 150 mm', 'A₃ = 250 mm'],
  result:
    'σ₁ = 200 MPa, σ₂ = 400 MPa, σ₃ = 240 MPa. Przekrój krytyczny to odcinek drugi, a przy σdop = 160 MPa każde pole musi wynosić co najmniej 375 mm².',
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
        area: 300,
        n: 60,
        sigma: 200,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 150,
        n: 60,
        sigma: 400,
      },
      {
        id: '3',
        label: '3',
        length: 1000,
        area: 250,
        n: 60,
        sigma: 240,
      },
    ],
    loads: [
      {
        node: 3,
        value: 60,
        label: 'N = 60 kN',
      },
    ],
    note: 'Długości nie są podane — odcinki są schematyczne.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Ponieważ nie ma obciążeń pośrednich, N₁ = N₂ = N₃ = +60 000 N.',
      caption: 'Ponieważ nie ma obciążeń pośrednich, N₁ = N₂ = N₃ = +60 000 N.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N_{1} = N_{2} = N_{3} = +60\\,000 N',
    },
    {
      title: 'Krok 2',
      narration: 'Dla pierwszego odcinka: σ₁ = 60 000/300 = 200 MPa.',
      caption: 'Dla pierwszego odcinka: σ₁ = 60 000/300 = 200 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: '\\sigma_{1} = 60\\,000/300 = 200 MPa',
    },
    {
      title: 'Krok 3',
      narration: 'Dla drugiego odcinka: σ₂ = 60 000/150 = 400 MPa.',
      caption: 'Dla drugiego odcinka: σ₂ = 60 000/150 = 400 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
      formula: '\\sigma_{2} = 60\\,000/150 = 400 MPa',
    },
    {
      title: 'Krok 4',
      narration: 'Dla trzeciego odcinka: σ₃ = 60 000/250 = 240 MPa.',
      caption: 'Dla trzeciego odcinka: σ₃ = 60 000/250 = 240 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '3' },
      formula: '\\sigma_{3} = 60\\,000/250 = 240 MPa',
    },
    {
      title: 'Krok 5',
      narration: 'Porównaj wartości bezwzględne: 400 MPa jest największe, więc decyduje odcinek drugi.',
      caption: 'Porównaj wartości bezwzględne: 400 MPa jest największe, więc decyduje odcinek drugi.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
    },
    {
      title: 'Krok 6',
      narration:
        'Sprawdź warunek wytrzymałości: wszystkie naprężenia przekraczają 160 MPa, więc żaden odcinek nie spełnia wymagania.',
      caption:
        'Sprawdź warunek wytrzymałości: wszystkie naprężenia przekraczają 160 MPa, więc żaden odcinek nie spełnia wymagania.',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 7',
      narration:
        'Wyznacz minimalne pola: 375, 375 i 375 mm². Dla stałej N i wspólnego σdop każde pole musi wynosić co najmniej 375 mm².',
      caption:
        'Wyznacz minimalne pola: 375, 375 i 375 mm². Dla stałej N i wspólnego σdop każde pole musi wynosić co najmniej 375 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
    },
  ],
} satisfies SolutionData
