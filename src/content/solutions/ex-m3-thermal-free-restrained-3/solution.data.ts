import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-thermal-free-restrained-3',
  title: 'Temperatura: swoboda i zablokowanie — przykład 3',
  duration: 7,
  given: ['L=10 m', 'alpha=12', 'E=200 GPa', 's=3 mm', 'sigma_dop=80 MPa'],
  result:
    'Największy dopuszczalny przyrost temperatury wynosi około 58,3 K: 25 K zużywa luz, a 33,3 K odpowiada naprężeniu dopuszczalnemu 80 MPa. Przy ΔT = 70 K naprężenie osiąga −108 MPa, więc przekracza limit. Dodatkowo trzeba sprawdzić wyboczenie, które może wystąpić przed osiągnięciem σ_dop.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ThermalGapDesignAnimation }))),
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
        label: '',
        length: 10000,
        sigma: -108,
        epsilon: 0.0003,
        deltaL: 3,
        thermalStrain: 0.00084,
        freeDeltaL: 8.4,
      },
    ],
    note: 'ΔT = 70 K, luz 3 mm; σ = −108 MPa przekracza σ_dop = 80 MPa. Pole A nie jest potrzebne.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Projektujemy szczelinę dla stalowej rury o długości L = 10 m, α = 12·10⁻⁶ 1/K i E = 200 GPa. Luz do podpory wynosi s = 3 mm, a dopuszczalne naprężenie ściskające σ_dop = 80 MPa. Szukamy największego dopuszczalnego przyrostu temperatury.',
      caption: 'Dane: L = 10 000 mm, s = 3 mm, σ_dop = 80 MPa; ΔT jest szukane.',
      visual: 'thermal',
      focus: {
        metric: 'model',
      },
      formula: 'L=10\\,000\\ \\text{mm},\\qquad s=3\\ \\text{mm},\\qquad \\sigma_{\\mathrm{dop}}=80\\ \\text{MPa}',
    },
    {
      title: 'Swobodne wydłużenie przy ΔT = 70 K',
      narration:
        'Najpierw sprawdzamy to samo ΔT = 70 K bez ograniczenia. Swobodne wydłużenie wynosi ΔL_T = αLΔT = 12·10⁻⁶·10 000·70 = 8,4 mm, a naprężenie jest zerowe. To znacznie więcej niż luz 3 mm.',
      caption: 'Bez podpory rura wydłużyłaby się o 8,4 mm przy ΔT = 70 K.',
      visual: 'thermal',
      focus: {
        metric: 'ΔL_T',
      },
      formula: '\\Delta L_T=\\alpha L\\Delta T=12\\cdot10^{-6}\\cdot10\\,000\\cdot70=8{,}4\\ \\text{mm}',
    },
    {
      title: 'Luz zostaje zamknięty',
      narration:
        'Luz zamyka się, gdy swobodne wydłużenie osiągnie 3 mm. Wtedy ΔT₁ = s/(αL) = 3/(12·10⁻⁶·10 000) = 25 K. Do tej chwili naprężenie pozostaje zerowe.',
      caption: 'Przy ΔT₁ = 25 K rura dotyka podpory; σ = 0.',
      visual: 'thermal',
      focus: {
        metric: 'gap',
      },
      formula: '\\Delta T_1=\\frac{s}{\\alpha L}=\\frac{3}{12\\cdot10^{-6}\\cdot10\\,000}=25\\ \\text{K}',
    },
    {
      title: 'To samo ΔT po zamknięciu luzu',
      narration:
        'Przy tym samym ΔT = 70 K po zamknięciu luzu dalsze wydłużenie jest zablokowane. Naprężenie wynosi σ = −E(αΔT − s/L) = −200 000(12·10⁻⁶·70 − 3/10 000) ≈ −108 MPa, czyli przekracza σ_dop = 80 MPa.',
      caption: 'Przy ΔT = 70 K naprężenie −108 MPa przekracza dopuszczalne 80 MPa.',
      visual: 'thermal',
      focus: {
        metric: 'σ',
      },
      formula:
        '\\sigma=-E\\left(\\alpha\\Delta T-\\frac{s}{L}\\right)=-200\\,000\\left(12\\cdot10^{-6}\\cdot70-\\frac{3}{10\\,000}\\right)\\approx-108\\ \\text{MPa}',
    },
    {
      title: 'Dopuszczalna temperatura',
      narration:
        'Dopuszczalny dodatkowy przyrost po zamknięciu luzu wynosi ΔT₂ = σ_dop/(Eα) = 80/(200 000·12·10⁻⁶) ≈ 33,3 K. Łącznie ΔT_max = 25 + 33,3 = 58,3 K.',
      caption: 'Największy dopuszczalny przyrost temperatury to około 58,3 K.',
      visual: 'thermal',
      focus: {
        metric: 'design',
      },
      formula:
        '\\Delta T_2=\\frac{\\sigma_{\\mathrm{dop}}}{E\\alpha}=\\frac{80}{200\\,000\\cdot12\\cdot10^{-6}}\\approx33{,}3\\ \\text{K}\\qquad \\Delta T_{\\max}=25+33{,}3=58{,}3\\ \\text{K}',
    },
    {
      title: 'Sprawdzenie stateczności',
      narration:
        'To jeszcze nie koniec sprawdzenia. Ściskana rura może wyboczyć się przed osiągnięciem 80 MPa, jeśli jest smukła. Wtedy o dopuszczalnej temperaturze decyduje stateczność, a nie sama wytrzymałość materiału.',
      caption: 'Warunek naprężeniowy jest konieczny, ale nie zawsze wystarczający — sprawdź wyboczenie.',
      visual: 'thermal',
      focus: {
        metric: 'buckling',
      },
      formula: '\\sigma_{\\mathrm{dop}}=80\\ \\text{MPa}\\quad\\Rightarrow\\quad \\text{sprawdź wyboczenie}',
    },
  ],
} satisfies SolutionData
