import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tau-max',
  title: 'Maksymalne ścinanie: płaskie i absolutne — przykład 1',
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
      title: 'Dane i tensor',
      narration:
        'Dany jest płaski stan naprężenia: σ_x=90 MPa, σ_y=30 MPa, τ_xy=40 MPa i σ_z=0. Szukamy płaskiego i absolutnego maksimum ścinania.',
      caption: 'Stan naprężenia w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=90\\ \\text{MPa},\\quad \\sigma_y=30\\ \\text{MPa},\\quad \\tau_{xy}=40\\ \\text{MPa},\\quad \\sigma_z=0',
    },
    {
      title: 'Średnia',
      narration: 'Średnia: σ_avg=(90+30)/2=60 MPa.',
      caption: 'Środek koła Mohra w płaszczyźnie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=(90+30)/2=60\\ \\text{MPa}',
    },
    {
      title: 'Połowa różnicy',
      narration: 'Połowa różnicy: a=(90-30)/2=30 MPa.',
      caption: 'Połowa różnicy naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'a=(90-30)/2=30\\ \\text{MPa}',
    },
    {
      title: 'Promień',
      narration: 'Promień: R=√(30^2+40^2)=50 MPa.',
      caption: 'Promień koła w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R=\\sqrt{30^2+40^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Naprężenia główne',
      narration: 'Naprężenia główne w płaszczyźnie: 60+50=110 MPa oraz 60-50=10 MPa.',
      caption: 'Dwie płaskie wartości główne.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '60+50=110\\ \\text{MPa},\\quad 60-50=10\\ \\text{MPa}',
    },
    {
      title: 'Trzecie naprężenie główne',
      narration: 'Dodaj zero i uporządkuj: σ_I=110, σ_II=10, σ_III=0 MPa.',
      caption: 'Zero jest najmniejszym naprężeniem głównym.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_I=110\\ \\text{MPa},\\quad \\sigma_{II}=10\\ \\text{MPa},\\quad \\sigma_{III}=0',
    },
    {
      title: 'Płaskie maksimum ścinania',
      narration: 'Płaskie maksimum: τ_max^(xy)=R=50 MPa.',
      caption: 'Maksimum wynikające tylko z koła w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{(xy)}=R=50\\ \\text{MPa}',
    },
    {
      title: 'Absolutne maksimum ścinania',
      narration: 'Absolutne maksimum: τ_max^abs=(110-0)/2=55 MPa.',
      caption: 'Do absolutnego maksimum bierzemy różnicę skrajnych naprężeń głównych.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{abs}=\\frac{110-0}{2}=55\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie normalne na płaszczyźnie maksimum',
      narration:
        'Sprawdź średnią na płaszczyźnie absolutnego maksimum: (110+0)/2=55 MPa. Jest to zarazem wartość naprężenia normalnego na tej płaszczyźnie.',
      caption: 'Maksymalne ścinanie współistnieje z naprężeniem normalnym 55 MPa.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma=\\frac{110+0}{2}=55\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Płaskie maksimum wynosi 50 MPa, a absolutne 55 MPa. Różnica 5 MPa jest wynikiem tego, że zero jest mniejsze od obu naprężeń płaskich.',
      caption: 'Pominięcie trzeciej osi zaniża maksymalne ścinanie o około 9%.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\tau_{\\max}^{(xy)}=50\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=55\\ \\text{MPa},\\quad \\sigma_I=110\\ \\text{MPa},\\quad \\sigma_{III}=0}',
    },
  ],
} satisfies SolutionData
