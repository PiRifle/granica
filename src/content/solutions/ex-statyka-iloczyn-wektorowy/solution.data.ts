import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-iloczyn-wektorowy',
  title: 'Iloczyn wektorowy dwóch sił na płycie',
  duration: 6,
  given: ['F₁ = (3, 4, 0) kN', 'F₂ = (4, 3, 0) kN', 'Obie siły leżą w płaszczyźnie xy płyty'],
  result: 'F₁×F₂ = −7k kN², moduł 7 kN² (pole równoległoboku), zwrot pod płytę. Kąt między siłami wynosi około 16,26°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CrossProductAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Obie siły zaczepiamy w początku układu. Pierwsza ma składowe 3 i 4, druga 4 i 3. Leżą w płaszczyźnie płyty, więc ich iloczyn wektorowy będzie prostopadły do tej płaszczyzny.',
      caption: 'Dwie siły w płaszczyźnie xy, zaczepione w jednym punkcie.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: '\\mathbf F_1=(3,4,0)\\ \\text{kN},\\qquad \\mathbf F_2=(4,3,0)\\ \\text{kN}',
    },
    {
      title: 'Wyznacznik i składowe',
      narration:
        'Rozwijamy wyznacznik. Składowe x i y zwierają się do zera, bo oba wektory mają trzecią składową równą zero. Zostaje tylko składowa z: 3 razy 3 minus 4 razy 4.',
      caption: 'Niezerowa jest tylko składowa k.',
      visual: 'diagram',
      focus: { metric: 'determinant' },
      formula:
        '\\mathbf F_1\\times\\mathbf F_2=(4\\cdot0-0\\cdot3)\\mathbf i-(3\\cdot0-0\\cdot4)\\mathbf j+(3\\cdot3-4\\cdot4)\\mathbf k',
    },
    {
      title: 'Wynik i zwrot',
      narration:
        'Składowa z wynosi −7, więc iloczyn to −7k kN². Wektor jest prostopadły do płyty i skierowany pod nią. Reguła śruby: obrót od F₁ do F₂ przez mniejszy kąt wkręca śrubę w dół.',
      caption: 'F₁×F₂ = −7k kN² — zwrot pod płytę.',
      visual: 'diagram',
      focus: { metric: 'result' },
      formula: '\\mathbf F_1\\times\\mathbf F_2=-7\\mathbf k\\ \\text{kN}^2',
    },
    {
      title: 'Moduł jako pole',
      narration:
        'Moduł iloczynu to pole równoległoboku zbudowanego na obu siłach. Wartość bezwzględna składowej z wynosi 7, więc pole ma 7 kN². Znak informuje o zwrocie, a nie o wielkości pola.',
      caption: '|F₁×F₂| = 7 kN².',
      visual: 'diagram',
      focus: { metric: 'area' },
      formula: '|\\mathbf F_1\\times\\mathbf F_2|=|3\\cdot3-4\\cdot4|=7\\ \\text{kN}^2',
    },
    {
      title: 'Kąt z sinusa',
      narration:
        'Moduły sił wynoszą po 5 kN. Z definicji modułu iloczynu: 5 razy 5 razy sinus kąta równa się 7. Stąd sinus 0,28 i kąt około 16,26°. Sinus opisuje składową prostopadłą, dlatego jest tu właściwą funkcją.',
      caption: 'sin φ = 0,28, φ ≈ 16,26°.',
      visual: 'diagram',
      focus: { metric: 'angle' },
      formula:
        '5\\cdot5\\cdot\\sin\\varphi=7\\ \\Rightarrow\\ \\sin\\varphi=0{,}28,\\qquad \\varphi\\approx16{,}26^\\circ',
    },
    {
      title: 'Kontrola i kolejność czynników',
      narration:
        'Iloczyn skalarny daje 24, więc cosinus to 24/25 = 0,96 i ten sam kąt 16,26°. Zamiana kolejności czynników zmienia znak: F₂×F₁ = +7k, czyli wektor wychodzi z płyty. Kolejność jest częścią definicji.',
      caption: 'Cosinus potwierdza kąt, a F₂×F₁ = +7k pokazuje antyprzemienność.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        '\\mathbf F_1\\cdot\\mathbf F_2=24,\\quad \\cos\\varphi=\\frac{24}{25}=0{,}96,\\qquad \\mathbf F_2\\times\\mathbf F_1=+7\\mathbf k',
    },
  ],
} satisfies SolutionData
