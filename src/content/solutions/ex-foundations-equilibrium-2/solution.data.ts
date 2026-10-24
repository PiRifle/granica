import type { SolutionData } from '../../model'
import { EquilibriumExample2Animation } from './animation'

export default {
  id: 'ex-foundations-equilibrium-2',
  title: 'Równowaga statyczna: trzy równania — przykład 2',
  duration: 7,
  given: ['F=10 kN'],
  result:
    'Kontrola momentów względem B daje -M_A+A_y· 2,4=-19,2+19,2=0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki. Wniosek: utwierdzenie przenosi zarówno siłę osiową, jak i moment, nawet jeśli w tym zadaniu siła osiowa nie wpływa na zginanie. Gdyby belka była wykonana z materiału o małej wytrzymałości na rozciąganie, sama siła osiowa mogłaby zdecydować o doborze przekroju. Reakcje trzeba więc raportować wszystkie, a nie tylko te, które są wygodne w równaniu momentów.',
  animation: EquilibriumExample2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Wspornik jest utwierdzony w ścianie w punkcie A i ma długość 2,4 m. Na swobodnym końcu B działa siła F = 10 kN, której składowa pozioma wynosi 6 kN w prawo, a pionowa 8 kN w dół. Siła pozioma działa w osi belki. W utwierdzeniu przyjmujemy A_x w prawo. Równowaga pozioma daje A_x + 6 = 0, czyli A_x = -6 kN. Minus oznacza, że rzeczywista reakcja działa w lewo. Równowaga pionowa: A_y − 8 = 0, więc A_y = 8 kN w górę. Siła 8 kN działa w odległości 2,4 m od A i obraca belkę zgodnie z ruchem wskazówek zegara, więc jej moment wynosi -8 · 2,4 = -19,2 kN·m. Reakcja momentowa równoważy moment od siły pionowej: M_A − 19,2 = 0, więc M_A = 19,2 kN·m. Kontrola momentów względem B daje -M_A + A_y · 2,4 = -19,2 + 19,2 = 0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki.',
      caption: 'Bilans momentów względem B potwierdza reakcje.',
      visual: 'beam',
      formula:
        'L=2{,}4\\ \\text{m},\\quad F_x=6\\ \\text{kN},\\quad F_y=8\\ \\text{kN}\\qquad A_x+6=0 \\quad\\Rightarrow\\quad A_x=-6\\ \\text{kN}\\qquad A_y-8=0 \\quad\\Rightarrow\\quad A_y=8\\ \\text{kN}\\qquad -8\\cdot 2{,}4=-19{,}2\\ \\text{kN·m}\\qquad M_A-19{,}2=0 \\quad\\Rightarrow\\quad M_A=19{,}2\\ \\text{kN·m}\\qquad -M_A+A_y\\cdot 2{,}4=-19{,}2+19{,}2=0',
    },
  ],
} satisfies SolutionData
