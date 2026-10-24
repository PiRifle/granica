import type { SolutionData } from '../../model'
import { NormalStressExample3Animation } from './animation'

export default {
  id: 'ex-axial-normal-stress-3',
  title: 'Naprężenie normalne: siła na przekroju — przykład 3',
  duration: 7,
  given: ['N=72 kN', 'sigma_{dop}=120 MPa'],
  result:
    'Przyjęto d = 28 mm, czyli A ≈ 615,8 mm². Naprężenie wynosi wtedy 116,9 MPa i spełnia warunek σ ≤ 120 MPa. Gdyby ten sam pręt miał przenosić siłę ściskającą, trzeba by jeszcze sprawdzić smukłość i wyboczenie.',
  animation: NormalStressExample3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt rozciągany przenosi N = 72 kN, a materiał ma naprężenie dopuszczalne σdop = 120 MPa. Przekrój ma być kołowy, a średnica d jest niewiadoma.',
      caption: 'Pręt kołowy o nieznanej średnicy d, obciążony siłą N = 72 kN.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'N=72\\ \\text{kN},\\qquad \\sigma_{\\mathrm{dop}}=120\\ \\text{MPa}',
    },
    {
      title: 'Pole minimalne',
      narration:
        'Warunek wytrzymałości σ ≤ σdop przekształcamy do postaci A_min = |N|/σdop. Po zamianie siły na niutony: A_min = 72 000/120 = 600 mm². Takie pole musi mieć przekrój, niezależnie od kształtu.',
      caption: 'A_min = 600 mm² — najmniejsze dopuszczalne pole przekroju.',
      visual: 'axial',
      focus: { metric: 'area' },
      formula: 'A_{\\min}=\\frac{|N|}{\\sigma_{\\mathrm{dop}}}=\\frac{72\\,000}{120}=600\\ \\text{mm}^2',
    },
    {
      title: 'Średnica teoretyczna',
      narration:
        'Dla koła A = πd²/4, więc d = √(4A/π). Po podstawieniu A_min = 600 mm² otrzymujemy d ≈ 27,6 mm. To średnica teoretyczna, jeszcze nie wymiar handlowy.',
      caption: 'd = √(4·600/π) ≈ 27,6 mm.',
      visual: 'axial',
      focus: { metric: 'diameter' },
      formula: 'd=\\sqrt{\\frac{4A_{\\min}}{\\pi}}=\\sqrt{\\frac{4\\cdot600}{\\pi}}\\approx27{,}6\\ \\text{mm}',
    },
    {
      title: 'Dobór średnicy',
      narration:
        'Przyjmujemy średnicę znormalizowaną d = 28 mm. Pole wynosi wtedy A = π·28²/4 ≈ 615,8 mm², czyli jest większe od minimalnego. Zaokrąglenie w górę jest bezpieczne.',
      caption: 'Przyjęto d = 28 mm, A ≈ 615,8 mm².',
      visual: 'axial',
      focus: { metric: 'chosen' },
      formula: 'd=28\\ \\text{mm},\\qquad A=\\frac{\\pi\\cdot28^2}{4}\\approx615{,}8\\ \\text{mm}^2',
    },
    {
      title: 'Kontrola naprężenia',
      narration:
        'Dla przyjętego przekroju σ = 72 000/615,8 ≈ 116,9 MPa, czyli mniej niż 120 MPa. Zaokrąglenie w dół do 27 mm dałoby 125,7 MPa i przekroczenie warunku, dlatego kontrola przyjętego wymiaru jest obowiązkowa.',
      caption: 'σ ≈ 116,9 MPa ≤ 120 MPa; d = 27 mm dałoby 125,7 MPa.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: '\\sigma=\\frac{72\\,000}{615{,}8}\\approx116{,}9\\ \\text{MPa}\\le120\\ \\text{MPa}',
    },
    {
      title: 'Uwaga przy ściskaniu',
      narration:
        'Gdyby ten sam pręt był ściskany, dobór średnicy z warunku naprężenia byłby tylko pierwszym krokiem. Trzeba by jeszcze sprawdzić smukłość i wyboczenie, bo długi i cienki pręt może utracić stateczność przy mniejszym obciążeniu.',
      caption: 'Ściskanie wymaga dodatkowego sprawdzenia wyboczenia.',
      visual: 'axial',
      focus: { metric: 'compression' },
      formula: 'N<0:\\quad \\text{sprawdź wyboczenie}',
    },
  ],
} satisfies SolutionData
