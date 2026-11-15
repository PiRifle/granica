import {
  buildFive,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildFive(KRATOWNICA_VARIANT_DATA[4])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-slup-wysiegnik' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica nr 5 ma osiem węzłów i trzynaście prętów. Pionowy słup tworzą A–L3–L2–L1–B, a trójkątny wysięgnik węzły R3, R2 i R1. Wysokość jednej kondygnacji wynosi h = 2,0 m, więc słup ma 4h = 8,0 m. Z kąta α = 60° ukośnicy 13 otrzymujemy rozstaw a = h/tan60° = 1,155 m. A jest podporą poziomą na ścianie, B — przegubem na gruncie.',
    formula:
      'P_1=2\\ \\mathrm{kN},\\quad P_2=4\\ \\mathrm{kN},\\quad P_3=2\\ \\mathrm{kN},\\quad h=2{,}00\\ \\mathrm{m},\\quad a=\\frac{h}{\\tan60^\\circ}=1{,}155\\ \\mathrm{m}',
    caption: 'P₁ i P₂ działają pionowo w dół w R3 i R2, a P₃ poziomo w lewo w R1.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Pionowo działają tylko P₁ = 2 kN i P₂ = 4 kN, więc B_y = 6,000 kN. Moment względem B obejmuje A_x na ramieniu 8h oraz obciążenia P₁, P₂ i P₃. Po podstawieniu a = 1,155 m otrzymujemy A_x = −0,943 kN, czyli strzałkę w lewo. Poziomo B_x = P₃ − A_x = 2,943 kN w prawo.',
    formula:
      '\\sum F_y=0:\\ B_y-P_1-P_2=0\\Rightarrow B_y=6{,}000\\ \\mathrm{kN};\\qquad \\sum M_B=0:\\ -8A_x-P_1a-P_2(2a)+2P_3=0\\Rightarrow A_x=-0{,}943\\ \\mathrm{kN}',
    caption: 'A_x = -0{,}943 kN (w lewo), B_x = 2{,}943 kN (w prawo), B_y = 6{,}000 kN (w górę).',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Pręty zerowe w słupie',
    narration:
      'W węźle L3 nie ma obciążenia, a jedyny pręt poziomy to 3, więc N₃ = 0. Podobnie w węźle L1 jedyny pręt poziomy to 11, dlatego N₁₁ = 0. Pionowo w L3 zostaje N₁ = N₄, a w L1 N₈ = N₁₂. Wartości tych prętów wynoszą −1,634 kN i −0,902 kN, więc wszystkie cztery są ściskane.',
    formula: 'N_3=0,\\quad N_{11}=0,\\qquad N_1=N_4=-1{,}634\\ \\mathrm{kN},\\qquad N_8=N_{12}=-0{,}902\\ \\mathrm{kN}',
    caption: 'Zerowe pręty 3 i 11 wynikają wprost z równowagi nieobciążonych węzłów L3 i L1.',
    visual: 'diagram',
    focus: {
      metric: 'zeros',
    },
  },
  {
    title: 'Węzeł R3 i górny panel',
    narration:
      'W węźle R3 spotykają się pręty 2, 3, 5 i 6 oraz obciążenie P₁ = 2 kN. Znamy już N₃ = 0. Rzuty poziome i pionowe dają układ dwóch równań: N₂ = +1,887 kN, N₅ = −1,155 kN i N₆ = +0,732 kN. Pręt 2 i 6 są rozciągane, a ukośnica 5 ściskana.',
    formula: '\\sum F_x=-0{,}5N_2-0{,}5N_5+0{,}5N_6=0,\\qquad \\sum F_y=0{,}866N_2-0{,}866N_5-0{,}866N_6-P_1=0',
    caption: 'N₂ = 1{,}887 kN, N₅ = -1{,}155 kN, N₆ = 0{,}732 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeR3',
    },
  },
  {
    title: 'Węzły L2 i R2',
    narration:
      'W węźle L2 znamy N₄ i N₅, a szukamy N₇, N₈ i N₉. Rzuty poziome i pionowe wiążą te siły z ukośnicami pod kątem 60°. W węźle R2 pionowo działa P₂ = 4 kN, co wyznacza N₁₀. Otrzymujemy N₇ = +1,577 kN, N₉ = −2,000 kN i N₁₀ = −3,887 kN.',
    formula:
      '\\sum F_x(L_2)=0{,}5N_5+N_7+0{,}5N_9=0,\\qquad \\sum F_y(L_2)=N_4+0{,}866N_5-N_8-0{,}866N_9=0,\\qquad \\sum F_y(R_2)=0{,}866N_6-0{,}866N_{10}-P_2=0',
    caption: 'N₇ = 1{,}577 kN, N₉ = -2{,}000 kN, N₁₀ = -3{,}887 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesL2R2',
    },
  },
  {
    title: 'Węzeł R1 i podpora B',
    narration:
      'W węźle R1 działa poziomo w lewo P₃ = 2 kN. Znane są już N₉, N₁₀ i N₁₁ = 0, więc pozostaje wyznaczyć N₁₃. Rzuty poziome i pionowe dają N₁₃ = −5,887 kN. W węźle B reakcje B_x i B_y domykają równowagę ostatniego panelu.',
    formula: '\\sum F_x(R_1)=-0{,}5N_9+0{,}5N_{10}-N_{11}-0{,}5N_{13}-P_3=0\\Rightarrow N_{13}=-5{,}887\\ \\mathrm{kN}',
    caption: 'N₁₃ = -5{,}887 kN; B_x = 2{,}943 kN, B_y = 6{,}000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeR1',
    },
  },
  {
    title: 'Komplet sił w prętach',
    narration:
      'Tabela obejmuje wszystkie trzynaście prętów. Wartości dodatnie oznaczają rozciąganie, ujemne ściskanie, a zero — pręt nieprzenoszący siły. Największa siła co do modułu występuje w pręcie 13 i wynosi 5,887 kN (ściskanie).',
    formula:
      'N_1=-1{,}634,\\ N_2=1{,}887,\\ N_3=0{,}000,\\ N_4=-1{,}634,\\ N_5=-1{,}155,\\ N_6=0{,}732,\\ N_7=1{,}577,\\ N_8=-0{,}902,\\ N_9=-2{,}000,\\ N_{10}=-3{,}887,\\ N_{11}=0{,}000,\\ N_{12}=-0{,}902,\\ N_{13}=-5{,}887',
    caption: 'Wszystkie wartości w kN; zero przy prętach 3 i 11 jest wynikiem dokładnym z równań równowagi.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 2, 6 i 7, a ściskane 1, 4, 5, 8, 9, 10, 12 i 13. Pręty 3 i 11 są zerowe. Kontrola polega na podstawieniu sił do równań wszystkich ośmiu węzłów oraz do globalnego bilansu sił i momentu. Maksymalna reszta węzłowa jest rzędu 10⁻¹⁶ kN, więc rozwiązanie jest spójne.',
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F|=8{,}88\\cdot10^{-16}\\ \\mathrm{kN},\\qquad \\sum F_x=\\sum F_y=\\sum M_B=0',
    caption: 'A_x = -0{,}943 kN, B_x = 2{,}943 kN, B_y = 6{,}000 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
