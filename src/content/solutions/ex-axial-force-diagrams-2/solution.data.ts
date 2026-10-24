import type { SolutionData } from '../../model'
import { AxialForceDistributedAnimation } from './animation'

export default {
  id: 'ex-axial-force-diagrams-2',
  title: 'Wykres siły osiowej N — przykład 2',
  duration: 9,
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
        label: '',
        length: 1000,
        area: 250,
        n: 18,
        sigma: 72,
        epsilon: 0.00036,
        deltaL: 0.36,
      },
      {
        id: '2',
        label: '',
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
  animation: AxialForceDistributedAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt jest utwierdzony lewym końcem, ma długość L = 2 m i jest obciążony na całej długości osiowym obciążeniem rozłożonym q = 8 kN/m skierowanym w prawo. Na prawym końcu działa dodatkowo siła P = 6 kN w prawo. Oś x przyjmujemy od utwierdzenia w prawo.',
      caption:
        'Pręt utwierdzony w A, obciążenie rozłożone q wzdłuż całej długości i siła P na końcu. Wykres N będziemy budować od utwierdzenia.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'L = 2\\ \\text{m},\\quad q = 8\\ \\text{kN/m},\\quad P = 6\\ \\text{kN}',
    },
    {
      title: 'Przekrój i część prawa',
      narration:
        'Wytnijmy przekrój w odległości x od utwierdzenia. Po prawej zostaje odcinek długości L − x, na który działa siła końcowa P oraz wypadkowa obciążenia rozłożonego q(L − x). Suma sił po prawej stronie przekroju daje N(x).',
      caption: 'Do wykresu wystarczy suma sił po prawej stronie przekroju: P oraz wypadkowa q(L − x).',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x) = P + q(L - x)',
    },
    {
      title: 'Wykres N(x)',
      narration:
        'Po podstawieniu otrzymujemy N(x) = 6 + 8(2 − x) = 22 − 8x kN. Na wykresie jest to linia prosta od 22 kN przy utwierdzeniu do 6 kN na końcu. Rysujemy ją od lewej strony i odkładamy dodatnie wartości nad osią.',
      caption: 'N maleje liniowo od 22 kN przy utwierdzeniu do 6 kN na końcu; na całej długości N jest dodatnie.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x) = 6 + 8(2 - x) = 22 - 8x\\ \\text{kN}',
    },
    {
      title: 'Nachylenie i reakcja',
      narration:
        'Sprawdźmy nachylenie: dN/dx = −q = −8 kN/m, więc na każdym metrze siła osiowa maleje o 8 kN. Między x = 0 i x = 2 różnica wynosi 16 kN, co zgadza się z 22 − 6 = 16. Reakcja utwierdzenia wynosi 22 kN w lewo.',
      caption: 'Spadek 16 kN na 2 m odpowiada q = 8 kN/m; reakcja równoważy sumę obciążenia rozłożonego i siły P.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '\\frac{dN}{dx} = -q = -8\\ \\text{kN/m},\\qquad R_A = 22\\ \\text{kN}',
    },
    {
      title: 'Przekrój krytyczny',
      narration:
        'Jeśli pole przekroju jest stałe i wynosi A = 250 mm², naprężenie zmienia się liniowo od 88 MPa przy utwierdzeniu do 24 MPa na końcu. Najbardziej wytężony jest przekrój przy podporze, mimo że dodatkowa siła skupiona działa na drugim końcu. Obciążenie rozłożone kumuluje się w kierunku podpory.',
      caption: 'Największe N występuje przy utwierdzeniu. Przy stałym A decyduje ono również o największym naprężeniu.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_{max} = \\frac{22\\,000}{250} = 88\\ \\text{MPa}',
    },
    {
      title: 'Znak i pole pod wykresem',
      narration:
        'Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po lewej stronie pręt jest rozciągany na całej długości, więc wykres leży po dodatniej stronie. Pole pod wykresem daje wydłużenie: N_sr = 14 kN, ΔL = 0,56 mm, a średnie odkształcenie ε_sr = 0,00028.',
      caption: 'Dodatnie N na całej długości potwierdza rozciąganie; pole pod wykresem jest równe N_sr·L.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L = \\frac{N_{sr}L}{EA} = \\frac{14\\,000 \\cdot 2000}{200\\,000 \\cdot 250} = 0{,}56\\ \\text{mm},\\qquad \\varepsilon_{sr} = 0{,}00028',
    },
  ],
} satisfies SolutionData
