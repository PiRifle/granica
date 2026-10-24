import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-stress-link-2',
  title: 'Od pomiaru do naprężeń i bezpiecznego doboru — przykład 2',
  duration: 7,
  given: ['d=60 mm', 'N=30 kN', 'M=1,2 kN·m', 'T=800 N·m', 'R_e=235 MPa'],
  result:
    'Wniosek: dla tego stanu Tresca jest bardziej konserwatywna niż HMH, bo różnica σ_1-σ_2 okazuje się większa od naprężenia równoważnego HMH. Gdyby moment gnący działał w przeciwną stronę lub siła osiowa była ściskająca, znak σ_x mógłby się zmienić i trzeba by ponownie sprawdzić, które naprężenie główne jest największe. Nie wystarczy raz policzyć „sigmy” i uznać zadania za rozwiązane.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.000336, display: '336 με' },
      { angle: 45, label: '45°', value: 0.0002402, display: '240,2 με' },
      { angle: 90, label: '90°', value: -0.0001008, display: '−100,8 με' },
    ],
    gamma: { value: 0.0002452, display: '245,2 μrad' },
    mohr: {
      center: 0.0001176,
      radius: 0.00025047,
      left: -0.00013287,
      right: 0.00036807,
      angle: 14.65,
    },
    values: [
      { label: 'd', value: '60 mm', focus: 'stress', reveal: 0 },
      { label: 'N', value: '30 kN', focus: 'stress', reveal: 0 },
      { label: 'M', value: '1,2 kN·m', focus: 'stress', reveal: 0 },
      { label: 'T', value: '800 N·m', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'A', value: '2 827,4 mm²', focus: 'stress' },
      { label: 'W', value: '21 205,8 mm³', focus: 'stress' },
      { label: 'σ_x', value: '67,20 MPa', focus: 'stress' },
      { label: 'τ', value: '18,86 MPa', focus: 'stress' },
      { label: 'ε_x', value: '336 με', focus: 'gauges' },
      { label: 'ε_y', value: '−100,8 με', focus: 'gauges' },
      { label: 'γ_xy', value: '245,2 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '117,6 με', focus: 'mohr' },
      { label: 'R_ε', value: '250,47 με', focus: 'mohr' },
      { label: 'ε_I', value: '368,07 με', focus: 'principal' },
      { label: 'ε_II', value: '−132,87 με', focus: 'principal' },
      { label: 'φ_I', value: '14,65°', focus: 'angle' },
      { label: 'σ_I', value: '72,13 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−4,93 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '74,72 MPa', focus: 'stress' },
      { label: 'σ_T', value: '77,06 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '3,15', focus: 'stress' },
      { label: 'n_T', value: '3,05', focus: 'stress' },
    ],
    note: 'Pomiar tensometryczny daje najpierw stan odkształcenia; dopiero model materiału i hipoteza pozwalają ocenić bezpieczeństwo.',
  },
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrainStressLinkExample2Animation })),
  ),
  scenes: [
    {
      title: 'Zapisz obciążenia i geometrię',
      narration:
        'Pręt kołowy o średnicy 60 mm jest rozciągany siłą N = 30 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 800 N·m. Badamy włókno na obwodzie po stronie rozciąganej przez zginanie.',
      caption: 'd = 60 mm, N = 30 kN, M = 1,2 kN·m, T = 800 N·m.',
      visual: 'rosette',
      focus: { metric: 'loads' },
      formula: 'd=60\\,\\text{mm},\\qquad N=30\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=800\\,\\text{N·m}',
    },
    {
      title: 'Oblicz naprężenia w przekroju',
      narration:
        'Pole wynosi 2 827,4 mm², wskaźnik zginania 21 205,8 mm³, a wskaźnik skręcania 42 411,5 mm³. Stąd σ_N = 10,61 MPa, σ_M = 56,59 MPa, σ_x = 67,20 MPa oraz τ = 18,86 MPa.',
      caption: 'σ_x = 67,20 MPa, τ = 18,86 MPa.',
      visual: 'rosette',
      focus: { metric: 'section' },
      formula:
        'A=2\\,827{,}4\\,\\text{mm}^2,\\qquad W=21\\,205{,}8\\,\\text{mm}^3,\\qquad \\sigma_x=10{,}61+56{,}59=67{,}20\\,\\text{MPa},\\qquad \\tau=18{,}86\\,\\text{MPa}',
    },
    {
      title: 'Przelicz naprężenia na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = σ_x/E = 336 με oraz ε_y = −νσ_x/E = −100,8 με. Odkształcenie postaciowe wynosi γ_xy = τ/G = 245,2 μrad, gdzie G = 76 923 MPa.',
      caption: 'ε_x = 336 με, ε_y = −100,8 με, γ_xy = 245,2 μrad.',
      visual: 'rosette',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{67{,}20}{200\\,000}=336\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-\\frac{0{,}30\\cdot67{,}20}{200\\,000}=-100{,}8\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=\\frac{18{,}86}{76\\,923}=245{,}2\\,\\mu\\text{rad}',
    },
    {
      title: 'Wyznacz odkształcenia i kierunki główne',
      narration:
        'Środek koła odkształceń wynosi 117,6 με, a promień obejmuje połowę różnicy ε_x − ε_y oraz połowę γ_xy, więc R_ε = 250,47 με. Skrajne odkształcenia wynoszą 368,07 με i −132,87 με, a kąt główny to φ = ½ arctan(245,2/436,8) = 14,65° od osi x.',
      caption: 'ε_I = 368,07 με, ε_II = −132,87 με, φ_I = 14,65°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{sr}=\\frac{336+(-100{,}8)}{2}=117{,}6\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{218{,}4^2+122{,}6^2}=250{,}47\\,\\mu\\varepsilon,\\qquad \\varepsilon_I=368{,}07\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-132{,}87\\,\\mu\\varepsilon,\\qquad \\varphi_I=14{,}65^\\circ',
    },
    {
      title: 'Przejdź przez prawo Hooke’a',
      narration:
        'Odwrócone prawo Hooke’a daje σ_I = 72,13 MPa i σ_II = −4,93 MPa. Wspólny czynnik E/(1 − ν²) = 219 780 MPa działa na odkształcenia główne, więc znaki naprężeń wynikają wprost ze znaków ε_I i ε_II.',
      caption: 'σ_I = 72,13 MPa, σ_II = −4,93 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(368{,}07+0{,}30\\cdot(-132{,}87))\\cdot10^{-6}=72{,}13\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-132{,}87+0{,}30\\cdot368{,}07)\\cdot10^{-6}=-4{,}93\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź hipotezy i zapasy',
      narration:
        'HMH wynosi σ_red = √(67,20² + 3·18,86²) = 74,72 MPa, a Tresca σ_T = 72,13 − (−4,93) = 77,06 MPa, bo różnica σ_I − σ_II jest większa od naprężenia HMH. Dla R_e = 235 MPa otrzymujemy n_HMH = 235/74,72 = 3,15 oraz n_T = 235/77,06 = 3,05; oba są większe od trzech.',
      caption: 'Kontrola: n_HMH = 3,15, n_T = 3,05.',
      visual: 'rosette',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}=74{,}72\\,\\text{MPa},\\qquad \\sigma_T=72{,}13-(-4{,}93)=77{,}06\\,\\text{MPa},\\qquad n_{HMH}=\\frac{235}{74{,}72}=3{,}15,\\qquad n_T=\\frac{235}{77{,}06}=3{,}05',
    },
  ],
} satisfies SolutionData
