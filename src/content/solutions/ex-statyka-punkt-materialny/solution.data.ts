import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-punkt-materialny',
  title: 'Punkt materialny: równowaga zawieszonej kuli — rozwiązanie krok po kroku',
  duration: 5,
  given: ['Masa kuli m = 5 kg', 'Przyspieszenie ziemskie g = 9,81 m/s²', 'Kula wisi nieruchomo na nieważkiej lince'],
  result:
    'Napięcie liny wynosi T = 49,05 N i działa wzdłuż liny w górę. Jest równe co do wartości ciężarowi kuli G = mg = 49,05 N.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PointMassAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Kulę zastępujemy punktem materialnym w jej środku. Lina i pole grawitacyjne to więzy, które na schemacie zamienimy na siły. Na razie widzimy tylko geometrię zadania i dane.',
      caption: 'Kula o masie 5 kg wisi na lince; w modelu cała masa jest skupiona w jednym punkcie.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'm=5\\ \\text{kg},\\qquad g=9{,}81\\ \\text{m/s}^2',
    },
    {
      title: 'Ciężar kuli',
      narration:
        'Ciężar to siła, a nie masa. Liczymy go jako iloczyn masy i przyspieszenia ziemskiego. Wektor G jest skierowany pionowo w dół i zaczepiony w punkcie materialnym.',
      caption: 'G = mg = 5 · 9,81 = 49,05 N, pionowo w dół.',
      visual: 'diagram',
      focus: { metric: 'weight' },
      formula: 'G=mg=5\\cdot9{,}81=49{,}05\\ \\text{N}',
    },
    {
      title: 'Napięcie liny',
      narration:
        'Lina może tylko ciągnąć, więc jej reakcja T działa wzdłuż osi liny, od punktu zaczepienia w górę. Na schemacie izolowanego punktu mamy teraz dokładnie dwie siły: T i G.',
      caption: 'T działa wzdłuż liny w górę, G pionowo w dół.',
      visual: 'diagram',
      focus: { metric: 'tension' },
      formula: 'T_y=+T,\\qquad G_y=-G',
    },
    {
      title: 'Równowaga pionowa',
      narration:
        'Punkt jest w spoczynku, więc suma rzutów sił na oś pionową musi być zerowa. Po podstawieniu ciężaru otrzymujemy T = 49,05 N. Znak dodatni potwierdza przyjęty zwrot w górę.',
      caption: 'ΣFᵧ = T − G = 0, stąd T = 49,05 N.',
      visual: 'diagram',
      focus: { metric: 'equilibrium' },
      formula: '\\sum F_y=T-G=0\\ \\Rightarrow\\ T=49{,}05\\ \\text{N}',
    },
    {
      title: 'Kontrola wyniku',
      narration:
        'Sprawdzamy wymiar i sens fizyczny. Kilogram razy metr na sekundę do kwadratu daje niuton, a 49 N dla pięciu kilogramów jest wielkością oczekiwaną. Napięcie i ciężar mają równe moduły i przeciwne zwroty.',
      caption: 'T = G = 49,05 N; wymiar kg·m/s² = N jest poprawny.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'T=G,\\qquad [T]=\\text{kg}\\cdot\\text{m/s}^2=\\text{N}',
    },
  ],
} satisfies SolutionData
