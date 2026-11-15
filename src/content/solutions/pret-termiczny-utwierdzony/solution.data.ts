import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Pręt między sztywnymi ścianami',
    narration:
      'Stalowy pręt o długości 600 mm jest wsunięty między dwie idealnie sztywne przegrody. W temperaturze początkowej pręt nie jest obciążony. Ściany nie pozwalają końcom pręta na żadne przemieszczenie.',
    caption: 'Pręt zamknięty między dwiema sztywnymi ścianami; długość początkowa L₀ = 600 mm.',
    visual: 'thermal',
    focus: { metric: 'model' },
    formula: 'L_0=600\\ \\mathrm{mm}\\qquad \\Delta T=100\\ \\mathrm{K}',
  },
  {
    title: '2. Swobodne wydłużenie termiczne',
    narration:
      'Gdyby ściany nie istniały, pręt wydłużyłby się o αL₀ΔT. Otrzymujemy 0,702 mm. Na rysunku to wydłużenie jest celowo powiększone, bo w rzeczywistości jest mniejsze od milimetra.',
    caption: 'Przerywany obrys pokazuje, o ile pręt wydłużyłby się bez przeszkód.',
    visual: 'thermal',
    focus: { metric: 'free' },
    formula: '\\Delta L_T=\\alpha L_0\\Delta T=1{,}17\\cdot10^{-5}\\cdot600\\cdot100=0{,}702\\ \\mathrm{mm}',
  },
  {
    title: '3. Warunek zgodności przemieszczeń',
    narration:
      'Rzeczywiste końce pręta nie przesuwają się, bo blokują je ściany. Wydłużenie termiczne musi więc zostać dokładnie zrównoważone skróceniem sprężystym od siły ściskającej. Suma obu zmian długości jest równa zeru.',
    caption: 'Wydłużenie termiczne i skrócenie mechaniczne znoszą się, bo całkowita długość pozostaje 600 mm.',
    visual: 'thermal',
    focus: { metric: 'compatibility' },
    formula: '\\Delta L_T+\\Delta L_\\sigma=0\\quad\\Rightarrow\\quad\\Delta L_\\sigma=-\\Delta L_T',
  },
  {
    title: '4. Prawo Hooke’a dla skrócenia',
    narration:
      'Skrócenie sprężyste wyrażamy przez naprężenie i sztywność pręta. Ze związku ΔL = σL₀/E wynika, że dodatnie naprężenie rozciągające wydłuża pręt, a ujemne naprężenie ściskające go skraca.',
    caption: 'Skrócenie mechaniczne zależy liniowo od naprężenia i długości pręta.',
    visual: 'thermal',
    focus: { metric: 'hooke' },
    formula: '\\Delta L_\\sigma=\\frac{\\sigma L_0}{E}',
  },
  {
    title: '5. Rozwiązanie równania',
    narration:
      'Podstawiamy skrócenie Hooke’a do warunku zgodności. Długość L₀ skraca się po obu stronach, więc wynik nie zależy od długości pręta. Naprężenie termiczne zależy tylko od materiału i przyrostu temperatury.',
    caption: 'Po skróceniu L₀ otrzymujemy wzór na naprężenie termiczne przy pełnym utwierdzeniu.',
    visual: 'thermal',
    focus: { metric: 'solve' },
    formula: '\\frac{\\sigma L_0}{E}=-\\alpha L_0\\Delta T\\quad\\Rightarrow\\quad\\sigma=-E\\alpha\\Delta T',
  },
  {
    title: '6. Wynik liczbowy i znak',
    narration:
      'Podstawiamy E = 200 000 MPa, α = 1,17·10⁻⁵ 1/K i ΔT = 100 K. Otrzymujemy −234 MPa. Znak minus oznacza ściskanie: ściany naciskają na pręt, a pręt naciska na ściany.',
    caption: 'Naprężenie ściskające −234 MPa na całym przekroju pręta.',
    visual: 'thermal',
    focus: { metric: 'stress' },
    formula: '\\sigma=-200000\\cdot1{,}17\\cdot10^{-5}\\cdot100=-234\\ \\mathrm{MPa}',
  },
  {
    title: '7. Kontrola długości i kierunku siły',
    narration:
      'Po ochłodzeniu do temperatury początkowej pręt ma z powrotem dokładnie 600 mm. Siła w pręcie jest ściskająca, a ściany działają na pręt do wewnątrz. Reakcja na jednostkę pola wynosi 234 N/mm², czyli 234 MPa.',
    caption: 'Długość pręta się nie zmienia, a kierunek reakcji ścian potwierdza ściskanie.',
    visual: 'thermal',
    focus: { metric: 'check' },
    formula: 'L=L_0\\qquad F/A=-\\sigma=234\\ \\mathrm{N/mm^2}',
    emphasis: 'Naprężenie termiczne nie zależy od długości ani od pola przekroju.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RestrainedThermalAnimation }))),
} satisfies SolutionData
