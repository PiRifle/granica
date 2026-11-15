import {
  buildThree,
  createKratownicaTask,
  KRATOWNICA_VARIANT_DATA,
  solveKratownica,
} from '../../solution-factories/factory-statyka-kratownica/factory'
import type { SolutionScene } from '../../../types'

export const config = buildThree(KRATOWNICA_VARIANT_DATA[2])

export const solution = solveKratownica(config)

export const task = { ...createKratownicaTask(config, solution), id: 'kratownica-symetryczna-dolny-wezel' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i geometria',
    narration:
      'Układ jest symetryczny: górny pas L–M–R, dolne węzły N i N′, centralny węzeł O pod M oraz podpory A i B. Ukośnica 11 ma rzut poziomy a/2, więc h = (a/2)·tan60° = 2,598 m, a węzeł O leży symetrycznie na −h.',
    caption: 'Trzynaście prętów, osiem węzłów i obciążenia P₁, P₂, P₃.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    formula:
      'P_1=2\\ \\mathrm{kN},\\quad P_2=12\\ \\mathrm{kN},\\quad P_3=6\\ \\mathrm{kN},\\quad a=3{,}00\\ \\mathrm{m},\\quad h=\\frac{a}{2}\\tan60^\\circ=2{,}598\\ \\mathrm{m}',
  },
  {
    title: 'Reakcje podpór',
    narration:
      'Poziomo działa tylko P₁ = 2 kN i składowa pozioma P₃, więc A_x = −5,000 kN. Moment względem A daje B_y = 3,113 kN. Pionowo A_y = 12 + P₃·sin60° − B_y = 3,691 kN. Znak minus przy A_x oznacza strzałkę w lewo.',
    caption: 'A_x = −5,000 kN, A_y = +3,691 kN, B_y = +3,113 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
    formula: 'A_x=-5{,}000,\\quad A_y=+3{,}691,\\quad B_y=+3{,}113\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły B i R',
    narration:
      'W węźle B pionowa reakcja B_y równoważy składową pręta 12: N₁₂ = −B_y/sin60° = −3,595 kN, a poziomo N₁₃ = −N₁₂·cos60° = +1,797 kN. W węźle R obciążenie P₃ i znane N₁₂ dają N₁₁ = +9,595 kN oraz N₈ = −3,595 kN.',
    caption: 'N₁₂ = −3,595 kN, N₁₃ = +1,797 kN, N₁₁ = +9,595 kN, N₈ = −3,595 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesBR',
    },
    formula:
      'N_{12}=-\\frac{B_y}{\\sin60^\\circ}=-3{,}595,\\qquad N_{13}=-N_{12}\\cos60^\\circ=+1{,}797,\\qquad N_{11}=+9{,}595,\\quad N_8=-3{,}595',
  },
  {
    title: "Węzły N' i O",
    narration:
      'W węźle N′ znamy N₁₁ i N₁₃. Równania rzutów dają N₉ = +1,797 kN oraz N₁₀ = +11,392 kN. W węźle O poziomo N₆ = N₁₀, a pionowo N₇ = −√3·N₆ = −19,732 kN. Pręt 7 jest najmocniej ściskany w całej kratownicy.',
    caption: 'N₉ = +1,797 kN, N₁₀ = N₆ = +11,392 kN, N₇ = −19,732 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesNpO',
    },
    formula: 'N_9=+1{,}797,\\qquad N_{10}=+11{,}392,\\qquad N_6=N_{10}=+11{,}392,\\qquad N_7=-\\sqrt3\\,N_6=-19{,}732',
  },
  {
    title: 'Węzeł M',
    narration:
      'W węźle M znamy N₇, N₈ i N₉, a obciążenie P₂ = 12 kN działa w dół. Równanie pionowe daje N₅ = +7,131 kN, a poziome N₄ = −6,262 kN. Ukośnica 5 jest rozciągana, natomiast pas L–M i ukośnica 4 są ściskane.',
    caption: 'N₅ = +7,131 kN, N₄ = −6,262 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodeM',
    },
    formula: 'N_5=+7{,}131,\\qquad N_4=-6{,}262\\ \\mathrm{kN}',
  },
  {
    title: 'Węzły L i N',
    narration:
      'W węźle L obciążenie P₁ = 2 kN i znany N₄ dają układ N₃ − N₁ = 8,524 oraz N₃ = −N₁, skąd N₁ = −4,262 kN i N₃ = +4,262 kN. W węźle N pozioma równowaga zamyka rachunek: N₂ = +7,131 kN.',
    caption: 'N₁ = −4,262 kN, N₂ = +7,131 kN, N₃ = +4,262 kN.',
    visual: 'diagram',
    focus: {
      metric: 'nodesLN',
    },
    formula: 'N_3-N_1=8{,}524,\\qquad N_3=-N_1\\Rightarrow N_1=-4{,}262,\\ N_3=+4{,}262,\\qquad N_2=+7{,}131',
  },
  {
    title: 'Tabela sił',
    narration:
      'Komplet sił: N₁ −4,262; N₂ +7,131; N₃ +4,262; N₄ −6,262; N₅ +7,131; N₆ +11,392; N₇ −19,732; N₈ −3,595; N₉ +1,797; N₁₀ +11,392; N₁₁ +9,595; N₁₂ −3,595; N₁₃ +1,797 kN. Największa bezwzględna siła to |N₇| = 19,732 kN.',
    caption: 'Trzynaście sił osiowych; brak prętów zerowych.',
    visual: 'diagram',
    focus: {
      metric: 'table',
    },
    formula:
      'N_1=-4{,}262,\\quad N_2=+7{,}131,\\quad N_3=+4{,}262,\\quad N_4=-6{,}262,\\quad N_5=+7{,}131,\\quad N_6=+11{,}392,\\quad N_7=-19{,}732,\\quad N_8=-3{,}595,\\quad N_9=+1{,}797,\\quad N_{10}=+11{,}392,\\quad N_{11}=+9{,}595,\\quad N_{12}=-3{,}595,\\quad N_{13}=+1{,}797',
  },
  {
    title: 'Interpretacja i kontrola',
    narration:
      'Rozciągane są pręty 2, 3, 5, 6, 9, 10, 11 i 13, a ściskane 1, 4, 7, 8 i 12. Kontrola węzłowa daje maksymalną resztę 3,55·10⁻¹⁵ kN, a suma reakcji i obciążeń oraz moment względem A znikają. Symetria układu jest widoczna w parach N₂ = N₅ i N₉ = N₁₃.',
    caption: 'Bilans globalny i równania wszystkich ośmiu węzłów potwierdzają tabelę.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
    formula:
      'N_2=N_5=+7{,}131,\\qquad N_9=N_{13}=+1{,}797,\\qquad \\max|\\Sigma F|=3{,}55\\cdot10^{-15}\\ \\mathrm{kN}',
  },
]
