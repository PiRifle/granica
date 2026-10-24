import type { LessonData } from '../../../model'

export default {
  "id": "m3-strength-elasticity-plasticity",
  "moduleId": "material",
  "number": 2,
  "title": "Re, Rm, sprężystość i plastyczność",
  "shortTitle": "Granice materiału",
  "description": "Znaczenie granicy plastyczności, wytrzymałości na rozciąganie oraz różnicy między odkształceniem znikającym a trwałym.",
  "duration": 8,
  "eyebrow": "Czytamy krzywą materiału",
  "formula": "R_e = \\frac{F_e}{S_0}, \\qquad R_m = \\frac{F_m}{S_0}",
  "formulaNote": "Fₑ to siła odpowiadająca granicy plastyczności, Fₘ — największa siła w próbie, a S₀ — początkowe pole przekroju. Rₑ i Rₘ są granicami materiału wyrażonymi jako naprężenia.",
  "insight": "Przekroczenie Rₑ oznacza trwałe odkształcenie, a osiągnięcie Rₘ — maksymalną siłę, jaką próbka przeniesie. W typowych konstrukcjach stalowych dopuszczalny stan odnosi się przede wszystkim do Rₑ, nie do zerwania.",
  "lab": "tensileTest",
  "outcomes": [
    "W1 — wiąże punkty wykresu próby z zachowaniem elementu",
    "W2 — rozróżnia granicę plastyczności, wytrzymałość i zniszczenie",
    "W3 — rozumie znaczenie początkowego pola przekroju w oznaczaniu granic",
    "U1 — oblicza siły graniczne z Rₑ, Rₘ i pola przekroju",
    "U2 — rozpoznaje stan osiowy jako podstawę późniejszej interpretacji Mohra",
    "U3 — wybiera właściwą granicę materiału do oceny bezpieczeństwa"
  ],
  "questions": [
    {
      "question": "Stalowy pręt odkształcił się trwale, ale nie pękł. Które zdanie najlepiej opisuje ten stan?",
      "answers": [
        "Na pewno przekroczono Rₑ",
        "Nie mogło zostać przekroczone Rₑ",
        "Na pewno osiągnięto Rₘ",
        "Materiał pozostał w całości w zakresie sprężystym"
      ],
      "correct": 0,
      "explanation": "Trwałe odkształcenie świadczy o uplastycznieniu, czyli przekroczeniu granicy plastyczności. Element może nadal przenosić obciążenie i nie osiągnąć jeszcze maksimum Rₘ.",
      "hint": "Zastanów się, która granica dotyczy trwałego odkształcenia, a która największej siły.",
      "outcome": "W2"
    },
    {
      "question": "Dla stali Rₑ = 250 MPa i Rₘ = 400 MPa. Jakie siły graniczne odpowiadają próbce o polu 100 mm²?",
      "answers": [
        "2,5 kN i 4 kN",
        "25 kN i 40 kN",
        "250 kN i 400 kN",
        "0,25 kN i 0,4 kN"
      ],
      "correct": 1,
      "explanation": "1 MPa = 1 N/mm². Zatem Fₑ = 250·100 = 25 000 N = 25 kN, a Fₘ = 400·100 = 40 kN.",
      "hint": "Pomnóż każde naprężenie w N/mm² przez pole w mm².",
      "outcome": "U1"
    },
    {
      "question": "Po odciążeniu próbki część wydłużenia znika, a część pozostaje. Jak nazywamy te dwie części?",
      "answers": [
        "Obie są wyłącznie sprężyste",
        "Znikająca jest plastyczna, a pozostała sprężysta",
        "Znikająca jest sprężysta, a pozostała plastyczna",
        "Obie są zawsze równe"
      ],
      "correct": 2,
      "explanation": "Sprężystość oznacza powrót po usunięciu obciążenia. Odkształcenie plastyczne jest trwałe i pozostaje po odciążeniu.",
      "hint": "Przypisz nazwy według tego, co dzieje się po zdjęciu siły.",
      "outcome": "W2"
    }
  ],
  "workedExample": {
    "given": "Próbka stalowa ma pole S₀ = 80 mm². Materiał ma Rₑ = 300 MPa i Rₘ = 450 MPa.",
    "steps": [
      "Granica plastyczności pozwala wyznaczyć początek istotnych odkształceń trwałych: Fₑ = RₑS₀.",
      "Fₑ = 300 N/mm²·80 mm² = 24 000 N = 24 kN.",
      "Największa siła wynika z wytrzymałości: Fₘ = RₘS₀ = 450·80 = 36 000 N = 36 kN.",
      "Różnica 36 − 24 = 12 kN pokazuje zapas siły między uplastycznieniem a największą siłą, ale nie jest zapasem do swobodnego wykorzystania w projekcie."
    ],
    "result": "Uplastycznienie próbki zaczyna się przy około 24 kN, a wytrzymałości Rₘ odpowiada siła 36 kN."
  }
} satisfies LessonData
