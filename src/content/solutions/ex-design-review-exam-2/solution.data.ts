import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-review-exam-2',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 2',
  duration: 7,
  given: ['D_1=60 mm', 'L_1=0,8 m', 'D_2=40 mm', 'L_2=0,6 m', 'T=500 N·m', 'G=80 GPa'],
  result:
    'Ten przykład pokazuje, że w układzie schodkowym trzeba sprawdzić każdy odcinek osobno. Największy moment jest wspólny, ale najmniejsza średnica decyduje o naprężeniu. Podobnie najdłuższy i najcieńszy odcinek może decydować o kącie. Tabela odcinków jest tu równie przydatna jak w zadaniach z prętami.',
  figure: {
    kind: 'beam',
    length: 1.4,
    supports: [
      { at: 0, label: 'A' },
      { at: 1.4, label: 'B' },
    ],
    shear: [
      [
        [0, 0.5],
        [1.4, 0.5],
      ],
    ],
    markers: [{ x: 0.7, y: 0.5, text: 'T = 0,5 kN·m', diagram: 'shear' }],
    values: [
      { label: 'D_1', value: '60 mm', focus: 'design', reveal: 0 },
      { label: 'L_1', value: '0,8 m', focus: 'design', reveal: 0 },
      { label: 'D_2', value: '40 mm', focus: 'design', reveal: 0 },
      { label: 'L_2', value: '0,6 m', focus: 'design', reveal: 0 },
      { label: 'T', value: '500 N·m', focus: 'T', reveal: 0 },
      { label: 'G', value: '80 GPa', focus: 'design', reveal: 0 },
      { label: 'J_o1', value: '1 272 345 mm⁴', focus: 'design' },
      { label: 'W_o1', value: '42 412 mm³', focus: 'design', reveal: 1 },
      { label: 'τ_1', value: '11,8 MPa', focus: 'stress', reveal: 1 },
      { label: 'J_o2', value: '251 327 mm⁴', focus: 'design', reveal: 1 },
      { label: 'W_o2', value: '12 566 mm³', focus: 'design', reveal: 1 },
      { label: 'τ_2', value: '39,8 MPa', focus: 'stress', reveal: 1 },
      { label: 'φ_1', value: '0,00393 rad', focus: 'design' },
      { label: 'φ_2', value: '0,01492 rad', focus: 'design', reveal: 2 },
      { label: 'φ', value: '0,01885 rad', focus: 'design', reveal: 2 },
      { label: 'φ', value: '1,08°', focus: 'design', reveal: 2 },
    ],
    note: 'Decyduje cieńszy odcinek 2: τ_2 = 39,8 MPa jest bliskie 40 MPa, a φ_2 dominuje w sumie kąta.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy wał schodkowy złożony z dwóch odcinków. Pierwszy ma D_1=60 mm i L_1=0,8 m, drugi D_2=40 mm i L_2=0,6 m. Wał przenosi moment T=500 N·m, a G=80 GPa. Przyjmij τ_dop=40 MPa i φ_dop=1,2°.',
      caption:
        'Rozważmy wał schodkowy złożony z dwóch odcinków. Pierwszy ma D_1=60 mm i L_1=0,8 m, drugi D_2=40 mm i L_2=0,6 m. Wał przenosi…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'D_1=60\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla pierwszego odcinka J_o1=π·60^4/32≈1 272 345 mm^4, a W_o1=2J_o1/60≈42 412 mm^3. Naprężenie wynosi τ_1=500 000/42 412≈11,8 MPa. Dla drugiego odcinka J_o2=π·40^4/32≈251 327 mm^4, a W_o2=2J_o2/40≈12 566 mm^3, więc τ_2=500 000/12 566≈39,8 MPa, czyli blisko granicy 40 MPa.',
      caption:
        'Dla pierwszego odcinka J_o1=π·60^4/32≈1 272 345 mm^4, a W_o1=2J_o1/60≈42 412 mm^3. Naprężenie wynosi τ_1=500 000/42 412≈11,8 MPa.…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'J_{o1}=\\pi\\cdot60^4/32\\approx1\\,272\\,345\\ \\text{mm}^4',
    },
    {
      title: 'Krok 3',
      narration:
        'Kąty skręcenia wynoszą φ_1=500 000·800/(80 000·1 272 345)≈0,00393 rad oraz φ_2=500 000·600/(80 000·251 327)≈0,01492 rad. Suma to około 0,01885 rad, czyli 1,08°, mniej niż 1,2°.',
      caption:
        'Kąty skręcenia wynoszą φ_1=500 000·800/(80 000·1 272 345)≈0,00393 rad oraz φ_2=500 000·600/(80 000·251 327)≈0,01492 rad. Suma to…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\varphi_1=500\\,000\\cdot800/(80\\,000\\cdot1\\,272\\,345)\\approx0{,}00393\\ \\text{rad}',
    },
    {
      title: 'Krok 4',
      narration:
        'Decyduje drugi odcinek, ponieważ ma mniejszą średnicę i większy iloraz T/W_o. Kąt jest sumą udziałów obu odcinków, więc nie wolno policzyć go tylko dla jednego z nich. Gdyby odcinki miały różne materiały, trzeba by użyć różnych G i zsumować kąty z odpowiednimi wartościami.',
      caption:
        'Decyduje drugi odcinek, ponieważ ma mniejszą średnicę i większy iloraz T/W_o. Kąt jest sumą udziałów obu odcinków, więc nie wolno…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'T/W_o',
    },
    {
      title: 'Krok 5',
      narration:
        'Ten przykład pokazuje, że w układzie schodkowym trzeba sprawdzić każdy odcinek osobno. Największy moment jest wspólny, ale najmniejsza średnica decyduje o naprężeniu. Podobnie najdłuższy i najcieńszy odcinek może decydować o kącie. Tabela odcinków jest tu równie przydatna jak w zadaniach z prętami.',
      caption:
        'Ten przykład pokazuje, że w układzie schodkowym trzeba sprawdzić każdy odcinek osobno. Największy moment jest wspólny, ale…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
