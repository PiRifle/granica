import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-reduced-stress-2',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 2',
  duration: 7,
  given: ['σ = 90 MPa', 'τ = 40 MPa', 'Re = 280 MPa', 'n_wym = 1,5'],
  result:
    'Wniosek praktyczny jest taki: dla materiału plastycznego nie wystarczy powiedzieć „naprężenie wynosi 105 MPa”. Trzeba dodać, według jakiego kryterium. W tym przypadku Tresca jest najbardziej zachowawcza, a maksimum normalne najmniej. Kolejność może się zmienić przy innym stosunku σ do τ, dlatego nie można zapamiętać jednej stałej hierarchii dla wszystkich stanów.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ReducedStressExample2Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wał jest rozciągany naprężeniem σ = 90 MPa i skręcany naprężeniem τ = 40 MPa. Materiał ma R_e = 280 MPa, a wymagany zapas wynosi 1,5. Sprawdzamy obie hipotezy plastyczne i porównujemy je z hipotezą maksimum normalnego.',
      caption: 'σ = 90 MPa, τ = 40 MPa, R_e = 280 MPa.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma=90\\,\\text{MPa},\\qquad \\tau=40\\,\\text{MPa},\\qquad R_e=280\\,\\text{MPa},\\qquad n_{wym}=1{,}5',
    },
    {
      title: 'Naprężenia główne i koło Mohra',
      narration:
        'Środek koła wynosi C = 45 MPa, a promień R = √(45² + 40²) = 60,2 MPa. Stąd σ_1 = 105,2 MPa, σ_2 = −15,2 MPa i σ_3 = 0.',
      caption: 'C = 45 MPa, R = 60,2 MPa, σ_1 = 105,2 MPa, σ_2 = −15,2 MPa.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        'C=\\frac{90}{2}=45\\,\\text{MPa},\\qquad R=\\sqrt{45^2+40^2}=60{,}2\\,\\text{MPa},\\qquad \\sigma_1=105{,}2\\,\\text{MPa},\\qquad \\sigma_2=-15{,}2\\,\\text{MPa}',
    },
    {
      title: 'Trzy hipotezy',
      narration:
        'Naprężenie dopuszczalne k_r = 280/1,5 = 186,7 MPa. HMH daje √(90² + 3·40²) = 113,6 MPa, Tresca √(90² + 4·40²) = 120,4 MPa, a hipoteza maksimum normalnego σ_max = 105,2 MPa. Trzy hipotezy porządkują ten sam stan różnie.',
      caption: 'σ_max = 105,2 MPa, σ_HMH = 113,6 MPa, σ_T = 120,4 MPa.',
      visual: 'cube',
      focus: { metric: 'criteria' },
      formula:
        '\\sigma_{max}=105{,}2\\,\\text{MPa},\\qquad \\sigma_{HMH}=\\sqrt{90^2+3\\cdot40^2}=113{,}6\\,\\text{MPa},\\qquad \\sigma_T=\\sqrt{90^2+4\\cdot40^2}=120{,}4\\,\\text{MPa}',
    },
    {
      title: 'Jedna liczba zależna od hipotezy',
      narration:
        'Po redukcji ten sam stan daje 105,2 MPa według maksimum normalnego, 113,6 MPa według HMH i 120,4 MPa według Tresca. Kolejność 105,2 < 113,6 < 120,4 pokazuje, że hipoteza zmienia ocenę, choć stan naprężenia jest identyczny.',
      caption: '105,2 MPa < 113,6 MPa < 120,4 MPa.',
      visual: 'cube',
      focus: { metric: 'equivalent' },
      formula:
        '\\sigma_{max}=105{,}2\\,\\text{MPa}<\\sigma_{HMH}=113{,}6\\,\\text{MPa}<\\sigma_T=120{,}4\\,\\text{MPa}',
    },
    {
      title: 'Sprawdzenie zapasu',
      narration:
        'Wszystkie wyniki są poniżej k_r = 186,7 MPa. Zapasy wynoszą 280/105,2 = 2,66, 280/113,6 = 2,46 i 280/120,4 = 2,33, więc każdy przekracza n_wym = 1,5. Najbardziej zachowawcza jest Tresca.',
      caption: 'n_min = 2,33 ≥ 1,5; warunek spełniony.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        'k_r=186{,}7\\,\\text{MPa},\\qquad n_{max}=2{,}66,\\qquad n_{HMH}=2{,}46,\\qquad n_T=2{,}33\\ge n_{wym}=1{,}5',
    },
  ],
} satisfies SolutionData
