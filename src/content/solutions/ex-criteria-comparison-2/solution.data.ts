import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-comparison-2',
  title: 'HMH czy Tresca? Porównanie hipotez — przykład 2',
  duration: 7,
  given: ['r=300 mm', 't=6 mm', 'p=5 MPa', 't=5', 'sigma_1=250 MPa', 'sigma_2=125 MPa'],
  result:
    'Dla porównania, w zbiorniku otwartym naprężenie wzdłużne byłoby bliskie zeru, a stan naprężenia zbliżyłby się do jednoosiowego rozciągania obwodowego. Wtedy obie hipotezy dałyby prawie ten sam wynik. To pokazuje, że o różnicy między hipotezami decyduje nie sama geometria, lecz stosunek naprężeń głównych. Im bardziej stan odbiega od jednoosiowego, tym większa szansa na rozbieżność.',
  figure: {
    kind: 'cube',
    stresses: { x: 250, y: 125, z: 0 },
    strains: { x: 0.0010625, y: 0.00025, z: -0.0005625 },
    volumeChange: '0,075%',
    values: [
      { label: 'r', value: '300 mm', focus: 'stress', reveal: 0 },
      { label: 't', value: '6 mm', focus: 'stress', reveal: 0 },
      { label: 'p', value: '5 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '355 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_θ', value: '250 MPa', focus: 'stress' },
      { label: 'σ_z', value: '125 MPa', focus: 'stress' },
      { label: 'σ_3', value: '0 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '216,5 MPa', focus: 'stress' },
      { label: 'σ_T', value: '250 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '1,64', focus: 'stress' },
      { label: 'n_T', value: '1,42', focus: 'stress' },
      { label: 'ε_θ', value: '1062,5 με', focus: 'strain' },
      { label: 'ε_z', value: '250 με', focus: 'strain' },
      { label: 'ε_r', value: '−562,5 με', focus: 'strain' },
      { label: 'θ', value: '750 με', focus: 'volume' },
    ],
    note: 'Naprężenie promieniowe na zewnętrznej powierzchni jest bliskie zeru, więc trzecią wartością główną jest zero.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia w ściance',
      narration:
        'Cienkościenny zbiornik cylindryczny ma promień 300 mm, grubość 6 mm i ciśnienie 5 MPa. Naprężenie obwodowe wynosi σ_θ = pr/t = 250 MPa, a wzdłużne σ_z = pr/(2t) = 125 MPa.',
      caption: 'σ_θ = 250 MPa, σ_z = 125 MPa, σ_r ≈ 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_\\theta=\\frac{pr}{t}=\\frac{5\\cdot300}{6}=250\\,\\text{MPa},\\qquad \\sigma_z=\\frac{pr}{2t}=125\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie HMH',
      narration:
        'Dla płaskiego stanu naprężenia z σ_1 = 250 MPa i σ_2 = 125 MPa HMH wynosi √(250² + 125² − 250·125) = √46 875 = 216,5 MPa.',
      caption: 'σ_HMH = 216,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{HMH}=\\sqrt{250^2+125^2-250\\cdot125}=\\sqrt{62\\,500+15\\,625-31\\,250}=\\sqrt{46\\,875}=216{,}5\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie Tresca',
      narration:
        'Tresca bierze różnicę największego i najmniejszego naprężenia głównego. Największe to 250 MPa, a najmniejsze 0, więc σ_T = 250 MPa. Dla R_e = 355 MPa zapasy wynoszą 1,64 i 1,42.',
      caption: 'σ_T = 250 MPa, n_HMH = 1,64, n_T = 1,42.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_T=250-0=250\\,\\text{MPa},\\qquad n_{HMH}=\\frac{355}{216{,}5}=1{,}64,\\qquad n_T=\\frac{355}{250}=1{,}42',
    },
    {
      title: 'Zauważ rolę trzeciego kierunku',
      narration:
        'Gdyby pominąć zero jako trzecią wartość główną, różnica wyniosłaby tylko 125 MPa i wytężenie zostałoby zaniżone. W stanie płaskim z naprężeniami tego samego znaku zero jest pełnoprawnym naprężeniem skrajnym.',
      caption: 'Zero jest najmniejszym naprężeniem głównym, więc nie wolno go pominąć.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1=250\\,\\text{MPa},\\qquad \\sigma_2=125\\,\\text{MPa},\\qquad \\sigma_3=0',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_θ = 1062,5 με, ε_z = 250 με i ε_r = −562,5 με. Ślad tensora 750 με opisuje względny wzrost objętości.',
      caption: 'ε_θ = 1062,5 με, ε_z = 250 με, ε_r = −562,5 με, θ = 750 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_\\theta=1062{,}5\\,\\mu\\varepsilon,\\qquad \\varepsilon_z=250\\,\\mu\\varepsilon,\\qquad \\varepsilon_r=-562{,}5\\,\\mu\\varepsilon,\\qquad \\theta=750\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź różnicę hipotez',
      narration:
        'Różnica między hipotezami wynosi około 15%, czyli zbliża się do górnej granicy. W zbiorniku otwartym naprężenie wzdłużne byłoby bliskie zeru, stan zbliżyłby się do jednoosiowego i obie hipotezy dałyby prawie ten sam wynik.',
      caption: 'Kontrola: różnica (250 − 216,5)/216,5 ≈ 15,5%.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\frac{250-216{,}5}{216{,}5}=0{,}155=15{,}5\\%,\\qquad \\theta=750\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 750 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=750\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
