import type { LessonData } from '../../../model'

export default {
  "id": "design-section-dimension",
  "moduleId": "design",
  "number": 1,
  "title": "Dobór wymiaru z warunku wytrzymałości",
  "shortTitle": "Dobór wymiaru",
  "description": "Odwracaj warunek naprężeniowy, wyznaczaj wymagany wskaźnik przekroju i dobieraj średnicę z poprawną potęgą.",
  "duration": 7,
  "eyebrow": "Od warunku do wymiaru",
  "formula": "W \\geq \\frac{M}{k} \\qquad W = \\frac{\\pi d^3}{32} \\Rightarrow d \\geq \\sqrt[3]{\\frac{32M}{\\pi k}}",
  "formulaNote": "Dla pełnego przekroju kołowego zginanego. Jeśli M jest w N·mm, a k w MPa = N/mm², to W wychodzi w mm³, a d w mm.",
  "insight": "Wymagane W rośnie liniowo z momentem, ale średnica rośnie dopiero z pierwiastkiem trzeciego stopnia z W. Dlatego podwojenie momentu nie wymaga podwojenia średnicy.",
  "lab": "bending",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "questions": [
    {
      "question": "Moment wynosi 2 kN·m, a k = 100 MPa. Ile wynosi wymagane W?",
      "answers": [
        "20 mm³",
        "2000 mm³",
        "20 000 mm³"
      ],
      "correct": 2,
      "hint": "2 kN·m = 2 000 000 N·mm, a 100 MPa = 100 N/mm².",
      "explanation": "W = M/k = 2 000 000/100 = 20 000 mm³. Bez zamiany kN·m na N·mm wynik byłby 1000 razy za mały.",
      "outcome": "U1"
    },
    {
      "question": "Jak zmieni się minimalna średnica, gdy moment wzrośnie 8 razy?",
      "answers": [
        "Wzrośnie 2 razy",
        "Wzrośnie 8 razy",
        "Spadnie 2 razy"
      ],
      "correct": 0,
      "hint": "d jest proporcjonalne do pierwiastka trzeciego stopnia z M.",
      "explanation": "d2/d1 = ∛8 = 2. Ośmiokrotny moment wymaga dwukrotnej średnicy, bo W pełnego koła rośnie z d³.",
      "outcome": "W3"
    },
    {
      "question": "Obliczenia dają dmin = 37,2 mm, a dostępne są średnice co 1 mm. Którą wybrać przy braku innych wymagań?",
      "answers": [
        "37 mm",
        "38 mm",
        "Dowolną, różnica jest mała"
      ],
      "correct": 1,
      "hint": "Wybierz najbliższy wymiar nie mniejszy od wymaganego.",
      "explanation": "37 mm dałoby W poniżej wymaganego i nadmierne naprężenie. 38 mm jest najmniejszą dostępną średnicą spełniającą warunek.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Zginany pręt pełny ma M = 1 kN·m i k = 125 MPa.",
    "steps": [
      "M = 1 000 000 N·mm; wymagane W = 1 000 000/125 = 8000 mm³.",
      "dmin = ∛(32W/π) = ∛(32·8000/π) = 43,35 mm.",
      "Przy doborze co 1 mm przyjmujemy d = 44 mm."
    ],
    "result": "Wymagane W = 8000 mm³, a przyjmowana średnica to 44 mm."
  }
} satisfies LessonData
