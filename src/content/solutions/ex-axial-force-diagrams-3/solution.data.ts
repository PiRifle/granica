import type { SolutionData } from '../../model'
import { AxialForceInverseAnimation } from './animation'

export default {
  id: 'ex-axial-force-diagrams-3',
  title: 'Wykres siły osiowej N — przykład 3',
  duration: 8,
  given: ['N_1=+12 kN', 'N_2=-8 kN', 'N_3=+4 kN'],
  result:
    'Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy, ale drugi jest ściskany, więc dla niego trzeba dodatkowo sprawdzić wyboczenie. Widać, że dobór przekroju wymaga nie tylko znajomości N, ale też znaku i długości odcinka.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 500,
        area: 100,
        n: 12,
        sigma: 120,
      },
      {
        id: '2',
        label: '2',
        length: 500,
        area: 66.7,
        n: -8,
        sigma: -120,
      },
      {
        id: '3',
        label: '3',
        length: 500,
        area: 33.3,
        n: 4,
        sigma: 120,
      },
    ],
    loads: [
      {
        node: 1,
        value: 20,
        label: '20 kN',
      },
      {
        node: 2,
        value: 12,
        label: '12 kN',
      },
      {
        node: 3,
        value: 4,
        label: '4 kN',
      },
    ],
    note: 'Pola są minimalne z warunku σ_dop = 120 MPa.',
  },
  animation: AxialForceInverseAnimation,
  scenes: [
    {
      title: 'Wolny koniec — N_3 i siła 4 kN',
      narration:
        'Znamy wykres siły osiowej: na trzech odcinkach po 0,5 m wartości wynoszą N₁ = +12 kN, N₂ = −8 kN i N₃ = +4 kN. Zaczynamy od wolnego końca. Siła na końcu musi wynosić 4 kN w prawo, bo tylko ona równoważy N₃ = +4 kN.',
      caption: 'Rysujemy N₃ od osi do +4 kN i wracamy do zera na swobodnym końcu. Siła końcowa ma 4 kN w prawo.',
      visual: 'axial',
      focus: { metric: 'N', segment: '3' },
      formula: 'N_{3} = +4\\ \\text{kN},\\quad P_{3} = +4\\ \\text{kN}',
    },
    {
      title: 'Skok o 12 kN — odcinek 2',
      narration:
        'Na granicy drugiego i trzeciego odcinka N zmienia się z −8 na +4 kN, czyli rośnie o 12 kN. Ze związku ΔN = −P wynika P = −12 kN, a więc siła 12 kN w lewo. Dorysowujemy odcinek N₂ = −8 kN.',
      caption: 'Skok wykresu o 12 kN odpowiada sile 12 kN w lewo; środkowy odcinek jest ściskany.',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'N_{2} = -8\\ \\text{kN},\\quad P_{2} = -12\\ \\text{kN}',
    },
    {
      title: 'Skok o 20 kN i reakcja',
      narration:
        'Na granicy pierwszego i drugiego odcinka N zmienia się z +12 na −8 kN, czyli maleje o 20 kN. Stąd P = +20 kN, czyli siła 20 kN w prawo. Suma obciążeń zewnętrznych wynosi 20 − 12 + 4 = 12 kN w prawo, więc reakcja utwierdzenia ma 12 kN w lewo. Zgadza się to z N₁ = +12 kN.',
      caption: 'Ostatni skok zamyka wykres; reakcja 12 kN w lewo potwierdza wartość N₁ przy utwierdzeniu.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_{1} = +12\\ \\text{kN},\\quad R_{A} = 12\\ \\text{kN}\\ (\\leftarrow)',
    },
    {
      title: 'Dobór pól przekroju',
      narration:
        'Przy naprężeniu dopuszczalnym σ_dop = 120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm². Przekrój pręta zmienia się więc skokowo: największe pole jest przy utwierdzeniu, najmniejsze na swobodnym końcu.',
      caption: 'Pola wynikają z A = |N|/σ_dop. Rysujemy rzeczywiste, różne przekroje trzech odcinków.',
      visual: 'axial',
      focus: { metric: 'A' },
      formula:
        'A_{i} = \\frac{|N_{i}|}{\\sigma_{dop}},\\quad A_{1} = 100\\ \\text{mm}^{2},\\quad A_{2} = 66{,}7\\ \\text{mm}^{2},\\quad A_{3} = 33{,}3\\ \\text{mm}^{2}',
    },
    {
      title: 'Kontrola ściskanego odcinka',
      narration:
        'Ostatni odcinek jest najcieńszy, ale drugi jest ściskany, więc dla niego trzeba dodatkowo sprawdzić wyboczenie. Dobór przekroju wymaga nie tylko znajomości N, ale też znaku i długości odcinka.',
      caption:
        'Ujemne N₂ oznacza ściskanie. Sam warunek naprężeń nie wystarcza — smukły odcinek trzeba sprawdzić na wyboczenie.',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'N_{2} < 0\\Rightarrow\\text{ściskanie i wyboczenie}',
    },
  ],
} satisfies SolutionData
