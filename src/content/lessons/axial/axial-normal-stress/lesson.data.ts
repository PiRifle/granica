import type { LessonData } from '../../../model'

export default {
  "id": "axial-normal-stress",
  "moduleId": "axial",
  "number": 1,
  "title": "Naprężenie normalne: siła na przekroju",
  "shortTitle": "Naprężenie σ",
  "description": "Oblicz średnie naprężenie osiowe i rozróżnij rozciąganie od ściskania za pomocą znaku.",
  "duration": 7,
  "eyebrow": "Od siły do intensywności",
  "formula": "\\sigma=\\frac{N}{A},\\qquad N>0:\\ \\text{rozciąganie},\\qquad N<0:\\ \\text{ściskanie}",
  "formulaNote": "Wzór opisuje średnie naprężenie przy osiowym obciążeniu i równomiernym rozkładzie. Przy N w N i A w mm² wynik otrzymujemy w MPa.",
  "insight": "Znak naprężenia ma znaczenie fizyczne: dodatnie σ wydłuża włókna, ujemne je skraca. Duże ściskanie smukłego pręta może dodatkowo wymagać sprawdzenia wyboczenia.",
  "lab": "stress",
  "outcomes": [
    "W1 — rozpoznaje osiowy sposób obciążenia pręta",
    "W2 — rozróżnia naprężenie rozciągające i ściskające",
    "W3 — wiąże pole przekroju z poziomem naprężenia",
    "U1 — oblicza naprężenie normalne z N/A",
    "U2 — opisuje jednoosiowy stan naprężenia dla koła Mohra",
    "U3 — porównuje naprężenie z wartością dopuszczalną"
  ],
  "questions": [
    {
      "question": "Dwa pręty przenoszą tę samą siłę rozciągającą. Pierwszy ma pole dwa razy mniejsze niż drugi. Jak porównają się ich naprężenia?",
      "answers": [
        "Pierwszy ma naprężenie dwa razy większe",
        "Oba mają jednakowe naprężenie",
        "Pierwszy ma naprężenie dwa razy mniejsze"
      ],
      "correct": 0,
      "hint": "Przy stałym N naprężenie jest odwrotnie proporcjonalne do A.",
      "explanation": "σ = N/A, więc zmniejszenie pola o połowę przy niezmienionym N podwaja naprężenie. To pokazuje, dlaczego sama siła nie wystarcza do oceny bezpieczeństwa.",
      "outcome": "W3"
    },
    {
      "question": "Siła osiowa wynosi N = −40 kN, a pole A = 200 mm². Jaki jest pełny wynik naprężenia?",
      "answers": [
        "+200 MPa, rozciąganie",
        "−200 MPa, ściskanie",
        "−0,2 MPa, ściskanie"
      ],
      "correct": 1,
      "hint": "Zachowaj znak N i przelicz 40 kN na 40 000 N.",
      "explanation": "σ = −40 000 N / 200 mm² = −200 MPa. Minus oznacza ściskanie; pominięcie przeliczenia kN dałoby błędne −0,2 MPa.",
      "outcome": "U1"
    },
    {
      "question": "Kiedy prosty wzór σ = N/A nie wystarcza do oceny smukłego ściskanego pręta?",
      "answers": [
        "Gdy istnieje ryzyko wyboczenia mimo naprężenia poniżej granicy materiału",
        "Wyłącznie gdy pręt jest rozciągany",
        "Gdy pole przekroju jest stałe"
      ],
      "correct": 0,
      "hint": "Utrata stateczności może nastąpić przed zniszczeniem materiału.",
      "explanation": "Ściskany smukły pręt może się wyboczyć przy naprężeniu mniejszym niż wytrzymałość materiału. Wtedy oprócz σ = N/A potrzebna jest analiza stateczności.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Pręt o A = 250 mm² przenosi osiową siłę rozciągającą 50 kN. Oblicz naprężenie normalne.",
    "steps": [
      "Przyjmij N = +50 kN, ponieważ pręt jest rozciągany.",
      "Przelicz N = 50 000 N i zachowaj A = 250 mm².",
      "Podstaw: σ = N/A = 50 000/250 = 200 N/mm².",
      "Zapisz N/mm² jako MPa i nadaj wynikowi znak dodatni."
    ],
    "result": "σ = +200 MPa, czyli naprężenie rozciągające."
  }
} satisfies LessonData
