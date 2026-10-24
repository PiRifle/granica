import type { SolutionData } from '../../model'
import { AxialStrengthCondition3Animation } from './animation'

export default {
  id: 'ex-axial-strength-condition-3',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'R_e=235 MPa', 'n=2,5'],
  result:
    'Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność. Podwojenie n przy stałym przekroju w przybliżeniu o połowę zmniejsza dopuszczalną siłę. To dlatego dobór n musi być świadomą decyzją, a nie przypadkową liczbą.',
  animation: AxialStrengthCondition3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Tym razem mamy gotowy przekrój i wymagany zapas, a szukamy maksymalnej dopuszczalnej siły. Pręt o polu A=500 mm^2 wykonano ze stali R_e=235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n=2,5. Naprężenie dopuszczalne to σ_dop=235/2,5=94 MPa. Maksymalna siła wynosi N_max=σ_dopA=94·500=47 000 N, czyli 47 kN. Przy n=1,5 ten sam przekrój mógłby przenieść 78,3 kN, bo σ_dop=156,7 MPa. Zwiększenie zapasu z 1,5 do 2,5 zmniejsza dopuszczalne obciążenie w stosunku 1,5/2,5=0,6, czyli o 40%. Odwrotne pytanie brzmi: jakie pole jest potrzebne dla siły 60 kN przy n=2? Wtedy σ_dop=117,5 MPa i A_min=60 000/117,5=510,6 mm^2. Po zaokrągleniu do 550 mm^2 otrzymujemy σ=109,1 MPa oraz n_rz=235/109,1=2,15, czyli zapas jest większy od wymaganego. Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność. Podwojenie n przy stałym przekroju w przybliżeniu o połowę zmniejsza dopuszczalną siłę. To dlatego dobór n musi być świadomą decyzją, a nie przypadkową liczbą.',
      caption:
        'Widzimy, że współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz parametrem, który bezpośrednio zmienia nośność.…',
      visual: 'axial',
      formula:
        'A=500\\ \\text{mm}^2 \\qquad \\sigma_{\\mathrm{dop}}=235/2{,}5=94\\ \\text{MPa} \\qquad 60\\ \\text{kN} \\qquad n',
    },
  ],
} satisfies SolutionData
