import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-moment-3d',
  title: 'Moment siły w przestrzeni — punkt, wektor i oś',
  duration: 6,
  given: [
    'F = (3, −6, 2) kN przyłożona w punkcie P = (2, 1, 2) m',
    'Biegun O = (0, 0, 0)',
    'Oś l przechodzi przez O i Q = (1, 2, 2) m',
  ],
  result:
    'M_O = (14, 2, −15) kN·m, |M_O| ≈ 20,6 kN·m. Wersor osi e_l = (1/3, 2/3, 2/3), a moment względem osi M_l = −4 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Moment3DAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Siła działa w punkcie P, a biegun obieramy w początku układu. Wektor r prowadzi od bieguna do punktu przyłożenia i razem z siłą wyznacza płaszczyznę obrotu.',
      caption: 'Punkt P, wektor ramienia r i siła F w przestrzeni.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: '\\mathbf F=(3\\,\\mathbf i-6\\,\\mathbf j+2\\,\\mathbf k)\\ \\text{kN},\\qquad P=(2,1,2)\\ \\text{m}',
    },
    {
      title: 'Iloczyn wektorowy',
      narration:
        'Każdą składową momentu liczymy z różnicy iloczynów odpowiednich składowych. Kolejność r × F jest obowiązkowa — zamiana daje wektor przeciwny.',
      caption: 'Mx = 14, My = 2, Mz = −15 kN·m.',
      visual: 'diagram',
      focus: { metric: 'cross' },
      formula: 'M_x=1\\cdot2-2\\cdot(-6)=14,\\qquad M_y=2\\cdot3-2\\cdot2=2,\\qquad M_z=2\\cdot(-6)-1\\cdot3=-15',
    },
    {
      title: 'Wektor momentu',
      narration:
        'Trzy składowe tworzą wektor momentu względem punktu O. Jest on prostopadły do płaszczyzny wyznaczonej przez r i F, a jego moduł to siła razy ramię.',
      caption: 'M_O = (14, 2, −15) kN·m, |M_O| ≈ 20,6 kN·m.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula:
        '\\mathbf M_O=(14\\,\\mathbf i+2\\,\\mathbf j-15\\,\\mathbf k)\\ \\text{kN}\\cdot\\text{m},\\qquad |\\mathbf M_O|=\\sqrt{425}=20{,}6\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Oś obrotu',
      narration:
        'Oś l wyznaczają punkty O i Q. Jej wersor otrzymujemy z podzielenia wektora OQ przez długość 3 m. To kierunek, na który będziemy rzutować moment.',
      caption: 'e_l = (1/3, 2/3, 2/3) — wersor osi l.',
      visual: 'diagram',
      focus: { metric: 'axis' },
      formula:
        '\\vec{OQ}=(1,2,2)\\ \\text{m},\\qquad |\\vec{OQ}|=3\\ \\text{m},\\qquad \\mathbf e_l=\\left(\\frac{1}{3},\\frac{2}{3},\\frac{2}{3}\\right)',
    },
    {
      title: 'Rzut na oś',
      narration:
        'Moment względem osi to iloczyn skalarny momentu i wersora osi. Wynik jest jedną liczbą ze znakiem, a nie nowym wektorem.',
      caption: 'M_l = −4 kN·m — rzut momentu na oś l.',
      visual: 'diagram',
      focus: { metric: 'projection' },
      formula: 'M_l=\\mathbf M_O\\cdot\\mathbf e_l=\\frac{14+4-30}{3}=-4\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Znak i interpretacja',
      narration:
        'Wartość ujemna oznacza, że obrót wokół osi l jest przeciwny do zwrotu jej wersora. Moment względem punktu nie znika — znika tylko jego składowa wzdłuż tej konkretnej osi, gdy linia działania siły przecina oś lub jest do niej równoległa.',
      caption: 'Rzut ujemny to informacja o zwrocie obrotu, nie błąd.',
      visual: 'diagram',
      focus: { metric: 'sign' },
      formula: 'M_l=-4\\ \\text{kN}\\cdot\\text{m},\\qquad \\mathbf M_O\\neq\\mathbf 0,\\qquad M_l<0',
    },
  ],
} satisfies SolutionData
