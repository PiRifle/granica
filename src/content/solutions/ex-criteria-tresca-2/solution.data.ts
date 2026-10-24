import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-tresca-2',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 2',
  duration: 7,
  given: ['σx = 90 MPa', 'σy = 30 MPa', 'τxy = 20 MPa'],
  result:
    'Dla porównania, gdyby τxy = 0, to σ1 = 90 MPa, σ2 = 30 MPa i σ3 = 0, więc σT = 90 MPa. Różnica σ1 − σ2 = 60 MPa byłaby jeszcze bardziej myląca. Widać, że w stanie płaskim z naprężeniami tego samego znaku zero jest pełnoprawnym naprężeniem skrajnym i nie wolno go pomijać.',
  figure: {
    kind: 'cube',
    stresses: { x: 90, y: 30, z: 0 },
    strains: { x: 0.00045, y: 0.000015, z: -0.00018 },
    volumeChange: '0,0285%',
    values: [
      { label: 'σ_x', value: '90 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '20 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '36,06 MPa', focus: 'stress' },
      { label: 'σ_1', value: '96,06 MPa', focus: 'stress' },
      { label: 'σ_2', value: '23,94 MPa', focus: 'stress' },
      { label: 'σ_3', value: '0 MPa', focus: 'stress' },
      { label: 'σ_T', value: '96,06 MPa', focus: 'stress' },
      { label: 'σ_1−σ_2', value: '72,12 MPa', focus: 'stress' },
      { label: 'ε_x', value: '450 με', focus: 'strain' },
      { label: 'γ_xy', value: '260 μrad', focus: 'strain' },
      { label: 'θ', value: '285 με', focus: 'volume' },
    ],
    note: 'Największa różnica naprężeń obejmuje zero, a nie różnicę dwóch naprężeń dodatnich.',
  },
  scenes: [
    {
      title: 'Zapisz płaski stan naprężenia',
      narration:
        'W blasze działają σ_x = 90 MPa, σ_y = 30 MPa i τ_xy = 20 MPa. Oba naprężenia normalne są dodatnie, więc zero będzie najmniejszym naprężeniem głównym.',
      caption: 'σ_x = 90 MPa, σ_y = 30 MPa, τ_xy = 20 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=90\\,\\text{MPa},\\qquad \\sigma_y=30\\,\\text{MPa},\\qquad \\tau_{xy}=20\\,\\text{MPa}',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration: 'Środek koła wynosi C = (90 + 30)/2 = 60 MPa. Promień to √(30² + 20²) = √1 300 = 36,06 MPa.',
      caption: 'C = 60 MPa, R = 36,06 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'C=\\frac{90+30}{2}=60\\,\\text{MPa},\\qquad R=\\sqrt{30^2+20^2}=36{,}06\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz naprężenia główne',
      narration: 'Otrzymujemy σ_1 = 96,06 MPa i σ_2 = 23,94 MPa, a σ_3 = 0. Porządek jest więc 96,06 ≥ 23,94 ≥ 0.',
      caption: 'σ_1 = 96,06 MPa, σ_2 = 23,94 MPa, σ_3 = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_1=60+36{,}06=96{,}06\\,\\text{MPa},\\qquad \\sigma_2=60-36{,}06=23{,}94\\,\\text{MPa},\\qquad \\sigma_3=0',
    },
    {
      title: 'Oblicz trzy różnice',
      narration:
        'Różnice wynoszą 72,12, 23,94 i 96,06 MPa. Największa to 96,06 MPa, więc σ_T = 96,06 MPa. Błędne wzięcie tylko σ_1 − σ_2 zaniżyłoby wytężenie o około 25%.',
      caption: 'σ_T = 96,06 MPa, σ_1 − σ_2 = 72,12 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '|96{,}06-23{,}94|=72{,}12,\\qquad |23{,}94-0|=23{,}94,\\qquad |0-96{,}06|=96{,}06',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_x = 450 με, ε_y = 15 με, ε_z = −180 με i γ_xy = 260 μrad. Ślad 285 με oznacza wzrost objętości.',
      caption: 'ε_x = 450 με, γ_xy = 260 μrad, θ = 285 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=450\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=15\\,\\mu\\varepsilon,\\qquad \\varepsilon_z=-180\\,\\mu\\varepsilon,\\qquad \\theta=285\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 285 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=285\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
