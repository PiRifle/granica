import type { SolutionData } from '../../model'
import { StrengthElasticityPlasticity3Animation } from './animation'

export default {
  id: 'ex-m3-strength-elasticity-plasticity-3',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 3',
  duration: 7,
  given: ['F_e=60 kN', 'S_0=250 mm²'],
  result:
    'Ten sam rachunek można odwrócić inaczej: mając wymaganą siłę roboczą i przyjęty współczynnik bezpieczeństwa, można wyznaczyć minimalne pole przekroju. Dla N=40 kN, R_e=240 MPa i n=1,5 otrzymujemy S_0,min=N n/R_e=40 000· 1,5/240=250 mm^2. To dokładnie pole użyte w przykładzie, co potwierdza spójność obliczeń.',
  animation: StrengthElasticityPlasticity3Animation,
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
        n: 40,
        sigma: 160,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 40,
        sigma: 160,
      },
    ],
    loads: [
      {
        node: 2,
        value: 40,
        label: 'N_dop = 40 kN',
      },
    ],
    note: 'S₀ = 250 mm², R_e = 240 MPa, σ_dop = 160 MPa.',
  },
  scenes: [
    {
      title: 'Dane z próby',
      narration:
        'Z próby wiemy, że siła F_e = 60 kN odpowiada granicy plastyczności próbki o polu S₀ = 250 mm². Na krzywej nie znamy jeszcze położenia R_e. Szukamy naprężenia, które odpowiada tej sile.',
      caption: 'Znamy siłę graniczną i pole początkowe, więc możemy wyznaczyć naprężenie.',
      visual: 'axial',
      focus: { metric: 'given' },
      formula: 'F_e=60\\ \\text{kN},\\qquad S_0=250\\ \\text{mm}^2',
    },
    {
      title: 'Granica plastyczności R_e',
      narration:
        'Korzystamy z definicji R_e = F_e/S₀. Dzielimy 60 000 N przez 250 mm² i otrzymujemy 240 MPa. To typowa wartość dla zwykłej stali konstrukcyjnej, ale nie jest uniwersalna — inna stal może mieć R_e = 355 MPa lub więcej.',
      caption: 'W zadaniu korzystaj z danych podanych w treści albo wyraźnie oznaczonych jako typowe.',
      visual: 'axial',
      focus: { metric: 'Re' },
      formula: 'R_e=\\frac{60\\,000}{250}=240\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Jeśli wymagany współczynnik bezpieczeństwa względem granicy plastyczności wynosi n = 1,5, to naprężenie dopuszczalne jest równe σ_dop = 240/1,5 = 160 MPa. Punkt roboczy leży poniżej R_e, więc element pracuje sprężyście.',
      caption: 'Zapas 80 MPa oznacza, że do granicy plastyczności pozostaje współczynnik 1,5.',
      visual: 'axial',
      focus: { metric: 'service' },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{240}{1{,}5}=160\\ \\text{MPa}',
    },
    {
      title: 'Siła dopuszczalna i sprawdzenie',
      narration:
        'Maksymalna siła robocza dla tego przekroju to N_dop = 160·250 = 40 000 N = 40 kN. Przy tej sile naprężenie wynosi dokładnie 160 MPa, a po odciążeniu odkształcenie znika. Odwrotnie: S₀,min = N·n/R_e = 40 000·1,5/240 = 250 mm², czyli dokładnie pole z przykładu.',
      caption: 'Zapas do granicy plastyczności wynosi 240/160 = 1,5, zgodnie z założeniem.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: 'N_{\\mathrm{dop}}=\\sigma_{\\mathrm{dop}}S_0=160\\cdot250=40\\,000\\ \\text{N}=40\\ \\text{kN}',
    },
    {
      title: 'Gdy materiał jest kruchy',
      narration:
        'Nie użyliśmy tutaj R_m, bo materiał jest ciągliwy i projektujemy poniżej R_e. Gdyby materiał pękał bez uprzedniego płynięcia, właściwą granicą byłoby R_m, a nie R_e. Wybór granicy zależy od mechanizmu zniszczenia, nie od tego, która liczba jest większa.',
      caption: 'Na schemacie poglądowym materiał kruchy nie ma plateau plastyczności; decyduje R_m.',
      visual: 'axial',
      focus: { metric: 'brittle' },
      formula: '\\text{kruche: }R_m\\ \\text{zamiast}\\ R_e',
    },
  ],
} satisfies SolutionData
