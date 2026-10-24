import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-si-units',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 1',
  duration: 7,
  given: ['P = 96 kN', 'A = 480 mm²'],
  result: 'Naprężenie wynosi 200 MPa, czyli 20 kN/cm². Dodatnia wartość odpowiada rozciąganiu.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'g', label: 'górny', length: 500, area: 480, n: 96, sigma: 200 },
      { id: 'd', label: 'dolny', length: 500, area: 480, n: 96, sigma: 200 },
    ],
    loads: [{ node: 2, value: 96, label: 'P = 96 kN' }],
    note: 'Podział na dwa odcinki jest schematyczny. Pole i siła są stałe, więc naprężenie jest jednakowe na całej długości.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu przekroju 480 mm² jest rozciągany siłą 96 kN. Mamy obliczyć naprężenie normalne i podać je w MPa oraz w kN/cm².',
      caption: 'Pręt rozciągany siłą 96 kN, pole przekroju 480 mm².',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'P=96\\ \\text{kN},\\quad A=480\\ \\text{mm}^2',
    },
    {
      title: 'Przeliczenie siły na niutony',
      narration:
        'Aby otrzymać naprężenie w MPa, podajemy siłę w niutonach. Jeden kiloniuton to tysiąc niutonów, więc 96 kN = 96 000 N.',
      caption: 'P = 96 000 N.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '96\\ \\text{kN}=96\\,000\\ \\text{N}',
    },
    {
      title: 'Pole w mm²',
      narration:
        'Pole zostawiamy w mm², bo razem z niutonami daje naprężenie w N/mm², czyli w megapaskalach. Nie ma potrzeby zamieniać go na m².',
      caption: 'A = 480 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=480\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie normalne',
      narration:
        'Dzielimy siłę przez pole: σ = 96 000 / 480 = 200 N/mm². Wynik jest dodatni, więc pręt jest rozciągany.',
      caption: 'σ = 200 N/mm².',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma=\\frac{96\\,000}{480}=200\\ \\text{N/mm}^2',
    },
    {
      title: 'Wynik w megapaskalach',
      narration: 'Jeden N/mm² to dokładnie jeden MPa. Naprężenie wynosi więc 200 MPa.',
      caption: 'σ = 200 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma=200\\ \\text{MPa}',
    },
    {
      title: 'Zamiana na kN/cm²',
      narration:
        'W praktyce projektowej często podaje się naprężenie w kN/cm². Ponieważ 1 MPa = 0,1 kN/cm², wartość 200 MPa odpowiada 20 kN/cm².',
      caption: 'σ = 20 kN/cm².',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
      formula: '200\\ \\text{MPa}=20\\ \\text{kN/cm}^2',
    },
    {
      title: 'Kontrola jednostek',
      narration:
        'Sprawdzamy przelicznik: 1 MPa = 1 N/mm² = 100 N/cm² = 0,1 kN/cm². Zgodność jednostek potwierdza, że wynik 20 kN/cm² jest poprawny.',
      caption: '1 MPa = 0,1 kN/cm².',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
      formula: '1\\ \\text{MPa}=0{,}1\\ \\text{kN/cm}^2',
    },
  ],
} satisfies SolutionData
