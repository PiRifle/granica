import type { ModuleData } from '../../model'

export default {
  id: 'design',
  number: 10,
  title: 'Projektowanie elementów i pełne zadania',
  shortTitle: 'Dobór i sprawdzanie',
  description:
    'Przekładaj warunki wytrzymałości i sztywności na wymiar, materiał lub obciążenie dopuszczalne; ćwicz pełne rozwiązania i strategię kolokwium.',
  outcomes: [
    'W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.',
    'W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.',
    'W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.',
    'U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.',
    'U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.',
    'U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności.',
  ],
} satisfies ModuleData
