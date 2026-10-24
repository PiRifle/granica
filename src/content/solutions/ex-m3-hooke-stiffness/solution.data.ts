import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-hooke-stiffness',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 1',
  duration: 7,
  given: ['L=2 m', 'A=250 mm^2', 'N=50 kN', 'E=200 GPa'],
  result:
    'Pręt ma naprężenie 200 MPa, odkształcenie 0,001 i wydłuża się o 2 mm, o ile pozostaje w zakresie sprężystym. Jego sztywność osiowa wynosi około 25 MN/m.',
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
        area: 250,
        n: 50,
        sigma: 200,
        epsilon: 0.001,
        deltaL: 1,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 250,
        n: 50,
        sigma: 200,
        epsilon: 0.001,
        deltaL: 1,
      },
    ],
    loads: [
      {
        node: 2,
        value: 50,
        label: 'N = 50 kN',
      },
    ],
    note: 'k = EA/L = 25 000 N/mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Naprężenie: σ=N/A=50 000/250=200 MPa.',
      caption: 'Naprężenie: σ=N/A=50 000/250=200 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=N/A=50\\,000/250=200\\ \\text{MPa}',
    },
    {
      title: 'Krok 2',
      narration: 'Odkształcenie z prawa Hooke’a: ε=σ/E=200/200 000=0,001.',
      caption: 'Odkształcenie z prawa Hooke’a: ε=σ/E=200/200 000=0,001.',
      visual: 'thermal',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\sigma/E=200/200\\,000=0{,}001',
    },
    {
      title: 'Krok 3',
      narration: 'Wydłużenie: Δ L=ε L=0,001· 2000 mm=2 mm.',
      caption: 'Wydłużenie: Δ L=ε L=0,001· 2000 mm=2 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\varepsilon L=0{,}001\\cdot 2000\\ \\text{mm}=2\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration: 'Ten sam wynik daje Δ L=NL/(EA)=50 000· 2000/(200 000· 250)=2 mm.',
      caption: 'Ten sam wynik daje Δ L=NL/(EA)=50 000· 2000/(200 000· 250)=2 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=NL/(EA)=50\\,000\\cdot 2000/(200\\,000\\cdot 250)=2\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Sztywność: k=EA/L=200 000· 250/2000=25 000 N/mm, czyli 25 MN/m.',
      caption: 'Sztywność: k=EA/L=200 000· 250/2000=25 000 N/mm, czyli 25 MN/m.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'k=EA/L=200\\,000\\cdot 250/2000=25\\,000\\ \\text{N/mm}',
    },
    {
      title: 'Krok 6',
      narration: 'Kontrola: kΔ L=25 000· 2=50 000 N, zgodnie z zadaną siłą.',
      caption: 'Kontrola: kΔ L=25 000· 2=50 000 N, zgodnie z zadaną siłą.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: 'k\\Delta L=25\\,000\\cdot 2=50\\,000\\ \\text{N}',
    },
    {
      title: 'Krok 7',
      narration:
        'Sprawdzenie zakresu: 200 MPa jest mniejsze od typowej granicy plastyczności stali 235 MPa, więc wynik jest wiarygodny.',
      caption:
        'Sprawdzenie zakresu: 200 MPa jest mniejsze od typowej granicy plastyczności stali 235 MPa, więc wynik jest wiarygodny.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '200\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
