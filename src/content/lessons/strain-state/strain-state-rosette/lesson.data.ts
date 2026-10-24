import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-rosette",
  "moduleId": "strain-state",
  "number": 6,
  "title": "Rozeta 0°/45°/90°: trzy odczyty, pełny obraz",
  "shortTitle": "Rozeta tensometryczna",
  "description": "Wyznacz εx, εy i γxy z trzech kierunków, a następnie oblicz odkształcenia główne i maksymalne ścinanie.",
  "duration": 9,
  "eyebrow": "Trzy kierunki wystarczą",
  "formula": "\\varepsilon_\\theta=\\varepsilon_{avg}+a\\cos2\\theta+\\frac{\\gamma_{xy}}{2}\\sin2\\theta,\\quad \\gamma_{xy}=2\\varepsilon_{45}-\\varepsilon_0-\\varepsilon_{90}",
  "formulaNote": "Dla rozety 0°/45°/90°: εx = ε0, εy = ε90. Następnie ε1,2 = (εx+εy)/2 ± √{[(εx−εy)/2]² + (γxy/2)²}, a inżynierskie γmax(xy) = 2Rε.",
  "insight": "Koło odkształceń rysuje się w osiach (ε, γ/2), nie (ε, γ). Odczyt 45° zawiera informację o ścinaniu; bez niego nie można jednoznacznie wyznaczyć γxy.",
  "lab": "rosette",
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
      "question": "Rozeta dała ε0 = 600 µε, ε45 = 300 µε, ε90 = −200 µε. Ile wynosi γxy?",
      "answers": [
        "200 µrad",
        "400 µrad",
        "1000 µrad"
      ],
      "correct": 0,
      "hint": "Użyj 2ε45 − ε0 − ε90 i zachowaj znaki.",
      "explanation": "γxy = 2·300 − 600 − (−200) = 200 µrad. Wszystkie odczyty są w µε, więc wynik wychodzi bezpośrednio w mikroradianach.",
      "outcome": "U1"
    },
    {
      "question": "Dla εx = 500 µε, εy = 100 µε i γxy = 600 µrad ile wynoszą odkształcenia główne?",
      "answers": [
        "Około 661 µε i −61 µε",
        "800 µε i −200 µε",
        "600 µε i 200 µε"
      ],
      "correct": 0,
      "hint": "Średnia to 300 µε, a do promienia wstaw γxy/2 = 300 µε.",
      "explanation": "Rε = √(200² + 300²) = 360,555 µε. Zatem ε1 ≈ 660,56 µε i ε2 ≈ −60,56 µε, czyli po zaokrągleniu 661 µε i −61 µε.",
      "outcome": "U2"
    },
    {
      "question": "W jakich osiach należy narysować koło Mohra dla odkształceń przy inżynierskim γxy?",
      "answers": [
        "(ε, γ/2)",
        "(ε, γ)",
        "(σ, τ)"
      ],
      "correct": 0,
      "hint": "Transformacja odkształceń ma tę samą postać co naprężeń po zastąpieniu τ przez γ/2.",
      "explanation": "Na osi poziomej jest ε, a na pionowej γ/2. Użycie γ bez podzielenia przez dwa podwoiłoby promień i zaburzyłoby interpretację kątów.",
      "outcome": "U2"
    }
  ],
  "workedExample": {
    "given": "Odczyty rozety: ε0 = 800 µε, ε45 = 500 µε, ε90 = 200 µε.",
    "steps": [
      "εx = 800 µε i εy = 200 µε.",
      "γxy = 2·500 − 800 − 200 = 0 µrad.",
      "Średnia εavg = (800 + 200)/2 = 500 µε.",
      "Rε = √{[(800 − 200)/2]² + 0²} = 300 µε."
    ],
    "result": "ε1 = 800 µε, ε2 = 200 µε i γmax(xy) = 600 µrad. Zerowe γxy oznacza, że osie x i y są już kierunkami głównymi w tym pomiarze."
  }
} satisfies LessonData
