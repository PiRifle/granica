import type { LessonData } from '../../../model'

export default {
  "id": "criteria-tresca",
  "moduleId": "criteria",
  "number": 4,
  "title": "Hipoteza Tresca: największe ścinanie",
  "shortTitle": "Tresca",
  "description": "Wyznaczaj wytężenie z różnicy skrajnych naprężeń głównych i unikaj pomijania trzeciego kierunku.",
  "duration": 9,
  "eyebrow": "Różnica skrajnych naprężeń",
  "formula": "\\sigma_T = \\sigma_{max} - \\sigma_{min} = 2\\tau_{max}",
  "formulaNote": "W stanie przestrzennym trzeba uwzględnić σ1, σ2 i σ3. Dla σ oraz τ w płaskim stanie: σT = √(σ² + 4τ²).",
  "insight": "W stanie płaskim jedno naprężenie główne jest równe zerowi σ3. Jeśli σ1 i σ2 mają ten sam znak, zero może być skrajną wartością i nie wolno go pominąć.",
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
      "question": "Dla σ1 = 100 MPa, σ2 = 40 MPa, σ3 = 0 ile wynosi σT?",
      "answers": [
        "60 MPa",
        "100 MPa",
        "140 MPa"
      ],
      "correct": 1,
      "hint": "Skrajne wartości to 100 i 0 MPa, nie 100 i 40 MPa.",
      "explanation": "σT = σmax − σmin = 100 − 0 = 100 MPa. Różnica 100 − 40 pomija trzecie naprężenie główne równe zero.",
      "outcome": "U1"
    },
    {
      "question": "Dla σ = 60 MPa i τ = 80 MPa ile wynosi σred według Tresca?",
      "answers": [
        "170,9 MPa",
        "140 MPa",
        "200 MPa"
      ],
      "correct": 0,
      "hint": "Zastosuj σT = √(σ² + 4τ²).",
      "explanation": "σT = √(60² + 4·80²) = √(3600 + 25 600) = √29 200 = 170,88 MPa. Współczynnik 4 przy τ² odróżnia ten wynik od HMH.",
      "outcome": "U1"
    },
    {
      "question": "Czemu przy czystym ścinaniu Tresca daje σT = 2τ?",
      "answers": [
        "Bo naprężenia główne wynoszą τ i −τ",
        "Bo σ1 = σ2 = τ",
        "Bo naprężenie normalne zawsze jest zerowe"
      ],
      "correct": 0,
      "hint": "Znajdź przecięcia koła Mohra dla czystego ścinania z osią σ.",
      "explanation": "Koło ma środek w zerze i promień τ, więc σ1 = τ, σ2 = −τ. Średnica koła wynosi 2τ i to jest σT.",
      "outcome": "U2"
    }
  ],
  "workedExample": {
    "given": "Naprężenia główne wynoszą σ1 = 120 MPa, σ2 = 20 MPa, σ3 = −40 MPa.",
    "steps": [
      "Największą wartością jest σmax = 120 MPa.",
      "Najmniejszą wartością jest σmin = −40 MPa.",
      "σT = 120 − (−40) = 160 MPa, a τmax = 160/2 = 80 MPa."
    ],
    "result": "Naprężenie zredukowane Tresca wynosi 160 MPa; największe ścinanie wynosi 80 MPa."
  }
} satisfies LessonData
