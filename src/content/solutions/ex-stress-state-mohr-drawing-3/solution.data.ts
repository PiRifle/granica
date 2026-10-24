import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-mohr-drawing-3',
  title: 'Koło Mohra: narysuj je krok po kroku — przykład 3',
  duration: 7,
  given: ['σ_1 = 100 MPa', 'σ_2 = 20 MPa', 'σ_x = 80 MPa'],
  result:
    'To zadanie pokazuje, że koło opisuje wartości główne jednoznacznie, ale orientacja wymaga znaku stycznej. Sama para σ_1 i σ_2 nie mówi, po której stronie osi leży punkt X. W praktyce znak τ_xy bierzemy z konwencji zadania albo z pomiaru na określonym kierunku.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MohrDrawingExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Znamy naprężenia główne σ_1=100 MPa i σ_2=20 MPa oraz składową σ_x=80 MPa. Chcemy odtworzyć σ_y, |τ_xy| i położenie punktu X na kole. To zadanie odwrotne: od wyniku do danych.',
      caption: 'Element w osiach głównych i dane zadania odwrotnego.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_1=100\\ \\text{MPa},\\quad \\sigma_2=20\\ \\text{MPa},\\quad \\sigma_x=80\\ \\text{MPa}',
    },
    {
      title: 'Znane przecięcia z osią',
      narration:
        'Wartości główne są od razu przecięciami koła z osią naprężeń normalnych: σ_2=20 MPa i σ_1=100 MPa. Ich odległość wynosi 100−20=80 MPa i jest równa średnicy koła.',
      caption: 'Zaczynamy od znanych końców średnicy, a nie od punktów X i Y.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1-\\sigma_2=100-20=80\\ \\text{MPa}=2R',
    },
    {
      title: 'Środek i promień',
      narration:
        'Środek leży w średniej naprężeń głównych: C=(100+20)/2=60 MPa. Promień wynosi R=(100−20)/2=40 MPa. To te same parametry, które w zwykłym zadaniu wyznaczaliśmy z punktów X i Y.',
      caption: 'Parametry koła wynikają wprost z wartości głównych.',
      visual: 'cube',
      focus: { metric: 'center' },
      formula: 'C=(100+20)/2=60\\ \\text{MPa},\\quad R=(100-20)/2=40\\ \\text{MPa}',
    },
    {
      title: 'Zakreślenie koła',
      narration:
        'Rysujemy okrąg o środku C=(60,0) i promieniu 40 MPa. Przechodzi on przez oba znane przecięcia z osią, więc jego położenie jest już jednoznaczne.',
      caption: 'Koło jest w pełni określone przez parę naprężeń głównych.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '(\\sigma_n-60)^2+\\tau_{nt}^2=40^2',
    },
    {
      title: 'Punkt X i naprężenie σ_y',
      narration:
        'Z definicji średniej (σ_x+σ_y)/2=60 MPa otrzymujemy σ_y=120−80=40 MPa. Punkt X ma odciętą 80 MPa i rzędną ±34,64 MPa, bo |τ_xy|=√(40²−20²)=√1200. Znak decyduje, czy X leży nad osią, czy pod nią.',
      caption: 'Oba położenia X dają to samo koło i te same naprężenia główne.',
      visual: 'cube',
      focus: { metric: 'points' },
      formula: '\\sigma_y=120-80=40\\ \\text{MPa},\\quad |\\tau_{xy}|=\\sqrt{40^2-20^2}\\approx34{,}64\\ \\text{MPa}',
    },
    {
      title: 'Kąt kierunku głównego',
      narration:
        'Dla dodatniego τ_xy mamy cos2θ_p=20/40=0,5, więc 2θ_p=60° i θ_p=30°. Dla ujemnego τ_xy kąt zmienia znak na −30°, ale wartości główne pozostają takie same.',
      caption: 'Do orientacji potrzebna jest dodatkowa informacja o znaku τ_xy.',
      visual: 'cube',
      focus: { metric: 'angle' },
      formula: '\\cos2\\theta_p=20/40=0{,}5\\;\\Rightarrow\\ 2\\theta_p=60^\\circ,\\ \\theta_p=30^\\circ',
    },
  ],
} satisfies SolutionData
