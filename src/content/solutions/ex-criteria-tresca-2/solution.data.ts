import type { SolutionData } from '../../model'
import { TrescaExample2Animation } from './animation'

export default {
  id: 'ex-criteria-tresca-2',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 2',
  animation: TrescaExample2Animation,
  duration: 7,
  given: ['σx = 90 MPa', 'σy = 30 MPa', 'τxy = 20 MPa'],
  result:
    'Dla porównania, gdyby τxy = 0, to σ1 = 90 MPa, σ2 = 30 MPa i σ3 = 0, więc σT = 90 MPa. Różnica σ1 − σ2 = 60 MPa byłaby jeszcze bardziej myląca. Widać, że w stanie płaskim z naprężeniami tego samego znaku zero jest pełnoprawnym naprężeniem skrajnym i nie wolno go pomijać.',
  figure: {
    kind: 'cube',
    stresses: { x: 90, y: 30, z: 0 },
    strains: { x: 0.00045, y: 0.000015, z: -0.00018 },
    volumeChange: '0,0285%',
    values: [
      { label: 'σ_x', value: '90 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '30 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '20 MPa', focus: 'stress', reveal: 0 },
      { label: 'C', value: '60 MPa', focus: 'stress' },
      { label: 'R', value: '36,06 MPa', focus: 'stress' },
      { label: 'σ_1', value: '96,06 MPa', focus: 'stress' },
      { label: 'σ_2', value: '23,94 MPa', focus: 'stress' },
      { label: 'σ_3', value: '0 MPa', focus: 'stress' },
      { label: 'σ_T', value: '96,06 MPa', focus: 'stress' },
      { label: 'σ_1−σ_2', value: '72,12 MPa', focus: 'stress' },
      { label: 'ε_x', value: '450 με', focus: 'strain' },
      { label: 'γ_xy', value: '260 μrad', focus: 'strain' },
      { label: 'θ', value: '285 με', focus: 'volume' },
    ],
    note: 'Największa różnica naprężeń obejmuje zero, a nie różnicę dwóch naprężeń dodatnich.',
  },
  scenes: [
    {
      title: 'Zapisz płaski stan naprężenia',
      narration:
        'W blasze działają σ_x = 90 MPa, σ_y = 30 MPa i τ_xy = 20 MPa. Oba naprężenia normalne są dodatnie, więc zero będzie najmniejszym naprężeniem głównym.',
      caption: 'σ_x = 90 MPa, σ_y = 30 MPa, τ_xy = 20 MPa, σ_z = 0.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula: '\\sigma_x=90\\,\\text{MPa},\\quad \\sigma_y=30\\,\\text{MPa},\\quad \\tau_{xy}=20\\,\\text{MPa}',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Środek koła wynosi C = (90 + 30)/2 = 60 MPa. Promień to √(30² + 20²) = 36,06 MPa. Punkt stanu P(90; 20) leży na kole, a zero pozostaje poza nim.',
      caption: 'C = 60 MPa, R = 36,06 MPa, zero leży poza kołem.',
      visual: 'cube',
      focus: { metric: 'circle' },
      formula: 'C=\\frac{90+30}{2}=60\\,\\text{MPa},\\quad R=\\sqrt{30^2+20^2}=36{,}06\\,\\text{MPa}',
    },
    {
      title: 'Dodaj zero i zbuduj trzy koła',
      narration:
        'Otrzymujemy σ_1 = 96,06 MPa, σ_2 = 23,94 MPa i σ_3 = 0. Po dodaniu zera powstają trzy koła. Największe z nich obejmuje σ_1 i σ_3, bo zero jest mniejsze od σ_2.',
      caption: 'Największe koło łączy σ_1 = 96,06 MPa z zerem.',
      visual: 'cube',
      focus: { metric: 'three' },
      formula: 'R_{12}=36{,}06\\,\\text{MPa},\\quad R_{23}=11{,}97\\,\\text{MPa},\\quad R_{13}=48{,}03\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz naprężenie zredukowane Tresca',
      narration:
        'Naprężenie zredukowane to średnica największego koła: σ_T = 96,06 − 0 = 96,06 MPa. Błędne wzięcie tylko σ_1 − σ_2 = 72,12 MPa zaniżyłoby wytężenie o około 25%.',
      caption: 'σ_T = 96,06 MPa, a σ_1 − σ_2 = 72,12 MPa.',
      visual: 'cube',
      focus: { metric: 'tresca' },
      formula: '\\sigma_T=\\sigma_1-\\sigma_3=96{,}06-0=96{,}06\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź przez trzy różnice',
      narration:
        'Kontrola potwierdza wybór: różnice wynoszą 72,12, 23,94 i 96,06 MPa. Największa jest różnica z zerem, więc σ_T = 96,06 MPa.',
      caption: 'Największa różnica to 96,06 MPa.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '|96{,}06-23{,}94|=72{,}12,\\quad |23{,}94-0|=23{,}94,\\quad |0-96{,}06|=96{,}06',
    },
  ],
} satisfies SolutionData
