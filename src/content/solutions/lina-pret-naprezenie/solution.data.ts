import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta, bloczka i liny',
    narration:
      'Pręt ABC jest podparty przegubowo w C. Lina zaczepiona w A przechodzi przez nieruchomy bloczek D i wraca pionowo do punktu B. Bloczek znajduje się 3 m nad środkiem pręta, a odległość AC wynosi 10 m.',
    caption: 'Pręt ABC z przegubem w C, bloczkiem D nad B i liną prowadzoną od A do B.',
    visual: 'diagram',
    focus: { metric: 'model' },
    formula: 'AC=10\\ \\mathrm{m}\\qquad AB=BC=5\\ \\mathrm{m}\\qquad h=3\\ \\mathrm{m}',
  },
  {
    title: '2. Geometria liny AD',
    narration:
      'Odcinek AD tworzy z poziomem trójkąt o przyprostokątnych 5 m i 3 m. Jego długość wynosi √34 = 5,831 m. Sinus kąta nachylenia liny to 3/√34 = 0,5145, a cosinus 5/√34 = 0,8575.',
    caption: 'Trójkąt geometryczny ADB: pozioma przyprostokątna 5 m i pionowa 3 m.',
    visual: 'diagram',
    focus: { metric: 'geometry' },
    formula: 'AD=\\sqrt{5^2+3^2}=\\sqrt{34}=5{,}831\\ \\mathrm{m}\\\\ \\sin\\theta=\\frac{3}{\\sqrt{34}}=0{,}5145',
  },
  {
    title: '3. Siły działające na pręt',
    narration:
      'Na pręt działa ciężar W w środku B, naciąg liny w A wzdłuż AD oraz naciąg liny w B pionowo w górę. Ponieważ bloczek jest nieruchomy i bez tarcia, oba odcinki liny mają ten sam naciąg S. W przegubie C działają reakcje C_x i C_y.',
    caption: 'Siły zewnętrzne na pręt: ciężar W, dwa naciągi S i reakcje przegubu C.',
    visual: 'diagram',
    focus: { metric: 'fbd' },
    formula: 'W=mg=3000\\cdot9{,}81=29430\\ \\mathrm{N}\\qquad S_{AD}=S_{DB}=S',
  },
  {
    title: '4. Równanie momentów względem C',
    narration:
      'Moment względem C eliminuje niewiadome reakcje przegubu. Siła w A ma pionową składową S·3/√34 i ramię 10 m, a siła w B ma ramię 5 m. Ciężar W działa w odległości 5 m od C i daje moment przeciwny.',
    caption: 'Ramię 10 m dla pionowej składowej w A, ramię 5 m dla naciągu w B i ciężaru W.',
    visual: 'diagram',
    focus: { metric: 'moment' },
    formula: '\\sum M_C=0:\\quad S\\frac{3}{\\sqrt{34}}\\cdot10+S\\cdot5-W\\cdot5=0',
  },
  {
    title: '5. Rozwiązanie na naciąg liny',
    narration:
      'Wyciągamy S przed nawias i dzielimy przez współczynnik 30/√34 + 5 = 10,145. Otrzymujemy S = 14 504,7 N, czyli około 14,50 kN. Naciąg jest jednakowy w obu odcinkach liny.',
    caption: 'Naciąg liny wynosi 14,50 kN; jest to siła w obu odcinkach AD i DB.',
    visual: 'diagram',
    focus: { metric: 'solve' },
    formula: 'S=\\frac{5W}{30/\\sqrt{34}+5}=\\frac{5\\cdot29430}{10{,}145}=14{,}50\\ \\mathrm{kN}',
  },
  {
    title: '6. Pole liny i naprężenie',
    narration:
      'Pole przekroju liny o średnicy 12 mm wynosi π·12²/4 = 113,10 mm². Dzieląc naciąg 14 504,7 N przez to pole, otrzymujemy naprężenie 128,25 MPa. Naprężenie jest rozciągające, bo lina jest naprężona.',
    caption: 'Przekrój liny o średnicy 12 mm i naprężenie rozciągające 128,25 MPa.',
    visual: 'section',
    focus: { metric: 'stress' },
    formula:
      'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot12^2}{4}=113{,}10\\ \\mathrm{mm^2}\\\\ \\sigma=\\frac{S}{A}=\\frac{14504{,}7}{113{,}10}=128{,}25\\ \\mathrm{MPa}',
  },
  {
    title: '7. Kontrola równowagi i jednostek',
    narration:
      'Sprawdzamy sumy sił w obu kierunkach. Pozioma składowa naciągu w A jest równoważona przez reakcję C_x, a pionowe składowe naciągów, ciężar i reakcja C_y dają zero. Jednostki są spójne: niutony dzielone przez mm² dają MPa.',
    caption: 'Reakcje w przegubie C domykają układ sił; wynik ma jednostkę MPa.',
    visual: 'diagram',
    focus: { metric: 'check' },
    formula: '\\sum F_x=0\\qquad \\sum F_y=0\\qquad \\sigma=128{,}25\\ \\mathrm{MPa}',
  },
  {
    title: '8. Interpretacja wyniku',
    narration:
      'Naprężenie 128 MPa jest poniżej typowych dopuszczalnych naprężeń dla lin stalowych, rzędu 150–200 MPa. Wynik zależy od przyjętego ciężaru: użyto g = 9,81 m/s². Zwiększenie masy pręta proporcjonalnie zwiększy naciąg i naprężenie.',
    caption: 'Naprężenie 128,25 MPa z zapasem względem typowych wartości dopuszczalnych.',
    visual: 'section',
    focus: { metric: 'interpret' },
    formula: '\\sigma=128{,}25\\ \\mathrm{MPa}\\qquad g=9{,}81\\ \\mathrm{m/s^2}',
    emphasis: 'Naciąg liny zależy od masy pręta i geometrii zawieszenia, nie od średnicy liny.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RopeBarStressAnimation }))),
} satisfies SolutionData
