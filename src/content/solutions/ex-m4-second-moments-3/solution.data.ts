import type { SolutionData } from '../../model'
import { lazy } from 'react'

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
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RectangleSecondMomentAnimation }))),
  scenes: [
    {
      title: 'Model: dana szerokość, szukana wysokość',
      narration:
        'Projektant potrzebuje prostokąta o I_x=40·10^6 mm^4 względem poziomej osi centralnej. Szerokość jest ograniczona do b=80 mm, a wysokość h trzeba dobrać.',
      caption: 'Prostokąt o stałej szerokości 80 mm; oś x przechodzi przez środek wysokości.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'I_x=40\\cdot10^6\\ \\text{mm}^4,\\quad b=80\\ \\text{mm}',
    },
    {
      title: 'Pasy poziome budują I_x',
      narration:
        'Dzielimy prostokąt na poziome pasy. Każdy pas ma pole b dy i wnosi y^2 dA, więc o wartości I_x decyduje przede wszystkim wysokość przekroju.',
      caption: 'Pasy poziome; oś x wyznacza odległość y każdego pasa.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=\\int_A y^2\\,dA=\\frac{bh^3}{12}',
    },
    {
      title: 'Dobór wymaganej wysokości',
      narration:
        'Zwiększamy wysokość, aż moment osiągnie wymagane 40·10^6 mm^4. Po przekształceniu wzoru otrzymujemy h≈181,7 mm.',
      caption: 'Wysokość rośnie do wartości, przy której I_x osiąga wymaganie.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'h=\\sqrt[3]{\\frac{12I_x}{b}}\\approx181{,}7\\ \\text{mm}',
    },
    {
      title: 'Pasy pionowe budują I_y',
      narration:
        'Dla osi pionowej odległością jest x. Ponieważ szerokość wynosi tylko 80 mm, materiał leży blisko osi y, więc I_y jest znacznie mniejsze od I_x.',
      caption: 'Pasy pionowe; oś y wyznacza odległość x każdego pasa.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{hb^3}{12}\\approx7{,}75\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Szerszy wariant przekroju',
      narration:
        'Po zwiększeniu szerokości do 160 mm wymagana wysokość spada do około 144,2 mm. Pole przekroju rośnie jednak z 14 536 do 23 075 mm^2, więc ten sam moment kosztuje więcej materiału.',
      caption: 'Ten sam I_x można uzyskać różnymi proporcjami boków, ale nie przy tym samym polu.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'h=\\left(\\frac{12\\cdot40\\cdot10^6}{160}\\right)^{1/3}\\approx144{,}2\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
