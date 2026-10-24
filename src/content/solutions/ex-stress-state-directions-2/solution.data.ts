import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-directions-2',
  title: 'Kierunki główne: gdzie znika ścinanie — przykład 2',
  duration: 7,
  given: ['σ_x = 80 MPa', 'σ_y = 0', 'τ_xy = 40 MPa'],
  result:
    'Płaszczyzny maksymalnego ścinania leżą pod kątem 45° od kierunków głównych. W tym przykładzie kierunki główne to 22,5° i 112,5°, więc maksymalne ścinanie występuje wokół 67,5°. To nie jest ten sam kierunek co największe rozciąganie.',
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
        'Rozważmy σ_x=80 MPa, σ_y=0 i τ_xy=40 MPa. To stan z dużym udziałem ścinania, mimo że naprężenie normalne w kierunku y jest zerowe.',
      caption: 'Płaski stan naprężenia z σ_y = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=80\\ \\text{MPa},\\quad \\sigma_y=0,\\quad \\tau_{xy}=40\\ \\text{MPa}',
    },
    {
      title: 'Kąt kierunku głównego',
      narration: 'Wtedy tan2θ_p=2·40/(80-0)=80/80=1, więc 2θ_p=45° i θ_p=22,5°.',
      caption: 'Kierunek główny odchyla się od osi x o 22,5°.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tan2\\theta_p=2\\cdot40/(80-0)=1\\quad\\Rightarrow\\quad\\theta_p=22{,}5^\\circ',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Średnia wynosi 40 MPa, a promień R=√(40^2+40^2)≈56,57 MPa. Naprężenia główne to około 96,57 MPa i -16,57 MPa.',
      caption: 'Wartości główne przy dużym ścinaniu.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{avg}=40\\ \\text{MPa},\\quad R=\\sqrt{40^2+40^2}\\approx56{,}57\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie pierwszego kierunku',
      narration:
        'cos45°=sin45°≈0,7071. Stąd σ_n=40+40·0,7071+40·0,7071≈96,57 MPa, czyli σ_1. Drugi kierunek jest o 90° dalej i daje σ_2=-16,57 MPa.',
      caption: 'Podstawienie potwierdza wartość σ_1.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\cos45^\\circ=\\sin45^\\circ\\approx0{,}7071,\\quad \\sigma_n\\approx96{,}57\\ \\text{MPa}',
    },
    {
      title: 'Drugie rozwiązanie kąta',
      narration:
        'Drugie rozwiązanie równania na tangens to 2θ_p=225°, czyli θ_p=112,5°. Odejmując 90°, wracamy do kąta 22,5°; oba kąty opisują tę samą parę osi głównych.',
      caption: 'Kąty różniące się o 90° opisują tę samą parę osi.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '2\\theta_p=225^\\circ\\quad\\Rightarrow\\quad\\theta_p=112{,}5^\\circ',
    },
    {
      title: 'Zakres raportowania kąta',
      narration:
        'Gdyby zadanie wymagało podania kąta w przedziale od 0 do 90°, wybralibyśmy 22,5°, a nie 112,5°. To nie zmienia stanu, tylko sposób raportowania.',
      caption: 'Warto podać oba kąty albo informację, że drugi jest prostopadły.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '0^\\circ<22{,}5^\\circ<90^\\circ',
    },
    {
      title: 'Maksymalne ścinanie',
      narration:
        'Płaszczyzny maksymalnego ścinania leżą pod kątem 45° od kierunków głównych. Dla kierunków 22,5° i 112,5° maksymalne ścinanie występuje wokół 67,5°.',
      caption: 'Kierunek maksymalnego ścinania nie pokrywa się z kierunkiem największego rozciągania.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\theta_{\\tau\\max}=22{,}5^\\circ+45^\\circ=67{,}5^\\circ',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'W materiale ciągliwym i kruchym inna płaszczyzna może być krytyczna, mimo że analizujemy ten sam stan naprężenia. Dlatego kierunki główne i kierunki maksymalnego ścinania trzeba rozróżniać.',
      caption: 'Ten sam stan ma różne „najgorsze” kierunki zależnie od mechanizmu zniszczenia.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_1\\approx96{,}57\\ \\text{MPa},\\quad \\sigma_2\\approx-16{,}57\\ \\text{MPa},\\quad \\theta_p=22{,}5^\\circ,\\quad \\theta_{\\tau\\max}=67{,}5^\\circ}',
    },
  ],
} satisfies SolutionData
