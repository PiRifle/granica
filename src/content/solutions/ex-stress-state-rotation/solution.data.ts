import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-rotation',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 1',
  duration: 7,
  given: ['σ_x = 120 MPa', 'σ_y = 40 MPa', 'τ_xy = 30 MPa', 'θ = 30°'],
  result:
    'Na obróconym przekroju σ_n≈126,0 MPa i τ_nt≈-19,6 MPa. Na przekroju prostopadłym σ_t≈34,0 MPa. Znak minus oznacza kierunek działania stycznej w przyjętym układzie, a nie „ujemne ścinanie” w sensie fizycznym. Suma naprężeń normalnych pozostaje równa 160 MPa.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StressRotationExample1Animation }))),
  scenes: [
    {
      title: 'Stan wyjściowy',
      narration:
        'Dany jest stan naprężenia σ_x=120 MPa, σ_y=40 MPa i τ_xy=30 MPa. Na ściankach elementu działają dodatnie naprężenia normalne i styczne. Przekrój będziemy obracać o θ=30°.',
      caption: 'Model i dane: stan naprężenia przed obrotem układu.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma_x=120\\ \\text{MPa},\\quad \\sigma_y=40\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\theta=30^\\circ',
    },
    {
      title: 'Obrót płaszczyzny o 30°',
      narration:
        'Obracamy układ odniesienia, a nie materiał. Normalna n nowego przekroju tworzy z osią x kąt θ=30°, a kierunek styczny t jest obrócony o 90°. Płaszczyzna przekroju jest prostopadła do n.',
      caption: 'Obrót płaszczyzny zmienia kierunek, na którym rozkładamy ten sam stan.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '2\\theta=60^\\circ,\\quad \\cos60^\\circ=0{,}5,\\quad \\sin60^\\circ\\approx0{,}8660',
    },
    {
      title: 'Składowe na obróconym przekroju',
      narration:
        'Naprężenie normalne: σ_n=80+40·0,5+30·0,8660=125,98 MPa. Styczne: τ_nt=-40·0,8660+30·0,5=-19,64 MPa. Na przekroju prostopadłym σ_t=160-125,98=34,02 MPa.',
      caption: 'Te same siły wewnętrzne, ale inne składowe na nowych ścianach.',
      visual: 'cube',
      focus: { metric: 'components' },
      formula:
        '\\sigma_n=125{,}98\\ \\text{MPa},\\quad \\tau_{nt}=-19{,}64\\ \\text{MPa},\\quad \\sigma_t=34{,}02\\ \\text{MPa}',
    },
    {
      title: 'Średnia i amplituda',
      narration:
        'Średnia naprężeń normalnych wynosi σ_avg=(120+40)/2=80 MPa, a połowa różnicy a=(120-40)/2=40 MPa. To one opisują środek i promień koła Mohra, dlatego obrót zmienia tylko położenie punktu na okręgu.',
      caption: 'Rozkład na wartość średnią i amplitudę porządkuje rachunek.',
      visual: 'cube',
      focus: { metric: 'decompose' },
      formula: '\\sigma_{avg}=(120+40)/2=80\\ \\text{MPa},\\qquad a=(120-40)/2=40\\ \\text{MPa}',
    },
    {
      title: 'Kontrola niezmiennika',
      narration:
        'Sprawdź sumę: 125,98+34,02=160 MPa, co zgadza się z 120+40. Obrót zmienia składowe, ale nie zmienia śladu tensora ani stanu fizycznego materiału.',
      caption: 'Suma naprężeń normalnych na dwóch prostopadłych przekrojach jest stała.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '125{,}98+34{,}02=160\\ \\text{MPa}=120+40',
    },
  ],
} satisfies SolutionData
