import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-stiffness-condition-3',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 3',
  duration: 7,
  given: ['A=250 mm^2', 'L=2', 'N=30 kN'],
  result:
    'Ten wariant pokazuje, że „wystarczająco mocny” nie znaczy „wystarczająco sztywny”. W zadaniach projektowych warto najpierw policzyć oba minima, a dopiero potem wybierać materiał i wymiar. Czasem tańszy materiał o mniejszym E wymaga tak dużego przekroju, że przestaje być tańszy. Czasem z kolei sztywność jest tak ważna, że wybór materiału jest z góry narzucony.',
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
        area: 250,
        n: 30,
        sigma: 120,
        epsilon: 0.0006,
        deltaL: 0.75,
      },
      {
        id: '2',
        label: '2',
        length: 1250,
        area: 250,
        n: 30,
        sigma: 120,
        epsilon: 0.0006,
        deltaL: 0.75,
      },
    ],
    loads: [
      {
        node: 2,
        value: 30,
        label: 'N = 30 kN',
      },
    ],
    note: 'L = 2500 mm, E = 200 000 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem szukamy wymaganego modułu Younga. Pręt o polu A=250 mm^2 i długości L=2,5 m przenosi siłę N=30 kN. Dopuszczalne wydłużenie wynosi 1,5 mm. Z warunku sztywności przekształcamy wzór do postaci',
      caption:
        'Tym razem szukamy wymaganego modułu Younga. Pręt o polu A=250 mm^2 i długości L=2,5 m przenosi siłę N=30 kN. Dopuszczalne…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'L = 2{,}5 m',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'E_min=(NL)/(A Δ L_dop) =(30 000·2500)/(250·1,5)=200 000 MPa=200 GPa.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        'E_{\\min}=\\frac{NL}{A\\,\\Delta L_{\\mathrm{dop}}}\n=\\frac{30\\,000\\cdot2500}{250\\cdot1{,}5}=200\\,000\\ \\text{MPa}=200\\ \\text{GPa}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Wymagany moduł odpowiada typowej stali. Sprawdźmy naprężenie: σ=30 000/250=120 MPa, czyli poniżej typowej granicy plastyczności 235 MPa. Rozwiązanie jest spójne: stalowy pręt o polu 250 mm^2 wydłuży się dokładnie o 1,5 mm.',
      caption:
        'Wymagany moduł odpowiada typowej stali. Sprawdźmy naprężenie: σ=30 000/250=120 MPa, czyli poniżej typowej granicy plastyczności…',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = 30\\,000/250 = 120 MPa',
    },
    {
      title: 'Krok 4',
      narration:
        'Gdyby ten sam pręt wykonano z aluminium o E=70 GPa, wydłużenie wyniosłoby 30 000·2500/(70 000·250)=4,29 mm, czyli prawie trzy razy więcej niż dopuszczalne. Aby spełnić limit, potrzebne byłoby pole A≥30 000·2500/(70 000·1,5)=714,3 mm^2. Warunek wytrzymałości wymagałby tylko około 191 mm^2, więc sztywność decydowałaby o przekroju i to z dużym zapasem.',
      caption:
        'Gdyby ten sam pręt wykonano z aluminium o E=70 GPa, wydłużenie wyniosłoby 30 000·2500/(70 000·250)=4,29 mm, czyli prawie trzy…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'E = 70 GPa',
    },
    {
      title: 'Krok 5',
      narration:
        'Ten wariant pokazuje, że „wystarczająco mocny” nie znaczy „wystarczająco sztywny”. W zadaniach projektowych warto najpierw policzyć oba minima, a dopiero potem wybierać materiał i wymiar. Czasem tańszy materiał o mniejszym E wymaga tak dużego przekroju, że przestaje być tańszy. Czasem z kolei sztywność jest tak ważna, że wybór materiału jest z góry narzucony.',
      caption:
        'Ten wariant pokazuje, że „wystarczająco mocny” nie znaczy „wystarczająco sztywny”. W zadaniach projektowych warto najpierw…',
      visual: 'axial',
      focus: { metric: 'A' },
    },

    {
      title: 'Krok 6',
      narration: 'Odkształcenie przy przyjętym module: ε = σ/E = 120/200 000 = 0,0006.',
      caption: 'Przy E = 200 GPa wydłużenie εL = 0,0006·2500 = 1,5 mm, czyli dokładnie na granicy.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\sigma/E=120/200\\,000=0{,}0006',
    },
  ],
} satisfies SolutionData
