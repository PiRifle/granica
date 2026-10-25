import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wyznaczalnosc',
  title: 'Belka wyznaczalna z dwoma równaniami momentów — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Belka AB: L = 10 m, przegub w A, rolka w B',
    'q = 2 kN/m w dół na całej długości',
    'M = 20 kN·m w x = 2 m, zgodnie z ruchem wskazówek zegara',
    'P = 10 kN w dół w x = 8 m, H = 6 kN w prawo w x = 6 m',
  ],
  result: 'A_x = 6 kN w lewo, A_y = 10 kN w górę, B_y = 20 kN w górę. Układ jest statycznie wyznaczalny: r = 3, n = 0.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DeterminacyAnimation }))),
  scenes: [
    {
      title: 'Model i liczba niewiadomych',
      narration:
        'Przegub w A wnosi dwie niewiadome, a rolka w B jedną. Razem r = 3, czyli n = r − 3 = 0. Belka jest statycznie wyznaczalna, o ile reakcje nie są równoległe ani zbieżne w jednym punkcie.',
      caption: 'Trzy niewiadome reakcji i trzy niezależne równania równowagi.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'L=10\\ \\text{m},\\quad q=2\\ \\text{kN/m},\\quad M=20\\ \\text{kN}\\cdot\\text{m},\\quad P=10\\ \\text{kN},\\quad H=6\\ \\text{kN}',
    },
    {
      title: 'Wybór zestawu równań',
      narration:
        'Zamiast klasycznego zestawu użyjemy dwóch równań momentów względem A i B oraz jednego rzutu poziomego. Punkty A i B są różne, a oś x nie jest prostopadła do AB, więc równania są niezależne.',
      caption: 'Zestaw II: ΣM_A = 0, ΣM_B = 0, ΣF_x = 0.',
      visual: 'diagram',
      focus: { metric: 'equations' },
      formula: '\\sum M_A=0,\\quad \\sum M_B=0,\\quad \\sum F_x=0',
    },
    {
      title: 'Moment względem A',
      narration:
        'Obciążenie ciągłe zastępujemy wypadkową Q = 20 kN w środku belki. W równaniu momentów względem A zostaje B_y·10, moment Q·5, moment skupiony 20 oraz P·8. Stąd B_y = 20 kN.',
      caption: 'B_y = 20 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'moment-a' },
      formula: '10B_y-20\\cdot5-20-10\\cdot8=0\\quad\\Rightarrow\\quad B_y=20\\ \\text{kN}',
    },
    {
      title: 'Moment względem B',
      narration:
        'Drugie równanie momentów względem B eliminuje B_y. Zostaje −A_y·10, moment Q·5, moment skupiony −20 oraz P·2. Rozwiązanie daje A_y = 10 kN.',
      caption: 'A_y = 10 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'moment-b' },
      formula: '-10A_y+20\\cdot5-20+10\\cdot2=0\\quad\\Rightarrow\\quad A_y=10\\ \\text{kN}',
    },
    {
      title: 'Rzut poziomy',
      narration:
        'Siła H działa w prawo, a reakcja A_x musi ją zrównoważyć. Z równania A_x + 6 = 0 otrzymujemy A_x = −6 kN, czyli reakcja działa w lewo.',
      caption: 'A_x = 6 kN w lewo.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'A_x+H=0\\quad\\Rightarrow\\quad A_x=-6\\ \\text{kN}',
    },
    {
      title: 'Kontrola i klasyfikacja',
      narration:
        'Bilans pionowy 10 + 20 − 20 − 10 = 0 się zgadza. Trzeci moment względem punktu C(5; 3) również daje zero, co potwierdza niezależność równań. Układ ma trzy niewiadome i trzy równania, więc jest wyznaczalny.',
      caption: 'Kontrole sił i momentu potwierdzają rozwiązanie; n = 0.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '10+20-20-10=0,\\qquad -18-50+100-20-30+18=0',
    },
  ],
} satisfies SolutionData
