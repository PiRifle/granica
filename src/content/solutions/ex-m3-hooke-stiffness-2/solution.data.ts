import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-hooke-stiffness-2',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 2',
  duration: 7,
  given: ['L = 1,5 m', 'd = 16 mm', 'N = 12 kN', 'E = 70 GPa'],
  result:
    'Aluminiowy pręt ma pole 201,06 mm², naprężenie 59,68 MPa, odkształcenie 0,000853 i wydłużenie 1,28 mm. Gdyby średnicę zwiększyć dwukrotnie, pole i sztywność wzrosłyby czterokrotnie, a wydłużenie spadłoby do 0,32 mm — kosztem czterokrotnie większej masy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HookeStiffness2Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Aluminiowy pręt o długości L = 1,5 m i średnicy d = 16 mm jest rozciągany siłą N = 12 kN. Moduł aluminium wynosi E = 70 GPa. Przeliczamy dane: L = 1500 mm, N = 12 000 N, E = 70 000 MPa.',
      caption: 'Model: jednorodny pręt kołowy, obciążony osiowo na końcach.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'L=1500\\ \\text{mm},\\quad d=16\\ \\text{mm},\\quad N=12\\,000\\ \\text{N},\\quad E=70\\,000\\ \\text{MPa}',
    },
    {
      title: 'Pole przekroju',
      narration: 'Pole przekroju kołowego wynosi A = πd²/4 = π·16²/4 ≈ 201,06 mm².',
      caption: 'Pole zależy od średnicy; podwojenie średnicy zwiększy pole czterokrotnie.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot16^2}{4}\\approx201{,}06\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie',
      narration:
        'Naprężenie wynosi σ = N/A = 12 000/201,06 ≈ 59,68 MPa. Jest ono jednakowe na całym przekroju, bo siła rozkłada się równomiernie.',
      caption: 'Naprężenie zależy od siły i pola, a nie od modułu Younga.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{N}{A}=\\frac{12\\,000}{201{,}06}\\approx59{,}68\\ \\text{MPa}',
    },
    {
      title: 'Odkształcenie i wydłużenie',
      narration:
        'Odkształcenie wynosi ε = σ/E = 59,68/70 000 ≈ 0,000853, a wydłużenie ΔL = εL = 0,000853·1500 ≈ 1,28 mm. Pręt wydłuża się więc o niecałe 0,09% długości.',
      caption: 'Odkształcenie jest proporcjonalne do naprężenia i odwrotnie proporcjonalne do modułu E.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula:
        '\\varepsilon=\\frac{\\sigma}{E}=\\frac{59{,}68}{70\\,000}\\approx0{,}000853,\\qquad \\Delta L=\\varepsilon L\\approx1{,}28\\ \\text{mm}',
    },
    {
      title: 'Porównanie ze stalą',
      narration:
        'Przy tym samym obciążeniu i tej samej geometrii stal o E = 200 GPa wydłużyłaby się tylko o około 0,45 mm. Aluminium odkształca się około 2,86 razy bardziej, bo ma tyle razy mniejszy moduł Younga.',
      caption: 'Ten sam stan naprężenia, inna odpowiedź odkształceniowa — o różnicy decyduje E.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L_s=\\frac{12\\,000\\cdot1500}{200\\,000\\cdot201{,}06}\\approx0{,}45\\ \\text{mm},\\qquad \\frac{\\Delta L_a}{\\Delta L_s}=\\frac{200}{70}\\approx2{,}86',
    },
    {
      title: 'Podwojona średnica',
      narration:
        'Gdyby średnicę zwiększyć dwukrotnie, pole wzrosłoby czterokrotnie, a sztywność k = EA/L również czterokrotnie. Wydłużenie spadłoby do 0,32 mm, czyli jednej czwartej, ale masa pręta wzrosłaby czterokrotnie.',
      caption: 'Sztywność można kupić większym przekrojem, ale wiąże się to z większą masą.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        "d'=32\\ \\text{mm}\\Rightarrow A'=4A,\\quad k'=4k,\\quad \\Delta L'=\\frac{\\Delta L}{4}\\approx0{,}32\\ \\text{mm}",
    },
  ],
} satisfies SolutionData
