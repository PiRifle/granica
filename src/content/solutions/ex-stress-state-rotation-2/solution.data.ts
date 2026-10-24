import type { SolutionData } from '../../model'
import { StressRotationExample2Animation } from './animation'

export default {
  id: 'ex-stress-state-rotation-2',
  title: 'Obrót przekroju: ten sam stan, inne liczby — przykład 2',
  duration: 7,
  given: ['σ_x = σ_y = 0', 'τ_xy = 50 MPa', 'θ = 45°'],
  result:
    'Zwróć uwagę na kolejność kątów. Maksymalne ścinanie w tym stanie występuje przy θ=0, a maksymalne rozciąganie przy θ=45°. Ten sam stan ma więc dwa różne „najgorsze” kierunki, zależnie od mechanizmu zniszczenia.',
  animation: StressRotationExample2Animation,
  scenes: [
    {
      title: 'Czyste ścinanie',
      narration:
        'Rozważmy czyste ścinanie: σ_x=σ_y=0 i τ_xy=50 MPa. Na płaszczyznach równoległych do osi działa tylko ścinanie, a naprężenia normalne są zerowe.',
      caption: 'Czyste ścinanie w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\sigma_x=\\sigma_y=0,\\quad \\tau_{xy}=50\\ \\text{MPa}',
    },
    {
      title: 'Obrót o 45°',
      narration:
        'Dla θ=45° mamy 2θ=90°, więc cos90°=0 i sin90°=1. Płaszczyzna przekroju obraca się, a normalna n i styczna t ustawiają się pod kątem 45° do osi x.',
      caption: 'Obrót układu o 45° prowadzi do kierunków głównych czystego ścinania.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '2\\theta=90^\\circ,\\quad \\cos90^\\circ=0,\\quad \\sin90^\\circ=1',
    },
    {
      title: 'Rozciąganie i ściskanie',
      narration:
        'Wzór daje σ_n=0+0+50·1=50 MPa oraz σ_t=0-0-50·1=-50 MPa. Naprężenie styczne wynosi τ_nt=-0+50·0=0, więc na tych płaszczyznach nie ma ścinania.',
      caption: 'Czyste ścinanie okazuje się rozciąganiem i ściskaniem w układzie obróconym.',
      visual: 'cube',
      focus: { metric: 'components' },
      formula: '\\sigma_n=50\\ \\text{MPa},\\quad \\sigma_t=-50\\ \\text{MPa},\\quad \\tau_{nt}=0',
    },
    {
      title: 'Punkt na kole Mohra',
      narration:
        'Dla czystego ścinania środek koła leży w początku układu, a promień wynosi 50 MPa. Gdy przekrój obraca się od 0° do 45°, punkt na obwodzie przesuwa się od (0, 50) do (50, 0).',
      caption: 'Ten sam okrąg, tylko inny punkt na obwodzie.',
      visual: 'cube',
      focus: { metric: 'mohr' },
      formula: 'C=0,\\quad R=50\\ \\text{MPa}',
    },
    {
      title: 'Dwa kierunki krytyczne',
      narration:
        'Maksymalne ścinanie występuje przy θ=0, a maksymalne rozciąganie przy θ=45°. Kierunek niebezpieczny zależy od materiału: kruchy boi się rozciągania pod 45°, a ciągliwy może płynąć przy ścinaniu wzdłuż osi.',
      caption: 'Dwa różne „najgorsze” kierunki w tym samym stanie.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\theta_{\\tau\\max}=0^\\circ,\\qquad \\theta_{\\sigma\\max}=45^\\circ',
    },
  ],
} satisfies SolutionData
