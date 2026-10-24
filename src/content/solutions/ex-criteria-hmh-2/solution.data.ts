import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-hmh-2',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 2',
  duration: 7,
  given: ['σ = 150 MPa', 'τ = 80 MPa', 'σy = 0', 'Re = 355 MPa'],
  result:
    'Warto zwrócić uwagę, że największe naprężenie główne 184,7 MPa jest mniejsze od σHMH = 204,2 MPa, ale większe od σ = 150 MPa. To pokazuje, że HMH nie jest po prostu „największym naprężeniem”. Jest miarą energii, w której uczestniczą wszystkie trzy kierunki. Dla tego stanu Tresca dałaby σT = 184,7 − (−34,7) = 219,4 MPa, czyli jeszcze więcej.',
  figure: {
    kind: 'cube',
    stresses: { x: 150, y: 0, z: 0 },
    strains: { x: 0.0009753, y: -0.0004503, z: -0.000225 },
    volumeChange: '0,03%',
    values: [
      { label: 'σ', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '355 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '75 MPa', focus: 'stress' },
      { label: 'R', value: '109,7 MPa', focus: 'stress' },
      { label: 'σ_1', value: '184,7 MPa', focus: 'stress' },
      { label: 'σ_2', value: '−34,7 MPa', focus: 'stress' },
      { label: 'σ_3', value: '0 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '204,2 MPa', focus: 'stress' },
      { label: 'σ_T', value: '219,4 MPa', focus: 'stress' },
      { label: 'n', value: '1,74', focus: 'stress' },
      { label: 'ε_1', value: '975,3 με', focus: 'strain' },
      { label: 'ε_2', value: '−450,3 με', focus: 'strain' },
      { label: 'ε_3', value: '−225 με', focus: 'strain' },
      { label: 'θ', value: '300 με', focus: 'volume' },
    ],
    note: 'HMH daje wartość większą od największego naprężenia głównego, bo jest miarą energii zmiany postaci, a nie pojedynczej składowej.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia w wale',
      narration:
        'W punkcie wału naprężenie normalne od zginania wynosi σ = 150 MPa, a styczne od skręcania τ = 80 MPa. Przyjmujemy σ_y = 0 i R_e = 355 MPa.',
      caption: 'σ = 150 MPa, τ = 80 MPa, σ_y = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=150\\,\\text{MPa},\\qquad \\tau=80\\,\\text{MPa},\\qquad \\sigma_y=0',
    },
    {
      title: 'Oblicz HMH bezpośrednio',
      narration:
        'Dla płaskiego stanu naprężenia σ_HMH = √(σ² + 3τ²) = √(22 500 + 19 200) = √41 700 = 204,2 MPa. Zapas wynosi 355/204,2 = 1,74.',
      caption: 'σ_HMH = 204,2 MPa, n = 1,74.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{HMH}=\\sqrt{150^2+3\\cdot80^2}=\\sqrt{22\\,500+19\\,200}=\\sqrt{41\\,700}=204{,}2\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź przez naprężenia główne',
      narration:
        'Środek koła wynosi 75 MPa, a promień 109,7 MPa. Stąd σ_1 = 184,7 MPa, σ_2 = −34,7 MPa i σ_3 = 0. Pełny wzór HMH daje ten sam wynik 204,2 MPa.',
      caption: 'C = 75 MPa, R = 109,7 MPa, σ_1 = 184,7 MPa, σ_2 = −34,7 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'C=\\frac{150}{2}=75\\,\\text{MPa},\\qquad R=\\sqrt{75^2+80^2}=109{,}7\\,\\text{MPa},\\qquad \\sigma_1=184{,}7\\,\\text{MPa},\\qquad \\sigma_2=-34{,}7\\,\\text{MPa}',
    },
    {
      title: 'Porównaj z Tresca',
      narration:
        'Tresca bierze różnicę skrajnych naprężeń: σ_T = 184,7 − (−34,7) = 219,4 MPa. Jest więc jeszcze bardziej zachowawcza niż HMH.',
      caption: 'σ_T = 219,4 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_T=184{,}7-(-34{,}7)=219{,}4\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_1 = 975,3 με, ε_2 = −450,3 με i ε_3 = −225 με. Ślad 300 με oznacza niewielki wzrost objętości.',
      caption: 'ε_1 = 975,3 με, ε_2 = −450,3 με, θ = 300 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=\\frac{184{,}7+0{,}30\\cdot34{,}7}{200\\,000}=975{,}3\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=-450{,}3\\,\\mu\\varepsilon,\\qquad \\theta=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 300 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=300\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
