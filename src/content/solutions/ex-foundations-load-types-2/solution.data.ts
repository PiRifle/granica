import type { SolutionData } from '../../model'
import { LoadTypesExample2Animation } from './animation'

export default {
  id: 'ex-foundations-load-types-2',
  title: 'Obciążenia: siła, rozkład i moment — przykład 2',
  duration: 7,
  given: ['L = 6 m', 'q = 2,4 kN/m', 'P = 18 kN'],
  result:
    'Wypadkowa ciężaru własnego wynosi 14,4 kN, a całkowite obciążenie 32,4 kN. Z symetrii R_A = R_B = 16,2 kN, a maksymalny moment w środku rozpiętości wynosi 37,8 kN·m. Oba sposoby obliczenia momentu dają ten sam wynik — to obowiązkowa kontrola poprawności.',
  animation: LoadTypesExample2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość 6 m. Jej ciężar własny odpowiada równomiernemu obciążeniu q = 2,4 kN/m. Dodatkowo w środku rozpiętości działa siła skupiona P = 18 kN. Oblicz reakcje i maksymalny moment zginający. Obciążenie równomierne zastępujemy wypadkową Q = qL. Mnożymy 2,4 kN/m przez 6 m i otrzymujemy 14,4 kN. Wypadkowa ciężaru własnego działa w środku belki, podobnie jak siła 18 kN. Całkowite obciążenie wynosi więc P + Q = 18 + 14,4 = 32,4 kN, a jego wypadkowa również leży w środku rozpiętości. Obciążenie jest symetryczne względem środka belki, więc obie reakcje są równe. Dzielimy całkowite obciążenie przez dwa: R_A = R_B = 32,4 / 2 = 16,2 kN. Moment w środku obliczamy z lewej części. Reakcja R_A działa w odległości 3 m, a obciążenie równomierne na lewej połowie ma wypadkową q · 3 = 7,2 kN w odległości 1,5 m od przekroju. Ten sam moment można obliczyć od razu wzorem dla belki z siłą w środku i obciążeniem równomiernym: PL/4 + qL²/8. Podstawienie daje 27 + 10,8 = 37,8 kN·m. Suma reakcji 16,2 + 16,2 = 32,4 kN jest równa sumie obciążeń P + Q = 18 + 14,4 = 32,4 kN. Bilans sił się zamyka, więc reakcje są poprawne. Oba sposoby dają ten sam wynik. Taka kontrola jest obowiązkowa: jeśli dwa poprawne rachunki dają różne liczby, trzeba znaleźć błąd, a nie wybrać wygodniejszy wynik.',
      caption: 'Zgodność dwóch metod potwierdza poprawność rozwiązania.',
      visual: 'beam',
      formula:
        'L=6\\ \\text{m},\\quad q=2{,}4\\ \\text{kN/m},\\quad P=18\\ \\text{kN}\\qquad Q=qL=2{,}4\\cdot6=14{,}4\\ \\text{kN}\\qquad P+Q=18+14{,}4=32{,}4\\ \\text{kN},\\qquad x_Q=\\frac{L}{2}=3{,}0\\ \\text{m}\\qquad R_A=R_B=\\frac{32{,}4}{2}=16{,}2\\ \\text{kN}\\qquad M_{\\max}=R_A\\cdot3-(q\\cdot3)\\cdot1{,}5=16{,}2\\cdot3-7{,}2\\cdot1{,}5=48{,}6-10{,}8=37{,}8\\ \\text{kN·m}\\qquad M_{\\max}=\\frac{PL}{4}+\\frac{qL^2}{8}=\\frac{18\\cdot6}{4}+\\frac{2{,}4\\cdot36}{8}=27+10{,}8=37{,}8\\ \\text{kN·m}\\qquad R_A+R_B=16{,}2+16{,}2=32{,}4,\\qquad P+Q=18+14{,}4=32{,}4',
    },
  ],
} satisfies SolutionData
