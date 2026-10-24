import type { LessonData } from '../../../model'

export default {
  "id": "m4-steiner-parallel-axis",
  "moduleId": "geometry",
  "number": 4,
  "title": "Twierdzenie Steinera",
  "shortTitle": "Osie równoległe",
  "description": "Przenoszenie momentu bezwładności między osiami równoległymi i składanie przekrojów złożonych względem wspólnej osi.",
  "duration": 9,
  "eyebrow": "Przesuwamy oś odniesienia",
  "formula": "I_x = I_{xc} + A a^2",
  "formulaNote": "Ixc dotyczy osi przechodzącej przez środek ciężkości danej figury i równoległej do osi x, A jest jej polem, a a — odległością między osiami. Przy odejmowaniu otworu odejmujemy cały wyraz Ixc + Aa².",
  "insight": "Steinera stosujemy zawsze od osi własnego środka ciężkości do osi równoległej, nie dowolnie między dwiema osiami zewnętrznymi. W figurze złożonej każda część ma własną odległość a od wspólnej osi centralnej.",
  "lab": "steiner",
  "outcomes": [
    "W1 — analizuje udział odległych części przekroju w bezwładności",
    "W2 — przygotowuje poprawne charakterystyki do obliczeń zginania",
    "W3 — stosuje osie centralne i równoległe w przekrojach złożonych",
    "U1 — oblicza momenty bezwładności z korektą Aa²",
    "U2 — utrzymuje spójny układ osi dla analizy naprężeń i koła Mohra",
    "U3 — zwiększa sztywność przez racjonalne oddalanie materiału od osi"
  ],
  "questions": [
    {
      "question": "Prostokąt ma Ixc = 2·10⁶ mm⁴ i A = 2000 mm². Ile wynosi moment względem osi równoległej oddalonej o a = 30 mm?",
      "answers": [
        "2,06·10⁶ mm⁴",
        "3,8·10⁶ mm⁴",
        "8·10⁶ mm⁴",
        "62·10⁶ mm⁴"
      ],
      "correct": 1,
      "explanation": "Aa² = 2000·30² = 1,8·10⁶ mm⁴. Zatem Ix = 2·10⁶ + 1,8·10⁶ = 3,8·10⁶ mm⁴.",
      "hint": "Najpierw podnieś odległość do kwadratu, potem pomnóż przez pole.",
      "outcome": "U1"
    },
    {
      "question": "Co jest poprawne przy odejmowaniu oddalonego od osi otworu kołowego?",
      "answers": [
        "Odejmujemy tylko pole otworu",
        "Odejmujemy Ixc otworu oraz jego składnik Aa²",
        "Dodajemy składnik Aa², bo otwór jest pusty",
        "Pomijamy położenie otworu"
      ],
      "correct": 1,
      "explanation": "Otwór jest figurą o polu ujemnym, więc odejmujemy cały moment względem wspólnej osi: Iotw = Ixc + |A|a². Jego oddalenie ma istotne znaczenie.",
      "hint": "Twierdzenie Steinera dotyczy całej figury, również tej odejmowanej.",
      "outcome": "W3"
    },
    {
      "question": "Dla ustalonej figury, względem której z osi równoległych moment bezwładności jest najmniejszy?",
      "answers": [
        "Osi najbardziej oddalonej od figury",
        "Osi przechodzącej przez środek ciężkości",
        "Zawsze osi na dolnej krawędzi",
        "Wszystkie dają ten sam moment"
      ],
      "correct": 1,
      "explanation": "I = Ic + Aa², a składnik Aa² jest nieujemny i najmniejszy dla a = 0. Dlatego minimum odpowiada osi centralnej równoległej.",
      "hint": "Znajdź położenie osi, dla którego dodatkowy składnik znika.",
      "outcome": "W3"
    }
  ],
  "workedExample": {
    "given": "Dla przekroju teowego z poprzedniej lekcji: środnik 20 × 100 mm, półka 120 × 20 mm, wspólne ȳ = 82,73 mm od dołu.",
    "steps": [
      "Środnik: Ixc1 = 20·100³/12 = 1,667·10⁶ mm⁴; odległość jego środka od osi centralnej a₁ = |82,73 − 50| = 32,73 mm.",
      "Moment środnika: I₁ = 1,667·10⁶ + 2000·32,73² ≈ 3,810·10⁶ mm⁴.",
      "Półka: Ixc2 = 120·20³/12 = 0,080·10⁶ mm⁴; a₂ = |110 − 82,73| = 27,27 mm.",
      "Moment półki: I₂ = 0,080·10⁶ + 2400·27,27² ≈ 1,866·10⁶ mm⁴; suma Ix = I₁ + I₂ ≈ 5,676·10⁶ mm⁴."
    ],
    "result": "Moment bezwładności przekroju teowego względem poziomej osi centralnej wynosi około 5,68·10⁶ mm⁴."
  }
} satisfies LessonData
