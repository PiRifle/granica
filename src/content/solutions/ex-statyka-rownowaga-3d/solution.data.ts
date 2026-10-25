import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-rownowaga-3d',
  title: 'Płyta na trzech podporach — sześć równań równowagi',
  duration: 7,
  given: [
    'Płyta ABCD: A = (0, 0, 0), B = (2, 0, 0), C = (2, 2, 0), D = (0, 2, 0) m',
    'Ciężar G = 10 kN w (1, 1, 0), siła P = 6 kN w C',
    'Przegub kulisty w A, przegub walcowy o osi x w B, cięgno DE od D do E = (2, 0, 2) m',
  ],
  result:
    'S = 11√3 ≈ 19,05 kN, B_y = 11 kN, B_z = 11 kN, A_x = −11 kN, A_y = 0, A_z = −6 kN. Znaki ujemne oznaczają zwrot przeciwny do przyjętej osi.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Equilibrium3DAnimation }))),
  scenes: [
    {
      title: 'Model płyty',
      narration:
        'Płyta leży w płaszczyźnie poziomej. Obciążenia są pionowe, a cięgno działa ukośnie — właśnie ono wnosi trzecią składową, której nie widać w prostym rzucie.',
      caption: 'Płyta ABCD, ciężar G, siła P i cięgno DE.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0,0),\\quad B=(2,0,0),\\quad C=(2,2,0),\\quad D=(0,2,0),\\quad E=(2,0,2)\\ \\text{m}',
    },
    {
      title: 'Geometria cięgna',
      narration:
        'Wektor DE ma składowe (2, −2, 2) m. Jego długość to 2√3 m, więc wersor kierunku ma wszystkie składowe równe 1/√3 co do wartości bezwzględnej.',
      caption: 'Siła cięgna ma składowe (S/√3, −S/√3, S/√3).',
      visual: 'diagram',
      focus: { metric: 'cable' },
      formula:
        '\\vec{DE}=(2,-2,2)\\ \\text{m},\\qquad |\\vec{DE}|=2\\sqrt3\\ \\text{m},\\qquad \\mathbf u=\\frac{1}{\\sqrt3}(1,-1,1)',
    },
    {
      title: 'Więzy i niewiadome',
      narration:
        'Przegub kulisty daje trzy siły, przegub walcowy dwie, a cięgno jedną. Razem sześć niewiadomych — dokładnie tyle, ile potrzeba przy sześciu niezależnych równaniach.',
      caption: 'n_u = 3 + 2 + 1 = 6 — układ statycznie wyznaczalny.',
      visual: 'diagram',
      focus: { metric: 'supports' },
      formula: 'n_u=3+2+1=6',
    },
    {
      title: 'Momenty względem A',
      narration:
        'Biegun w A usuwa trzy reakcje przegubu. Z trzech równań momentów od razu wychodzą siła w cięgnie oraz obie reakcje przegubu walcowego.',
      caption: 'S = 11√3 ≈ 19,05 kN, B_z = 11 kN, B_y = 11 kN.',
      visual: 'diagram',
      focus: { metric: 'moments' },
      formula:
        '\\sum M_x:\\ \\frac{2S}{\\sqrt3}=22\\Rightarrow S=11\\sqrt3,\\qquad \\sum M_y:\\ B_z=11,\\qquad \\sum M_z:\\ B_y=11',
    },
    {
      title: 'Równania rzutów',
      narration:
        'Po wyznaczeniu reakcji w B wracamy do sum sił. Składowa A_y zeruje się, bo reakcja B_y i składowa pozioma cięgna znoszą się dokładnie.',
      caption: 'A_x = −11 kN, A_y = 0, A_z = −6 kN.',
      visual: 'diagram',
      focus: { metric: 'forces' },
      formula: 'A_x=-11\\ \\text{kN},\\qquad A_y=0,\\qquad A_z=16-11-11=-6\\ \\text{kN}',
    },
    {
      title: 'Kontrola i interpretacja',
      narration:
        'Momenty względem B sumują się do zera, więc rachunek jest spójny. Ujemna reakcja A_z oznacza, że przegub ciągnie płytę w dół — bez zamocowania płyta podniosłaby się przy A.',
      caption: 'Kontrola względem B daje wektor zerowy; A_z działa w dół.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\sum\\mathbf M_B=\\mathbf 0,\\qquad A_z=-6\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
