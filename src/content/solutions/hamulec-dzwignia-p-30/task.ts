import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 5,
  family: 'lever',
  G: 1.5,
  Q: 16,
  a: 0.2,
  b: 0.3,
  e: 0.04,
  alphaDeg: 45,
  mu: 0.3,
  outerK: 1.2,
  ropeK: 1,
  ropeTension: 16,
  ropeDirection: {
    x: 0.7071067811865476,
    y: -0.7071067811865475,
  },
  ropeTangent: {
    x: 0.7071067811865475,
    y: 0.7071067811865476,
  },
  contact: {
    x: 0,
    y: 1,
  },
  drumWeight: 1.5,
  title: 'Bęben 1,2R z poziomą dźwignią i siłą P pod 30°',
  modelText:
    'Tarcza hamulcowa o promieniu zewnętrznym 1,2R i bęben liny o promieniu wewnętrznym R są podparte w nieruchomym czopie O. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R, przechodzi nad tarczą 1,2R i odchodzi stycznie w prawą-dolną stronę pod kątem α do poziomu, przechodząc przez krążek stały. Pozioma dźwignia AB ma podporę A po lewej; P działa w prawym końcu B pod kątem 30° do poziomu. Klocek o grubości e dociska górę tarczy.',
  givenGeometry:
    'O — nieruchomy czop; tarcza hamulcowa 1,2R, bęben liny R; lina Q na promieniu R, widoczna nad tarczą, pod kątem α; pozioma dźwignia A–B; klocek w odległości a od A i b od B; P w B pod 30° do poziomu; grubość klocka c = e',
  contactText: 'Klocek styka się z górnym punktem zewnętrznego okręgu 1,2R. Normalna jest pionowa, a tarcie poziome.',
  ropeText:
    'Lina Q odchodzi stycznie od wewnętrznego okręgu R po prawej stronie, przechodząc nad tarczą 1,2R, i działa w prawo-dół pod kątem α = 45° do poziomu.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: 1,
      y: 0,
    },
    contactToA: 0.2,
    contactToB: 0.3,
    pAtB: true,
    pDistance: 0,
    pDirection: {
      x: 0.8660254037844387,
      y: -0.49999999999999994,
    },
    pLabel: 'B (pod kątem 30° do poziomu)',
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-dzwignia-p-30' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i dane',
    narration:
      'Tarcza o promieniu zewnętrznym 1,2R i bęben liny o promieniu R są osadzone na nieruchomym czopie O. Ciężar układu wynosi G, a lina z ciężarem Q jest nawinięta na promień R. Pozioma dźwignia AB dociska klocek o grubości e do górnej części tarczy; w punkcie A działa przegubowa podpora.',
    formula:
      'G=1{,}5\\ \\mathrm{kN},\\quad Q=16{,}0\\ \\mathrm{kN},\\quad a=0{,}200,\\ b=0{,}300,\\ e=0{,}040\\ \\mathrm{m},\\quad \\mu=0{,}300',
    caption:
      'O — nieruchomy czop; tarcza hamulcowa 1,2R, bęben liny R; lina Q na promieniu R, widoczna nad tarczą, pod kątem α; pozioma dźwignia A–B; klocek w odległości a od A i b od B; P w B pod 30° do poziomu; grubość klocka c = e',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria, styk i lina',
    narration:
      'Klocek styka się z górnym punktem zewnętrznego okręgu 1,2R, więc normalna jest pionowa i przechodzi przez O. Lina odchodzi stycznie od wewnętrznego okręgu R po prawej-górnej stronie i biegnie w prawo-dół pod kątem α = 45° do poziomu. Siła P działa w końcu B pod kątem 30° do dźwigni.',
    formula: '\\vec r_C=1{,}2R\\,(0;\\ 1),\\qquad S=Q=16{,}000\\ \\mathrm{kN},\\qquad \\vec r_Q=R\\,(0{,}71;\\ 0{,}71)',
    caption: 'a = 0{,}200 m od A do klocka, b = 0{,}300 m od klocka do B, e = 0{,}040 m.',
    visual: 'diagram',
    focus: {
      metric: 'loads',
    },
  },
  {
    title: 'Moment od liny',
    narration:
      'Naciąg liny działa na ramieniu R względem osi O. Lina schodzi w prawo-dół, więc moment obraca bęben zgodnie z ruchem wskazówek zegara. Przyjmujemy dodatni moment przeciwny do wskazówek zegara, dlatego M_Q jest ujemne, a jego wartość bezwzględna wynosi Q·R = 16 kN·m.',
    formula: 'M_Q=Q\\,R=-16{,}000\\ \\mathrm{kN\\cdot m}\\quad(\\text{obrót zgodny z ruchem wskazówek zegara})',
    caption: 'Moment liny trzeba zrównoważyć tarciem na większym promieniu 1,2R.',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'Tarcie działa stycznie do tarczy w punkcie styku i ma zwrot przeciwny do momentu od liny. Równanie momentów względem O zawiera tylko moment liny i moment tarcia, bo normalna oraz reakcja O przechodzą przez O. Promień R skraca się w stosunku ramion.',
    formula: '\\sum M_O=0:\\quad M_Q+T\\cdot1{,}200R=0\\ \\Rightarrow\\ T=13{,}333\\ \\mathrm{kN}',
    caption: 'T = 13{,}333 kN na ramieniu 1{,}200R równoważy M_Q = 16 kN·m.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk',
    narration:
      'W stanie równowagi granicznej tarcie osiąga dokładnie wartość μN. Znając wymagane tarcie, wyznaczamy nacisk klocka na tarczę. Nacisk jest dodatni, więc klocek naprawdę dociska bęben, a nie tylko dotyka go bez siły.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{13{,}333}{0{,}300}=44{,}444\\ \\mathrm{kN}',
    caption: 'T = μN = 13{,}333 kN; kąt tarcia φ = arctg μ = 16{,}7°.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga dźwigni',
    narration:
      'Na dźwignię działają nacisk N skierowany w górę, tarcie T skierowane w prawo oraz siła P pod kątem 30° do dźwigni. Równanie momentów względem A daje siłę P, a rzuty sił — reakcję A. Tarcie na dźwigni ma zwrot przeciwny do tarcia na bębnie.',
    formula: '\\sum M_A=0:\\quad N a+T e-P(a+b)\\sin30^\\circ=0\\ \\Rightarrow\\ P=37{,}689\\ \\mathrm{kN}',
    caption: 'A = (-45{,}973; -25{,}600) kN; P ma zwrot zgodny z rysunkiem.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcja O i znaki',
    narration:
      'Reakcja O równoważy ciężar G, naciąg liny S, normalną i tarcie działające na bęben. Tarcie na bębnie przeciwdziała momentowi liny, a na dźwigni działa w stronę przeciwną. Dodatni znak P oznacza, że siła jest czynna i potrzebna do utrzymania równowagi granicznej.',
    formula:
      'O=-(\\vec G+\\vec S+\\vec N_{\\text{bęben}}+\\vec T_{\\text{bęben}})=(2{,}020;\\ 57{,}258)\\ \\mathrm{kN}',
    caption: 'O = (2{,}020; 57{,}258) kN; N = 44{,}444 kN > 0, P = 37{,}689 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Wyniki podstawiamy do sum sił i momentów względem punktu styku C oraz do równania momentów dźwigni. Reszty są na poziomie błędów zmiennoprzecinkowych. Sprawdzamy też warunek graniczny T = μN oraz dodatni znak siły P.',
    formula: '\\sum F=(0;\\ 0),\\quad \\sum M_O=0,\\quad \\sum M_C=0,\\quad T=\\mu N',
    caption: 'T = 13{,}333 kN = μN = 13{,}333 kN; P = 37{,}689 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
