import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-redukcja-3d',
  title: 'Redukcja układu przestrzennego do bieguna O',
  duration: 6,
  given: [
    'F = (0, 4, 0) kN w punkcie P = (1, 0, 2) m',
    'Przyłożona para M_c = (2, 0, 1) kN·m',
    'Biegun redukcji O = (0, 0, 0)',
  ],
  result:
    'R = (0, 4, 0) kN, M_O = (−6, 0, 5) kN·m. Ponieważ R·M_O = 0, układ ma wypadkową o pionowej prostej działania x = 1,25 m, z = 1,5 m. Po zmianie bieguna na O′ = (1, 0, 0): M_O′ = (−6, 0, 1) kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Reduction3DAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Na płytę działa jedna siła i jedna przyłożona para. Redukcja zastąpi cały układ siłą zaczepioną w biegunie oraz parą o odpowiednim momencie.',
      caption: 'Siła w punkcie P i para swobodna M_c.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        '\\mathbf F=(0,4,0)\\ \\text{kN},\\qquad P=(1,0,2)\\ \\text{m},\\qquad \\mathbf M_c=(2,0,1)\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Wektor główny',
      narration:
        'Wektor główny to suma geometryczna sił. Przy jednej sile jest po prostu równy tej sile i nie zależy od wyboru bieguna.',
      caption: 'R = (0, 4, 0) kN — suma sił układu.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula: '\\mathbf R=\\sum\\mathbf F_i=(0,4,0)\\ \\text{kN}',
    },
    {
      title: 'Moment główny',
      narration:
        'Do momentu od siły względem O dodajemy moment przyłożonej pary. Para nie ma punktu przyłożenia — jej moment wchodzi do sumy bezpośrednio.',
      caption: 'M_O = (−8, 0, 4) + (2, 0, 1) = (−6, 0, 5) kN·m.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula:
        '\\mathbf r\\times\\mathbf F=(1,0,2)\\times(0,4,0)=(-8,0,4),\\qquad \\mathbf M_O=(-8,0,4)+(2,0,1)=(-6,0,5)',
    },
    {
      title: 'Test typu układu',
      narration:
        'Iloczyn skalarny wektora głównego i momentu głównego jest zerowy. Moment jest więc prostopadły do wypadkowej i cały układ można zastąpić jedną siłą.',
      caption: 'R·M_O = 0 — układ ma wypadkową.',
      visual: 'diagram',
      focus: { metric: 'test' },
      formula: '\\mathbf R\\cdot\\mathbf M_O=0\\cdot(-6)+4\\cdot0+0\\cdot5=0\\quad\\Rightarrow\\quad \\text{wypadkowa}',
    },
    {
      title: 'Prosta działania wypadkowej',
      narration:
        'Szukamy punktu, w którym moment samej wypadkowej równa się momentowi głównemu. Warunek r × R = M_O daje x = 1,25 m i z = 1,5 m; współrzędna y pozostaje dowolna, bo prosta jest równoległa do osi y.',
      caption: 'Pionowa prosta działania: x = 1,25 m, z = 1,5 m.',
      visual: 'diagram',
      focus: { metric: 'line' },
      formula:
        '\\mathbf r\\times\\mathbf R=\\mathbf M_O\\quad\\Rightarrow\\quad x=1{,}25\\ \\text{m},\\quad z=1{,}5\\ \\text{m}',
    },
    {
      title: 'Kontrola zmianą bieguna',
      narration:
        'Przenosimy biegun do O′ i przeliczamy moment według wzoru M_O′ = M_O − a × R. Wynik zgadza się z bezpośrednim iloczynem wektora ramienia i wypadkowej, co potwierdza redukcję.',
      caption: 'M_O′ = (−6, 0, 1) kN·m po przesunięciu bieguna o a = (1, 0, 0) m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        '\\mathbf M_{O\\prime}=\\mathbf M_O-\\mathbf a\\times\\mathbf R=(-6,0,5)-(0,0,4)=(-6,0,1)\\ \\text{kN}\\cdot\\text{m}',
    },
  ],
} satisfies SolutionData
