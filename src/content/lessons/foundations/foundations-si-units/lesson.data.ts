import type { LessonData } from '../../../model'

export default {
  "id": "foundations-si-units",
  "moduleId": "foundations",
  "number": 1,
  "title": "Jednostki SI: wspólny język obliczeń",
  "shortTitle": "Jednostki SI",
  "description": "Łącz niutony, milimetry i megapaskale bez zgadywania oraz kontroluj wynik przez analizę jednostek.",
  "duration": 7,
  "eyebrow": "Najpierw uporządkuj dane",
  "formula": "1\\,\\mathrm{kN}=10^3\\,\\mathrm{N},\\qquad 1\\,\\mathrm{MPa}=1\\,\\mathrm{N/mm^2}=10^6\\,\\mathrm{Pa}",
  "formulaNote": "W obliczeniach prętów wygodnie używać N i mm: naprężenie wyjdzie wprost w MPa. Nie wolno mieszać kN z N bez przeliczenia.",
  "insight": "Analiza jednostek wychwytuje wiele błędów: jeśli po skróceniu N/mm zamiast N/mm², wynik nie jest naprężeniem, nawet gdy liczba wygląda sensownie.",
  "lab": "units",
  "outcomes": [
    "W1 — rozróżnia wielkości fizyczne opisujące element i jego obciążenie",
    "W2 — podaje jednostki siły, naprężenia i odkształcenia",
    "W3 — stosuje jednostki długości i pola przy opisie geometrii",
    "U1 — przelicza jednostki i sprawdza poprawność wzorów",
    "U2 — zapisuje naprężenia w jednostkach używanych przy kole Mohra",
    "U3 — unika błędów jednostkowych przy doborze nośności i sztywności"
  ],
  "questions": [
    {
      "question": "Przekrój ma 250 mm², a siła wynosi 10 kN. Które podstawienie do σ = N/A jest poprawne?",
      "answers": [
        "σ = 10/250 = 0,04 MPa",
        "σ = 10 000/250 = 40 MPa",
        "σ = 10 000/250 = 40 Pa"
      ],
      "correct": 1,
      "hint": "Najpierw zamień kiloniutony na niutony, a następnie zwróć uwagę na N/mm².",
      "explanation": "10 kN = 10 000 N, więc σ = 10 000 N / 250 mm² = 40 N/mm² = 40 MPa. Wynik 0,04 MPa powstaje przez błędne pozostawienie siły w kN.",
      "outcome": "U1"
    },
    {
      "question": "Odkształcenie względne ε = ΔL/L ma jaką jednostkę?",
      "answers": [
        "Jest bezwymiarowe",
        "Jest wyrażone w MPa",
        "Jest wyrażone w mm"
      ],
      "correct": 0,
      "hint": "Podziel jednostkę wydłużenia przez jednostkę długości początkowej.",
      "explanation": "ΔL i L mają tę samą jednostkę, która się skraca. Dlatego ε jest bezwymiarowe, choć często zapisujemy je także w promilach lub procentach.",
      "outcome": "W2"
    },
    {
      "question": "Wzór na wielkość X daje po skróceniu jednostkę N/mm. Dlaczego X nie może być naprężeniem?",
      "answers": [
        "Naprężenie zawsze jest bezwymiarowe",
        "Naprężenie wymaga N/mm², a N/mm opisuje siłę na długość",
        "W naprężeniu nie mogą występować niutony"
      ],
      "correct": 1,
      "hint": "Porównaj wymiar wyniku ze wzorem σ = N/A.",
      "explanation": "Pole ma jednostkę mm², dlatego naprężenie ma wymiar N/mm². N/mm odpowiada natomiast np. intensywności obciążenia liniowego lub sztywności sprężyny.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Pręt o polu przekroju A = 300 mm² przenosi siłę N = 12 kN. Oblicz naprężenie w MPa.",
    "steps": [
      "Przelicz siłę: N = 12 kN = 12 000 N.",
      "Podstaw spójne jednostki: σ = N/A = 12 000 N / 300 mm².",
      "Wykonaj dzielenie i zidentyfikuj jednostkę: σ = 40 N/mm².",
      "Skorzystaj z równoważności 1 N/mm² = 1 MPa."
    ],
    "result": "Naprężenie wynosi σ = 40 MPa; dodatnia wartość oznacza rozciąganie."
  }
} satisfies LessonData
