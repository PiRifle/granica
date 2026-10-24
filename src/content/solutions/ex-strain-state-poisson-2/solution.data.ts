import type { SolutionData } from '../../model'
import { PoissonExample2Animation } from './animation'

export default {
  id: 'ex-strain-state-poisson-2',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 2',
  duration: 7,
  given: ['σ_z = 0', 'ε_x = 800 με', 'ε_y = 400 με', 'ν = 0,30'],
  result:
    'Podstawiamy ε_x+ε_y=1200 με i ν/(1-ν)=0,3/0,7≈0,4286. Stąd ε_z≈-514 με. Grubość blachy maleje, mimo że naprężenie normalne w kierunku grubości jest zerowe. To ten sam mechanizm, który widzieliśmy w pręcie, tylko opisany w płaskim stanie naprężenia.',
  animation: PoissonExample2Animation,
  scenes: [
    {
      title: 'Model blachy w płaskim stanie naprężenia',
      narration:
        'W stalowej blasze σ_z = 0, a zmierzone odkształcenia w płaszczyźnie wynoszą ε_x = 800 με i ε_y = 400 με. Liczba Poissona materiału to 0,30. Blacha rozciąga się w obu kierunkach płaszczyzny, a jej grubość maleje.',
      caption: 'σ_z = 0, ε_x = 800 με, ε_y = 400 με, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma_z=0,\\qquad \\varepsilon_x=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=400\\,\\mu\\varepsilon,\\qquad \\nu=0{,}30',
    },
    {
      title: 'Związek dla kierunku grubości',
      narration:
        'Nie można napisać ε_z = −νε_x, bo w płaskim stanie naprężenia ε_z zależy od sumy naprężeń w płaszczyźnie. Z prawa Hooke’a dla σ_z = 0 wynika ε_z = −ν(σ_x + σ_y)/E. Grubość zmienia się mimo zerowego naprężenia normalnego w kierunku z.',
      caption: 'ε_z = −ν(σ_x + σ_y)/E, choć σ_z = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\varepsilon_z=-\\frac{\\nu}{E}(\\sigma_x+\\sigma_y)',
    },
    {
      title: 'Dodaj odkształcenia w płaszczyźnie',
      narration:
        'Dodając ε_x i ε_y, otrzymujemy (1 − ν)(σ_x + σ_y)/E, więc sumę naprężeń można wyrazić przez sumę odkształceń. Tutaj ε_x + ε_y = 1200 με. To suma naprężeń w płaszczyźnie steruje skurczem grubości.',
      caption: 'ε_x + ε_y = 1200 με.',
      visual: 'cube',
      focus: { metric: 'sum' },
      formula: '\\varepsilon_x+\\varepsilon_y=\\frac{1-\\nu}{E}(\\sigma_x+\\sigma_y)=800+400=1200\\,\\mu\\varepsilon',
    },
    {
      title: 'Przekształć do postaci roboczej',
      narration:
        'Po podstawieniu sumy naprężeń do wzoru na ε_z otrzymujemy ε_z = −[ν/(1 − ν)](ε_x + ε_y). Współczynnik ν/(1 − ν) wynosi 0,30/0,70 = 0,4286.',
      caption: 'ε_z = −[ν/(1−ν)](ε_x+ε_y), a ν/(1−ν) = 0,4286.',
      visual: 'cube',
      focus: { metric: 'ratio' },
      formula:
        '\\varepsilon_z=-\\frac{\\nu}{1-\\nu}(\\varepsilon_x+\\varepsilon_y),\\qquad \\frac{0{,}30}{1-0{,}30}=0{,}4286',
    },
    {
      title: 'Oblicz odkształcenie grubości',
      narration:
        'Mnożymy współczynnik 0,4286 przez 1200 με i zmieniamy znak. Otrzymujemy ε_z ≈ −514 με, czyli grubość blachy maleje. Skurcz jest większy niż samo −νε_x, bo działają oba odkształcenia w płaszczyźnie.',
      caption: 'ε_z ≈ −514 με; grubość maleje.',
      visual: 'cube',
      focus: { metric: 'thickness' },
      formula: '\\varepsilon_z=-0{,}4286\\cdot1200=-514\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź naprężenia i znak',
      narration:
        'Odwracamy prawo Hooke’a dla płaskiego stanu naprężenia. Czynnik E/(1 − ν²) = 219 780 MPa daje σ_x = 202,20 MPa i σ_y = 140,66 MPa. ε_z jest ujemne mimo dodatnich odkształceń w płaszczyźnie, co potwierdza poprawność znaku.',
      caption: 'σ_x = 202,20 MPa, σ_y = 140,66 MPa, ε_z = −514 με.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\sigma_x=219\\,780\\cdot(800+0{,}30\\cdot400)\\cdot10^{-6}=202{,}20\\,\\text{MPa},\\qquad \\sigma_y=219\\,780\\cdot(400+0{,}30\\cdot800)\\cdot10^{-6}=140{,}66\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
