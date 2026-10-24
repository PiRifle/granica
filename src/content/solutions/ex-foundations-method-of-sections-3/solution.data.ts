import type { SolutionData } from '../../model'
import { MethodOfSectionsExample3Animation } from './animation'

export default {
  id: 'ex-foundations-method-of-sections-3',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 3',
  duration: 7,
  given: ['L = 5 m', 'a = 2 m', 'x = 1 m', 'M = 12 kN·m'],
  result:
    'P = 20 kN, R_A = 12 kN, R_B = 8 kN, a maksymalny moment wynosi 24 kN·m. Kontrola z prawej strony: R_B · 3 = 8 · 3 = 24 kN·m. Jeden zmierzony moment nie wystarczyłby do wyznaczenia zarówno P, jak i a — potrzebna była znajomość położenia siły.',
  animation: MethodOfSectionsExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość 5 m. Siła skupiona P działa w odległości 2 m od lewej podpory. W przekroju x = 1 m zmierzono moment zginający M = 12 kN·m. Wyznacz P, reakcje oraz maksymalny moment. Dla x przed siłą lewa część belki zawiera tylko reakcję R_A. Z równowagi momentów względem B reakcja lewej podpory wynosi R_A = P(1 − a/L). Po podstawieniu a/L = 2/5 otrzymujemy R_A = 0,6P. W przekroju x = 1 m, który leży przed siłą P, moment jest równy R_A · 1. Wykorzystujemy związek R_A = 0,6P, więc M = 0,6P. Podstawiamy zmierzony moment 12 kN·m: 0,6P = 12. Dzielimy obie strony przez 0,6 i otrzymujemy P = 20 kN. Po wyznaczeniu siły wracamy do związku R_A = 0,6P. Otrzymujemy R_A = 0,6 · 20 = 12 kN. Reakcja prawej podpory wynosi R_B = P · a / L. Po podstawieniu P = 20 kN i a = 2 m otrzymujemy 20 · 2 / 5 = 8 kN. Maksymalny moment pojawia się pod siłą P, czyli w x = 2 m. Licząc z lewej strony: M_max = R_A · 2 = 12 · 2 = 24 kN·m. Sprawdzamy moment pod siłą, licząc od prawej podpory. Reakcja R_B = 8 kN działa w odległości 3 m od przekroju, więc M = 8 · 3 = 24 kN·m. Wynik jest spójny. Jeden zmierzony moment nie wystarczyłby do wyznaczenia zarówno P, jak i a. W tym zadaniu położenie siły było znane, więc niewiadoma była tylko jedna. Gdyby brakowało i P, i a, potrzebny byłby dodatkowy pomiar albo dodatkowe równanie.',
      caption: 'Moment w jednym przekroju nie odtwarza jednoznacznie całego obciążenia.',
      visual: 'beam',
      formula:
        'L=5\\ \\text{m},\\quad a=2\\ \\text{m},\\quad x=1\\ \\text{m},\\quad M=12\\ \\text{kN·m}\\qquad R_A=P\\left(1-\\frac{a}{L}\\right)=P\\left(1-\\frac{2}{5}\\right)=0{,}6P\\qquad x=1\\ \\text{m},\\qquad M=R_A\\cdot1=0{,}6P\\qquad 0{,}6P=12\\quad\\Rightarrow\\quad P=20\\ \\text{kN}\\qquad R_A=0{,}6P=0{,}6\\cdot20=12\\ \\text{kN}\\qquad R_B=\\frac{Pa}{L}=\\frac{20\\cdot2}{5}=8\\ \\text{kN}\\qquad M_{\\max}=R_A\\cdot2=12\\cdot2=24\\ \\text{kN·m}\\qquad R_B\\cdot3=8\\cdot3=24\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
