import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-second-moments-2',
  title: 'Momenty bezwładności przekroju — przykład 2',
  duration: 7,
  given: ['b = 120 mm', 'h = 90 mm'],
  result:
    'Zwróć uwagę na kierunek. Jeżeli trójkąt zostanie obrócony tak, że podstawa będzie pionowa, to moment względem poziomej osi zmieni się na hb^3/36, czyli w tym przypadku 90· 120^3/36=4 320 000 mm^4. Ten sam kształt, inne ustawienie, inna sztywność.',
  figure: {
    kind: 'section',
    width: 120,
    height: 90,
    parts: [
      { x: 5, y: 0, width: 110, height: 15, tone: 'solid' },
      { x: 15, y: 15, width: 90, height: 15, tone: 'solid' },
      { x: 25, y: 30, width: 70, height: 15, tone: 'solid' },
      { x: 35, y: 45, width: 50, height: 15, tone: 'solid' },
      { x: 45, y: 60, width: 30, height: 15, tone: 'solid' },
      { x: 55, y: 75, width: 10, height: 15, tone: 'solid' },
    ],
    centroid: { x: 60, y: 30 },
    values: [
      { label: 'b', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'h', value: '90 mm', focus: 'section', reveal: 0 },
      { label: 'A', value: '5400 mm²', focus: 'section' },
      { label: 'I podstawy', value: '7 290 000 mm⁴', focus: 'Ix' },
      { label: 'I_c', value: '2 430 000 mm⁴', focus: 'Ix' },
      { label: 'A(h/3)²', value: '4 860 000 mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '3 240 000 mm⁴', focus: 'Iy' },
      { label: 'I po obrocie', value: '4 320 000 mm⁴', focus: 'Ix' },
    ],
    note: 'Schemat: trójkąt równoramienny o podstawie 120 mm i wysokości 90 mm przybliżono pasami; wymiary są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Trójkąt o podstawie b=120 mm i wysokości h=90 mm jest zginany względem osi równoległej do podstawy. Podstawa leży na osi x, a oś centralna jest od niej oddalona o h/3.',
      caption: 'Trójkąt równoramienny z podstawą na osi x.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'b=120\\ \\text{mm},\\quad h=90\\ \\text{mm},\\quad \\bar{y}=\\frac{h}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Moment względem podstawy',
      narration: 'Jeżeli oś przechodzi przez podstawę, to I_podstawa=(bh^3)/(12)=(120· 90^3)/(12)=7 290 000 mm^4.',
      caption: 'Moment względem osi przechodzącej przez podstawę.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{\\text{podstawa}}=\\frac{bh^3}{12}=\\frac{120\\cdot90^3}{12}=7\\,290\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Moment względem centroidu',
      narration: 'Jeżeli oś przechodzi przez środek ciężkości, to I_c=bh^3/36.',
      caption: 'Oś centralna jest równoległa do podstawy.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_c=\\frac{bh^3}{36}=\\frac{120\\cdot90^3}{36}=2\\,430\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Pole i odległość centroidu',
      narration:
        'Sprawdźmy zgodność z twierdzeniem Steinera. Pole wynosi A=(1)/(2)· 120· 90=5400 mm^2, a odległość środka od podstawy to h/3=30 mm.',
      caption: 'Pole trójkąta i odległość centroidu od podstawy.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=\\frac{1}{2}\\cdot120\\cdot90=5400\\ \\text{mm}^2,\\quad \\bar{y}=\\frac{h}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Składnik Steinera',
      narration: 'Składnik przesunięcia wynosi A((h)/(3))^2=5400· 900=4 860 000 mm^4.',
      caption: 'Składnik przesunięcia między osią podstawy a osią centralną.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'A\\left(\\frac{h}{3}\\right)^2=5400\\cdot900=4\\,860\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola Steinera',
      narration:
        'Rzeczywiście 2 430 000+4 860 000=7 290 000 mm^4. To pokazuje, że oba wzory są spójne, a różnica między nimi nie jest przypadkowa.',
      caption: 'Suma momentu centralnego i składnika Steinera daje moment względem podstawy.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '2\\,430\\,000+4\\,860\\,000=7\\,290\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Względem pionowej osi symetrii moment trójkąta równoramiennego wynosi I_y=hb^3/48. Dla b=120 mm i h=90 mm otrzymujemy 3,24·10⁶ mm⁴.',
      caption: 'Oś y jest osią symetrii trójkąta równoramiennego.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{hb^3}{48}=\\frac{90\\cdot120^3}{48}=3{,}24\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wpływ obrotu figury',
      narration:
        'Jeżeli trójkąt zostanie obrócony tak, że podstawa będzie pionowa, to moment względem poziomej osi zmieni się na hb^3/36, czyli 90· 120^3/36=4 320 000 mm^4. Ten sam kształt, inne ustawienie, inna sztywność.',
      caption: 'Obrót figury zmienia moment względem ustalonej osi poziomej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I=\\frac{hb^3}{36}=\\frac{90\\cdot120^3}{36}=4\\,320\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'W obliczeniach zginania używamy I_c, bo oś obojętna przechodzi przez środek ciężkości. Wartość względem podstawy jest większa, ale nie opisuje bezpośrednio sztywności przekroju.',
      caption: 'Do zginania decyduje moment względem osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{I_c=2\\,430\\,000\\ \\text{mm}^4,\\quad I_{\\text{podstawa}}=7\\,290\\,000\\ \\text{mm}^4,\\quad I_y=3{,}24\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
