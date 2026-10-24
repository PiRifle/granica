import type { SolutionData } from '../../model'
import { MohrDrawingExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-mohr-drawing-2',
  title: 'Koło Mohra: narysuj je krok po kroku — przykład 2',
  duration: 7,
  given: ['σ_x = -20 MPa', 'σ_y = 60 MPa', 'τ_xy = 30 MPa'],
  result:
    'Ten przykład pokazuje, dlaczego sam tangens nie wystarcza. Funkcja arctan zwraca kąt w przedziale od -90° do 90°, a równanie na 2θ_p ma rozwiązania różniące się o 180°. Ćwiartkę trzeba ustalić z pary cos2θ_p i sin2θ_p albo przez podstawienie do wzoru na σ_n.',
  animation: MohrDrawingExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Rozważamy stan z ujemnym naprężeniem normalnym w kierunku x: σ_x=−20 MPa, σ_y=60 MPa i τ_xy=30 MPa. Ujemne σ_x oznacza ściskanie, więc strzałka na ścianie x jest skierowana do elementu.',
      caption: 'Dane zadania; zwróć uwagę na znak σ_x.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=-20\\ \\text{MPa},\\quad \\sigma_y=60\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Punkty X i Y',
      narration:
        'Zaznaczamy X=(−20,30) MPa i Y=(60,−30) MPa. Punkt X leży teraz po lewej stronie osi τ, bo naprężenie normalne jest ujemne. Oba punkty nadal mają przeciwne rzędne.',
      caption: 'Punkty odpowiadające ścianom x i y.',
      visual: 'cube',
      focus: { metric: 'points' },
      formula: 'X=(-20,30)\\ \\text{MPa},\\quad Y=(60,-30)\\ \\text{MPa}',
    },
    {
      title: 'Środek i promień',
      narration:
        'Środek ma odciętą (−20+60)/2=20 MPa. Połowa różnicy naprężeń normalnych wynosi a=−40 MPa, a promień R=√((−40)²+30²)=50 MPa.',
      caption: 'Parametry koła Mohra.',
      visual: 'cube',
      focus: { metric: 'center' },
      formula: 'C=(20,0)\\ \\text{MPa},\\quad R=\\sqrt{(-40)^2+30^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Zakreślenie koła',
      narration:
        'Koło o środku C=(20,0) i promieniu 50 MPa przechodzi przez X i Y. Mimo przesunięcia środka w lewo od początku układu konstrukcja pozostaje taka sama.',
      caption: 'Okrąg przechodzi przez oba punkty i przecina oś σ.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '(\\sigma_n-20)^2+\\tau_{nt}^2=50^2',
    },
    {
      title: 'Przecięcia z osią',
      narration:
        'Przecięcia z osią poziomą to 20−50=−30 MPa i 20+50=70 MPa. Zatem σ_1=70 MPa, a σ_2=−30 MPa. Najwyższy punkt koła daje τ_max=50 MPa przy σ=20 MPa.',
      caption: 'Wartości główne z końców średnicy; τ_max to rzędna, nie odcięta.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{1,2}=20\\pm50\\ \\text{MPa}\\ \\Rightarrow\\ \\sigma_1=70\\ \\text{MPa},\\ \\sigma_2=-30\\ \\text{MPa}',
    },
    {
      title: 'Właściwa gałąź kąta',
      narration:
        'Z tan2θ_p=60/(−80)=−0,75 sam arctan daje −36,87°, ale to kierunek σ_2. Dla σ_1 dodajemy 180°: 2θ_p=143,13°, więc θ_p≈71,57°. Ćwiartkę potwierdza para cos i sin.',
      caption: 'Kąt na kole jest podwojony; trzeba wybrać właściwą gałąź funkcji tangens.',
      visual: 'cube',
      focus: { metric: 'angle' },
      formula: '2\\theta_p=-36{,}87^\\circ+180^\\circ=143{,}13^\\circ\\ \\Rightarrow\\ \\theta_p\\approx71{,}57^\\circ',
    },
  ],
} satisfies SolutionData
