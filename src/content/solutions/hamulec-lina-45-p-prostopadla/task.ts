import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 7,
  family: 'lever',
  G: 2,
  Q: 20,
  a: 0.2,
  b: 0.5,
  e: 0.05,
  alphaDeg: 30,
  mu: 0.4,
  outerK: 1.5,
  ropeK: 1,
  ropeTension: 20,
  ropeDirection: {
    x: -0.7071067811865476,
    y: -0.7071067811865475,
  },
  ropeTangent: {
    x: -0.7071067811865475,
    y: 0.7071067811865476,
  },
  contact: {
    x: 0.8660254037844387,
    y: 0.49999999999999994,
  },
  drumWeight: 2,
  title: 'Bęben 1,5R z liną Q pod 45° i dźwignią styczną, P prostopadła',
  modelText:
    'Tarcza hamulcowa 1,5R i bęben liny o promieniu R mają nieruchomy czop O; ciężar układu wynosi G. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R, przechodzi nad tarczą 1,5R i odchodzi w lewo-dół pod kątem 45° do poziomu. Dźwignia AB jest styczna do tarczy w prawym-górnym punkcie i podparta w A; siła P działa w B prostopadle do dźwigni (kąt 90°). Klocek o grubości e leży między dźwignią a tarczą.',
  givenGeometry:
    'O — nieruchomy czop; tarcza hamulcowa 1,5R, bęben liny R; lina Q na R, nad tarczą, pod 45°; dźwignia A–B styczna do tarczy; klocek w odległości b od A i a od B; P prostopadła do dźwigni w B; grubość klocka c = e',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym-górnym punkcie; promień do styku tworzy z poziomem kąt α. Normalna przechodzi przez O.',
  ropeText:
    'Lina Q odchodzi stycznie od wewnętrznego okręgu R po lewej-górnej stronie, przechodząc nad tarczą 1,5R, i działa w lewo-dół pod 45°.',
  reactionPoints: 'O, A',
  lever: {
    u: {
      x: -0.49999999999999994,
      y: 0.8660254037844387,
    },
    contactToA: 0.5,
    contactToB: 0.2,
    pAtB: true,
    pDistance: 0,
    pDirection: {
      x: -0.8660254037844387,
      y: -0.49999999999999994,
    },
    pLabel: 'B (prostopadle do dźwigni)',
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-lina-45-p-prostopadla' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i dane',
    narration:
      'Tarcza hamulcowa 1,5R i bęben liny R mają nieruchomy czop O; ciężar układu wynosi G. Lina z ciężarem Q jest nawinięta na wewnętrzny promień R i odchodzi w lewo-dół pod kątem 45°. Dźwignia AB jest styczna do tarczy w prawym-górnym punkcie i podparta w A; siła P działa w B prostopadle do dźwigni.',
    formula:
      'G=2{,}0\\ \\mathrm{kN},\\quad Q=20{,}0\\ \\mathrm{kN},\\quad a=0{,}200,\\ b=0{,}500,\\ e=0{,}050\\ \\mathrm{m},\\quad \\mu=0{,}400',
    caption:
      'O — nieruchomy czop; tarcza hamulcowa 1,5R, bęben liny R; lina Q na R, nad tarczą, pod 45°; dźwignia A–B styczna do tarczy; klocek w odległości b od A i a od B; P prostopadła do dźwigni w B; grubość klocka c = e',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria, styk i lina',
    narration:
      'Klocek styka się z zewnętrznym okręgiem 1,5R w prawym-górnym punkcie; promień do styku tworzy z poziomem kąt α = 30°. Dźwignia jest styczna do tarczy, więc nacisk jest prostopadły do dźwigni. Lina odchodzi stycznie od wewnętrznego okręgu R i działa w lewo-dół pod kątem 45°.',
    formula: '\\vec r_C=1{,}5R\\,(0{,}866;\\ 0{,}5),\\qquad S=Q=20{,}000\\ \\mathrm{kN},\\qquad P\\perp AB',
    caption: 'a = 0{,}200 m od B do klocka, b = 0{,}500 m od klocka do A, e = 0{,}050 m.',
    visual: 'diagram',
    focus: {
      metric: 'loads',
    },
  },
  {
    title: 'Moment od liny',
    narration:
      'Naciąg liny działa na ramieniu R względem osi O. Lina schodzi w lewo-dół, więc moment obraca bęben przeciwnie do wskazówek zegara. Przy dodatnim momencie przeciwnym do wskazówek zegara M_Q = +20 kN·m.',
    formula: 'M_Q=Q\\,R=20{,}000\\ \\mathrm{kN\\cdot m}\\quad(\\text{obrót przeciwny do wskazówek zegara})',
    caption: 'Moment liny jest dodatni i musi być zrównoważony tarciem na promieniu 1,5R.',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'Tarcie działa stycznie w punkcie styku i ma zwrot przeciwny do momentu liny. Równanie momentów względem O pozwala wyznaczyć siłę tarcia; ramię tarcia wynosi 1,5R, więc tarcie jest mniejsze od naciągu liny.',
    formula:
      '\\sum M_O=0:\\quad T\\cdot1{,}500R=M_Q\\ \\Rightarrow\\ T=\\frac{20{,}000}{1{,}500}=13{,}333\\ \\mathrm{kN}',
    caption: 'T = 13{,}333 kN; moment tarcia T·1,5R = 20 kN·m.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk',
    narration:
      'W stanie granicznym tarcie osiąga μN. Dzieląc wyznaczone tarcie przez μ = 0,40, otrzymujemy nacisk klocka. Nacisk jest dodatni i dociska tarczę wzdłuż promienia, prostopadle do stycznej dźwigni.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{13{,}333}{0{,}400}=33{,}333\\ \\mathrm{kN}',
    caption: 'T = μN = 13{,}333 kN; φ = arctg μ = 21{,}8°.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga dźwigni',
    narration:
      'Nacisk N jest prostopadły do dźwigni i działa na ramieniu b, a siła P prostopadła do dźwigni na ramieniu a + b. Tarcie na dźwigni działa wzdłuż dźwigni i dzięki mimośrodowi e daje dodatkowy moment T·e. Równanie momentów względem A wyznacza P.',
    formula:
      '\\sum M_A=0:\\quad P(a+b)=N b+T e\\ \\Rightarrow\\ P=\\frac{33{,}333\\cdot0{,}500+13{,}333\\cdot0{,}050}{0{,}700}=24{,}762\\ \\mathrm{kN}',
    caption: 'P = 24{,}762 kN; A = (-0{,}756; -15{,}833) kN.',
    visual: 'diagram',
    focus: {
      metric: 'lever',
    },
  },
  {
    title: 'Reakcja O i znaki',
    narration:
      'Reakcja O równoważy ciężar, naciąg liny, normalną i tarcie na bębnie. Tarcie na dźwigni ma zwrot przeciwny do tarcia na bębnie, co widać w znaku momentu T·e. Dodatnia siła P ma zwrot zgodny z rysunkiem.',
    formula:
      'O=-(\\vec G+\\vec S+\\vec N_{\\text{bęben}}+\\vec T_{\\text{bęben}})=(36{,}343;\\ 44{,}356)\\ \\mathrm{kN}',
    caption: 'O = (36{,}343; 44{,}356) kN; P = 24{,}762 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy sumy sił i momenty względem punktu styku C oraz moment dźwigni względem punktu styku. Reszty są na poziomie błędów zmiennoprzecinkowych. Warunek T = μN i dodatni znak P są spełnione.',
    formula: '\\sum F=(0;\\ 0),\\quad \\sum M_O=0,\\quad \\sum M_C=0,\\quad T=\\mu N,\\quad P>0',
    caption: 'T = 13{,}333 kN = μN; P = 24{,}762 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
