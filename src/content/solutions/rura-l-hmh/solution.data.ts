import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { createBendingTorsionSolution } from '../../solution-factories/factory-bending-torsion/factory'
import { meta } from './task'
import type { SolutionScene } from '../../../types'

const scenes: SolutionScene[] = [
  {
    title: '1. Model rury L i siła P',
    narration:
      'Rura jest utwierdzona w A. Odcinek AB ma długość b i leży wzdłuż osi x, a odcinek BC ma długość a i leży wzdłuż osi z. Na końcu C działa pionowa siła P skierowana w dół.',
    formula: 'AB=b=0{,}50\\ \\mathrm{m}\\qquad BC=a=0{,}25\\ \\mathrm{m}\\qquad P=2\\ \\mathrm{kN}',
    caption: 'Trójwymiarowy model rury L z utwierdzeniem A, narożnikiem B i siłą P w C.',
    visual: 'diagram',
    focus: { metric: 'model' },
    emphasis: 'Ramię b przenosi zginanie, a ramię a powoduje skręcanie odcinka AB.',
  },
  {
    title: '2. Przeniesienie siły do przekroju A',
    narration:
      'Siłę P przesuwamy myślowo do utwierdzenia A. Jej pionowa linia działania jest odległa od osi AB o b, co daje moment zginający. Jednocześnie siła jest przesunięta wzdłuż BC o a, co daje moment skręcający w odcinku AB.',
    formula: 'M_g=P\\,b\\qquad M_s=P\\,a',
    caption: 'Ramię zginania b wzdłuż AB oraz ramię skręcania a wzdłuż BC.',
    visual: 'diagram',
    focus: { metric: 'transfer' },
    emphasis: 'To samo obciążenie wywołuje jednocześnie zginanie i skręcanie.',
  },
  {
    title: '3. Momenty w utwierdzeniu',
    narration:
      'Moment zginający w A wynosi P·b, czyli 2 kN razy 0,50 m. Moment skręcający wynosi P·a, czyli 2 kN razy 0,25 m. Otrzymujemy M_g = 1,00 kN·m oraz M_s = 0,50 kN·m.',
    formula:
      'M_g=P\\,b=2\\cdot0{,}5=1{,}00\\ \\mathrm{kN\\cdot m}\\\\M_s=P\\,a=2\\cdot0{,}25=0{,}50\\ \\mathrm{kN\\cdot m}',
    caption: 'Widok z góry: ramię b = 0,5 m, ramię a = 0,25 m i pionowa siła P w C.',
    visual: 'diagram',
    focus: { metric: 'plan' },
    emphasis: 'M_g = 1,00 kN·m oraz M_s = 0,50 kN·m w przekroju A.',
  },
  {
    title: '4. Wykresy momentów wzdłuż rury',
    narration:
      'Na odcinku AB moment zginający maleje liniowo od 1,00 kN·m w A do zera w B. Moment skręcający na AB jest stały i wynosi 0,50 kN·m. Na odcinku BC moment skręcający nie występuje, a zginanie maleje od 0,50 kN·m w B do zera w C.',
    formula: 'M_g(0)=1{,}00\\ \\mathrm{kN\\cdot m}\\qquad M_s=0{,}50\\ \\mathrm{kN\\cdot m}\\ \\text{na }AB',
    caption: 'Wykresy M_g i M_s na odcinku AB oraz wykres M_g na odcinku BC.',
    visual: 'diagram',
    focus: { metric: 'diagrams' },
    emphasis: 'Największe oba momenty występują jednocześnie w utwierdzeniu A.',
  },
  {
    title: '5. Moment zastępczy według HMH',
    narration:
      'Hipoteza HMH zastępuje złożony stan zginania i skręcania jednym momentem zastępczym. Podnosimy M_g do kwadratu i dodajemy 0,75 M_s², a następnie pierwiastkujemy. Otrzymujemy M_eq = 1,0897 kN·m, czyli 1 089 725 N·mm.',
    formula:
      'M_{eq}=\\sqrt{M_g^2+0{,}75M_s^2}\\\\=\\sqrt{1{,}00^2+0{,}75\\cdot0{,}50^2}=1{,}0897\\ \\mathrm{kN\\cdot m}',
    caption: 'Trójkąt wektorowy: M_g = 1,00, 0,433·M_s oraz wypadkowy M_eq = 1,0897 kN·m.',
    visual: 'diagram',
    focus: { metric: 'hmh' },
    emphasis: 'Do dalszego projektowania używamy M_eq, a nie większego z momentów.',
  },
  {
    title: '6. Dobór średnicy',
    narration:
      'Moment zastępczy podstawiamy do warunku jak przy czystym zginaniu. Po przekształceniu otrzymujemy d ≥ 38,14 mm. Zaokrąglenie w górę do typowej średnicy daje d = 40 mm.',
    formula:
      'd\\ge\\sqrt[3]{\\frac{32M_{eq}}{\\pi k_g}}=\\sqrt[3]{\\frac{32\\cdot1\\,089\\,725}{\\pi\\cdot200}}\\\\d\\ge38{,}14\\ \\mathrm{mm}\\ \\Rightarrow\\ d=40\\ \\mathrm{mm}',
    caption: 'Obliczenie d_min = 38,14 mm i zaokrąglenie do d = 40 mm.',
    visual: 'section',
    focus: { metric: 'design' },
    emphasis: 'Średnica 40 mm jest pierwszą typową wartością większą od 38,14 mm.',
  },
  {
    title: '7. Sprawdzenie naprężeń przy d = 40 mm',
    narration:
      'Dla przyjętej średnicy obliczamy naprężenie normalne od zginania i styczne od skręcania. Przy d = 40 mm otrzymujemy σ = 159,15 MPa, τ = 39,79 MPa i σ_HMH = 173,44 MPa, czyli mniej niż 200 MPa. Dla średnicy minimalnej 38,14 mm byłoby σ = 183,53 MPa, τ = 45,88 MPa i σ_HMH = 200 MPa, dlatego zaokrąglenie do 40 mm daje zapas.',
    formula:
      '\\sigma=\\frac{32M_g}{\\pi d^3}=159{,}15\\ \\mathrm{MPa}\\qquad \\tau=\\frac{16M_s}{\\pi d^3}=39{,}79\\ \\mathrm{MPa}\\\\ \\sigma_{HMH}=\\sqrt{\\sigma^2+3\\tau^2}=173{,}44\\ \\mathrm{MPa}',
    caption: 'Sprawdzenie: σ = 159,15 MPa, τ = 39,79 MPa i σ_HMH = 173,44 MPa.',
    visual: 'section',
    focus: { metric: 'stress' },
    emphasis: 'Warunek HMH: 173,44 MPa < 200 MPa — zapas około 13,3%.',
  },
  {
    title: '8. Przekrój krytyczny A',
    narration:
      'W utwierdzeniu A działają jednocześnie największy moment zginający i największy moment skręcający. Dlatego właśnie ten przekrój decyduje o doborze średnicy. Na pozostałych odcinkach co najmniej jeden z momentów jest mniejszy lub równy zeru.',
    formula: 'M_g(A)=1{,}00\\ \\mathrm{kN\\cdot m}\\qquad M_s(A)=0{,}50\\ \\mathrm{kN\\cdot m}',
    caption: 'Widok 3D z wyróżnionym przekrojem A i pierścieniami momentów M_g oraz M_s.',
    visual: 'diagram',
    focus: { metric: 'critical' },
    emphasis: 'Przekrój A jest krytyczny, bo oba momenty osiągają tam maksimum.',
  },
  {
    title: '9. Kontrola końcowa',
    narration:
      'Sprawdzamy jednostki: moment w N·mm, naprężenie w N/mm², średnica w mm. Dla d = 40 mm otrzymujemy σ_HMH = 173,44 MPa, czyli mniej niż k_g = 200 MPa. Warunek wytrzymałości według HMH jest spełniony z zapasem około 13,3%.',
    formula: '\\sigma_{HMH}=173{,}44\\ \\mathrm{MPa}<k_g=200\\ \\mathrm{MPa}',
    caption: 'Zestawienie M_g, M_s, M_eq, d oraz σ_HMH z warunkiem wytrzymałości.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Przyjęta średnica 40 mm spełnia warunek HMH.',
  },
]

export default {
  ...createBendingTorsionSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
