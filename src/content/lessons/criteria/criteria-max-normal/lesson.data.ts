import type { LessonData } from '../../../model'

export default {
  "id": "criteria-max-normal",
  "moduleId": "criteria",
  "number": 2,
  "title": "Hipoteza największego naprężenia normalnego",
  "shortTitle": "Maksimum normalne",
  "description": "Sprawdź, kiedy o zniszczeniu decyduje skrajne naprężenie główne i dlaczego trzeba zachować jego znak.",
  "duration": 8,
  "eyebrow": "Najpierw kierunki główne",
  "formula": "\\sigma_{red} = \\max(|\\sigma_1|, |\\sigma_2|, |\\sigma_3|)",
  "formulaNote": "Dla różnych dopuszczalnych wartości na rozciąganie i ściskanie sprawdzamy oddzielnie dodatnie i ujemne naprężenia główne. Przy stanie płaskim σ3 = 0.",
  "insight": "Przy czystym ścinaniu σ1 = τ i σ2 = −τ, więc hipoteza największego naprężenia normalnego przewiduje granicę przy |τ| = k, a nie przy τ = 0.",
  "lab": "stressTransform",
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
      "question": "Dla σ1 = 80 MPa, σ2 = −140 MPa i σ3 = 0 ile wynosi σred według największego naprężenia normalnego?",
      "answers": [
        "60 MPa",
        "80 MPa",
        "140 MPa"
      ],
      "correct": 2,
      "hint": "Porównaj wartości bezwzględne wszystkich trzech naprężeń głównych.",
      "explanation": "Wartości bezwzględne to 80, 140 i 0 MPa, więc σred = 140 MPa. Znak −140 nie znika przy szukaniu największego wytężenia.",
      "outcome": "U1"
    },
    {
      "question": "Element ma σx = 70 MPa i τxy = 30 MPa. Czy σred = 70 MPa jest poprawne dla tej hipotezy?",
      "answers": [
        "Tak, normalna jest zawsze decydująca",
        "Nie, trzeba najpierw wyznaczyć naprężenia główne",
        "Tak, jeśli σy = 0"
      ],
      "correct": 1,
      "hint": "Ścinanie zmienia promień koła Mohra, a więc także naprężenia główne.",
      "explanation": "Dla σy = 0: σ1,2 = 35 ± √(35² + 30²), czyli około 81,1 i −11,1 MPa. Zatem σred = 81,1 MPa, nie 70 MPa.",
      "outcome": "U2"
    },
    {
      "question": "Materiał ma kr = 90 MPa i kc = 180 MPa, a naprężenia główne wynoszą 70 i −150 MPa. Jaki jest wynik sprawdzenia?",
      "answers": [
        "Oba warunki spełnione",
        "Przekroczone rozciąganie",
        "Przekroczone ściskanie"
      ],
      "correct": 0,
      "hint": "Dodatnią wartość porównaj z kr, a moduł ujemnej z kc.",
      "explanation": "Rozciąganie: 70 ≤ 90 MPa. Ściskanie: |−150| = 150 ≤ 180 MPa. Oba warunki są spełnione, mimo różnych wartości dopuszczalnych.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Stan płaski: σx = 60 MPa, σy = 0, τxy = 80 MPa.",
    "steps": [
      "Środek koła Mohra: C = (60 + 0)/2 = 30 MPa.",
      "Promień: R = √(30² + 80²) = 85,44 MPa.",
      "Naprężenia główne: σ1 = 115,44 MPa, σ2 = −55,44 MPa; σ3 = 0.",
      "Największy moduł to 115,44 MPa, więc σred = 115,44 MPa."
    ],
    "result": "Według hipotezy największego naprężenia normalnego σred ≈ 115,4 MPa."
  }
} satisfies LessonData
