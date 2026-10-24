import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-epsilon-gamma-3',
  title: 'Odkształcenia: długości i kąty — przykład 3',
  duration: 7,
  given: ['ε_dop=1200 με', 'L_0=80 mm', 'γ_xy=0,0015 rad'],
  result:
    'Gdyby wynik wyszedł rzędu kilku stopni, należałoby sprawdzić jednostki. Odkształcenie sprężyste stali rzadko przekracza kilka tysięcznych, więc kąt rzędu 0,1° jest już duży jak na ten zakres.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StrainAllowableAnimation }))),
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0012, display: '1200 με' },
      { angle: 45, label: '45°', value: 0.00135, display: '1350 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0.0015, display: '1500 μrad' },
    mohr: {
      center: 0.0006,
      radius: 0.0009604686356,
      left: -0.0003604686356,
      right: 0.001560468636,
      angle: 25.67,
    },
    values: [
      { label: 'ε', value: '1200 με', focus: 'gauges', reveal: 0 },
      { label: 'ΔL', value: '0,096 mm', focus: 'gauges' },
      { label: 'γ_xy', value: '1500 μrad', focus: 'shear' },
      { label: 'kąt', value: '0,0859°', focus: 'shear' },
      { label: 'ε_sr', value: '600 με', focus: 'mohr' },
      { label: 'R_ε', value: '960,47 με', focus: 'mohr' },
      { label: 'ε_I', value: '1560,47 με', focus: 'principal' },
      { label: 'ε_II', value: '−360,47 με', focus: 'principal' },
      { label: 'φ_I', value: '25,67°', focus: 'angle' },
      { label: 'σ_I', value: '319,25 MPa', focus: 'stress' },
      { label: 'σ_II', value: '23,67 MPa', focus: 'stress' },
    ],
    note: 'Zadanie podaje tylko dopuszczalne ε i γ; na rysunku przyjęto ε_y = 0, aby zilustrować pełne koło Mohra. To założenie ilustracyjne.',
  },
  scenes: [
    {
      title: 'Model: baza pomiarowa i warunek dopuszczalny',
      narration:
        'Baza pomiarowa ma L₀ = 80 mm, a dopuszczalne odkształcenie liniowe wynosi ε_dop = 1200 με = 0,0012. Szukamy największego dopuszczalnego wydłużenia oraz kąta odpowiadającego γ_xy = 0,0015 rad.',
      caption: 'L₀ = 80 mm, ε_dop = 1200 με = 0,0012, γ_xy = 0,0015 rad.',
      visual: 'rosette',
      focus: { metric: 'model' },
      formula:
        'L_0=80\\,\\text{mm},\\qquad \\varepsilon_{dop}=1200\\,\\mu\\varepsilon=0{,}0012,\\qquad \\gamma_{xy}=0{,}0015\\,\\text{rad}',
    },
    {
      title: 'Dopuszczalne wydłużenie',
      narration:
        'Maksymalne wydłużenie to ΔL = ε·L₀ = 0,0012 · 80 = 0,096 mm. To mniej niż dziesiąta część milimetra, dlatego potrzebny jest czujnik, a nie linijka.',
      caption: 'ΔL = 0,096 mm.',
      visual: 'rosette',
      focus: { metric: 'normal' },
      formula: '\\Delta L=\\varepsilon L_0=0{,}0012\\cdot80=0{,}096\\,\\text{mm}',
    },
    {
      title: 'Ścinanie: kąt w radianach i stopniach',
      narration:
        'Odkształcenie postaciowe γ_xy = 0,0015 rad odpowiada kątowi 0,0015·180°/π ≈ 0,0859°, czyli około 5,15 minuty kątowej. To pokazuje, jak małe są kąty w zakresie sprężystym.',
      caption: 'γ_xy = 1500 μrad ≈ 0,0859° ≈ 5,15′.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula:
        '\\gamma_{xy}=0{,}0015\\,\\text{rad}=1500\\,\\mu\\text{rad}\\approx0{,}0859^\\circ\\approx5{,}15^{\\prime}',
    },
    {
      title: 'Stan łączony i składowa tensorowa',
      narration:
        'Na rysunku łączymy dopuszczalne wydłużenie z tym samym ścinaniem. Dla ilustracji przyjmujemy ε_y = 0. Składowa tensorowa ścinania wynosi ε_xy = γ_xy/2 = 750 μrad, bo tensor jest symetryczny.',
      caption: 'ε_xy = γ_xy/2 = 750 μrad.',
      visual: 'rosette',
      focus: { metric: 'combined' },
      formula: '\\varepsilon_{xy}=\\frac{\\gamma_{xy}}{2}=\\frac{0{,}0015}{2}=0{,}00075=750\\,\\mu\\text{rad}',
    },
    {
      title: 'Koło Mohra: środek i promień',
      narration:
        'Przyjmując ε_y = 0 dla ilustracji, środek koła wynosi ε_sr = 600 με, a promień R_ε = √(600² + 750²) = 960,47 με.',
      caption: 'ε_sr = 600 με, R_ε = 960,47 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{1200+0}{2}=600\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{600^2+750^2}=960{,}47\\,\\mu\\varepsilon',
    },
    {
      title: 'Wartości główne, kierunek i naprężenia',
      narration:
        'Skrajne punkty koła dają ε_I = 1560,47 με i ε_II = −360,47 με. Kierunek główny odchyla się o φ = 25,67°, bo tan 2φ = 1500/1200 = 1,25. Dla stali E = 200 GPa i ν = 0,30 otrzymujemy σ_I = 319,25 MPa oraz σ_II = 23,67 MPa. Kąt 0,0859° to około 5,15′, więc wynik jest spójny.',
      caption: 'ε_I = 1560,47 με, ε_II = −360,47 με, φ = 25,67°; σ_I = 319,25 MPa, σ_II = 23,67 MPa.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{I,II}=600\\pm960{,}47\\,\\mu\\varepsilon,\\qquad \\tan2\\varphi_I=\\frac{1500}{1200}=1{,}25\\;\\Rightarrow\\ \\varphi_I=25{,}67^\\circ',
    },
  ],
} satisfies SolutionData
