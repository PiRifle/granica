import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-hollow-torsion-2',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 2',
  duration: 7,
  given: ['D_wału = 80 mm', 'd_rury = 50 mm', 'T = 2,5 kN·m'],
  result:
    'Ten przykład pokazuje, dlaczego samo stwierdzenie „rura jest lżejsza” nie wystarcza. Trzeba podać, co pozostaje stałe: średnica zewnętrzna, masa, moment, a może gabaryt. Dopiero wtedy porównanie ma sens i można policzyć konkretną różnicę.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HollowTorsionEqualMassAnimation }))),
  scenes: [
    {
      title: 'Model: ta sama masa',
      narration:
        'Porównajmy rurę z wałem pełnym przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Wał pełny ma średnicę 80 mm, a rura średnicę wewnętrzną 50 mm. Szukamy takiej średnicy zewnętrznej rury, aby pole przekroju, a więc i masa na jednostkę długości, były takie same.',
      caption: 'Ten sam materiał, inny rozkład względem osi.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'A_0=\\frac{\\pi D_{walu}^2}{4}=5\\,027\\ \\text{mm}^2,\\qquad A=\\frac{\\pi(D_{rury}^2-50^2)}{4}=A_0',
    },
    {
      title: 'Rdzeń na obrzeże',
      narration:
        'Pole wału pełnego wynosi 5 027 mm². Przyrównanie pól daje D² − 50² = 80², czyli D = √8 900 = 94,34 mm. Rura musi mieć większą średnicę zewnętrzną, a jej ścianka ma grubość (94,34 − 50)/2 = 22,17 mm. Materiał z rdzenia przenosimy na obrzeże.',
      caption: 'Warunek równego pola wyznacza średnicę zewnętrzną i grubość ścianki.',
      visual: 'section',
      focus: {
        metric: 'geometry',
      },
      formula: 'D_{rury}^2=80^2+50^2=8\\,900,\\qquad D_{rury}=94{,}34\\ \\text{mm},\\qquad t=22{,}17\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności',
      narration:
        'Dla takiej rury J_o = π(94,34⁴ − 50⁴)/32 = 7 162 831 mm⁴. Jest on większy niż w pełnym wale o średnicy 80 mm, mimo że masa obu przekrojów jest identyczna. Decyduje o tym materiał przesunięty daleko od osi.',
      caption: 'Ten sam materiał na większym promieniu daje większy biegunowy moment bezwładności.',
      visual: 'section',
      focus: {
        metric: 'inertia',
      },
      formula: 'J_o=\\frac{\\pi(94{,}34^4-50^4)}{32}=7\\,162\\,831\\ \\text{mm}^4',
    },
    {
      title: 'Rozkład naprężeń',
      narration:
        'Przy momencie 2,5 kN·m maksymalne naprężenie w rurze wynosi τ_max = 2 500 000·47,17/7 162 831 = 16,5 MPa. Wał pełny o średnicy 80 mm ma w tym samym zadaniu 24,9 MPa. Przy tej samej masie rura pracuje więc z naprężeniem mniejszym o około 34%.',
      caption: 'W rurze maksimum jest na zewnątrz, a na powierzchni wewnętrznej naprężenie nie spada do zera.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        '\\tau_{max,r}=\\frac{2\\,500\\,000\\cdot47{,}17}{7\\,162\\,831}=16{,}5\\ \\text{MPa},\\qquad \\tau_{max,s}=24{,}9\\ \\text{MPa}',
    },
    {
      title: 'Cena rozwiązania',
      narration:
        'Zaletą rury jest mniejsze naprężenie przy tej samej masie, ale wadą większa średnica zewnętrzna, a więc większe gabaryty i większa powierzchnia zewnętrzna. W ciasnej obudowie maszyny ten warunek może przeważyć nad oszczędnością masy.',
      caption: 'Ustal, co pozostaje stałe: średnica zewnętrzna, masa, moment czy gabaryt.',
      visual: 'section',
      focus: {
        metric: 'limits',
      },
      formula:
        '\\frac{\\tau_{max,r}}{\\tau_{max,s}}\\approx0{,}66,\\qquad D_{rury}=94{,}34\\ \\text{mm}>D_{walu}=80\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
