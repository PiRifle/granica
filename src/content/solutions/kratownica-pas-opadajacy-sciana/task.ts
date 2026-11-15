import {
  buildOne,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildOne(KRATOWNICA_VARIANT_DATA[0])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-pas-opadajacy-sciana' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Kratownica ma osiem węzłów i dwanaście prętów. Pas dolny tworzą B–C–D–E, a górny T0–T1–T2–E; A jest przegubem na pionowej ścianie. Nachylenie pasa górnego wynosi 30°, więc H = a·tan30° = 1,155 m i węzeł T0 leży na wysokości 3H = 3,464 m.',
    caption: 'Podpory A i B, obciążenia P₁, P₂, P₃ oraz wymiary a i h.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=4\\ \\mathrm{kN},\\quad P_2=9\\ \\mathrm{kN},\\quad P_3=2\\ \\mathrm{kN},\\quad a=2{,}00\\ \\mathrm{m},\\quad H=a\\tan30^\\circ=1{,}155\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Pionowo działa tylko P₂ i P₃, więc B_y = 9 + 2 = 11 kN. Moment względem B daje A_x·3,464 + P₁·2,309 = P₂·2 + P₃·6, skąd A_x = −11,190 kN, czyli strzałka w lewo. Poziomo B_x = 11,190 + 4 = 15,190 kN w prawo, a A_y = 0.',
    caption: 'A_x = −11,190 kN (w lewo), B_x = +15,190 kN (w prawo), B_y = +11,000 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-11{,}190,\\quad A_y=0,\\quad B_x=+15{,}190,\\quad B_y=+11{,}000\\ \\mathrm{kN}',
  },
  {
    title: 'Węzeł E — pierwsze dwie siły',
    narration:
      'W węźle E spotykają się pręty 11 i 12 oraz pionowa siła P₃ = 2 kN. Pionowo N₁₁·sin30° = P₃, więc N₁₁ = +4,000 kN. Poziomo −N₁₁·cos30° − N₁₂ = 0, stąd N₁₂ = −3,464 kN. Pręt 11 jest rozciągany, a 12 ściskany.',
    caption: 'N₁₁ = +4,000 kN, N₁₂ = −3,464 kN; dodatni znak oznacza rozciąganie.',
    visual: 'diagram',
    focus: {
      metric: 'nodeE',
    },
    formula:
      '\\Sigma F_x=-N_{11}\\cos30^\\circ-N_{12}=0,\\qquad \\Sigma F_y=N_{11}\\sin30^\\circ-P_3=0\\ \\Rightarrow\\ N_{11}=+4{,}000,\\ N_{12}=-3{,}464',
  },
  {
    title: 'Węzeł D — pion i pas dolny',
    narration:
      'W węźle D znamy już N₁₂. Poziomo −N₉ + N₁₂ = 0, więc N₉ = −3,464 kN. Pionowo N₁₀ − P₂ = 0, czyli N₁₀ = +9,000 kN. Pręt 9 jest ściskany, a słupek 10 rozciągany.',
    caption: 'N₉ = −3,464 kN, N₁₀ = +9,000 kN; obciążenie P₂ przejmuje słupek 10.',
    visual: 'diagram',
    focus: {
      metric: 'nodeD',
    },
    formula:
      '\\Sigma F_x=-N_9+N_{12}=0,\\qquad \\Sigma F_y=N_{10}-P_2=0\\ \\Rightarrow\\ N_9=-3{,}464,\\ N_{10}=+9{,}000',
  },
  {
    title: 'Węzeł T2 — ukośnice panelu',
    narration:
      'W węźle T2 znamy N₁₀ i N₁₁. Rzuty poziome dają N₇ + N₈ = N₁₁ = 4, a rzuty pionowe N₇ − N₈ = 2N₁₀ + N₁₁ = 22. Rozwiązanie układu: N₇ = +13,000 kN, N₈ = −9,000 kN.',
    caption: 'N₇ = +13,000 kN (rozciąganie), N₈ = −9,000 kN (ściskanie).',
    visual: 'diagram',
    focus: {
      metric: 'nodeT2',
    },
    formula: 'N_7+N_8=N_{11}=4,\\qquad N_7-N_8=2N_{10}+N_{11}=22\\ \\Rightarrow\\ N_7=+13{,}000,\\ N_8=-9{,}000',
  },
  {
    title: 'Węzeł C — domknięcie panelu',
    narration:
      'W węźle C znamy N₈ i N₉. Pionowo N₆ + N₈·sin30° = 0, więc N₆ = +4,500 kN. Poziomo −N₅ + N₈·cos30° + N₉ = 0, stąd N₅ = −11,258 kN. Pas dolny jest ściskany, a słupek 6 rozciągany.',
    caption: 'N₅ = −11,258 kN, N₆ = +4,500 kN; znaki wynikają z założenia N > 0 dla rozciągania.',
    visual: 'diagram',
    focus: {
      metric: 'nodeC',
    },
    formula: 'N_6=-N_8\\sin30^\\circ=+4{,}500,\\qquad N_5=N_8\\cos30^\\circ+N_9=-11{,}258\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły T1 i T0 oraz tabela sił',
    narration:
      'W węźle T1 równania z rzutami prętów 3, 4, 6 i 7 oraz siłą P₁ dają N₃ = +12,921 kN i N₄ = −6,005 kN. W węźle T0 zostaje N₁ + N₃·cos30° = 0 oraz −N₂ − N₃·sin30° = 0, więc N₁ = +11,190 kN i N₂ = −6,460 kN. Tabela: N₁ +11,190; N₂ −6,460; N₃ +12,921; N₄ −6,005; N₅ −11,258; N₆ +4,500; N₇ +13,000; N₈ −9,000; N₉ −3,464; N₁₀ +9,000; N₁₁ +4,000; N₁₂ −3,464 kN.',
    caption: 'Komplet dwunastu sił osiowych; brak prętów zerowych.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_1=+11{,}190,\\quad N_2=-6{,}460,\\quad N_3=+12{,}921,\\quad N_4=-6{,}005,\\quad N_5=-11{,}258,\\quad N_6=+4{,}500,\\quad N_7=+13{,}000,\\quad N_8=-9{,}000,\\quad N_9=-3{,}464,\\quad N_{10}=+9{,}000,\\quad N_{11}=+4{,}000,\\quad N_{12}=-3{,}464',
  },
  {
    title: 'Interpretacja znaków i kontrola',
    narration:
      'Rozciągane są pręty 1, 3, 6, 7, 10 i 11, a ściskane 2, 4, 5, 8, 9 i 12; prętów zerowych nie ma. Kontrola: podstawienie sił do ośmiu węzłów daje maksymalną resztę 3,55·10⁻¹⁵ kN, a suma sił i momentów całej kratownicy jest zerowa.',
    caption: 'Bilans globalny i reszty węzłowe potwierdzają wszystkie znaki.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N>0\\Rightarrow\\text{rozciąganie},\\qquad N<0\\Rightarrow\\text{ściskanie},\\qquad \\max|\\Sigma F_x|,\\ |\\Sigma F_y|=3{,}55\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
