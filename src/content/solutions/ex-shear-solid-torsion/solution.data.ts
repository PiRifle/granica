import type { SolutionData } from '../../model'
import { SolidTorsionAnimation } from './animation'

export default {
  id: 'ex-shear-solid-torsion',
  title: 'Skręcanie wału pełnego — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'L = 1,2 m', 'T = 1,5 kN·m', 'G = 80 GPa'],
  result:
    'τ_max ≈ 35,4 MPa na powierzchni wału, a kąt skręcenia wynosi około 0,0177 rad, czyli 1,01°. W osi naprężenie styczne jest równe zero.',
  animation: SolidTorsionAnimation,
  figure: {
    kind: 'section',
    width: 60,
    height: 60,
    parts: [
      {
        x: 0,
        y: 0,
        width: 60,
        height: 60,
        label: 'wał ∅60',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 30,
      y: 30,
    },
    values: [
      {
        label: 'd',
        value: '60 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'T',
        value: '1,5 kN·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1200 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'G',
        value: '80 GPa',
        focus: 'design',
        reveal: 0,
      },
    ],
    note: 'Naprężenie styczne rośnie liniowo od zera w osi do τ_max na powierzchni wału.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model wału',
      narration:
        'Pełny wał o średnicy d = 60 mm i długości L = 1,2 m jest utwierdzony lewym końcem, a prawy koniec obciąża moment T = 1,5 kN·m. Materiał ma G = 80 GPa. Moment zamieniamy na 1 500 000 N·mm.',
      caption: 'Wałem skręcanym jest pełny pręt kołowy; moment przyłożono na swobodnym końcu.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'T = 1{,}5\\ \\text{kN}\\cdot\\text{m} = 1\\,500\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Biegunowy moment bezwładności',
      narration:
        'O rozkładzie naprężeń decyduje biegunowy moment bezwładności J_o = πd⁴/32 = 1 272 345 mm⁴. Materiał leżący dalej od osi wnosi większy udział r² dA, dlatego zewnętrzne pierścienie są coraz mocniej zaznaczone.',
      caption: 'J_o opisuje rozkład pola względem osi; dla pełnego koła J_o = πd⁴/32.',
      visual: 'section',
      focus: {
        metric: 'section',
      },
      formula: 'J_o = \\frac{\\pi d^4}{32} = \\frac{\\pi \\cdot 60^4}{32} = 1\\,272\\,345\\ \\text{mm}^4',
    },
    {
      title: 'Skręcenie wału',
      narration:
        'Podczas skręcania każdy przekrój obraca się względem sąsiedniego. Punkt na powierzchni zakreśla łuk r·dθ, więc odkształcenie γ i naprężenie τ rosną proporcjonalnie do promienia. Kąt φ = TL/(GJ_o) wynosi 0,01768 rad.',
      caption: 'Skręcenie jest widoczne na powierzchni; w osi wału przemieszczenie styczne jest zerowe.',
      visual: 'section',
      focus: {
        metric: 'twist',
      },
      formula: '\\varphi = \\frac{T L}{G J_o} = 0{,}01768\\ \\text{rad}',
    },
    {
      title: 'Naprężenia od osi do powierzchni',
      narration:
        'Naprężenie styczne τ(r) = Tr/J_o rośnie liniowo od zera w osi do τ_max = 35,4 MPa na powierzchni. Największą wartość otrzymujemy dla r = d/2 = 30 mm.',
      caption: 'W osi τ = 0, a na obwodzie τ = τ_max; rozkład jest liniowy.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau_{max} = \\frac{T}{W_o} = \\frac{1\\,500\\,000}{42\\,411{,}5} = 35{,}37\\ \\text{MPa}',
    },
    {
      title: 'Wynik i kąt skręcenia',
      narration:
        'Na powierzchni wału panuje τ_max ≈ 35,4 MPa, a cały wał skręca się o φ = 0,01768 rad, czyli 1,013°. Naprężenie w osi pozostaje zerowe.',
      caption: 'Jednoczesny obraz skręcenia i rozkładu naprężeń: maksimum na powierzchni, zero w osi.',
      visual: 'section',
      focus: {
        metric: 'result',
      },
      formula: '\\varphi = 0{,}01768\\ \\text{rad} = 1{,}013^\\circ',
    },
  ],
} satisfies SolutionData
