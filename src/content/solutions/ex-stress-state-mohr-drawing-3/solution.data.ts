import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-mohr-drawing-3',
  title: 'Koło Mohra: narysuj je krok po kroku — przykład 3',
  duration: 7,
  given: ['σ_1 = 100 MPa', 'σ_2 = 20 MPa', 'σ_x = 80 MPa'],
  result:
    'To zadanie pokazuje, że koło opisuje wartości główne jednoznacznie, ale orientacja wymaga znaku stycznej. Sama para σ_1 i σ_2 nie mówi, po której stronie osi leży punkt X. W praktyce znak τ_xy bierzemy z konwencji zadania albo z pomiaru na określonym kierunku.',
  figure: {
    kind: 'cube',
    stresses: { x: 80, y: 40, z: 0 },
    values: [
      { label: 'σ_1', value: '100 MPa', focus: 'principal', reveal: 0 },
      { label: 'σ_2', value: '20 MPa', focus: 'principal', reveal: 0 },
      { label: 'σ_x', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '40 MPa', focus: 'stress' },
      { label: 'σ_y', value: '40 MPa', focus: 'stress' },
      { label: '|τ_xy|', value: '34,64 MPa', focus: 'stress' },
      { label: 'θ_p', value: '30°', focus: 'principal' },
    ],
    note: 'Punkt X ma współrzędne (80; ±34,64) MPa; znak stycznej zależy od orientacji osi głównych.',
  },
  scenes: [
    {
      title: 'Dane i koło',
      narration:
        'Znamy naprężenia główne σ_1=100 MPa i σ_2=20 MPa oraz składową σ_x=80 MPa. Chcemy odtworzyć σ_y, |τ_xy| i położenie punktu X na kole.',
      caption: 'Zadanie odwrotne: od wartości głównych do punktu na kole.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1=100\\ \\text{MPa},\\quad \\sigma_2=20\\ \\text{MPa},\\quad \\sigma_x=80\\ \\text{MPa}',
    },
    {
      title: 'Środek i promień',
      narration:
        'Środek koła leży w średniej naprężeń głównych: C=(100+20)/2=60 MPa. Promień wynosi (100-20)/2=40 MPa.',
      caption: 'Parametry koła wynikają wprost z wartości głównych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'C=(100+20)/2=60\\ \\text{MPa},\\quad R=(100-20)/2=40\\ \\text{MPa}',
    },
    {
      title: 'Wyznaczenie σ_y',
      narration: 'Z definicji średniej (σ_x+σ_y)/2=60, więc σ_y=120-80=40 MPa. Połowa różnicy to a=(80-40)/2=20 MPa.',
      caption: 'Średnia pozwala wyznaczyć σ_y.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_y=120-80=40\\ \\text{MPa},\\quad a=(80-40)/2=20\\ \\text{MPa}',
    },
    {
      title: 'Moment styczny',
      narration:
        'Z równania koła 40^2=20^2+τ_xy^2, więc |τ_xy|=√(1600-400)=√(1200)≈34,64 MPa. Punkt X ma współrzędne (80;34,64) lub (80;-34,64), zależnie od znaku stycznej.',
      caption: 'Oba punkty dają te same naprężenia główne.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '|\\tau_{xy}|=\\sqrt{40^2-20^2}=\\sqrt{1200}\\approx34{,}64\\ \\text{MPa}',
    },
    {
      title: 'Kąt kierunku głównego',
      narration:
        'Kąt kierunku głównego wynika z cos2θ_p=a/R=20/40=0,5 oraz sin2θ_p=τ_xy/R. Dla dodatniego τ_xy mamy 2θ_p=60°, czyli θ_p=30°.',
      caption: 'Kąt zależy od znaku τ_xy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\cos2\\theta_p=20/40=0{,}5\\quad\\Rightarrow\\quad2\\theta_p=60^\\circ,\\quad \\theta_p=30^\\circ',
    },
    {
      title: 'Sprawdzenie',
      narration:
        'Sprawdzenie: σ_n=60+20·0,5+34,64·0,866≈60+10+30=100 MPa. Dla ujemnego τ_xy kąt zmienia znak, ale wartości główne pozostają takie same.',
      caption: 'Podstawienie potwierdza σ_1.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_n=60+20\\cdot0{,}5+34{,}64\\cdot0{,}866\\approx100\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Koło opisuje wartości główne jednoznacznie, ale orientacja wymaga znaku stycznej. Sama para σ_1 i σ_2 nie mówi, po której stronie osi leży punkt X.',
      caption: 'Do orientacji potrzebna jest dodatkowa informacja o znaku τ_xy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{C=60\\ \\text{MPa},\\quad R=40\\ \\text{MPa},\\quad \\sigma_y=40\\ \\text{MPa},\\quad |\\tau_{xy}|\\approx34{,}64\\ \\text{MPa},\\quad \\theta_p=30^\\circ}',
    },
  ],
} satisfies SolutionData
