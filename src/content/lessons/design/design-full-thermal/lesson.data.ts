import type { LessonData } from '../../../model'

export default {
  "id": "design-full-thermal",
  "moduleId": "design",
  "number": 4,
  "title": "Pełne zadanie: obciążenie mechaniczne i temperatura",
  "shortTitle": "Zadanie: temperatura",
  "description": "Łącz równowagę, zgodność odkształceń i prawo Hooke’a w pręcie zablokowanym oraz sprawdzaj zapas.",
  "duration": 9,
  "eyebrow": "Pełne rozwiązanie 2",
  "formula": "\\Delta L = \\frac{NL}{EA} + \\alpha\\Delta T L = 0 \\qquad N = -EA\\alpha\\Delta T",
  "formulaNote": "Wzór dotyczy jednorodnego pręta idealnie zablokowanego, bez innych obciążeń. Dla ΔT > 0 siła N jest ujemna, czyli ściskająca.",
  "insight": "W idealnie zablokowanym pręcie całkowita długość się nie zmienia, ale odkształcenie termiczne i mechaniczne nie znikają — wzajemnie się równoważą.",
  "lab": "thermal",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "solutionId": "cw2-1",
  "questions": [
    {
      "question": "Co jest warunkiem zgodności dla jednorodnego pręta utwierdzonego na obu końcach, bez luzu?",
      "answers": [
        "N = 0",
        "Całkowita zmiana długości ΔL = 0",
        "Odkształcenie termiczne εT = 0"
      ],
      "correct": 1,
      "hint": "Podpory nie zmieniają wzajemnej odległości.",
      "explanation": "Całkowite ΔL musi być zerowe. Odkształcenie termiczne jest niezerowe po zmianie temperatury, ale kompensuje je odkształcenie mechaniczne.",
      "outcome": "W1"
    },
    {
      "question": "Stalowy pręt ma E = 200 GPa, α = 12·10⁻⁶/K i jest w pełni zablokowany. Jakie naprężenie wywoła ΔT = 50 K?",
      "answers": [
        "Ściskanie 120 MPa",
        "Rozciąganie 120 MPa",
        "Ściskanie 12 MPa"
      ],
      "correct": 0,
      "hint": "|σ| = EαΔT; przy ogrzewaniu podpory ściskają pręt.",
      "explanation": "|σ| = 200 000·12·10⁻⁶·50 = 120 MPa. Znak jest ujemny: σ = −120 MPa, czyli ściskanie.",
      "outcome": "U1"
    },
    {
      "question": "Jak wpłynie na naprężenie termiczne idealnie zablokowanego pręta dwukrotne zwiększenie A?",
      "answers": [
        "Spadnie 2 razy",
        "Nie zmieni się",
        "Wzrośnie 2 razy"
      ],
      "correct": 1,
      "hint": "N rośnie z A, ale naprężenie to N/A.",
      "explanation": "N = −EAαΔT rośnie proporcjonalnie do A, więc σ = N/A = −EαΔT nie zależy od pola. Zmienia się siła reakcji, nie naprężenie.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Pręt ma A = 400 mm², E = 200 GPa, α = 12·10⁻⁶/K i ogrzewa się o 40 K przy pełnym zablokowaniu.",
    "steps": [
      "σT = −EαΔT = −200 000·12·10⁻⁶·40 = −96 MPa.",
      "N = σA = −96·400 = −38 400 N = −38,4 kN.",
      "Przy kc = 160 MPa: |σT| = 96 ≤ 160 MPa."
    ],
    "result": "W pręcie powstaje ściskanie 96 MPa i siła osiowa 38,4 kN; warunek jest spełniony."
  }
} satisfies LessonData
