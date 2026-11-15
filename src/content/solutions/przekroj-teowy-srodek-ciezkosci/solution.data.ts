import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createSectionSolution } from '../../solution-factories/factory-section-geometry/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model przekroju teowego',
    narration:
      'Przekrój składa się z poziomego pasa 9,0 × 2,0 cm i pionowego środnika 1,0 × 28,0 cm. Oś z przyjmujemy w dół od górnej krawędzi, a oś y jest pozioma. Przekrój jest symetryczny względem osi pionowej, więc y_C = 0.',
    formula: 'H=30{,}0\\ \\mathrm{cm}\\qquad b_f=9{,}0\\ \\mathrm{cm}\\qquad t_f=2{,}0\\ \\mathrm{cm}',
    caption: 'Przekrój teowy z wymiarami, osią symetrii i osią z skierowaną w dół.',
    visual: 'section',
    focus: { metric: 'model' },
    emphasis: 'Oś symetrii pionowa od razu daje y_C = 0.',
  },
  {
    title: '2. Podział na dwie figury',
    narration:
      'Dzielimy przekrój na pas i środnik. Pas ma pole 9,0 · 2,0 = 18 cm², a środnik 1,0 · 28,0 = 28 cm². Suma pól wynosi 46 cm² — tyle samo, co pole całego przekroju.',
    formula:
      'A_1=9{,}0\\cdot2{,}0=18\\ \\mathrm{cm}^2\\qquad A_2=1{,}0\\cdot28{,}0=28\\ \\mathrm{cm}^2\\\\A=A_1+A_2=46\\ \\mathrm{cm}^2',
    caption: 'Przekrój rozdzielony na pas i środnik; pola obu części sumują się do 46 cm².',
    visual: 'section',
    focus: { metric: 'areas' },
    emphasis: 'Dzielimy na figury proste, których środki ciężkości znamy od razu.',
  },
  {
    title: '3. Środki ciężkości części',
    narration:
      'Środek pasa leży w połowie jego grubości, czyli 1,0 cm od górnej krawędzi. Środek środnika leży 2,0 cm pod pasem i jeszcze 14,0 cm w dół, więc z₂ = 16,0 cm. Obie współrzędne y są równe zeru.',
    formula: 'z_1=\\frac{2{,}0}{2}=1{,}0\\ \\mathrm{cm}\\qquad z_2=2{,}0+\\frac{28{,}0}{2}=16{,}0\\ \\mathrm{cm}',
    caption: 'Środki ciężkości pasa i środnika zaznaczone na osi symetrii.',
    visual: 'section',
    focus: { metric: 'part-centroids' },
    emphasis: 'Współrzędne mierzymy konsekwentnie od górnej krawędzi w dół.',
  },
  {
    title: '4. Pierwszy moment i średnia ważona',
    narration:
      'Współrzędna środka ciężkości jest średnią ważoną współrzędnych części, gdzie wagami są pola. Liczymy pierwsze momenty pól: A₁z₁ = 18 cm³ oraz A₂z₂ = 448 cm³. Ich suma 466 cm³ dzielona przez 46 cm² daje z_C.',
    formula: 'z_C=\\frac{A_1z_1+A_2z_2}{A_1+A_2}=\\frac{18\\cdot1{,}0+28\\cdot16{,}0}{46}=\\frac{466}{46}',
    caption: 'Wkłady pasa i środnika do pierwszego momentu pola; środnik wnosi zdecydowaną większość.',
    visual: 'section',
    focus: { metric: 'weighted' },
    emphasis: 'To jest dokładnie średnia ważona pól, nie zwykła średnia współrzędnych.',
  },
  {
    title: '5. Wynik liczbowy',
    narration:
      'Dzielenie 466 przez 46 daje 10,1304 cm. Po zaokrągleniu środek ciężkości leży 10,13 cm od górnej krawędzi. Zaznaczamy go na osi symetrii, czyli w punkcie (0; 10,13) cm.',
    formula: 'z_C=\\frac{466}{46}=10{,}1304\\ \\mathrm{cm}\\approx10{,}13\\ \\mathrm{cm}\\\\y_C=0\\ \\mathrm{cm}',
    caption: 'Punkt C zaznaczony 10,13 cm poniżej górnej krawędzi, na osi symetrii.',
    visual: 'section',
    focus: { metric: 'result' },
    emphasis: 'Środek ciężkości leży w środniku, poniżej pasa.',
  },
  {
    title: '6. Osie centralne',
    narration:
      'Przez środek ciężkości prowadzimy pozioma oś centralną y₀ i pionową oś centralną z₀. Oś z₀ pokrywa się z osią symetrii przekroju. Te osie są podstawą do obliczania centralnych momentów bezwładności.',
    formula: '\\int_A y\\,dA=0\\quad\\Rightarrow\\quad y_C=0',
    caption: 'Pozioma oś y₀ i pionowa oś z₀ przechodzą przez punkt C.',
    visual: 'section',
    focus: { metric: 'axes' },
    emphasis: 'Osie centralne przechodzą przez C, a nie przez górną krawędź.',
  },
  {
    title: '7. Kontrola: pierwszy moment względem y₀',
    narration:
      'Względem osi centralnej y₀ suma pierwszych momentów musi być zerowa. Pas leży 9,1304 cm powyżej C, a środnik 5,8696 cm poniżej. Iloczyny 18·(−9,1304) i 28·(5,8696) mają przeciwne znaki i równe moduły, więc suma wynosi zero.',
    formula: '18\\cdot(-9{,}1304)+28\\cdot(5{,}8696)=-164{,}35+164{,}35\\approx0',
    caption: 'Równowaga momentów pól względem osi centralnej y₀.',
    visual: 'section',
    focus: { metric: 'check' },
    emphasis: 'Zerowy pierwszy moment względem osi centralnej potwierdza położenie C.',
  },
]

export default {
  ...createSectionSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TeeCentroidAnimation }))),
} satisfies SolutionData
