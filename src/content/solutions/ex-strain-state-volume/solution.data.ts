import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-volume',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 1',
  duration: 7,
  given: ['E=200 GPa', 'ν=0,30', 'σ_x=σ_y=σ_z=−120 MPa'],
  result:
    'Objętość zmniejsza się o 0,00072, czyli 0,072 %. Ślad tensora i droga przez moduł ściśliwości dają ten sam wynik, co potwierdza spójność wzorów.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrainStateVolumeExample1Animation })),
  ),
  figure: {
    kind: 'cube',
    stresses: { x: -120, y: -120, z: -120 },
    strains: { x: -0.00024, y: -0.00024, z: -0.00024 },
    volumeChange: '−0,00072',
    note: 'W stanie hydrostatycznym wszystkie trzy odkształcenia normalne są równe i ujemne, więc objętość maleje równomiernie.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy element jest ściskany hydrostatycznie: σx = σy = σz = −120 MPa. Strzałki na trzech parach ścian są równe, a naprężenia styczne zerowe. To stan, w którym zmienia się tylko objętość, a nie kształt.',
      caption: 'σx = σy = σz = −120 MPa; E = 200 GPa, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=\\sigma_y=\\sigma_z=-120\\,\\text{MPa},\\qquad E=200\\,\\text{GPa},\\qquad \\nu=0{,}30',
    },
    {
      title: 'Odkształcenia normalne',
      narration:
        'W każdej osi odkształcenie wynosi ε = (1 − 2ν)σ/E = 0,40·(−120)/200 000 = −0,00024, czyli −240 με. Wszystkie trzy krawędzie skracają się jednakowo, więc element zmniejsza się równomiernie.',
      caption: 'εx = εy = εz = −240 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon=\\frac{(1-2\\nu)\\sigma}{E}=\\frac{0{,}40\\cdot(-120)}{200\\,000}=-0{,}00024=-240\\,\\mu\\varepsilon',
    },
    {
      title: 'Ślad tensora odkształcenia',
      narration:
        'Ślad tensora to suma trzech odkształceń normalnych: θ = εx + εy + εz = −240 − 240 − 240 = −720 με. To właśnie ta suma, a nie pojedyncza składowa, opisuje względną zmianę objętości.',
      caption: 'θ = −720 με = −0,00072.',
      visual: 'cube',
      focus: { metric: 'trace' },
      formula: '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=-240-240-240=-720\\,\\mu\\varepsilon=-0{,}00072',
    },
    {
      title: 'Dylatacja elementu',
      narration:
        'Objętość zmienia się zgodnie z θ: V = V0(1 + θ), więc ΔV/V0 = −0,00072. Element zmniejsza objętość o 0,072 %, mimo że żadna krawędź nie zmienia się o więcej niż 0,024 %.',
      caption: 'ΔV/V0 = −0,00072, czyli −0,072 %.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\frac{\\Delta V}{V_0}\\approx\\theta=-0{,}00072=-0{,}072\\,\\%',
    },
    {
      title: 'Moduł ściśliwości',
      narration:
        'Ten sam wynik można zapisać przez moduł ściśliwości: K = E/[3(1 − 2ν)] = 200 000/(3·0,40) = 166 667 MPa. Nachylenie zależności p(ΔV/V0) jest stałe i równe K.',
      caption: 'K = 166 667 MPa.',
      visual: 'cube',
      focus: { metric: 'bulk' },
      formula: 'K=\\frac{E}{3(1-2\\nu)}=\\frac{200\\,000}{3\\cdot0{,}40}=166\\,667\\,\\text{MPa}',
    },
    {
      title: 'Kontrola wyniku',
      narration:
        'Kontrola: ΔV/V0 = −p/K = −120/166 667 = −0,00072. Ślad tensora i droga przez moduł ściśliwości dają tę samą zmianę objętości, a znak ujemny potwierdza ściskanie.',
      caption: 'Obie drogi: θ = −p/K = −0,00072.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '-\\frac{p}{K}=-\\frac{120}{166\\,667}=-0{,}00072=\\theta',
    },
  ],
} satisfies SolutionData
