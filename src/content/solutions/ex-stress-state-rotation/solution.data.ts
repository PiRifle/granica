import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-rotation',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 1',
  duration: 7,
  given: ['σ_x = 120 MPa', 'σ_y = 40 MPa', 'τ_xy = 30 MPa', 'θ = 30°'],
  result:
    'Na obróconym przekroju σ_n≈126,0 MPa i τ_nt≈-19,6 MPa. Na przekroju prostopadłym σ_t≈34,0 MPa. Znak minus oznacza kierunek działania stycznej w przyjętym układzie, a nie „ujemne ścinanie” w sensie fizycznym. Suma naprężeń normalnych pozostaje równa 160 MPa.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 40, z: 0 },
    values: [
      { label: 'σ_x', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'θ', value: '30°', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '80 MPa', focus: 'stress' },
      { label: 'a', value: '40 MPa', focus: 'stress' },
      { label: 'σ_n', value: '125,98 MPa', focus: 'stress' },
      { label: 'τ_nt', value: '−19,64 MPa', focus: 'stress' },
      { label: 'σ_t', value: '34,02 MPa', focus: 'stress' },
    ],
    note: 'Stan naprężenia przed obrotem; oś n tworzy z osią x kąt 30°.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Dany jest stan naprężenia σ_x=120 MPa, σ_y=40 MPa i τ_xy=30 MPa. Przekrój obracamy o θ=30°, szukając naprężeń normalnych i stycznych na nowej płaszczyźnie.',
      caption: 'Stan wyjściowy i kąt obrotu przekroju.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=120\\ \\text{MPa},\\quad \\sigma_y=40\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\theta=30^\\circ',
    },
    {
      title: 'Średnia naprężeń',
      narration: 'Oblicz średnią: σ_avg=(120+40)/2=80 MPa.',
      caption: 'Średnia naprężeń normalnych jest niezmiennikiem obrotu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=(120+40)/2=80\\ \\text{MPa}',
    },
    {
      title: 'Połowa różnicy',
      narration: 'Oblicz połowę różnicy: a=(120-40)/2=40 MPa.',
      caption: 'Połowa różnicy naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'a=(120-40)/2=40\\ \\text{MPa}',
    },
    {
      title: 'Funkcje podwójnego kąta',
      narration: 'Dla θ=30° mamy 2θ=60°, więc cos60°=0,5 i sin60°≈0,8660.',
      caption: 'Wartości funkcji trygonometrycznych dla podwójnego kąta.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '2\\theta=60^\\circ,\\quad \\cos60^\\circ=0{,}5,\\quad \\sin60^\\circ\\approx0{,}8660',
    },
    {
      title: 'Naprężenie normalne',
      narration: 'Naprężenie normalne: σ_n=80+40·0,5+30·0,8660=80+20+25,98=125,98 MPa.',
      caption: 'Naprężenie normalne na obróconej płaszczyźnie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=80+40\\cdot0{,}5+30\\cdot0{,}8660=125{,}98\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie styczne',
      narration: 'Naprężenie styczne: τ_nt=-40·0,8660+30·0,5=-34,64+15=-19,64 MPa.',
      caption: 'Znak stycznej zależy od przyjętego układu.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau_{nt}=-40\\cdot0{,}8660+30\\cdot0{,}5=-19{,}64\\ \\text{MPa}',
    },
    {
      title: 'Przekrój prostopadły',
      narration: 'Naprężenie na przekroju prostopadłym: σ_t=160-125,98=34,02 MPa.',
      caption: 'Suma naprężeń normalnych na dwóch prostopadłych przekrojach jest stała.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_t=160-125{,}98=34{,}02\\ \\text{MPa}',
    },
    {
      title: 'Kontrola sumy',
      narration: 'Sprawdź sumę: 125,98+34,02=160 MPa, co zgadza się z 120+40.',
      caption: 'Niezmiennik śladu tensora.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '125{,}98+34{,}02=160\\ \\text{MPa}=120+40',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Na obróconym przekroju σ_n≈126,0 MPa i τ_nt≈-19,6 MPa, a na prostopadłym σ_t≈34,0 MPa. Znak minus oznacza kierunek działania stycznej w przyjętym układzie.',
      caption: 'Obrót zmienia składowe, ale nie zmienia stanu naprężenia.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_n\\approx125{,}98\\ \\text{MPa},\\quad \\tau_{nt}\\approx-19{,}64\\ \\text{MPa},\\quad \\sigma_t\\approx34{,}02\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
