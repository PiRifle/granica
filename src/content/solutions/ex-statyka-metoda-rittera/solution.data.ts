import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-metoda-rittera',
  title: 'Metoda Rittera — jedno cięcie, trzy siły',
  duration: 7,
  given: [
    'Węzły A = (0, 0), B = (4, 0), C = (8, 0), D = (2, 2), E = (6, 2) m',
    'Pręty AB, BC, DE, AD, DB, BE, EC',
    'Podpora przegubowa w A, podpora przesuwna w C',
    'Obciążenia P₁ = 8 kN w D i P₂ = 4 kN w E, pionowo w dół',
  ],
  result:
    'NAB = +7,00 kN (rozciąganie), NDB = −1,414 kN (ściskanie), NDE = −6,00 kN (ściskanie). Przekrój przez trzy pręty i moment względem punktu zbiegu dwóch z nich dał każdą siłę bez rozwiązywania całej kratownicy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RitterMethodAnimation }))),
  scenes: [
    {
      title: 'Model i obciążenia',
      narration:
        'Kratownica Warrena ma dwa górne węzły D i E oraz trzy węzły dolne A, B i C. Obciążenia 8 kN i 4 kN działają w górnych węzłach. Zanim wykonamy przekrój, musimy znać reakcje całej konstrukcji.',
      caption: 'Kratownica Warrena z obciążeniami w węzłach D i E.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'P_1=8\\ \\text{kN},\\quad P_2=4\\ \\text{kN},\\qquad A=(0,0),\\ B=(4,0),\\ C=(8,0)',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Moment względem A daje Cy·8 = 8·2 + 4·6 = 40, więc Cy = 5 kN. Z sumy sił pionowych Ay = 12 − 5 = 7 kN, a suma sił poziomych daje Ax = 0. Lewa część przekroju będzie miała prostszy układ sił.',
      caption: 'Ay = 7 kN, Cy = 5 kN, Ax = 0.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula: 'C_y=\\frac{8\\cdot2+4\\cdot6}{8}=5\\ \\text{kN},\\qquad A_y=12-5=7\\ \\text{kN}',
    },
    {
      title: 'Przekrój przez trzy pręty',
      narration:
        'Wykonujemy pionowy przekrój w x = 3 m. Przecina on trzy pręty: poziomy AB, ukośny DB i poziomy DE. Bierzemy lewą część z węzłami A i D. Na tej części działają reakcja Ay = 7 kN, obciążenie 8 kN w D oraz trzy nieznane siły przekrojowe.',
      caption: 'Przekrój przez AB, DB i DE — trzy niewiadome, trzy równania.',
      visual: 'diagram',
      focus: { metric: 'section' },
      formula: '\\text{przekrój }x=3\\ \\text{m}:\\quad N_{AB},\\ N_{DB},\\ N_{DE}',
    },
    {
      title: 'Siła w pręcie DB',
      narration:
        'Rzutujemy pionowo lewą część. Przy rozciąganiu DB działa na nią w dół i w prawo, ze składową pionową −NDB/√2. Zatem 7 − 8 − NDB/√2 = 0, skąd NDB = −√2 = −1,414 kN. Pręt jest ściskany.',
      caption: 'NDB = −1,414 kN — ściskanie.',
      visual: 'diagram',
      focus: { metric: 'memberDB' },
      formula: 'A_y-P_1-\\frac{N_{DB}}{\\sqrt2}=0\\quad\\Rightarrow\\quad N_{DB}=-1{,}414\\ \\text{kN}',
    },
    {
      title: 'Siła w pręcie AB',
      narration:
        'Sumujemy momenty względem D, gdzie przecinają się proste DB i DE. Ich momenty znikają, więc zostaje NAB i reakcja Ay. Ramię NAB wynosi 2 m, a Ay także 2 m: 2NAB − 2·7 = 0, czyli NAB = +7 kN. Dolny pas jest rozciągany.',
      caption: 'NAB = +7,00 kN — rozciąganie.',
      visual: 'diagram',
      focus: { metric: 'memberAB' },
      formula: '2N_{AB}-2\\cdot7=0\\quad\\Rightarrow\\quad N_{AB}=+7\\ \\text{kN}',
    },
    {
      title: 'Siła w pręcie DE i kontrola',
      narration:
        'Momenty względem B eliminują AB i DB. Zostaje −4·7 + 2·8 − 2NDE = 0, więc NDE = −6 kN. Kontrola rzutów lewej części: poziomo 7 − 1 − 6 = 0, pionowo 7 − 8 + 1 = 0. Znaki i wartości są spójne.',
      caption: 'NDE = −6,00 kN; rzuty poziomy i pionowy potwierdzają wynik.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '-4\\cdot7+2\\cdot8-2N_{DE}=0\\Rightarrow N_{DE}=-6\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
