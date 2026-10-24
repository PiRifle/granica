import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-safety-factor',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 1',
  duration: 7,
  given: ['A=250 mm^2', 'F=40 kN', 'R_e=235 MPa', 'n_{wym}=1'],
  result:
    'Element jest zbyt wytężony: σ=160 MPa przekracza k=156,7 MPa, a zapas 1,47 jest mniejszy od wymaganego 1,5. Potrzebne jest pole co najmniej 255,3 mm^2.',
  figure: {
    kind: 'cube',
    stresses: { x: 160, y: 0, z: 0 },
    strains: { x: 0.0008, y: -0.00024, z: -0.00024 },
    volumeChange: '0,032%',
    values: [
      { label: 'A', value: '250 mm²', focus: 'stress', reveal: 0 },
      { label: 'F', value: '40 kN', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '1,5', focus: 'stress', reveal: 0 },
      { label: 'σ', value: '160 MPa', focus: 'stress' },
      { label: 'k', value: '156,67 MPa', focus: 'stress' },
      { label: 'n_rz', value: '1,469', focus: 'stress' },
      { label: 'A_min', value: '255,3 mm²', focus: 'stress' },
      { label: 'deficyt', value: '5,3 mm²', focus: 'stress' },
      { label: 'ε_x', value: '800 με', focus: 'strain' },
      { label: 'ε_y', value: '−240 με', focus: 'strain' },
      { label: 'θ', value: '320 με', focus: 'volume' },
    ],
    note: 'Warunek wytrzymałości nie jest spełniony: rzeczywisty zapas 1,469 jest mniejszy od wymaganego 1,5.',
  },
  scenes: [
    {
      title: 'Zapisz dane elementu',
      narration:
        'Pręt ma pole przekroju A = 250 mm² i przenosi siłę F = 40 kN. Materiał ma R_e = 235 MPa, a wymagany zapas n_wym = 1,5.',
      caption: 'A = 250 mm², F = 40 kN, R_e = 235 MPa, n_wym = 1,5.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'A=250\\,\\text{mm}^2,\\qquad F=40\\,\\text{kN},\\qquad R_e=235\\,\\text{MPa},\\qquad n_{wym}=1{,}5',
    },
    {
      title: 'Oblicz naprężenie',
      narration: 'Naprężenie normalne wynosi σ = F/A = 40 000/250 = 160 MPa.',
      caption: 'σ = 160 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=\\frac{F}{A}=\\frac{40\\,000}{250}=160\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne to k = R_e/n_wym = 235/1,5 = 156,67 MPa. Jest ono mniejsze od naprężenia rzeczywistego 160 MPa.',
      caption: 'k = 156,67 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'k=\\frac{R_e}{n_{wym}}=\\frac{235}{1{,}5}=156{,}67\\,\\text{MPa}',
    },
    {
      title: 'Oblicz zapas rzeczywisty',
      narration:
        'Zapas rzeczywisty wynosi n_rz = R_e/σ = 235/160 = 1,469. Jest mniejszy od wymaganego 1,5, więc element jest zbyt wytężony.',
      caption: 'n_rz = 1,469 < 1,5.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'n_{rz}=\\frac{235}{160}=1{,}469,\\qquad 1{,}469<1{,}5',
    },
    {
      title: 'Sprawdź warunek',
      narration:
        'Warunek 160 > 156,67 MPa jest spełniony jako nierówność przeciwna do wymaganej, podobnie 1,469 < 1,5. Element nie spełnia wymagania wytrzymałościowego.',
      caption: '160 MPa > 156,67 MPa, więc warunek nie jest spełniony.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '160>156{,}67\\,\\text{MPa},\\qquad 1{,}469<1{,}5',
    },
    {
      title: 'Oblicz minimalne pole',
      narration:
        'Wymagane pole wynosi A_min = F·n_wym/R_e = 40 000·1,5/235 = 255,3 mm². Brakuje 255,3 − 250 = 5,3 mm², czyli około 2% pola.',
      caption: 'A_min = 255,3 mm², brakuje 5,3 mm².',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'A_{min}=\\frac{40\\,000\\cdot1{,}5}{235}=255{,}3\\,\\text{mm}^2,\\qquad 255{,}3-250=5{,}3\\,\\text{mm}^2',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = 800 με, ε_y = ε_z = −240 με i θ = 320 με. Odkształcenia są sprężyste, ale naprężenie przekracza wartość dopuszczalną.',
      caption: 'ε_x = 800 με, ε_y = ε_z = −240 με, θ = 320 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{160}{200\\,000}=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=\\varepsilon_z=-240\\,\\mu\\varepsilon,\\qquad \\theta=320\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 320 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=320\\,\\mu\\varepsilon,\\qquad |\\varepsilon_y|=240\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
