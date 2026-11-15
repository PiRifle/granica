import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { createTorsionDiagramsSolution } from '../../solution-factories/factory-torsion-diagrams/factory'
import { meta } from './task'
import type { SolutionScene } from '../../../types'

const scenes: SolutionScene[] = [
  {
    title: '1. Model wału i przyłożone momenty',
    narration:
      'Wał dzielimy na cztery odcinki po 0,2 m. Na obu końcach pracują łożyska, które nie przenoszą momentu skręcającego. Momenty zewnętrzne działają w punktach A, B, C, D i E; na rysunku strzałki pokazują ich zwroty, a wartość M0 jest jeszcze niewiadoma.',
    caption: 'Cztery odcinki, dwa łożyska i pięć momentów działających na granicach odcinków.',
    visual: 'diagram',
    focus: { metric: 'model' },
    formula: 'l_1=l_2=l_3=l_4=0{,}2\\ \\mathrm{m}\\qquad d=40\\ \\mathrm{mm}\\qquad G=80\\ \\mathrm{GPa}',
  },
  {
    title: '2. Równowaga momentów i wyznaczenie M0',
    narration:
      'Wał jest swobodny w łożyskach, więc suma momentów względem osi musi się zerować. Przy przyjętym zwrocie dodatnim moment M0 równoważy pozostałe cztery momenty. Otrzymujemy M0 = 2 + 3 + 2 + 4 = 11 kN·m.',
    caption: 'Moment M0 = 11 kN·m zamyka równowagę momentów względem osi wału.',
    visual: 'diagram',
    focus: { metric: 'equilibrium' },
    formula: '-M_1+M_0-M_2-M_3-M_4=0\\\\M_0=2+3+2+4=11\\ \\mathrm{kN\\cdot m}',
  },
  {
    title: '3. Wykres momentu skręcającego',
    narration:
      'Momenty wewnętrzne liczymy od lewego swobodnego końca. Na pierwszym odcinku działa −2 kN·m. Po przyłożeniu M0 moment skacze do +9, a kolejne momenty zmniejszają go do +6, +4 i wreszcie do zera na prawym końcu.',
    caption: 'Wykres schodkowy: −2 → +9 → +6 → +4 → 0 kN·m.',
    visual: 'diagram',
    focus: { metric: 'torque' },
    formula:
      'M_{s1}=-2\\,\\mathrm{kN\\cdot m}\\quad M_{s2}=+9\\,\\mathrm{kN\\cdot m}\\\\ M_{s3}=+6\\,\\mathrm{kN\\cdot m}\\quad M_{s4}=+4\\,\\mathrm{kN\\cdot m}',
  },
  {
    title: '4. Biegunowy moment bezwładności i wskaźnik',
    narration:
      'Dla pełnego przekroju kołowego o średnicy 40 mm liczymy J0 = πd⁴/32 oraz W0 = πd³/16. Używamy dokładnej wartości π, dlatego J0 = 251 327 mm⁴, a W0 = 12 566,4 mm³. Te dwie wielkości wystarczą do naprężeń i kątów skręcenia.',
    caption: 'Przekrój kołowy ∅40 mm: J0 = 251 327 mm⁴ i W0 = 12 566,4 mm³.',
    visual: 'section',
    focus: { metric: 'section' },
    formula:
      'J_0=\\frac{\\pi d^4}{32}=251\\,327\\ \\mathrm{mm^4}\\\\ W_0=\\frac{\\pi d^3}{16}=12\\,566{,}4\\ \\mathrm{mm^3}',
  },
  {
    title: '5. Naprężenia styczne w kolejnych odcinkach',
    narration:
      'Naprężenie w każdym odcinku to wartość bezwzględna momentu podzielona przez W0. Otrzymujemy 159,2; 716,2; 477,5 oraz 318,3 MPa. Największa wartość występuje na drugim odcinku, tam gdzie moment wewnętrzny wynosi 9 kN·m.',
    caption: 'Naprężenia rosną wraz z momentem; decyduje odcinek drugi.',
    visual: 'diagram',
    focus: { metric: 'stress' },
    formula:
      '\\tau_i=\\frac{|M_{si}|}{W_0}\\\\ \\tau_1=159{,}2\\quad \\tau_2=716{,}2\\quad \\tau_3=477{,}5\\quad \\tau_4=318{,}3\\ \\mathrm{MPa}',
  },
  {
    title: '6. Warunek wytrzymałości nie jest spełniony',
    narration:
      'Największe naprężenie 716,2 MPa znacznie przekracza wartość dopuszczalną 200 MPa. Przekrój jest więc zbyt mały — sam dobór wymiarów wymagałby średnicy większej niż 40 mm. Na wykresie linia k_s pokazuje, że tylko pierwszy odcinek pozostaje bezpieczny.',
    caption: 'τmax = 716,2 MPa > k_s = 200 MPa, czyli warunek wytrzymałości nie jest spełniony.',
    visual: 'diagram',
    focus: { metric: 'strength' },
    formula:
      '\\tau_{\\max}=716{,}2\\ \\mathrm{MPa}>k_s=200\\ \\mathrm{MPa}\\\\ \\frac{\\tau_{\\max}}{k_s}\\approx3{,}58',
  },
  {
    title: '7. Przyrosty kąta skręcenia',
    narration:
      'Dla każdego odcinka kąt skręcenia to θ = M_s·l/(G·J0). Pierwszy odcinek skręca w przeciwnym kierunku (−0,01989 rad), a pozostałe dodatnio. W stopniach otrzymujemy −1,14°, +5,13°, +3,42° i +2,28°.',
    caption: 'Cztery przyrosty kąta: −1,14°, +5,13°, +3,42° i +2,28°.',
    visual: 'diagram',
    focus: { metric: 'twist' },
    formula:
      '\\theta_i=\\frac{M_{si}\\,l}{G\\,J_0}\\\\ \\theta_1=-0{,}01989\\quad \\theta_2=+0{,}08952\\quad \\theta_3=+0{,}05968\\quad \\theta_4=+0{,}03979\\ \\mathrm{rad}',
  },
  {
    title: '8. Wykres sumarycznego kąta skręcenia',
    narration:
      'Kąt skręcenia narasta od zera na lewym końcu. Najpierw maleje o 1,14°, a potem rośnie na trzech kolejnych odcinkach. Na prawym końcu osiąga 0,16910 rad, czyli 9,69° względem początku wału.',
    caption: 'Sumaryczny obrót końca względem początku wynosi 9,69°.',
    visual: 'diagram',
    focus: { metric: 'cumulative' },
    formula:
      '\\varphi=\\sum_i\\theta_i=0{,}16910\\ \\mathrm{rad}\\\\ \\varphi=0{,}16910\\cdot\\frac{180^\\circ}{\\pi}=9{,}69^\\circ',
  },
  {
    title: '9. Kontrola równowagi, jednostek i wniosku',
    narration:
      'Sprawdzamy, że suma momentów zewnętrznych wynosi zero, a moment wewnętrzny po ostatnim obciążeniu spada do zera. Suma przyrostów kątów daje 0,16910 rad. Jednostki są spójne: moment w N·mm, G w N/mm², a wynik w radianach.',
    caption: 'Równowaga i suma kątów potwierdzone; warunek naprężeń nadal nie jest spełniony.',
    visual: 'diagram',
    focus: { metric: 'check' },
    formula: '\\sum M_x=0\\qquad M_{s4}-M_4=0\\\\ \\sum\\theta_i=0{,}16910\\ \\mathrm{rad}=9{,}69^\\circ',
  },
]

export default {
  ...createTorsionDiagramsSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
