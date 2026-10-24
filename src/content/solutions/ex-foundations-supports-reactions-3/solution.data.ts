import type { SolutionData } from '../../model'
import { SupportsReactionsExample3Animation } from './animation'

export default {
  id: 'ex-foundations-supports-reactions-3',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 3',
  duration: 7,
  given: ['L = 4 m', 'P = 20 kN', 'R_B = 15 kN'],
  result:
    'Siła działa w odległości a = 3 m od lewej podpory, R_A = 5 kN, a moment pod siłą wynosi M = 15 kN·m. Sprawdzenie z prawej strony: R_B · 1 = 15 · 1 = 15 kN·m. Gdyby reakcja R_B była większa od P, otrzymalibyśmy a większe od L, co oznaczałoby, że dane są sprzeczne z modelem belki swobodnie podpartej.',
  animation: SupportsReactionsExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość 4 m. Wiadomo, że przy sile P = 20 kN reakcja prawej podpory wynosi R_B = 15 kN. Szukamy odległości a, w jakiej działa siła, oraz reakcji R_A i momentu pod siłą. Dla belki z jedną siłą reakcja prawej podpory wynosi R_B = Pa/L. Przekształcamy ten związek, żeby wyznaczyć położenie a. Przekształcamy wzór do a = R_B L / P. Podstawiamy 15 kN, 4 m i 20 kN, otrzymując a = 3 m. Z równowagi pionowej R_A + R_B = P, więc R_A = P − R_B = 20 − 15 = 5 kN. Moment pod siłą liczymy z lewej strony: M = R_A · a = 5 · 3 = 15 kN·m. To jednocześnie maksymalny moment w belce. Licząc od prawej podpory, siła działa w odległości 1 m od B. Moment wynosi więc R_B · 1 = 15 · 1 = 15 kN·m. Wynik jest spójny. Suma reakcji 5 + 15 = 20 kN jest równa sile P. Belka jest w równowadze pionowej. Gdyby reakcja R_B była większa od P, otrzymalibyśmy a większe od L. To oznaczałoby, że dane są sprzeczne z modelem belki swobodnie podpartej. Zawsze sprawdzaj, czy wyznaczone położenie mieści się w obrębie belki.',
      caption: 'Poprawne dane muszą dawać 0 ≤ a ≤ L.',
      visual: 'beam',
      formula:
        'L=4\\ \\text{m},\\quad P=20\\ \\text{kN},\\quad R_B=15\\ \\text{kN}\\qquad R_B=\\frac{Pa}{L}\\qquad a=\\frac{R_B L}{P}=\\frac{15\\cdot4}{20}=3\\ \\text{m}\\qquad R_A=P-R_B=20-15=5\\ \\text{kN}\\qquad M=R_A\\cdot3=5\\cdot3=15\\ \\text{kN·m}\\qquad R_B\\cdot1=15\\cdot1=15\\ \\text{kN·m}\\qquad R_A+R_B=5+15=20=P',
    },
  ],
} satisfies SolutionData
