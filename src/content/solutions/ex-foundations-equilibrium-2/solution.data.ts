import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-equilibrium-2',
  title: 'Równowaga statyczna: trzy równania — przykład 2',
  duration: 7,
  given: ['F=10 kN'],
  result:
    'Kontrola momentów względem B daje -M_A+A_y· 2,4=-19,2+19,2=0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki. Wniosek: utwierdzenie przenosi zarówno siłę osiową, jak i moment, nawet jeśli w tym zadaniu siła osiowa nie wpływa na zginanie. Gdyby belka była wykonana z materiału o małej wytrzymałości na rozciąganie, sama siła osiowa mogłaby zdecydować o doborze przekroju. Reakcje trzeba więc raportować wszystkie, a nie tylko te, które są wygodne w równaniu momentów.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.EquilibriumExample2Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wspornik jest utwierdzony w ścianie w punkcie A i ma długość L = 2,4 m. Na swobodnym końcu B działa siła F = 10 kN. Jej składowa pozioma wynosi F_x = 6 kN w prawo, a pionowa F_y = 8 kN w dół. Siła pozioma działa w osi belki.',
      caption: 'Wspornik z siłą F = 10 kN przyłożoną na końcu B.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=2{,}4\\ \\text{m},\\quad F_x=6{,}0\\ \\text{kN},\\quad F_y=8{,}0\\ \\text{kN}',
    },
    {
      title: 'Rozkład siły na składowe',
      narration:
        'Siłę F rozkładamy na składową poziomą F_x = 6 kN w prawo i pionową F_y = 8 kN w dół. Obie składowe działają w tym samym punkcie B co siła wypadkowa.',
      caption: 'Składowe F_x i F_y zastępują siłę F w punkcie B.',
      visual: 'beam',
      focus: { metric: 'components' },
      formula: 'F=\\sqrt{F_x^2+F_y^2}=\\sqrt{6^2+8^2}=10\\ \\text{kN}',
    },
    {
      title: 'Reakcje w utwierdzeniu',
      narration:
        'W utwierdzeniu A przyjmujemy A_x w prawo, A_y w górę i M_A przeciwnie do ruchu wskazówek zegara. Równowaga pozioma daje A_x + 6 = 0, czyli A_x = −6 kN (w lewo), a pionowa A_y − 8 = 0, czyli A_y = 8 kN w górę.',
      caption: 'A_x działa w lewo, A_y w górę, a M_A przeciwnie do ruchu wskazówek zegara.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula:
        'A_x+F_x=0 \\quad\\Rightarrow\\quad A_x=-6{,}0\\ \\text{kN},\\qquad A_y-F_y=0 \\quad\\Rightarrow\\quad A_y=8{,}0\\ \\text{kN}',
    },
    {
      title: 'Moment utwierdzenia',
      narration:
        'Siła pionowa F_y działa na ramieniu L = 2,4 m i daje moment −8 · 2,4 = −19,2 kN·m względem A. Reakcja momentowa M_A równoważy ten moment: M_A = 19,2 kN·m.',
      caption: 'M_A = F_y · L = 19,2 kN·m.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula: 'M_A-F_y\\cdot L=0 \\quad\\Rightarrow\\quad M_A=8\\cdot2{,}4=19{,}2\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola względem B',
      narration:
        'Kontrola momentów względem B: −M_A + A_y · 2,4 = −19,2 + 19,2 = 0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki.',
      caption: 'Bilans momentów względem B potwierdza reakcje.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: '-M_A+A_y\\cdot2{,}4=-19{,}2+19{,}2=0,\\qquad A_x+F_x=-6{,}0+6{,}0=0',
    },
  ],
} satisfies SolutionData
