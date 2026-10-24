import type { SolutionData } from '../../model'
import { StrainStateVolumeExample3Animation } from './animation'

export default {
  id: 'ex-strain-state-volume-3',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 3',
  duration: 7,
  given: ['p=200 MPa', 'ΔV/V₀=−0,0012', 'ν=0,30'],
  result:
    'Moduł ściśliwości wynosi 166 667 MPa, a moduł Younga 200 000 MPa. Trzy równe odkształcenia normalne po −400 με dają ślad −1200 με, czyli dokładnie zmierzoną dylatację.',
  animation: StrainStateVolumeExample3Animation,
  figure: {
    kind: 'cube',
    stresses: { x: -200, y: -200, z: -200 },
    strains: { x: -0.0004, y: -0.0004, z: -0.0004 },
    volumeChange: '−0,0012',
    note: 'Przy ściskaniu hydrostatycznym wszystkie trzy odkształcenia normalne są równe i ujemne, a ich suma daje zmierzoną dylatację.',
  },
  scenes: [
    {
      title: 'Zapisz dane pomiarowe',
      narration:
        'W zbiorniku pod ciśnieniem zmierzono względną zmianę objętości ΔV/V0 = −0,0012 przy ciśnieniu p = 200 MPa. Zakładamy sprężyste, hydrostatyczne ściskanie i ν = 0,30.',
      caption: 'p = 200 MPa, ΔV/V0 = −0,0012, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: 'p=200\\,\\text{MPa},\\qquad \\frac{\\Delta V}{V_0}=-0{,}0012,\\qquad \\nu=0{,}30',
    },
    {
      title: 'Oblicz moduł ściśliwości',
      narration:
        'Z definicji ΔV/V0 = −p/K otrzymujemy K = −p/(ΔV/V0) = −200/(−0,0012) = 166 667 MPa, czyli około 166,7 GPa. Nachylenie zależności p(ΔV/V0) jest stałe i równe K.',
      caption: 'K = 166 667 MPa ≈ 166,7 GPa.',
      visual: 'cube',
      focus: { metric: 'bulk' },
      formula:
        'K=-\\frac{p}{\\Delta V/V_0}=-\\frac{200}{-0{,}0012}=166\\,667\\,\\text{MPa}\\approx166{,}7\\,\\text{GPa}',
    },
    {
      title: 'Przejdź do modułu Younga',
      narration:
        'Dla materiału izotropowego K = E/[3(1 − 2ν)], więc E = 3K(1 − 2ν). Dla ν = 0,30 współczynnik 1 − 2ν wynosi 0,40, a E = 3·166 667·0,40 = 200 000 MPa = 200 GPa. To typowa wartość dla stali.',
      caption: 'E = 200 000 MPa = 200 GPa.',
      visual: 'cube',
      focus: { metric: 'young' },
      formula: 'E=3K(1-2\\nu)=3\\cdot166\\,667\\cdot0{,}40=200\\,000\\,\\text{MPa}=200\\,\\text{GPa}',
    },
    {
      title: 'Oblicz odkształcenia normalne',
      narration:
        'W stanie hydrostatycznym θ = 3ε, więc ε = θ/3 = −0,0012/3 = −0,0004, czyli −400 με w każdej osi. Wszystkie trzy kierunki są równouprawnione.',
      caption: 'εx = εy = εz = −400 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula: '\\varepsilon=\\frac{\\theta}{3}=\\frac{-0{,}0012}{3}=-0{,}0004=-400\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz ślad tensora',
      narration:
        'Ślad tensora to suma trzech równych odkształceń: −400 − 400 − 400 = −1200 με = −0,0012. Znak ujemny oznacza zmniejszenie objętości, a wartość zgadza się z pomiarem.',
      caption: 'θ = −1200 με = −0,0012.',
      visual: 'cube',
      focus: { metric: 'trace' },
      formula: '\\theta=-400-400-400=-1200\\,\\mu\\varepsilon=-0{,}0012',
    },
    {
      title: 'Sprawdź znak i rząd wielkości',
      narration:
        'Kontrola: 3ε = 3·(−400) = −1200 με, czyli dokładnie zmierzona dylatacja. Moduł Younga 200 GPa i odkształcenie −400 με są typowe dla stali; większe odchylenie oznaczałoby błąd jednostek lub założeń.',
      caption: 'Kontrola: 3·(−400) = −1200 με = −0,0012.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '3\\varepsilon=3\\cdot(-400)=-1200\\,\\mu\\varepsilon=-0{,}0012=\\frac{\\Delta V}{V_0}',
    },
  ],
} satisfies SolutionData
