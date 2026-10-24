import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-comparison-3',
  title: 'HMH czy Tresca? Porównanie hipotez — przykład 3',
  duration: 7,
  given: ['R_e=235 MPa', 'n_{wym}=2'],
  result:
    'Taki sposób kontroli jest przydatny w projektowaniu, gdy granica materiału jest narzucona przez dostępny gatunek stali. Wtedy nie pytamy, jakie naprężenie jest dopuszczalne, lecz czy dany materiał w ogóle może spełnić wymaganie. Odpowiedź może brzmieć „tak według HMH, nie według Tresca”, i właśnie dlatego wybór hipotezy musi być świadomą decyzją, a nie przypadkiem.',
  figure: {
    kind: 'cube',
    stresses: { x: 60, y: -60, z: 0 },
    strains: { x: 0.00039, y: -0.00039, z: 0 },
    volumeChange: '0%',
    values: [
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_dop HMH', value: '67,8 MPa', focus: 'stress' },
      { label: 'τ_dop Tresca', value: '58,75 MPa', focus: 'stress' },
      { label: 'R_e,req HMH', value: '207,8 MPa', focus: 'stress' },
      { label: 'R_e,req Tresca', value: '240 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '2,26', focus: 'stress' },
      { label: 'n_T', value: '1,96', focus: 'stress' },
      { label: 'σ_I', value: '60 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−60 MPa', focus: 'stress' },
      { label: 'ε_I', value: '390 με', focus: 'strain' },
      { label: 'ε_II', value: '−390 με', focus: 'strain' },
      { label: 'θ', value: '0 με', focus: 'volume' },
    ],
    note: 'Przy czystym ścinaniu naprężenia główne wynoszą ±τ, a zmiana objętości jest zerowa.',
  },
  scenes: [
    {
      title: 'Zapisz warunek czystego ścinania',
      narration:
        'Dla stali o R_e = 235 MPa wymagamy zapasu n_wym = 2 i pytamy, jakie maksymalne naprężenie styczne przy czystym ścinaniu dopuszcza każda hipoteza.',
      caption: 'R_e = 235 MPa, n_wym = 2, czyste ścinanie.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R_e=235\\,\\text{MPa},\\qquad n_{wym}=2{,}0,\\qquad \\sigma=0',
    },
    {
      title: 'Oblicz dopuszczalne τ według HMH',
      narration: 'Dla HMH warunek ma postać √3·τ ≤ R_e/n_wym. Stąd τ_dop = 235/(2·1,732) = 67,8 MPa.',
      caption: 'τ_dop,HMH = 67,8 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sqrt{3}\\,\\tau\\le\\frac{R_e}{n_{wym}},\\qquad \\tau_{dop,HMH}=\\frac{235}{2\\cdot1{,}732}=67{,}8\\,\\text{MPa}',
    },
    {
      title: 'Oblicz dopuszczalne τ według Tresca',
      narration: 'Dla Tresca warunek to 2τ ≤ R_e/n_wym, więc τ_dop = R_e/(2n_wym) = 235/4 = 58,75 MPa.',
      caption: 'τ_dop,T = 58,75 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '2\\tau\\le\\frac{R_e}{n_{wym}},\\qquad \\tau_{dop,T}=\\frac{235}{2\\cdot2}=58{,}75\\,\\text{MPa}',
    },
    {
      title: 'Porównaj decyzje dla τ = 60 MPa',
      narration:
        'Jeżeli w elemencie działa τ = 60 MPa, HMH uznaje element za bezpieczny, bo 60 < 67,8 MPa, a Tresca go odrzuca, bo 60 > 58,75 MPa. Decyzja zmienia się wraz z modelem, a nie ze stanem naprężenia.',
      caption: 'τ = 60 MPa: HMH dopuszcza, Tresca nie dopuszcza.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau=60\\,\\text{MPa},\\qquad 60<67{,}8,\\qquad 60>58{,}75',
    },
    {
      title: 'Sprawdź przez wymaganą granicę',
      narration:
        'Dla τ = 60 MPa HMH wymaga R_e,req = √3·60·2 = 207,8 MPa, a Tresca 2·60·2 = 240 MPa. Dla stali 235 MPa HMH ma zapas 2,26, a Tresca 1,96, czyli mniej niż wymagane 2.',
      caption: 'R_e,req = 207,8 MPa (HMH) lub 240 MPa (Tresca).',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'R_{e,req,HMH}=\\sqrt{3}\\cdot60\\cdot2=207{,}8\\,\\text{MPa},\\qquad R_{e,req,T}=2\\cdot60\\cdot2=240\\,\\text{MPa}',
    },
    {
      title: 'Przelicz czyste ścinanie na odkształcenia',
      narration:
        'Przy czystym ścinaniu naprężenia główne wynoszą ±60 MPa. Dla stali E = 200 GPa i ν = 0,30 dają one ε_I = 390 με, ε_II = −390 με i zerową zmianę objętości.',
      caption: 'ε_I = 390 με, ε_II = −390 με, θ = 0.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_I=\\frac{60+0{,}30\\cdot60}{200\\,000}=390\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-390\\,\\mu\\varepsilon,\\qquad \\theta=0',
    },
    {
      title: 'Zinterpretuj wynik projektowo',
      narration:
        'Odpowiedź „tak według HMH, nie według Tresca” pokazuje, że wybór hipotezy musi być świadomą decyzją. W praktyce trzeba albo zwiększyć przekrój, albo uzasadnić wybór modelu, albo podnieść wymagany zapas.',
      caption: 'Kontrola: n_HMH = 2,26, n_T = 1,96.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'n_{HMH}=\\frac{235}{\\sqrt{3}\\cdot60}=2{,}26,\\qquad n_T=\\frac{235}{120}=1{,}96',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration: 'Ślad tensora odkształcenia jest zerowy, więc objętość elementu nie zmienia się w pierwszym rzędzie.',
      caption: 'Kontrola: θ = 0 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=0',
    },
  ],
} satisfies SolutionData
