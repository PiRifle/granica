import type { LessonData } from '../../../model'

export default {
  "id": "foundations-load-types",
  "moduleId": "foundations",
  "number": 3,
  "title": "Obciążenia: siła, rozkład i moment",
  "shortTitle": "Obciążenia",
  "description": "Rozpoznaj sposób działania obciążenia i zapisz jego wartość, kierunek oraz miejsce przyłożenia.",
  "duration": 8,
  "eyebrow": "Co działa na element?",
  "formula": "q_g=\\rho g A,\\qquad G=q_g L=\\rho g A L",
  "formulaNote": "ρ to gęstość materiału, g ≈ 9,81 m/s², A to pole przekroju, a qg jest ciężarem na jednostkę długości w N/m.",
  "insight": "Ta sama wartość liczbowa może oznaczać co innego: 10 kN to siła, 10 kN/m to obciążenie liniowe, a 10 kN·m to moment. Jednostka ujawnia charakter obciążenia.",
  "lab": "selfWeight",
  "outcomes": [
    "W1 — identyfikuje zewnętrzne oddziaływania na element konstrukcji",
    "W2 — rozróżnia obciążenia powodujące różne przypadki wytrzymałościowe",
    "W3 — uwzględnia ciężar własny zależny od pola i długości",
    "U1 — oblicza wypadkowe obciążeń skupionych i rozłożonych",
    "U2 — rozróżnia dane wejściowe potrzebne do późniejszej analizy naprężeń",
    "U3 — zestawia obciążenia potrzebne do bezpiecznego i sztywnego doboru"
  ],
  "questions": [
    {
      "question": "Belka ma przekrój o polu A i długość L, a jej materiał ma gęstość ρ. Jak rośnie ciężar własny przy dwukrotnym zwiększeniu A?",
      "answers": [
        "Rośnie dwa razy",
        "Nie zmienia się",
        "Rośnie cztery razy niezależnie od L"
      ],
      "correct": 0,
      "hint": "Objętość pręta to V = AL.",
      "explanation": "Przy stałych ρ i L ciężar G = ρgAL jest wprost proporcjonalny do A. Dwukrotne zwiększenie przekroju daje dwukrotnie większą objętość i ciężar.",
      "outcome": "W3"
    },
    {
      "question": "Który zapis może opisywać równomiernie rozłożony ciężar własny pręta?",
      "answers": [
        "q = 180 N/m",
        "P = 180 N·m",
        "M = 180 N"
      ],
      "correct": 0,
      "hint": "Obciążenie liniowe podaje siłę przypadającą na jednostkę długości.",
      "explanation": "Ciężar rozłożony wzdłuż pręta opisujemy w N/m lub kN/m. N·m jest jednostką momentu, a samo N — siły skupionej.",
      "outcome": "W2"
    },
    {
      "question": "Moment zewnętrzny przyłożony do wolnego końca wydłużonego elementu różni się od siły tym, że:",
      "answers": [
        "ma jednostkę N/m",
        "opisuje działanie obrotowe i jego skutek zależy od ramienia sił",
        "nie może wywołać reakcji w podporach"
      ],
      "correct": 1,
      "hint": "Porównaj N·m z N i pomyśl o dokręcaniu kluczem.",
      "explanation": "Moment ma jednostkę N·m i opisuje skutek obrotowy. Dla pary sił lub siły na ramieniu zależy od odległości, a podpory mogą reagować zarówno siłami, jak i momentem.",
      "outcome": "W1"
    }
  ],
  "workedExample": {
    "given": "Stalowy pręt ma A = 0,002 m², L = 4 m i gęstość ρ = 7850 kg/m³. Przyjmij g = 9,81 m/s².",
    "steps": [
      "Oblicz objętość: V = AL = 0,002 m² · 4 m = 0,008 m³.",
      "Oblicz ciężar na jednostkę długości: qg = ρgA = 7850 · 9,81 · 0,002 ≈ 154,0 N/m.",
      "Oblicz ciężar całego pręta: G = qgL = 154,0 N/m · 4 m ≈ 616 N.",
      "Dla pręta poziomego modeluj G jako pionowe obciążenie równomierne qg skierowane w dół."
    ],
    "result": "Ciężar własny wynosi około 616 N, co odpowiada obciążeniu qg ≈ 154 N/m."
  }
} satisfies LessonData
