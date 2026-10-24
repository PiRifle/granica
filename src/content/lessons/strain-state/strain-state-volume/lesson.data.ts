import type { LessonData } from '../../../model'

export default {
  "id": "strain-state-volume",
  "moduleId": "strain-state",
  "number": 4,
  "title": "Zmiana objętości: ślad odkształcenia",
  "shortTitle": "Dylatacja objętości",
  "description": "Oblicz względną zmianę objętości i powiąż ją ze średnim naprężeniem oraz modułem ściśliwości.",
  "duration": 9,
  "eyebrow": "Kostka zmienia objętość",
  "formula": "\\frac{\\Delta V}{V_0}\\approx\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=\\frac{1-2\\nu}{E}(\\sigma_x+\\sigma_y+\\sigma_z),\\qquad p=-\\frac{\\sigma_x+\\sigma_y+\\sigma_z}{3},\\quad \\frac{\\Delta V}{V_0}=-\\frac{p}{K}",
  "formulaNote": "K = E/[3(1−2ν)] to moduł ściśliwości. Przyjęto dodatnie naprężenia jako rozciągające i dodatnie ciśnienie p jako ściskające. Przybliżenie dla ΔV/V dotyczy małych odkształceń; γ nie wpływa na objętość w pierwszym rzędzie.",
  "insight": "Czyste ścinanie zmienia kształt, ale nie daje pierwszorzędowej zmiany objętości. Dla ν = 0,5 model przewiduje K → ∞, czyli nieściśliwość.",
  "lab": "units",
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
      "question": "Dla εx = 0,002, εy = −0,0005 i εz = −0,0004 ile wynosi przybliżona zmiana objętości?",
      "answers": [
        "+0,0011",
        "−0,0011",
        "+0,0029"
      ],
      "correct": 0,
      "hint": "Dodaj trzy odkształcenia liniowe z uwzględnieniem znaków.",
      "explanation": "ΔV/V0 ≈ 0,002 − 0,0005 − 0,0004 = 0,0011. Objętość rośnie o 0,11%, mimo skurczu w dwóch kierunkach.",
      "outcome": "U1"
    },
    {
      "question": "Jak czyste ścinanie wpływa na objętość w teorii małych odkształceń?",
      "answers": [
        "Nie powoduje zmiany objętości w pierwszym rzędzie",
        "Zawsze podwaja objętość",
        "Powoduje zmianę równą γ³"
      ],
      "correct": 0,
      "hint": "Ślad tensora odkształcenia zawiera składowe normalne, nie styczne.",
      "explanation": "Dla czystego ścinania εx = εy = εz = 0, więc ΔV/V0 ≈ 0. Zmieniają się kąty i kształt, lecz nie objętość w przybliżeniu pierwszego rzędu.",
      "outcome": "W1"
    },
    {
      "question": "Dla p = 100 MPa i K = 2 GPa jaka jest względna zmiana objętości?",
      "answers": [
        "−0,05",
        "−0,005",
        "+0,02"
      ],
      "correct": 0,
      "hint": "2 GPa = 2000 MPa; ciśnienie ściskające zmniejsza objętość.",
      "explanation": "ΔV/V0 = −p/K = −100/2000 = −0,05, czyli zmniejszenie o 5%. Znak wynika z przyjęcia dodatniego p jako ściskania.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Stal: E = 210 GPa, ν = 0,30. Hydrostatyczne ściskanie: σx = σy = σz = −90 MPa.",
    "steps": [
      "Suma naprężeń wynosi −270 MPa, a 1 − 2ν = 0,4.",
      "ΔV/V0 = 0,4·(−270)/210 000 = −108/210 000 = −0,000514286.",
      "Kontrolnie K = 210 000/[3·0,4] = 175 000 MPa.",
      "Ciśnienie p = −(−270)/3 = 90 MPa, więc −p/K = −90/175 000 = −0,000514286."
    ],
    "result": "Objętość zmniejsza się o około 0,000514, czyli 0,0514%. Obie metody dają ten sam wynik."
  }
} satisfies LessonData
