import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Przęsło Golden Gate',
    narration:
      'Główne przęsło mostu ma długość 1280 m w temperaturze 0 °C. W ciągu dnia stalowa konstrukcja nagrzewa się, więc jej długość rośnie. Most jest tak zaprojektowany, aby to wydłużenie mogło się swobodnie ujawnić.',
    caption: 'Schemat mostu wiszącego: przęsło o długości 1280 m między wieżami.',
    visual: 'thermal',
    focus: { metric: 'model' },
    formula: 'L=1280\\ \\mathrm{m}\\qquad T_0=0\\,^{\\circ}\\mathrm{C}',
  },
  {
    title: '2. Dane i zamiana jednostek',
    narration:
      'Współczynnik rozszerzalności liniowej stali wynosi 1,17·10⁻⁵ 1/K. Przyrost temperatury 40 K odpowiada przyrostowi 40 °C, bo różnica temperatur w kelwinach i stopniach Celsjusza jest taka sama. Długość podstawiamy w metrach.',
    caption: 'Dane zadania w jednolitych jednostkach: metry i kelwiny.',
    visual: 'thermal',
    focus: { metric: 'data' },
    formula: '\\alpha=1{,}17\\cdot10^{-5}\\ \\mathrm{1/K}\\qquad \\Delta T=40\\ \\mathrm{K}',
  },
  {
    title: '3. Odkształcenie termiczne',
    narration:
      'Odkształcenie termiczne to iloczyn współczynnika rozszerzalności i przyrostu temperatury. Wynosi 4,68·10⁻⁴, czyli około 0,047%. Jest to odkształcenie dodatnie, więc materiał wydłuża się.',
    caption: 'Mikroskopijne wydłużenie każdego elementu przęsła sumuje się na całej długości.',
    visual: 'thermal',
    focus: { metric: 'strain' },
    formula: '\\varepsilon_T=\\alpha\\Delta T=1{,}17\\cdot10^{-5}\\cdot40=4{,}68\\cdot10^{-4}',
  },
  {
    title: '4. Wzór na wydłużenie',
    narration:
      'Dla swobodnego wydłużenia całkowite wydłużenie jest iloczynem odkształcenia termicznego i długości początkowej. Równoważnie można zapisać ΔL = αLΔT. Nie występuje tu żadna siła zewnętrzna, która ograniczałaby ten proces.',
    caption: 'Wydłużenie całkowite jako iloczyn odkształcenia i długości przęsła.',
    visual: 'thermal',
    focus: { metric: 'formula' },
    formula: '\\Delta L=\\varepsilon_T L=\\alpha L\\Delta T',
  },
  {
    title: '5. Obliczenie liczbowe',
    narration:
      'Podstawiamy 1280 m i 40 K. Iloczyn daje 0,59904 m, czyli 599,04 mm. W praktyce podajemy około 599 mm, ale do dalszych obliczeń warto zachować wartość 0,59904 m.',
    caption: 'Wydłużenie termiczne przęsła: 0,599 m, czyli niespełna 60 cm.',
    visual: 'thermal',
    focus: { metric: 'numeric' },
    formula:
      '\\Delta L=1{,}17\\cdot10^{-5}\\cdot1280\\cdot40=0{,}59904\\ \\mathrm{m}\\\\ =599{,}04\\ \\mathrm{mm}\\approx599\\ \\mathrm{mm}',
  },
  {
    title: '6. Dylatacja i szczelina',
    narration:
      'Gdyby końce przęsła były unieruchomione, wzrost temperatury wywołałby ogromne naprężenia. Dlatego mosty mają dylatacje i łożyska ślizgowe. Szczelina dylatacyjna musi pomieścić co najmniej 0,60 m wydłużenia, z zapasem na inne ruchy konstrukcji.',
    caption: 'Szczelina dylatacyjna o szerokości około 0,60 m pozwala przęsłu się wydłużyć.',
    visual: 'thermal',
    focus: { metric: 'joint' },
    formula: '\\text{dylatacja}\\ \\ge\\ \\alpha L\\Delta T\\approx0{,}60\\ \\mathrm{m}',
  },
  {
    title: '7. Kontrola: swobodne wydłużenie bez naprężeń',
    narration:
      'W swobodnym wydłużeniu odkształcenie całkowite jest równe odkształceniu termicznemu. Z prawa Hooke’a σ = E(ε − ε_T) otrzymujemy zero. Oznacza to, że temperatura zmienia długość, ale nie wywołuje naprężeń, dopóki końce są swobodne.',
    caption: 'Brak więzów: przęsło wydłuża się, a naprężenie normalne pozostaje zerowe.',
    visual: 'thermal',
    focus: { metric: 'check' },
    formula: '\\sigma=E(\\varepsilon-\\varepsilon_T)=E(\\varepsilon_T-\\varepsilon_T)=0',
    emphasis: 'Wydłużenie termiczne bez więzów nie daje naprężeń.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.GoldenGateThermalAnimation }))),
} satisfies SolutionData
