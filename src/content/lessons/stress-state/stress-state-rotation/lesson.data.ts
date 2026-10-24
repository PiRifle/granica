import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-rotation",
  "moduleId": "stress-state",
  "number": 2,
  "title": "Obrót przekroju: ten sam stan, inne liczby",
  "shortTitle": "Transformacja obrotu",
  "description": "Oblicz naprężenia na ścianach obróconego elementu i sprawdź, które wielkości nie zależą od wyboru osi.",
  "duration": 8,
  "eyebrow": "Zmień perspektywę",
  "formula": "\\sigma_n=\\sigma_{avg}+a\\cos2\\theta+\\tau_{xy}\\sin2\\theta,\\quad \\tau_{nt}=-a\\sin2\\theta+\\tau_{xy}\\cos2\\theta,\\quad a=\\frac{\\sigma_x-\\sigma_y}{2}",
  "formulaNote": "σavg = (σx + σy)/2, a θ to obrót osi n względem x. Przyjmujemy dodatni τxy na dodatniej ścianie x w stronę dodatniej osi y. Kąt pojawia się jako 2θ, dlatego obrót o 90° daje pełny cykl na kole Mohra.",
  "insight": "Suma σn + σt = σx + σy jest stała przy obrocie. Zmieniają się składowe, ale średnia i naprężenia główne pozostają niezmienne.",
  "lab": "stressTransform",
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
      "question": "Dla σx = 100 MPa, σy = 20 MPa i τxy = 0 ile wynoszą σn i τnt po obrocie osi o 45°?",
      "answers": [
        "σn = 60 MPa, τnt = −40 MPa",
        "σn = 120 MPa, τnt = 0",
        "σn = 40 MPa, τnt = 60 MPa"
      ],
      "correct": 0,
      "hint": "Dla 2θ = 90° cosinus jest zerowy, a sinus równy 1.",
      "explanation": "σavg = 60 MPa i a = 40 MPa. Zatem σn = 60 + 40·0 + 0 = 60 MPa, a τnt = −40·1 + 0 = −40 MPa. Znak τ opisuje stronę działania w przyjętym układzie.",
      "outcome": "U1"
    },
    {
      "question": "Która wielkość nie zmienia się przy obrocie osi w płaszczyźnie xy?",
      "answers": [
        "σx − σy",
        "σx + σy",
        "τxy"
      ],
      "correct": 1,
      "hint": "Dodaj do siebie naprężenia normalne na dwóch prostopadłych ścianach.",
      "explanation": "Pierwszy niezmiennik płaskiego stanu wynosi σx + σy. Pojedyncze składowe i różnica ulegają transformacji, ale ich suma pozostaje stała.",
      "outcome": "W1"
    },
    {
      "question": "W czystym ścinaniu σx = σy = 0 i τxy = 50 MPa. Jakie naprężenie normalne występuje dla θ = 45°?",
      "answers": [
        "0 MPa",
        "50 MPa",
        "100 MPa"
      ],
      "correct": 1,
      "hint": "Pozostaje wyraz τxy sin2θ.",
      "explanation": "Dla θ = 45° mamy sin90° = 1, więc σn = 50 MPa. Czyste ścinanie jest więc równoważne rozciąganiu i ściskaniu o wartości 50 MPa w kierunkach głównych.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "σx = 120 MPa, σy = 40 MPa, τxy = 30 MPa. Wyznacz składowe dla θ = 30°.",
    "steps": [
      "Obliczamy σavg = (120 + 40)/2 = 80 MPa oraz a = (120 − 40)/2 = 40 MPa.",
      "Dla 2θ = 60°: cos60° = 0,5 i sin60° ≈ 0,8660.",
      "σn = 80 + 40·0,5 + 30·0,8660 = 125,98 MPa.",
      "τnt = −40·0,8660 + 30·0,5 = −19,64 MPa."
    ],
    "result": "Na obróconym przekroju σn ≈ 126,0 MPa i τnt ≈ −19,6 MPa. Na przekroju prostopadłym σt = 160 − 125,98 = 34,02 MPa, co potwierdza stałość sumy."
  }
} satisfies LessonData
