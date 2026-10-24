import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-hooke-stiffness-3',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 3',
  duration: 7,
  given: ['L = 3 m', 'N = 40 kN', 'ΔL_dop = 1,5 mm', 'E = 200 GPa'],
  result:
    'Minimalne pole przekroju wynosi 400 mm², co odpowiada średnicy około 22,6 mm. Naprężenie 100 MPa jest bezpieczne, więc o wymiarze decyduje sztywność, a nie wytrzymałość. Przy dopuszczalnym wydłużeniu 1 mm wymagane pole wzrosłoby do 600 mm².',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HookeStiffness3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy pręt o długości L = 3 m jest rozciągany siłą N = 40 kN. Moduł wynosi E = 200 GPa, a dopuszczalne wydłużenie ΔL_dop = 1,5 mm. Szukamy minimalnego pola przekroju, więc na rysunku pole jest jeszcze nieznane.',
      caption: 'Model: pręt o nieznanym polu; o wymiarze ma zdecydować warunek sztywności.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'L=3000\\ \\text{mm},\\quad N=40\\,000\\ \\text{N},\\quad E=200\\,000\\ \\text{MPa},\\quad \\Delta L_{\\mathrm{dop}}=1{,}5\\ \\text{mm}',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Z warunku ΔL = NL/(EA) ≤ ΔL_dop otrzymujemy A_min = NL/(EΔL_dop) = 40 000·3000/(200 000·1,5) = 400 mm². Na rysunku przekrój rośnie od zbyt małego, aż wydłużenie schodzi do dopuszczalnego limitu.',
      caption: 'Dobór pola to iteracja: mniejszy przekrój daje większe wydłużenie, większy — mniejsze.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A_{\\min}=\\frac{NL}{E\\Delta L_{\\mathrm{dop}}}=\\frac{40\\,000\\cdot3000}{200\\,000\\cdot1{,}5}=400\\ \\text{mm}^2',
    },
    {
      title: 'Średnica przekroju',
      narration:
        'Dla przekroju kołowego A = πd²/4, więc d = √(4A_min/π) = √(4·400/π) ≈ 22,6 mm. Przekrój 400 mm² odpowiada prętowi o średnicy około 22,6 mm.',
      caption: 'Pole i średnica opisują ten sam przekrój; średnica jest wygodniejsza przy doborze pręta.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: 'd=\\sqrt{\\frac{4A_{\\min}}{\\pi}}=\\sqrt{\\frac{4\\cdot400}{\\pi}}\\approx22{,}6\\ \\text{mm}',
    },
    {
      title: 'Kontrola naprężenia i odkształcenia',
      narration:
        'Naprężenie wynosi σ = N/A = 40 000/400 = 100 MPa, znacznie mniej niż typowa granica plastyczności stali 235 MPa. Odkształcenie ε = σ/E = 100/200 000 = 0,0005, a ΔL = εL = 1,5 mm — zgodnie z przyjętym limitem.',
      caption: 'O wymiarze decyduje sztywność, nie wytrzymałość: naprężenie jest bezpieczne z dużym zapasem.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma=\\frac{40\\,000}{400}=100\\ \\text{MPa}<235\\ \\text{MPa},\\qquad \\varepsilon=\\frac{100}{200\\,000}=0{,}0005',
    },
    {
      title: 'Wrażliwość na limit',
      narration:
        'Gdyby dopuszczalne wydłużenie zmniejszyć do 1 mm, wymagane pole wzrosłoby do A = 40 000·3000/(200 000·1) = 600 mm². Wydłużenie jest liniowe względem siły i długości, a odwrotnie proporcjonalne do pola, więc mała zmiana limitu istotnie zmienia wymiar.',
      caption: 'Mniejszy dopuszczalny ruch oznacza większy przekrój — sztywność ma swoją cenę.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula:
        '\\Delta L_{\\mathrm{dop}}=1\\ \\text{mm}\\Rightarrow A_{\\min}=\\frac{40\\,000\\cdot3000}{200\\,000\\cdot1}=600\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
