import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-moment-punkt-i-os',
  title: 'Moment siły względem punktu i dwóch osi',
  duration: 7,
  given: [
    'Siła F = (4, −2, 6) kN przyłożona w punkcie A(2, 3, 0) m',
    'Biegun w początku układu O',
    'Oś OB przechodzi przez O i B(1, 1, 0) m',
  ],
  result:
    'M_O = 18i − 12j − 16k kN·m, |M_O| ≈ 26,9 kN·m, M_z = −16 kN·m, M_OB = 3√2 ≈ 4,24 kN·m. Twierdzenie Varignona potwierdza wynik.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MomentPointAxisAnimation }))),
  scenes: [
    {
      title: 'Model: promień i siła',
      narration:
        'Wektor r prowadzi od bieguna O do punktu przyłożenia A i ma składowe (2, 3, 0) m. Siła ma składowe (4, −2, 6) kN. Moment względem O to iloczyn wektorowy r×F.',
      caption: 'Punkt A, wektor r i siła F w układzie przestrzennym.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: '\\mathbf r=(2,3,0)\\ \\text{m},\\qquad \\mathbf F=(4,-2,6)\\ \\text{kN}',
    },
    {
      title: 'Składowe momentu',
      narration:
        'Rozwijamy wyznacznik. Składowa x to 3 razy 6 minus 0 razy −2, czyli 18. Składowa y ma znak minus: −(2·6 − 0·4) = −12. Składowa z to 2 razy −2 minus 3 razy 4, czyli −16.',
      caption: 'Mx = 18, My = −12, Mz = −16 kN·m.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: 'M_x=3\\cdot6-0\\cdot(-2)=18,\\quad M_y=-(2\\cdot6-0\\cdot4)=-12,\\quad M_z=2\\cdot(-2)-3\\cdot4=-16',
    },
    {
      title: 'Wektor momentu i jego moduł',
      narration:
        'Trzy składowe tworzą wektor momentu 18i − 12j − 16k kN·m. Jego długość to pierwiastek z sumy kwadratów 18, 12 i 16. Suma kwadratów wynosi 724, więc moduł to około 26,9 kN·m.',
      caption: 'M_O = (18, −12, −16) kN·m, |M_O| ≈ 26,9 kN·m.',
      visual: 'diagram',
      focus: { metric: 'magnitude' },
      formula:
        '\\mathbf M_O=18\\mathbf i-12\\mathbf j-16\\mathbf k\\ \\text{kN}\\cdot\\text{m},\\qquad |\\mathbf M_O|=\\sqrt{18^2+12^2+16^2}\\approx26{,}9',
    },
    {
      title: 'Moment względem osi z',
      narration:
        'Moment względem osi z to rzut wektora momentu na wersor k, czyli po prostu składowa z. Wynosi −16 kN·m. Znak minus oznacza obrót zgodny z ruchem wskazówek zegara, gdy patrzymy z dodatniej strony osi z.',
      caption: 'M_z = −16 kN·m — obrót zgodny z ruchem wskazówek zegara.',
      visual: 'diagram',
      focus: { metric: 'axisZ' },
      formula: 'M_z=-16\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Moment względem osi OB',
      narration:
        'Wersor osi OB to (1, 1, 0)/√2. Moment względem tej osi to rzut M_O na ten wersor: (18 − 12)/√2 = 6/√2 = 3√2, czyli około 4,24 kN·m. Dodatni znak oznacza obrót zgodny z kierunkiem od O do B.',
      caption: 'M_OB = 3√2 ≈ 4,24 kN·m.',
      visual: 'diagram',
      focus: { metric: 'axisOB' },
      formula:
        '\\mathbf u_{OB}=\\frac{(1,1,0)}{\\sqrt2},\\qquad M_{OB}=\\mathbf u_{OB}\\cdot\\mathbf M_O=\\frac{18-12}{\\sqrt2}=3\\sqrt2\\approx4{,}24',
    },
    {
      title: 'Kontrola Varignona',
      narration:
        'Rozkładamy siłę na trzy składowe i liczymy moment każdej z nich. Suma momentów składowych daje (0,0,−12) + (0,0,−4) + (18,−12,0), czyli dokładnie wektor M_O. Twierdzenie Varignona potwierdza wynik.',
      caption: 'Suma momentów składowych = (18, −12, −16) kN·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '(0,0,-12)+(0,0,-4)+(18,-12,0)=(18,-12,-16)\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
