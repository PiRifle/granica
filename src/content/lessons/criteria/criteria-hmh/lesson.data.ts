import type { LessonData } from '../../../model'

export default {
  "id": "criteria-hmh",
  "moduleId": "criteria",
  "number": 3,
  "title": "Hipoteza HMH: energia zmiany postaci",
  "shortTitle": "HMH",
  "description": "Poznaj hipotezę Hubera–Misesa–Hencky’ego i obliczaj wytężenie materiałów plastycznych bez błędów w potęgach.",
  "duration": 8,
  "eyebrow": "Energia odkształcenia postaciowego",
  "formula": "\\sigma_{HMH} = \\sqrt{\\sigma_1^2 + \\sigma_2^2 + \\sigma_3^2 - \\sigma_1\\sigma_2 - \\sigma_2\\sigma_3 - \\sigma_3\\sigma_1}",
  "formulaNote": "Dla stanu płaskiego σ3 = 0. Dla σx = σ, σy = 0 i τxy = τ zachodzi wygodny wzór σHMH = √(σ² + 3τ²).",
  "insight": "Przy czystym ścinaniu HMH daje σred = √3·τ. Dlatego granica przy ścinaniu wynosi Re/√3, a nie Re.",
  "lab": "mohr",
  "outcomes": [
    "W1 — analizuję element konstrukcji i wskazuję przekrój oraz punkt decydujący o bezpieczeństwie.",
    "W2 — rozróżniam przypadki wytrzymałościowe i dobieram hipotezę do materiału oraz stanu naprężenia.",
    "W3 — uwzględniam geometrię przekroju przy wyznaczaniu naprężeń normalnych i stycznych.",
    "U1 — obliczam naprężenie zredukowane i sprawdzam warunek wytrzymałości z zachowaniem jednostek.",
    "U2 — stosuję koło Mohra do wyznaczenia naprężeń głównych i maksymalnego naprężenia stycznego.",
    "U3 — wyznaczam współczynnik bezpieczeństwa i oceniam, czy element spełnia przyjęty warunek."
  ],
  "questions": [
    {
      "question": "Dla σ = 100 MPa i τ = 50 MPa ile wynosi σHMH?",
      "answers": [
        "111,8 MPa",
        "132,3 MPa",
        "150 MPa"
      ],
      "correct": 1,
      "hint": "Użyj √(σ² + 3τ²), nie √(σ² + τ²).",
      "explanation": "σHMH = √(100² + 3·50²) = √17 500 = 132,29 MPa. Czynnik 3 przy τ² jest istotną częścią hipotezy.",
      "outcome": "U1"
    },
    {
      "question": "Jakie σHMH odpowiada stanowi σ1 = σ2 = σ3 = −120 MPa?",
      "answers": [
        "0 MPa",
        "120 MPa",
        "360 MPa"
      ],
      "correct": 0,
      "hint": "Podstaw równe naprężenia główne do pełnego wzoru.",
      "explanation": "Wszystkie składniki kwadratowe i mieszane kasują się: 3σ² − 3σ² = 0. Jednakowe ciśnienie hydrostatyczne nie daje zmiany postaci w modelu HMH.",
      "outcome": "W2"
    },
    {
      "question": "Dla czystego ścinania τ = 80 MPa i Re = 240 MPa jaki zapas daje HMH?",
      "answers": [
        "1,73",
        "2,60",
        "3,00"
      ],
      "correct": 0,
      "hint": "Najpierw σred = √3·τ, potem n = Re/σred.",
      "explanation": "σred = √3·80 = 138,56 MPa, więc n = 240/138,56 = 1,732. Wartość 3 byłaby wynikiem błędnego przyjęcia σred = τ.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Wał ma w pewnym punkcie σ = 80 MPa oraz τ = 60 MPa. Materiał ma Re = 235 MPa.",
    "steps": [
      "Dla tej kombinacji stosujemy σHMH = √(σ² + 3τ²).",
      "σHMH = √(80² + 3·60²) = √17 200 = 131,15 MPa.",
      "n = 235/131,15 = 1,79."
    ],
    "result": "Naprężenie zredukowane HMH wynosi 131,2 MPa, a współczynnik bezpieczeństwa około 1,79."
  }
} satisfies LessonData
