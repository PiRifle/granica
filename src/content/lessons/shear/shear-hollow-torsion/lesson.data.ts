import type { LessonData } from '../../../model'

export default {
  "id": "shear-hollow-torsion",
  "moduleId": "shear",
  "number": 5,
  "title": "Skręcanie rury: materiał tam, gdzie pracuje",
  "shortTitle": "Wał rurowy",
  "description": "Porównaj rurę z wałem pełnym i naucz się poprawnie odejmować wnętrze we wzorach geometrycznych.",
  "duration": 9,
  "eyebrow": "Pusta oś nie jest stratą",
  "formula": "J_o = \\frac{\\pi(D^4-d^4)}{32} \\qquad W_o = \\frac{J_o}{D/2} = \\frac{\\pi(D^4-d^4)}{16D}",
  "formulaNote": "D to średnica zewnętrzna, d to średnica wewnętrzna. τmax = T/W_o występuje na zewnętrznym promieniu.",
  "insight": "Nie wolno liczyć J_o jako π(D−d)⁴/32. Odejmuje się czwarte potęgi średnic, ponieważ moment bezwładności zależy od rozmieszczenia pola względem osi.",
  "lab": "hollowShaft",
  "outcomes": [
    "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
    "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
    "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
    "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
    "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
    "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Które wyrażenie poprawnie opisuje J_o rury o średnicach D i d?",
      "answers": [
        "π(D⁴−d⁴)/32",
        "π(D−d)⁴/32",
        "π(D²−d²)/4"
      ],
      "correct": 0,
      "hint": "Odejmij moment bezwładności pustego wnętrza od momentu pełnego koła.",
      "explanation": "Dla koła J = πD⁴/32, więc dla rury J_o = πD⁴/32 − πd⁴/32. Ostatnie wyrażenie opisuje pole przekroju, nie moment bezwładności.",
      "outcome": "W3"
    },
    {
      "question": "Przy tym samym momencie T i tej samej średnicy zewnętrznej D rura ma zwykle w porównaniu z wałem pełnym:",
      "answers": [
        "Mniejsze J_o i większe τmax",
        "Większe J_o i mniejsze τmax",
        "Identyczne J_o i τmax"
      ],
      "correct": 0,
      "hint": "Usunięcie wnętrza odejmuje dodatni składnik πd⁴/32.",
      "explanation": "Rura ma mniejsze J_o oraz mniejsze W_o = J_o/(D/2), więc przy tym samym T osiąga większe τmax. Może jednak być korzystniejsza w przeliczeniu na masę.",
      "outcome": "W3"
    },
    {
      "question": "Dla cienkościennej rury największe naprężenie styczne od skręcania występuje:",
      "answers": [
        "Na promieniu zewnętrznym",
        "Zawsze na promieniu wewnętrznym",
        "Wszędzie dokładnie jednakowe, niezależnie od modelu"
      ],
      "correct": 0,
      "hint": "W ogólnym wzorze τ(r) = Tr/J_o największe r jest na zewnątrz.",
      "explanation": "Naprężenie rośnie liniowo z r, więc maksimum jest dla r = D/2. W przybliżeniu cienkościennym rozkład po grubości bywa uśredniany, ale nie zmienia to maksimum modelu ogólnego.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Rura o D = 60 mm i d = 40 mm przenosi T = 2 kN·m = 2 000 000 N·mm.",
    "steps": [
      "Oblicz J_o = π(60⁴−40⁴)/32 = 1 021 018 mm⁴.",
      "Ponieważ zewnętrzny promień wynosi 30 mm, W_o = J_o/30 = 34 033,9 mm³.",
      "Oblicz τmax = T/W_o = 2 000 000/34 033,9 = 58,77 MPa."
    ],
    "result": "τmax ≈ 58,8 MPa na zewnętrznej powierzchni rury."
  }
} satisfies LessonData
