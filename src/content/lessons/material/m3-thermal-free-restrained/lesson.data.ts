import type { LessonData } from '../../../model'

export default {
  "id": "m3-thermal-free-restrained",
  "moduleId": "material",
  "number": 5,
  "title": "Temperatura: swoboda i zablokowanie",
  "shortTitle": "Efekt temperatury",
  "description": "Różnica między swobodną zmianą długości a naprężeniem powstającym, gdy podpory uniemożliwiają odkształcenie termiczne.",
  "duration": 9,
  "eyebrow": "Gdy materiał chce się rozszerzyć",
  "formula": "\\Delta L_T = \\alpha \\Delta T L, \\qquad \\sigma = -E\\alpha\\Delta T",
  "formulaNote": "α to współczynnik liniowej rozszerzalności cieplnej, ΔT — zmiana temperatury. Drugi wzór dotyczy jednorodnego pręta z całkowicie zablokowaną zmianą długości i liniową sprężystością; minus przy ogrzewaniu oznacza ściskanie.",
  "insight": "Swobodne odkształcenie termiczne nie musi oznaczać naprężenia. Naprężenie powstaje z ograniczenia odkształcenia, a nie z samej obecności temperatury.",
  "lab": "thermal",
  "outcomes": [
    "W1 — analizuje współdziałanie pręta i podpór przy zmianie temperatury",
    "W2 — odróżnia odkształcenie termiczne od naprężenia termicznego",
    "W3 — uwzględnia długość i szczelinę w ocenie deformacji",
    "U1 — oblicza zmiany długości i naprężenia termiczne",
    "U2 — określa znak naprężenia osiowego do analizy kołem Mohra",
    "U3 — projektuje odkształcenia i naprężenia bez przekroczenia warunków bezpieczeństwa"
  ],
  "solutionId": "cw2-2",
  "questions": [
    {
      "question": "Stalowy pręt L = 2 m ogrzano o 50°C. Dla α = 12·10⁻⁶ 1/°C swobodne wydłużenie wynosi:",
      "answers": [
        "0,12 mm",
        "1,2 mm",
        "12 mm",
        "120 mm"
      ],
      "correct": 1,
      "explanation": "ΔLₜ = αΔTL = 12·10⁻⁶·50·2000 mm = 1,2 mm.",
      "hint": "Podstaw długość w mm; współczynnik 10⁻⁶ oznacza milionowe części.",
      "outcome": "U1"
    },
    {
      "question": "Ten sam pręt jest idealnie zablokowany między nieruchomymi podporami. Przy E = 200 GPa ogrzanie o 50°C wywołuje w modelu liniowo sprężystym:",
      "answers": [
        "120 MPa rozciągania",
        "120 MPa ściskania",
        "1,2 MPa ściskania",
        "zerowe naprężenie, bo temperatura działa równomiernie"
      ],
      "correct": 1,
      "explanation": "|σ| = EαΔT = 200 000·12·10⁻⁶·50 = 120 MPa. Podpory hamują rozszerzanie, więc pręt jest ściskany.",
      "hint": "Najpierw oblicz odkształcenie termiczne αΔT, a potem pomnóż przez E i ustal znak.",
      "outcome": "U1"
    },
    {
      "question": "Ogrzany pręt może swobodnie wydłużyć się o 2 mm, a następnie opiera się o sztywną przeszkodę. Co stanie się przy dalszym wzroście temperatury?",
      "answers": [
        "Naprężenie pozostanie zerowe przy każdej temperaturze",
        "Naprężenie ściskające może narastać dopiero po zamknięciu luzu",
        "Pręt przestanie się rozszerzać termicznie",
        "Pojawi się wyłącznie rozciąganie"
      ],
      "correct": 1,
      "explanation": "Przed wykorzystaniem luzu odkształcenie jest swobodne. Po kontakcie dalsza rozszerzalność jest ograniczana, więc reakcja przeszkody wywołuje ściskanie.",
      "hint": "Rozdziel ruch przed kontaktem i ograniczenie ruchu po kontakcie.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Szyna stalowa ma długość L = 12 m, α = 12·10⁻⁶ 1/°C i ogrzewa się o ΔT = 30°C. E = 200 GPa.",
    "steps": [
      "Swobodne wydłużenie: ΔLₜ = αΔTL = 12·10⁻⁶·30·12 000 = 4,32 mm.",
      "Jeśli końce są swobodne, ta zmiana długości nie wymaga osiowej reakcji i nie wywołuje naprężenia termicznego.",
      "Przy pełnym zablokowaniu ε = 0, więc sprężyste odkształcenie mechaniczne równoważy termiczne: εₘ = −αΔT = −0,00036.",
      "Naprężenie zablokowanej szyny: σ = Eεₘ = 200 000·(−0,00036) = −72 MPa."
    ],
    "result": "Swobodna szyna wydłuży się o 4,32 mm bez naprężenia od samej temperatury; całkowite zablokowanie dałoby w modelu sprężystym 72 MPa ściskania."
  }
} satisfies LessonData
