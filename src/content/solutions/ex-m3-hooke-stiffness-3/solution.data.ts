import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-hooke-stiffness-3',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 3',
  duration: 7,
  given: ['L=3 m', 'N=40 kN', 'L_{dop}=1', 'E=200 GPa'],
  result:
    'Zwróć uwagę na wrażliwość wyniku. Gdyby dopuszczalne wydłużenie zmniejszyć do 1 mm, wymagane pole wzrosłoby do 600 mm^2. Wydłużenie jest liniową funkcją długości i siły, a odwrotnie proporcjonalne do pola. Dlatego w zadaniach projektowych małe zmiany wymagania sztywności mogą istotnie zmienić wymiar.',
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
        length: 1500,
        area: 400,
        n: 40,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.75,
      },
      {
        id: '2',
        label: '2',
        length: 1500,
        area: 400,
        n: 40,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.75,
      },
    ],
    loads: [
      {
        node: 2,
        value: 40,
        label: 'N = 40 kN',
      },
    ],
    note: 'L = 3000 mm, A_min = 400 mm², d ≈ 22,6 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Załóżmy, że dla stalowego pręta o długości L=3 m, obciążonego siłą N=40 kN, wymagamy wydłużenia nie większego niż Δ L_dop=1,5 mm. Moduł wynosi E=200 GPa. Szukamy minimalnego pola przekroju.',
      caption:
        'Załóżmy, że dla stalowego pręta o długości L=3 m, obciążonego siłą N=40 kN, wymagamy wydłużenia nie większego niż Δ L_dop=1,5 mm.…',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'L = 3 m',
    },
    {
      title: 'Krok 2',
      narration: 'Z warunku sztywności',
      caption: 'Z warunku sztywności',
      visual: 'thermal',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'Δ L=(NL)/(EA)≤ Δ L_dop',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\frac{NL}{EA}\\le \\Delta L_{\\mathrm{dop}}',
    },
    {
      title: 'Krok 4',
      narration: 'po przekształceniu otrzymujemy',
      caption: 'po przekształceniu otrzymujemy',
      visual: 'thermal',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'A_min=(NL)/(EΔ L_dop) =(40 000· 3000)/(200 000· 1,5)=400 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula:
        'A_{\\min}=\\frac{NL}{E\\Delta L_{\\mathrm{dop}}}\n=\\frac{40\\,000\\cdot 3000}{200\\,000\\cdot 1{,}5}=400\\ \\text{mm}^2.',
    },
    {
      title: 'Krok 6',
      narration: 'Dla przekroju kołowego odpowiednia średnica wynosi',
      caption: 'Dla przekroju kołowego odpowiednia średnica wynosi',
      visual: 'thermal',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: 'd=√((4A_min)/(π))=√((4· 400)/(π))≈ 22,6 mm.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'd=\\sqrt{\\frac{4A_{\\min}}{\\pi}}=\\sqrt{\\frac{4\\cdot 400}{\\pi}}\\approx 22{,}6\\ \\text{mm}.',
    },
    {
      title: 'Krok 8',
      narration:
        'Sprawdzenie naprężenia: σ=40 000/400=100 MPa, czyli znacznie mniej niż typowa granica plastyczności stali. W tym zadaniu o wymiarze decyduje więc sztywność, a nie wytrzymałość. Gdybyśmy dobrali przekrój tylko z warunku naprężeniowego, mógłby być mniejszy, ale pręt wydłużałby się bardziej niż dopuszczono.',
      caption:
        'Sprawdzenie naprężenia: σ=40 000/400=100 MPa, czyli znacznie mniej niż typowa granica plastyczności stali. W tym zadaniu o…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma = 40\\,000/400 = 100 MPa',
    },
    {
      title: 'Krok 9',
      narration:
        'Zwróć uwagę na wrażliwość wyniku. Gdyby dopuszczalne wydłużenie zmniejszyć do 1 mm, wymagane pole wzrosłoby do 600 mm^2. Wydłużenie jest liniową funkcją długości i siły, a odwrotnie proporcjonalne do pola. Dlatego w zadaniach projektowych małe zmiany wymagania sztywności mogą istotnie zmienić wymiar.',
      caption:
        'Zwróć uwagę na wrażliwość wyniku. Gdyby dopuszczalne wydłużenie zmniejszyć do 1 mm, wymagane pole wzrosłoby do 600 mm^2.…',
      visual: 'thermal',
      focus: { metric: 'A' },
    },

    {
      title: 'Krok 10',
      narration: 'Odkształcenie przy naprężeniu 100 MPa: ε = σ/E = 100/200 000 = 0,0005.',
      caption: 'Wydłużenie εL = 0,0005·3000 = 1,5 mm potwierdza przyjęty warunek sztywności.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\sigma/E=100/200\\,000=0{,}0005',
    },
  ],
} satisfies SolutionData
