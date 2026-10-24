import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-saint-venant',
  title: 'Zasada Saint-Venanta: dystans od detalu — przykład 1',
  duration: 7,
  given: ['b = 80 mm', 't = 8 mm', 'd = 16 mm', 'P = 64 kN', 'K_t ≈ 3'],
  result:
    'σ_nom = 125 MPa na przekroju netto, a σ_max ≈ 375 MPa jako górne oszacowanie przy K_t ≈ 3. Lokalne uplastycznienie jest możliwe, więc wynik traktuj jako sygnał do dokładniejszej analizy, a nie jako dokładną wartość naprężenia w otworze.',
  figure: {
    kind: 'section',
    width: 80,
    height: 48,
    parts: [{ x: 0, y: 0, width: 80, height: 48, label: 'taśma', tone: 'light' }],
    holes: [{ cx: 40, cy: 24, r: 8, label: '∅16' }],
    values: [
      { label: 'b', value: '80 mm', focus: 'section', reveal: 0 },
      { label: 't', value: '8 mm', focus: 'section', reveal: 0 },
      { label: 'd', value: '16 mm', focus: 'section', reveal: 0 },
      { label: 'P', value: '64,0 kN', focus: 'section', reveal: 0 },
      { label: 'A_net', value: '512 mm²', focus: 'section' },
      { label: 'σ_nom', value: '125 MPa', focus: 'stress' },
      { label: 'σ_max', value: '375 MPa', focus: 'stress' },
      { label: 'σ_brutto', value: '100 MPa', focus: 'stress' },
    ],
    note: 'Rysunek jest schematyczny: otwór ∅16 mm pokazano na taśmie o szerokości 80 mm. Pole netto odnosi się do grubości t = 8 mm.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Taśma o szerokości b = 80 mm i grubości t = 8 mm ma otwór o średnicy d = 16 mm. Jest rozciągana siłą P = 64 kN. Oszacujemy naprężenie nominalne na przekroju netto oraz maksymalne naprężenie przy otworze.',
      caption: 'Taśma z otworem osiowym poddana rozciąganiu.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'b=80\\ \\text{mm},\\quad t=8\\ \\text{mm},\\quad d=16\\ \\text{mm},\\quad P=64\\ \\text{kN}',
    },
    {
      title: 'Pole przekroju netto',
      narration:
        'Otwór zmniejsza szerokość czynną przekroju z 80 mm do 80 − 16 = 64 mm. Mnożąc przez grubość 8 mm, otrzymujemy pole netto 512 mm².',
      caption: 'A_net = (80 − 16) · 8 = 512 mm².',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_{\\text{net}}=(b-d)t=(80-16)\\cdot8=512\\ \\text{mm}^2',
    },
    {
      title: 'Przeliczenie siły',
      narration:
        'Do obliczenia naprężenia w MPa wygodnie jest podać siłę w niutonach. 64 kN to 64 000 N. Pole jest już w mm², więc iloraz od razu da N/mm², czyli MPa.',
      caption: 'P = 64 000 N.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'P=64\\ \\text{kN}=64\\,000\\ \\text{N}',
    },
    {
      title: 'Naprężenie nominalne',
      narration:
        'Dzielimy siłę przez pole netto: 64 000 / 512 = 125 MPa. To naprężenie średnie na przekroju osłabionym otworem, a nie maksymalne naprężenie przy krawędzi otworu.',
      caption: 'σ_nom = 125 MPa na przekroju netto.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\text{nom}}=\\frac{64\\,000}{512}=125\\ \\text{MPa}',
    },
    {
      title: 'Koncentracja naprężeń',
      narration:
        'Przy otworze naprężenie rośnie lokalnie. Dla typowego otworu w rozciąganej taśmie przyjmujemy K_t ≈ 3. Maksymalne naprężenie wynosi więc około 3 · 125 = 375 MPa.',
      caption: 'σ_max ≈ 375 MPa przy krawędzi otworu.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}\\approx K_t\\sigma_{\\text{nom}}=3\\cdot125=375\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie brutto',
      narration:
        'Dla porównania naprężenie w przekroju bez otworu wynosi 64 000 / (80 · 8) = 100 MPa. Różnica między 100 MPa i 125 MPa wynika z mniejszego pola netto, a nie z koncentracji.',
      caption: 'σ_brutto = 100 MPa, σ_nom = 125 MPa.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '\\frac{64\\,000}{80\\cdot8}=100\\ \\text{MPa}',
    },
    {
      title: 'Ocena lokalnego uplastycznienia',
      narration:
        'Typowa granica plastyczności stali konstrukcyjnej wynosi około 235 MPa. Lokalne naprężenie 375 MPa przekracza ją, więc możliwe jest miejscowe uplastycznienie. Sprężysty wzór z K_t jest wtedy tylko oszacowaniem górnym.',
      caption: '375 MPa > 235 MPa — możliwe lokalne uplastycznienie.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '375\\ \\text{MPa}>235\\ \\text{MPa}',
    },
    {
      title: 'Zasięg zaburzeń',
      narration:
        'W odległości około trzech średnic otworu, czyli mniej więcej 48 mm, rozkład naprężeń wraca w przybliżeniu do nominalnego. Tam można używać σ = N/A, ale nie przy samej krawędzi otworu.',
      caption: 'Po około 3d = 48 mm rozkład naprężeń jest bliski równomiernemu.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '3d=3\\cdot16=48\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
