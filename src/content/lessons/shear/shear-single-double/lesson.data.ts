import type { LessonData } from '../../../model'

export default {
  "id": "shear-single-double",
  "moduleId": "shear",
  "number": 2,
  "title": "Połączenia jedno- i dwucięte",
  "shortTitle": "Jedno i dwa cięcia",
  "description": "Policz rzeczywiste płaszczyzny ścinania i uniknij najczęstszej pomyłki przy dwuciętym sworzniu.",
  "duration": 8,
  "eyebrow": "Licz przekroje, nie płyty",
  "formula": "\\tau_{sr} = \\frac{F}{n A} \\qquad A = \\frac{\\pi d^2}{4}",
  "formulaNote": "n to liczba płaszczyzn ścinania: n = 1 dla połączenia jednociętego i n = 2 dla dwuciętego; d to średnica sworznia.",
  "insight": "Drugie cięcie zmniejsza średnie naprężenie o połowę przy tym samym sworzniu i tej samej sile. Samo dodanie płyty nie wystarcza — musi powstać druga płaszczyzna ścinania.",
  "lab": "shearJoint",
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
      "question": "Ten sam sworzeń przenosi tę samą siłę najpierw w połączeniu jednociętym, potem dwuciętym. Jak zmieni się τsr?",
      "answers": [
        "Spadnie o połowę",
        "Spadnie czterokrotnie",
        "Nie zmieni się"
      ],
      "correct": 0,
      "hint": "Porównaj n = 1 i n = 2 we wzorze F/(nA).",
      "explanation": "W połączeniu dwuciętym pole ścinania wynosi 2A, więc τsr = F/(2A). To dokładnie połowa wartości F/A dla jednego cięcia."
    },
    {
      "question": "Sworzeń d = 10 mm jest dwucięty siłą F = 15,7 kN. Jakie jest przybliżone τsr?",
      "answers": [
        "50 MPa",
        "100 MPa",
        "200 MPa"
      ],
      "correct": 1,
      "hint": "Najpierw policz πd²/4, a potem pomnóż pole przez dwa.",
      "explanation": "A = π·10²/4 ≈ 78,54 mm², a 2A ≈ 157,08 mm². Zatem τsr = 15 700/157,08 ≈ 100 MPa."
    },
    {
      "question": "W symetrycznym połączeniu trzech blach środkowa przenosi F, a zewnętrzne razem odprowadzają F. Ile płaszczyzn ścinania ma sworzeń?",
      "answers": [
        "Jedną, bo jest jeden sworzeń",
        "Dwie, po jednej na styku blachy środkowej z każdą zewnętrzną",
        "Trzy, bo w połączeniu są trzy blachy"
      ],
      "correct": 1,
      "hint": "Wyobraź sobie rozdzielenie blach i zaznacz miejsca przecięcia sworznia.",
      "explanation": "Sworzeń przecina się na dwóch stykach blach. Każdy z dwóch przekrojów przenosi F/2, co daje łączne pole ścinania 2A."
    }
  ],
  "workedExample": {
    "given": "Dwucięty sworzeń o średnicy d = 16 mm przenosi F = 60 kN.",
    "steps": [
      "Pole jednego przekroju: A = π·16²/4 = 201,06 mm².",
      "Dla dwóch cięć łączne pole wynosi A_s = 2A = 402,12 mm².",
      "Średnie naprężenie: τsr = 60 000/402,12 = 149,2 MPa. Dla jednego cięcia byłoby dwa razy większe."
    ],
    "result": "τsr ≈ 149 MPa; każda płaszczyzna ścinania przenosi 30 kN."
  }
} satisfies LessonData
