import type { SolutionData } from '../../model'
import { PoissonExample3Animation } from './animation'

export default {
  id: 'ex-strain-state-poisson-3',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 3',
  duration: 7,
  given: ['d₀ = 10 mm', '|Δd| ≤ 0,002 mm', 'ν = 0,30'],
  result:
    'Przy E=200 GPa odpowiada to naprężeniu σ=Eε≈133 MPa. To sensowny zakres dla stali konstrukcyjnej. Gdyby dopuszczalna zmiana średnicy była dziesięć razy mniejsza, limit naprężenia spadłby do około 13 MPa — pokazuje to, jak rygorystyczne mogą być wymagania wymiarowe w precyzyjnych pasowaniach.',
  animation: PoissonExample3Animation,
  scenes: [
    {
      title: 'Limit wymiarowy i model wałka',
      narration:
        'Projektant dopuszcza zmianę średnicy wałka o d₀ = 10 mm nie większą niż 2 μm, czyli 0,002 mm. Materiał ma ν = 0,30. Szukamy maksymalnego odkształcenia osiowego. Na rysunku skurcz średnicy jest powiększony, a pomarańczowa strefa pokazuje dopuszczalny zakres.',
      caption: 'd₀ = 10 mm, |Δd| ≤ 0,002 mm, ν = 0,30.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'd_0=10\\,\\text{mm},\\qquad |\\Delta d|=0{,}002\\,\\text{mm},\\qquad \\nu=0{,}30',
    },
    {
      title: 'Oblicz odkształcenie poprzeczne',
      narration:
        'Dzielimy limit średnicy przez średnicę początkową: |ε_poprz| = 0,002/10 = 0,0002, czyli 200 με. Przy rozciąganiu znak jest ujemny, ale do limitu bierzemy wartość bezwzględną. To największy dopuszczalny skurcz poprzeczny.',
      caption: '|ε_poprz| = 200 με.',
      visual: 'axial',
      focus: { metric: 'lateral' },
      formula: '|\\varepsilon_{poprz}|=\\frac{0{,}002}{10}=0{,}0002=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Maksymalne odkształcenie osiowe',
      narration:
        'Z definicji liczby Poissona |ε_osi| = |ε_poprz|/ν = 0,0002/0,30 = 0,000667, czyli około 667 με. To maksymalne dopuszczalne wydłużenie osiowe wałka; przy większym wydłużeniu średnica przekroczy limit.',
      caption: '|ε_osi| ≈ 667 με.',
      visual: 'axial',
      focus: { metric: 'axial' },
      formula:
        '|\\varepsilon_{osi}|=\\frac{|\\varepsilon_{poprz}|}{\\nu}=\\frac{0{,}0002}{0{,}30}=0{,}000667=667\\,\\mu\\varepsilon',
    },
    {
      title: 'Naprężenie osiowe',
      narration:
        'Przyjmujemy stal o E = 200 GPa. W stanie jednoosiowym σ = Eε = 200 000·0,000667 = 133,41 MPa. To sensowny zakres dla stali konstrukcyjnej.',
      caption: 'σ = 133,41 MPa.',
      visual: 'axial',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot0{,}000667=133{,}41\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź czułość wymagania',
      narration:
        'Gdyby dopuszczalna zmiana średnicy była dziesięć razy mniejsza, limit naprężenia spadłby do około 13 MPa. Pokazuje to, jak rygorystyczne bywają wymagania wymiarowe w precyzyjnych pasowaniach.',
      caption: 'Kontrola: dziesięciokrotnie mniejszy limit daje σ ≈ 13,34 MPa.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: '\\sigma/10=133{,}41/10=13{,}34\\,\\text{MPa},\\qquad |\\varepsilon_{poprz}|=200\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
