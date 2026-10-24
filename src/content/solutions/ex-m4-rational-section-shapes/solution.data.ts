import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-rational-section-shapes',
  title: 'Racjonalne kształty przekrojów — przykład 1',
  duration: 7,
  given: ['D = 100 mm', 'd = 90 mm', 'c = 50 mm'],
  result:
    'Rura ma około 19,0% masy przekroju pełnego, zachowując około 34,4% jego I i W. Na jednostkę pola jest około 1,81 razy efektywniejsza, ale przy tej samej średnicy zewnętrznej ma mniejszą nośność bezwzględną. Porównanie „rura jest lepsza” ma sens tylko po ustaleniu kryterium: masa, średnica czy nośność.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RationalSectionShapesAnimation }))),
  scenes: [
    {
      title: 'Model: ta sama średnica zewnętrzna',
      narration:
        'Porównujemy pełne koło o średnicy D = 100 mm z rurą o średnicy zewnętrznej D = 100 mm i wewnętrznej d = 90 mm. Obie figury mają wspólny środek, a odległość skrajnego włókna od osi obojętnej wynosi c = 50 mm.',
      caption: 'Przy tej samej średnicy zewnętrznej rura ma znacznie mniej materiału.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'D=100\\ \\text{mm},\\quad d=90\\ \\text{mm},\\quad c=50\\ \\text{mm}',
    },
    {
      title: 'Materiał względem osi obojętnej',
      narration:
        'Przy zginaniu naprężenie rośnie liniowo od zera na osi obojętnej do maksimum na obrzeżach. Wkład elementu pola do momentu bezwładności jest proporcjonalny do r², więc materiał blisko osi pracuje słabo, a materiał na obrzeżach decyduje o sztywności.',
      caption: 'W pełnym kole materiał wypełnia też rdzeń; w rurze cały materiał leży daleko od osi.',
      visual: 'section',
      focus: {
        metric: 'distribution',
      },
      formula: 'I=\\int_A r^2\\,dA,\\qquad \\Delta I\\propto r^2\\,\\Delta A',
    },
    {
      title: 'Pole i masa',
      narration:
        'Pole pełnego koła wynosi 7854 mm², a pole rury 1492 mm². Rura zachowuje około 19,0% materiału, bo z pełnego przekroju usunięto rdzeń o średnicy 90 mm.',
      caption: 'Rdzeń o średnicy 90 mm odpowiada około 81% pola przekroju pełnego.',
      visual: 'section',
      focus: {
        metric: 'area',
      },
      formula:
        'A_p=\\frac{\\pi\\cdot100^2}{4}=7854\\ \\text{mm}^2,\\qquad A_r=\\frac{\\pi(100^2-90^2)}{4}=1492\\ \\text{mm}^2',
    },
    {
      title: 'Moment bezwładności',
      narration:
        'Mimo mniejszego pola rura zachowuje około 34,4% momentu bezwładności przekroju pełnego: 1,688·10⁶ mm⁴ wobec 4,909·10⁶ mm⁴. Decyduje o tym kwadrat odległości od osi.',
      caption: 'Ubytek pola jest większy niż ubytek I, bo usunięty materiał leżał blisko osi.',
      visual: 'section',
      focus: {
        metric: 'Ix',
      },
      formula:
        'I_p=\\pi\\cdot100^4/64=4{,}909\\cdot10^6\\ \\text{mm}^4,\\qquad I_r=\\pi(100^4-90^4)/64=1{,}688\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wskaźnik i naprężenia',
      narration:
        'Przy tym samym c = 50 mm wskaźnik W jest proporcjonalny do I: W_p = 98,2·10³ mm³ i W_r = 33,8·10³ mm³. Przy momencie 5 kN·m naprężenie w rurze wynosi około 148 MPa, a w pręcie pełnym około 51 MPa.',
      caption: 'Rura ma mniejszą nośność bezwzględną przy tej samej średnicy, ale lepiej wykorzystuje materiał.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        'W_p=\\frac{I_p}{50}=98{,}2\\cdot10^3\\ \\text{mm}^3,\\qquad W_r=\\frac{I_r}{50}=33{,}8\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Efektywność i wybór',
      narration:
        'Na jednostkę pola rura ma I/A ≈ 1131 mm² wobec 625 mm² dla pręta pełnego, czyli około 1,81 razy więcej. Promień bezwładności i = √(I/A) rośnie z 25 mm do około 33,6 mm. Wybór zależy od kryterium: przy tej samej średnicy pręt pełny ma większe W, a rura lepiej wykorzystuje masę.',
      caption: 'Porównuj przekroje przy ustalonym kryterium: ta sama średnica, ta sama masa czy ta sama nośność.',
      visual: 'section',
      focus: {
        metric: 'efficiency',
      },
      formula: '\\frac{I_r/A_r}{I_p/A_p}\\approx1{,}81,\\qquad i=\\sqrt{I/A},\\qquad \\frac{W_r}{W_p}\\approx0{,}344',
    },
  ],
} satisfies SolutionData
