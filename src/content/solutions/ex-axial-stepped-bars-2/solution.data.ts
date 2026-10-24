import type { SolutionData } from '../../model'
import { SteppedBarsExample2Animation } from './animation'

export default {
  id: 'ex-axial-stepped-bars-2',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 2',
  duration: 7,
  given: ['A₁ = 500 mm²', 'A₂ = 150 mm²', 'P = 30 kN', 'Q = 20 kN'],
  result:
    'Przy σdop = 160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160 = 187,5 mm². Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
  animation: SteppedBarsExample2Animation,
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
        area: 500,
        n: 50,
        sigma: 100,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 150,
        n: 30,
        sigma: 200,
      },
    ],
    loads: [
      {
        node: 1,
        value: 20,
        label: 'Q = 20 kN',
      },
      {
        node: 2,
        value: 30,
        label: 'P = 30 kN',
      },
    ],
    note: 'Długości nie są podane — odcinki są schematyczne.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt jest utwierdzony lewym końcem. Odcinek pierwszy, przy utwierdzeniu, ma pole A₁ = 500 mm², a odcinek drugi, przy swobodnym końcu, ma pole A₂ = 150 mm². Na prawym końcu działa siła P = 30 kN w prawo, a na połączeniu odcinków siła Q = 20 kN w prawo.',
      caption: 'Odcinek 1 ma pole 500 mm², odcinek 2 — 150 mm²; Q działa na połączeniu, P na swobodnym końcu.',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: 'A_1=500\\ \\text{mm}^2,\\qquad A_2=150\\ \\text{mm}^2',
    },
    {
      title: 'Odcinek 2 — swobodny koniec',
      narration:
        'Zaczynamy od prawego końca. W drugim odcinku działa tylko siła P = 30 kN, więc N₂ = +30 kN. Odcinek jest rozciągany.',
      caption: 'N₂ = +30 kN w odcinku przy swobodnym końcu.',
      visual: 'axial',
      focus: {
        metric: 'N',
        segment: '2',
      },
      formula: 'N_2=+30\\ \\text{kN}',
    },
    {
      title: 'Odcinek 1 — po dodaniu Q',
      narration:
        'W pierwszym odcinku dochodzi siła Q = 20 kN, więc N₁ = 30 + 20 = +50 kN. Reakcja utwierdzenia wynosi 50 kN w lewo i potwierdza wynik.',
      caption: 'N₁ = +50 kN; reakcja utwierdzenia 50 kN w lewo.',
      visual: 'axial',
      focus: {
        metric: 'N',
        segment: '1',
      },
      formula: 'N_1=30+20=+50\\ \\text{kN}',
    },
    {
      title: 'Naprężenie w odcinku 1',
      narration:
        'Naprężenie w pierwszym odcinku wynosi σ₁ = 50 000/500 = 100 MPa. Odcinek przenosi większą siłę, ale ma duże pole przekroju.',
      caption: 'Odcinek 1: σ₁ = 100 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '1',
      },
      formula: '\\sigma_1=\\frac{50\\,000}{500}=100\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie w odcinku 2',
      narration:
        'Naprężenie w drugim odcinku wynosi σ₂ = 30 000/150 = 200 MPa. Mniejsze pole daje większe naprężenie mimo mniejszej siły osiowej.',
      caption: 'Odcinek 2: σ₂ = 200 MPa — najbardziej wytężony odcinek.',
      visual: 'axial',
      focus: {
        metric: 'σ',
        segment: '2',
      },
      formula: '\\sigma_2=\\frac{30\\,000}{150}=200\\ \\text{MPa}',
    },
    {
      title: 'Porównanie i zasada najsłabszego ogniwa',
      narration:
        'Przy σdop = 160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160 = 187,5 mm². Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
      caption: 'Odcinek 1: 100 MPa ≤ 160 MPa; odcinek 2: 200 MPa > 160 MPa.',
      emphasis: 'Najsłabsze ogniwo: odcinek 2 — σ₂ = 200 MPa.',
      visual: 'axial',
      focus: {
        metric: 'σmax',
      },
      formula: '|\\sigma_2|=200\\ \\text{MPa}>\\sigma_{\\mathrm{dop}}=160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
