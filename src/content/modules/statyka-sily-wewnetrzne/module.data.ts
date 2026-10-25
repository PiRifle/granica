import type { ModuleData } from '../../model'

export default {
  id: 'statyka-sily-wewnetrzne',
  number: 7,
  title: 'Siły wewnętrzne w belkach i ramach',
  shortTitle: 'Siły wewnętrzne',
  description:
    'Metoda przekrojów, konwencja znaków N, T, M oraz wykresy sił tnących i momentów zginających w belkach i ramach.',
  outcomes: [
    'W1 — rozumie pojęcie siły wewnętrznej w przekroju i jej związek z równowagą odciętej części',
    'W2 — stosuje konwencję znaków dla siły normalnej, tnącej i momentu zginającego',
    'W3 — wiąże kształt wykresów z rozkładem obciążenia za pomocą zależności różniczkowych',
    'U1 — wyznacza reakcje i siły wewnętrzne w wybranym przekroju belki lub ramy',
    'U2 — rysuje wykresy T i M dla belek z siłami skupionymi i obciążeniem ciągłym',
    'U3 — kontroluje wyniki za pomocą warunków brzegowych i pól pod wykresami',
  ],
  status: 'ready',
} satisfies ModuleData
