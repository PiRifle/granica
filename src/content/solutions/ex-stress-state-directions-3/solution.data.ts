import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-directions-3',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 3',
  duration: 7,
  given: ['θ_p = 30°', 'σ_x = 100 MPa', 'σ_y = 20 MPa'],
  result:
    'Zwróć uwagę, że w tym wariancie założyliśmy, iż θ_p=30° odpowiada σ_1. To założenie jest częścią danych: bez niego ten sam zestaw wartości głównych mógłby odpowiadać kierunkowi odbitemu względem osi x.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StressStateDirectionsExample3Animation })),
  ),
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
        'Wiemy, że kierunek σ_1 jest obrócony o θ_p=30° od osi x, a dane są σ_x=100 MPa i σ_y=20 MPa. Brakuje τ_xy oraz wartości głównych; to zadanie odwrotne.',
      caption: 'Znane są dwie składowe normalne i orientacja kierunku głównego; τ_xy jest niewiadome.',
      visual: 'cube',
      focus: { metric: 'given' },
      formula:
        '\\theta_p=30^\\circ,\\quad \\sigma_x=100\\ \\text{MPa},\\quad \\sigma_y=20\\ \\text{MPa},\\quad \\tau_{xy}=?',
    },
    {
      title: 'Tangens podwójnego kąta',
      narration:
        'Dla θ_p=30° mamy 2θ_p=60° i tan60°≈1,732. Z wzoru tan2θ_p=2τ_xy/(σ_x−σ_y) otrzymujemy 1,732=2τ_xy/80, skąd τ_xy≈69,28 MPa. Na kole promień rośnie, a punkt A przesuwa się po prostej σ=σ_x.',
      caption: 'Brakujące ścinanie wynika z danego kąta: τ_xy=a·tan2θ_p.',
      visual: 'cube',
      focus: { metric: 'solve' },
      formula:
        '\\tan60^\\circ=\\frac{2\\tau_{xy}}{100-20}\\quad\\Rightarrow\\quad\\tau_{xy}\\approx69{,}28\\ \\text{MPa}',
    },
    {
      title: 'Wartości główne',
      narration:
        'Średnia wynosi 60 MPa, a a=40 MPa. Promień R=√(40²+69,28²)≈80 MPa, więc σ_1=60+80=140 MPa i σ_2=60−80=−20 MPa.',
      caption: 'Koło Mohra ma środek w σ_avg=60 MPa i promień R=80 MPa.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{avg}=60\\ \\text{MPa},\\quad R=\\sqrt{40^2+69{,}28^2}\\approx80\\ \\text{MPa},\\quad \\sigma_1=140\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie kąta',
      narration:
        'cos60°=0,5 i sin60°≈0,866. Wtedy σ_n=60+40·0,5+69,28·0,866≈140 MPa, czyli σ_1, a τ_nt=0. Kąt 30° rzeczywiście wskazuje kierunek większego naprężenia głównego.',
      caption: 'Na kierunku θ_p=30° naprężenie normalne osiąga σ_1, a τ_nt znika.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_n=60+40\\cdot0{,}5+69{,}28\\cdot0{,}866\\approx140\\ \\text{MPa},\\qquad \\tau_{nt}=0',
    },
    {
      title: 'Wpływ znaku τ_xy',
      narration:
        'Gdyby τ_xy=−69,28 MPa, kierunek główny byłby odbiciem lustrzanym względem osi x, czyli θ_p≈−30°. Wartości główne pozostałyby takie same: 140 MPa i −20 MPa.',
      caption: 'Znak τ_xy zmienia orientację kierunku, ale nie wartości główne.',
      visual: 'cube',
      focus: { metric: 'sign' },
      formula: '\\tau_{xy}=\\pm69{,}28\\ \\text{MPa}\\quad\\Rightarrow\\quad\\theta_p=\\pm30^\\circ',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Odtworzyliśmy brakującą składową z orientacji: τ_xy≈69,28 MPa, σ_1=140 MPa, σ_2=−20 MPa, a kierunek σ_1 leży pod kątem 30° od osi x. Kąt i wartości niosą część wspólnej informacji, ale nie są równoważne.',
      caption: 'Do pełnego opisu stanu potrzebne są zarówno wartości, jak i orientacja.',
      visual: 'cube',
      focus: { metric: 'result' },
      formula:
        '\\boxed{\\tau_{xy}\\approx69{,}28\\ \\text{MPa},\\quad \\sigma_1=140\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa},\\quad \\theta_p=30^\\circ}',
    },
  ],
} satisfies SolutionData
