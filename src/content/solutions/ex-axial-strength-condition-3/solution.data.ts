import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-strength-condition-3',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'R_e=235 MPa', 'n=2'],
  result:
    'Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność. Podwojenie n przy stałym przekroju w przybliżeniu o połowę zmniejsza dopuszczalną siłę. To dlatego dobór n musi być świadomą decyzją, a nie przypadkową liczbą.',
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
        area: 500,
        n: 47,
        sigma: 94,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 500,
        n: 47,
        sigma: 94,
      },
    ],
    loads: [
      {
        node: 2,
        value: 47,
        label: 'N_max = 47 kN',
      },
    ],
    note: 'Dla n = 2,5: σ_dop = 94 MPa i N_max = 47 kN.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem mamy gotowy przekrój i wymagany zapas, a szukamy maksymalnej dopuszczalnej siły. Pręt o polu A=500 mm^2 wykonano ze stali R_e=235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n=2,5.',
      caption:
        'Tym razem mamy gotowy przekrój i wymagany zapas, a szukamy maksymalnej dopuszczalnej siły. Pręt o polu A=500 mm^2 wykonano ze…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: 'A=500\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration:
        'Naprężenie dopuszczalne to σ_dop=235/2,5=94 MPa. Maksymalna siła wynosi N_max=σ_dopA=94·500=47 000 N, czyli 47 kN. Przy n=1,5 ten sam przekrój mógłby przenieść 78,3 kN, bo σ_dop=156,7 MPa. Zwiększenie zapasu z 1,5 do 2,5 zmniejsza dopuszczalne obciążenie w stosunku 1,5/2,5=0,6, czyli o 40%.',
      caption:
        'Naprężenie dopuszczalne to σ_dop=235/2,5=94 MPa. Maksymalna siła wynosi N_max=σ_dopA=94·500=47 000 N, czyli 47 kN. Przy n=1,5 ten…',
      visual: 'axial',
      focus: {
        metric: 'N',
      },
      formula: '\\sigma_{\\mathrm{dop}}=235/2{,}5=94\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Odwrotne pytanie brzmi: jakie pole jest potrzebne dla siły 60 kN przy n=2? Wtedy σ_dop=117,5 MPa i A_min=60 000/117,5=510,6 mm^2. Po zaokrągleniu do 550 mm^2 otrzymujemy σ=109,1 MPa oraz n_rz=235/109,1=2,15, czyli zapas jest większy od wymaganego.',
      caption:
        'Odwrotne pytanie brzmi: jakie pole jest potrzebne dla siły 60 kN przy n=2? Wtedy σ_dop=117,5 MPa i A_min=60 000/117,5=510,6 mm^2.…',
      visual: 'axial',
      focus: {
        metric: 'A',
      },
      formula: '60\\ \\text{kN}',
    },
    {
      title: 'Krok 4',
      narration:
        'Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność. Podwojenie n przy stałym przekroju w przybliżeniu o połowę zmniejsza dopuszczalną siłę. To dlatego dobór n musi być świadomą decyzją, a nie przypadkową liczbą.',
      caption:
        'Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność.…',
      visual: 'axial',
      focus: {
        metric: 'σ',
      },
      formula: 'n',
    },
  ],
} satisfies SolutionData
