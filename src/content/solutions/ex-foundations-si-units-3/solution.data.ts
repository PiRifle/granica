import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-si-units-3',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 3',
  duration: 7,
  given: ['P = 120 kN', 'σ_dop = 160 MPa', 'dobrano d = 32 mm'],
  result:
    'A_min = 750 mm², d_min ≈ 30,9 mm, przyjęto d = 32 mm, czyli A ≈ 804 mm². Naprężenie wynosi σ ≈ 149 MPa < 160 MPa, więc dobór jest poprawny. Zaokrąglenie średnicy w dół dałoby przekrój mniejszy od minimalnego i naprężenie większe od dopuszczalnego.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'g', label: 'górny', length: 1000, area: 804, n: 120, sigma: 149 },
      { id: 'd', label: 'dolny', length: 1000, area: 804, n: 120, sigma: 149 },
    ],
    loads: [{ node: 2, value: 120, label: 'P = 120 kN' }],
    note: 'Przyjęto pręt okrągły d = 32 mm, A ≈ 804 mm². Podział na dwa odcinki jest schematyczny.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt ma przenieść siłę rozciągającą 120 kN, a naprężenie nie może przekroczyć 160 MPa. Szukamy minimalnego pola przekroju, a następnie dobieramy średnicę pręta okrągłego.',
      caption: 'Pręt rozciągany siłą 120 kN; warunek σ ≤ 160 MPa.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'P=120\\ \\text{kN},\\quad \\sigma_{\\text{dop}}=160\\ \\text{MPa}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Naprężenie obliczamy jako N/A. Warunek bezpieczeństwa ma więc postać N/A ≤ σ_dop. Przy granicy wykorzystania przyjmujemy równość.',
      caption: 'N/A ≤ 160 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma=\\frac{N}{A}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Minimalne pole przekroju',
      narration:
        'Przekształcamy warunek do A_min = N/σ_dop. Siła 120 kN to 120 000 N, a naprężenie 160 N/mm². Dzieląc, otrzymujemy 750 mm².',
      caption: 'A_min = 750 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{\\min}=\\frac{N}{\\sigma_{\\text{dop}}}=\\frac{120\\,000}{160}=750\\ \\text{mm}^2',
    },
    {
      title: 'Minimalna średnica',
      narration:
        'Dla pręta okrągłego A = πd²/4, więc d = √(4A/π). Podstawiamy A_min = 750 mm² i otrzymujemy około 30,9 mm.',
      caption: 'd_min ≈ 30,9 mm.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'd=\\sqrt{\\frac{4A}{\\pi}}=\\sqrt{\\frac{4\\cdot750}{\\pi}}\\approx30{,}9\\ \\text{mm}',
    },
    {
      title: 'Dobór średnicy',
      narration:
        'Nie zamawiamy pręta o średnicy 30,9 mm. Wybieramy dostępny wymiar większy, na przykład 32 mm. Zaokrąglenie w górę zwiększa pole i obniża naprężenie.',
      caption: 'Przyjęto d = 32 mm.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'd=32\\ \\text{mm}',
    },
    {
      title: 'Pole przyjętego przekroju',
      narration:
        'Obliczamy pole dla średnicy 32 mm: A = π · 32² / 4 ≈ 804 mm². Jest ono większe od minimalnego 750 mm².',
      caption: 'A ≈ 804 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=\\frac{\\pi\\cdot32^2}{4}\\approx804\\ \\text{mm}^2',
    },
    {
      title: 'Sprawdzenie naprężenia',
      narration:
        'Dzielimy siłę 120 000 N przez przyjęte pole 804 mm². Otrzymujemy około 149 MPa, czyli mniej niż dopuszczalne 160 MPa.',
      caption: 'σ ≈ 149 MPa < 160 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma=\\frac{120\\,000}{804}\\approx149\\ \\text{MPa}<160\\ \\text{MPa}',
    },
    {
      title: 'Wniosek',
      narration:
        'Wynik jest poniżej 160 MPa, więc dobór jest poprawny. Ten przykład pokazuje typową kolejność pracy: od jednostek przez wzór do decyzji inżynierskiej. Zaokrąglenie średnicy w dół dałoby przekrój mniejszy od minimalnego i naprężenie większe od dopuszczalnego.',
      caption: 'Warunek wytrzymałości jest spełniony dla d = 32 mm.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
    },
  ],
} satisfies SolutionData
