import type { LessonData } from '../../../model'

export default {
  "id": "criteria-reduced-stress",
  "moduleId": "criteria",
  "number": 1,
  "title": "Naprężenie zredukowane: jedna liczba dla złożonego stanu",
  "shortTitle": "Naprężenie zredukowane",
  "description": "Zrozum, po co zastępować kilka składowych naprężenia jedną wartością porównywaną z wytrzymałością materiału.",
  "duration": 7,
  "eyebrow": "Wspólna miara wytężenia",
  "formula": "\\sigma_{red} \\leq k_r = \\frac{R_e}{n} \\qquad n = \\frac{R_e}{\\sigma_{red}}",
  "formulaNote": "kr to dopuszczalne naprężenie przy rozciąganiu, Re — granica plastyczności, n — wymagany lub obliczony współczynnik bezpieczeństwa. Wartości podstawiamy w MPa.",
  "insight": "Naprężenie zredukowane nie jest nową siłą ani dodatkową składową w przekroju. To wartość obliczeniowa zależna od przyjętej hipotezy.",
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
      "question": "W elemencie działają jednocześnie σ = 90 MPa i τ = 40 MPa. Dlaczego nie wolno sprawdzić wytrzymałości warunkiem 90 + 40 ≤ Re?",
      "answers": [
        "Bo MPa nie wolno dodawać",
        "Bo trzeba zastosować hipotezę opisującą współdziałanie składowych",
        "Bo τ zawsze należy pominąć"
      ],
      "correct": 1,
      "hint": "Obie wartości mają te same jednostki, ale różne skutki fizyczne.",
      "explanation": "Jednostki MPa można dodawać, lecz zwykła suma nie jest hipotezą wytężeniową. HMH lub Tresca określa, jak σ i τ wspólnie wytężają materiał.",
      "outcome": "W2"
    },
    {
      "question": "Dla tego samego stanu naprężenia HMH daje 130 MPa, a Tresca 145 MPa. Co oznacza różnica?",
      "answers": [
        "Pomiar naprężeń był błędny",
        "Hipotezy inaczej opisują mechanizm zniszczenia",
        "Tresca zawsze jest błędna"
      ],
      "correct": 1,
      "hint": "Naprężenie zredukowane zależy od przyjętego modelu.",
      "explanation": "Składowe naprężenia są te same, ale hipotezy inaczej je redukują. Wynik należy porównać z wytrzymałością zgodnie z zasadami właściwymi dla wybranej hipotezy.",
      "outcome": "W2"
    },
    {
      "question": "Przy Re = 240 MPa obliczono σred = 120 MPa. Ile wynosi rzeczywisty współczynnik bezpieczeństwa?",
      "answers": [
        "0,5",
        "2",
        "120"
      ],
      "correct": 1,
      "hint": "Podziel granicę plastyczności przez naprężenie zredukowane.",
      "explanation": "n = Re/σred = 240/120 = 2. Materiał osiąga granicę plastyczności przy dwukrotnie większym obciążeniu w zakresie proporcjonalności.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Element ze stali o Re = 250 MPa ma σred = 125 MPa, a projekt wymaga n ≥ 1,5.",
    "steps": [
      "Oblicz rzeczywisty zapas: n = Re/σred = 250/125 = 2.",
      "Porównaj go z wymaganiem: 2 ≥ 1,5.",
      "Alternatywnie oblicz kr = 250/1,5 = 166,7 MPa i porównaj: 125 ≤ 166,7 MPa."
    ],
    "result": "Warunek jest spełniony; rzeczywisty współczynnik bezpieczeństwa wynosi 2."
  }
} satisfies LessonData
