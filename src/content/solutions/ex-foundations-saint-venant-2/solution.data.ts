import type { SolutionData } from '../../model'
import { SaintVenantExample2Animation } from './animation'

export default {
  id: 'ex-foundations-saint-venant-2',
  title: 'Zasada Saint-Venanta: dystans od detalu — przykład 2',
  duration: 7,
  given: ['d = 30 mm', 'P = 50 kN'],
  result:
    'Pole przekroju wynosi około 706,9 mm², a naprężenie nominalne około 70,7 MPa. Wymiar charakterystyczny to średnica 30 mm, więc strefa zaburzeń ma zasięg rzędu 60–90 mm. To oszacowanie, a nie norma: rzeczywisty zasięg zależy od sposobu mocowania, sztywności uchwytu i kontaktu. Przy samym sworzniu naprężenie jest trójosiowe i może być znacznie większe niż 70,7 MPa.',
  animation: SaintVenantExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Okrągły pręt o średnicy 30 mm jest rozciągany siłą 50 kN przez sworzeń lub uchwyt. Interesuje nas naprężenie nominalne z dala od uchwytu oraz miejsce, w którym prosty model przestaje być wiarygodny.',
      caption: 'Pręt okrągły rozciągany siłą 50 kN przez detal mocujący.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'd=30\\ \\text{mm},\\quad P=50\\ \\text{kN}',
    },
    {
      title: 'Pole przekroju',
      narration: 'Pole koła wynosi πd²/4. Po podstawieniu d = 30 mm otrzymujemy π · 900 / 4 ≈ 706,9 mm².',
      caption: 'A ≈ 706,9 mm².',
      visual: 'axial',
      focus: { metric: 'section' },
      formula: 'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot30^2}{4}\\approx706{,}9\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie nominalne',
      narration:
        'Dzielimy siłę 50 000 N przez pole 706,9 mm². Otrzymujemy około 70,7 N/mm², czyli 70,7 MPa. To naprężenie średnie, ważne z dala od uchwytu, gdzie rozkład jest równomierny.',
      caption: 'σ_nom ≈ 70,7 MPa.',
      visual: 'axial',
      focus: { metric: 'nominal' },
      formula: '\\sigma_{\\text{nom}}=\\frac{50\\,000}{706{,}9}\\approx70{,}7\\ \\text{MPa}',
    },
    {
      title: 'Strefa zaburzeń przy uchwycie',
      narration:
        'Przy samym sworzniu materiał jest ściskany i ścinany, a stan naprężenia jest trójosiowy. Wpływ sposobu przyłożenia siły maleje na odległości rzędu dwóch do trzech średnic, czyli 60–90 mm od uchwytu.',
      caption: 'Strefa zaburzeń ma zasięg około 60–90 mm.',
      visual: 'axial',
      focus: { metric: 'disturbance' },
      formula: '(2\\text{–}3)d=(60\\text{–}90)\\ \\text{mm}',
    },
    {
      title: 'Poza strefą zaburzeń',
      narration:
        'Dopiero po tej odległości rozkład naprężeń jest bliski równomiernemu i można użyć σ = N/A. Przy samym sworzniu nie stosuj tego wzoru do oceny maksimum, bo lokalne naprężenie może być znacznie większe niż 70,7 MPa.',
      caption: 'Model σ = N/A obowiązuje poza strefą zaburzeń, nie przy samym detalu.',
      visual: 'axial',
      focus: { metric: 'decay' },
      formula: '\\sigma=N/A\\quad\\text{poza strefą zaburzeń}',
    },
  ],
} satisfies SolutionData
