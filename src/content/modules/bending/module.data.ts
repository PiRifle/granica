import type { ModuleData } from '../../model'

export default {
  id: 'bending',
  number: 6,
  title: 'Zginanie belek',
  shortTitle: 'Zginanie',
  description:
    'Od reakcji podporowych przez wykresy T i M do naprężeń, osi obojętnej oraz doboru przekroju i kontroli ugięcia.',
  outcomes: [
    'W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe',
    'W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej',
    'W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie',
    'U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające',
    'U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie',
    'U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności',
  ],
} satisfies ModuleData
