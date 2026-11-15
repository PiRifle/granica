import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { canonicalTask, createHamulecSolution } from './factory'

const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Bęben o promieniu zewnętrznym 2R i wewnętrznym R jest osadzony na nieruchomym czopie O i ma ciężar G = 1,0 kN. Lina nawinięta na wewnętrzny promień R przenosi ciężar Q = 10 kN. Klocek na dźwigni A–B dociska zewnętrzny promień 2R; dźwignia jest podparta w A, a w końcu B działa pionowo w górę siła P. Przyjmujemy osie x w prawo, y w górę i moment dodatni przeciwnie do wskazówek zegara.',
    formula:
      'G=1{,}0\\ \\mathrm{kN},\\quad Q=10\\ \\mathrm{kN},\\quad a=0{,}20\\ \\mathrm{m},\\quad b=0{,}10\\ \\mathrm{m},\\quad e=0{,}04\\ \\mathrm{m},\\quad \\mu=0{,}10',
    caption:
      'Dane geometryczne: promień zewnętrzny 2R, wewnętrzny R, ramiona a i b oraz mimośród klocka e. R jest skalą dowolną i skraca się w równaniach momentów.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    emphasis: 'Rysunek pokazuje pełny schemat: bęben, linę z Q, klocek, dźwignię A–B i siłę P.',
  },
  {
    title: 'Geometria styku i kąt α',
    narration:
      'Punkt styku klocka z bębnem leży na zewnętrznym okręgu 2R po prawej-dolnej stronie. Promień do styku tworzy z pionem kąt α = 30°, więc normalna przechodzi przez środek O. Dźwignia jest styczna do bębna, a klocek ma mimośród e mierzony wzdłuż normalnej.',
    formula:
      '\\vec r_C=2R\\,(\\sin30^\\circ;-\\cos30^\\circ),\\qquad \\alpha=30^\\circ,\\qquad \\vec u=(\\cos30^\\circ;\\sin30^\\circ)',
    caption:
      'Kierunek normalnej to −r_C, a tarcie działa stycznie do okręgu 2R. Odcinek A–klocek ma a = 0,20 m, a klocek–B ma b = 0,10 m.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Lina, ciężar Q i moment obciążenia',
    narration:
      'Lina odchodzi stycznie od wewnętrznego okręgu R po lewej stronie i działa w dół. Jej ramię względem O wynosi R, więc moment od Q jest równy M_Q = Q·R = 10 kN·m i obraca bęben przeciwnie do wskazówek zegara.',
    formula: 'S=Q=10\\ \\mathrm{kN},\\qquad M_Q=S\\cdot R=10\\ \\mathrm{kN\\cdot m}\\ \\text{(CCW)}',
    caption:
      'Moment liny jest dodatni. Aby bęben pozostał w równowadze, tarcie musi wytworzyć moment przeciwny, czyli zgodny ze wskazówkami zegara.',
    visual: 'diagram',
    focus: {
      metric: 'load',
    },
    emphasis: 'Na rysunku pojawia się łuk momentu M_Q wokół osi O.',
  },
  {
    title: 'Warunek graniczny tarcia',
    narration:
      'W stanie równowagi granicznej tarcie osiąga maksimum T = μN. Równanie momentów względem O zawiera ramię 2R, więc siła tarcia wynosi T = M_Q/(2R) = 5 kN. Z warunku granicznego otrzymujemy nacisk klocka N = T/μ = 50 kN.',
    formula:
      '\\sum M_O=0:\\quad M_Q-T\\cdot 2R=0\\ \\Rightarrow\\ T=\\frac{10}{2}=5\\ \\mathrm{kN};\\qquad T=\\mu N\\ \\Rightarrow\\ N=50\\ \\mathrm{kN}',
    caption:
      'Tarcie na bębnie jest skierowane przeciwnie do ruchu wywołanego przez linę. Na dźwignię działa zwrot przeciwny, zgodnie z trzecią zasadą dynamiki.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Równowaga bębna — reakcja O',
    narration:
      'Do bębna przyłożone są: ciężar G, naciąg liny S, nacisk klocka N, tarcie T i reakcja czopa O. Równania rzutów sił domykają reakcję O. Składowa pozioma pochodzi głównie od nacisku, a pionowa równoważy różnicę pionowych składowych N, S i G.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ O=(29{,}33;-29{,}80)\\ \\mathrm{kN}',
    caption:
      'Znak minus przy O_y oznacza, że reakcja czopa na bęben działa w dół. Jest to konsekwencja dużego, skierowanego do góry nacisku N.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Równowaga dźwigni — siła P',
    narration:
      'Dźwignia jest w równowadze pod działaniem reakcji A, nacisku N, tarcia T i siły P. Równanie momentów względem A eliminuje reakcję podpory. Moment nacisku wynosi N·a, a mimośród dokłada T·e; po prawej stronie stoi moment siły P o ramieniu (a + b)·cos α.',
    formula:
      'P=\\frac{Na+Te}{(a+b)\\cos\\alpha}=\\frac{50\\cdot0{,}20+5\\cdot0{,}04}{0{,}30\\cdot0{,}866}=39{,}26\\ \\mathrm{kN}',
    caption:
      'Siła P jest dodatnia, więc ma zwrot zgodny z rysunkiem — działa pionowo w górę w punkcie B. Moment tarcia T·e zwiększa wymaganą siłę P.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcje A i zamknięcie układu',
    narration:
      'Po wyznaczeniu P piszemy rzuty sił dla dźwigni. Reakcja A równoważy poziomą składową nacisku i tarcia oraz pionowy udział P. Otrzymujemy A = (−29,33; 1,54) kN, a reakcja O domyka równowagę całego bębna.',
    formula:
      '\\sum F_x=0,\\ \\sum F_y=0\\ \\Rightarrow\\ A=(-29{,}33;1{,}54)\\ \\mathrm{kN},\\qquad O=(29{,}33;-29{,}80)\\ \\mathrm{kN}',
    caption:
      'Znaki reakcji opisują zwroty przyjęte na rysunku. Para O_x i A_x ma przeciwne znaki, bo nacisk i tarcie przenoszą się między bębnem a dźwignią.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, dodatniość nacisku oraz reszty sum sił i momentów względem punktu styku C. Dla bębna i dźwigni reszty są na poziomie błędów zmiennoprzecinkowych, a otrzymana siła P ma poprawny zwrot.',
    formula:
      'T=5\\ \\mathrm{kN}=\\mu N=0{,}10\\cdot50\\ \\mathrm{kN};\\qquad \\sum F_x\\approx0,\\quad \\sum F_y\\approx0,\\quad \\sum M_C\\approx0',
    caption:
      'Kontrola potwierdza wynik: P = 39,26 kN, N = 50 kN, T = 5 kN, O = (29,33; −29,80) kN i A = (−29,33; 1,54) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]

export default {
  ...createHamulecSolution({ ...canonicalTask, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DrumLeverBrakeAnimation }))),
} satisfies SolutionData
