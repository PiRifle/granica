import type { SolutionData } from '../../model'
import { PureBendingExample2Animation } from './animation'

export default {
  id: 'ex-bending-pure-2',
  title: 'Czyste zginanie — przykład 2',
  duration: 7,
  given: ['M = 8 kN·m'],
  result:
    'Po obrocie przekroju o 90 stopni, czyli przy b = 100 mm i h = 50 mm, moment bezwładności maleje czterokrotnie, a wskaźnik W dwukrotnie. Naprężenie rośnie wtedy do 192 MPa, a promień krzywizny maleje do około 27 m. Ten sam moment i materiał dają inną odpowiedź, bo decyduje ustawienie przekroju względem płaszczyzny zginania.',
  animation: PureBendingExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta jest obciążona na obu końcach parami momentów M = 8 kN·m. Nie działają żadne siły poprzeczne, więc reakcje pionowe są zerowe, a moment jest stały na całej długości.',
      caption: 'Dwa momenty na końcach: brak sił poprzecznych, reakcje pionowe zerowe.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'M=8\\ \\text{kN}\\cdot\\text{m},\\qquad R_A=R_B=0',
    },
    {
      title: 'Czyste zginanie na całej belce',
      narration:
        'Na całej belce siła tnąca jest równa zeru, a moment ma stałą wartość 8 kN·m. To czyste zginanie na całej długości, bez odcinka przejściowego.',
      caption: 'T = 0 i M = 8 kN·m na całej długości; to czyste zginanie.',
      visual: 'beam',
      focus: { metric: 'forces' },
      formula: 'T(x)=0,\\qquad M(x)=8\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krzywizna belki',
      narration:
        'Stały moment daje stałą krzywiznę. Przy przekroju 50 × 100 mm i E = 210 GPa krzywizna wynosi κ = M/(EI) = 9,14·10⁻⁶ 1/mm, czyli promień ρ ≈ 109 m.',
      caption: 'Stała krzywizna: κ = 9,14·10⁻⁶ 1/mm, ρ ≈ 109 m.',
      visual: 'beam',
      focus: { metric: 'curvature' },
      formula:
        '\\kappa=\\frac{8\\cdot10^6}{210\\,000\\cdot4{,}167\\cdot10^6}=9{,}14\\cdot10^{-6}\\ \\text{1/mm},\\qquad \\rho\\approx109\\ \\text{m}',
    },
    {
      title: 'Liniowy rozkład naprężeń',
      narration:
        'Naprężenie rośnie liniowo od osi obojętnej. Przy c = h/2 = 50 mm wskaźnik wynosi W = I/c = 83 333 mm³, więc σ_max = M/W = 96 MPa. Górne włókna są ściskane, dolne rozciągane.',
      caption: 'Rozkład liniowy: σ_max = 96 MPa przy c = 50 mm.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'W=\\frac{I}{c}=83\\,333\\ \\text{mm}^3,\\qquad \\sigma_{\\max}=\\frac{M}{W}=96\\ \\text{MPa}',
    },
    {
      title: 'Obrót przekroju o 90°',
      narration:
        'Po obrocie przekroju o 90° wymiary zamieniają się: b = 100 mm i h = 50 mm. Moment bezwładności maleje czterokrotnie, wskaźnik W dwukrotnie, więc naprężenie rośnie do 192 MPa, a promień krzywizny maleje do około 27 m. Decyduje ustawienie przekroju względem płaszczyzny zginania.',
      caption: 'Obrót o 90°: I maleje 4×, W maleje 2×, więc σ rośnie do 192 MPa, a ρ do około 27 m.',
      visual: 'beam',
      focus: { metric: 'rotate' },
      formula: 'I=\\frac{100\\cdot50^3}{12}=1{,}042\\cdot10^6\\ \\text{mm}^4,\\qquad \\sigma_{\\max}=192\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
