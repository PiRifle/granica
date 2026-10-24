import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-composite-static-moments-2',
  title: 'Momenty statyczne i figury złożone — przykład 2',
  duration: 7,
  given: ['środnik 10 × 180 mm', 'półki 80 × 10 mm'],
  result:
    'Zatem x=73 000/3400≈ 21,47 mm. Wynik leży między 5 mm a 40 mm i jest bliżej środnika, który ma największe pole. Gdybyśmy przez pomyłkę policzyli środnik jako pełny prostokąt 10 × 200 mm, a półki jako 80 × 10 mm, pole wzrosłoby do 3600 mm² i pojawiłby się podwójnie policzony narożnik 10 × 10 mm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CompositeStaticMoments2Animation }))),
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Rozważmy kanał (ceownik) otwarty w prawo: środnik 10 × 180 mm oraz dwie półki 80 × 10 mm, górna i dolna. Wysokość całkowita wynosi 200 mm, a szerokość 80 mm. Dzielimy przekrój tak, aby części nie nachodziły na siebie.',
      caption: 'Ceownik otwarty w prawo; początek układu w lewym dolnym narożniku półki dolnej.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'A_1=10\\cdot180,\\quad A_2=A_3=80\\cdot10',
    },
    {
      title: 'Podział na części i pola',
      narration:
        'Środnik zajmuje pas między półkami: 10 × 180 mm, jego pole wynosi 1800 mm², a środek leży w (5; 100). Półka dolna ma pole 800 mm² i środek (40; 5), a górna 800 mm² i środek (40; 195). Taki podział nie liczy narożników dwukrotnie, a pole całkowite wynosi A = 3400 mm².',
      caption: 'Trzy prostokąty bez nakładania się; A₁ = 1800 mm², A₂ = A₃ = 800 mm², A = 3400 mm².',
      visual: 'section',
      focus: { metric: 'parts' },
      formula: 'A_1=1800,\\quad A_2=A_3=800,\\quad A=3400\\ \\text{mm}^2',
    },
    {
      title: 'Ramiona względem osi',
      narration:
        'Dla momentu względem osi x potrzebne są pionowe ramiona y₁ = 100 mm, y₂ = 5 mm i y₃ = 195 mm. Dla momentu względem osi y potrzebne są poziome ramiona x₁ = 5 mm oraz x₂ = x₃ = 40 mm.',
      caption: 'Ramiona każdej części mierzone od wspólnego początku układu.',
      visual: 'section',
      focus: { metric: 'arms' },
      formula:
        '\\bar{y}_1=100,\\ \\bar{y}_2=5,\\ \\bar{y}_3=195;\\quad \\bar{x}_1=5,\\ \\bar{x}_2=\\bar{x}_3=40\\ \\text{mm}',
    },
    {
      title: 'Sumowanie momentów względem osi x',
      narration:
        'Sx = 1800·100 + 800·5 + 800·195 = 180 000 + 4000 + 156 000 = 340 000 mm³. Dolna półka chwilowo ściąga wskaźnik w dół, a górna przywraca symetrię, więc y = Sx/A = 100 mm.',
      caption: 'Suma momentów względem osi x daje y = 100 mm.',
      visual: 'section',
      focus: { metric: 'sx' },
      formula: 'S_x=1800\\cdot100+800\\cdot5+800\\cdot195=340\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Sumowanie momentów względem osi y',
      narration:
        'Sy = 1800·5 + 800·40 + 800·40 = 9000 + 32 000 + 32 000 = 73 000 mm³. Wskaźnik poziomy przesuwa się w stronę środnika, bo to on ma największe pole.',
      caption: 'Suma momentów względem osi y daje x ≈ 21,47 mm.',
      visual: 'section',
      focus: { metric: 'sy' },
      formula: 'S_y=1800\\cdot5+800\\cdot40+800\\cdot40=73\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Środek ciężkości i interpretacja',
      narration:
        'Zatem x = 73 000/3400 ≈ 21,47 mm, a y = 100 mm. Centroid leży między x = 5 mm a x = 40 mm, bliżej środnika, który ma największe pole. Osie centralne przechodzą przez punkt C = (21,47; 100) mm.',
      caption: 'Centroid leży blisko środnika, bo jego pole dominuje w przekroju.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{x}=73\\,000/3400\\approx21{,}47\\ \\text{mm},\\quad \\bar{y}=100\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
