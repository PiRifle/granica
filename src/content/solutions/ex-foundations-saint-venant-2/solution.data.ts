import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-saint-venant-2',
  title: 'Zasada Saint-Venanta: dystans od detalu — przykład 2',
  duration: 7,
  given: ['d = 30 mm', 'P = 50 kN'],
  result:
    'Pole przekroju wynosi około 706,9 mm², a naprężenie nominalne około 70,7 MPa. Wymiar charakterystyczny to średnica 30 mm, więc strefa zaburzeń ma zasięg rzędu 60–90 mm. To oszacowanie, a nie norma: rzeczywisty zasięg zależy od sposobu mocowania, sztywności uchwytu i kontaktu. Przy samym sworzniu naprężenie jest trójosiowe i może być znacznie większe niż 70,7 MPa.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'g', label: 'górny', length: 150, area: 706.9, n: 50, sigma: 70.7 },
      { id: 'd', label: 'dolny', length: 150, area: 706.9, n: 50, sigma: 70.7 },
    ],
    loads: [{ node: 2, value: 50, label: 'P = 50 kN' }],
    note: 'Podział na dwa odcinki jest schematyczny; istotna jest średnica d = 30 mm. Poza strefą zaburzeń N = 50 kN i σ = 70,7 MPa.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Okrągły pręt o średnicy 30 mm jest rozciągany siłą 50 kN przez sworzeń lub uchwyt. Interesuje nas naprężenie nominalne z dala od uchwytu oraz miejsce, w którym prosty model przestaje być wiarygodny.',
      caption: 'Pręt okrągły rozciągany siłą 50 kN przez detal mocujący.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'd=30\\ \\text{mm},\\quad P=50\\ \\text{kN}',
    },
    {
      title: 'Pole przekroju',
      narration: 'Pole koła wynosi πd²/4. Po podstawieniu d = 30 mm otrzymujemy π · 900 / 4 ≈ 706,9 mm².',
      caption: 'A ≈ 706,9 mm².',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot30^2}{4}\\approx706{,}9\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie nominalne',
      narration:
        'Dzielimy siłę 50 000 N przez pole 706,9 mm². Otrzymujemy około 70,7 N/mm², czyli 70,7 MPa. To naprężenie średnie, ważne z dala od uchwytu.',
      caption: 'σ_nom ≈ 70,7 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: '\\sigma_{\\text{nom}}=\\frac{50\\,000}{706{,}9}\\approx70{,}7\\ \\text{MPa}',
    },
    {
      title: 'Wymiar charakterystyczny',
      narration:
        'Wymiar charakterystyczny przekroju to średnica 30 mm. Zasada Saint-Venanta mówi, że wpływ lokalnego sposobu przyłożenia obciążenia zanika na odległości porównywalnej z tym wymiarem.',
      caption: 'Wymiarem charakterystycznym jest d = 30 mm.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'g' },
      formula: 'd=30\\ \\text{mm}',
    },
    {
      title: 'Strefa zaburzeń',
      narration:
        'Przyjmując zasięg rzędu dwóch do trzech średnic, otrzymujemy 60–90 mm od uchwytu. Dopiero po tej odległości rozkład naprężeń jest bliski równomiernemu.',
      caption: 'Strefa zaburzeń ma zasięg około 60–90 mm.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
      formula: '(2\\text{–}3)d=(60\\text{–}90)\\ \\text{mm}',
    },
    {
      title: 'Ograniczenie modelu',
      narration:
        'Przy samym sworzniu naprężenie jest trójosiowe i może być znacznie większe niż 70,7 MPa. Nie używaj tam σ = N/A do oceny maksimum. Prosty wzór stosuj tylko poza strefą zaburzeń.',
      caption: 'Model σ = N/A obowiązuje poza strefą zaburzeń, nie przy samym detalu.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'd' },
      formula: '\\sigma=N/A\\quad\\text{poza strefą zaburzeń}',
    },
  ],
} satisfies SolutionData
