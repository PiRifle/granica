import type { SolutionData } from '../../model'
import { MethodOfSectionsExample2Animation } from './animation'

export default {
  id: 'ex-foundations-method-of-sections-2',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 2',
  duration: 7,
  given: ['L_AB = 1,2 m', 'A_AB = 300 mm²', 'L_BC = 0,8 m', 'A_BC = 200 mm²', 'P_B = 15 kN', 'P_C = 10 kN'],
  result:
    'N_BC = 10 kN, N_AB = 25 kN, σ_BC = 50 MPa, σ_AB = 83,3 MPa. Największa siła i największe naprężenie występują w odcinku AB, ale to nie jest regułą. Gdyby odcinek BC miał znacznie mniejsze pole, mógłby mieć większe naprężenie mimo mniejszej siły. Dlatego po wyznaczeniu N w każdym przedziale trzeba sprawdzić iloraz |N|/A, a nie tylko największe |N|.',
  animation: MethodOfSectionsExample2Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Pionowy pręt jest utwierdzony górnym końcem A i składa się z dwóch odcinków. Odcinek AB ma długość 1,2 m i pole przekroju 300 mm². Odcinek BC ma długość 0,8 m i pole 200 mm². W punkcie B działa siła 15 kN w dół, a w swobodnym końcu C siła 10 kN w dół. Rozpatrujemy cały pręt. Jedyną reakcją jest siła w utwierdzeniu A, skierowana w górę. Równowaga pionowa daje R_A = 15 + 10 = 25 kN. Przecinamy odcinek BC i zostawiamy dolną część z siłą 10 kN. Na górnej ścianie dolnej części dodatnie N jest skierowane w górę, bo rozciąga przekrój. Równowaga pionowa daje N_BC − 10 = 0. Dzielimy siłę 10 kN, czyli 10 000 N, przez pole 200 mm². Otrzymujemy 50 N/mm², czyli 50 MPa. Wartość dodatnia oznacza rozciąganie. Teraz przecinamy odcinek AB i zostawiamy dolną część, która zawiera obie siły: 15 kN w B i 10 kN w C. Równowaga pionowa daje N_AB − 15 − 10 = 0, więc N_AB = 25 kN. Dzielimy 25 000 N przez pole 300 mm². Otrzymujemy 83,3 N/mm², czyli 83,3 MPa. To największe naprężenie w całym pręcie. Odcinek AB ma większą siłę i większe naprężenie. Nie można jednak wnioskować tylko z siły: o naprężeniu decyduje iloraz |N|/A. Mniejszy przekrój może zrównoważyć mniejszą siłę i dać większe naprężenie. Reakcja w A jest równa sile normalnej w AB. To kontrola globalnej równowagi: siła w utwierdzeniu musi równoważyć wszystkie obciążenia poniżej. Wynik 25 kN jest spójny z wcześniejszym obliczeniem.',
      caption: 'R_A = N_AB = 25 kN potwierdza równowagę.',
      visual: 'axial',
      formula:
        'L_{AB}=1{,}2\\ \\text{m},\\quad A_{AB}=300\\ \\text{mm}^2,\\quad L_{BC}=0{,}8\\ \\text{m},\\quad A_{BC}=200\\ \\text{mm}^2\\qquad R_A=15+10=25\\ \\text{kN}\\qquad N_{BC}-10=0\\quad\\Rightarrow\\quad N_{BC}=10\\ \\text{kN}\\qquad \\sigma_{BC}=\\frac{10\\,000}{200}=50\\ \\text{MPa}\\qquad N_{AB}-15-10=0\\quad\\Rightarrow\\quad N_{AB}=25\\ \\text{kN}\\qquad \\sigma_{AB}=\\frac{25\\,000}{300}=83{,}3\\ \\text{MPa}\\qquad |\\sigma|_{AB}=83{,}3\\ \\text{MPa}>|\\sigma|_{BC}=50\\ \\text{MPa}\\qquad R_A=N_{AB}=25\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
