import type { SolutionData } from '../../model'
import { ShearStressStrainExample1Animation } from './animation'

export default {
  id: 'ex-shear-stress-strain',
  title: 'Naprężenia i odkształcenia styczne — przykład 1',
  duration: 7,
  given: ['tau = 60 MPa', 'E = 200 GPa', 'nu = 0,3'],
  result: 'G ≈ 76,9 GPa, γ ≈ 7,8 · 10^-4 rad, czyli około 0,045°. Naprężenia główne wynoszą +60 MPa i -60 MPa.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: 0, z: 0 },
    values: [
      { label: 'τ', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'design', reveal: 0 },
      { label: 'ν', value: '0,3', focus: 'design', reveal: 0 },
      { label: 'γ', value: '7,8·10⁻⁴ rad', focus: 'stress', reveal: 0 },
    ],
    note: 'Czyste ścinanie: na ściankach działa tylko naprężenie styczne τ, a element odkształca się postaciowo.',
  },
  animation: ShearStressStrainExample1Animation,
  scenes: [
    {
      title: 'Element w czystym ścinaniu',
      narration:
        'Na ściankach elementu działają tylko naprężenia styczne τ = 60 MPa. Kwadrat odkształca się w równoległobok: boki prawie nie zmieniają długości, ale kąty proste przestają być proste.',
      caption: 'Czyste ścinanie: tylko τ, bez naprężeń normalnych na ściankach.',
      visual: 'cube',
      focus: { metric: 'model' },
      formula: '\\tau = 60\\ \\text{MPa}',
    },
    {
      title: 'Moduł ścinania z E i ν',
      narration: 'Oblicz moduł ścinania: G = 200/[2(1+0,3)] = 200/2,6 = 76,92 GPa.',
      caption: 'Dwie stałe sprężystości wyznaczają trzecią: G = E/[2(1+ν)].',
      visual: 'cube',
      focus: { metric: 'G' },
      formula: 'G = 200/[2(1+0{,}3)] = 200/2{,}6 = 76{,}92\\ \\text{GPa}',
    },
    {
      title: 'Odkształcenie postaciowe',
      narration:
        'Odkształcenie obliczamy z prawa Hooke’a: γ = τ/G = 60/76 920 = 0,00078 rad, czyli około 0,045°. Kąt jest tak mały, że na rysunku trzeba go powiększyć.',
      caption: 'Nachylenie prostej τ(γ) to moduł ścinania G.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula: '\\gamma = \\tau/G = 60/76\\,920 = 0{,}00078\\ \\text{rad} \\approx 0{,}045^\\circ',
    },
    {
      title: 'Naprężenia główne',
      narration: 'Odczytaj naprężenia główne: σ_1 = +60 MPa, σ_2 = -60 MPa.',
      caption: 'Na płaszczyznach obróconych o 45° nie ma τ, a naprężenia normalne wynoszą ±τ.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_{1,2} = \\pm\\tau = \\pm 60\\ \\text{MPa}',
    },
    {
      title: 'Sprawdzenie objętości',
      narration: 'Sprawdź: σ_1 + σ_2 = 0, co potwierdza brak pierwszej zmiany objętości.',
      caption: 'Jedna przekątna się wydłuża, druga skraca — kształt się zmienia, objętość praktycznie nie.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_1 + \\sigma_2 = 60 - 60 = 0',
    },
  ],
} satisfies SolutionData
