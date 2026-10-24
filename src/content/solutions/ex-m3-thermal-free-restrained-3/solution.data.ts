import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-thermal-free-restrained-3',
  title: 'Temperatura: swoboda i zablokowanie — przykład 3',
  duration: 7,
  given: ['L=10 m', 'alpha=12', 'E=200 GPa', 'sigma_{dop}=80 MPa'],
  result:
    'W tym zadaniu jest jeszcze jedno ograniczenie. Rura jest ściskana, więc jeśli jest smukła, może wyboczyć się przed osiągnięciem 80 MPa. Wtedy o dopuszczalnej temperaturze decyduje stateczność, a nie wytrzymałość materiału. Warunek naprężeniowy jest konieczny, ale nie zawsze wystarczający.',
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
        length: 5000,
        sigma: -108,
        epsilon: -0.00054,
        deltaL: -2.7,
        thermalStrain: 0.00084,
        freeDeltaL: 4.2,
      },
      {
        id: '2',
        label: '2',
        length: 5000,
        sigma: -108,
        epsilon: -0.00054,
        deltaL: -2.7,
        thermalStrain: 0.00084,
        freeDeltaL: 4.2,
      },
    ],
    note: 'ΔT = 70 K, luz 3 mm; σ = −108 MPa przekracza σ_dop = 80 MPa. Pole A nie jest potrzebne.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Przyjmijmy, że projektujemy szczelinę dla stalowej rury o długości L=10 m, α=12·10^-6 1/K i E=200 GPa. Dopuszczalne naprężenie ściskające wynosi σ_dop=80 MPa. Pytamy, jaka może być największa zmiana temperatury, jeśli luz ma 3 mm.',
      caption:
        'Przyjmijmy, że projektujemy szczelinę dla stalowej rury o długości L=10 m, α=12·10^-6 1/K i E=200 GPa. Dopuszczalne naprężenie…',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
      formula: 'L = 10 m, \\alpha = 12\\cdot 10^{-6} 1/K',
    },
    {
      title: 'Krok 2',
      narration: 'Najpierw wyznaczamy temperaturę, przy której luz się zamyka:',
      caption: 'Najpierw wyznaczamy temperaturę, przy której luz się zamyka:',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'Δ T_1=(s)/(α L)=(3)/(12·10^-6·10 000)=25 K.',
      visual: 'thermal',
      focus: { metric: 'ΔL_T' },
      formula: '\\Delta T_1=\\frac{s}{\\alpha L}=\\frac{3}{12\\cdot10^{-6}\\cdot10\\,000}=25\\ \\text{K}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Dopiero powyżej tej temperatury pojawia się naprężenie. Dodatkowy przyrost temperatury, który wywoła naprężenie 80 MPa, wynosi',
      caption:
        'Dopiero powyżej tej temperatury pojawia się naprężenie. Dodatkowy przyrost temperatury, który wywoła naprężenie 80 MPa, wynosi',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'Δ T_2=(σ_dop)/(Eα) =(80)/(200 000·12·10^-6)≈33,3 K.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula:
        '\\Delta T_2=\\frac{\\sigma_{\\mathrm{dop}}}{E\\alpha}\n=\\frac{80}{200\\,000\\cdot12\\cdot10^{-6}}\\approx33{,}3\\ \\text{K}.',
    },
    {
      title: 'Krok 6',
      narration:
        'Łącznie dopuszczalny przyrost temperatury to około 25+33,3=58,3 K. Przy Δ T=70 K naprężenie wyniosłoby',
      caption: 'Łącznie dopuszczalny przyrost temperatury to około 25+33,3=58,3 K. Przy Δ T=70 K naprężenie wyniosłoby',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
      formula: '25+33{,}3 = 58{,}3 K',
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: 'σ=-E(αΔ T-(s)/(L)) =-200 000(12·10^-6·70-(3)/(10 000)) ≈-108 MPa,',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula:
        '\\sigma=-E\\left(\\alpha\\Delta T-\\frac{s}{L}\\right)\n=-200\\,000\\left(12\\cdot10^{-6}\\cdot70-\\frac{3}{10\\,000}\\right)\n\\approx-108\\ \\text{MPa},',
    },
    {
      title: 'Krok 8',
      narration:
        'czyli przekroczyłoby przyjętą granicę. Projektując szczelinę, trzeba więc powiązać jej wymiar nie tylko z długością, ale także z przewidywanym zakresem temperatur i dopuszczalnym naprężeniem.',
      caption:
        'czyli przekroczyłoby przyjętą granicę. Projektując szczelinę, trzeba więc powiązać jej wymiar nie tylko z długością, ale także z…',
      visual: 'thermal',
      focus: { metric: 'αΔT' },
    },
    {
      title: 'Krok 9',
      narration:
        'W tym zadaniu jest jeszcze jedno ograniczenie. Rura jest ściskana, więc jeśli jest smukła, może wyboczyć się przed osiągnięciem 80 MPa. Wtedy o dopuszczalnej temperaturze decyduje stateczność, a nie wytrzymałość materiału. Warunek naprężeniowy jest konieczny, ale nie zawsze wystarczający.',
      caption:
        'W tym zadaniu jest jeszcze jedno ograniczenie. Rura jest ściskana, więc jeśli jest smukła, może wyboczyć się przed osiągnięciem…',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
  ],
} satisfies SolutionData
