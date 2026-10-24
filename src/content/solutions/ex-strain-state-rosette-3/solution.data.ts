import type { SolutionData } from '../../model'
import { StrainRosetteExample3Animation } from './animation'

export default {
  id: 'ex-strain-state-rosette-3',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 3',
  duration: 7,
  given: ['varepsilon_1=700', 'varepsilon_2=-100', 'theta_p=20°'],
  result:
    'Dla kierunku 45° kąt względem kierunku głównego wynosi 45° − 20° = 25°, więc 2θ = 50°. Stąd ε_45 = 300 + 400·cos 50° ≈ 300 + 257 = 557 με. Odczyty wynoszą więc około 606, 557 i −6 με. Kontrola: γ_xy = 2·557 − 606 − (−6) = 514 μrad, co odpowiada 2R_ε·sin 40° = 800·0,643 ≈ 514 μrad.',
  animation: StrainRosetteExample3Animation,
  scenes: [
    {
      title: 'Zapisz dany stan główny',
      narration:
        'W punkcie panują odkształcenia główne εⅠ = 700 με i εⅡ = −100 με, a pierwszy kierunek główny jest odchylony o 20° od osi x. Na tej podstawie wyznaczymy wskazania rozety 0°/45°/90°. Animacja pokazuje kierunki główne i znany stan na kole Mohra.',
      caption: 'Dane: εⅠ = 700 με, εⅡ = −100 με, φⅠ = 20°.',
      visual: 'rosette',
      focus: { metric: 'model' },
      formula:
        '\\varepsilon_I=700\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-100\\,\\mu\\varepsilon,\\qquad \\varphi_I=20^\\circ',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Środek koła to średnia odkształceń głównych, a promień to połowa ich różnicy. Otrzymujemy ε_sr = 300 με i R_ε = 400 με. Animacja odkłada środek i promień, a następnie zakreśla koło przechodzące przez oba punkty główne.',
      caption: 'ε_sr = 300 με, R_ε = 400 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{700+(-100)}{2}=300\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{700-(-100)}{2}=400\\,\\mu\\varepsilon',
    },
    {
      title: 'Odtwórz odczyt czujnika 0°',
      narration:
        'Odczyt czujnika 0° otrzymujemy z transformacji ε₀ = ε_sr + R_ε cos(2(0° − 20°)). Cosinus −40° wynosi około 0,766, więc ε₀ ≈ 606,42 με. Na kole punkt dla kierunku 0° leży pod kątem 40° od osi odkształceń głównych.',
      caption: 'ε₀ = 606,42 με.',
      visual: 'rosette',
      focus: { metric: 'gauge0' },
      formula: '\\varepsilon_0=300+400\\cdot\\cos(-40^\\circ)=300+400\\cdot0{,}766=606{,}42\\,\\mu\\varepsilon',
    },
    {
      title: 'Odtwórz odczyty 45° i 90°',
      narration:
        'Analogicznie dla 90° kąt względem kierunku głównego wynosi 70°, a dla 45° — 25°. Otrzymujemy ε₉₀ ≈ −6,42 με oraz ε₄₅ ≈ 557,12 με. Animacja dorysowuje pozostałe dwa kierunki i ich rzuty na oś odkształceń.',
      caption: 'ε₉₀ = −6,42 με, ε₄₅ = 557,12 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_{90}=300+400\\cdot\\cos(140^\\circ)=-6{,}42\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=300+400\\cdot\\cos(50^\\circ)=557{,}12\\,\\mu\\varepsilon',
    },
    {
      title: 'Kontrola: ścinanie i kąt',
      narration:
        'Kontrolnie obliczamy γ_xy z trzech odczytów. Wynosi ono 514,23 μrad i zgadza się z wartością 2R_ε sin 40° = 514,23 μrad. Kąt φⅠ = 20° odtwarzamy też z tangensa podwójnego kąta: γ_xy/(ε₀ − ε₉₀) ≈ 0,839, czyli 2φ ≈ 40°.',
      caption: 'γ_xy = 514,23 μrad; 2φⅠ ≈ 40°, φⅠ ≈ 20°.',
      visual: 'rosette',
      focus: { metric: 'check' },
      formula:
        '\\gamma_{xy}=2\\cdot557{,}12-606{,}42-(-6{,}42)=514{,}23\\,\\mu\\text{rad},\\qquad \\tan2\\varphi_I=\\frac{514{,}23}{606{,}42-(-6{,}42)}=0{,}839,\\qquad 2\\varphi_I=40^\\circ',
    },
    {
      title: 'Model materiału i naprężenia',
      narration:
        'Przyjmujemy stal izotropową o E = 200 GPa i ν = 0,30. Czynnik E/(1 − ν²) = 219 780 MPa pozwala zamienić odkształcenia główne na naprężenia. Po podstawieniu σⅠ = 147,25 MPa, a σⅡ = 24,18 MPa. Oba naprężenia są dodatnie, mimo że εⅡ jest ujemne, bo w płaskim stanie naprężenia decyduje suma odkształceń w obu kierunkach.',
      caption: 'E = 200 GPa, ν = 0,30; σⅠ = 147,25 MPa, σⅡ = 24,18 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa},\\qquad \\sigma_I=219\\,780\\cdot(700+0{,}30\\cdot(-100))\\cdot10^{-6}=147{,}25\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-100+0{,}30\\cdot700)\\cdot10^{-6}=24{,}18\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
