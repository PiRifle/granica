import type { SolutionData } from '../../model'
import { StrainStressLinkExample1Animation } from './animation'

export default {
  id: 'ex-strain-state-stress-link',
  title: 'Od pomiaru do naprężeń i bezpiecznego doboru — przykład 1',
  duration: 7,
  given: ['varepsilon_1=600', 'varepsilon_2=100', 'E=70 GPa', 'nu=0,33', 'R_e=180 MPa'],
  result:
    'σ_1≈49,7 MPa i σ_2≈23,4 MPa. Zapas względem R_e wynosi około 4,18 według HMH i 3,62 według Tresca. Oba są większe od jedności, ale ostateczna decyzja wymaga porównania z wymaganym n oraz sprawdzenia sztywności.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0006, display: '600 με' },
      { angle: 45, label: '45°', value: 0.00035, display: '350 με' },
      { angle: 90, label: '90°', value: 0.0001, display: '100 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.00035,
      radius: 0.00025,
      left: 0.0001,
      right: 0.0006,
      angle: 0,
    },
    values: [
      { label: 'ε_I', value: '600 με', focus: 'principal', reveal: 0 },
      { label: 'ε_II', value: '100 με', focus: 'principal', reveal: 0 },
      { label: 'E', value: '70 GPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '180 MPa', focus: 'stress', reveal: 0 },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '350 με', focus: 'mohr' },
      { label: 'R_ε', value: '250 με', focus: 'mohr' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
      { label: 'σ_I', value: '49,73 MPa', focus: 'stress' },
      { label: 'σ_II', value: '23,41 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '43,09 MPa', focus: 'stress' },
      { label: 'σ_T', value: '49,73 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '4,18', focus: 'stress' },
      { label: 'n_T', value: '3,62', focus: 'stress' },
      { label: 'ε_z', value: '−345 με', focus: 'principal' },
    ],
    note: 'Kierunki główne pokrywają się z osiami pomiaru, bo γ_xy = 0; naprężenia wynikają z płaskiego stanu naprężenia.',
  },
  animation: StrainStressLinkExample1Animation,
  scenes: [
    {
      title: 'Zapisz odkształcenia główne',
      narration:
        'Z pomiaru otrzymano odkształcenia główne ε_I = 600 με i ε_II = 100 με. Ponieważ są to kierunki główne, odkształcenie postaciowe znika, a osie pomiaru są już osiami głównymi.',
      caption: 'ε_I = 600 με, ε_II = 100 με, γ = 0.',
      visual: 'rosette',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_I=600\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=100\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=0',
    },
    {
      title: 'Zbuduj koło i potwierdź kierunki',
      narration:
        'Środek koła to średnia odkształceń głównych, czyli 350 με, a promień to połowa ich różnicy, czyli 250 με. Bez ścinania kierunki główne pokrywają się z osiami pomiaru, więc kąt φ = 0°.',
      caption: 'ε_sr = 350 με, R_ε = 250 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{600+100}{2}=350\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{600-100}{2}=250\\,\\mu\\varepsilon,\\qquad \\tan2\\varphi_I=\\frac{0}{600-100}=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Materiał ma E = 70 GPa i ν = 0,33. Wspólny czynnik dla płaskiego stanu naprężenia wynosi E/(1 − ν²) = 70 000/(1 − 0,1089) = 78 554,6 MPa.',
      caption: 'E/(1 − ν²) = 78 554,6 MPa.',
      visual: 'rosette',
      focus: { metric: 'hooke' },
      formula: '\\frac{E}{1-\\nu^2}=\\frac{70\\,000}{1-0{,}1089}=78\\,554{,}6\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenia główne',
      narration:
        'Podstawiamy ε_I i ε_II do odwróconego prawa Hooke’a. Otrzymujemy σ_I = 78 554,6·(600 + 0,33·100)·10⁻⁶ = 49,73 MPa oraz σ_II = 78 554,6·(100 + 0,33·600)·10⁻⁶ = 23,41 MPa. Oba naprężenia główne są dodatnie.',
      caption: 'σ_I = 49,73 MPa, σ_II = 23,41 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=78\\,554{,}6\\cdot(600+0{,}33\\cdot100)\\cdot10^{-6}=49{,}73\\,\\text{MPa},\\qquad \\sigma_{II}=78\\,554{,}6\\cdot(100+0{,}33\\cdot600)\\cdot10^{-6}=23{,}41\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie zredukowane',
      narration:
        'Dla HMH σ_red = √(49,73² − 49,73·23,41 + 23,41²) ≈ 43,09 MPa. Dla Tresca oba naprężenia są dodatnie i zero jest najmniejsze, więc σ_T = 49,73 MPa.',
      caption: 'σ_HMH = 43,09 MPa, σ_T = 49,73 MPa.',
      visual: 'rosette',
      focus: { metric: 'equivalent' },
      formula:
        '\\sigma_{HMH}=\\sqrt{49{,}73^2-49{,}73\\cdot23{,}41+23{,}41^2}=43{,}09\\,\\text{MPa},\\qquad \\sigma_T=49{,}73\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź zapasy i odkształcenie grubości',
      narration:
        'Zapasy wynoszą n_HMH = 180/43,09 ≈ 4,18 oraz n_T = 180/49,73 ≈ 3,62. Odkształcenie grubości ε_z = −[0,33/(1 − 0,33)]·700 ≈ −345 με potwierdza płaski stan naprężenia.',
      caption: 'Kontrola: n_HMH = 4,18, n_T = 3,62, ε_z ≈ −345 με.',
      visual: 'rosette',
      focus: { metric: 'check' },
      formula:
        'n_{HMH}=\\frac{180}{43{,}09}=4{,}18,\\qquad n_T=\\frac{180}{49{,}73}=3{,}62,\\qquad \\varepsilon_z=-\\frac{0{,}33}{1-0{,}33}\\cdot700=-345\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
