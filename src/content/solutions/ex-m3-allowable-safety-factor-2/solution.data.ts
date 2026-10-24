import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-allowable-safety-factor-2',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 2',
  duration: 7,
  given: ['R_f=120 MPa', 'n=2. N'],
  result:
    'Podobnie byłoby przy wyboczeniu. Gdyby ten sam pręt był ściskany i smukły, o dopuszczalnym obciążeniu decydowałoby naprężenie krytyczne, a nie R_e. Wtedy zwiększanie średnicy pomaga, ale zależność jest inna niż liniowa, a długość i warunki podparcia odgrywają większą rolę. Wzór A_min=N/σ_dop nadal obowiązuje, ale σ_dop trzeba wyznaczyć z innego warunku.',
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
        area: 2124,
        n: 120,
        sigma: 56.5,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 2124,
        n: 120,
        sigma: 56.5,
      },
    ],
    loads: [
      {
        node: 2,
        value: 120,
        label: 'N = 120 kN',
      },
    ],
    note: 'Przyjęto d = 52 mm, A = 2124 mm²; długość schematyczna.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Ten sam pręt może być projektowany względem innej granicy. Załóżmy, że cięgno pracuje w maszynie wykonującej milion cykli, a dla materiału i geometrii przyjęto umowną granicę zmęczeniową R_f=120 MPa. Wymagany współczynnik bezpieczeństwa wynosi teraz n=2. Naprężenie dopuszczalne jest równe',
      caption:
        'Ten sam pręt może być projektowany względem innej granicy. Załóżmy, że cięgno pracuje w maszynie wykonującej milion cykli, a dla…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_{f} = 120 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'σ_dop=(120)/(2)=60 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{120}{2}=60\\ \\text{MPa}.',
    },
    {
      title: 'Krok 3',
      narration: 'Wymagane pole wynosi',
      caption: 'Wymagane pole wynosi',
      visual: 'thermal',
      focus: { metric: 'N' },
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'A_min=(120 000)/(60)=2000 mm^2,',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'A_{\\min}=\\frac{120\\,000}{60}=2000\\ \\text{mm}^2,',
    },
    {
      title: 'Krok 5',
      narration:
        'czyli średnica około 50,5 mm. Po zaokrągleniu do 52 mm otrzymujemy A≈2124 mm^2, naprężenie σ≈56,5 MPa i n_rz=120/56,5≈2,12.',
      caption:
        'czyli średnica około 50,5 mm. Po zaokrągleniu do 52 mm otrzymujemy A≈2124 mm^2, naprężenie σ≈56,5 MPa i n_rz=120/56,5≈2,12.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma \\approx 56{,}5 MPa',
    },
    {
      title: 'Krok 6',
      narration:
        'Różnica względem poprzedniego wariantu jest ogromna: średnica rośnie z 32 do 52 mm, mimo że materiał się nie zmienił. Zmienił się mechanizm decydujący o bezpieczeństwie. To pokazuje, dlaczego w zadaniu trzeba najpierw ustalić, co ma nie wystąpić. Samo „dobranie współczynnika” bez wskazania granicy jest bez znaczenia.',
      caption:
        'Różnica względem poprzedniego wariantu jest ogromna: średnica rośnie z 32 do 52 mm, mimo że materiał się nie zmienił. Zmienił się…',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 7',
      narration:
        'Podobnie byłoby przy wyboczeniu. Gdyby ten sam pręt był ściskany i smukły, o dopuszczalnym obciążeniu decydowałoby naprężenie krytyczne, a nie R_e. Wtedy zwiększanie średnicy pomaga, ale zależność jest inna niż liniowa, a długość i warunki podparcia odgrywają większą rolę. Wzór A_min=N/σ_dop nadal obowiązuje, ale σ_dop trzeba wyznaczyć z innego warunku.',
      caption:
        'Podobnie byłoby przy wyboczeniu. Gdyby ten sam pręt był ściskany i smukły, o dopuszczalnym obciążeniu decydowałoby naprężenie…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'A_{min} = N/\\sigma_{\\mathrm{dop}}',
    },
  ],
} satisfies SolutionData
