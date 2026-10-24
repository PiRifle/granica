import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-allowable-safety-factor',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 1',
  duration: 7,
  given: ['N=120 kN', 'R_e=235 MPa', 'n=1'],
  result:
    'Cięgno o średnicy 32 mm ma pole około 804 mm^2, naprężenie około 149 MPa i rzeczywisty współczynnik bezpieczeństwa około 1,58 względem R_e. Warunek wytrzymałościowy jest spełniony.',
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
        area: 804,
        n: 120,
        sigma: 149.2,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 804,
        n: 120,
        sigma: 149.2,
      },
    ],
    loads: [
      {
        node: 2,
        value: 120,
        label: 'N = 120 kN',
      },
    ],
    note: 'Przyjęto d = 32 mm, A = 804 mm²; długość schematyczna.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Naprężenie dopuszczalne: σ_dop=R_e/n=235/1,5≈156,7 MPa.',
      caption: 'Naprężenie dopuszczalne: σ_dop=R_e/n=235/1,5≈156,7 MPa.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: '\\sigma_{\\mathrm{dop}}=R_e/n=235/1{,}5\\approx156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Krok 2',
      narration: 'Minimalne pole: A_min=N/σ_dop=120 000/156,7≈766 mm^2.',
      caption: 'Minimalne pole: A_min=N/σ_dop=120 000/156,7≈766 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'A_{\\min}=N/\\sigma_{\\mathrm{dop}}=120\\,000/156{,}7\\approx766\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration: 'Wymagana średnica: d_min=√(4A_min/π)=√(4·766/π)≈31,2 mm.',
      caption: 'Wymagana średnica: d_min=√(4A_min/π)=√(4·766/π)≈31,2 mm.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'd_{\\min}=\\sqrt{4A_{\\min}/\\pi}=\\sqrt{4\\cdot766/\\pi}\\approx31{,}2\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration: 'Wybieramy standardową średnicę d=32 mm, czyli pole A=π·32^2/4≈804 mm^2.',
      caption: 'Wybieramy standardową średnicę d=32 mm, czyli pole A=π·32^2/4≈804 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'd=32\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Rzeczywiste naprężenie: σ=120 000/804≈149,2 MPa.',
      caption: 'Rzeczywiste naprężenie: σ=120 000/804≈149,2 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=120\\,000/804\\approx149{,}2\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration: 'Rzeczywisty współczynnik: n_rz=235/149,2≈1,58.',
      caption: 'Rzeczywisty współczynnik: n_rz=235/149,2≈1,58.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'n_{\\mathrm{rz}}=235/149{,}2\\approx1{,}58',
    },
    {
      title: 'Krok 7',
      narration: 'Kontrola: 149,2 MPa≤156,7 MPa oraz 1,58≥1,5, więc warunek jest spełniony.',
      caption: 'Kontrola: 149,2 MPa≤156,7 MPa oraz 1,58≥1,5, więc warunek jest spełniony.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '149{,}2\\ \\text{MPa}\\le156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Krok 8',
      narration:
        'Uwaga: R_m dla tej stali jest większe, ale nie używamy go, ponieważ krytyczne jest nadmierne odkształcenie trwałe, a nie zerwanie.',
      caption:
        'Uwaga: R_m dla tej stali jest większe, ale nie używamy go, ponieważ krytyczne jest nadmierne odkształcenie trwałe, a nie zerwanie.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_m',
    },
  ],
} satisfies SolutionData
