import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-review-exam',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 1',
  duration: 7,
  given: ['M=800 N·m', 'T=600 N·m', 'R_e=235 MPa', 'n=2'],
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DesignReviewExam1Animation }))),
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
      title: 'Model i obciążenia',
      narration:
        'Wał pełny przenosi jednocześnie moment zginający M = 800 N·m i moment skręcający T = 600 N·m. Z danych materiałowych wynika naprężenie dopuszczalne k = R_e/n = 235/2 = 117,5 MPa. Średnica nie jest jeszcze znana.',
      caption:
        'Model: jeden przekrój, dwa rodzaje obciążenia. Moment zginający i moment skręcający działają równocześnie.',
      visual: 'section',
      focus: { metric: 'loads' },
      formula: 'k=\\frac{R_e}{n}=\\frac{235}{2}=117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Stan naprężenia w przekroju',
      narration:
        'W skrajnym włóknie zginanie daje naprężenie normalne σ = M/W, a skręcanie daje naprężenie styczne τ = T/W_o na obwodzie. Oba naprężenia dotyczą tego samego punktu, więc nie można ich porównywać z k osobno.',
      caption: 'σ zmienia znak po przeciwnych stronach osi obojętnej, a τ rośnie liniowo od środka do obwodu.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\sigma=\\frac{M}{W},\\qquad \\tau=\\frac{T}{W_o}',
    },
    {
      title: 'Kryterium HMH',
      narration:
        'Naprężenie zredukowane łączy oba składniki: σ_red = √(σ² + 3τ²). Na płaszczyźnie σ–τ warunek σ_red ≤ k jest wnętrzem elipsy. Punkt (89,4; 33,5) MPa leży wewnątrz obszaru bezpiecznego.',
      caption: 'Elipsa HMH to granica σ² + 3τ² = k². Położenie punktu względem granicy decyduje o bezpieczeństwie.',
      visual: 'section',
      focus: { metric: 'criterion' },
      formula: '\\sigma_{\\mathrm{red}}=\\sqrt{\\sigma^2+3\\tau^2}\\le k',
    },
    {
      title: 'Moment równoważny i średnica',
      narration:
        'Dla przekroju kołowego W_o = 2W, więc cały warunek można zapisać przez moment równoważny M_eq = √(M² + 0,75T²) ≈ 953,9 N·m. Wymagana średnica wynosi 43,6 mm, więc przyjmujemy 45 mm.',
      caption: 'Przekrój rośnie od wymaganego minimum 43,6 mm do najbliższego wymiaru 45 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'd\\ge\\sqrt[3]{\\frac{32M_{\\mathrm{eq}}}{\\pi k}}\\approx43{,}6\\ \\text{mm}\\quad d=45\\ \\text{mm}',
    },
    {
      title: 'Kontrola dla d = 45 mm',
      narration:
        'Dla średnicy 45 mm wskaźniki wynoszą W ≈ 8 946 mm³ i W_o ≈ 17 892 mm³, a naprężenia σ ≈ 89,4 MPa i τ ≈ 33,5 MPa. Naprężenie zredukowane 106,6 MPa jest mniejsze od dopuszczalnego 117,5 MPa.',
      caption: 'Wykorzystanie granicy wynosi około 91%, więc warunek wytrzymałości jest spełniony.',
      visual: 'section',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{\\mathrm{red}}=\\sqrt{89{,}4^2+3\\cdot33{,}5^2}\\approx106{,}6\\ \\text{MPa}\\le117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Zapas i decyzja',
      narration:
        'Rzeczywisty zapas n_rz = R_e/σ_red = 235/106,6 ≈ 2,20 jest większy od wymaganego 2. Decyduje warunek wytrzymałości, a przyjęta średnica 45 mm spełnia wszystkie warunki zadania.',
      caption: 'Zapas 2,20 przekracza wymagane 2. Odpowiedź zawiera wymiar, warunek decydujący i kontrolę.',
      visual: 'section',
      focus: { metric: 'safety' },
      formula: 'n_{rz}=\\frac{R_e}{\\sigma_{\\mathrm{red}}}=\\frac{235}{106{,}6}\\approx2{,}20>2',
    },
  ],
} satisfies SolutionData
