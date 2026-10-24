import type { LessonData } from '../../../model'

export default {
  "id": "design-full-torsion",
  "moduleId": "design",
  "number": 6,
  "title": "Pełne zadanie: wał pełny i drążony",
  "shortTitle": "Zadanie: wał",
  "description": "Dobieraj wał z warunków naprężenia i kąta skręcenia oraz porównuj wpływ średnicy zewnętrznej i wewnętrznej.",
  "duration": 9,
  "eyebrow": "Pełne rozwiązanie 4",
  "formula": "\\tau_{max} = \\frac{T}{W_o} \\qquad J_o = \\frac{\\pi(D^4-d^4)}{32} \\qquad \\varphi = \\frac{TL}{GJ_o}",
  "formulaNote": "Wo = Jo/(D/2) dla wału drążonego. Kąt φ z wzoru wychodzi w radianach; 1 rad ≈ 57,2958°.",
  "insight": "Przy stałym T i L warunek wytrzymałości wyznacza wymagane Wo, a warunek sztywności wymagane Jo. To różne wielkości geometryczne.",
  "lab": "hollowShaft",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "solutionId": "cw7-1",
  "questions": [
    {
      "question": "Wał ma T = 500 N·m i Wo = 20 000 mm³. Ile wynosi τmax?",
      "answers": [
        "2,5 MPa",
        "25 MPa",
        "250 MPa"
      ],
      "correct": 1,
      "hint": "500 N·m = 500 000 N·mm.",
      "explanation": "τmax = T/Wo = 500 000/20 000 = 25 N/mm² = 25 MPa.",
      "outcome": "U1"
    },
    {
      "question": "Jak zmieni się kąt skręcenia wału pełnego, jeśli średnica wzrośnie 2 razy?",
      "answers": [
        "Spadnie 16 razy",
        "Spadnie 4 razy",
        "Wzrośnie 16 razy"
      ],
      "correct": 0,
      "hint": "Jo pełnego koła jest proporcjonalne do D⁴.",
      "explanation": "φ = TL/(GJo), a Jo rośnie 2⁴ = 16 razy. Przy pozostałych danych bez zmian kąt spada 16 razy.",
      "outcome": "W3"
    },
    {
      "question": "Z wytrzymałości wychodzi D ≥ 42 mm, a z kąta skręcenia D ≥ 48 mm. Co przyjąć?",
      "answers": [
        "42 mm",
        "45 mm",
        "Co najmniej 48 mm"
      ],
      "correct": 2,
      "hint": "Większa średnica jest potrzebna, by spełnić oba warunki.",
      "explanation": "Należy przyjąć co najmniej 48 mm. Przy 42 mm spełniony byłby warunek naprężeniowy, lecz kąt przekroczyłby wartość dopuszczalną.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Wał pełny przenosi T = 400 N·m; dopuszczalne τ = 40 MPa.",
    "steps": [
      "Wwym na skręcanie: Wo = T/τdop = 400 000/40 = 10 000 mm³.",
      "Dla pełnego koła Wo = πD³/16.",
      "Dmin = ∛(16Wo/π) = ∛(160 000/π) = 37,06 mm.",
      "Przyjmujemy np. D = 38 mm i następnie sprawdzamy kąt skręcenia."
    ],
    "result": "Z warunku wytrzymałości Dmin ≈ 37,1 mm; po zaokrągleniu D = 38 mm wymaga kontroli sztywności."
  }
} satisfies LessonData
