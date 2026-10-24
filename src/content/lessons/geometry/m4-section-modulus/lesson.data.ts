import type { LessonData } from '../../../model'

export default {
  "id": "m4-section-modulus",
  "moduleId": "geometry",
  "number": 6,
  "title": "Wskaźnik wytrzymałości przekroju W",
  "shortTitle": "Wskaźnik W",
  "description": "Przejście od momentu bezwładności do największego naprężenia zginającego i różnica między przekrojami symetrycznymi a niesymetrycznymi.",
  "duration": 9,
  "eyebrow": "Od geometrii do naprężenia",
  "formula": "W_x = \\frac{I_x}{c_{max}}, \\qquad \\sigma_{max} = \\frac{|M_x|}{W_x}",
  "formulaNote": "cmax to największa odległość od osi obojętnej do skrajnego włókna. Dla przekroju niesymetrycznego względem osi oblicza się W dla obu stron; mniejszy W odpowiada większemu bezwzględnemu naprężeniu przy tym samym M.",
  "insight": "Dwa przekroje o tym samym I mogą mieć różne W, jeżeli różnią się odległością do skrajnych włókien. Do warunku wytrzymałości potrzebujemy największej wartości |σ|, a nie tylko naprężenia w środku ciężkości.",
  "lab": "bending",
  "outcomes": [
    "W1 — analizuje rozkład naprężeń od osi obojętnej do krawędzi",
    "W2 — stosuje geometrię przekroju w przypadku zginania",
    "W3 — wyznacza wskaźniki wytrzymałości dla obu stron osi",
    "U1 — oblicza W i największe naprężenie zginające",
    "U2 — identyfikuje skrajne naprężenia normalne do dalszej analizy Mohra",
    "U3 — dobiera przekrój z uwagi na nośność i sztywność zginania"
  ],
  "questions": [
    {
      "question": "Prostokąt 100 × 200 mm ma Ix = 66,67·10⁶ mm⁴ i cmax = 100 mm. Wskaźnik Wx wynosi:",
      "answers": [
        "66,67·10³ mm³",
        "333,3·10³ mm³",
        "666,7·10³ mm³",
        "6,667·10⁹ mm³"
      ],
      "correct": 2,
      "explanation": "Wx = Ix/cmax = 66,67·10⁶/100 = 666,7·10³ mm³.",
      "hint": "Podziel moment bezwładności w mm⁴ przez odległość w mm.",
      "outcome": "U1"
    },
    {
      "question": "Dla przekroju o Wx = 500·10³ mm³ moment zginający ma wartość bezwzględną 20 kN·m. Największe naprężenie zginające wynosi:",
      "answers": [
        "4 MPa",
        "25 MPa",
        "40 MPa",
        "400 MPa"
      ],
      "correct": 2,
      "explanation": "20 kN·m = 20·10⁶ N·mm. σmax = 20·10⁶/(500·10³) = 40 N/mm² = 40 MPa.",
      "hint": "Zamień kN·m na N·mm: 1 kN·m = 10⁶ N·mm.",
      "outcome": "U1"
    },
    {
      "question": "Przekrój teowy ma różne odległości od poziomej osi obojętnej do górnej i dolnej krawędzi. Które postępowanie jest poprawne?",
      "answers": [
        "Wyznaczamy W dla obu stron i do największego |σ| używamy mniejszego W",
        "Zawsze używamy większego W do σmax",
        "Wystarczy pole przekroju zamiast W",
        "Naprężenie na obu krawędziach musi mieć tę samą wartość bezwzględną"
      ],
      "correct": 0,
      "explanation": "σ = |M|c/I = |M|/W. Strona z większym c ma mniejsze W i większe bezwzględne naprężenie przy tym samym momencie.",
      "hint": "Przy stałych M i I naprężenie rośnie wraz z odległością c.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Belka o przekroju prostokątnym 100 × 200 mm jest zginana momentem |Mx| = 20 kN·m wokół poziomej osi centralnej. Ix = 66,67·10⁶ mm⁴.",
    "steps": [
      "Odległość skrajnych włókien od osi: cmax = h/2 = 200/2 = 100 mm.",
      "Wskaźnik przekroju: Wx = Ix/cmax = 66,67·10⁶/100 = 666,7·10³ mm³.",
      "Moment: 20 kN·m = 20·10⁶ N·mm.",
      "Naprężenie: σmax = |Mx|/Wx = 20·10⁶/(666,7·10³) ≈ 30 MPa; jedna krawędź jest rozciągana, a druga ściskana."
    ],
    "result": "Wx ≈ 666,7·10³ mm³, a największa wartość bezwzględna naprężenia zginającego wynosi około 30 MPa."
  }
} satisfies LessonData
