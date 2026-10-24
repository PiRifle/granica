import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-rational-section-shapes-2',
  title: 'Racjonalne kształty przekrojów — przykład 2',
  duration: 7,
  given: ['A = 7854 mm²', 'D pręta = 100 mm', 'D rury = 200 mm'],
  result:
    'Ten wynik jest bardziej uczciwym porównaniem niż poprzedni. Przy tej samej masie rura o większej średnicy jest wyraźnie sztywniejsza i mocniejsza, ale zajmuje więcej miejsca i ma cieńszą ściankę. Właśnie dlatego w konstrukcjach o ograniczonej masie stosuje się rury i przekroje skrzynkowe, a nie pełne pręty.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RationalSectionShapes2Animation }))),
  scenes: [
    {
      title: 'Model: ta sama masa',
      narration:
        'Porównujemy pręt pełny o średnicy 100 mm z rurą o średnicy zewnętrznej 200 mm przy tym samym polu A = 7854 mm², czyli przy tej samej masie na jednostkę długości. Obie figury mają wspólny środek i wspólną oś obojętną.',
      caption: 'Ten sam materiał jest w pręcie skupiony blisko osi, a w rurze rozłożony na większym obwodzie.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'A_p=A_r=7854\\ \\text{mm}^2,\\qquad D_p=100\\ \\text{mm},\\qquad D_r=200\\ \\text{mm}',
    },
    {
      title: 'Warunek równego pola',
      narration:
        'Z równania π(200² − d²)/4 = 7854 otrzymujemy d² = 30 000, czyli d ≈ 173,2 mm. Grubość ścianki wynosi t = (200 − 173,2)/2 ≈ 13,4 mm.',
      caption: 'Duża średnica przy stałym polu oznacza cienką ściankę.',
      visual: 'section',
      focus: {
        metric: 'geometry',
      },
      formula:
        '\\frac{\\pi(200^2-d^2)}{4}=7854\\quad\\Rightarrow\\quad d\\approx173{,}2\\ \\text{mm},\\qquad t\\approx13{,}4\\ \\text{mm}',
    },
    {
      title: 'Materiał przesunięty od osi',
      narration:
        'Ten sam materiał można wyobrazić sobie jako przesunięty z rdzenia pręta na obrzeże rury. Ponieważ wkład do I rośnie z r², samo przesunięcie materiału zwiększa moment bezwładności bez zmiany masy.',
      caption: 'Pole pozostaje stałe, ale średnia odległość materiału od osi rośnie.',
      visual: 'section',
      focus: {
        metric: 'distribution',
      },
      formula: 'A=\\text{const},\\qquad I=\\int_A r^2\\,dA',
    },
    {
      title: 'Moment bezwładności',
      narration:
        'Pręt pełny ma I_p = 4,909·10⁶ mm⁴, a rura przy tym samym polu I_r ≈ 34,36·10⁶ mm⁴. Stosunek I_r/I_p jest blisko siedmiu, bo materiał rury leży znacznie dalej od osi.',
      caption: 'Przy tej samej masie rura jest około siedem razy sztywniejsza przy zginaniu.',
      visual: 'section',
      focus: {
        metric: 'Ix',
      },
      formula:
        'I_p=\\frac{\\pi\\cdot100^4}{64}=4{,}909\\cdot10^6\\ \\text{mm}^4,\\qquad I_r\\approx34{,}36\\cdot10^6\\ \\text{mm}^4,\\qquad \\frac{I_r}{I_p}\\approx7',
    },
    {
      title: 'Wskaźnik i naprężenia',
      narration:
        'Wskaźnik wytrzymałości rośnie tylko około 3,5 razy, bo ramię c wzrosło z 50 do 100 mm: W_p ≈ 98,2·10³ mm³ i W_r ≈ 343,6·10³ mm³. Większa średnica zwiększa I szybciej niż W.',
      caption: 'W = I/c: wzrost I częściowo znosi większa odległość skrajnego włókna.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        'W_p=\\frac{4{,}909\\cdot10^6}{50}\\approx98{,}2\\cdot10^3\\ \\text{mm}^3,\\qquad W_r=\\frac{34{,}36\\cdot10^6}{100}\\approx343{,}6\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Granice racjonalnego kształtu',
      narration:
        'Rura o średnicy 200 mm zajmuje więcej miejsca i ma ściankę o grubości 13,4 mm, więc stosunek D/t ≈ 14,9. Trzeba sprawdzić lokalne wyboczenie ścianki, gabaryt i połączenia. I_y = I_x, bo przekrój jest kołowo symetryczny.',
      caption:
        'Większa średnica poprawia sztywność i nośność, ale zwiększa gabaryt i ryzyko utraty stateczności ścianki.',
      visual: 'section',
      focus: {
        metric: 'limits',
      },
      formula: '\\frac{D}{t}\\approx14{,}9,\\qquad I_y=I_x\\approx34{,}36\\cdot10^6\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
