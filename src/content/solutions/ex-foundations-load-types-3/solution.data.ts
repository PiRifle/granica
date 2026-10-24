import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-load-types-3',
  title: 'Obciążenia: siła, rozkład i moment — przykład 3',
  duration: 7,
  given: ['γ = 77 kN/m³', 'σ_dop = 120 MPa', 'współczynnik bezpieczeństwa n = 2'],
  result:
    'Maksymalna długość linki wynosi około 1558 m. Przy współczynniku bezpieczeństwa 2 dopuszczalne naprężenie spada do 60 MPa, a długość do około 779 m. Ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa' },
    segments: [
      { id: 'g', label: 'górny', length: 779, n: 12, sigma: 120 },
      { id: 'd', label: 'dolny', length: 779, n: 6, sigma: 60 },
    ],
    loads: [
      { node: 1, value: 6, label: 'G/2 ≈ 6,0 kN' },
      { node: 2, value: 6, label: 'G/2 ≈ 6,0 kN' },
    ],
    note: 'Przyjęto A = 100 mm² wyłącznie po to, by pokazać siły N; naprężenie graniczne nie zależy od pola. Ciężar własny zastąpiono dwiema siłami G/2.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Linka stalowa przenosi wyłącznie ciężar własny. Przyjmujemy ciężar objętościowy stali γ = 77 kN/m³ i dopuszczalne naprężenie σ_dop = 120 MPa. Szukamy największej długości, przy której naprężenie nie przekroczy tej wartości.',
      caption: 'Linka obciążona tylko ciężarem własnym, utwierdzona u góry.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '\\gamma=77\\ \\text{kN/m}^3,\\quad \\sigma_{\\text{dop}}=120\\ \\text{MPa}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'W pręcie obciążonym tylko ciężarem własnym maksymalne naprężenie występuje u góry i rośnie liniowo z długością: σ_max = γL. Warunek bezpieczeństwa ma więc postać γL ≤ σ_dop.',
      caption: 'Naprężenie u góry nie może przekroczyć wartości dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma_{\\max}=\\gamma L\\le\\sigma_{\\text{dop}}',
    },
    {
      title: 'Długość maksymalna',
      narration:
        'Przekształcamy warunek do postaci L_max = σ_dop / γ. Dzielimy 120 000 kN/m² przez 77 kN/m³ i otrzymujemy około 1558 m.',
      caption: 'L_max ≈ 1558 m, czyli około 1,56 km.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: 'L_{\\max}=\\frac{\\sigma_{\\text{dop}}}{\\gamma}=\\frac{120\\,000}{77}\\approx1558\\ \\text{m}',
    },
    {
      title: 'Jednostki są tu kluczowe',
      narration:
        'Zamieniamy 120 MPa na 120 000 kPa, czyli 120 000 kN/m². Dzielenie przez ciężar objętościowy w kN/m³ daje metry. Bez tej zamiany wynik byłby tysiące razy za mały.',
      caption: '120 MPa = 120 000 kPa = 120 000 kN/m².',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '120\\ \\text{MPa}=120\\,000\\ \\text{kPa}=120\\,000\\ \\text{kN/m}^2',
    },
    {
      title: 'Kontrola naprężenia na górze',
      narration:
        'Podstawiamy długość 1558 m z powrotem do wzoru: σ = 77 · 1558 ≈ 120 000 kN/m² = 120 MPa. Wynik jest równy dopuszczalnemu, co potwierdza obliczenie.',
      caption: 'Na górze linki naprężenie osiąga 120 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma_{\\max}=77\\cdot1558\\approx120\\,000\\ \\text{kN/m}^2=120\\ \\text{MPa}',
    },
    {
      title: 'Współczynnik bezpieczeństwa',
      narration:
        'Przy współczynniku bezpieczeństwa 2 dopuszczalne naprężenie wynosi 60 MPa. Długość graniczna maleje do 60 000 / 77 ≈ 779 m. Zapas bezpieczeństwa zmniejsza dopuszczalną długość o połowę.',
      caption: 'Dla n = 2: σ_dop = 60 MPa, L_max ≈ 779 m.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
      formula:
        '\\sigma_{\\text{dop}}=\\frac{120}{2}=60\\ \\text{MPa},\\qquad L_{\\max}=\\frac{60\\,000}{77}\\approx779\\ \\text{m}',
    },
    {
      title: 'Wniosek',
      narration:
        'Ten przykład pokazuje, że ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi. W typowych konstrukcjach budowlanych zwykle nie decyduje o nośności, ale w kablach, linach i wysmukłych masztach trzeba go liczyć osobno.',
      caption: 'W długiej linie o nośności decyduje ciężar własny, nie obciążenie zewnętrzne.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
    },
  ],
} satisfies SolutionData
