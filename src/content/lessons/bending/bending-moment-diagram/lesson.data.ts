import type { LessonData } from '../../../model'

export default {
  "id": "bending-moment-diagram",
  "moduleId": "bending",
  "number": 3,
  "title": "Moment zginający M(x)",
  "shortTitle": "Moment zginający",
  "description": "Wyznaczaj moment z równowagi odciętej części i znajduj jego ekstrema za pomocą T.",
  "duration": 8,
  "eyebrow": "Pole pod T buduje M",
  "formula": "\\frac{dM}{dx} = T \\qquad M(x_2)-M(x_1) = \\int_{x_1}^{x_2}T(x)\\,dx",
  "formulaNote": "Przy dM/dx = T maksimum dodatniego M często występuje tam, gdzie T przechodzi przez zero, zmieniając znak z plusa na minus.",
  "insight": "Stała, dodatnia wartość T daje liniowo rosnący M. Zerowa wartość T oznacza poziome styczne wykresu M, ale nie zawsze sam moment równy zero.",
  "lab": "bending",
  "outcomes": [
    "W1 — analizuje schematy belek, podpory i wewnętrzne siły przekrojowe",
    "W2 — rozróżnia przypadki obciążenia oraz czyste zginanie i zginanie z udziałem siły tnącej",
    "W3 — wyjaśnia wpływ geometrii przekroju na rozkład naprężeń i ugięcie",
    "U1 — oblicza reakcje, funkcje T(x) i M(x) oraz naprężenia zginające",
    "U2 — wykorzystuje koło Mohra do analizy stanu naprężenia w zginanym elemencie",
    "U3 — dobiera przekrój belki z warunków bezpieczeństwa, wytrzymałości i sztywności"
  ],
  "questions": [
    {
      "question": "Jeżeli na pewnym odcinku T(x) = +5 kN jest stałe, to M(x):",
      "answers": [
        "Rośnie liniowo z nachyleniem 5 kN",
        "Jest stałe i równe 5 kN·m",
        "Maleje parabolicznie"
      ],
      "correct": 0,
      "hint": "Nachylenie wykresu M jest równe T.",
      "explanation": "dM/dx = T = 5 kN, więc wykres M jest prostą rosnącą. Jednostką nachylenia jest kN, bo moment w kN·m dzielimy przez długość w m."
    },
    {
      "question": "Dla siły P na środku belki swobodnie podpartej o rozpiętości L maksymalny moment wynosi:",
      "answers": [
        "PL/2",
        "PL/4",
        "PL"
      ],
      "correct": 1,
      "hint": "Reakcja wynosi P/2, a ramię od podpory do środka L/2.",
      "explanation": "Mmax = RA·L/2 = (P/2)(L/2) = PL/4. Moment jest największy pod siłą, gdzie T zmienia znak."
    },
    {
      "question": "T(x) przechodzi przez zero i zmienia znak z dodatniego na ujemny. Co dzieje się z M(x)?",
      "answers": [
        "Osiąga lokalne maksimum",
        "Osiąga lokalne minimum",
        "Musi wynosić zero"
      ],
      "correct": 0,
      "hint": "Najpierw moment rośnie, a potem maleje.",
      "explanation": "Dodatnie T oznacza rosnący M, a ujemne T malejący M. Zmiana znaku z + na − wyznacza więc lokalne maksimum momentu."
    }
  ],
  "workedExample": {
    "given": "Belka swobodnie podparta L = 4 m z siłą P = 20 kN na środku; RA = RB = 10 kN.",
    "steps": [
      "Dla 0 ≤ x ≤ 2 m: M(x) = RA·x = 10x kN·m.",
      "Pod siłą M(2) = 10·2 = 20 kN·m.",
      "Na prawym odcinku moment maleje liniowo do M(4) = 0, zgodnie ze wzorem Mmax = PL/4."
    ],
    "result": "Mmax = 20 kN·m pod siłą; wykres M ma kształt trójkąta."
  }
} satisfies LessonData
