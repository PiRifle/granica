import type { LessonData } from '../../../model'

export default {
  "id": "m3-tension-compression-test",
  "moduleId": "material",
  "number": 1,
  "title": "Próba rozciągania i ściskania",
  "shortTitle": "Próby materiałowe",
  "description": "Jak z próbki uzyskać krzywą naprężenie–odkształcenie i dlaczego wynik jest niezależny od wielkości próbki w zakresie porównywalnych pomiarów.",
  "duration": 7,
  "eyebrow": "Poznajemy odpowiedź materiału",
  "formula": "\\sigma = \\frac{N}{A}, \\qquad \\varepsilon = \\frac{\\Delta L}{L_0}",
  "formulaNote": "σ to naprężenie normalne, N — siła osiowa, A — pole przekroju, ε — odkształcenie względne, a L₀ — początkowa długość pomiarowa. Przy ściskaniu przyjmujemy zwykle ujemne N i ΔL.",
  "insight": "Naprężenie mówi, jak mocno obciążony jest materiał, a odkształcenie — jak bardzo się wydłużył w stosunku do początkowej długości. To dwa różne opisy i nie wolno ich ze sobą mieszać.",
  "lab": "tensileTest",
  "outcomes": [
    "W1 — analizuje przebieg siły i naprężeń w próbce osiowo obciążonej",
    "W2 — odróżnia rozciąganie od ściskania oraz naprężenie od odkształcenia",
    "W3 — uwzględnia pole i długość próbki w opisie badania",
    "U1 — przelicza wyniki próby na naprężenia i odkształcenia",
    "U2 — przygotowuje dane naprężeniowe potrzebne do późniejszej analizy kołem Mohra",
    "U3 — ocenia, czy wynik próby może być podstawą bezpiecznego doboru"
  ],
  "questions": [
    {
      "question": "Dwie próbki z tej samej stali mają długość L₀, ale druga ma czterokrotnie większe pole przekroju. Przy tej samej sile rozciągającej naprężenie w drugiej próbce wynosi:",
      "answers": [
        "cztery razy więcej",
        "tyle samo",
        "jedną czwartą",
        "dwa razy więcej"
      ],
      "correct": 2,
      "explanation": "Naprężenie σ = N/A. Czterokrotny wzrost A przy niezmienionym N zmniejsza naprężenie do N/(4A) = σ/4.",
      "hint": "Porównaj iloraz siły i pola, nie same siły.",
      "outcome": "U1"
    },
    {
      "question": "Próbka długości 200 mm wydłużyła się o 0,4 mm. Jej odkształcenie względne jest równe:",
      "answers": [
        "0,002",
        "0,02",
        "0,005",
        "500"
      ],
      "correct": 0,
      "explanation": "ε = ΔL/L₀ = 0,4/200 = 0,002, czyli 0,2%. Odkształcenie jest wielkością bezwymiarową.",
      "hint": "Podziel przyrost długości przez długość początkową, używając tych samych jednostek.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego przy krótkiej, osiowej próbie ściskania siła i skrócenie zwykle opisujemy znakami ujemnymi?",
      "answers": [
        "Bo materiał ma wtedy ujemny moduł E",
        "Bo znak wskazuje zwrot działania względem przyjętego rozciągania",
        "Bo pole przekroju staje się ujemne",
        "Bo naprężenie zawsze musi być dodatnie"
      ],
      "correct": 1,
      "explanation": "Znak jest umową opisującą kierunek: ściskanie działa przeciwnie do rozciągania i zmniejsza długość. Moduł sprężystości oraz pole przekroju pozostają dodatnie.",
      "hint": "Znak opisuje kierunek, a nie „ujemną jakość” materiału.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Okrągłą próbkę o średnicy d = 10 mm rozciągano siłą N = 15,7 kN. Długość pomiarowa L₀ = 100 mm wzrosła o 0,1 mm.",
    "steps": [
      "Pole przekroju: A = πd²/4 = π·10²/4 = 78,54 mm².",
      "Siła N = 15,7 kN = 15 700 N, więc σ = 15 700/78,54 ≈ 200 N/mm² = 200 MPa.",
      "Odkształcenie: ε = ΔL/L₀ = 0,1/100 = 0,001.",
      "Wynik procentowy to 0,001·100% = 0,1%; jest to wydłużenie względne, nie naprężenie."
    ],
    "result": "Próbkę rozciąga naprężenie około 200 MPa, a jej odkształcenie względne wynosi 0,001 (0,1%)."
  }
} satisfies LessonData
