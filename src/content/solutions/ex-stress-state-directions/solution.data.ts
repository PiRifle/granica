import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-directions',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 1',
  duration: 7,
  given: ['σ_x = 100 MPa', 'σ_y = 20 MPa', 'τ_xy = 30 MPa'],
  result:
    'Kierunek σ_1=110 MPa jest obrócony o około 18,44° od osi x; kierunek σ_2=10 MPa jest do niego prostopadły i leży pod kątem około 108,44°. Na obu płaszczyznach głównych τ=0. Kąt 18,44° jest najmniejszym dodatnim kątem kierunku głównego w tym zadaniu.',
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
        'Dany jest płaski stan naprężenia: σ_x=100 MPa, σ_y=20 MPa i τ_xy=30 MPa. Szukamy kierunków, na których znika ścinanie.',
      caption: 'Tensor naprężenia i poszukiwanie kierunków głównych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=100\\ \\text{MPa},\\quad \\sigma_y=20\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Średnia i połowa różnicy',
      narration: 'Oblicz σ_avg=(100+20)/2=60 MPa oraz a=(100-20)/2=40 MPa.',
      caption: 'Parametry koła Mohra.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=(100+20)/2=60\\ \\text{MPa},\\quad a=(100-20)/2=40\\ \\text{MPa}',
    },
    {
      title: 'Równanie na kąt',
      narration: 'Równanie na kąt: tan2θ_p=2·30/(100-20)=60/80=0,75.',
      caption: 'Tangens podwójnego kąta kierunku głównego.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tan2\\theta_p=2\\cdot30/(100-20)=60/80=0{,}75',
    },
    {
      title: 'Kąt kierunku głównego',
      narration: 'Jedno rozwiązanie to 2θ_p≈36,87°, więc θ_p≈18,44°.',
      caption: 'Najmniejszy dodatni kąt kierunku głównego.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '2\\theta_p\\approx36{,}87^\\circ\\quad\\Rightarrow\\quad\\theta_p\\approx18{,}44^\\circ',
    },
    {
      title: 'Naprężenia główne',
      narration: 'Promień: R=√(40^2+30^2)=50 MPa, więc σ_1=60+50=110 MPa i σ_2=60-50=10 MPa.',
      caption: 'Wartości naprężeń głównych.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        'R=\\sqrt{40^2+30^2}=50\\ \\text{MPa},\\quad \\sigma_1=110\\ \\text{MPa},\\quad \\sigma_2=10\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie kąta',
      narration: 'Sprawdzenie przez podstawienie: cos36,87°≈0,8 i sin36,87°≈0,6.',
      caption: 'Funkcje trygonometryczne podwójnego kąta.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\cos36{,}87^\\circ\\approx0{,}8,\\quad \\sin36{,}87^\\circ\\approx0{,}6',
    },
    {
      title: 'Naprężenie normalne na kierunku głównym',
      narration: 'σ_n=60+40·0,8+30·0,6=60+32+18=110 MPa. To potwierdza, że wybrany kąt daje większe naprężenie główne.',
      caption: 'Naprężenie normalne osiąga σ_1.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_n=60+40\\cdot0{,}8+30\\cdot0{,}6=110\\ \\text{MPa}',
    },
    {
      title: 'Drugi kierunek główny',
      narration: 'Drugi kierunek: θ_p2=18,44°+90°=108,44°, z naprężeniem σ_2=10 MPa.',
      caption: 'Kierunki główne są prostopadłe.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\theta_{p2}=18{,}44^\\circ+90^\\circ=108{,}44^\\circ',
    },
    {
      title: 'Zanik ścinania',
      narration: 'Sprawdź τ_nt dla θ_p1: -40·0,6+30·0,8=-24+24=0.',
      caption: 'Na kierunku głównym naprężenie styczne znika.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{nt}=-40\\cdot0{,}6+30\\cdot0{,}8=0',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Kierunek σ_1 jest obrócony o 18,44° od osi x, a kierunek σ_2 jest do niego prostopadły. Na obu płaszczyznach głównych τ=0.',
      caption: 'Kierunki główne wyznaczają płaszczyzny bez ścinania.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_1=110\\ \\text{MPa},\\quad \\sigma_2=10\\ \\text{MPa},\\quad \\theta_{p1}\\approx18{,}44^\\circ,\\quad \\tau=0}',
    },
  ],
} satisfies SolutionData
