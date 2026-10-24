import type { SolutionData } from '../../model'
import { TauMaxExample1Animation } from './animation'

export default {
  id: 'ex-stress-state-tau-max',
  title: 'Maksymalne ścinanie: płaskie i absolutne — przykład 1',
  animation: TauMaxExample1Animation,
  duration: 7,
  given: ['σ_x = 90 MPa', 'σ_y = 30 MPa', 'τ_xy = 40 MPa', 'σ_z = 0'],
  result:
    'Płaskie maksimum wynosi 50 MPa, a absolutne 55 MPa. Różnica 5 MPa jest wynikiem tego, że zero jest mniejsze od obu naprężeń płaskich. Pominięcie trzeciej osi zaniżyłoby wynik o około 9%, co w projekcie może być istotne.',
  figure: {
    kind: 'cube',
    stresses: { x: 90, y: 30, z: 0 },
    values: [
      { label: 'σ_x', value: '90 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: 'σ_I', value: '110 MPa', focus: 'principal' },
      { label: 'σ_II', value: '10 MPa', focus: 'principal' },
      { label: 'σ_III', value: '0 MPa', focus: 'principal' },
      { label: 'τ_max płaskie', value: '50 MPa', focus: 'principal' },
      { label: 'τ_max abs', value: '55 MPa', focus: 'principal' },
    ],
    note: 'Płaski stan naprężenia; zero jest mniejsze od obu naprężeń płaskich, więc zwiększa maksymalne ścinanie.',
  },
  scenes: [
    {
      title: 'Dane i model',
      narration:
        'Dany jest płaski stan naprężenia: σ_x=90 MPa, σ_y=30 MPa, τ_xy=40 MPa i σ_z=0. Szukamy płaskiego i absolutnego maksimum ścinania.',
      caption: 'Stan naprężenia w płaszczyźnie xy; zero jest trzecim naprężeniem głównym.',
      visual: 'cube',
      focus: { metric: 'data' },
      formula:
        '\\sigma_x=90\\ \\text{MPa},\\quad \\sigma_y=30\\ \\text{MPa},\\quad \\tau_{xy}=40\\ \\text{MPa},\\quad \\sigma_z=0',
    },
    {
      title: 'Koło Mohra w płaszczyźnie',
      narration:
        'Średnia wynosi (90+30)/2=60 MPa, a promień R=√(30²+40²)=50 MPa. Koło ma końce 110 i 10 MPa, więc zero leży poza przedziałem naprężeń płaskich.',
      caption: 'Środek koła C=60 MPa i promień R=50 MPa.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '\\sigma_{avg}=\\frac{90+30}{2}=60\\ \\text{MPa},\\quad R=\\sqrt{30^2+40^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Płaskie maksimum ścinania',
      narration:
        'Płaskie maksimum to promień koła: τ_max^(xy)=R=50 MPa. Na kole odpowiada mu pionowy promień, a w materiale płaszczyzna obrócona o 45° od kierunku głównego.',
      caption: 'Maksimum wynikające tylko z koła w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'inplane' },
      formula: '\\tau_{\\max}^{(xy)}=R=50\\ \\text{MPa},\\qquad \\theta_s=\\theta_p\\pm45^\\circ',
    },
    {
      title: 'Trzy koła i absolutne maksimum',
      narration:
        'Dodaj zero i uporządkuj: σ_I=110, σ_II=10, σ_III=0 MPa. Największe koło obejmuje σ_I i σ_III, więc τ_max^abs=(110-0)/2=55 MPa.',
      caption: 'Zero jest najmniejszym naprężeniem głównym, dlatego powiększa maksymalne ścinanie.',
      visual: 'cube',
      focus: { metric: 'absolute' },
      formula: '\\tau_{\\max}^{abs}=\\frac{110-0}{2}=55\\ \\text{MPa}',
    },
    {
      title: 'Płaszczyzna i kierunek maksimum',
      narration:
        'Absolutne maksimum występuje na płaszczyźnie nachylonej pod 45° do σ_I i σ_III. Naprężenie normalne na tej płaszczyźnie wynosi (110+0)/2=55 MPa.',
      caption: 'Duże τ nie oznacza braku σ: na płaszczyźnie maksimum działa σ=55 MPa.',
      visual: 'cube',
      focus: { metric: 'directions' },
      formula: '\\sigma=\\frac{110+0}{2}=55\\ \\text{MPa},\\qquad \\theta=45^\\circ',
    },
    {
      title: 'Wniosek',
      narration:
        'Płaskie maksimum wynosi 50 MPa, a absolutne 55 MPa. Różnica 5 MPa jest wynikiem tego, że zero jest mniejsze od obu naprężeń płaskich.',
      caption: 'Pominięcie trzeciej osi zaniża maksymalne ścinanie o około 9%.',
      visual: 'cube',
      focus: { metric: 'result' },
      formula:
        '\\boxed{\\tau_{\\max}^{(xy)}=50\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=55\\ \\text{MPa},\\quad \\sigma_I=110\\ \\text{MPa},\\quad \\sigma_{III}=0}',
    },
  ],
} satisfies SolutionData
