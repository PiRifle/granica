import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-principal-3',
  title: 'Naprężenia główne: skrajne wartości bez ścinania — przykład 3',
  duration: 7,
  given: ['σ_1 = 80 MPa', 'σ_2 = -20 MPa', 'σ_x = 20 MPa'],
  result:
    'Znak τ_xy można ustalić dopiero z dodatkowej informacji, na przykład z kąta kierunku głównego albo z pomiaru na pochyłej płaszczyźnie. To dobra ilustracja tego, że wartości własne opisują stan „co do wielkości”, ale nie „co do orientacji”.',
  figure: {
    kind: 'cube',
    stresses: { x: 20, y: 40, z: 0 },
    values: [
      { label: 'σ_1', value: '80 MPa', focus: 'principal', reveal: 0 },
      { label: 'σ_2', value: '−20 MPa', focus: 'principal', reveal: 0 },
      { label: 'σ_x', value: '20 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '40 MPa', focus: 'stress' },
      { label: 'σ_avg', value: '30 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: '|τ_xy|', value: '48,99 MPa', focus: 'stress' },
    ],
    note: 'Wartości główne są znane, ale znak τ_xy zależy od orientacji osi głównych względem osi x.',
  },
  scenes: [
    {
      title: 'Dane i wartości główne',
      narration:
        'Znamy naprężenia główne σ_1=80 MPa i σ_2=-20 MPa oraz składową σ_x=20 MPa. Chcemy odtworzyć σ_y i |τ_xy|.',
      caption: 'Zadanie odwrotne: od wartości głównych do składowych tensora.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1=80\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa},\\quad \\sigma_x=20\\ \\text{MPa}',
    },
    {
      title: 'Średnia i σ_y',
      narration:
        'Średnia z naprężeń głównych wynosi (80-20)/2=30 MPa. Musi być równa (σ_x+σ_y)/2, więc (20+σ_y)/2=30, czyli σ_y=40 MPa.',
      caption: 'Ślad tensora pozwala wyznaczyć σ_y.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\frac{80-20}{2}=30\\ \\text{MPa}=\\frac{20+\\sigma_y}{2}\\quad\\Rightarrow\\quad\\sigma_y=40\\ \\text{MPa}',
    },
    {
      title: 'Promień koła',
      narration: 'Promień wynosi (80-(-20))/2=50 MPa. Połowa różnicy naprężeń normalnych to a=(20-40)/2=-10 MPa.',
      caption: 'Promień i połowa różnicy naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R=\\frac{80-(-20)}{2}=50\\ \\text{MPa},\\quad a=\\frac{20-40}{2}=-10\\ \\text{MPa}',
    },
    {
      title: 'Moment styczny',
      narration: 'Korzystamy z R^2=a^2+τ_xy^2: 2500=100+τ_xy^2, więc |τ_xy|=√(2400)≈48,99 MPa.',
      caption: 'Wartość bezwzględna τ_xy wynika z równania koła.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R^2=a^2+\\tau_{xy}^2\\quad\\Rightarrow\\quad|\\tau_{xy}|=\\sqrt{2500-100}\\approx48{,}99\\ \\text{MPa}',
    },
    {
      title: 'Znak τ_xy',
      narration:
        'Znak τ_xy zależy od orientacji kierunku głównego względem osi x; same wartości główne go nie rozstrzygają. Oba znaki dają ten sam zestaw naprężeń głównych, ale odpowiadają lustrzanym kierunkom.',
      caption: 'Wartości główne nie określają znaku składowej stycznej.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau_{xy}=\\pm48{,}99\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie',
      narration:
        'Sprawdźmy: σ_avg=30, R=50, więc wartości to 80 i -20 MPa. Po podstawieniu σ_x=20, σ_y=40 i τ_xy=48,99 otrzymujemy ten sam promień.',
      caption: 'Dane są spójne.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{avg}=30\\ \\text{MPa},\\quad R=50\\ \\text{MPa}\\quad\\Rightarrow\\quad80,-20\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Znak τ_xy można ustalić dopiero z dodatkowej informacji, na przykład z kąta kierunku głównego albo z pomiaru na pochyłej płaszczyźnie. Wartości własne opisują stan co do wielkości, ale nie co do orientacji.',
      caption: 'Do oceny wytężenia potrzebne są wartości, a do przewidywania pęknięcia — kierunki.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_y=40\\ \\text{MPa},\\quad |\\tau_{xy}|\\approx48{,}99\\ \\text{MPa},\\quad \\sigma_1=80\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
