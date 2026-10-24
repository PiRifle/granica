import type { LessonData } from '../../../model'

export default {
  "id": "bending-stress-neutral-axis",
  "moduleId": "bending",
  "number": 6,
  "title": "Rozkład σ i oś obojętna",
  "shortTitle": "Naprężenia zginające",
  "description": "Zobacz, dlaczego naprężenie rośnie liniowo z odległością od osi obojętnej i gdzie przekrój pracuje najmocniej.",
  "duration": 9,
  "eyebrow": "Od ściskania do rozciągania",
  "formula": "\\sigma_x(y) = \\frac{M y}{I_z} \\qquad \\sigma_{max} = \\frac{M}{W_z}, \\quad W_z = \\frac{I_z}{c}",
  "formulaNote": "y jest odległością od osi obojętnej, c największą odległością do skrajnego włókna, a I_z momentem bezwładności względem osi zginania.",
  "insight": "Na osi obojętnej σ = 0, a największe co do wartości naprężenia występują najdalej od niej. Dla przekroju symetrycznego oś obojętna przechodzi przez środek ciężkości.",
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
      "question": "Jak zmienia się naprężenie normalne od zginania w funkcji odległości y od osi obojętnej?",
      "answers": [
        "Liniowo; jest zerowe dla y = 0",
        "Jest stałe w całym przekroju",
        "Rośnie proporcjonalnie do y² i nigdy nie zmienia znaku"
      ],
      "correct": 0,
      "hint": "W σ = My/I wielkość y występuje w pierwszej potędze.",
      "explanation": "Przy ustalonych M i I naprężenie jest wprost proporcjonalne do y. Dla y = 0 wynosi zero, a po przeciwnych stronach osi ma przeciwne znaki."
    },
    {
      "question": "Prostokąt ma b = 60 mm i h = 120 mm. Ile wynosi jego wskaźnik Wz względem osi poziomej?",
      "answers": [
        "72 000 mm³",
        "144 000 mm³",
        "864 000 mm³"
      ],
      "correct": 1,
      "hint": "Dla prostokąta Wz = bh²/6.",
      "explanation": "Wz = 60·120²/6 = 60·14 400/6 = 144 000 mm³. Wskaźnik ma jednostkę mm³, a nie mm⁴ jak moment bezwładności."
    },
    {
      "question": "Przy dodatnim momencie zginającym belkę w dół typowe naprężenia w przekroju symetrycznym to:",
      "answers": [
        "Ściskanie u góry i rozciąganie u dołu",
        "Rozciąganie u góry i ściskanie u dołu",
        "Wyłącznie rozciąganie w całym przekroju"
      ],
      "correct": 0,
      "hint": "Wygięta belka skraca górne włókna, a wydłuża dolne.",
      "explanation": "Górne włókna ulegają skróceniu, więc są ściskane; dolne wydłużają się, więc są rozciągane. Oś obojętna dzieli te obszary."
    }
  ],
  "workedExample": {
    "given": "Przekrój prostokątny b = 80 mm, h = 160 mm przenosi moment M = 8 kN·m.",
    "steps": [
      "Iz = bh³/12 = 80·160³/12 = 27 306 667 mm⁴.",
      "Najdalsze włókno ma c = h/2 = 80 mm, więc Wz = Iz/c = 341 333 mm³.",
      "M = 8 kN·m = 8 000 000 N·mm.",
      "σmax = M/Wz = 8 000 000/341 333 = 23,44 MPa; na osi obojętnej σ = 0."
    ],
    "result": "Naprężenia skrajne mają wartość bezwzględną 23,4 MPa: ściskanie po jednej i rozciąganie po drugiej stronie osi."
  }
} satisfies LessonData
