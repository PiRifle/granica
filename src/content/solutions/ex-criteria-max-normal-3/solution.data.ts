import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-max-normal-3',
  title: 'Hipoteza największego naprężenia normalnego — przykład 3',
  duration: 7,
  given: ['σy = −40 MPa', 'σx = 0', 'kr = 150 MPa', 'n = 2,0'],
  result:
    'Warto zauważyć, że w tym zadaniu zwiększanie ścinania zwiększa jednocześnie naprężenie rozciągające i ściskające. Nie można więc powiedzieć, że „ścinanie jest bezpieczne, dopóki nie przekracza granicy ścinania”. W hipotezie maksimum normalnego ścinanie jest tylko pośrednim sposobem wytworzenia naprężeń głównych. To kolejny powód, dla którego trzeba najpierw policzyć σ1 i σ2, a dopiero potem porównywać je z granicami.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: -40, z: 0 },
    strains: { x: 0.0005475, y: 0.00006, z: -0.0006875 },
    volumeChange: '−0,008%',
    values: [
      { label: 'σ_x', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−40 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'n', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'k_r/n', value: '75 MPa', focus: 'stress' },
      { label: 'τ_max', value: '92,9 MPa', focus: 'stress' },
      { label: 'C', value: '−20 MPa', focus: 'stress' },
      { label: 'R', value: '95 MPa', focus: 'stress' },
      { label: 'σ_1', value: '75 MPa', focus: 'stress' },
      { label: 'σ_2', value: '0 MPa', focus: 'stress' },
      { label: 'σ_3', value: '−115 MPa', focus: 'stress' },
      { label: 'ε_1', value: '547,5 με', focus: 'strain' },
      { label: 'ε_2', value: '60 με', focus: 'strain' },
      { label: 'ε_3', value: '−687,5 με', focus: 'strain' },
      { label: 'θ', value: '−80 με', focus: 'volume' },
    ],
    note: 'Decyduje rozciąganie: przy τ = 92,9 MPa otrzymujemy σ_1 = 75 MPa, czyli dokładnie k_r/n.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Płyta z materiału kruchego jest ściskana w jednym kierunku: σ_y = −40 MPa, σ_x = 0. Dopuszczalna wytrzymałość na rozciąganie wynosi k_r = 150 MPa, a wymagany zapas n = 2,0.',
      caption: 'σ_x = 0, σ_y = −40 MPa, k_r = 150 MPa, n = 2,0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=0,\\qquad \\sigma_y=-40\\,\\text{MPa},\\qquad k_r=150\\,\\text{MPa},\\qquad n=2{,}0',
    },
    {
      title: 'Oblicz naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne na rozciąganie wynosi k_r/n = 150/2 = 75 MPa. Środek koła Mohra to C = −20 MPa, a promień R = √(20² + τ²).',
      caption: 'k_r/n = 75 MPa, C = −20 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\frac{k_r}{n}=\\frac{150}{2}=75\\,\\text{MPa},\\qquad C=-20\\,\\text{MPa},\\qquad R=\\sqrt{20^2+\\tau^2}',
    },
    {
      title: 'Zapisz warunek na naprężenie główne',
      narration:
        'Naprężenia główne wynoszą σ_1 = −20 + R i σ_2 = −20 − R. Największe rozciągające to σ_1, więc wymagamy −20 + √(400 + τ²) ≤ 75.',
      caption: 'σ_1 = −20 + √(400 + τ²) ≤ 75 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1=-20+\\sqrt{400+\\tau^2}\\le75\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz maksymalne τ',
      narration: 'Po przekształceniu √(400 + τ²) ≤ 95, więc 400 + τ² ≤ 9 025. Stąd τ² ≤ 8 625 i τ ≤ 92,9 MPa.',
      caption: 'τ_max = 92,9 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sqrt{400+\\tau^2}\\le95,\\qquad 400+\\tau^2\\le9\\,025,\\qquad \\tau^2\\le8\\,625,\\qquad \\tau\\le92{,}9\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź naprężenia przy τ_max',
      narration:
        'Przy τ = 92,9 MPa otrzymujemy σ_1 = 75 MPa i σ_2 = −115 MPa. Warunek ściskania 115 ≤ k_c/n jest spełniony z dużym zapasem, jeśli k_c = 600 MPa.',
      caption: 'σ_1 = 75 MPa, σ_2 = −115 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1=-20+\\sqrt{400+92{,}9^2}=75\\,\\text{MPa},\\qquad \\sigma_2=-20-95=-115\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 naprężenia główne 75, 0 i −115 MPa dają ε_1 = 547,5 με, ε_2 = 60 με i ε_3 = −687,5 με. Ślad −80 με oznacza niewielki spadek objętości.',
      caption: 'ε_1 = 547,5 με, ε_2 = 60 με, ε_3 = −687,5 με, θ = −80 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=547{,}5\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=60\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-687{,}5\\,\\mu\\varepsilon,\\qquad \\theta=-80\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest ujemny, więc objętość elementu maleje. Wartość bezwzględna śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = −80 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '|\\theta|=80\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
