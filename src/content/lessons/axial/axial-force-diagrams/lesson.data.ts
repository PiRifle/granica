import type { LessonData } from '../../../model'

export default {
  "id": "axial-force-diagrams",
  "moduleId": "axial",
  "number": 2,
  "title": "Wykres siły osiowej N",
  "shortTitle": "Wykresy N",
  "description": "Wyznacz siłę osiową na kolejnych odcinkach i narysuj wykres zgodny z obciążeniami punktowymi.",
  "duration": 8,
  "eyebrow": "Jeden pręt, różne odcinki",
  "formula": "N(x)=-\\sum F_{x,\\,\\mathrm{jedna\\ strona}},\\qquad \\Delta N=-P\\ \\text{przy konwencji osi x}",
  "formulaNote": "Najpewniej wyznaczać N osobno z równowagi wybranej części, zamiast uczyć się reguły skoku bez rysunku. Znak dodatni oznacza rozciąganie.",
  "insight": "Reakcja w utwierdzeniu odpowiada sile osiowej na pierwszym odcinku, ale wykres trzeba budować przekrój po przekroju — jedna wartość N nie musi opisywać całego pręta.",
  "lab": "steppedBar",
  "outcomes": [
    "W1 — analizuje przekroje pręta z różnymi obciążeniami osiowymi",
    "W2 — odczytuje strefy rozciągania i ściskania",
    "W3 — wiąże położenie sił z przebiegiem wykresu N",
    "U1 — wyznacza i rysuje wykres siły osiowej",
    "U2 — przygotowuje dane N do analizy naprężeń przekrojowych",
    "U3 — lokalizuje odcinki decydujące o wymiarowaniu"
  ],
  "questions": [
    {
      "question": "Jak zmienia się N między dwiema sąsiednimi siłami osiowymi skupionymi, jeśli na tym odcinku nie ma obciążenia rozłożonego?",
      "answers": [
        "Jest stałe",
        "Zawsze rośnie liniowo",
        "Zawsze wynosi zero"
      ],
      "correct": 0,
      "hint": "W przekroju na tym odcinku zestaw sił po jednej stronie nie zmienia się.",
      "explanation": "Bez obciążenia rozłożonego nie pojawiają się nowe siły wraz z przesuwaniem przekroju między punktami przyłożenia. Równowaga daje więc stałe N na całym odcinku.",
      "outcome": "W2"
    },
    {
      "question": "Na wolnym końcu pręta działa osiowa siła 5 kN rozciągająca. Ile wynosi N na odcinku bez innych obciążeń tuż przy tym końcu?",
      "answers": [
        "0 kN, bo koniec jest wolny",
        "+5 kN",
        "−5 kN"
      ],
      "correct": 1,
      "hint": "Odcięta część przy wolnym końcu musi równoważyć przyłożone 5 kN.",
      "explanation": "Swobodny koniec nie oznacza zerowej siły wewnętrznej przy obciążeniu. Z równowagi niewielkiej części końcowej N = +5 kN, a znak plus oznacza rozciąganie.",
      "outcome": "U1"
    },
    {
      "question": "Co powoduje skok wykresu N w miejscu osiowej siły skupionej?",
      "answers": [
        "Nowa siła zewnętrzna wchodzi do równowagi odciętej części",
        "Nagły wzrost modułu Younga",
        "Zmiana jednostki długości pręta"
      ],
      "correct": 0,
      "hint": "Porównaj zestaw sił po tej samej stronie tuż przed i tuż za punktem przyłożenia.",
      "explanation": "Przekrój przesunięty za siłę skupioną obejmuje dodatkowe obciążenie zewnętrzne. Zmienia się równanie równowagi, więc N zmienia skokowo o wartość związaną z tą siłą.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Pręt jest utwierdzony w A (x = 0). W kolejnych przekrojach działają: 20 kN w prawo, potem 10 kN w lewo, a na wolnym końcu 5 kN w prawo. Między siłami nie ma obciążenia rozłożonego.",
    "steps": [
      "Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN, więc N₃ = +5 kN.",
      "Na środkowym odcinku po prawej stronie działają 20 kN w prawo i 5 kN w prawo, więc N₂ = +25 kN.",
      "Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = +(20 − 10 + 5) = +15 kN.",
      "Z równowagi całego pręta reakcja w A wynosi 15 kN w lewo, co potwierdza N₁ = +15 kN.",
      "Narysuj trzy poziome stopnie: +15, +25 i +5 kN, ze skokami w przekrojach przyłożenia sił."
    ],
    "result": "Od utwierdzenia do wolnego końca: N = +15 kN, +25 kN, +5 kN; wszystkie odcinki są rozciągane."
  }
} satisfies LessonData
