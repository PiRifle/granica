import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Pręt i układ współrzędnych',
    narration:
      'Pręt jest rozciągany siłą osiową P = 50 kN. Oś x przyjmujemy wzdłuż osi pręta, osie y i z — prostopadle do niej. Na ściankach elementu nie ma obciążeń poprzecznych ani stycznych.',
    formula: 'P=50\\ \\mathrm{kN}\\qquad A=100\\ \\mathrm{mm}^2\\\\x\\parallel P\\qquad \\sigma_y=\\sigma_z=0',
    caption: 'Pręt rozciągany z siłami P na końcach i układem osi x, y, z.',
    visual: 'axial',
    focus: { metric: 'model' },
    emphasis: 'Jednoosiowe rozciąganie: jedyny niezerowy składnik tensora to σ_x.',
  },
  {
    title: '2. Naprężenie normalne',
    narration:
      'Naprężenie normalne w przekroju prostopadłym do osi pręta wynosi σ_x = P/A. Zamieniamy 50 kN na 50 000 N, a pole 100 mm² pozostawiamy w mm². Otrzymujemy 500 MPa — naprężenie rozciągające.',
    formula: '\\sigma_x=\\frac{P}{A}=\\frac{50\\,000\\ \\mathrm{N}}{100\\ \\mathrm{mm}^2}=500\\ \\mathrm{MPa}',
    caption: 'Przekrój o polu 100 mm² i naprężenie rozciągające 500 MPa.',
    visual: 'axial',
    focus: { metric: 'sigma' },
    emphasis: 'Naprężenie jest dodatnie, bo siła rozciąga pręt.',
  },
  {
    title: '3. Tensor naprężeń',
    narration:
      'W przyjętym układzie tensor naprężeń jest diagonalny. Na przekątnej mamy σ_x = 500 MPa oraz σ_y = σ_z = 0. Wszystkie składniki styczne τ_xy, τ_yz i τ_zx są równe zero, więc macierz jest symetryczna i bez znaków mieszanych.',
    formula: '\\sigma=\\begin{bmatrix}500&0&0\\\\0&0&0\\\\0&0&0\\end{bmatrix}\\ \\mathrm{MPa}',
    caption: 'Tensor naprężeń w punkcie: tylko σ_x = 500 MPa, pozostałe składniki zerowe.',
    visual: 'cube',
    focus: { metric: 'tensor' },
    emphasis: 'Brak składników stycznych oznacza, że osie x, y, z są już kierunkami głównymi.',
  },
  {
    title: '4. Naprężenia główne',
    narration:
      'Wartościami własnymi tensora diagonalnego są liczby na przekątnej. Dlatego σ_1 = 500 MPa, a σ_2 = σ_3 = 0 MPa. Kierunek główny σ_1 pokrywa się z osią pręta.',
    formula: '\\sigma_1=500\\ \\mathrm{MPa}\\qquad \\sigma_2=\\sigma_3=0',
    caption: 'Naprężenia główne uporządkowane malejąco: 500, 0, 0 MPa.',
    visual: 'cube',
    focus: { metric: 'principal' },
    emphasis: 'Przy rozciąganiu jednoosiowym dwa naprężenia główne są zerowe.',
  },
  {
    title: '5. Koło Mohra',
    narration:
      'Dla stanu jednoosiowego koło Mohra ma środek w (σ_x + 0)/2 = 250 MPa i promień (500 − 0)/2 = 250 MPa. Średnica koła rozciąga się od σ = 0 do σ = 500 MPa. Każdy punkt koła odpowiada pewnej płaszczyźnie przechodzącej przez oś pręta.',
    formula: '\\sigma_{\\text{śr}}=\\frac{500+0}{2}=250\\ \\mathrm{MPa}\\qquad R=\\frac{500-0}{2}=250\\ \\mathrm{MPa}',
    caption: 'Koło Mohra dla rozciągania: środek 250 MPa, promień 250 MPa, zakres σ od 0 do 500 MPa.',
    visual: 'diagram',
    focus: { metric: 'mohr' },
    emphasis: 'Koło jest styczne do osi τ = 0 w punkcie σ = 0.',
  },
  {
    title: '6. Maksymalne ścinanie',
    narration:
      'Największa rzędna koła to promień, czyli τ_max = 250 MPa. Występuje w najwyższym punkcie koła, któremu odpowiada płaszczyzna nachylona pod 45° do osi pręta. Jest to najniebezpieczniejsze ścinanie w tym stanie naprężenia.',
    formula: '\\tau_{\\max}=R=\\frac{\\sigma_1-\\sigma_3}{2}=\\frac{500-0}{2}=250\\ \\mathrm{MPa}',
    caption: 'Najwyższy punkt koła: τ_max = 250 MPa przy kącie 45°.',
    visual: 'diagram',
    focus: { metric: 'tau-max' },
    emphasis: 'τ_max jest równe promieniowi koła, a nie średnicy.',
  },
  {
    title: '7. Płaszczyzna pod 45°',
    narration:
      'Na płaszczyźnie nachylonej pod 45° naprężenie normalne wynosi σ_x/2 = 250 MPa, a styczne τ = 250 MPa. Punkt na wykresie Mohra ma współrzędne (250; 250), czyli leży na szczycie koła. Kąt na kole wynosi 2·45° = 90°.',
    formula:
      '\\sigma_{45}=\\frac{\\sigma_x}{2}=250\\ \\mathrm{MPa}\\qquad \\tau_{45}=\\frac{\\sigma_x}{2}=250\\ \\mathrm{MPa}',
    caption: 'Płaszczyzna pod 45°: naprężenie normalne 250 MPa i styczne 250 MPa.',
    visual: 'cube',
    focus: { metric: 'inclined' },
    emphasis: 'Na płaszczyźnie maksymalnego ścinania naprężenie normalne nie jest zerowe.',
  },
  {
    title: '8. Znaki i interpretacja',
    narration:
      'Płaszczyzny +45° i −45° dają tę samą wartość bezwzględną τ, ale przeciwne znaki. Naprężenia główne pozostają 500, 0, 0 MPa, a suma σ_1 + σ_2 + σ_3 = 500 MPa jest równa σ_x + σ_y + σ_z. To potwierdza poprawność tensora i obliczeń.',
    formula: '\\tau_{+45}=-\\tau_{-45}\\qquad \\sigma_1+\\sigma_2+\\sigma_3=500\\ \\mathrm{MPa}=\\sigma_x',
    caption: 'Dwa przeciwne znaki ścinania na płaszczyznach ±45° i kontrola niezmiennika tensora.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Znak τ zależy od przyjętego zwrotu płaszczyzny; wartość bezwzględna pozostaje 250 MPa.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AxialStressStateAnimation }))),
} satisfies SolutionData
