import type { SolutionData } from '../../model'
import { ShearStressStrainExample3Animation } from './animation'

export default {
  id: 'ex-shear-stress-strain-3',
  title: 'Naprężenia i odkształcenia styczne — przykład 3',
  duration: 7,
  given: ['tau = 72 MPa', 'gamma = 0,0009 rad', 'nu = 0,3'],
  result:
    'Uwaga na jednostki: E i G podaje się zwykle w GPa, a naprężenia w zadaniach często w MPa. Przy podstawianiu zamień 1 GPa = 1000 MPa. Jeśli tego nie zrobisz, odkształcenie wyjdzie tysiąc razy za małe, a wynik będzie wyglądał pozornie poprawnie.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: 0, z: 0 },
    values: [
      { label: 'τ', value: '72 MPa', focus: 'stress', reveal: 0 },
      { label: 'γ', value: '0,0009 rad', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,3', focus: 'design', reveal: 0 },
    ],
    note: 'Z pomiaru τ i γ wyznaczamy moduł ścinania, a następnie moduł Younga.',
  },
  animation: ShearStressStrainExample3Animation,
  scenes: [
    {
      title: 'Pomiar τ i γ',
      narration:
        'Z pomiaru znamy naprężenie styczne τ = 72 MPa i odkształcenie γ = 0,0009 rad. Na tej podstawie wyznaczymy moduł ścinania, a następnie moduł Younga dla ν = 0,3.',
      caption: 'Dwa zmierzone parametry stanu wyznaczają nachylenie τ(γ).',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\tau = 72\\ \\text{MPa},\\quad \\gamma = 0{,}0009\\ \\text{rad}',
    },
    {
      title: 'Moduł ścinania z pomiaru',
      narration:
        'Moduł ścinania to iloraz naprężenia i odkształcenia: G = τ/γ = 72/0,0009 = 80 000 MPa = 80 GPa. Taka wartość jest typowa dla stali.',
      caption: 'Nachylenie prostej τ(γ) daje G.',
      visual: 'cube',
      focus: { metric: 'G' },
      formula: 'G = \\tau/\\gamma = 72/0{,}0009 = 80\\,000\\ \\text{MPa} = 80\\ \\text{GPa}',
    },
    {
      title: 'Moduł Younga i granice ν',
      narration:
        'Moduł Younga obliczamy z zależności E = 2G(1+ν) = 2 · 80 · 1,3 = 208 GPa. To nieco więcej niż typowe 200 GPa, ale mieści się w zakresie stali stopowych. Dla ν → 0,5 byłoby G = E/3, a dla ν = 0 mamy G = E/2.',
      caption: 'Stosunek G/E zależy tylko od liczby Poissona.',
      visual: 'cube',
      focus: { metric: 'E' },
      formula: 'E = 2G(1+\\nu) = 2 \\cdot 80 \\cdot 1{,}3 = 208\\ \\text{GPa}',
    },
    {
      title: 'Naprężenia główne',
      narration:
        'W czystym ścinaniu naprężenia główne wynoszą σ_1 = +72 MPa i σ_2 = -72 MPa. Działają na płaszczyznach obróconych o 45° względem płaszczyzn ścinania.',
      caption: 'Koło Mohra ma środek w zerze i promień R = τ.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{1,2} = \\pm 72\\ \\text{MPa}',
    },
    {
      title: 'Pomiar i sprawdzenie',
      narration:
        'Pomiar G wykonuje się na przykład w próbie skręcania cienkościennej rurki. Zamiast mierzyć G bezpośrednio, często wystarczy znać E i ν. Uwaga na jednostki: 1 GPa = 1000 MPa; przy podstawianiu zamień GPa na MPa, inaczej wynik wyjdzie tysiąc razy za mały.',
      caption: 'Sprawdź jednostki i sens fizyczny: G = 80 GPa to typowa stal.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: 'G = 80\\ \\text{GPa} = 80\\,000\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
