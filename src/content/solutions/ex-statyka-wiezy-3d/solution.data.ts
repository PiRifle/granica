import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wiezy-3d',
  title: 'Wspornik w podporze stałej — sześć reakcji',
  duration: 6,
  given: [
    'Wspornik zamocowany w O = (0, 0, 0): OA do A = (2, 0, 0) m, AB do B = (2, 3, 1) m',
    'Siła w B: F = (4, 0, −6) kN',
    'Podpora stała może przenieść trzy siły i trzy momenty',
  ],
  result: 'R = (−4, 0, 6) kN, M = (18, −16, 12) kN·m. Moduły: R = 7,21 kN, M ≈ 26,9 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Supports3DAnimation }))),
  scenes: [
    {
      title: 'Model wspornika',
      narration:
        'Wspornik składa się z dwóch odcinków: poziomego OA i ukośnego AB. Oba są sztywne, a obciążenie działa dopiero w końcu B.',
      caption: 'Zamocowanie w O, swobodny koniec w B.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'O=(0,0,0),\\quad A=(2,0,0),\\quad B=(2,3,1)\\ \\text{m},\\quad \\mathbf F=(4,0,-6)\\ \\text{kN}',
    },
    {
      title: 'Więzy podpory stałej',
      narration:
        'Zamocowanie blokuje wszystkie sześć stopni swobody. W schemacie ciała wolnego zastępujemy je trzema składowymi siły i trzema składowymi momentu.',
      caption: 'Sześć niewiadomych reakcji: R_x, R_y, R_z, M_x, M_y, M_z.',
      visual: 'diagram',
      focus: { metric: 'supports' },
      formula: 'n_u=3+3=6\\quad\\Rightarrow\\quad R_x,R_y,R_z,M_x,M_y,M_z',
    },
    {
      title: 'Równowaga sił',
      narration:
        'Suma sił musi być zerowa, więc reakcja siłowa jest dokładnie przeciwna do obciążenia. Składowa pionowa działa w górę, przeciwnie do składowej F_z.',
      caption: 'R = −F = (−4, 0, 6) kN.',
      visual: 'diagram',
      focus: { metric: 'force' },
      formula: '\\mathbf R=-\\mathbf F=(-4,0,6)\\ \\text{kN}',
    },
    {
      title: 'Moment obciążenia',
      narration:
        'Ramię siły prowadzi od O do B. Iloczyn wektorowy daje moment, który obciążenie wywiera na zamocowanie.',
      caption: 'r_B × F = (−18, 16, −12) kN·m.',
      visual: 'diagram',
      focus: { metric: 'loadMoment' },
      formula: '\\mathbf r_B\\times\\mathbf F=(2,3,1)\\times(4,0,-6)=(-18,16,-12)\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Moment reakcji',
      narration:
        'Reakcja momentowa musi znieść moment obciążenia. Zmieniamy więc znak każdej składowej. To właśnie ten moment utrzymuje wspornik w pozycji.',
      caption: 'M = −r_B × F = (18, −16, 12) kN·m.',
      visual: 'diagram',
      focus: { metric: 'reactionMoment' },
      formula: '\\mathbf M=-\\mathbf r_B\\times\\mathbf F=(18,-16,12)\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola modułów',
      narration:
        'Moduł reakcji siłowej liczymy z dwóch niezerowych składowych, a moduł momentu z trzech. Gdyby w O był przegub kulisty, momenty M_x, M_y, M_z nie mogłyby powstać i układ nie byłby w równowadze.',
      caption: 'R = 7,21 kN, M ≈ 26,9 kN·m — podpora przenosi siłę i moment.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        'R=\\sqrt{4^2+6^2}=7{,}21\\ \\text{kN},\\qquad M=\\sqrt{18^2+16^2+12^2}=26{,}9\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
