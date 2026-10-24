import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-tensor",
  "moduleId": "stress-state",
  "number": 1,
  "title": "Tensor naprężenia: mapa sił w punkcie",
  "shortTitle": "Składowe tensora",
  "description": "Uporządkuj naprężenia normalne i styczne oraz zobacz, dlaczego sama wartość σx nie opisuje całego obciążenia.",
  "duration": 7,
  "eyebrow": "Punkt pod lupą",
  "formula": "\\boldsymbol{\\sigma}=\\begin{bmatrix}\\sigma_x&\\tau_{xy}&\\tau_{xz}\\\\\\tau_{xy}&\\sigma_y&\\tau_{yz}\\\\\\tau_{xz}&\\tau_{yz}&\\sigma_z\\end{bmatrix}",
  "formulaNote": "σ opisuje działanie prostopadłe do ściany, a τ styczne. Dodatnie σ oznacza rozciąganie. Równość τxy = τyx i analogiczne pary wynika z równowagi momentów elementarnej kostki bez momentów objętościowych.",
  "insight": "Tensor zawiera sześć niezależnych składowych. Obrót układu współrzędnych zmienia ich wartości, ale nie zmienia fizycznego stanu obciążenia w punkcie.",
  "lab": "stress",
  "outcomes": [
    "W1 — analizuje stan naprężenia w punkcie i dobiera składowe do opisu elementu",
    "W2 — rozpoznaje przypadki wytrzymałościowe związane z rozciąganiem, ściskaniem i ścinaniem",
    "W3 — odróżnia wpływ geometrii przekroju i kierunku przekroju na naprężenia",
    "U1 — oblicza składowe po obrocie, naprężenia główne i maksymalne naprężenie styczne",
    "U2 — kreśli i interpretuje koło Mohra oraz wyznacza kierunki główne",
    "U3 — wykorzystuje wyniki analizy do bezpiecznego i sztywnego doboru elementu"
  ],
  "questions": [
    {
      "question": "Ile niezależnych składowych ma symetryczny tensor naprężenia w opisie przestrzennym?",
      "answers": [
        "3",
        "6",
        "9"
      ],
      "correct": 1,
      "hint": "Policz trzy składowe na przekątnej i trzy różne pary składowych stycznych.",
      "explanation": "Macierz ma dziewięć pól, ale symetria daje τxy = τyx, τxz = τzx i τyz = τzy. Pozostaje 3 naprężenia normalne + 3 niezależne styczne = 6.",
      "outcome": "W1"
    },
    {
      "question": "W pewnym punkcie σx = 80 MPa, a wszystkie pozostałe składowe wynoszą zero. Co opisuje taki stan?",
      "answers": [
        "Jednoosiowe rozciąganie w kierunku x",
        "Czyste ścinanie",
        "Jednakowe ściskanie we wszystkich kierunkach"
      ],
      "correct": 0,
      "hint": "Jest tylko jedno dodatnie naprężenie normalne.",
      "explanation": "Dodatnie σx oznacza rozciąganie prostopadłe do ściany normalnej do osi x. Zerowe pozostałe składowe dają klasyczny stan jednoosiowy, mimo że w innych przekrojach można wykazać naprężenia styczne.",
      "outcome": "W2"
    },
    {
      "question": "Dlaczego zmiana nazw osi x i y nie może sama w sobie zmienić nośności elementu?",
      "answers": [
        "Bo tensor zawsze jest zerowy",
        "Bo opisuje ten sam fizyczny stan, tylko w innych współrzędnych",
        "Bo znikają wszystkie naprężenia styczne"
      ],
      "correct": 1,
      "hint": "Odróżnij fizyczne obciążenie od sposobu jego zapisu.",
      "explanation": "Obrót osi przekształca składowe tensora według ścisłych zależności. Niezmienniki, naprężenia główne i fizyczne skutki pozostają takie same, więc sama zmiana opisu nie zmienia bezpieczeństwa.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "W punkcie płyty: σx = 100 MPa, σy = −40 MPa, τxy = 30 MPa; pozostałe składowe są zerowe.",
    "steps": [
      "Na przekątnej wpisujemy naprężenia normalne: 100, −40 i 0 MPa.",
      "W pola (x,y) i (y,x) wpisujemy 30 MPa, korzystając z symetrii tensora.",
      "Odczytujemy rozciąganie w kierunku x, ściskanie w kierunku y oraz obecność ścinania w płaszczyźnie xy."
    ],
    "result": "Tensor ma postać [[100, 30, 0], [30, −40, 0], [0, 0, 0]] MPa. To stan płaski, ale nie jednoosiowy: do pełnej oceny potrzebne są także σy i τxy."
  }
} satisfies LessonData
