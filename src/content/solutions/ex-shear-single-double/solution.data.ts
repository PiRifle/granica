import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-shear-single-double',
  title: 'Połączenia jedno- i dwucięte — przykład 1',
  duration: 7,
  given: ['d = 20 mm', 'F = 100 kN'],
  result:
    'τ_sr ≈ 159 MPa, a każda płaszczyzna przenosi 50 kN. Wynik jest typowy dla stali konstrukcyjnej, ale wymaga porównania z naprężeniem dopuszczalnym i sprawdzenia docisku blach.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ShearSingleDoubleAnimation }))),
  scenes: [
    {
      title: 'Model połączenia',
      narration:
        'Dwucięty sworzeń o średnicy d = 20 mm przenosi siłę F = 100 kN. Siła działa na blachę środkową, a dwie blachy zewnętrzne odprowadzają ją po połowie. Sworzeń przechodzi przez trzy blachy i styka się z nimi w dwóch miejscach.',
      caption: 'Trzy blachy, jeden sworzeń i dwa styki, w których siła przechodzi z blachy środkowej na nakładki.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F=100\\ \\text{kN},\\quad d=20\\ \\text{mm}',
    },
    {
      title: 'Jedno czy dwa cięcia',
      narration:
        'W połączeniu jednociętym sworzeń byłby przecięty tylko raz. Tutaj ma dwa styki, więc jest ścinany w dwóch płaszczyznach. Liczymy przecięcia sworznia, a nie liczbę blach: n = 2.',
      caption: 'Dwie płaszczyzny ścinania wynikają z dwóch styków blachy środkowej z nakładkami.',
      visual: 'section',
      focus: { metric: 'planes' },
      formula: 'n=2',
    },
    {
      title: 'Pole przekroju i pole ścinania',
      narration:
        'Pole jednego przekroju sworznia wynosi A = πd²/4 = π · 20²/4 = 314,16 mm². Przy dwóch płaszczyznach łączne pole ścinania to A_s = nA = 2A = 628,32 mm².',
      caption: 'Dwa przekroje dają łączne pole 2A; to ono trafia do mianownika wzoru.',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A=\\frac{\\pi d^{2}}{4}=314{,}16\\ \\text{mm}^{2},\\quad A_s=2A=628{,}32\\ \\text{mm}^{2}',
    },
    {
      title: 'Siła na płaszczyznę',
      narration:
        'Cała siła F rozkłada się na dwie płaszczyzny. Przy symetrycznym połączeniu każda z nich przenosi F_p = F/2 = 50 kN. To wyjaśnia, dlaczego drugie cięcie tak mocno odciąża sworzeń.',
      caption: 'Każda z dwóch płaszczyzn przenosi 50 kN, czyli połowę siły całkowitej.',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'F_p=\\frac{F}{2}=50\\ \\text{kN}',
    },
    {
      title: 'Naprężenie średnie',
      narration:
        'Średnie naprężenie styczne wynosi τ_sr = F/(2A) = 100 000/628,32 = 159,15 MPa. Gdyby ten sam sworzeń był jednocięty, naprężenie byłoby dwa razy większe i wynosiłoby 318,3 MPa.',
      caption: 'Dwa cięcia obniżają średnie naprężenie o połowę w porównaniu z połączeniem jednociętym.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau_{sr}=\\frac{100\\,000}{2\\cdot314{,}16}=159{,}15\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
