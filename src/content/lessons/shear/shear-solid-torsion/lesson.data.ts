import type { LessonData } from '../../../model'

export default {
  "id": "shear-solid-torsion",
  "moduleId": "shear",
  "number": 4,
  "title": "Skręcanie wału pełnego",
  "shortTitle": "Wał pełny",
  "description": "Prześledź liniowy rozkład naprężeń od osi do powierzchni i oblicz τmax dla okrągłego wału.",
  "duration": 9,
  "eyebrow": "Najdalej od osi, największe τ",
  "formula": "\\tau(r) = \\frac{T r}{J_o} \\qquad J_o = \\frac{\\pi d^4}{32} \\qquad \\tau_{max} = \\frac{16T}{\\pi d^3}",
  "formulaNote": "T to moment skręcający w N·mm, d i r w mm, J_o w mm⁴. Wartość τ otrzymasz w MPa.",
  "insight": "Naprężenie zależy od d³, ale moment bezwładności biegunowy od d⁴. To dwie różne zależności: pierwszą stosujesz do wytrzymałości, drugą m.in. do kąta skręcenia.",
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
      "question": "Jak zmienia się naprężenie styczne wzdłuż promienia pełnego, sprężyście skręcanego wału?",
      "answers": [
        "Rośnie liniowo od zera w osi do maksimum na powierzchni",
        "Jest stałe w całym przekroju",
        "Jest największe w osi i maleje ku powierzchni"
      ],
      "correct": 0,
      "hint": "We wzorze τ(r) = Tr/J_o promień r jest w liczniku.",
      "explanation": "Przy stałych T i J_o naprężenie jest wprost proporcjonalne do r. Dlatego τ(0) = 0, a maksimum występuje dla r = d/2."
    },
    {
      "question": "Średnica wału pełnego wzrasta dwukrotnie przy niezmienionym momencie T. Jak zmieni się τmax?",
      "answers": [
        "Spadnie 2 razy",
        "Spadnie 8 razy",
        "Spadnie 16 razy"
      ],
      "correct": 1,
      "hint": "W τmax = 16T/(πd³) średnica jest w trzeciej potędze.",
      "explanation": "Po podstawieniu 2d mianownik rośnie (2d)³/d³ = 8 razy. Maksymalne naprężenie spada więc ośmiokrotnie."
    },
    {
      "question": "Wał d = 40 mm przenosi T = 0,628 kN·m. Jakie jest w przybliżeniu τmax?",
      "answers": [
        "25 MPa",
        "50 MPa",
        "100 MPa"
      ],
      "correct": 1,
      "hint": "Użyj T = 628 000 N·mm i τmax = 16T/(πd³).",
      "explanation": "τmax = 16·628 000/(π·40³) ≈ 50 MPa. Moment w kN·m trzeba najpierw zamienić na N·mm."
    }
  ],
  "workedExample": {
    "given": "Pełny wał o średnicy d = 50 mm przenosi moment T = 2 kN·m.",
    "steps": [
      "Zamień moment: T = 2 kN·m = 2 000 000 N·mm.",
      "Wskaźnik wytrzymałości na skręcanie: W_o = πd³/16 = π·50³/16 = 24 543,7 mm³.",
      "Oblicz τmax = T/W_o = 2 000 000/24 543,7 = 81,49 MPa."
    ],
    "result": "τmax ≈ 81,5 MPa na powierzchni wału; w osi naprężenie styczne wynosi zero."
  }
} satisfies LessonData
