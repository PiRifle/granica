import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 9,
  family: 'rod',
  G: 2.1,
  Q: 20,
  a: 0.1,
  b: 0.2,
  e: 0,
  alphaDeg: 30,
  mu: 0.3,
  outerK: 1.5,
  ropeK: 1,
  ropeTension: 20,
  ropeDirection: {
    x: -0.49999999999999994,
    y: -0.8660254037844387,
  },
  ropeTangent: {
    x: -0.8660254037844387,
    y: 0.49999999999999994,
  },
  contact: {
    x: 1,
    y: 0,
  },
  drumWeight: 2.1,
  title: 'Bęben 1,5R z liną Q pod kątem α i poziomym prętem w prowadnicach A, B',
  modelText:
    'Tarcza hamulcowa 1,5R i bęben liny o promieniu R mają nieruchomy czop O; ciężar układu wynosi G. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R, przechodzi nad tarczą 1,5R i odchodzi w lewo-dół pod kątem α do pionu, przechodząc przez krążek stały. Poziomy pręt hamulcowy jest prowadzony w gładkich prowadnicach A i B i dociska klocek do prawej strony tarczy; P działa poziomo wzdłuż osi pręta.',
  givenGeometry:
    'Tarcza hamulcowa 1,5R, bęben liny R, ciężar G; lina na R, nad tarczą, pod kątem α do pionu; poziomy pręt w prowadnicach A i B; odcinek klocek–A = a, A–B = b; P poziomo wzdłuż pręta',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym punkcie. Normalna jest pozioma i przechodzi przez O; tarcie działa pionowo.',
  ropeText:
    'Lina Q odchodzi stycznie od wewnętrznego okręgu R po lewej-dolnej stronie, przechodząc nad tarczą 1,5R, i działa w lewo-dół pod kątem α do pionu; naprężenie liny równa się Q.',
  reactionPoints: 'O, A, B',
  rod: {
    u: {
      x: 1,
      y: 0,
    },
    guideA: 0.1,
    guideB: 0.3,
    pEnd: 0.35,
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-pret-poziomy' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model fizyczny i dane',
    narration:
      'Tarcza hamulcowa o promieniu zewnętrznym 1,5R i bęben liny o promieniu R są osadzone na nieruchomym czopie O. Ciężar całego układu wynosi G = 2,1 kN. Lina z ciężarem Q = 20 kN jest nawinięta na promień R, przechodzi nad tarczą 1,5R i odchodzi w lewo-dół pod kątem α = 30° do pionu. Poziomy pręt hamulcowy jest prowadzony w gładkich prowadnicach A i B; klocek dociska prawy punkt tarczy.',
    formula:
      'G=2{,}1\\ \\mathrm{kN},\\quad Q=20{,}0\\ \\mathrm{kN},\\quad a=0{,}100,\\ b=0{,}200,\\ e=0{,}000\\ \\mathrm{m},\\quad \\alpha=30^\\circ,\\quad \\mu=0{,}300',
    caption:
      'Tarcza hamulcowa 1,5R, bęben liny R, ciężar G; lina na R, nad tarczą, pod kątem α do pionu; poziomy pręt w prowadnicach A i B; odcinek klocek–A = a, A–B = b; P poziomo wzdłuż pręta',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria styku, liny i pręta',
    narration:
      'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym punkcie. Promień do styku jest poziomy, więc normalna działa poziomo, a tarcie pionowo. Lina odchodzi stycznie od wewnętrznego okręgu R w lewym-górnym punkcie i biegnie w lewo-dół pod kątem 30° do pionu. Pręt leży poziomo, a odcinek klocek–A wynosi a = 0,10 m i A–B = b = 0,20 m. Siła P działa wzdłuż osi pręta, w lewo.',
    formula:
      '\\vec r_C=1{,}5R\\,(1;\\ 0),\\qquad \\vec r_Q=R\\,(-0{,}866;\\ 0{,}500),\\qquad S=Q=20{,}000\\ \\mathrm{kN},\\qquad \\alpha=30^\\circ',
    caption: 'Normalna i tarcie są prostopadłe; promień R skraca się w równaniu momentów bębna.',
    visual: 'diagram',
    focus: {
      metric: 'geometry',
    },
  },
  {
    title: 'Moment od liny Q',
    narration:
      'Naciąg liny S = Q działa na ramieniu R względem osi O. Wektor wodzący punktu zaczepienia ma składową poziomą ujemną i pionową dodatnią, więc moment obraca bęben przeciwnie do wskazówek zegara. Przyjmując ten zwrot jako dodatni, otrzymujemy M_Q = +20 kN·m.',
    formula: 'M_Q=S\\,R=20{,}000\\ \\mathrm{kN\\cdot m}\\quad(\\text{CCW})',
    caption: 'Moment liny jest dodatni; tarcie na większym promieniu musi dać moment przeciwny.',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'W równowadze bębna moment liny równoważy moment tarcia na promieniu 1,5R. Normalna i reakcja czopa przechodzą przez O, więc nie wnoszą momentu. Z równania ΣM_O = 0 otrzymujemy T = M_Q/(1,5R) = 13,33 kN. Tarcie na bębnie działa w dół, a na pręcie w górę.',
    formula:
      '\\sum M_O=0:\\quad M_Q-T\\cdot1{,}5R=0\\ \\Rightarrow\\ T=\\frac{20{,}000}{1{,}5}=13{,}333\\ \\mathrm{kN}',
    caption: 'Tarcie działa stycznie w prawym punkcie tarczy i ma zwrot przeciwny do obrotu wywołanego liną.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk klocka',
    narration:
      'W stanie równowagi granicznej tarcie osiąga wartość T = μN. Znając wymagane tarcie T = 13,33 kN i współczynnik μ = 0,30, wyznaczamy nacisk klocka N = 44,44 kN. Nacisk jest dodatni, więc klocek rzeczywiście dociska tarczę, a nie tylko jej dotyka.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{13{,}333}{0{,}300}=44{,}444\\ \\mathrm{kN}',
    caption: 'Kąt tarcia φ = arctg μ = 16{,}7°; T = μN = 13{,}333 kN.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga poziomego pręta',
    narration:
      'Na pręt działają: normalna N w prawo, tarcie T w górę, reakcje pionowe prowadnic A i B oraz siła P w lewo. Poziomo N = P, więc P = 44,44 kN. Moment względem A daje B_y·0,20 = T·0,10, czyli B_y = 6,67 kN. Pionowo T + A_y + B_y = 0, skąd A_y = −20,00 kN; znak minus oznacza reakcję w dół.',
    formula:
      '\\sum F_x=0:\\ N-P=0\\Rightarrow P=44{,}444\\ \\mathrm{kN};\\qquad \\sum M_A=0:\\ B_y\\cdot0{,}20=T\\cdot0{,}10\\Rightarrow B_y=6{,}667\\ \\mathrm{kN}',
    caption: 'A_y = -20{,}000 kN (w dół), B_y = 6{,}667 kN (w górę), P = 44{,}444 kN.',
    visual: 'diagram',
    focus: {
      metric: 'rod',
    },
  },
  {
    title: 'Reakcja czopa O i znaki',
    narration:
      'Reakcja O równoważy ciężar G, naciąg liny S, normalną N i tarcie T działające na bęben. Poziomo dominuje nacisk klocka, dlatego O_x jest dodatnie i duże. Pionowo reakcja O_y równoważy ciężar oraz pionowe składowe liny i tarcia. Otrzymujemy O = (54,44; 32,75) kN.',
    formula: '\\vec O=-(\\vec G+\\vec S+\\vec N+\\vec T)=(54{,}444;\\ 32{,}754)\\ \\mathrm{kN}',
    caption: 'O_x > 0 i O_y > 0; A_y < 0 oznacza, że prowadnica A działa na pręt w dół. P = 44{,}444 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy warunek graniczny T = μN, dodatniość N i P oraz reszty sum sił i momentów dla bębna i pręta. Reszty są na poziomie błędów zmiennoprzecinkowych, a zwroty reakcji odpowiadają przyjętemu układowi osi.',
    formula:
      'T=13{,}333\\ \\mathrm{kN}=\\mu N=13{,}333\\ \\mathrm{kN};\\qquad \\sum F_x\\approx0,\\quad \\sum F_y\\approx0,\\quad \\sum M_O\\approx0,\\quad \\sum M_C\\approx0',
    caption: 'P = 44{,}444 kN, N = 44{,}444 kN, A = (0{,}000; -20{,}000) kN, B = (0{,}000; 6{,}667) kN.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
