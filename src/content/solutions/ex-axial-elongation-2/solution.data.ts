import type { SolutionData } from '../../model'
import { AxialSelfWeightAnimation } from './animation'

export default {
  id: 'ex-axial-elongation-2',
  title: 'Wydłużenia i skrócenia prętów — przykład 2',
  duration: 7,
  given: ['L = 30 m', 'd = 20 mm', 'A ≈ 314 mm²', 'γ ≈ 7,7·10⁻⁵ N/mm³', 'E = 200 GPa'],
  result:
    'Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. To pokazuje, że dobór przekroju nie jest uniwersalnym lekarstwem na każde przemieszczenie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku.',
  animation: AxialSelfWeightAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Rozważmy długą stalową linę zawieszoną pionowo i obciążoną tylko ciężarem własnym. Lina ma długość L = 30 m, średnicę 20 mm i pole przekroju około 314 mm². Przyjmujemy γ = 7,7·10⁻⁵ N/mm³ oraz E = 200 000 MPa. Siła osiowa nie jest stała: przy dolnym końcu wynosi zero, a przy górnym jest równa ciężarowi całej liny.',
      caption: 'Pionowa lina obciążona tylko ciężarem własnym; dół jest swobodny, góra utwierdzona.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'L = 30\\,000 mm, A = 314 mm^{2}, \\gamma = 7{,}7\\cdot10^{-5} N/mm^{3}, E = 200\\,000 MPa',
    },
    {
      title: 'Rozkład siły osiowej',
      narration:
        'Na wysokości y od dolnego końca przekrój dźwiga ciężar materiału poniżej, równy γAy. Siła osiowa wynosi więc N(y) = γAy i rośnie liniowo od zera na dolnym końcu do wartości maksymalnej przy zawieszeniu.',
      caption: 'N(y) = γAy rośnie liniowo od zera do ciężaru całej liny.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(y) = \\gamma Ay',
    },
    {
      title: 'Wydłużenie od ciężaru własnego',
      narration:
        'Wydłużenie plasterka o długości dy wynosi du = N(y)dy/(EA) = γy dy/E. Po scałkowaniu wydłużenie pręta pod działaniem ciężaru własnego nie zależy od pola przekroju. Zależy od ciężaru objętościowego, długości i modułu Younga.',
      caption: 'ΔLγ = ∫₀ᴸ γy/E dy = γL²/(2E) — wynik nie zawiera pola A.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L_{\\gamma}=\\int_0^L\\frac{\\gamma y}{E}\\,\\mathrm{d}y=\\frac{\\gamma L^2}{2E}',
    },
    {
      title: 'Ciężar własny a siła końcowa',
      narration:
        'Dla stali L = 30 000 mm daje ΔLγ = 7,7·10⁻⁵·(30 000)²/(2·200 000) ≈ 0,173 mm. Dla porównania siła skupiona na końcu równa całkowitemu ciężarowi liny daje wydłużenie dwa razy większe: WL/(EA) ≈ 0,347 mm. Ciężar własny działa więc jak połowa tego ciężaru przyłożona na końcu, bo siła rośnie liniowo od zera do wartości maksymalnej.',
      caption: 'Siła końcowa równa całkowitemu ciężarowi daje dwa razy większe wydłużenie niż ciężar własny.',
      visual: 'axial',
      focus: { metric: 'end' },
      formula: '\\Delta L_{\\gamma}\\approx0{,}173 mm,\\qquad WL/(EA)\\approx0{,}347 mm',
    },
    {
      title: 'Pole nie zmienia wydłużenia',
      narration:
        'Zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku.',
      caption: 'Zmiana pola A nie zmienia ΔLγ, bo γAL/(EA) redukuje się do γL/E.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: '\\frac{\\gamma A L}{E A}=\\frac{\\gamma L}{E}',
    },
    {
      title: 'Kontrola σ i ε',
      narration:
        'Przy zawieszeniu naprężenie jest największe: σ_max = γL = 7,7·10⁻⁵·30 000 = 2,31 MPa. Odkształcenie przy zawieszeniu: ε_max = σ_max/E = 2,31/200 000 ≈ 1,16·10⁻⁵. Oba rozkłady maleją liniowo do zera na dolnym końcu.',
      caption: 'Naprężenie i odkształcenie są największe przy zawieszeniu i maleją do zera na dolnym końcu.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_{\\max}=\\gamma L=2{,}31\\ \\text{MPa},\\qquad \\varepsilon_{\\max}=\\sigma_{\\max}/E\\approx1{,}16\\cdot10^{-5}',
    },
  ],
} satisfies SolutionData
