import type { SolutionData } from '../../model'

export default {
  id: 'ex-stress-state-principal',
  title: 'Naprężenia główne: skrajne wartości bez ścinania — przykład 1',
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
        'Dany jest płaski stan naprężenia: σ_x=-20 MPa, σ_y=60 MPa, τ_xy=30 MPa i σ_z=0. Szukamy naprężeń głównych i maksymalnego ścinania.',
      caption: 'Tensor naprężenia dla płaskiego stanu z ujemnym σ_x.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=-20\\ \\text{MPa},\\quad \\sigma_y=60\\ \\text{MPa},\\quad \\tau_{xy}=30\\ \\text{MPa},\\quad \\sigma_z=0',
    },
    {
      title: 'Średnia naprężeń',
      narration: 'Średnia płaska: σ_avg=(-20+60)/2=20 MPa.',
      caption: 'Środek koła Mohra na osi naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{avg}=(-20+60)/2=20\\ \\text{MPa}',
    },
    {
      title: 'Połowa różnicy',
      narration:
        'Połowa różnicy: a=(-20-60)/2=-40 MPa. W promieniu występuje jej kwadrat, więc znak a nie wpływa na R.',
      caption: 'Połowa różnicy naprężeń normalnych.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'a=(-20-60)/2=-40\\ \\text{MPa}',
    },
    {
      title: 'Promień koła',
      narration: 'Promień: R=√((-40)^2+30^2)=√(1600+900)=50 MPa.',
      caption: 'Promień koła Mohra.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'R=\\sqrt{(-40)^{2}+30^{2}}=\\sqrt{1600+900}=50\\ \\text{MPa}',
    },
    {
      title: 'Naprężenia główne w płaszczyźnie',
      narration: 'Płaskie wartości: 20+50=70 MPa oraz 20-50=-30 MPa.',
      caption: 'Dwa skrajne naprężenia w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '20+50=70\\ \\text{MPa},\\quad 20-50=-30\\ \\text{MPa}',
    },
    {
      title: 'Trzecie naprężenie główne',
      narration: 'Dodaj trzecie naprężenie główne σ_z=0 i uporządkuj: 70, 0, -30 MPa.',
      caption: 'Zero jest naprężeniem pośrednim.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\sigma_I=70\\ \\text{MPa},\\quad \\sigma_{II}=0,\\quad \\sigma_{III}=-30\\ \\text{MPa}',
    },
    {
      title: 'Kontrola śladu',
      narration: 'Sprawdź ślad: 70+0-30=40 MPa, co zgadza się z -20+60+0.',
      caption: 'Ślad tensora jest niezmiennikiem.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '70+0-30=40\\ \\text{MPa}=-20+60+0',
    },
    {
      title: 'Kontrola iloczynu',
      narration: 'Sprawdź iloczyn płaski: 70·(-30)=-2100, a σ_xσ_y-τ_xy^2=(-20)·60-30^2=-1200-900=-2100.',
      caption: 'Iloczyn naprężeń głównych jest niezmiennikiem.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '70\\cdot(-30)=-2100=(-20)\\cdot60-30^2',
    },
    {
      title: 'Maksymalne ścinanie',
      narration:
        'Maksymalne ścinanie absolutne wynosi (σ_I-σ_III)/2=(70-(-30))/2=50 MPa. W tym przypadku zero nie zwiększa wyniku, bo leży między skrajnymi naprężeniami.',
      caption: 'Maksymalne ścinanie zależy od różnicy skrajnych naprężeń głównych.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula: '\\tau_{\\max}^{abs}=\\frac{70-(-30)}{2}=50\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Po uporządkowaniu σ_I=70 MPa, σ_II=0, σ_III=-30 MPa. Występuje zarówno rozciąganie, jak i ściskanie. Maksymalne ścinanie absolutne wynosi 50 MPa.',
      caption: 'Naprężenia główne opisują skrajne wartości bez ścinania.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\boxed{\\sigma_I=70\\ \\text{MPa},\\quad \\sigma_{II}=0,\\quad \\sigma_{III}=-30\\ \\text{MPa},\\quad \\tau_{\\max}^{abs}=50\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
