import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-poisson-2',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 2',
  duration: 7,
  given: ['sigma_z=0', 'varepsilon_x=800', 'varepsilon_y=400', 'nu=0'],
  result:
    'Podstawiamy ε_x+ε_y=1200 με i ν/(1-ν)=0,3/0,7≈0,4286. Stąd ε_z≈-514 με. Grubość blachy maleje, mimo że naprężenie normalne w kierunku grubości jest zerowe. To ten sam mechanizm, który widzieliśmy w pręcie, tylko opisany w płaskim stanie naprężenia.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0008, display: '800 με' },
      { angle: 45, label: '45°', value: 0.0006, display: '600 με' },
      { angle: 90, label: '90°', value: 0.0004, display: '400 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0006,
      radius: 0.0002,
      left: 0.0004,
      right: 0.0008,
      angle: 0,
    },
    values: [
      { label: 'ε_x', value: '800 με', focus: 'gauges', reveal: 0 },
      { label: 'ε_y', value: '400 με', focus: 'gauges', reveal: 0 },
      { label: 'σ_z', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'ε_x+ε_y', value: '1200 με', focus: 'mohr' },
      { label: 'ν/(1−ν)', value: '0,4286', focus: 'stress' },
      { label: 'ε_z', value: '−514 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '600 με', focus: 'mohr' },
      { label: 'R_ε', value: '200 με', focus: 'mohr' },
      { label: 'ε_I', value: '800 με', focus: 'principal' },
      { label: 'ε_II', value: '400 με', focus: 'principal' },
      { label: 'σ_x', value: '202,20 MPa', focus: 'stress' },
      { label: 'σ_y', value: '140,66 MPa', focus: 'stress' },
    ],
    note: 'W płaskim stanie naprężenia ε_z zależy od sumy odkształceń w płaszczyźnie, a nie tylko od ε_x.',
  },
  scenes: [
    {
      title: 'Zapisz płaski stan naprężenia',
      narration:
        'W stalowej blasze σ_z = 0, a zmierzone odkształcenia w płaszczyźnie wynoszą ε_x = 800 με i ε_y = 400 με. Liczba Poissona materiału to 0,30.',
      caption: 'σ_z = 0, ε_x = 800 με, ε_y = 400 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\sigma_z=0,\\qquad \\varepsilon_x=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=400\\,\\mu\\varepsilon',
    },
    {
      title: 'Zapisz związek dla kierunku grubości',
      narration:
        'Nie można napisać ε_z = −νε_x, bo w płaskim stanie naprężenia ε_z zależy od sumy naprężeń w płaszczyźnie. Z prawa Hooke’a dla σ_z = 0 wynika ε_z = −ν(σ_x + σ_y)/E.',
      caption: 'ε_z = −ν(σ_x + σ_y)/E.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\varepsilon_z=-\\frac{\\nu}{E}(\\sigma_x+\\sigma_y)',
    },
    {
      title: 'Dodaj odkształcenia w płaszczyźnie',
      narration:
        'Dodając ε_x i ε_y, otrzymujemy (1 − ν)(σ_x + σ_y)/E, więc sumę naprężeń można wyrazić przez sumę odkształceń. Tutaj ε_x + ε_y = 1200 με.',
      caption: 'ε_x + ε_y = 1200 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula: '\\varepsilon_x+\\varepsilon_y=\\frac{1-\\nu}{E}(\\sigma_x+\\sigma_y)=800+400=1200\\,\\mu\\varepsilon',
    },
    {
      title: 'Przekształć do postaci roboczej',
      narration:
        'Po podstawieniu sumy naprężeń do wzoru na ε_z otrzymujemy ε_z = −[ν/(1 − ν)](ε_x + ε_y). Współczynnik ν/(1 − ν) wynosi 0,30/0,70 = 0,4286.',
      caption: 'ε_z = −[ν/(1−ν)](ε_x+ε_y).',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\varepsilon_z=-\\frac{\\nu}{1-\\nu}(\\varepsilon_x+\\varepsilon_y),\\qquad \\frac{0{,}30}{1-0{,}30}=0{,}4286',
    },
    {
      title: 'Oblicz odkształcenie grubości',
      narration:
        'Mnożymy współczynnik 0,4286 przez 1200 με i zmieniamy znak. Otrzymujemy ε_z ≈ −514 με, czyli grubość blachy maleje.',
      caption: 'ε_z ≈ −514 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_z=-0{,}4286\\cdot1200=-514\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'W płaszczyźnie xy ścinanie jest zerowe. Środek koła wynosi 600 με, a promień 200 με, więc skrajne odkształcenia to 800 με i 400 με.',
      caption: 'ε_sr = 600 με, R_ε = 200 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{800+400}{2}=600\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{800-400}{2}=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz naprężenia w płaszczyźnie',
      narration:
        'Odwracamy prawo Hooke’a dla płaskiego stanu naprężenia. Czynnik E/(1 − ν²) = 219 780 MPa daje σ_x = 202,20 MPa i σ_y = 140,66 MPa.',
      caption: 'σ_x = 202,20 MPa, σ_y = 140,66 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=219\\,780\\cdot(800+0{,}30\\cdot400)\\cdot10^{-6}=202{,}20\\,\\text{MPa},\\qquad \\sigma_y=219\\,780\\cdot(400+0{,}30\\cdot800)\\cdot10^{-6}=140{,}66\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź kierunki i znak',
      narration:
        'Kierunki główne pokrywają się z osiami x i y, bo γ_xy = 0. ε_z jest ujemne, mimo dodatnich odkształceń w płaszczyźnie, co potwierdza poprawność znaku w przekształceniu.',
      caption: 'Kontrola: ε_I = 800 με, ε_II = 400 με, ε_z = −514 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=600+200=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=600-200=400\\,\\mu\\varepsilon,\\qquad |\\varepsilon_z|=514\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
