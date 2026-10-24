import type { LessonData } from '../../../model'

export default {
  "id": "stress-state-tau-max",
  "moduleId": "stress-state",
  "number": 5,
  "title": "Maksymalne ścinanie: płaskie i absolutne",
  "shortTitle": "τ maksymalne",
  "description": "Rozróżnij promień płaskiego koła od maksymalnego ścinania w pełnym stanie przestrzennym.",
  "duration": 9,
  "eyebrow": "Nie pomiń trzeciej osi",
  "formula": "\\tau_{max}^{(xy)}=R=\\frac{\\sigma_1-\\sigma_2}{2},\\qquad \\tau_{max}^{abs}=\\frac{\\sigma_{I}-\\sigma_{III}}{2}",
  "formulaNote": "σI i σIII to odpowiednio największe i najmniejsze z trzech naprężeń głównych. Płaszczyzny maksymalnego ścinania są nachylone o 45° do odpowiednich kierunków głównych, a występuje na nich średnie naprężenie normalne.",
  "insight": "Jeżeli σ1 i σ2 mają ten sam znak, zero w kierunku z staje się jedną ze skrajnych wartości i τmax(abs) może być większe niż promień koła w płaszczyźnie xy.",
  "lab": "mohr",
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
      "question": "Dla płaskich naprężeń głównych σ1 = 120 MPa, σ2 = 40 MPa i σz = 0 ile wynosi absolutne maksymalne naprężenie styczne?",
      "answers": [
        "40 MPa",
        "60 MPa",
        "80 MPa"
      ],
      "correct": 1,
      "hint": "Największa różnica jest między 120 MPa a zerem, nie między 120 a 40 MPa.",
      "explanation": "Po uporządkowaniu σI = 120, σII = 40, σIII = 0 MPa. Dlatego τmax(abs) = (120 − 0)/2 = 60 MPa; płaskie R wynosiłoby tylko 40 MPa.",
      "outcome": "U1"
    },
    {
      "question": "Jakie średnie naprężenie normalne występuje na płaszczyźnie maksymalnego ścinania w płaszczyźnie dwóch naprężeń głównych σ1 i σ2?",
      "answers": [
        "Zawsze zero",
        "(σ1 + σ2)/2",
        "(σ1 − σ2)/2"
      ],
      "correct": 1,
      "hint": "Jest to położenie środka odpowiedniego koła na osi σ.",
      "explanation": "Na płaszczyźnie τmax naprężenie normalne odpowiada środkowi koła: (σ1 + σ2)/2. Ścinanie maksymalne nie oznacza zniknięcia naprężenia normalnego.",
      "outcome": "U2"
    },
    {
      "question": "Dla czystego ścinania τxy = 70 MPa, przy σx = σy = σz = 0, ile wynosi τmax(abs)?",
      "answers": [
        "35 MPa",
        "70 MPa",
        "140 MPa"
      ],
      "correct": 1,
      "hint": "Naprężeniami głównymi w płaszczyźnie są +70 i −70 MPa.",
      "explanation": "Naprężenia główne wynoszą 70, 0 i −70 MPa. Największa różnica to 140 MPa, więc τmax(abs) = 70 MPa, zgodnie z wyjściowym ścinaniem.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Stan płaski: σx = 80 MPa, σy = 20 MPa, τxy = 40 MPa, σz = 0.",
    "steps": [
      "σavg = 50 MPa, a = 30 MPa, R = √(30² + 40²) = 50 MPa.",
      "Płaskie naprężenia główne: 100 MPa i 0 MPa; trzecie σz = 0.",
      "Płaskie maksimum ścinania wynosi R = 50 MPa.",
      "Pełny zbiór główny to {100, 0, 0} MPa, więc τmax(abs) = (100 − 0)/2 = 50 MPa."
    ],
    "result": "Oba maksima wynoszą tu 50 MPa, ale jest to zbieg okoliczności wynikający z σ2 = σz = 0. Zawsze należy sprawdzić pełny zestaw trzech wartości."
  }
} satisfies LessonData
