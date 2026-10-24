import type { SolutionData } from '../../model'
import { MethodOfSectionsExample1Animation } from './animation'

export default {
  id: 'ex-foundations-method-of-sections',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 24 kN', 'a = 2 m', 'x₁ = 1 m', 'x₂ = 4 m'],
  result:
    'W x = 1 m: N = 0, V = +16 kN, M = +16 kN·m. W x = 4 m: N = 0, V = −8 kN, M = +16 kN·m. Znak minus przy V oznacza zwrot przeciwny do założonego; moment dodatni wygina belkę wypukłością w dół.',
  animation: MethodOfSectionsExample1Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość L = 6 m. Siła P = 24 kN działa w odległości a = 2 m od lewej podpory. Mamy wyznaczyć siłę podłużną, siłę poprzeczną i moment w dwóch przekrojach: x = 1 m oraz x = 4 m. Z równowagi momentów względem A obliczamy R_B = P · a / L = 24 · 2 / 6 = 8 kN. Następnie z równowagi pionowej R_A = P − R_B = 24 − 8 = 16 kN. Dla x = 1 m wybieramy lewą część belki. Na cięciu działają dodatnie N w lewo, V w dół i M przeciwnie do ruchu wskazówek zegara. Równowaga pionowa daje 16 − V = 0, więc V = +16 kN. Moment względem cięcia: M − 16 · 1 = 0. Stąd M = +16 kN·m. Dodatni moment oznacza rozciąganie dolnych włókien belki. Dla x = 4 m lewa część zawiera już siłę 24 kN. Równowaga pionowa: 16 − 24 − V = 0, więc V = −8 kN. Minus oznacza, że rzeczywisty zwrot jest przeciwny do założonego. Momenty względem cięcia: M − 16 · 4 + 24 · (4 − 2) = 0. Stąd M = 64 − 48 = +16 kN·m. Moment jest taki sam jak w x = 1 m. Dla x = 4 m prawa część belki ma tylko reakcję R_B = 8 kN, działającą w odległości 2 m od przekroju. Moment wynosi więc M = 8 · 2 = 16 kN·m. Zgodność potwierdza wynik. Suma reakcji 16 + 8 = 24 kN jest równa sile P. W obu przekrojach siła podłużna N = 0, bo na belkę nie działa żadne obciążenie poziome.',
      caption: 'Reakcje równoważą siłę P, a N = 0 w całej belce.',
      visual: 'beam',
      formula:
        'L=6\\ \\text{m},\\quad P=24\\ \\text{kN},\\quad a=2\\ \\text{m},\\quad x_1=1\\ \\text{m},\\quad x_2=4\\ \\text{m}\\qquad R_B=\\frac{Pa}{L}=\\frac{24\\cdot2}{6}=8\\ \\text{kN},\\qquad R_A=P-R_B=24-8=16\\ \\text{kN}\\qquad x_1=1\\ \\text{m},\\qquad 16-V=0\\quad\\Rightarrow\\quad V=+16\\ \\text{kN}\\qquad x_1=1\\ \\text{m},\\qquad M-16\\cdot1=0\\quad\\Rightarrow\\quad M=+16\\ \\text{kN·m}\\qquad x_2=4\\ \\text{m},\\qquad 16-24-V=0\\quad\\Rightarrow\\quad V=-8\\ \\text{kN}\\qquad x_2=4\\ \\text{m},\\qquad M-16\\cdot4+24\\cdot(4-2)=0\\quad\\Rightarrow\\quad M=+16\\ \\text{kN·m}\\qquad M=R_B\\cdot(6-4)=8\\cdot2=16\\ \\text{kN·m}\\qquad R_A+R_B=16+8=24=P',
    },
  ],
} satisfies SolutionData
