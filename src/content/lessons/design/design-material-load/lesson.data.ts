import type { LessonData } from '../../../model'

export default {
  "id": "design-material-load",
  "moduleId": "design",
  "number": 2,
  "title": "Dobór materiału i obciążenia dopuszczalnego",
  "shortTitle": "Materiał i P dopuszczalne",
  "description": "Porównuj wymaganą wytrzymałość z danymi materiału, wyznaczaj Pdop i pamiętaj o osobnym warunku sztywności.",
  "duration": 8,
  "eyebrow": "Dwie strony nierówności",
  "formula": "P_{dop} = \\frac{k A}{n_{obc}} \\qquad k = \\frac{R_e}{n} \\qquad \\Delta L = \\frac{PL}{EA}",
  "formulaNote": "nobc uwzględnia ewentualny współczynnik obciążenia; jeśli P jest już obciążeniem obliczeniowym, nobc = 1. Najpierw ustal konwencję przyjętą w zadaniu.",
  "insight": "Dobierając Pdop z kilku warunków, przyjmujemy najmniejszą wartość. Przy doborze średnicy z kilku warunków przyjmujemy największy wymagany wymiar.",
  "lab": "tensileTest",
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
      "question": "Pręt ma A = 200 mm², k = 150 MPa, a P jest siłą obliczeniową. Ile wynosi Pdop z wytrzymałości?",
      "answers": [
        "30 kN",
        "75 kN",
        "300 kN"
      ],
      "correct": 0,
      "hint": "P = kA; 1 MPa·mm² = 1 N.",
      "explanation": "Pdop = 150·200 = 30 000 N = 30 kN. Współczynnik obciążenia nie jest ponownie stosowany, bo P jest obliczeniowe.",
      "outcome": "U1"
    },
    {
      "question": "Warunek wytrzymałości daje Pdop = 42 kN, a warunek wydłużenia 35 kN. Jaką wartość przyjąć?",
      "answers": [
        "42 kN",
        "38,5 kN",
        "35 kN"
      ],
      "correct": 2,
      "hint": "Oba warunki muszą być spełnione jednocześnie.",
      "explanation": "Przyjmujemy min(42, 35) = 35 kN. Przy większej sile warunek sztywności zostałby naruszony, mimo zapasu wytrzymałości.",
      "outcome": "U3"
    },
    {
      "question": "Dwa materiały mają takie samo E, ale różne Re. Jak zmiana na większe Re wpłynie na pręt przy stałej sile i geometrii?",
      "answers": [
        "Zwiększy zapas, ale nie zmieni sprężystego wydłużenia",
        "Zmniejszy wydłużenie o połowę",
        "Nie zmieni niczego"
      ],
      "correct": 0,
      "hint": "Rozdziel Re w warunku wytrzymałości od E w prawie Hooke’a.",
      "explanation": "Większe Re zwiększa k i zapas n. Przy niezmienionych E, A, L i P wydłużenie PL/(EA) pozostaje takie samo.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Pręt A = 250 mm² ma k = 160 MPa. Z warunku wydłużenia wynika P ≤ 32 kN.",
    "steps": [
      "Z wytrzymałości: Pdop = kA = 160·250 = 40 000 N = 40 kN.",
      "Z warunku sztywności: Pdop = 32 kN.",
      "Przyjmujemy mniejszą wartość: min(40, 32) = 32 kN."
    ],
    "result": "Obciążenie dopuszczalne wynosi 32 kN i decyduje o nim warunek sztywności."
  }
} satisfies LessonData
