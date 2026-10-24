import type { LessonData } from '../../../model'

export default {
  "id": "criteria-combined-loading",
  "moduleId": "criteria",
  "number": 6,
  "title": "Zginanie, skręcanie i siła osiowa razem",
  "shortTitle": "Obciążenia złożone",
  "description": "Zsumuj naprężenia normalne we właściwym punkcie przekroju, dodaj ścinanie od skręcania i zastosuj HMH lub Tresca.",
  "duration": 9,
  "eyebrow": "Najpierw składowe, potem redukcja",
  "formula": "\\sigma = \\frac{N}{A} + \\frac{M}{W} \\qquad \\tau = \\frac{T}{W_o}",
  "formulaNote": "W zadaniu trzeba uwzględnić znaki N/A i M/W. Wo to wskaźnik wytrzymałości przekroju na skręcanie. Następnie σHMH = √(σ² + 3τ²) albo σT = √(σ² + 4τ²).",
  "insight": "Nie sumuj momentu zginającego ze skręcającym jako liczb bezpośrednio. Najpierw wyznacz σ i τ, a dopiero potem zredukuj je według hipotezy.",
  "lab": "combined",
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
      "question": "W skrajnym włóknie N/A = 30 MPa, a zginanie daje tam rozciąganie M/W = 90 MPa. Ile wynosi σ przed redukcją?",
      "answers": [
        "60 MPa",
        "90 MPa",
        "120 MPa"
      ],
      "correct": 2,
      "hint": "Oba naprężenia normalne są w tym punkcie rozciągające.",
      "explanation": "σ = N/A + M/W = 30 + 90 = 120 MPa. Na przeciwnej stronie zginanie mogłoby mieć przeciwny znak.",
      "outcome": "U1"
    },
    {
      "question": "W punkcie σ = 100 MPa i τ = 60 MPa. Ile wynosi σHMH po połączeniu obciążeń?",
      "answers": [
        "116,6 MPa",
        "144,2 MPa",
        "160 MPa"
      ],
      "correct": 1,
      "hint": "Użyj wzoru z współczynnikiem 3 przy τ².",
      "explanation": "σHMH = √(100² + 3·60²) = √20 800 = 144,22 MPa. Nie jest to suma 100 + 60.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego w punkcie na osi obojętnej pełnego przekroju nie wystarczy użyć tylko M/W?",
      "answers": [
        "Bo zginanie daje tam maksimum",
        "Bo tam M/W = 0, ale mogą występować inne składowe",
        "Bo skręcanie zawsze daje tam maksimum"
      ],
      "correct": 1,
      "hint": "Rozłóż wpływ zginania, siły osiowej i skręcania na osobne składowe.",
      "explanation": "Na osi obojętnej naprężenie od zginania znika, lecz N/A może pozostać. W pełnym przekroju kołowym τ od skręcania znika tylko w środku, a w pozostałych punktach osi obojętnej rośnie wraz z odległością od środka; trzeba też sprawdzić ścinanie od siły poprzecznej.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Pręt ma N/A = 20 MPa, M/W = 80 MPa oraz T/Wo = 50 MPa. W wybranym włóknie wszystkie składowe działają łącznie.",
    "steps": [
      "Naprężenie normalne: σ = 20 + 80 = 100 MPa.",
      "Naprężenie styczne od skręcania: τ = 50 MPa.",
      "HMH: σred = √(100² + 3·50²) = 132,29 MPa.",
      "Tresca: σred = √(100² + 4·50²) = 141,42 MPa."
    ],
    "result": "W tym punkcie σ = 100 MPa i τ = 50 MPa; σHMH = 132,3 MPa, σT = 141,4 MPa."
  }
} satisfies LessonData
