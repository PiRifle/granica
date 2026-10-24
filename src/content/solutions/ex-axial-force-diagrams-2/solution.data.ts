import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-force-diagrams-2',
  title: 'Wykres siły osiowej N — przykład 2',
  duration: 7,
  given: ['L=2 m', 'q=8 kN/m', 'P=6 kN'],
  result:
    'Wykres N pozwala też szybko sprawdzić, czy znak jest poprawny. Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po lewej stronie pręt jest rozciągany na całej długości, więc wykres powinien leżeć po dodatniej stronie. Gdyby obciążenie działało w lewo, znak byłby ujemny, a pręt byłby ściskany. Taka kontrola znaku jest szybsza niż ponowne rozwiązywanie równań.',
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
        area: 250,
        n: 18,
        sigma: 72,
        epsilon: 0.00036,
        deltaL: 0.36,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 10,
        sigma: 40,
        epsilon: 0.0002,
        deltaL: 0.2,
      },
    ],
    loads: [
      {
        node: 2,
        value: 6,
        label: 'P = 6 kN',
      },
    ],
    note: 'Podano średnie N i σ w połówkach; skrajne σ: 88 MPa przy utwierdzeniu i 24 MPa na końcu. q = 8 kN/m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt utwierdzony lewym końcem, o długości L=2 m, obciążony na całej długości osiowym obciążeniem rozłożonym q=8 kN/m skierowanym w prawo. Na prawym końcu działa dodatkowo siła P=6 kN w prawo. Przyjmujemy oś x od utwierdzenia w prawo.',
      caption:
        'Rozważmy pręt utwierdzony lewym końcem, o długości L=2 m, obciążony na całej długości osiowym obciążeniem rozłożonym q=8 kN/m…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'L = 2 m',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla przekroju w odległości x po prawej stronie pozostaje odcinek długości L-x. Działa na niego siła końcowa 6 kN oraz obciążenie rozłożone o wypadkowej q(L-x). Zatem N(x)=6+8(2-x) kN. Na wykresie jest to linia prosta od 22 kN przy utwierdzeniu do 6 kN na końcu.',
      caption:
        'Dla przekroju w odległości x po prawej stronie pozostaje odcinek długości L-x. Działa na niego siła końcowa 6 kN oraz obciążenie…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x) = 6+8(2-x) kN',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla pręta utwierdzonego i obciążonego stałym q oraz siłą końcową P siła osiowa maleje liniowo od podpory do końca. Nachylenie wykresu jest równe −q.',
      caption: 'N(x)=P+q(L-x), (dN)/(dx)=-q',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x)=P+q(L-x),\\qquad \\frac{dN}{dx}=-q',
    },
    {
      title: 'Krok 4',
      narration:
        'Sprawdźmy nachylenie: dN/dx=-q=-8 kN/m, więc na każdym metrze siła osiowa maleje o 8 kN. Rzeczywiście, między x=0 i x=2 różnica wynosi 16 kN, co zgadza się z 22-6=16. Reakcja utwierdzenia wynosi 22 kN w lewo.',
      caption:
        'Sprawdźmy nachylenie: dN/dx=-q=-8 kN/m, więc na każdym metrze siła osiowa maleje o 8 kN. Rzeczywiście, między x=0 i x=2 różnica…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'x = 0',
    },
    {
      title: 'Krok 5',
      narration:
        'Jeśli pole przekroju jest stałe i wynosi A=250 mm^2, naprężenie zmienia się liniowo od 88 MPa przy utwierdzeniu do 24 MPa na końcu. Najbardziej wytężony jest przekrój przy podporze, mimo że dodatkowa siła skupiona działa na drugim końcu. To typowy efekt obciążenia rozłożonego: kumuluje się ono w kierunku podpory.',
      caption:
        'Jeśli pole przekroju jest stałe i wynosi A=250 mm^2, naprężenie zmienia się liniowo od 88 MPa przy utwierdzeniu do 24 MPa na…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 6',
      narration:
        'Wykres N pozwala też szybko sprawdzić, czy znak jest poprawny. Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po lewej stronie pręt jest rozciągany na całej długości, więc wykres powinien leżeć po dodatniej stronie. Gdyby obciążenie działało w lewo, znak byłby ujemny, a pręt byłby ściskany. Taka kontrola znaku jest szybsza niż ponowne rozwiązywanie równań.',
      caption:
        'Wykres N pozwala też szybko sprawdzić, czy znak jest poprawny. Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po…',
      visual: 'axial',
      focus: { metric: 'N' },
    },

    {
      title: 'Krok 7',
      narration:
        'Sprawdź wydłużenie ze średnią siłą N_sr = 14 kN: ΔL = N_sr·L/(EA) = 14 000·2000/(200 000·250) = 0,56 mm.',
      caption: 'To dokładnie całka z liniowego wykresu N, równa polu pod wykresem podzielonemu przez EA.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\frac{N_{sr}L}{EA}=\\frac{14\\,000\\cdot2000}{200\\,000\\cdot250}=0{,}56\\ \\text{mm}',
    },
    {
      title: 'Krok 8',
      narration: 'Odkształcenie średnie: ε_sr = N_sr/(EA) = 14 000/(200 000·250) = 0,00028.',
      caption: 'Miejscowe odkształcenie zmienia się liniowo razem z N, a wartość średnia odpowiada sile średniej.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon_{sr}=\\frac{14\\,000}{200\\,000\\cdot250}=0{,}00028',
    },
  ],
} satisfies SolutionData
