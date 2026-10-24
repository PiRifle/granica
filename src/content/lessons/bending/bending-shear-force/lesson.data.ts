import type { LessonData } from '../../../model'

export default {
  "id": "bending-shear-force",
  "moduleId": "bending",
  "number": 2,
  "title": "Siła tnąca T(x)",
  "shortTitle": "Siła tnąca",
  "description": "Czytaj skoki i odcinki wykresu siły tnącej jako zapis równowagi odciętej części belki.",
  "duration": 8,
  "eyebrow": "Przetnij i zrównoważ",
  "formula": "T(x) = R_A - \\sum P_i - \\int_0^x q(\\xi)\\,d\\xi",
  "formulaNote": "Zapis dotyczy przyjętej konwencji dodatniego T i obciążeń pionowych działających w dół. Skok wykresu odpowiada sile skupionej.",
  "insight": "Siła skupiona powoduje skok T o wartość tej siły. Między siłami skupionymi i bez q wykres T jest stały.",
  "lab": "beamGeneral",
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
      "question": "Na belce swobodnie podpartej o L = 4 m działa P = 20 kN na środku. Jakie wartości ma T po lewej i prawej stronie siły?",
      "answers": [
        "+10 kN i −10 kN",
        "+20 kN i −20 kN",
        "0 kN i +20 kN"
      ],
      "correct": 0,
      "hint": "Reakcje wynoszą po 10 kN, a pod siłą wykres skacze o 20 kN.",
      "explanation": "Przed siłą T = RA = +10 kN. Pod P następuje spadek o 20 kN, więc za siłą T = 10−20 = −10 kN.",
      "outcome": "U1"
    },
    {
      "question": "Na odcinku bez obciążenia ciągłego i bez sił skupionych wykres T(x) jest:",
      "answers": [
        "Stały",
        "Zawsze paraboliczny",
        "Zawsze równy zero"
      ],
      "correct": 0,
      "hint": "Skoro q = 0, to dT/dx = −q = 0.",
      "explanation": "Zależność dT/dx = −q oznacza przy q = 0 stałą wartość T. Może ona być dodatnia lub ujemna, nie musi być zerowa.",
      "outcome": "W1"
    },
    {
      "question": "W punkcie przyłożenia pionowej siły skupionej 30 kN w dół wykres T, czytany od lewej do prawej:",
      "answers": [
        "Wykonuje skok w dół o 30 kN",
        "Wykonuje skok w górę o 30 kN",
        "Pozostaje zawsze ciągły"
      ],
      "correct": 0,
      "hint": "Odjęta część belki musi zrównoważyć nową siłę w dół.",
      "explanation": "Przy przyjętej konwencji siła w dół zmniejsza T o 30 kN. Wartość skoku odpowiada sile skupionej; w idealizowanym punkcie przyłożenia wykres jest nieciągły.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Belka swobodnie podparta L = 4 m, siła P = 20 kN w x = 2 m; obciążenie ciągłe q = 0.",
    "steps": [
      "Z symetrii reakcje wynoszą RA = RB = 10 kN.",
      "Dla 0 < x < 2 m: T(x) = RA = +10 kN.",
      "W x = 2 m występuje skok o P = 20 kN w dół.",
      "Dla 2 < x < 4 m: T(x) = 10−20 = −10 kN; reakcja RB wraca wykres do zera."
    ],
    "result": "T = +10 kN na lewym odcinku i −10 kN na prawym, ze skokiem 20 kN pod siłą."
  }
} satisfies LessonData
