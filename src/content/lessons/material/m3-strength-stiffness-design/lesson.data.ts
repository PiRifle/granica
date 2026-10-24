import type { LessonData } from '../../../model'

export default {
  "id": "m3-strength-stiffness-design",
  "moduleId": "material",
  "number": 7,
  "title": "Dobór ze względu na wytrzymałość i sztywność",
  "shortTitle": "Dwa warunki doboru",
  "description": "Łączenie warunków naprężeniowego i przemieszczeniowego oraz rozpoznawanie, który z nich decyduje o wymiarze.",
  "duration": 10,
  "eyebrow": "Nie wystarczy, że nie pęknie",
  "formula": "A \\ge \\frac{N}{\\sigma_{dop}} \\qquad \\text{oraz} \\qquad A \\ge \\frac{NL}{E\\,\\Delta L_{dop}}",
  "formulaNote": "Pierwszy warunek ogranicza naprężenie, drugi — wydłużenie ΔLdop. Oba dotyczą pręta o stałym przekroju, stałej sile osiowej i liniowo sprężystego materiału; przyjmujemy pole spełniające oba.",
  "insight": "Warunek decydujący to ten, który wymaga większego pola. Zwiększenie E pomaga sztywności, ale nie podnosi automatycznie granicy plastyczności; stal o większej wytrzymałości nie musi mieć większego modułu Younga.",
  "lab": "steppedBar",
  "outcomes": [
    "W1 — analizuje element pod kątem kilku jednoczesnych wymagań",
    "W2 — rozróżnia zniszczenie od nadmiernej deformacji",
    "W3 — dobiera geometrię przekroju na podstawie warunku decydującego",
    "U1 — wykonuje kompletne obliczenia naprężeniowe i sztywnościowe",
    "U2 — interpretuje obliczony stan osiowy jako punkt wyjścia do analizy Mohra",
    "U3 — dobiera element z uwagi na bezpieczeństwo i dopuszczalną podatność"
  ],
  "questions": [
    {
      "question": "Warunek wytrzymałości wymaga A ≥ 250 mm², a warunek sztywności A ≥ 400 mm². Które pole należy przyjąć przed uwzględnieniem dostępnych wymiarów katalogowych?",
      "answers": [
        "150 mm²",
        "250 mm²",
        "400 mm²",
        "średnią 325 mm²"
      ],
      "correct": 2,
      "explanation": "Element musi spełnić oba warunki, więc wybieramy większe minimum: 400 mm². Pole 325 mm² nie spełniłoby warunku sztywności.",
      "hint": "Sprawdź, przy którym polu oba warunki będą jednocześnie prawdziwe.",
      "outcome": "U3"
    },
    {
      "question": "Dla N = 40 kN, L = 2 m, E = 200 GPa i ΔLdop = 1 mm wymagane pole ze sztywności wynosi:",
      "answers": [
        "100 mm²",
        "200 mm²",
        "400 mm²",
        "800 mm²"
      ],
      "correct": 2,
      "explanation": "A ≥ NL/(EΔLdop) = 40 000·2000/(200 000·1) = 400 mm².",
      "hint": "Przekształć ΔL = NL/(EA) tak, aby wyznaczyć A.",
      "outcome": "U1"
    },
    {
      "question": "Zastąpiono stal stalą o większej granicy plastyczności, ale takim samym E. Bez zmiany przekroju i obciążenia:",
      "answers": [
        "wydłużenie sprężyste zmaleje, bo Rₑ jest większe",
        "wydłużenie sprężyste nie zmieni się",
        "moduł E automatycznie wzrośnie",
        "naprężenie od siły osiowej spadnie do zera"
      ],
      "correct": 1,
      "explanation": "Przy stałych N, L, A i E wydłużenie ΔL = NL/(EA) pozostaje takie samo. Większa granica plastyczności zwiększa możliwości wytrzymałościowe, nie sztywność sprężystą.",
      "hint": "Zobacz, które wielkości występują we wzorze na wydłużenie, a których w nim nie ma.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Pręt o L = 2 m i E = 200 GPa przenosi N = 40 kN. Dopuszczalne naprężenie wynosi 150 MPa, a dopuszczalne wydłużenie 1 mm.",
    "steps": [
      "Warunek wytrzymałości: A ≥ N/σdop = 40 000/150 = 266,7 mm².",
      "Warunek sztywności: A ≥ NL/(EΔLdop) = 40 000·2000/(200 000·1) = 400 mm².",
      "Decyduje sztywność, ponieważ 400 mm² > 266,7 mm². Przyjmujemy A = 400 mm².",
      "Kontrola: σ = 40 000/400 = 100 MPa ≤ 150 MPa oraz ΔL = 40 000·2000/(200 000·400) = 1 mm."
    ],
    "result": "Minimalne pole wynosi 400 mm²; decyduje dopuszczalne wydłużenie. Przy tym polu naprężenie to 100 MPa, a wydłużenie dokładnie 1 mm."
  }
} satisfies LessonData
