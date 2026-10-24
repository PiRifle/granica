import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-stiffness-design-3',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'E=200 GPa', 'sigma_{dop}=150 MPa', 'L_{dop}=2 mm'],
  result:
    'Ten wynik wyjaśnia, dlaczego długie elementy często wymagają większego przekroju, niż wynikałoby to z samej wytrzymałości. Wydłużenie rośnie liniowo z długością, a naprężenie nie. Wystarczy wydłużyć pręt, aby warunek sztywności stał się decydujący, nawet przy niezmienionym obciążeniu i materiale.',
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
        length: 1500,
        area: 500,
        n: 66.7,
        sigma: 133.3,
        epsilon: 0.000667,
        deltaL: 1,
      },
      {
        id: '2',
        label: '2',
        length: 1500,
        area: 500,
        n: 66.7,
        sigma: 133.3,
        epsilon: 0.000667,
        deltaL: 1,
      },
    ],
    loads: [
      {
        node: 2,
        value: 66.7,
        label: 'N_δ = 66,7 kN',
      },
    ],
    note: 'Dla L = 3000 mm decyduje sztywność; A = 500 mm².',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy pręt o polu A=500 mm^2, E=200 GPa, σ_dop=150 MPa i Δ L_dop=2 mm. Tym razem szukamy maksymalnej siły, a długość jest zmienna. Z warunku wytrzymałości',
      caption:
        'Rozważmy pręt o polu A=500 mm^2, E=200 GPa, σ_dop=150 MPa i Δ L_dop=2 mm. Tym razem szukamy maksymalnej siły, a długość jest…',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
      formula: '\\Delta L_{\\mathrm{dop}} = 2 mm',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'N_σ=σ_dopA=150·500=75 000 N=75 kN.',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'N_\\sigma=\\sigma_{\\mathrm{dop}}A=150\\cdot500=75\\,000\\ \\text{N}=75\\ \\text{kN}.',
    },
    {
      title: 'Krok 3',
      narration: 'Z warunku sztywności',
      caption: 'Z warunku sztywności',
      visual: 'thermal',
      focus: {
        metric: 'ΔL',
      },
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'N_δ=(EAΔ L_dop)/(L) =(200 000·500·2)/(L) =(200 000 000)/(L) N,',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula:
        'N_\\delta=\\frac{EA\\Delta L_{\\mathrm{dop}}}{L}\n=\\frac{200\\,000\\cdot500\\cdot2}{L}\n=\\frac{200\\,000\\,000}{L}\\ \\text{N},',
    },
    {
      title: 'Krok 5',
      narration:
        'gdzie L podstawiamy w milimetrach. Dla L=3000 mm otrzymujemy N_δ≈66,7 kN, więc decyduje sztywność i maksymalna siła wynosi około 66,7 kN.',
      caption:
        'gdzie L podstawiamy w milimetrach. Dla L=3000 mm otrzymujemy N_δ≈66,7 kN, więc decyduje sztywność i maksymalna siła wynosi około…',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'L = 3000 mm',
    },
    {
      title: 'Krok 6',
      narration: 'Granicę między warunkami wyznacza długość krytyczna',
      caption: 'Granicę między warunkami wyznacza długość krytyczna',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: 'L^*=(EΔ L_dop)/(σ_dop) =(200 000·2)/(150)≈2667 mm≈2,67 m.',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
      formula:
        'L^*=\\frac{E\\Delta L_{\\mathrm{dop}}}{\\sigma_{\\mathrm{dop}}}\n=\\frac{200\\,000\\cdot2}{150}\\approx2667\\ \\text{mm}\\approx2{,}67\\ \\text{m}.',
    },
    {
      title: 'Krok 8',
      narration:
        'Dla pręta krótszego niż 2,67 m większe jest N_σ, więc decyduje wytrzymałość. Dla pręta dłuższego decyduje sztywność. Na przykład przy L=2 m mamy N_δ=100 kN, więc maksimum wynosi 75 kN z warunku wytrzymałości. Przy L=4 m mamy N_δ=50 kN, więc maksimum spada do 50 kN.',
      caption:
        'Dla pręta krótszego niż 2,67 m większe jest N_σ, więc decyduje wytrzymałość. Dla pręta dłuższego decyduje sztywność. Na przykład…',
      visual: 'thermal',
      focus: {
        metric: 'N',
      },
      formula: 'L = 2 m',
    },
    {
      title: 'Krok 9',
      narration:
        'Ten wynik wyjaśnia, dlaczego długie elementy często wymagają większego przekroju, niż wynikałoby to z samej wytrzymałości. Wydłużenie rośnie liniowo z długością, a naprężenie nie. Wystarczy wydłużyć pręt, aby warunek sztywności stał się decydujący, nawet przy niezmienionym obciążeniu i materiale.',
      caption:
        'Ten wynik wyjaśnia, dlaczego długie elementy często wymagają większego przekroju, niż wynikałoby to z samej wytrzymałości.…',
      visual: 'thermal',
      focus: {
        metric: 'A',
      },
    },
    {
      title: 'Krok 10',
      narration: 'Dla L = 3000 mm i N = 66,7 kN naprężenie wynosi σ = 66 700/500 = 133,3 MPa.',
      caption: 'Jest ono mniejsze od σ_dop = 150 MPa, więc decyduje sztywność, a nie wytrzymałość.',
      visual: 'axial',
      focus: {
        metric: 'σ',
      },
      formula: '\\sigma=N/A=66\\,700/500=133{,}3\\ \\text{MPa}',
    },
    {
      title: 'Krok 11',
      narration: 'Odkształcenie: ε = σ/E = 133,3/200 000 ≈ 0,000667.',
      caption: 'Wydłużenie εL = 0,000667·3000 ≈ 2,0 mm, czyli dokładnie na granicy dopuszczalnej.',
      visual: 'axial',
      focus: {
        metric: 'ε',
      },
      formula: '\\varepsilon=\\sigma/E=133{,}3/200\\,000\\approx0{,}000667',
    },
  ],
} satisfies SolutionData
