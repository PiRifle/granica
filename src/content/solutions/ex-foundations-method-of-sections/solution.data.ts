import type { SolutionData } from '../../model'
import { MethodOfSectionsBeamAnimation } from './animation'

export default {
  id: 'ex-foundations-method-of-sections',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 24 kN', 'a = 2 m', 'x₁ = 1 m', 'x₂ = 4 m'],
  result:
    'W x = 1 m: N = 0, V = +16 kN, M = +16 kN·m. W x = 4 m: N = 0, V = −8 kN, M = +16 kN·m. Znak minus przy V oznacza zwrot przeciwny do założonego; moment dodatni wygina belkę wypukłością w dół.',
  animation: MethodOfSectionsBeamAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 6 m. Siła P = 24 kN działa w odległości a = 2 m od lewej podpory. Mamy wyznaczyć siłę podłużną, siłę poprzeczną i moment w dwóch przekrojach: x = 1 m oraz x = 4 m.',
      caption: 'Schemat belki z siłą P = 24 kN w x = 2 m i przekrojami x = 1 m oraz x = 4 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula:
        'L=6\\ \\text{m},\\qquad P=24\\ \\text{kN},\\qquad a=2\\ \\text{m},\\qquad x_1=1\\ \\text{m},\\qquad x_2=4\\ \\text{m}',
    },
    {
      title: 'Reakcje podporowe',
      narration:
        'Z równowagi momentów względem A obliczamy R_B = P · a / L = 24 · 2 / 6 = 8 kN. Następnie z równowagi pionowej R_A = P − R_B = 24 − 8 = 16 kN.',
      caption: 'R_A = 16 kN, R_B = 8 kN; reakcje równoważą siłę P = 24 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}=\\frac{24\\cdot2}{6}=8\\ \\text{kN},\\qquad R_A=P-R_B=24-8=16\\ \\text{kN}',
    },
    {
      title: 'Cięcie w x = 1 m: N, V, M',
      narration:
        'Przesuwamy przekrój do x = 1 m i zostawiamy lewą część. Na cięciu wprowadzamy N, V i M. Brak sił poziomych daje N = 0. Równowaga pionowa: 16 − V = 0, więc V = +16 kN. Moment względem cięcia: M − 16 · 1 = 0, więc M = +16 kN·m.',
      caption: 'W x = 1 m: N = 0, V = +16 kN, M = +16 kN·m.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula:
        'x_1=1\\ \\text{m},\\qquad N=0,\\qquad 16-V=0\\ \\Rightarrow\\ V=+16\\ \\text{kN},\\qquad M-16\\cdot1=0\\ \\Rightarrow\\ M=+16\\ \\text{kN·m}',
    },
    {
      title: 'Cięcie w x = 4 m: N, V, M',
      narration:
        'Dla x = 4 m lewa część zawiera już siłę 24 kN. Równowaga pionowa: 16 − 24 − V = 0, więc V = −8 kN. Minus oznacza, że rzeczywisty zwrot jest przeciwny do założonego. Moment względem cięcia: M − 16 · 4 + 24 · (4 − 2) = 0, więc M = +16 kN·m.',
      caption: 'W x = 4 m: N = 0, V = −8 kN, M = +16 kN·m.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula:
        'x_2=4\\ \\text{m},\\qquad N=0,\\qquad 16-24-V=0\\ \\Rightarrow\\ V=-8\\ \\text{kN},\\qquad M-16\\cdot4+24\\cdot(4-2)=0\\ \\Rightarrow\\ M=+16\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Dla x = 4 m prawa część belki ma tylko reakcję R_B = 8 kN, działającą w odległości 2 m od przekroju. Moment wynosi więc M = 8 · 2 = 16 kN·m. Zgodność potwierdza wynik.',
      caption: 'Prawa strona daje ten sam moment 16 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_B\\cdot(6-4)=8\\cdot2=16\\ \\text{kN·m}',
    },
    {
      title: 'Wnioski: N, V i M w obu przekrojach',
      narration:
        'W obu przekrojach N = 0, bo belka nie jest obciążona poziomo. Siła poprzeczna zmienia znak pod siłą P: +16 kN przed siłą i −8 kN za nią. Moment jest ciągły i w obu sprawdzanych przekrojach wynosi +16 kN·m. Wartości V i M zależą od położenia przekroju, dlatego jeden przekrój nie opisuje całej belki.',
      caption: 'N = 0 w całej belce; V zmienia znak pod P; M = +16 kN·m w x = 1 m i x = 4 m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula:
        'N=0,\\qquad V(x_1)=+16\\ \\text{kN},\\quad V(x_2)=-8\\ \\text{kN},\\qquad M(x_1)=M(x_2)=+16\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
