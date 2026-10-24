import type { SolutionData } from '../../model'
import { AxialStiffnessCondition3Animation } from './animation'

export default {
  id: 'ex-axial-stiffness-condition-3',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 3',
  duration: 7,
  given: ['A=250 mm²', 'L=2,5 m', 'N=30 kN'],
  result:
    'Ten wariant pokazuje, że „wystarczająco mocny” nie znaczy „wystarczająco sztywny”. W zadaniach projektowych warto najpierw policzyć oba minima, a dopiero potem wybierać materiał i wymiar. Czasem tańszy materiał o mniejszym E wymaga tak dużego przekroju, że przestaje być tańszy. Czasem z kolei sztywność jest tak ważna, że wybór materiału jest z góry narzucony.',
  animation: AxialStiffnessCondition3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Tym razem szukamy wymaganego modułu Younga. Pręt o polu A=250 mm^2 i długości L=2,5 m przenosi siłę N=30 kN. Dopuszczalne wydłużenie wynosi 1,5 mm. Z warunku sztywności przekształcamy wzór do postaci Zapis matematyczny. Wymagany moduł odpowiada typowej stali. Sprawdźmy naprężenie: σ=30 000/250=120 MPa, czyli poniżej typowej granicy plastyczności 235 MPa. Rozwiązanie jest spójne: stalowy pręt o polu 250 mm^2 wydłuży się dokładnie o 1,5 mm. Gdyby ten sam pręt wykonano z aluminium o E=70 GPa, wydłużenie wyniosłoby 30 000·2500/(70 000·250)=4,29 mm, czyli prawie trzy razy więcej niż dopuszczalne. Aby spełnić limit, potrzebne byłoby pole A≥30 000·2500/(70 000·1,5)=714,3 mm^2. Warunek wytrzymałości wymagałby tylko około 191 mm^2, więc sztywność decydowałaby o przekroju i to z dużym zapasem. Ten wariant pokazuje, że „wystarczająco mocny” nie znaczy „wystarczająco sztywny”. W zadaniach projektowych warto najpierw policzyć oba minima, a dopiero potem wybierać materiał i wymiar. Czasem tańszy materiał o mniejszym E wymaga tak dużego przekroju, że przestaje być tańszy. Czasem z kolei sztywność jest tak ważna, że wybór materiału jest z góry narzucony. Odkształcenie przy przyjętym module: ε = σ/E = 120/200 000 = 0,0006.',
      caption: 'Przy E = 200 GPa wydłużenie εL = 0,0006·2500 = 1,5 mm, czyli dokładnie na granicy.',
      visual: 'axial',
      formula:
        'L=2{,}5\\ \\text{m}\\qquad E_{\\min}=\\frac{NL}{A\\,\\Delta L_{\\mathrm{dop}}}=\\frac{30\\,000\\cdot 2500}{250\\cdot 1{,}5}=200\\,000\\ \\text{MPa}=200\\ \\text{GPa}\\qquad \\sigma=\\frac{30\\,000}{250}=120\\ \\text{MPa}\\qquad E=70\\ \\text{GPa}\\qquad \\varepsilon=\\frac{\\sigma}{E}=\\frac{120}{200\\,000}=0{,}0006',
    },
  ],
} satisfies SolutionData
