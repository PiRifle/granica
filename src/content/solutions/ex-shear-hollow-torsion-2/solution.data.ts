import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-hollow-torsion-2',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 2',
  duration: 7,
  given: ['D_wału = 80 mm', 'd_rury = 50 mm', 'T = 2,5 kN·m'],
  result:
    'Ten przykład pokazuje, dlaczego samo stwierdzenie „rura jest lżejsza” nie wystarcza. Trzeba podać, co pozostaje stałe: średnica zewnętrzna, masa, moment, a może gabaryt. Dopiero wtedy porównanie ma sens i można policzyć konkretną różnicę.',
  figure: {
    kind: 'section',
    width: 94.34,
    height: 94.34,
    parts: [{ x: 0, y: 0, width: 94.34, height: 94.34, label: 'rura ∅94,3', tone: 'light' }],
    holes: [{ cx: 47.17, cy: 47.17, r: 25, label: '∅50' }],
    centroid: { x: 47.17, y: 47.17 },
    values: [
      { label: 'T', value: '2,5 kN·m', focus: 'load', reveal: 0 },
      { label: 'D_wału', value: '80 mm', focus: 'design', reveal: 0 },
      { label: 'd_rury', value: '50 mm', focus: 'design', reveal: 0 },
      { label: 'A_0', value: '5 027 mm²', focus: 'design', reveal: 1 },
      { label: 'D_rury', value: '94,34 mm', focus: 'design' },
      { label: 'grubość ścianki', value: '22,17 mm', focus: 'design', reveal: 1 },
      { label: 'J_o', value: '7 162 831 mm⁴', focus: 'design' },
      { label: 'τ_max', value: '16,5 MPa', focus: 'stress', reveal: 2 },
      { label: 'τ wału pełnego', value: '24,9 MPa', focus: 'stress', reveal: 2 },
      { label: 'redukcja naprężenia', value: '34 %', focus: 'design' },
    ],
    note: 'Przy równej masie rura ma większą średnicę zewnętrzną, ale mniejsze naprężenie od wału pełnego.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Porównajmy teraz rurę z wałem pełnym przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Przyjmijmy, że wał pełny ma średnicę 80 mm, a rura ma średnicę wewnętrzną 50 mm. Chcemy dobrać taką średnicę zewnętrzną rury, aby pole przekroju, a więc i masa na jednostkę długości, były takie same.',
      caption:
        'Porównajmy teraz rurę z wałem pełnym przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Przyjmijmy, że wał pełny ma…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '80\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Pole wału pełnego wynosi A_0 = π · 80^2/4 = 5 027 mm^2. Dla rury A = π(D^2-50^2)/4. Przyrównanie pól daje D^2-2500 = 6400, czyli D = √(8900) = 94,34 mm. Rura musi mieć więc większą średnicę zewnętrzną, ale jej ścianka ma grubość (94,34-50)/2 = 22,17 mm.',
      caption:
        'Pole wału pełnego wynosi A_0 = π · 80^2/4 = 5 027 mm^2. Dla rury A = π(D^2-50^2)/4. Przyrównanie pól daje D^2-2500 = 6400, czyli D…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'A_0 = \\pi \\cdot 80^2/4 = 5027\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla takiej rury J_o = π(94,34^4-50^4)/32 = 7 162 831 mm^4. Przy momencie 2,5 kN·m maksymalne naprężenie wynosi τ_max = 2 500 000 · 47,17/7 162 831 = 16,46 MPa. Wał pełny o średnicy 80 mm miał w tym samym zadaniu 24,87 MPa.',
      caption:
        'Dla takiej rury J_o = π(94,34^4-50^4)/32 = 7 162 831 mm^4. Przy momencie 2,5 kN·m maksymalne naprężenie wynosi τ_max = 2 500 000…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'J_o = \\pi(94{,}34^4-50^4)/32 = 7\\,162\\,831\\ \\text{mm}^4',
    },
    {
      title: 'Krok 4',
      narration:
        'Przy tej samej masie rura przenosi więc ten sam moment przy naprężeniu mniejszym o około 34%. Jej wadą jest większa średnica zewnętrzna, a więc większe gabaryty i większa powierzchnia zewnętrzna. W ciasnej obudowie maszyny ten warunek może przeważyć nad oszczędnością masy.',
      caption:
        'Przy tej samej masie rura przenosi więc ten sam moment przy naprężeniu mniejszym o około 34%. Jej wadą jest większa średnica…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '34\\%',
    },
    {
      title: 'Krok 5',
      narration:
        'Ten przykład pokazuje, dlaczego samo stwierdzenie „rura jest lżejsza” nie wystarcza. Trzeba podać, co pozostaje stałe: średnica zewnętrzna, masa, moment, a może gabaryt. Dopiero wtedy porównanie ma sens i można policzyć konkretną różnicę.',
      caption:
        'Ten przykład pokazuje, dlaczego samo stwierdzenie „rura jest lżejsza” nie wystarcza. Trzeba podać, co pozostaje stałe: średnica…',
      visual: 'section',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
