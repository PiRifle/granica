import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-directions',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 1',
  duration: 7,
  given: ['σ_x = 100 MPa', 'σ_y = 20 MPa', 'τ_xy = 30 MPa'],
  result:
    'Kierunek σ_1=110 MPa jest obrócony o około 18,44° od osi x; kierunek σ_2=10 MPa jest do niego prostopadły i leży pod kątem około 108,44°. Na obu płaszczyznach głównych τ=0. Kąt 18,44° jest najmniejszym dodatnim kątem kierunku głównego w tym zadaniu.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StressStateDirectionsAnimation }))),
  figure: {
    kind: 'cube',
    stresses: { x: 100, y: 20, z: 0 },
    values: [
      { label: 'σ_x', value: '100 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '20 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: 'σ_1', value: '110 MPa', focus: 'principal' },
      { label: 'σ_2', value: '10 MPa', focus: 'principal' },
      { label: 'θ_p1', value: '18,44°', focus: 'principal' },
      { label: 'θ_p2', value: '108,44°', focus: 'principal' },
    ],
    note: 'Płaszczyzny główne są obrócone o 18,44° i 108,44° względem osi x.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Dany jest płaski stan naprężenia: σ_x=100 MPa, σ_y=20 MPa i τ_xy=30 MPa. Na ściankach elementu widzimy naprężenia normalne i styczne; szukamy kierunku n, na którym τ_nt znika.',
      caption: 'Element z danymi składowymi; osie x i y są układem odniesienia.',
      visual: 'cube',
      focus: { metric: 'given' },
      formula: '\\sigma_x=100\\ \\text{MPa},\\quad \\sigma_y=20\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Obrót i zanik ścinania',
      narration:
        'Obracamy płaszczyznę o kąt θ i śledzimy τ_nt=-a\\sin2θ+τ_xy\\cos2θ. Przy θ=0 ścinanie wynosi 30 MPa; maleje do zera, gdy 2θ osiąga 36,87°.',
      caption: 'Strzałka τ_nt kurczy się do zera, a punkt na kole Mohra dochodzi do osi σ.',
      visual: 'cube',
      focus: { metric: 'search' },
      formula: '\\tau_{nt}=-40\\sin2\\theta+30\\cos2\\theta',
    },
    {
      title: 'Kąt kierunku głównego',
      narration:
        'Warunek τ_nt=0 daje tan2θ_p=60/80=0,75, więc 2θ_p≈36,87° i θ_p≈18,44°. Kąt na kole Mohra jest podwojony względem kąta w materiale.',
      caption: '2θ_p≈36,87° na kole odpowiada θ_p≈18,44° na elemencie.',
      visual: 'cube',
      focus: { metric: 'angle' },
      formula:
        '\\tan2\\theta_p=\\frac{2\\cdot30}{100-20}=0{,}75\\quad\\Rightarrow\\quad\\theta_p\\approx18{,}44^\\circ',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Średnia wynosi 60 MPa, a promień R=√(40²+30²)=50 MPa. Na kierunkach głównych działają więc σ_1=60+50=110 MPa i σ_2=60−50=10 MPa, a ścinanie znika.',
      caption: 'Element obrócony do kierunków głównych: tylko naprężenia normalne σ_1 i σ_2.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{avg}=60\\ \\text{MPa},\\quad R=50\\ \\text{MPa},\\quad \\sigma_1=110\\ \\text{MPa},\\quad \\sigma_2=10\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie naprężenia normalnego',
      narration:
        'Podstawiamy θ_p=18,44°: cos36,87°≈0,8 i sin36,87°≈0,6. Wtedy σ_n=60+40·0,8+30·0,6=110 MPa, czyli σ_1. To potwierdza wybór właściwej gałęzi kąta.',
      caption: 'Na kierunku θ_p1 naprężenie normalne osiąga σ_1, a τ_nt=0.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_n=60+40\\cdot0{,}8+30\\cdot0{,}6=110\\ \\text{MPa},\\qquad \\tau_{nt}=0',
    },
    {
      title: 'Drugi kierunek główny',
      narration:
        'Drugi kierunek jest prostopadły: θ_p2=18,44°+90°=108,44°. Odpowiada mu σ_2=10 MPa, a na tej płaszczyźnie również τ=0.',
      caption: 'Kierunki główne są prostopadłe; oba leżą na przecięciach koła Mohra z osią σ.',
      visual: 'cube',
      focus: { metric: 'second' },
      formula: '\\theta_{p2}=18{,}44^\\circ+90^\\circ=108{,}44^\\circ,\\qquad \\tau_{nt}=0',
    },
  ],
} satisfies SolutionData
