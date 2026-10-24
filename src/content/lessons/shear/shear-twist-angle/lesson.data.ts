import type { LessonData } from '../../../model'

export default {
  "id": "shear-twist-angle",
  "moduleId": "shear",
  "number": 6,
  "title": "Kąt skręcenia i sztywność wału",
  "shortTitle": "Kąt skręcenia",
  "description": "Sprawdź, kiedy wał jest wystarczająco wytrzymały, ale nadal zbyt podatny na skręcanie.",
  "duration": 9,
  "eyebrow": "Nie tylko naprężenie",
  "formula": "\\varphi = \\frac{T L}{G J_o} \\qquad \\varphi_{deg} = \\varphi \\frac{180}{\\pi}",
  "formulaNote": "φ w pierwszym wzorze wychodzi w radianach. L jest długością wału, a GJ_o nazywamy sztywnością na skręcanie.",
  "insight": "Kąt rośnie liniowo z T i L, a maleje z G i J_o. Ponieważ J_o zależy od d⁴, zwiększenie średnicy bardzo skutecznie ogranicza skręcanie.",
  "lab": "torsion",
  "outcomes": [
    "W1 — analizuje elementy ścinane i skręcane oraz wskazuje przekroje przenoszące obciążenie",
    "W2 — rozróżnia przypadki ścinania technicznego i swobodnego skręcania",
    "W3 — wyjaśnia wpływ geometrii przekroju na naprężenia i sztywność",
    "U1 — oblicza naprężenia styczne, kąt skręcenia i siły w przekrojach",
    "U2 — wykorzystuje koło Mohra do opisu czystego ścinania",
    "U3 — dobiera średnicę wału z warunków wytrzymałości i sztywności z zachowaniem bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Długość wału rośnie trzykrotnie, a T, G i J_o pozostają bez zmian. Jak zmieni się kąt skręcenia?",
      "answers": [
        "Wzrośnie trzykrotnie",
        "Spadnie trzykrotnie",
        "Wzrośnie dziewięciokrotnie"
      ],
      "correct": 0,
      "hint": "L występuje w liczniku φ = TL/(GJ_o).",
      "explanation": "Każdy odcinek wału dokłada swój względny obrót, więc trzykrotnie dłuższy wał ma trzykrotnie większy całkowity kąt skręcenia.",
      "outcome": "W3"
    },
    {
      "question": "Średnicę pełnego wału zwiększono dwukrotnie. Jak zmieni się φ przy pozostałych danych bez zmian?",
      "answers": [
        "Spadnie 16 razy",
        "Spadnie 8 razy",
        "Spadnie 2 razy"
      ],
      "correct": 0,
      "hint": "Dla wału pełnego J_o jest proporcjonalne do d⁴.",
      "explanation": "J_o wzrasta 2⁴ = 16 razy. Ponieważ φ jest odwrotnie proporcjonalne do J_o, kąt skręcenia spada 16 razy.",
      "outcome": "W3"
    },
    {
      "question": "Obliczony kąt φ = 0,02 rad. Ile to stopni?",
      "answers": [
        "Około 0,02°",
        "Około 1,15°",
        "Około 11,46°"
      ],
      "correct": 1,
      "hint": "Pomnóż radiany przez 180/π ≈ 57,3.",
      "explanation": "φ = 0,02·180/π ≈ 1,146°, czyli około 1,15°. Radiany i stopnie nie mogą być mieszane bez przeliczenia.",
      "outcome": "U1"
    }
  ],
  "workedExample": {
    "given": "Wał pełny d = 40 mm, L = 1 m, G = 80 GPa przenosi T = 1 kN·m.",
    "steps": [
      "Zapisz dane w N i mm: T = 1 000 000 N·mm, L = 1000 mm, G = 80 000 MPa.",
      "Policz J_o = π·40⁴/32 = 251 327 mm⁴.",
      "φ = TL/(GJ_o) = 1 000 000·1000/(80 000·251 327) = 0,04974 rad.",
      "Przelicz kąt: 0,04974·180/π = 2,85°."
    ],
    "result": "Całkowity kąt skręcenia wynosi około 0,0497 rad, czyli 2,85°."
  }
} satisfies LessonData
