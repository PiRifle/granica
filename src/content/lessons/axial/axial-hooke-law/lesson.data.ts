import type { LessonData } from '../../../model'

export default {
  "id": "axial-hooke-law",
  "moduleId": "axial",
  "number": 4,
  "title": "Prawo Hooke’a: proporcjonalne odkształcenie",
  "shortTitle": "Prawo Hooke’a",
  "description": "Połącz naprężenie, odkształcenie i moduł Younga w liniowo sprężystym zakresie pracy materiału.",
  "duration": 9,
  "eyebrow": "Materiał jako sprężyna",
  "formula": "\\sigma=E\\varepsilon,\\qquad \\varepsilon=\\frac{\\Delta L}{L}",
  "formulaNote": "E ma jednostkę naprężenia, np. GPa lub MPa. Dla stali często E ≈ 200 GPa = 200 000 MPa. Prawo Hooke’a nie obowiązuje przy dowolnie dużych odkształceniach.",
  "insight": "Duża wytrzymałość nie oznacza automatycznie dużego E. Wytrzymałość mówi o granicy bezpiecznego obciążenia, a moduł Younga o sztywności sprężystej.",
  "lab": "hooke",
  "outcomes": [
    "W1 — analizuje sprężystą odpowiedź elementu na obciążenie osiowe",
    "W2 — odróżnia zakres sprężysty od trwałego odkształcenia",
    "W3 — odnosi odkształcenie względne do długości początkowej",
    "U1 — oblicza σ, ε i E w zakresie liniowo sprężystym",
    "U2 — rozumie jednoosiowe σ i ε jako podstawę dalszej analizy Mohra",
    "U3 — uwzględnia sztywność materiału obok jego wytrzymałości"
  ],
  "questions": [
    {
      "question": "Przy σ = 150 MPa i E = 200 000 MPa odkształcenie względne wynosi:",
      "answers": [
        "0,00075",
        "0,075",
        "1333"
      ],
      "correct": 0,
      "hint": "Przekształć prawo Hooke’a do ε = σ/E.",
      "explanation": "ε = 150/200 000 = 0,00075. Odpowiada to 0,075%, a nie 0,075; zachowanie jednostek MPa pozwala skrócić je w ilorazie.",
      "outcome": "U1"
    },
    {
      "question": "Dwa materiały mają tę samą granicę proporcjonalności, ale E₁ > E₂. Przy tym samym małym naprężeniu:",
      "answers": [
        "materiał 1 odkształci się mniej",
        "materiał 2 odkształci się mniej",
        "odkształcenia muszą być jednakowe"
      ],
      "correct": 0,
      "hint": "Przy stałym σ odkształcenie ε = σ/E maleje ze wzrostem E.",
      "explanation": "Większy moduł Younga oznacza większą sztywność sprężystą. Dla tego samego σ materiał 1 ma mniejsze ε, mimo jednakowej granicy proporcjonalności.",
      "outcome": "W2"
    },
    {
      "question": "Co oznacza przekroczenie zakresu sprężystego?",
      "answers": [
        "Po odciążeniu może pozostać trwałe odkształcenie",
        "Moduł Younga staje się nieskończony",
        "Naprężenie i odkształcenie zawsze są zerowe"
      ],
      "correct": 0,
      "hint": "Pomyśl o sprężynie rozciągniętej zbyt mocno.",
      "explanation": "Poza zakresem sprężystym zależność przestaje być odwracalna i prostoliniowa. Po usunięciu obciążenia część odkształcenia może pozostać trwale.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Stalowy pręt o L = 2 m ma E = 200 GPa i pracuje przy rozciągającym σ = 150 MPa w zakresie liniowo sprężystym. Oblicz ε i ΔL.",
    "steps": [
      "Przelicz E = 200 GPa = 200 000 MPa, aby zgodzić jednostki z σ.",
      "Z prawa Hooke’a: ε = σ/E = 150/200 000 = 0,00075.",
      "Przelicz długość L = 2 m = 2000 mm.",
      "Wydłużenie: ΔL = εL = 0,00075 · 2000 mm = 1,5 mm.",
      "Odkształcenie procentowe wynosi 100%·ε = 0,075%."
    ],
    "result": "ε = 0,00075 = 0,075%, a wydłużenie sprężyste ΔL = 1,5 mm."
  }
} satisfies LessonData
