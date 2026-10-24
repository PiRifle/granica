import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-central-principal-axes-2',
  title: 'Osie centralne i główne — przykład 2',
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
      title: 'Dane i układ osi',
      narration:
        'Weźmy przekrój teowy: środnik 20×100 mm i półka 120×20 mm, całkowita wysokość 120 mm. Przekrój ma pionową oś symetrii, więc oś y przechodzi przez środek ciężkości.',
      caption: 'Teownik z pionową osią symetrii.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=20\\cdot100=2000\\ \\text{mm}^2,\\quad A_2=120\\cdot20=2400\\ \\text{mm}^2',
    },
    {
      title: 'Centroid przekroju',
      narration:
        'Pole wynosi A=4400 mm^2, a środek ciężkości leży 82,73 mm od dolnej krawędzi. Położenie poziome wynika z symetrii: x_C=60 mm.',
      caption: 'Centroid leży na osi symetrii, 82,73 mm nad dolną krawędzią.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'A=4400\\ \\text{mm}^2,\\quad x_C=60\\ \\text{mm},\\quad y_C=82{,}73\\ \\text{mm}',
    },
    {
      title: 'Moment Ix',
      narration:
        'Moment względem poziomej osi centralnej obliczyliśmy wcześniej: I_x≈5,674·10⁶ mm⁴. Powstaje on głównie z przesunięcia półki względem osi centralnej.',
      caption: 'Moment względem poziomej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x\\approx5{,}674\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Moment względem pionowej osi symetrii policzymy z twierdzenia Steinera, ale ponieważ oba środki części leżą na tej osi, składniki przesunięcia znikają.',
      caption: 'Oba prostokąty mają środki na osi y, więc zostają tylko momenty własne.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula:
        'I_y=\\frac{100\\cdot20^3}{12}+\\frac{20\\cdot120^3}{12}=66\\,667+2\\,880\\,000=2\\,946\\,667\\ \\text{mm}^4',
    },
    {
      title: 'Moment dewiacyjny',
      narration:
        'Dla przekroju z osią symetrii moment dewiacyjny względem osi centralnych jest zerowy. Nie trzeba szukać kąta głównego: osie równoległe do półki i do środnika są już główne.',
      caption: 'Symetria gwarantuje I_xy=0.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xy}=0',
    },
    {
      title: 'Momenty główne',
      narration:
        'Zatem I_x≈5,674·10⁶ mm⁴ i I_y≈2,947·10⁶ mm⁴, a I_xy=0. Głównymi momentami są po prostu te dwie wartości, przy czym I_1=I_x odpowiada osi poziomej, a I_2=I_y osi pionowej.',
      caption: 'Momenty główne pokrywają się z momentami względem osi symetrii.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_1=I_x\\approx5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad I_2=I_y\\approx2{,}947\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Dla przekroju z osią symetrii nie trzeba liczyć kąta z arctangensa. Wystarczy rozpoznać symetrię i sprawdzić, że I_xy=0. Dopiero gdy symetrii brak, pełny rachunek staje się konieczny.',
      caption: 'Osie centralne pokrywają się z osiami głównymi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{I_x=I_1\\approx5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad I_y=I_2\\approx2{,}947\\cdot10^6\\ \\text{mm}^4,\\quad I_{xy}=0}',
    },
  ],
} satisfies SolutionData
