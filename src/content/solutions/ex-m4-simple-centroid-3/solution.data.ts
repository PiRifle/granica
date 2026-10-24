import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-simple-centroid-3',
  title: 'Środek ciężkości figur prostych — przykład 3',
  duration: 7,
  given: ['y_C = 40 mm', 'b = 90 mm'],
  result:
    'Podobny wariant odwrotny pojawia się przy półkolu. Znając wymaganą odległość środka od średnicy, można wyznaczyć promień z równania y=4r/(3π), czyli r=3πy/4. Dla y=20 mm dostajemy r=3π· 20/4≈ 47,1 mm. Taki rachunek jest przydatny, gdy z rysunku konstrukcyjnego wynika położenie środka, a brakuje wymiaru samej figury.',
  figure: {
    kind: 'section',
    width: 90,
    height: 120,
    parts: [
      { x: 0, y: 0, width: 90, height: 15, tone: 'solid' },
      { x: 0, y: 15, width: 78.75, height: 15, tone: 'solid' },
      { x: 0, y: 30, width: 67.5, height: 15, tone: 'solid' },
      { x: 0, y: 45, width: 56.25, height: 15, tone: 'solid' },
      { x: 0, y: 60, width: 45, height: 15, tone: 'solid' },
      { x: 0, y: 75, width: 33.75, height: 15, tone: 'solid' },
      { x: 0, y: 90, width: 22.5, height: 15, tone: 'solid' },
      { x: 0, y: 105, width: 11.25, height: 15, tone: 'solid' },
    ],
    centroid: { x: 30, y: 40 },
    values: [
      { label: 'y_C', value: '40 mm', focus: 'centroid', reveal: 0 },
      { label: 'b', value: '90 mm', focus: 'section', reveal: 0 },
      { label: 'h', value: '120 mm', focus: 'section' },
      { label: 'A', value: '5400 mm²', focus: 'section' },
      { label: 'x_C', value: '30 mm', focus: 'centroid' },
      { label: 'y_C w układzie konstrukcji', value: '240 mm', focus: 'centroid' },
      { label: 'I_x', value: '4,32·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '2,43·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Schemat: trójkąt o podstawie 90 mm i wysokości 120 mm przybliżono pasami; wymiary i centroid są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Załóżmy, że projektant chce, aby trójkątna blacha wspornikowa miała środek ciężkości dokładnie 40 mm od podstawy. Przyjmujemy podstawę b=90 mm i szukamy wysokości h.',
      caption: 'Trójkąt wspornikowy z podstawą na osi x; oś y pokrywa się z pionową osią figury.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=40\\ \\text{mm},\\quad b=90\\ \\text{mm}',
    },
    {
      title: 'Odwrócenie wzoru na centroid',
      narration:
        'Korzystamy z zależności y=h/3 i rozwiązujemy ją względem h. Dla y=40 mm wysokość musi wynosić 120 mm.',
      caption: 'Korzystamy z zależności y=h/3 i rozwiązujemy ją względem h.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'h=3\\bar{y}=3\\cdot40=120\\ \\text{mm}',
    },
    {
      title: 'Pole i położenie poziome',
      narration:
        'Pole trójkąta wynosi A=bh/2=90·120/2=5400 mm². Dla trójkąta prostokątnego o przyprostokątnych na osiach współrzędna pozioma środka wynosi b/3=30 mm.',
      caption: 'Pole i współrzędna x_C wynikają wprost z wymiarów figury.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A=\\frac{bh}{2}=\\frac{90\\cdot120}{2}=5400\\ \\text{mm}^2,\\quad \\bar{x}=\\frac{b}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Przesunięcie w układzie konstrukcji',
      narration:
        'Jeżeli podstawa trójkąta jest osadzona na wysokości 200 mm w układzie konstrukcji, to współrzędna środka w tym układzie wynosi 200+40=240 mm. Przesunięcie całej figury o wektor (0;200) przesuwa jej środek o ten sam wektor.',
      caption: 'Przesunięcie figury przesuwa centroid bez zmiany kształtu i pola.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '200+40=240\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności Ix',
      narration:
        'Względem poziomej osi centralnej trójkąta moment wynosi I_x=bh^3/36. Dla b=90 mm i h=120 mm otrzymujemy 4,32·10⁶ mm⁴.',
      caption: 'Oś x przechodzi przez centroid, dlatego używamy mianownika 36.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=\\frac{bh^3}{36}=\\frac{90\\cdot120^3}{36}=4{,}32\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment bezwładności Iy',
      narration:
        'Względem pionowej osi centralnej moment wynosi I_y=hb^3/36. Tym razem w trzeciej potędze występuje szerokość b.',
      caption: 'Moment względem osi pionowej zależy od szerokości podstawy.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{hb^3}{36}=\\frac{120\\cdot90^3}{36}=2{,}43\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Granica warunku y=h/2',
      narration:
        'Dla trójkąta o podstawie na osi x współrzędna y wynosi dokładnie h/3, niezależnie od przesunięcia wierzchołka wzdłuż podstawy. Nie da się więc uzyskać środka w połowie wysokości. Gdyby zadanie wymagało y=h/2, trzeba by zmienić kształt figury, a nie tylko jej wysokość.',
      caption: 'Warunek y=h/2 jest sprzeczny z geometrią trójkąta o podstawie poziomej.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=\\frac{h}{3}\\neq\\frac{h}{2}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Podobny wariant odwrotny pojawia się przy półkolu. Znając wymaganą odległość środka od średnicy, można wyznaczyć promień z równania y=4r/(3π), czyli r=3πy/4. Dla y=20 mm dostajemy r=3π· 20/4≈ 47,1 mm.',
      caption: 'Wniosek: z położenia centroidu można odtworzyć wymiar figury tylko wtedy, gdy znamy jej kształt.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{h=120\\ \\text{mm},\\quad \\bar{x}=30\\ \\text{mm},\\quad \\bar{y}=40\\ \\text{mm},\\quad r=\\frac{3\\pi\\cdot20}{4}\\approx47{,}1\\ \\text{mm}}',
    },
  ],
} satisfies SolutionData
