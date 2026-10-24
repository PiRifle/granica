import type { SolutionData } from '../../model'
import { RationalSectionShapes3Animation } from './animation'

export default {
  id: 'ex-m4-rational-section-shapes-3',
  title: 'Racjonalne kształty przekrojów — przykład 3',
  duration: 7,
  given: ['A = 2000 mm²', 'I/A = 2000 mm²'],
  result:
    'To zadanie pokazuje, że „od wyniku do danych” nie kończy się na jednym wzorze. Po dobraniu promienia i grubości trzeba wrócić do założeń: czy rura jest rzeczywiście cienkościenna, czy ścianka nie wyboczy się, czy średnica mieści się w dostępnej przestrzeni i czy połączenia da się wykonać.',
  animation: RationalSectionShapes3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Dla przekroju o polu A = 2000 mm² wymagamy I/A = 2000 mm², czyli I = 4·10⁶ mm⁴. Szukamy cienkościennej rury: jej średniego promienia R i grubości ścianki t.',
      caption: 'Znamy pole i wymaganą efektywność, nie znamy jeszcze wymiarów.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'A=2000\\ \\text{mm}^2,\\qquad I/A=2000\\ \\text{mm}^2,\\qquad I=4\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Dlaczego liczy się promień',
      narration:
        'Dla cienkiej rury I ≈ πR³t i A ≈ 2πRt, więc I/A ≈ R²/2. Materiał leży w odległości bliskiej R od osi, a wkład do I rośnie z kwadratem tej odległości. To dlatego promień jest najskuteczniejszym parametrem.',
      caption: 'Przy stałym polu zwiększanie promienia przesuwa materiał dalej od osi.',
      visual: 'section',
      focus: {
        metric: 'distribution',
      },
      formula: 'I\\approx\\pi R^3t,\\qquad A\\approx2\\pi Rt,\\qquad \\frac{I}{A}\\approx\\frac{R^2}{2}',
    },
    {
      title: 'Promień rury',
      narration:
        'Z zależności I/A ≈ R²/2 otrzymujemy R ≈ √(2I/A) = √(2·2000) = √4000 ≈ 63,25 mm. Średnica zewnętrzna wynosi D = 2R ≈ 126,5 mm.',
      caption: 'Wymagana efektywność wyznacza promień, a nie grubość ścianki.',
      visual: 'section',
      focus: {
        metric: 'radius',
      },
      formula:
        'R\\approx\\sqrt{2\\,\\frac{I}{A}}=\\sqrt{4000}\\approx63{,}25\\ \\text{mm},\\qquad D\\approx126{,}5\\ \\text{mm}',
    },
    {
      title: 'Grubość ścianki',
      narration:
        'Pole rury to w przybliżeniu obwód środkowy razy grubość: A ≈ 2πRt. Stąd t ≈ A/(2πR) = 2000/(2π·63,25) ≈ 5,03 mm. Ścianka jest cienka, ale nie ekstremalnie.',
      caption: 'Grubość ścianki wynika z pola i promienia; przy dużym R jest mała.',
      visual: 'section',
      focus: {
        metric: 'wall',
      },
      formula: 't\\approx\\frac{A}{2\\pi R}=\\frac{2000}{2\\pi\\cdot63{,}25}\\approx5{,}03\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie I, W i naprężeń',
      narration:
        'Sprawdzenie: I ≈ πR³t ≈ 4,0·10⁶ mm⁴, a W = I/R ≈ 63,2·10³ mm³. Przy zginaniu naprężenie rośnie liniowo od osi obojętnej do maksimum na zewnętrznej stronie ścianki.',
      caption: 'Otrzymany promień i grubość odtwarzają wymagany moment bezwładności.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula:
        'I\\approx\\pi R^3t\\approx4{,}0\\cdot10^6\\ \\text{mm}^4,\\qquad W=\\frac{I}{R}\\approx63{,}2\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Kontrola założeń',
      narration:
        'Stosunek D/t ≈ 25 wymaga sprawdzenia lokalnego wyboczenia ścianki. Trzeba też potwierdzić, że średnica mieści się w dostępnej przestrzeni i że połączenia da się wykonać. Wynik geometryczny jest dopiero początkiem doboru.',
      caption: 'Racjonalny kształt musi połączyć duże I/A ze statecznością, gabarytem i technologią.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula: '\\frac{D}{t}\\approx25,\\qquad I_y=I_x\\approx4{,}0\\cdot10^6\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
