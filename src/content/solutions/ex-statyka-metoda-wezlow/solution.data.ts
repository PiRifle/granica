import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-metoda-wezlow',
  title: 'Metoda węzłów — dwupanelowa kratownica krok po kroku',
  duration: 7,
  given: [
    'Węzły A = (0, 0), B = (2, 0), C = (4, 0), D = (0, 2), E = (2, 2), F = (4, 2) m',
    'Pręty AB, BC, DE, EF, AD, BE, CF, AE, BF',
    'Podpora przegubowa w A, podpora przesuwna w C',
    'Obciążenie P = 8 kN w węźle E, pionowo w dół',
  ],
  result:
    'Zera: NAD = NDE = NBC = 0. Ściskanie: NCF = NEF = NBE = −4,00 kN oraz NAE = −5,657 kN. Rozciąganie: NBF = +5,657 kN i NAB = +4,00 kN. Kontrola węzła A domyka rachunek.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.NodesMethodAnimation }))),
  scenes: [
    {
      title: 'Model i kolejność węzłów',
      narration:
        'Kratownica ma dwa panele i dziewięć prętów. Zaczniemy od węzłów, które mają co najwyżej dwie niewiadome. Najpierw wyznaczamy reakcje, potem wykorzystujemy pręty zerowe w węzłach D i C, a następnie przechodzimy przez F, E i B.',
      caption: 'Dwa panele, dziewięć prętów i obciążenie w środkowym węźle górnego pasa.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0),\\ B=(2,0),\\ C=(4,0),\\ D=(0,2),\\ E=(2,2),\\ F=(4,2)\\ \\text{m}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Obciążenie działa w połowie rozpiętości, więc z symetrii Ay = Cy = 4 kN. Nie ma sił poziomych, więc Ax = 0. Te trzy reakcje są znanymi siłami zewnętrznymi w węzłach podporowych.',
      caption: 'Ay = Cy = 4 kN, Ax = 0.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula: 'A_x=0,\\qquad A_y=C_y=\\frac{8}{2}=4\\ \\text{kN}',
    },
    {
      title: 'Pręty zerowe w D i C',
      narration:
        'W nieobciążonym węźle D spotykają się tylko AD i DE, więc oba są zerowe. W węźle C poziomy pas BC nie ma partnera poziomego, więc NBC = 0. Zostaje pion CF, który równoważy reakcję Cy = 4 kN: NCF = −4 kN.',
      caption: 'NAD = NDE = NBC = 0 oraz NCF = −4,00 kN.',
      visual: 'diagram',
      focus: { metric: 'zeros' },
      formula: 'N_{AD}=N_{DE}=N_{BC}=0,\\qquad N_{CF}+C_y=0\\Rightarrow N_{CF}=-4\\ \\text{kN}',
    },
    {
      title: 'Węzeł F',
      narration:
        'W węźle F znamy już CF. Pręt CF działa na węzeł w górę z siłą 4 kN. Ukośnica BF jest pod 45°, więc z pionu 4 − NBF sin45° = 0 daje NBF = +5,657 kN. Poziomo −NEF − NBF cos45° = 0, czyli NEF = −4,00 kN.',
      caption: 'NBF = +5,657 kN (rozciąganie), NEF = −4,00 kN (ściskanie).',
      visual: 'diagram',
      focus: { metric: 'nodeF' },
      formula:
        'N_{BF}=\\frac{4}{\\sin45^\\circ}=+5{,}657\\ \\text{kN},\\qquad N_{EF}=-N_{BF}\\cos45^\\circ=-4{,}00\\ \\text{kN}',
    },
    {
      title: 'Węzeł E',
      narration:
        'W węźle E znamy NEF = −4 kN i NDE = 0. Pozioma równowaga daje NEF − NAE cos45° = 0, więc NAE = −5,657 kN. Pionowo −8 − NBE − NAE sin45° = 0, skąd NBE = −4,00 kN. Oba pręty są ściskane.',
      caption: 'NAE = −5,657 kN, NBE = −4,00 kN — ściskanie.',
      visual: 'diagram',
      focus: { metric: 'nodeE' },
      formula:
        'N_{AE}=\\frac{N_{EF}}{\\cos45^\\circ}=-5{,}657\\ \\text{kN},\\qquad N_{BE}=-8-N_{AE}\\sin45^\\circ=-4{,}00\\ \\text{kN}',
    },
    {
      title: 'Węzeł B i kontrola w A',
      narration:
        'W węźle B znamy NBC = 0, NBE = −4 i NBF = +5,657. Poziomo −NAB + NBF cos45° = 0, więc NAB = +4,00 kN. Kontrola pionowa: NBE + NBF sin45° = −4 + 4 = 0. Na koniec węzeł A: NAB ciągnie w prawo, NAE daje składowe (−4; −4), a Ay = 4 równoważy pion — całość się domyka.',
      caption: 'NAB = +4,00 kN; kontrola węzłów B i A potwierdza wszystkie znaki.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'N_{AB}=N_{BF}\\cos45^\\circ=+4{,}00\\ \\text{kN},\\qquad N_{BE}+N_{BF}\\sin45^\\circ=0',
    },
  ],
} satisfies SolutionData
