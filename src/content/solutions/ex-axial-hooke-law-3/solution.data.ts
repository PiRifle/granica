import type { SolutionData } from '../../model'
import { AxialHookeLawExample3Animation } from './animation'

export default {
  id: 'ex-axial-hooke-law-3',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 3',
  duration: 7,
  given: ['L = 2 m', 'A = 250 mm²', 'E = 200 GPa', 'ΔL_dop = 1,5 mm'],
  result:
    'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
  animation: AxialHookeLawExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Tym razem ogranicza nas dopuszczalne wydłużenie, a szukamy maksymalnej siły. Pręt stalowy ma długość L=2 m, pole A=250 mm^2 i moduł E=200 GPa. Dopuszczalne wydłużenie wynosi Δ L_dop=1,5 mm. Przekształcamy wzór Δ L=NL/(EA) do postaci N=EAΔ L/L. Podstawiamy E=200 000 MPa, A=250 mm^2, Δ L=1,5 mm i L=2000 mm. Otrzymujemy N=200 000·250·1,5/2000=37 500 N, czyli 37,5 kN. Sprawdźmy naprężenie: σ=37 500/250=150 MPa. Jest ono poniżej typowej granicy plastyczności stali, więc założenie liniowo sprężyste jest uzasadnione. Gdyby obliczona siła dawała naprężenie powyżej granicy proporcjonalności, wzór Hooke’a nie byłby już poprawny i trzeba by zastosować model sprężysto-plastyczny. Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
      caption:
        'Widzimy, że o dopuszczalnej sile może decydować sztywność, a nie wytrzymałość. Przy większym dopuszczalnym wydłużeniu limit siły wzrósłby proporcjonalnie. Przy większym polu również wzrósłby, bo większy przekrój jest sztywniejszy. Przy dłuższym pręcie limit siły zmalałby, bo ten sam przyrost długości rozkłada się na większą długość początkową.',
      visual: 'axial',
      formula: 'L=2\\ \\text{m}\\qquad \\Delta L=NL/(EA)\\qquad \\sigma=37\\,500/250=150\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
