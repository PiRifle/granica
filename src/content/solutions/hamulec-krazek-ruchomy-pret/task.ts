import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 2,
  family: 'rod',
  G: 1.1,
  Q: null,
  a: 0.1,
  b: 0.15,
  e: 0,
  alphaDeg: 30,
  mu: 0.15,
  outerK: 1.5,
  ropeK: 1,
  ropeTension: 0.55,
  ropeDirection: {
    x: 0,
    y: -1,
  },
  ropeTangent: {
    x: -1,
    y: 0,
  },
  contact: {
    x: 0.49999999999999994,
    y: 0.8660254037844387,
  },
  drumWeight: 2.2,
  title: 'Bęben 1,5R z krążkiem ruchomym G i prętem hamulcowym w prowadnicach A, B',
  modelText:
    'Bęben o promieniu zewnętrznym 1,5R i wewnętrznym R ma nieruchomy czop O i ciężar 2G. Lina nawinięta na promień R przechodzi przez krążek ruchomy obciążony ciężarem G; z równowagi krążka naprężenie liny wynosi G/2. Pręt hamulcowy jest prowadzony w dwóch gładkich prowadnicach A i B, a siła P działa wzdłuż jego osi, dociskając klocek do bębna.',
  givenGeometry:
    'Bęben: promień zewnętrzny 1,5R, wewnętrzny R, ciężar 2G; krążek ruchomy z ciężarem G; pręt przechodzi przez prowadnice A i B, klocek na końcu przy bębnie; odcinek klocek–A = a, A–B = b; siła P wzdłuż pręta',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym-górnym punkcie. Pręt jest odchylony od pionu o kąt α i działa wzdłuż promienia, więc dociska bęben normalnie.',
  ropeText:
    'Lina na wewnętrznym promieniu R odchodzi stycznie po lewej i działa w dół na bęben. Krążek ruchomy równoważy ciężar G dwoma odcinkami liny, dlatego S = G/2.',
  reactionPoints: 'O, A, B',
  rod: {
    u: {
      x: 0.49999999999999994,
      y: 0.8660254037844387,
    },
    guideA: 0.1,
    guideB: 0.25,
    pEnd: 0.3,
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-krazek-ruchomy-pret' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Bęben o promieniu zewnętrznym 1,5R i wewnętrznym R ma nieruchomy czop O i ciężar 2G = 2,2 kN. Lina nawinięta na promień R przechodzi przez krążek ruchomy obciążony ciężarem G = 1,1 kN. Pręt hamulcowy jest prowadzony w dwóch gładkich prowadnicach A i B i dociska klocek do bębna; siła P działa wzdłuż osi pręta.',
    formula:
      'G=1{,}1\\ \\mathrm{kN},\\quad 2G=2{,}2\\ \\mathrm{kN},\\quad a=0{,}10\\ \\mathrm{m},\\quad b=0{,}15\\ \\mathrm{m},\\quad \\mu=0{,}15',
    caption:
      'Prowadnice są gładkie, więc ich reakcje są prostopadłe do pręta. Pręt jest odchylony od pionu o kąt α = 30°.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    emphasis: 'Animacja pokazuje bęben, krążek ruchomy, linę, pręt w prowadnicach A i B oraz siłę P.',
  },
  {
    title: 'Geometria pręta i punkt styku',
    narration:
      'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym-górnym punkcie. Promień do styku tworzy z pionem kąt α = 30°, a pręt leży wzdłuż tego promienia. Prowadnica A znajduje się bliżej bębna, a B dalej; siła P działa na końcu pręta w kierunku do bębna.',
    formula:
      '\\vec r_C=1{,}5R\\,(\\sin30^\\circ;\\cos30^\\circ),\\qquad \\alpha=30^\\circ,\\qquad \\vec u=(\\sin30^\\circ;\\cos30^\\circ)',
    caption:
      'Odcinek klocek–A ma a = 0,10 m, a A–B ma b = 0,15 m. Normalna jest równoległa do pręta, bo pręt działa wzdłuż promienia.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Krążek ruchomy i naciąg liny',
    narration:
      'Krążek ruchomy jest podtrzymywany przez dwa odcinki tej samej liny. Z równowagi krążka wynika, że każde odgałęzienie przenosi połowę ciężaru G, czyli S = G/2 = 0,55 kN. Lina odchodzi od wewnętrznego promienia R po lewej stronie i działa w dół.',
    formula:
      '2S=G\\ \\Rightarrow\\ S=\\frac{G}{2}=0{,}55\\ \\mathrm{kN};\\qquad M_Q=S\\cdot R=0{,}55\\ \\mathrm{kN\\cdot m}',
    caption:
      'Moment liny względem O jest dodatni (przeciwnie do wskazówek zegara). Tarcie musi więc działać w kierunku zgodnym ze wskazówkami zegara.',
    visual: 'diagram',
    focus: {
      metric: 'load',
    },
  },
  {
    title: 'Tarcie i nacisk na bęben',
    narration:
      'Ramię tarcia wynosi 1,5R, więc z równania momentów względem O otrzymujemy T = M_Q/(1,5R) = 0,367 kN. Stan graniczny T = μN daje nacisk N = T/μ = 2,444 kN. Tarcie działa stycznie do bębna, a normalna wzdłuż pręta.',
    formula:
      '\\sum M_O=0:\\quad M_Q-T\\cdot1{,}5R=0\\ \\Rightarrow\\ T=0{,}367\\ \\mathrm{kN};\\qquad N=\\frac{T}{\\mu}=2{,}444\\ \\mathrm{kN}',
    caption: 'Kierunek tarcia na bębnie jest przeciwny do momentu od liny. Na pręt działa tarcie o zwrocie przeciwnym.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Równowaga pręta — siła P',
    narration:
      'Pręt jest prowadzony w dwóch gładkich prowadnicach, więc reakcje A i B są prostopadłe do jego osi. Rzut sił na kierunek pręta zawiera tylko P i nacisk N, dlatego P = N = 2,444 kN. Siła P dociska klocek do bębna.',
    formula: '\\sum F_\\parallel=0\\ \\Rightarrow\\ P=N=2{,}444\\ \\mathrm{kN}',
    caption: 'P jest dodatnie, więc działa zgodnie ze zwrotem przyjętym na rysunku — wzdłuż pręta do bębna.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcje prowadnic A i B',
    narration:
      'Reakcje prowadnic wyznaczamy z rzutu prostopadłego do pręta oraz z równania momentów względem prowadnicy A. Tarcie na pręcie daje moment względem prowadnic, dlatego A i B mają przeciwne zwroty.',
    formula:
      '\\sum M_A=0\\ \\Rightarrow\\ B=(-0{,}212;0{,}122)\\ \\mathrm{kN},\\qquad A=(0{,}529;-0{,}306)\\ \\mathrm{kN}',
    caption:
      'Znaki reakcji wynikają z przyjętego układu osi. Reakcje są prostopadłe do pręta i mają składowe o różnych znakach.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Reakcja czopa O',
    narration:
      'Do bębna działają ciężar 2G, naciąg liny S, nacisk N, tarcie T i reakcja O. Rzuty sił dają O = (0,905; 5,050) kN. Duża składowa pionowa równoważy ciężar bębna i pionowy udział nacisku.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ O=(0{,}905;5{,}050)\\ \\mathrm{kN}',
    caption:
      'Dodatnia składowa O_y oznacza reakcję skierowaną w górę. Jest ona większa od ciężaru, bo nacisk i tarcie mają składowe pionowe.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, rzut sił wzdłuż pręta, reszty sum sił i momentów bębna oraz pręta. Reszty są na poziomie błędów zmiennoprzecinkowych, a N i P są dodatnie.',
    formula:
      'T=0{,}367\\ \\mathrm{kN}=\\mu N=0{,}15\\cdot2{,}444\\ \\mathrm{kN};\\qquad \\sum F\\approx0,\\quad \\sum M_C\\approx0',
    caption:
      'Wynik końcowy: P = 2,444 kN, N = 2,444 kN, T = 0,367 kN, O = (0,905; 5,050) kN, A = (0,529; −0,306) kN, B = (−0,212; 0,122) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
