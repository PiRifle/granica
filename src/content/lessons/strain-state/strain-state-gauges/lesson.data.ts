import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-gauges",
  "moduleId": "strain-state",
  "number": 5,
  "title": "Tensometry: od oporu do odkształcenia",
  "shortTitle": "Pomiar tensometryczny",
  "description": "Zrozumij zasadę pomiaru, bazę czujnika, kierunkowość i najważniejsze źródła błędów.",
  "duration": 9,
  "eyebrow": "Zobacz niewidzialne",
  "formula": "GF=\\frac{\\Delta R/R_0}{\\varepsilon},\\qquad \\Delta R/R_0=GF\\cdot\\varepsilon",
  "formulaNote": "GF to współczynnik czułości (gauge factor), R0 opór początkowy, a ε odkształcenie wzdłuż osi czujnika. Poprawny pomiar wymaga dobrej adhezji, właściwego mostka pomiarowego i kompensacji wpływu temperatury.",
  "insight": "Pomiar 1000 µε oznacza zmianę oporu rzędu tylko około 0,2% dla GF ≈ 2. Dlatego błędy montażu, dryft temperatury i kierunek klejenia mają praktyczne znaczenie.",
  "lab": "tensileTest",
  "outcomes": [
    "W1 — analizuje odkształcenia liniowe i postaciowe w elemencie konstrukcyjnym",
    "W2 — rozpoznaje sprężyste przypadki wytrzymałościowe z udziałem efektu Poissona",
    "W3 — wiąże geometrię, zmianę objętości i położenie czujników z mierzonymi wielkościami",
    "U1 — oblicza odkształcenia z uogólnionego prawa Hooke’a i danych tensometrycznych",
    "U2 — przekształca pomiary rozety w koło Mohra odkształceń i wielkości główne",
    "U3 — dobiera parametry materiałowe i geometryczne z uwagi na bezpieczeństwo oraz sztywność"
  ],
  "questions": [
    {
      "question": "Tensometr ma R0 = 120 Ω, GF = 2,0 i mierzy ε = 800 µε. Jaka jest zmiana oporu ΔR?",
      "answers": [
        "0,192 Ω",
        "1,92 Ω",
        "19,2 Ω"
      ],
      "correct": 0,
      "hint": "Najpierw zamień 800 µε na 0,0008.",
      "explanation": "ΔR = GF·ε·R0 = 2·0,0008·120 = 0,192 Ω. Względna zmiana oporu wynosi 0,0016, czyli 0,16%.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego pojedynczy tensometr nie wystarcza do wyznaczenia pełnego płaskiego stanu odkształcenia?",
      "answers": [
        "Bo daje jedną liczbę dla jednego kierunku",
        "Bo nie mierzy odkształceń dodatnich",
        "Bo zawsze mierzy wyłącznie γxy"
      ],
      "correct": 0,
      "hint": "Płaski stan wymaga trzech niezależnych składowych.",
      "explanation": "Jeden odczyt daje εθ dla osi czujnika. Do wyznaczenia εx, εy i γxy potrzeba co najmniej trzech niezależnych pomiarów w różnych kierunkach, np. rozety.",
      "outcome": "W3"
    },
    {
      "question": "Czujnik o bazie 10 mm jest umieszczony w obszarze gwałtownie zmiennego odkształcenia. Co odczyta?",
      "answers": [
        "Dokładnie wartość maksymalną w jednym punkcie",
        "Średnią na bazie, która może ukryć lokalny pik",
        "Zawsze zero"
      ],
      "correct": 1,
      "hint": "Czujnik ma skończoną długość i integruje deformację przyklejonego odcinka.",
      "explanation": "Tensometr uśrednia odkształcenie wzdłuż bazy. Przy dużym gradiencie krótsza baza może lepiej uchwycić lokalną zmienność, ale nadal nie daje idealnej wartości punktowej.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Czujnik: R0 = 350 Ω, GF = 2,10. Mostek wyznaczył ΔR = 0,147 Ω. Oblicz odkształcenie.",
    "steps": [
      "Względna zmiana oporu: ΔR/R0 = 0,147/350 = 0,00042.",
      "Odkształcenie: ε = (ΔR/R0)/GF = 0,00042/2,10 = 0,0002.",
      "Przeliczenie: 0,0002·10⁶ = 200 µε."
    ],
    "result": "Czujnik wskazuje ε = 200 µε. Jest to wydłużenie względne 0,02% w kierunku jego osi, uśrednione na bazie."
  }
} satisfies LessonData
