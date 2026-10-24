import type { LessonData } from '../../../model'

export default {
  "id": "axial-strength-condition",
  "moduleId": "axial",
  "number": 6,
  "title": "Warunek wytrzymałości i zapas bezpieczeństwa",
  "shortTitle": "Wytrzymałość",
  "description": "Dobierz przekrój tak, aby maksymalne naprężenie nie przekroczyło wartości dopuszczalnej.",
  "duration": 9,
  "eyebrow": "Nie projektuj na granicy zniszczenia",
  "formula": "|\\sigma|_{\\max}\\leq \\sigma_{\\mathrm{dop}}=\\frac{\\sigma_{\\mathrm{lim}}}{n},\\qquad A_{\\min}=\\frac{|N|}{\\sigma_{\\mathrm{dop}}}",
  "formulaNote": "σlim i sposób wyznaczenia naprężenia dopuszczalnego zależą od materiału oraz przyjętej normy lub kryterium. n > 1 jest wymaganym współczynnikiem bezpieczeństwa.",
  "insight": "Po doborze trzeba sprawdzić rzeczywiście przyjęty przekrój, nie tylko Amin. Zaokrąglenie wymiaru w dół może zwiększyć naprężenie ponad wartość dopuszczalną.",
  "lab": "safety",
  "outcomes": [
    "W1 — wskazuje przekroje krytyczne elementu osiowo obciążonego",
    "W2 — rozróżnia zniszczenie materiału od nadmiernego odkształcenia",
    "W3 — dobiera pole przekroju na podstawie maksymalnego naprężenia",
    "U1 — oblicza naprężenie dopuszczalne i wymagane pole",
    "U2 — interpretuje jednoosiowe naprężenie graniczne i jego zapas",
    "U3 — dobiera przekrój z zachowaniem wymaganego bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Dla σlim = 240 MPa i wymaganego n = 1,5 naprężenie dopuszczalne wynosi:",
      "answers": [
        "160 MPa",
        "240 MPa",
        "360 MPa"
      ],
      "correct": 0,
      "hint": "Naprężenie dopuszczalne jest mniejsze od granicznego: podziel przez n.",
      "explanation": "σdop = 240/1,5 = 160 MPa. Mnożenie przez n zwiększyłoby dopuszczalne naprężenie ponad granicę, co jest sprzeczne z ideą zapasu.",
      "outcome": "U3"
    },
    {
      "question": "Przy |N| = 90 kN i σdop = 160 MPa minimalne pole przekroju wynosi:",
      "answers": [
        "56,25 mm²",
        "562,5 mm²",
        "1440 mm²"
      ],
      "correct": 1,
      "hint": "Użyj Amin = |N|/σdop i zamień 90 kN na 90 000 N.",
      "explanation": "Amin = 90 000 N / 160 N/mm² = 562,5 mm². Przyjęty przekrój powinien mieć pole co najmniej takie, a następnie należy sprawdzić rzeczywiste σ.",
      "outcome": "U1"
    },
    {
      "question": "Przyjęto A = 600 mm² dla N = 90 kN. Jaki jest rzeczywisty współczynnik zapasu względem σlim = 240 MPa?",
      "answers": [
        "1,2",
        "1,6",
        "2,4"
      ],
      "correct": 1,
      "hint": "Najpierw oblicz rzeczywiste σ, a potem nrzecz = σlim/σ.",
      "explanation": "σ = 90 000/600 = 150 MPa. Rzeczywisty zapas nrzecz = 240/150 = 1,6, więc spełnia wymaganie nrzecz ≥ 1,5.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Pręt rozciągany siłą N = 90 kN wykonano z materiału o σlim = 240 MPa. Wymagany współczynnik bezpieczeństwa n = 1,5. Dobierz A i sprawdź przekrój 600 mm².",
    "steps": [
      "Oblicz naprężenie dopuszczalne: σdop = σlim/n = 240/1,5 = 160 MPa.",
      "Wyznacz minimum: Amin = |N|/σdop = 90 000/160 = 562,5 mm².",
      "Przyjęte A = 600 mm² jest większe od Amin, więc przechodzi wstępny dobór.",
      "Sprawdź rzeczywiste naprężenie: σ = 90 000/600 = 150 MPa ≤ 160 MPa.",
      "Oblicz zapas: nrzecz = 240/150 = 1,6 ≥ 1,5."
    ],
    "result": "Amin = 562,5 mm². Przekrój 600 mm² spełnia warunek: σ = 150 MPa i nrzecz = 1,6."
  }
} satisfies LessonData
