import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-sily-w-ramach',
  title: 'Siły wewnętrzne w ramie L',
  duration: 7,
  given: [
    'Kolumna AB o wysokości h = 3 m, utwierdzona w A',
    'Belka BC o długości L = 4 m, sztywny węzeł w B',
    'W końcu C: P = 8 kN w dół i H = 6 kN w prawo',
  ],
  result:
    'A_x = 6 kN w lewo, A_y = 8 kN w górę, M_A = 50 kN·m. W połowie belki: N = −6 kN, T = 8 kN, M = −16 kN·m. W połowie kolumny: N = −8 kN, T = 6 kN, M = 41 kN·m. Węzeł B przenosi moment 32 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FrameForcesAnimation }))),
  scenes: [
    {
      title: 'Model ramy L',
      narration:
        'Kolumna jest utwierdzona w podstawie, a belka łączy się z nią sztywno. W wolnym końcu belki działają dwie siły: pionowa w dół i pozioma w prawo. Sztywny węzeł B pozwala przenosić między prętami również moment.',
      caption: 'h = 3 m, L = 4 m, P = 8 kN, H = 6 kN.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'h=3\\ \\text{m},\\qquad L=4\\ \\text{m},\\qquad P=8\\ \\text{kN},\\qquad H=6\\ \\text{kN}',
    },
    {
      title: 'Reakcje utwierdzenia',
      narration:
        'Równowaga pozioma daje reakcję poziomą równą sile H, a pionowa — reakcję pionową równą P. Moment utwierdzenia musi zrównoważyć momenty obu sił względem A: 8 razy 4 plus 6 razy 3, czyli 50 kN·m.',
      caption: 'A_x = 6 kN w lewo, A_y = 8 kN w górę, M_A = 50 kN·m.',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula:
        'A_x=H=6\\ \\text{kN},\\qquad A_y=P=8\\ \\text{kN},\\qquad M_A=P\\cdot4+H\\cdot3=32+18=50\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Przekrój w belce',
      narration:
        'Cięcie w połowie belki odsłania siłę normalną, tnącą i moment. Prawa część belki ma tylko obciążenia w C. Siła pozioma ściska belkę, pionowa daje siłę tnącą 8 kN, a moment na ramieniu 2 m wynosi minus 16 kN·m.',
      caption: 'W x = 2 m od B: N = −6 kN, T = 8 kN, M = −16 kN·m.',
      visual: 'diagram',
      focus: { metric: 'beam' },
      formula:
        'N=-H=-6\\ \\text{kN},\\qquad T=P=8\\ \\text{kN},\\qquad M=-P(L-x)=-8\\cdot2=-16\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Przekrój w kolumnie',
      narration:
        'W kolumnie lokalna oś jest pionowa. Siła pionowa staje się więc siłą normalną, a pozioma — siłą tnącą. Moment maleje liniowo od 50 kN·m w podstawie, osiągając w połowie wysokości 41 kN·m.',
      caption: 'W y = 1,5 m: N = −8 kN, T = 6 kN, M = 41 kN·m.',
      visual: 'diagram',
      focus: { metric: 'column' },
      formula:
        'N=-P=-8\\ \\text{kN},\\qquad T=H=6\\ \\text{kN},\\qquad M=M_A-Hy=50-6\\cdot1{,}5=41\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola węzła B',
      narration:
        'Belka przekazuje na kolumnę siłę pionową 8 kN, poziomą 6 kN oraz moment 32 kN·m. Kolumna na górze ma moment 50 minus 6 razy 3, czyli także 32 kN·m. Znaki są przeciwne, więc węzeł jest w równowadze.',
      caption: 'Moment w belce w B: −32 kN·m; w kolumnie: +32 kN·m.',
      visual: 'diagram',
      focus: { metric: 'node' },
      formula:
        'M_B^{\\text{belka}}=-P\\cdot4=-32\\ \\text{kN}\\cdot\\text{m},\\qquad M_B^{\\text{kolumna}}=M_A-H\\cdot3=32\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Wykresy w obu prętach',
      narration:
        'W belce siła tnąca jest stała i wynosi 8 kN, a moment zmienia się liniowo od minus 32 kN·m w węźle do zera w C. W kolumnie siła tnąca jest stała i wynosi 6 kN, a moment maleje liniowo od 50 do 32 kN·m.',
      caption: 'Belka: T = 8 kN, M od −32 do 0. Kolumna: T = 6 kN, M od 50 do 32 kN·m.',
      visual: 'diagram',
      focus: { metric: 'diagrams' },
      formula:
        'T_{\\text{belka}}=8\\ \\text{kN},\\quad M_{\\text{belka}}:-32\\to0;\\qquad T_{\\text{kol}}=6\\ \\text{kN},\\quad M_{\\text{kol}}:50\\to32\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
