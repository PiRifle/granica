import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-geometryczna-niezmiennosc',
  title: 'Geometryczna niezmienność — od trójkąta do pułapki współbieżności',
  duration: 7,
  given: [
    'Trójkąt płaski: w = 3, p = 3',
    'Kwadrat z jedną przekątną: w = 4, p = 5',
    'Kwadrat bez przekątnej: w = 4, p = 4',
    'Kwadrat z dwiema przekątnymi: w = 4, p = 6',
    'Czworościan: w = 4, p = 6',
    'Dwa trójkąty połączone trzema prętami współbieżnymi: w = 6, p = 9',
  ],
  result:
    'Trójkąt, kwadrat z przekątną i czworościan są sztywne i wyznaczalne (n = 0). Kwadrat bez przekątnej jest mechanizmem (n = −1), a z dwiema przekątnymi ma pręt nadmiarowy (n = +1). Ostatni układ ma n = 0, ale jest mechanizmem, bo pręty łączące części są współbieżne.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TrussRigidityAnimation }))),
  scenes: [
    {
      title: 'Trójkąt — układ bazowy',
      narration:
        'Trójkąt ma trzy węzły i trzy pręty. Dla kratownicy płaskiej p = 2w − 3 = 2·3 − 3 = 3, więc nadmiar n = 3 − 3 = 0. To najmniejsza sztywna kratownica płaska i statycznie wyznaczalna.',
      caption: 'Trójkąt: w = 3, p = 3, n = 0 — sztywny i wyznaczalny.',
      visual: 'diagram',
      focus: { metric: 'triangle' },
      formula: 'p=2w-3=2\\cdot3-3=3,\\qquad n=3-3=0',
    },
    {
      title: 'Kwadrat z jedną przekątną',
      narration:
        'Kwadrat ma cztery węzły, więc potrzeba 2·4 − 3 = 5 prętów. Cztery boki plus jedna przekątna dają dokładnie pięć. Przekątna dzieli kwadrat na dwa trójkąty, więc całość jest sztywna i wyznaczalna.',
      caption: 'Kwadrat z przekątną: w = 4, p = 5, n = 0.',
      visual: 'diagram',
      focus: { metric: 'squareDiagonal' },
      formula: 'p=2\\cdot4-3=5,\\qquad n=5-5=0',
    },
    {
      title: 'Kwadrat bez przekątnej — mechanizm',
      narration:
        'Bez przekątnej zostają cztery boki, czyli p = 4 przy wymaganych pięciu. Nadmiar wynosi n = 4 − 5 = −1. Konstrukcja może się ścinać w równoległobok, bo kąty między bokami nie są zamknięte żadnym prętem.',
      caption: 'Kwadrat bez przekątnej: n = −1 — mechanizm ścinania.',
      visual: 'diagram',
      focus: { metric: 'squareMechanism' },
      formula: 'n=4-(2\\cdot4-3)=4-5=-1',
    },
    {
      title: 'Kwadrat z dwiema przekątnymi',
      narration:
        'Dodanie drugiej przekątnej daje sześć prętów przy pięciu potrzebnych. Nadmiar n = 6 − 5 = +1 oznacza jeden pręt nadmiarowy. Konstrukcja jest sztywna, ale wewnętrznie statycznie niewyznaczalna: siły zależą też od odkształceń i montażu.',
      caption: 'Kwadrat z dwiema przekątnymi: n = +1 — pręt nadmiarowy.',
      visual: 'diagram',
      focus: { metric: 'squareRedundant' },
      formula: 'n=6-(2\\cdot4-3)=6-5=+1',
    },
    {
      title: 'Czworościan — odpowiednik przestrzenny',
      narration:
        'W przestrzeni punktem wyjścia jest czworościan: cztery węzły i sześć krawędzi. Kryterium ma postać p = 3w − 6 = 3·4 − 6 = 6, więc n = 0. To przestrzenny odpowiednik trójkąta — sztywny i wyznaczalny.',
      caption: 'Czworościan: w = 4, p = 6, n = 0.',
      visual: 'diagram',
      focus: { metric: 'tetrahedron' },
      formula: 'p=3w-6=3\\cdot4-6=6,\\qquad n=6-6=0',
    },
    {
      title: 'Pułapka: zgodna liczba, ukryty mechanizm',
      narration:
        'Dwa sztywne trójkąty połączono trzema prętami. Węzłów jest sześć, prętów dziewięć, więc n = 9 − (2·6 − 3) = 0. Mimo to układ jest mechanizmem: linie działania wszystkich trzech łączników przecinają się w jednym punkcie, co pozwala częściom obrócić się względem siebie. Kryterium liczbowego nie wolno stosować bez kontroli geometrii.',
      caption: 'n = 0, ale pręty współbieżne ⇒ mechanizm obrotu wokół punktu zbiegu.',
      visual: 'diagram',
      focus: { metric: 'concurrentTrap' },
      formula: 'w=6,\\quad p=9,\\quad n=9-(2\\cdot6-3)=0\\quad\\text{ale mechanizm}',
    },
  ],
} satisfies SolutionData
