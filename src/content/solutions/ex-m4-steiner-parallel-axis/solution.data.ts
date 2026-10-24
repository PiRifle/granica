import type { SolutionData } from '../../model'
import { SteinerParallelAxisAnimation } from './animation'

export default {
  id: 'ex-m4-steiner-parallel-axis',
  title: 'Twierdzenie Steinera — przykład 1',
  duration: 7,
  given: ['półki 120 × 20 mm', 'środnik 20 × 160 mm'],
  result:
    'Moment bezwładności dwuteownika względem poziomej osi centralnej wynosi około 45,87· 10^6 mm^4≈ 4587 cm^4. Przy jednej trzeciej materiału przekrój zachowuje ponad połowę sztywności pełnego prostokąta, co pokazuje skuteczność oddalania półek od osi.',
  animation: SteinerParallelAxisAnimation,
  figure: {
    kind: 'section',
    width: 120,
    height: 200,
    parts: [
      { x: 0, y: 0, width: 120, height: 20, label: 'półka dolna', tone: 'light' },
      { x: 50, y: 20, width: 20, height: 160, label: 'środnik', tone: 'accent' },
      { x: 0, y: 180, width: 120, height: 20, label: 'półka górna', tone: 'light' },
    ],
    centroid: { x: 60, y: 100 },
    values: [
      { label: 'A półki', value: '2400 mm²', focus: 'section' },
      { label: 'A środnika', value: '3200 mm²', focus: 'section' },
      { label: 'A', value: '8000 mm²', focus: 'section' },
      { label: 'y_C', value: '100 mm', focus: 'centroid' },
      { label: 'I_xc półki', value: '80 000 mm⁴', focus: 'Ix' },
      { label: 'I_xc środnika', value: '6 826 667 mm⁴', focus: 'Ix' },
      { label: 'I_x', value: '45,87·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '5,867·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Dwuteownik 120 × 200 mm: dwie półki 120 × 20 mm i środnik 20 × 160 mm.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Dwuteownik ma wysokość 200 mm i szerokość 120 mm. Półki mają 120 × 20 mm, a środnik 20 × 160 mm. Z symetrii środek ciężkości leży w połowie wysokości, czyli 100 mm od dolnej krawędzi. Pola: półka 2400 mm², środnik 3200 mm², razem 8000 mm².',
      caption: 'Dwuteownik symetryczny względem obu osi centralnych.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_p=120\\cdot20=2400\\ \\text{mm}^2,\\quad A_s=20\\cdot160=3200\\ \\text{mm}^2,\\quad \\bar{y}=100\\ \\text{mm}',
    },
    {
      title: 'Osie centralne części',
      narration:
        'Każda półka ma własną oś centralną 90 mm od wspólnej osi x_c, bo jej środek leży na wysokości 10 mm, a wspólny środek na 100 mm. Środnik leży na wspólnej osi, więc dla niego a_s=0. To odległości, które wejdą do składnika Steinera.',
      caption: 'Dla obu półek a_p=90 mm; dla środnika a_s=0.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'a_p=100-10=90\\ \\text{mm},\\qquad a_s=100-100=0',
    },
    {
      title: 'Przesunięcie półki o d',
      narration:
        'Przesuwamy oś półki równolegle o d=90 mm do wspólnej osi centralnej. Składnik przesunięcia rośnie z kwadratem odległości: A_p d²=2400·90²=19 440 000 mm⁴. Na wykresie słupek rośnie coraz szybciej, bo zależność jest kwadratowa.',
      caption: 'Składnik A d² rośnie z kwadratem przesunięcia osi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'A_p d^2=2400\\cdot90^2=19\\,440\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Steiner dla półki',
      narration:
        'Wkład jednej półki to moment własny plus składnik przesunięcia: 80 000+2400·90²=80 000+19 440 000=19 520 000 mm⁴. Dwie półki dają 39 040 000 mm⁴. Moment własny jest przy tym znikomy wobec A a².',
      caption: 'Wkład jednej półki: 80 000+2400·90²=19 520 000 mm⁴.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '80\\,000+2400\\cdot90^2=80\\,000+19\\,440\\,000=19\\,520\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Moment środnika i suma',
      narration:
        'Środnik: I_xc,s=20·160³/12≈6 826 667 mm⁴. Jego środek leży na wspólnej osi, więc a_s=0 i nie ma składnika przesunięcia. Suma: 39 040 000+6 826 667=45 866 667 mm⁴≈45,87·10⁶ mm⁴.',
      caption: 'Suma: I_x=39 040 000+6 826 667=45 866 667 mm⁴.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=39\\,040\\,000+6\\,826\\,667=45\\,866\\,667\\ \\text{mm}^4\\approx45{,}87\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola i wniosek',
      narration:
        'Kontrola przez pustki: pełny prostokąt 120 × 200 ma I=80·10⁶ mm⁴, a dwie pustki 50 × 160 mają razem 34,13·10⁶ mm⁴. Różnica daje 45,87·10⁶ mm⁴. Pole spadło z 24 000 do 8000 mm², czyli do jednej trzeciej, ale moment pozostał na poziomie około 57,3% wartości pełnej. Moment względem pionowej osi wynosi około 5,867·10⁶ mm⁴.',
      caption: 'Oddalenie półek od osi daje dużą sztywność przy małym polu.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I=80\\cdot10^6-2\\cdot\\frac{50\\cdot160^3}{12}\\approx45{,}87\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx5{,}867\\cdot10^6\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
