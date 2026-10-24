import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-stress-neutral-axis-3',
  title: 'Rozkład σ i oś obojętna — przykład 3',
  duration: 7,
  given: ['sigma_{dop} = 140 MPa', 'M = 10 kN·m'],
  result:
    'Wariant odwrotny pokazuje, że dobór przekroju nie polega na zgadywaniu. Z warunku na naprężenie wynika minimalny wskaźnik W, a z niego — wymiary. Dopiero po wybraniu konkretnego przekroju sprawdza się rzeczywiste naprężenie i ewentualnie koryguje wymiary.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.BendingStressNeutralAxis3Animation })),
  ),
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 10, label: 'M = 10 kN·m' },
      { at: 4, value: 10, label: 'M = 10 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 10],
        [4, 10],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 10, text: 'M = 10 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'M', value: '10,0 kN·m', focus: 'M' },
      { label: 'σ_dop', value: '140 MPa', focus: 'design' },
      { label: 'W_min', value: '71 429 mm³', focus: 'design' },
      { label: 'h_min', value: '≈ 95,0 mm', focus: 'design' },
      { label: 'b × h', value: '50 × 100 mm', focus: 'design' },
      { label: 'W', value: '83 333 mm³', focus: 'design' },
      { label: 'σ_max', value: '120 MPa', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
    ],
    note: 'Z warunku σ_max ≤ 140 MPa wynika W_min = 71 429 mm³; przyjęty przekrój 50 × 100 mm daje σ_max = 120 MPa.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Tym razem znamy dopuszczalne naprężenie i moment, a szukamy wymiarów przekroju. Przyjmijmy σ_dop = 140 MPa i M = 10 kN·m. Przekrój ma być prostokątem o stosunku b = h/2, więc pozostaje dobrać wysokość h.',
      caption: 'Dane: M = 10 kN·m i σ_dop = 140 MPa; szukamy h przy b = h/2.',
      visual: 'section',
      focus: { metric: 'data' },
      formula: '\\sigma_{\\mathrm{dop}}=140\\ \\text{MPa},\\qquad M=10\\ \\text{kN·m},\\qquad b=\\frac{h}{2}',
    },
    {
      title: 'Wymagany wskaźnik wytrzymałości',
      narration:
        'Z warunku σ_max ≤ σ_dop wynika minimalny wskaźnik wytrzymałości W_min = M/σ_dop. Dla M = 10·10⁶ N·mm i σ_dop = 140 MPa otrzymujemy 71 429 mm³. Przy takim przekroju naprężenie osiąga dokładnie granicę dopuszczalną.',
      caption: 'W_min = 71 429 mm³; przy tej wartości σ = σ_dop = 140 MPa.',
      visual: 'section',
      focus: { metric: 'required' },
      formula: 'W_{\\min}=\\frac{M}{\\sigma_{\\mathrm{dop}}}=\\frac{10\\cdot10^6}{140}=71\\,429\\ \\text{mm}^3',
    },
    {
      title: 'Dobór wymiarów',
      narration:
        'Przy b = h/2 wskaźnik wynosi W = b h²/6 = h³/12. Z warunku W ≥ W_min dostajemy h ≥ ∛(12·71 429) ≈ 95,0 mm. Przyjmujemy h = 100 mm i b = 50 mm; przekrój jest nieco większy od minimalnego.',
      caption: 'Minimalna wysokość to około 95 mm; przyjęto 50 × 100 mm.',
      visual: 'section',
      focus: { metric: 'adopt' },
      formula:
        'b=\\frac{h}{2},\\qquad W=\\frac{h^3}{12},\\qquad h\\ge\\sqrt[3]{12W_{\\min}}=\\sqrt[3]{857\\,143}\\approx95{,}0\\ \\text{mm}',
    },
    {
      title: 'Liniowy rozkład naprężeń',
      narration:
        'W przyjętym przekroju 50 × 100 mm oś obojętna przechodzi przez środek wysokości. Naprężenie zmienia się liniowo od zera na osi do wartości maksymalnej na skrajnych włóknach. Górna połowa jest ściskana, a dolna rozciągana.',
      caption: 'Naprężenie rośnie liniowo od osi obojętnej; I_z = 4,167·10⁶ mm⁴.',
      visual: 'section',
      focus: { metric: 'distribution' },
      formula: '\\sigma(y)=\\frac{M\\,y}{I_z},\\qquad I_z=\\frac{50\\cdot100^3}{12}=4{,}167\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Sprawdzenie skrajnego włókna',
      narration:
        'Dla przyjętego przekroju W = 50·100²/6 = 83 333 mm³, więc σ_max = 10·10⁶/83 333 = 120 MPa. To mniej niż σ_dop = 140 MPa, czyli przekrój jest bezpieczny. Wskaźnik W jest większy od wymaganego W_min.',
      caption: 'σ_max = 120 MPa < 140 MPa; przyjęty przekrój 50 × 100 mm jest bezpieczny.',
      visual: 'section',
      focus: { metric: 'check' },
      formula:
        'W=\\frac{50\\cdot100^2}{6}=83\\,333\\ \\text{mm}^3,\\qquad \\sigma_{\\max}=\\frac{10\\cdot10^6}{83\\,333}=120\\ \\text{MPa}<140\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
