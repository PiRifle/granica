import type { SolutionData } from '../../model'
import { MethodOfSectionsSteppedBarAnimation } from './animation'

export default {
  id: 'ex-foundations-method-of-sections-2',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 2',
  duration: 7,
  given: ['L_AB = 1,2 m', 'A_AB = 300 mm²', 'L_BC = 0,8 m', 'A_BC = 200 mm²', 'P_B = 15 kN', 'P_C = 10 kN'],
  result:
    'N_BC = 10 kN, N_AB = 25 kN, σ_BC = 50 MPa, σ_AB = 83,3 MPa. Największa siła i największe naprężenie występują w odcinku AB, ale to nie jest regułą. Gdyby odcinek BC miał znacznie mniejsze pole, mógłby mieć większe naprężenie mimo mniejszej siły. Dlatego po wyznaczeniu N w każdym przedziale trzeba sprawdzić iloraz |N|/A, a nie tylko największe |N|.',
  animation: MethodOfSectionsSteppedBarAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pionowy pręt jest utwierdzony górnym końcem A i składa się z dwóch odcinków. Odcinek AB ma długość 1,2 m i pole przekroju 300 mm². Odcinek BC ma długość 0,8 m i pole 200 mm². W punkcie B działa siła 15 kN w dół, a w swobodnym końcu C siła 10 kN w dół.',
      caption: 'Pręt dwuodcinkowy AB–BC z siłami 15 kN w B i 10 kN w C.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'L_{AB}=1{,}2\\ \\text{m},\\quad A_{AB}=300\\ \\text{mm}^2,\\quad L_{BC}=0{,}8\\ \\text{m},\\quad A_{BC}=200\\ \\text{mm}^2',
    },
    {
      title: 'Reakcja w utwierdzeniu',
      narration:
        'Rozpatrujemy cały pręt. Jedyną reakcją jest siła w utwierdzeniu A, skierowana w górę. Równowaga pionowa daje R_A = 15 + 10 = 25 kN.',
      caption: 'R_A = 25 kN w górę.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'R_A=15+10=25\\ \\text{kN}',
    },
    {
      title: 'Cięcie w BC: siła normalna i naprężenie',
      narration:
        'Przesuwamy przekrój w odcinek BC i zostawiamy dolną część z siłą 10 kN. Równowaga pionowa daje N_BC − 10 = 0, więc N_BC = 10 kN. Dzielimy tę siłę, czyli 10 000 N, przez pole 200 mm² i otrzymujemy σ_BC = 50 MPa.',
      caption: 'N_BC = 10 kN (rozciąganie), a σ_BC = 10 000 / 200 = 50 MPa.',
      visual: 'axial',
      focus: { metric: 'N', segment: 'bc' },
      formula:
        'N_{BC}-10=0\\quad\\Rightarrow\\quad N_{BC}=10\\ \\text{kN},\\qquad \\sigma_{BC}=\\frac{10\\,000}{200}=50\\ \\text{MPa}',
    },
    {
      title: 'Cięcie w AB: siła normalna i naprężenie',
      narration:
        'Teraz przecinamy odcinek AB i zostawiamy dolną część, która zawiera obie siły: 15 kN w B i 10 kN w C. Równowaga pionowa daje N_AB − 15 − 10 = 0, więc N_AB = 25 kN. Dzielimy 25 000 N przez pole 300 mm² i otrzymujemy σ_AB = 83,3 MPa.',
      caption: 'N_AB = 25 kN (rozciąganie), a σ_AB = 25 000 / 300 = 83,3 MPa.',
      visual: 'axial',
      focus: { metric: 'N', segment: 'ab' },
      formula:
        'N_{AB}-15-10=0\\quad\\Rightarrow\\quad N_{AB}=25\\ \\text{kN},\\qquad \\sigma_{AB}=\\frac{25\\,000}{300}=83{,}3\\ \\text{MPa}',
    },
    {
      title: 'Porównanie i kontrola równowagi',
      narration:
        'Odcinek AB ma większą siłę i większe naprężenie. Nie można jednak wnioskować tylko z siły: o naprężeniu decyduje iloraz |N|/A. Mniejszy przekrój może zrównoważyć mniejszą siłę i dać większe naprężenie. Na koniec sprawdzamy równowagę całego pręta: R_A = N_AB = 25 kN.',
      caption: 'Do oceny wytrzymałości porównuj |N|/A, a nie samo |N|; R_A = N_AB = 25 kN.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'ab' },
      formula: '|\\sigma|_{AB}=83{,}3\\ \\text{MPa}>|\\sigma|_{BC}=50\\ \\text{MPa},\\qquad R_A=N_{AB}=25\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
