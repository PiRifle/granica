import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-si-units-2',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 2',
  duration: 7,
  given: ['b = 250 mm', 't = 12 mm', 'P = 150 kN', 'L = 2,5 m', 'E = 200 GPa'],
  result:
    'A = 3000 mm², σ = 50 MPa, ΔL = 0,625 mm. Sprawdzenie: 200 000 MPa to 200 000 N/mm². Iloczyn EA ma więc jednostkę N, a NL jednostkę N·mm. Iloraz daje mm, zgodnie z oczekiwaniem. Wydłużenie 0,625 mm na długości 2500 mm to około 0,025 procenta, co jest typowe dla stali w zakresie sprężystym.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²', ΔL: 'mm' },
    segments: [
      { id: 'g', label: 'górny', length: 1250, area: 3000, n: 150, sigma: 50, epsilon: 0.00025, deltaL: 0.3125 },
      { id: 'd', label: 'dolny', length: 1250, area: 3000, n: 150, sigma: 50, epsilon: 0.00025, deltaL: 0.3125 },
    ],
    loads: [{ node: 2, value: 150, label: 'P = 150 kN' }],
    note: 'Taśmę podzielono schematycznie na dwa odcinki po 1250 mm. Oba wydłużają się o 0,3125 mm, razem 0,625 mm.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Taśma stalowa ma szerokość 250 mm i grubość 12 mm. Działa na nią siła rozciągająca 150 kN. Obliczamy naprężenie oraz wydłużenie odcinka o długości 2,5 m, przyjmując moduł Younga stali E = 200 GPa.',
      caption: 'Taśma 250 × 12 mm rozciągana siłą 150 kN.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'b=250\\ \\text{mm},\\quad t=12\\ \\text{mm},\\quad P=150\\ \\text{kN},\\quad E=200\\ \\text{GPa}',
    },
    {
      title: 'Pole przekroju',
      narration: 'Pole prostokąta to iloczyn szerokości i grubości. Mnożymy 250 mm przez 12 mm i otrzymujemy 3000 mm².',
      caption: 'A = 3000 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=250\\ \\text{mm}\\cdot12\\ \\text{mm}=3000\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie',
      narration: 'Siła w niutonach wynosi 150 000 N. Dzieląc ją przez 3000 mm², otrzymujemy 50 N/mm², czyli 50 MPa.',
      caption: 'σ = 50 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma=\\frac{150\\,000}{3000}=50\\ \\text{N/mm}^2=50\\ \\text{MPa}',
    },
    {
      title: 'Jednostki długości i modułu',
      narration:
        'Do wydłużenia używamy ΔL = NL/(EA). Długość podajemy w milimetrach, bo pole jest w mm², a moduł w MPa. Dlatego L = 2500 mm, a E = 200 000 MPa.',
      caption: 'L = 2500 mm, E = 200 000 MPa.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: 'g' },
      formula: 'L=2{,}5\\ \\text{m}=2500\\ \\text{mm},\\qquad E=200\\,000\\ \\text{MPa}',
    },
    {
      title: 'Wzór na wydłużenie',
      narration:
        'Podstawiamy siłę, długość, moduł i pole do wzoru ΔL = NL/(EA). Licznik ma jednostkę N·mm, a mianownik N, więc wynik wyjdzie w milimetrach.',
      caption: 'ΔL = 150 000 · 2500 / (200 000 · 3000).',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: 'g' },
      formula: '\\Delta L=\\frac{NL}{EA}=\\frac{150\\,000\\cdot2500}{200\\,000\\cdot3000}',
    },
    {
      title: 'Wynik wydłużenia',
      narration:
        'Licznik wynosi 375 000 000, a mianownik 600 000 000. Iloraz daje 0,625 mm. Każdy z dwóch schematycznych odcinków wydłuża się o 0,3125 mm.',
      caption: 'ΔL = 0,625 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: 'd' },
      formula: '=\\frac{375\\,000\\,000}{600\\,000\\,000}\\ \\text{mm}=0{,}625\\ \\text{mm}',
    },
    {
      title: 'Kontrola odkształcenia',
      narration:
        'Odkształcenie to wydłużenie podzielone przez długość: ε = 0,625 / 2500 = 0,00025. W procentach daje to 0,025%, typowo dla stali w zakresie sprężystym.',
      caption: 'ε = 0,00025, czyli 0,025%.',
      visual: 'axial',
      focus: { metric: 'ε', segment: 'g' },
      formula: '\\varepsilon=\\frac{\\Delta L}{L}=\\frac{0{,}625}{2500}=0{,}00025',
    },
    {
      title: 'Kontrola jednostek',
      narration:
        'Iloczyn EA ma jednostkę N, a NL jednostkę N·mm. Iloraz daje mm, zgodnie z oczekiwaniem. Sprawdzenie wymiarowe potwierdza, że nie pomylono megapaskali z paskalami ani metrów z milimetrami.',
      caption: 'Jednostki wyniku są zgodne z jednostką długości.',
      visual: 'axial',
      focus: { metric: 'ε', segment: 'd' },
      formula: '\\frac{\\text{N}\\cdot\\text{mm}}{\\text{N}}=\\text{mm}',
    },
  ],
} satisfies SolutionData
