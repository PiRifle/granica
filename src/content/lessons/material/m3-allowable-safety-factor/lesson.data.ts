import type { LessonData } from '../../../model'

export default {
  "id": "m3-allowable-safety-factor",
  "moduleId": "material",
  "number": 6,
  "title": "Naprężenie dopuszczalne i współczynnik bezpieczeństwa",
  "shortTitle": "Zapas bezpieczeństwa",
  "description": "Jak przejść od granicy materiału do naprężenia dopuszczalnego i jak sprawdzić nośność bez projektowania „na granicy zniszczenia”.",
  "duration": 9,
  "eyebrow": "Zostawiamy zapas",
  "formula": "\\sigma_{dop} = \\frac{R_{gr}}{n}, \\quad n \\ge 1; \\qquad \\sigma_{max} \\le \\sigma_{dop}",
  "formulaNote": "Rgr jest przyjętą granicą materiału, np. Rₑ dla stali plastycznej, a n — wymaganym współczynnikiem bezpieczeństwa. Konkretną granicę i n dobiera się według materiału, zagrożenia i zasad projektowania.",
  "insight": "Większe n oznacza mniejsze dopuszczalne naprężenie i większy wymagany przekrój przy tej samej sile. Nie należy przyjmować, że Rₘ jest zawsze właściwą granicą: dla plastycznej stali często decyduje Rₑ.",
  "lab": "safety",
  "outcomes": [
    "W1 — analizuje obciążenie graniczne i robocze elementu",
    "W2 — wybiera właściwy przypadek graniczny dla materiału",
    "W3 — wiąże wymagane pole przekroju z naprężeniem dopuszczalnym",
    "U1 — oblicza naprężenia dopuszczalne, siły graniczne i pola",
    "U2 — porównuje obliczone naprężenie osiowe z warunkiem wytrzymałościowym",
    "U3 — dobiera przekrój z zachowaniem wymaganego bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Dla stali Rₑ = 240 MPa przyjęto n = 1,5. Ile wynosi naprężenie dopuszczalne?",
      "answers": [
        "160 MPa",
        "240 MPa",
        "360 MPa",
        "150 MPa"
      ],
      "correct": 0,
      "explanation": "σdop = Rₑ/n = 240/1,5 = 160 MPa.",
      "hint": "Naprężenie dopuszczalne jest mniejsze od granicy, więc podziel Rₑ przez n.",
      "outcome": "U1"
    },
    {
      "question": "Pręt przenosi N = 32 kN, a σdop = 160 MPa. Jakie minimalne pole przekroju jest potrzebne w samym warunku wytrzymałości?",
      "answers": [
        "20 mm²",
        "50 mm²",
        "200 mm²",
        "512 mm²"
      ],
      "correct": 2,
      "explanation": "Amin = N/σdop = 32 000 N/(160 N/mm²) = 200 mm². To minimum wynikające wyłącznie z przyjętego warunku naprężeniowego.",
      "hint": "Z warunku N/A ≤ σdop wyznacz A.",
      "outcome": "U3"
    },
    {
      "question": "Przy niezmienionej granicy materiału zwiększono wymagane n z 1,5 do 2. Co to oznacza?",
      "answers": [
        "Naprężenie dopuszczalne rośnie",
        "Naprężenie dopuszczalne maleje do 75% poprzedniej wartości",
        "Pole wymagane zawsze maleje",
        "Rzeczywiste Rₑ materiału rośnie"
      ],
      "correct": 1,
      "explanation": "σdop = Rgr/n. Stosunek nowej do starej wartości wynosi 1,5/2 = 0,75. Zmiana wymagania nie zmienia własności samego materiału.",
      "hint": "Porównaj Rgr/2 z Rgr/1,5.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Pręt z materiału o Rₑ = 250 MPa ma przenieść N = 30 kN. Wymagany współczynnik bezpieczeństwa n = 2.",
    "steps": [
      "Naprężenie dopuszczalne: σdop = Rₑ/n = 250/2 = 125 MPa.",
      "Wymagane pole: Amin = N/σdop = 30 000/125 = 240 mm².",
      "Przyjmujemy dostępny przekrój A = 250 mm², który jest nie mniejszy od minimum.",
      "Rzeczywiste naprężenie σ = 30 000/250 = 120 MPa ≤ 125 MPa, więc warunek jest spełniony."
    ],
    "result": "Potrzebne jest co najmniej 240 mm². Przekrój 250 mm² spełnia warunek, dając naprężenie 120 MPa."
  }
} satisfies LessonData
