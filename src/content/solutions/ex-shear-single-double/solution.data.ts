import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-single-double',
  title: 'Połączenia jedno- i dwucięte — przykład 1',
  duration: 7,
  given: ['d = 20 mm', 'F = 100 kN'],
  result:
    'τ_sr ≈ 159 MPa, a każda płaszczyzna przenosi 50 kN. Wynik jest typowy dla stali konstrukcyjnej, ale wymaga porównania z naprężeniem dopuszczalnym i sprawdzenia docisku blach.',
  figure: {
    kind: 'section',
    width: 20,
    height: 20,
    parts: [{ x: 0, y: 0, width: 20, height: 20, label: 'sworzeń ∅20', tone: 'solid' }],
    centroid: { x: 10, y: 10 },
    values: [
      { label: 'F', value: '100 kN', focus: 'load', reveal: 0 },
      { label: 'd', value: '20 mm', focus: 'design', reveal: 0 },
      { label: 'A', value: '314,16 mm²', focus: 'design' },
      { label: '2A', value: '628,32 mm²', focus: 'design' },
      { label: 'F_p', value: '50 kN', focus: 'load' },
      { label: 'τ_sr', value: '159,2 MPa', focus: 'stress', reveal: 3 },
      { label: 'τ jednocięte', value: '318,3 MPa', focus: 'stress' },
    ],
    note: 'Sworzeń dwucięty przenosi siłę na dwóch płaszczyznach, więc naprężenie jest dwa razy mniejsze.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Pole jednego przekroju: A = π · 20^2/4 = 314,16 mm^2.',
      caption: 'Pole jednego przekroju: A = π · 20^2/4 = 314,16 mm^2.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'A = \\pi \\cdot 20^2/4 = 314{,}16\\ \\text{mm}^2',
    },
    {
      title: 'Krok 2',
      narration: 'Liczba płaszczyzn dla jednego sworznia dwuciętego: n = 2, więc łączne pole wynosi 2A = 628,32 mm^2.',
      caption: 'Liczba płaszczyzn dla jednego sworznia dwuciętego: n = 2, więc łączne pole wynosi 2A = 628,32 mm^2.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'n = 2',
    },
    {
      title: 'Krok 3',
      narration: 'Siła na jedną płaszczyznę: F_p = 100/2 = 50 kN = 50 000 N.',
      caption: 'Siła na jedną płaszczyznę: F_p = 100/2 = 50 kN = 50 000 N.',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'F_p = 100/2 = 50\\ \\text{kN} = 50\\,000\\ \\text{N}',
    },
    {
      title: 'Krok 4',
      narration: 'Średnie naprężenie: τ_sr = 100 000/628,32 = 159,15 MPa.',
      caption: 'Średnie naprężenie: τ_sr = 100 000/628,32 = 159,15 MPa.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\tau_{sr} = 100\\,000/628{,}32 = 159{,}15\\ \\text{MPa}',
    },
    {
      title: 'Krok 5',
      narration: 'Kontrola: ta sama siła na jednym cięciu dałaby 100 000/314,16 = 318,3 MPa, czyli dwa razy więcej.',
      caption: 'Kontrola: ta sama siła na jednym cięciu dałaby 100 000/314,16 = 318,3 MPa, czyli dwa razy więcej.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '100\\,000/314{,}16 = 318{,}3\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
