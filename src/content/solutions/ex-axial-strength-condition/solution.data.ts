import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-strength-condition',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 1',
  duration: 7,
  given: ['N = 90 kN', 'Re = 235 MPa', 'n = 1,5', 'A = 600 mm'],
  result:
    'Amin = 574,5 mm², a przekrój 600 mm² spełnia warunek: σ = 150 MPa, nrz = 1,567, czyli zapas jest większy od wymaganego 1,5.',
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
        area: 600,
        n: 90,
        sigma: 150,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 600,
        n: 90,
        sigma: 150,
      },
    ],
    loads: [
      {
        node: 2,
        value: 90,
        label: 'N = 90 kN',
      },
    ],
    note: 'Przyjęte A = 600 mm²; długość schematyczna.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Oblicz naprężenie dopuszczalne: σdop = Re/n = 235/1,5 = 156,7 MPa.',
      caption: 'Oblicz naprężenie dopuszczalne: σdop = Re/n = 235/1,5 = 156,7 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\mathrm{dop}} = Re/n = 235/1{,}5 = 156{,}7 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Wyznacz minimalne pole: Amin = |N|/σdop = 90 000/156,7 = 574,5 mm².',
      caption: 'Wyznacz minimalne pole: Amin = |N|/σdop = 90 000/156,7 = 574,5 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{\\min} = |N|/\\sigma_{\\mathrm{dop}} = 90\\,000/156{,}7 = 574{,}5 mm^{2}',
    },
    {
      title: 'Krok 3',
      narration: 'Przyjęte A = 600 mm² jest większe od Amin, więc wstępny dobór jest poprawny.',
      caption: 'Przyjęte A = 600 mm² jest większe od Amin, więc wstępny dobór jest poprawny.',
      visual: 'axial',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 4',
      narration: 'Sprawdź rzeczywiste naprężenie: σ = 90 000/600 = 150 MPa.',
      caption: 'Sprawdź rzeczywiste naprężenie: σ = 90 000/600 = 150 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = 90\\,000/600 = 150 MPa',
    },
    {
      title: 'Krok 5',
      narration: 'Porównaj z dopuszczalnym: 150 MPa jest mniejsze od 156,7 MPa, więc warunek jest spełniony.',
      caption: 'Porównaj z dopuszczalnym: 150 MPa jest mniejsze od 156,7 MPa, więc warunek jest spełniony.',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 6',
      narration: 'Oblicz rzeczywisty zapas: nrz = 235/150 = 1,567.',
      caption: 'Oblicz rzeczywisty zapas: nrz = 235/150 = 1,567.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: 'n_{\\mathrm{rz}} = 235/150 = 1{,}567',
    },
    {
      title: 'Krok 7',
      narration:
        'Sprawdź zakres sprężysty: 150 MPa jest znacznie poniżej 235 MPa, więc model liniowy jest uzasadniony.',
      caption: 'Sprawdź zakres sprężysty: 150 MPa jest znacznie poniżej 235 MPa, więc model liniowy jest uzasadniony.',
      visual: 'axial',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 8',
      narration:
        'Zauważ, że przekrój 570 mm² dałby σ = 157,9 MPa, czyli przekroczyłby wartość dopuszczalną. Zaokrąglenie w dół byłoby błędem.',
      caption:
        'Zauważ, że przekrój 570 mm² dałby σ = 157,9 MPa, czyli przekroczyłby wartość dopuszczalną. Zaokrąglenie w dół byłoby błędem.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = 157{,}9 MPa',
    },
  ],
} satisfies SolutionData
