import type { SolutionData } from '../../model'
import { HmhExample3Animation } from './animation'

export default {
  id: 'ex-criteria-hmh-3',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 3',
  duration: 7,
  given: ['σ = 60 MPa', 'Re = 235 MPa', 'n = 2,0'],
  result:
    'Odpowiedź: według HMH dopuszczalne naprężenie styczne wynosi około 58,3 MPa. To przykład na to, że wariant odwrotny wymaga nie tylko przekształcenia wzoru, ale też świadomego wyboru hipotezy. Wynik 58,3 MPa nie jest „prawdziwym” naprężeniem granicznym materiału; jest granicą wynikającą z przyjętego modelu i wymaganego zapasu.',
  animation: HmhExample3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Punkt jest rozciągany naprężeniem σ = 60 MPa i ścinany nieznanym naprężeniem τ. Materiał ma R_e = 235 MPa, a wymagany zapas wynosi n = 2,0.',
      caption: 'σ = 60 MPa, R_e = 235 MPa, n_wym = 2,0; szukamy τ.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma=60\\,\\text{MPa},\\qquad R_e=235\\,\\text{MPa},\\qquad n_{wym}=2{,}0,\\qquad \\tau=?',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wynosi k_r = R_e/n = 235/2 = 117,5 MPa. Warunek HMH ma postać √(60² + 3τ²) ≤ 117,5.',
      caption: 'k_r = 117,5 MPa jest poziomem, którego nie wolno przekroczyć.',
      visual: 'cube',
      focus: { metric: 'allowable' },
      formula: 'k_r=\\frac{R_e}{n}=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad \\sqrt{60^{2}+3\\tau^{2}}\\le117{,}5',
    },
    {
      title: 'Budżet energii',
      narration:
        'Po podniesieniu do kwadratu: 3 600 + 3τ² ≤ 13 806,25. Na człon normalny zużywamy 3 600 MPa², więc na ścinanie zostaje 3τ² ≤ 10 206,25 MPa².',
      caption: 'Człon normalny zajmuje 3 600 z 13 806,25 MPa².',
      visual: 'cube',
      focus: { metric: 'energy' },
      formula: '60^{2}+3\\tau^{2}\\le117{,}5^{2},\\qquad 3\\,600+3\\tau^{2}\\le13\\,806{,}25',
    },
    {
      title: 'Maksymalne τ',
      narration: 'Stąd 3τ² ≤ 10 206,25, τ² ≤ 3 402,1 i τ ≤ 58,3 MPa. Przy tej wartości σHMH osiąga dokładnie k_r.',
      caption: 'τ_dop = 58,3 MPa.',
      visual: 'cube',
      focus: { metric: 'solve' },
      formula: '3\\tau^{2}\\le10\\,206{,}25,\\qquad \\tau^{2}\\le3\\,402{,}1,\\qquad \\tau\\le58{,}3\\,\\text{MPa}',
    },
    {
      title: 'Sprawdzenie bezpieczeństwa',
      narration:
        'Dla τ = 58,3 MPa otrzymujemy σHMH = √(3 600 + 3·3 402,1) = 117,5 MPa, więc n = R_e/σHMH = 235/117,5 = 2,0. Tresca dałaby τ ≤ 50,5 MPa, czyli byłaby bardziej zachowawcza.',
      caption: 'n = 2,0 dokładnie jak wymagane; Tresca dopuszcza tylko 50,5 MPa.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{HMH}=117{,}5\\,\\text{MPa},\\qquad n=\\frac{235}{117{,}5}=2{,}0,\\qquad \\tau_{Tresca}=50{,}5\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
