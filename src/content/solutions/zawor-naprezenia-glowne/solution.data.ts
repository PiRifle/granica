import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { createPrincipalStressSolution } from '../../solution-factories/factory-principal-stress/factory'
import { meta } from './task'
import type { SolutionScene } from '../../../types'

const scenes: SolutionScene[] = [
  {
    title: '1. Model korpusu zaworu',
    narration:
      'Analizujemy korpus zaworu DN50. Najbardziej wytężony punkt leży na ściance korpusu, w obszarze połączenia z króćcem. W tym punkcie odczytujemy stan naprężenia w układzie x-y-z i porównujemy go z naprężeniem dopuszczalnym 200 MPa.',
    formula: 'k_g=200\\ \\mathrm{MPa}\\\\P\\ \\text{— punkt najbardziej wytężony}',
    caption: 'Uproszczony model 3D korpusu zaworu z zaznaczonym punktem krytycznym.',
    visual: 'cube',
    focus: { metric: 'model' },
    emphasis: 'Punkt krytyczny wybieramy na podstawie analizy numerycznej lub doświadczenia.',
  },
  {
    title: '2. Tensor naprężeń w punkcie',
    narration:
      'W punkcie krytycznym występuje płaski stan naprężenia w płaszczyźnie x-y. Na przekątnej mamy σx = 130 MPa i σy = 150 MPa, a poza przekątną τxy = 70 MPa. Składniki związane z osią z są zerowe.',
    formula: '\\sigma=\\begin{bmatrix}130&70&0\\\\70&150&0\\\\0&0&0\\end{bmatrix}\\ \\mathrm{MPa}',
    caption: 'Tensor naprężeń w punkcie krytycznym: σx = 130, σy = 150, τxy = 70 MPa.',
    visual: 'cube',
    focus: { metric: 'tensor' },
    emphasis: 'Tensor jest symetryczny, a stan jest płaski — σz = τyz = τzx = 0.',
  },
  {
    title: '3. Wzory transformacji',
    narration:
      'Dla płaskiego stanu naprężenia naprężenia główne wyznaczamy ze środka i promienia koła Mohra. Środek to średnia naprężeń normalnych, a promień zależy od różnicy naprężeń normalnych oraz od τxy. Ten sam wynik dają wartości własne tensora.',
    formula:
      '\\sigma_{\\text{śr}}=\\frac{\\sigma_x+\\sigma_y}{2}\\qquad R=\\sqrt{\\left(\\frac{\\sigma_x-\\sigma_y}{2}\\right)^2+\\tau_{xy}^2}\\\\\\sigma_{1,2}=\\sigma_{\\text{śr}}\\pm R',
    caption: 'Środek i promień koła Mohra dla płaskiego stanu naprężenia.',
    visual: 'diagram',
    focus: { metric: 'formulas' },
    emphasis: 'Promień jest pierwiastkiem z sumy kwadratów, więc zawsze jest nieujemny.',
  },
  {
    title: '4. Środek i promień koła',
    narration:
      'Podstawiamy σx = 130 MPa i σy = 150 MPa: środek wynosi 140 MPa. Różnica (130 − 150)/2 = −10 MPa, a τxy = 70 MPa. Promień R = √(10² + 70²) = 70,71 MPa.',
    formula:
      '\\sigma_{\\text{śr}}=\\frac{130+150}{2}=140\\ \\mathrm{MPa}\\\\R=\\sqrt{(-10)^2+70^2}=\\sqrt{5000}=70{,}71\\ \\mathrm{MPa}',
    caption: 'Koło Mohra o środku 140 MPa i promieniu 70,71 MPa.',
    visual: 'diagram',
    focus: { metric: 'circle' },
    emphasis: 'Znak różnicy nie wpływa na promień, bo jest podnoszony do kwadratu.',
  },
  {
    title: '5. Naprężenia główne',
    narration:
      'Dodając i odejmując promień od środka, otrzymujemy σ1 = 140 + 70,71 = 210,71 MPa oraz σ2 = 140 − 70,71 = 69,29 MPa. Trzecie naprężenie główne jest zerowe, bo stan jest płaski: σ3 = 0.',
    formula:
      '\\sigma_1=140+70{,}71=210{,}71\\ \\mathrm{MPa}\\\\\\sigma_2=140-70{,}71=69{,}29\\ \\mathrm{MPa}\\qquad \\sigma_3=0',
    caption: 'Naprężenia główne: 210,71 MPa, 69,29 MPa i 0 MPa.',
    visual: 'diagram',
    focus: { metric: 'principal' },
    emphasis: 'Uporządkowanie: σ1 ≥ σ2 ≥ σ3, więc σ1 = 210,71 MPa.',
  },
  {
    title: '6. Koło Mohra i σ3 = 0',
    narration:
      'Na wykresie Mohra koło płaskiego stanu ma średnicę od 69,29 do 210,71 MPa. Ponieważ σ3 = 0, stan przestrzenny opisują jeszcze dwa mniejsze koła. Największe z nich — między σ3 a σ1 — ma promień 105,36 MPa, który jest maksymalnym ścinaniem.',
    formula: '\\tau_{\\max}=\\frac{\\sigma_1-\\sigma_3}{2}=\\frac{210{,}71-0}{2}=105{,}36\\ \\mathrm{MPa}',
    caption: 'Trzy koła Mohra; największe koło σ1–σ3 wyznacza τmax = 105,36 MPa.',
    visual: 'diagram',
    focus: { metric: 'mohr' },
    emphasis: 'Maksymalne ścinanie zależy od σ1 i σ3, a nie tylko od koła płaskiego stanu.',
  },
  {
    title: '7. Porównanie z naprężeniem dopuszczalnym',
    narration:
      'Naprężenie dopuszczalne wynosi 200 MPa. Obliczone σ1 = 210,71 MPa jest większe, więc warunek wytrzymałości nie jest spełniony. Przekroczenie wynosi 10,71 MPa, czyli 5,36%; stosunek σ1/k_g = 1,0536.',
    formula:
      '\\sigma_1=210{,}71\\ \\mathrm{MPa}>k_g=200\\ \\mathrm{MPa}\\\\\\frac{\\sigma_1}{k_g}=1{,}0536\\quad\\Rightarrow\\quad +5{,}36\\%',
    caption: 'Porównanie σ1 = 210,71 MPa z granicą 200 MPa — warunek nie jest spełniony.',
    visual: 'diagram',
    focus: { metric: 'compare' },
    emphasis: 'Przekroczenie jest niewielkie, ale dodatnie — konstrukcja wymaga korekty.',
  },
  {
    title: '8. Kontrola i interpretacja',
    narration:
      'Suma naprężeń głównych 210,71 + 69,29 + 0 = 280 MPa jest równa σx + σy + σz = 130 + 150 + 0. To niezależna kontrola tensora. Aby spełnić warunek, trzeba zmniejszyć obciążenie, zwiększyć grubość ścianki lub zmienić geometrię strefy krytycznej.',
    formula: '\\sigma_1+\\sigma_2+\\sigma_3=280\\ \\mathrm{MPa}=\\sigma_x+\\sigma_y+\\sigma_z',
    caption: 'Kontrola niezmiennika tensora i wniosek: potrzebna jest zmiana geometrii lub obciążenia.',
    visual: 'diagram',
    focus: { metric: 'check' },
    emphasis: 'Suma naprężeń głównych jest niezmiennikiem tensora — nie zależy od obrotu układu.',
  },
]

export default {
  ...createPrincipalStressSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
