import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stepped-bars-2',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 2',
  duration: 7,
  given: ['A_1=500 mm^2', 'A_2=150 mm^2', 'P=30 kN', 'Q=20 kN'],
  result:
    'Przy σ_dop=160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160=187,5 mm^2. Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
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
      title: 'Krok 1',
      narration:
        'Tym razem siła osiowa zmienia się na długości. Pręt jest utwierdzony lewym końcem. Odcinek pierwszy, przy utwierdzeniu, ma pole A_1=500 mm^2, a odcinek drugi, przy swobodnym końcu, ma pole A_2=150 mm^2. Na prawym końcu działa siła P=30 kN w prawo, a na połączeniu odcinków siła Q=20 kN w prawo.',
      caption:
        'Tym razem siła osiowa zmienia się na długości. Pręt jest utwierdzony lewym końcem. Odcinek pierwszy, przy utwierdzeniu, ma pole…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_1=500\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration:
        'Zaczynamy od prawego końca. W drugim odcinku działa tylko siła P, więc N_2=+30 kN. W pierwszym odcinku dochodzi siła Q, więc N_1=30+20=+50 kN. Reakcja utwierdzenia wynosi 50 kN w lewo i potwierdza wynik.',
      caption:
        'Zaczynamy od prawego końca. W drugim odcinku działa tylko siła P, więc N_2=+30 kN. W pierwszym odcinku dochodzi siła Q, więc…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'P',
    },
    {
      title: 'Krok 3',
      narration:
        'Naprężenia wynoszą σ_1=50 000/500=100 MPa oraz σ_2=30 000/150=200 MPa. Mimo że pierwszy odcinek przenosi większą siłę, to drugi jest bardziej wytężony, ponieważ ma ponad trzy razy mniejsze pole. Przekrojem krytycznym jest więc odcinek drugi.',
      caption:
        'Naprężenia wynoszą σ_1=50 000/500=100 MPa oraz σ_2=30 000/150=200 MPa. Mimo że pierwszy odcinek przenosi większą siłę, to drugi…',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_1=50\\,000/500=100\\ \\text{MPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Przy σ_dop=160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160=187,5 mm^2. Zwiększanie pola pierwszego odcinka nie pomoże, dopóki drugi pozostaje zbyt cienki. To praktyczna ilustracja zasady najsłabszego ogniwa.',
      caption:
        'Przy σ_dop=160 MPa pierwszy odcinek spełnia warunek, a drugi nie. Minimalne pole drugiego odcinka wynosi 30 000/160=187,5 mm^2.…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: '\\sigma_{\\mathrm{dop}}=160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
