import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-stress-state-principal-2',
  title: 'Naprężenia główne: skrajne wartości bez ścinania — przykład 2',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PrincipalExample2Animation }))),
  duration: 7,
  given: ['σ_x = 90 MPa', 'σ_y = 30 MPa', 'τ_xy = 40 MPa', 'σ_z = 0'],
  result:
    'Ten przykład pokazuje, dlaczego w kryteriach wytężenia nie wystarcza różnica σ_1-σ_2. Dla materiału ciągliwego miarą może być różnica σ_I-σ_III, a ta zależy od tego, czy zero jest skrajne. Wystarczy zmienić znak jednego naprężenia płaskiego, żeby maksymalne ścinanie przeskoczyło na inną płaszczyznę.',
  figure: {
    kind: 'cube',
    stresses: { x: 90, y: 30, z: 0 },
    values: [
      { label: 'σ_x', value: '90 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_avg', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '50 MPa', focus: 'stress' },
      { label: 'σ_I', value: '110 MPa', focus: 'principal' },
      { label: 'σ_II', value: '10 MPa', focus: 'principal' },
      { label: 'σ_III', value: '0 MPa', focus: 'principal' },
      { label: 'τ_max płaskie', value: '50 MPa', focus: 'principal' },
      { label: 'τ_max abs', value: '55 MPa', focus: 'principal' },
    ],
    note: 'Oba naprężenia płaskie są dodatnie; zero jest najmniejszym naprężeniem głównym.',
  },
  scenes: [
    {
      title: 'Dane i tensor',
      narration:
        'Rozważmy stan, w którym oba naprężenia w płaszczyźnie są dodatnie: σ_x=90 MPa, σ_y=30 MPa, τ_xy=40 MPa i σ_z=0. Mimo dodatnich naprężeń normalnych w płaszczyźnie trzeba pamiętać o trzecim kierunku.',
      caption: 'Płaski stan naprężenia z dodatnimi naprężeniami normalnymi.',
      visual: 'cube',
      focus: { metric: 'given' },
      formula:
        '\\sigma_x=90\\ \\text{MPa},\\quad \\sigma_y=30\\ \\text{MPa},\\quad \\tau_{xy}=40\\ \\text{MPa},\\quad \\sigma_z=0',
    },
    {
      title: 'Koło Mohra: środek i promień',
      narration:
        'Średnia wynosi 60 MPa, połowa różnicy 30 MPa, a promień R=√(30^2+40^2)=50 MPa. Płaskie naprężenia główne to 110 MPa i 10 MPa, a punkt stanu (90; 40) leży na kole.',
      caption: 'Koło Mohra w płaszczyźnie xy ma środek w 60 MPa i promień 50 MPa.',
      visual: 'cube',
      focus: { metric: 'mohr' },
      formula: '\\sigma_{avg}=60\\ \\text{MPa},\\quad a=30\\ \\text{MPa},\\quad R=\\sqrt{30^2+40^2}=50\\ \\text{MPa}',
    },
    {
      title: 'Obrót do kierunków głównych',
      narration:
        'Obracamy element o kąt główny θ_p=26,6°. Ścinanie znika, a naprężenia normalne osiągają 110 MPa i 10 MPa. To są dwa naprężenia główne w płaszczyźnie.',
      caption: 'W kierunkach głównych τ = 0, a σ osiąga 110 i 10 MPa.',
      visual: 'cube',
      focus: { metric: 'rotate' },
      formula: '\\tan 2\\theta_p=\\frac{2\\tau_{xy}}{\\sigma_x-\\sigma_y},\\qquad \\theta_p=26{,}6^\\circ',
    },
    {
      title: 'Trzy naprężenia główne',
      narration:
        'Po dodaniu zera i uporządkowaniu otrzymujemy σ_I=110, σ_II=10 i σ_III=0 MPa. Zero jest tutaj najmniejszym naprężeniem głównym, a nie wartością środkową, bo oba naprężenia płaskie są dodatnie.',
      caption: 'Zero jest naprężeniem skrajnym, a nie pośrednim.',
      visual: 'cube',
      focus: { metric: 'order' },
      formula: '\\sigma_I=110\\ \\text{MPa},\\quad \\sigma_{II}=10\\ \\text{MPa},\\quad \\sigma_{III}=0',
    },
    {
      title: 'Maksymalne ścinanie',
      narration:
        'Maksymalne ścinanie absolutne wynosi (110-0)/2=55 MPa, czyli więcej niż promień koła w płaszczyźnie R=50 MPa. Największe koło Mohra łączy σ_III=0 z σ_I=110, a nie 10 z 110.',
      caption: 'Pominięcie osi z zaniża maksymalne ścinanie o 5 MPa.',
      visual: 'cube',
      focus: { metric: 'shear' },
      formula: '\\tau_{\\max}^{abs}=\\frac{110-0}{2}=55\\ \\text{MPa}>R=50\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
