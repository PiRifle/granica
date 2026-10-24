import type { SolutionData } from '../../model'
import { StrengthStiffnessDesignAnimation } from './animation'

export default {
  id: 'ex-m3-strength-stiffness-design',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 1',
  duration: 7,
  given: ['L = 2,5 m', 'N = 60 kN', 'E = 200 GPa', 'σ_dop = 160 MPa', 'ΔL_dop = 1,2 mm'],
  result:
    'Decyduje warunek sztywności. Minimalne pole wynosi 625 mm^2, a po zaokrągleniu do 30 mm otrzymujemy naprężenie około 84,9 MPa i wydłużenie około 1,06 mm. Oba warunki są spełnione.',
  animation: StrengthStiffnessDesignAnimation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 2500,
        area: 706.9,
        n: 60,
        sigma: 84.9,
        epsilon: 0.0004245,
        deltaL: 1.06,
      },
    ],
    loads: [
      {
        node: 1,
        value: 60,
        label: 'N = 60 kN',
      },
    ],
    note: 'Przyjęto d = 30 mm, A = 706,9 mm²; ΔL ≈ 1,06 mm.',
  },
  scenes: [
    {
      title: 'Model pręta',
      narration:
        'Pręt o stałym przekroju okrągłym ma długość 2,5 m i przenosi siłę 60 kN. Dane materiałowe to E = 200 GPa, σ_dop = 160 MPa i ΔL_dop = 1,2 mm. Szukamy średnicy, która spełni oba warunki jednocześnie.',
      caption: 'Warunek wytrzymałości i warunek sztywności dają dwa różne minima pola przekroju.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'L=2{,}5\\ \\text{m},\\quad N=60\\ \\text{kN},\\quad A=?',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Naprężenie nie może przekroczyć 160 MPa. Z warunku σ = N/A ≤ σ_dop otrzymujemy minimalne pole 375 mm², czyli średnicę około 21,9 mm.',
      caption: 'To minimum zależy tylko od siły i naprężenia dopuszczalnego.',
      visual: 'axial',
      focus: { metric: 'Aσ' },
      formula:
        'A_\\sigma=\\frac{N}{\\sigma_{\\mathrm{dop}}}=\\frac{60\\,000}{160}=375\\ \\text{mm}^2,\\qquad d_\\sigma\\approx21{,}9\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Wydłużenie nie może przekroczyć 1,2 mm. Z warunku ΔL = NL/(EA) ≤ ΔL_dop otrzymujemy pole 625 mm², czyli średnicę około 28,2 mm. To więcej niż wymagała wytrzymałość.',
      caption: 'Długość pręta wchodzi do warunku sztywności, dlatego ten warunek rośnie wraz z L.',
      visual: 'axial',
      focus: { metric: 'Aδ' },
      formula:
        'A_\\delta=\\frac{NL}{E\\Delta L_{\\mathrm{dop}}}=\\frac{60\\,000\\cdot2500}{200\\,000\\cdot1{,}2}=625\\ \\text{mm}^2,\\qquad d_\\delta\\approx28{,}2\\ \\text{mm}',
    },
    {
      title: 'Warunek decydujący',
      narration:
        'Przyjmujemy większe z wymaganych pól, bo oba warunki muszą być spełnione. Pole 625 mm² jest większe od 375 mm², więc decyduje sztywność. Po zaokrągleniu w górę wybieramy d = 30 mm, czyli A ≈ 706,9 mm².',
      caption: 'Zaokrąglenie średnicy w górę powiększa pole i poprawia oba warunki.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A\\ge\\max(375,\\ 625)=625\\ \\text{mm}^2,\\qquad d_{\\min}=28{,}2\\ \\text{mm}\\ \\rightarrow\\ d=30\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie naprężenia',
      narration:
        'Dla przyjętej średnicy 30 mm pole wynosi 706,9 mm². Rzeczywiste naprężenie to 60 000/706,9 ≈ 84,9 MPa, czyli znacznie mniej niż 160 MPa.',
      caption: 'Warunek wytrzymałości jest spełniony z dużym zapasem.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{60\\,000}{706{,}9}\\approx84{,}9\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie wydłużenia',
      narration:
        'Wydłużenie wynosi 60 000·2500/(200 000·706,9) ≈ 1,06 mm. Jest mniejsze od dopuszczalnych 1,2 mm, więc ostateczny przekrój spełnia oba warunki.',
      caption: 'Oba warunki są spełnione: σ ≈ 84,9 MPa < 160 MPa oraz ΔL ≈ 1,06 mm < 1,2 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L=\\frac{60\\,000\\cdot2500}{200\\,000\\cdot706{,}9}\\approx1{,}06\\ \\text{mm}\\le1{,}2\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
