import {
  buildTwo,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildTwo(KRATOWNICA_VARIANT_DATA[1])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-3-przesla-pasy-rownolegle' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica ma trzy panele po a = 2,5 m, osiem węzłów i dwanaście prętów. Pasy są równoległe: górny A–T1–T2–T3, dolny B–C1–C2–C3. Ukośnica 10 ma rzut poziomy a i pionowy h, więc h = a·tan60° = 4,330 m.',
    caption: 'A i B są podporami na pionowej ścianie; P₁ i P₂ działają w dół, P₃ w prawo.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=10\\ \\mathrm{kN},\\quad P_2=3\\ \\mathrm{kN},\\quad P_3=4\\ \\mathrm{kN},\\quad a=2{,}50\\ \\mathrm{m},\\quad h=a\\tan60^\\circ=4{,}330\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Pionowo obciążenia 10 + 3 = 13 kN przejmuje A_y = 13,000 kN. Poziomo P₃ = 4 kN działa w prawo, a moment względem B daje A_x = −9,238 kN, czyli strzałkę w lewo. Więź B ma tylko składową poziomą B_x = +5,238 kN; B_y = 0.',
    caption: 'A_x = −9,238 kN, A_y = +13,000 kN, B_x = +5,238 kN, B_y = 0.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-9{,}238,\\quad A_y=+13{,}000,\\quad B_x=+5{,}238,\\quad B_y=0\\ \\mathrm{kN}',
  },
  {
    title: 'Pręty zerowe w T3 i C3',
    narration:
      'W nieobciążonym węźle T3 spotykają się tylko poziomy pręt 9 i pionowy 12, więc N₉ = N₁₂ = 0. W węźle C3 pozioma siła P₃ równoważy się z prętem 11, a ukośnica 10 i słupek 12 pozostają zerowe: N₁₀ = 0, N₁₁ = +4,000 kN.',
    caption: 'N₉ = N₁₀ = N₁₂ = 0 oraz N₁₁ = +4,000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'zeros',
    },
    formula: 'N_9=N_{10}=N_{12}=0,\\qquad N_{11}=+P_3=+4{,}000\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł A — dwie pierwsze siły',
    narration:
      'W węźle A znamy reakcje A_x = −9,238 kN i A_y = 13 kN. Pionowo −N₂·sin60° + A_y = 0, więc N₂ = +15,011 kN. Poziomo N₁ + N₂·cos60° + A_x = 0, stąd N₁ = +1,732 kN. Oba pręty są rozciągane.',
    caption: 'N₁ = +1,732 kN, N₂ = +15,011 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeA',
    },
    formula:
      'N_2\\sin60^\\circ=A_y\\Rightarrow N_2=+15{,}011,\\qquad N_1=|A_x|-N_2\\cos60^\\circ=+1{,}732\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły B i C1',
    narration:
      'W węźle B pozioma reakcja B_x równoważy pręt 3: N₃ = −5,238 kN. W węźle C1 znamy już N₂ i N₃. Poziomo N₇ = N₂·cos60° − |N₃| = +2,268 kN, a pionowo N₄ = −N₂·sin60° = −13,000 kN.',
    caption: 'N₃ = −5,238 kN, N₄ = −13,000 kN, N₇ = +2,268 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesBC1',
    },
    formula: 'N_3=-B_x=-5{,}238,\\qquad N_7=N_2\\cos60^\\circ+N_3=+2{,}268,\\qquad N_4=-N_2\\sin60^\\circ=-13{,}000',
  },
  {
    title: 'Węzły T1 i T2',
    narration:
      'W węźle T1 pionowo N₄ + P₁ równoważy ukośnicę 6: N₆ = (13 − 10)/sin60° = +3,464 kN. Poziomo N₅ = N₁ − N₆·cos60° = 0. W węźle T2 znamy N₅ = N₉ = N₁₀ = 0, więc pionowo N₈ = −P₂ = −3,000 kN.',
    caption: 'N₅ = 0, N₆ = +3,464 kN, N₈ = −3,000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT1T2',
    },
    formula:
      'N_6=\\frac{-N_4-P_1}{\\sin60^\\circ}=+3{,}464,\\qquad N_5=N_1-N_6\\cos60^\\circ=0,\\qquad N_8=-P_2=-3{,}000',
  },
  {
    title: 'Tabela sił',
    narration:
      'Komplet sił: N₁ +1,732; N₂ +15,011; N₃ −5,238; N₄ −13,000; N₅ 0; N₆ +3,464; N₇ +2,268; N₈ −3,000; N₉ 0; N₁₀ 0; N₁₁ +4,000; N₁₂ 0 kN. Cztery pręty zerowe to 5, 9, 10 i 12, a największa siła występuje w pręcie 2.',
    caption: 'Tabela dwunastu sił; wartości dodatnie oznaczają rozciąganie.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_1=+1{,}732,\\quad N_2=+15{,}011,\\quad N_3=-5{,}238,\\quad N_4=-13{,}000,\\quad N_5=0,\\quad N_6=+3{,}464,\\quad N_7=+2{,}268,\\quad N_8=-3{,}000,\\quad N_9=0,\\quad N_{10}=0,\\quad N_{11}=+4{,}000,\\quad N_{12}=0',
  },
  {
    title: 'Interpretacja i kontrola',
    narration:
      'Rozciągane są pręty 1, 2, 6, 7 i 11, a ściskane 3, 4 i 8. Pręty 5, 9, 10 i 12 są zerowe, bo w ich węzłach nie ma potrzebnej składowej równoważącej. Podstawienie sił do ośmiu węzłów daje maksymalną resztę 3,55·10⁻¹⁵ kN oraz zerowe sumy sił i momentu.',
    caption: 'Bilans globalny i równania węzłowe potwierdzają wynik.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F|=3{,}55\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
