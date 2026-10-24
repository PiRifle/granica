import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tensor',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 1',
  duration: 7,
  given: ['σ_x = 120 MPa', 'σ_y = 40 MPa', 'τ_xy = 30 MPa'],
  result:
    'Trakcja wynosi około (118,9; 46,0; 0) MPa, naprężenie normalne około 126,0 MPa, a styczne około 19,6 MPa. Jednostka MPa oznacza 1 N/mm^2, więc wynik jest spójny z danymi. Kontrola σ_n^2+τ^2≈|T|^2 potwierdza rachunek.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 40, z: 0 },
    values: [
      { label: 'σ_x', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'T_x', value: '118,92 MPa', focus: 'stress' },
      { label: 'T_y', value: '45,98 MPa', focus: 'stress' },
      { label: 'σ_n', value: '125,98 MPa', focus: 'stress' },
      { label: 'τ', value: '19,6 MPa', focus: 'stress' },
    ],
    note: 'Płaski stan naprężenia: σ_z = 0; naprężenie styczne τ_xy = 30 MPa nie jest rysowane na ściankach.',
  },
  scenes: [
    {
      title: 'Tensor naprężenia',
      narration:
        'Zapisz tensor: wiersz pierwszy (120,30,0), drugi (30,40,0), trzeci (0,0,0) MPa. Macierz jest symetryczna, bo τ_xy = τ_yx.',
      caption: 'Tensor naprężenia w punkcie dla płaskiego stanu naprężenia.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=120\\ \\text{MPa},\\quad \\sigma_y=40\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Kierunek normalnej',
      narration: 'Oblicz składowe normalnej: cos 30^circ≈0,8660 oraz sin 30^circ=0,5.',
      caption: 'Normalna odchylona o 30° od osi x.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\cos 30^\\circ\\approx0{,}8660,\\quad \\sin 30^\\circ=0{,}5',
    },
    {
      title: 'Składowa T_x',
      narration: 'Trakcja w kierunku x: T_x=120·0,8660+30·0,5=103,92+15=118,92 MPa.',
      caption: 'Pierwsza składowa wektora trakcji.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'T_x=120\\cdot0{,}8660+30\\cdot0{,}5=103{,}92+15=118{,}92\\ \\text{MPa}',
    },
    {
      title: 'Składowa T_y',
      narration: 'Trakcja w kierunku y: T_y=30·0,8660+40·0,5=25,98+20=45,98 MPa.',
      caption: 'Druga składowa wektora trakcji.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'T_y=30\\cdot0{,}8660+40\\cdot0{,}5=25{,}98+20=45{,}98\\ \\text{MPa}',
    },
    {
      title: 'Składowa T_z',
      narration: 'Składowa T_z jest zerowa, bo cały trzeci wiersz i trzecia kolumna tensora są zerowe.',
      caption: 'Brak składowej trakcji w kierunku z.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'T_z=0\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie normalne',
      narration: 'Naprężenie normalne: σ_n=T_x n_x+T_y n_y=118,92·0,8660+45,98·0,5≈102,99+22,99=125,98 MPa.',
      caption: 'Rzut trakcji na normalną.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=T_x n_x+T_y n_y=118{,}92\\cdot0{,}8660+45{,}98\\cdot0{,}5\\approx125{,}98\\ \\text{MPa}',
    },
    {
      title: 'Długość trakcji',
      narration: 'Kwadrat długości trakcji: 118,92^2+45,98^2≈14142+2114=16256 MPa^2.',
      caption: 'Kwadrat długości wektora trakcji.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '118{,}92^2+45{,}98^2\\approx14142+2114=16256\\ \\text{MPa}^2',
    },
    {
      title: 'Naprężenie styczne',
      narration: 'Naprężenie styczne: τ=√(16256-125,98^2)≈√(16256-15871)≈19,6 MPa.',
      caption: 'Część styczna trakcji.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=\\sqrt{16256-125{,}98^2}\\approx19{,}6\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Trakcja wynosi około (118,9; 46,0; 0) MPa, naprężenie normalne około 126,0 MPa, a styczne około 19,6 MPa. Kontrola σ_n^2+τ^2≈|T|^2 potwierdza rachunek.',
      caption: 'Tensor pozwala wyznaczyć trakcję i jej rozkład na dowolnej płaszczyźnie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{T_x\\approx118{,}92\\ \\text{MPa},\\quad T_y\\approx45{,}98\\ \\text{MPa},\\quad \\sigma_n\\approx125{,}98\\ \\text{MPa},\\quad \\tau\\approx19{,}6\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
