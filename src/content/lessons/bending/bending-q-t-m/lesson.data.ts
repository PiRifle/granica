import type { LessonData } from '../../../model'

export default {
  "id": "bending-q-t-m",
  "moduleId": "bending",
  "number": 4,
  "title": "Zależności q–T–M",
  "shortTitle": "Zależności q–T–M",
  "description": "Przewiduj kształt wykresów bez liczenia każdego punktu: q jest nachyleniem T, a T nachyleniem M.",
  "duration": 9,
  "eyebrow": "Trzy wykresy, jedna historia",
  "formula": "\\frac{dT}{dx} = -q \\qquad \\frac{dM}{dx} = T",
  "formulaNote": "Przyjmujemy q > 0 dla obciążenia w dół oraz konwencję dodatniego M wyginającego belkę wypukłością w dół.",
  "insight": "Stałe q daje liniowe T i kwadratowe M. Gdy q = 0, T jest stałe, a M liniowe — to szybki test poprawności wykresów.",
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
      "question": "Na belce działa stałe obciążenie q > 0 w dół. Jakiego rzędu są funkcje T(x) i M(x)?",
      "answers": [
        "T liniowa, M kwadratowa",
        "T stała, M liniowa",
        "T kwadratowa, M sześcienna"
      ],
      "correct": 0,
      "hint": "Całkowanie stałego q daje funkcję liniową, a całkowanie funkcji liniowej — kwadratową.",
      "explanation": "Z dT/dx = −q wynika T = −qx + C. Następnie dM/dx = T daje M jako wielomian drugiego stopnia.",
      "outcome": "W1"
    },
    {
      "question": "Dla belki swobodnie podpartej o L z równomiernym q maksymalny moment występuje:",
      "answers": [
        "Na podporze, gdzie M = 0",
        "Na środku, gdzie T = 0",
        "W miejscu największej wartości bezwzględnej T"
      ],
      "correct": 1,
      "hint": "Z symetrii siła tnąca zmienia znak w połowie rozpiętości.",
      "explanation": "T(x) = qL/2−qx znika dla x = L/2 i zmienia znak z + na −. Tam M osiąga maksimum qL²/8.",
      "outcome": "U1"
    },
    {
      "question": "Na wykresie M(x) pojawia się załamanie, choć T jest ciągłe i nie przyłożono momentu skupionego. Co należy zrobić?",
      "answers": [
        "Sprawdzić obliczenia, bo dM/dx = T wymaga tu ciągłego nachylenia M",
        "Uznać to zawsze za poprawny skutek obciążenia q",
        "Zastąpić wykres M wykresem T"
      ],
      "correct": 0,
      "hint": "Nachylenie M jest równe T; zastanów się, co oznacza ciągłość T dla stycznej do M.",
      "explanation": "Jeżeli T jest ciągłe, nachylenie M także zmienia się ciągle, więc M nie ma załamania. Skok M może natomiast wywołać przyłożony moment skupiony.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Belka swobodnie podparta L = 6 m obciążona równomiernie q = 5 kN/m na całej długości.",
    "steps": [
      "Z symetrii RA = RB = qL/2 = 15 kN.",
      "T(x) = RA−qx = 15−5x kN, więc T = 0 dla x = 3 m.",
      "M(x) = RA·x−qx²/2 = 15x−2,5x² kN·m.",
      "Mmax = M(3) = 45−22,5 = 22,5 kN·m, zgodnie ze wzorem qL²/8."
    ],
    "result": "T zmienia się liniowo od +15 do −15 kN; Mmax = 22,5 kN·m na środku."
  }
} satisfies LessonData
