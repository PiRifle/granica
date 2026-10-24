import type { LessonData } from '../../../model'

export default {
  "id": "m4-second-moments",
  "moduleId": "geometry",
  "number": 3,
  "title": "Momenty bezwładności przekroju",
  "shortTitle": "Bezwładność",
  "description": "Geometryczna miara rozmieszczenia pola względem osi oraz momenty bezwładności prostokąta, koła i przekroju pierścieniowego.",
  "duration": 8,
  "eyebrow": "Dalej od osi znaczy sztywniej",
  "formula": "I_x = \\int_A y^2\\,dA; \\qquad \\text{prostokąt: } I_x = \\frac{bh^3}{12}; \\qquad \\text{koło: } I = \\frac{\\pi d^4}{64}",
  "formulaNote": "Dla prostokąta b jest szerokością równoległą do osi x, a h — wysokością prostopadłą do niej; wzór dotyczy osi środkowej. Jednostką I jest mm⁴ lub m⁴. Dla pierścienia odejmujemy moment otworu.",
  "insight": "Nie wolno zastępować I iloczynem pola i zwykłej odległości: w definicji występuje kwadrat odległości. Zamiana b z h w prostokącie zmienia sztywność zginania, choć pole pozostaje takie samo.",
  "lab": "section",
  "outcomes": [
    "W1 — analizuje rozkład materiału względem osi zginania",
    "W2 — wiąże moment bezwładności ze sztywnością i naprężeniami przy zginaniu",
    "W3 — oblicza momenty bezwładności figur prostych",
    "U1 — stosuje wzory i prawidłowo zachowuje jednostki czwartego rzędu",
    "U2 — rozróżnia osie i kierunki potrzebne do analizy naprężeń",
    "U3 — porównuje sztywność różnych ustawień przekroju"
  ],
  "solutionId": "cw5-1",
  "questions": [
    {
      "question": "Prostokąt ma b = 100 mm i h = 200 mm. Moment bezwładności względem poziomej osi środkowej x wynosi:",
      "answers": [
        "6,667·10⁶ mm⁴",
        "16,667·10⁶ mm⁴",
        "66,67·10⁶ mm⁴",
        "200·10⁶ mm⁴"
      ],
      "correct": 2,
      "explanation": "Iₓ = bh³/12 = 100·200³/12 = 66,67·10⁶ mm⁴.",
      "hint": "Do osi poziomej x odległość mierzymy pionowo, więc h wchodzi w trzeciej potędze.",
      "outcome": "U1"
    },
    {
      "question": "Ten sam prostokąt obrócono o 90° w płaszczyźnie przekroju, zachowując nazwę osi zginania. Jak zmieni się I względem osi poziomej?",
      "answers": [
        "Nie zmieni się, bo pole jest stałe",
        "Zmaleje cztery razy",
        "Wzrośnie cztery razy",
        "Zmaleje osiem razy"
      ],
      "correct": 1,
      "explanation": "Początkowo I₁ = 100·200³/12. Po obrocie I₂ = 200·100³/12, więc I₂/I₁ = 100²/200² = 1/4.",
      "hint": "Po obrocie szerokość i wysokość zamieniają się miejscami.",
      "outcome": "W3"
    },
    {
      "question": "Dla rury o średnicy zewnętrznej D i wewnętrznej d prawidłowy moment bezwładności względem osi środkowej to:",
      "answers": [
        "π(D − d)⁴/64",
        "π(D⁴ − d⁴)/64",
        "π(D² − d²)/4",
        "πD⁴/64 zawsze bez korekty"
      ],
      "correct": 1,
      "explanation": "Od momentu pełnego koła odejmujemy moment otworu: I = πD⁴/64 − πd⁴/64. Nie wolno najpierw odejmować średnic i podnosić różnicy do czwartej potęgi.",
      "hint": "Odejmuj momenty bezwładności dwóch współśrodkowych kół.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Porównujemy prostokąt 100 × 200 mm względem osi poziomej x oraz względem jego dolnej podstawy.",
    "steps": [
      "Względem osi środkowej Ixc = bh³/12 = 100·200³/12 = 66,67·10⁶ mm⁴.",
      "Względem podstawy szerokość przekroju jest stała, więc Ixb = ∫₀ʰ b·y² dy = bh³/3.",
      "Ixb = bh³/3 = 100·200³/3 = 200·10⁶ mm⁴.",
      "Moment względem podstawy jest większy, bo oś jest odsunięta od środka ciężkości; zależność między nimi wyjaśni twierdzenie Steinera."
    ],
    "result": "Ixc = 66,67·10⁶ mm⁴, natomiast względem dolnej podstawy Ixb = 200·10⁶ mm⁴."
  }
} satisfies LessonData
