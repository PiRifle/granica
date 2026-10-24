import type { SolutionData } from '../../model'
import { TauMaxExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-tau-max-2',
  title: 'Maksymalne ścinanie: płaskie i absolutne — przykład 2',
  animation: TauMaxExample2Animation,
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
      title: 'Dane i model',
      narration:
        'Rozważmy stan, w którym oba naprężenia normalne są ujemne: σ_x=-40 MPa, σ_y=-100 MPa i τ_xy=30 MPa. Dodatkowo σ_z=0, więc zero jest trzecim naprężeniem głównym.',
      caption: 'Stan ściskania z dodatkowym ścinaniem.',
      visual: 'cube',
      focus: { metric: 'data' },
      formula: '\\sigma_x=-40\\ \\text{MPa},\\quad \\sigma_y=-100\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa}',
    },
    {
      title: 'Koło Mohra w płaszczyźnie',
      narration:
        'Średnia wynosi (-40-100)/2=-70 MPa, a połowa różnicy a=(-40+100)/2=30 MPa. Promień jest równy R=√(30²+30²)=42,43 MPa, więc płaskie naprężenia główne to -27,57 i -112,43 MPa.',
      caption: 'Parametry koła Mohra dla dwóch naprężeń ściskających.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: '\\sigma_{avg}=-70\\ \\text{MPa},\\quad R=\\sqrt{30^2+30^2}=42{,}43\\ \\text{MPa}',
    },
    {
      title: 'Płaskie maksimum ścinania',
      narration:
        'Płaskie maksimum ścinania wynosi τ_max^(xy)=R=42,43 MPa. Na kole odpowiada mu pionowy promień, a w materiale płaszczyzna obrócona o 45° od kierunku głównego.',
      caption: 'Maksimum w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'inplane' },
      formula: '\\tau_{\\max}^{(xy)}=R=42{,}43\\ \\text{MPa},\\qquad \\theta_s=\\theta_p\\pm45^\\circ',
    },
    {
      title: 'Trzy koła i absolutne maksimum',
      narration:
        'Po dodaniu zera i uporządkowaniu otrzymujemy σ_I=0, σ_II=-27,57 i σ_III=-112,43 MPa. Absolutne maksimum wynosi (0-(-112,43))/2=56,21 MPa.',
      caption: 'Zero jest największym naprężeniem głównym, więc powiększa maksymalną różnicę.',
      visual: 'cube',
      focus: { metric: 'absolute' },
      formula: '\\tau_{\\max}^{abs}=\\frac{0-(-112{,}43)}{2}=56{,}21\\ \\text{MPa}',
    },
    {
      title: 'Płaszczyzna i kierunek maksimum',
      narration:
        'Na płaszczyźnie absolutnego maksimum naprężenie normalne jest równe (0-112,43)/2=-56,21 MPa, czyli jest ściskające. Płaszczyzna leży pod 45° do σ_I i σ_III.',
      caption: 'Duże ścinanie może współistnieć z dużym ściskaniem.',
      visual: 'cube',
      focus: { metric: 'directions' },
      formula: '\\sigma_n=\\frac{0-112{,}43}{2}=-56{,}21\\ \\text{MPa},\\qquad \\theta=45^\\circ',
    },
    {
      title: 'Rola znaków i wniosek',
      narration:
        'Znak naprężeń normalnych nie przesądza o tym, które koło jest największe. Liczy się różnica wartości, a nie ich znak. Zero leży poza przedziałem wyznaczonym przez naprężenia płaskie, więc powiększa maksymalną różnicę.',
      caption: 'Decyduje różnica naprężeń, nie ich znak: 42,43 MPa to za mało wobec 56,21 MPa.',
      visual: 'cube',
      focus: { metric: 'result' },
      formula:
        '\\boxed{\\sigma_I=0,\\quad \\sigma_{II}=-27{,}57\\ \\text{MPa},\\quad \\sigma_{III}=-112{,}43\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=56{,}21\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
