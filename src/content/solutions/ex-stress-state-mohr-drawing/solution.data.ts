import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-mohr-drawing',
  title: 'Koło Mohra: narysuj je krok po kroku — przykład 1',
  duration: 7,
  given: ['σ_x = 90 MPa', 'σ_y = 30 MPa', 'τ_xy = 40 MPa'],
  result:
    'Koło ma środek (60,0) MPa i promień 50 MPa. Daje σ_1=110 MPa, σ_2=10 MPa oraz płaskie τ_max=50 MPa. Kierunek większego naprężenia głównego jest obrócony o około 26,6° od osi x.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MohrDrawingExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Na ścianach elementu działają σ_x=90 MPa, σ_y=30 MPa i τ_xy=40 MPa. Zaczynamy od danych i pustego układu σ–τ; koła nie rysujemy „na oko”, bo wtedy łatwo przesunąć średnicę.',
      caption: 'Dane zadania i element o ścianach prostopadłych do osi x i y.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=90\\ \\text{MPa},\\quad \\sigma_y=30\\ \\text{MPa},\\quad \\tau_{xy}=40\\ \\text{MPa}',
    },
    {
      title: 'Punkty X i Y',
      narration:
        'Na wykresie zaznaczamy X=(90,40) MPa i Y=(30,-40) MPa. Rzędne mają przeciwne znaki, bo punkty reprezentują dwie prostopadłe ściany, a ich średnia rzędna musi wynosić zero.',
      caption: 'Dwa punkty wyznaczają średnicę koła.',
      visual: 'cube',
      focus: { metric: 'points' },
      formula: 'X=(90,40)\\ \\text{MPa},\\quad Y=(30,-40)\\ \\text{MPa}',
    },
    {
      title: 'Środek i promień',
      narration:
        'Środek to środek odcinka XY: C=((90+30)/2,0)=(60,0) MPa. Promień liczymy z trójkąta o przyprostokątnych a=30 MPa i τ_xy=40 MPa: R=√(30²+40²)=50 MPa.',
      caption: 'Środek leży na osi naprężeń normalnych, a promień wynika z trójkąta C–X.',
      visual: 'cube',
      focus: { metric: 'center' },
      formula: 'C=(60,0)\\ \\text{MPa},\\quad R=\\sqrt{30^2+40^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Zakreślenie koła',
      narration:
        'Okrąg o środku C i promieniu R przechodzi przez X i Y. Rysujemy go dopiero po ustaleniu średnicy, dzięki czemu środek i promień nie przesuwają się w trakcie kreślenia.',
      caption: 'Koło Mohra przechodzi przez oba punkty pomiarowe.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '(\\sigma_n-60)^2+\\tau_{nt}^2=50^2',
    },
    {
      title: 'Przecięcia z osią',
      narration:
        'Na przecięciu z osią poziomą τ=0, więc σ=60±50 MPa. Otrzymujemy σ_2=10 MPa i σ_1=110 MPa. Najwyższy punkt koła ma rzędną R=50 MPa, ale jego odcięta to 60 MPa, a nie σ_1.',
      caption: 'Przecięcia z osią dają naprężenia główne, a nie maksymalne ścinanie.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{1,2}=60\\pm50\\ \\text{MPa}\\;\\Rightarrow\\ \\sigma_1=110\\ \\text{MPa},\\ \\sigma_2=10\\ \\text{MPa}',
    },
    {
      title: 'Maksymalne ścinanie i kąt',
      narration:
        'Płaskie maksimum ścinania to promień koła: τ_max=50 MPa przy σ=60 MPa. Kąt od osi σ do promienia CX wynosi 2θ_p=53,13°, więc kierunek σ_1 jest obrócony o θ_p≈26,57°.',
      caption: 'Kąt na kole jest podwojony względem kąta fizycznego.',
      visual: 'cube',
      focus: { metric: 'angle' },
      formula:
        '\\tau_{\\max}^{(xy)}=R=50\\ \\text{MPa},\\quad 2\\theta_p=53{,}13^\\circ\\;\\Rightarrow\\ \\theta_p\\approx26{,}57^\\circ',
    },
  ],
} satisfies SolutionData
