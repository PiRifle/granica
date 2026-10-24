import type { SolutionData } from '../../model'
import { PrincipalExample1Animation } from './animation'

export default {
  id: 'ex-stress-state-principal',
  title: 'Naprężenia główne: skrajne wartości bez ścinania — przykład 1',
  animation: PrincipalExample1Animation,
  duration: 7,
  given: ['σ_x = -20 MPa', 'σ_y = 60 MPa', 'τ_xy = 30 MPa', 'σ_z = 0'],
  result:
    'Po uporządkowaniu σ_I=70 MPa, σ_II=0, σ_III=-30 MPa. Występuje zarówno rozciąganie, jak i ściskanie. Największe rozciąganie wynosi 70 MPa, a największe ściskanie -30 MPa. Maksymalne ścinanie absolutne w tym przypadku wynosi (70-(-30))/2=50 MPa.',
  figure: {
    kind: 'cube',
    stresses: { x: -20, y: 60, z: 0 },
    values: [
      { label: 'σ_x', value: '−20 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '20 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: 'σ_I', value: '70 MPa', focus: 'principal' },
      { label: 'σ_II', value: '0 MPa', focus: 'principal' },
      { label: 'σ_III', value: '−30 MPa', focus: 'principal' },
      { label: 'τ_max abs', value: '50 MPa', focus: 'principal' },
    ],
    note: 'Płaski stan naprężenia z σ_z = 0; zero jest naprężeniem pośrednim, więc nie zwiększa maksymalnego ścinania.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Dany jest płaski stan naprężenia: σ_x=-20 MPa, σ_y=60 MPa, τ_xy=30 MPa i σ_z=0. Ujemne σ_x oznacza ściskanie w kierunku x, a dodatnie σ_y rozciąganie w kierunku y. Szukamy kierunków, w których ścinanie znika.',
      caption: 'Element z ścinaniem: σ_x jest ściskające, σ_y rozciągające.',
      visual: 'cube',
      focus: { metric: 'given' },
      formula:
        '\\sigma_x=-20\\ \\text{MPa},\\quad \\sigma_y=60\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\sigma_z=0',
    },
    {
      title: 'Koło Mohra: środek i promień',
      narration:
        'Średnia wynosi σ_avg=(-20+60)/2=20 MPa, a połowa różnicy a=(-20-60)/2=-40 MPa. Promień R=√((-40)^2+30^2)=50 MPa. Punkt stanu (−20; 30) leży na kole o środku w σ_avg.',
      caption: 'Punkt stanu krąży po kole Mohra; jego odległość od środka wynosi R = 50 MPa.',
      visual: 'cube',
      focus: { metric: 'mohr' },
      formula:
        '\\sigma_{avg}=20\\ \\text{MPa},\\quad a=-40\\ \\text{MPa},\\quad R=\\sqrt{(-40)^2+30^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Obrót do kierunków głównych',
      narration:
        'Obracamy element o kąt główny θ_p=71,6°. W tym położeniu τ znika, a naprężenia normalne osiągają wartości skrajne: 70 MPa i -30 MPa. Na kole Mohra punkt stanu dochodzi do osi σ.',
      caption: 'W kierunkach głównych τ = 0, a σ osiąga 70 i −30 MPa.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '\\tan 2\\theta_p=\\frac{2\\tau_{xy}}{\\sigma_x-\\sigma_y},\\qquad \\theta_p=71{,}6^\\circ',
    },
    {
      title: 'Trzy naprężenia główne',
      narration:
        'Do dwóch wartości płaskich dodajemy σ_z=0 i porządkujemy: σ_I=70 MPa, σ_II=0, σ_III=-30 MPa. Zero jest tutaj naprężeniem pośrednim, bo leży między -30 i 70 MPa.',
      caption: 'Zero jest pełnoprawnym naprężeniem głównym i leży między wartościami skrajnymi.',
      visual: 'cube',
      focus: { metric: 'order' },
      formula: '\\sigma_I=70\\ \\text{MPa},\\quad \\sigma_{II}=0,\\quad \\sigma_{III}=-30\\ \\text{MPa}',
    },
    {
      title: 'Maksymalne ścinanie i kontrola',
      narration:
        'Maksymalne ścinanie absolutne wynosi (70-(-30))/2=50 MPa. Największe koło Mohra obejmuje σ_III i σ_I. Kontrola śladu: 70+0-30=40 MPa, czyli tyle samo co -20+60+0.',
      caption: 'Największe koło łączy σ_III i σ_I; zero nie zwiększa maksymalnego ścinania.',
      visual: 'cube',
      focus: { metric: 'shear' },
      formula: '\\tau_{\\max}^{abs}=\\frac{70-(-30)}{2}=50\\ \\text{MPa},\\qquad 70+0-30=40\\ \\text{MPa}=-20+60+0',
    },
  ],
} satisfies SolutionData
