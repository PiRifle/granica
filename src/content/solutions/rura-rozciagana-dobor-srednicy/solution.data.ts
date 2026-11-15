import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model rury i obciążenie',
    narration:
      'Rura jest rozciągana osiowo siłą P działającą na obu końcach. W przekroju poprzecznym widzimy pierścień: średnica zewnętrzna D jest nieznana, a średnica wewnętrzna wynosi d = 100 mm.',
    formula: 'd=100\\ \\mathrm{mm}\\qquad P=400\\ \\mathrm{kN}\\qquad \\sigma_{\\mathrm{dop}}=120\\ \\mathrm{MPa}',
    caption: 'Przekrój pierścieniowy rury z zaznaczoną średnicą wewnętrzną d i szukaną średnicą zewnętrzną D.',
    visual: 'axial',
    focus: { metric: 'model' },
    emphasis: 'Szukamy takiej średnicy zewnętrznej, aby naprężenie nie przekroczyło wartości dopuszczalnej.',
  },
  {
    title: '2. Dane i jednostki',
    narration:
      'Przed podstawieniem do wzorów zamieniamy jednostki na spójny układ: niutony i milimetry. Siła 400 kN to 400 000 N, a 120 MPa to 120 N/mm², ponieważ 1 MPa = 1 N/mm². Średnica wewnętrzna jest już podana w milimetrach.',
    formula:
      'P=400\\ \\mathrm{kN}=400\\,000\\ \\mathrm{N}\\\\ \\sigma_{\\mathrm{dop}}=120\\ \\mathrm{MPa}=120\\ \\tfrac{\\mathrm{N}}{\\mathrm{mm}^2}',
    caption: 'Trzy wielkości zadania sprowadzone do niutonów i milimetrów.',
    visual: 'axial',
    focus: { metric: 'data' },
  },
  {
    title: '3. Pole przekroju rury',
    narration:
      'Pole pierścienia to różnica pola dużego koła o średnicy D i pola otworu o średnicy d. Po wyłączeniu wspólnego czynnika otrzymujemy A = π(D² − d²)/4. Odejmujemy pole wewnętrzne, a nie średnice.',
    formula: 'A=\\frac{\\pi D^2}{4}-\\frac{\\pi d^2}{4}=\\frac{\\pi\\,(D^2-d^2)}{4}',
    caption: 'Pole pierścienia powstaje przez odjęcie koła wewnętrznego od koła zewnętrznego.',
    visual: 'section',
    focus: { metric: 'area' },
    emphasis: 'Odejmujemy pola kół, nie średnice.',
  },
  {
    title: '4. Warunek wytrzymałości',
    narration:
      'Naprężenie normalne w przekroju wynosi σ = P/A i nie może przekroczyć σ_dop. Zatem pole musi być nie mniejsze niż P/σ_dop = 3333,3 mm². Podstawiamy pole pierścienia i przekształcamy nierówność względem D².',
    formula:
      '\\sigma=\\frac{P}{A}\\le\\sigma_{\\mathrm{dop}}\\Rightarrow A\\ge\\frac{P}{\\sigma_{\\mathrm{dop}}}=3333{,}3\\ \\mathrm{mm}^2\\\\ \\frac{\\pi (D^2-d^2)}{4}\\ge3333{,}3\\Rightarrow D^2\\ge\\frac{4\\cdot3333{,}3}{\\pi}+100^2',
    caption: 'Kolejne przekształcenia warunku wytrzymałości prowadzą do nierówności na kwadrat średnicy zewnętrznej.',
    visual: 'diagram',
    focus: { metric: 'condition' },
  },
  {
    title: '5. Wymagana średnica zewnętrzna',
    narration:
      'Po podstawieniu liczb otrzymujemy D² ≥ 14 244,13 mm², więc D ≥ 119,35 mm. Średnicę wykonawczą zaokrąglamy w górę do pełnego milimetra i przyjmujemy D = 120 mm. Zaokrąglenie w dół byłoby niezgodne z warunkiem.',
    formula:
      'D\\ge\\sqrt{\\frac{4\\cdot400\\,000}{\\pi\\cdot120}+100^2}=\\sqrt{14\\,244{,}13}=119{,}35\\ \\mathrm{mm}\\\\ D=120\\ \\mathrm{mm}',
    caption: 'Na osi średnic zaznaczono wartość wymaganą 119,35 mm i przyjętą średnicę 120 mm.',
    visual: 'diagram',
    focus: { metric: 'diameter' },
    emphasis: 'Dobór średnicy zawsze zaokrąglamy w górę.',
  },
  {
    title: '6. Kontrola naprężenia',
    narration:
      'Dla D = 120 mm pole wynosi π(120² − 100²)/4 = 3455,75 mm². Naprężenie rzeczywiste to 400 000/3455,75 = 115,75 MPa, czyli mniej niż 120 MPa. Warunek wytrzymałości jest spełniony, a zapas wynosi około 3,5%.',
    formula:
      'A=\\frac{\\pi(120^2-100^2)}{4}=3455{,}75\\ \\mathrm{mm}^2\\\\ \\sigma=\\frac{400\\,000}{3455{,}75}=115{,}75\\ \\mathrm{MPa}<120\\ \\mathrm{MPa}',
    caption: 'Porównanie naprężenia rzeczywistego 115,75 MPa z dopuszczalnym 120 MPa.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Warunek wytrzymałości jest spełniony.',
  },
  {
    title: '7. Grubość ścianki i zapas',
    narration:
      'Grubość ścianki wynosi t = (D − d)/2 = (120 − 100)/2 = 10 mm. Rura jest więc cienkościenna, a wykorzystanie materiału sięga około 96,5%. Otrzymany zapas jest niewielki, lecz dodatni, więc przyjęta średnica jest poprawna.',
    formula:
      't=\\frac{D-d}{2}=\\frac{120-100}{2}=10\\ \\mathrm{mm}\\\\ \\frac{\\sigma}{\\sigma_{\\mathrm{dop}}}=\\frac{115{,}75}{120}\\approx0{,}965',
    caption: 'Przekrój rury z zaznaczoną grubością ścianki 10 mm i porównaniem naprężeń.',
    visual: 'section',
    focus: { metric: 'wall' },
    emphasis: 'D=120 mm spełnia warunek, a ścianka ma 10 mm grubości.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RuraRozciaganaAnimation }))),
} satisfies SolutionData
