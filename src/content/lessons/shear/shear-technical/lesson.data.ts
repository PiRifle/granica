import type { LessonData } from '../../../model'

export default {
  "id": "shear-technical",
  "moduleId": "shear",
  "number": 1,
  "title": "Ścinanie techniczne: siła w poprzek przekroju",
  "shortTitle": "Ścinanie techniczne",
  "description": "Zobacz, kiedy warstwy materiału przesuwają się względem siebie i jak oszacować średnie naprężenie styczne.",
  "duration": 7,
  "eyebrow": "Przekrój pracuje na ścinanie",
  "formula": "\\tau_{sr} = \\frac{F}{A_s}",
  "formulaNote": "F to siła ścinająca, a A_s to łączne pole przekrojów ścinanych. Wynik w N/mm² jest równy MPa.",
  "insight": "Ścinanie techniczne zakłada równomierny rozkład naprężeń po polu ścinania. To użyteczne przybliżenie inżynierskie, a nie dokładny obraz naprężeń w każdym punkcie.",
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
      "question": "Sworzeń o polu przekroju 150 mm² przenosi siłę ścinającą 12 kN na jednym przekroju. Ile wynosi średnie naprężenie styczne?",
      "answers": [
        "8 MPa",
        "80 MPa",
        "180 MPa"
      ],
      "correct": 1,
      "hint": "Zamień 12 kN na niutony i podziel przez pole ścinania.",
      "explanation": "τsr = F/A_s = 12 000 N / 150 mm² = 80 N/mm² = 80 MPa. Pole przekroju, nie obwód sworznia, występuje w mianowniku."
    },
    {
      "question": "Przy niezmienionej sile pole ścinania wzrasta trzykrotnie. Jak zmieni się średnie naprężenie styczne?",
      "answers": [
        "Spadnie trzykrotnie",
        "Wzrośnie trzykrotnie",
        "Spadnie dziewięciokrotnie"
      ],
      "correct": 0,
      "hint": "Pole znajduje się w mianowniku wzoru τsr = F/A_s.",
      "explanation": "Przy stałym F mamy τsr,2 = F/(3A_s) = τsr,1/3. Trzy razy większe pole przejmuje siłę przy trzy razy mniejszym średnim naprężeniu."
    },
    {
      "question": "Dlaczego wzoru τsr = F/A_s nie należy traktować jako dokładnego rozkładu naprężeń w każdym punkcie sworznia?",
      "answers": [
        "Ponieważ pomija nierównomierność rozkładu i złożony stan obciążenia",
        "Ponieważ naprężenie styczne zawsze jest zerowe",
        "Ponieważ wzór nie uwzględnia wartości siły"
      ],
      "correct": 0,
      "hint": "Zwróć uwagę na słowo „średnie” i założenie rozkładu równomiernego.",
      "explanation": "W ścinaniu technicznym zastępujemy rzeczywisty, zwykle nierównomierny rozkład wartością średnią. W pobliżu docisku i krawędzi otworów mogą występować dodatkowe, miejscowo większe naprężenia."
    }
  ],
  "workedExample": {
    "given": "Płaski łącznik jest ścinany siłą F = 20 kN. Łączne pole przekroju ścinanego wynosi A_s = 200 mm².",
    "steps": [
      "Przelicz siłę: 20 kN = 20 000 N; dzięki temu wynik otrzymasz w N/mm².",
      "Podstaw do wzoru ścinania technicznego: τsr = 20 000 / 200.",
      "Zinterpretuj wynik jako średnią po całym polu, a nie gwarancję jednakowego naprężenia w każdym punkcie."
    ],
    "result": "τsr = 100 N/mm² = 100 MPa."
  }
} satisfies LessonData
