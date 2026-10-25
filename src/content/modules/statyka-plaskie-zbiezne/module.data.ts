import type { ModuleData } from '../../model'

export default {
  id: 'statyka-plaskie-zbiezne',
  number: 2,
  title: 'Płaski zbieżny układ sił',
  shortTitle: 'Zbieżny',
  description:
    'Wypadkowa i równowaga sił zbieżnych, ciała trójsiłowe, pręty dwusiłowe oraz pełne zadania z reakcjami i siłami w prętach.',
  outcomes: [
    'W1 — rozpoznaje zbieżny układ sił i wyznacza jego wypadkową',
    'W2 — stosuje analityczne warunki równowagi',
    'W3 — rozpoznaje pręty dwusiłowe i interpretuje znak siły jako rozciąganie lub ściskanie',
    'U1 — wyznacza reakcje i siły w węzłach układu zbieżnego',
    'U2 — rozwiązuje zadania z równowagą trzech sił nierównoległych',
    'U3 — rozwiązuje pełne zadanie z reakcją przegubu i siłą w pręcie oraz sprawdza zbieżność',
  ],
  status: 'ready',
} satisfies ModuleData
