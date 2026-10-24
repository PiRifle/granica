import type { SolutionData } from '../../model'
import { HookeStiffnessAnimation } from './animation'

export default {
  id: 'ex-m3-hooke-stiffness',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 1',
  duration: 7,
  given: ['L = 2 m', 'A = 250 mm²', 'N = 50 kN', 'E = 200 GPa'],
  result:
    'Pręt ma naprężenie 200 MPa, odkształcenie 0,001 i wydłuża się o 2 mm, o ile pozostaje w zakresie sprężystym. Jego sztywność osiowa wynosi około 25 MN/m.',
  animation: HookeStiffnessAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy pręt o długości L = 2 m i polu A = 250 mm² jest utwierdzony górnym końcem i rozciągany siłą N = 50 kN. Moduł Younga wynosi E = 200 GPa. Przeliczamy dane: N = 50 000 N, L = 2000 mm, E = 200 000 MPa.',
      caption: 'Model: jednorodny pręt, stała siła osiowa i stały przekrój na całej długości.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'N=50\\ \\text{kN},\\quad L=2000\\ \\text{mm},\\quad A=250\\ \\text{mm}^2,\\quad E=200\\,000\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie',
      narration:
        'Naprężenie obliczamy z siły i pola przekroju: σ = N/A = 50 000/250 = 200 MPa. Przy równomiernym rozkładzie naprężenie jest takie samo w każdym punkcie przekroju.',
      caption: 'Naprężenie 200 MPa jest jeszcze poniżej typowej granicy plastyczności stali 235 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{N}{A}=\\frac{50\\,000}{250}=200\\ \\text{MPa}',
    },
    {
      title: 'Odkształcenie',
      narration:
        'W zakresie liniowo sprężystym odkształcenie jest proporcjonalne do naprężenia: ε = σ/E = 200/200 000 = 0,001. Pręt odkształca się o 0,1% swojej długości.',
      caption:
        'Odkształcenie jest odwrotnie proporcjonalne do modułu Younga; dla tego samego naprężenia większe E daje mniejsze ε.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon=\\frac{\\sigma}{E}=\\frac{200}{200\\,000}=0{,}001',
    },
    {
      title: 'Wydłużenie',
      narration:
        'Wydłużenie to odkształcenie odniesione do długości początkowej: ΔL = εL = 0,001 · 2000 mm = 2 mm. Ten sam wynik daje bezpośredni wzór ΔL = NL/(EA).',
      caption: 'Na rysunku wydłużenie jest powiększone; rzeczywiste 2 mm to zaledwie 0,1% długości pręta.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L=\\varepsilon L=0{,}001\\cdot2000=2\\ \\text{mm},\\qquad \\Delta L=\\frac{NL}{EA}=2\\ \\text{mm}',
    },
    {
      title: 'Sztywność i kontrola',
      narration:
        'Sztywność pręta wynosi k = EA/L = 200 000·250/2000 = 25 000 N/mm, czyli 25 MN/m. Kontrola: kΔL = 25 000·2 = 50 000 N, zgodnie z zadaną siłą. Naprężenie 200 MPa pozostaje w zakresie sprężystym.',
      caption: 'Nachylenie wykresu N–ΔL to sztywność k; jest ona własnością całego pręta, a nie tylko materiału.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'k=\\frac{EA}{L}=\\frac{200\\,000\\cdot250}{2000}=25\\,000\\ \\text{N/mm},\\qquad k\\Delta L=50\\,000\\ \\text{N}',
    },
  ],
} satisfies SolutionData
