import type { SolutionData } from '../../model'
import { HmhExample2Animation } from './animation'

export default {
  id: 'ex-criteria-hmh-2',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 2',
  duration: 7,
  given: ['σ = 150 MPa', 'τ = 80 MPa', 'σy = 0', 'Re = 355 MPa'],
  result:
    'Warto zwrócić uwagę, że największe naprężenie główne 184,7 MPa jest mniejsze od σHMH = 204,2 MPa, ale większe od σ = 150 MPa. To pokazuje, że HMH nie jest po prostu „największym naprężeniem”. Jest miarą energii, w której uczestniczą wszystkie trzy kierunki. Dla tego stanu Tresca dałaby σT = 184,7 − (−34,7) = 219,4 MPa, czyli jeszcze więcej.',
  animation: HmhExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'W punkcie na powierzchni wału naprężenie normalne od zginania wynosi σ = 150 MPa, a styczne od skręcania τ = 80 MPa. Przyjmujemy σ_y = 0, a stal ma granicę plastyczności R_e = 355 MPa.',
      caption: 'Punkt powierzchniowy wału: σ = 150 MPa, τ = 80 MPa, σ_y = 0.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma=150\\,\\text{MPa},\\qquad \\tau=80\\,\\text{MPa},\\qquad \\sigma_y=0,\\qquad R_e=355\\,\\text{MPa}',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Koło Mohra ma środek C = 75 MPa i promień R = √(75² + 80²) = 109,7 MPa. Stąd σ₁ = 184,7 MPa, σ₂ = −34,7 MPa i σ₃ = 0.',
      caption: 'C = 75 MPa, R = 109,7 MPa, σ₁ = 184,7 MPa, σ₂ = −34,7 MPa.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        'C=\\frac{150}{2}=75\\,\\text{MPa},\\qquad R=\\sqrt{75^{2}+80^{2}}=109{,}7\\,\\text{MPa},\\qquad \\sigma_1=184{,}7\\,\\text{MPa},\\qquad \\sigma_2=-34{,}7\\,\\text{MPa}',
    },
    {
      title: 'Energia zmiany postaci',
      narration:
        'Dla płaskiego stanu naprężenia HMH redukuje się do σHMH² = σ² + 3τ². Składnik normalny daje 22 500 MPa², a ścinanie 3·80² = 19 200 MPa²; razem 41 700 MPa².',
      caption: 'Współczynnik 3 przy τ² wynika z pełnego wzoru HMH.',
      visual: 'cube',
      focus: { metric: 'energy' },
      formula: '\\sigma_{HMH}^{2}=150^{2}+3\\cdot80^{2}=22\\,500+19\\,200=41\\,700\\,\\text{MPa}^{2}',
    },
    {
      title: 'Naprężenie zredukowane',
      narration:
        'Pierwiastek daje σHMH = 204,2 MPa. Jest ono większe od największego naprężenia głównego 184,7 MPa, bo HMH jest miarą energii zmiany postaci, a nie pojedynczej składowej.',
      caption: 'σHMH = 204,2 MPa > σ₁ = 184,7 MPa — to nie jest błąd.',
      visual: 'cube',
      focus: { metric: 'equivalent' },
      formula: '\\sigma_{HMH}=\\sqrt{41\\,700}=204{,}2\\,\\text{MPa}>\\sigma_1=184{,}7\\,\\text{MPa}',
    },
    {
      title: 'Sprawdzenie bezpieczeństwa',
      narration:
        'Zapas według HMH wynosi n = 355/204,2 = 1,74. Tresca daje σT = 184,7 − (−34,7) = 219,4 MPa, czyli n = 1,62. Oba zapasy są większe od jedności, ale Tresca jest bardziej zachowawcza.',
      caption: 'n_HMH = 1,74; n_Tresca = 1,62; oba > 1.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        'n_{HMH}=\\frac{355}{204{,}2}=1{,}74,\\qquad \\sigma_T=219{,}4\\,\\text{MPa},\\qquad n_T=\\frac{355}{219{,}4}=1{,}62',
    },
  ],
} satisfies SolutionData
