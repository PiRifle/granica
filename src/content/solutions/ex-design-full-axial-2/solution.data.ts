import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-axial-2',
  title: 'Pełne zadanie: pręt osiowo obciążony — przykład 2',
  duration: 7,
  given: ['L_1=300 mm', 'A_1=400 mm²', 'L_2=500 mm', 'A_2=200 mm²', 'P=20 kN', 'Q=25 kN'],
  result:
    'Taki przypadek zdarza się w elementach, w których część przekroju jest wymieniona na cieńszą lub w których siła jest przyłożona w połowie długości. Nie wystarczy wtedy „największa siła” ani „najmniejszy przekrój” osobno; trzeba porównać iloczyn tych informacji w postaci naprężenia.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [
      { id: '1', label: '1', length: 300, area: 400, n: -5, sigma: -12.5, deltaL: -0.01875 },
      { id: '2', label: '2', length: 500, area: 200, n: 20, sigma: 100, deltaL: 0.25 },
    ],
    loads: [
      { node: 1, value: 25, label: 'Q = 25 kN', direction: 'down' },
      { node: 2, value: 20, label: 'P = 20 kN', direction: 'down' },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Odcinek 1 jest ściskany, a odcinek 2 rozciągany; decyduje naprężenie w cieńszym odcinku 2.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt dwuodcinkowy utwierdzony na lewym końcu. Odcinek 1 ma L_1=300 mm i A_1=400 mm^2, a odcinek 2 L_2=500 mm i A_2=200 mm^2. Na swobodnym końcu działa siła P=20 kN w prawo, a na połączeniu siła Q=25 kN w lewo. Przyjmij E=200 GPa.',
      caption:
        'Rozważmy pręt dwuodcinkowy utwierdzony na lewym końcu. Odcinek 1 ma L_1=300 mm i A_1=400 mm^2, a odcinek 2 L_2=500 mm i A_2=200…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'L_1=300\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Reakcja z równowagi: R-25+20=0, więc R=5 kN w prawo. Siła normalna w odcinku 2, liczona od swobodnego końca, wynosi N_2=20 kN (rozciąganie). W odcinku 1 suma sił po lewej stronie cięcia daje N_1=-5 kN (ściskanie).',
      caption:
        'Reakcja z równowagi: R-25+20=0, więc R=5 kN w prawo. Siła normalna w odcinku 2, liczona od swobodnego końca, wynosi N_2=20 kN…',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'R-25+20=0',
    },
    {
      title: 'Krok 3',
      narration:
        'Naprężenia: σ_1=-5000/400=-12,5 MPa, σ_2=20 000/200=100 MPa. Odcinek 2 jest bardziej wytężony, mimo że ma mniejszą siłę bezwzględną, ponieważ jego pole jest dwa razy mniejsze.',
      caption:
        'Naprężenia: σ_1=-5000/400=-12,5 MPa, σ_2=20 000/200=100 MPa. Odcinek 2 jest bardziej wytężony, mimo że ma mniejszą siłę…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
      formula: '\\sigma_1=-5000/400=-12{,}5\\ \\text{MPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Wydłużenia: Δ L_1=-5000·300/(200 000·400)=-0,01875 mm, Δ L_2=20 000·500/(200 000·200)=0,25 mm. Suma wynosi około 0,231 mm.',
      caption:
        'Wydłużenia: Δ L_1=-5000·300/(200 000·400)=-0,01875 mm, Δ L_2=20 000·500/(200 000·200)=0,25 mm. Suma wynosi około 0,231 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '2' },
      formula: '\\Delta L_1=-5000\\cdot300/(200\\,000\\cdot400)=-0{,}01875\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration:
        'Przykład pokazuje, że znak ma znaczenie. Odcinek 1 skraca się, ale odcinek 2 wydłuża się znacznie bardziej, więc cały pręt wydłuża się netto. Gdyby pominąć znak, suma byłaby zawyżona. Gdyby pominąć pole, można by błędnie uznać, że decyduje odcinek 1, bo ma większą siłę bezwzględną.',
      caption:
        'Przykład pokazuje, że znak ma znaczenie. Odcinek 1 skraca się, ale odcinek 2 wydłuża się znacznie bardziej, więc cały pręt…',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '2' },
    },
    {
      title: 'Krok 6',
      narration:
        'Taki przypadek zdarza się w elementach, w których część przekroju jest wymieniona na cieńszą lub w których siła jest przyłożona w połowie długości. Nie wystarczy wtedy „największa siła” ani „najmniejszy przekrój” osobno; trzeba porównać iloczyn tych informacji w postaci naprężenia.',
      caption:
        'Taki przypadek zdarza się w elementach, w których część przekroju jest wymieniona na cieńszą lub w których siła jest przyłożona w…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
    },
  ],
} satisfies SolutionData
