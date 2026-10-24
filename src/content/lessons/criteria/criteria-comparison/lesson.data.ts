import type { LessonData } from '../../../model'

export default {
  "id": "criteria-comparison",
  "moduleId": "criteria",
  "number": 5,
  "title": "HMH czy Tresca? Porównanie hipotez",
  "shortTitle": "Porównanie hipotez",
  "description": "Porównuj wyniki dla tego samego stanu naprężenia i świadomie oceniaj zapas, zamiast wybierać hipotezę przypadkowo.",
  "duration": 9,
  "eyebrow": "Ten sam stan, różne modele",
  "formula": "\\sqrt{\\sigma^2 + 3\\tau^2} \\leq \\sqrt{\\sigma^2 + 4\\tau^2}",
  "formulaNote": "Nierówność dotyczy omawianego stanu σ, τ. HMH i Tresca są równe przy czystym jednoosiowym rozciąganiu lub ściskaniu, gdy τ = 0.",
  "insight": "Większe σred oznacza mniejszy obliczony zapas n = Re/σred. Nie wolno porównywać wyniku HMH z granicą ścinania wyprowadzoną z Tresca.",
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
      "question": "Dla σ = 0 i τ = 100 MPa jakie wartości dadzą HMH i Tresca?",
      "answers": [
        "HMH 100 MPa, Tresca 100 MPa",
        "HMH 173,2 MPa, Tresca 200 MPa",
        "HMH 200 MPa, Tresca 173,2 MPa"
      ],
      "correct": 1,
      "hint": "Podstaw odpowiednio współczynniki 3 i 4 przy τ².",
      "explanation": "HMH: √3·100 = 173,2 MPa. Tresca: √4·100 = 200 MPa. Dla czystego ścinania Tresca daje większe wytężenie.",
      "outcome": "U1"
    },
    {
      "question": "Przy Re = 250 MPa HMH daje 125 MPa, a Tresca 140 MPa. Jakie są odpowiednie zapasy?",
      "answers": [
        "2,00 i 1,79",
        "1,79 i 2,00",
        "Oba 2,00"
      ],
      "correct": 0,
      "hint": "Dla każdej hipotezy osobno oblicz n = Re/σred.",
      "explanation": "nHMH = 250/125 = 2,00, a nT = 250/140 = 1,79. Większe naprężenie zredukowane daje mniejszy zapas.",
      "outcome": "U3"
    },
    {
      "question": "Kiedy HMH i Tresca dają ten sam wynik dla σx = σ, σy = 0?",
      "answers": [
        "Przy każdym τ",
        "Przy τ = 0",
        "Tylko przy σ = 0"
      ],
      "correct": 1,
      "hint": "Porównaj wyrażenia pod pierwiastkami.",
      "explanation": "Przy τ = 0 oba wzory dają |σ|. Przy czystym ścinaniu σ = 0 wyniki są różne: √3·|τ| oraz 2|τ|.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Dla σ = 120 MPa, τ = 40 MPa i Re = 300 MPa porównaj HMH i Tresca.",
    "steps": [
      "HMH: √(120² + 3·40²) = √19 200 = 138,56 MPa.",
      "Tresca: √(120² + 4·40²) = √20 800 = 144,22 MPa.",
      "Zapasy: nHMH = 300/138,56 = 2,17; nT = 300/144,22 = 2,08."
    ],
    "result": "Tresca daje nieco ostrzejszą ocenę: σT = 144,2 MPa i n = 2,08."
  }
} satisfies LessonData
