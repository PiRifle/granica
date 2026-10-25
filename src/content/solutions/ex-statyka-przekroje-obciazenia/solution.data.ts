import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-przekroje-obciazenia',
  title: 'Przekroje przy obciążeniu ciągłym — wypadkowa częściowa',
  duration: 6,
  given: [
    'Belka swobodnie podparta o rozpiętości L = 6 m',
    'Obciążenie ciągłe q = 4 kN/m na odcinku [0, 3] m',
    'Przekroje obliczeniowe w x = 2 m oraz x = 4,5 m',
  ],
  result: 'R_A = 9 kN, R_B = 3 kN. W x = 2 m: T = 1 kN, M = 10 kN·m. W x = 4,5 m: T = −3 kN, M = 4,5 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PartialLoadAnimation }))),
  scenes: [
    {
      title: 'Model i zakres obciążenia',
      narration:
        'Obciążenie ciągłe działa tylko na lewej połowie belki. Jego natężenie 4 kN/m oznacza, że każdy metr belki przenosi dodatkowe 4 kN. Poza odcinkiem [0, 3] m belka jest nieobciążona.',
      caption: 'q = 4 kN/m na odcinku 3 m od podpory A.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'q=4\\ \\text{kN/m},\\qquad x\\in[0,3]\\ \\text{m},\\qquad L=6\\ \\text{m}',
    },
    {
      title: 'Wypadkowa całości i reakcje',
      narration:
        'Do reakcji zastępujemy całe obciążenie jedną wypadkową. Ma ona wartość q razy długość odcinka, czyli 12 kN, i działa w środku tego odcinka. Z równowagi momentów otrzymujemy R_B, a potem R_A.',
      caption: 'W = 12 kN w odległości 1,5 m od A; R_A = 9 kN, R_B = 3 kN.',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula:
        'W=q\\cdot3=12\\ \\text{kN},\\qquad R_B=\\frac{12\\cdot1{,}5}{6}=3\\ \\text{kN},\\qquad R_A=9\\ \\text{kN}',
    },
    {
      title: 'Cięcie w x = 2 m',
      narration:
        'Przekrój przecina obciążenie. Na odciętej lewej części leży tylko fragment rozkładu o długości 2 m. Jego wypadkowa wynosi 8 kN i działa w połowie tego fragmentu, czyli 1 m od A.',
      caption: 'Wypadkowa częściowa W = 4·2 = 8 kN w odległości 1 m od A.',
      visual: 'diagram',
      focus: { metric: 'partial' },
      formula: 'W(x)=qx=4\\cdot2=8\\ \\text{kN},\\qquad \\text{ramię}=\\frac{x}{2}=1\\ \\text{m}',
    },
    {
      title: 'T i M w x = 2 m',
      narration:
        'Równowaga pionowa daje siłę tnącą 9 minus 8, czyli 1 kN. Moment to moment reakcji minus moment wypadkowej częściowej: 9 razy 2 minus 8 razy 1 daje 10 kN·m.',
      caption: 'T = 1 kN, M = 10 kN·m.',
      visual: 'diagram',
      focus: { metric: 'internal' },
      formula: 'T=R_A-qx=9-8=1\\ \\text{kN},\\qquad M=R_Ax-\\frac{qx^2}{2}=18-8=10\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Cięcie poza obciążeniem',
      narration:
        'W przekroju x = 4,5 m całe obciążenie leży już po lewej stronie. Siła tnąca jest więc równa 9 minus 12, czyli minus 3 kN. Moment liczymy z wypadkową 12 kN działającą w odległości 1,5 m od A.',
      caption: 'T = −3 kN, M = 9·4,5 − 12·3 = 4,5 kN·m.',
      visual: 'diagram',
      focus: { metric: 'outside' },
      formula: 'T=9-12=-3\\ \\text{kN},\\qquad M=9\\cdot4{,}5-12\\cdot3=4{,}5\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Prawa część belki nie jest obciążona. Została w niej tylko reakcja R_B na ramieniu 1,5 m. Moment 4,5 kN·m i siła tnąca −3 kN zgadzają się z wynikiem z lewej strony cięcia.',
      caption: 'Z prawej: M = 3·1,5 = 4,5 kN·m, T = −R_B = −3 kN.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M=R_B(6-4{,}5)=3\\cdot1{,}5=4{,}5\\ \\text{kN}\\cdot\\text{m},\\qquad T=-R_B=-3\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
