import { createHamulecTask, type HamulecConfig } from '../../solution-factories/factory-statyka-hamulec/factory'
import type { SolutionScene } from '../../../types'

export const config: HamulecConfig = {
  nr: 8,
  family: 'rod',
  G: 2.2,
  Q: 18,
  a: 0.2,
  b: 0.1,
  e: 0,
  alphaDeg: 30,
  mu: 0.35,
  outerK: 2,
  ropeK: 1,
  ropeTension: 18,
  ropeDirection: {
    x: 0.7071067811865476,
    y: 0.7071067811865475,
  },
  ropeTangent: {
    x: -0.7071067811865475,
    y: 0.7071067811865476,
  },
  contact: {
    x: -0.8660254037844387,
    y: 0.49999999999999994,
  },
  drumWeight: 2.2,
  title: 'Bęben 2R z liną przez krążek stały i prętem w prowadnicach A, B',
  modelText:
    'Tarcza hamulcowa 2R i bęben liny o promieniu R mają nieruchomy czop O; ciężar układu wynosi G. Lina nawinięta na wewnętrzny promień R przechodzi nad tarczą 2R i biegnie pod kątem 45° do krążka stałego, z którego wisi ciężar Q. Pręt hamulcowy jest prowadzony w gładkich prowadnicach A i B i dociska klocek do lewej-górnej części tarczy; P działa wzdłuż osi pręta.',
  givenGeometry:
    'Tarcza hamulcowa 2R, bęben liny R, ciężar G; lina na R, nad tarczą 2R, pod 45° do krążka stałego z Q; pręt w prowadnicach (bliżej bębna B, dalej A); odcinek klocek–B = b, B–A = a; P wzdłuż pręta',
  contactText:
    'Klocek styka się z zewnętrznym okręgiem 2R w lewym-górnym punkcie; promień do styku tworzy z poziomem kąt α. Pręt działa wzdłuż promienia.',
  ropeText:
    'Lina odchodzi stycznie od wewnętrznego okręgu R po prawej stronie, przechodząc nad tarczą 2R, i działa w górę-prawo pod 45°; naprężenie liny równa się ciężarowi Q.',
  reactionPoints: 'O, A, B',
  rod: {
    u: {
      x: -0.8660254037844387,
      y: 0.49999999999999994,
    },
    guideA: 0.3,
    guideB: 0.1,
    pEnd: 0.35,
  },
}

export const task = { ...createHamulecTask(config), id: 'hamulec-lina-45-pret' }

export const scenes: SolutionScene[] = [
  {
    title: 'Model i dane',
    narration:
      'Tarcza hamulcowa 2R i bęben liny R mają nieruchomy czop O; ciężar układu wynosi G. Lina nawinięta na wewnętrzny promień R przechodzi nad tarczą i biegnie pod kątem 45° do nieruchomego krążka, z którego wisi ciężar Q. Pręt hamulcowy jest prowadzony w gładkich prowadnicach A i B i dociska klocek do lewej-górnej części tarczy.',
    formula:
      'G=2{,}2\\ \\mathrm{kN},\\quad Q=18{,}0\\ \\mathrm{kN},\\quad a=0{,}200,\\ b=0{,}100\\ \\mathrm{m},\\quad \\mu=0{,}350',
    caption:
      'Tarcza hamulcowa 2R, bęben liny R, ciężar G; lina na R, nad tarczą 2R, pod 45° do krążka stałego z Q; pręt w prowadnicach (bliżej bębna B, dalej A); odcinek klocek–B = b, B–A = a; P wzdłuż pręta',
    visual: 'diagram',
    focus: {
      metric: 'model',
    },
  },
  {
    title: 'Geometria, styk i lina',
    narration:
      'Klocek styka się z zewnętrznym okręgiem 2R w lewym-górnym punkcie; promień do styku tworzy z poziomem kąt α = 30°. Pręt działa wzdłuż promienia, więc nacisk jest osiowy. Lina odchodzi stycznie od wewnętrznego okręgu R i biegnie w górę-prawo pod 45° do krążka stałego, gdzie wisi ciężar Q.',
    formula: '\\vec r_C=2R\\,(-0{,}866;\\ 0{,}5),\\qquad S=Q=18{,}000\\ \\mathrm{kN},\\qquad P\\parallel\\text{pręt}',
    caption: 'Odcinek klocek–B wynosi b = 0{,}100 m, a B–A: a = 0{,}200 m; P działa wzdłuż osi pręta.',
    visual: 'diagram',
    focus: {
      metric: 'loads',
    },
  },
  {
    title: 'Moment od liny',
    narration:
      'Naciąg liny jest równy ciężarowi Q, bo lina przechodzi przez nieruchomy krążek. Moment względem O obraca bęben zgodnie z ruchem wskazówek zegara i wynosi 18 kN·m. Jest to moment, który musi zrównoważyć klocek hamulcowy.',
    formula:
      'S=Q=18{,}000\\ \\mathrm{kN},\\qquad M_Q=-18{,}000\\ \\mathrm{kN\\cdot m}\\quad(\\text{zgodny z ruchem wskazówek zegara})',
    caption: 'M_Q = 18 kN·m (obrót zgodny z ruchem wskazówek zegara).',
    visual: 'diagram',
    focus: {
      metric: 'moment',
    },
  },
  {
    title: 'Tarcie z równowagi bębna',
    narration:
      'Tarcie działa stycznie do tarczy i przeciwdziała momentowi liny. Ponieważ ramię tarcia wynosi 2R, siła tarcia jest dwa razy mniejsza od naciągu liny. Równanie momentów względem O wyznacza zwrot i wartość tarcia.',
    formula:
      '\\sum M_O=0:\\quad T\\cdot2{,}000R=M_Q\\ \\Rightarrow\\ T=\\frac{18{,}000}{2{,}000}=9{,}000\\ \\mathrm{kN}',
    caption: 'T = 9{,}000 kN na ramieniu 2{,}000R.',
    visual: 'diagram',
    focus: {
      metric: 'friction',
    },
  },
  {
    title: 'Warunek graniczny i nacisk',
    narration:
      'W stanie granicznym tarcie osiąga μN. Dzieląc wymagane tarcie przez μ = 0,35, otrzymujemy nacisk klocka. Nacisk jest dodatni, więc pręt rzeczywiście dociska lewą-górną część tarczy.',
    formula: 'T=\\mu N\\ \\Rightarrow\\ N=\\frac{T}{\\mu}=\\frac{9{,}000}{0{,}350}=25{,}714\\ \\mathrm{kN}',
    caption: 'T = μN = 9{,}000 kN; φ = arctg μ = 19{,}3°.',
    visual: 'diagram',
    focus: {
      metric: 'normal',
    },
  },
  {
    title: 'Równowaga pręta',
    narration:
      'Pręt jest prowadzony w dwóch gładkich prowadnicach, więc reakcje A i B są prostopadłe do pręta. Siła P działa wzdłuż osi pręta i równoważy nacisk N. Z rzutów sił oraz momentu względem prowadnicy A otrzymujemy reakcje obu prowadnic.',
    formula:
      '\\sum F_\\parallel=0:\\quad P=N=25{,}714\\ \\mathrm{kN}\\quad \\sum F_\\perp=0,\\ \\sum M_A=0\\ \\Rightarrow\\ A=(2{,}250;\\ 3{,}897),\\ B=(-6{,}750;\\ -11{,}691)\\ \\mathrm{kN}',
    caption: 'A = (2{,}250; 3{,}897) kN, B = (-6{,}750; -11{,}691) kN; P = N.',
    visual: 'diagram',
    focus: {
      metric: 'rod',
    },
  },
  {
    title: 'Reakcja O i znaki',
    narration:
      'Reakcja O równoważy ciężar bębna, naciąg liny, normalną i tarcie. Tarcie na bębnie ma zwrot przeciwny do momentu liny, a na pręt działa zwrot przeciwny. Dodatnie P i N potwierdzają poprawność przyjętych zwrotów.',
    formula:
      'O=-(\\vec G+\\vec S+\\vec N_{\\text{bęben}}+\\vec T_{\\text{bęben}})=(-30{,}497;\\ 10{,}123)\\ \\mathrm{kN}',
    caption: 'O = (-30{,}497; 10{,}123) kN; P = 25{,}714 kN > 0.',
    visual: 'diagram',
    focus: {
      metric: 'signs',
    },
  },
  {
    title: 'Niezależna kontrola',
    narration:
      'Sprawdzamy sumy sił i momenty względem punktu styku C, a dla pręta moment względem prowadnicy. Reszty są zerowe w granicach błędów numerycznych. Weryfikujemy też T = μN oraz równość P = N.',
    formula: '\\sum F=(0;\\ 0),\\quad \\sum M_O=0,\\quad \\sum M_C=0,\\quad T=\\mu N,\\quad P=N',
    caption: 'T = 9{,}000 kN = μN; P = N = 25{,}714 kN; reszty ≈ 0.',
    visual: 'diagram',
    focus: {
      metric: 'check',
    },
  },
]
