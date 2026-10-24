import type { SolutionData } from '../../model'
import { HmhExample1Animation } from './animation'

export default {
  id: 'ex-criteria-hmh',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 1',
  duration: 7,
  given: ['Re = 355 MPa', 'σθ = 120 MPa', 'σz = 60 MPa'],
  result:
    'Naprężenie zredukowane HMH wynosi 103,9 MPa, a zapas około 3,42. Dla porównania Tresca dałaby σT = 120 MPa i zapas 2,96, więc byłaby bardziej zachowawcza.',
  animation: HmhExample1Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Cienkościenny zbiornik jest obciążony ciśnieniem wewnętrznym. W punkcie ściany naprężenie obwodowe wynosi σθ = 120 MPa, wzdłużne σz = 60 MPa, a promieniowe σr ≈ 0. Stal ma granicę plastyczności Re = 355 MPa.',
      caption: 'Punkt ściany: σθ = 120 MPa, σz = 60 MPa, σr ≈ 0.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma_\\theta=120\\,\\text{MPa},\\qquad \\sigma_z=60\\,\\text{MPa},\\qquad \\sigma_r\\approx0,\\qquad R_e=355\\,\\text{MPa}',
    },
    {
      title: 'Naprężenia główne i rozkład',
      narration:
        'Przyjmujemy σ₁ = σθ = 120 MPa, σ₂ = σz = 60 MPa i σ₃ = σr = 0. Średnia p = (120 + 60 + 0)/3 = 60 MPa opisuje część objętościową, a dewiator (60, 0, −60) MPa — zmianę kształtu.',
      caption: 'Część hydrostatyczna p = 60 MPa nie zmienia postaci; dewiator tak.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma_1=120\\,\\text{MPa},\\quad \\sigma_2=60\\,\\text{MPa},\\quad \\sigma_3=0,\\qquad p=60\\,\\text{MPa},\\qquad s=(60,0,-60)\\,\\text{MPa}',
    },
    {
      title: 'Energia zmiany postaci',
      narration:
        'Energia zmiany postaci zależy od różnic naprężeń głównych: σHMH² = ½[(σ₁ − σ₂)² + (σ₂ − σ₃)² + (σ₃ − σ₁)²] = ½(3 600 + 3 600 + 14 400) = 10 800 MPa².',
      caption: 'Suma różnic kwadratów 21 600 MPa², po połowie 10 800 MPa².',
      visual: 'cube',
      focus: { metric: 'energy' },
      formula:
        '\\sigma_{HMH}^{2}=\\frac{1}{2}[(120-60)^{2}+(60-0)^{2}+(0-120)^{2}]=\\frac{1}{2}(3\\,600+3\\,600+14\\,400)=10\\,800',
    },
    {
      title: 'Naprężenie zredukowane',
      narration:
        'Pierwiastek daje σHMH = √10 800 = 103,92 MPa. To mniej niż największe naprężenie główne σ₁ = 120 MPa, bo stan jest częściowo hydrostatyczny.',
      caption: 'σHMH = 103,92 MPa, czyli mniej niż σ₁ = 120 MPa.',
      visual: 'cube',
      focus: { metric: 'equivalent' },
      formula: '\\sigma_{HMH}=\\sqrt{10\\,800}=103{,}92\\,\\text{MPa}<\\sigma_1=120\\,\\text{MPa}',
    },
    {
      title: 'Sprawdzenie bezpieczeństwa',
      narration:
        'Współczynnik bezpieczeństwa wynosi n = Re/σHMH = 355/103,92 = 3,42. Tresca dałaby σT = 120 MPa i n = 2,96, więc byłaby bardziej zachowawcza. Element jest bezpieczny.',
      caption: 'n = 3,42 > 1; miarodajny zapas Treski 2,96 również spełnia warunek.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: 'n=\\frac{355}{103{,}92}=3{,}42,\\qquad \\sigma_T=120\\,\\text{MPa},\\qquad n_T=\\frac{355}{120}=2{,}96',
    },
  ],
} satisfies SolutionData
