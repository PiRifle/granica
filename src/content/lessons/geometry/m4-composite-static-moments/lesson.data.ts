import type { LessonData } from '../../../model'

export default {
  "id": "m4-composite-static-moments",
  "moduleId": "geometry",
  "number": 2,
  "title": "Momenty statyczne i figury złożone",
  "shortTitle": "Przekroje złożone",
  "description": "Dzielenie przekroju na proste części, sumowanie momentów statycznych i traktowanie otworów jako pól ujemnych.",
  "duration": 8,
  "eyebrow": "Całość jako suma części",
  "formula": "S_x = \\sum A_i \\bar{y}_i, \\qquad S_y = \\sum A_i \\bar{x}_i, \\qquad \\bar{y} = \\frac{S_x}{A}, \\qquad \\bar{x} = \\frac{S_y}{A}",
  "formulaNote": "Aᵢ oraz x̄ᵢ, ȳᵢ to pole i środek i-tej części. Do Sₓ używamy odległości y od osi x, a do Sᵧ — odległości x od osi y. Otwór ma pole ujemne.",
  "insight": "Najczęstszy błąd to uśrednianie samych współrzędnych środków bez uwzględnienia pól. Środek figury złożonej jest średnią ważoną polami, a moment statyczny względem osi przechodzącej przez środek ciężkości wynosi zero.",
  "lab": "centroid",
  "outcomes": [
    "W1 — analizuje udział poszczególnych części w równowadze geometrycznej",
    "W2 — wyznacza osie odniesienia do późniejszych obliczeń zginania",
    "W3 — oblicza charakterystyki przekrojów złożonych i z otworami",
    "U1 — sumuje pola i momenty statyczne oraz wyznacza środek",
    "U2 — lokalizuje osie centralne dla dalszej analizy stanu naprężenia",
    "U3 — ocenia wpływ zmiany geometrii na położenie osi obciążeń"
  ],
  "questions": [
    {
      "question": "Dwie części mają A₁ = 1000 mm², y₁ = 20 mm oraz A₂ = 2000 mm², y₂ = 80 mm. Współrzędna ȳ całości wynosi:",
      "answers": [
        "50 mm",
        "60 mm",
        "66,7 mm",
        "70 mm"
      ],
      "correct": 1,
      "explanation": "ȳ = (1000·20 + 2000·80)/(1000 + 2000) = 180 000/3000 = 60 mm. Nie jest to zwykła średnia 50 mm.",
      "hint": "Zważ współrzędne środków polami obu części.",
      "outcome": "U1"
    },
    {
      "question": "Jak uwzględnić kołowy otwór przy obliczaniu środka ciężkości metodą figur złożonych?",
      "answers": [
        "Jako dodatnie pole w nieskończoności",
        "Jako pole ujemne z rzeczywistym położeniem środka otworu",
        "Jako pole dodatnie i pomnożenie wyniku przez dwa",
        "Otwór nigdy nie wpływa na środek"
      ],
      "correct": 1,
      "explanation": "Otwór usuwa materiał, więc jego pole i moment statyczny odejmujemy. Przyjmujemy Aᵢ < 0, a współrzędne rzeczywistego środka otworu.",
      "hint": "Usunięcie pola oznacza znak przeciwny do dodanego materiału.",
      "outcome": "W3"
    },
    {
      "question": "Ile wynosi moment statyczny całego przekroju względem osi x przechodzącej przez jego środek ciężkości?",
      "answers": [
        "Zawsze zero",
        "Zawsze pole razy wysokość",
        "Tyle co moment bezwładności",
        "Zależy tylko od gęstości"
      ],
      "correct": 0,
      "explanation": "Z definicji ȳ = Sₓ/A. Jeżeli oś x przechodzi przez środek, w jej układzie ȳ = 0, więc także Sₓ = 0.",
      "hint": "Skorzystaj z zależności Sₓ = A·ȳ w układzie osi przechodzącej przez środek.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Przekrój teowy składa się z pionowego środnika 20 × 100 mm i poziomej półki 120 × 20 mm. Mierzymy y od dolnego końca środnika; półka leży na jego górze.",
    "steps": [
      "Środnik: A₁ = 20·100 = 2000 mm², y₁ = 50 mm. Półka: A₂ = 120·20 = 2400 mm², y₂ = 100 + 10 = 110 mm.",
      "Pole całkowite A = 2000 + 2400 = 4400 mm².",
      "Moment statyczny względem dolnej osi x: Sₓ = 2000·50 + 2400·110 = 364 000 mm³.",
      "Środek: ȳ = Sₓ/A = 364 000/4400 = 82,73 mm. Wynik leży między 50 a 110 mm i jest przesunięty ku większej półce."
    ],
    "result": "Pole przekroju wynosi 4400 mm², a środek ciężkości leży 82,73 mm nad dolnym końcem środnika."
  }
} satisfies LessonData
