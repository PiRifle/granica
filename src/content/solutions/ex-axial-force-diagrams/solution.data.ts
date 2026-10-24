import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-force-diagrams',
  title: 'Wykres siły osiowej N — przykład 1',
  duration: 7,
  given: ['x = 0'],
  result:
    'Od utwierdzenia do wolnego końca: N = +15 kN, −5 kN, +5 kN; środkowy odcinek jest ściskany, a pozostałe rozciągane.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '',
        length: 1000,
        n: 15,
      },
      {
        id: '2',
        label: '',
        length: 1000,
        n: -5,
      },
      {
        id: '3',
        label: '',
        length: 1000,
        n: 5,
      },
    ],
    loads: [
      {
        node: 1,
        value: 20,
        label: '20 kN',
      },
      {
        node: 2,
        value: 10,
        label: '10 kN',
      },
      {
        node: 3,
        value: 5,
        label: '5 kN',
      },
    ],
    note: 'Długości i pola nie są podane — odcinki są schematyczne.',
  },
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialForceDiagramAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt jest utwierdzony w A (x = 0). W kolejnych przekrojach działają: 20 kN w prawo, potem 10 kN w lewo, a na wolnym końcu 5 kN w prawo. Między siłami nie ma obciążenia rozłożonego, więc na każdym z trzech odcinków N będzie stałe.',
      caption: 'Jeden pręt, trzy przedziały między siłami skupionymi. Wykres N zaczniemy od wolnego końca.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'x = 0',
    },
    {
      title: 'Odcinek 3 — wolny koniec',
      narration:
        'Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN w prawo, więc N₃ = +5 kN. Na wykresie odkładamy dodatnią wartość i wracamy do zera przy swobodnym końcu.',
      caption:
        'Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN, więc N₃ = +5 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '3' },
      formula: 'N_{3} = +5\\ \\text{kN}',
    },
    {
      title: 'Odcinek 2 — skok o 10 kN',
      narration:
        'Na środkowym odcinku po prawej stronie działają 10 kN w lewo i 5 kN w prawo, więc N₂ = −10 + 5 = −5 kN. Przechodząc przez siłę 10 kN, wykres zmienia wartość skokowo; ten odcinek jest ściskany.',
      caption:
        'Na środkowym odcinku po prawej stronie działają 10 kN w lewo i 5 kN w prawo, więc N₂ = −10 + 5 = −5 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'N_{2} = -10 + 5 = -5\\ \\text{kN}',
    },
    {
      title: 'Odcinek 1 — skok o 20 kN',
      narration:
        'Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = 20 − 10 + 5 = +15 kN. Skok przy utwierdzeniu jest największy, bo zmienia znak wykresu.',
      caption:
        'Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = 20 − 10 + 5 = +15 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_{1} = 20 - 10 + 5 = +15\\ \\text{kN}',
    },
    {
      title: 'Kontrola i gotowy wykres',
      narration:
        'Z równowagi całego pręta reakcja w A wynosi 15 kN w lewo, co potwierdza N₁ = +15 kN. Na wykresie widać trzy poziome stopnie: +15, −5 i +5 kN, ze skokami w przekrojach przyłożenia sił.',
      caption: 'Reakcja potwierdza wartość przy utwierdzeniu; środkowy odcinek jest ściskany, a skrajne rozciągane.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'R_{A} = 15\\ \\text{kN}\\ (\\leftarrow)',
    },
  ],
} satisfies SolutionData
