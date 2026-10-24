import type { LessonData } from '../../../model'

export default {
  "id": "m3-hooke-stiffness",
  "moduleId": "material",
  "number": 3,
  "title": "Prawo Hooke’a i sztywność osiowa",
  "shortTitle": "Sprężystość",
  "description": "Liniowa zależność w zakresie sprężystym oraz wpływ materiału, pola i długości na wydłużenie pręta.",
  "duration": 8,
  "eyebrow": "Ile przesunie się element?",
  "formula": "\\sigma = E\\varepsilon, \\qquad \\Delta L = \\frac{NL}{EA}",
  "formulaNote": "E to moduł Younga, N — siła osiowa, L — długość, A — pole przekroju. Wzór na ΔL stosujemy przy stałych N, E i A na długości L oraz w zakresie liniowo sprężystym.",
  "insight": "Wytrzymałość odpowiada na pytanie „czy materiał wytrzyma?”, a sztywność — „czy odkształcenie nie będzie za duże?”. Element może być bezpieczny względem zerwania, lecz zbyt podatny w użytkowaniu.",
  "lab": "hooke",
  "outcomes": [
    "W1 — analizuje sprężystą odpowiedź pręta na siłę osiową",
    "W2 — rozpoznaje granice stosowalności prawa Hooke’a",
    "W3 — rozróżnia własność materiału E od sztywności całego pręta EA/L",
    "U1 — oblicza naprężenia, odkształcenia i wydłużenia",
    "U2 — rozumie odkształcenia osiowe potrzebne do analizy koła Mohra",
    "U3 — kontroluje element zarówno ze względu na wytrzymałość, jak i sztywność"
  ],
  "questions": [
    {
      "question": "Pręt ma N = 20 kN, L = 1 m, A = 100 mm² i E = 200 GPa. Ile wynosi jego wydłużenie?",
      "answers": [
        "0,01 mm",
        "0,1 mm",
        "1 mm",
        "10 mm"
      ],
      "correct": 2,
      "explanation": "ΔL = NL/(EA) = 20 000·1000/(200 000·100) = 1 mm. E = 200 GPa = 200 000 N/mm².",
      "hint": "Zamień długość na mm, E na N/mm² i podstaw do NL/(EA).",
      "outcome": "U1"
    },
    {
      "question": "Jak zmieni się wydłużenie pręta, jeżeli przy tej samej sile i materiale podwoimy jego długość oraz pole przekroju?",
      "answers": [
        "Nie zmieni się",
        "Wzrośnie dwa razy",
        "Zmaleje dwa razy",
        "Wzrośnie cztery razy"
      ],
      "correct": 0,
      "explanation": "W ΔL = NL/(EA) długość rośnie dwa razy, a iloczyn EA też rośnie dwa razy. Te zmiany znoszą się.",
      "hint": "Podstaw 2L i 2A, a następnie skróć wspólne współczynniki.",
      "outcome": "W3"
    },
    {
      "question": "Dlaczego nie wolno stosować σ = Eε do dowolnie dużych odkształceń stali?",
      "answers": [
        "Bo E zawsze jest równe zero",
        "Bo prawo Hooke’a opisuje tylko liniowo sprężysty zakres",
        "Bo naprężenie nie zależy od materiału",
        "Bo po uplastycznieniu nie istnieją odkształcenia"
      ],
      "correct": 1,
      "explanation": "Liniowa proporcjonalność σ = Eε obowiązuje tylko w zakresie liniowej sprężystości. Po uplastycznieniu zależność staje się nieliniowa i pojawia się odkształcenie trwałe.",
      "hint": "Nazwa „prawo” nie usuwa zakresu jego stosowalności.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Stalowy pręt o długości L = 2 m i polu A = 250 mm² rozciąga siła N = 50 kN. Moduł E = 200 GPa.",
    "steps": [
      "Naprężenie: σ = N/A = 50 000/250 = 200 MPa.",
      "Odkształcenie z prawa Hooke’a: ε = σ/E = 200/200 000 = 0,001.",
      "Wydłużenie: ΔL = εL = 0,001·2000 mm = 2 mm.",
      "Ten sam wynik daje ΔL = NL/(EA) = 50 000·2000/(200 000·250) = 2 mm."
    ],
    "result": "Pręt ma naprężenie 200 MPa, odkształcenie 0,001 i wydłuża się o 2 mm, o ile pozostaje w zakresie sprężystym."
  }
} satisfies LessonData
