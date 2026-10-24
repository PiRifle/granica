import type { SolutionData } from '../../model'
import { SafetyFactor1Animation } from './animation'

export default {
  id: 'ex-criteria-safety-factor',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 1',
  duration: 7,
  given: ['A=250 mm²', 'F=40 kN', 'R_e=235 MPa', 'n_{wym}=1'],
  result:
    'Element jest zbyt wytężony: σ=160 MPa przekracza k=156,7 MPa, a zapas 1,47 jest mniejszy od wymaganego 1,5. Potrzebne jest pole co najmniej 255,3 mm^2.',
  animation: SafetyFactor1Animation,
  figure: {
    kind: 'cube',
    stresses: {
      x: 160,
      y: 0,
      z: 0,
    },
    strains: {
      x: 0.0008,
      y: -0.00024,
      z: -0.00024,
    },
    volumeChange: '0,032%',
    values: [
      {
        label: 'A',
        value: '250 mm²',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'F',
        value: '40 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'R_e',
        value: '235 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'n_wym',
        value: '1,5',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ',
        value: '160 MPa',
        focus: 'stress',
      },
      {
        label: 'k',
        value: '156,67 MPa',
        focus: 'stress',
      },
      {
        label: 'n_rz',
        value: '1,469',
        focus: 'stress',
      },
      {
        label: 'A_min',
        value: '255,3 mm²',
        focus: 'stress',
      },
      {
        label: 'deficyt',
        value: '5,3 mm²',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '800 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '−240 με',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '320 με',
        focus: 'volume',
      },
    ],
    note: 'Warunek wytrzymałości nie jest spełniony: rzeczywisty zapas 1,469 jest mniejszy od wymaganego 1,5.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu A = 250 mm² jest rozciągany siłą F = 40 kN. Granica plastyczności wynosi R_e = 235 MPa, a projekt wymaga zapasu n_wym = 1,5.',
      caption: 'A = 250 mm², F = 40 kN, R_e = 235 MPa, n_wym = 1,5.',
      visual: 'cube',
      focus: {
        metric: 'model',
      },
      formula: 'A=250\\,\\text{mm}^2,\\qquad F=40\\,\\text{kN},\\qquad R_e=235\\,\\text{MPa},\\qquad n_{wym}=1{,}5',
    },
    {
      title: 'Granica i naprężenie robocze',
      narration:
        'Naprężenie robocze wynosi σ = F/A = 40 000/250 = 160 MPa. Naprężenie dopuszczalne to k = R_e/n_wym = 235/1,5 = 156,7 MPa. Granica materiału leży wyżej, ale wartość dopuszczalna jest już przekroczona.',
      caption: 'σ = 160 MPa, k = 156,7 MPa, R_e = 235 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula:
        '\\sigma=\\frac{F}{A}=\\frac{40\\,000}{250}=160\\,\\text{MPa},\\qquad k=\\frac{R_e}{n_{wym}}=\\frac{235}{1{,}5}=156{,}7\\,\\text{MPa}',
    },
    {
      title: 'Zapas jako stosunek granicy do naprężenia',
      narration:
        'Zapas rzeczywisty to iloraz granicy i naprężenia: n_rz = R_e/σ = 235/160 = 1,469. Inaczej mówiąc, granica jest 1,469 razy większa od naprężenia roboczego.',
      caption: 'R_e = 1,469·σ, czyli n_rz = 1,469.',
      visual: 'cube',
      focus: {
        metric: 'factor',
      },
      formula: 'n_{rz}=\\frac{R_e}{\\sigma}=\\frac{235}{160}=1{,}469',
    },
    {
      title: 'Sprawdzenie warunku',
      narration:
        'Wymagany zapas wynosi 1,5, a rzeczywisty tylko 1,469. Ponieważ n_rz < n_wym, warunek nie jest spełniony. To samo widać po stronie naprężeń: 160 MPa > 156,7 MPa.',
      caption: 'n_rz = 1,469 < 1,5 — warunek nie jest spełniony.',
      visual: 'cube',
      focus: {
        metric: 'check',
      },
      formula: 'n_{rz}=1{,}469<1{,}5,\\qquad \\sigma=160\\,\\text{MPa}>k=156{,}7\\,\\text{MPa}',
    },
    {
      title: 'Brakujące pole przekroju',
      narration:
        'Minimalne pole przy wymaganym zapasie to A_min = F·n_wym/R_e = 40 000·1,5/235 = 255,3 mm². Obecne pole 250 mm² jest o 5,3 mm² za małe, czyli o około 2%.',
      caption: 'A = 250 mm² < A_min = 255,3 mm²; brakuje 5,3 mm².',
      visual: 'cube',
      focus: {
        metric: 'area',
      },
      formula: 'A_{min}=\\frac{F\\,n_{wym}}{R_e}=\\frac{40\\,000\\cdot1{,}5}{235}=255{,}3\\,\\text{mm}^2',
    },
  ],
} satisfies SolutionData
