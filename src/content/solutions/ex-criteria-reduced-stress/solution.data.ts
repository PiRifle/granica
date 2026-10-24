import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-reduced-stress',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN', 'T = 800 N', 'Re = 235 MPa', 'n_wym = 2,0'],
  result:
    'Obie hipotezy dają wynik poniżej kr = 117,5 MPa, więc warunek jest spełniony. Większe wytężenie daje Tresca: 77,1 MPa i zapas około 3,05. HMH daje 74,7 MPa i zapas około 3,14. Do oceny konstrukcji trzeba konsekwentnie używać jednej hipotezy.',
  figure: {
    kind: 'cube',
    stresses: { x: 67.2, y: 0, z: 0 },
    strains: { x: 0.000336, y: -0.0001008, z: -0.0001008 },
    volumeChange: '0,01344%',
    values: [
      { label: 'd', value: '60 mm', focus: 'stress', reveal: 0 },
      { label: 'N', value: '30 kN', focus: 'stress', reveal: 0 },
      { label: 'M', value: '1,2 kN·m', focus: 'stress', reveal: 0 },
      { label: 'T', value: '800 N·m', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '117,5 MPa', focus: 'stress' },
      { label: 'A', value: '2 827,4 mm²', focus: 'stress' },
      { label: 'σ_N', value: '10,61 MPa', focus: 'stress' },
      { label: 'σ_M', value: '56,59 MPa', focus: 'stress' },
      { label: 'σ_x', value: '67,20 MPa', focus: 'stress' },
      { label: 'τ', value: '18,86 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '74,72 MPa', focus: 'stress' },
      { label: 'σ_T', value: '77,06 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '3,14', focus: 'stress' },
      { label: 'n_T', value: '3,05', focus: 'stress' },
      { label: 'ε_x', value: '336 με', focus: 'strain' },
      { label: 'γ_xy', value: '245,2 μrad', focus: 'strain' },
      { label: 'θ', value: '134,4 με', focus: 'volume' },
    ],
    note: 'Naprężenie zredukowane sprowadza złożony stan do jednej liczby, ale wynik zależy od przyjętej hipotezy.',
  },
  scenes: [
    {
      title: 'Zapisz obciążenia i materiał',
      narration:
        'Pręt o średnicy 60 mm jest rozciągany siłą N = 30 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 800 N·m. Materiał ma R_e = 235 MPa, a wymagany zapas n_wym = 2,0.',
      caption: 'd = 60 mm, N = 30 kN, M = 1,2 kN·m, T = 800 N·m.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'd=60\\,\\text{mm},\\qquad N=30\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=800\\,\\text{N·m}',
    },
    {
      title: 'Oblicz pole przekroju',
      narration: 'Pole przekroju kołowego wynosi A = πd²/4 = π·60²/4 = 2 827,4 mm².',
      caption: 'A = 2 827,4 mm².',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot60^2}{4}=2\\,827{,}4\\,\\text{mm}^2',
    },
    {
      title: 'Oblicz naprężenie od siły osiowej',
      narration: 'Naprężenie od siły osiowej wynosi σ_N = 30 000/2 827,4 = 10,61 MPa.',
      caption: 'σ_N = 10,61 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_N=\\frac{30\\,000}{2\\,827{,}4}=10{,}61\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie od zginania',
      narration: 'Wskaźnik zginania to W = πd³/32 = 21 205,8 mm³. Stąd σ_M = 1,2·10⁶/21 205,8 = 56,59 MPa.',
      caption: 'W = 21 205,8 mm³, σ_M = 56,59 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'W=\\frac{\\pi d^3}{32}=21\\,205{,}8\\,\\text{mm}^3,\\qquad \\sigma_M=\\frac{1{,}2\\cdot10^6}{21\\,205{,}8}=56{,}59\\,\\text{MPa}',
    },
    {
      title: 'Zsumuj naprężenia normalne',
      narration: 'W badanym włóknie σ_x = σ_N + σ_M = 10,61 + 56,59 = 67,20 MPa.',
      caption: 'σ_x = 67,20 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=10{,}61+56{,}59=67{,}20\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie styczne',
      narration:
        'Wskaźnik skręcania W_o = 2W = 42 411,5 mm³. Naprężenie styczne wynosi τ = 800 000/42 411,5 = 18,86 MPa.',
      caption: 'τ = 18,86 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'W_o=2W=42\\,411{,}5\\,\\text{mm}^3,\\qquad \\tau=\\frac{800\\,000}{42\\,411{,}5}=18{,}86\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie HMH',
      narration: 'HMH dla płaskiego stanu naprężenia wynosi √(67,20² + 3·18,86²) = √(4 515,8 + 1 067,1) = 74,72 MPa.',
      caption: 'σ_HMH = 74,72 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}=\\sqrt{4\\,515{,}8+1\\,067{,}1}=74{,}72\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie Tresca',
      narration: 'Tresca daje √(67,20² + 4·18,86²) = √(4 515,8 + 1 422,8) = 77,06 MPa, czyli więcej niż HMH.',
      caption: 'σ_T = 77,06 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_T=\\sqrt{67{,}20^2+4\\cdot18{,}86^2}=\\sqrt{4\\,515{,}8+1\\,422{,}8}=77{,}06\\,\\text{MPa}',
    },
    {
      title: 'Oblicz zapasy bezpieczeństwa',
      narration:
        'Naprężenie dopuszczalne wynosi k_r = 235/2 = 117,5 MPa. Zapasy to n_HMH = 235/74,72 = 3,14 i n_T = 235/77,06 = 3,05.',
      caption: 'n_HMH = 3,14, n_T = 3,05.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'k_r=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad n_{HMH}=\\frac{235}{74{,}72}=3{,}14,\\qquad n_T=\\frac{235}{77{,}06}=3{,}05',
    },
    {
      title: 'Sprawdź odkształcenia i objętość',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = 336 με, ε_y = −100,8 με i γ_xy = 245,2 μrad. Ślad tensora 134,4 με oznacza niewielki wzrost objętości.',
      caption: 'ε_x = 336 με, γ_xy = 245,2 μrad, θ = 134,4 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=336\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-100{,}8\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=245{,}2\\,\\mu\\text{rad},\\qquad \\theta=134{,}4\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 134,4 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=134{,}4\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
