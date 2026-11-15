import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 10,
  family: 'lever',
  G: 1.8,
  Q: 22,
  a: 0.3,
  b: 0.3,
  e: 0.04,
  alphaDeg: 45,
  mu: 0.25,
  outerK: 1.2,
  ropeK: 1,
  ropeTension: 22,
  ropeDirection: {
    x: 1,
    y: 0,
  },
  ropeTangent: {
    x: 0,
    y: 1,
  },
  contact: {
    x: -0.7071067811865475,
    y: -0.7071067811865476,
  },
  drumWeight: 1.8,
  title: 'Bęben 1,2R z liną poziomą przez krążek i dźwignią z siłą P poziomą',
  modelText:
    'Bęben o promieniu zewnętrznym 1,2R (tarcza hamulcowa) i wewnętrznym promieniu liny R jest podparty w nieruchomym czopie O i ma ciężar G. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R i odchodzi poziomo w prawo do krążka stałego. Dźwignia AB jest podparta w A po prawej-dolnej stronie, a jej górny koniec B jest obciążony poziomą siłą P. Klocek o grubości e dociska lewą-dolną część tarczy 1,2R.',
  givenGeometry:
    'O — nieruchomy czop; tarcza hamulcowa 1,2R, bęben liny R; lina Q poziomo z promienia R do krążka; dźwignia A–B nachylona pod kątem α; klocek w odległości b od A i a od B; P poziomo w B; grubość klocka c = e',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 1,2R w lewym-dolnym punkcie; promień do styku tworzy z pionem kąt α. Normalna przechodzi przez O.',
  ropeText:
    'Lina Q odchodzi poziomo od górnego punktu wewnętrznego okręgu R w prawo, przechodząc nad tarczą 1,2R; jej moment względem O jest zgodny ze wskazówkami zegara.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: -0.7071067811865476,
      y: 0.7071067811865475,
    },
    contactToA: 0.3,
    contactToB: 0.3,
    pAtB: true,
    pDistance: 0,
    pDirection: {
      x: 1,
      y: 0,
    },
    pLabel: 'B (poziomo w prawo)',
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-lina-pozioma' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Tarcza hamulcowa o promieniu zewnętrznym 1,2R i bęben liny o promieniu R są podparte w nieruchomym czopie O. Ciężar układu wynosi G = 1,8 kN. Lina z ciężarem Q = 22 kN jest nawinięta na promień R, odchodzi poziomo w prawo do krążka stałego i przechodzi nad tarczą 1,2R. Dźwignia AB jest podparta w A po prawej-dolnej stronie, a w górnym końcu B działa pozioma siła P.',
    formula:
      'G=1{,}8\\ \\mathrm{kN},\\quad Q=22{,}0\\ \\mathrm{kN},\\quad a=0{,}300,\\ b=0{,}300,\\ e=0{,}040\\ \\mathrm{m},\\quad \\alpha=45^\\circ,\\quad \\mu=0{,}250',
    caption:
      'O — nieruchomy czop; tarcza hamulcowa 1,2R, bęben liny R; lina Q poziomo z promienia R do krążka; dźwignia A–B nachylona pod kątem α; klocek w odległości b od A i a od B; P poziomo w B; grubość klocka c = e',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria styku, liny i dźwigni',
    narration:
      'Klocek styka się z tarczą 1,2R w lewym-dolnym punkcie, więc promień do styku tworzy z pionem kąt α = 45°. Lina odchodzi stycznie od górnego punktu wewnętrznego okręgu R i biegnie poziomo w prawo. Dźwignia AB jest nachylona pod kątem 45° do poziomu; klocek leży w odległości a = 0,30 m od B i b = 0,30 m od A, a mimośród klocka wynosi e = 0,04 m.',
    formula:
      '\\vec r_C=1{,}2R\\,(-0{,}707;\\ -0{,}707),\\qquad \\vec r_Q=R\\,(0;\\ 1),\\qquad S=Q=22{,}000\\ \\mathrm{kN},\\qquad \\alpha=45^\\circ',
    caption: 'Normalna przechodzi przez O, a tarcie działa stycznie do tarczy.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Moment od liny Q',
    narration:
      'Lina działa na ramieniu R, a jej kierunek jest poziomy. Wektor wodzący punktu zaczepienia jest pionowy, więc moment względem O obraca tarczę zgodnie z ruchem wskazówek zegara. Przyjmując dodatni moment przeciwnie do wskazówek zegara, mamy M_Q = −22 kN·m, czyli |M_Q| = 22 kN·m.',
    formula: 'M_Q=S\\,R=-22{,}000\\ \\mathrm{kN\\cdot m}\\quad(\\text{CW})',
    caption: 'Tarcie musi wytworzyć moment przeciwny, czyli dodatni (CCW).',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'W równowadze bębna moment tarcia na promieniu 1,2R równoważy moment liny. Normalna i reakcja O przechodzą przez środek, więc nie dają momentu. Z równania ΣM_O = 0 otrzymujemy T = 22/1,2 = 18,33 kN. Tarcie na bębnie działa w prawo-dół, a na dźwigni w lewo-górę.',
    formula: '\\sum M_O=0:\\quad M_Q+T\\cdot1{,}2R=0\\ \\Rightarrow\\ T=\\frac{22}{1{,}2}=18{,}333\\ \\mathrm{kN}',
    caption: 'Tarcie działa na większym promieniu niż lina, więc jego siła jest mniejsza od Q.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk klocka',
    narration:
      'W stanie granicznym T = μN. Przy T = 18,33 kN i μ = 0,25 nacisk klocka wynosi N = 73,33 kN. Nacisk jest dodatni i znacznie większy od siły tarcia, ponieważ współczynnik tarcia jest mały. Kąt tarcia φ = arctg 0,25 ≈ 14,0°.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{18{,}333}{0{,}250}=73{,}333\\ \\mathrm{kN}',
    caption: 'T = μN = 18{,}333 kN; φ = 14{,}0°.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga dźwigni i siła P',
    narration:
      'Na dźwignię działają normalna N w dół-lewo, tarcie T w górę-lewo, reakcja A i pozioma siła P w punkcie B. Moment względem A daje N·0,30 + T·e = P·0,60·cos45°. Po podstawieniu P = 53,58 kN. Reakcja A = (11,24; 38,89) kN równoważy poziome i pionowe składowe tych sił.',
    formula:
      '\\sum M_A=0:\\quad N\\cdot0{,}30+T\\cdot0{,}04=P\\cdot0{,}60\\cos45^\\circ\\ \\Rightarrow\\ P=53{,}583\\ \\mathrm{kN}',
    caption: 'A = (11{,}235; 38{,}891) kN; moment tarcia T·e zwiększa wymaganą siłę P.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcja czopa O i znaki',
    narration:
      'Reakcja O równoważy ciężar G, naciąg liny S, normalną N i tarcie T na bębnie. Duży nacisk klocka działa w prawo-górę, więc reakcja czopa jest skierowana w lewo-dół. Otrzymujemy O = (−86,82; −37,09) kN. Znaki ujemne oznaczają zwroty przeciwne do dodatnich osi x i y.',
    formula: '\\vec O=-(\\vec G+\\vec S+\\vec N+\\vec T)=(-86{,}818;\\ -37{,}091)\\ \\mathrm{kN}',
    caption: 'O_x < 0 i O_y < 0; A_x > 0 i A_y > 0; P = 53{,}583 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, dodatniość N i P, a także reszty sum sił oraz momentów względem O, A i punktu styku C. Wszystkie reszty są na poziomie błędów zmiennoprzecinkowych, co potwierdza poprawność znaków i ramion.',
    formula:
      'T=18{,}333\\ \\mathrm{kN}=\\mu N=18{,}333\\ \\mathrm{kN};\\qquad \\sum F_x\\approx0,\\quad \\sum F_y\\approx0,\\quad \\sum M_O\\approx0,\\quad \\sum M_A\\approx0',
    caption: 'P = 53{,}583 kN, N = 73{,}333 kN, O = (-86{,}818; -37{,}091) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
