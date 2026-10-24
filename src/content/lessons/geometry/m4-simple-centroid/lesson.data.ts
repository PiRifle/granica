import type { LessonData } from '../../../model'

export default {
  "id": "m4-simple-centroid",
  "moduleId": "geometry",
  "number": 1,
  "title": "Środek ciężkości figur prostych",
  "shortTitle": "Środek ciężkości",
  "description": "Geometryczny środek figury, osie symetrii i położenie środka ciężkości prostokąta, trójkąta oraz koła.",
  "duration": 7,
  "eyebrow": "Gdzie skupiony jest przekrój?",
  "formula": "\\bar{x} = \\frac{1}{A}\\int_A x\\,dA, \\qquad \\bar{y} = \\frac{1}{A}\\int_A y\\,dA",
  "formulaNote": "A to pole całej figury, a x i y — współrzędne elementu pola dA. Dla jednorodnej figury płaskiej położenie zależy od geometrii, nie od gęstości materiału.",
  "insight": "Symetria ułatwia zadanie, ale figura bez dwóch osi symetrii nadal ma środek ciężkości. Trójkąt ma środek w przecięciu środkowych, w odległości h/3 od podstawy.",
  "lab": "centroid",
  "outcomes": [
    "W1 — analizuje rozmieszczenie pola względem przyjętych osi",
    "W2 — przygotowuje położenie osi do obliczeń wytrzymałościowych",
    "W3 — rozpoznaje środek ciężkości figur prostych",
    "U1 — wyznacza współrzędne środka ciężkości z definicji i symetrii",
    "U2 — ustala osie odniesienia do dalszej analizy tensora naprężenia",
    "U3 — wykorzystuje położenie środka do bezpiecznego i sztywnego ułożenia przekroju"
  ],
  "questions": [
    {
      "question": "Prostokąt ma szerokość b = 100 mm i wysokość h = 200 mm, a jego dolny lewy róg jest początkiem układu. Współrzędne środka ciężkości to:",
      "answers": [
        "(100; 200) mm",
        "(50; 100) mm",
        "(50; 200) mm",
        "(25; 50) mm"
      ],
      "correct": 1,
      "explanation": "Środek prostokąta leży w przecięciu osi symetrii: x̄ = b/2 = 50 mm, ȳ = h/2 = 100 mm.",
      "hint": "Środek prostokąta dzieli każdy wymiar na połowy.",
      "outcome": "U1"
    },
    {
      "question": "Trójkąt ma podstawę na osi x i wysokość h = 120 mm. Jak daleko od podstawy leży jego środek ciężkości?",
      "answers": [
        "20 mm",
        "30 mm",
        "40 mm",
        "60 mm"
      ],
      "correct": 2,
      "explanation": "Dla trójkąta ȳ = h/3 od podstawy, zatem 120/3 = 40 mm. Od wierzchołka odległość wynosi 2h/3.",
      "hint": "Środek ciężkości trójkąta nie leży w połowie wysokości.",
      "outcome": "W3"
    },
    {
      "question": "Figura ma dokładnie jedną pionową oś symetrii. Co można wywnioskować bez dalszych obliczeń?",
      "answers": [
        "Środek ciężkości leży na tej osi",
        "Środek ciężkości leży dokładnie w połowie wysokości",
        "Oba momenty bezwładności są równe",
        "Figura nie ma środka ciężkości"
      ],
      "correct": 0,
      "explanation": "Jedna oś symetrii wyznacza tylko położenie środka na tej osi. Nie daje automatycznie wysokości środka ani równości momentów bezwładności.",
      "hint": "Symetria pionowa informuje o współrzędnej poziomej, nie pionowej.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Prostokąt o b = 80 mm i h = 160 mm ustawiono tak, że dolny lewy róg ma współrzędne (20; 30) mm.",
    "steps": [
      "Względem własnego dolnego lewego rogu środek ma współrzędne b/2 = 40 mm i h/2 = 80 mm.",
      "Dodajemy przesunięcie początku figury: x̄ = 20 + 40 = 60 mm.",
      "Analogicznie ȳ = 30 + 80 = 110 mm.",
      "Wynik leży wewnątrz prostokąta, co jest kontrolą poprawności; przesunięcie całej figury przesuwa także jej środek."
    ],
    "result": "Środek ciężkości prostokąta ma współrzędne (60; 110) mm."
  }
} satisfies LessonData
