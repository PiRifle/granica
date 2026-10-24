import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-stiffness-condition-3',
  title: 'Warunek sztywności: bezpiecznie i bez nadmiernych ruchów — przykład 3',
  duration: 7,
  given: ['N = 30 kN', 'L = 2,5 m', 'A = 250 mm²', 'ΔL_dop = 1,5 mm'],
  result:
    'Wymagany moduł wynosi 200 GPa, co odpowiada stali. Przy E = 70 GPa wydłużenie byłoby 4,29 mm, więc aluminium wymagałoby pola około 714 mm², mimo że warunek wytrzymałości wystarczyłby przy około 191 mm². „Wystarczająco mocny” nie znaczy „wystarczająco sztywny”.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.AxialStiffnessCondition3Animation })),
  ),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Tym razem szukamy wymaganego modułu Younga. Pręt o polu A = 250 mm² i długości L = 2,5 m przenosi siłę N = 30 kN. Dopuszczalne wydłużenie wynosi 1,5 mm.',
      caption: 'Model: jednorodny pręt o polu 250 mm² i długości 2,5 m; limit wydłużenia 1,5 mm.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'N=30\\ \\text{kN},\\quad L=2{,}5\\ \\text{m},\\quad A=250\\ \\text{mm}^2,\\quad \\Delta L_{\\mathrm{dop}}=1{,}5\\ \\text{mm}',
    },
    {
      title: 'Wymagany moduł Younga',
      narration:
        'Z warunku sztywności przekształcamy wzór: E_min = NL/(A ΔL_dop) = 30 000·2500/(250·1,5) = 200 000 MPa = 200 GPa. Przy tym module pręt wydłuża się dokładnie o 1,5 mm, czyli dochodzi do dopuszczalnej granicy.',
      caption: 'Przy E = 200 GPa rzeczywiste wydłużenie wynosi 1,5 mm i pokrywa się z limitem.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        'E_{\\min}=\\frac{NL}{A\\,\\Delta L_{\\mathrm{dop}}}=\\frac{30\\,000\\cdot2500}{250\\cdot1{,}5}=200\\,000\\ \\text{MPa}=200\\ \\text{GPa}',
    },
    {
      title: 'Kontrola naprężenia',
      narration:
        'Sprawdźmy naprężenie: σ = 30 000/250 = 120 MPa, czyli poniżej typowej granicy plastyczności 235 MPa. Odkształcenie wynosi ε = σ/E = 120/200 000 = 0,0006. Rozwiązanie jest spójne: stalowy pręt o polu 250 mm² wydłuży się o 1,5 mm.',
      caption: 'Naprężenie 120 MPa jest bezpieczne, ale to nie wystarcza do oceny przemieszczenia.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma=\\frac{N}{A}=\\frac{30\\,000}{250}=120\\ \\text{MPa}<235\\ \\text{MPa},\\qquad \\varepsilon=\\frac{\\sigma}{E}=\\frac{120}{200\\,000}=0{,}0006',
    },
    {
      title: 'Wariant aluminiowy',
      narration:
        'Gdyby ten sam pręt wykonano z aluminium o E = 70 GPa, wydłużenie wyniosłoby 30 000·2500/(70 000·250) = 4,29 mm, czyli prawie trzy razy więcej niż dopuszczalne. Sam warunek wytrzymałości nie chroni przed takim przemieszczeniem.',
      caption: 'Aluminium o E = 70 GPa wydłuża pręt o 4,29 mm, znacznie ponad limit 1,5 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L=\\frac{NL}{EA}=\\frac{30\\,000\\cdot2500}{70\\,000\\cdot250}=4{,}29\\ \\text{mm}>1{,}5\\ \\text{mm}',
    },
    {
      title: 'Korekta przekroju',
      narration:
        'Aby spełnić limit przy aluminium, potrzebne jest pole A ≥ 30 000·2500/(70 000·1,5) = 714,3 mm². Warunek wytrzymałości wymagałby tylko około 191 mm², więc o przekroju decyduje sztywność. Po powiększeniu pola do 714 mm² wydłużenie wraca do 1,5 mm, czyli na granicę dopuszczalną.',
      caption: 'Aluminium wymaga pola około 714 mm²; po powiększeniu przekroju ΔL wraca do 1,5 mm.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A_{\\min,\\Delta}=\\frac{NL}{E\\,\\Delta L_{\\mathrm{dop}}}=\\frac{30\\,000\\cdot2500}{70\\,000\\cdot1{,}5}=714{,}3\\ \\text{mm}^2,\\qquad \\Delta L=\\frac{30\\,000\\cdot2500}{70\\,000\\cdot714{,}3}=1{,}5\\ \\text{mm},\\qquad A_{\\min,\\sigma}\\approx191\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
