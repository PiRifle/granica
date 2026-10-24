import type { LessonData } from '../../../model'

export default {
  "id": "foundations-saint-venant",
  "moduleId": "foundations",
  "number": 7,
  "title": "Zasada Saint-Venanta: dystans od detalu",
  "shortTitle": "Saint-Venant",
  "description": "Oceń, kiedy lokalny sposób przyłożenia siły przestaje decydować o rozkładzie naprężeń.",
  "duration": 10,
  "eyebrow": "Lokalnie skomplikowanie, dalej prościej",
  "formula": "\\sigma_{\\mathrm{sr}}=\\frac{N}{A}\\quad\\text{z dala od strefy przyłożenia obciążenia}",
  "formulaNote": "Zasada Saint-Venanta nie podaje jednej uniwersalnej odległości dla każdego detalu. Blisko karbów, otworów i mocowań trzeba osobno analizować koncentrację naprężeń.",
  "insight": "Równość wypadkowych sił i momentów nie oznacza identycznych naprężeń wszędzie. Upraszczając obciążenie, akceptujemy różnice lokalne, ale musimy wiedzieć, gdzie model przestaje wystarczać.",
  "lab": "saintVenant",
  "outcomes": [
    "W1 — ocenia zasięg uproszczeń modelu elementu",
    "W2 — rozróżnia średnie naprężenie osiowe od lokalnej koncentracji",
    "W3 — wiąże rozmiar przekroju i detal mocowania ze strefą zaburzeń",
    "U1 — oblicza naprężenie średnie poza strefą lokalną",
    "U2 — wskazuje ograniczenia uproszczonego opisu stanu naprężenia",
    "U3 — wybiera przekroje, w których prosty dobór jest zasadny"
  ],
  "questions": [
    {
      "question": "Dwa sposoby przyłożenia obciążenia na końcu pręta mają tę samą wypadkową siłę i moment. Co wynika z zasady Saint-Venanta?",
      "answers": [
        "Naprężenia są identyczne w każdym punkcie pręta",
        "Różnice naprężeń są istotne głównie blisko miejsca przyłożenia i zanikają z odległością",
        "Naprężenia są zerowe z dala od końca"
      ],
      "correct": 1,
      "hint": "Statyczna równoważność dotyczy skutku odległego, nie każdego lokalnego detalu.",
      "explanation": "Zasada mówi, że statycznie równoważne obciążenia dają praktycznie ten sam stan naprężeń wystarczająco daleko od strefy przyłożenia. Blisko tej strefy rozkłady mogą się znacznie różnić.",
      "outcome": "W1"
    },
    {
      "question": "Dlaczego wzoru σ = N/A nie należy bezrefleksyjnie stosować tuż przy małym otworze w rozciąganej taśmie?",
      "answers": [
        "Bo siła osiowa znika przy otworze",
        "Bo otwór powoduje nierównomierny rozkład i lokalną koncentrację naprężeń",
        "Bo naprężenie zawsze mierzy się w innych jednostkach"
      ],
      "correct": 1,
      "hint": "Zasada Saint-Venanta nie usuwa koncentracji spowodowanej geometrią.",
      "explanation": "Otwór zmienia drogę przenoszenia siły i powoduje lokalne maksima naprężeń. Średnie N/A nie opisuje tych maksimów, które są istotne dla bezpieczeństwa.",
      "outcome": "W3"
    },
    {
      "question": "Pręt o A = 1250 mm² przenosi N = 75 kN. Jakie średnie naprężenie osiowe można przyjąć z dala od mocowania?",
      "answers": [
        "6 MPa",
        "60 MPa",
        "600 MPa"
      ],
      "correct": 1,
      "hint": "Przelicz 75 kN na 75 000 N i podziel przez pole.",
      "explanation": "σśr = 75 000 N / 1250 mm² = 60 N/mm² = 60 MPa. Jest to wartość średnia dla prostego modelu osiowego, nie gwarancja maksimum przy mocowaniu.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Pręt kołowy o średnicy d = 40 mm jest osiowo rozciągany siłą P = 80 kN. Oszacuj naprężenie w przekroju odległym od mocowania.",
    "steps": [
      "Oblicz pole przekroju: A = πd²/4 = π·40²/4 ≈ 1256,64 mm².",
      "Przelicz siłę: P = 80 kN = 80 000 N.",
      "Z dala od strefy mocowania przyjmij równomierny model: σśr = P/A.",
      "Podstaw: σśr = 80 000/1256,64 ≈ 63,66 N/mm².",
      "Zaznacz, że przy samym mocowaniu może występować inny, lokalny rozkład naprężeń."
    ],
    "result": "W przekroju odległym od mocowania σśr ≈ 63,7 MPa (rozciąganie); wynik nie opisuje lokalnego maksimum przy detalu."
  }
} satisfies LessonData
