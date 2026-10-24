import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-stiffness-design',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 1',
  duration: 7,
  given: ['L=2', 'N=60 kN', 'E=200 GPa', 'sigma_{dop}=160 MPa', 'L_{dop}=1'],
  result:
    'Decyduje warunek sztywności. Minimalne pole wynosi 625 mm^2, a po zaokrągleniu do 30 mm otrzymujemy naprężenie około 84,9 MPa i wydłużenie około 1,06 mm. Oba warunki są spełnione.',
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
        length: 1250,
        area: 706.9,
        n: 60,
        sigma: 84.9,
        epsilon: 0.0004245,
        deltaL: 0.53,
      },
      {
        id: '2',
        label: '2',
        length: 1250,
        area: 706.9,
        n: 60,
        sigma: 84.9,
        epsilon: 0.0004245,
        deltaL: 0.53,
      },
    ],
    loads: [
      {
        node: 2,
        value: 60,
        label: 'N = 60 kN',
      },
    ],
    note: 'Przyjęto d = 30 mm, A = 706,9 mm²; ΔL ≈ 1,06 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Warunek wytrzymałości: A_σ=N/σ_dop=60 000/160=375 mm^2.',
      caption: 'Warunek wytrzymałości: A_σ=N/σ_dop=60 000/160=375 mm^2.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'A_\\sigma=N/\\sigma_{\\mathrm{dop}}=60\\,000/160=375\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration: 'Warunek sztywności: A_δ=NL/(EΔ L_dop)=60 000·2500/(200 000·1,2)=625 mm^2.',
      caption: 'Warunek sztywności: A_δ=NL/(EΔ L_dop)=60 000·2500/(200 000·1,2)=625 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'A_\\delta=NL/(E\\Delta L_{\\mathrm{dop}})=60\\,000\\cdot2500/(200\\,000\\cdot1{,}2)=625\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration: 'Porównanie: 625 mm^2 jest większe od 375 mm^2, więc decyduje sztywność.',
      caption: 'Porównanie: 625 mm^2 jest większe od 375 mm^2, więc decyduje sztywność.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: '625\\ \\text{mm}^2',
    },
    {
      title: 'Krok 4',
      narration: 'Wymagana średnica: d_min=√(4·625/π)≈28,2 mm.',
      caption: 'Wymagana średnica: d_min=√(4·625/π)≈28,2 mm.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'd_{\\min}=\\sqrt{4\\cdot625/\\pi}\\approx28{,}2\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Wybieramy d=30 mm, czyli A=π·30^2/4≈706,9 mm^2.',
      caption: 'Wybieramy d=30 mm, czyli A=π·30^2/4≈706,9 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'd=30\\ \\text{mm}',
    },
    {
      title: 'Krok 6',
      narration: 'Rzeczywiste naprężenie: σ=60 000/706,9≈84,9 MPa≤160 MPa.',
      caption: 'Rzeczywiste naprężenie: σ=60 000/706,9≈84,9 MPa≤160 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=60\\,000/706{,}9\\approx84{,}9\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Krok 7',
      narration: 'Rzeczywiste wydłużenie: Δ L=60 000·2500/(200 000·706,9)≈1,06 mm≤1,2 mm.',
      caption: 'Rzeczywiste wydłużenie: Δ L=60 000·2500/(200 000·706,9)≈1,06 mm≤1,2 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=60\\,000\\cdot2500/(200\\,000\\cdot706{,}9)\\approx1{,}06\\ \\text{mm}\\le1{,}2\\ \\text{mm}',
    },
    {
      title: 'Krok 8',
      narration:
        'Kontrola: przy średnicy 28 mm pole wynosi około 615,8 mm^2, więc wydłużenie przekroczyłoby 1,2 mm. Zaokrąglenie w górę było konieczne.',
      caption:
        'Kontrola: przy średnicy 28 mm pole wynosi około 615,8 mm^2, więc wydłużenie przekroczyłoby 1,2 mm. Zaokrąglenie w górę było…',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: '28\\ \\text{mm}',
    },

    {
      title: 'Krok 9',
      narration: 'Kontrola odkształcenia: ε = σ/E = 84,9/200 000 ≈ 0,000425, a ΔL = εL ≈ 1,06 mm.',
      caption: 'Oba warunki są spełnione: σ = 84,9 MPa < 160 MPa oraz ΔL ≈ 1,06 mm < 1,2 mm.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\sigma/E=84{,}9/200\\,000\\approx0{,}000425',
    },
  ],
} satisfies SolutionData
