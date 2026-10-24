import type { SolutionData } from '../../model'
import { HollowTorsionDesignAnimation } from './animation'

export default {
  id: 'ex-shear-hollow-torsion-3',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 3',
  duration: 7,
  given: ['D = 100 mm', 'T = 4 kN·m', 'tau_{dop} = 40 MPa'],
  result:
    'Wariant odwrotny pokazuje, że dla zadanej średnicy zewnętrznej nośność rośnie wraz z grubością ścianki, ale nie liniowo. Początkowo wystarczy cienka ścianka, a przy dużych momentach potrzebna grubość rośnie szybko. Jednocześnie bardzo cienka ścianka może utracić stateczność miejscową, mimo że wzór na naprężenie nadal daje poprawny wynik sprężysty.',
  animation: HollowTorsionDesignAnimation,
  scenes: [
    {
      title: 'Model i warunek',
      narration:
        'Projektujemy rurę o średnicy zewnętrznej D = 100 mm, która przy momencie T = 4 kN·m osiągnie naprężenie nie większe niż τ_dop = 40 MPa. Szukamy średnicy wewnętrznej d i grubości ścianki t. Moment zamieniamy na 4 000 000 N·mm.',
      caption: 'Średnica zewnętrzna jest ustalona, a średnica wewnętrzna jest szukana.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'D=100\\ \\text{mm},\\quad T=4\\ \\text{kN}\\cdot\\text{m}=4\\,000\\,000\\ \\text{N}\\cdot\\text{mm},\\quad \\tau_{dop}=40\\ \\text{MPa}',
    },
    {
      title: 'Wymagany wskaźnik wytrzymałości',
      narration:
        'Najpierw wyznaczamy wymagany wskaźnik wytrzymałości: W_o ≥ T/τ_dop = 4 000 000/40 = 100 000 mm³. Ten warunek mówi, ile nośności musi mieć przekrój, zanim jeszcze dobierzemy ściankę.',
      caption: 'Warunek wytrzymałości wyznacza minimalny wskaźnik W_o.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'W_o\\ge\\frac{T}{\\tau_{dop}}=\\frac{4\\,000\\,000}{40}=100\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Średnica wewnętrzna i ścianka',
      narration:
        'Korzystamy ze wzoru W_o = π(D⁴ − d⁴)/(16D) i przekształcamy go względem d. Po podstawieniu D = 100 mm i W_o = 100 000 mm³ otrzymujemy d⁴ = 49 070 419 mm⁴, czyli d = 83,70 mm. Grubość ścianki wynosi t = (100 − 83,70)/2 = 8,15 mm.',
      caption: 'Wydrążenie rdzenia zwiększa średnicę wewnętrzną, ale ścianka pozostaje stosunkowo cienka.',
      visual: 'section',
      focus: {
        metric: 'geometry',
      },
      formula:
        'd^4=D^4-\\frac{16DW_o}{\\pi}=100^4-\\frac{16\\cdot100\\cdot100\\,000}{\\pi}=49\\,070\\,419\\ \\text{mm}^4',
    },
    {
      title: 'Sprawdzenie naprężeń',
      narration:
        'Sprawdzamy: J_o = π(100⁴ − 83,70⁴)/32 = 4 999 090 mm⁴, a W_o = J_o/50 = 99 982 mm³. Naprężenie maksymalne wynosi 4 000 000/99 982 = 40,01 MPa, czyli praktycznie równa się wartości dopuszczalnej. Maksimum leży na zewnętrznej powierzchni rury.',
      caption: 'Rozkład naprężeń jest liniowy, a maksimum sięga dopiero na zewnętrznym obwodzie.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        'J_o=\\frac{\\pi(100^4-83{,}70^4)}{32}=4\\,999\\,090\\ \\text{mm}^4,\\qquad W_o=\\frac{J_o}{50}=99\\,982\\ \\text{mm}^3',
    },
    {
      title: 'Materiał i granice modelu',
      narration:
        'Pole rury to około 2 352 mm², a pole pełnego wału o średnicy 100 mm to 7 854 mm². Oszczędność materiału sięga około 70%. Trzeba jednak pamiętać, że przy bardzo cienkiej ściance może wystąpić miejscowe wyboczenie albo owalizacja, których wzór sprężysty nie opisuje.',
      caption: 'Duża oszczędność masy wymaga sprawdzenia stateczności cienkiej ścianki.',
      visual: 'section',
      focus: {
        metric: 'limits',
      },
      formula:
        'A=\\frac{\\pi(100^2-83{,}70^2)}{4}\\approx2\\,352\\ \\text{mm}^2,\\qquad \\frac{A_0-A}{A_0}\\approx70\\%',
    },
  ],
} satisfies SolutionData
