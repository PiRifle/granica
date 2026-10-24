import type { SolutionData } from '../../model'
import { PrincipalExample3Animation } from './animation'

export default {
  id: 'ex-stress-state-principal-3',
  title: 'Naprężenia główne: skrajne wartości bez ścinania — przykład 3',
  animation: PrincipalExample3Animation,
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
      title: 'Stan główny i dane',
      narration:
        'Znamy naprężenia główne σ_1=80 MPa i σ_2=-20 MPa oraz składową σ_x=20 MPa. W kierunkach głównych nie ma ścinania, więc element pokazujemy bez strzałek stycznych. Chcemy odtworzyć σ_y i |τ_xy|.',
      caption: 'Zadanie odwrotne: od znanych wartości głównych do składowych tensora.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_1=80\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa},\\quad \\sigma_x=20\\ \\text{MPa}',
    },
    {
      title: 'Średnia i σ_y',
      narration:
        'Średnia z naprężeń głównych wynosi (80-20)/2=30 MPa. Musi być równa (σ_x+σ_y)/2, więc (20+σ_y)/2=30, czyli σ_y=40 MPa. Na osi naprężeń σ_x i σ_y leżą symetrycznie względem średniej.',
      caption: 'Ślad tensora wyznacza σ_y, a średnia jest środkiem przedziału σ_x–σ_y.',
      visual: 'cube',
      focus: { metric: 'trace' },
      formula:
        '\\frac{80-20}{2}=30\\ \\text{MPa}=\\frac{20+\\sigma_y}{2}\\quad\\Rightarrow\\quad\\sigma_y=40\\ \\text{MPa}',
    },
    {
      title: 'Promień i |τ_xy|',
      narration:
        'Promień wynosi R=(80-(-20))/2=50 MPa, a połowa różnicy naprężeń normalnych to a=(20-40)/2=-10 MPa. Z trójkąta promienia R^2=a^2+τ_xy^2 otrzymujemy |τ_xy|=√(2500-100)≈48,99 MPa.',
      caption: 'Wartość bezwzględna τ_xy wynika z trójkąta prostokątnego o bokach |a|, |τ| i R.',
      visual: 'cube',
      focus: { metric: 'radius' },
      formula:
        'R=50\\ \\text{MPa},\\quad a=-10\\ \\text{MPa},\\quad |\\tau_{xy}|=\\sqrt{50^2-10^2}\\approx48{,}99\\ \\text{MPa}',
    },
    {
      title: 'Obrót do kierunków głównych',
      narration:
        'Odtworzony stan x–y ma σ_x=20 MPa, σ_y=40 MPa i ścinanie |τ_xy|≈48,99 MPa. Obrót o kąt główny θ_p≈50,8° zeruje ścinanie i odtwarza naprężenia 80 MPa oraz -20 MPa.',
      caption: 'W kierunkach głównych τ = 0, a naprężenia wracają do 80 i −20 MPa.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '\\tau_{xy}=\\pm48{,}99\\ \\text{MPa},\\qquad \\theta_p=\\pm50{,}8^\\circ',
    },
    {
      title: 'Znak τ_xy i interpretacja',
      narration:
        'Znak τ_xy zależy od orientacji kierunku głównego względem osi x; same wartości główne go nie rozstrzygają. Oba znaki dają ten sam zestaw naprężeń głównych, ale odpowiadają lustrzanym kierunkom. Do przewidywania pęknięcia potrzebna jest więc dodatkowa informacja o orientacji.',
      caption: 'Wartości główne nie określają znaku składowej stycznej ani kierunku osi głównej.',
      visual: 'cube',
      focus: { metric: 'sign' },
      formula:
        '\\boxed{\\sigma_y=40\\ \\text{MPa},\\quad |\\tau_{xy}|\\approx48{,}99\\ \\text{MPa},\\quad \\sigma_1=80\\ \\text{MPa},\\quad \\sigma_2=-20\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
