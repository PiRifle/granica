import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-steiner-parallel-axis-3',
  title: 'Twierdzenie Steinera — przykład 3',
  duration: 7,
  given: ['I_xc = 640 000 mm⁴', 'A = 4800 mm²', 'I_x = 6,4·10⁶ mm⁴'],
  result:
    'Zadanie można też odwrócić w drugą stronę: mając zmierzony moment względem osi zewnętrznej i moment centralny, można wyznaczyć odległość osi, a stąd położenie środka ciężkości. To bywa użyteczne w pomiarach doświadczalnych, gdy nie znamy rozkładu masy, ale potrafimy zmierzyć sztywność względem dwóch osi.',
  figure: {
    kind: 'section',
    width: 120,
    height: 40,
    parts: [{ x: 0, y: 0, width: 120, height: 40, label: 'prostokąt', tone: 'light' }],
    centroid: { x: 60, y: 20 },
    values: [
      { label: 'I_xc', value: '640 000 mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'A', value: '4800 mm²', focus: 'section', reveal: 0 },
      { label: 'I_x', value: '6,4·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'a', value: '34,64 mm', focus: 'Ix' },
      { label: 'i_xc', value: '11,55 mm', focus: 'Ix' },
      { label: 'I_y', value: '5,76·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Prostokąt 120 × 40 mm; oś odniesienia jest równoległa do osi centralnej i oddalona o a.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Prostokąt 120 × 40 mm ma I_xc=120· 40^3/12=640 000 mm^4 i pole A=4800 mm^2. Szukamy osi równoległej, względem której moment wynosi 6,4· 10^6 mm^4.',
      caption: 'Prostokąt 120 × 40 mm i jego oś centralna pozioma.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xc}=\\frac{120\\cdot40^3}{12}=640\\,000\\ \\text{mm}^4,\\quad A=120\\cdot40=4800\\ \\text{mm}^2',
    },
    {
      title: 'Twierdzenie Steinera',
      narration: 'Korzystamy z I_x=I_xc+Aa^2 i rozwiązujemy względem a.',
      caption: 'Moment względem osi równoległej jest większy o składnik Aa².',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=I_{xc}+Aa^2',
    },
    {
      title: 'Obliczenie odległości osi',
      narration: 'a=√((I_x-I_xc)/A)=√((6,4· 10^6-0,64· 10^6)/4800)=√(1200)≈ 34,64 mm.',
      caption: 'Odległość osi od centroidu wynosi około 34,64 mm.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'a=\\sqrt{\\frac{I_x-I_{xc}}{A}}=\\sqrt{\\frac{6{,}4\\cdot10^6-0{,}64\\cdot10^6}{4800}}=\\sqrt{1200}\\approx34{,}64\\ \\text{mm}',
    },
    {
      title: 'Promień bezwładności',
      narration:
        'Promień bezwładności i_xc=√(I_xc/A)=√(640 000/4800)≈ 11,55 mm. Gdyby a było równe temu promieniowi, moment wzrósłby dokładnie dwukrotnie.',
      caption: 'Przy a = i_xc moment względem osi równoległej jest dwa razy większy.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'i_{xc}=\\sqrt{\\frac{640\\,000}{4800}}\\approx11{,}55\\ \\text{mm}',
    },
    {
      title: 'Moment Iy',
      narration:
        'Dla osi pionowej prostokąt ma I_y=40·120³/12=5,76·10⁶ mm⁴. Ten moment nie zależy od przesunięcia osi poziomej.',
      caption: 'Moment względem pionowej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{40\\cdot120^3}{12}=5{,}76\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Ix względem osi przesuniętej',
      narration:
        'Po podstawieniu a=34,64 mm moment względem osi równoległej wynosi I_x=640 000+4800·34,64²≈6,4·10⁶ mm⁴. To dziesięć razy więcej niż moment centralny.',
      caption: 'Składnik Steinera Aa² dominuje nad momentem własnym.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=I_{xc}+Aa^2=640\\,000+4800\\cdot34{,}64^2\\approx6{,}4\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Zadanie można też odwrócić w drugą stronę: mając zmierzony moment względem osi zewnętrznej i moment centralny, można wyznaczyć odległość osi, a stąd położenie środka ciężkości.',
      caption: 'Wniosek: z dwóch momentów można odtworzyć odległość osi od centroidu.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{a\\approx34{,}64\\ \\text{mm},\\quad i_{xc}\\approx11{,}55\\ \\text{mm},\\quad I_y=5{,}76\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
