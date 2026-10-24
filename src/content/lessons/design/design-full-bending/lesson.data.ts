import type { LessonData } from '../../../model'

export default {
  "id": "design-full-bending",
  "moduleId": "design",
  "number": 5,
  "title": "Pełne zadanie: dobór belki na zginanie",
  "shortTitle": "Zadanie: belka",
  "description": "Wyznacz reakcje i moment maksymalny, dobierz przekrój, a potem wykonaj kontrolę ugięcia.",
  "duration": 9,
  "eyebrow": "Pełne rozwiązanie 3",
  "formula": "M_{max} = \\frac{PL}{4} \\qquad W_{wym} = \\frac{M_{max}}{k} \\qquad f = \\frac{PL^3}{48EI}",
  "formulaNote": "Wzory dotyczą belki swobodnie podpartej o rozpiętości L z siłą P na środku. W = I/c, gdzie c to odległość skrajnego włókna od osi obojętnej.",
  "insight": "Ten sam moment zginający może dać różne naprężenia w przekrojach o tym samym polu. Decyduje rozmieszczenie materiału, opisane przez I i W.",
  "lab": "beamGeneral",
  "outcomes": [
    "W1 — analizuję schemat elementu, obciążenia i warunki podparcia przed rozpoczęciem obliczeń.",
    "W2 — rozpoznaję równoczesne przypadki wytrzymałościowe i warunek decydujący o wymiarze.",
    "W3 — dobieram wymiary i wskaźniki przekroju, uwzględniając jego kształt oraz sztywność.",
    "U1 — wykonuję pełne obliczenia wymiaru, obciążenia dopuszczalnego i zapasu wytrzymałości.",
    "U2 — wykorzystuję koło Mohra do kontroli stanu naprężenia w obciążeniach złożonych.",
    "U3 — dobieram materiał i przekrój z wymaganym bezpieczeństwem oraz sprawdzam warunek sztywności."
  ],
  "solutionId": "cw5-1",
  "questions": [
    {
      "question": "Belka o L = 4 m ma siłę P = 20 kN na środku. Ile wynosi Mmax?",
      "answers": [
        "20 kN·m",
        "40 kN·m",
        "80 kN·m"
      ],
      "correct": 0,
      "hint": "Dla tego schematu Mmax = PL/4.",
      "explanation": "Mmax = 20·4/4 = 20 kN·m. Reakcje wynoszą po 10 kN, a moment na środku to 10 kN·2 m = 20 kN·m.",
      "outcome": "U1"
    },
    {
      "question": "Przy Mmax = 20 kN·m i k = 160 MPa ile wynosi Wwym?",
      "answers": [
        "125 mm³",
        "12 500 mm³",
        "125 000 mm³"
      ],
      "correct": 2,
      "hint": "20 kN·m = 20 000 000 N·mm.",
      "explanation": "Wwym = 20 000 000/160 = 125 000 mm³. Poprawna zamiana jednostek zapobiega błędowi tysiąckrotnemu.",
      "outcome": "U3"
    },
    {
      "question": "Warunek wytrzymałości wymaga I ≥ 8·10⁶ mm⁴, a warunek ugięcia I ≥ 11·10⁶ mm⁴. Które I przyjąć?",
      "answers": [
        "8·10⁶ mm⁴",
        "9,5·10⁶ mm⁴",
        "Co najmniej 11·10⁶ mm⁴"
      ],
      "correct": 2,
      "hint": "Jedno I musi spełnić obie nierówności.",
      "explanation": "Przyjmujemy większą wymaganą wartość. Przy 8·10⁶ mm⁴ belka byłaby wystarczająco wytrzymała, ale zbyt podatna.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Belka swobodnie podparta ma L = 3 m, P = 12 kN na środku i k = 150 MPa.",
    "steps": [
      "Reakcje z symetrii: RA = RB = 6 kN.",
      "Mmax = PL/4 = 12·3/4 = 9 kN·m = 9·10⁶ N·mm.",
      "Wwym = 9·10⁶/150 = 60 000 mm³.",
      "Po doborze przekroju należy jeszcze sprawdzić f = PL³/(48EI) względem fdop."
    ],
    "result": "Wymagany wskaźnik wytrzymałości przekroju wynosi 60 000 mm³; dobór wymaga też kontroli ugięcia."
  }
} satisfies LessonData
