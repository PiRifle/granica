import type { SolutionData } from '../../model'
import { AxialForceDiagrams2Animation } from './animation'

export default {
  id: 'ex-axial-force-diagrams-2',
  title: 'Wykres siły osiowej N — przykład 2',
  duration: 7,
  given: ['L=2 m', 'q=8 kN/m', 'P=6 kN'],
  result:
    'Wykres N pozwala też szybko sprawdzić, czy znak jest poprawny. Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po lewej stronie pręt jest rozciągany na całej długości, więc wykres powinien leżeć po dodatniej stronie. Gdyby obciążenie działało w lewo, znak byłby ujemny, a pręt byłby ściskany. Taka kontrola znaku jest szybsza niż ponowne rozwiązywanie równań.',
  animation: AxialForceDiagrams2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Rozważmy pręt utwierdzony lewym końcem, o długości L=2 m, obciążony na całej długości osiowym obciążeniem rozłożonym q=8 kN/m skierowanym w prawo. Na prawym końcu działa dodatkowo siła P=6 kN w prawo. Przyjmujemy oś x od utwierdzenia w prawo. Dla przekroju w odległości x po prawej stronie pozostaje odcinek długości L-x. Działa na niego siła końcowa 6 kN oraz obciążenie rozłożone o wypadkowej q(L-x). Zatem N(x)=6+8(2-x) kN. Na wykresie jest to linia prosta od 22 kN przy utwierdzeniu do 6 kN na końcu. Dla pręta utwierdzonego i obciążonego stałym q oraz siłą końcową P siła osiowa maleje liniowo od podpory do końca. Nachylenie wykresu jest równe −q. Sprawdźmy nachylenie: dN/dx=-q=-8 kN/m, więc na każdym metrze siła osiowa maleje o 8 kN. Rzeczywiście, między x=0 i x=2 różnica wynosi 16 kN, co zgadza się z 22-6=16. Reakcja utwierdzenia wynosi 22 kN w lewo. Jeśli pole przekroju jest stałe i wynosi A=250 mm^2, naprężenie zmienia się liniowo od 88 MPa przy utwierdzeniu do 24 MPa na końcu. Najbardziej wytężony jest przekrój przy podporze, mimo że dodatkowa siła skupiona działa na drugim końcu. To typowy efekt obciążenia rozłożonego: kumuluje się ono w kierunku podpory. Wykres N pozwala też szybko sprawdzić, czy znak jest poprawny. Przy obciążeniu rozłożonym skierowanym w prawo i utwierdzeniu po lewej stronie pręt jest rozciągany na całej długości, więc wykres powinien leżeć po dodatniej stronie. Gdyby obciążenie działało w lewo, znak byłby ujemny, a pręt byłby ściskany. Taka kontrola znaku jest szybsza niż ponowne rozwiązywanie równań. Sprawdź wydłużenie ze średnią siłą N_sr = 14 kN: ΔL = N_sr·L/(EA) = 14 000·2000/(200 000·250) = 0,56 mm. Odkształcenie średnie: ε_sr = N_sr/(EA) = 14 000/(200 000·250) = 0,00028.',
      caption: 'Miejscowe odkształcenie zmienia się liniowo razem z N, a wartość średnia odpowiada sile średniej.',
      visual: 'axial',
      formula:
        'L=2\\ \\text{m}\\qquad N(x)=6+8(2-x)\\ \\text{kN}\\qquad N(x)=P+q(L-x),\\qquad \\frac{dN}{dx}=-q\\qquad x=0\\qquad \\Delta L=\\frac{N_{sr}L}{EA}=\\frac{14\\,000\\cdot2000}{200\\,000\\cdot250}=0{,}56\\ \\text{mm}\\qquad \\varepsilon_{sr}=\\frac{14\\,000}{200\\,000\\cdot250}=0{,}00028',
    },
  ],
} satisfies SolutionData
