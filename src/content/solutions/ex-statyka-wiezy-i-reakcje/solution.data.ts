import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wiezy-i-reakcje',
  title: 'Reakcje belki na pochyłym torze',
  duration: 7,
  given: [
    'Belka AB o długości 4 m, przegub w A, podpora przesuwna w B',
    'Tor podpory w B nachylony pod kątem 30° do poziomu',
    'P = 12 kN w dół, w odległości 3 m od A',
  ],
  result:
    'R_B = 10,39 kN prostopadle do toru, w lewo i w górę. A_x = 5,20 kN w prawo, A_y = 3 kN w górę, R_A = 6 kN pod kątem 30° do poziomu.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SupportReactionsAnimation }))),
  scenes: [
    {
      title: 'Model i więzy',
      narration:
        'Belka opiera się na przegubie w A i podporze przesuwnej w B. Tor w B jest nachylony pod kątem 30°, więc normalna do toru tworzy z poziomem kąt 90° + 30° = 120°. Reakcja nie będzie pionowa.',
      caption: 'Podpora przesuwna daje jedną reakcję prostopadłą do toru.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: '\\mathbf R_B=R_B\\,\\mathbf n,\\qquad \\alpha_n=90^\\circ+30^\\circ=120^\\circ',
    },
    {
      title: 'Oswobodzenie od więzów',
      narration:
        'Po oswobodzeniu rysujemy tylko belkę i siły. Reakcję R_B rozkładamy na składowe. Cosinus 120° jest ujemny, więc składowa pozioma działa w lewo; sinus 120° daje składową pionową w górę.',
      caption: 'R_Bx = −R_B/2, R_By = R_B√3/2.',
      visual: 'diagram',
      focus: { metric: 'fbd' },
      formula: 'R_{Bx}=-R_B\\cos60^\\circ=-\\tfrac12R_B,\\qquad R_{By}=R_B\\sin60^\\circ=\\tfrac{\\sqrt3}{2}R_B',
    },
    {
      title: 'Moment względem A',
      narration:
        'Biegun w A eliminuje A_x i A_y. Siła P daje moment 12 razy 3, a składowa pionowa R_By moment R_By razy 4. Z równania momentów wyznaczamy związek na R_B.',
      caption: '(R_B√3/2)·4 = 12·3.',
      visual: 'diagram',
      focus: { metric: 'momentA' },
      formula: 'R_{By}\\cdot4-P\\cdot3=0\\ \\Rightarrow\\ \\tfrac{\\sqrt3}{2}R_B\\cdot4=36',
    },
    {
      title: 'Reakcja podpory B',
      narration:
        'Dzielimy 36 przez 2√3. Wynik to 6√3, czyli około 10,39 kN. Reakcja jest skierowana wzdłuż normalnej do toru: w lewo i w górę, pod kątem 120° od dodatniej osi x.',
      caption: 'R_B = 6√3 ≈ 10,39 kN.',
      visual: 'diagram',
      focus: { metric: 'reactionB' },
      formula: 'R_B=\\frac{36}{2\\sqrt3}=6\\sqrt3\\approx10{,}39\\ \\text{kN}',
    },
    {
      title: 'Pozostałe reakcje',
      narration:
        'Poziomo A_x równoważy składową R_Bx, więc A_x = R_B/2 = 3√3 ≈ 5,20 kN w prawo. Pionowo suma A_y i R_By musi dać 12 kN. Ponieważ R_By = 9 kN, zostaje A_y = 3 kN w górę.',
      caption: 'A_x = 5,20 kN w prawo, A_y = 3 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'reactionsA' },
      formula: 'A_x=\\tfrac12R_B=3\\sqrt3\\approx5{,}20\\ \\text{kN},\\qquad A_y=12-R_{By}=3\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa w A i kontrola',
      narration:
        'Składowe w A dają reakcję o module 6 kN i nachyleniu 30° do poziomu. Kontrola momentem względem B: −3 razy 4 plus 12 razy 1 daje zero. Siła A_x leży na osi belki, więc nie wnosi momentu względem B.',
      caption: 'R_A = 6 kN pod kątem 30°; ΣM_B = 0.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        'R_A=\\sqrt{(3\\sqrt3)^2+3^2}=6\\ \\text{kN},\\qquad \\arctan\\frac{3}{3\\sqrt3}=30^\\circ,\\qquad -A_y\\cdot4+P\\cdot1=0',
    },
  ],
} satisfies SolutionData
