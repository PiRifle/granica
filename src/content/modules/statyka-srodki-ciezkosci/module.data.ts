import type { ModuleData } from '../../model'

export default {
  id: 'statyka-srodki-ciezkosci',
  number: 8,
  title: 'Środki ciężkości i twierdzenie Guldina',
  shortTitle: 'Środki ciężkości',
  description:
    'Środek ciężkości i środek masy, centroidy linii, łuków, figur płaskich i brył, całkowanie, figury złożone z polami ujemnymi, momenty statyczne oraz twierdzenia Pappusa-Guldina.',
  outcomes: [
    'W1 — rozumie pojęcia środka ciężkości, środka masy i centroidy oraz warunki ich pokrywania się',
    'W2 — rozumie moment statyczny jako miarę wypadkowego momentu ciężaru i stosuje go do linii, pól i objętości',
    'U1 — wyznacza środki ciężkości linii, łuków, figur płaskich i brył metodą części składowych z polami ujemnymi',
    'U2 — stosuje twierdzenia Pappusa-Guldina do powierzchni i objętości brył obrotowych i odwrotnie',
    'U3 — rozwiązuje pełne zadania z wykładu i zestawu E, kontrolując geometrię, znaki, jednostki i wynik',
  ],
  status: 'ready',
} satisfies ModuleData
