import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-mohr-interpretation',
  title: 'Od koła do decyzji inżynierskiej — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa'],
  result:
    'Współczynnik bezpieczeństwa wynosi około 3,15 według HMH i 3,05 według Treski. Miarodajna jest mniejsza wartość, czyli około 3,05. Obie hipotezy dają podobny wynik, bo dominuje zginanie, a udział ścinania jest umiarkowany. Wynik nie zastępuje sprawdzenia ugięcia i kąta skręcenia.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.MohrInterpretationExample1Animation })),
  ),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt ma średnicę d=60 mm i jest obciążony siłą osiową N=30 kN, momentem zginającym M=1,2 kN·m oraz momentem skręcającym T=800 N·m. Granica plastyczności wynosi R_e=235 MPa. Punkt A wybieramy na obwodzie, gdzie udział zginania i skręcania jest największy.',
      caption: 'Przekrój kołowy pod złożonym obciążeniem; punkt A leży na obwodzie.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        'd=60\\ \\text{mm},\\quad N=30\\ \\text{kN},\\quad M=1{,}2\\ \\text{kN}\\cdot\\text{m},\\quad T=800\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Stan naprężenia w punkcie',
      narration:
        'Naprężenie osiowe wynosi σ_N=10,61 MPa, a od zginania σ_M=56,59 MPa, więc σ_x=67,20 MPa. Skręcanie daje τ=18,86 MPa. Punkt X(σ_x, τ) na płaszczyźnie σ–τ jest zaczepieniem koła Mohra.',
      caption: 'Najpierw odczytujemy σ_x i τ, a dopiero potem budujemy koło.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma_x=\\frac{N}{A}+\\frac{M}{W}=67{,}20\\ \\text{MPa},\\qquad \\tau=\\frac{T}{W_p}=18{,}86\\ \\text{MPa}',
    },
    {
      title: 'Koło Mohra i naprężenia główne',
      narration:
        'Środek koła leży w σ_avg=33,60 MPa, a promień wynosi R=38,53 MPa. Stąd σ_1=72,13 MPa i σ_2=−4,93 MPa. Na kole odczytujemy też kąt 2α_p, który wskazuje położenie płaszczyzny głównej.',
      caption: 'Koło przecina oś σ w dwóch naprężeniach głównych.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{avg}=33{,}60\\ \\text{MPa},\\quad R=38{,}53\\ \\text{MPa},\\quad \\sigma_1=72{,}13\\ \\text{MPa},\\quad \\sigma_2=-4{,}93\\ \\text{MPa}',
    },
    {
      title: 'Maksymalne ścinanie i hipotezy',
      narration:
        'Promień koła jest jednocześnie maksymalnym ścinaniem: τ_max=38,53 MPa. Treska przyjmuje σ_Tresca=2τ_max=77,1 MPa, a HMH daje σ_HMH=74,7 MPa. Obie wartości są większe od σ_x, bo uwzględniają ścinanie.',
      caption: 'Treska czyta średnicę koła, HMH uwzględnia energię odkształcenia postaciowego.',
      visual: 'cube',
      focus: { metric: 'criteria' },
      formula:
        '\\tau_{\\max}=R=38{,}53\\ \\text{MPa},\\quad \\sigma_{Tresca}=2\\tau_{\\max}=77{,}1\\ \\text{MPa},\\quad \\sigma_{HMH}=74{,}7\\ \\text{MPa}',
    },
    {
      title: 'Współczynniki i decyzja',
      narration:
        'Współczynniki wynoszą n_HMH=235/74,7=3,15 oraz n_Tresca=235/77,1=3,05. Miarodajny jest mniejszy zapas, czyli około 3,05 według Treski. Wynik nie zastępuje sprawdzenia ugięcia i kąta skręcenia.',
      caption: 'Miarodajna jest mniejsza wartość; obie hipotezy dają podobny wynik, bo dominuje zginanie.',
      visual: 'cube',
      focus: { metric: 'decision' },
      formula: 'n_{HMH}=235/74{,}7=3{,}15,\\quad n_{Tresca}=235/77{,}1=3{,}05,\\quad n=3{,}05',
    },
  ],
} satisfies SolutionData
