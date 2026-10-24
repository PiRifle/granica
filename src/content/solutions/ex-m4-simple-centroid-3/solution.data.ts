import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-simple-centroid-3',
  title: 'Środek ciężkości figur prostych — przykład 3',
  duration: 7,
  given: ['y_C = 40 mm', 'b = 90 mm'],
  result:
    'Wymagana wysokość trójkąta wynosi h=3y_C=120 mm, pole 5400 mm², a środek leży w (30; 40) mm. Podobny wariant odwrotny dla półkola: r=3πy/4, więc dla y=20 mm dostajemy r≈47,1 mm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SimpleCentroidInverseAnimation }))),
  scenes: [
    {
      title: 'Wymaganie i dane',
      narration:
        'Załóżmy, że trójkątna blacha wspornikowa ma mieć środek ciężkości dokładnie 40 mm od podstawy. Przyjmujemy podstawę b=90 mm i szukamy wysokości h. Na rysunku zaznaczono linię wymaganego y_C.',
      caption: 'Podstawa 90 mm, wymagane y_C=40 mm; wysokość h jest niewiadoma.',
      visual: 'section',
      focus: { metric: 'requirement' },
      formula: 'b=90\\ \\text{mm},\\qquad \\bar{y}=40\\ \\text{mm}',
    },
    {
      title: 'Odwrócenie zależności',
      narration:
        'Korzystamy z zależności y=h/3 i rozwiązujemy ją względem h. Zwiększamy wysokość, aż środek znajdzie się na linii y_C=40 mm; wtedy h=3·40=120 mm.',
      caption: 'Wysokość rośnie od stanu wyjściowego do 120 mm, a centroid trafia na wymaganą linię.',
      visual: 'section',
      focus: { metric: 'inverse' },
      formula: 'h=3\\bar{y}=3\\cdot40=120\\ \\text{mm}',
    },
    {
      title: 'Pole i pasy poziome',
      narration:
        'Przy h=120 mm pole wynosi A=bh/2=5400 mm². Pasy poziome pokazują rozkład pola, a pozioma współrzędna środka to b/3=30 mm.',
      caption: 'Pasy poziome, pole 5400 mm² i x_C=30 mm.',
      visual: 'section',
      focus: { metric: 'strips' },
      formula:
        'A=\\frac{bh}{2}=\\frac{90\\cdot120}{2}=5400\\ \\text{mm}^2,\\qquad \\bar{x}=\\frac{b}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Konstrukcja środkowych',
      narration:
        'Środkowe trójkąta przecinają się w środku ciężkości. Punkt (30; 40) mm leży w jednej trzeciej wysokości od podstawy i jednej trzeciej podstawy od boku pionowego.',
      caption: 'Środkowe przecinają się w C=(30; 40) mm.',
      visual: 'section',
      focus: { metric: 'medians' },
      formula: '\\bar{y}=\\frac{h}{3}=\\frac{120}{3}=40\\ \\text{mm},\\qquad \\bar{x}=\\frac{b}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Wynik i osie centralne',
      narration:
        'Przez środek prowadzimy osie centralne. Jeśli podstawa leży 200 mm nad początkiem układu konstrukcji, współrzędna środka w tym układzie wynosi 240 mm. Względem osi centralnych I_x=4,32·10⁶ mm⁴ i I_y=2,43·10⁶ mm⁴.',
      caption: 'Osie centralne przez C oraz przesunięcie układu o 200 mm wzdłuż osi y.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        'y_{C,g}=200+40=240\\ \\text{mm},\\qquad I_x=\\frac{bh^3}{36}=4{,}32\\cdot10^6\\ \\text{mm}^4,\\qquad I_y=\\frac{hb^3}{36}=2{,}43\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola: h/3 a h/2',
      narration:
        'Dla trójkąta o podstawie poziomej środek zawsze leży w h/3, a nie w h/2. Dla h=120 mm daje to 40 mm, podczas gdy połowa wysokości wynosi 60 mm. Aby uzyskać y=h/2, trzeba zmienić kształt figury, a nie tylko wysokość.',
      caption: 'Linia y_C=h/3=40 mm leży niżej niż h/2=60 mm.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\bar{y}=\\frac{h}{3}=40\\ \\text{mm}\\neq\\frac{h}{2}=60\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
