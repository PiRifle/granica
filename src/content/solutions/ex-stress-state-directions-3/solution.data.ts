import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-directions-3',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 3',
  duration: 7,
  given: ['θ_p = 30°', 'σ_x = 100 MPa', 'σ_y = 20 MPa'],
  result:
    'Zwróć uwagę, że w tym wariancie założyliśmy, iż θ_p=30° odpowiada σ_1. To założenie jest częścią danych: bez niego ten sam zestaw wartości głównych mógłby odpowiadać kierunkowi odbitemu względem osi x.',
  figure: {
    kind: 'cube',
    stresses: { x: 100, y: 20, z: 0 },
    values: [
      { label: 'σ_x', value: '100 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '20 MPa', focus: 'stress', reveal: 0 },
      { label: 'θ_p', value: '30°', focus: 'principal', reveal: 0 },
      { label: 'τ_xy', value: '69,28 MPa', focus: 'stress' },
      { label: 'σ_avg', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '80 MPa', focus: 'stress' },
      { label: 'σ_1', value: '140 MPa', focus: 'principal' },
      { label: 'σ_2', value: '−20 MPa', focus: 'principal' },
    ],
    note: 'Kąt 30° odnosi się do kierunku σ_1; znak τ_xy zależy od przyjętego zwrotu obrotu.',
  },
  scenes: [
    {
      title: 'Dane i kierunek główny',
      narration:
        'Wiemy, że kierunek σ_1 jest obrócony o θ_p=30° od osi x, a dane są σ_x=100 MPa i σ_y=20 MPa. Chcemy znaleźć τ_xy oraz wartości główne.',
      caption: 'Zadanie odwrotne: od kierunku do brakującej składowej.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\theta_p=30^\\circ,\\quad \\sigma_x=100\\ \\text{MPa},\\quad \\sigma_y=20\\ \\text{MPa}',
    },
    {
      title: 'Tangens podwójnego kąta',
      narration:
        'Korzystamy z tan2θ_p=2τ_xy/(σ_x-σ_y). Dla θ_p=30° mamy 2θ_p=60°, więc tan60°≈1,732. Podstawiamy 1,732=2τ_xy/80, skąd τ_xy≈69,28 MPa.',
      caption: 'Kąt kierunku głównego wiąże τ_xy z różnicą naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\tan2\\theta_p=2\\tau_{xy}/(\\sigma_x-\\sigma_y)\\quad\\Rightarrow\\quad\\tau_{xy}\\approx69{,}28\\ \\text{MPa}',
    },
    {
      title: 'Wartości główne',
      narration:
        'Średnia wynosi 60 MPa, a a=40 MPa. Promień R=√(40^2+69,28^2)≈√(1600+4800)=80 MPa. Zatem σ_1=140 MPa i σ_2=-20 MPa.',
      caption: 'Wartości główne wynikają z średniej i promienia.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{avg}=60\\ \\text{MPa},\\quad R=\\sqrt{40^2+69{,}28^2}\\approx80\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie kąta',
      narration: 'cos60°=0,5 i sin60°≈0,866. Wtedy σ_n=60+40·0,5+69,28·0,866≈140 MPa, co zgadza się z σ_1.',
      caption: 'Podstawienie kąta potwierdza σ_1.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_n=60+40\\cdot0{,}5+69{,}28\\cdot0{,}866\\approx140\\ \\text{MPa}',
    },
    {
      title: 'Wpływ znaku τ_xy',
      narration:
        'Gdybyśmy przyjęli τ_xy=-69,28 MPa, kierunek byłby odbiciem lustrzanym względem osi x, a wartości główne pozostałyby takie same.',
      caption: 'Znak τ_xy zmienia orientację, ale nie wartości główne.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau_{xy}=\\pm69{,}28\\ \\text{MPa}',
    },
    {
      title: 'Informacja o kierunku',
      narration:
        'Kąt kierunku głównego i wartości główne niosą częściowo tę samą informację, ale nie są równoważne. Znając kąt i dwie składowe normalne, możemy odtworzyć styczną.',
      caption: 'Do pełnego opisu potrzebne są wartości i orientacja.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\theta_p=30^\\circ,\\quad \\sigma_x=100\\ \\text{MPa},\\quad \\sigma_y=20\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Założyliśmy, że θ_p=30° odpowiada σ_1. Bez tego założenia ten sam zestaw wartości głównych mógłby odpowiadać kierunkowi odbitemu względem osi x.',
      caption: 'W zadaniach warto podać, do którego naprężenia głównego należy kąt.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\tau_{xy}\\approx69{,}28\\ \\text{MPa},\\quad \\sigma_1=140\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa},\\quad \\theta_p=30^\\circ}',
    },
  ],
} satisfies SolutionData
