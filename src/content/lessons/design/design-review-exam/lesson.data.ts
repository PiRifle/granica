import type { LessonData } from '../../../model'

export default {
  "id": "design-review-exam",
  "moduleId": "design",
  "number": 7,
  "title": "Powtórka mieszana i strategia kolokwium",
  "shortTitle": "Błędy i strategia",
  "description": "Ćwicz rozpoznawanie modelu, pilnuj jednostek i kończ zadanie kontrolą wyniku oraz wszystkich warunków projektowych.",
  "duration": 10,
  "eyebrow": "Pełna powtórka",
  "formula": "\\text{schemat} \\rightarrow \\text{siły wewnętrzne} \\rightarrow \\text{naprężenia} \\rightarrow \\text{warunki} \\rightarrow \\text{dobór i kontrola}",
  "formulaNote": "Podstawowa kontrola: 1 MPa = 1 N/mm², 1 kN·m = 10⁶ N·mm, E = 200 GPa = 200 000 MPa, kąt z TL/(GJ) jest w radianach.",
  "insight": "Po obliczeniu wymiaru nie kończ zadania: przyjmij wymiar katalogowy, podstaw go z powrotem i zapisz, który warunek jest decydujący.",
  "lab": "units",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "solutionId": "cw9-1",
  "questions": [
    {
      "question": "Moment M = 3 kN·m dzielisz przez k = 150 MPa, by otrzymać W. Które podstawienie jest poprawne?",
      "answers": [
        "3/150 m³",
        "3000/150 mm³",
        "3 000 000/150 mm³"
      ],
      "correct": 2,
      "hint": "Najpierw zamień kN·m na N·mm.",
      "explanation": "3 kN·m = 3000 N·m = 3 000 000 N·mm. Zatem W = 3 000 000/150 = 20 000 mm³.",
      "outcome": "U1"
    },
    {
      "question": "W obciążeniu złożonym obliczono σ = 90 MPa i τ = 50 MPa. Jaki następny krok jest poprawny dla HMH?",
      "answers": [
        "σred = 90 + 50",
        "σred = √(90² + 3·50²)",
        "σred = 90² + 3·50² bez pierwiastka"
      ],
      "correct": 1,
      "hint": "Składowe redukujemy dopiero po ich wyznaczeniu we właściwym punkcie.",
      "explanation": "HMH daje σred = √(90² + 3·50²) = √15 600 = 124,90 MPa. Brak pierwiastka zmieniłby jednostkę z MPa na MPa².",
      "outcome": "W2"
    },
    {
      "question": "Z wytrzymałości wyszło d = 31,4 mm, a z sztywności d = 35,1 mm; dostępne wymiary co 1 mm. Jaka decyzja końcowa jest poprawna?",
      "answers": [
        "31 mm, bo wytrzymałość jest ważniejsza",
        "35 mm, bo to średnia praktyczna",
        "36 mm, a potem kontrola obu warunków"
      ],
      "correct": 2,
      "hint": "Wybierz maksimum wymagań i zaokrąglij w górę.",
      "explanation": "Decyduje większe 35,1 mm, a najbliższy niedostatecznie mały wymiar to 35 mm. Przyjmujemy 36 mm i sprawdzamy naprężenie oraz odkształcenie dla tej wartości.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Dobierany pręt ma wymagane A ≥ 450 mm² z wytrzymałości i A ≥ 520 mm² z wydłużenia. Dostępny przekrój ma A = 550 mm², E = 200 GPa, L = 2 m i P = 30 kN.",
    "steps": [
      "Warunek decydujący: A ≥ max(450, 520) = 520 mm².",
      "Przyjmujemy A = 550 mm², ponieważ 550 ≥ 520.",
      "Kontrola wydłużenia: ΔL = 30 000·2000/(200 000·550) = 0,545 mm.",
      "Zapis końcowy powinien wskazać przyjęty przekrój i pokazać spełnienie obu warunków."
    ],
    "result": "Przyjmujemy A = 550 mm²; decyduje sztywność, a obliczone wydłużenie wynosi około 0,545 mm."
  }
} satisfies LessonData
