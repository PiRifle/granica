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
      title: 'Model, dane i obliczenia',
      narration:
        'Okrągły pręt o średnicy 30 mm jest rozciągany siłą 50 kN przez sworzeń lub uchwyt. Interesuje nas naprężenie nominalne z dala od uchwytu oraz miejsce, w którym prosty model przestaje być wiarygodny. Pole koła wynosi πd²/4. Po podstawieniu d = 30 mm otrzymujemy π · 900 / 4 ≈ 706,9 mm². Dzielimy siłę 50 000 N przez pole 706,9 mm². Otrzymujemy około 70,7 N/mm², czyli 70,7 MPa. To naprężenie średnie, ważne z dala od uchwytu. Wymiar charakterystyczny przekroju to średnica 30 mm. Zasada Saint-Venanta mówi, że wpływ lokalnego sposobu przyłożenia obciążenia zanika na odległości porównywalnej z tym wymiarem. Przyjmując zasięg rzędu dwóch do trzech średnic, otrzymujemy 60–90 mm od uchwytu. Dopiero po tej odległości rozkład naprężeń jest bliski równomiernemu. Przy samym sworzniu naprężenie jest trójosiowe i może być znacznie większe niż 70,7 MPa. Nie używaj tam σ = N/A do oceny maksimum. Prosty wzór stosuj tylko poza strefą zaburzeń.',
      caption: 'Model σ = N/A obowiązuje poza strefą zaburzeń, nie przy samym detalu.',
      visual: 'axial',
      formula:
        'd=30\\ \\text{mm},\\quad P=50\\ \\text{kN}\\qquad A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot30^2}{4}\\approx706{,}9\\ \\text{mm}^2\\qquad \\sigma_{\\text{nom}}=\\frac{50\\,000}{706{,}9}\\approx70{,}7\\ \\text{MPa}\\qquad d=30\\ \\text{mm}\\qquad (2\\text{–}3)d=(60\\text{–}90)\\ \\text{mm}\\qquad \\sigma=N/A\\quad\\text{poza strefą zaburzeń}',
    },
  ],
} satisfies SolutionData
