import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution } from '../../solution-factories/factory-shear-bending/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model wspornika i siła pod kątem',
    narration:
      'Wspornik jest utwierdzony w A i swobodny w B. W punkcie B działa siła P nachylona do osi belki pod kątem α i skierowana w dół oraz w lewo. Kąt α mierzymy od osi belki, dlatego składowa pozioma jest równa −P cosα, a pionowa −P sinα.',
    formula: 'P\\ \\text{— siła w B},\\qquad \\alpha\\ \\text{— kąt do osi belki}',
    caption: 'Wspornik z utwierdzeniem A, swobodnym końcem B i siłą P pod kątem α, skierowaną w dół i w lewo.',
    visual: 'beam',
    focus: { metric: 'model' },
    emphasis: 'Wszystkie wzory są symboliczne; liczby na rysunku mają charakter przykładu.',
  },
  {
    title: '2. Rozkład siły P na składowe',
    narration:
      'Siłę P zastępujemy dwiema składowymi. Składowa pozioma −P cosα działa w lewo i ściska pręt. Składowa pionowa −P sinα działa w dół i wywołuje zginanie oraz siłę poprzeczną.',
    formula:
      'P_x=-P\\cos\\alpha=-8{,}66\\ \\mathrm{kN}\\ (\\leftarrow)\\\\P_y=-P\\sin\\alpha=-5{,}00\\ \\mathrm{kN}\\ (\\downarrow)',
    caption: 'Równoległobok sił: składowa pozioma 8,66 kN w lewo i pionowa 5,00 kN w dół.',
    visual: 'diagram',
    focus: { metric: 'components' },
    emphasis: 'Rozkład siły jest poprawny tylko wtedy, gdy obie składowe zaczepimy w tym samym punkcie B.',
  },
  {
    title: '3. Reakcje w utwierdzeniu A',
    narration:
      'Reakcja pozioma H_A równoważy składową P cosα i działa w prawo. Składowa pionowa P sinα jest skierowana w dół, więc reakcja V_A działa w górę i ma wartość P sinα. Utwierdzenie przenosi także moment M_A = P l sinα, działający przeciwnie do ruchu wskazówek zegara.',
    formula: 'H_A=P\\cos\\alpha\\qquad V_A=P\\sin\\alpha\\qquad M_A=P\\,l\\sin\\alpha',
    caption:
      'Reakcje w A: pozioma w prawo, pionowa w górę oraz moment utwierdzenia przeciwny do ruchu wskazówek zegara.',
    visual: 'beam',
    focus: { metric: 'reaction' },
    emphasis: 'Zwrot V_A jest skierowany w górę, przeciwnie do pionowej składowej siły P — to wynika z równowagi.',
  },
  {
    title: '4. Wykres siły osiowej N',
    narration:
      'Siła osiowa pochodzi wyłącznie od poziomej składowej P cosα. Na całej długości pręt jest ściskany, więc N jest ujemne i stałe. W przykładzie liczbowym N = −8,66 kN.',
    formula: 'N(x)=-P\\cos\\alpha\\qquad N=-8{,}66\\ \\mathrm{kN}',
    caption: 'Wykres N: prostokąt pod osią, stała wartość −8,66 kN na całej długości.',
    visual: 'diagram',
    focus: { metric: 'normal' },
    emphasis: 'Znak minus oznacza ściskanie, a nie mniejszą wartość siły.',
  },
  {
    title: '5. Wykres siły poprzecznej T',
    narration:
      'Siła poprzeczna pochodzi od pionowej składowej P sinα. Na całej długości jest stała i dodatnia, ponieważ nie ma obciążenia ciągłego. W przykładzie T = +5,00 kN.',
    formula: 'T(x)=+P\\sin\\alpha\\qquad T=+5{,}00\\ \\mathrm{kN}',
    caption: 'Wykres T: prostokąt nad osią, stała wartość +5,00 kN.',
    visual: 'diagram',
    focus: { metric: 'shear' },
    emphasis: 'Brak obciążenia ciągłego oznacza dT/dx = 0, czyli poziomy wykres.',
  },
  {
    title: '6. Wykres momentu gnącego M',
    narration:
      'Moment gnący maleje liniowo od utwierdzenia do swobodnego końca. W A ma wartość −P l sinα, a w B jest równy zeru. W przykładzie M(0) = −6,00 kN·m, więc wykres leży pod osią.',
    formula: 'M(x)=-P\\sin\\alpha\\,(l-x)\\\\M(0)=-P\\,l\\sin\\alpha=-6{,}00\\ \\mathrm{kN\\cdot m}\\qquad M(l)=0',
    caption: 'Wykres M: trójkąt od −6,00 kN·m w A do zera w B.',
    visual: 'diagram',
    focus: { metric: 'moment' },
    emphasis: 'Największy moment bezwzględny występuje w utwierdzeniu A.',
  },
  {
    title: '7. Umowa znaków i interpretacja',
    narration:
      'Ujemna siła osiowa oznacza ściskanie pręta. Ujemny moment gnący oznacza, że górne włókna są rozciągane, a dolne ściskane. Siła poprzeczna T jest dodatnia i stała, co odpowiada dodatniemu nachyleniu wykresu momentu.',
    formula: 'N<0\\ \\Rightarrow\\ \\text{ściskanie}\\qquad M<0\\ \\Rightarrow\\ \\text{rozciąganie góry}',
    caption: 'Przekrój z zaznaczonym ściskaniem, rozciąganiem górnych włókien i dodatnią siłą wewnętrzną T.',
    visual: 'diagram',
    focus: { metric: 'signs' },
    emphasis: 'Znaki N i M opisują stan pręta, a T jest siłą wewnętrzną w przekroju, nie obciążeniem zewnętrznym.',
  },
  {
    title: '8. Kontrola dM/dx = T',
    narration:
      'Pochodna momentu gnącego względem x jest równa sile poprzecznej. Różniczkując M(x) = −P sinα(l − x) otrzymujemy +P sinα, czyli dokładnie T. Pochodne T i N są równe zeru, bo nie ma obciążenia ciągłego ani siły osiowej rozłożonej.',
    formula: '\\frac{dM}{dx}=+P\\sin\\alpha=T\\qquad \\frac{dT}{dx}=0\\qquad \\frac{dN}{dx}=0',
    caption: 'Nachylenie wykresu M odpowiada stałej wartości T; kontrola domyka rozwiązanie.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Kontrola różniczkowa potwierdza spójność wszystkich trzech wykresów.',
  },
]

export default {
  ...createShearBendingSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.InclinedLoadDiagramsAnimation }))),
} satisfies SolutionData
