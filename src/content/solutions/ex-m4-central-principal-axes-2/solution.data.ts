import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-central-principal-axes-2',
  title: 'Osie centralne i główne — przykład 2',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SymmetricSectionAxesAnimation }))),
  duration: 7,
  given: ['środnik 20 × 100 mm', 'półka 120 × 20 mm'],
  result:
    'Ten przykład pokazuje ważną rzecz: dla przekroju z osią symetrii nie trzeba liczyć kąta z arctangensa. Wystarczy rozpoznać symetrię i sprawdzić, że I_xy=0. Warto jednak sprawdzić, czy oś symetrii rzeczywiście przechodzi przez środek ciężkości; dla figury złożonej z części o różnych polach trzeba to potwierdzić rachunkiem, a nie tylko „na oko”.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [
      { x: 50, y: 0, width: 20, height: 100, label: 'środnik', tone: 'accent' },
      { x: 0, y: 100, width: 120, height: 20, label: 'półka', tone: 'light' },
    ],
    centroid: { x: 60, y: 82.73 },
    values: [
      { label: 'A środnika', value: '2000 mm²', focus: 'section' },
      { label: 'A półki', value: '2400 mm²', focus: 'section' },
      { label: 'A', value: '4400 mm²', focus: 'section' },
      { label: 'y_C', value: '82,73 mm', focus: 'centroid' },
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '2,947·10⁶ mm⁴', focus: 'Iy' },
      { label: 'I_xy', value: '0', focus: 'Ix' },
      { label: 'I_1', value: '5,674·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_2', value: '2,947·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Teownik z pionową osią symetrii; osie centralne są jednocześnie osiami głównymi.',
  },
  scenes: [
    {
      title: 'Dane i oś symetrii',
      narration:
        'Weźmy przekrój teowy: środnik 20×100 mm i półka 120×20 mm, całkowita wysokość 120 mm. Przekrój ma pionową oś symetrii, więc oś y przechodzi przez środek ciężkości.',
      caption: 'Teownik z pionową osią symetrii.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=20\\cdot100=2000\\ \\text{mm}^2,\\quad A_2=120\\cdot20=2400\\ \\text{mm}^2',
    },
    {
      title: 'Centroid i osie centralne',
      narration:
        'Pole wynosi A=4400 mm², a środek ciężkości leży 82,73 mm od dolnej krawędzi. Położenie poziome wynika z symetrii: x_C=60 mm. Przez centroid prowadzimy centralne osie x i y.',
      caption: 'Centroid leży na osi symetrii, 82,73 mm nad dolną krawędzią.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'A=4400\\ \\text{mm}^2,\\quad x_C=60\\ \\text{mm},\\quad y_C=82{,}73\\ \\text{mm}',
    },
    {
      title: 'Momenty względem osi centralnych',
      narration:
        'Moment względem poziomej osi centralnej wynosi I_x≈5,674·10⁶ mm⁴, głównie od przesunięcia półki. Moment względem pionowej osi symetrii daje I_y≈2,947·10⁶ mm⁴, bo środki obu prostokątów leżą na tej osi.',
      caption: 'Momenty względem poziomej i pionowej osi centralnej.',
      visual: 'section',
      focus: { metric: 'moments' },
      formula: 'I_x\\approx5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx2{,}947\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Symetria zeruje moment dewiacyjny',
      narration:
        'Dla przekroju z osią symetrii moment dewiacyjny względem osi centralnych jest zerowy. Obrót próbny pokazuje, że poza osią symetrii I_xy byłby różny od zera, ale w położeniu θ=0° znika. Osie równoległe do półki i do środnika są już główne.',
      caption: 'Przy θ=0° symetria gwarantuje I_xy=0.',
      visual: 'section',
      focus: { metric: 'rotate' },
      formula: 'I_{xy}=0,\\quad \\theta=0^\\circ',
    },
    {
      title: 'Osie główne i wynik',
      narration:
        'Zatem I_1=I_x≈5,674·10⁶ mm⁴ i I_2=I_y≈2,947·10⁶ mm⁴. Głównymi momentami są po prostu te dwie wartości, a osie centralne pokrywają się z osiami głównymi.',
      caption: 'Osie centralne pokrywają się z osiami głównymi.',
      visual: 'section',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{I_x=I_1\\approx5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad I_y=I_2\\approx2{,}947\\cdot10^6\\ \\text{mm}^4,\\quad I_{xy}=0}',
    },
  ],
} satisfies SolutionData
