import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 3,
  family: 'lever',
  G: 1.3,
  Q: 14,
  a: 0.45,
  b: 0.4,
  e: 0.05,
  alphaDeg: 45,
  mu: 0.2,
  outerK: 2,
  ropeK: 1,
  ropeTension: 14,
  ropeDirection: {
    x: 0,
    y: -1,
  },
  ropeTangent: {
    x: -1,
    y: 0,
  },
  contact: {
    x: -0.7071067811865476,
    y: 0.7071067811865475,
  },
  drumWeight: 1.3,
  title: 'Bęben 2R z dźwignią pod kątem α i siłą P pod kątem 2α',
  modelText:
    'Bęben 2R z wewnętrznym promieniem R jest zamocowany w czopie O. Ciężar Q wisi na linie nawiniętej na promień R po lewej stronie. Dźwignia AB jest podparta w A i dochodzi do górnej-lewej części bębna; klocek hamulcowy leży między dźwignią a bębnem. Siła P jest przyłożona do dźwigni w odległości a od A i tworzy z dźwignią kąt 2α.',
  givenGeometry:
    'O — nieruchomy czop; promień zewnętrzny 2R, wewnętrzny R; Q na promieniu R; dźwignia A–B nachylona pod kątem α; siła P w odległości a od A pod kątem 2α do dźwigni; klocek w odległości b od punktu przyłożenia P; mimośrodowość c = e',
  contactText:
    'Klocek dotyka zewnętrznego okręgu 2R w lewym-górnym punkcie. Promień do styku tworzy z poziomem kąt α, a normalna przechodzi przez O.',
  ropeText:
    'Lina Q odchodzi stycznie od wewnętrznego okręgu R po lewej i działa w dół, wywołując moment skręcający bęben przeciwnie do wskazówek zegara.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: 0.7071067811865476,
      y: 0.7071067811865475,
    },
    contactToA: 0.85,
    contactToB: 0,
    pAtB: false,
    pDistance: 0.45,
    pDirection: {
      x: 0.7071067811865476,
      y: -0.7071067811865475,
    },
    pLabel: 'punkt na dźwigni w odległości a od A, pod kątem 2α',
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-dzwignia-ukosna' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Bęben o promieniu zewnętrznym 2R i wewnętrznym R jest podparty w nieruchomym czopie O i ma ciężar G = 1,3 kN. Na linie nawiniętej na promień R wisi ciężar Q = 14 kN. Klocek na dźwigni A–B dociska lewą-górną część bębna, a siła P jest przyłożona do dźwigni w odległości a od A pod kątem 2α do jej osi.',
    formula:
      'G=1{,}3\\ \\mathrm{kN},\\quad Q=14\\ \\mathrm{kN},\\quad a=0{,}45\\ \\mathrm{m},\\quad b=0{,}40\\ \\mathrm{m},\\quad e=0{,}05\\ \\mathrm{m},\\quad \\mu=0{,}20',
    caption:
      'Dźwignia jest nachylona pod kątem α = 45°, a siła P tworzy z nią kąt 2α = 90°. Odcinek b opisuje położenie klocka względem punktu przyłożenia P.',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
    emphasis:
      'Schemat pokazuje bęben 2R, linę z Q, dźwignię pod kątem α, klocek, siłę P pod kątem 2α i reakcje O oraz A.',
  },
  {
    title: 'Geometria styku i ramiona',
    narration:
      'Klocek dotyka zewnętrznego okręgu 2R w lewym-górnym punkcie. Promień do styku tworzy z poziomem kąt α = 45°, więc normalna przechodzi przez O. Dźwignia jest styczna do bębna, a jej podpora A leży po lewej-dolnej stronie punktu styku.',
    formula:
      '\\vec r_C=2R\\,(-\\cos45^\\circ;\\sin45^\\circ),\\qquad \\alpha=45^\\circ,\\qquad \\vec u=(\\cos45^\\circ;\\sin45^\\circ)',
    caption: 'Ramię a = 0,45 m mierzymy od A do punktu przyłożenia P, a mimośród e = 0,05 m wzdłuż normalnej do bębna.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Lina Q i moment obciążenia',
    narration:
      'Lina odchodzi stycznie od wewnętrznego okręgu R po lewej stronie i działa w dół. Jej ramię względem O wynosi R, więc moment od ciężaru Q jest równy M_Q = Q·R = 14 kN·m i obraca bęben przeciwnie do wskazówek zegara.',
    formula: 'S=Q=14\\ \\mathrm{kN},\\qquad M_Q=S\\cdot R=14\\ \\mathrm{kN\\cdot m}\\ \\text{(CCW)}',
    caption: 'Moment liny jest dodatni. Tarcie musi wytworzyć moment przeciwny, czyli zgodny ze wskazówkami zegara.',
    visual: 'diagram',
    focus: {
      metric: 'load',
    },
  },
  {
    title: 'Tarcie i nacisk klocka',
    narration:
      'Ramię tarcia na bębnie wynosi 2R. Z równania momentów względem O otrzymujemy T = M_Q/(2R) = 7 kN. Warunek graniczny T = μN daje nacisk N = T/μ = 35 kN. Tarcie działa stycznie do bębna, a na dźwignię — przeciwnie.',
    formula:
      '\\sum M_O=0:\\quad M_Q-T\\cdot2R=0\\ \\Rightarrow\\ T=7\\ \\mathrm{kN};\\qquad N=\\frac{T}{\\mu}=\\frac{7}{0{,}20}=35\\ \\mathrm{kN}',
    caption:
      'Kierunek tarcia jest przeciwny do ruchu wywołanego przez linę. Na dźwigni tarcie ma zwrot zgodny z jej osią, dlatego wchodzi do momentu względem A.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Równowaga dźwigni — siła P',
    narration:
      'Równanie momentów względem A zawiera nacisk N na ramieniu a, moment tarcia T·e oraz siłę P. Ponieważ P jest prostopadła do dźwigni, jej ramię wynosi a·sin 2α = a. Po podstawieniu danych otrzymujemy P = 65,33 kN.',
    formula:
      'P=\\frac{Na-Te}{a\\sin2\\alpha}=\\frac{35\\cdot0{,}85-7\\cdot0{,}05}{0{,}45\\cdot1}=65{,}33\\ \\mathrm{kN}',
    caption:
      'Siła P jest dodatnia, więc ma zwrot zgodny z rysunkiem. Moment tarcia T·e zmniejsza wymaganą siłę P, bo tarcie pomaga dociskać klocek.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcja A i znaki',
    narration:
      'Po wyznaczeniu P piszemy rzuty sił dla dźwigni. Reakcja A równoważy nacisk, tarcie i siłę P. Otrzymujemy A = (−16,50; 26,40) kN; znaki oznaczają zwrot w lewo i w górę, zgodnie z przyjętym układem osi.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ A=(-16{,}50;26{,}40)\\ \\mathrm{kN}',
    caption:
      'Dodatnia składowa A_y jest większa od ciężaru, bo dźwignia przenosi duży nacisk klocka. Składowa A_x równoważy poziomy udział nacisku i tarcia.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Reakcja czopa O',
    narration:
      'Do bębna działają ciężar G, naciąg liny S, nacisk N, tarcie T i reakcja O. Rzuty sił dają O = (−29,70; 35,10) kN. Ujemna składowa pozioma wynika z nacisku skierowanego w prawo-dół, a dodatnia pionowa równoważy ciężar i pionowe udziały sił.',
    formula: '\\sum F_x=0,\\quad \\sum F_y=0\\ \\Rightarrow\\ O=(-29{,}70;35{,}10)\\ \\mathrm{kN}',
    caption: 'Reakcja czopa jest skierowana w lewo i w górę. Jej duża składowa pionowa odpowiada naciskowi N = 35 kN.',
    visual: 'diagram',
    focus: {
      metric: 'reactions',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, równanie momentów względem punktu styku oraz reszty sum sił dla bębna i dźwigni. Reszty są na poziomie błędów zmiennoprzecinkowych, a P, N i T są dodatnie.',
    formula:
      'T=7\\ \\mathrm{kN}=\\mu N=0{,}20\\cdot35\\ \\mathrm{kN};\\qquad \\sum F\\approx0,\\quad \\sum M_C\\approx0',
    caption: 'Wynik końcowy: P = 65,33 kN, N = 35 kN, T = 7 kN, O = (−29,70; 35,10) kN, A = (−16,50; 26,40) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
