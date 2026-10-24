import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-force-diagrams',
  title: 'Wykres siły osiowej N — przykład 1',
  duration: 7,
  given: ['x = 0'],
  result:
    'Od utwierdzenia do wolnego końca: N = +15 kN, −5 kN, +5 kN; środkowy odcinek jest ściskany, a pozostałe rozciągane.',
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
        n: 15,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        n: -5,
      },
      {
        id: '3',
        label: '3',
        length: 1000,
        n: 5,
      },
    ],
    loads: [
      {
        node: 1,
        value: 20,
        label: '20 kN',
      },
      {
        node: 2,
        value: 10,
        label: '10 kN',
      },
      {
        node: 3,
        value: 5,
        label: '5 kN',
      },
    ],
    note: 'Długości i pola nie są podane — odcinki są schematyczne.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN, więc N₃ = +5 kN.',
      caption:
        'Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN, więc N₃ = +5 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '3' },
      formula: 'N_{3} = +5 kN',
    },
    {
      title: 'Krok 2',
      narration:
        'Na środkowym odcinku po prawej stronie działają 10 kN w lewo i 5 kN w prawo, więc N₂ = −10 + 5 = −5 kN.',
      caption:
        'Na środkowym odcinku po prawej stronie działają 10 kN w lewo i 5 kN w prawo, więc N₂ = −10 + 5 = −5 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'N_{2} = -10 + 5 = -5 kN',
    },
    {
      title: 'Krok 3',
      narration:
        'Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = 20 − 10 + 5 = +15 kN.',
      caption:
        'Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = 20 − 10 + 5 = +15 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_{1} = 20 - 10 + 5 = +15 kN',
    },
    {
      title: 'Krok 4',
      narration: 'Z równowagi całego pręta reakcja w A wynosi 15 kN w lewo, co potwierdza N₁ = +15 kN.',
      caption: 'Z równowagi całego pręta reakcja w A wynosi 15 kN w lewo, co potwierdza N₁ = +15 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_{1} = +15 kN',
    },
    {
      title: 'Krok 5',
      narration: 'Narysuj trzy poziome stopnie: +15, −5 i +5 kN, ze skokami w przekrojach przyłożenia sił.',
      caption: 'Narysuj trzy poziome stopnie: +15, −5 i +5 kN, ze skokami w przekrojach przyłożenia sił.',
      visual: 'axial',
      focus: { metric: 'N' },
    },
  ],
} satisfies SolutionData
