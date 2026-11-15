import {
  buildSix,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildSix(KRATOWNICA_VARIANT_DATA[5])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-dwa-pasy-podpora-b' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica nr 6 ma osiem węzłów i trzynaście prętów. Górny pas tworzą T0–T1–T2–T3, środkowy M0–M1–M2, a dolny węzeł to A. Rozstaw paneli wynosi a = 4,0 m, a wysokość między pasami h = 3,0 m; górny pas leży na 2h = 6,0 m. A jest przegubem na gruncie, B — pionową podporą na występnie w węźle M2.',
    formula:
      'P_1=3\\ \\mathrm{kN},\\quad P_2=7\\ \\mathrm{kN},\\quad P_3=5\\ \\mathrm{kN},\\quad a=4{,}00\\ \\mathrm{m},\\quad h=3{,}00\\ \\mathrm{m}',
    caption: 'P₁ działa poziomo w prawo w T0, P₂ pionowo w dół w T1, a P₃ pionowo w dół w T3.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Poziomo działa tylko P₁ = 3 kN, więc A_x = −3,000 kN, czyli w lewo. Moment względem A zawiera P₂ na ramieniu 4 m, P₃ na ramieniu 12 m, P₁ na ramieniu 6 m oraz B_y na ramieniu 8 m. Stąd B_y = 13,250 kN. Pionowo A_y + B_y = P₂ + P₃, więc A_y = −1,250 kN, czyli reakcja A działa w dół.',
    formula:
      '\\sum F_x=0:\\ A_x+P_1=0\\Rightarrow A_x=-3{,}000\\ \\mathrm{kN};\\qquad \\sum M_A=0:\\ 8B_y-4P_2-12P_3-6P_1=0\\Rightarrow B_y=13{,}250\\ \\mathrm{kN}',
    caption: 'A_y = -1{,}250 kN (w dół), B_y = 13{,}250 kN (w górę).',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Pręt zerowy i węzeł T0',
    narration:
      'W węźle T0 działają pręty 1 i 3 oraz pozioma siła P₁ = 3 kN. Pionowo jedynym prętem jest 1, więc N₁ = 0. Poziomo N₃ + P₁ = 0, skąd N₃ = −3,000 kN. Pręt 1 jest zerowy, a pręt 3 ściskany.',
    formula:
      '\\sum F_y(T_0)=-N_1=0\\Rightarrow N_1=0{,}000;\\qquad \\sum F_x(T_0)=N_3+P_1=0\\Rightarrow N_3=-3{,}000\\ \\mathrm{kN}',
    caption: 'N₁ = 0 to jedyny pręt zerowy w tej kratownicy; N₃ jest ściskany.',
    visual: 'diagram',
    focus: {
      metric: 'zeros',
    },
  },
  {
    title: 'Węzły M0 i A',
    narration:
      'W węźle M0 znamy N₁ = 0, a ukośnica 4 ma składowe 0,8 i 0,6. Poziomo N₅ = −0,8N₄, pionowo N₁ − N₂ + 0,6N₄ = 0, co daje N₄ = −1,667 kN i N₅ = +1,333 kN. W węźle A reakcje A_x i A_y domykają pręty 2 i 6: N₂ = −1,000 kN, N₆ = +3,750 kN.',
    formula:
      '\\sum F_x(M_0)=0{,}8N_4+N_5=0,\\quad \\sum F_y(M_0)=N_1-N_2+0{,}6N_4=0,\\qquad \\sum F_x(A)=0{,}8N_6+A_x=0,\\quad \\sum F_y(A)=N_2+0{,}6N_6+A_y=0',
    caption: 'N₂ = -1{,}000 kN, N₄ = -1{,}667 kN, N₅ = 1{,}333 kN, N₆ = 3{,}750 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesM0A',
    },
  },
  {
    title: 'Węzły T1 i M1',
    narration:
      'W węźle T1 działa P₂ = 7 kN w dół. Znane N₃ i N₄ pozwalają wyznaczyć N₈ = −4,333 kN i N₇ = −6,000 kN. W węźle M1 równania z ukośnicami 6 i 9 dają N₉ = +13,750 kN oraz N₁₀ = −6,667 kN. Pręt 9 jest najmocniej rozciągany w całej kratownicy.',
    formula:
      '\\sum F_x(T_1)=-N_3-0{,}8N_4+N_8=0,\\quad \\sum F_y(T_1)=-0{,}6N_4-N_7-P_2=0,\\qquad \\sum F_x(M_1)=-N_5-0{,}8N_6+0{,}8N_9+N_{10}=0',
    caption: 'N₇ = -6{,}000 kN, N₈ = -4{,}333 kN, N₉ = 13{,}750 kN, N₁₀ = -6{,}667 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT1M1',
    },
  },
  {
    title: 'Węzły T2, M2 i T3',
    narration:
      'W węźle T2 pionowo znane N₉ daje N₁₁ = −8,250 kN, a poziomo N₁₂ = +6,667 kN. W węźle M2 podpora B wnosi B_y = 13,250 kN, co wraz z ukośnicą 13 daje N₁₃ = −8,333 kN. W węźle T3 obciążenie P₃ = 5 kN zamyka równowagę prętów 12 i 13.',
    formula:
      '\\sum F_y(T_2)=-0{,}6N_9-N_{11}=0\\Rightarrow N_{11}=-8{,}250\\ \\mathrm{kN};\\qquad \\sum F_x(T_2)=-N_8-0{,}8N_9+N_{12}=0\\Rightarrow N_{12}=6{,}667\\ \\mathrm{kN}',
    caption: 'N₁₁ = -8{,}250 kN, N₁₂ = 6{,}667 kN, N₁₃ = -8{,}333 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesT2M2T3',
    },
  },
  {
    title: 'Komplet sił w prętach',
    narration:
      'Tabela zawiera wszystkie trzynaście sił osiowych. Wartości dodatnie oznaczają rozciąganie, ujemne ściskanie, a zero — pręt zerowy. Największa siła co do modułu to N₉ = +13,750 kN, a najmniejsza niezerowa to N₂ = −1,000 kN.',
    formula:
      'N_1=0{,}000,\\ N_2=-1{,}000,\\ N_3=-3{,}000,\\ N_4=-1{,}667,\\ N_5=1{,}333,\\ N_6=3{,}750,\\ N_7=-6{,}000,\\ N_8=-4{,}333,\\ N_9=13{,}750,\\ N_{10}=-6{,}667,\\ N_{11}=-8{,}250,\\ N_{12}=6{,}667,\\ N_{13}=-8{,}333',
    caption: 'Wszystkie wartości w kN; tylko pręt 1 jest dokładnie zerowy.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 5, 6, 9 i 12, a ściskane 2, 3, 4, 7, 8, 10, 11 i 13. Pręt 1 jest zerowy. Kontrola węzłowa i globalna wykorzystuje wszystkie równania równowagi. Maksymalna reszta wynosi około 4,66·10⁻¹⁵ kN, a suma sił i momentu jest zerowa, co potwierdza znaki i wartości.',
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F|=4{,}66\\cdot10^{-15}\\ \\mathrm{kN},\\qquad \\sum F_x=\\sum F_y=\\sum M_A=0',
    caption: 'A_x = -3{,}000 kN, A_y = -1{,}250 kN, B_y = 13{,}250 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
