import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-reduced-stress-3',
  title: 'Naprężenie zredukowane: jedna liczba dla złożonego stanu — przykład 3',
  duration: 7,
  given: ['d = 50 mm', 'M = 0,8 kN', 'Re = 355 MPa', 'n_wym = 2,0'],
  result:
    'Sprawdzenie: dla T = 2,34 kN·m otrzymujemy τ = 95,3 MPa i σHMH = √(65,19² + 3·95,3²) = 177,5 MPa, czyli dokładnie kr. Gdyby zastosować Tresca, dopuszczalny moment byłby mniejszy, bo przy tym samym τ daje większe wytężenie. To dobry przykład na to, że wybór hipotezy wpływa nie tylko na ocenę, ale też na dopuszczalne obciążenie.',
  figure: {
    kind: 'cube',
    stresses: { x: 65.19, y: 0, z: 0 },
    strains: { x: 0.00032595, y: -0.00009779, z: -0.00009779 },
    volumeChange: '0,013%',
    values: [
      { label: 'd', value: '50 mm', focus: 'stress', reveal: 0 },
      { label: 'M', value: '0,8 kN·m', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '355 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'W', value: '12 271,8 mm³', focus: 'stress' },
      { label: 'σ', value: '65,19 MPa', focus: 'stress' },
      { label: 'k_r', value: '177,5 MPa', focus: 'stress' },
      { label: 'τ', value: '95,3 MPa', focus: 'stress' },
      { label: 'W_o', value: '24 543,7 mm³', focus: 'stress' },
      { label: 'T', value: '2,34 kN·m', focus: 'stress' },
      { label: 'σ_HMH', value: '177,5 MPa', focus: 'stress' },
      { label: 'ε_x', value: '326 με', focus: 'strain' },
      { label: 'γ_xy', value: '1239 μrad', focus: 'strain' },
      { label: 'θ', value: '130,4 με', focus: 'volume' },
    ],
    note: 'Dopuszczalny moment skręcający wynika z warunku HMH przy zadanym zapasie, a nie z samego naprężenia dopuszczalnego.',
  },
  scenes: [
    {
      title: 'Zapisz dane projektowe',
      narration:
        'Pręt o średnicy 50 mm jest zginany momentem M = 0,8 kN·m. Materiał ma R_e = 355 MPa, a wymagany zapas n_wym = 2,0. Przyjmujemy hipotezę HMH i szukamy maksymalnego momentu T.',
      caption: 'd = 50 mm, M = 0,8 kN·m, R_e = 355 MPa, n_wym = 2,0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'd=50\\,\\text{mm},\\qquad M=0{,}8\\,\\text{kN·m},\\qquad R_e=355\\,\\text{MPa},\\qquad n_{wym}=2{,}0',
    },
    {
      title: 'Oblicz naprężenie od zginania',
      narration:
        'Wskaźnik zginania wynosi W = π·50³/32 = 12 271,8 mm³, więc σ = 0,8·10⁶/12 271,8 = 65,19 MPa. Naprężenie dopuszczalne to k_r = 355/2 = 177,5 MPa.',
      caption: 'W = 12 271,8 mm³, σ = 65,19 MPa, k_r = 177,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'W=\\frac{\\pi\\cdot50^3}{32}=12\\,271{,}8\\,\\text{mm}^3,\\qquad \\sigma=\\frac{0{,}8\\cdot10^6}{12\\,271{,}8}=65{,}19\\,\\text{MPa},\\qquad k_r=\\frac{355}{2}=177{,}5\\,\\text{MPa}',
    },
    {
      title: 'Zapisz warunek HMH',
      narration:
        'Warunek ma postać √(σ² + 3τ²) ≤ k_r, czyli 3τ² ≤ k_r² − σ². Podstawiamy k_r² = 31 506,3 i σ² = 4 249,7.',
      caption: '3τ² ≤ 31 506,3 − 4 249,7.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '3\\tau^2\\le k_r^2-\\sigma^2=31\\,506{,}3-4\\,249{,}7',
    },
    {
      title: 'Wyznacz dopuszczalne τ',
      narration: 'Stąd 3τ² ≤ 27 256,6, więc τ² ≤ 9 085,5 i τ ≤ 95,3 MPa. Wskaźnik skręcania W_o = 2W = 24 543,7 mm³.',
      caption: 'τ ≤ 95,3 MPa, W_o = 24 543,7 mm³.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '3\\tau^2\\le27\\,256{,}6,\\qquad \\tau^2\\le9\\,085{,}5,\\qquad \\tau\\le95{,}3\\,\\text{MPa},\\qquad W_o=24\\,543{,}7\\,\\text{mm}^3',
    },
    {
      title: 'Oblicz dopuszczalny moment i sprawdź wynik',
      narration:
        'T = τ·W_o = 95,3·24 543,7 = 2,34·10⁶ N·mm = 2,34 kN·m. Przy tej wartości σ_HMH = √(65,19² + 3·95,3²) = 177,5 MPa, czyli dokładnie k_r.',
      caption: 'T = 2,34 kN·m, σ_HMH = 177,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'T=95{,}3\\cdot24\\,543{,}7=2{,}34\\cdot10^6\\,\\text{N·mm}=2{,}34\\,\\text{kN·m},\\qquad \\sigma_{HMH}=\\sqrt{65{,}19^2+3\\cdot95{,}3^2}=177{,}5\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = 326 με, ε_y = ε_z ≈ −97,8 με, γ_xy ≈ 1239 μrad i θ = 130,4 με.',
      caption: 'ε_x = 326 με, γ_xy = 1239 μrad, θ = 130,4 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=326\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=1239\\,\\mu\\text{rad},\\qquad \\theta=326-97{,}8-97{,}8=130{,}4\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 130,4 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=130{,}4\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
