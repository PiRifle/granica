import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-force-diagrams-3',
  title: 'Wykres siły osiowej N — przykład 3',
  duration: 7,
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
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Załóżmy, że znamy wykres siły osiowej, a chcemy odtworzyć obciążenia zewnętrzne i dobrać pola przekroju. Pręt ma trzy odcinki po 0,5 m: przy utwierdzeniu N_1=+12 kN, w środku N_2=-8 kN, przy swobodnym końcu N_3=+4 kN.',
      caption:
        'Załóżmy, że znamy wykres siły osiowej, a chcemy odtworzyć obciążenia zewnętrzne i dobrać pola przekroju. Pręt ma trzy odcinki po…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '0{,}5\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Zaczynamy od wolnego końca. Siła na końcu musi wynosić 4 kN w prawo, bo tylko ona równoważy N_3=+4 kN. Na granicy drugiego i trzeciego odcinka N zmienia się z -8 na +4 kN, czyli rośnie o 12 kN. Ze związku Δ N=-P wynika P=-12 kN, a więc siła 12 kN w lewo.',
      caption:
        'Zaczynamy od wolnego końca. Siła na końcu musi wynosić 4 kN w prawo, bo tylko ona równoważy N_3=+4 kN. Na granicy drugiego i…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '4\\ \\text{kN}',
    },
    {
      title: 'Krok 3',
      narration:
        'Na granicy pierwszego i drugiego odcinka N zmienia się z +12 na -8 kN, czyli maleje o 20 kN. Stąd P=+20 kN, czyli siła 20 kN w prawo. Suma obciążeń zewnętrznych wynosi 20-12+4=12 kN w prawo, więc reakcja utwierdzenia ma 12 kN w lewo. Zgadza się to z N_1=+12 kN.',
      caption:
        'Na granicy pierwszego i drugiego odcinka N zmienia się z +12 na -8 kN, czyli maleje o 20 kN. Stąd P=+20 kN, czyli siła 20 kN w…',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N',
    },
    {
      title: 'Krok 4',
      narration:
        'Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy, ale drugi jest ściskany, więc dla niego trzeba dodatkowo sprawdzić wyboczenie. Widać, że dobór przekroju wymaga nie tylko znajomości N, ale też znaku i długości odcinka.',
      caption:
        'Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy,…',
      visual: 'axial',
      focus: { metric: 'A' },
      formula: '\\sigma_{\\mathrm{dop}}=120\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
