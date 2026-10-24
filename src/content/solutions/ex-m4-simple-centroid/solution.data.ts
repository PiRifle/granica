import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-simple-centroid',
  title: 'Środek ciężkości figur prostych — przykład 1',
  duration: 7,
  given: ['b = 240 mm', 'h = 180 mm'],
  result:
    'Środek ciężkości blachy ma współrzędne (80; 60) mm, a jej pole wynosi 21 600 mm^2, czyli 216 cm². Wynik jest zgodny z regułą jednej trzeciej wysokości od podstawy.',
  figure: {
    kind: 'section',
    width: 240,
    height: 180,
    parts: [
      { x: 0, y: 0, width: 240, height: 20, tone: 'solid' },
      { x: 0, y: 20, width: 213.33, height: 20, tone: 'solid' },
      { x: 0, y: 40, width: 186.67, height: 20, tone: 'solid' },
      { x: 0, y: 60, width: 160, height: 20, tone: 'solid' },
      { x: 0, y: 80, width: 133.33, height: 20, tone: 'solid' },
      { x: 0, y: 100, width: 106.67, height: 20, tone: 'solid' },
      { x: 0, y: 120, width: 80, height: 20, tone: 'solid' },
      { x: 0, y: 140, width: 53.33, height: 20, tone: 'solid' },
      { x: 0, y: 160, width: 26.67, height: 20, tone: 'solid' },
    ],
    centroid: { x: 80, y: 60 },
    values: [
      { label: 'A', value: '21 600 mm²', focus: 'section' },
      { label: 'x_C', value: '80 mm', focus: 'centroid' },
      { label: 'y_C', value: '60 mm', focus: 'centroid' },
      { label: 'S_x', value: '1 296 000 mm³', focus: 'centroid' },
      { label: 'S_y', value: '1 728 000 mm³', focus: 'centroid' },
      { label: 'I_x', value: '38,88·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '69,12·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Schemat: trójkąt prostokątny 240 × 180 mm przybliżono poziomymi pasami; centroid i wymiary są rzeczywiste.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przyjmujemy prawy kąt trójkąta w początku układu, przyprostokątną b = 240 mm wzdłuż osi x i przyprostokątną h = 180 mm wzdłuż osi y. Pole obliczamy jako połowę iloczynu przyprostokątnych.',
      caption: 'Trójkąt prostokątny o przyprostokątnych 240 mm i 180 mm; oś x leży na podstawie.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=\\frac{1}{2}\\cdot240\\cdot180=21\\,600\\ \\text{mm}^2',
    },
    {
      title: 'Pole figury',
      narration: 'Pole figury: A=240· 180/2=21 600 mm^2.',
      caption: 'Pole figury: A=240· 180/2=21 600 mm^2.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=240\\cdot 180/2=21\\,600\\ \\text{mm}^2',
    },
    {
      title: 'Położenie środka ciężkości',
      narration: 'Dla trójkąta prostokątnego o przyprostokątnych na osiach środek leży w (b/3, h/3).',
      caption: 'Dla trójkąta prostokątnego o przyprostokątnych na osiach środek leży w (b/3, h/3).',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '(b/3,\\,h/3)',
    },
    {
      title: 'Współrzędne centroidu',
      narration: 'Zatem x=240/3=80 mm oraz y=180/3=60 mm.',
      caption: 'Zatem x=240/3=80 mm oraz y=180/3=60 mm.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{x}=240/3=80\\ \\text{mm},\\quad \\bar{y}=180/3=60\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie momentem statycznym',
      narration:
        'Sprawdzenie całką: szerokość pasa na wysokości y wynosi b(y)=240(1-y/180). Moment względem osi x to S_x=∫_0^180y b(y) dy=240· 5400=1 296 000 mm^3.',
      caption:
        'Sprawdzenie całką: szerokość pasa na wysokości y wynosi b(y)=240(1-y/180). Moment względem osi x to S_x=∫_0^180y b(y) dy=240· 5400=1 296 000 mm^3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        'S_x=\\int_0^{180}y\\,b(y)\\,dy=240\\cdot5400=1\\,296\\,000\\ \\text{mm}^3,\\quad S_y=A\\bar{x}=21\\,600\\cdot80=1\\,728\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Kontrola przez pole',
      narration: 'Dzielenie przez pole daje y=1 296 000/21 600=60 mm, co potwierdza wynik z symetrii i podobieństwa.',
      caption: 'Dzielenie przez pole daje y=1 296 000/21 600=60 mm, co potwierdza wynik z symetrii i podobieństwa.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=1\\,296\\,000/21\\,600=60\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności Ix',
      narration:
        'Dla trójkąta względem osi centralnej równoległej do podstawy obowiązuje I_x=bh^3/36. Podstawiamy b=240 mm i h=180 mm.',
      caption: 'Oś x przechodzi przez centroid, więc używamy wzoru z jedną trzydziestą szóstą.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=\\frac{bh^3}{36}=\\frac{240\\cdot180^3}{36}=38\\,880\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Moment bezwładności Iy',
      narration:
        'Analogicznie względem pionowej osi centralnej: I_y=hb^3/36. Ten moment jest większy, bo dłuższy wymiar leży poziomo, daleko od osi y.',
      caption: 'Przy osi pionowej w trzeciej potędze występuje szerokość b.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{hb^3}{36}=\\frac{180\\cdot240^3}{36}=69\\,120\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Kontrola sensowności: środek leży wewnątrz trójkąta, bliżej kąta prostego niż przeciwprostokątnej. Odległości 80 mm i 60 mm są mniejsze od odpowiednich przyprostokątnych.',
      caption: 'Centroid (80; 60) mm oraz centralne momenty bezwładności względem osi x i y.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{\\bar{x}=80\\ \\text{mm},\\quad \\bar{y}=60\\ \\text{mm},\\quad I_x=38{,}88\\cdot10^6\\ \\text{mm}^4,\\quad I_y=69{,}12\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
