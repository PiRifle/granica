import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-combined-loading-3',
  title: 'Zginanie, skręcanie i siła osiowa razem — przykład 3',
  duration: 7,
  given: ['M=1', 'T=0', 'R_e=235 MPa', 'n_{wym}=2', 'k=117'],
  result:
    'Trzeba też pamiętać, że średnica dobrana ze względu na wytrzymałość może nie wystarczyć ze względu na sztywność. Kąt skręcenia wału rośnie jak 1/d^4, więc kryterium sztywności bywa ostrzejsze dla długich wałów. W zadaniu projektowym liczymy oba warunki i wybieramy większą średnicę. To typowy przykład tego, że warunek wytrzymałości nie jest jedynym warunkiem projektu.',
  figure: {
    kind: 'cube',
    stresses: { x: 117.5, y: 0, z: 0 },
    strains: { x: 0.0005875, y: -0.00017625, z: -0.00017625 },
    volumeChange: '0,0235%',
    values: [
      { label: 'M', value: '1,2 kN·m', focus: 'stress', reveal: 0 },
      { label: 'T', value: '0,8 kN·m', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'k', value: '117,5 MPa', focus: 'stress' },
      { label: 'M_eq HMH', value: '1,386 kN·m', focus: 'stress' },
      { label: 'M_eq Tresca', value: '1,442 kN·m', focus: 'stress' },
      { label: 'W HMH', value: '11 796 mm³', focus: 'stress' },
      { label: 'W Tresca', value: '12 272 mm³', focus: 'stress' },
      { label: 'd HMH', value: '49,3 mm', focus: 'stress' },
      { label: 'd Tresca', value: '50,0 mm', focus: 'stress' },
      { label: 'σ_red HMH', value: '112,9 MPa', focus: 'stress' },
      { label: 'σ_red Tresca', value: '117,5 MPa', focus: 'stress' },
      { label: 'ε_x', value: '587,5 με', focus: 'strain' },
      { label: 'θ', value: '235 με', focus: 'volume' },
    ],
    note: 'Moment zastępczy pozwala sprowadzić zginanie ze skręcaniem do jednego momentu, ale tylko dla pełnego przekroju kołowego i bez siły osiowej.',
  },
  scenes: [
    {
      title: 'Zapisz dane projektowe',
      narration:
        'Projektujemy średnicę wału dla M = 1,2 kN·m i T = 0,8 kN·m, bez siły osiowej. Przyjmujemy R_e = 235 MPa i wymagany zapas n_wym = 2, więc naprężenie dopuszczalne wynosi k = 117,5 MPa.',
      caption: 'M = 1,2 kN·m, T = 0,8 kN·m, k = 117,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'M=1{,}2\\,\\text{kN·m},\\qquad T=0{,}8\\,\\text{kN·m},\\qquad k=\\frac{235}{2}=117{,}5\\,\\text{MPa}',
    },
    {
      title: 'Oblicz moment zastępczy HMH',
      narration:
        'Dla HMH można użyć momentu zastępczego M_eq = √(M² + 0,75T²). Po podstawieniu otrzymujemy √(1,44 + 0,48) = 1,386 kN·m.',
      caption: 'M_eq = 1,386 kN·m.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'M_{eq}=\\sqrt{M^2+0{,}75T^2}=\\sqrt{1{,}44+0{,}48}=1{,}386\\,\\text{kN·m}',
    },
    {
      title: 'Oblicz średnicę według HMH',
      narration:
        'Wymagany wskaźnik wynosi W ≥ M_eq/k = 1,386·10⁶/117,5 = 11 796 mm³. Stąd d = (32W/π)^(1/3) = 49,3 mm.',
      caption: 'W = 11 796 mm³, d = 49,3 mm.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'W=\\frac{1{,}386\\cdot10^6}{117{,}5}=11\\,796\\,\\text{mm}^3,\\qquad d=\\left(\\frac{32\\cdot11\\,796}{\\pi}\\right)^{1/3}=49{,}3\\,\\text{mm}',
    },
    {
      title: 'Oblicz moment zastępczy Tresca',
      narration:
        'Dla Tresca moment zastępczy to M_eq = √(M² + T²) = √(1,44 + 0,64) = 1,442 kN·m. Wymagany wskaźnik wynosi 12 272 mm³, a średnica 50,0 mm.',
      caption: 'M_eq = 1,442 kN·m, W = 12 272 mm³, d = 50,0 mm.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'M_{eq}=\\sqrt{1{,}44+0{,}64}=1{,}442\\,\\text{kN·m},\\qquad W=\\frac{1{,}442\\cdot10^6}{117{,}5}=12\\,272\\,\\text{mm}^3,\\qquad d=50{,}0\\,\\text{mm}',
    },
    {
      title: 'Sprawdź średnicę po zaokrągleniu',
      narration:
        'Po zaokrągleniu do 50 mm wskaźnik wynosi 12 272 mm³. Dla HMH σ_red = 1,386·10⁶/12 272 = 112,9 MPa, a dla Tresca około 117,5 MPa, czyli praktycznie na granicy k.',
      caption: 'σ_red = 112,9 MPa (HMH) lub 117,5 MPa (Tresca).',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{red}=\\frac{1{,}386\\cdot10^6}{12\\,272}=112{,}9\\,\\text{MPa},\\qquad \\sigma_{red}=\\frac{1{,}442\\cdot10^6}{12\\,272}=117{,}5\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź odkształcenia i objętość',
      narration:
        'Przy naprężeniu 117,5 MPa i stali E = 200 GPa otrzymujemy ε_x = 587,5 με, ε_y = ε_z ≈ −176,25 με, a θ = 235 με. Odkształcenia są małe, ale nie zerowe.',
      caption: 'ε_x = 587,5 με, θ = 235 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{117{,}5}{200\\,000}=587{,}5\\,\\mu\\varepsilon,\\qquad \\theta=587{,}5-176{,}25-176{,}25=235\\,\\mu\\varepsilon',
    },
    {
      title: 'Uwzględnij warunek sztywności',
      narration:
        'Średnica dobrana ze względu na wytrzymałość może nie wystarczyć ze względu na sztywność, bo kąt skręcenia rośnie jak 1/d⁴. W zadaniu projektowym liczymy oba warunki i wybieramy większą średnicę.',
      caption: 'Kontrola: dobór wytrzymałościowy nie zastępuje sprawdzenia sztywności.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\varphi=\\frac{TL}{GI_0},\\qquad I_0=\\frac{\\pi d^4}{32}',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 235 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=235\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
