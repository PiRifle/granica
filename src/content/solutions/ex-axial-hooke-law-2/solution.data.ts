import type { SolutionData } from '../../model'
import { AxialHookeLawExample2Animation } from './animation'

export default {
  id: 'ex-axial-hooke-law-2',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 2',
  duration: 7,
  given: ['A = 200 mm²', 'L = 1,5 m', 'N = 20 kN', 'E_s = 200 GPa', 'E_a = 70 GPa'],
  result:
    'Przy tym samym naprężeniu aluminium wydłuża się około 2,86 razy bardziej niż stal, ponieważ ma około 2,86 razy mniejszy moduł Younga. Siła i naprężenie są identyczne, ale odpowiedź odkształceniowa jest inna. To pokazuje, dlaczego w konstrukcjach, w których ważna jest sztywność, sam dobór wytrzymałości materiału nie wystarcza.',
  animation: AxialHookeLawExample2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Porównajmy stal i aluminium. Pręt o polu A=200 mm^2 i długości L=1,5 m przenosi siłę rozciągającą N=20 kN. Naprężenie jest takie samo w obu materiałach i wynosi σ=20 000/200=100 MPa, ponieważ zależy tylko od siły i pola. Dla stali przyjmijmy E_s=200 GPa=200 000 MPa. Odkształcenie wynosi ε_s=100/200 000=0,0005, a wydłużenie Δ L_s=0,0005· 1500=0,75 mm. Dla aluminium przyjmijmy typowo E_a=70 GPa=70 000 MPa. Odkształcenie wynosi ε_a=100/70 000≈0,00143, a wydłużenie Δ L_a≈0,00143· 1500≈2,14 mm. Przy tym samym naprężeniu aluminium wydłuża się około 2,86 razy bardziej niż stal, ponieważ ma około 2,86 razy mniejszy moduł Younga. Siła i naprężenie są identyczne, ale odpowiedź odkształceniowa jest inna. To pokazuje, dlaczego w konstrukcjach, w których ważna jest sztywność, sam dobór wytrzymałości materiału nie wystarcza. Przy tym samym naprężeniu i tej samej geometrii stosunek wydłużeń jest odwrotnością stosunku modułów Younga. Materiał o mniejszym E odkształca się bardziej.',
      caption: '(Δ L_a)/(Δ L_s)=(E_s)/(E_a), ε=(σ)/(E)',
      visual: 'axial',
      formula:
        'L = 1{,}5 m\\qquad E_{s} = 200 GPa = 200\\,000 MPa\\qquad E_{a} = 70 GPa = 70\\,000 MPa\\qquad \\frac{\\Delta L_a}{\\Delta L_s}=\\frac{E_s}{E_a},\\qquad \\varepsilon=\\frac{\\sigma}{E}',
    },
  ],
} satisfies SolutionData
