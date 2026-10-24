import type { SolutionData } from '../../model'
import { SteinerParallelAxis2Animation } from './animation'

export default {
  id: 'ex-m4-steiner-parallel-axis-2',
  title: 'Twierdzenie Steinera — przykład 2',
  duration: 7,
  given: ['środnik 20 × 100 mm', 'półka 120 × 20 mm'],
  result:
    'Zwróć uwagę, że wkład półki jest prawie tak duży jak wkład większego pola środnika, mimo że półka ma mniejsze pole. Decyduje odległość od osi. To wyjaśnia, dlaczego w przekrojach zginanych półki umieszcza się na zewnątrz, a nie przy środku.',
  animation: SteinerParallelAxis2Animation,
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
      { label: 'I_xc środnika', value: '1 666 667 mm⁴', focus: 'Ix' },
      { label: 'I_xc półki', value: '80 000 mm⁴', focus: 'Ix' },
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '2,947·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Teownik: środnik 20 × 100 mm i półka 120 × 20 mm; oś centralna 82,73 mm nad dolnym końcem środnika.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wróćmy do przekroju teowego z lekcji o momentach statycznych: środnik 20 × 100 mm, półka 120 × 20 mm, środek ciężkości 82,73 mm od dolnego końca środnika. Pole wynosi 4400 mm². Oś x_c jest pozioma i przechodzi przez wspólny środek ciężkości.',
      caption: 'Teownik z osią centralną poziomą na wysokości 82,73 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_1=20\\cdot100=2000\\ \\text{mm}^2,\\quad A_2=120\\cdot20=2400\\ \\text{mm}^2,\\quad A=4400\\ \\text{mm}^2,\\quad \\bar{y}=82{,}73\\ \\text{mm}',
    },
    {
      title: 'Osie części i odległości',
      narration:
        'Środek środnika leży na wysokości 50 mm, więc jego oś jest oddalona od wspólnej osi o a_1=82,73−50=32,73 mm. Środek półki leży na 110 mm, więc a_2=110−82,73=27,27 mm. Te dwie odległości decydują o składnikach Steinera.',
      caption: 'Własne osie obu części i ich odległości od wspólnej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'a_1=82{,}73-50=32{,}73\\ \\text{mm},\\qquad a_2=110-82{,}73=27{,}27\\ \\text{mm}',
    },
    {
      title: 'Przesunięcie środnika o d',
      narration:
        'Oś środnika przesuwamy równolegle o d=a_1=32,73 mm do wspólnej osi. Jego moment własny to 1 666 667 mm⁴, a składnik przesunięcia A_1 d² rośnie z kwadratem odległości i osiąga około 2 142 149 mm⁴.',
      caption: 'Składnik przesunięcia środnika rośnie z kwadratem d.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_1=1\\,666\\,667+2000\\cdot32{,}73^2\\approx1\\,666\\,667+2\\,142\\,149=3\\,808\\,816\\ \\text{mm}^4',
    },
    {
      title: 'Przesunięcie półki o d',
      narration:
        'Oś półki przesuwamy równolegle o d=a_2=27,27 mm. Moment własny półki to tylko 80 000 mm⁴, ale składnik A_2 d² wynosi około 1 785 124 mm⁴. Wkład półki okazuje się prawie tak duży jak wkład środnika o większym polu.',
      caption: 'Składnik A_2 d² półki jest niemal równy całemu wkładowi środnika.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_2=80\\,000+2400\\cdot27{,}27^2\\approx80\\,000+1\\,785\\,124=1\\,865\\,124\\ \\text{mm}^4',
    },
    {
      title: 'Suma Ix',
      narration:
        'Suma daje I_x≈3 808 816+1 865 124=5 673 940 mm⁴, czyli około 5,67·10⁶ mm⁴. Składniki Steinera obu części są większe niż ich momenty własne, bo oba środki są odsunięte od wspólnej osi.',
      caption: 'Suma wkładów środnika i półki względem wspólnej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=3\\,808\\,816+1\\,865\\,124=5\\,673\\,940\\ \\text{mm}^4\\approx5{,}67\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola przez podstawę i wniosek',
      narration:
        'Kontrola przez moment względem podstawy: I_podstawa≈35,79·10⁶ mm⁴, a po odjęciu A y_C²≈30,11·10⁶ mm⁴ otrzymujemy z powrotem około 5,67·10⁶ mm⁴. Oś pionowa jest osią symetrii, więc I_y≈2,947·10⁶ mm⁴ liczymy bez składników Steinera. Oddalenie pola od osi jest ważniejsze niż samo pole części.',
      caption: 'Twierdzenie Steinera działa w obie strony; decyduje odległość od osi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '35{,}79\\cdot10^6-4400\\cdot82{,}73^2\\approx5{,}67\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx2{,}947\\cdot10^6\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
