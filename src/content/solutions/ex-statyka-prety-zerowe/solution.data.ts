import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-prety-zerowe',
  title: 'Pręty zerowe w kratownicy z pionowym zastrzałem',
  duration: 6,
  given: [
    'Węzły A = (0, 0), B = (4, 0), C = (8, 0), D = (4, 4) m',
    'Pręty AB, BC, AD, CD oraz pionowy BD',
    'Podpora przegubowa w A, podpora przesuwna w C',
    'Obciążenie P = 12 kN w węźle D, pionowo w dół',
  ],
  result:
    'Pręt BD jest zerowy. Pozostałe siły: NAD = NCD = −8,49 kN (ściskanie) oraz NAB = NBC = +6,00 kN (rozciąganie). Zero w nieobciążonym węźle B od razu usuwa jedną niewiadomą.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ZeroMembersAnimation }))),
  scenes: [
    {
      title: 'Model kratownicy',
      narration:
        'Kratownica składa się z dwóch trójkątów połączonych w węźle B. W węźle D działa pionowe obciążenie 12 kN, a podpory w A i C są symetryczne. Zanim napiszemy równania, uporządkujmy schemat i sprawdźmy, gdzie węzły nie są obciążone.',
      caption: 'Symetryczna kratownica z obciążeniem w środkowym węźle górnym.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0),\\quad B=(4,0),\\quad C=(8,0),\\quad D=(4,4)\\ \\text{m},\\qquad P=12\\ \\text{kN}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Geometria i obciążenie są symetryczne, więc reakcje pionowe rozkładają się po połowie: Ay = Cy = 6 kN. Nie ma obciążenia poziomego, więc Ax = 0.',
      caption: 'Ay = Cy = 6 kN, Ax = 0.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula: 'A_x=0,\\qquad A_y=C_y=\\frac{12}{2}=6\\ \\text{kN}',
    },
    {
      title: 'Reguła dla węzła B',
      narration:
        'W węźle B spotykają się dwa współliniowe pasy AB i BC oraz pionowy pręt BD. Węzeł nie jest obciążony, więc rzut na kierunek prostopadły do pasów eliminuje oba pasy i wymusza NBD = 0. To druga reguła prętów zerowych.',
      caption: 'NBD = 0 — trzeci pręt w nieobciążonym węźle z parą współliniową.',
      visual: 'diagram',
      focus: { metric: 'zeroRule' },
      formula: 'N_{AB}\\vec e+N_{BC}(-\\vec e)+N_{BD}\\vec e_\\perp=\\vec 0\\quad\\Rightarrow\\quad N_{BD}=0',
    },
    {
      title: 'Węzeł D po usunięciu zera',
      narration:
        'Po pominięciu BD węzeł D ma tylko dwa pręty ukośne i obciążenie 12 kN. Każdy pręt jest pod 45°, bo rzut poziomy i wysokość wynoszą po 4 m. Z symetrii NAD = NCD = N, a pionowa równowaga daje −2N sin45° − 12 = 0, czyli N = −8,49 kN.',
      caption: 'NAD = NCD = −8,49 kN — ściskanie.',
      visual: 'diagram',
      focus: { metric: 'nodeD' },
      formula: '-2N\\sin45^\\circ-12=0\\quad\\Rightarrow\\quad N=-8{,}49\\ \\text{kN}',
    },
    {
      title: 'Węzeł A — dolny pas',
      narration:
        'Siła w AD ma składowe (−6,00; −6,00) kN. Reakcja Ay = 6 kN zeruje składową pionową, a w poziomie zostaje NAB − 6 = 0. Dolny pas jest rozciągany z siłą +6 kN. Z symetrii NBC = +6 kN.',
      caption: 'NAB = NBC = +6,00 kN — rozciąganie.',
      visual: 'diagram',
      focus: { metric: 'nodeA' },
      formula: 'N_{AB}-6=0\\quad\\Rightarrow\\quad N_{AB}=+6{,}00\\ \\text{kN},\\qquad N_{BC}=+6{,}00\\ \\text{kN}',
    },
    {
      title: 'Kontrola i pełny obraz sił',
      narration:
        'W węźle B pasy ciągną w przeciwne strony z siłą 6 kN, a zerowy BD nie wnosi nic. W węźle C symetria domyka rachunek. Pręt zerowy zostaje na schemacie jako informacja: w tym stanie obciążenia nie przenosi siły, ale nadal jest częścią konstrukcji.',
      caption: 'Zero, ściskanie i rozciąganie na jednym schemacie — bez pomijania zera w wyniku.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'N_{BD}=0,\\qquad N_{AD}=N_{CD}=-8{,}49\\ \\text{kN},\\qquad N_{AB}=N_{BC}=+6{,}00\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
