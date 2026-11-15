import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 6,
  family: 'rod',
  G: 1.6,
  Q: 18,
  a: 0.15,
  b: 0.1,
  e: 0,
  alphaDeg: 45,
  mu: 0.35,
  outerK: 2,
  ropeK: 1,
  ropeTension: 8.999999999999998,
  ropeDirection: {
    x: 0.8660254037844387,
    y: -0.49999999999999994,
  },
  ropeTangent: {
    x: 0.49999999999999994,
    y: 0.8660254037844387,
  },
  contact: {
    x: -0.7071067811865475,
    y: -0.7071067811865476,
  },
  drumWeight: 1.6,
  title: 'Bęben 2R z klockiem Q na równi 30° i prętem w prowadnicach A, B',
  modelText:
    'Tarcza hamulcowa 2R i bęben liny o promieniu R są podparte w czopie O; ciężar układu wynosi G. Lina nawinięta na wewnętrzny promień R przechodzi nad tarczą 2R, odchodzi w prawo-dół i jest zaczepiona do klocka Q spoczywającego na gładkiej równi o kącie 30°; z równowagi klocka naprężenie liny wynosi Q sin30°. Pręt hamulcowy jest prowadzony w gładkich prowadnicach B i A i dociska klocek do lewej-dolnej części tarczy; P działa wzdłuż osi pręta.',
  givenGeometry:
    'Tarcza hamulcowa 2R, bęben liny R, ciężar G; lina na R, nad tarczą 2R, do klocka Q na równi 30°; pręt w prowadnicach (bliżej bębna B, dalej A); odcinek klocek–B = b, B–A = a; P wzdłuż pręta',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 2R w lewym-dolnym punkcie; promień do styku tworzy z pionem kąt α. Pręt działa wzdłuż promienia.',
  ropeText:
    'Lina odchodzi stycznie od wewnętrznego okręgu R po prawej-górnej stronie, przechodząc nad tarczą 2R, i jest równoległa do równi 30°. Naciąg liny równa się składowej ciężaru Q wzdłuż równi: S = Q sin30°.',
  reactionPoints: 'O, A, B',
  rod: {
    u: {
      x: -0.7071067811865475,
      y: -0.7071067811865476,
    },
    guideA: 0.25,
    guideB: 0.1,
    pEnd: 0.3,
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-rownia-pret' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i dane',
    narration:
      'Tarcza hamulcowa 2R i bęben liny R mają nieruchomy czop O; ciężar układu wynosi G. Lina nawinięta na wewnętrzny promień R przechodzi nad tarczą i jest zaczepiona do klocka Q na gładkiej równi o kącie 30°. Pręt hamulcowy jest prowadzony w dwóch gładkich prowadnicach A i B i dociska klocek do lewej-dolnej części tarczy.',
    formula:
      'G=1{,}6\\ \\mathrm{kN},\\quad Q=18{,}0\\ \\mathrm{kN},\\quad a=0{,}150,\\ b=0{,}100\\ \\mathrm{m},\\quad \\mu=0{,}350',
    caption:
      'Tarcza hamulcowa 2R, bęben liny R, ciężar G; lina na R, nad tarczą 2R, do klocka Q na równi 30°; pręt w prowadnicach (bliżej bębna B, dalej A); odcinek klocek–B = b, B–A = a; P wzdłuż pręta',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria, styk i lina',
    narration:
      'Klocek styka się z zewnętrznym okręgiem 2R w lewym-dolnym punkcie; promień do styku tworzy z pionem kąt α = 45°. Pręt działa wzdłuż promienia, więc nacisk jest osiowy. Lina odchodzi stycznie od wewnętrznego okręgu R i jest równoległa do równi 30°.',
    formula: '\\vec r_C=2R\\,(-0{,}71;\\ -0{,}71),\\qquad S=Q\\sin30^\\circ=9{,}000\\ \\mathrm{kN}',
    caption: 'Odcinek klocek–B wynosi b = 0{,}100 m, a B–A: a = 0{,}150 m; P działa wzdłuż osi pręta.',
    visual: 'diagram',
    focus: {
      metric: 'loads',
    },
  },
  {
    title: 'Moment od liny',
    narration:
      'Naciąg liny wynika z równowagi klocka na równi: składowa ciężaru wzdłuż równi wynosi Q sin30°, a lina musi ją równoważyć. Moment tej siły względem O obraca bęben zgodnie z ruchem wskazówek zegara i ma wartość 9 kN·m.',
    formula: 'S=Q\\sin30^\\circ=9{,}000\\ \\mathrm{kN},\\qquad M_Q=-9{,}000\\ \\mathrm{kN\\cdot m}',
    caption: 'M_Q = 9 kN·m (obrót zgodny z ruchem wskazówek zegara).',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'Tarcie na bębnie działa stycznie w punkcie styku i równoważy moment liny. Ponieważ ramię tarcia wynosi 2R, siła tarcia jest dwa razy mniejsza od naciągu liny. Znak tarcia wynika wprost z równania momentów względem O.',
    formula:
      '\\sum M_O=0:\\quad T\\cdot2{,}000R=M_Q\\ \\Rightarrow\\ T=\\frac{9{,}000}{2{,}000}=4{,}500\\ \\mathrm{kN}',
    caption: 'T = 4{,}500 kN na ramieniu 2{,}000R.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk',
    narration:
      'W stanie granicznym tarcie jest równe μN. Dzieląc wymagane tarcie przez współczynnik μ = 0,35, otrzymujemy nacisk klocka na tarczę. Nacisk jest dodatni, więc pręt rzeczywiście dociska tarczę.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{4{,}500}{0{,}350}=12{,}857\\ \\mathrm{kN}',
    caption: 'T = μN = 4{,}500 kN; φ = arctg μ = 19{,}3°.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga pręta',
    narration:
      'Pręt jest prowadzony w dwóch gładkich prowadnicach, więc reakcje A i B są prostopadłe do pręta. Siła P działa wzdłuż osi pręta i równoważy nacisk N. Z rzutów sił oraz momentu względem prowadnicy A otrzymujemy obie reakcje prowadnic.',
    formula:
      '\\sum F_\\parallel=0:\\quad P=N=12{,}857\\ \\mathrm{kN}\\quad \\sum F_\\perp=0,\\ \\sum M_A=0\\ \\Rightarrow\\ A=(-2{,}121;\\ 2{,}121),\\ B=(5{,}303;\\ -5{,}303)\\ \\mathrm{kN}',
    caption: 'A = (-2{,}121; 2{,}121) kN, B = (5{,}303; -5{,}303) kN; P = N.',
    visual: 'diagram',
    focus: {
      metric: 'rod',
    },
  },
  {
    title: 'Reakcja O i znaki',
    narration:
      'Reakcja O równoważy ciężar bębna, naciąg liny, normalną i tarcie. Tarcie na bębnie ma zwrot przeciwny do momentu liny, a na pręt działa zwrot przeciwny. Dodatnie P i N potwierdzają, że przyjęte zwroty są fizycznie poprawne.',
    formula:
      'O=-(\\vec G+\\vec S+\\vec N_{\\text{bęben}}+\\vec T_{\\text{bęben}})=(-20{,}068;\\ 0{,}191)\\ \\mathrm{kN}',
    caption: 'O = (-20{,}068; 0{,}191) kN; P = 12{,}857 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy sumy sił i momenty względem punktu styku C, a dla pręta moment względem prowadnicy. Reszty są zerowe w granicach błędów numerycznych. Dodatkowo weryfikujemy warunek T = μN oraz równość P = N.',
    formula: '\\sum F=(0;\\ 0),\\quad \\sum M_O=0,\\quad \\sum M_C=0,\\quad T=\\mu N,\\quad P=N',
    caption: 'T = 4{,}500 kN = μN; P = N = 12{,}857 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
