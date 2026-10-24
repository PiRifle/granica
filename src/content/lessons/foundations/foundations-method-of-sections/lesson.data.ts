import type { LessonData } from '../../../model'

export default {
  "id": "foundations-method-of-sections",
  "moduleId": "foundations",
  "number": 6,
  "title": "Metoda przekrojów: zajrzyj do środka",
  "shortTitle": "Metoda przekrojów",
  "description": "Przetnij myślowo element, zachowaj równowagę jednej części i wyznacz siły wewnętrzne.",
  "duration": 9,
  "eyebrow": "Równowaga każdej części",
  "formula": "N:\\ \\text{działa wzdłuż osi},\\qquad V:\\ \\text{prostopadle do osi},\\qquad M:\\ \\text{obrót przekroju}",
  "formulaNote": "W zadaniu płaskim N to siła osiowa, V siła poprzeczna (tnąca), a M moment zginający. Ich wartości w przekroju wyznacza się z równowagi jednej z odciętych części.",
  "insight": "Możesz wybrać lewą albo prawą część — poprawny wynik będzie ten sam. Na dwóch stronach cięcia siły wewnętrzne mają przeciwne zwroty zgodnie z zasadą akcji i reakcji.",
  "lab": "sections",
  "outcomes": [
    "W1 — analizuje przekrój jako granicę oddziaływań między częściami",
    "W2 — rozróżnia rozciąganie, ścinanie i zginanie",
    "W3 — lokalizuje przekrój i siły względem osi elementu",
    "U1 — wyznacza N, V i M z równowagi odciętej części",
    "U2 — przygotowuje siły przekrojowe do analizy stanu naprężenia",
    "U3 — wskazuje przekroje potrzebne do sprawdzenia nośności"
  ],
  "questions": [
    {
      "question": "Co należy zrobić po myślowym przecięciu pręta i odrzuceniu jednej części?",
      "answers": [
        "Pominąć wszystkie oddziaływania odrzuconej części",
        "Zastąpić oddziaływanie odrzuconej części siłami i momentem w przekroju",
        "Dodać nową podporę w miejscu cięcia"
      ],
      "correct": 1,
      "hint": "Pozostawiona część nadal musi być w równowadze.",
      "explanation": "W przekroju wprowadzamy N, V i M odpowiadające oddziaływaniu usuniętej części. Dzięki temu można zastosować równania równowagi do pozostawionej części i obliczyć siły wewnętrzne.",
      "outcome": "U1"
    },
    {
      "question": "W pręcie osiowo rozciąganym siła wewnętrzna N jest dodatnia. Co fizycznie oznacza ten przypadek?",
      "answers": [
        "Odcięte części są od siebie oddalane, czyli przekrój jest rozciągany",
        "Przekrój jest wyłącznie skręcany",
        "Siła osiowa musi być równa ciężarowi pręta"
      ],
      "correct": 0,
      "hint": "Dodatnie N odpowiada konwencji rozciągania.",
      "explanation": "Dodatnia siła osiowa rozciąga przekrój: części pręta „ciągną” siebie w przeciwnych kierunkach. Ściskaniu odpowiada N ujemne.",
      "outcome": "W2"
    },
    {
      "question": "Ten sam przekrój analizowano raz z lewej, a raz z prawej strony. Co powinno być wspólne w obu obliczeniach?",
      "answers": [
        "Ta sama wartość i ten sam fizyczny charakter siły wewnętrznej",
        "Identyczny zwrot wektora narysowany względem całego pręta",
        "Brak konieczności uwzględniania obciążeń zewnętrznych"
      ],
      "correct": 0,
      "hint": "Porównaj zasadę akcji i reakcji z fizyczną wielkością w przekroju.",
      "explanation": "Obie strony dają tę samą wartość N, V lub M, choć wektory na przeciwnych ścianach przekroju mają przeciwne zwroty. Każda analiza musi zawierać wszystkie obciążenia wybranej części.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Poziomym prętem utwierdzonym po lewej stronie rozciąga siła P = 30 kN przyłożona osiowo na prawym końcu. Wyznacz N w dowolnym przekroju między końcami.",
    "steps": [
      "Przetnij pręt w wybranym miejscu i zachowaj prawą część z przyłożoną siłą P.",
      "Na lewej ścianie odciętej części przyjmij dodatnią siłę N skierowaną w lewo, czyli rozciągającą przekrój.",
      "Dla pozostałych sił poziomych zapisz ΣFx = P − N = 0.",
      "Wyznacz N = P = 30 kN. Brak sił poprzecznych i momentów zewnętrznych daje V = 0 i M = 0."
    ],
    "result": "W całym rozpatrywanym odcinku N = +30 kN (rozciąganie), V = 0 i M = 0."
  }
} satisfies LessonData
