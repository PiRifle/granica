import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-hmh-3',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 3',
  duration: 7,
  given: ['σ = 60 MPa', 'Re = 235 MPa', 'n = 2,0'],
  result:
    'Odpowiedź: według HMH dopuszczalne naprężenie styczne wynosi około 58,3 MPa. To przykład na to, że wariant odwrotny wymaga nie tylko przekształcenia wzoru, ale też świadomego wyboru hipotezy. Wynik 58,3 MPa nie jest „prawdziwym” naprężeniem granicznym materiału; jest granicą wynikającą z przyjętego modelu i wymaganego zapasu.',
  figure: {
    kind: 'cube',
    stresses: { x: 60, y: 0, z: 0 },
    strains: { x: 0.0005312, y: -0.0003212, z: -0.00009 },
    volumeChange: '0,012%',
    values: [
      { label: 'σ', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '117,5 MPa', focus: 'stress' },
      { label: 'τ_dop HMH', value: '58,3 MPa', focus: 'stress' },
      { label: 'τ_dop Tresca', value: '50,5 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '117,5 MPa', focus: 'stress' },
      { label: 'σ_1', value: '95,57 MPa', focus: 'stress' },
      { label: 'σ_2', value: '−35,57 MPa', focus: 'stress' },
      { label: 'ε_1', value: '531,2 με', focus: 'strain' },
      { label: 'ε_2', value: '−321,2 με', focus: 'strain' },
      { label: 'ε_3', value: '−90 με', focus: 'strain' },
      { label: 'θ', value: '120 με', focus: 'volume' },
    ],
    note: 'Dopuszczalne τ wynika z warunku HMH przy zadanym zapasie, a nie z „granicy ścinania” materiału.',
  },
  scenes: [
    {
      title: 'Zapisz dane i pytanie',
      narration:
        'Punkt jest rozciągany naprężeniem σ = 60 MPa i ścinany naprężeniem τ. Materiał ma R_e = 235 MPa, a wymagany zapas n = 2,0. Pytamy, jakie maksymalne τ dopuszcza HMH.',
      caption: 'σ = 60 MPa, R_e = 235 MPa, n = 2,0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=60\\,\\text{MPa},\\qquad R_e=235\\,\\text{MPa},\\qquad n=2{,}0',
    },
    {
      title: 'Oblicz naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wynosi k_r = R_e/n = 235/2 = 117,5 MPa. Warunek HMH ma postać √(60² + 3τ²) ≤ 117,5.',
      caption: 'k_r = 117,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'k_r=\\frac{R_e}{n}=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad \\sqrt{60^2+3\\tau^2}\\le117{,}5',
    },
    {
      title: 'Wyznacz maksymalne τ',
      narration:
        'Po podniesieniu do kwadratu: 3 600 + 3τ² ≤ 13 806,25. Stąd 3τ² ≤ 10 206,25, τ² ≤ 3 402,1 i τ ≤ 58,3 MPa.',
      caption: 'τ ≤ 58,3 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '3\\,600+3\\tau^2\\le13\\,806{,}25,\\qquad 3\\tau^2\\le10\\,206{,}25,\\qquad \\tau\\le58{,}3\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik i porównaj z Tresca',
      narration:
        'Przy τ = 58,3 MPa σ_HMH = √(3 600 + 3·3 402,1) = √13 806,3 = 117,5 MPa, czyli dokładnie k_r. Tresca dałaby warunek 4τ² ≤ 10 206,25, czyli τ ≤ 50,5 MPa.',
      caption: 'Kontrola: σ_HMH = 117,5 MPa, τ_Tresca = 50,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{HMH}=\\sqrt{3\\,600+3\\cdot3\\,402{,}1}=117{,}5\\,\\text{MPa},\\qquad 4\\tau^2\\le10\\,206{,}25\\Rightarrow\\tau\\le50{,}5\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Przy τ = 58,3 MPa naprężenia główne wynoszą 95,57 MPa i −35,57 MPa. Dla stali E = 200 GPa i ν = 0,30 dają ε_1 = 531,2 με, ε_2 = −321,2 με, ε_3 = −90 με i θ = 120 με.',
      caption: 'ε_1 = 531,2 με, ε_2 = −321,2 με, θ = 120 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=531{,}2\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=-321{,}2\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-90\\,\\mu\\varepsilon,\\qquad \\theta=120\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 120 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula:
        '\\theta=120\\,\\mu\\varepsilon,\\qquad |\\sigma_2|=35{,}57\\,\\text{MPa},\\qquad |\\varepsilon_3|=90\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
