import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createThreeSceneSolution, threeScene } from '../../solution-factories/factory-three-scene/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  threeScene(
    'Model i blokada źródłowa',
    'Źródło zawiera tylko odręczne rozwiązanie: treść zadania jest ucięta, a część schematu nieczytelna. Nie uzupełniamy brakujących wymiarów. Z rysunku odtwarzamy szkielet A–B–C–D, podpory A i B oraz oznaczenia G, P, S, 2a i a.',
    String.raw`\text{BLOKADA: brak pełnej treści},\quad A,\ B,\ C,\ D,\quad 2a,\ a,\quad G,\ P,\ S`,
    'Wyniki pozostają symboliczne, bo źródło nie podaje danych liczbowych.',
    'model',
  ),
  threeScene(
    'Geometria odtworzona z rysunku',
    'Przyjęto układ osi jak w źródle: z pionowo, y wzdłuż górnej i dolnej krawędzi, x w kierunku siły P. A leży nad B na wysokości 2a, odcinek B–C ma długość 2a, a C–D pionowy odcinek a. Połączenia poza widocznym obrysem są nieczytelne.',
    String.raw`A=(0;0;2a),\ B=(0;0;0),\ C=(0;2a;0),\ D=(0;2a;a)`,
    'To rekonstrukcja widocznej geometrii, a nie uzupełnienie brakujących wymiarów.',
    'diagram',
  ),
  threeScene(
    'Obciążenia i pręt',
    'Ciężar G działa pionowo w połowie odcinka B–C. Siła P jest przyłożona w C i działa wzdłuż osi x. Siła S działa w pręcie przy D; jej składowe zależą od kątów α i β widocznych w trójkącie sił.',
    String.raw`\mathbf G=(0;0;-G),\quad \mathbf P=(P;0;0),\quad \mathbf S=S(\cos\alpha\cos\beta;\ \cos\alpha\sin\beta;\ \sin\alpha)`,
    'Zwroty przyjęto zgodnie z osiami; znaki wyników zależą od tego przyjęcia.',
    'loads',
  ),
  threeScene(
    'Równania równowagi',
    'Zapis źródłowy zawiera sześć równań: trzy rzuty sił i trzy momenty względem osi x, y, z. Najpierw używamy momentów M_x i M_y, bo nie zawierają reakcji w A.',
    String.raw`\sum M_x:\ -G\,a+S\sin\alpha\cdot2a=0,\qquad \sum M_y:\ -R_{Bz}\,a+G\,\frac{a}{2}=0`,
    'Kolejność eliminacji niewiadomych jest taka sama jak w ręcznym rachunku.',
    'moment',
  ),
  threeScene(
    'Siła w pręcie i reakcja B',
    'Z momentu względem x otrzymujemy S = 3G/4, a z momentu względem y reakcję R_Bz = G/2. Wartości są symboliczne — nie podstawiamy G, bo źródło go nie podaje.',
    String.raw`S=\frac{3G}{4},\qquad R_{Bz}=\frac{G}{2}`,
    'Oba wyniki są niezależne od P i od geometrii w kierunku y.',
    'reactions',
  ),
  threeScene(
    'Reakcje w podporze A',
    'Moment względem z oraz rzuty sił w kierunkach x i y dają składowe reakcji w A. R_Ay = 2P + G/2, a R_Ax = −P − G/4. Z rzutu pionowego, po podstawieniu S, otrzymujemy R_Az = 0.',
    String.raw`R_{Ay}=2P+\frac{G}{2},\qquad R_{Ax}=-P-\frac{G}{4},\qquad R_{Az}=0`,
    'R_Az zeruje się, bo S sinα = G/2 równoważy połowę ciężaru G.',
    'reactions',
  ),
  threeScene(
    'Znaki i interpretacja',
    'Znak ujemny R_Ax oznacza zwrot przeciwny do przyjętego kierunku osi x. Dodatnie R_Bz i S wynikają z dodatnich G i P. Wyniki obejmują tylko odtworzoną część schematu.',
    String.raw`R_{Ax}<0\ \text{dla }P,G>0,\qquad R_{Bz}>0,\qquad S>0`,
    'Nie przypisujemy wynikom wartości liczbowych, bo brakuje pełnych danych.',
    'signs',
  ),
  threeScene(
    'Kontrola symboliczna i blokada',
    'Podstawienie S = 3G/4 i R_Bz = G/2 zeruje równania momentów M_x i M_y. Pełna kontrola sześciu równań 3D jest niemożliwa, bo źródło nie pokazuje całego schematu ani wszystkich wymiarów — to jawnie oznaczona blokada źródłowa.',
    String.raw`\sum M_x=0,\quad \sum M_y=0\quad\text{(symbolicznie; kontrola częściowa)}`,
    'Brak pełnej geometrii uniemożliwia niezależną kontrolę momentów względem x i z.',
    'check',
  ),
]

export default {
  ...createThreeSceneSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
