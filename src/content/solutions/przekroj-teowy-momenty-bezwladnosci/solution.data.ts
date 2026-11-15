import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createSectionSolution } from '../../solution-factories/factory-section-geometry/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Osie centralne i środki części',
    narration:
      'Oś y₀ jest pozioma i przechodzi przez środek ciężkości C. Oś z₀ jest pionowa i pokrywa się z osią symetrii. Środek pasa C₁ leży 9,1304 cm powyżej C, a środek środnika C₂ — 5,8696 cm poniżej. Te odległości są kluczowe dla twierdzenia Steinera.',
    formula: 'z_C=10{,}1304\\ \\mathrm{cm}\\qquad d_1=9{,}1304\\ \\mathrm{cm}\\qquad d_2=5{,}8696\\ \\mathrm{cm}',
    caption: 'Przekrój z osiami centralnymi y₀ i z₀ oraz środkami C₁, C₂ obu części.',
    visual: 'section',
    focus: { metric: 'axes' },
    emphasis: 'Oś y₀ jest pozioma, a oś z₀ pionowa — to decyduje o doborze odległości.',
  },
  {
    title: '2. Twierdzenie Steinera',
    narration:
      'Moment bezwładności względem dowolnej osi równoległej do osi centralnej obliczamy jako moment własny względem osi centralnej plus pole razy kwadrat odległości między osiami. Stosujemy to osobno do pasa i środnika.',
    formula: 'I=I_0+A d^2\\\\I_{y0}=\\sum\\left(I_{y0,i}^{(0)}+A_i d_i^2\\right)',
    caption: 'Oś przesunięta o d: moment własny plus składnik Steinerowski A d².',
    visual: 'section',
    focus: { metric: 'steiner' },
    emphasis: 'Składnik A d² jest zawsze dodatni, więc przesunięcie osi zwiększa moment.',
  },
  {
    title: '3. Momenty własne części',
    narration:
      'Dla prostokąta o szerokości b i wysokości h moment względem osi poziomej wynosi b h³/12, a względem pionowej — h b³/12. Dla pasa otrzymujemy 6,00 i 121,50 cm⁴, a dla środnika 1829,33 i 2,33 cm⁴.',
    formula:
      'I_{y0,pas}^{(0)}=\\frac{9\\cdot2^3}{12}=6{,}00\\qquad I_{y0,\\text{śr}}^{(0)}=\\frac{1\\cdot28^3}{12}=1829{,}33\\\\I_{z0,pas}^{(0)}=\\frac{2\\cdot9^3}{12}=121{,}50\\qquad I_{z0,\\text{śr}}^{(0)}=\\frac{28\\cdot1^3}{12}=2{,}33',
    caption: 'Momenty własne pasa i środnika względem ich osi centralnych.',
    visual: 'section',
    focus: { metric: 'own' },
    emphasis: 'Uwaga na zamianę b i h: inna oś, inny wykładnik potęgi.',
  },
  {
    title: '4. Składniki Steinera dla I_y0',
    narration:
      'Do I_y0 potrzebujemy odległości pionowych od poziomej osi y₀. Dla pasa d₁ = 9,1304 cm, dla środnika d₂ = 5,8696 cm. Po podniesieniu do kwadratu i pomnożeniu przez pola otrzymujemy 1500,57 oraz 964,65 cm⁴.',
    formula:
      'A_1d_1^2=18\\cdot(9{,}1304)^2=1500{,}57\\ \\mathrm{cm}^4\\\\A_2d_2^2=28\\cdot(5{,}8696)^2=964{,}65\\ \\mathrm{cm}^4',
    caption: 'Pionowe odległości środków części od poziomej osi y₀ i odpowiadające składniki Steinera.',
    visual: 'section',
    focus: { metric: 'steiner-y' },
    emphasis: 'Oba składniki są dodatnie i wyraźnie zwiększają I_y0.',
  },
  {
    title: '5. Wynik I_y0',
    narration:
      'Sumujemy momenty własne i składniki Steinera: 6,00 + 1829,33 + 1500,57 + 964,65. Otrzymujemy I_y0 = 4300,55 cm⁴. Dominujący udział ma moment własny wysokiego środnika.',
    formula: 'I_{y0}=6{,}00+1829{,}33+1500{,}57+964{,}65\\\\I_{y0}=4300{,}55\\ \\mathrm{cm}^4',
    caption: 'Zestawienie czterech składników dających centralny moment I_y0.',
    visual: 'section',
    focus: { metric: 'Iy0' },
    emphasis: 'I_y0 odpowiada zginaniu względem osi poziomej.',
  },
  {
    title: '6. I_z0 — tylko odległości poziome',
    narration:
      'Oś z₀ jest pionowa, więc do I_z0 wchodzą odległości poziome y. Środki pasa i środnika leżą na osi z₀, więc ich odległości poziome są zerowe. Znika cały składnik Steinera i pozostają tylko momenty własne względem z₀.',
    formula: 'y_1=y_2=0\\quad\\Rightarrow\\quad A_i y_i^2=0\\\\I_{z0}=I_{z0,pas}^{(0)}+I_{z0,\\text{śr}}^{(0)}',
    caption: 'Pionowa oś z₀ przechodzi przez środki obu części, więc Steiner dla I_z0 jest zerowy.',
    visual: 'section',
    focus: { metric: 'Iz0' },
    emphasis: 'Nie mylić: I_z0 liczymy z odległości poziomych y, a nie pionowych z.',
  },
  {
    title: '7. Wynik I_z0',
    narration:
      'Dodajemy momenty własne względem osi pionowej: 121,50 + 2,33 = 123,83 cm⁴. Wartość jest znacznie mniejsza od I_y0, bo materiał jest skupiony blisko osi z₀ — szerokość przekroju jest mała.',
    formula: 'I_{z0}=121{,}50+2{,}33=123{,}83\\ \\mathrm{cm}^4',
    caption: 'Centralny moment I_z0 obliczony wyłącznie z momentów własnych części.',
    visual: 'section',
    focus: { metric: 'Iz0-result' },
    emphasis: 'I_z0 odpowiada zginaniu względem osi pionowej.',
  },
  {
    title: '8. Porównanie i interpretacja',
    narration:
      'Stosunek I_y0/I_z0 wynosi około 34,7. Przekrój jest więc około 35 razy sztywniejszy przy zginaniu względem osi poziomej niż względem pionowej. To typowa cecha wysokiego, wąskiego przekroju teowego.',
    formula: '\\frac{I_{y0}}{I_{z0}}=\\frac{4300{,}55}{123{,}83}\\approx34{,}7',
    caption: 'Porównanie obu momentów centralnych: I_y0 jest około 35 razy większy od I_z0.',
    visual: 'section',
    focus: { metric: 'compare' },
    emphasis: 'Większy moment oznacza mniejsze naprężenia i mniejsze ugięcie przy tym samym momencie gnącym.',
  },
]

export default {
  ...createSectionSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TeeSecondMomentsAnimation }))),
} satisfies SolutionData
