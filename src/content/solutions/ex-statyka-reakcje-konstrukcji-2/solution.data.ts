import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-reakcje-konstrukcji-2',
  title: 'Reakcje ramy z przegubem i rolką — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Rama AC–CD: słup AC = 4 m, rygiel CD = 6 m',
    'Przegub nieruchomy w A, rolka o reakcji pionowej w D',
    'P = 12 kN w C, poziomo w prawo',
    'q = 2 kN/m w dół na całym rygielu CD',
  ],
  result:
    'Wypadkowa obciążenia ciągłego Q = 12 kN działa w środku rygla. A_x = 12 kN w lewo, A_y = 2 kN w dół, D_y = 14 kN w górę. Kontrola momentem względem D: −48 + 12 + 36 = 0.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FrameReactionsAnimation }))),
  scenes: [
    {
      title: 'Model ramy i podpór',
      narration:
        'Przegub w A wnosi dwie niewiadome: A_x i A_y. Rolka w D daje jedną reakcję pionową D_y. Na ramę działają siła P w narożniku C oraz obciążenie ciągłe q na rygiel. Razem mamy trzy niewiadome i trzy równania równowagi.',
      caption: 'Rama L z przegubem w A, rolką w D, siłą P i obciążeniem q.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'AC=4\\ \\text{m},\\quad CD=6\\ \\text{m},\\quad P=12\\ \\text{kN},\\quad q=2\\ \\text{kN/m}',
    },
    {
      title: 'Obciążenie ciągłe jako wypadkowa',
      narration:
        'Obciążenie ciągłe zastępujemy jedną siłą równą polu diagramu. Dla prostokąta Q = qL = 2·6 = 12 kN, przyłożoną w połowie rygla, czyli 3 m od C. Ta wypadkowa ma ten sam moment względem każdego bieguna co całe obciążenie rozłożone.',
      caption: 'Q = 12 kN w odległości 3 m od C, w połowie rygla.',
      visual: 'diagram',
      focus: { metric: 'loads' },
      formula: 'Q=q\\cdot CD=2\\cdot6=12\\ \\text{kN},\\qquad x_Q=3\\ \\text{m}\\ \\text{od }C',
    },
    {
      title: 'Rzut poziomy',
      narration:
        'W kierunku poziomym działa tylko siła P w prawo i składowa A_x. Z równania A_x + 12 = 0 otrzymujemy A_x = −12 kN. Minus oznacza, że przegub działa na ramę w lewo, przeciwnie do założonego zwrotu.',
      caption: 'A_x = 12 kN w lewo.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'A_x+P=0\\quad\\Rightarrow\\quad A_x=-12\\ \\text{kN}',
    },
    {
      title: 'Momenty względem A',
      narration:
        'Biegun w A eliminuje A_x i A_y. Reakcja D_y działa na ramieniu 6 m i daje moment dodatni. Siła P na wysokości 4 m oraz wypadkowa Q na ramieniu 3 m dają momenty przeciwne. Po podstawieniu 6D_y = 48 + 36, więc D_y = 14 kN.',
      caption: 'D_y = 14 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula:
        'D_y\\cdot6-P\\cdot4-Q\\cdot3=0\\quad\\Rightarrow\\quad 6D_y=48+36=84\\quad\\Rightarrow\\quad D_y=14\\ \\text{kN}',
    },
    {
      title: 'Rzut pionowy',
      narration:
        'W pionie działają A_y, D_y = 14 kN w górę oraz Q = 12 kN w dół. Bilans A_y + 14 − 12 = 0 daje A_y = −2 kN. Przegub musi więc ciągnąć ramę w dół, bo pozioma siła w C próbuje ją obrócić.',
      caption: 'A_y = 2 kN w dół — reakcja o zwrocie przeciwnym do założonego.',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'A_y+D_y-Q=0\\quad\\Rightarrow\\quad A_y+14-12=0\\quad\\Rightarrow\\quad A_y=-2\\ \\text{kN}',
    },
    {
      title: 'Kontrola względem D',
      narration:
        'Sprawdzamy momenty względem D. Składowa A_x daje −48 kN·m, składowa A_y daje +12 kN·m, a wypadkowa Q daje +36 kN·m. Siła P przechodzi przez D, więc jej moment jest zerowy. Suma −48 + 12 + 36 = 0 potwierdza wynik.',
      caption: 'ΣM_D = −48 + 12 + 36 = 0 — reakcje są poprawne.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\sum M_D=-48+12+36=0',
    },
  ],
} satisfies SolutionData
