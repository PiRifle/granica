import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 4,
  family: 'lever',
  G: 1.8,
  Q: 15,
  a: 0.1,
  b: 0.4,
  e: 0.06,
  alphaDeg: null,
  mu: 0.25,
  outerK: 2,
  ropeK: 1,
  ropeTension: 15,
  ropeDirection: {
    x: 1,
    y: 0,
  },
  ropeTangent: {
    x: 0,
    y: -1,
  },
  contact: {
    x: 0,
    y: 1,
  },
  drumWeight: 1.8,
  title: 'Pozioma dźwignia nad bębnem 2R: siła P pionowo w dół',
  modelText:
    'Bęben 2R z wewnętrznym promieniem R ma nieruchomy czop O. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R i odchodzi poziomo w prawo do krążka stałego. Nad bębnem leży pozioma dźwignia AB podparta w A po prawej stronie; P działa pionowo w dół na lewy koniec B. Klocek między dźwignią a bębnem ma grubość e.',
  givenGeometry:
    'O — nieruchomy czop; promień zewnętrzny 2R, wewnętrzny R; lina Q poziomo z promienia R; pozioma dźwignia A–B, A po prawej, B po lewej; klocek w odległości a od B i b od A; P pionowo w dół w B; grubość klocka c = e',
  contactText:
    'Klocek styka się z górnym punktem zewnętrznego okręgu 2R. Normalna jest pionowa i przechodzi przez O, a tarcie działa poziomo na górnej powierzchni bębna.',
  ropeText:
    'Lina Q odchodzi poziomo od dolnego punktu wewnętrznego okręgu R w prawo. Jej moment względem O jest przeciwny do wskazówek zegara.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: -1,
      y: 0,
    },
    contactToA: 0.4,
    contactToB: 0.1,
    pAtB: true,
    pDistance: 0,
    pDirection: {
      x: 0,
      y: -1,
    },
    pLabel: 'B (pionowo w dół)',
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-dzwignia-pozioma' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Bęben o promieniu zewnętrznym 2R i wewnętrznym R ma nieruchomy czop O i ciężar G = 1,8 kN. Lina nawinięta na promień R odchodzi poziomo w prawo do krążka stałego, z którego wisi ciężar Q = 15 kN. Nad bębnem leży pozioma dźwignia A–B podparta w A po prawej stronie; siła P działa pionowo w dół na lewy koniec B.',
    formula:
      'G=1{,}8\\ \\mathrm{kN},\\quad Q=15\\ \\mathrm{kN},\\quad a=0{,}10\\ \\mathrm{m},\\quad b=0{,}40\\ \\mathrm{m},\\quad e=0{,}06\\ \\mathrm{m},\\quad \\mu=0{,}25',
    caption:
      'Klocek między dźwignią a bębnem ma grubość e = 0,06 m. Odcinek B–klocek ma a = 0,10 m, a klocek–A ma b = 0,40 m.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    emphasis:
      'Animacja pokazuje bęben 2R, poziomą linę do krążka, ciężar Q, poziomą dźwignię, klocek, siłę P i reakcje O oraz A.',
  },
  {
    title: 'Geometria styku u góry bębna',
    narration:
      'Klocek styka się z górnym punktem zewnętrznego okręgu 2R. Normalna jest pionowa i przechodzi przez O, a tarcie działa poziomo na górnej powierzchni bębna. Dźwignia jest pozioma, więc kąt α nie występuje — zamiast niego liczy się prostopadłość P do dźwigni.',
    formula: '\\vec r_C=2R\\,(0;1),\\qquad \\text{dźwignia pozioma},\\qquad \\vec u=(-1;0)',
    caption:
      'Normalna jest skierowana w dół, a tarcie poziomo. Grubość klocka e przesuwa linię działania nacisku względem osi dźwigni.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Lina pozioma i moment obciążenia',
    narration:
      'Lina odchodzi od dolnego punktu wewnętrznego okręgu R poziomo w prawo. Jej ramię względem O wynosi R, więc moment od ciężaru Q jest równy M_Q = Q·R = 15 kN·m i obraca bęben przeciwnie do wskazówek zegara.',
    formula: 'S=Q=15\\ \\mathrm{kN},\\qquad M_Q=S\\cdot R=15\\ \\mathrm{kN\\cdot m}\\ \\text{(CCW)}',
    caption:
      'Moment liny jest dodatni. Tarcie na górnej powierzchni musi wytworzyć moment przeciwny, więc działa w prawo.',
    visual: 'diagram',
    focus: {
      metric: 'load',
    },
  },
  {
    title: 'Tarcie i nacisk na bęben',
    narration:
      'Ramię tarcia wynosi 2R, więc z równania momentów względem O otrzymujemy T = M_Q/(2R) = 7,5 kN. Warunek graniczny T = μN daje nacisk N = T/μ = 30 kN. Normalna jest pionowa, a tarcie poziome.',
    formula:
      '\\sum M_O=0:\\quad M_Q-T\\cdot2R=0\\ \\Rightarrow\\ T=7{,}5\\ \\mathrm{kN};\\qquad N=\\frac{T}{\\mu}=\\frac{7{,}5}{0{,}25}=30\\ \\mathrm{kN}',
    caption:
      'Tarcie na bębnie jest skierowane w prawo, przeciwnie do momentu od liny. Na dźwignię działa zwrot przeciwny — w lewo.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Równowaga dźwigni — siła P',
    narration:
      'Równanie momentów względem A zawiera nacisk N na ramieniu b, moment tarcia T·e oraz siłę P na ramieniu a + b. Po podstawieniu danych otrzymujemy P = 24,90 kN. Siła P działa pionowo w dół w punkcie B.',
    formula: 'P=\\frac{Nb+Te}{a+b}=\\frac{30\\cdot0{,}40+7{,}5\\cdot0{,}06}{0{,}50}=24{,}90\\ \\mathrm{kN}',
    caption:
      'P jest dodatnie, więc ma zwrot zgodny z rysunkiem. Moment tarcia T·e zwiększa wymaganą siłę P, bo tarcie działa przeciwnie do docisku dźwigni.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcja A i znaki',
    narration:
      'Po wyznaczeniu P piszemy rzuty sił dla dźwigni. Reakcja A równoważy nacisk, tarcie i siłę P. Otrzymujemy A = (7,50; −5,10) kN; dodatnia składowa pozioma i ujemna pionowa oznaczają zwrot w prawo i w dół.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ A=(7{,}50;-5{,}10)\\ \\mathrm{kN}',
    caption: 'Ujemna składowa A_y wynika z dużego nacisku N i momentu tarcia; podpora A musi ciągnąć dźwignię w dół.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Reakcja czopa O',
    narration:
      'Do bębna działają ciężar G, naciąg liny S, nacisk N, tarcie T i reakcja O. Rzuty sił dają O = (−22,50; 31,80) kN. Ujemna składowa pozioma równoważy tarcie, a dodatnia pionowa — ciężar i nacisk.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ O=(-22{,}50;31{,}80)\\ \\mathrm{kN}',
    caption:
      'Reakcja czopa jest skierowana w lewo i w górę. Jej składowa pionowa jest większa od ciężaru, bo nacisk N = 30 kN działa w dół na bęben.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, rzuty sił dla bębna i dźwigni oraz resztę momentu względem punktu styku. Reszty są na poziomie błędów zmiennoprzecinkowych, a P ma zwrot w dół zgodny z rysunkiem.',
    formula:
      'T=7{,}5\\ \\mathrm{kN}=\\mu N=0{,}25\\cdot30\\ \\mathrm{kN};\\qquad \\sum F\\approx0,\\quad \\sum M_C\\approx0',
    caption: 'Wynik końcowy: P = 24,90 kN, N = 30 kN, T = 7,5 kN, O = (−22,50; 31,80) kN, A = (7,50; −5,10) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
