import type { ModuleData } from '../../model'

export default {
  id: 'statyka-plaskie-dowolne',
  number: 3,
  title: 'Płaski dowolny układ sił',
  shortTitle: 'Płaski dowolny',
  description:
    'Siły równoległe i pary sił, redukcja układu do bieguna, obciążenia ciągłe oraz pełne warunki równowagi belek i ram.',
  outcomes: [
    'W1 — rozumie wypadkową sił równoległych, moment pary sił i redukcję układu do bieguna',
    'W2 — wyjaśnia różnicę między wektorem głównym a momentem głównym oraz warunki ich znoszenia',
    'W3 — rozpoznaje układ statycznie wyznaczalny, niewyznaczalny i chwilowo niestateczny',
    'U1 — zastępuje obciążenie ciągłe wypadkową o poprawnej wartości i położeniu',
    'U2 — zapisuje i rozwiązuje równania równowagi płaskiego układu dowolnego, także w wariantach alternatywnych',
    'U3 — wyznacza reakcje podpór w belkach i ramach oraz sprawdza wynik drugim równaniem momentów',
  ],
  status: 'ready',
} satisfies ModuleData
