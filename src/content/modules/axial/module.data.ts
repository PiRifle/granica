import type { ModuleData } from '../../model'

export default {
  id: 'axial',
  number: 2,
  title: 'Rozciąganie i ściskanie',
  shortTitle: 'Osiowo',
  description:
    'Od siły osiowej i naprężenia do wykresów N, odkształceń prętów schodkowych oraz warunków wytrzymałości i sztywności.',
  outcomes: [
    'W1 — analizuje pręty przenoszące obciążenia osiowe',
    'W2 — rozpoznaje rozciąganie i ściskanie oraz zakres liniowo sprężysty',
    'W3 — uwzględnia zmienne pole przekroju i długości odcinków',
    'U1 — oblicza N, naprężenia, odkształcenia i wydłużenia',
    'U2 — interpretuje jednoosiowy stan jako graniczny przypadek koła Mohra',
    'U3 — dobiera przekrój z warunków bezpieczeństwa i sztywności',
  ],
} satisfies ModuleData
