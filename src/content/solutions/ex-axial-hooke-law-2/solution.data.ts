import type { SolutionData } from '../../model'
import { HookeLawExample2Animation } from './animation'

export default {
  id: 'ex-axial-hooke-law-2',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 2',
  duration: 7,
  given: ['A = 200 mm²', 'L₀ = 1,5 m', 'N = 20 kN', 'σ = 100 MPa'],
  result:
    'Przy tym samym naprężeniu aluminium wydłuża się około 2,86 razy bardziej niż stal, ponieważ ma około 2,86 razy mniejszy moduł Younga. Siła i naprężenie są identyczne, ale odpowiedź odkształceniowa jest inna. To pokazuje, dlaczego w konstrukcjach, w których ważna jest sztywność, sam dobór wytrzymałości materiału nie wystarcza.',
  animation: HookeLawExample2Animation,
  scenes: [
    {
      title: 'Wspólne obciążenie i naprężenie',
      narration:
        'Porównajmy stal i aluminium. Pręt o polu A = 200 mm² i długości L₀ = 1,5 m przenosi siłę rozciągającą N = 20 kN. Naprężenie jest takie samo w obu materiałach i wynosi σ = 20 000/200 = 100 MPa, ponieważ zależy tylko od siły i pola.',
      caption: 'Naprężenie zależy tylko od siły i pola, więc jest takie samo w obu materiałach.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = \\frac{N}{A} = \\frac{20\\,000}{200} = 100\\ \\text{MPa}',
    },
    {
      title: 'Stal: mniejsze odkształcenie',
      narration:
        'Dla stali przyjmijmy E_s = 200 GPa = 200 000 MPa. Odkształcenie wynosi ε_s = 100/200 000 = 0,0005, a wydłużenie ΔL_s = 0,0005 · 1500 mm = 0,75 mm.',
      caption: 'Przy tym samym naprężeniu stal odkształca się nieznacznie.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: 's' },
      formula:
        '\\varepsilon_s = \\frac{100}{200\\,000} = 0{,}0005,\\quad \\Delta L_s = 0{,}0005 \\cdot 1500 = 0{,}75\\ \\text{mm}',
    },
    {
      title: 'Aluminium: większe odkształcenie',
      narration:
        'Dla aluminium przyjmijmy typowo E_a = 70 GPa = 70 000 MPa. Odkształcenie wynosi ε_a = 100/70 000 ≈ 0,00143, a wydłużenie ΔL_a ≈ 0,00143 · 1500 mm ≈ 2,14 mm.',
      caption: 'Mniejszy moduł Younga oznacza większe wydłużenie przy tym samym naprężeniu.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: 'a' },
      formula:
        '\\varepsilon_a = \\frac{100}{70\\,000} \\approx 0{,}00143,\\quad \\Delta L_a \\approx 0{,}00143 \\cdot 1500 \\approx 2{,}14\\ \\text{mm}',
    },
    {
      title: 'Porównanie odpowiedzi',
      narration:
        'Przy tym samym naprężeniu aluminium wydłuża się około 2,86 razy bardziej niż stal, ponieważ ma około 2,86 razy mniejszy moduł Younga.',
      caption: 'Siła i naprężenie są identyczne, ale odpowiedź odkształceniowa jest inna.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\frac{\\Delta L_a}{\\Delta L_s} = \\frac{E_s}{E_a} = \\frac{200}{70} \\approx 2{,}86',
    },
    {
      title: 'Sztywność a wytrzymałość',
      narration:
        'To pokazuje, dlaczego w konstrukcjach, w których ważna jest sztywność, sam dobór wytrzymałości materiału nie wystarcza. Przy tym samym naprężeniu i tej samej geometrii materiał o mniejszym E odkształca się bardziej.',
      caption: 'Moduł Younga opisuje sztywność, a nie granicę plastyczności.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon = \\frac{\\sigma}{E}',
    },
  ],
} satisfies SolutionData
