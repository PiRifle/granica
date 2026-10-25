import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-iloczyn-skalarny',
  title: 'Praca i kąt między siłami z iloczynu skalarnego',
  duration: 6,
  given: [
    'Przemieszczenie wózka: s = 12i m',
    'Siła F = (20i + 20√3j) N, czyli 40 N pod kątem 60° do poziomu',
    'Siła pionowa G = 30j N',
  ],
  result: 'W_F = 240 J, W_G = 0 J, F·G = 600√3 ≈ 1039,2 N². Kąt między siłami wynosi 30°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DotProductAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wózek przesuwa się w prawo o 12 m. Siła F ma składowe 20 N i 20√3 N, więc jej moduł to 40 N, a nachylenie 60°. Siła pionowa G ma zwrot zgodny z osią y i moduł 30 N.',
      caption: 'Przemieszczenie poziome, siła ukośna i siła pionowa zaczepione w jednym punkcie.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        '\\mathbf s=12\\,\\mathbf i\\ \\text{m},\\qquad \\mathbf F=(20\\,\\mathbf i+20\\sqrt3\\,\\mathbf j)\\ \\text{N},\\qquad \\mathbf G=30\\,\\mathbf j\\ \\text{N}',
    },
    {
      title: 'Praca siły F',
      narration:
        'Praca to iloczyn skalarny siły i przemieszczenia. Mnożymy odpowiadające sobie składowe: 20 razy 12 plus 20√3 razy 0. Zostaje 240 J.',
      caption: 'W_F = F·s = 240 J.',
      visual: 'diagram',
      focus: { metric: 'workF' },
      formula: 'W_F=\\mathbf F\\cdot\\mathbf s=20\\cdot12+20\\sqrt3\\cdot0=240\\ \\text{J}',
    },
    {
      title: 'Praca przez rzut poziomy',
      narration:
        'Ten sam wynik dostajemy, rzutując siłę na kierunek ruchu. Pozioma składowa to 40 cos 60°, czyli 20 N. Pomnożona przez 12 m daje 240 J — pionowa składowa nie wykonuje pracy, bo ruch jest poziomy.',
      caption: 'W_F = Fx·s = 20·12 = 240 J.',
      visual: 'diagram',
      focus: { metric: 'projection' },
      formula: 'W_F=F_x s=(40\\cos60^\\circ)\\cdot12=20\\cdot12=240\\ \\text{J}',
    },
    {
      title: 'Praca siły pionowej',
      narration:
        'Siła G jest prostopadła do przemieszczenia. Jej rzut na kierunek ruchu jest zerowy, więc iloczyn skalarny znika. Zerowa praca nie znaczy, że siła nie istnieje — znaczy tylko, że nie zmienia energii w kierunku ruchu.',
      caption: 'W_G = 0 J, bo G jest prostopadłe do s.',
      visual: 'diagram',
      focus: { metric: 'workG' },
      formula: 'W_G=\\mathbf G\\cdot\\mathbf s=0\\cdot12+30\\cdot0=0\\ \\text{J}',
    },
    {
      title: 'Iloczyn skalarny sił',
      narration:
        'Teraz mnożymy przez siebie obie siły. Składowa pozioma pierwszej siły trafia na zero, a pionowa 20√3 na 30. Suma daje 600√3, czyli około 1039,2 N².',
      caption: 'F·G = 600√3 ≈ 1039,2 N².',
      visual: 'diagram',
      focus: { metric: 'dot' },
      formula: '\\mathbf F\\cdot\\mathbf G=20\\cdot0+20\\sqrt3\\cdot30=600\\sqrt3\\approx1039{,}2\\ \\text{N}^2',
    },
    {
      title: 'Kąt między siłami',
      narration:
        'Dzielimy iloczyn skalarny przez iloczyn modułów: 40 razy 30 daje 1200, a 600√3 przez 1200 to √3/2. Cosinus równy 0,866 odpowiada kątowi 30°, co zgadza się z różnicą nachyleń 60° i 90°.',
      caption: 'cos φ = √3/2 ≈ 0,866, więc φ = 30°.',
      visual: 'diagram',
      focus: { metric: 'angle' },
      formula:
        '\\cos\\varphi=\\frac{600\\sqrt3}{40\\cdot30}=\\frac{\\sqrt3}{2}\\approx0{,}866,\\qquad \\varphi=30^\\circ',
    },
  ],
} satisfies SolutionData
