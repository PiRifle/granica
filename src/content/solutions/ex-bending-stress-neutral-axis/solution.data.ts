import type { SolutionData } from '../../model'
import { BendingStressNeutralAxisAnimation } from './animation'

export default {
  id: 'ex-bending-stress-neutral-axis',
  title: 'Rozkład σ i oś obojętna — przykład 1',
  duration: 7,
  given: ['b = 80 mm', 'h = 160 mm', 'M = 8 kN·m', 'E = 200 GPa'],
  result:
    'Naprężenia skrajne mają wartość bezwzględną 23,4 MPa: ściskanie u góry i rozciąganie u dołu. Na osi obojętnej naprężenie wynosi zero, a w połowie wysokości jest dwa razy mniejsze.',
  animation: BendingStressNeutralAxisAnimation,
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 8, label: 'M = 8 kN·m' },
      { at: 4, value: 8, label: 'M = 8 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 8],
        [4, 8],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 8, text: 'M = 8 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'b × h', value: '80 × 160 mm', focus: 'design' },
      { label: 'M', value: '8,0 kN·m', focus: 'M' },
      { label: 'I_z', value: '27,31·10⁶ mm⁴', focus: 'design' },
      { label: 'W_z', value: '341 333 mm³', focus: 'design' },
      { label: 'σ_max', value: '23,44 MPa', focus: 'design' },
      { label: 'σ(y=40 mm)', value: '11,72 MPa', focus: 'design' },
      { label: 'ρ', value: '683 m', focus: 'design' },
      { label: 'ε', value: '1,17·10⁻⁴', focus: 'design' },
    ],
    note: 'Czyste zginanie momentem M = 8 kN·m; długość belki nie zmienia rozkładu naprężeń.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Mamy prostokątny przekrój belki b = 80 mm i h = 160 mm, obciążony czystym zginaniem momentem M = 8 kN·m. Materiał jest liniowo sprężysty, a przekrój symetryczny względem osi poziomej.',
      caption: 'Przekrój 80 × 160 mm poddany czystemu zginaniu momentem M = 8 kN·m.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'b=80\\ \\text{mm},\\qquad h=160\\ \\text{mm},\\qquad M=8\\ \\text{kN·m},\\qquad E=200\\ \\text{GPa}',
    },
    {
      title: 'Oś obojętna',
      narration:
        'W przekroju symetrycznym oś obojętna przechodzi przez środek ciężkości, czyli w połowie wysokości. Od tej osi mierzymy y: dodatnie w dół. Na samej osi odkształcenie i naprężenie normalne są zerowe.',
      caption: 'Oś obojętna przechodzi przez środek ciężkości, c = h/2 = 80 mm od góry.',
      visual: 'section',
      focus: { metric: 'neutral-axis' },
      formula: 'y_c=\\frac{h}{2}=80\\ \\text{mm},\\qquad \\sigma(y=0)=0',
    },
    {
      title: 'Liniowy rozkład naprężeń',
      narration:
        'Przekroje płaskie pozostają płaskie, więc naprężenie rośnie liniowo z odległością od osi obojętnej. Po stronie ściskanej, czyli u góry, naprężenie jest ujemne; po stronie rozciąganej, u dołu, dodatnie.',
      caption: 'Naprężenie rośnie liniowo od zera na osi obojętnej do skrajnych włókien.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\sigma_x(y)=\\frac{M\\,y}{I_z},\\qquad I_z=\\frac{b h^3}{12}',
    },
    {
      title: 'Skrajne włókna',
      narration:
        'Największe naprężenie występuje na skrajnych włóknach, w odległości c = 80 mm od osi. Wskaźnik wytrzymałości W_z = I_z/c pozwala obliczyć σ_max bez osobnego liczenia I_z za każdym razem.',
      caption: 'Ściskanie u góry (−23,4 MPa) i rozciąganie u dołu (+23,4 MPa).',
      visual: 'section',
      focus: { metric: 'extremes' },
      formula:
        'c=\\frac{h}{2}=80\\ \\text{mm},\\qquad W_z=\\frac{I_z}{c}=341\\,333\\ \\text{mm}^3,\\qquad \\sigma_{\\max}=\\frac{M}{W_z}=23{,}44\\ \\text{MPa}',
    },
    {
      title: 'Włókno pośrednie',
      narration:
        'Sprawdzamy włókno w połowie drogi do osi, przy y = 40 mm. Naprężenie jest dokładnie dwa razy mniejsze niż na skraju. To bezpośredni skutek liniowego rozkładu σ = My/I.',
      caption: 'Połowa odległości od osi obojętnej daje połowę naprężenia: 11,72 MPa.',
      visual: 'section',
      focus: { metric: 'middle' },
      formula: '\\sigma(40)=\\frac{8\\cdot10^6\\cdot40}{27{,}31\\cdot10^6}=11{,}72\\ \\text{MPa}',
    },
    {
      title: 'Krzywizna i odkształcenie',
      narration:
        'Zginanie oznacza zakrzywienie osi belki. Krzywizna κ = M/(EI_z) daje promień ρ ≈ 683 m. Oś obojętna nie zmienia długości, a skrajne włókna odkształcają się przeciwnie: górne skraca się, dolne wydłuża.',
      caption: 'Oś obojętna pozostaje bez zmian długości; skrajne włókna mają ε = ±1,17·10⁻⁴.',
      visual: 'section',
      focus: { metric: 'curvature' },
      formula:
        '\\kappa=\\frac{M}{E I_z}=1{,}465\\cdot10^{-6}\\ \\text{mm}^{-1},\\qquad \\rho\\approx683\\ \\text{m},\\qquad \\varepsilon_{\\max}=\\frac{\\sigma_{\\max}}{E}=1{,}17\\cdot10^{-4}',
    },
  ],
} satisfies SolutionData
