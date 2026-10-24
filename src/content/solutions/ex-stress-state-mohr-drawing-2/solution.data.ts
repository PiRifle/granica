import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-mohr-drawing-2',
  title: 'Koło Mohra: narysuj je krok po kroku — przykład 2',
  duration: 7,
  given: ['σ_x = -20 MPa', 'σ_y = 60 MPa', 'τ_xy = 30 MPa'],
  result:
    'Ten przykład pokazuje, dlaczego sam tangens nie wystarcza. Funkcja arctan zwraca kąt w przedziale od -90° do 90°, a równanie na 2θ_p ma rozwiązania różniące się o 180°. Ćwiartkę trzeba ustalić z pary cos2θ_p i sin2θ_p albo przez podstawienie do wzoru na σ_n.',
  figure: {
    kind: 'cube',
    stresses: { x: -20, y: 60, z: 0 },
    values: [
      { label: 'σ_x', value: '−20 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '20 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: 'σ_1', value: '70 MPa', focus: 'principal' },
      { label: 'σ_2', value: '−30 MPa', focus: 'principal' },
      { label: 'θ_p dla σ_1', value: '71,57°', focus: 'principal' },
    ],
    note: 'Punkt X=(-20,30) i Y=(60,-30) MPa; środek koła leży w (20,0) MPa.',
  },
  scenes: [
    {
      title: 'Dane i punkty X, Y',
      narration:
        'Rozważmy stan z ujemnym naprężeniem normalnym w kierunku x: σ_x=-20 MPa, σ_y=60 MPa i τ_xy=30 MPa. Zaznaczamy X=(-20,30) i Y=(60,-30).',
      caption: 'Punkty odpowiadające ścianom x i y.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'X=(-20,30)\\ \\text{MPa},\\quad Y=(60,-30)\\ \\text{MPa}',
    },
    {
      title: 'Środek i promień',
      narration: 'Środek ma odciętą (-20+60)/2=20 MPa, a promień R=√((-40)^2+30^2)=50 MPa.',
      caption: 'Parametry koła Mohra.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'C=20\\ \\text{MPa},\\quad R=\\sqrt{(-40)^2+30^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Przecięcia z osią',
      narration: 'Przecięcia z osią poziomą to 20-50=-30 MPa i 20+50=70 MPa. Zatem σ_1=70 MPa, a σ_2=-30 MPa.',
      caption: 'Wartości główne z końców średnicy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '20-50=-30\\ \\text{MPa},\\quad 20+50=70\\ \\text{MPa}',
    },
    {
      title: 'Maksymalne ścinanie w płaszczyźnie',
      narration:
        'Maksymalne ścinanie w płaszczyźnie wynosi 50 MPa i występuje przy naprężeniu normalnym 20 MPa, czyli w najwyższym punkcie koła.',
      caption: 'Najwyższy punkt koła odpowiada τ_max.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{(xy)}=R=50\\ \\text{MPa},\\quad \\sigma=20\\ \\text{MPa}',
    },
    {
      title: 'Kąt kierunku głównego',
      narration:
        'Kąt kierunku głównego obliczamy z tan2θ_p=2·30/(-20-60)=60/(-80)=-0,75. Sam arcus tangens daje około -36,87°, ale to odpowiada naprężeniu σ_2=-30 MPa. Dla σ_1 trzeba dodać 180° do 2θ_p, otrzymując 143,13°, czyli θ_p=71,57°.',
      caption: 'Trzeba wybrać właściwą gałąź funkcji tangens.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tan2\\theta_p=2\\cdot30/(-20-60)=60/(-80)=-0{,}75',
    },
    {
      title: 'Sprawdzenie kąta',
      narration:
        'Sprawdzenie: cos143,13°=-0,8 i sin143,13°=0,6. Wtedy σ_n=20+(-40)(-0,8)+30·0,6=20+32+18=70 MPa. To potwierdza, że wybraliśmy właściwą gałąź.',
      caption: 'Drugi kierunek jest prostopadły i odpowiada σ_2=-30 MPa.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_n=20+32+18=70\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Sam tangens nie wystarcza. Funkcja arctan zwraca kąt w przedziale od -90° do 90°, a równanie na 2θ_p ma rozwiązania różniące się o 180°. Ćwiartkę trzeba ustalić z pary cos2θ_p i sin2θ_p.',
      caption: 'Koło Mohra daje wartości główne, ale kąt wymaga kontroli gałęzi.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{C=20\\ \\text{MPa},\\quad R=50\\ \\text{MPa},\\quad \\sigma_1=70\\ \\text{MPa},\\quad \\sigma_2=-30\\ \\text{MPa},\\quad \\theta_p\\approx71{,}57^\\circ}',
    },
  ],
} satisfies SolutionData
