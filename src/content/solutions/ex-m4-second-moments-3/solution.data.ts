import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-second-moments-3',
  title: 'Momenty bezwładności przekroju — przykład 3',
  duration: 7,
  given: ['I_x = 40·10⁶ mm⁴', 'b = 80 mm'],
  result:
    'Wariant odwrotny można też sformułować przez promień bezwładności. Jeżeli wymagane jest i_x=60 mm przy polu A=5000 mm^2, to I_x=i_x^2A=3600· 5000=18· 10^6 mm^4. Taki zapis bywa wygodniejszy w normach i katalogach kształtowników, gdzie podaje się promienie bezwładności zamiast momentów.',
  figure: {
    kind: 'section',
    width: 80,
    height: 181.7,
    parts: [{ x: 0, y: 0, width: 80, height: 181.7, label: 'prostokąt', tone: 'light' }],
    centroid: { x: 40, y: 90.85 },
    values: [
      { label: 'I_x', value: '40·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'b', value: '80 mm', focus: 'section', reveal: 0 },
      { label: 'h', value: '181,7 mm', focus: 'section' },
      { label: 'A', value: '14 536 mm²', focus: 'section' },
      { label: 'h przy b = 160 mm', value: '144,2 mm', focus: 'section' },
      { label: 'A przy b = 160 mm', value: '23 075 mm²', focus: 'section' },
      { label: 'I_y', value: '7,75·10⁶ mm⁴', focus: 'Iy' },
      { label: 'i_x', value: '60 mm', focus: 'Ix' },
    ],
    note: 'Prostokąt o stałej szerokości 80 mm i wysokości dobranej do wymaganego I_x.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Projektant potrzebuje prostokątnego przekroju o I_x=40· 10^6 mm^4 względem osi poziomej przez środek. Szerokość jest ograniczona do b=80 mm.',
      caption: 'Prostokąt o szerokości 80 mm; oś x przechodzi przez środek wysokości.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'I_x=40\\cdot10^6\\ \\text{mm}^4,\\quad b=80\\ \\text{mm}',
    },
    {
      title: 'Odwrócenie wzoru na Ix',
      narration: 'Z wzoru I=bh^3/12 wyznaczamy h^3=(12I)/(b)=(12· 40· 10^6)/(80)=6· 10^6 mm^3.',
      caption: 'Przekształcenie wzoru na moment bezwładności prostokąta.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'h^3=\\frac{12I}{b}=\\frac{12\\cdot40\\cdot10^6}{80}=6\\cdot10^6\\ \\text{mm}^3',
    },
    {
      title: 'Wymagana wysokość',
      narration: 'Stąd h≈ 181,7 mm. Pole wynosi wtedy około 14 536 mm^2.',
      caption: 'Wymagana wysokość i pole przekroju.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'h=\\sqrt[3]{6\\cdot10^6}\\approx181{,}7\\ \\text{mm},\\quad A=80\\cdot181{,}7\\approx14\\,536\\ \\text{mm}^2',
    },
    {
      title: 'Wariant szerszego przekroju',
      narration:
        'Gdyby szerokość zwiększyć do 160 mm, wymagana wysokość spadłaby do h=((12· 40· 10^6)/(160))^(1/3)≈ 144,2 mm.',
      caption: 'Zwiększenie szerokości zmniejsza wymaganą wysokość.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'h=\\left(\\frac{12\\cdot40\\cdot10^6}{160}\\right)^{1/3}=(3\\cdot10^6)^{1/3}\\approx144{,}2\\ \\text{mm}',
    },
    {
      title: 'Koszt materiałowy wariantu',
      narration:
        'Pole wzrosłoby jednak do około 23 075 mm^2, czyli przekrój zużyłby znacznie więcej materiału przy tym samym I.',
      caption: 'Szerszy przekrój ma większe pole przy tym samym momencie bezwładności.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=160\\cdot144{,}2\\approx23\\,075\\ \\text{mm}^2',
    },
    {
      title: 'Moment Iy',
      narration:
        'Dla przyjętego przekroju 80 × 181,7 mm moment względem pionowej osi centralnej wynosi I_y=181,7·80³/12≈7,75·10⁶ mm⁴. Jest znacznie mniejszy od I_x, bo materiał leży blisko osi y.',
      caption: 'Moment względem osi pionowej jest mały przy wąskim przekroju.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{181{,}7\\cdot80^3}{12}\\approx7{,}75\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Promień bezwładności',
      narration:
        'Jeżeli wymagane jest i_x=60 mm przy polu A=5000 mm^2, to I_x=i_x^2A=3600· 5000=18· 10^6 mm^4. Taki zapis bywa wygodniejszy w normach i katalogach kształtowników.',
      caption: 'Promień bezwładności wiąże moment i pole przekroju.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=i_x^2A=60^2\\cdot5000=18\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Wniosek jest ogólny: przy zginaniu w jednej płaszczyźnie opłaca się zwiększać wymiar prostopadły do osi obojętnej, a nie równoległy do niej.',
      caption: 'Wysoki i wąski przekrój jest efektywniejszy przy zginaniu względem osi poziomej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{h\\approx181{,}7\\ \\text{mm},\\quad A\\approx14\\,536\\ \\text{mm}^2,\\quad I_y\\approx7{,}75\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
