import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tau-max-2',
  title: 'Maksymalne ścinanie: płaskie i absolutne — przykład 2',
  duration: 7,
  given: ['σ_x = -40 MPa', 'σ_y = -100 MPa', 'τ_xy = 30 MPa'],
  result:
    'Taki przypadek występuje na przykład w ściśniętym elemencie z dodatkowym ścinaniem, w strefie docisku lub w materiale pod wysokim ciśnieniem hydrostatycznym z odchyleniem. Samo ściskanie hydrostatyczne nie daje ścinania, ale różnica między naprężeniami już tak.',
  figure: {
    kind: 'cube',
    stresses: { x: -40, y: -100, z: 0 },
    values: [
      { label: 'σ_x', value: '−40 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−100 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '−70 MPa', focus: 'stress' },
      { label: 'R', value: '42,43 MPa', focus: 'stress' },
      { label: 'σ_I', value: '0 MPa', focus: 'principal' },
      { label: 'σ_II', value: '−27,57 MPa', focus: 'principal' },
      { label: 'σ_III', value: '−112,43 MPa', focus: 'principal' },
      { label: 'τ_max płaskie', value: '42,43 MPa', focus: 'principal' },
      { label: 'τ_max abs', value: '56,21 MPa', focus: 'principal' },
    ],
    note: 'Oba naprężenia płaskie są ujemne; zero jest największym naprężeniem głównym.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration: 'Rozważmy stan, w którym oba naprężenia normalne są ujemne: σ_x=-40 MPa, σ_y=-100 MPa i τ_xy=30 MPa.',
      caption: 'Stan ściskania z dodatkowym ścinaniem.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=-40\\ \\text{MPa},\\quad \\sigma_y=-100\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Średnia i promień',
      narration:
        'Średnia wynosi (-40-100)/2=-70 MPa, a połowa różnicy a=(-40+100)/2=30 MPa. Promień jest równy R=√(30^2+30^2)=42,43 MPa.',
      caption: 'Parametry koła Mohra dla dwóch naprężeń ściskających.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=-70\\ \\text{MPa},\\quad R=\\sqrt{30^2+30^2}=42{,}43\\ \\text{MPa}',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Naprężenia główne w płaszczyźnie to -70+42,43=-27,57 MPa oraz -70-42,43=-112,43 MPa. Po dodaniu zera i uporządkowaniu otrzymujemy σ_I=0, σ_II=-27,57 i σ_III=-112,43 MPa.',
      caption: 'Zero jest największym naprężeniem głównym.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_I=0,\\quad \\sigma_{II}=-27{,}57\\ \\text{MPa},\\quad \\sigma_{III}=-112{,}43\\ \\text{MPa}',
    },
    {
      title: 'Płaskie maksimum ścinania',
      narration: 'Płaskie maksimum ścinania wynosi R=42,43 MPa.',
      caption: 'Maksimum w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{(xy)}=R=42{,}43\\ \\text{MPa}',
    },
    {
      title: 'Absolutne maksimum ścinania',
      narration:
        'Absolutne maksimum wynosi (0-(-112,43))/2=56,21 MPa. Na płaszczyźnie absolutnego maksimum naprężenie normalne jest równe (0-112,43)/2=-56,21 MPa, czyli jest ściskające.',
      caption: 'Duże ścinanie może współistnieć z dużym ściskaniem.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{abs}=\\frac{0-(-112{,}43)}{2}=56{,}21\\ \\text{MPa}',
    },
    {
      title: 'Rola znaków',
      narration:
        'Znak naprężeń normalnych nie przesądza o tym, które koło jest największe. Liczy się różnica wartości, a nie ich znak. Zero leży na zewnątrz przedziału wyznaczonego przez naprężenia płaskie, więc powiększa maksymalną różnicę.',
      caption: 'Decyduje różnica naprężeń, nie ich znak.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_I-\\sigma_{III}=0-(-112{,}43)=112{,}43\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Taki przypadek występuje w ściśniętym elemencie z dodatkowym ścinaniem, w strefie docisku lub w materiale pod wysokim ciśnieniem. Samo ściskanie hydrostatyczne nie daje ścinania, ale różnica między naprężeniami już tak.',
      caption: 'Inżynier musi patrzeć na różnice naprężeń, a nie tylko na wartości bezwzględne.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_I=0,\\quad \\sigma_{II}=-27{,}57\\ \\text{MPa},\\quad \\sigma_{III}=-112{,}43\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=56{,}21\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
