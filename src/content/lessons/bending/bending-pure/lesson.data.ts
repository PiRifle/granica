import type { LessonData } from '../../../model'

export default {
  "id": "bending-pure",
  "moduleId": "bending",
  "number": 5,
  "title": "Czyste zginanie",
  "shortTitle": "Czyste zginanie",
  "description": "Wydziel przypadek, w którym przekrój przenosi moment, ale nie przenosi siły tnącej.",
  "duration": 9,
  "eyebrow": "Moment bez ścinania",
  "formula": "M(x) = const \\neq 0 \\qquad T(x) = \\frac{dM}{dx} = 0",
  "formulaNote": "Czyste zginanie oznacza T = 0 na rozpatrywanym odcinku. Może występować np. między dwiema równymi siłami w układzie czteropunktowym.",
  "insight": "Brak siły tnącej nie oznacza brak naprężeń. Nadal występują naprężenia normalne od momentu: rozciąganie po jednej stronie osi obojętnej i ściskanie po drugiej.",
  "lab": "bending",
  "outcomes": [
    "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
    "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
    "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
    "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
    "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
    "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
  ],
  "questions": [
    {
      "question": "Która para warunków opisuje czyste zginanie na odcinku belki?",
      "answers": [
        "M jest stałe i niezerowe, T = 0",
        "M = 0, T jest stałe i niezerowe",
        "M rośnie liniowo, T jest stałe i niezerowe"
      ],
      "correct": 0,
      "hint": "Skorzystaj z zależności T = dM/dx.",
      "explanation": "Stały niezerowy moment ma zerową pochodną, więc T = 0. To właśnie czyste zginanie; stałe niezerowe T powodowałoby liniową zmianę M.",
      "outcome": "W2"
    },
    {
      "question": "Czy przy czystym zginaniu naprężenia normalne w przekroju znikają?",
      "answers": [
        "Nie, nadal wynikają z M i zmieniają znak względem osi obojętnej",
        "Tak, bo T = 0 oznacza brak wszystkich naprężeń",
        "Tak, ale tylko w stali"
      ],
      "correct": 0,
      "hint": "Rozróżnij naprężenia normalne od momentu i styczne od siły tnącej.",
      "explanation": "Moment zginający wytwarza σ = My/I niezależnie od tego, że T = 0. Znikają naprężenia styczne związane z siłą tnącą, a nie normalne od zginania.",
      "outcome": "W2"
    },
    {
      "question": "W teście zginania czteropunktowego między dwiema równymi siłami moment jest stały. Jaki jest tam wykres T?",
      "answers": [
        "Zerowy",
        "Liniowo rosnący",
        "Paraboliczny"
      ],
      "correct": 0,
      "hint": "Między siłami nie ma q, a stały M ma zerową pochodną.",
      "explanation": "Ponieważ dM/dx = T, stały moment wymusza T = 0. Odcinek między siłami jest klasycznym przykładem czystego zginania.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Na odcinku czystego zginania M = 12 kN·m. Przekrój ma wskaźnik wytrzymałości W = 300 cm³.",
    "steps": [
      "Warunek czystego zginania oznacza T = dM/dx = 0 na całym odcinku.",
      "Zamień M = 12 kN·m = 12 000 000 N·mm oraz W = 300 cm³ = 300 000 mm³.",
      "Naprężenia skrajne: σmax = M/W = 12 000 000/300 000 = 40 MPa."
    ],
    "result": "T = 0, a skrajne włókna mają naprężenia +40 MPa i −40 MPa po przeciwnych stronach osi obojętnej."
  }
} satisfies LessonData
