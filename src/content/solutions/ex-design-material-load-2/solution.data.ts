import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-material-load-2',
  title: 'Dobór materiału i obciążenia dopuszczalnego — przykład 2',
  duration: 7,
  given: ['L=1,2 m', 'P=25 kN', 'n=1,5', 'R_e(stal)=235 MPa', 'E(stal)=200 GPa', 'R_e(aluminium)=120 MPa'],
  result:
    'W rzeczywistym projekcie dochodzi jeszcze koszt materiału i wykonania. Aluminium jest lżejsze, ale często droższe za kilogram i ma mniejszą sztywność, co wymaga większego przekroju. Stal jest tańsza i sztywniejsza, ale cięższa. Decyzja zależy od tego, które kryterium jest ważniejsze: masa, koszt, sztywność czy dostępność.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [{ id: '1', label: 'stal', length: 1200, area: 160, n: 25, sigma: 156.25, deltaL: 0.9375 }],
    loads: [{ node: 1, value: 25, label: 'P = 25 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Na rysunku wariant stalowy A = 160 mm²; wariant aluminiowy wymaga A = 360 mm² ze względu na sztywność.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy wybór między stalą a aluminium dla pręta o długości L=1,2 m, obciążonego siłą P=25 kN. Wymagany współczynnik bezpieczeństwa wynosi n=1,5, a dopuszczalne wydłużenie 1,2 mm. Dla stali przyjmujemy R_e=235 MPa, E=200 GPa, a dla aluminium R_e=120 MPa, E=70 GPa.',
      caption:
        'Rozważmy wybór między stalą a aluminium dla pręta o długości L=1,2 m, obciążonego siłą P=25 kN. Wymagany współczynnik…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'L=1{,}2\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Dla stali naprężenie dopuszczalne wynosi k=235/1,5=156,7 MPa. Wymagane pole z wytrzymałości to A≥25 000/156,7=159,6 mm^2. Wymagane pole ze sztywności to A≥ PL/(EΔ L_dop)=25 000·1200/(200 000·1,2)=125 mm^2. Decyduje wytrzymałość, więc przyjmujemy A=160 mm^2.',
      caption:
        'Dla stali naprężenie dopuszczalne wynosi k=235/1,5=156,7 MPa. Wymagane pole z wytrzymałości to A≥25 000/156,7=159,6 mm^2.…',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula: 'k=235/1{,}5=156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla aluminium k=120/1,5=80 MPa, więc z wytrzymałości A≥25 000/80=312,5 mm^2. Ze sztywności A≥25 000·1200/(70 000·1,2)=357,1 mm^2. Decyduje sztywność, więc przyjmujemy A=360 mm^2.',
      caption:
        'Dla aluminium k=120/1,5=80 MPa, więc z wytrzymałości A≥25 000/80=312,5 mm^2. Ze sztywności A≥25 000·1200/(70 000·1,2)=357,1 mm^2.…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'k=120/1{,}5=80\\ \\text{MPa}',
    },
    {
      title: 'Krok 4',
      narration:
        'Mimo większego pola aluminium może być lżejsze. Masa stali to około 160·1200·7,85·10^-6≈1,51 kg, a aluminium 360·1200·2,70·10^-6≈1,17 kg. Różnica wynika z mniejszej gęstości aluminium, mimo że jego moduł Younga jest prawie trzykrotnie mniejszy. To dobry przykład tego, że dobór materiału nie sprowadza się do jednej liczby.',
      caption:
        'Mimo większego pola aluminium może być lżejsze. Masa stali to około 160·1200·7,85·10^-6≈1,51 kg, a aluminium…',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: '160\\cdot1200\\cdot7{,}85\\cdot10^{-6}\\approx1{,}51\\ \\text{kg}',
    },
    {
      title: 'Krok 5',
      narration:
        'W rzeczywistym projekcie dochodzi jeszcze koszt materiału i wykonania. Aluminium jest lżejsze, ale często droższe za kilogram i ma mniejszą sztywność, co wymaga większego przekroju. Stal jest tańsza i sztywniejsza, ale cięższa. Decyzja zależy od tego, które kryterium jest ważniejsze: masa, koszt, sztywność czy dostępność.',
      caption:
        'W rzeczywistym projekcie dochodzi jeszcze koszt materiału i wykonania. Aluminium jest lżejsze, ale często droższe za kilogram i…',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '1' },
    },
  ],
} satisfies SolutionData
