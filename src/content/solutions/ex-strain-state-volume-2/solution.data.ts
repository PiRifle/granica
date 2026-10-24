import type { SolutionData } from '../../model'
import { StrainStateVolumeExample2Animation } from './animation'

export default {
  id: 'ex-strain-state-volume-2',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 2',
  duration: 7,
  given: ['σ_x=150 MPa', 'σ_y=σ_z=0', 'E=200 GPa', 'ν=0,30'],
  result:
    'ε_x=750 με, ε_y=ε_z=−225 με, a ślad tensora wynosi 300 με. Objętość rośnie o 0,03 %, mimo że dwie z trzech krawędzi się skracają.',
  animation: StrainStateVolumeExample2Animation,
  figure: {
    kind: 'cube',
    stresses: { x: 150, y: 0, z: 0 },
    strains: { x: 0.00075, y: -0.000225, z: -0.000225 },
    volumeChange: '+0,0003',
    note: 'Dwa odkształcenia poprzeczne są ujemne, ale wydłużenie osiowe przewyższa ich sumę, więc objętość rośnie.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowy element jest rozciągany w kierunku x naprężeniem σx = 150 MPa, a pozostałe naprężenia normalne są zerowe. W kierunku obciążenia element wydłuża się, a w dwóch kierunkach poprzecznych kurczy się przez efekt Poissona.',
      caption: 'σx = 150 MPa, σy = σz = 0; E = 200 GPa, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula:
        '\\sigma_x=150\\,\\text{MPa},\\qquad \\sigma_y=\\sigma_z=0,\\qquad E=200\\,\\text{GPa},\\qquad \\nu=0{,}30',
    },
    {
      title: 'Odkształcenia normalne',
      narration:
        'Odkształcenie osiowe wynosi εx = σx/E = 150/200 000 = 0,00075, czyli 750 με. Poprzecznie εy = εz = −νεx = −0,30·0,00075 = −0,000225, czyli −225 με. Jedna krawędź się wydłuża, dwie inne skracają.',
      caption: 'εx = 750 με, εy = εz = −225 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{150}{200\\,000}=0{,}00075=750\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=\\varepsilon_z=-0{,}30\\cdot0{,}00075=-225\\,\\mu\\varepsilon',
    },
    {
      title: 'Dylatacja elementu',
      narration:
        'Mimo kurczenia poprzecznego objętość rośnie, bo wydłużenie osiowe jest większe od sumy skurczów. ΔV/V0 = 750 − 225 − 225 = 300 με, czyli 0,03 %. Objętość zmienia się słabiej niż sama długość.',
      caption: 'ΔV/V0 = +300 με = +0,0003.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula:
        '\\frac{\\Delta V}{V_0}\\approx\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=750-225-225=300\\,\\mu\\varepsilon=0{,}0003',
    },
    {
      title: 'Ślad tensora odkształcenia',
      narration:
        'Ślad tensora pokazuje bilans: dodatnie 750 με od rozciągania i dwa ujemne składniki po −225 με. Suma 300 με jest dodatnia, więc objętość rośnie mimo ujemnych odkształceń poprzecznych.',
      caption: 'θ = 750 − 225 − 225 = 300 με.',
      visual: 'cube',
      focus: { metric: 'trace' },
      formula: '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=750-225-225=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Kontrola przez moduł ściśliwości',
      narration:
        'Średnie naprężenie normalne wynosi σśr = 150/3 = 50 MPa, więc p = −50 MPa. Dla K = E/[3(1 − 2ν)] = 166 667 MPa otrzymujemy ΔV/V0 = −p/K = 50/166 667 = 0,0003. Znak dodatni oznacza rozciąganie.',
      caption: 'Kontrola: −(−50)/166 667 = 0,0003.',
      visual: 'cube',
      focus: { metric: 'bulk' },
      formula:
        'p=-\\frac{150}{3}=-50\\,\\text{MPa},\\qquad K=166\\,667\\,\\text{MPa},\\qquad \\frac{\\Delta V}{V_0}=-\\frac{p}{K}=\\frac{50}{166\\,667}=0{,}0003',
    },
    {
      title: 'Kontrola rzędu wielkości',
      narration:
        'Zmiana długości w kierunku x wynosi 750 με = 0,075 %, a zmiana objętości tylko 300 με = 0,03 %. Pojedyncza średnica nie opisuje więc dylatacji: trzeba zsumować wszystkie trzy kierunki.',
      caption: '750 με długości, ale tylko 300 με objętości.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\varepsilon_x=750\\,\\mu\\varepsilon=0{,}075\\,\\%,\\qquad \\theta=300\\,\\mu\\varepsilon=0{,}03\\,\\%',
    },
  ],
} satisfies SolutionData
