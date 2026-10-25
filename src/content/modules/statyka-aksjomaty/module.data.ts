import type { ModuleData } from '../../model'

export default {
  id: 'statyka-aksjomaty',
  number: 1,
  title: 'Aksjomaty statyki i rachunek wektorowy',
  shortTitle: 'Aksjomaty',
  description: 'Prawa statyki, działania na wektorach, więzy i podpory oraz moment siły względem punktu i osi.',
  outcomes: [
    'W1 — formułuje aksjomaty statyki i warunki równowagi układów sił',
    'W2 — klasyfikuje więzy, podpory i reakcje oraz odróżnia siły czynne od biernych',
    'W3 — interpretuje moment siły względem punktu i osi oraz twierdzenie Varignona',
    'U1 — wykonuje działania na wektorach, w tym iloczyn skalarny i wektorowy',
    'U2 — redukuje proste układy sił i wyznacza reakcje podpór z równań równowagi',
    'U3 — oblicza moment względem punktu i rzutuje go na dowolną oś',
  ],
  status: 'ready',
} satisfies ModuleData
