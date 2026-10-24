import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-max-normal',
  title: 'Hipoteza największego naprężenia normalnego — przykład 1',
  duration: 7,
  given: ['σx = 50 MPa', 'σy = −20 MPa', 'τxy = 40 MPa', 'kr = 80 MPa', 'kc = 200 MPa'],
  result:
    'Oba warunki są spełnione, ale o bezpieczeństwie decyduje rozciąganie: zapas 1,17 jest znacznie mniejszy od zapasu 5,24 na ściskanie. Nawet niewielki wzrost naprężenia rozciągającego może przekroczyć kr.',
  figure: {
    kind: 'cube',
    stresses: { x: 50, y: -20, z: 0 },
    strains: { x: 0.000398, y: -0.000045, z: -0.000293 },
    volumeChange: '0,006%',
    values: [
      { label: 'σ_x', value: '50 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−20 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '80 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_c', value: '200 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '15 MPa', focus: 'stress' },
      { label: 'R', value: '53,15 MPa', focus: 'stress' },
      { label: 'σ_1', value: '68,15 MPa', focus: 'stress' },
      { label: 'σ_2', value: '0 MPa', focus: 'stress' },
      { label: 'σ_3', value: '−38,15 MPa', focus: 'stress' },
      { label: 'n_t', value: '1,17', focus: 'stress' },
      { label: 'n_c', value: '5,24', focus: 'stress' },
      { label: 'ε_1', value: '398 με', focus: 'strain' },
      { label: 'ε_2', value: '−45 με', focus: 'strain' },
      { label: 'ε_3', value: '−293 με', focus: 'strain' },
      { label: 'θ', value: '60 με', focus: 'volume' },
    ],
    note: 'O bezpieczeństwie decyduje rozciągające σ_1, mimo że w stanie naprężenia występuje również ściskanie.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia i granice',
      narration:
        'W punkcie działają σ_x = 50 MPa, σ_y = −20 MPa i τ_xy = 40 MPa. Materiał ma wytrzymałość na rozciąganie k_r = 80 MPa i na ściskanie k_c = 200 MPa.',
      caption: 'σ_x = 50 MPa, σ_y = −20 MPa, τ_xy = 40 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=50\\,\\text{MPa},\\qquad \\sigma_y=-20\\,\\text{MPa},\\qquad \\tau_{xy}=40\\,\\text{MPa},\\qquad k_r=80\\,\\text{MPa},\\qquad k_c=200\\,\\text{MPa}',
    },
    {
      title: 'Oblicz środek koła Mohra',
      narration:
        'Środek koła to średnia naprężeń normalnych: C = (50 − 20)/2 = 15 MPa. Wokół tego punktu rozciąga się stan naprężenia.',
      caption: 'C = 15 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'C=\\frac{50+(-20)}{2}=15\\,\\text{MPa}',
    },
    {
      title: 'Oblicz promień koła',
      narration:
        'Promień obejmuje połowę różnicy naprężeń normalnych oraz naprężenie styczne: R = √(35² + 40²) = √2 825 = 53,15 MPa.',
      caption: 'R = 53,15 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R=\\sqrt{\\left(\\frac{50-(-20)}{2}\\right)^2+40^2}=\\sqrt{35^2+40^2}=53{,}15\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz naprężenia główne',
      narration:
        'Przed uporządkowaniem otrzymujemy 15 + 53,15 = 68,15 MPa oraz 15 − 53,15 = −38,15 MPa. Trzecia wartość główna wynosi 0, bo jest to płaski stan naprężenia.',
      caption: 'σ_1 = 68,15 MPa, σ_2 = 0, σ_3 = −38,15 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_1=15+53{,}15=68{,}15\\,\\text{MPa},\\qquad \\sigma_3=15-53{,}15=-38{,}15\\,\\text{MPa},\\qquad \\sigma_2=0',
    },
    {
      title: 'Sprawdź warunek rozciągania',
      narration:
        'Największe naprężenie dodatnie to 68,15 MPa. Warunek 68,15 ≤ 80 MPa jest spełniony, a zapas na rozciąganie wynosi n_t = 80/68,15 = 1,17.',
      caption: '68,15 MPa ≤ 80 MPa, n_t = 1,17.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '68{,}15\\le80\\,\\text{MPa},\\qquad n_t=\\frac{80}{68{,}15}=1{,}17',
    },
    {
      title: 'Sprawdź warunek ściskania',
      narration:
        'Największe naprężenie ujemne co do modułu to 38,15 MPa. Warunek 38,15 ≤ 200 MPa jest spełniony, a zapas n_c = 200/38,15 = 5,24.',
      caption: '38,15 MPa ≤ 200 MPa, n_c = 5,24.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '38{,}15\\le200\\,\\text{MPa},\\qquad n_c=\\frac{200}{38{,}15}=5{,}24',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_1 = 398 με, ε_2 = −45 με i ε_3 = −293 με. Ślad 60 με jest dodatni, więc objętość nieznacznie rośnie.',
      caption: 'ε_1 = 398 με, ε_2 = −45 με, ε_3 = −293 με, θ = 60 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=398\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=-45\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-293\\,\\mu\\varepsilon,\\qquad \\theta=60\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 60 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=60\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
