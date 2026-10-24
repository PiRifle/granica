import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-reduced-stress',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'Re = 235 MPa', 'n_wym = 2,0'],
  result:
    'Obie hipotezy dają wynik poniżej kr = 117,5 MPa, więc warunek jest spełniony. Większe wytężenie daje Tresca: 77,1 MPa i zapas około 3,05. HMH daje 74,7 MPa i zapas około 3,14. Do oceny konstrukcji trzeba konsekwentnie używać jednej hipotezy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ReducedStressExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pełny pręt stalowy o średnicy d = 60 mm jest rozciągany siłą N = 30 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 800 N·m. Materiał ma R_e = 235 MPa, a wymagany zapas n_wym = 2,0. Sprawdzamy włókno A, w którym naprężenia od zginania i siły osiowej mają ten sam znak.',
      caption: 'd = 60 mm, N = 30 kN, M = 1,2 kN·m, T = 800 N·m.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        'd=60\\,\\text{mm},\\qquad N=30\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=800\\,\\text{N·m},\\qquad R_e=235\\,\\text{MPa}',
    },
    {
      title: 'Stan naprężenia w punkcie A',
      narration:
        'Pole przekroju wynosi A = πd²/4 = 2 827,4 mm², a wskaźniki W = πd³/32 = 21 205,8 mm³ i W_o = 2W = 42 411,5 mm³. W punkcie A naprężenia sumują się: σ_x = σ_N + σ_M = 10,61 + 56,59 = 67,20 MPa, a od skręcania działa τ = 800 000/42 411,5 = 18,86 MPa.',
      caption: 'σ_x = 67,20 MPa, τ = 18,86 MPa.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma_x=10{,}61+56{,}59=67{,}20\\,\\text{MPa},\\qquad \\tau=\\frac{800\\,000}{42\\,411{,}5}=18{,}86\\,\\text{MPa}',
    },
    {
      title: 'Hipotezy: HMH i Tresca',
      narration:
        'HMH dla płaskiego stanu naprężenia daje √(67,20² + 3·18,86²) = 74,72 MPa, a Tresca √(67,20² + 4·18,86²) = 77,06 MPa. Współczynnik przy τ² zależy od tego, jak hipoteza opisuje wytężenie.',
      caption: 'σ_HMH = 74,72 MPa, σ_T = 77,06 MPa.',
      visual: 'cube',
      focus: { metric: 'criteria' },
      formula:
        '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}=74{,}72\\,\\text{MPa},\\qquad \\sigma_T=\\sqrt{67{,}20^2+4\\cdot18{,}86^2}=77{,}06\\,\\text{MPa}',
    },
    {
      title: 'Jedna liczba dla stanu',
      narration:
        'Po redukcji cały stan opisują dwie liczby zależne od hipotezy: 74,72 MPa dla HMH i 77,06 MPa dla Tresca. Większe wytężenie daje Tresca, więc jest bardziej zachowawcza.',
      caption: 'σ_HMH = 74,72 MPa, σ_T = 77,06 MPa.',
      visual: 'cube',
      focus: { metric: 'equivalent' },
      formula: '\\sigma_{HMH}=74{,}72\\,\\text{MPa}<\\sigma_T=77{,}06\\,\\text{MPa}',
    },
    {
      title: 'Sprawdzenie wytrzymałości',
      narration:
        'Naprężenie dopuszczalne wynosi k_r = 235/2 = 117,5 MPa. Oba wyniki są poniżej k_r, a zapasy n_HMH = 235/74,72 = 3,14 i n_T = 235/77,06 = 3,05 przekraczają n_wym = 2,0. Warunek jest spełniony.',
      caption: 'k_r = 117,5 MPa; n_HMH = 3,14, n_T = 3,05 ≥ 2,0.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        'k_r=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad n_{HMH}=\\frac{235}{74{,}72}=3{,}14,\\qquad n_T=\\frac{235}{77{,}06}=3{,}05',
    },
  ],
} satisfies SolutionData
