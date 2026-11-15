import {
  buildEight,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildEight(KRATOWNICA_VARIANT_DATA[7])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-gorny-trojkat-podpora-b' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica ma osiem węzłów i dwanaście prętów. Pas górny A–T0–T1–T2–T3 leży na wysokości h, dolne węzły U1 i U2 na h/2, a podpora B pracuje pod U1. Przy a = 3,2 m i α = 45° wysokość wynosi h = 2a·tan45° = 6,4 m. Węzeł A jest przegubem na ścianie, a B przegubem na gruncie.',
    caption: 'Pas górny T0–T3, dolny trójkąt U1–U2–B, podpory A i B oraz obciążenia P₁, P₂, P₃.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=5\\ \\mathrm{kN},\\quad P_2=7\\ \\mathrm{kN},\\quad P_3=7\\ \\mathrm{kN},\\quad a=3{,}20\\ \\mathrm{m},\\quad h=2a\\tan45^\\circ=6{,}40\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Wszystkie obciążenia są pionowe, więc suma pionowa daje B_y = 5 + 7 + 7 = 19 kN, a moment względem B daje A_y = 0. Poziomo A_x + B_x = 0, a moment względem B wymusza A_x = −10,5 kN (w lewo) i B_x = +10,5 kN (w prawo).',
    caption: 'A_x = −10,500 kN, A_y = 0, B_x = +10,500 kN, B_y = +19,000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-10{,}500,\\quad A_y=0,\\quad B_x=+10{,}500,\\quad B_y=+19{,}000\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł T3 — pierwsze siły',
    narration:
      'W węźle T3 działa pionowo P₃ = 7 kN oraz pręty 11 i 12. Rzuty pionowe dają N₁₂·sin45° = −P₃, więc N₁₂ = −9,899 kN. Poziomo −N₁₁ − N₁₂·cos45° = 0, stąd N₁₁ = +7,000 kN. Pręt 12 jest ściskany, a 11 rozciągany.',
    caption: 'N₁₁ = +7,000 kN, N₁₂ = −9,899 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT3',
    },
    formula:
      'N_{12}=-\\frac{P_3}{\\sin45^\\circ}=-9{,}899,\\qquad N_{11}=-N_{12}\\cos45^\\circ=+7{,}000\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły A i T0 — pręt zerowy',
    narration:
      'W węźle A reakcja A_y = 0, więc poziomy pręt 1 przenosi całą reakcję A_x: N₁ = +10,500 kN. W węźle T0 pionowy pręt 3 nie ma pary równoważącej, więc N₃ = 0. Poziomo N₂ = N₁ = +10,500 kN.',
    caption: 'N₁ = +10,500 kN, N₂ = +10,500 kN, N₃ = 0.',
    visual: 'diagram',
    focus: {
      metric: 'nodesAT0',
    },
    formula: 'N_1=-A_x=+10{,}500,\\qquad N_3=0,\\qquad N_2=N_1=+10{,}500\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł T1',
    narration:
      'W węźle T1 znamy N₂ i N₃. Pionowo N₄ + P₁ = 0, więc N₄ = −5,000 kN; poziomo N₅ = N₂ = +10,500 kN. Słupek 4 jest ściskany obciążeniem P₁, a pas górny 5 rozciągany.',
    caption: 'N₄ = −5,000 kN, N₅ = +10,500 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT1',
    },
    formula: 'N_4=-P_1=-5{,}000,\\qquad N_5=N_2=+10{,}500\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły U1 i B',
    narration:
      'W węźle B reakcje B_x = 10,5 kN i B_y = 19 kN równoważą pręty 8 i 9. Poziomo N₉·cos45° + B_x = 0, więc N₉ = −14,849 kN; pionowo N₈ + N₉·sin45° + B_y = 0, stąd N₈ = −8,500 kN. W węźle U1 pionowo N₄ + N₆·sin45° − N₈ = 0 daje N₆ = −4,950 kN, a poziomo N₇ = −N₆·cos45° = +3,500 kN.',
    caption: 'N₆ = −4,950 kN, N₇ = +3,500 kN, N₈ = −8,500 kN, N₉ = −14,849 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesU1B',
    },
    formula:
      'N_9=-\\frac{B_x}{\\cos45^\\circ}=-14{,}849,\\quad N_8=-B_y-N_9\\sin45^\\circ=-8{,}500;\\qquad N_6=-4{,}950,\\quad N_7=+3{,}500\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł T2, U2 i tabela sił',
    narration:
      'W węźle T2 pionowo N₁₀ + N₆·sin45° + P₂ = 0, więc N₁₀ = −3,500 kN; bilans poziomy domyka N₅, N₆ i N₁₁. W węźle U2 pręty 7, 9, 10 i 12 domykają się bez dodatkowych niewiadomych. Komplet: N₁ +10,500; N₂ +10,500; N₃ 0; N₄ −5,000; N₅ +10,500; N₆ −4,950; N₇ +3,500; N₈ −8,500; N₉ −14,849; N₁₀ −3,500; N₁₁ +7,000; N₁₂ −9,899 kN.',
    caption: 'Dwanaście sił osiowych; jedyny pręt zerowy to 3.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_{10}=-P_2-N_6\\sin45^\\circ=-3{,}500\\ \\mathrm{kN};\\qquad N_1=+10{,}500,\\ N_5=+10{,}500,\\ N_9=-14{,}849,\\ N_{12}=-9{,}899',
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 1, 2, 5, 7 i 11, a ściskane 4, 6, 8, 9, 10 i 12. Pręt 3 jest zerowy, bo w węźle T0 nie ma pionowego obciążenia ani ukośnicy. Podstawienie sił do ośmiu węzłów daje maksymalną resztę 3,55·10⁻¹⁵ kN, a A_y = 0 i globalny bilans momentu potwierdzają reakcje.',
    caption: 'Bilans globalny, A_y = 0 i reszty węzłowe potwierdzają wynik.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad N_3=0,\\qquad \\max|\\Sigma F|=3{,}55\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
