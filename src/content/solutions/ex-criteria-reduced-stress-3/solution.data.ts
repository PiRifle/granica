import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-reduced-stress-3',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 3',
  duration: 7,
  given: ['d = 50 mm', 'M = 0,8 kN·m', 'Re = 355 MPa', 'n_wym = 2,0'],
  result:
    'Sprawdzenie: dla T = 2,34 kN·m otrzymujemy τ = 95,3 MPa i σHMH = √(65,19² + 3·95,3²) = 177,5 MPa, czyli dokładnie kr. Gdyby zastosować Tresca, dopuszczalny moment byłby mniejszy, bo przy tym samym τ daje większe wytężenie. To dobry przykład na to, że wybór hipotezy wpływa nie tylko na ocenę, ale też na dopuszczalne obciążenie.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ReducedStressExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane projektowe',
      narration:
        'Pręt o średnicy 50 mm jest zginany momentem M = 0,8 kN·m. Materiał ma R_e = 355 MPa, a wymagany zapas n_wym = 2,0. Przyjmujemy hipotezę HMH i szukamy maksymalnego momentu T.',
      caption: 'd = 50 mm, M = 0,8 kN·m, R_e = 355 MPa, n_wym = 2,0.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: 'd=50\\,\\text{mm},\\qquad M=0{,}8\\,\\text{kN·m},\\qquad R_e=355\\,\\text{MPa},\\qquad n_{wym}=2{,}0',
    },
    {
      title: 'Naprężenie od zginania i stan w punkcie A',
      narration:
        'Wskaźnik zginania wynosi W = π·50³/32 = 12 271,8 mm³, więc σ = 0,8·10⁶/12 271,8 = 65,19 MPa. Naprężenie dopuszczalne to k_r = 355/2 = 177,5 MPa. Naprężenie styczne τ od skręcania jest jeszcze nieznane.',
      caption: 'W = 12 271,8 mm³, σ = 65,19 MPa, k_r = 177,5 MPa, τ = ?.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        'W=\\frac{\\pi\\cdot50^3}{32}=12\\,271{,}8\\,\\text{mm}^3,\\qquad \\sigma=\\frac{0{,}8\\cdot10^6}{12\\,271{,}8}=65{,}19\\,\\text{MPa},\\qquad k_r=\\frac{355}{2}=177{,}5\\,\\text{MPa}',
    },
    {
      title: 'Warunek HMH i granica',
      narration:
        'Warunek ma postać √(σ² + 3τ²) ≤ k_r, czyli 3τ² ≤ k_r² − σ². Podstawiamy k_r² = 31 506,3 i σ² = 4 249,7, więc 3τ² ≤ 27 256,6. Wektor naprężenia zredukowanego nie może przekroczyć granicy k_r.',
      caption: '3τ² ≤ 31 506,3 − 4 249,7 = 27 256,6.',
      visual: 'cube',
      focus: { metric: 'criteria' },
      formula: '3\\tau^2\\le k_r^2-\\sigma^2=31\\,506{,}3-4\\,249{,}7=27\\,256{,}6',
    },
    {
      title: 'Dopuszczalne τ i moment T',
      narration:
        'Stąd τ² ≤ 9 085,5 i τ ≤ 95,3 MPa. Wskaźnik skręcania W_o = 2W = 24 543,7 mm³, więc dopuszczalny moment wynosi T = τ·W_o = 95,3·24 543,7 = 2,34·10⁶ N·mm = 2,34 kN·m.',
      caption: 'τ ≤ 95,3 MPa, T = 2,34 kN·m.',
      visual: 'cube',
      focus: { metric: 'equivalent' },
      formula:
        '\\tau\\le95{,}3\\,\\text{MPa},\\qquad T=\\tau\\cdot W_o=95{,}3\\cdot24\\,543{,}7=2{,}34\\cdot10^6\\,\\text{N·mm}=2{,}34\\,\\text{kN·m}',
    },
    {
      title: 'Sprawdzenie na granicy',
      narration:
        'Przy T = 2,34 kN·m otrzymujemy τ = 95,3 MPa i σ_HMH = √(65,19² + 3·95,3²) = 177,5 MPa, czyli dokładnie k_r. Zapas n_rz = 355/177,5 = 2,0 jest równy wymaganemu, więc element pracuje na granicy warunku. Gdyby zastosować Tresca, dopuszczalny moment byłby mniejszy.',
      caption: 'σ_HMH = k_r = 177,5 MPa; n_rz = n_wym = 2,0.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{HMH}=\\sqrt{65{,}19^2+3\\cdot95{,}3^2}=177{,}5\\,\\text{MPa}=k_r,\\qquad n_{rz}=\\frac{355}{177{,}5}=2{,}0=n_{wym}',
    },
  ],
} satisfies SolutionData
