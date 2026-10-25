import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-reakcje-konstrukcji',
  title: 'Reakcje wspornika z linką — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Belka wspornikowa AB: L = 4 m, utwierdzenie w A',
    'Obciążenie ciągłe q = 2 kN/m w dół na całej długości',
    'Moment M = 8 kN·m w B, zgodnie z ruchem wskazówek zegara',
    'Linka w B: P = 10 kN pod kątem 30° w górę i w prawo',
  ],
  result: 'A_x = 8,66 kN w lewo, A_y = 3,0 kN w górę, M_A = 4,0 kN·m przeciwnie do ruchu wskazówek zegara.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SupportReactionsAnimation }))),
  scenes: [
    {
      title: 'Model wspornika',
      narration:
        'Utwierdzenie w A daje trzy niewiadome: A_x, A_y i M_A. Na belkę działają obciążenie ciągłe, moment skupiony w B oraz linka przechodząca przez krążek.',
      caption: 'Wspornik z obciążeniem ciągłym, momentem i linką.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad q=2\\ \\text{kN/m},\\quad M=8\\ \\text{kN}\\cdot\\text{m},\\quad P=10\\ \\text{kN},\\quad \\alpha=30^\\circ',
    },
    {
      title: 'Zastąpienie obciążeń',
      narration:
        'Obciążenie ciągłe zastępujemy wypadkową Q = qL = 8 kN w środku belki. Linka działa siłą P wzdłuż swojej osi: pozioma składowa wynosi 8,66 kN w prawo, a pionowa 5 kN w górę.',
      caption: 'Q = 8 kN w x = 2 m; P_x = 8,66 kN, P_y = 5 kN.',
      visual: 'diagram',
      focus: { metric: 'loads' },
      formula: 'Q=qL=2\\cdot4=8\\ \\text{kN},\\qquad P_x=8{,}66\\ \\text{kN},\\quad P_y=5\\ \\text{kN}',
    },
    {
      title: 'Rzut poziomy',
      narration:
        'Pozioma składowa linki działa w prawo, więc utwierdzenie musi ją zrównoważyć siłą w lewo. A_x + 8,66 = 0, skąd A_x = −8,66 kN.',
      caption: 'A_x = 8,66 kN w lewo.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'A_x+P_x=0\\quad\\Rightarrow\\quad A_x=-8{,}66\\ \\text{kN}',
    },
    {
      title: 'Rzut pionowy',
      narration:
        'W pionie działają A_y w górę, Q = 8 kN w dół oraz P_y = 5 kN w górę. Z bilansu A_y − 8 + 5 = 0 otrzymujemy A_y = 3 kN w górę.',
      caption: 'A_y = 3,0 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'A_y-Q+P_y=0\\quad\\Rightarrow\\quad A_y=3\\ \\text{kN}',
    },
    {
      title: 'Moment utwierdzenia',
      narration:
        'Momenty względem A: M_A − 8·2 + 5·4 − 8 = 0. Po podstawieniu M_A − 16 + 20 − 8 = 0, więc M_A = 4 kN·m przeciwnie do ruchu wskazówek zegara.',
      caption: 'M_A = 4,0 kN·m przeciwnie do ruchu wskazówek zegara.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: 'M_A-8\\cdot2+5\\cdot4-8=0\\quad\\Rightarrow\\quad M_A=4\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola względem B',
      narration:
        'Sprawdzamy momenty względem B: 4 − 3·4 + 8·2 − 8 = 4 − 12 + 16 − 8 = 0. Bilans się zgadza, więc wyznaczone reakcje są poprawne.',
      caption: 'Suma momentów względem B wynosi zero.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M_A-A_y\\cdot4+Q\\cdot2-M=4-12+16-8=0',
    },
  ],
} satisfies SolutionData
