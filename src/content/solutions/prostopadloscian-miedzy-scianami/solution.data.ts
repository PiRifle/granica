import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { createConfinedCompressionSolution } from '../../solution-factories/factory-confined-compression/factory'
import { meta } from './task'
import type { SolutionScene } from '../../../types'

const scenes: SolutionScene[] = [
  {
    title: '1. Model: prostopadłościan między ścianami',
    narration:
      'Stalowy prostopadłościan ma długość a = 200 mm w osi x, wymiar b = 150 mm w osi y i grubość g = 25 mm w osi z. Dwie siły P = 200 kN ściskają go wzdłuż x i wzdłuż y. Dwie sztywne ściany stykają się z powierzchniami prostopadłymi do osi z, czyli z grubością g.',
    formula: 'P=200\\ \\mathrm{kN}\\qquad a=200\\ \\mathrm{mm}\\qquad b=150\\ \\mathrm{mm}\\qquad g=25\\ \\mathrm{mm}',
    caption: 'Model 3D: prostopadłościan, dwie sztywne ściany i dwie siły ściskające P.',
    visual: 'cube',
    focus: { metric: 'model' },
    emphasis: 'Osie: x — długość a, y — wymiar b, z — grubość g; ściany są prostopadłe do z.',
  },
  {
    title: '2. Dane, układ osi i umowa znaków',
    narration:
      'Przyjmujemy jedną umowę przez całe zadanie: naprężenia rozciągające są dodatnie, a ściskające ujemne. Osie prowadzimy tak, że x jest długością a, y wymiarem b, a z grubością g. Pole powierzchni prostopadłej do x wynosi b·g, a do y — a·g.',
    formula:
      'A_x=bg\\qquad A_y=ag\\qquad \\varepsilon_z=0\\\\ \\sigma>0\\ \\text{— rozciąganie},\\qquad \\sigma<0\\ \\text{— ściskanie}',
    caption: 'Układ osi, wymiary i konsekwentna umowa znaków naprężeń.',
    visual: 'cube',
    focus: { metric: 'data' },
  },
  {
    title: '3. Pole obciążenia i naprężenie σ_x',
    narration:
      'Siła wzdłuż osi x działa na powierzchnię b·g = 150·25 = 3750 mm². Dzieląc 200 kN = 200 000 N przez to pole otrzymujemy 53,33 MPa. Ponieważ siła ściska element, zapisujemy σ_x = −53,33 MPa.',
    formula: '\\sigma_x=-\\frac{P}{bg}=-\\frac{200\\,000}{150\\cdot25}=-53{,}33\\ \\mathrm{MPa}',
    caption: 'Pole b·g wyróżnione na ścianie prostopadłej do osi x oraz naprężenie σ_x.',
    visual: 'cube',
    focus: { metric: 'sx' },
  },
  {
    title: '4. Pole obciążenia i naprężenie σ_y',
    narration:
      'Druga siła działa wzdłuż osi y na powierzchnię a·g = 200·25 = 5000 mm². Otrzymujemy 40,00 MPa, a ze względu na ściskanie σ_y = −40,00 MPa.',
    formula: '\\sigma_y=-\\frac{P}{ag}=-\\frac{200\\,000}{200\\cdot25}=-40{,}00\\ \\mathrm{MPa}',
    caption: 'Pole a·g na ścianie prostopadłej do osi y oraz naprężenie σ_y.',
    visual: 'cube',
    focus: { metric: 'sy' },
  },
  {
    title: '5. Ograniczenie kinematyczne ε_z = 0',
    narration:
      'Ściany są sztywne, więc odległość między nimi — grubość g w osi z — się nie zmienia. Oznacza to warunek ε_z = 0, a nie σ_z = 0. Naprężenie σ_z nie jest znane z obciążenia zewnętrznego — wyznaczymy je z warunku braku odkształcenia w osi z.',
    formula: '\\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E}=0',
    caption: 'Sztywne ściany wymuszają ε_z = 0; σ_z pozostaje niewiadomą.',
    visual: 'cube',
    focus: { metric: 'constraint' },
    emphasis: 'Brak odkształcenia nie oznacza braku naprężenia.',
  },
  {
    title: '6. Rozwiązanie warunku i naprężenie σ_z',
    narration:
      'Przekształcamy wzór Hooke’a: σ_z = ν(σ_x + σ_y). Suma naprężeń wynosi −53,33 − 40,00 = −93,33 MPa, więc σ_z = 0,25·(−93,33) = −23,33 MPa. Znak minus oznacza ściskanie wywołane reakcją ścian.',
    formula: '\\sigma_z=\\nu(\\sigma_x+\\sigma_y)=0{,}25\\,(-53{,}33-40{,}00)=-23{,}33\\ \\mathrm{MPa}',
    caption: 'Wyznaczenie σ_z z warunku ε_z = 0; ściany ściskają element w osi z.',
    visual: 'cube',
    focus: { metric: 'sz' },
    emphasis: 'σ_z jest ujemne, bo ściany przeciwstawiają się rozszerzeniu w osi z.',
  },
  {
    title: '7. Pełny tensor naprężenia',
    narration:
      'Poza przekątną nie działają żadne naprężenia styczne, więc tensor jest diagonalny. Na przekątnej mamy −53,33 MPa, −40,00 MPa i −23,33 MPa. Wszystkie trzy składowe są ściskające, co odpowiada jednoznacznie przyjętej umowie znaków.',
    formula:
      '\\boldsymbol{\\sigma}=\\begin{bmatrix}-53{,}33&0&0\\\\0&-40{,}00&0\\\\0&0&-23{,}33\\end{bmatrix}\\ \\mathrm{MPa}',
    caption: 'Końcowy tensor naprężenia w MPa z ujemnymi składowymi normalnymi.',
    visual: 'cube',
    focus: { metric: 'tensor' },
  },
  {
    title: '8. Kontrola ε_z i interpretacja znaków',
    narration:
      'Podstawiamy σ_z = −23,33 MPa do wzoru na ε_z. Licznik wynosi −23,33 + 23,33 = 0, więc warunek jest spełniony. Naprężenie σ_z jest reakcją ścian, a nie skutkiem siły P; dlatego nie liczymy go z ilorazu P przez pole.',
    formula: '\\varepsilon_z=\\frac{-23{,}33-0{,}25\\,(-53{,}33-40{,}00)}{E}=\\frac{0}{E}=0',
    caption: 'Kontrola: ε_z = 0, a wszystkie naprężenia są ujemne — element jest ściskany.',
    visual: 'cube',
    focus: { metric: 'check' },
    emphasis: 'Utrzymujemy jeden zapis: ściskanie jest ujemne.',
  },
  {
    title: '9. Odkształcenia przy E = 200 GPa',
    narration:
      'Przyjmując typowy dla stali moduł E = 200 GPa, otrzymujemy ε_x = −37,5/E = −1,875·10⁻⁴ oraz ε_y = −20,833/E = −1,0417·10⁻⁴. Oba odkształcenia są ściskające. Odkształcenie ε_z pozostaje równe zeru, bo tak narzuca ograniczenie ścian.',
    formula:
      '\\varepsilon_x=\\frac{-53{,}33-0{,}25\\,(-40{,}00-23{,}33)}{200\\,000}=-1{,}875\\cdot10^{-4}\\\\ \\varepsilon_y=\\frac{-40{,}00-0{,}25\\,(-53{,}33-23{,}33)}{200\\,000}=-1{,}0417\\cdot10^{-4}',
    caption: 'Odkształcenia normalne przy założonym E = 200 GPa; ε_z = 0.',
    visual: 'cube',
    focus: { metric: 'strain' },
  },
]

export default {
  ...createConfinedCompressionSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
