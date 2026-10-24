import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-tensor-2',
  title: 'Tensor naprężenia: mapa sił w punkcie — przykład 2',
  duration: 7,
  given: ['σ_x = σ_y = σ_z = -50 MPa'],
  result:
    'Warto zauważyć, że w tym stanie naprężenia normalne są ujemne na każdej płaszczyźnie. Nie oznacza to, że materiał jest „ściskany tylko w jednym kierunku”. Ściskanie jest jednakowe we wszystkich kierunkach, więc każda ścianka jest ściskana tak samo. Taki stan odpowiada ciśnieniu hydrostatycznemu i jest dobrym testem konwencji znaków: jeśli w którymś rachunku pojawi się dodatnie naprężenie normalne, gdzieś zgubiono minus.',
  figure: {
    kind: 'cube',
    stresses: { x: -50, y: -50, z: -50 },
    values: [
      { label: 'σ_x', value: '−50 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−50 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_z', value: '−50 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_n', value: '−50 MPa', focus: 'stress' },
      { label: 'τ', value: '0 MPa', focus: 'stress' },
    ],
    note: 'Stan hydrostatyczny: tensor jest wielokrotnością macierzy jednostkowej, więc nie ma wyróżnionego kierunku.',
  },
  scenes: [
    {
      title: 'Tensor naprężenia',
      narration:
        'Rozważmy stan hydrostatyczny: σ_x=σ_y=σ_z=-50 MPa, a wszystkie naprężenia styczne są zerowe. Macierz jest więc mnożeniem macierzy jednostkowej przez -50 MPa.',
      caption: 'Hydrostatyczne ściskanie w trzech prostopadłych kierunkach.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=\\sigma_y=\\sigma_z=-50\\ \\text{MPa},\\quad \\tau_{xy}=\\tau_{yz}=\\tau_{zx}=0',
    },
    {
      title: 'Trakcja na dowolnej płaszczyźnie',
      narration:
        'Dla dowolnej normalnej n trakcja wynosi T=-50n. Wektor trakcji jest zawsze prostopadły do płaszczyzny i skierowany do wnętrza materiału.',
      caption: 'Trakcja jest równoległa do normalnej, więc nie ma składowej stycznej.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\mathbf{T}=-50\\,\\mathbf{n}\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie normalne i styczne',
      narration:
        'Naprężenie normalne na każdej płaszczyźnie wynosi -50 MPa, a styczne jest zerowe. W tym stanie każda płaszczyzna jest płaszczyzną główną.',
      caption: 'Każdy kierunek można nazwać głównym.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=-50\\ \\text{MPa},\\quad \\tau=0\\ \\text{MPa}',
    },
    {
      title: 'Skutek mechaniczny',
      narration:
        'Hydrostatyczne ściskanie zmienia objętość, ale nie powoduje ścinania. Dlatego materiały ciągliwe znoszą je zwykle znacznie lepiej niż rozciąganie.',
      caption: 'Brak ścinania oznacza brak wyróżnionego kierunku zniszczenia.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=0\\quad\\Rightarrow\\quad\\text{brak wyróżnionego kierunku}',
    },
    {
      title: 'Sprawdzenie rachunkowe',
      narration:
        'Dla n=(0,6;0,8;0) trakcja to (-30;-40;0) MPa. Rzut na normalną daje -30·0,6-40·0,8=-18-32=-50 MPa. Długość trakcji wynosi 50 MPa, więc część styczna jest zerowa.',
      caption: 'Ten sam wynik otrzymamy dla każdej innej normalnej.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\mathbf{n}=(0{,}6;0{,}8;0),\\quad \\mathbf{T}=(-30;-40;0)\\ \\text{MPa}',
    },
    {
      title: 'Kontrola znaków',
      narration:
        'Taki stan odpowiada ciśnieniu hydrostatycznemu i jest dobrym testem konwencji znaków: jeśli w którymś rachunku pojawi się dodatnie naprężenie normalne, gdzieś zgubiono minus.',
      caption: 'Wszystkie naprężenia normalne pozostają ujemne.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_n=-50\\ \\text{MPa}<0',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'W tym stanie naprężenia normalne są ujemne na każdej płaszczyźnie. Nie oznacza to, że materiał jest ściskany tylko w jednym kierunku — ściskanie jest jednakowe we wszystkich kierunkach.',
      caption: 'Stan hydrostatyczny jest izotropowy w sensie kierunku.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\boxed{\\sigma_x=\\sigma_y=\\sigma_z=-50\\ \\text{MPa},\\quad \\sigma_n=-50\\ \\text{MPa},\\quad \\tau=0}',
    },
  ],
} satisfies SolutionData
