import type { LessonData } from '../../../model'

export default {
  "id": "foundations-equilibrium",
  "moduleId": "foundations",
  "number": 5,
  "title": "Równowaga statyczna: trzy równania",
  "shortTitle": "Równowaga",
  "description": "Wyznacz reakcje płaskiego układu za pomocą równowagi sił i momentów.",
  "duration": 9,
  "eyebrow": "Spoczynek ma swoją matematykę",
  "formula": "\\sum F_x=0,\\qquad \\sum F_y=0,\\qquad \\sum M_A=0",
  "formulaNote": "Dla płaskiego, statycznie wyznaczalnego ciała trzy niezależne równania pozwalają wyznaczyć trzy niewiadome reakcje. Punkt A do sumy momentów można wybrać dowolnie.",
  "insight": "Sumę momentów warto pisać względem punktu, przez który przechodzi linia działania niewiadomej siły — jej moment wtedy znika, a równanie staje się prostsze.",
  "lab": "reactions",
  "outcomes": [
    "W1 — analizuje równowagę odizolowanego elementu",
    "W2 — rozróżnia obciążenia zewnętrzne i reakcje w równaniach",
    "W3 — wykorzystuje ramiona sił wynikające z geometrii",
    "U1 — wyznacza reakcje z równowagi sił i momentów",
    "U2 — sprawdza zgodność znaków potrzebną w dalszej analizie naprężeń",
    "U3 — ustala obciążenia obliczeniowe przed doborem przekroju"
  ],
  "questions": [
    {
      "question": "Na belkę długości 4 m działa pionowa siła 20 kN w odległości 1 m od lewej podpory A. Ile wynosi reakcja pionowa na prawej podporze B?",
      "answers": [
        "5 kN",
        "10 kN",
        "15 kN"
      ],
      "correct": 0,
      "hint": "Napisz sumę momentów względem A: RB·4 − 20·1 = 0.",
      "explanation": "RB = 20 kN · 1 m / 4 m = 5 kN. Pozostałą część przenosi A, więc RA = 15 kN; suma reakcji wynosi 20 kN.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego przy wyznaczaniu reakcji wygodnie sumować momenty względem punktu przyłożenia jednej z niewiadomych sił?",
      "answers": [
        "Bo jej ramię i moment względem tego punktu są zerowe",
        "Bo pozostałe reakcje zawsze znikają",
        "Bo suma sił przestaje być potrzebna"
      ],
      "correct": 0,
      "hint": "Moment siły to siła razy prostopadłe ramię.",
      "explanation": "Siła przechodząca przez wybrany punkt ma zerowe ramię, więc nie pojawia się w równaniu momentów. Upraszcza to obliczenie pozostałych niewiadomych, ale równania sił nadal obowiązują.",
      "outcome": "U1"
    },
    {
      "question": "Po obliczeniu reakcji otrzymano RA = −3 kN przy założeniu, że RA skierowana jest w górę. Co oznacza wynik?",
      "answers": [
        "Obliczenia są niemożliwe, bo reakcja nie może być ujemna",
        "Rzeczywista reakcja ma wartość 3 kN i jest skierowana w dół",
        "Trzeba zmienić typ podpory na utwierdzenie"
      ],
      "correct": 1,
      "hint": "Znak odnosi się do przyjętego na schemacie kierunku.",
      "explanation": "Minus informuje, że rzeczywisty zwrot jest przeciwny do założonego. Wartość bezwzględna reakcji wynosi 3 kN; nie jest to samo w sobie sygnałem błędu modelu.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Belka AB o długości L = 4 m jest podparta przegubowo w A i przesuwnie w B. Siła P = 20 kN działa pionowo w dół w odległości a = 1 m od A. Pomiń ciężar własny.",
    "steps": [
      "Narysuj reakcje RA i RB w górę oraz poziomą Ax w A. Brak obciążeń poziomych daje Ax = 0.",
      "Zapisz równowagę momentów względem A: ΣMA = RB·4 − 20·1 = 0.",
      "Wyznacz RB = 20·1/4 = 5 kN.",
      "Z równowagi pionowej RA + RB − 20 = 0 otrzymaj RA = 20 − 5 = 15 kN.",
      "Sprawdź momenty: 5 kN·4 m = 20 kN·1 m = 20 kN·m."
    ],
    "result": "RA = 15 kN w górę, RB = 5 kN w górę oraz Ax = 0."
  }
} satisfies LessonData
