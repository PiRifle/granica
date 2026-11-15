import {
  buildNine,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildNine(KRATOWNICA_VARIANT_DATA[8])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-4-panele-prostokatna' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica prostokątna ma cztery panele po a = 5,0 m, dziesięć węzłów i siedemnaście prętów. Pas górny to T0–T1–T2–T3–T4, pas dolny A–B1–B2–B3–B4. Przy α = 60° wysokość wynosi h = a·tan60° = 8,660 m. A jest przegubem, a B podporą pionową w węźle B4.',
    caption: 'Cztery panele, pasy T0–T4 i A–B4, słupki co panel oraz ukośnice 3, 7, 11, 15.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=10\\ \\mathrm{kN},\\quad P_2=8\\ \\mathrm{kN},\\quad P_3=2\\ \\mathrm{kN},\\quad a=5{,}00\\ \\mathrm{m},\\quad h=a\\tan60^\\circ=8{,}660\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Pionowo obciążenia 10 + 8 = 18 kN równoważą A_y + B_y. Moment względem B daje A_y = 10,634 kN, a więc B_y = 7,366 kN. Poziomo działa tylko P₃ = 2 kN, więc A_x = −2,000 kN (w lewo); podpora B nie ma składowej poziomej.',
    caption: 'A_x = −2,000 kN, A_y = +10,634 kN, B_y = +7,366 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-2{,}000,\\quad A_y=+10{,}634,\\quad B_y=+7{,}366\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły B4 i T4',
    narration:
      'W węźle B4 działa tylko pionowy pręt 17 i reakcja B_y, więc N₁₇ = −7,366 kN, a poziomy pręt 16 jest zerowy. W węźle T4 znamy N₁₇: pionowo N₁₅·sin60° = −N₁₇, skąd N₁₅ = +8,506 kN; poziomo N₁₄ = P₃ − N₁₅·cos60° = −2,253 kN.',
    caption: 'N₁₆ = 0, N₁₇ = −7,366 kN, N₁₅ = +8,506 kN, N₁₄ = −2,253 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesB4T4',
    },
    formula:
      'N_{17}=-B_y=-7{,}366,\\quad N_{16}=0;\\qquad N_{15}=-\\frac{N_{17}}{\\sin60^\\circ}=+8{,}506,\\quad N_{14}=P_3-N_{15}\\cos60^\\circ=-2{,}253',
  },
  {
    title: 'Węzły A i T0 — dwa pręty zerowe',
    narration:
      'W węźle A pionowy słupek 1 i poziomy pas 2 nie mają obciążenia w swoich kierunkach, więc N₁ = 0 i N₂ = 0. Poziomo reakcja A_x = −2 kN równoważy ukośnicę 3: N₃·cos60° = −A_x, skąd N₃ = −12,279 kN. Pionowo N₄ = −A_y − N₃·sin60° = +8,140 kN.',
    caption: 'N₁ = N₂ = 0, N₃ = −12,279 kN, N₄ = +8,140 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesAT0',
    },
    formula:
      'N_1=N_2=0,\\qquad N_3=\\frac{-A_x}{\\cos60^\\circ}=-12{,}279,\\qquad N_4=-A_y-N_3\\sin60^\\circ=+8{,}140\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły T1 i B1',
    narration:
      'W węźle T1 znamy N₂ = 0 i N₃. Poziomo N₆ = −N₃·cos60° = −6,140 kN, a pionowo N₅ = −N₃·sin60° = +10,634 kN. W węźle B1 pionowo N₅ + N₇·sin60° = P₁, więc N₇ = −0,732 kN; poziomo N₈ = N₄ − N₇·cos60° = +8,506 kN.',
    caption: 'N₅ = +10,634 kN, N₆ = −6,140 kN, N₇ = −0,732 kN, N₈ = +8,506 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT1B1',
    },
    formula:
      'N_6=-N_3\\cos60^\\circ=-6{,}140,\\quad N_5=-N_3\\sin60^\\circ=+10{,}634;\\qquad N_7=\\frac{P_1-N_5}{\\sin60^\\circ}=-0{,}732,\\quad N_8=N_4-\\frac{N_7}{2}=+8{,}506',
  },
  {
    title: 'Węzły T2 i B2',
    narration:
      'W węźle T2 poziomo N₁₀ = N₆ + N₇/2 = −6,506 kN, a pionowo N₉ = −N₇·sin60° = +0,634 kN. W węźle B2 pionowo N₉ + N₁₁·sin60° = P₂, więc N₁₁ = +8,506 kN; poziomo N₁₂ = N₈ − N₁₁/2 = +4,253 kN.',
    caption: 'N₉ = +0,634 kN, N₁₀ = −6,506 kN, N₁₁ = +8,506 kN, N₁₂ = +4,253 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT2B2',
    },
    formula:
      'N_{10}=N_6+\\frac{N_7}{2}=-6{,}506,\\quad N_9=-N_7\\sin60^\\circ=+0{,}634;\\qquad N_{11}=\\frac{P_2-N_9}{\\sin60^\\circ}=+8{,}506,\\quad N_{12}=N_8-\\frac{N_{11}}{2}=+4{,}253',
  },
  {
    title: 'Węzły T3 i B3 — tabela sił',
    narration:
      'W węźle T3 poziomo N₁₄ = N₁₀ + N₁₁/2 = −2,253 kN, a pionowo N₁₃ = −N₁₁·sin60° = −7,366 kN. W węźle B3 pionowo N₁₃ + N₁₅·sin60° = 0 daje N₁₅ = +8,506 kN, a poziomo N₁₆ = N₁₂ − N₁₅/2 = 0. Komplet: N₁ 0; N₂ 0; N₃ −12,279; N₄ +8,140; N₅ +10,634; N₆ −6,140; N₇ −0,732; N₈ +8,506; N₉ +0,634; N₁₀ −6,506; N₁₁ +8,506; N₁₂ +4,253; N₁₃ −7,366; N₁₄ −2,253; N₁₅ +8,506; N₁₆ 0; N₁₇ −7,366 kN.',
    caption: 'Siedemnaście sił osiowych; pręty zerowe to 1, 2 i 16.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_{13}=-7{,}366,\\quad N_{15}=+8{,}506,\\quad N_{16}=0\\ \\mathrm{kN};\\qquad N_3=-12{,}279,\\ N_6=-6{,}140,\\ N_{12}=+4{,}253',
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 4, 5, 8, 9, 11, 12 i 15, a ściskane 3, 6, 7, 10, 13, 14 i 17. Pręty 1, 2 i 16 są zerowe. Podstawienie sił do dziesięciu węzłów daje maksymalną resztę 1,78·10⁻¹⁵ kN; globalne sumy sił i momentu znikają, co potwierdza reakcje A i B.',
    caption: 'Trzy pręty zerowe i pełny bilans reakcji.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\quad N<0\\Rightarrow\\text{ściskanie},\\qquad N_1=N_2=N_{16}=0,\\qquad \\max|\\Sigma F|=1{,}78\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
