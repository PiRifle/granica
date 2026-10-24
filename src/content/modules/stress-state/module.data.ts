import type { ModuleData } from '../../model'

export default {
  id: 'stress-state',
  number: 7,
  title: 'Stan naprężenia: od składowych do koła Mohra',
  shortTitle: 'Stan naprężenia',
  description:
    'Zrozum, jak opisać obciążenie w punkcie, co zmienia obrót układu i jak znaleźć kierunki najważniejsze dla bezpieczeństwa konstrukcji.',
  outcomes: [
    'W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu',
    'W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem',
    'W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia',
    'U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne',
    'U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne',
    'U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu',
  ],
} satisfies ModuleData
