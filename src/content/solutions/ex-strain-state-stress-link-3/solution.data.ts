import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-stress-link-3',
  title: 'Od pomiaru do naprężeń i bezpiecznego doboru — przykład 3',
  duration: 7,
  given: ['varepsilon_1=500', 'varepsilon_2=-200', 'E=200 GPa', 'nu=0,30', 'R_e=235 MPa', 'n_{wym}=2'],
  result:
    'Współczynniki wynoszą n_HMH≈235/102,64≈2,29 oraz n_Tresca≈235/107,69≈2,18. Oba są większe od 2,0, więc warunek wytrzymałości jest spełniony z niewielkim zapasem. Gdyby wymagane n wynosiło 2,5, element trzeba by przeprojektować albo wybrać materiał o wyższej R_e. Minimalna granica plastyczności dla n=2,5 wynosiłaby około 2,5·107,69≈269 MPa według Tresca.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0005, display: '500 με' },
      { angle: 45, label: '45°', value: 0.00015, display: '150 με' },
      { angle: 90, label: '90°', value: -0.0002, display: '−200 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.00015,
      radius: 0.00035,
      left: -0.0002,
      right: 0.0005,
      angle: 0,
    },
    values: [
      { label: 'ε_I', value: '500 με', focus: 'principal', reveal: 0 },
      { label: 'ε_II', value: '−200 με', focus: 'principal', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '150 με', focus: 'mohr' },
      { label: 'R_ε', value: '350 με', focus: 'mohr' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
      { label: 'E/(1−ν²)', value: '219 780 MPa', focus: 'stress' },
      { label: 'σ_I', value: '96,70 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−10,99 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '102,64 MPa', focus: 'stress' },
      { label: 'σ_T', value: '107,69 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '2,29', focus: 'stress' },
      { label: 'n_T', value: '2,18', focus: 'stress' },
    ],
    note: 'Oba zapasy przekraczają wymagane 2,0, ale Tresca daje mniejszy margines niż HMH.',
  },
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrainStressLinkExample3Animation })),
  ),
  scenes: [
    {
      title: 'Zapisz odkształcenia główne',
      narration:
        'Z pomiaru otrzymano ε_I = 500 με i ε_II = −200 με dla stali o E = 200 GPa i ν = 0,30. Granica plastyczności wynosi 235 MPa, a wymagany zapas n_wym = 2,0.',
      caption: 'ε_I = 500 με, ε_II = −200 με, R_e = 235 MPa.',
      visual: 'rosette',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_I=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-200\\,\\mu\\varepsilon,\\qquad R_e=235\\,\\text{MPa}',
    },
    {
      title: 'Zbuduj koło i potwierdź kierunki',
      narration:
        'Środek koła wynosi 150 με, a promień 350 με. Odkształcenia główne są już znane, więc koło służy tu jako kontrola i ilustracja stanu. Odkształcenie postaciowe znika, bo osie pomiaru są kierunkami głównymi, więc φ = 0°.',
      caption: 'ε_sr = 150 με, R_ε = 350 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{500+(-200)}{2}=150\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{500-(-200)}{2}=350\\,\\mu\\varepsilon,\\qquad \\gamma_{xy}=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Czynnik E/(1 − ν²) wynosi 200 000/0,91 = 219 780 MPa. To on przelicza odkształcenia główne na naprężenia w płaskim stanie naprężenia.',
      caption: 'E/(1 − ν²) = 219 780 MPa.',
      visual: 'rosette',
      focus: { metric: 'hooke' },
      formula: '\\frac{E}{1-\\nu^2}=\\frac{200\\,000}{1-0{,}09}=219\\,780\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenia główne',
      narration:
        'Podstawiamy ε_I i ε_II do odwróconego prawa Hooke’a: σ_I = 219 780·(0,0005 − 0,30·0,0002) ≈ 96,70 MPa oraz σ_II = 219 780·(−0,0002 + 0,30·0,0005) ≈ −10,99 MPa. Naprężenie w drugim kierunku głównym jest ściskające.',
      caption: 'σ_I ≈ 96,70 MPa, σ_II ≈ −10,99 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(0{,}0005-0{,}30\\cdot0{,}0002)=96{,}70\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-0{,}0002+0{,}30\\cdot0{,}0005)=-10{,}99\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenia zredukowane',
      narration:
        'HMH daje σ_red = √(96,70² − 96,70·(−10,99) + (−10,99)²) ≈ 102,64 MPa. Tresca bierze różnicę skrajnych naprężeń: 96,70 − (−10,99) = 107,69 MPa.',
      caption: 'σ_HMH = 102,64 MPa, σ_T = 107,69 MPa.',
      visual: 'rosette',
      focus: { metric: 'equivalent' },
      formula:
        '\\sigma_{HMH}=\\sqrt{96{,}70^2+96{,}70\\cdot10{,}99+10{,}99^2}=102{,}64\\,\\text{MPa},\\qquad \\sigma_T=96{,}70+10{,}99=107{,}69\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź warunek wytrzymałości',
      narration:
        'Zapasy wynoszą n_HMH = 235/102,64 ≈ 2,29 i n_T = 235/107,69 ≈ 2,18. Oba przekraczają wymagane 2,0, więc warunek jest spełniony, choć zapas nie jest duży.',
      caption: 'Kontrola: n_HMH = 2,29, n_T = 2,18 > 2,0.',
      visual: 'rosette',
      focus: { metric: 'check' },
      formula: 'n_{HMH}=\\frac{235}{102{,}64}=2{,}29,\\qquad n_T=\\frac{235}{107{,}69}=2{,}18,\\qquad 2{,}18>2{,}0',
    },
  ],
} satisfies SolutionData
