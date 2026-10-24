import type { SolutionData } from '../../model'
import { StressStateDirectionsExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-directions-2',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 2',
  duration: 7,
  given: ['σ_x = 80 MPa', 'σ_y = 0', 'τ_xy = 40 MPa'],
  result:
    'Płaszczyzny maksymalnego ścinania leżą pod kątem 45° od kierunków głównych. W tym przykładzie kierunki główne to 22,5° i 112,5°, więc maksymalne ścinanie występuje wokół 67,5°. To nie jest ten sam kierunek co największe rozciąganie.',
  animation: StressStateDirectionsExample2Animation,
  figure: {
    kind: 'cube',
    stresses: { x: 80, y: 0, z: 0 },
    values: [
      { label: 'σ_x', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '40 MPa', focus: 'stress' },
      { label: 'R', value: '56,57 MPa', focus: 'stress' },
      { label: 'σ_1', value: '96,57 MPa', focus: 'principal' },
      { label: 'σ_2', value: '−16,57 MPa', focus: 'principal' },
      { label: 'θ_p', value: '22,5°', focus: 'principal' },
      { label: 'θ_τmax', value: '67,5°', focus: 'principal' },
    ],
    note: 'Duże ścinanie obraca kierunki główne względem osi x mimo zerowego σ_y.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Rozważamy σ_x=80 MPa, σ_y=0 i τ_xy=40 MPa. Mimo zerowego naprężenia normalnego w kierunku y stan zawiera duże ścinanie, które obraca kierunki główne względem osi x.',
      caption: 'Płaski stan naprężenia z σ_y = 0; o orientacji decyduje ścinanie.',
      visual: 'cube',
      focus: { metric: 'given' },
      formula: '\\sigma_x=80\\ \\text{MPa},\\quad \\sigma_y=0,\\quad \\tau_{xy}=40\\ \\text{MPa}',
    },
    {
      title: 'Obrót do zera ścinania',
      narration:
        'Obracamy płaszczyznę i śledzimy τ_nt. Przy θ=0 działa pełne τ_xy=40 MPa; wraz z obrotem ścinanie maleje i znika przy 2θ=45°. Na kole punkt wędruje do osi σ.',
      caption: 'τ_nt maleje od 40 MPa do zera, a punkt na kole Mohra dochodzi do osi σ.',
      visual: 'cube',
      focus: { metric: 'search' },
      formula: '\\tau_{nt}=-40\\sin2\\theta+40\\cos2\\theta',
    },
    {
      title: 'Kąt kierunku głównego',
      narration:
        'Z warunku τ_nt=0 otrzymujemy tan2θ_p=2·40/(80−0)=1, więc 2θ_p=45° i θ_p=22,5°. Drugie rozwiązanie 2θ_p=225° daje θ_p=112,5°, czyli ten sam kierunek prostopadły.',
      caption: '2θ_p=45° na kole odpowiada θ_p=22,5° na elemencie; drugi kierunek jest o 90° dalej.',
      visual: 'cube',
      focus: { metric: 'angle' },
      formula: '\\tan2\\theta_p=\\frac{2\\cdot40}{80-0}=1\\quad\\Rightarrow\\quad\\theta_p=22{,}5^\\circ',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Średnia wynosi 40 MPa, a promień R=√(40²+40²)≈56,57 MPa. Naprężenia główne to σ_1≈96,57 MPa i σ_2≈−16,57 MPa. Na kierunkach głównych nie ma ścinania.',
      caption: 'Element obrócony o 22,5°: tylko naprężenia normalne σ_1 i σ_2.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{avg}=40\\ \\text{MPa},\\quad R=\\sqrt{40^2+40^2}\\approx56{,}57\\ \\text{MPa},\\quad \\sigma_1\\approx96{,}57\\ \\text{MPa},\\quad \\sigma_2\\approx-16{,}57\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie kierunku',
      narration:
        'Dla θ_p=22,5° mamy 2θ_p=45°, więc cos45°=sin45°≈0,7071. Stąd σ_n=40+40·0,7071+40·0,7071≈96,57 MPa, czyli σ_1. Drugi kierunek θ_p2=112,5° daje σ_2≈−16,57 MPa i również τ_nt=0.',
      caption: 'Podstawienie potwierdza σ_1; na obu płaszczyznach głównych τ_nt=0.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_n=40+40\\cdot0{,}7071+40\\cdot0{,}7071\\approx96{,}57\\ \\text{MPa},\\qquad \\tau_{nt}=0',
    },
    {
      title: 'Maksymalne ścinanie',
      narration:
        'Płaszczyzny maksymalnego ścinania są obrócone o 45° od kierunków głównych: θ_τmax=22,5°+45°=67,5°. Wartość τ_max=R≈56,57 MPa, a naprężenie normalne na tej płaszczyźnie jest równe średniej 40 MPa.',
      caption: 'Kierunek maksymalnego ścinania nie pokrywa się z kierunkiem największego rozciągania.',
      visual: 'cube',
      focus: { metric: 'taumax' },
      formula:
        '\\theta_{\\tau\\max}=22{,}5^\\circ+45^\\circ=67{,}5^\\circ,\\qquad \\tau_{\\max}=R\\approx56{,}57\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
