import type { SolutionData } from '../../model'
import { AxialElongation2ExampleAnimation } from './animation'

export default {
  id: 'ex-axial-elongation-2',
  title: 'Wydłużenia i skrócenia prętów — przykład 2',
  duration: 7,
  given: [],
  result:
    'Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. To pokazuje, że dobór przekroju nie jest uniwersalnym lekarstwem na każde przemieszczenie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku.',
  animation: AxialElongation2ExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Rozważmy długą stalową linę zawieszoną pionowo i obciążoną tylko ciężarem własnym. Siła osiowa nie jest stała: przy dolnym końcu wynosi zero, a przy górnym jest równa ciężarowi całej liny. Nie można więc użyć jednego ilorazu NL/(EA) z siłą końcową. Trzeba pociąć linę na plasterki i scałkować. Przyjmijmy, że materiał ma ciężar objętościowy γ, pole A i moduł E. Na wysokości y od dolnego końca przekrój dźwiga ciężar materiału poniżej, równy γ Ay. Siła osiowa wynosi więc N(y)=γ Ay. Wydłużenie plasterka o długości dy wynosi du=N(y) dy/(EA)=γ y dy/E. Wydłużenie pręta pod działaniem ciężaru własnego nie zależy od pola przekroju. Zależy od ciężaru objętościowego, długości i modułu Younga. Dla stali przyjmijmy typowo γ=ρ g≈ 7,7×10^-5 N/mm^3 oraz E=200 000 MPa. Lina o długości L=30 m=30 000 mm wydłuży się o Δ L_γ=7,7×10^-5·(30 000)^2/(2·200 000)≈0,173 mm. Dla porównania siła skupiona na końcu równa całkowitemu ciężarowi liny daje wydłużenie dwa razy większe. Pole liny o średnicy 20 mm wynosi około 314 mm^2, więc ciężar wynosi W=γ AL≈726 N. Wydłużenie od takiej siły końcowej to WL/(EA)≈0,347 mm. Ciężar własny działa więc jak połowa tego ciężaru przyłożona na końcu, bo siła rośnie liniowo od zera do wartości maksymalnej. Warto zauważyć, że zwiększanie pola nie zmniejsza wydłużenia od ciężaru własnego. Większe pole zwiększa zarówno sztywność, jak i ciężar, a te efekty znoszą się dokładnie. To pokazuje, że dobór przekroju nie jest uniwersalnym lekarstwem na każde przemieszczenie. Przy obciążeniu zewnętrznym większe pole pomaga, przy ciężarze własnym nie zmienia wyniku. Przy zawieszeniu naprężenie jest największe: σ_max = γL = 7,7·10⁻⁵·30 000 = 2,31 MPa. Odkształcenie przy zawieszeniu: ε_max = σ_max/E = 2,31/200 000 ≈ 1,16·10⁻⁵.',
      caption: 'Odkształcenie względne jest największe przy zawieszeniu i maleje do zera na dolnym końcu.',
      visual: 'axial',
      formula:
        'N(y) = \\gamma Ay\\qquad \\Delta L_{\\gamma}=\\int_0^L\\frac{\\gamma y}{E}\\,\\mathrm{d}y=\\frac{\\gamma L^2}{2E}\\qquad \\gamma = \\rho g \\approx 7{,}7\\times 10^{-5} N/mm^{3}\\qquad WL/(EA) \\approx 0{,}347 mm\\qquad \\sigma_{\\max}=\\gamma L=7{,}7\\cdot10^{-5}\\cdot30\\,000=2{,}31\\ \\text{MPa}\\qquad \\varepsilon_{\\max}=\\sigma_{\\max}/E=2{,}31/200\\,000\\approx1{,}16\\cdot10^{-5}',
    },
  ],
} satisfies SolutionData
