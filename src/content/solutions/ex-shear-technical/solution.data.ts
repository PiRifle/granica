import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-technical',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 1',
  duration: 7,
  given: ['d = 20 mm', 'F = 30 kN'],
  result:
    'τ_sr ≈ 95,5 MPa. Wartość jest średnia po przekroju; w rzeczywistym sworzniu naprężenie może być lokalnie większe, szczególnie przy krawędzi blachy.',
  figure: {
    kind: 'section',
    width: 20,
    height: 20,
    parts: [
      {
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        label: 'sworzeń ∅20',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 10,
      y: 10,
    },
    values: [
      {
        label: 'd',
        value: '20 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'F',
        value: '30 kN',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'A',
        value: '314,16 mm²',
        focus: 'design',
      },
      {
        label: 'τ_sr',
        value: '95,5 MPa',
        focus: 'stress',
        reveal: 2,
      },
    ],
    note: 'Naprężenie średnie w przekroju sworznia wynosi około 95,5 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Pole przekroju sworznia: A = π d^2/4 = π · 20^2/4 = 314,16 mm^2.',
      caption: 'Pole przekroju sworznia: A = π d^2/4 = π · 20^2/4 = 314,16 mm^2.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'A = \\pi d^2/4 = \\pi \\cdot 20^2/4 = 314{,}16\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration: 'Zamień siłę na niutony: F = 30 kN = 30 000 N.',
      caption: 'Zamień siłę na niutony: F = 30 kN = 30 000 N.',
      visual: 'section',
      focus: {
        metric: 'load',
      },
      formula: 'F = 30\\ \\text{kN} = 30\\,000\\ \\text{N}',
    },
    {
      title: 'Krok 3',
      narration: 'Podstaw do wzoru: τ_sr = 30 000/314,16 = 95,49 N/mm^2.',
      caption: 'Podstaw do wzoru: τ_sr = 30 000/314,16 = 95,49 N/mm^2.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau_{sr} = 30\\,000/314{,}16 = 95{,}49\\ \\text{N/mm}^2',
    },
    {
      title: 'Krok 4',
      narration:
        'Sprawdź rząd wielkości: wynik około 95 MPa jest typowy dla stali konstrukcyjnej i znacznie poniżej granicy plastyczności.',
      caption:
        'Sprawdź rząd wielkości: wynik około 95 MPa jest typowy dla stali konstrukcyjnej i znacznie poniżej granicy plastyczności.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
    },
  ],
} satisfies SolutionData
