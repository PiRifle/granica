import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stepped-bars-3',
  title: 'Pręty schodkowe: ta sama siła, inne σ — przykład 3',
  duration: 7,
  given: ['N_1=+45 kN', 'N_2=+30 kN', 'N_3=-20 kN', 'sigma_{dop}=150 MPa'],
  result:
    'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła 20 kN nie spowoduje wyboczenia przy założonej długości i sposobie zamocowania. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
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
        area: 314.2,
        n: 45,
        sigma: 143.3,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 201.1,
        n: 30,
        sigma: 149.2,
      },
      {
        id: '3',
        label: '3',
        length: 1000,
        area: 153.9,
        n: -20,
        sigma: -129.9,
      },
    ],
    loads: [
      {
        node: 1,
        value: 15,
        label: '15 kN',
      },
      {
        node: 2,
        value: 50,
        label: '50 kN',
      },
      {
        node: 3,
        value: 20,
        label: '20 kN',
      },
    ],
    note: 'Długości schematyczne; przyjęto średnice 20, 16 i 14 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Znamy siły osiowe i naprężenie dopuszczalne, a szukamy średnic odcinków. Pręt ma trzy odcinki o siłach N_1=+45 kN, N_2=+30 kN i N_3=-20 kN. Naprężenie dopuszczalne wynosi σ_dop=150 MPa, a przekroje mają być kołowe.',
      caption:
        'Znamy siły osiowe i naprężenie dopuszczalne, a szukamy średnic odcinków. Pręt ma trzy odcinki o siłach N_1=+45 kN, N_2=+30 kN i…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N_{1} = +45 kN, N_{2} = +30 kN',
    },
    {
      title: 'Krok 2',
      narration:
        'Minimalne pola wyznaczamy z warunku wytrzymałości: A_1≥45 000/150=300 mm^2, A_2≥30 000/150=200 mm^2 oraz A_3≥20 000/150=133,3 mm^2. Dla przekroju kołowego średnica wynosi d=√(4A/π).',
      caption:
        'Minimalne pola wyznaczamy z warunku wytrzymałości: A_1≥45 000/150=300 mm^2, A_2≥30 000/150=200 mm^2 oraz A_3≥20 000/150=133,3…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{1} \\ge 45\\,000/150 = 300 mm^{2}, A_{2} \\ge 30\\,000/150 = 200 mm^{2}',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla każdego odcinka osobno wyznaczamy minimalne pole, a następnie średnicę. Przyjęta średnica musi być nie mniejsza od obliczonej i powinna odpowiadać wymiarowi normalizowanemu.',
      caption: 'A_i,min=(|N_i|)/(σ_dop), d_i=√((4A_i,min)/(π))',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{i,\\min}=\\frac{|N_i|}{\\sigma_{\\mathrm{dop}}},\\qquad d_i=\\sqrt{\\frac{4A_{i,\\min}}{\\pi}}',
    },
    {
      title: 'Krok 4',
      narration:
        'Otrzymujemy kolejno około 19,5, 16,0 i 13,0 mm. Przyjmujemy wymiary normalizowane: 20, 16 i 14 mm. Pola wynoszą wtedy około 314,2, 201,1 i 153,9 mm^2, a naprężenia około 143,3, 149,2 i 129,9 MPa. Wszystkie mieszczą się poniżej 150 MPa.',
      caption:
        'Otrzymujemy kolejno około 19,5, 16,0 i 13,0 mm. Przyjmujemy wymiary normalizowane: 20, 16 i 14 mm. Pola wynoszą wtedy około…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 5',
      narration:
        'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła 20 kN nie spowoduje wyboczenia przy założonej długości i sposobie zamocowania. Dopiero po tej kontroli dobór średnic można uznać za kompletny.',
      caption:
        'Odcinek trzeci jest ściskany. Sam warunek naprężenia nie wystarcza, jeśli odcinek jest długi i smukły. Trzeba sprawdzić, czy siła…',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
