import type { SolutionData } from '../../model'
import { AxialStrengthConditionAnimation } from './animation'

export default {
  id: 'ex-axial-strength-condition',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 1',
  duration: 7,
  given: ['N = 90 kN', 'R_e = 235 MPa', 'n = 1,5', 'A = 600 mm²'],
  result:
    'Amin = 574,5 mm², a przekrój 600 mm² spełnia warunek: σ = 150 MPa, nrz = 1,567, czyli zapas jest większy od wymaganego 1,5.',
  animation: AxialStrengthConditionAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Oblicz naprężenie dopuszczalne: σdop = Re/n = 235/1,5 = 156,7 MPa. Wyznacz minimalne pole: Amin = |N|/σdop = 90 000/156,7 = 574,5 mm². Przyjęte A = 600 mm² jest większe od Amin, więc wstępny dobór jest poprawny. Sprawdź rzeczywiste naprężenie: σ = 90 000/600 = 150 MPa. Porównaj z dopuszczalnym: 150 MPa jest mniejsze od 156,7 MPa, więc warunek jest spełniony. Oblicz rzeczywisty zapas: nrz = 235/150 = 1,567. Sprawdź zakres sprężysty: 150 MPa jest znacznie poniżej 235 MPa, więc model liniowy jest uzasadniony. Zauważ, że przekrój 570 mm² dałby σ = 157,9 MPa, czyli przekroczyłby wartość dopuszczalną. Zaokrąglenie w dół byłoby błędem.',
      caption:
        'Zauważ, że przekrój 570 mm² dałby σ = 157,9 MPa, czyli przekroczyłby wartość dopuszczalną. Zaokrąglenie w dół byłoby błędem.',
      visual: 'axial',
      formula:
        '\\sigma_{\\mathrm{dop}} = Re/n = 235/1{,}5 = 156{,}7 MPa \\qquad A_{\\min} = |N|/\\sigma_{\\mathrm{dop}} = 90\\,000/156{,}7 = 574{,}5 mm^{2} \\qquad \\sigma = 90\\,000/600 = 150 MPa \\qquad n_{\\mathrm{rz}} = 235/150 = 1{,}567 \\qquad \\sigma = 157{,}9 MPa',
    },
  ],
} satisfies SolutionData
