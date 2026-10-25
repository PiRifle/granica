import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wektory-3d-2',
  title: 'Siła zadana kątami kierunkowymi — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Q = 10 kN',
    'θx = 60°, θy = 120°',
    'Składowa Qz > 0, czyli ma zwrot zgodny z osią z',
    'Szukamy Qx, Qy, Qz oraz brakującego kąta θz',
  ],
  result:
    'Qx = 5 kN, Qy = −5 kN, Qz = 7,07 kN, θz = 45°. Kontrola modułu: √(25 + 25 + 50) = 10 kN. Suma kwadratów cosinusów: 0,25 + 0,25 + 0,5 = 1.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DirectionCosinesAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Siła jest zadana przez wartość i dwa kąty kierunkowe. Trzeci kąt wynika z warunku unormowania wersora. Kąty mierzymy od dodatnich półosi, więc kąt rozwarty od razu oznacza składową przeciwną do osi.',
      caption: 'Siła Q = 10 kN o kątach θx = 60° i θy = 120°; Qz jest dodatnia.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'Q=10\\ \\text{kN},\\qquad \\theta_x=60^\\circ,\\qquad \\theta_y=120^\\circ,\\qquad Q_z>0',
    },
    {
      title: 'Składowe Qx i Qy',
      narration:
        'Każdą składową liczymy jako moduł razy cosinus kąta kierunkowego. Cosinus 60° jest dodatni, więc Qx ma zwrot zgodny z osią x. Cosinus 120° jest ujemny, więc Qy działa przeciwnie do osi y.',
      caption: 'Qx = 5 kN, Qy = −5 kN.',
      visual: 'diagram',
      focus: { metric: 'components-xy' },
      formula: 'Q_x=10\\cos60^\\circ=5\\ \\text{kN},\\qquad Q_y=10\\cos120^\\circ=-5\\ \\text{kN}',
    },
    {
      title: 'Brakujący cosinus kierunkowy',
      narration:
        'Cosinusy kierunkowe są składowymi wersora, więc suma ich kwadratów wynosi jeden. Po odjęciu znanych udziałów zostaje cos²θz = 0,5. To jeszcze nie rozstrzyga znaku — pierwiastek daje dwie możliwości.',
      caption: 'cos²θz = 1 − 0,25 − 0,25 = 0,5.',
      visual: 'diagram',
      focus: { metric: 'cosine' },
      formula: '\\cos^2\\theta_z=1-\\cos^2 60^\\circ-\\cos^2 120^\\circ=1-0{,}25-0{,}25=0{,}5',
    },
    {
      title: 'Znak i składowa Qz',
      narration:
        'Warunek Qz > 0 wybiera dodatni pierwiastek. Składowa pionowa wynosi więc 10√0,5 ≈ 7,07 kN, a kąt θz = arccos√0,5 = 45°. Znak bierzemy ze zwrotu siły, nie z wartości kąta.',
      caption: 'Qz ≈ 7,07 kN, θz = 45°.',
      visual: 'diagram',
      focus: { metric: 'component-z' },
      formula:
        '\\cos\\theta_z=+\\sqrt{0{,}5},\\qquad Q_z=10\\sqrt{0{,}5}\\approx7{,}07\\ \\text{kN},\\qquad \\theta_z=45^\\circ',
    },
    {
      title: 'Kontrola modułu',
      narration:
        'Składamy składowe z powrotem. Kwadraty 5, −5 i 7,07 sumują się do 100, więc moduł odtworzony z cosinusów jest równy danym 10 kN. To niezależna kontrola całego zapisu.',
      caption: '|Q| = √(5² + (−5)² + 7,07²) = 10 kN.',
      visual: 'diagram',
      focus: { metric: 'module-check' },
      formula: '\\sqrt{5^2+(-5)^2+7{,}07^2}=\\sqrt{25+25+50}=10\\ \\text{kN}',
    },
    {
      title: 'Kontrola cosinusów',
      narration:
        'Ostatnia kontrola dotyczy samego kierunku: cosinusy wynoszą 0,5; −0,5 i √0,5. Ich kwadraty dają dokładnie jeden, co potwierdza, że wektor kierunku jest jednostkowy. Zapis siły jest spójny.',
      caption: 'Σcos²θ = 0,25 + 0,25 + 0,5 = 1.',
      visual: 'diagram',
      focus: { metric: 'cosines-check' },
      formula:
        '\\cos\\theta_x=0{,}5,\\quad \\cos\\theta_y=-0{,}5,\\quad \\cos\\theta_z=\\sqrt{0{,}5},\\qquad \\sum\\cos^2\\theta=1',
    },
  ],
} satisfies SolutionData
