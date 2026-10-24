import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-combined-loading-2',
  title: 'Zginanie, skręcanie i siła osiowa razem — przykład 2',
  duration: 7,
  given: ['N=-20 kN', 'M=1', 'T=500 N'],
  result:
    'W zadaniach z mimośrodowym rozciąganiem lub ściskaniem warto więc narysować rozkład σ_x wzdłuż wysokości przekroju. Siła osiowa przesuwa cały wykres równolegle, a zginanie go obraca. Punkt decydujący to miejsce, w którym wypadkowa wartość jest najbardziej oddalona od zera. Dopiero po tym rysunku sensowne jest liczenie σ_red.',
  figure: {
    kind: 'cube',
    stresses: { x: -63.66, y: 0, z: 0 },
    strains: { x: -0.0003183, y: 0.00009549, z: 0.00009549 },
    volumeChange: '−0,01273%',
    values: [
      { label: 'N', value: '−20 kN', focus: 'stress', reveal: 0 },
      { label: 'M', value: '1,2 kN·m', focus: 'stress', reveal: 0 },
      { label: 'T', value: '500 N·m', focus: 'stress', reveal: 0 },
      { label: 'σ_N', value: '−7,07 MPa', focus: 'stress' },
      { label: 'σ_M', value: '±56,59 MPa', focus: 'stress' },
      { label: 'σ_x (rozc.)', value: '49,52 MPa', focus: 'stress' },
      { label: 'σ_x (ścisk.)', value: '−63,66 MPa', focus: 'stress' },
      { label: 'τ', value: '11,79 MPa', focus: 'stress' },
      { label: 'σ_HMH (rozc.)', value: '53,6 MPa', focus: 'stress' },
      { label: 'σ_HMH (ścisk.)', value: '66,9 MPa', focus: 'stress' },
      { label: 'σ_T (ścisk.)', value: '67,9 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '3,51', focus: 'stress' },
      { label: 'n_T', value: '3,46', focus: 'stress' },
      { label: 'ε_x', value: '−318,3 με', focus: 'strain' },
      { label: 'ε_y', value: '95,49 με', focus: 'strain' },
      { label: 'γ_xy', value: '153,3 μrad', focus: 'strain' },
      { label: 'θ', value: '−127,3 με', focus: 'volume' },
    ],
    note: 'Decyduje włókno ściskane, bo siła osiowa i zginanie działają w nim zgodnie.',
  },
  scenes: [
    {
      title: 'Zapisz obciążenia i badane włókna',
      narration:
        'Ten sam pręt o średnicy 60 mm jest teraz ściskany siłą N = −20 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 500 N·m. Sprawdzimy dwa przeciwległe włókna, aby przekonać się, które decyduje.',
      caption: 'N = −20 kN, M = 1,2 kN·m, T = 500 N·m.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'N=-20\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=500\\,\\text{N·m}',
    },
    {
      title: 'Oblicz naprężenia normalne w obu włóknach',
      narration:
        'Pole i wskaźniki są takie same jak poprzednio. Naprężenie od siły osiowej wynosi σ_N = −20 000/2 827 = −7,07 MPa. Zginanie daje +56,59 MPa w jednym włóknie i −56,59 MPa w przeciwległym.',
      caption: 'σ_N = −7,07 MPa, σ_M = ±56,59 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_N=\\frac{-20\\,000}{2\\,827}=-7{,}07\\,\\text{MPa},\\qquad \\sigma_M=\\pm56{,}59\\,\\text{MPa}',
    },
    {
      title: 'Zsumuj naprężenia w obu włóknach',
      narration:
        'W pierwszym włóknie σ_x = 49,52 MPa, a w drugim σ_x = −63,66 MPa. Większy moduł występuje w włóknie ściskanym, mimo że siła osiowa jest ujemna.',
      caption: 'σ_x = 49,52 MPa lub −63,66 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=49{,}52\\,\\text{MPa}\\quad\\text{lub}\\quad \\sigma_x=-63{,}66\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie styczne',
      narration:
        'Ścinanie od skręcania wynosi τ = 500 000/42 412 = 11,79 MPa i ma ten sam moduł w obu włóknach, choć przeciwne zwroty.',
      caption: 'τ = 11,79 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=\\frac{500\\,000}{42\\,412}=11{,}79\\,\\text{MPa}',
    },
    {
      title: 'Oblicz wytężenie obu włókien',
      narration:
        'Dla włókna rozciąganego HMH daje √(49,52² + 3·11,79²) = 53,6 MPa. Dla włókna ściskanego √(63,66² + 3·11,79²) = 66,9 MPa. Decyduje więc włókno ściskane.',
      caption: 'σ_HMH = 53,6 MPa lub 66,9 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{HMH}=\\sqrt{49{,}52^2+3\\cdot11{,}79^2}=53{,}6\\,\\text{MPa},\\qquad \\sigma_{HMH}=\\sqrt{63{,}66^2+3\\cdot11{,}79^2}=66{,}9\\,\\text{MPa}',
    },
    {
      title: 'Porównaj z Tresca',
      narration:
        'Dla włókna ściskanego Tresca daje √(63,66² + 4·11,79²) = 67,9 MPa. Przy R_e = 235 MPa zapasy wynoszą n_HMH = 235/66,9 = 3,51 oraz n_T = 235/67,9 = 3,46.',
      caption: 'σ_T = 67,9 MPa, n_HMH = 3,51, n_T = 3,46.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_T=\\sqrt{63{,}66^2+4\\cdot11{,}79^2}=67{,}9\\,\\text{MPa},\\qquad n_{HMH}=\\frac{235}{66{,}9}=3{,}51,\\qquad n_T=\\frac{235}{67{,}9}=3{,}46',
    },
    {
      title: 'Sprawdź odkształcenia i znak',
      narration:
        'W decydującym włóknie ε_x = −318,3 με, ε_y = +95,49 με, a γ_xy = 153,3 μrad. Ślad tensora jest ujemny, więc objętość nieznacznie maleje. Gdyby siła osiowa była rozciągająca, punkt krytyczny przesunąłby się na przeciwną stronę przekroju.',
      caption: 'Kontrola: ε_x = −318,3 με, θ = −127,3 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=-318{,}3\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=95{,}49\\,\\mu\\varepsilon,\\qquad \\theta=-318{,}3+95{,}49+95{,}49=-127{,}3\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest ujemny, więc objętość elementu maleje. Wartość bezwzględna śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = −127,3 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '|\\theta|=127{,}3\\,\\mu\\varepsilon,\\qquad |\\sigma_N|=7{,}07\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
