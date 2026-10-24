import type { LessonData } from '../../../model'

export default {
  "id": "m3-self-weight",
  "moduleId": "material",
  "number": 4,
  "title": "Ciężar własny elementu",
  "shortTitle": "Ciężar własny",
  "description": "Obliczanie masy, ciężaru i obciążenia liniowego oraz naprężenia wywołanego własnym ciężarem pręta.",
  "duration": 9,
  "eyebrow": "Konstrukcja też coś waży",
  "formula": "G = \\rho g A L, \\qquad q = \\rho g A, \\qquad \\sigma_{max} = \\rho g L",
  "formulaNote": "ρ to gęstość, g — przyspieszenie ziemskie, A — pole przekroju, L — długość, a q — ciężar na jednostkę długości. Wzór σmax = ρgL dotyczy jednorodnego pionowego pręta wiszącego, w przekroju przy górnym utwierdzeniu.",
  "insight": "W pionowym pręcie wiszącym naprężenie od ciężaru własnego nie zależy od pola przekroju: zgrubienie zwiększa równolegle nośność i ciężar. Nadal jednak rośnie siła w podporze.",
  "lab": "selfWeight",
  "outcomes": [
    "W1 — analizuje rozkład siły wewnętrznej wywołanej ciężarem własnym",
    "W2 — rozpoznaje osiowy przypadek obciążenia objętościowego",
    "W3 — wyjaśnia wpływ pola przekroju na ciężar i nośność",
    "U1 — oblicza masę, ciężar, obciążenie liniowe i naprężenie",
    "U2 — wyznacza naprężenie osiowe do dalszej analizy stanu naprężenia",
    "U3 — uwzględnia ciężar własny w bezpiecznym doborze elementu"
  ],
  "questions": [
    {
      "question": "Stalowy pręt ma A = 200 mm², L = 3 m i ρ = 7850 kg/m³. Jaki jest jego ciężar przy g = 9,81 m/s²?",
      "answers": [
        "około 4,62 N",
        "około 46,2 N",
        "około 462 N",
        "około 4,71 N"
      ],
      "correct": 1,
      "explanation": "Objętość V = 0,0002·3 = 0,0006 m³, masa m = 7850·0,0006 = 4,71 kg. Ciężar G = 4,71·9,81 ≈ 46,2 N.",
      "hint": "Najpierw zamień 200 mm² na 0,0002 m², potem oblicz objętość i masę.",
      "outcome": "U1"
    },
    {
      "question": "Jak zmieni się największe naprężenie od ciężaru własnego w pionowym, jednorodnym pręcie wiszącym po podwojeniu pola przekroju przy tej samej długości?",
      "answers": [
        "Nie zmieni się",
        "Wzrośnie dwa razy",
        "Zmaleje dwa razy",
        "Zmaleje cztery razy"
      ],
      "correct": 0,
      "explanation": "σmax = G/A = ρgAL/A = ρgL. Pole się skraca, więc naprężenie nie zależy od A, choć całkowity ciężar rośnie.",
      "hint": "Zapisz naprężenie jako ciężar podzielony przez pole i zobacz, co się skróci.",
      "outcome": "W3"
    },
    {
      "question": "Gdzie w pionowym pręcie zawieszonym u góry występuje największa siła osiowa od jego własnego ciężaru?",
      "answers": [
        "Na dolnym, swobodnym końcu",
        "W połowie długości i jest wszędzie taka sama",
        "Przy górnym zawieszeniu",
        "Dokładnie w środku ciężkości, niezależnie od przekroju"
      ],
      "correct": 2,
      "explanation": "Przekrój przy górnym zawieszeniu przenosi ciężar całego pręta. Na swobodnym dolnym końcu siła osiowa od ciężaru jest zerowa i rośnie liniowo w górę.",
      "hint": "Pomyśl, jaka część pręta znajduje się poniżej rozpatrywanego przekroju.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Pionowy stalowy pręt o A = 300 mm² i L = 4 m jest zawieszony u góry. ρ = 7850 kg/m³, g = 9,81 m/s².",
    "steps": [
      "Pole A = 300 mm² = 0,0003 m²; objętość V = AL = 0,0012 m³.",
      "Masa m = ρV = 7850·0,0012 = 9,42 kg, a ciężar G = mg ≈ 92,4 N.",
      "Obciążenie liniowe q = G/L = 92,4/4 = 23,1 N/m.",
      "Największe naprężenie przy zawieszeniu: σmax = G/A = 92,4/300 = 0,308 N/mm² = 0,308 MPa; to samo daje ρgL po przeliczeniu jednostek."
    ],
    "result": "Pręt waży około 9,42 kg, jego ciężar wynosi 92,4 N, a największe naprężenie od ciężaru własnego to około 0,308 MPa."
  }
} satisfies LessonData
