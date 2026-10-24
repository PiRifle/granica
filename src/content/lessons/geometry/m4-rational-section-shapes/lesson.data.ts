import type { LessonData } from '../../../model'

export default {
  "id": "m4-rational-section-shapes",
  "moduleId": "geometry",
  "number": 7,
  "title": "Racjonalne kształty przekrojów",
  "shortTitle": "Racjonalny przekrój",
  "description": "Porównywanie przekrojów przy tej samej masie, skuteczność rur i dwuteowników oraz łączenie wytrzymałości ze sztywnością.",
  "duration": 10,
  "eyebrow": "Materiał tam, gdzie pracuje",
  "formula": "I = \\int_A r^2\\,dA, \\qquad W = \\frac{I}{c}; \\qquad \\text{efektywność oceniamy przez } I/A \\text{ i } W/A",
  "formulaNote": "I/A i W/A są pomocnicznymi miarami porównawczymi, a nie uniwersalnymi wskaźnikami jakości. Ostateczny dobór zależy też od kierunku obciążenia, stateczności ścianek, połączeń, wykonania i warunków użytkowania.",
  "insight": "Dwuteownik jest racjonalny przy zginaniu w swojej mocnej płaszczyźnie, a cienkościenna rura dobrze wykorzystuje materiał przy skręcaniu. Nie istnieje jeden najlepszy kształt dla każdego obciążenia.",
  "lab": "sections",
  "outcomes": [
    "W1 — analizuje zgodność kształtu przekroju z rodzajem obciążenia",
    "W2 — łączy zginanie, skręcanie i warunki stateczności z geometrią",
    "W3 — porównuje charakterystyki racjonalnych przekrojów",
    "U1 — oblicza i porównuje A, I, W oraz miary efektywności",
    "U2 — rozpoznaje kierunki skrajnych naprężeń do analizy kołem Mohra",
    "U3 — dobiera przekrój z uwagi na bezpieczeństwo, sztywność i masę"
  ],
  "questions": [
    {
      "question": "Dlaczego usunięcie materiału blisko osi obojętnej często mniej zmniejsza I niż usunięcie takiego samego pola przy skrajnych włóknach?",
      "answers": [
        "Bo blisko osi r jest małe, a w I występuje r²",
        "Bo pole blisko osi jest ujemne",
        "Bo naprężenie zginające jest największe na osi",
        "Bo moment bezwładności zależy wyłącznie od masy"
      ],
      "correct": 0,
      "explanation": "Wkład elementu pola do I wynosi r²dA. Przy małej odległości r od osi ten wkład jest niewielki, natomiast przy dużej rośnie kwadratowo.",
      "hint": "Oceń wkład tego samego dA przy dwóch różnych odległościach r.",
      "outcome": "W3"
    },
    {
      "question": "Pełny pręt i rura mają takie samo pole przekroju oraz materiał. Dla typowej rury o cienkiej ściance, z materiałem średnio dalej od środka:",
      "answers": [
        "moment bezwładności zwykle jest większy",
        "moment bezwładności zawsze jest mniejszy",
        "I zależy tylko od pola, więc jest identyczne",
        "W zawsze jest zerowe"
      ],
      "correct": 0,
      "explanation": "Przy równym polu rura rozmieszcza materiał przeciętnie dalej od osi, co zwiększa ∫r²dA. Ostateczny wynik zależy od wymiarów, ale to podstawowa zaleta przekroju rurowego.",
      "hint": "Porównaj rozmieszczenie pola, nie tylko jego sumę.",
      "outcome": "U3"
    },
    {
      "question": "Które stwierdzenie o dwuteowniku jest najtrafniejsze?",
      "answers": [
        "Jest jednakowo racjonalny przy każdym obciążeniu i w każdym kierunku",
        "Jego półki oddalone od osi zwiększają I i W w mocnej płaszczyźnie zginania",
        "Środnik sam zawsze przenosi cały moment zginający",
        "Im cieńsze ścianki, tym lepiej, bez żadnych ograniczeń"
      ],
      "correct": 1,
      "explanation": "Oddalone półki dają duży wkład Aa² do momentu bezwładności i zwiększają W. Jednak kierunek obciążenia oraz stateczność cienkich ścianek ograniczają dobór.",
      "hint": "Połącz położenie półek z twierdzeniem Steinera i pamiętaj o innych warunkach projektowania.",
      "outcome": "U3"
    }
  ],
  "workedExample": {
    "given": "Porównujemy pełny przekrój kołowy o średnicy 100 mm z rurą D = 100 mm, d = 90 mm. Oba mają tę samą średnicę zewnętrzną.",
    "steps": [
      "Pole pełnego koła Ap = π·100²/4 = 7854 mm²; pole rury Ar = π(100² − 90²)/4 = 1492 mm², czyli około 19% pola pełnego.",
      "Moment pełnego koła Ip = π·100⁴/64 = 4,909·10⁶ mm⁴.",
      "Moment rury Ir = π(100⁴ − 90⁴)/64 = 1,688·10⁶ mm⁴, czyli około 34% Ip.",
      "Ponieważ oba przekroje mają cmax = 50 mm, stosunek W jest taki sam jak stosunek I. Rura zachowuje około 34% W przy około 19% masy na tej samej długości."
    ],
    "result": "Rura ma około 19% masy przekroju pełnego, zachowując około 34% jego I i W; lepiej wykorzystuje materiał, choć ma mniejszą bezwzględną nośność i sztywność."
  }
} satisfies LessonData
