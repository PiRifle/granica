import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-thermal-free-restrained',
  title: 'Temperatura: swoboda i zablokowanie — przykład 1',
  duration: 7,
  given: ['L=8 m', 'alpha=12', 'E=200 GPa', 's=2 mm', 'T=35 K', 'A=600 mm^2'],
  result:
    'Szyna wydłużyłaby się swobodnie o 3,36 mm, ale luz pozwala na 2 mm. Po zamknięciu szczeliny w szynie powstaje ściskanie około 34 MPa, a podpora działa siłą około 20,4 kN.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'gap',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
      αΔT: '–',
      ΔL_T: 'mm',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 4000,
        area: 600,
        n: -20.4,
        sigma: -34,
        epsilon: -0.00017,
        deltaL: -0.68,
        thermalStrain: 0.00042,
        freeDeltaL: 1.68,
      },
      {
        id: '2',
        label: '2',
        length: 4000,
        area: 600,
        n: -20.4,
        sigma: -34,
        epsilon: -0.00017,
        deltaL: -0.68,
        thermalStrain: 0.00042,
        freeDeltaL: 1.68,
      },
    ],
    note: 'ΔT = 35 K, luz 2 mm; swobodne wydłużenie sumuje się do 3,36 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Swobodne wydłużenie: Δ L_T=α LΔ T=12·10^-6·8000·35=3,36 mm.',
      caption: 'Swobodne wydłużenie: Δ L_T=α LΔ T=12·10^-6·8000·35=3,36 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
      formula: '\\Delta L_T=\\alpha L\\Delta T=12\\cdot10^{-6}\\cdot8000\\cdot35=3{,}36\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Luz 2 mm jest mniejszy od 3,36 mm, więc szczelina zamyka się, a dalszy wzrost temperatury działa już na podporę.',
      caption:
        'Luz 2 mm jest mniejszy od 3,36 mm, więc szczelina zamyka się, a dalszy wzrost temperatury działa już na podporę.',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
      formula: '2\\ \\text{mm}',
    },
    {
      title: 'Krok 3',
      narration: 'Pozostaje zablokować 3,36-2=1,36 mm wydłużenia.',
      caption: 'Pozostaje zablokować 3,36-2=1,36 mm wydłużenia.',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
      formula: '3{,}36-2=1{,}36\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration: 'Odkształcenie mechaniczne: ε_m=-1,36/8000=-0,00017.',
      caption: 'Odkształcenie mechaniczne: ε_m=-1,36/8000=-0,00017.',
      visual: 'thermal',
      focus: { metric: 'ε' },
      formula: '\\varepsilon_m=-1{,}36/8000=-0{,}00017',
    },
    {
      title: 'Krok 5',
      narration: 'Naprężenie: σ=Eε_m=200 000·(-0,00017)=-34 MPa.',
      caption: 'Naprężenie: σ=Eε_m=200 000·(-0,00017)=-34 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=E\\varepsilon_m=200\\,000\\cdot(-0{,}00017)=-34\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration: 'Reakcja przy założonym polu: R=σ A=-34·600=-20 400 N≈-20,4 kN.',
      caption: 'Reakcja przy założonym polu: R=σ A=-34·600=-20 400 N≈-20,4 kN.',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'R=\\sigma A=-34\\cdot600=-20\\,400\\ \\text{N}\\approx-20{,}4\\ \\text{kN}',
    },
    {
      title: 'Krok 7',
      narration:
        'Kontrola: bez luzu naprężenie wynosiłoby -EαΔ T=-84 MPa, więc szczelina zmniejszyła je ponad dwukrotnie.',
      caption:
        'Kontrola: bez luzu naprężenie wynosiłoby -EαΔ T=-84 MPa, więc szczelina zmniejszyła je ponad dwukrotnie.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '-E\\alpha\\Delta T=-84\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
