import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-review-exam',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 1',
  duration: 7,
  given: ['M=800 N·m', 'T=600 N·m', 'R_e=235 MPa', 'n=2'],
  result:
    'Przyjęto d=45 mm. Naprężenie zredukowane wynosi około 106,6 MPa i jest mniejsze od dopuszczalnego 117,5 MPa, a rzeczywisty zapas względem R_e wynosi około 2,20.',
  figure: {
    kind: 'section',
    width: 45,
    height: 45,
    parts: [
      {
        x: 0,
        y: 0,
        width: 45,
        height: 45,
        label: 'wał ∅45',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 22.5,
      y: 22.5,
    },
    values: [
      {
        label: 'M',
        value: '800 N·m',
        focus: 'M',
        reveal: 0,
      },
      {
        label: 'T',
        value: '600 N·m',
        focus: 'T',
        reveal: 0,
      },
      {
        label: 'R_e',
        value: '235 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'n',
        value: '2',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'k',
        value: '117,5 MPa',
        focus: 'stress',
      },
      {
        label: 'M_eq',
        value: '953,9 N·m',
        focus: 'design',
      },
      {
        label: 'd_min',
        value: '43,6 mm',
        focus: 'design',
      },
      {
        label: 'd',
        value: '45 mm',
        focus: 'design',
      },
      {
        label: 'W',
        value: '8 946 mm³',
        focus: 'design',
        reveal: 8,
      },
      {
        label: 'W_o',
        value: '17 892 mm³',
        focus: 'design',
        reveal: 5,
      },
      {
        label: 'σ',
        value: '89,4 MPa',
        focus: 'stress',
      },
      {
        label: 'τ',
        value: '33,5 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_red',
        value: '106,6 MPa',
        focus: 'stress',
      },
      {
        label: 'n_rz',
        value: '2,20',
        focus: 'design',
      },
    ],
    note: 'Naprężenie zredukowane 106,6 MPa jest mniejsze od dopuszczalnego 117,5 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Naprężenie dopuszczalne: k=R_e/n=235/2=117,5 MPa.',
      caption: 'Naprężenie dopuszczalne: k=R_e/n=235/2=117,5 MPa.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: 'k=R_e/n=235/2=117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Krok 2',
      narration: 'Moment równoważny: M_eq=√(M^2+0,75T^2)=√(800^2+0,75·600^2)≈953,9 N·m.',
      caption: 'Moment równoważny: M_eq=√(M^2+0,75T^2)=√(800^2+0,75·600^2)≈953,9 N·m.',
      visual: 'section',
      focus: {
        metric: 'M',
      },
      formula:
        'M_{\\mathrm{eq}}=\\sqrt{M^2+0{,}75T^2}=\\sqrt{800^2+0{,}75\\cdot600^2}\\approx953{,}9\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Krok 3',
      narration: 'Zamiana jednostek: M_eq≈953 900 N·mm, k=117,5 N/mm^2.',
      caption: 'Zamiana jednostek: M_eq≈953 900 N·mm, k=117,5 N/mm^2.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'M_{\\mathrm{eq}}\\approx953\\,900\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 4',
      narration: 'Wymagana średnica: d≥∛(32M_eq/(π k))=∛(32·953 900/(π·117,5))≈43,6 mm.',
      caption: 'Wymagana średnica: d≥∛(32M_eq/(π k))=∛(32·953 900/(π·117,5))≈43,6 mm.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula:
        'd\\ge\\sqrt[3]{32M_{\\mathrm{eq}}/(\\pi k)}=\\sqrt[3]{32\\cdot953\\,900/(\\pi\\cdot117{,}5)}\\approx43{,}6\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Przyjmujemy d=45 mm z szeregu wymiarów co 5 mm.',
      caption: 'Przyjmujemy d=45 mm z szeregu wymiarów co 5 mm.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'd=45\\ \\text{mm}',
    },
    {
      title: 'Krok 6',
      narration: 'Wskaźniki: W=π·45^3/32≈8946 mm^3, W_o=2W≈17 892 mm^3.',
      caption: 'Wskaźniki: W=π·45^3/32≈8946 mm^3, W_o=2W≈17 892 mm^3.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'W=\\pi\\cdot45^3/32\\approx8946\\ \\text{mm}^3',
    },
    {
      title: 'Krok 7',
      narration: 'Naprężenia: σ=800 000/8946≈89,4 MPa, τ=600 000/17 892≈33,5 MPa.',
      caption: 'Naprężenia: σ=800 000/8946≈89,4 MPa, τ=600 000/17 892≈33,5 MPa.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma=800\\,000/8946\\approx89{,}4\\ \\text{MPa}',
    },
    {
      title: 'Krok 8',
      narration: 'Naprężenie zredukowane: σ_red=√(89,4^2+3·33,5^2)≈106,6 MPa≤117,5 MPa.',
      caption: 'Naprężenie zredukowane: σ_red=√(89,4^2+3·33,5^2)≈106,6 MPa≤117,5 MPa.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        '\\sigma_{\\mathrm{red}}=\\sqrt{89{,}4^2+3\\cdot33{,}5^2}\\approx106{,}6\\ \\text{MPa}\\le117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Krok 9',
      narration: 'Zapas rzeczywisty: n_rz=235/106,6≈2,20, czyli więcej niż wymagane 2.',
      caption: 'Zapas rzeczywisty: n_rz=235/106,6≈2,20, czyli więcej niż wymagane 2.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'n_{rz}=235/106{,}6\\approx2{,}20',
    },
  ],
} satisfies SolutionData
