import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-zaleznosci-qtm',
  title: 'Zależności q–T–M — pochodna, pole i ekstremum',
  duration: 6,
  given: [
    'Belka swobodnie podparta o rozpiętości L = 6 m',
    'Obciążenie q = 4 kN/m na odcinku [0, 3] m',
    'Reakcje R_A = 9 kN, R_B = 3 kN',
  ],
  result:
    'T(x) = 9 − 4x na [0, 3] i T = −3 kN na [3, 6]. M(x) = 9x − 2x², a M_max = 10,125 kN·m w x = 2,25 m. Związki dT/dx = −q i dM/dx = T są spełnione, a ΔM na [3, 6] wynosi −9 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.QtmRelationsAnimation }))),
  scenes: [
    {
      title: 'Trzy wykresy, jeden układ',
      narration:
        'Wykresy q, T i M układamy jeden pod drugim, na wspólnej osi x. Obciążenie jest prostokątem na lewej połowie belki. Siła tnąca opada liniowo, a moment rośnie parabolicznie i wraca do zera na prawej podporze.',
      caption: 'q stałe na [0, 3], T liniowe, M paraboliczne.',
      visual: 'diagram',
      focus: { metric: 'diagrams' },
      formula: 'q(x)=4\\ \\text{kN/m},\\qquad T(x)=9-4x,\\qquad M(x)=9x-2x^2',
    },
    {
      title: 'Nachylenie T to minus q',
      narration:
        'Na odcinku obciążonym pochodna siły tnącej wynosi minus 4 kN/m, czyli dokładnie minus q. Poza obciążeniem q jest zerowe, więc siła tnąca jest stała. To pozwala przewidzieć nachylenie wykresu bez liczenia momentów.',
      caption: 'dT/dx = −4 = −q na [0, 3]; dT/dx = 0 na [3, 6].',
      visual: 'diagram',
      focus: { metric: 'derivativeT' },
      formula: '\\frac{dT}{dx}=-q(x)\\quad\\Rightarrow\\quad \\frac{dT}{dx}=-4\\ \\text{kN/m}\\ \\text{na }[0,3]',
    },
    {
      title: 'Nachylenie M to T',
      narration:
        'Pochodna momentu w każdym przekroju jest równa sile tnącej. W x = 2 m T = 1 kN, więc styczna do wykresu M ma nachylenie 1. W x = 4,5 m T = −3 kN, więc moment maleje ze spadkiem 3 kN na metr.',
      caption: 'dM/dx = T(x) = 9 − 4x na [0, 3].',
      visual: 'diagram',
      focus: { metric: 'derivativeM' },
      formula: '\\frac{dM}{dx}=9-4x=T(x),\\qquad \\left.\\frac{dM}{dx}\\right|_{x=2}=1\\ \\text{kN}',
    },
    {
      title: 'Ekstremum tam, gdzie T = 0',
      narration:
        'Moment osiąga ekstremum, gdy jego pochodna się zeruje, czyli gdy siła tnąca przecina zero. Rozwiązanie 9 minus 4x równa się zero daje x = 2,25 m. Podstawienie do funkcji momentu daje 10,125 kN·m.',
      caption: 'x = 2,25 m, M_max = 10,125 kN·m.',
      visual: 'diagram',
      focus: { metric: 'extremum' },
      formula:
        'T=0\\Rightarrow x=\\frac{9}{4}=2{,}25\\ \\text{m},\\qquad M_{\\max}=9\\cdot2{,}25-2\\cdot2{,}25^2=10{,}125\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Zmiana momentu to pole pod T',
      narration:
        'Na odcinku od 3 do 6 m siła tnąca jest stała i wynosi minus 3 kN. Pole pod wykresem T to prostokąt 3 na minus 3, czyli minus 9 kN·m. Moment spada więc z 9 kN·m do zera na podporze B.',
      caption: 'ΔM = ∫T dx = (−3)·3 = −9 kN·m.',
      visual: 'diagram',
      focus: { metric: 'area' },
      formula: '\\Delta M=\\int_3^6 T\\,dx=(-3)\\cdot3=-9\\ \\text{kN}\\cdot\\text{m},\\qquad M(6)=9-9=0',
    },
    {
      title: 'Kontrola całkowa',
      narration:
        'Zmiana siły tnącej na odcinku obciążonym to minus pole pod q: minus 4 razy 3 daje minus 12 kN, więc T spada z 9 do minus 3 kN. Moment znika na obu podporach, a druga pochodna momentu równa się minus q. Wszystkie związki się domykają.',
      caption: 'ΔT = −12 kN, M(0) = M(6) = 0, d²M/dx² = −q.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\Delta T=-\\int_0^3 q\\,dx=-12\\ \\text{kN},\\qquad M(0)=M(6)=0,\\qquad \\frac{d^2M}{dx^2}=-q',
    },
  ],
} satisfies SolutionData
