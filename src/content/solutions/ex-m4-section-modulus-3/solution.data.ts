import type { SolutionData } from '../../model'
import { SectionModulusExample3Animation } from './animation'

export default {
  id: 'ex-m4-section-modulus-3',
  title: 'Wskaźnik wytrzymałości przekroju W — przykład 3',
  duration: 7,
  given: ['M_x = 30 kN·m', 'σ_dop = 160 MPa', 'b = 80 mm'],
  result:
    'Gdyby wysokość była ograniczona do 100 mm, wymagana szerokość wyniosłaby b=6W_min/h^2=6· 187 500/10 000=112,5 mm. Przekrój byłby szerszy i zużywałby więcej materiału przy tym samym W, bo materiał bliżej osi obojętnej pracuje słabiej. To ta sama obserwacja, która prowadzi do kształtowników z półkami zamiast do masywnych prostokątów.',
  figure: {
    kind: 'section',
    width: 80,
    height: 120,
    parts: [{ x: 0, y: 0, width: 80, height: 120, label: 'prostokąt', tone: 'light' }],
    centroid: { x: 40, y: 60 },
    values: [
      { label: 'M_x', value: '30·10⁶ N·mm', focus: 'Ix', reveal: 0 },
      { label: 'σ_dop', value: '160 MPa', focus: 'Ix', reveal: 0 },
      { label: 'b', value: '80 mm', focus: 'section', reveal: 0 },
    ],
    note: 'Prostokąt 80 × 120 mm dobrany do momentu 30 kN·m i naprężenia dopuszczalnego 160 MPa.',
  },
  animation: SectionModulusExample3Animation,
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Projektant potrzebuje belki o przekroju prostokątnym, która przy |M_x|=30 kN·m i σ_dop=160 MPa spełni warunek wytrzymałości. Szerokość jest ograniczona do b=80 mm, a wysokość pozostaje do wyznaczenia.',
      caption: 'Prostokąt o stałej szerokości 80 mm i nieznanej wysokości.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: '|M_x|=30\\ \\text{kN}\\cdot\\text{m},\\quad \\sigma_{dop}=160\\ \\text{MPa},\\quad b=80\\ \\text{mm}',
    },
    {
      title: 'Wymagany wskaźnik',
      narration:
        'Naprężenie dopuszczalne na skrajnym włóknie wyznacza minimalny wskaźnik: W_min=(|M_x|)/(σ_dop)=(30·10^6)/(160)=187 500 mm^3.',
      caption: 'Rozkład naprężeń dochodzi do σ_dop na obu krawędziach.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'W_{\\min}=\\frac{|M_x|}{\\sigma_{dop}}=\\frac{30\\cdot10^6}{160}=187\\,500\\ \\text{mm}^3',
    },
    {
      title: 'Minimalna wysokość',
      narration:
        'Dla prostokąta W=bh^2/6, więc h=√((6W_min)/(b)). Otrzymujemy h=√((6·187 500)/(80))=√(14 062,5)≈118,6 mm. Przyjmujemy wymiar handlowy h=120 mm.',
      caption: 'Wymagana wysokość jest bliska 120 mm.',
      visual: 'section',
      focus: { metric: 'height' },
      formula: 'h=\\sqrt{\\frac{6\\cdot187\\,500}{80}}=\\sqrt{14\\,062{,}5}\\approx118{,}6\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie przyjętego przekroju',
      narration:
        'Przyjmujemy h=120 mm. Wtedy W=80·120^2/6=192 000 mm^3, a naprężenie wynosi 30·10^6/192 000=156,25 MPa, czyli poniżej 160 MPa. Moment bezwładności tego przekroju to I=80·120^3/12=11,52·10^6 mm^4.',
      caption: 'Przekrój 80 × 120 mm spełnia warunek wytrzymałości.',
      visual: 'section',
      focus: { metric: 'check' },
      formula:
        'W=\\frac{80\\cdot120^2}{6}=192\\,000\\ \\text{mm}^3,\\quad \\sigma=\\frac{30\\cdot10^6}{192\\,000}=156{,}25\\ \\text{MPa},\\quad I_x=\\frac{80\\cdot120^3}{12}=11{,}52\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wariant ograniczonej wysokości',
      narration:
        'Gdyby wysokość była ograniczona do 100 mm, wymagana szerokość wyniosłaby b=6W_min/h^2=6·187 500/10 000=112,5 mm.',
      caption: 'Niższy przekrój musi być szerszy, aby zachować wskaźnik W.',
      visual: 'section',
      focus: { metric: 'variant' },
      formula: 'b=\\frac{6W_{\\min}}{h^2}=\\frac{6\\cdot187\\,500}{10\\,000}=112{,}5\\ \\text{mm}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Przekrój byłby szerszy i zużywałby więcej materiału przy tym samym W, bo materiał bliżej osi obojętnej pracuje słabiej. To ta sama obserwacja, która prowadzi do kształtowników z półkami zamiast do masywnych prostokątów.',
      caption: 'Wysoki, wąski przekrój lepiej wykorzystuje materiał przy zginaniu.',
      visual: 'section',
      focus: { metric: 'result' },
      formula:
        '\\boxed{W_{\\min}=187\\,500\\ \\text{mm}^3,\\quad h_{\\min}\\approx118{,}6\\ \\text{mm},\\quad W=192\\,000\\ \\text{mm}^3,\\quad \\sigma=156{,}25\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
