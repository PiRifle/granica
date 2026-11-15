import {
  buildSeven,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildSeven(KRATOWNICA_VARIANT_DATA[6])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-warren-zawieszona' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica Warrena ma osiem węzłów i dwanaście prętów. Pas dolny tworzą L0–L1–L2–L3, a pas górny T0–T1–T2 jest przesunięty o pół panelu. Przy a = 4,0 m i α = 60° wysokość wynosi h = (a/2)·tan60° = 3,464 m, więc wieszak A–T1 ma składowe (a/2, h) i długość a = 4,0 m. Węzeł A leży na wysokości 2h = 6,928 m.',
    caption: 'Pas dolny L0–L3, górny T0–T2, wieszak A–T1, podpory A i B oraz obciążenia P₁, P₂, P₃.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=4\\ \\mathrm{kN},\\quad P_2=6\\ \\mathrm{kN},\\quad P_3=3\\ \\mathrm{kN},\\quad a=4{,}00\\ \\mathrm{m},\\quad h=\\frac{a}{2}\\tan60^\\circ=3{,}464\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Pionowo obciążenia P₁ + P₂ = 10 kN równoważą A_y + B_y, przy czym moment względem B wymusza A_y = 21,402 kN i B_y = −11,402 kN, czyli reakcję B skierowaną w dół. Poziomo P₃ = 3 kN działa w prawo, a moment względem B daje A_x = −12,356 kN (w lewo) oraz B_x = +9,356 kN (w prawo).',
    caption: 'A_x = −12,356 kN, A_y = +21,402 kN, B_x = +9,356 kN, B_y = −11,402 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-12{,}356,\\quad A_y=+21{,}402,\\quad B_x=+9{,}356,\\quad B_y=-11{,}402\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły A i L0',
    narration:
      'W węźle A działa tylko wieszak 1, więc jego kierunek musi równoważyć reakcje: N₁·(1/2) + A_x = 0 oraz N₁·(√3/2) + A_y = 0, skąd N₁ = +24,713 kN. W węźle L0 pionowo N₂·(√3/2) = P₁, więc N₂ = +4,619 kN; poziomo N₃ + N₂/2 = 0, czyli N₃ = −2,309 kN.',
    caption: 'N₁ = +24,713 kN, N₂ = +4,619 kN, N₃ = −2,309 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeA',
    },
    formula:
      'N_1\\cos60^\\circ=-A_x,\\quad N_1\\sin60^\\circ=-A_y\\Rightarrow N_1=+24{,}713;\\qquad N_2=\\frac{P_1}{\\sin60^\\circ}=+4{,}619,\\quad N_3=-\\frac{N_2}{2}=-2{,}309',
  },
  {
    title: 'Węzeł T0',
    narration:
      'W węźle T0 znamy już N₂. Rzuty pionowe dają N₄ = −N₂ = −4,619 kN, a rzuty poziome N₅ = (N₂ − N₄)/2 = +4,619 kN. Pręt 4 jest ściskany, natomiast pręt 5 rozciągany.',
    caption: 'N₄ = −4,619 kN, N₅ = +4,619 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT0',
    },
    formula: 'N_4=-N_2=-4{,}619,\\qquad N_5=\\frac{N_2-N_4}{2}=+4{,}619\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł L1',
    narration:
      'W węźle L1 znamy N₃ i N₄. Pionowo (N₄ + N₆)·sin60° = P₂, więc N₆ = +11,547 kN. Poziomo N₇ = N₃ + N₄/2 − N₆/2 = −10,392 kN, czyli pas dolny 7 jest ściskany.',
    caption: 'N₆ = +11,547 kN, N₇ = −10,392 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeL1',
    },
    formula:
      'N_6=\\frac{P_2}{\\sin60^\\circ}-N_4=+11{,}547,\\qquad N_7=N_3+\\frac{N_4-N_6}{2}=-10{,}392\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł T1',
    narration:
      'W węźle T1 znamy N₁, N₅ i N₆. Rzuty pionowe dają N₈ = N₁ − N₆ = +13,166 kN, a rzuty poziome N₉ = (N₁ + N₆ − N₈)/2 + N₅ = +16,166 kN. Obie ukośnice są rozciągane.',
    caption: 'N₈ = +13,166 kN, N₉ = +16,166 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT1',
    },
    formula: 'N_8=N_1-N_6=+13{,}166,\\qquad N_9=\\frac{N_1+N_6-N_8}{2}+N_5=+16{,}166\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły T2, L2 i L3 — tabela sił',
    narration:
      'W węźle T2 pozioma siła P₃ = 3 kN daje układ −N₉ + (N₁₁ − N₁₀)/2 + P₃ = 0 oraz N₁₀ + N₁₁ = 0, skąd N₁₁ = +13,166 kN i N₁₀ = −13,166 kN. W węźle L2 bilans poziomy daje N₁₂ = N₇ + (N₈ − N₁₀)/2 = +2,774 kN. Komplet sił: N₁ +24,713; N₂ +4,619; N₃ −2,309; N₄ −4,619; N₅ +4,619; N₆ +11,547; N₇ −10,392; N₈ +13,166; N₉ +16,166; N₁₀ −13,166; N₁₁ +13,166; N₁₂ +2,774 kN.',
    caption: 'Dwanaście sił osiowych; brak prętów zerowych.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_{10}=-13{,}166,\\quad N_{11}=+13{,}166,\\quad N_{12}=+2{,}774\\ \\mathrm{kN};\\qquad N_1=+24{,}713,\\ N_6=+11{,}547,\\ N_9=+16{,}166',
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 1, 2, 5, 6, 8, 9, 11 i 12, a ściskane 3, 4, 7 i 10; prętów zerowych nie ma. Największa siła występuje w wieszaku 1. Podstawienie sił do ośmiu węzłów daje maksymalną resztę 5,33·10⁻¹⁵ kN, a globalne sumy sił i momentu są zerowe, co potwierdza także ujemny znak reakcji B_y.',
    caption: 'Bilans globalny i równania węzłowe potwierdzają wszystkie znaki.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F|=5{,}33\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
