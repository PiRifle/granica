import {
  buildTen,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildTen(KRATOWNICA_VARIANT_DATA[9])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-2-kondygnacje-wysiegnik' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica ma dwie kondygnacje po h = 3,3 m, rozstaw słupów a = 4,4 m, osiem węzłów i dwanaście prętów. Lewy słup tworzą T0–M0–A, środkowy T1–M1–B, a prawy tylko T2–M2. Pas górny to T0–T1–T2, pas środkowy M0–M1–M2. A i B są przegubami na gruncie.',
    caption: 'Dwie kondygnacje, wysięgnik M2–T2, podpory A i B oraz obciążenia P₁, P₂, P₃.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=3\\ \\mathrm{kN},\\quad P_2=4\\ \\mathrm{kN},\\quad P_3=5\\ \\mathrm{kN},\\quad a=4{,}40\\ \\mathrm{m},\\quad h=3{,}30\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Poziome obciążenia P₁ + P₂ = 7 kN działają w prawo, więc B_x = −7,0 kN (w lewo), a A_x = 0. Pionowo P₃ = 5 kN i moment względem B dają A_y = −12,5 kN (w dół) oraz B_y = +17,5 kN (w górę). Ujemna reakcja A_y oznacza, że podpora A musi trzymać konstrukcję.',
    caption: 'A_x = 0, A_y = −12,500 kN, B_x = −7,000 kN, B_y = +17,500 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=0,\\quad A_y=-12{,}500,\\quad B_x=-7{,}000,\\quad B_y=+17{,}500\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły T2 i M2',
    narration:
      'W węźle T2 działa pionowo P₃ = 5 kN oraz pręty 9 i 12. Poziomo N₉ = 0, a pionowo N₁₂ = −5,000 kN. W węźle M2 znamy N₁₂; pionowo 0,6·N₁₀ + N₁₂ = 0, więc N₁₀ = +8,333 kN, a poziomo N₁₁ = −0,8·N₁₀ = −6,667 kN.',
    caption: 'N₉ = 0, N₁₂ = −5,000 kN, N₁₀ = +8,333 kN, N₁₁ = −6,667 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT2M2',
    },
    formula:
      'N_9=0,\\quad N_{12}=-P_3=-5{,}000;\\qquad N_{10}=\\frac{-N_{12}}{0{,}6}=+8{,}333,\\quad N_{11}=-0{,}8N_{10}=-6{,}667\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł T1',
    narration:
      'W węźle T1 znamy N₉ = 0 i N₁₀. Poziomo N₃ = 0,8·N₁₀ = +6,667 kN, a pionowo N₇ = −0,6·N₁₀ = −5,000 kN. Pas górny 3 jest rozciągany, a słupek 7 ściskany.',
    caption: 'N₃ = +6,667 kN, N₇ = −5,000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT1',
    },
    formula: 'N_3=0{,}8N_{10}=+6{,}667,\\qquad N_7=-0{,}6N_{10}=-5{,}000\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł M1',
    narration:
      'W węźle M1 znamy N₇, N₁₁ oraz ukośnicę 4. Poziomo −N₅ + N₁₁ − 0,8·N₄ = 0, a pionowo N₇ − N₈ + 0,6·N₄ = 0. Po podstawieniu N₄ = −12,083 kN otrzymujemy N₅ = +3,000 kN i N₈ = −12,250 kN.',
    caption: 'N₄ = −12,083 kN, N₅ = +3,000 kN, N₈ = −12,250 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeM1',
    },
    formula: 'N_5=N_{11}-0{,}8N_4=+3{,}000,\\qquad N_8=N_7+0{,}6N_4=-12{,}250\\ \\mathrm{kN};\\qquad N_4=-12{,}083',
  },
  {
    title: 'Węzeł T0',
    narration:
      'W węźle T0 działają pręty 1, 3, 4 oraz poziome P₁ = 3 kN. Poziomo N₃ + 0,8·N₄ + P₁ = 0, więc N₄ = −12,083 kN. Pionowo N₁ = −0,6·N₄ = +7,250 kN. Słupek 1 jest rozciągany, a ukośnica 4 ściskana.',
    caption: 'N₁ = +7,250 kN, N₄ = −12,083 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeT0',
    },
    formula: 'N_4=-\\frac{N_3+P_1}{0{,}8}=-12{,}083,\\qquad N_1=-0{,}6N_4=+7{,}250\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł M0 i tabela sił',
    narration:
      'W węźle M0 znamy N₁ i N₅ oraz poziome P₂ = 4 kN. Poziomo N₅ + 0,8·N₆ + P₂ = 0, więc N₆ = −8,750 kN. Pionowo N₂ = N₁ − 0,6·N₆ = +12,500 kN. Komplet: N₁ +7,250; N₂ +12,500; N₃ +6,667; N₄ −12,083; N₅ +3,000; N₆ −8,750; N₇ −5,000; N₈ −12,250; N₉ 0; N₁₀ +8,333; N₁₁ −6,667; N₁₂ −5,000 kN.',
    caption: 'Dwanaście sił osiowych; jedyny pręt zerowy to 9.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula: 'N_6=-\\frac{N_5+P_2}{0{,}8}=-8{,}750,\\quad N_2=N_1-0{,}6N_6=+12{,}500\\ \\mathrm{kN};\\qquad N_9=0',
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 1, 2, 3, 5 i 10, a ściskane 4, 6, 7, 8, 11 i 12. Pręt 9 jest zerowy, bo w węźle T2 obciążenie P₃ jest pionowe. Podstawienie sił do ośmiu węzłów daje maksymalną resztę 2,66·10⁻¹⁵ kN; bilans całej kratownicy potwierdza A_x = 0, ujemną reakcję A_y i dodatnią B_y.',
    caption: 'Bilans globalny i reszty węzłowe potwierdzają wszystkie znaki.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\quad N<0\\Rightarrow\\text{ściskanie},\\qquad N_9=0,\\qquad \\max|\\Sigma F|=2{,}66\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
