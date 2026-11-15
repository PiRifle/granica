import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta i obciążenia',
    narration:
      'Pręt jest utwierdzony na lewym końcu i składa się ze stali, aluminium oraz brązu. Na styku stal–aluminium działa siła 4P w lewo, na styku aluminium–brąz siła P w prawo, a na prawym końcu siła 2P w lewo. Szukamy największej wartości P, przy której żaden odcinek nie przekroczy swojego naprężenia dopuszczalnego.',
    formula:
      'A_{\\mathrm{st}}=500\\ \\mathrm{mm}^2\\quad A_{\\mathrm{al}}=400\\ \\mathrm{mm}^2\\quad A_{\\mathrm{br}}=200\\ \\mathrm{mm}^2',
    caption: 'Trzy odcinki o różnych polach, utwierdzenie po lewej i trzy siły zewnętrzne zależne od P.',
    visual: 'axial',
    focus: { metric: 'model' },
    emphasis: 'P jest niewiadomą — wszystkie siły i naprężenia zapisujemy najpierw w funkcji P.',
  },
  {
    title: '2. Równowaga całego pręta',
    narration:
      'Sumujemy siły wzdłuż osi pręta, przyjmując zwrot w prawo jako dodatni. Siły 4P i 2P działają w lewo, a P w prawo. Z równowagi otrzymujemy reakcję ściany R = 5P skierowaną w prawo.',
    formula: '\\sum F_x=0:\\quad -4P+P-2P+R=0\\quad\\Rightarrow\\quad R=5P',
    caption: 'Reakcja ściany 5P równoważy wypadkową obciążeń zewnętrznych.',
    visual: 'axial',
    focus: { metric: 'equilibrium' },
  },
  {
    title: '3. Przekrój w brązie',
    narration:
      'Zaczynamy od prawego, swobodnego końca, bo nie trzeba wtedy znać reakcji ściany. W przekroju brązowym po prawej stronie działa tylko siła 2P w lewo. Siła wewnętrzna musi więc ściskać brąz z wartością N_br = −2P.',
    formula: 'N_{\\mathrm{br}}+2P=0\\quad\\Rightarrow\\quad N_{\\mathrm{br}}=-2P',
    caption: 'Przekrój w brązie: siła wewnętrzna 2P ściska odcinek.',
    visual: 'axial',
    focus: { metric: 'bronze' },
  },
  {
    title: '4. Przekrój w aluminium',
    narration:
      'W przekroju aluminiowym prawa część obejmuje już dwie siły: 2P w lewo na końcu i P w prawo na styku z brązem. Ich wypadkowa to P w lewo, więc N_al = −P. Siła P zmniejsza ściskanie aluminium w porównaniu z brązem.',
    formula: 'N_{\\mathrm{al}}+2P-P=0\\quad\\Rightarrow\\quad N_{\\mathrm{al}}=-P',
    caption: 'Przekrój w aluminium: siły 2P i P dają wypadkową P, więc N = −P.',
    visual: 'axial',
    focus: { metric: 'alu' },
  },
  {
    title: '5. Przekrój w stali i wykres N',
    narration:
      'W przekroju stalowym po prawej stronie działają wszystkie trzy siły: 4P w lewo, P w prawo i 2P w lewo. Wypadkowa wynosi 5P w lewo, dlatego N_st = −5P. Po wykonaniu wszystkich przekrojów wykres siły osiowej jest zamknięty: −5P, −P i −2P.',
    formula:
      'N_{\\mathrm{st}}+4P-P+2P=0\\quad\\Rightarrow\\quad N_{\\mathrm{st}}=-5P\\\\ N_{\\mathrm{st}}=-5P,\\quad N_{\\mathrm{al}}=-P,\\quad N_{\\mathrm{br}}=-2P',
    caption: 'Wykres N: największa siła ściskająca 5P występuje w stali, najmniejsza P w aluminium.',
    visual: 'diagram',
    focus: { metric: 'steel' },
    emphasis: 'Wszystkie siły wewnętrzne są ujemne, czyli pręt jest ściskany.',
  },
  {
    title: '6. Trzy warunki wytrzymałości',
    narration:
      'Dla każdego odcinka wartość bezwzględną siły osiowej dzielimy przez jego pole i porównujemy z naprężeniem dopuszczalnym. Otrzymujemy trzy niezależne nierówności na P: stal 5P/500 ≤ 140, aluminium P/400 ≤ 90 i brąz 2P/200 ≤ 100. Wszystkie muszą być spełnione jednocześnie.',
    formula: '\\frac{5P}{500}\\le140\\qquad \\frac{P}{400}\\le90\\qquad \\frac{2P}{200}\\le100',
    caption: 'Trzy warunki wytrzymałości, każdy dla innego materiału.',
    visual: 'diagram',
    focus: { metric: 'strength' },
  },
  {
    title: '7. Granice siły P dla materiałów',
    narration:
      'Rozwiązujemy każdą nierówność osobno. Stal pozwala na P ≤ 14 000 N, aluminium na P ≤ 36 000 N, a brąz na P ≤ 10 000 N. Na razie mamy trzy różne granice — dopiero porównanie wskaże, która z nich jest rzeczywiście decydująca.',
    formula:
      'P\\le\\frac{140\\cdot500}{5}=14\\,000\\ \\mathrm{N}\\\\ P\\le90\\cdot400=36\\,000\\ \\mathrm{N}\\qquad P\\le\\frac{100\\cdot200}{2}=10\\,000\\ \\mathrm{N}',
    caption: 'Trzy granice P: 14 kN dla stali, 36 kN dla aluminium i 10 kN dla brązu.',
    visual: 'diagram',
    focus: { metric: 'limits' },
  },
  {
    title: '8. Decyduje najsłabszy odcinek',
    narration:
      'Najmniejsza z trzech granic to 10 000 N, pochodząca od brązu. Przy większej sile brąz przekroczyłby 100 MPa, mimo że stal i aluminium miałyby jeszcze zapas. Dlatego P_max = 10 000 N = 10 kN i to brąz jest odcinkiem krytycznym.',
    formula: 'P_{\\max}=\\min(14\\,000;\\ 36\\,000;\\ 10\\,000)=10\\,000\\ \\mathrm{N}=10\\ \\mathrm{kN}',
    caption: 'Najniższy słupek 10 kN wyznacza maksymalną siłę P; decyduje brąz.',
    visual: 'diagram',
    focus: { metric: 'govern' },
    emphasis: 'O nośności pręta decyduje odcinek o najmniejszej granicy, a nie o największym naprężeniu.',
  },
  {
    title: '9. Kontrola naprężeń przy P = 10 kN',
    narration:
      'Podstawiamy P = 10 000 N do wszystkich trzech odcinków. Stal przenosi 5P = 50 000 N, więc σ_st = 100 MPa; aluminium P = 10 000 N, więc σ_al = 25 MPa; brąz 2P = 20 000 N, więc σ_br = 100 MPa. Wszystkie wartości mieszczą się w granicach, a brąz osiąga swoją dopuszczalną wartość dokładnie.',
    formula:
      '\\sigma_{\\mathrm{st}}=\\frac{50\\,000}{500}=100\\ \\mathrm{MPa}\\le140\\ \\mathrm{MPa}\\\\ \\sigma_{\\mathrm{al}}=\\frac{10\\,000}{400}=25\\ \\mathrm{MPa}\\le90\\ \\mathrm{MPa}\\\\ \\sigma_{\\mathrm{br}}=\\frac{20\\,000}{200}=100\\ \\mathrm{MPa}\\le100\\ \\mathrm{MPa}',
    caption: 'Wykorzystanie naprężeń: stal 71,4%, aluminium 27,8%, brąz 100%.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Warunki są spełnione; brąz pracuje na granicy 100 MPa.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedMaxLoadAnimation }))),
} satisfies SolutionData
