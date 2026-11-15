import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createSectionSolution } from '../../solution-factories/factory-section-geometry/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model przekroju L',
    narration:
      'Przekrój jest sumą pionowego prostokąta a × 8a i poziomej stopy 5a × a. Początek układu O umieszczamy w lewym dolnym narożniku, oś x prowadzimy w prawo, a oś y w górę. Wymiary podajemy w wielokrotnościach a.',
    formula:
      '\\text{V: }a\\times8a\\text{, }\\quad \\text{H: }5a\\times a\\\\O=(0;\\,0)\\qquad x\\to\\text{w prawo},\\ y\\to\\text{w górę}',
    caption: 'Przekrój L z wymiarami w jednostkach a i początkiem układu O w narożniku.',
    visual: 'section',
    focus: { metric: 'model' },
    emphasis: 'Cała geometria jest opisana jednym parametrem a — wyniki będą w a² i a⁴.',
  },
  {
    title: '2. Podział na dwa prostokąty',
    narration:
      'Dzielimy przekrój na pionową część 7a × a nad stopą oraz stopę 5a × a. Pola wynoszą odpowiednio 7a² i 5a², a suma daje 12a². Taki podział jest wygodny, bo części są rozłączne i mają proste środki ciężkości.',
    formula: 'A_1=7a\\cdot a=7a^2\\qquad A_2=5a\\cdot a=5a^2\\\\A=A_1+A_2=12a^2',
    caption: 'Przekrój rozdzielony na pionową część i poziomą stopę; pola sumują się do 12a².',
    visual: 'section',
    focus: { metric: 'split' },
    emphasis: 'Części nie nakładają się — dlatego pola można po prostu dodać.',
  },
  {
    title: '3. Współrzędne środka ciężkości',
    narration:
      'Środek pionowej części ma współrzędne (a/2; 4,5a), a stopy (2,5a; 0,5a). Po zważeniu pól otrzymujemy x_C = 4a/3 ≈ 1,333a oraz y_C = 17a/6 ≈ 2,833a. Środek ciężkości leży więc w obrębie pionowej części, blisko narożnika.',
    formula:
      '\\begin{aligned}x_C&=\\frac{7a^2\\cdot\\frac{a}{2}+5a^2\\cdot\\frac{5a}{2}}{12a^2}=\\frac{4a}{3}\\\\y_C&=\\frac{7a^2\\cdot4{,}5a+5a^2\\cdot0{,}5a}{12a^2}=\\frac{17a}{6}\\end{aligned}',
    caption: 'Środki C₁, C₂ części oraz wypadkowy środek ciężkości C.',
    visual: 'section',
    focus: { metric: 'centroid' },
    emphasis: 'Współrzędne liczymy względem narożnika O, a nie względem środka przekroju.',
  },
  {
    title: '4. Momenty własne i Steiner dla I_x',
    narration:
      'Moment centralny I_x liczymy względem poziomej osi x_c przechodzącej przez C. Dla każdej części dodajemy jej moment własny względem własnej osi poziomej oraz składnik A d_y², gdzie d_y to różnica współrzędnych y. Dla części pionowej d_y = 5a/3, a dla stopy d_y = 7a/3.',
    formula:
      'I_x=\\sum\\left(I_{x,i}^{0}+A_i d_{yi}^2\\right)\\\\I_x=\\frac{a(7a)^3}{12}+7a^2\\left(\\frac{5a}{3}\\right)^2+\\frac{5a\\cdot a^3}{12}+5a^2\\left(\\frac{7a}{3}\\right)^2',
    caption: 'Pozioma oś centralna x_c i pionowe odległości środków części od tej osi.',
    visual: 'section',
    focus: { metric: 'Ix' },
    emphasis: 'Moment własny pionowej części ma wykładnik 3 przy wysokości 7a.',
  },
  {
    title: '5. Wynik I_x',
    narration:
      'Po podstawieniu ułamków otrzymujemy 343/12 + 175/9 + 5/12 + 245/9. Suma wynosi 227a⁴/3, czyli około 75,67a⁴. Dominujący wkład ma wysoka część pionowa.',
    formula:
      'I_x=\\frac{343}{12}+\\frac{175}{9}+\\frac{5}{12}+\\frac{245}{9}\\\\I_x=\\frac{227a^4}{3}\\approx75{,}67a^4',
    caption: 'Zestawienie czterech składników dających centralny moment I_x.',
    visual: 'section',
    focus: { metric: 'Ix-result' },
    emphasis: 'I_x odpowiada zginaniu względem osi poziomej.',
  },
  {
    title: '6. Moment centralny I_y',
    narration:
      'Dla I_y względem pionowej osi y_c decydują odległości poziome d_x. Dla części pionowej d_x = 5a/6, a dla stopy d_x = 7a/6. Po dodaniu momentów własnych i składników Steinera otrzymujemy 68a⁴/3 ≈ 22,67a⁴.',
    formula:
      'I_y=\\frac{7a\\cdot a^3}{12}+7a^2\\left(\\frac{5a}{6}\\right)^2+\\frac{a(5a)^3}{12}+5a^2\\left(\\frac{7a}{6}\\right)^2\\\\I_y=\\frac{68a^4}{3}\\approx22{,}67a^4',
    caption: 'Pionowa oś centralna y_c, poziome odległości środków części i wynik I_y.',
    visual: 'section',
    focus: { metric: 'Iy' },
    emphasis: 'Przy osi pionowej stopa wnosi znacznie więcej niż przy osi poziomej.',
  },
  {
    title: '7. Moment dewiacyjny I_xy',
    narration:
      'Momenty własne względem osi centralnych części nie dają iloczynu, więc pozostają składniki A d_x d_y. Dla obu części iloczyn odległości jest ujemny, dlatego I_xy = −70a⁴/3 ≈ −23,33a⁴. Znak wynika z rozmieszczenia materiału w ćwiartkach układu.',
    formula:
      'I_{xy}=\\sum A_i d_{xi}d_{yi}\\\\I_{xy}=7a^2\\left(-\\frac{5a}{6}\\right)\\left(\\frac{5a}{3}\\right)+5a^2\\left(\\frac{7a}{6}\\right)\\left(-\\frac{7a}{3}\\right)=-\\frac{70a^4}{3}',
    caption: 'Iloczyny d_x d_y dla obu części są ujemne, więc I_xy jest ujemny.',
    visual: 'section',
    focus: { metric: 'Ixy' },
    emphasis: 'Znak I_xy zależy od położenia materiału względem osi centralnych.',
  },
  {
    title: '8. Kontrola względem osi O',
    narration:
      'Momenty względem osi O: I_x^O = (517 − 1)a⁴/3 = 516a⁴/3 = 172a⁴, I_y^O = (133 − 1)a⁴/3 = 132a⁴/3 = 44a⁴, I_xy^O = 22a⁴. Składnik −a⁴/3 usuwa podwójne liczenie wspólnego kwadratu a×a. Przejście do osi centralnych daje dokładnie 227a⁴/3, 68a⁴/3 i −70a⁴/3.',
    formula:
      'I_x^O=\\frac{516a^4}{3}=172a^4\\qquad I_y^O=\\frac{132a^4}{3}=44a^4\\qquad I_{xy}^O=22a^4\\\\I_x=\\frac{516a^4}{3}-12a^2\\left(\\frac{17a}{6}\\right)^2=\\frac{227a^4}{3}',
    caption: 'Momenty względem osi O i przejście Steinera do osi centralnych.',
    visual: 'section',
    focus: { metric: 'check' },
    emphasis: 'Niezależna kontrola od osi O potwierdza wszystkie trzy wyniki centralne.',
  },
]

export default {
  ...createSectionSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.LSectionSecondMomentsAnimation }))),
} satisfies SolutionData
