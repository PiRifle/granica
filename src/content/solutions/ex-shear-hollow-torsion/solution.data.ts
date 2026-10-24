import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-hollow-torsion',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 1',
  duration: 7,
  given: ['D = 80 mm', 'd = 50 mm', 'T = 2,5 kN·m'],
  result:
    'τ_max ≈ 29,4 MPa na zewnętrznej powierzchni rury. Przy tej samej średnicy zewnętrznej wał pełny miałby naprężenie około 24,9 MPa, więc rura jest w tym porównaniu słabsza, ale zużywa o 39% mniej materiału.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HollowTorsionAnimation }))),
  scenes: [
    {
      title: 'Model rury i moment',
      narration:
        'Rura o średnicy zewnętrznej D = 80 mm i wewnętrznej d = 50 mm przenosi moment T = 2,5 kN·m. Zamieniamy moment na niutonominimetry: T = 2 500 000 N·mm. Na rysunku widzisz przekrój pierścieniowy oraz moment skręcający działający wokół osi wału.',
      caption: 'Model: rura ∅80/∅50 obciążona momentem 2,5 kN·m.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula:
        'D=80\\ \\text{mm},\\quad d=50\\ \\text{mm},\\quad T=2{,}5\\ \\text{kN}\\cdot\\text{m}=2\\,500\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Wydrążenie rdzenia',
      narration:
        'Usuwamy rdzeń o średnicy 50 mm. Biegunowy moment bezwładności pierścienia jest różnicą momentów pełnego koła o średnicy D i pełnego koła o średnicy d: J_o = π(80⁴ − 50⁴)/32 = 3 407 646 mm⁴.',
      caption: 'Rdzeń wnosił πd⁴/32; po jego usunięciu zostaje sam pierścień.',
      visual: 'section',
      focus: {
        metric: 'core',
      },
      formula: 'J_o=\\frac{\\pi(D^4-d^4)}{32}=\\frac{\\pi(80^4-50^4)}{32}=3\\,407\\,646\\ \\text{mm}^4',
    },
    {
      title: 'Rozkład naprężeń stycznych',
      narration:
        'Naprężenie styczne rośnie liniowo z promieniem. Na powierzchni wewnętrznej nie jest zerem: τ(d/2) = (d/D)τ_max = 0,625τ_max. Maksimum występuje na zewnętrznym obwodzie, na promieniu D/2.',
      caption: 'Wydrążenie usuwa materiał, ale nie usuwa liniowego rozkładu naprężeń.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau(r)=\\frac{Tr}{J_o},\\qquad \\tau_{max}=\\frac{T(D/2)}{J_o}',
    },
    {
      title: 'Sprawdzenie wytrzymałości',
      narration:
        'Wskaźnik wytrzymałości dzielimy przez promień zewnętrzny D/2, bo tam jest maksimum naprężenia: W_o = J_o/40 = 85 191 mm³. Stąd τ_max = 2 500 000/85 191 = 29,4 MPa. Przy tej samej średnicy wał pełny miałby tylko 24,9 MPa.',
      caption: 'Maksimum naprężenia leży na zewnętrznej powierzchni rury.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula:
        'W_o=\\frac{J_o}{D/2}=85\\,191\\ \\text{mm}^3,\\qquad \\tau_{max}=\\frac{2\\,500\\,000}{85\\,191}=29{,}4\\ \\text{MPa}',
    },
    {
      title: 'Materiał i oszczędność',
      narration:
        'Pole rury wynosi 3 063 mm², a pełnego wału o tej samej średnicy 5 027 mm². Rura zużywa więc o 39% mniej materiału, choć przy tym samym momencie pracuje z większym naprężeniem. Usunięty rdzeń leżał blisko osi, gdzie jego wkład w nośność był mały.',
      caption: 'Ta sama średnica zewnętrzna: mniej materiału, ale większe naprężenie.',
      visual: 'section',
      focus: {
        metric: 'efficiency',
      },
      formula: 'A=\\frac{\\pi(80^2-50^2)}{4}=3\\,063\\ \\text{mm}^2,\\qquad \\frac{A_0-A}{A_0}\\approx39\\%',
    },
  ],
} satisfies SolutionData
