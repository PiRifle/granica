import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-principal",
  "moduleId": "stress-state",
  "number": 3,
  "title": "Naprężenia główne: skrajne wartości bez ścinania",
  "shortTitle": "Naprężenia główne",
  "description": "Znajdź największe i najmniejsze naprężenie normalne oraz zrozumij znaczenie trzeciego kierunku w stanie przestrzennym.",
  "duration": 8,
  "eyebrow": "Niezmienniki stanu",
  "formula": "\\sigma_{1,2}=\\sigma_{avg}\\pm R,\\qquad \\sigma_{avg}=\\frac{\\sigma_x+\\sigma_y}{2},\\qquad R=\\sqrt{\\left(\\frac{\\sigma_x-\\sigma_y}{2}\\right)^2+\\tau_{xy}^2}",
  "formulaNote": "W płaszczyźnie σ1 ≥ σ2. Przy stanie płaskim σz = 0 jest trzecim naprężeniem głównym; do uporządkowania przestrzennego trzeba porównać wszystkie trzy wartości, także zero.",
  "insight": "Średnia przesuwa środek możliwych wartości, a promień R mówi, jak daleko od niej sięgają naprężenia główne. Wzrost ścinania zwiększa R, nawet gdy naprężenia normalne się nie zmieniają.",
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
      "question": "Dla σx = 90 MPa, σy = 30 MPa i τxy = 40 MPa ile wynoszą płaskie naprężenia główne?",
      "answers": [
        "60 MPa i 40 MPa",
        "110 MPa i 10 MPa",
        "130 MPa i −10 MPa"
      ],
      "correct": 1,
      "hint": "Średnia wynosi 60 MPa, a promień oblicz z połowy różnicy i τxy.",
      "explanation": "σavg = 60 MPa, połowa różnicy to 30 MPa, więc R = √(30² + 40²) = 50 MPa. Stąd σ1 = 60 + 50 = 110 MPa i σ2 = 60 − 50 = 10 MPa.",
      "outcome": "U1"
    },
    {
      "question": "W stanie płaskim obliczono σ1 = 20 MPa i σ2 = −70 MPa, a σz = 0. Jakie jest najmniejsze naprężenie główne w opisie przestrzennym?",
      "answers": [
        "0 MPa",
        "−70 MPa",
        "20 MPa"
      ],
      "correct": 1,
      "hint": "Uwzględnij także kierunek z i uporządkuj trzy liczby.",
      "explanation": "Zbiór naprężeń głównych to {20, 0, −70} MPa. Najmniejsze wynosi −70 MPa. Zerowe σz nie zawsze jest skrajną wartością i nie wolno go pominąć.",
      "outcome": "W1"
    },
    {
      "question": "Co jest wspólne dla wszystkich kierunków głównych?",
      "answers": [
        "Naprężenie normalne zawsze jest dodatnie",
        "Naprężenie styczne na odpowiadających im płaszczyznach wynosi zero",
        "Naprężenia główne zawsze są równe co do wartości"
      ],
      "correct": 1,
      "hint": "To właśnie brak jednej składowej wyróżnia te płaszczyzny.",
      "explanation": "Na płaszczyznach głównych τ = 0. Naprężenie normalne może być dodatnie, ujemne lub zerowe, a wartości główne mogą się różnić.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Element ma σx = −20 MPa, σy = 60 MPa, τxy = 30 MPa i σz = 0.",
    "steps": [
      "Średnia płaska: σavg = (−20 + 60)/2 = 20 MPa.",
      "Połowa różnicy: a = (−20 − 60)/2 = −40 MPa; w promieniu używamy jej kwadratu.",
      "R = √[(−40)² + 30²] = 50 MPa.",
      "Płaskie wartości to 20 + 50 = 70 MPa oraz 20 − 50 = −30 MPa."
    ],
    "result": "Po dodaniu σz = 0 i uporządkowaniu: σI = 70 MPa, σII = 0, σIII = −30 MPa. Występuje zarówno rozciąganie, jak i ściskanie."
  }
} satisfies LessonData
