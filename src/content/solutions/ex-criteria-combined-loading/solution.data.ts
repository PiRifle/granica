import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-combined-loading',
  title: 'Zginanie, skręcanie i siła osiowa razem — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa'],
  result:
    'W rozważanym włóknie σ_x=67,2 MPa i τ=18,9 MPa, więc σ_HMH=74,7 MPa i σ_T=77,1 MPa. Oba zapasy przekraczają 3, więc element jest bezpieczny z dużym marginesem.',
  figure: {
    kind: 'cube',
    stresses: {
      x: 67.2,
      y: 0,
      z: 0,
    },
    strains: {
      x: 0.000336,
      y: -0.0001008,
      z: -0.0001008,
    },
    volumeChange: '0,01344%',
    values: [
      {
        label: 'd',
        value: '60 mm',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'N',
        value: '30 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'M',
        value: '1,2 kN·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'T',
        value: '800 N·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'R_e',
        value: '235 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ_x',
        value: '67,20 MPa',
        focus: 'stress',
      },
      {
        label: 'τ',
        value: '18,86 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_HMH',
        value: '74,72 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_T',
        value: '77,06 MPa',
        focus: 'stress',
      },
      {
        label: 'n_HMH',
        value: '3,14',
        focus: 'stress',
      },
      {
        label: 'n_T',
        value: '3,05',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '336 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '−100,8 με',
        focus: 'strain',
      },
      {
        label: 'γ_xy',
        value: '245,2 μrad',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '134,4 με',
        focus: 'volume',
      },
    ],
    note: 'W badanym włóknie działa naprężenie normalne od siły osiowej i zginania oraz naprężenie styczne od skręcania.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia w włóknie',
      narration:
        'W badanym włóknie na obwodzie pręta naprężenie normalne σ_x jest sumą udziału siły osiowej i zginania, a naprężenie styczne τ pochodzi od skręcania. Pozostałe składowe są zerowe.',
      caption: 'Stan naprężenia: σ_x od N i M, τ od T.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_x=\\sigma_N+\\sigma_M,\\qquad \\tau=\\frac{T}{W_o},\\qquad \\sigma_y=\\sigma_z=0',
    },
    {
      title: 'Oblicz pole i wskaźniki przekroju',
      narration:
        'Pole przekroju wynosi A = π·60²/4 = 2 827 mm². Wskaźnik zginania to W = π·60³/32 = 21 206 mm³, a wskaźnik skręcania W_o = 2W = 42 412 mm³.',
      caption: 'A = 2 827 mm², W = 21 206 mm³, W_o = 42 412 mm³.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula:
        'A=\\pi\\cdot60^2/4=2\\,827\\,\\text{mm}^2,\\qquad W=\\pi\\cdot60^3/32=21\\,206\\,\\text{mm}^3,\\qquad W_o=2W=42\\,412\\,\\text{mm}^3',
    },
    {
      title: 'Oblicz naprężenie od siły osiowej',
      narration:
        'Siła osiowa 30 kN działa na pole 2 827 mm², więc σ_N = 30 000/2 827 = 10,61 MPa. Naprężenie jest równomierne w całym przekroju.',
      caption: 'σ_N = 10,61 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_N=\\frac{30\\,000}{2\\,827}=10{,}61\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie od zginania',
      narration:
        'Moment gnący 1,2 kN·m to 1,2·10⁶ N·mm. Dzieląc przez wskaźnik 21 206 mm³, otrzymujemy σ_M = 56,59 MPa.',
      caption: 'σ_M = 56,59 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_M=\\frac{1{,}2\\cdot10^6}{21\\,206}=56{,}59\\,\\text{MPa}',
    },
    {
      title: 'Zsumuj naprężenia normalne',
      narration:
        'W badanym włóknie oba udziały mają ten sam znak, więc σ_x = 10,61 + 56,59 = 67,20 MPa. To naprężenie decyduje o wytężeniu normalnym.',
      caption: 'σ_x = 67,20 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_x=10{,}61+56{,}59=67{,}20\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie styczne',
      narration:
        'Moment skręcający 800 N·m to 800 000 N·mm. Dzieląc przez W_o = 42 412 mm³, otrzymujemy τ = 18,86 MPa.',
      caption: 'τ = 18,86 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau=\\frac{800\\,000}{42\\,412}=18{,}86\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie HMH',
      narration:
        'Dla płaskiego stanu naprężenia HMH wynosi √(σ_x² + 3τ²). Po podstawieniu otrzymujemy √(4 516 + 1 067) = 74,7 MPa.',
      caption: 'σ_HMH = 74,72 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}=\\sqrt{4\\,516+1\\,067}=74{,}72\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie Tresca',
      narration:
        'Hipoteza Tresca dla tego stanu daje √(σ_x² + 4τ²). Otrzymujemy √(4 516 + 1 423) = 77,06 MPa, czyli więcej niż HMH.',
      caption: 'σ_T = 77,06 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma_T=\\sqrt{67{,}20^2+4\\cdot18{,}86^2}=\\sqrt{4\\,516+1\\,423}=77{,}06\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 odkształcenie osiowe wynosi 336 με, poprzeczne −100,8 με, a postaciowe 245,2 μrad. Ślad tensora 134,4 με opisuje względną zmianę objętości.',
      caption: 'ε_x = 336 με, γ_xy = 245,2 μrad, θ = 134,4 με.',
      visual: 'cube',
      focus: {
        metric: 'strain',
      },
      formula:
        '\\varepsilon_x=\\frac{67{,}20}{200\\,000}=336\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-\\frac{0{,}30\\cdot67{,}20}{200\\,000}=-100{,}8\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=245{,}2\\,\\mu\\text{rad}',
    },
    {
      title: 'Sprawdź zapasy bezpieczeństwa',
      narration:
        'Dla R_e = 235 MPa zapasy wynoszą n_HMH = 235/74,72 = 3,14 oraz n_T = 235/77,06 = 3,05. Oba przekraczają 3, więc element jest bezpieczny z dużym marginesem.',
      caption: 'Kontrola: n_HMH = 3,14, n_T = 3,05.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula:
        'n_{HMH}=\\frac{235}{74{,}72}=3{,}14,\\qquad n_T=\\frac{235}{77{,}06}=3{,}05,\\qquad \\theta=336-100{,}8-100{,}8=134{,}4\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 134,4 με.',
      visual: 'cube',
      focus: {
        metric: 'volume',
      },
      formula: '\\theta=134{,}4\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
