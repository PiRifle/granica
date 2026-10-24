import type { SolutionData } from '../../model'
import { StrainRosetteExample2Animation } from './animation'

export default {
  id: 'ex-strain-state-rosette-2',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 2',
  duration: 7,
  given: ['varepsilon_0=600', 'varepsilon_45=300', 'varepsilon_90=-200', 'gamma_{xy}=200'],
  result:
    'Wynik mówi, że największe rozciąganie działa pod kątem około 7° od osi pierwszego czujnika. To niewiele, ale przy projektowaniu połączenia lub otworu taki obrót może mieć znaczenie. Drugie odkształcenie główne jest ujemne, czyli w kierunku prostopadłym materiał jest ściskany. Taki stan jest typowy dla rozciągania z udziałem ścinania.',
  animation: StrainRosetteExample2Animation,
  scenes: [
    {
      title: 'Model rozety i trzy odczyty',
      narration:
        'Czujnik 0° wskazuje 600 με, a czujnik 90° −200 με. Trzeci odczyt, 300 με, jest większy od średniej 200 με, co oznacza niezerowe odkształcenie postaciowe. Animacja rysuje kierunki 0°, 45° i 90° oraz przypisuje im odczyty.',
      caption: 'ε₀ = 600 με, ε₄₅ = 300 με, ε₉₀ = −200 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_0=600\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=300\\,\\mu\\varepsilon,\\qquad \\varepsilon_{90}=-200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Z transformacji dla kierunku 45° otrzymujemy γ_xy = 2 · 300 − 600 − (−200) = 200 μrad. Ścinanie jest dodatnie, więc odkształcenie główne obróci się w stronę czujnika 45°. Na kole Mohra punkt 45° oddala się od osi poziomej.',
      caption: 'γ_xy = 200 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=2\\cdot300-600-(-200)=200\\,\\mu\\text{rad}',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Punkty 0° i 90° wyznaczają średnicę koła. Środek koła to średnia odkształceń normalnych, czyli 200 με. Promień obejmuje połowę różnicy ε₀ − ε₉₀ oraz połowę γ_xy: R_ε = √(400² + 100²) = 412,31 με. Animacja odkłada środek, promień i zakreśla koło.',
      caption: 'ε_sr = 200 με, R_ε = 412,31 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{600+(-200)}{2}=200\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{400^2+100^2}=412{,}31\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Dodajemy i odejmujemy promień od średniej. Otrzymujemy εⅠ = 612,31 με oraz εⅡ = −212,31 με. Jedno z nich jest rozciągające, drugie ściskające.',
      caption: 'εⅠ = 612,31 με, εⅡ = −212,31 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=200+412{,}31=612{,}31\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=200-412{,}31=-212{,}31\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Tangens podwójnego kąta to γ_xy/(ε₀ − ε₉₀) = 200/800 = 0,25. Stąd 2φ = 14,036°, a φ = 7,018° od osi czujnika 0°. Drugi kierunek jest prostopadły.',
      caption: 'φⅠ = 7,018°, φⅡ = 97,018°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{200}{600-(-200)}=\\frac{200}{800}=0{,}25,\\qquad \\varphi_I=7{,}018^\\circ',
    },
    {
      title: 'Model materiału i naprężenia',
      narration:
        'Do przeliczenia odkształceń na naprężenia przyjmujemy stal izotropową o E = 200 GPa i ν = 0,30. Czynnik E/(1 − ν²) wynosi 219 780 MPa. W kierunkach głównych σⅠ = 120,58 MPa, a σⅡ = −6,29 MPa. Znaki naprężeń są zgodne ze znakami odkształceń głównych.',
      caption: 'E = 200 GPa, ν = 0,30; σⅠ = 120,58 MPa, σⅡ = −6,29 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa},\\qquad \\sigma_I=219\\,780\\cdot(612{,}31+0{,}30\\cdot(-212{,}31))\\cdot10^{-6}=120{,}58\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-212{,}31+0{,}30\\cdot612{,}31)\\cdot10^{-6}=-6{,}29\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
