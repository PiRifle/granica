import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta i obciążenia',
    narration:
      'Pręt składa się z trzech odcinków: stali, aluminium i brązu. Jest utwierdzony na prawym końcu, a na lewym swobodnym końcu działa siła 4P skierowana w lewo. W miejscu połączenia aluminium z brązem przyłożono siłę P skierowaną w prawo.',
    formula: 'P=3000\\ \\mathrm{N}\\qquad 4P=12\\,000\\ \\mathrm{N}\\qquad A=50\\ \\mathrm{mm}^2',
    caption: 'Trzy odcinki o różnych materiałach, utwierdzenie po prawej i dwie siły zewnętrzne.',
    visual: 'axial',
    focus: { metric: 'model' },
    emphasis: 'Kierunki sił są różne, dlatego siła osiowa nie będzie jednakowa w całym pręcie.',
  },
  {
    title: '2. Równowaga całego pręta',
    narration:
      'Suma sił wzdłuż osi pręta musi być równa zeru. Siła 4P działa w lewo, siła P w prawo, więc reakcja ściany musi działać w prawo i wynosić R = 4P − P = 3P = 9000 N. Reakcja jest dodatnia, czyli przyjęty kierunek jest poprawny.',
    formula: '\\sum F_x=0:\\quad -4P+P+R=0\\\\ R=4P-P=3P=9000\\ \\mathrm{N}',
    caption: 'Reakcja ściany 3P działa w prawo i równoważy obie siły zewnętrzne.',
    visual: 'axial',
    focus: { metric: 'equilibrium' },
  },
  {
    title: '3. Przekrój w stalowym odcinku',
    narration:
      'Przecinamy pręt w odcinku stalowym i rozpatrujemy lewą część. Działa na nią tylko siła 4P w lewo, więc siła wewnętrzna musi ją zrównoważyć. Przy rozciąganiu dodatnim otrzymujemy N_st = +4P = 12 000 N.',
    formula: 'N_{\\mathrm{st}}-4P=0\\quad\\Rightarrow\\quad N_{\\mathrm{st}}=+4P=+12\\,000\\ \\mathrm{N}',
    caption: 'Przekrój w stali: siła wewnętrzna 4P rozciąga lewy odcinek.',
    visual: 'axial',
    focus: { metric: 'steel' },
  },
  {
    title: '4. Przekrój w aluminiowym odcinku',
    narration:
      'Między swobodnym końcem a przekrojem w aluminium nie ma żadnej dodatkowej siły. Lewa część jest więc obciążona tylko siłą 4P, tak jak w stali. Dlatego N_al = +4P = 12 000 N — siła osiowa nie zmienia się na styku stal–aluminium.',
    formula: 'N_{\\mathrm{al}}-4P=0\\quad\\Rightarrow\\quad N_{\\mathrm{al}}=+4P=+12\\,000\\ \\mathrm{N}',
    caption: 'Przekrój w aluminium: nadal działa siła wewnętrzna 4P.',
    visual: 'axial',
    focus: { metric: 'alu' },
    emphasis: 'Brak siły na styku stal–aluminium oznacza brak skoku siły osiowej.',
  },
  {
    title: '5. Przekrój w brązowym odcinku',
    narration:
      'W przekroju brązowym po lewej stronie działają już dwie siły zewnętrzne: 4P w lewo i P w prawo. Ich wypadkowa to 3P w lewo, więc siła wewnętrzna wynosi N_br = +3P = 9000 N. Siła P działająca w prawo zmniejsza rozciąganie brązu.',
    formula: 'N_{\\mathrm{br}}-4P+P=0\\quad\\Rightarrow\\quad N_{\\mathrm{br}}=+3P=+9000\\ \\mathrm{N}',
    caption: 'Przekrój w brązie: siła P odejmuje się od 4P, dlatego N = 3P.',
    visual: 'axial',
    focus: { metric: 'bronze' },
  },
  {
    title: '6. Naprężenia w trzech odcinkach',
    narration:
      'Dzielimy siłę osiową przez pole A = 50 mm². W stali i aluminium otrzymujemy 12 000/50 = 240 MPa, a w brązie 9000/50 = 180 MPa. Wszystkie naprężenia są rozciągające, bo siły wewnętrzne mają znak dodatni.',
    formula:
      '\\sigma_{\\mathrm{st}}=\\sigma_{\\mathrm{al}}=\\frac{12\\,000}{50}=240\\ \\mathrm{MPa}\\\\ \\sigma_{\\mathrm{br}}=\\frac{9000}{50}=180\\ \\mathrm{MPa}',
    caption: 'Trzy słupki naprężeń: 240 MPa, 240 MPa i 180 MPa.',
    visual: 'diagram',
    focus: { metric: 'stress' },
    emphasis: 'Najmniejsze naprężenie występuje w brązie, choć jest to odcinek najdłuższy.',
  },
  {
    title: '7. Znaki, jednostki i wykres N',
    narration:
      'Wykres siły osiowej rysujemy po stronie rozciągania, czyli dodatniej. Na odcinku stalowym i aluminiowym wartość wynosi +12 kN, a na brązowym +9 kN. Skok następuje dopiero na styku aluminium–brąz, gdzie przyłożono siłę P.',
    formula:
      'N_{\\mathrm{st}}=+12\\ \\mathrm{kN}\\quad N_{\\mathrm{al}}=+12\\ \\mathrm{kN}\\quad N_{\\mathrm{br}}=+9\\ \\mathrm{kN}',
    caption: 'Wykres N: dwa poziomy +12 kN i skok do +9 kN na styku aluminium–brąz.',
    visual: 'diagram',
    focus: { metric: 'diagram' },
  },
  {
    title: '8. Kontrola równowagi i proporcji',
    narration:
      'Kontrola sumy sił daje −4P + P + 3P = 0, więc rozwiązanie jest spójne. Naprężenia tworzą stosunek 240 : 240 : 180, czyli 4 : 4 : 3. Stal i aluminium są obciążone jednakowo, a brąz pracuje z naprężeniem o 25% mniejszym.',
    formula:
      '\\sum F_x=-4P+P+3P=0\\\\ \\sigma_{\\mathrm{st}}:\\sigma_{\\mathrm{al}}:\\sigma_{\\mathrm{br}}=240:240:180=4:4:3',
    caption: 'Bilans sił zamyka się do zera, a stosunek naprężeń wynosi 4 : 4 : 3.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Reakcja ściany 3P zamyka bilans sił całego pręta.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedAlloyStressAnimation }))),
} satisfies SolutionData
