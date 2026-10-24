import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-self-weight-3',
  title: 'Ciężar własny elementu — przykład 3',
  duration: 7,
  given: ['R_e = 235 MPa', 'ρ = 7850 kg/m³', 'g = 9,81 m/s²', 'γ = 77 kN/m³'],
  result:
    'Wniosek projektowy jest prosty: jeżeli długość jest ograniczona wytrzymałością od ciężaru własnego, to zmiana przekroju nie pomoże. Trzeba wybrać materiał o większym stosunku R_e/ρ albo zmienić schemat konstrukcji, na przykład dodać podpory pośrednie. To jakościowo inna decyzja niż zwykłe „zwiększenie przekroju”, które działa przy sile skupionej.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SelfWeightExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Rozważamy pionowy, jednorodny pręt wiszący obciążony tylko ciężarem własnym. Naprężenie przy zawieszeniu wynosi σmax = γL; pytamy, przy jakiej długości osiągnie granicę plastyczności Re = 235 MPa.',
      caption: 'Dane materiałowe i schemat pręta; szukamy długości granicznej.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'R_e=235\\ \\text{MPa},\\qquad \\rho=7850\\ \\text{kg/m}^3,\\qquad g=9{,}81\\ \\text{m/s}^2',
    },
    {
      title: 'Naprężenie rośnie wzdłuż pręta',
      narration:
        'Naprężenie od ciężaru własnego rośnie liniowo od zera na swobodnym końcu do σmax = γL przy zawieszeniu. Gdy długość osiąga Lmax, górny przekrój osiąga granicę Re.',
      caption: 'σ(x) = γx; przy x = Lmax naprężenie osiąga Re = 235 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma(x)=\\gamma x,\\qquad \\sigma(L_{\\max})=R_e',
    },
    {
      title: 'Granica długości',
      narration:
        'Z warunku γLmax = Re otrzymujemy Lmax = Re/(ρg) = 235·10⁶/(7850·9,81) ≈ 3052 m. Wykres σmax(L) = γL przecina poziom Re właśnie przy tej długości.',
      caption: 'Lmax = Re/(ρg) ≈ 3052 m; powyżej tej długości ciężar własny przekracza granicę materiału.',
      visual: 'diagram',
      focus: { metric: 'limit' },
      formula: 'L_{\\max}=\\frac{R_e}{\\rho g}=\\frac{235\\cdot10^6}{7850\\cdot9{,}81}\\approx3052\\ \\text{m}',
    },
    {
      title: 'Współczynnik bezpieczeństwa',
      narration:
        'Jeśli wymagamy współczynnika bezpieczeństwa n = 2, dopuszczalne naprężenie wynosi Re/n = 117,5 MPa, a maksymalna długość maleje do Lmax,n ≈ 1526 m. Zmniejsza się ona proporcjonalnie do dopuszczalnego naprężenia.',
      caption: 'Przy n = 2: σdop = 117,5 MPa i Lmax,n ≈ 1526 m.',
      visual: 'diagram',
      focus: { metric: 'safety' },
      formula:
        '\\sigma_{\\text{dop}}=\\frac{R_e}{n}=117{,}5\\ \\text{MPa},\\qquad L_{\\max,n}=\\frac{\\sigma_{\\text{dop}}}{\\gamma}\\approx1526\\ \\text{m}',
    },
    {
      title: 'Krótki pręt',
      narration:
        'Dla pręta o długości 300 m naprężenie od ciężaru własnego wynosi σ = γL = 23,1 MPa, więc zapas względem Re jest równy 235/23,1 ≈ 10,2. W typowych konstrukcjach ciężar własny stali często nie decyduje, ale w bardzo długich elementach staje się warunkiem krytycznym.',
      caption: 'L = 300 m: σ = 23,1 MPa, zapas ≈ 10,2.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\sigma=\\gamma L=77\\,000\\cdot300=23{,}1\\ \\text{MPa},\\qquad \\frac{R_e}{\\sigma}\\approx10{,}2',
    },
  ],
} satisfies SolutionData
