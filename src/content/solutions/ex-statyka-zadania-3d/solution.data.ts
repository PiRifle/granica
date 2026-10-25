import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-zadania-3d',
  title: 'Pełne zadanie 3D — płyta, trzy więzy i weryfikacja',
  duration: 7,
  given: [
    'Płyta ABCD: A = (0, 0, 0), B = (2, 0, 0), C = (2, 3, 0), D = (0, 3, 0) m',
    'G = 12 kN w (1; 1,5; 0), P = 8 kN w D, H = 6 kN w C w kierunku +x',
    'Przegub kulisty w A, przegub walcowy o osi x w B, pionowe cięgno w C',
  ],
  result:
    'S = 14 kN, R_A = (−6, −9, 14) kN, R_B = (0, 9, −8) kN. Kontrola momentów względem B daje wektor zerowy, a suma reakcji pionowych 20 kN równoważy ciężar i siłę P.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Full3DTaskAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Najpierw geometria: współrzędne naroży płyty, położenia obciążeń i punktów podparcia. Dopiero na tej podstawie można zapisać wektory sił i ramiona momentów.',
      caption: 'Płyta ABCD z obciążeniami G, P, H i trzema więzami.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'A=(0,0,0),\\quad B=(2,0,0),\\quad C=(2,3,0),\\quad D=(0,3,0)\\ \\text{m},\\quad G=12,\\ P=8,\\ H=6\\ \\text{kN}',
    },
    {
      title: 'Moment względem A — cięgno',
      narration:
        'Biegun w A eliminuje trzy reakcje przegubu kulistego. Równanie momentów względem osi x zawiera tylko ciężar, siłę P i cięgno, więc od razu daje siłę w cięgnie.',
      caption: 'S = 14 kN — napięcie cięgna w C.',
      visual: 'diagram',
      focus: { metric: 'cable' },
      formula: '\\sum M_x=0:\\ -18-24+3S=0\\quad\\Rightarrow\\quad S=14\\ \\text{kN}',
    },
    {
      title: 'Reakcje przegubu walcowego',
      narration:
        'Pozostałe dwa równania momentów względem A wyznaczają składowe reakcji w B. Ujemna B_z oznacza, że przegub działa w dół, przeciwnie do przyjętej osi z.',
      caption: 'B_z = −8 kN, B_y = 9 kN.',
      visual: 'diagram',
      focus: { metric: 'hinge' },
      formula: '\\sum M_y=0:\\ B_z=-8\\ \\text{kN},\\qquad \\sum M_z=0:\\ B_y=9\\ \\text{kN}',
    },
    {
      title: 'Sumy sił',
      narration:
        'Zostały trzy składowe reakcji w A. Rzuty sił dają je bezpośrednio: siła pozioma H jest znoszona przez A_x, a reakcja B_y przez A_y.',
      caption: 'A_x = −6 kN, A_y = −9 kN, A_z = 14 kN.',
      visual: 'diagram',
      focus: { metric: 'forces' },
      formula: '\\sum F_x:\\ A_x=-6,\\qquad \\sum F_y:\\ A_y=-9,\\qquad \\sum F_z:\\ A_z=14\\ \\text{kN}',
    },
    {
      title: 'Niezależna kontrola',
      narration:
        'Sumujemy momenty względem B — punktu nieużytego w rozwiązaniu. Inne ramiona i inne równania dają wektor zerowy, co potwierdza znaki i odległości.',
      caption: 'ΣM_B = (0, 0, 0) — kontrola niezależna od równań względem A.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\sum\\mathbf M_B=\\mathbf 0',
    },
    {
      title: 'Kontrola sensu fizycznego',
      narration:
        'Suma reakcji pionowych musi równać się obciążeniom pionowym. Otrzymujemy 20 kN po obu stronach, a ujemne składowe tłumaczą się zwrotem reakcji, nie błędem rachunku.',
      caption: '14 − 8 + 14 = 20 kN = G + P; wynik jest spójny.',
      visual: 'diagram',
      focus: { metric: 'sense' },
      formula: 'A_z+B_z+S=14-8+14=20\\ \\text{kN}=G+P',
    },
  ],
} satisfies SolutionData
