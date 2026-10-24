import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-tension-compression-test',
  title: 'Próba rozciągania i ściskania — przykład 1',
  duration: 9,
  given: ['d = 10 mm', 'N = 15,7 kN', 'L₀ = 100 mm', 'ΔL = 0,1 mm'],
  result:
    'W próbce działa naprężenie około 200 MPa, odkształcenie względne wynosi 0,001, a moduł Younga około 200 GPa. Punkt leży w zakresie sprężystym, ponieważ 200 MPa < Re ≈ 235 MPa.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TensileTestExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Okrągłą próbkę o średnicy d = 10 mm i długości pomiarowej L₀ = 100 mm rozciągamy siłą N = 15,7 kN. Pole przekroju liczymy z wymiaru początkowego: A₀ = πd²/4. Na wykresie σ–ε pojawi się punkt odpowiadający temu obciążeniu.',
      caption: 'Pole przekroju liczymy z wymiaru początkowego, a nie z przekroju po odkształceniu.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A_0=\\pi d^2/4=\\pi\\cdot 10^2/4=78{,}54\\ \\text{mm}^2',
    },
    {
      title: 'Zakres sprężysty',
      narration:
        'Przy sile 15,7 kN w próbce działa naprężenie σ = N/A₀ = 15 700/78,54 ≈ 199,9 MPa. Punkt leży na początkowym, prostym odcinku krzywej — materiał jest jeszcze w zakresie sprężystym.',
      caption: 'To nie jest jeszcze granica plastyczności: σ ≈ 200 MPa jest mniejsze od typowego Re ≈ 235 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=15\\,700/78{,}54\\approx 199{,}9\\ \\text{MPa}',
    },
    {
      title: 'Odkształcenie i wydłużenie',
      narration:
        'Wydłużenie odcinka pomiarowego wynosi ΔL = 0,1 mm, więc ε = ΔL/L₀ = 0,1/100 = 0,001. To 0,1% — odkształcenie jest bezwymiarowe.',
      caption: 'Ten sam punkt na wykresie ma współrzędne σ ≈ 200 MPa i ε = 0,001.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=0{,}1/100=0{,}001',
    },
    {
      title: 'Moduł i sztywność',
      narration:
        'Nachylenie prostego odcinka to moduł Younga: E = σ/ε = 200/0,001 = 200 000 MPa = 200 GPa. Sztywność osiowa próbki wynosi k = EA₀/L₀ ≈ 157 080 N/mm.',
      caption: 'Moduł jest własnością materiału, a sztywność zależy także od pola i długości próbki.',
      visual: 'axial',
      focus: { metric: 'E' },
      formula: 'E=200\\ \\text{GPa},\\qquad k=EA_0/L_0\\approx 157\\,080\\ \\text{N/mm}',
    },
    {
      title: 'Granica plastyczności',
      narration:
        'Gdyby zwiększać siłę, krzywa osiągnęłaby granicę plastyczności Re ≈ 235 MPa. Za tym punktem odkształcenie przestaje wracać do zera. Nasz wynik σ ≈ 200 MPa leży jednak poniżej tej granicy.',
      caption: 'Punkt pomiarowy (niebieski) pozostaje poniżej Re; pomarańczowy punkt to umowna granica plastyczności.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: '\\sigma\\approx 200\\ \\text{MPa} < R_e\\approx 235\\ \\text{MPa}',
    },
    {
      title: 'Wytrzymałość i przewężenie',
      narration:
        'Przy dalszym wzroście obciążenia materiał umacnia się aż do wytrzymałości Rm, a potem w miejscu przewężenia naprężenie inżynierskie spada. Nasza próbka zatrzymuje się jednak przed tym etapem: przy σ ≈ 200 MPa wciąż obowiązuje prawo Hooke’a.',
      caption:
        'Kształt końcowej części krzywej zależy od przewężenia próbki; wynik 200 MPa pozostaje w zakresie sprężystym.',
      visual: 'axial',
      focus: { metric: 'test' },
    },
  ],
} satisfies SolutionData
