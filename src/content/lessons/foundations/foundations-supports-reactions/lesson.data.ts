import type { LessonData } from '../../../model'

export default {
  "id": "foundations-supports-reactions",
  "moduleId": "foundations",
  "number": 4,
  "title": "Podpory i reakcje: jak konstrukcja odpowiada",
  "shortTitle": "Podpory",
  "description": "Dobierz schemat podparcia i określ, które ruchy lub obroty ogranicza każda podpora.",
  "duration": 9,
  "eyebrow": "Najpierw swobody, potem reakcje",
  "formula": "\\text{podpora przesuwna: }1R,\\qquad \\text{przegub: }2R,\\qquad \\text{utwierdzenie: }2R+M",
  "formulaNote": "Zapis dotyczy zadania płaskiego. R oznacza składową reakcji siłowej, a M reakcję momentową. Kierunek reakcji przesuwnej jest prostopadły do powierzchni toczenia.",
  "insight": "Przegub nie oznacza braku reakcji — pozwala na obrót, ale nadal przenosi siły. Utwierdzenie jako jedyne z tych trzech schematów przenosi moment.",
  "lab": "reactions",
  "outcomes": [
    "W1 — rozpoznaje ograniczenia ruchu w modelach podpór",
    "W2 — wiąże sposób podparcia z przenoszonymi obciążeniami",
    "W3 — uwzględnia położenie podpór względem geometrii elementu",
    "U1 — przewiduje liczbę i kierunki składowych reakcji",
    "U2 — oddziela reakcje siłowe od informacji o stanie naprężenia",
    "U3 — tworzy poprawny model wejściowy do wymiarowania"
  ],
  "questions": [
    {
      "question": "Jakie reakcje należy przyjąć w idealnym utwierdzeniu płaskiego pręta?",
      "answers": [
        "Tylko jedną siłę pionową",
        "Dwie składowe siły i moment",
        "Wyłącznie moment, bo pręt jest nieruchomy"
      ],
      "correct": 1,
      "hint": "Utwierdzenie blokuje dwa przesunięcia i obrót.",
      "explanation": "W zadaniu płaskim utwierdzenie ogranicza przesunięcia w dwóch kierunkach oraz obrót. Dlatego występują Rx, Ry i M, choć w konkretnym zadaniu niektóre mogą wyjść zerowe.",
      "outcome": "W1"
    },
    {
      "question": "Podpora przegubowa nieprzesuwna różni się od przesuwnej tym, że:",
      "answers": [
        "przenosi moment zginający",
        "blokuje również ruch wzdłuż kierunku, w którym może toczyć się podpora przesuwna",
        "nie przenosi żadnych sił"
      ],
      "correct": 1,
      "hint": "Obie podpory pozwalają na obrót; porównaj możliwe przesunięcia.",
      "explanation": "Przegub nieprzesuwny ma dwie składowe reakcji, a przesuwny jedną. Obie idealne podpory nie przenoszą momentu, ponieważ dopuszczają obrót.",
      "outcome": "W1"
    },
    {
      "question": "W pionowym pręcie utwierdzonym u góry i obciążonym wyłącznie pionową siłą osiową reakcja pozioma wynosi zero. Czy to oznacza, że utwierdzenie działa jak podpora przesuwna?",
      "answers": [
        "Tak, zerowa reakcja zmienia typ podpory",
        "Nie, zerowa wartość składowej nie usuwa pozostałych ograniczeń modelu",
        "Tak, ale tylko dla prętów stalowych"
      ],
      "correct": 1,
      "hint": "Rozróżnij możliwe reakcje w modelu od ich wartości w konkretnym obciążeniu.",
      "explanation": "Typ podpory opisuje blokowane ruchy, a nie tylko niezerowe liczby. Utwierdzenie nadal może przenosić siłę poziomą i moment, nawet jeśli dla danego obciążenia któraś reakcja jest zerowa.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Płaski element jest utwierdzony w punkcie A. Przez A przechodzą linie działania sił 8 kN w prawo i 5 kN w dół; działa też moment zewnętrzny 12 kN·m przeciwnie do wskazówek zegara.",
    "steps": [
      "Przyjmij w A reakcje Ax, Ay i MA oraz dodatnie kierunki: w prawo, w górę i przeciwnie do wskazówek zegara.",
      "Z równowagi poziomej: Ax + 8 = 0, więc Ax = −8 kN, czyli 8 kN w lewo.",
      "Z równowagi pionowej: Ay − 5 = 0, więc Ay = 5 kN w górę.",
      "Z równowagi momentów: MA + 12 = 0, więc MA = −12 kN·m, czyli zgodnie ze wskazówkami zegara."
    ],
    "result": "W utwierdzeniu występują reakcje 8 kN w lewo, 5 kN w górę i 12 kN·m zgodnie ze wskazówkami zegara."
  }
} satisfies LessonData
