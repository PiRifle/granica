import type { SolutionData } from '../../model'
import { ShearTechnicalExample2Animation } from './animation'

export default {
  id: 'ex-shear-technical-2',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 2',
  duration: 7,
  given: ['F = 18 kN', 'l = 150 mm', 'b = 50 mm'],
  result:
    'Podobny efekt występuje w połączeniu nitowym z jedną nakładką. Sworzeń jest zginany, a nacisk na blachę nierównomierny. Im grubsza blacha i im większy mimośród, tym większe dodatkowe naprężenia. Ścinanie techniczne pozostaje pierwszym oszacowaniem, ale nie opisuje całego zjawiska.',
  animation: ShearTechnicalExample2Animation,
  figure: {
    kind: 'section',
    width: 150,
    height: 50,
    parts: [{ x: 0, y: 0, width: 150, height: 50, label: 'spoina 150 × 50', tone: 'light' }],
    centroid: { x: 75, y: 25 },
    values: [
      { label: 'F', value: '18 kN', focus: 'load', reveal: 0 },
      { label: 'l', value: '150 mm', focus: 'design', reveal: 0 },
      { label: 'b', value: '50 mm', focus: 'design', reveal: 0 },
      { label: 'A_s', value: '7 500 mm²', focus: 'design', reveal: 5 },
      { label: 'τ_sr', value: '2,4 MPa', focus: 'stress', reveal: 1 },
    ],
    note: 'Pole ścinane spoiny to długość razy szerokość, a nie długość razy grubość deski.',
  },
  scenes: [
    {
      title: 'Model złącza',
      narration:
        'Rozważmy złącze klejowe, w którym dwie deski są połączone zakładkowo. Siła rozciągająca wynosi F = 18 kN, a spoina ma długość l = 150 mm i szerokość b = 50 mm.',
      caption: 'Dwie deski zakładkowe połączone spoiną; siła rozciągająca 18 kN.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'F = 18\\ \\text{kN},\\qquad l = 150\\ \\text{mm},\\qquad b = 50\\ \\text{mm}',
    },
    {
      title: 'Płaszczyzna ścinania',
      narration:
        'Ścinanie odbywa się w cienkiej warstwie kleju między deskami. Płaszczyzną ścinania jest cała powierzchnia spoiny, a nie przekrój deski. To jeden styk, więc n = 1.',
      caption: 'Płaszczyzna ścinania pokrywa się z powierzchnią spoiny.',
      visual: 'section',
      focus: { metric: 'plane' },
      formula: 'n = 1,\\qquad A_s = l \\cdot b',
    },
    {
      title: 'Pole ścinane',
      narration:
        'Pole ścinane to iloczyn długości i szerokości spoiny: A_s = l · b = 150 · 50 = 7 500 mm^2. Grubość deski nie wchodzi do tego pola — wpływa na rozciąganie i docisk deski, ale nie na pole ścinania kleju.',
      caption: 'Spoina 150 × 50 mm ma pole 7 500 mm²; grubość deski nie jest potrzebna.',
      visual: 'section',
      focus: { metric: 'area' },
      formula: 'A_s = 150 \\cdot 50 = 7\\,500\\ \\text{mm}^2',
    },
    {
      title: 'Przenoszenie siły',
      narration:
        'Siła 18 000 N przechodzi z jednej deski do drugiej przez całą powierzchnię spoiny. Przy równomiernym rozkładzie średnie naprężenie styczne wynosi τ_sr = 18 000/7 500 = 2,4 MPa.',
      caption: 'Siła jest przenoszona przez całą spoinę; τ_sr = 2,4 MPa.',
      visual: 'section',
      focus: { metric: 'transfer' },
      formula: '\\tau_{sr} = \\frac{18\\,000}{7\\,500} = 2{,}4\\ \\text{MPa}',
    },
    {
      title: 'Mimośród obciążenia',
      narration:
        'W rzeczywistym złączu zakładkowym linie działania sił w obu deskach nie pokrywają się. Powstaje dodatkowy moment M = F · e, który odrywa końce spoiny. Model czystego ścinania tego nie pokazuje, dlatego stosuje się zakładki i dodatkowe dociski. Podobny efekt występuje w połączeniu nitowym z jedną nakładką.',
      caption: 'Osie desek są przesunięte o e; moment F · e odrywa końce spoiny.',
      visual: 'section',
      focus: { metric: 'eccentric' },
      formula: 'M = F \\cdot e',
    },
    {
      title: 'Kontrola i odkształcenie',
      narration:
        'Klej odkształca się postaciowo, a wynik 2,4 MPa należy porównać z wytrzymałością kleju na ścinanie, a nie z granicą plastyczności stali. Dla klejów konstrukcyjnych wartości dopuszczalne często mieszczą się w zakresie kilku megapaskali, więc otrzymany wynik jest wiarygodny. Ostateczna ocena wymaga jednak uwzględnienia przygotowania powierzchni, temperatury i starzenia się kleju.',
      caption: 'Odkształcenie postaciowe kleju; τ_sr = 2,4 MPa porównaj z wytrzymałością kleju.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\tau_{sr} = 2{,}4\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
