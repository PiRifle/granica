import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-mohr-interpretation',
  title: 'Od koła do decyzji inżynierskiej — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa'],
  result:
    'Współczynnik bezpieczeństwa wynosi około 3,15 według HMH i 3,05 według Treski. Miarodajna jest mniejsza wartość, czyli około 3,05. Obie hipotezy dają podobny wynik, bo dominuje zginanie, a udział ścinania jest umiarkowany. Wynik nie zastępuje sprawdzenia ugięcia i kąta skręcenia.',
  figure: {
    kind: 'cube',
    stresses: { x: 67.2, y: 0, z: 0 },
    values: [
      { label: 'σ_N', value: '10,61 MPa', focus: 'stress' },
      { label: 'σ_M', value: '56,59 MPa', focus: 'stress' },
      { label: 'σ_x', value: '67,20 MPa', focus: 'stress' },
      { label: 'τ', value: '18,86 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '74,7 MPa', focus: 'principal' },
      { label: 'σ_1', value: '72,13 MPa', focus: 'principal' },
      { label: 'σ_2', value: '−4,93 MPa', focus: 'principal' },
      { label: 'n HMH', value: '3,15', focus: 'principal' },
      { label: 'n Tresca', value: '3,05', focus: 'principal' },
    ],
    note: 'Stan naprężenia w punkcie pręta: zginanie z rozciąganiem i skręcanie; τ = 18,86 MPa nie jest rysowane.',
  },
  scenes: [
    {
      title: 'Dane i geometria',
      narration:
        'Pręt ma średnicę d=60 mm i jest obciążony siłą osiową N=30 kN, momentem zginającym M=1,2 kN·m oraz momentem skręcającym T=800 N·m. Granica plastyczności wynosi R_e=235 MPa.',
      caption: 'Przekrój kołowy pod złożonym obciążeniem.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'd=60\\ \\text{mm},\\quad N=30\\ \\text{kN},\\quad M=1{,}2\\ \\text{kN}\\cdot\\text{m},\\quad T=800\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Pole przekroju',
      narration: 'Pole przekroju: A=π·60^2/4=2827,4 mm^2.',
      caption: 'Pole przekroju kołowego.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'A=\\pi\\cdot60^2/4=2827{,}4\\ \\text{mm}^2',
    },
    {
      title: 'Wskaźniki przekroju',
      narration: 'Wskaźnik zginania: W=π·60^3/32=21 205,8 mm^3. Wskaźnik skręcania: W_p=2W=42 411,5 mm^3.',
      caption: 'Wskaźniki dla zginania i skręcania.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'W=\\pi\\cdot60^3/32=21\\,205{,}8\\ \\text{mm}^3,\\quad W_p=2W=42\\,411{,}5\\ \\text{mm}^3',
    },
    {
      title: 'Naprężenie osiowe',
      narration: 'Naprężenie osiowe: σ_N=30 000/2827,4=10,61 MPa.',
      caption: 'Naprężenie od siły osiowej.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_N=30\\,000/2827{,}4=10{,}61\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie od zginania',
      narration: 'Naprężenie od zginania: σ_M=1,2·10^6/21 205,8=56,59 MPa. Suma: σ_x=67,20 MPa.',
      caption: 'Suma naprężeń normalnych od rozciągania i zginania.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_M=1{,}2\\cdot10^6/21\\,205{,}8=56{,}59\\ \\text{MPa},\\quad \\sigma_x=67{,}20\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie styczne',
      narration: 'Naprężenie styczne: τ=800 000/42 411,5=18,86 MPa.',
      caption: 'Naprężenie od skręcania.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=800\\,000/42\\,411{,}5=18{,}86\\ \\text{MPa}',
    },
    {
      title: 'Hipoteza HMH',
      narration: 'HMH: σ_HMH=√(67,20^2+3·18,86^2)=√(4515,7+1067,4)=74,7 MPa.',
      caption: 'Zredukowane naprężenie według hipotezy HMH.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}\\approx74{,}7\\ \\text{MPa}',
    },
    {
      title: 'Hipoteza Treski',
      narration:
        'Treska: σ_avg=33,60 MPa, R=√(33,60^2+18,86^2)=38,53 MPa, więc σ_1=72,13 i σ_2=-4,93 MPa. Największa różnica to 77,06 MPa.',
      caption: 'Naprężenia główne i różnica decydująca o wytężeniu.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_{avg}=33{,}60\\ \\text{MPa},\\quad R=38{,}53\\ \\text{MPa},\\quad \\sigma_1=72{,}13\\ \\text{MPa},\\quad \\sigma_2=-4{,}93\\ \\text{MPa}',
    },
    {
      title: 'Współczynniki bezpieczeństwa',
      narration: 'Współczynniki: n_HMH=235/74,7=3,15 oraz n_Tresca=235/77,06=3,05.',
      caption: 'Miarodajny jest mniejszy współczynnik.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: 'n_{HMH}=235/74{,}7=3{,}15,\\quad n_{Tresca}=235/77{,}06=3{,}05',
    },
    {
      title: 'Interpretacja inżynierska',
      narration:
        'Współczynnik bezpieczeństwa wynosi około 3,15 według HMH i 3,05 według Treski. Miarodajna jest mniejsza wartość, czyli około 3,05. Wynik nie zastępuje sprawdzenia ugięcia i kąta skręcenia.',
      caption: 'Obie hipotezy dają podobny wynik, bo dominuje zginanie.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_{HMH}\\approx74{,}7\\ \\text{MPa},\\quad \\sigma_1\\approx72{,}13\\ \\text{MPa},\\quad \\sigma_2\\approx-4{,}93\\ \\text{MPa},\\quad n\\approx3{,}05}',
    },
  ],
} satisfies SolutionData
