import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-zadania-zbiezne',
  title: 'Pełne zadanie: belka z przegubem i prętem dwusiłowym',
  duration: 6,
  given: [
    'Belka AB o długości L = 2 m',
    'Pręt dwusiłowy BD pod kątem α = 45°',
    'Siła P = 24 kN w połowie belki, a = 1 m',
  ],
  result:
    'Siła w pręcie BD wynosi S = 16,97 kN (rozciąganie). Reakcja przegubu ma składowe Ax = 12,0 kN w lewo i Ay = 12,0 kN w górę, czyli RA = 16,97 kN pod kątem 45° w lewo i w górę.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullConcurrentTaskAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka jest przegubowo połączona ze ścianą w A, a w B podtrzymuje ją pręt dwusiłowy BD. Siła P działa w połowie długości belki. Niewiadome to dwie składowe reakcji przegubu oraz jedna siła w pręcie.',
      caption: 'Belka 2 m, obciążenie 24 kN w środku i pręt pod 45°.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'L=2\\ \\text{m},\\qquad a=1\\ \\text{m},\\qquad P=24\\ \\text{kN},\\qquad \\alpha=45^\\circ',
    },
    {
      title: 'Moment względem A',
      narration:
        'Biegunem momentów jest przegub A, bo znikają w nim obie niewiadome reakcji. Siła P ma ramię a = 1 m, a siła S ma ramię L sin 45°, czyli 1,41 m.',
      caption: 'Ramię S względem A wynosi L sin 45° = 1,41 m.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: '\\sum M_A=S\\sin45^\\circ\\cdot L-P\\cdot a=0',
    },
    {
      title: 'Siła w pręcie',
      narration:
        'Podstawiamy dane: S = 24 · 1 / (2 · 0,7071) = 16,97 kN. Wynik jest dodatni, więc pręt BD jest rozciągany i działa na belkę w kierunku od B do D.',
      caption: 'S = 16,97 kN — pręt BD jest rozciągany.',
      visual: 'diagram',
      focus: { metric: 'bar' },
      formula: 'S=\\frac{P\\,a}{L\\sin45^\\circ}=\\frac{24\\cdot1}{2\\cdot0{,}7071}=16{,}97\\ \\text{kN}',
    },
    {
      title: 'Składowe reakcji przegubu',
      narration:
        'Rzut na poziom daje Ax = −S cos 45° = −12,0 kN, czyli zwrot w lewo. Rzut na pion daje Ay = P − S sin 45° = 12,0 kN w górę. Obie składowe mają ten sam moduł.',
      caption: 'Ax = 12,0 kN w lewo, Ay = 12,0 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: 'A_x=-S\\cos45^\\circ=-12{,}0\\ \\text{kN},\\qquad A_y=P-S\\sin45^\\circ=12{,}0\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa reakcja',
      narration:
        'Składamy składowe reakcji. Moduł wynosi 16,97 kN, a kąt 45° od poziomu. Reakcja RA działa ukośnie w lewo i w górę, symetrycznie do kierunku pręta.',
      caption: 'RA = 16,97 kN pod kątem 45° w lewo i w górę.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula: 'R_A=\\sqrt{12{,}0^2+12{,}0^2}=16{,}97\\ \\text{kN},\\qquad \\varphi=45^\\circ',
    },
    {
      title: 'Kontrola punktem zbiegu',
      narration:
        'Prosta P jest pionowa przez x = 1 m, a prosta pręta przechodzi przez B pod 45°. Przecinają się w E = (1; −1) m. Prosta AE ma nachylenie −1, dokładnie równe Ay/Ax, więc wszystkie trzy siły są zbieżne.',
      caption: 'Punkt E = (1; −1) m potwierdza poprawność wyniku.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'E=(1;\\,-1)\\ \\text{m},\\qquad \\frac{A_y}{A_x}=\\frac{12}{-12}=-1',
    },
  ],
} satisfies SolutionData
