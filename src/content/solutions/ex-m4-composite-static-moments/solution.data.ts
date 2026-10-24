import type { SolutionData } from '../../model'
import { CompositeStaticMomentsAnimation } from './animation'

export default {
  id: 'ex-m4-composite-static-moments',
  title: 'Momenty statyczne i figury złożone — przykład 1',
  duration: 7,
  given: ['środnik 20 × 100 mm', 'półka 120 × 20 mm'],
  result:
    'Pole przekroju wynosi 4400 mm^2, czyli 44 cm^2. Środek ciężkości leży 82,73 mm nad dolnym końcem środnika, a jego współrzędna pozioma to 60 mm. Momenty statyczne wynoszą S_x=364 000 mm^3 i S_y=264 000 mm^3.',
  animation: CompositeStaticMomentsAnimation,
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przyjmujemy początek układu na dolnym końcu środnika, oś y pionowo w górę, a oś x poziomo. Przekrój składa się ze środnika 20 × 100 mm i półki 120 × 20 mm. Oś y pokrywa się z osią symetrii.',
      caption: 'Teownik złożony z dwóch prostokątów; oś y przechodzi przez środek półki i środnika.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'A_1=20\\cdot100,\\quad A_2=120\\cdot20',
    },
    {
      title: 'Podział na części i pola',
      narration:
        'Środnik ma pole A₁ = 20·100 = 2000 mm² i środek w punkcie (60; 50). Półka ma pole A₂ = 120·20 = 2400 mm² i środek w (60; 110). Części nie nachodzą na siebie, więc ich pola można dodać: A = 4400 mm².',
      caption: 'Dwa prostokąty bez nakładania się; A₁ = 2000 mm², A₂ = 2400 mm², A = 4400 mm².',
      visual: 'section',
      focus: { metric: 'parts' },
      formula: 'A_1=2000,\\quad A_2=2400,\\quad A=4400\\ \\text{mm}^2',
    },
    {
      title: 'Ramiona względem osi',
      narration:
        'Moment względem osi x używa pionowych odległości y₁ = 50 mm i y₂ = 110 mm. Moment względem osi y używa poziomych odległości x₁ = x₂ = 60 mm, bo oba środki leżą na osi symetrii.',
      caption: 'Ramiona y₁, y₂ do osi x oraz x₁, x₂ do osi y.',
      visual: 'section',
      focus: { metric: 'arms' },
      formula: '\\bar{y}_1=50,\\quad \\bar{y}_2=110,\\quad \\bar{x}_1=\\bar{x}_2=60\\ \\text{mm}',
    },
    {
      title: 'Sumowanie momentów względem osi x',
      narration:
        'Dodajemy momenty części: A₁y₁ = 100 000 mm³ i A₂y₂ = 264 000 mm³, więc Sx = 364 000 mm³. Wskaźnik na osi y przesuwa się wraz z narastaniem sumy do poziomu y = Sx/A ≈ 82,73 mm.',
      caption: 'Wskaźnik y przesuwa się od pierwszego składnika do wypadkowego poziomu środka.',
      visual: 'section',
      focus: { metric: 'sx' },
      formula: 'S_x=2000\\cdot50+2400\\cdot110=364\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Sumowanie momentów względem osi y',
      narration:
        'Składniki A₁x₁ = 120 000 mm³ i A₂x₂ = 144 000 mm³ dają Sy = 264 000 mm³, a x = Sy/A = 60 mm. Oś y jest osią symetrii, więc wskaźnik poziomy nie odchyla się od 60 mm.',
      caption: 'Przy symetrii oba składniki poziome są równe, a x = 60 mm.',
      visual: 'section',
      focus: { metric: 'sy' },
      formula: 'S_y=2000\\cdot60+2400\\cdot60=264\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Środek ciężkości i osie centralne',
      narration:
        'Osie centralne przecinają się w punkcie C = (60; 82,73) mm. Względem tych osi suma momentów statycznych części jest zerowa, co jest kontrolą poprawności wyznaczonego środka.',
      caption: 'Osie centralne przechodzą przez C; moment względem każdej z nich wynosi zero.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{x}=\\frac{S_y}{A}=60,\\quad \\bar{y}=\\frac{S_x}{A}\\approx82{,}73\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
