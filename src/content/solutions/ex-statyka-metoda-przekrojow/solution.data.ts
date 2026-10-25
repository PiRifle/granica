import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-metoda-przekrojow',
  title: 'Metoda przekrojów — belka z siłą skupioną',
  duration: 6,
  given: [
    'Belka swobodnie podparta o rozpiętości L = 6 m',
    'Siła P = 12 kN w odległości a = 2 m od podpory A',
    'Przekrój obliczeniowy w x = 3 m',
  ],
  result:
    'R_A = 8 kN, R_B = 4 kN. W przekroju x = 3 m: N = 0, T = −4 kN, M = 12 kN·m. Kontrola z prawej strony daje te same wartości.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MethodOfSectionsAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka leży na przegubie A i podporze przesuwnej B. Siła skupiona P działa w odległości a od lewej podpory. Zanim przetniemy belkę, musimy znać reakcje całego układu.',
      caption: 'Rozpiętość 6 m, siła 12 kN w odległości 2 m od A, przekrój w x = 3 m.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'L=6\\ \\text{m},\\qquad a=2\\ \\text{m},\\qquad P=12\\ \\text{kN},\\qquad x=3\\ \\text{m}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Moment względem A eliminuje reakcję A. Z równania równowagi momentów otrzymujemy R_B, a z równowagi pionowej — R_A. Suma reakcji musi równać się sile P.',
      caption: 'R_B = 4 kN, R_A = 8 kN.',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}=\\frac{12\\cdot2}{6}=4\\ \\text{kN},\\qquad R_A=P-R_B=8\\ \\text{kN}',
    },
    {
      title: 'Cięcie w x = 3 m',
      narration:
        'Przekrój leży na prawo od siły P, więc na odciętej lewej części działają obie znane siły: reakcja R_A i obciążenie P. Na ścianie cięcia rysujemy dodatnie N, T i M.',
      caption: 'Lewa część belki zawiera R_A = 8 kN oraz P = 12 kN.',
      visual: 'diagram',
      focus: { metric: 'cut' },
      formula:
        'x=3\\ \\text{m}>a=2\\ \\text{m}\\quad\\Rightarrow\\quad \\text{na lewo od cięcia działają }R_A\\text{ i }P',
    },
    {
      title: 'Siła tnąca',
      narration:
        'Równowaga pionowa odciętej części daje 8 minus 12 minus T równa się zero. Siła tnąca wynosi więc minus 4 kN. Minus informuje, że jej rzeczywisty zwrot jest przeciwny do przyjętego na rysunku.',
      caption: 'T = −4 kN — zwrot rzeczywisty przeciwny do dodatniego.',
      visual: 'diagram',
      focus: { metric: 'T' },
      formula: 'R_A-P-T=0\\quad\\Rightarrow\\quad T=8-12=-4\\ \\text{kN}',
    },
    {
      title: 'Moment zginający',
      narration:
        'Momenty liczymy względem przekroju. Reakcja R_A działa na ramieniu 3 m, a siła P na ramieniu 1 m. Po podstawieniu otrzymujemy moment 12 kN·m.',
      caption: 'M = 8·3 − 12·1 = 12 kN·m.',
      visual: 'diagram',
      focus: { metric: 'M' },
      formula: 'M-R_A\\cdot3+P\\cdot1=0\\quad\\Rightarrow\\quad M=8\\cdot3-12\\cdot1=12\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Prawa część belki zawiera tylko reakcję R_B na ramieniu 3 m. Siła tnąca ma zwrot rzeczywisty w dół, a moment jest dodatni. Oba wyniki zgadzają się z lewą stroną cięcia.',
      caption: 'Z prawej: T = −4 kN, M = 4·3 = 12 kN·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'T=-R_B=-4\\ \\text{kN},\\qquad M=R_B\\cdot3=4\\cdot3=12\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
