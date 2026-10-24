import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-elongation',
  title: 'Wydłużenia i skrócenia prętów — przykład 1',
  duration: 7,
  given: ['N = 24 kN', 'L₁ = 1,2 m', 'A₁ = 240 mm²', 'L₂ = 0,8 m', 'A₂ = 120 mm²', 'E = 200 GPa'],
  result:
    'ΔL₁ = 0,60 mm, ΔL₂ = 0,80 mm, a całkowite wydłużenie pręta wynosi 1,40 mm. Odkształcenie drugiego odcinka jest dwa razy większe, mimo że jego wkład w wydłużenie jest tylko o jedną trzecią większy, bo odcinek jest krótszy.',
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
        length: 1200,
        area: 240,
        n: 24,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.6,
      },
      {
        id: '2',
        label: '2',
        length: 800,
        area: 120,
        n: 24,
        sigma: 200,
        epsilon: 0.001,
        deltaL: 0.8,
      },
    ],
    loads: [
      {
        node: 2,
        value: 24,
        label: 'N = 24 kN',
      },
    ],
    note: 'N jest stałe na obu odcinkach; E = 200 000 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Przelicz dane: N = 24 000 N, L₁ = 1200 mm, L₂ = 800 mm, E = 200 000 MPa.',
      caption: 'Przelicz dane: N = 24 000 N, L₁ = 1200 mm, L₂ = 800 mm, E = 200 000 MPa.',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: 'N = 24\\,000 N, L_{1} = 1200 mm, L_{2} = 800 mm, E = 200\\,000 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Odcinek 1: ΔL₁ = 24 000·1200/(200 000·240) = 0,60 mm.',
      caption: 'Odcinek 1: ΔL₁ = 24 000·1200/(200 000·240) = 0,60 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
        segment: '1',
      },
      formula: '\\Delta L_{1} = 24\\,000\\cdot 1200/(200\\,000\\cdot 240) = 0{,}60 mm',
    },
    {
      title: 'Krok 3',
      narration: 'Odcinek 2: ΔL₂ = 24 000·800/(200 000·120) = 0,80 mm.',
      caption: 'Odcinek 2: ΔL₂ = 24 000·800/(200 000·120) = 0,80 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
        segment: '2',
      },
      formula: '\\Delta L_{2} = 24\\,000\\cdot 800/(200\\,000\\cdot 120) = 0{,}80 mm',
    },
    {
      title: 'Krok 4',
      narration: 'Oba odcinki są rozciągane, więc oba wkłady są dodatnie: ΔL = ΔL₁ + ΔL₂.',
      caption: 'Oba odcinki są rozciągane, więc oba wkłady są dodatnie: ΔL = ΔL₁ + ΔL₂.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
      },
      formula: '\\Delta L = \\Delta L_{1} + \\Delta L_{2}',
    },
    {
      title: 'Krok 5',
      narration: 'Całkowite wydłużenie: ΔL = 0,60 + 0,80 = 1,40 mm.',
      caption: 'Całkowite wydłużenie: ΔL = 0,60 + 0,80 = 1,40 mm.',
      visual: 'axial',
      focus: {
        metric: 'ΔL',
      },
      formula: '\\Delta L = 0{,}60 + 0{,}80 = 1{,}40 mm',
    },
    {
      title: 'Krok 6',
      narration: 'Sprawdź odkształcenia: ε₁ = 0,60/1200 = 0,0005, ε₂ = 0,80/800 = 0,001.',
      caption: 'Sprawdź odkształcenia: ε₁ = 0,60/1200 = 0,0005, ε₂ = 0,80/800 = 0,001.',
      visual: 'axial',
      focus: {
        metric: 'ε',
      },
      formula: '\\varepsilon_{1} = 0{,}60/1200 = 0{,}0005, \\varepsilon_{2} = 0{,}80/800 = 0{,}001',
    },
    {
      title: 'Krok 7',
      narration:
        'Sprawdź naprężenia: σ₁ = 24 000/240 = 100 MPa, σ₂ = 24 000/120 = 200 MPa. Oba są poniżej typowej granicy plastyczności stali 235 MPa, więc model liniowy jest uzasadniony.',
      caption:
        'Sprawdź naprężenia: σ₁ = 24 000/240 = 100 MPa, σ₂ = 24 000/120 = 200 MPa. Oba są poniżej typowej granicy plastyczności stali 235…',
      visual: 'axial',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma_{1} = 24\\,000/240 = 100 MPa, \\sigma_{2} = 24\\,000/120 = 200 MPa',
    },
  ],
} satisfies SolutionData
