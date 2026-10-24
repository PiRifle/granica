import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-hooke-law-3',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 3',
  duration: 7,
  given: ['L₀ = 2 m', 'A = 250 mm²', 'E = 200 GPa', 'ΔL_dop = 1,5 mm'],
  result:
    'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HookeLawExample3Animation }))),
  scenes: [
    {
      title: 'Dane i warunek sztywności',
      narration:
        'Tym razem ogranicza nas dopuszczalne wydłużenie, a szukamy maksymalnej siły. Pręt stalowy ma długość L₀ = 2 m, pole A = 250 mm² i moduł E = 200 GPa. Dopuszczalne wydłużenie wynosi ΔL_dop = 1,5 mm.',
      caption: 'Szukamy maksymalnej siły, przy której wydłużenie nie przekracza wartości dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'L_0 = 2\\ \\text{m} = 2000\\ \\text{mm},\\quad A = 250\\ \\text{mm}^2,\\quad E = 200\\,000\\ \\text{MPa},\\quad \\Delta L_{\\mathrm{dop}} = 1{,}5\\ \\text{mm}',
    },
    {
      title: 'Maksymalna siła z warunku sztywności',
      narration:
        'Przekształcamy wzór ΔL = NL₀/(EA) do postaci N = EAΔL_dop/L₀. Otrzymujemy N = 200 000 · 250 · 1,5/2000 = 37 500 N, czyli 37,5 kN.',
      caption: 'Przy tej sile pręt osiąga dokładnie dopuszczalne wydłużenie.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'N = \\frac{EA\\,\\Delta L_{\\mathrm{dop}}}{L_0} = \\frac{200\\,000 \\cdot 250 \\cdot 1{,}5}{2000} = 37\\,500\\ \\text{N} = 37{,}5\\ \\text{kN}',
    },
    {
      title: 'Kontrola naprężenia',
      narration:
        'Naprężenie wynosi σ = 37 500/250 = 150 MPa. Jest ono poniżej typowej granicy plastyczności stali 235 MPa, więc założenie liniowo sprężyste jest uzasadnione.',
      caption: 'Gdyby naprężenie przekroczyło granicę proporcjonalności, potrzebny byłby model sprężysto-plastyczny.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma = \\frac{N}{A} = \\frac{37\\,500}{250} = 150\\ \\text{MPa} < 235\\ \\text{MPa}',
    },
    {
      title: 'Co decyduje o limicie',
      narration:
        'O dopuszczalnej sile decyduje sztywność, a nie tylko wytrzymałość. Większe ΔL_dop lub większe A zwiększają limit siły, a dłuższy pręt go zmniejsza. Przekroczenie N = 37,5 kN oznacza ΔL > ΔL_dop.',
      caption: 'Warunek sztywności: N ≤ EAΔL_dop/L₀.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: 'N_{\\max} = \\frac{EA\\,\\Delta L_{\\mathrm{dop}}}{L_0} = 37{,}5\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
