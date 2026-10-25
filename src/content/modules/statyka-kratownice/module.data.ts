import type { ModuleData } from '../../model'

export default {
  id: 'statyka-kratownice',
  number: 5,
  title: 'Kratownice',
  shortTitle: 'Kratownice',
  description:
    'Model prętów dwuosiowych, pręty zerowe, równoważenie węzłów, metoda Rittera oraz geometryczna niezmienność kratownic płaskich i przestrzennych.',
  outcomes: [
    'W1 — opisuje model kratownicy płaskiej i przestrzennej oraz założenia pręta dwuosiowego',
    'W2 — rozpoznaje pręty zerowe i węzły o szczególnej geometrii',
    'W3 — stosuje kryteria geometrycznej niezmienności p=2w−3 i p=3w−6',
    'W4 — odróżnia metodę równoważenia węzłów od metody Rittera i dobiera narzędzie do pytania',
    'U1 — wyznacza reakcje podporowe kratownicy z równań równowagi',
    'U2 — oblicza siły w prętach metodą węzłów i kontroluje wynik drugim węzłem lub przekrojem',
    'U3 — stosuje metodę przekroju/Rittera do wyznaczenia wybranych sił w prętach',
    'U4 — klasyfikuje kratownicę jako sztywną, przesztywnioną lub nierigid i wskazuje ograniczenia kryteriów',
  ],
  status: 'ready',
} satisfies ModuleData
