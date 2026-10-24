import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-technical-2',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 2',
  duration: 7,
  given: ['F = 18 kN', 'l = 150 mm', 'b = 50 mm'],
  result:
    'Podobny efekt występuje w połączeniu nitowym z jedną nakładką. Sworzeń jest zginany, a nacisk na blachę nierównomierny. Im grubsza blacha i im większy mimośród, tym większe dodatkowe naprężenia. Ścinanie techniczne pozostaje pierwszym oszacowaniem, ale nie opisuje całego zjawiska.',
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
      title: 'Krok 1',
      narration:
        'Rozważmy złącze klejowe, w którym dwie deski są połączone zakładkowo. Siła rozciągająca wynosi F = 18 kN, a spoina ma długość l = 150 mm i szerokość b = 50 mm. Pole ścinane to cała powierzchnia spoiny, czyli A_s = l · b = 150 · 50 = 7500 mm^2.',
      caption:
        'Rozważmy złącze klejowe, w którym dwie deski są połączone zakładkowo. Siła rozciągająca wynosi F = 18 kN, a spoina ma długość l =…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'F = 18\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Siła w niutonach wynosi 18 000 N, więc średnie naprężenie styczne to τ_sr = 18 000/7500 = 2,4 MPa. Taki wynik jest typowy dla kleju konstrukcyjnego i pokazuje, że połączenie klejowe przenosi dużą siłę dzięki temu, że rozkłada ją na znaczną powierzchnię.',
      caption:
        'Siła w niutonach wynosi 18 000 N, więc średnie naprężenie styczne to τ_sr = 18 000/7500 = 2,4 MPa. Taki wynik jest typowy dla…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '18\\,000\\ \\text{N}',
    },
    {
      title: 'Krok 3',
      narration:
        'Zwróć uwagę, że grubość deski nie wchodzi do pola ścinanego. Grubość wpływa na wytrzymałość deski na rozciąganie i na docisk, ale samo ścinanie kleju odbywa się w płaszczyźnie spoiny. To częsty błąd: uczniowie mnożą długość przez grubość deski, a nie przez szerokość spoiny.',
      caption:
        'Zwróć uwagę, że grubość deski nie wchodzi do pola ścinanego. Grubość wpływa na wytrzymałość deski na rozciąganie i na docisk, ale…',
      visual: 'section',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 4',
      narration:
        'Wynik 2,4 MPa należy porównać z wytrzymałością kleju na ścinanie, a nie z granicą plastyczności stali. Dla klejów konstrukcyjnych wartości dopuszczalne często mieszczą się w zakresie kilku megapaskali, więc otrzymany wynik jest wiarygodny. Ostateczna ocena wymaga jednak uwzględnienia przygotowania powierzchni, temperatury i starzenia się kleju.',
      caption:
        'Wynik 2,4 MPa należy porównać z wytrzymałością kleju na ścinanie, a nie z granicą plastyczności stali. Dla klejów konstrukcyjnych…',
      visual: 'section',
      focus: { metric: 'stress' },
    },
    {
      title: 'Krok 5',
      narration:
        'W rzeczywistym złączu zakładkowym obciążenie jest mimośrodowe. Linie działania sił w obu deskach nie pokrywają się, więc powstaje dodatkowy moment zginający. Powoduje on odrywanie końców spoiny, co jest szczególnie groźne dla klejów o małej wytrzymałości na rozciąganie. Model czystego ścinania tego nie pokazuje, dlatego w konstrukcjach klejowych stosuje się zakładki i dodatkowe dociski.',
      caption:
        'W rzeczywistym złączu zakładkowym obciążenie jest mimośrodowe. Linie działania sił w obu deskach nie pokrywają się, więc powstaje…',
      visual: 'section',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 6',
      narration:
        'Podobny efekt występuje w połączeniu nitowym z jedną nakładką. Sworzeń jest zginany, a nacisk na blachę nierównomierny. Im grubsza blacha i im większy mimośród, tym większe dodatkowe naprężenia. Ścinanie techniczne pozostaje pierwszym oszacowaniem, ale nie opisuje całego zjawiska.',
      caption:
        'Podobny efekt występuje w połączeniu nitowym z jedną nakładką. Sworzeń jest zginany, a nacisk na blachę nierównomierny. Im…',
      visual: 'section',
      focus: { metric: 'stress' },
    },
  ],
} satisfies SolutionData
