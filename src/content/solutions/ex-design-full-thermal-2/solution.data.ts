import type { SolutionData } from '../../model'
import { ThermalGapAnimation } from './animation'

export default {
  id: 'ex-design-full-thermal-2',
  title: 'Pełne zadanie: obciążenie mechaniczne i temperatura — przykład 2',
  duration: 7,
  given: ['L=1500 mm', 'A=400 mm²', 'g=0,5 mm', 'E=200 GPa', 'alpha=12·10⁻⁶ 1/K', 'ΔT=60 K'],
  result:
    'Swobodne wydłużenie 1,08 mm przekracza luz 0,5 mm, więc luz zamyka się przy ΔT≈27,8 K. Po kontakcie powstaje ściskanie N≈−30,9 kN i σ≈−77,3 MPa. To znacznie mniej niż −144 MPa przy idealnym zablokowaniu, ale po kontakcie naprężenie rośnie już liniowo z temperaturą.',
  animation: ThermalGapAnimation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'gap',
    segments: [
      {
        id: '1',
        label: 'pręt',
        length: 1500,
        area: 400,
        n: -30.933,
        sigma: -77.3,
        thermalStrain: 0.00072,
        freeDeltaL: 1.08,
        deltaL: 0.5,
      },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', ΔL_T: 'mm', αΔT: '–', A: 'mm²' },
    note: 'Luz g = 0,5 mm zamyka się przy ΔT ≈ 27,8 K; dalszy wzrost temperatury wywołuje ściskanie.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt ma L = 1500 mm, A = 400 mm², E = 200 GPa i α = 12·10⁻⁶ 1/K. Lewy koniec jest utwierdzony, a do sztywnej ściany po prawej zostaje luz g = 0,5 mm. Temperatura wzrasta o ΔT = 60 K.',
      caption: 'Luz 0,5 mm; pytamy, czy pręt go zamknie i jakie naprężenie powstanie.',
      visual: 'thermal',
      focus: { metric: 'model' },
      formula:
        'L=1500\\ \\text{mm},\\quad A=400\\ \\text{mm}^2,\\quad g=0{,}5\\ \\text{mm},\\quad \\Delta T=60\\ \\text{K}',
    },
    {
      title: 'Swobodne wydłużenie',
      narration:
        'Najpierw sprawdzamy swobodne wydłużenie. Gdyby ściany nie było, pręt wydłużyłby się o ΔL_T = αΔTL = 12·10⁻⁶·60·1500 = 1,08 mm. Naprężenie byłoby zerowe, a wydłużenie większe od luzu.',
      caption: 'Swobodne wydłużenie 1,08 mm > g = 0,5 mm, więc kontakt nastąpi.',
      visual: 'thermal',
      focus: { metric: 'free' },
      formula: '\\Delta L_T=\\alpha\\Delta T L=12\\cdot10^{-6}\\cdot60\\cdot1500=1{,}08\\ \\text{mm}',
    },
    {
      title: 'Luz zostaje zamknięty',
      narration:
        'Luz zamyka się, gdy swobodne wydłużenie osiągnie 0,5 mm. Wtedy ΔT_c = g/(αL) = 0,5/(12·10⁻⁶·1500) ≈ 27,8 K. Do tego momentu naprężenie pozostaje zerowe.',
      caption: 'Przy ΔT_c ≈ 27,8 K pręt dotyka ściany; σ = 0.',
      visual: 'thermal',
      focus: { metric: 'gap' },
      formula: '\\Delta T_c=\\frac{g}{\\alpha L}=\\frac{0{,}5}{12\\cdot10^{-6}\\cdot1500}\\approx27{,}8\\ \\text{K}',
    },
    {
      title: 'Zablokowana reszta wydłużenia',
      narration:
        'Po kontakcie obowiązuje g = αΔTL + NL/(EA), więc N = EA(g/L − αΔT). Po podstawieniu EA = 80 000 000 N, g/L = 0,0003333 i αΔT = 0,00072 otrzymujemy N ≈ −30,9 kN. Pręt jest ściskany.',
      caption: 'Po zamknięciu luzu dalsze wydłużenie jest blokowane; N ≈ −30,9 kN.',
      visual: 'thermal',
      focus: { metric: 'restraint' },
      formula: 'N=EA\\left(\\frac{g}{L}-\\alpha\\Delta T\\right)\\approx-30{,}9\\ \\text{kN}',
    },
    {
      title: 'Naprężenie po kontakcie',
      narration:
        'Naprężenie wynosi σ = N/A = −30 933/400 ≈ −77,3 MPa. Dla porównania idealne zablokowanie bez luzu dałoby −EαΔT = −144 MPa. Luz zmniejsza więc naprężenie prawie dwukrotnie.',
      caption: 'σ ≈ −77,3 MPa zamiast −144 MPa przy pełnym zablokowaniu.',
      visual: 'thermal',
      focus: { metric: 'stress' },
      formula:
        '\\sigma=\\frac{N}{A}=\\frac{-30\\,933}{400}\\approx-77{,}3\\ \\text{MPa}\\qquad -E\\alpha\\Delta T=-144\\ \\text{MPa}',
    },
    {
      title: 'Luz w projektowaniu',
      narration:
        'Luz nie jest bezpiecznikiem na dowolnie wysoką temperaturę. Po kontakcie naprężenie rośnie liniowo: σ = −Eα(ΔT − ΔT_c). Projektant musi znać zarówno luz, jak i maksymalną temperaturę pracy.',
      caption: 'Po kontakcie nachylenie jest takie samo jak bez luzu; luz tylko przesuwa początek ściskania.',
      visual: 'thermal',
      focus: { metric: 'design' },
      formula: '\\sigma=-E\\alpha(\\Delta T-\\Delta T_c)\\quad\\text{dla}\\quad \\Delta T>27{,}8\\ \\text{K}',
    },
  ],
} satisfies SolutionData
