import type { SolutionData } from '../../model'
import { ShearTechnicalExample3Animation } from './animation'

export default {
  id: 'ex-shear-technical-3',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 3',
  duration: 7,
  given: ['F = 50 kN', 'τ_dop = 80 MPa'],
  result:
    'Zwróć uwagę, że zaokrąglenie średnicy w górę jest bezpieczne, ale nie zawsze wystarcza. Przy średnicy 30 mm naprężenie spadło do 70,7 MPa, jednak nadal trzeba sprawdzić docisk blachy i wytrzymałość przekroju netto. Sam sworzeń może być mocny, a blacha wokół otworu zbyt cienka. Projektowanie połączenia to zawsze sprawdzenie całego układu, nie tylko jednego elementu.',
  animation: ShearTechnicalExample3Animation,
  figure: {
    kind: 'section',
    width: 30,
    height: 30,
    parts: [
      {
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        label: 'sworzeń ∅30',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 15,
      y: 15,
    },
    values: [
      {
        label: 'F',
        value: '50 kN',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '80 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'A_s,min',
        value: '625 mm²',
        focus: 'design',
      },
      {
        label: 'd_min',
        value: '28,2 mm',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'd',
        value: '30 mm',
        focus: 'design',
      },
      {
        label: 'A',
        value: '706,86 mm²',
        focus: 'design',
      },
      {
        label: 'τ_sr',
        value: '70,7 MPa',
        focus: 'stress',
        reveal: 2,
      },
    ],
    note: 'Po zaokrągleniu do 30 mm naprężenie spada do 70,7 MPa, poniżej 80 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Połączenie jest jednocięte, siła wynosi F = 50 kN, a naprężenie dopuszczalne przyjęto τ_dop = 80 MPa. Szukamy najmniejszej średnicy sworznia, dla której warunek τ_sr ≤ τ_dop jest spełniony.',
      caption: 'Jednocięte połączenie o nieznanej średnicy; F = 50 kN, τ_dop = 80 MPa.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F = 50\\ \\text{kN},\\qquad \\tau_{dop} = 80\\ \\text{MPa}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'W styku blach jest jedna płaszczyzna ścinania, więc A_s = A. W stanie granicznym średnie naprężenie osiąga wartość dopuszczalną: τ_sr = F/A_s = τ_dop. Z tego warunku wyznaczymy wymagane pole.',
      caption: 'Jedna płaszczyzna ścinania; stan graniczny τ_sr = τ_dop.',
      visual: 'section',
      focus: { metric: 'limit' },
      formula: '\\tau_{sr} = \\frac{F}{A_s} \\le \\tau_{dop}',
    },
    {
      title: 'Wymagane pole',
      narration:
        'Przekształcamy warunek: A_s ≥ F/τ_dop = 50 000/80 = 625 mm^2. Przekrój sworznia musi mieć co najmniej takie pole, żeby średnie naprężenie nie przekroczyło 80 MPa.',
      caption: 'Wymagane pole ścinane wynosi 625 mm².',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A_s \\ge \\frac{F}{\\tau_{dop}} = \\frac{50\\,000}{80} = 625\\ \\text{mm}^2',
    },
    {
      title: 'Średnica minimalna',
      narration:
        'Dla jednej płaszczyzny ścinania A_s = π d^2/4, więc d ≥ √(4A_s/π) = √(4 · 625/π) = √(795,77) = 28,2 mm. To najmniejsza średnica, która spełnia warunek wytrzymałości.',
      caption: 'Z pola 625 mm² wynika średnica minimalna 28,2 mm.',
      visual: 'section',
      focus: { metric: 'diameter' },
      formula: 'd \\ge \\sqrt{\\frac{4A_s}{\\pi}} = \\sqrt{\\frac{4 \\cdot 625}{\\pi}} = 28{,}2\\ \\text{mm}',
    },
    {
      title: 'Dobór średnicy',
      narration:
        'W praktyce wybieramy najbliższy dostępny wymiar większy od 28,2 mm, na przykład 30 mm. Dla tej średnicy A = π · 30^2/4 = 706,86 mm^2, czyli więcej niż wymagane 625 mm^2.',
      caption: 'Przyjęto d = 30 mm; pole wzrosło do 706,86 mm².',
      visual: 'section',
      focus: { metric: 'select' },
      formula: 'd = 30\\ \\text{mm},\\qquad A = \\pi \\cdot 30^2/4 = 706{,}86\\ \\text{mm}^2',
    },
    {
      title: 'Sprawdzenie',
      narration:
        'Wracamy do wzoru: τ_sr = 50 000/706,86 = 70,7 MPa, czyli mniej niż 80 MPa. Zaokrąglenie jest bezpieczne, ale nadal trzeba sprawdzić docisk blachy i wytrzymałość przekroju netto. Sam sworzeń może być mocny, a blacha wokół otworu zbyt cienka.',
      caption: 'τ_sr = 70,7 MPa ≤ 80 MPa; pozostaje sprawdzić docisk blachy.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\tau_{sr} = \\frac{50\\,000}{706{,}86} = 70{,}7\\ \\text{MPa} \\le 80\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
