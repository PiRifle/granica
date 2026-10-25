import type { ModuleData } from '../../model'

export default {
  id: 'statyka-przestrzenny',
  number: 4,
  title: 'Przestrzenny układ sił',
  shortTitle: 'Przestrzenny',
  description:
    'Siły i momenty w przestrzeni, redukcja do bieguna, sześć warunków równowagi, więzy 3D oraz reakcje wałów i łożysk.',
  outcomes: [
    'W1 — opisuje siły i momenty w przestrzeni oraz redukcję układu do bieguna',
    'W2 — formułuje sześć warunków równowagi i klasyfikuje więzy przestrzenne',
    'W3 — rozumie rolę łożysk i momentu skręcającego w analizie wałów',
    'U1 — wyznacza reakcje podpór przestrzennych i siły w cięgnach',
    'U2 — rozwiązuje pełne zadania 3D i weryfikuje wynik geometrycznie',
  ],
  status: 'ready',
} satisfies ModuleData
