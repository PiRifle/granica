import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution } from '../../solution-factories/factory-shear-bending/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model pręta i czyste zginanie',
    narration:
      'Pręt jest zginany momentem M działającym w płaszczyźnie pionowej. Oś zginania x przechodzi poziomo przez środek przekroju, dlatego odległości y mierzymy w górę i w dół od tej osi. W takim stanie naprężenia normalne rozkładają się liniowo względem osi obojętnej.',
    formula: 'M\\perp\\text{przekrój},\\qquad \\sigma=\\frac{M\\,y}{I_x}',
    caption: 'Pręt z momentem M i zaznaczoną osią zginania x; przekrój jest rurowy, prostokątny.',
    visual: 'beam',
    focus: { metric: 'model' },
    emphasis: 'Najpierw geometria i oś zginania — dopiero potem wartości liczbowe.',
  },
  {
    title: '2. Przekrój rurowy i wymiary',
    narration:
      'Zewnętrzny prostokąt ma 80 mm szerokości i 100 mm wysokości. Ścianka ma 6 mm, więc w każdym kierunku ubywa po 6 mm z każdej strony. Otwór wewnętrzny ma zatem 68 mm szerokości i 88 mm wysokości.',
    formula: 'b_i=80-2\\cdot6=68\\ \\mathrm{mm}\\qquad h_i=100-2\\cdot6=88\\ \\mathrm{mm}',
    caption: 'Przekrój 80 × 100 mm z otworem 68 × 88 mm; ścianka t = 6 mm.',
    visual: 'section',
    focus: { metric: 'section' },
    emphasis: 'Wymiary wewnętrzne wynikają z grubości ścianki, a nie z rysunku w skali.',
  },
  {
    title: '3. Moment bezwładności — odejmowanie otworu',
    narration:
      'Moment bezwładności przekroju rurowego liczymy jako różnicę momentów dwóch pełnych prostokątów. Prostokąt zewnętrzny ma 80 × 100 mm, a odejmowany otwór 68 × 88 mm. Odejmujemy czwarte potęgi wymiarów, dlatego pustka wnosi aż 3,86·10⁶ mm⁴.',
    formula:
      'I_x=\\frac{80\\cdot100^3-68\\cdot88^3}{12}\\\\I_x=\\frac{80\\,000\\,000-46\\,340\\,096}{12}=2\\,804\\,992\\ \\mathrm{mm}^4',
    caption: 'Odejmowanie pustki 68 × 88 mm od pełnego prostokąta 80 × 100 mm.',
    visual: 'diagram',
    focus: { metric: 'subtraction' },
    emphasis: 'I_x = 2 804 992 mm⁴ ≈ 280,50 cm⁴.',
  },
  {
    title: '4. Wskaźnik wytrzymałości W_x',
    narration:
      'Wskaźnik wytrzymałości to moment bezwładności podzielony przez odległość najdalszego włókna od osi obojętnej. Przy wysokości 100 mm ta odległość wynosi c = 50 mm. Dzielenie 2 804 992 mm⁴ przez 50 mm daje 56 099,84 mm³, czyli 56,10 cm³.',
    formula:
      'c=\\frac{h}{2}=50\\ \\mathrm{mm}\\\\W_x=\\frac{I_x}{c}=\\frac{2\\,804\\,992}{50}=56\\,099{,}84\\ \\mathrm{mm}^3',
    caption: 'Przekrój z osią obojętną oraz odległością c = 50 mm do skrajnego włókna.',
    visual: 'section',
    focus: { metric: 'wx' },
    emphasis: 'W_x = 56,10 cm³ — to wartość potrzebna w warunku wytrzymałości.',
  },
  {
    title: '5. Naprężenie dopuszczalne',
    narration:
      'Materiał jest sprężysty, więc dopuszczalne naprężenie wyznaczamy z granicy plastyczności i współczynnika bezpieczeństwa. Dzielimy 400 MPa przez 3 i otrzymujemy 133,33 MPa. Ten poziom jest naszym limitem przy projektowaniu momentu.',
    formula: '\\sigma_{dop}=\\frac{R_e}{n}=\\frac{400}{3}=133{,}33\\ \\mathrm{MPa}',
    caption: 'Skala naprężeń: poziom dopuszczalny 133,33 MPa oraz granica R_e = 400 MPa.',
    visual: 'diagram',
    focus: { metric: 'allowable' },
    emphasis: 'Współczynnik n = 3 zapewnia trzykrotny zapas względem granicy plastyczności.',
  },
  {
    title: '6. Maksymalny dopuszczalny moment',
    narration:
      'Warunek wytrzymałości σ_max ≤ σ_dop przekształcamy do postaci M ≤ σ_dop·W_x. Po podstawieniu 133,333 MPa i 56 099,84 mm³ otrzymujemy 7 479 979 N·mm. Po zamianie jednostek jest to 7,48 kN·m — większy moment przekroczyłby dopuszczalne naprężenie.',
    formula:
      'M_{\\max}=\\sigma_{dop}\\,W_x=133{,}333\\cdot56\\,099{,}84\\\\M_{\\max}=7\\,479\\,979\\ \\mathrm{N\\cdot mm}=7{,}48\\ \\mathrm{kN\\cdot m}',
    caption: 'Wynik końcowy: maksymalny dopuszczalny moment M_max = 7,48 kN·m.',
    visual: 'diagram',
    focus: { metric: 'moment' },
    emphasis: 'M_max = 7,48 kN·m — wynik dopiero po wyznaczeniu W_x i σ_dop.',
  },
  {
    title: '7. Rozkład naprężeń w przekroju',
    narration:
      'Naprężenie normalne jest proporcjonalne do odległości y od osi obojętnej. Na górze przekroju panuje ściskanie, a na dole rozciąganie; wartości skrajne mają ten sam moduł 133,33 MPa. W osi obojętnej naprężenie jest równe zeru.',
    formula: '\\sigma(y)=\\frac{M\\,y}{I_x}\\qquad \\sigma_{\\max}=\\frac{M_{\\max}}{W_x}=133{,}33\\ \\mathrm{MPa}',
    caption: 'Liniowy rozkład naprężeń: ściskanie u góry i rozciąganie u dołu przekroju.',
    visual: 'section',
    focus: { metric: 'stress' },
    emphasis: 'Zarówno skrajne rozciąganie, jak i ściskanie osiągają 133,33 MPa.',
  },
  {
    title: '8. Kontrola jednostek i wyniku',
    narration:
      'Sprawdzamy spójność jednostek: moment bezwładności w mm⁴, wskaźnik w mm³, a naprężenie w N/mm² czyli MPa. Iloczyn 133,33 N/mm² i 56 099,84 mm³ daje 7 479 979 N·mm, czyli 7,48 kN·m. Otrzymane naprężenie jest równe dopuszczalnemu, więc warunek jest spełniony na granicy.',
    formula: 'M_{\\max}=7{,}48\\ \\mathrm{kN\\cdot m}\\\\ \\sigma_{\\max}=133{,}33\\ \\mathrm{MPa}\\le\\sigma_{dop}',
    caption: 'Zestawienie I_x, W_x, σ_dop i M_max wraz z kontrolą jednostek.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Wynik jest na granicy σ_dop; w praktyce stosuje się zaokrąglenie wymiarów lub większy zapas.',
  },
]

export default {
  ...createShearBendingSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AluminumBeamMomentAnimation }))),
} satisfies SolutionData
