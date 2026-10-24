import type { SolutionData } from '../../model'
import { GaugeResolutionAnimation } from './animation'

export default {
  id: 'ex-strain-state-gauges-3',
  title: 'Tensometry: od oporu do odkształcenia — przykład 3',
  duration: 7,
  given: ['R_0 = 350 Ω', 'GF = 2,0', 'ε = 1 με'],
  result:
    'Z tego samego rachunku wynika, dlaczego tensometry mają zwykle opór 120 lub 350 Ω, a nie bardzo mały. Większy opór początkowy daje większą bezwzględną zmianę ΔR przy tym samym GF i ε, co ułatwia pomiar. Nie można jednak zwiększać oporu dowolnie, bo rośnie też szum i maleje odporność na zakłócenia.',
  animation: GaugeResolutionAnimation,
  scenes: [
    {
      title: 'Zapisz cel pomiaru',
      narration:
        'Chcemy wykryć zmianę odkształcenia o 1 με czujnikiem o oporze bazowym 350 Ω i współczynniku GF = 2,0. Sprawdzimy, jakiej zmiany oporu należy szukać i dlaczego potrzebny jest mostek.',
      caption: 'Dane: R₀ = 350 Ω, GF = 2,0, ε = 1 με.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'R_0=350\\,\\Omega,\\qquad GF=2{,}0,\\qquad \\varepsilon=1\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz względną zmianę oporu',
      narration:
        'Z definicji współczynnika tensometru ΔR/R₀ = GF·ε = 2,0 · 1·10⁻⁶ = 2·10⁻⁶. Względna zmiana jest więc zaledwie dwumilionowa — tak mała, że trzeba ją oglądać pod powiększeniem.',
      caption: 'ΔR/R₀ = 2·10⁻⁶.',
      visual: 'diagram',
      focus: { metric: 'ratio' },
      formula: '\\frac{\\Delta R}{R_0}=GF\\,\\varepsilon=2{,}0\\cdot1\\cdot10^{-6}=2\\cdot10^{-6}',
    },
    {
      title: 'Oblicz bezwzględną zmianę oporu',
      narration:
        'Mnożymy względną zmianę przez opór bazowy: ΔR = 2·10⁻⁶ · 350 = 0,0007 Ω, czyli 0,7 mΩ. To mniej niż opór przewodów połączeniowych i mniej niż dryft termiczny zwykłego multimetru.',
      caption: 'ΔR = 0,0007 Ω = 0,7 mΩ.',
      visual: 'diagram',
      focus: { metric: 'absolute' },
      formula: '\\Delta R=GF\\,\\varepsilon\\,R_0=2{,}0\\cdot1\\cdot10^{-6}\\cdot350=0{,}0007\\,\\Omega',
    },
    {
      title: 'Dlaczego omomierz nie wystarczy',
      narration:
        'Na tle 350 Ω zmiana 0,7 mΩ to zaledwie dwie milionowe części. Zwykły omomierz nie rozdzieli tak małej różnicy od szumu, dryftu i oporu przewodów. Dlatego mierzy się odchylenie od zera w mostku, a nie różnicę dwóch dużych oporów.',
      caption: '0,7 mΩ ≪ 350 Ω — potrzebny mostek, nie omomierz.',
      visual: 'diagram',
      focus: { metric: 'resolution' },
      formula: '\\Delta R=0{,}0007\\,\\Omega\\ll R_0=350\\,\\Omega',
    },
    {
      title: 'Sprawdź dobór oporu bazowego',
      narration:
        'Dla porównania czujnik 120 Ω dałby tylko 0,00024 Ω, czyli 0,24 mΩ. Większy opór bazowy zwiększa sygnał bezwzględny, dlatego stosuje się 350 Ω, ale zbyt duży opór pogarsza stosunek sygnału do szumu.',
      caption: 'Kontrola: dla 120 Ω zmiana wynosi 0,00024 Ω.',
      visual: 'diagram',
      focus: { metric: 'baseline' },
      formula: '2{,}0\\cdot1\\cdot10^{-6}\\cdot120=0{,}00024\\,\\Omega',
    },
  ],
} satisfies SolutionData
