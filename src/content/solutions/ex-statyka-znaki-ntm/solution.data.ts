import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-znaki-ntm',
  title: 'Znaki N, T i M — belka z przewieszeniem',
  duration: 6,
  given: [
    'Przegub A w x = 0, podpora przesuwna B w x = 6 m, swobodny koniec C w x = 8 m',
    'Siła P = 10 kN w dół na końcu C',
    'Przekroje obliczeniowe w x = 3 m oraz x = 7 m',
  ],
  result:
    'R_B = 13,33 kN w górę, A_y = 3,33 kN w dół. W x = 3 m: T = −3,33 kN, M = −10 kN·m. W x = 7 m: T = 10 kN, M = −10 kN·m. Moment nad podporą B wynosi −20 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SignConventionAnimation }))),
  scenes: [
    {
      title: 'Model z przewieszeniem',
      narration:
        'Belka wystaje poza prawą podporę. Siła działa na swobodnym końcu C, więc już na pierwszy rzut oka widać, że przewieszenie będzie wyginać belkę nad podporą B w przeciwną stronę niż jej część między podporami.',
      caption: 'Przęsło AB ma 6 m, przewieszenie BC — 2 m.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'L_{AB}=6\\ \\text{m},\\qquad L_{BC}=2\\ \\text{m},\\qquad P=10\\ \\text{kN}',
    },
    {
      title: 'Reakcje i ich znaki',
      narration:
        'Moment względem A daje R_B równą 13,33 kN. Równowaga pionowa daje wtedy A_y równą minus 3,33 kN. Minus nie jest błędem: reakcja w A działa rzeczywiście w dół.',
      caption: 'R_B = 13,33 kN w górę, A_y = −3,33 kN (czyli 3,33 kN w dół).',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{10\\cdot8}{6}=13{,}33\\ \\text{kN},\\qquad A_y=10-13{,}33=-3{,}33\\ \\text{kN}',
    },
    {
      title: 'Konwencja po obu stronach cięcia',
      narration:
        'Na lewej ścianie cięcia dodatnia siła tnąca działa w dół, a dodatni moment obraca przeciwnie do ruchu wskazówek zegara. Na prawej ścianie oba zwroty się odwracają. To para akcja–reakcja, nie zmiana konwencji.',
      caption: 'Lewa ściana: T w dół, M przeciwnie do zegara. Prawa: T w górę, M zgodnie z zegarem.',
      visual: 'diagram',
      focus: { metric: 'convention' },
      formula:
        'T^{\\text{lewa}}\\downarrow,\\quad M^{\\text{lewa}}\\circlearrowleft;\\qquad T^{\\text{prawa}}\\uparrow,\\quad M^{\\text{prawa}}\\circlearrowright',
    },
    {
      title: 'Przekrój x = 3 m',
      narration:
        'Cięcie wypada między podporami. Na lewo działa tylko reakcja A skierowana w dół. Siła tnąca jest równa tej reakcji ze znakiem, a moment to reakcja razy ramię 3 m.',
      caption: 'T = −3,33 kN, M = −10 kN·m.',
      visual: 'diagram',
      focus: { metric: 'section3' },
      formula: 'T=A_y=-3{,}33\\ \\text{kN},\\qquad M=A_y\\cdot3=-10\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Przekrój x = 7 m',
      narration:
        'Teraz przekrój leży na przewieszeniu. Po lewej stronie mamy już obie reakcje. Siła tnąca zmienia znak na dodatni, a moment pozostaje ujemny i równy minus 10 kN·m.',
      caption: 'T = −3,33 + 13,33 = 10 kN, M = −10 kN·m.',
      visual: 'diagram',
      focus: { metric: 'section7' },
      formula: 'T=A_y+R_B=10\\ \\text{kN},\\qquad M=A_y\\cdot7+R_B\\cdot1=-10\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola i moment nad B',
      narration:
        'Z prawej strony przekroju x = 7 m działa tylko siła P na ramieniu 1 m, co daje ten sam moment −10 kN·m. Nad podporą B moment osiąga −20 kN·m, bo przewieszenie wygina belkę wypukłością w górę.',
      caption: 'M_B = −10·2 = −20 kN·m; kontrola z prawej potwierdza znak.',
      visual: 'diagram',
      focus: { metric: 'control' },
      formula: 'M_B=-P\\cdot2=-20\\ \\text{kN}\\cdot\\text{m},\\qquad M(x=7)=-P\\cdot1=-10\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
