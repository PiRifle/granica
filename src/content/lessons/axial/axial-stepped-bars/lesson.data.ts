import type { LessonData } from '../../../model'

export default {
  "id": "axial-stepped-bars",
  "moduleId": "axial",
  "number": 3,
  "title": "Pręty schodkowe: ta sama siła, inne σ",
  "shortTitle": "Pręty schodkowe",
  "description": "Analizuj odcinki o różnych przekrojach i wskaż miejsce największego naprężenia.",
  "duration": 8,
  "eyebrow": "Geometria zmienia obciążenie materiału",
  "formula": "\\sigma_i=\\frac{N_i}{A_i},\\qquad |\\sigma|_{\\max}=\\max_i\\left|\\frac{N_i}{A_i}\\right|",
  "formulaNote": "Każdy odcinek ma własne Ni i Ai. Przy nagłej zmianie średnicy rzeczywiste maksimum lokalne zależy także od karbu; N/A daje wartość nominalną.",
  "insight": "Nie wystarczy znaleźć maksymalne |N| dla całego pręta. Decyduje największa wartość ilorazu |Ni|/Ai, dlatego trzeba sprawdzić wszystkie odcinki.",
  "lab": "steppedBar",
  "outcomes": [
    "W1 — dzieli pręt schodkowy na jednorodne odcinki obliczeniowe",
    "W2 — rozpoznaje rozciąganie i ściskanie na kolejnych odcinkach",
    "W3 — ocenia wpływ zmiany pola na naprężenia nominalne",
    "U1 — oblicza naprężenia i wskazuje przekrój decydujący",
    "U2 — opisuje stan naprężenia osobno dla każdego odcinka",
    "U3 — dobiera najsłabszy odcinek z zachowaniem bezpieczeństwa"
  ],
  "solutionId": "cw1-2",
  "questions": [
    {
      "question": "Pręt schodkowy bez obciążeń pośrednich ma dwa odcinki o polach 300 i 150 mm². Gdzie występuje większe nominalne |σ|?",
      "answers": [
        "Na odcinku 150 mm²",
        "Na odcinku 300 mm²",
        "Naprężenia są zawsze jednakowe"
      ],
      "correct": 0,
      "hint": "Oba odcinki przenoszą tę samą N.",
      "explanation": "Przy tej samej N mniejsze pole daje większe |N/A|. Dla 150 mm² naprężenie jest dwa razy większe niż dla 300 mm².",
      "outcome": "W3"
    },
    {
      "question": "Na kolejnych odcinkach |N| wynosi 20 i 30 kN, a pola 200 i 400 mm². Który odcinek decyduje o maksymalnym |σ|?",
      "answers": [
        "Pierwszy: 100 MPa",
        "Drugi: 75 MPa",
        "Żaden, trzeba uśrednić naprężenia"
      ],
      "correct": 0,
      "hint": "Oblicz osobno oba ilorazy |N|/A, pamiętając o kN → N.",
      "explanation": "Pierwszy odcinek: 20 000/200 = 100 MPa. Drugi: 30 000/400 = 75 MPa. Mimo większej siły na drugim odcinku decyduje pierwszy.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego naprężenie N/A przy nagłym zwężeniu nazywamy nominalnym?",
      "answers": [
        "Bo nie opisuje lokalnej koncentracji przy przejściu geometrycznym",
        "Bo nie zależy od siły osiowej",
        "Bo jest zawsze równe zero w mniejszym przekroju"
      ],
      "correct": 0,
      "hint": "Prosty wzór zakłada równomierny rozkład z dala od zakłóceń.",
      "explanation": "Nagła zmian geometrii zaburza równomierny rozkład i może powodować karb. N/A opisuje naprężenie nominalne, a lokalne maksimum wymaga dodatkowego współczynnika lub dokładniejszej analizy.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Dwa szeregowo połączone odcinki przenoszą rozciągającą N = 60 kN. Ich pola wynoszą A₁ = 300 mm² i A₂ = 150 mm². Oblicz naprężenia nominalne.",
    "steps": [
      "Ponieważ nie ma obciążeń pośrednich, N₁ = N₂ = +60 000 N.",
      "Dla pierwszego odcinka: σ₁ = 60 000/300 = 200 MPa.",
      "Dla drugiego odcinka: σ₂ = 60 000/150 = 400 MPa.",
      "Porównaj wartości bezwzględne: 400 MPa > 200 MPa, więc decyduje węższy odcinek."
    ],
    "result": "σ₁ = +200 MPa, σ₂ = +400 MPa; maksymalne nominalne naprężenie rozciągające wynosi 400 MPa."
  }
} satisfies LessonData
