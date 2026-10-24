import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-elasticity-plasticity-3',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 3',
  duration: 7,
  given: ['F_e=60 kN', 'S_0=250 mm²'],
  result:
    'Ten sam rachunek można odwrócić inaczej: mając wymaganą siłę roboczą i przyjęty współczynnik bezpieczeństwa, można wyznaczyć minimalne pole przekroju. Dla N=40 kN, R_e=240 MPa i n=1,5 otrzymujemy S_0,min=N n/R_e=40 000· 1,5/240=250 mm^2. To dokładnie pole użyte w przykładzie, co potwierdza spójność obliczeń.',
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
      title: 'Krok 1',
      narration:
        'Załóżmy, że z próby wiemy, iż siła F_e=60 kN odpowiada granicy plastyczności próbki o polu S_0=250 mm^2. Jaką granicę plastyczności ma materiał? Korzystamy z definicji:',
      caption:
        'Załóżmy, że z próby wiemy, iż siła F_e=60 kN odpowiada granicy plastyczności próbki o polu S_0=250 mm^2. Jaką granicę…',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'F_{e} = 60 kN',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'R_e=(60 000)/(250)=240 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'R_e=\\frac{60\\,000}{250}=240\\ \\text{MPa}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Jeśli wymagany współczynnik bezpieczeństwa względem tej granicy wynosi n=1,5, to naprężenie dopuszczalne jest równe',
      caption:
        'Jeśli wymagany współczynnik bezpieczeństwa względem tej granicy wynosi n=1,5, to naprężenie dopuszczalne jest równe',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'n = 1{,}5',
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'σ_dop=(240)/(1,5)=160 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{240}{1{,}5}=160\\ \\text{MPa}.',
    },
    {
      title: 'Krok 5',
      narration: 'Maksymalna siła robocza dla tego samego przekroju wynosi więc',
      caption: 'Maksymalna siła robocza dla tego samego przekroju wynosi więc',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'N_dop=σ_dopS_0=160· 250=40 000 N=40 kN.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'N_{\\mathrm{dop}}=\\sigma_{\\mathrm{dop}}S_0=160\\cdot 250=40\\,000\\ \\text{N}=40\\ \\text{kN}.',
    },
    {
      title: 'Krok 7',
      narration:
        'Sprawdzenie: przy 40 kN naprężenie wynosi 40 000/250=160 MPa, czyli dokładnie σ_dop. Zapas do granicy plastyczności wynosi 240/160=1,5, zgodnie z założeniem.',
      caption:
        'Sprawdzenie: przy 40 kN naprężenie wynosi 40 000/250=160 MPa, czyli dokładnie σ_dop. Zapas do granicy plastyczności wynosi…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: '40\\,000/250 = 160 MPa',
    },
    {
      title: 'Krok 8',
      narration:
        'Zauważ, że wynik R_e=240 MPa jest typowy dla zwykłej stali konstrukcyjnej, ale nie jest uniwersalny. Inna stal może mieć R_e=355 MPa, a stal o podwyższonej wytrzymałości jeszcze więcej. W zadaniu zawsze korzystaj z danych podanych w treści albo z wartości wyraźnie oznaczonej jako typowa.',
      caption:
        'Zauważ, że wynik R_e=240 MPa jest typowy dla zwykłej stali konstrukcyjnej, ale nie jest uniwersalny. Inna stal może mieć R_e=355…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula: 'R_{e} = 240 MPa',
    },
    {
      title: 'Krok 9',
      narration:
        'Warto zauważyć, że nie użyliśmy tutaj R_m. Gdyby materiał był kruchy i pękał bez uprzedniego płynięcia, właściwą granicą byłoby R_m, a nie R_e. Wybór granicy zależy od mechanizmu zniszczenia, nie od tego, która liczba jest większa.',
      caption:
        'Warto zauważyć, że nie użyliśmy tutaj R_m. Gdyby materiał był kruchy i pękał bez uprzedniego płynięcia, właściwą granicą byłoby…',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
    },
    {
      title: 'Krok 10',
      narration:
        'Ten sam rachunek można odwrócić inaczej: mając wymaganą siłę roboczą i przyjęty współczynnik bezpieczeństwa, można wyznaczyć minimalne pole przekroju. Dla N=40 kN, R_e=240 MPa i n=1,5 otrzymujemy S_0,min=N n/R_e=40 000· 1,5/240=250 mm^2. To dokładnie pole użyte w przykładzie, co potwierdza spójność obliczeń.',
      caption:
        'Ten sam rachunek można odwrócić inaczej: mając wymaganą siłę roboczą i przyjęty współczynnik bezpieczeństwa, można wyznaczyć…',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
      formula: 'N = 40 kN, R_{e} = 240 MPa',
    },
  ],
} satisfies SolutionData
