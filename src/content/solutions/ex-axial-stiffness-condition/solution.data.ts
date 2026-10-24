import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stiffness-condition',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 1',
  duration: 7,
  given: ['N = 80 kN', 'L = 2 m', 'E = 200 GPa'],
  result:
    'Minimalne pole wynosi 800 mm² i decyduje sztywność. Dla tego pola ΔL = 1,0 mm, σ = 100 MPa, a zapas względem granicy plastyczności wynosi 2,35.',
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
        area: 800,
        n: 80,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.5,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 800,
        n: 80,
        sigma: 100,
        epsilon: 0.0005,
        deltaL: 0.5,
      },
    ],
    loads: [
      {
        node: 2,
        value: 80,
        label: 'N = 80 kN',
      },
    ],
    note: 'E = 200 000 MPa; ΔL = 1,0 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Warunek sztywności: Amin,Δ = NL/(EΔLdop). Przyjmij N = 80 000 N, L = 2000 mm i E = 200 000 MPa.',
      caption: 'Warunek sztywności: Amin,Δ = NL/(EΔLdop). Przyjmij N = 80 000 N, L = 2000 mm i E = 200 000 MPa.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'A_{\\min},\\Delta = NL/(E\\Delta L_{\\mathrm{dop}})',
    },
    {
      title: 'Krok 2',
      narration: 'Oblicz Amin,Δ = 80 000·2000/(200 000·1) = 800 mm².',
      caption: 'Oblicz Amin,Δ = 80 000·2000/(200 000·1) = 800 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{\\min},\\Delta = 80\\,000\\cdot 2000/(200\\,000\\cdot 1) = 800 mm^{2}',
    },
    {
      title: 'Krok 3',
      narration: 'Warunek wytrzymałości: Amin,σ = N/σdop = 80 000/160 = 500 mm².',
      caption: 'Warunek wytrzymałości: Amin,σ = N/σdop = 80 000/160 = 500 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_{\\min},\\sigma = N/\\sigma_{\\mathrm{dop}} = 80\\,000/160 = 500 mm^{2}',
    },
    {
      title: 'Krok 4',
      narration: 'Przyjmij A ≥ max(800, 500) = 800 mm², ponieważ muszą być spełnione oba warunki.',
      caption: 'Przyjmij A ≥ max(800, 500) = 800 mm², ponieważ muszą być spełnione oba warunki.',
      visual: 'axial',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 5',
      narration: 'Dla A = 800 mm²: ΔL = 80 000·2000/(200 000·800) = 1,0 mm, czyli dokładnie na granicy dopuszczalnej.',
      caption: 'Dla A = 800 mm²: ΔL = 80 000·2000/(200 000·800) = 1,0 mm, czyli dokładnie na granicy dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L = 80\\,000\\cdot 2000/(200\\,000\\cdot 800) = 1{,}0 mm',
    },
    {
      title: 'Krok 6',
      narration: 'Naprężenie wynosi σ = 80 000/800 = 100 MPa, czyli jest mniejsze od 160 MPa.',
      caption: 'Naprężenie wynosi σ = 80 000/800 = 100 MPa, czyli jest mniejsze od 160 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = 80\\,000/800 = 100 MPa',
    },
    {
      title: 'Krok 7',
      narration: 'Rzeczywisty zapas względem typowej granicy plastyczności 235 MPa wynosi 235/100 = 2,35.',
      caption: 'Rzeczywisty zapas względem typowej granicy plastyczności 235 MPa wynosi 235/100 = 2,35.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '235/100 = 2{,}35',
    },
    {
      title: 'Krok 8',
      narration:
        'Gdyby przyjąć A = 500 mm², warunek wytrzymałości byłby spełniony, ale ΔL = 1,6 mm przekroczyłoby limit. Decyduje sztywność.',
      caption:
        'Gdyby przyjąć A = 500 mm², warunek wytrzymałości byłby spełniony, ale ΔL = 1,6 mm przekroczyłoby limit. Decyduje sztywność.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L = 1{,}6 mm',
    },

    {
      title: 'Krok 9',
      narration: 'Kontrola odkształcenia: ε = σ/E = 100/200 000 = 0,0005, czyli 0,05%.',
      caption: 'Odkształcenie jest stałe na całej długości, bo N i A są stałe.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\sigma/E=100/200\\,000=0{,}0005',
    },
  ],
} satisfies SolutionData
