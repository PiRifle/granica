import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-poisson',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 1',
  duration: 7,
  given: ['E = 200 GPa', 'ν = 0,30', 'd₀ = 16 mm', 'ε_x = 900 με'],
  result:
    'Średnica zmniejsza się o około 0,0043 mm, czyli 4,3 μm. Odkształcenie poprzeczne wynosi -270 με, a naprężenie osiowe około 180 MPa.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PoissonExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane pręta',
      narration:
        'Stalowy pręt ma E = 200 GPa, ν = 0,30 i średnicę początkową d₀ = 16 mm. Pod obciążeniem odkształcenie osiowe wynosi ε_x = 900 με. Na rysunku wydłużenie osiowe i skurcz średnicy są powiększone, żeby oba efekty były widoczne.',
      caption: 'ε_x = 900·10⁻⁶ = 0,0009; pręt wydłuża się, a jego średnica maleje.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'E=200\\,\\text{GPa},\\qquad \\nu=0{,}30,\\qquad d_0=16\\,\\text{mm},\\qquad \\varepsilon_x=900\\,\\mu\\varepsilon',
    },
    {
      title: 'Skurcz poprzeczny z definicji ν',
      narration:
        'Z definicji liczby Poissona ε_y = −νε_x. Po podstawieniu ν = 0,30 otrzymujemy −0,30·0,0009 = −0,00027, czyli −270 με. Odkształcenie poprzeczne ma znak przeciwny do osiowego.',
      caption: 'ε_y = −270 με; słupek ε_y jest równy 0,30 długości słupka ε_x.',
      visual: 'axial',
      focus: { metric: 'strain' },
      formula: '\\varepsilon_y=-\\nu\\varepsilon_x=-0{,}30\\cdot0{,}0009=-0{,}00027=-270\\,\\mu\\varepsilon',
    },
    {
      title: 'Zmiana średnicy',
      narration:
        'Zmiana średnicy to iloczyn odkształcenia poprzecznego i średnicy początkowej: Δd = ε_y·d₀ = −0,00027·16 = −0,00432 mm. Średnica maleje, bo ε_y jest ujemne.',
      caption: 'Δd = −0,00432 mm; przekrój kurczy się równomiernie wokół osi.',
      visual: 'axial',
      focus: { metric: 'diameter' },
      formula: '\\Delta d=\\varepsilon_y d_0=-0{,}00027\\cdot16=-0{,}00432\\,\\text{mm}',
    },
    {
      title: 'Nowa średnica',
      narration:
        'Odejmujemy skurcz od średnicy początkowej: d = 16 − 0,00432 = 15,99568 mm. Zmiana jest więc niewielka, ale mierzalna i istotna w pasowaniach precyzyjnych.',
      caption: 'd = 15,99568 mm.',
      visual: 'axial',
      focus: { metric: 'final' },
      formula: 'd=d_0+\\Delta d=16-0{,}00432=15{,}99568\\,\\text{mm}',
    },
    {
      title: 'Naprężenie osiowe',
      narration:
        'W stanie jednoosiowym σ_x = Eε_x = 200 000·0,0009 = 180 MPa. To naprężenie jest poniżej typowej granicy plastyczności stali, więc model sprężysty jest uzasadniony. W kierunku poprzecznym naprężenie jest zerowe, choć odkształcenie nie.',
      caption: 'σ_x = 180 MPa, σ_y = σ_z = 0.',
      visual: 'axial',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=E\\varepsilon_x=200\\,000\\cdot0{,}0009=180\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź stosunek odkształceń',
      narration:
        'Kontrola: ε_y/ε_x = −0,00027/0,0009 = −0,30 = −ν, zgodnie z definicją. Stosunek skurczu poprzecznego do wydłużenia osiowego jest więc poprawny.',
      caption: 'Kontrola: ε_y/ε_x = −0,30 = −ν.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\frac{\\varepsilon_y}{\\varepsilon_x}=\\frac{-0{,}00027}{0{,}0009}=-0{,}30=-\\nu,\\qquad |\\Delta d|=0{,}00432\\,\\text{mm}',
    },
  ],
} satisfies SolutionData
