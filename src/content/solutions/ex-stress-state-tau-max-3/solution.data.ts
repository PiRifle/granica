import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tau-max-3',
  title: 'Maksymalne ścinanie: płaskie i absolutne — przykład 3',
  duration: 7,
  given: ['R = 40 MPa', 'τ_max abs = 60 MPa', 'σ_x = 104 MPa'],
  result:
    'Wariant ściskający dałby σ_I=0, σ_II=-40 i σ_III=-120 MPa przy tej samej wartości R=40 i tym samym absolutnym maksimum 60 MPa. Wtedy jednak średnia byłaby ujemna, a σ_x=104 MPa leży poza przedziałem od -120 do -40 MPa, więc taki stan nie jest zgodny z pomiarem.',
  figure: {
    kind: 'cube',
    stresses: { x: 104, y: 56, z: 0 },
    values: [
      { label: 'R', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_max abs', value: '60 MPa', focus: 'principal', reveal: 0 },
      { label: 'σ_x', value: '104 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_I', value: '120 MPa', focus: 'principal' },
      { label: 'σ_II', value: '40 MPa', focus: 'principal' },
      { label: 'σ_y', value: '56 MPa', focus: 'stress' },
      { label: '|τ_xy|', value: '32 MPa', focus: 'stress' },
      { label: 'σ_avg', value: '80 MPa', focus: 'stress' },
    ],
    note: 'Dodatni wariant stanu: oba naprężenia płaskie są dodatnie, a zero jest najmniejszym naprężeniem głównym.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Z analizy koła wiadomo, że płaski promień wynosi R=40 MPa, a absolutne maksimum ścinania 60 MPa. Dodatkowo zmierzono σ_x=104 MPa.',
      caption: 'Zadanie odwrotne: z parametrów koła i jednej składowej odtworzyć stan.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R=40\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=60\\ \\text{MPa},\\quad \\sigma_x=104\\ \\text{MPa}',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'Ponieważ τ_max^abs jest większe od R, zero musi być naprężeniem skrajnym. Przy dodatnim σ_x i dodatniej średniej oba naprężenia płaskie są dodatnie. Z wzoru na absolutne maksimum mamy σ_I/2=60, więc σ_I=120 MPa. Promień w płaszczyźnie jest połową różnicy naprężeń płaskich, więc σ_I-σ_II=80 MPa i σ_II=40 MPa.',
      caption: 'Zero jest najmniejszym naprężeniem głównym.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_I=120\\ \\text{MPa},\\quad \\sigma_{II}=40\\ \\text{MPa},\\quad \\sigma_{III}=0',
    },
    {
      title: 'Średnia i σ_y',
      narration: 'Średnia wynosi (120+40)/2=80 MPa. Z definicji średniej (σ_x+σ_y)/2=80, więc σ_y=160-104=56 MPa.',
      caption: 'Ślad tensora pozwala wyznaczyć σ_y.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=80\\ \\text{MPa},\\quad \\sigma_y=160-104=56\\ \\text{MPa}',
    },
    {
      title: 'Połowa różnicy i τ_xy',
      narration:
        'Połowa różnicy to a=(104-56)/2=24 MPa. Z wzoru na promień 40^2=24^2+τ_xy^2, skąd |τ_xy|=√(1600-576)=32 MPa.',
      caption: 'Wartość bezwzględna τ_xy wynika z równania koła.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '|\\tau_{xy}|=\\sqrt{40^2-24^2}=32\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie',
      narration:
        'Sprawdzenie: średnia 80 MPa, promień √(24^2+32^2)=40 MPa, więc naprężenia główne to 120 i 40 MPa, a zero jest najmniejsze. Absolutne maksimum wynosi (120-0)/2=60 MPa.',
      caption: 'Wszystkie wartości są spójne.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sqrt{24^2+32^2}=40\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=\\frac{120-0}{2}=60\\ \\text{MPa}',
    },
    {
      title: 'Odrzucenie wariantu ściskającego',
      narration:
        'Wariant ściskający dałby σ_I=0, σ_II=-40 i σ_III=-120 MPa przy tej samej wartości R=40 i tym samym absolutnym maksimum 60 MPa. Wtedy średnia byłaby ujemna, a σ_x=104 MPa leży poza przedziałem od -120 do -40 MPa.',
      caption: 'Znak jednej składowej rozstrzyga, który matematycznie możliwy stan jest rzeczywisty.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '-120<-40\\ \\text{MPa}\\quad\\text{nie zawiera}\\quad\\sigma_x=104\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Odtworzony stan jest dodatni: σ_I=120 MPa, σ_II=40 MPa, σ_III=0. Zero jest najmniejszym naprężeniem głównym, dlatego absolutne maksimum ścinania wynosi 60 MPa.',
      caption: 'Dane są zgodne tylko z wariantem dodatnim.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_I=120\\ \\text{MPa},\\quad \\sigma_{II}=40\\ \\text{MPa},\\quad \\sigma_{III}=0,\\quad \\sigma_y=56\\ \\text{MPa},\\quad |\\tau_{xy}|=32\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
