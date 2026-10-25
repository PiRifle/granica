import type { ModuleData } from '../../model'

export default {
  id: 'statyka-tarcie',
  number: 6,
  title: 'Tarcie',
  shortTitle: 'Tarcie',
  description: 'Prawa tarcia suchego, kąt tarcia, równia, drabiny, kliny, tarcie cięgien, opór toczenia i hamulce.',
  outcomes: [
    'W1 — rozumie mechanizm tarcia suchego i pojęcie kąta tarcia',
    'W2 — rozpoznaje kierunek siły tarcia i stan graniczny w układzie',
    'W3 — wyjaśnia wzór Eulera dla cięgien oraz moment oporu toczenia',
    'U1 — rozwiązuje zadania równowagi z tarciem',
    'U2 — analizuje kliny, drabiny i proste mechanizmy z tarciem',
    'U3 — oblicza napięcia cięgna, opór toczenia i moment hamujący',
  ],
  status: 'ready',
} satisfies ModuleData
