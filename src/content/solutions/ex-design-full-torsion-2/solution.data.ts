import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-torsion-2',
  title: 'Pełne zadanie: wał pełny i drążony — przykład 2',
  duration: 7,
  given: ['d=55 mm', 'D=70 mm', 'T=1200 N·m'],
  result:
    'Przy tej samej masie rura ma większy J_o, a w naszym przykładzie także większy W_o niż wał pełny o średnicy 55 mm, ponieważ jej średnica zewnętrzna jest większa. Wskaźnik rury wynosi około 57 500 mm^3, a wału pełnego 32 668 mm^3. To pokazuje, że porównanie „na masę” jest zupełnie inne niż porównanie „na średnicę”.',
  figure: {
    kind: 'section',
    width: 70,
    height: 70,
    parts: [{ x: 0, y: 0, width: 70, height: 70, label: 'rura ∅70', tone: 'light' }],
    holes: [{ cx: 35, cy: 35, r: 21.65, label: '∅43,3' }],
    centroid: { x: 35, y: 35 },
    values: [
      { label: 'd wału pełnego', value: '55 mm', focus: 'design', reveal: 0 },
      { label: 'D rury', value: '70 mm', focus: 'design', reveal: 0 },
      { label: 'T', value: '1200 N·m', focus: 'load', reveal: 0 },
      { label: 'J_o wału pełnego', value: '898 360 mm⁴', focus: 'design', reveal: 0 },
      { label: 'd rury', value: '43,3 mm', focus: 'design', reveal: 1 },
      { label: 'J_o rury', value: '2 010 000 mm⁴', focus: 'design' },
      { label: 'J_o rury / J_o wału', value: '2,24', focus: 'design', reveal: 1 },
      { label: 'τ rury', value: '20,9 MPa', focus: 'stress', reveal: 2 },
      { label: 'τ wału pełnego', value: '36,7 MPa', focus: 'stress', reveal: 2 },
      { label: 'φ rury', value: '0,512°', focus: 'design', reveal: 2 },
      { label: 'φ wału pełnego', value: '1,15°', focus: 'design', reveal: 2 },
      { label: 'W_o rury', value: '57 500 mm³', focus: 'design', reveal: 4 },
      { label: 'W_o wału pełnego', value: '32 668 mm³', focus: 'design', reveal: 1 },
    ],
    note: 'Przy równej masie rura ∅70/∅43,3 ma ponad dwukrotnie większy J_o od wału pełnego ∅55.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Porównajmy teraz wał pełny i rurę przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Wał pełny ma d=55 mm i pole około 2376 mm^2, a więc J_o≈898 360 mm^4. Dobierzmy rurę o tej samej długości i masie, ale o większej średnicy zewnętrznej D=70 mm.',
      caption:
        'Porównajmy teraz wał pełny i rurę przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Wał pełny ma d=55 mm i pole…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'd=55\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Z równości pól: π(70^2-d^2)/4=2376, czyli d^2=70^2-4·2376/π≈1875. Stąd d≈43,3 mm. Moment bezwładności rury wynosi J_o=π(70^4-43,3^4)/32≈2,01·10^6 mm^4, czyli około 2,24 razy więcej niż wału pełnego.',
      caption:
        'Z równości pól: π(70^2-d^2)/4=2376, czyli d^2=70^2-4·2376/π≈1875. Stąd d≈43,3 mm. Moment bezwładności rury wynosi…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '\\pi(70^2-d^2)/4=2376',
    },
    {
      title: 'Krok 3',
      narration:
        'Przy tym samym momencie T=1200 N·m naprężenie w rurze wynosi około 20,9 MPa zamiast 36,7 MPa, a kąt skręcenia około 0,512° zamiast 1,15°. Rura jest więc jednocześnie lżejsza w przeliczeniu na jednostkę długości, sztywniejsza i mniej wytężona. To wyjaśnia, dlaczego wały napędowe i drążki skrętne często mają przekrój rurowy.',
      caption:
        'Przy tym samym momencie T=1200 N·m naprężenie w rurze wynosi około 20,9 MPa zamiast 36,7 MPa, a kąt skręcenia około 0,512°…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'T=1200\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Krok 4',
      narration:
        'Cena tego rozwiązania to większa średnica zewnętrzna, a więc większe wymagania gabarytowe i większa podatność cienkiej ścianki na uszkodzenia. Rura o małej grubości ścianki może też wymagać żeber, tulei lub ograniczenia obciążenia skupionego. W zadaniu projektowym trzeba więc porównać nie tylko masę i sztywność, ale też przestrzeń, sposób mocowania i koszt wykonania.',
      caption:
        'Cena tego rozwiązania to większa średnica zewnętrzna, a więc większe wymagania gabarytowe i większa podatność cienkiej ścianki na…',
      visual: 'section',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 5',
      narration:
        'Przy tej samej masie rura ma większy J_o, a w naszym przykładzie także większy W_o niż wał pełny o średnicy 55 mm, ponieważ jej średnica zewnętrzna jest większa. Wskaźnik rury wynosi około 57 500 mm^3, a wału pełnego 32 668 mm^3. To pokazuje, że porównanie „na masę” jest zupełnie inne niż porównanie „na średnicę”.',
      caption:
        'Przy tej samej masie rura ma większy J_o, a w naszym przykładzie także większy W_o niż wał pełny o średnicy 55 mm, ponieważ jej…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'J_o',
    },
  ],
} satisfies SolutionData
