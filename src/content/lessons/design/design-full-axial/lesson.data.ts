import type { LessonData } from '../../../model'

export default {
  "id": "design-full-axial",
  "moduleId": "design",
  "number": 3,
  "title": "Pełne zadanie: pręt osiowo obciążony",
  "shortTitle": "Zadanie: pręt",
  "description": "Przejdź od schematu i sił wewnętrznych przez naprężenia do doboru przekroju i kontroli wydłużenia.",
  "duration": 8,
  "eyebrow": "Pełne rozwiązanie 1",
  "formula": "\\sigma_i = \\frac{N_i}{A_i} \\leq k \\qquad \\Delta L = \\sum_i \\frac{N_iL_i}{E A_i}",
  "formulaNote": "Suma obejmuje przedziały o stałych N, E i A. Przy ściskaniu smukłego pręta konieczna może być dodatkowo kontrola wyboczenia, której nie zastępuje warunek N/A ≤ k.",
  "insight": "Najpierw wykres N, potem tabela przedziałów. Taki porządek ogranicza pomylenie długości, pola lub znaku siły.",
  "lab": "steppedBar",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "solutionId": "cw1-1",
  "questions": [
    {
      "question": "Odcinek 1 ma N = 40 kN i A = 500 mm², a odcinek 2 N = 30 kN i A = 200 mm². Który decyduje o wytrzymałości?",
      "answers": [
        "Odcinek 1, bo ma większe N",
        "Odcinek 2, bo ma większe N/A",
        "Oba mają takie samo naprężenie"
      ],
      "correct": 1,
      "hint": "Oblicz osobno naprężenia w MPa.",
      "explanation": "σ1 = 40 000/500 = 80 MPa, a σ2 = 30 000/200 = 150 MPa. Mniejsza siła na znacznie mniejszym polu daje większe naprężenie.",
      "outcome": "W1"
    },
    {
      "question": "Dwa odcinki mają N = 20 kN, L = 0,5 m, E = 200 GPa i A = 400 mm². Jakie jest ich łączne wydłużenie?",
      "answers": [
        "0,125 mm",
        "0,25 mm",
        "0,5 mm"
      ],
      "correct": 1,
      "hint": "Każdy odcinek daje NL/(EA) = 0,125 mm.",
      "explanation": "Pojedyncze wydłużenie: 20 000·500/(200 000·400) = 0,125 mm. Dwa odcinki dają 0,25 mm.",
      "outcome": "U1"
    },
    {
      "question": "Dlaczego wynik N/A ≤ k nie wystarcza dla bardzo smukłego ściskanego pręta?",
      "answers": [
        "Bo ściskanie nie wywołuje naprężeń",
        "Bo może nastąpić wyboczenie przed osiągnięciem granicy materiału",
        "Bo E nie dotyczy ściskania"
      ],
      "correct": 1,
      "hint": "Pomyśl o utracie prostoliniowej postaci równowagi.",
      "explanation": "Wyboczenie jest zagadnieniem stateczności i może wystąpić przy naprężeniu poniżej k. Wymaga osobnej kontroli zależnej m.in. od smukłości i podparcia.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Pręt ma N = 24 kN, L = 1,2 m, A = 300 mm², E = 200 GPa, k = 120 MPa i Re = 240 MPa.",
    "steps": [
      "σ = 24 000/300 = 80 MPa ≤ 120 MPa.",
      "Rzeczywisty zapas przy Re = 240 MPa wynosi n = 240/80 = 3.",
      "ΔL = 24 000·1200/(200 000·300) = 0,48 mm."
    ],
    "result": "Pręt spełnia warunek wytrzymałości, a jego wydłużenie wynosi 0,48 mm."
  }
} satisfies LessonData
