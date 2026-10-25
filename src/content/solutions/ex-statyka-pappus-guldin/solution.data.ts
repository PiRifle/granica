import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-pappus-guldin',
  title: 'Objętość i powierzchnia kuli z twierdzeń Pappusa-Guldina',
  duration: 6,
  given: [
    'Półkole o promieniu r = 20 mm obracane wokół średnicy',
    'Półokrąg o promieniu r = 20 mm obracany wokół średnicy',
    'Pełny obrót, kąt 2π',
  ],
  result:
    'Dla półkola r̄ = 4r/(3π) = 8,49 mm, A = 628,32 mm², V = 2πr̄A = 33 510 mm³. Dla półokręgu r̄ = 2r/π = 12,73 mm, L = 62,83 mm, S = 2πr̄L = 5 026,5 mm². Oba wyniki zgadzają się ze wzorami na kulę.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PappusGuldinAnimation }))),
  scenes: [
    {
      title: 'Model obrotu',
      narration:
        'Półkole leży w płaszczyźnie rysunku, a jego średnica jest osią obrotu. Przy pełnym obrocie figura zakreśla kulę. Oś leży w płaszczyźnie figury i jej nie przecina, więc twierdzenie Pappusa-Guldina można stosować w prostej postaci.',
      caption: 'Półkole o promieniu r = 20 mm obraca się wokół średnicy.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'r=20\\ \\text{mm},\\qquad \\text{oś obrotu}=\\text{średnica},\\qquad \\varphi=2\\pi',
    },
    {
      title: 'Centroid półkola i jego pole',
      narration:
        'Dla wypełnionego półkola centroid leży w odległości 4r/(3π) od średnicy. Pole wynosi πr²/2. Te dwie wielkości są potrzebne w drugim twierdzeniu, które dotyczy obrotu figury płaskiej, a nie samego łuku.',
      caption: 'r̄ = 8,49 mm, A = 628,32 mm².',
      visual: 'diagram',
      focus: { metric: 'disc-centroid' },
      formula:
        '\\bar r=\\frac{4r}{3\\pi}=\\frac{80}{3\\pi}=8{,}49\\ \\text{mm},\\qquad A=\\frac{\\pi r^2}{2}=628{,}32\\ \\text{mm}^2',
    },
    {
      title: 'Objętość z twierdzenia',
      narration:
        'Drugie twierdzenie mówi, że objętość bryły obrotowej to iloczyn drogi centroidu i pola figury. Droga centroidu przy pełnym obrocie wynosi 2πr̄, więc V = 2π·8,49·628,32 = 33 510 mm³. Otrzymujemy objętość kuli.',
      caption: 'V = 2πr̄A = 33 510 mm³.',
      visual: 'diagram',
      focus: { metric: 'volume' },
      formula: 'V=2\\pi\\bar r A=2\\pi\\cdot8{,}49\\cdot628{,}32=33\\,510\\ \\text{mm}^3',
    },
    {
      title: 'Kontrola wzorem na kulę',
      narration:
        'Niezależnie liczymy objętość kuli ze znanego wzoru 4πr³/3. Dla r = 20 mm dostajemy dokładnie tę samą wartość 33 510 mm³. Zgodność potwierdza, że użyto centroidu półkola, a nie centroidu łuku.',
      caption: '4πr³/3 = 33 510 mm³ — zgodność z twierdzeniem.',
      visual: 'diagram',
      focus: { metric: 'volume-check' },
      formula: 'V=\\frac{4}{3}\\pi r^3=\\frac{4}{3}\\pi\\cdot20^3=33\\,510\\ \\text{mm}^3',
    },
    {
      title: 'Centroid półokręgu i długość łuku',
      narration:
        'Teraz obracamy sam półokrąg, czyli linię. Jego centroid leży w odległości 2r/π od średnicy, a długość łuku wynosi πr. To inne wartości niż dla półkola — właśnie dlatego nie wolno ich zamieniać.',
      caption: 'r̄ = 12,73 mm, L = 62,83 mm.',
      visual: 'diagram',
      focus: { metric: 'arc-centroid' },
      formula: '\\bar r_L=\\frac{2r}{\\pi}=\\frac{40}{\\pi}=12{,}73\\ \\text{mm},\\qquad L=\\pi r=62{,}83\\ \\text{mm}',
    },
    {
      title: 'Powierzchnia kuli i kontrola',
      narration:
        'Pierwsze twierdzenie daje powierzchnię zakreśloną przez linię: S = 2πr̄L. Po podstawieniu otrzymujemy 5 026,5 mm². Ten sam wynik daje wzór na powierzchnię kuli 4πr², co zamyka kontrolę obu twierdzeń.',
      caption: 'S = 2πr̄L = 5 026,5 mm² = 4πr².',
      visual: 'diagram',
      focus: { metric: 'surface' },
      formula: 'S=2\\pi\\bar r_L L=2\\pi\\cdot12{,}73\\cdot62{,}83=4\\pi r^2=5\\,026{,}5\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
