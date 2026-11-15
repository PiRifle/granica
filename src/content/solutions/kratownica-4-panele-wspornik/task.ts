import {
  buildFour,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildFour(KRATOWNICA_VARIANT_DATA[3])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-4-panele-wspornik' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica ma cztery panele po a = 4,0 m, dziewięć węzłów i czternaście prętów. Pionowy słup 1 łączy podporę A na stropie z węzłem C0, a pas dolny tworzą C0–C1–C2–C3–B. Ukośnica 13 ma rzut poziomy a, więc h = a·tan60° = 6,928 m.',
    caption: 'A jest przegubem na stropie, B — przegubem na gruncie.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=10\\ \\mathrm{kN},\\quad P_2=10\\ \\mathrm{kN},\\quad P_3=5\\ \\mathrm{kN},\\quad a=4{,}00\\ \\mathrm{m},\\quad h=a\\tan60^\\circ=6{,}928\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Poziomo działa tylko P₃ = 5 kN, więc B_x = −5,000 kN, czyli strzałka w lewo. Moment względem B daje A_y = 10,335 kN, a pionowo B_y = 10 + 10 − A_y = 9,665 kN. Reakcja A_x jest zerowa, bo podpora A nie przenosi siły poziomej w tym układzie.',
    caption: 'A_x = 0, A_y = +10,335 kN, B_x = −5,000 kN, B_y = +9,665 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=0,\\quad A_y=+10{,}335,\\quad B_x=-5{,}000,\\quad B_y=+9{,}665\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły A i C0',
    narration:
      'W węźle A pionowa reakcja A_y równoważy słupek 1: N₁ = +10,335 kN. W węźle C0 pionowo N₁ + N₂·sin60° = 0, więc N₂ = −11,934 kN, a poziomo N₃ = −N₂·cos60° = +5,967 kN.',
    caption: 'N₁ = +10,335 kN, N₂ = −11,934 kN, N₃ = +5,967 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesAC0',
    },
    formula:
      'N_1=A_y=+10{,}335,\\qquad N_2=-\\frac{N_1}{\\sin60^\\circ}=-11{,}934,\\qquad N_3=-N_2\\cos60^\\circ=+5{,}967',
  },
  {
    title: 'Węzeł T1',
    narration:
      'W węźle T1 znamy N₂. Poziomo N₅ = N₂·cos60° = −5,967 kN, a pionowo N₄ = −N₂·sin60° = +10,335 kN. Słupek 4 jest więc rozciągany, a górny pas 5 ściskany.',
    caption: 'N₄ = +10,335 kN, N₅ = −5,967 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT1',
    },
    formula: 'N_5=N_2\\cos60^\\circ=-5{,}967,\\qquad N_4=-N_2\\sin60^\\circ=+10{,}335\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł C1',
    narration:
      'W węźle C1 znamy N₃ i N₄, a P₂ = 10 kN działa w dół. Pionowo N₄·1 + N₆·sin60° − P₂ = 0, stąd N₆ = −0,387 kN. Poziomo −N₃ + N₆·cos60° + N₇ = 0, więc N₇ = +6,160 kN.',
    caption: 'N₆ = −0,387 kN, N₇ = +6,160 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeC1',
    },
    formula: 'N_6=\\frac{P_2-N_4}{\\sin60^\\circ}=-0{,}387,\\qquad N_7=N_3-N_6\\cos60^\\circ=+6{,}160',
  },
  {
    title: 'Węzły C2 i T2',
    narration:
      'W węźle C2 pionowo N₈ = P₁ = +10,000 kN, a poziomo N₁₁ = N₇ = +6,160 kN. W węźle T2 znamy już N₅, N₆, N₈ i N₁₁; równania dają N₉ = −0,580 kN oraz N₁₀ = −11,160 kN.',
    caption: 'N₈ = +10,000 kN, N₁₁ = +6,160 kN, N₉ = −0,580 kN, N₁₀ = −11,160 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesC2T2',
    },
    formula: 'N_8=P_1=+10{,}000,\\qquad N_{11}=N_7=+6{,}160,\\qquad N_9=-0{,}580,\\quad N_{10}=-11{,}160',
  },
  {
    title: 'Węzły T3 i C3 oraz tabela',
    narration:
      'W węźle T3 obciążenie P₃ i znane N₉ dają N₁₃ = −11,160 kN oraz N₁₂ = +9,665 kN. W węźle C3 zostaje N₁₄ = +0,580 kN. Tabela: N₁ +10,335; N₂ −11,934; N₃ +5,967; N₄ +10,335; N₅ −5,967; N₆ −0,387; N₇ +6,160; N₈ +10,000; N₉ −0,580; N₁₀ −11,160; N₁₁ +6,160; N₁₂ +9,665; N₁₃ −11,160; N₁₄ +0,580 kN.',
    caption: 'Czternaście sił osiowych; brak prętów zerowych.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_1=+10{,}335,\\quad N_2=-11{,}934,\\quad N_3=+5{,}967,\\quad N_4=+10{,}335,\\quad N_5=-5{,}967,\\quad N_6=-0{,}387,\\quad N_7=+6{,}160,\\quad N_8=+10{,}000,\\quad N_9=-0{,}580,\\quad N_{10}=-11{,}160,\\quad N_{11}=+6{,}160,\\quad N_{12}=+9{,}665,\\quad N_{13}=-11{,}160,\\quad N_{14}=+0{,}580',
  },
  {
    title: 'Interpretacja i kontrola',
    narration:
      'Rozciągane są pręty 1, 3, 4, 7, 8, 11, 12 i 14, a ściskane 2, 5, 6, 9, 10 i 13. Prętów zerowych nie ma, choć N₆, N₉ i N₁₄ są bardzo małe. Kontrola dziewięciu węzłów daje maksymalną resztę 3,55·10⁻¹⁵ kN i zerowy bilans sił oraz momentu.',
    caption: 'Bilans globalny i równania węzłowe potwierdzają tabelę sił.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F|=3{,}55\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
